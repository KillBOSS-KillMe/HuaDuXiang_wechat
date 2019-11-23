'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var api = require('./api.js');

var AJAX = function () {
  function AJAX() {
    _classCallCheck(this, AJAX);

    this.ajax = this.ajax.bind(this);
  }

  _createClass(AJAX, [{
    key: 'ajax',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var key, res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                key = wx.getStorageSync('user').token;

                e.icon !== 'none' && _wepy2.default.showLoading({
                  title: "加载中"
                });
                _context.next = 4;
                return _wepy2.default.request({
                  url: e.url + '&key=' + key,
                  data: Object.assign({
                    key: key
                  }, e.data),
                  header: e.header || {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  method: e.type || "POST",
                  dataType: e.dataType || "json",
                  responseType: e.responseType || "text"
                }).catch(function (err) {
                  console.warn(err, '&#x53EA;&#x6709;&#x548C;&#x6211;&#x4E0A;&#x5E1D;&#x80FD;&#x770B;&#x61C2;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x6DF1;&#x5751;&#x8BEF;&#x78B0;&#xFF01;1571648153670');
                  _wepy2.default.hideLoading();
                });

              case 4:
                res = _context.sent;

                _wepy2.default.hideLoading();
                return _context.abrupt('return', res.data.code == 400 && res.data.login == 0 ? this.login(e) : res.data);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function ajax(_x) {
        return _ref.apply(this, arguments);
      }

      return ajax;
    }()
  }, {
    key: 'login',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
        var e, res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _wepy2.default.login();

              case 2:
                e = _context2.sent;
                _context2.next = 5;
                return this.ajax({
                  url: api.getToken,
                  data: {
                    code: e.code,
                    icon: 'none'
                  }
                });

              case 5:
                res = _context2.sent;

                if (!(res.code == 200 && res.datas.state == 1)) {
                  _context2.next = 11;
                  break;
                }

                wx.setStorageSync('user', res.datas);
                _context2.next = 10;
                return this.ajax(data);

              case 10:
                return _context2.abrupt('return', _context2.sent);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function login(_x2) {
        return _ref2.apply(this, arguments);
      }

      return login;
    }()
  }]);

  return AJAX;
}();

