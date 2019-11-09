'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * LRU 文件存储，使用该 downloader 可以让下载的文件存储在本地，下次进入小程序后可以直接使用
 * 详细设计文档可查看 https://juejin.im/post/5b42d3ede51d4519277b6ce3
 */
var util = require('./util.js');

var SAVED_FILES_KEY = 'savedFiles';
var KEY_TOTAL_SIZE = 'totalSize';
var KEY_PATH = 'path';
var KEY_TIME = 'time';
var KEY_SIZE = 'size';

// 可存储总共为 6M，目前小程序可允许的最大本地存储为 10M
var MAX_SPACE_IN_B = 6 * 1024 * 1024;
var savedFiles = {};

var Dowloader = function () {
  function Dowloader() {
    _classCallCheck(this, Dowloader);

    // app 如果设置了最大存储空间，则使用 app 中的
    if (getApp().PAINTER_MAX_LRU_SPACE) {
      MAX_SPACE_IN_B = getApp().PAINTER_MAX_LRU_SPACE;
    }
    wx.getStorage({
      key: SAVED_FILES_KEY,
      success: function success(res) {
        if (res.data) {
          savedFiles = res.data;
        }
      }
    });
  }

  /**
   * 下载文件，会用 lru 方式来缓存文件到本地
   * @param {String} url 文件的 url
   */


  _createClass(Dowloader, [{
    key: 'download',
    value: function download(url) {
      return new Promise(function (resolve, reject) {
        if (!(url && util.isValidUrl(url))) {
          resolve(url);
          return;
        }
        var file = getFile(url);

        if (file) {
          // 检查文件是否正常，不正常需要重新下载
          wx.getSavedFileInfo({
            filePath: file[KEY_PATH],
            success: function success(res) {
              resolve(file[KEY_PATH]);
            },
            fail: function fail(error) {
              console.error('the file is broken, redownload it, ' + JSON.stringify(error));
              downloadFile(url).then(function (path) {
                resolve(path);
              }, function () {
                reject();
              });
            }
          });
        } else {
          downloadFile(url).then(function (path) {
            resolve(path);
          }, function () {
            reject();
          });
        }
      });
    }
  }]);

  return Dowloader;
}();

exports.default = Dowloader;


function downloadFile(url) {
  return new Promise(function (resolve, reject) {
    wx.downloadFile({
      url: url,
      success: function success(res) {
        if (res.statusCode !== 200) {
          console.error('downloadFile ' + url + ' failed res.statusCode is not 200');
          reject();
          return;
        }
        var tempFilePath = res.tempFilePath;

        wx.getFileInfo({
          filePath: tempFilePath,
          success: function success(tmpRes) {
            var newFileSize = tmpRes.size;
            doLru(newFileSize).then(function () {
              saveFile(url, newFileSize, tempFilePath).then(function (filePath) {
                resolve(filePath);
              });
            }, function () {
              resolve(tempFilePath);
            });
          },
          fail: function fail(error) {
            // 文件大小信息获取失败，则此文件也不要进行存储
            console.error('getFileInfo ' + res.tempFilePath + ' failed, ' + JSON.stringify(error));
            resolve(res.tempFilePath);
          }
        });
      },
      fail: function fail(error) {
        console.error('downloadFile failed, ' + JSON.stringify(error) + ' ');
        reject();
      }
    });
  });
}

function saveFile(key, newFileSize, tempFilePath) {
  return new Promise(function (resolve, reject) {
    wx.saveFile({
      tempFilePath: tempFilePath,
      success: function success(fileRes) {
        var totalSize = savedFiles[KEY_TOTAL_SIZE] ? savedFiles[KEY_TOTAL_SIZE] : 0;
        savedFiles[key] = {};
        savedFiles[key][KEY_PATH] = fileRes.savedFilePath;
        savedFiles[key][KEY_TIME] = new Date().getTime();
        savedFiles[key][KEY_SIZE] = newFileSize;
        savedFiles['totalSize'] = newFileSize + totalSize;
        wx.setStorage({
          key: SAVED_FILES_KEY,
          data: savedFiles
        });
        resolve(fileRes.savedFilePath);
      },
      fail: function fail(error) {
        console.error('saveFile ' + key + ' failed, then we delete all files, ' + JSON.stringify(error));
        // 由于 saveFile 成功后，res.tempFilePath 处的文件会被移除，所以在存储未成功时，我们还是继续使用临时文件
        resolve(tempFilePath);
        // 如果出现错误，就直接情况本地的所有文件，因为你不知道是不是因为哪次lru的某个文件未删除成功
        reset();
      }
    });
  });
}

