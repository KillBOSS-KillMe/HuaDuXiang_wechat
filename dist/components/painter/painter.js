'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _pen = require('./lib/pen.js');

var _pen2 = _interopRequireDefault(_pen);

var _downloader = require('./lib/downloader.js');

var _downloader2 = _interopRequireDefault(_downloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var util = require('./lib/util.js');
var downloader = new _downloader2.default();

// 最大尝试的绘制次数
var MAX_PAINT_COUNT = 5;

var Painter = function (_wepy$component) {
  _inherits(Painter, _wepy$component);

  function Painter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Painter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Painter.__proto__ || Object.getPrototypeOf(Painter)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      component: true
    }, _this.data = {
      picURL: '',
      showCanvas: true,
      painterStyle: '',
      canvasWidthInPx: 0,
      canvasHeightInPx: 0,
      paintCount: 0
    }, _this.props = {
      customStyle: {
        type: String
      },
      palette: {
        type: Object,
        observer: function observer(newVal, oldVal) {
          if (this.isNeedRefresh(newVal, oldVal)) {
            this.paintCount = 0;
            this.startPaint();
          }
        }
      },
      widthPixels: {
        type: Number,
        value: 0
      },
      // 启用脏检查，默认 false
      dirty: {
        type: Boolean,
        value: false
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Painter, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log(this.showCanvas);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(object) {
      for (var i in object) {
        return false;
      }
      return true;
    }
  }, {
    key: 'isNeedRefresh',
    value: function isNeedRefresh(newVal, oldVal) {
      if (!newVal || this.isEmpty(newVal) || this.data.dirty && util.equal(newVal, oldVal)) {
        return false;
      }
      return true;
    }
  }, {
    key: 'startPaint',
    value: function startPaint() {
      var _this2 = this;

      if (this.isEmpty(this.properties.palette)) {
        return;
      }

      if (!(getApp().systemInfo && getApp().systemInfo.screenWidth)) {
        try {
          getApp().systemInfo = wx.getSystemInfoSync();
        } catch (e) {
          var error = 'Painter get system info failed, ' + JSON.stringify(e);
          that.triggerEvent('imgErr', {
            error: error
          });
          console.error(error);
          return;
        }
      }
      var screenK = getApp().systemInfo.screenWidth / 750;
      setStringPrototype(screenK, 1);

      this.downloadImages().then(function (palette) {
        var width = palette.width,
            height = palette.height;


        if (!width || !height) {
          console.error('You should set width and height correctly for painter, width: ' + width + ', height: ' + height);
          return;
        }
        _this2.canvasWidthInPx = width.toPx();
        if (_this2.properties.widthPixels) {
          // 如果重新设置过像素宽度，则重新设置比例
          setStringPrototype(screenK, _this2.properties.widthPixels / _this2.canvasWidthInPx);
          _this2.canvasWidthInPx = _this2.properties.widthPixels;
        }

        _this2.canvasHeightInPx = height.toPx();
        _this2.setData({
          painterStyle: 'width:' + _this2.canvasWidthInPx + 'px;height:' + _this2.canvasHeightInPx + 'px;'
        });
        var ctx = wx.createCanvasContext('k-canvas', _this2);
        var pen = new _pen2.default(ctx, palette);
        pen.paint(function () {
          _this2.saveImgToLocal();
        });
      });
    }
  }, {
    key: 'downloadImages',
    value: function downloadImages() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var preCount = 0;
        var completeCount = 0;
        var paletteCopy = JSON.parse(JSON.stringify(_this3.properties.palette));
        if (paletteCopy.background) {
          preCount++;
          downloader.download(paletteCopy.background).then(function (path) {
            paletteCopy.background = path;
            completeCount++;
            if (preCount === completeCount) {
              resolve(paletteCopy);
            }
          }, function () {
            completeCount++;
            if (preCount === completeCount) {
              resolve(paletteCopy);
            }
          });
        }
        if (paletteCopy.views) {
          var _loop = function _loop(view) {
            if (view && view.type === 'image' && view.url) {
              preCount++;
              /* eslint-disable no-loop-func */
              downloader.download(view.url).then(function (path) {
                view.url = path;
                wx.getImageInfo({
                  src: view.url,
                  success: function success(res) {
                    // 获得一下图片信息，供后续裁减使用
                    view.sWidth = res.width;
                    view.sHeight = res.height;
                  },
                  fail: function fail(error) {
                    // 如果图片坏了，则直接置空，防止坑爹的 canvas 画崩溃了
                    view.url = '';
                    console.error('getImageInfo ' + view.url + ' failed, ' + JSON.stringify(error));
                  },
                  complete: function complete() {
                    completeCount++;
                    if (preCount === completeCount) {
                      resolve(paletteCopy);
                    }
                  }
                });
              }, function () {
                completeCount++;
                if (preCount === completeCount) {
                  resolve(paletteCopy);
                }
              });
            }
          };

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = paletteCopy.views[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var view = _step.value;

              _loop(view);
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
        }
        if (preCount === 0) {
          resolve(paletteCopy);
        }
      });
    }
  }, {
    key: 'saveImgToLocal',
    value: function saveImgToLocal() {
      var _this4 = this;

      var that = this;
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'k-canvas',
          success: function success(res) {
            that.getImageInfo(res.tempFilePath);
          },
          fail: function fail(error) {
            console.error('canvasToTempFilePath failed, ' + JSON.stringify(error));
            that.triggerEvent('imgErr', {
              error: error
            });
          }
        }, _this4);
      }, 300);
    }
  }, {
    key: 'getImageInfo',
    value: function getImageInfo(filePath) {
      var that = this;
      wx.getImageInfo({
        src: filePath,
        success: function success(infoRes) {
          if (that.paintCount > MAX_PAINT_COUNT) {
            var error = 'The result is always fault, even we tried ' + MAX_PAINT_COUNT + ' times';
            console.error(error);
            that.triggerEvent('imgErr', {
              error: error
            });
            return;
          }
          // 比例相符时才证明绘制成功，否则进行强制重绘制
          if (Math.abs((infoRes.width * that.canvasHeightInPx - that.canvasWidthInPx * infoRes.height) / (infoRes.height * that.canvasHeightInPx)) < 0.01) {
            that.triggerEvent('imgOK', {
              path: filePath
            });
          } else {
            that.startPaint();
          }
          that.paintCount++;
        },
        fail: function fail(error) {
          console.error('getImageInfo failed, ' + JSON.stringify(error));
          that.triggerEvent('imgErr', {
            error: error
          });
        }
      });
    }
  }]);

  return Painter;
}(_wepy2.default.component);