module.exports = new AJAX();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIkFKQVgiLCJhamF4IiwiYmluZCIsImUiLCJrZXkiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwidG9rZW4iLCJpY29uIiwid2VweSIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJyZXF1ZXN0IiwidXJsIiwiZGF0YSIsIk9iamVjdCIsImFzc2lnbiIsImhlYWRlciIsIm1ldGhvZCIsInR5cGUiLCJkYXRhVHlwZSIsInJlc3BvbnNlVHlwZSIsImNhdGNoIiwiY29uc29sZSIsIndhcm4iLCJlcnIiLCJoaWRlTG9hZGluZyIsInJlcyIsImNvZGUiLCJsb2dpbiIsImdldFRva2VuIiwiZGF0YXMiLCJzdGF0ZSIsInNldFN0b3JhZ2VTeW5jIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUNBOzs7Ozs7Ozs7O0FBQ0EsSUFBSUEsTUFBTUMsUUFBUSxVQUFSLENBQVY7O0lBQ01DLEk7QUFDSixrQkFBYztBQUFBOztBQUNaLFNBQUtDLElBQUwsR0FBWSxLQUFLQSxJQUFMLENBQVVDLElBQVYsQ0FBZSxJQUFmLENBQVo7QUFDRDs7Ozs7MEZBQ1VDLEM7Ozs7OztBQUNMQyxtQixHQUFNQyxHQUFHQyxjQUFILENBQWtCLE1BQWxCLEVBQTBCQyxLOztBQUNwQ0osa0JBQUVLLElBQUYsS0FBVyxNQUFYLElBQXFCQyxlQUFLQyxXQUFMLENBQWlCO0FBQ3BDQyx5QkFBTztBQUQ2QixpQkFBakIsQ0FBckI7O3VCQUdnQkYsZUFBS0csT0FBTCxDQUFhO0FBQzNCQyx1QkFBS1YsRUFBRVUsR0FBRixHQUFRLE9BQVIsR0FBa0JULEdBREk7QUFFM0JVLHdCQUFNQyxPQUFPQyxNQUFQLENBQWM7QUFDbEJaLHlCQUFLQTtBQURhLG1CQUFkLEVBRUhELEVBQUVXLElBRkMsQ0FGcUI7QUFLM0JHLDBCQUFRZCxFQUFFYyxNQUFGLElBQVk7QUFDbEIsb0NBQWdCO0FBREUsbUJBTE87QUFRM0JDLDBCQUFRZixFQUFFZ0IsSUFBRixJQUFVLE1BUlM7QUFTM0JDLDRCQUFVakIsRUFBRWlCLFFBQUYsSUFBYyxNQVRHO0FBVTNCQyxnQ0FBY2xCLEVBQUVrQixZQUFGLElBQWtCO0FBVkwsaUJBQWIsRUFXYkMsS0FYYSxDQVdQLGVBQU87QUFDZEMsMEJBQVFDLElBQVIsQ0FBYUMsR0FBYixFQUFrQix1S0FBbEI7QUFDQWhCLGlDQUFLaUIsV0FBTDtBQUNELGlCQWRlLEM7OztBQUFaQyxtQjs7QUFlSmxCLCtCQUFLaUIsV0FBTDtpREFDUUMsSUFBSWIsSUFBSixDQUFTYyxJQUFULElBQWlCLEdBQWpCLElBQXdCRCxJQUFJYixJQUFKLENBQVNlLEtBQVQsSUFBa0IsQ0FBM0MsR0FBZ0QsS0FBS0EsS0FBTCxDQUFXMUIsQ0FBWCxDQUFoRCxHQUFnRXdCLElBQUliLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEZBRWpFQSxJOzs7Ozs7O3VCQUNJTCxlQUFLb0IsS0FBTCxFOzs7QUFBVjFCLGlCOzt1QkFDWSxLQUFLRixJQUFMLENBQVU7QUFDeEJZLHVCQUFLZixJQUFJZ0MsUUFEZTtBQUV4QmhCLHdCQUFNO0FBQ0pjLDBCQUFNekIsRUFBRXlCLElBREo7QUFFSnBCLDBCQUFNO0FBRkY7QUFGa0IsaUJBQVYsQzs7O0FBQVptQixtQjs7c0JBT0FBLElBQUlDLElBQUosSUFBWSxHQUFaLElBQW1CRCxJQUFJSSxLQUFKLENBQVVDLEtBQVYsSUFBbUIsQzs7Ozs7QUFDeEMzQixtQkFBRzRCLGNBQUgsQ0FBa0IsTUFBbEIsRUFBMEJOLElBQUlJLEtBQTlCOzt1QkFDYSxLQUFLOUIsSUFBTCxDQUFVYSxJQUFWLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1uQm9CLE9BQU9DLE9BQVAsR0FBaUIsSUFBSW5DLElBQUosRUFBakIiLCJmaWxlIjoiYWpheC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4vYXBpLmpzJyk7XHJcbmNsYXNzIEFKQVgge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5hamF4ID0gdGhpcy5hamF4LmJpbmQodGhpcylcclxuICB9XHJcbiAgYXN5bmMgYWpheChlKSB7XHJcbiAgICB2YXIga2V5ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXInKS50b2tlblxyXG4gICAgZS5pY29uICE9PSAnbm9uZScgJiYgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgIHRpdGxlOiBcIuWKoOi9veS4rVwiXHJcbiAgICB9KVxyXG4gICAgdmFyIHJlcyA9IGF3YWl0IHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogZS51cmwgKyAnJmtleT0nICsga2V5LFxyXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHtcclxuICAgICAgICBrZXk6IGtleVxyXG4gICAgICB9LCBlLmRhdGEpLFxyXG4gICAgICBoZWFkZXI6IGUuaGVhZGVyIHx8IHtcclxuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuICAgICAgfSxcclxuICAgICAgbWV0aG9kOiBlLnR5cGUgfHwgXCJQT1NUXCIsXHJcbiAgICAgIGRhdGFUeXBlOiBlLmRhdGFUeXBlIHx8IFwianNvblwiLFxyXG4gICAgICByZXNwb25zZVR5cGU6IGUucmVzcG9uc2VUeXBlIHx8IFwidGV4dFwiXHJcbiAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLndhcm4oZXJyLCAnJiN4NTNFQTsmI3g2NzA5OyYjeDU0OEM7JiN4NjIxMTsmI3g0RTBBOyYjeDVFMUQ7JiN4ODBGRDsmI3g3NzBCOyYjeDYxQzI7JiN4OEZEOTsmI3g2QkI1OyYjeDRFRTM7JiN4NzgwMTsmI3hGRjBDOyYjeDZERjE7JiN4NTc1MTsmI3g4QkVGOyYjeDc4QjA7JiN4RkYwMTsxNTcxNjQ4MTUzNjcwJylcclxuICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICB9KVxyXG4gICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICByZXR1cm4gKHJlcy5kYXRhLmNvZGUgPT0gNDAwICYmIHJlcy5kYXRhLmxvZ2luID09IDApID8gdGhpcy5sb2dpbihlKSA6IHJlcy5kYXRhXHJcbiAgfVxyXG4gIGFzeW5jIGxvZ2luKGRhdGEpIHtcclxuICAgIHZhciBlID0gYXdhaXQgd2VweS5sb2dpbigpO1xyXG4gICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmdldFRva2VuLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgY29kZTogZS5jb2RlLFxyXG4gICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgaWYgKHJlcy5jb2RlID09IDIwMCAmJiByZXMuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlcicsIHJlcy5kYXRhcylcclxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuYWpheChkYXRhKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbmV3IEFKQVgoKSJdfQ==