/**
 * 清空所有下载相关内容
 */
function reset() {
  wx.removeStorage({
    key: SAVED_FILES_KEY,
    success: function success() {
      wx.getSavedFileList({
        success: function success(listRes) {
          removeFiles(listRes.fileList);
        },
        fail: function fail(getError) {
          console.error('getSavedFileList failed, ' + JSON.stringify(getError));
        }
      });
    }
  });
}

function doLru(size) {
  return new Promise(function (resolve, reject) {
    var totalSize = savedFiles[KEY_TOTAL_SIZE] ? savedFiles[KEY_TOTAL_SIZE] : 0;

    if (size + totalSize <= MAX_SPACE_IN_B) {
      resolve();
      return;
    }
    // 如果加上新文件后大小超过最大限制，则进行 lru
    var pathsShouldDelete = [];
    // 按照最后一次的访问时间，从小到大排序
    var allFiles = JSON.parse(JSON.stringify(savedFiles));
    delete allFiles[KEY_TOTAL_SIZE];
    var sortedKeys = Object.keys(allFiles).sort(function (a, b) {
      return allFiles[a][KEY_TIME] - allFiles[b][KEY_TIME];
    });

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = sortedKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var sortedKey = _step.value;

        totalSize -= savedFiles[sortedKey].size;
        pathsShouldDelete.push(savedFiles[sortedKey][KEY_PATH]);
        delete savedFiles[sortedKey];
        if (totalSize + size < MAX_SPACE_IN_B) {
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    savedFiles['totalSize'] = totalSize;

    wx.setStorage({
      key: SAVED_FILES_KEY,
      data: savedFiles,
      success: function success() {
        // 保证 storage 中不会存在不存在的文件数据
        if (pathsShouldDelete.length > 0) {
          removeFiles(pathsShouldDelete);
        }
        resolve();
      },
      fail: function fail(error) {
        console.error('doLru setStorage failed, ' + JSON.stringify(error));
        reject();
      }
    });
  });
}

function removeFiles(pathsShouldDelete) {
  var _loop = function _loop(pathDel) {
    var delPath = pathDel;
    if ((typeof pathDel === 'undefined' ? 'undefined' : _typeof(pathDel)) === 'object') {
      delPath = pathDel.filePath;
    }
    wx.removeSavedFile({
      filePath: delPath,
      fail: function fail(error) {
        console.error('removeSavedFile ' + pathDel + ' failed, ' + JSON.stringify(error));
      }
    });
  };

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = pathsShouldDelete[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var pathDel = _step2.value;

      _loop(pathDel);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function getFile(key) {
  if (!savedFiles[key]) {
    return;
  }
  savedFiles[key]['time'] = new Date().getTime();
  wx.setStorage({
    key: SAVED_FILES_KEY,
    data: savedFiles
  });
  return savedFiles[key];
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvd25sb2FkZXIuanMiXSwibmFtZXMiOlsidXRpbCIsInJlcXVpcmUiLCJTQVZFRF9GSUxFU19LRVkiLCJLRVlfVE9UQUxfU0laRSIsIktFWV9QQVRIIiwiS0VZX1RJTUUiLCJLRVlfU0laRSIsIk1BWF9TUEFDRV9JTl9CIiwic2F2ZWRGaWxlcyIsIkRvd2xvYWRlciIsImdldEFwcCIsIlBBSU5URVJfTUFYX0xSVV9TUEFDRSIsInd4IiwiZ2V0U3RvcmFnZSIsImtleSIsInN1Y2Nlc3MiLCJyZXMiLCJkYXRhIiwidXJsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpc1ZhbGlkVXJsIiwiZmlsZSIsImdldEZpbGUiLCJnZXRTYXZlZEZpbGVJbmZvIiwiZmlsZVBhdGgiLCJmYWlsIiwiZXJyb3IiLCJjb25zb2xlIiwiSlNPTiIsInN0cmluZ2lmeSIsImRvd25sb2FkRmlsZSIsInRoZW4iLCJwYXRoIiwic3RhdHVzQ29kZSIsInRlbXBGaWxlUGF0aCIsImdldEZpbGVJbmZvIiwidG1wUmVzIiwibmV3RmlsZVNpemUiLCJzaXplIiwiZG9McnUiLCJzYXZlRmlsZSIsImZpbGVSZXMiLCJ0b3RhbFNpemUiLCJzYXZlZEZpbGVQYXRoIiwiRGF0ZSIsImdldFRpbWUiLCJzZXRTdG9yYWdlIiwicmVzZXQiLCJyZW1vdmVTdG9yYWdlIiwiZ2V0U2F2ZWRGaWxlTGlzdCIsImxpc3RSZXMiLCJyZW1vdmVGaWxlcyIsImZpbGVMaXN0IiwiZ2V0RXJyb3IiLCJwYXRoc1Nob3VsZERlbGV0ZSIsImFsbEZpbGVzIiwicGFyc2UiLCJzb3J0ZWRLZXlzIiwiT2JqZWN0Iiwia2V5cyIsInNvcnQiLCJhIiwiYiIsInNvcnRlZEtleSIsInB1c2giLCJsZW5ndGgiLCJwYXRoRGVsIiwiZGVsUGF0aCIsInJlbW92ZVNhdmVkRmlsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFJQSxJQUFNQSxPQUFPQyxRQUFRLFFBQVIsQ0FBYjs7QUFFQSxJQUFNQyxr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akI1QyxnQkFBVTJDLE9BRE87QUFFakIxQyxZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmQyxnQkFBUUQsS0FBUixzQkFBaUN3QyxPQUFqQyxpQkFBb0R0QyxLQUFLQyxTQUFMLENBQWVILEtBQWYsQ0FBcEQ7QUFDRDtBQUpnQixLQUFuQjtBQU5vQzs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDdEMsMEJBQXNCNEIsaUJBQXRCLG1JQUF5QztBQUFBLFVBQTlCWSxPQUE4Qjs7QUFBQSxZQUE5QkEsT0FBOEI7QUFXeEM7QUFacUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWF2Qzs7QUFFRCxTQUFTNUMsT0FBVCxDQUFpQlYsR0FBakIsRUFBc0I7QUFDcEIsTUFBSSxDQUFDTixXQUFXTSxHQUFYLENBQUwsRUFBc0I7QUFDcEI7QUFDRDtBQUNETixhQUFXTSxHQUFYLEVBQWdCLE1BQWhCLElBQTBCLElBQUlnQyxJQUFKLEdBQVdDLE9BQVgsRUFBMUI7QUFDQW5DLEtBQUdvQyxVQUFILENBQWM7QUFDWmxDLFNBQUtaLGVBRE87QUFFWmUsVUFBTVQ7QUFGTSxHQUFkO0FBSUEsU0FBT0EsV0FBV00sR0FBWCxDQUFQO0FBQ0QiLCJmaWxlIjoiZG93bmxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTFJVIOaWh+S7tuWtmOWCqO+8jOS9v+eUqOivpSBkb3dubG9hZGVyIOWPr+S7peiuqeS4i+i9veeahOaWh+S7tuWtmOWCqOWcqOacrOWcsO+8jOS4i+asoei/m+WFpeWwj+eoi+W6j+WQjuWPr+S7peebtOaOpeS9v+eUqFxuICog6K+m57uG6K6+6K6h5paH5qGj5Y+v5p+l55yLIGh0dHBzOi8vanVlamluLmltL3Bvc3QvNWI0MmQzZWRlNTFkNDUxOTI3N2I2Y2UzXG4gKi9cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuY29uc3QgU0FWRURfRklMRVNfS0VZID0gJ3NhdmVkRmlsZXMnO1xuY29uc3QgS0VZX1RPVEFMX1NJWkUgPSAndG90YWxTaXplJztcbmNvbnN0IEtFWV9QQVRIID0gJ3BhdGgnO1xuY29uc3QgS0VZX1RJTUUgPSAndGltZSc7XG5jb25zdCBLRVlfU0laRSA9ICdzaXplJztcblxuLy8g5Y+v5a2Y5YKo5oC75YWx5Li6IDZN77yM55uu5YmN5bCP56iL5bqP5Y+v5YWB6K6455qE5pyA5aSn5pys5Zyw5a2Y5YKo5Li6IDEwTVxubGV0IE1BWF9TUEFDRV9JTl9CID0gNiAqIDEwMjQgKiAxMDI0O1xubGV0IHNhdmVkRmlsZXMgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG93bG9hZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gYXBwIOWmguaenOiuvue9ruS6huacgOWkp+WtmOWCqOepuumXtO+8jOWImeS9v+eUqCBhcHAg5Lit55qEXG4gICAgaWYgKGdldEFwcCgpLlBBSU5URVJfTUFYX0xSVV9TUEFDRSkge1xuICAgICAgTUFYX1NQQUNFX0lOX0IgPSBnZXRBcHAoKS5QQUlOVEVSX01BWF9MUlVfU1BBQ0U7XG4gICAgfVxuICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAga2V5OiBTQVZFRF9GSUxFU19LRVksXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuZGF0YSkge1xuICAgICAgICAgIHNhdmVkRmlsZXMgPSByZXMuZGF0YTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDkuIvovb3mlofku7bvvIzkvJrnlKggbHJ1IOaWueW8j+adpee8k+WtmOaWh+S7tuWIsOacrOWcsFxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIOaWh+S7tueahCB1cmxcbiAgICovXG4gIGRvd25sb2FkKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoISh1cmwgJiYgdXRpbC5pc1ZhbGlkVXJsKHVybCkpKSB7XG4gICAgICAgIHJlc29sdmUodXJsKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgZmlsZSA9IGdldEZpbGUodXJsKTtcblxuICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgLy8g5qOA5p+l5paH5Lu25piv5ZCm5q2j5bi477yM5LiN5q2j5bi46ZyA6KaB6YeN5paw5LiL6L29XG4gICAgICAgIHd4LmdldFNhdmVkRmlsZUluZm8oe1xuICAgICAgICAgIGZpbGVQYXRoOiBmaWxlW0tFWV9QQVRIXSxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKGZpbGVbS0VZX1BBVEhdKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgdGhlIGZpbGUgaXMgYnJva2VuLCByZWRvd25sb2FkIGl0LCAke0pTT04uc3RyaW5naWZ5KGVycm9yKX1gKTtcbiAgICAgICAgICAgIGRvd25sb2FkRmlsZSh1cmwpLnRoZW4oKHBhdGgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShwYXRoKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvd25sb2FkRmlsZSh1cmwpLnRoZW4oKHBhdGgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHBhdGgpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRvd25sb2FkRmlsZSh1cmwpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3eC5kb3dubG9hZEZpbGUoe1xuICAgICAgdXJsOiB1cmwsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgZG93bmxvYWRGaWxlICR7dXJsfSBmYWlsZWQgcmVzLnN0YXR1c0NvZGUgaXMgbm90IDIwMGApO1xuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IHRlbXBGaWxlUGF0aCB9ID0gcmVzO1xuICAgICAgICB3eC5nZXRGaWxlSW5mbyh7XG4gICAgICAgICAgZmlsZVBhdGg6IHRlbXBGaWxlUGF0aCxcbiAgICAgICAgICBzdWNjZXNzOiAodG1wUmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdGaWxlU2l6ZSA9IHRtcFJlcy5zaXplO1xuICAgICAgICAgICAgZG9McnUobmV3RmlsZVNpemUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICBzYXZlRmlsZSh1cmwsIG5ld0ZpbGVTaXplLCB0ZW1wRmlsZVBhdGgpLnRoZW4oKGZpbGVQYXRoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmaWxlUGF0aCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKHRlbXBGaWxlUGF0aCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IChlcnJvcikgPT4ge1xuICAgICAgICAgIC8vIOaWh+S7tuWkp+Wwj+S/oeaBr+iOt+WPluWksei0pe+8jOWImeatpOaWh+S7tuS5n+S4jeimgei/m+ihjOWtmOWCqFxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgZ2V0RmlsZUluZm8gJHtyZXMudGVtcEZpbGVQYXRofSBmYWlsZWQsICR7SlNPTi5zdHJpbmdpZnkoZXJyb3IpfWApO1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMudGVtcEZpbGVQYXRoKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgZG93bmxvYWRGaWxlIGZhaWxlZCwgJHtKU09OLnN0cmluZ2lmeShlcnJvcil9IGApO1xuICAgICAgICByZWplY3QoKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzYXZlRmlsZShrZXksIG5ld0ZpbGVTaXplLCB0ZW1wRmlsZVBhdGgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3eC5zYXZlRmlsZSh7XG4gICAgICB0ZW1wRmlsZVBhdGg6IHRlbXBGaWxlUGF0aCxcbiAgICAgIHN1Y2Nlc3M6IChmaWxlUmVzKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvdGFsU2l6ZSA9IHNhdmVkRmlsZXNbS0VZX1RPVEFMX1NJWkVdID8gc2F2ZWRGaWxlc1tLRVlfVE9UQUxfU0laRV0gOiAwO1xuICAgICAgICBzYXZlZEZpbGVzW2tleV0gPSB7fTtcbiAgICAgICAgc2F2ZWRGaWxlc1trZXldW0tFWV9QQVRIXSA9IGZpbGVSZXMuc2F2ZWRGaWxlUGF0aDtcbiAgICAgICAgc2F2ZWRGaWxlc1trZXldW0tFWV9USU1FXSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICBzYXZlZEZpbGVzW2tleV1bS0VZX1NJWkVdID0gbmV3RmlsZVNpemU7XG4gICAgICAgIHNhdmVkRmlsZXNbJ3RvdGFsU2l6ZSddID0gbmV3RmlsZVNpemUgKyB0b3RhbFNpemU7XG4gICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgIGtleTogU0FWRURfRklMRVNfS0VZLFxuICAgICAgICAgIGRhdGE6IHNhdmVkRmlsZXMsXG4gICAgICAgIH0pO1xuICAgICAgICByZXNvbHZlKGZpbGVSZXMuc2F2ZWRGaWxlUGF0aCk7XG4gICAgICB9LFxuICAgICAgZmFpbDogKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYHNhdmVGaWxlICR7a2V5fSBmYWlsZWQsIHRoZW4gd2UgZGVsZXRlIGFsbCBmaWxlcywgJHtKU09OLnN0cmluZ2lmeShlcnJvcil9YCk7XG4gICAgICAgIC8vIOeUseS6jiBzYXZlRmlsZSDmiJDlip/lkI7vvIxyZXMudGVtcEZpbGVQYXRoIOWkhOeahOaWh+S7tuS8muiiq+enu+mZpO+8jOaJgOS7peWcqOWtmOWCqOacquaIkOWKn+aXtu+8jOaIkeS7rOi/mOaYr+e7p+e7reS9v+eUqOS4tOaXtuaWh+S7tlxuICAgICAgICByZXNvbHZlKHRlbXBGaWxlUGF0aCk7XG4gICAgICAgIC8vIOWmguaenOWHuueOsOmUmeivr++8jOWwseebtOaOpeaDheWGteacrOWcsOeahOaJgOacieaWh+S7tu+8jOWboOS4uuS9oOS4jeefpemBk+aYr+S4jeaYr+WboOS4uuWTquasoWxydeeahOafkOS4quaWh+S7tuacquWIoOmZpOaIkOWKn1xuICAgICAgICByZXNldCgpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKlxuICog5riF56m65omA5pyJ5LiL6L2955u45YWz5YaF5a65XG4gKi9cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICB3eC5yZW1vdmVTdG9yYWdlKHtcbiAgICBrZXk6IFNBVkVEX0ZJTEVTX0tFWSxcbiAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICB3eC5nZXRTYXZlZEZpbGVMaXN0KHtcbiAgICAgICAgc3VjY2VzczogKGxpc3RSZXMpID0+IHtcbiAgICAgICAgICByZW1vdmVGaWxlcyhsaXN0UmVzLmZpbGVMaXN0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogKGdldEVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgZ2V0U2F2ZWRGaWxlTGlzdCBmYWlsZWQsICR7SlNPTi5zdHJpbmdpZnkoZ2V0RXJyb3IpfWApO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRvTHJ1KHNpemUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgdG90YWxTaXplID0gc2F2ZWRGaWxlc1tLRVlfVE9UQUxfU0laRV0gPyBzYXZlZEZpbGVzW0tFWV9UT1RBTF9TSVpFXSA6IDA7XG5cbiAgICBpZiAoc2l6ZSArIHRvdGFsU2l6ZSA8PSBNQVhfU1BBQ0VfSU5fQikge1xuICAgICAgcmVzb2x2ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDlpoLmnpzliqDkuIrmlrDmlofku7blkI7lpKflsI/otoXov4fmnIDlpKfpmZDliLbvvIzliJnov5vooYwgbHJ1XG4gICAgY29uc3QgcGF0aHNTaG91bGREZWxldGUgPSBbXTtcbiAgICAvLyDmjInnhafmnIDlkI7kuIDmrKHnmoTorr/pl67ml7bpl7TvvIzku47lsI/liLDlpKfmjpLluo9cbiAgICBjb25zdCBhbGxGaWxlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc2F2ZWRGaWxlcykpO1xuICAgIGRlbGV0ZSBhbGxGaWxlc1tLRVlfVE9UQUxfU0laRV07XG4gICAgY29uc3Qgc29ydGVkS2V5cyA9IE9iamVjdC5rZXlzKGFsbEZpbGVzKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gYWxsRmlsZXNbYV1bS0VZX1RJTUVdIC0gYWxsRmlsZXNbYl1bS0VZX1RJTUVdO1xuICAgIH0pO1xuXG4gICAgZm9yIChjb25zdCBzb3J0ZWRLZXkgb2Ygc29ydGVkS2V5cykge1xuICAgICAgdG90YWxTaXplIC09IHNhdmVkRmlsZXNbc29ydGVkS2V5XS5zaXplO1xuICAgICAgcGF0aHNTaG91bGREZWxldGUucHVzaChzYXZlZEZpbGVzW3NvcnRlZEtleV1bS0VZX1BBVEhdKTtcbiAgICAgIGRlbGV0ZSBzYXZlZEZpbGVzW3NvcnRlZEtleV07XG4gICAgICBpZiAodG90YWxTaXplICsgc2l6ZSA8IE1BWF9TUEFDRV9JTl9CKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNhdmVkRmlsZXNbJ3RvdGFsU2l6ZSddID0gdG90YWxTaXplO1xuXG4gICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICBrZXk6IFNBVkVEX0ZJTEVTX0tFWSxcbiAgICAgIGRhdGE6IHNhdmVkRmlsZXMsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAvLyDkv53or4Egc3RvcmFnZSDkuK3kuI3kvJrlrZjlnKjkuI3lrZjlnKjnmoTmlofku7bmlbDmja5cbiAgICAgICAgaWYgKHBhdGhzU2hvdWxkRGVsZXRlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZW1vdmVGaWxlcyhwYXRoc1Nob3VsZERlbGV0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSxcbiAgICAgIGZhaWw6IChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBkb0xydSBzZXRTdG9yYWdlIGZhaWxlZCwgJHtKU09OLnN0cmluZ2lmeShlcnJvcil9YCk7XG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUZpbGVzKHBhdGhzU2hvdWxkRGVsZXRlKSB7XG4gIGZvciAoY29uc3QgcGF0aERlbCBvZiBwYXRoc1Nob3VsZERlbGV0ZSkge1xuICAgIGxldCBkZWxQYXRoID0gcGF0aERlbDtcbiAgICBpZiAodHlwZW9mIHBhdGhEZWwgPT09ICdvYmplY3QnKSB7XG4gICAgICBkZWxQYXRoID0gcGF0aERlbC5maWxlUGF0aDtcbiAgICB9XG4gICAgd3gucmVtb3ZlU2F2ZWRGaWxlKHtcbiAgICAgIGZpbGVQYXRoOiBkZWxQYXRoLFxuICAgICAgZmFpbDogKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYHJlbW92ZVNhdmVkRmlsZSAke3BhdGhEZWx9IGZhaWxlZCwgJHtKU09OLnN0cmluZ2lmeShlcnJvcil9YCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZpbGUoa2V5KSB7XG4gIGlmICghc2F2ZWRGaWxlc1trZXldKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHNhdmVkRmlsZXNba2V5XVsndGltZSddID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIHd4LnNldFN0b3JhZ2Uoe1xuICAgIGtleTogU0FWRURfRklMRVNfS0VZLFxuICAgIGRhdGE6IHNhdmVkRmlsZXMsXG4gIH0pO1xuICByZXR1cm4gc2F2ZWRGaWxlc1trZXldO1xufVxuIl19