exports.default = Painter;


function setStringPrototype(screenK, scale) {
  /* eslint-disable no-extend-native */
  /**
   * 是否支持负数
   * @param {Boolean} minus 是否支持负数
   */
  String.prototype.toPx = function toPx(minus) {
    var reg = void 0;
    if (minus) {
      reg = /^-?[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g;
    } else {
      reg = /^[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g;
    }
    var results = reg.exec(this);
    if (!this || !results) {
      console.error('The size: ' + this + ' is illegal');
      return 0;
    }
    var unit = results[2];
    var value = parseFloat(this);

    var res = 0;
    if (unit === 'rpx') {
      res = Math.round(value * screenK * (scale || 1));
    } else if (unit === 'px') {
      res = Math.round(value * (scale || 1));
    }
    return res;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhaW50ZXIuanMiXSwibmFtZXMiOlsidXRpbCIsInJlcXVpcmUiLCJkb3dubG9hZGVyIiwiRG93bmxvYWRlciIsIk1BWF9QQUlOVF9DT1VOVCIsIlBhaW50ZXIiLCJjb25maWciLCJjb21wb25lbnQiLCJkYXRhIiwicGljVVJMIiwic2hvd0NhbnZhcyIsInBhaW50ZXJTdHlsZSIsImNhbnZhc1dpZHRoSW5QeCIsImNhbnZhc0hlaWdodEluUHgiLCJwYWludENvdW50IiwicHJvcHMiLCJjdXN0b21TdHlsZSIsInR5cGUiLCJTdHJpbmciLCJwYWxldHRlIiwiT2JqZWN0Iiwib2JzZXJ2ZXIiLCJuZXdWYWwiLCJvbGRWYWwiLCJpc05lZWRSZWZyZXNoIiwic3RhcnRQYWludCIsIndpZHRoUGl4ZWxzIiwiTnVtYmVyIiwidmFsdWUiLCJkaXJ0eSIsIkJvb2xlYW4iLCJjb25zb2xlIiwibG9nIiwib2JqZWN0IiwiaSIsImlzRW1wdHkiLCJlcXVhbCIsInByb3BlcnRpZXMiLCJnZXRBcHAiLCJzeXN0ZW1JbmZvIiwic2NyZWVuV2lkdGgiLCJ3eCIsImdldFN5c3RlbUluZm9TeW5jIiwiZSIsImVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsInRoYXQiLCJ0cmlnZ2VyRXZlbnQiLCJzY3JlZW5LIiwic2V0U3RyaW5nUHJvdG90eXBlIiwiZG93bmxvYWRJbWFnZXMiLCJ0aGVuIiwid2lkdGgiLCJoZWlnaHQiLCJ0b1B4Iiwic2V0RGF0YSIsImN0eCIsImNyZWF0ZUNhbnZhc0NvbnRleHQiLCJwZW4iLCJQZW4iLCJwYWludCIsInNhdmVJbWdUb0xvY2FsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwcmVDb3VudCIsImNvbXBsZXRlQ291bnQiLCJwYWxldHRlQ29weSIsInBhcnNlIiwiYmFja2dyb3VuZCIsImRvd25sb2FkIiwicGF0aCIsInZpZXdzIiwidmlldyIsInVybCIsImdldEltYWdlSW5mbyIsInNyYyIsInN1Y2Nlc3MiLCJzV2lkdGgiLCJyZXMiLCJzSGVpZ2h0IiwiZmFpbCIsImNvbXBsZXRlIiwic2V0VGltZW91dCIsImNhbnZhc1RvVGVtcEZpbGVQYXRoIiwiY2FudmFzSWQiLCJ0ZW1wRmlsZVBhdGgiLCJmaWxlUGF0aCIsIk1hdGgiLCJhYnMiLCJpbmZvUmVzIiwid2VweSIsInNjYWxlIiwicHJvdG90eXBlIiwibWludXMiLCJyZWciLCJyZXN1bHRzIiwiZXhlYyIsInVuaXQiLCJwYXJzZUZsb2F0Iiwicm91bmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTUEsT0FBT0MsUUFBUSxZQUFSLENBQWI7QUFDQSxJQUFNQyxhQUFhLElBQUlDLG9CQUFKLEVBQW5COztBQUVBO0FBQ0EsSUFBTUMsa0JBQWtCLENBQXhCOztJQUVxQkMsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDUEMsaUJBQVc7QUFESixLLFFBR1RDLEksR0FBTztBQUNMQyxjQUFRLEVBREg7QUFFTEMsa0JBQVksSUFGUDtBQUdMQyxvQkFBYyxFQUhUO0FBSUxDLHVCQUFpQixDQUpaO0FBS0xDLHdCQUFrQixDQUxiO0FBTUxDLGtCQUFZO0FBTlAsSyxRQVFQQyxLLEdBQVE7QUFDTkMsbUJBQWE7QUFDWEMsY0FBTUM7QUFESyxPQURQO0FBSU5DLGVBQVM7QUFDUEYsY0FBTUcsTUFEQztBQUVQQyxrQkFBVSxrQkFBU0MsTUFBVCxFQUFpQkMsTUFBakIsRUFBeUI7QUFDakMsY0FBSSxLQUFLQyxhQUFMLENBQW1CRixNQUFuQixFQUEyQkMsTUFBM0IsQ0FBSixFQUF3QztBQUN0QyxpQkFBS1QsVUFBTCxHQUFrQixDQUFsQjtBQUNBLGlCQUFLVyxVQUFMO0FBQ0Q7QUFDRjtBQVBNLE9BSkg7QUFhTkMsbUJBQWE7QUFDWFQsY0FBTVUsTUFESztBQUVYQyxlQUFPO0FBRkksT0FiUDtBQWlCTjtBQUNBQyxhQUFPO0FBQ0xaLGNBQU1hLE9BREQ7QUFFTEYsZUFBTztBQUZGO0FBbEJELEs7Ozs7OzZCQXVCQztB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ZCxFQUF1QjtBQUNyQmxFLGNBQVFhLEtBQVIsZ0JBQTJCLElBQTNCO0FBQ0EsYUFBTyxDQUFQO0FBQ0Q7QUFDRCxRQUFNdUQsT0FBT0YsUUFBUSxDQUFSLENBQWI7QUFDQSxRQUFNckUsUUFBUXdFLFdBQVcsSUFBWCxDQUFkOztBQUVBLFFBQUlwQixNQUFNLENBQVY7QUFDQSxRQUFJbUIsU0FBUyxLQUFiLEVBQW9CO0FBQ2xCbkIsWUFBTVMsS0FBS1ksS0FBTCxDQUFXekUsUUFBUXFCLE9BQVIsSUFBbUI0QyxTQUFTLENBQTVCLENBQVgsQ0FBTjtBQUNELEtBRkQsTUFFTyxJQUFJTSxTQUFTLElBQWIsRUFBbUI7QUFDeEJuQixZQUFNUyxLQUFLWSxLQUFMLENBQVd6RSxTQUFTaUUsU0FBUyxDQUFsQixDQUFYLENBQU47QUFDRDtBQUNELFdBQU9iLEdBQVA7QUFDRCxHQXRCRDtBQXVCRCIsImZpbGUiOiJwYWludGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgUGVuIGZyb20gJy4vbGliL3Blbic7XHJcbmltcG9ydCBEb3dubG9hZGVyIGZyb20gJy4vbGliL2Rvd25sb2FkZXInO1xyXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi9saWIvdXRpbCcpO1xyXG5jb25zdCBkb3dubG9hZGVyID0gbmV3IERvd25sb2FkZXIoKTtcclxuXHJcbi8vIOacgOWkp+WwneivleeahOe7mOWItuasoeaVsFxyXG5jb25zdCBNQVhfUEFJTlRfQ09VTlQgPSA1O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFpbnRlciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICBjb25maWcgPSB7XHJcbiAgICBjb21wb25lbnQ6IHRydWVcclxuICB9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICBwaWNVUkw6ICcnLFxyXG4gICAgc2hvd0NhbnZhczogdHJ1ZSxcclxuICAgIHBhaW50ZXJTdHlsZTogJycsXHJcbiAgICBjYW52YXNXaWR0aEluUHg6IDAsXHJcbiAgICBjYW52YXNIZWlnaHRJblB4OiAwLFxyXG4gICAgcGFpbnRDb3VudDogMFxyXG4gIH07XHJcbiAgcHJvcHMgPSB7XHJcbiAgICBjdXN0b21TdHlsZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmdcclxuICAgIH0sXHJcbiAgICBwYWxldHRlOiB7XHJcbiAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgb2JzZXJ2ZXI6IGZ1bmN0aW9uKG5ld1ZhbCwgb2xkVmFsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNOZWVkUmVmcmVzaChuZXdWYWwsIG9sZFZhbCkpIHtcclxuICAgICAgICAgIHRoaXMucGFpbnRDb3VudCA9IDA7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0UGFpbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB3aWR0aFBpeGVsczoge1xyXG4gICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgIHZhbHVlOiAwXHJcbiAgICB9LFxyXG4gICAgLy8g5ZCv55So6ISP5qOA5p+l77yM6buY6K6kIGZhbHNlXHJcbiAgICBkaXJ0eToge1xyXG4gICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICB2YWx1ZTogZmFsc2VcclxuICAgIH1cclxuICB9O1xyXG4gIG9uTG9hZCgpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuc2hvd0NhbnZhcyk7XHJcbiAgfVxyXG4gIGlzRW1wdHkob2JqZWN0KSB7XHJcbiAgICBmb3IgKGNvbnN0IGkgaW4gb2JqZWN0KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICBpc05lZWRSZWZyZXNoKG5ld1ZhbCwgb2xkVmFsKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICFuZXdWYWwgfHxcclxuICAgICAgdGhpcy5pc0VtcHR5KG5ld1ZhbCkgfHxcclxuICAgICAgKHRoaXMuZGF0YS5kaXJ0eSAmJiB1dGlsLmVxdWFsKG5ld1ZhbCwgb2xkVmFsKSlcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgc3RhcnRQYWludCgpIHtcclxuICAgIGlmICh0aGlzLmlzRW1wdHkodGhpcy5wcm9wZXJ0aWVzLnBhbGV0dGUpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIShnZXRBcHAoKS5zeXN0ZW1JbmZvICYmIGdldEFwcCgpLnN5c3RlbUluZm8uc2NyZWVuV2lkdGgpKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZ2V0QXBwKCkuc3lzdGVtSW5mbyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zdCBlcnJvciA9IGBQYWludGVyIGdldCBzeXN0ZW0gaW5mbyBmYWlsZWQsICR7SlNPTi5zdHJpbmdpZnkoZSl9YDtcclxuICAgICAgICB0aGF0LnRyaWdnZXJFdmVudCgnaW1nRXJyJywge1xyXG4gICAgICAgICAgZXJyb3I6IGVycm9yXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgc2NyZWVuSyA9IGdldEFwcCgpLnN5c3RlbUluZm8uc2NyZWVuV2lkdGggLyA3NTA7XHJcbiAgICBzZXRTdHJpbmdQcm90b3R5cGUoc2NyZWVuSywgMSk7XHJcblxyXG4gICAgdGhpcy5kb3dubG9hZEltYWdlcygpLnRoZW4ocGFsZXR0ZSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gcGFsZXR0ZTtcclxuXHJcbiAgICAgIGlmICghd2lkdGggfHwgIWhlaWdodCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICBgWW91IHNob3VsZCBzZXQgd2lkdGggYW5kIGhlaWdodCBjb3JyZWN0bHkgZm9yIHBhaW50ZXIsIHdpZHRoOiAke3dpZHRofSwgaGVpZ2h0OiAke2hlaWdodH1gXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jYW52YXNXaWR0aEluUHggPSB3aWR0aC50b1B4KCk7XHJcbiAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMud2lkdGhQaXhlbHMpIHtcclxuICAgICAgICAvLyDlpoLmnpzph43mlrDorr7nva7ov4flg4/ntKDlrr3luqbvvIzliJnph43mlrDorr7nva7mr5TkvotcclxuICAgICAgICBzZXRTdHJpbmdQcm90b3R5cGUoXHJcbiAgICAgICAgICBzY3JlZW5LLFxyXG4gICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLndpZHRoUGl4ZWxzIC8gdGhpcy5jYW52YXNXaWR0aEluUHhcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuY2FudmFzV2lkdGhJblB4ID0gdGhpcy5wcm9wZXJ0aWVzLndpZHRoUGl4ZWxzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmNhbnZhc0hlaWdodEluUHggPSBoZWlnaHQudG9QeCgpO1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIHBhaW50ZXJTdHlsZTogYHdpZHRoOiR7dGhpcy5jYW52YXNXaWR0aEluUHh9cHg7aGVpZ2h0OiR7XHJcbiAgICAgICAgICB0aGlzLmNhbnZhc0hlaWdodEluUHhcclxuICAgICAgICB9cHg7YFxyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgY3R4ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCgnay1jYW52YXMnLCB0aGlzKTtcclxuICAgICAgY29uc3QgcGVuID0gbmV3IFBlbihjdHgsIHBhbGV0dGUpO1xyXG4gICAgICBwZW4ucGFpbnQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2F2ZUltZ1RvTG9jYWwoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgZG93bmxvYWRJbWFnZXMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBsZXQgcHJlQ291bnQgPSAwO1xyXG4gICAgICBsZXQgY29tcGxldGVDb3VudCA9IDA7XHJcbiAgICAgIGNvbnN0IHBhbGV0dGVDb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BlcnRpZXMucGFsZXR0ZSkpO1xyXG4gICAgICBpZiAocGFsZXR0ZUNvcHkuYmFja2dyb3VuZCkge1xyXG4gICAgICAgIHByZUNvdW50Kys7XHJcbiAgICAgICAgZG93bmxvYWRlci5kb3dubG9hZChwYWxldHRlQ29weS5iYWNrZ3JvdW5kKS50aGVuKFxyXG4gICAgICAgICAgcGF0aCA9PiB7XHJcbiAgICAgICAgICAgIHBhbGV0dGVDb3B5LmJhY2tncm91bmQgPSBwYXRoO1xyXG4gICAgICAgICAgICBjb21wbGV0ZUNvdW50Kys7XHJcbiAgICAgICAgICAgIGlmIChwcmVDb3VudCA9PT0gY29tcGxldGVDb3VudCkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUocGFsZXR0ZUNvcHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb21wbGV0ZUNvdW50Kys7XHJcbiAgICAgICAgICAgIGlmIChwcmVDb3VudCA9PT0gY29tcGxldGVDb3VudCkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUocGFsZXR0ZUNvcHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocGFsZXR0ZUNvcHkudmlld3MpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHZpZXcgb2YgcGFsZXR0ZUNvcHkudmlld3MpIHtcclxuICAgICAgICAgIGlmICh2aWV3ICYmIHZpZXcudHlwZSA9PT0gJ2ltYWdlJyAmJiB2aWV3LnVybCkge1xyXG4gICAgICAgICAgICBwcmVDb3VudCsrO1xyXG4gICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cclxuICAgICAgICAgICAgZG93bmxvYWRlci5kb3dubG9hZCh2aWV3LnVybCkudGhlbihcclxuICAgICAgICAgICAgICBwYXRoID0+IHtcclxuICAgICAgICAgICAgICAgIHZpZXcudXJsID0gcGF0aDtcclxuICAgICAgICAgICAgICAgIHd4LmdldEltYWdlSW5mbyh7XHJcbiAgICAgICAgICAgICAgICAgIHNyYzogdmlldy51cmwsXHJcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6I635b6X5LiA5LiL5Zu+54mH5L+h5oGv77yM5L6b5ZCO57ut6KOB5YeP5L2/55SoXHJcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zV2lkdGggPSByZXMud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zSGVpZ2h0ID0gcmVzLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgZmFpbDogZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOWbvueJh+Wdj+S6hu+8jOWImeebtOaOpee9ruepuu+8jOmYsuatouWdkeeIueeahCBjYW52YXMg55S75bSp5rqD5LqGXHJcbiAgICAgICAgICAgICAgICAgICAgdmlldy51cmwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgYGdldEltYWdlSW5mbyAke3ZpZXcudXJsfSBmYWlsZWQsICR7SlNPTi5zdHJpbmdpZnkoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgICApfWBcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlQ291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJlQ291bnQgPT09IGNvbXBsZXRlQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocGFsZXR0ZUNvcHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJlQ291bnQgPT09IGNvbXBsZXRlQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzb2x2ZShwYWxldHRlQ29weSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocHJlQ291bnQgPT09IDApIHtcclxuICAgICAgICByZXNvbHZlKHBhbGV0dGVDb3B5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHNhdmVJbWdUb0xvY2FsKCkge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgd3guY2FudmFzVG9UZW1wRmlsZVBhdGgoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY2FudmFzSWQ6ICdrLWNhbnZhcycsXHJcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgdGhhdC5nZXRJbWFnZUluZm8ocmVzLnRlbXBGaWxlUGF0aCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICAgICAgICBgY2FudmFzVG9UZW1wRmlsZVBhdGggZmFpbGVkLCAke0pTT04uc3RyaW5naWZ5KGVycm9yKX1gXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlckV2ZW50KCdpbWdFcnInLCB7XHJcbiAgICAgICAgICAgICAgZXJyb3I6IGVycm9yXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGhpc1xyXG4gICAgICApO1xyXG4gICAgfSwgMzAwKTtcclxuICB9XHJcbiAgZ2V0SW1hZ2VJbmZvKGZpbGVQYXRoKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIHd4LmdldEltYWdlSW5mbyh7XHJcbiAgICAgIHNyYzogZmlsZVBhdGgsXHJcbiAgICAgIHN1Y2Nlc3M6IGluZm9SZXMgPT4ge1xyXG4gICAgICAgIGlmICh0aGF0LnBhaW50Q291bnQgPiBNQVhfUEFJTlRfQ09VTlQpIHtcclxuICAgICAgICAgIGNvbnN0IGVycm9yID0gYFRoZSByZXN1bHQgaXMgYWx3YXlzIGZhdWx0LCBldmVuIHdlIHRyaWVkICR7TUFYX1BBSU5UX0NPVU5UfSB0aW1lc2A7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgIHRoYXQudHJpZ2dlckV2ZW50KCdpbWdFcnInLCB7XHJcbiAgICAgICAgICAgIGVycm9yOiBlcnJvclxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOavlOS+i+ebuOespuaXtuaJjeivgeaYjue7mOWItuaIkOWKn++8jOWQpuWImei/m+ihjOW8uuWItumHjee7mOWItlxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIE1hdGguYWJzKFxyXG4gICAgICAgICAgICAoaW5mb1Jlcy53aWR0aCAqIHRoYXQuY2FudmFzSGVpZ2h0SW5QeCAtXHJcbiAgICAgICAgICAgICAgdGhhdC5jYW52YXNXaWR0aEluUHggKiBpbmZvUmVzLmhlaWdodCkgL1xyXG4gICAgICAgICAgICAgIChpbmZvUmVzLmhlaWdodCAqIHRoYXQuY2FudmFzSGVpZ2h0SW5QeClcclxuICAgICAgICAgICkgPCAwLjAxXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGF0LnRyaWdnZXJFdmVudCgnaW1nT0snLCB7XHJcbiAgICAgICAgICAgIHBhdGg6IGZpbGVQYXRoXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhhdC5zdGFydFBhaW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQucGFpbnRDb3VudCsrO1xyXG4gICAgICB9LFxyXG4gICAgICBmYWlsOiBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgZ2V0SW1hZ2VJbmZvIGZhaWxlZCwgJHtKU09OLnN0cmluZ2lmeShlcnJvcil9YCk7XHJcbiAgICAgICAgdGhhdC50cmlnZ2VyRXZlbnQoJ2ltZ0VycicsIHtcclxuICAgICAgICAgIGVycm9yOiBlcnJvclxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFN0cmluZ1Byb3RvdHlwZShzY3JlZW5LLCBzY2FsZSkge1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWV4dGVuZC1uYXRpdmUgKi9cclxuICAvKipcclxuICAgKiDmmK/lkKbmlK/mjIHotJ/mlbBcclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG1pbnVzIOaYr+WQpuaUr+aMgei0n+aVsFxyXG4gICAqL1xyXG4gIFN0cmluZy5wcm90b3R5cGUudG9QeCA9IGZ1bmN0aW9uIHRvUHgobWludXMpIHtcclxuICAgIGxldCByZWc7XHJcbiAgICBpZiAobWludXMpIHtcclxuICAgICAgcmVnID0gL14tP1swLTldKyhbLl17MX1bMC05XSspezAsMX0ocnB4fHB4KSQvZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlZyA9IC9eWzAtOV0rKFsuXXsxfVswLTldKyl7MCwxfShycHh8cHgpJC9nO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzdWx0cyA9IHJlZy5leGVjKHRoaXMpO1xyXG4gICAgaWYgKCF0aGlzIHx8ICFyZXN1bHRzKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFRoZSBzaXplOiAke3RoaXN9IGlzIGlsbGVnYWxgKTtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBjb25zdCB1bml0ID0gcmVzdWx0c1syXTtcclxuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdCh0aGlzKTtcclxuXHJcbiAgICBsZXQgcmVzID0gMDtcclxuICAgIGlmICh1bml0ID09PSAncnB4Jykge1xyXG4gICAgICByZXMgPSBNYXRoLnJvdW5kKHZhbHVlICogc2NyZWVuSyAqIChzY2FsZSB8fCAxKSk7XHJcbiAgICB9IGVsc2UgaWYgKHVuaXQgPT09ICdweCcpIHtcclxuICAgICAgcmVzID0gTWF0aC5yb3VuZCh2YWx1ZSAqIChzY2FsZSB8fCAxKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH07XHJcbn1cclxuIl19