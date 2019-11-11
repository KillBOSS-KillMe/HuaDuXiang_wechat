'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var api = require('./../api.js');

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '设置'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      requestImgUrl: '',
      cardFlag: false, // 发送验证码锁
      s: 60, // 倒计时
      phone: '',
      code: '',
      password: '',
      type: ''
    }, _this.computed = {}, _this.events = {}, _this.methods = {
      phone: function phone(e) {
        this.phone = e.detail.value;
      },
      code: function code(e) {
        this.code = e.detail.value;
      },
      password: function password(e) {
        this.password = e.detail.value;
      },

      // 点击获取验证码
      cardButton: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var that, resData, s;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  that = this;

                  if (!(this.phone.length != 11)) {
                    _context.next = 4;
                    break;
                  }

                  wx.showToast({
                    title: '请输入正确格式的手机号码',
                    icon: 'none'
                  });
                  return _context.abrupt('return', false);

                case 4:
                  _context.next = 6;
                  return (0, _ajax.ajax)({
                    url: api.sendModifyMobile,
                    data: {
                      mobile: this.phone
                    }
                  });

                case 6:
                  resData = _context.sent;

                  if (resData.datas && resData.datas.state == 1) {
                    wx.showToast({
                      title: resData.datas.msg
                    });
                    s = this.s;

                    this.cardFlag = true;
                    this.timer = setInterval(function () {
                      that.s = --s;
                      that.$apply();
                      if (that.s == 0) {
                        that.s = 60;
                        that.cardFlag = false;
                        that.$apply();
                        clearInterval(that.timer);
                      }
                    }, 1000);
                  } else {
                    wx.showToast({
                      title: resData.msg,
                      icon: 'none'
                    });
                  }

                case 8:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function cardButton() {
          return _ref2.apply(this, arguments);
        }

        return cardButton;
      }(),

      // 点击注册
      accountSubmit: function accountSubmit() {
        if (this.phone.length != 11) {
          wx.showToast({
            title: '请输入正确格式的手机号码',
            icon: 'none'
          });
          return false;
        }
        if (!this.code) {
          wx.showToast({
            title: '请输入验证码',
            icon: 'none'
          });
          return false;
        }
        if (this.password.length != 6) {
          wx.showToast({
            title: '请输入正确格式密码',
            icon: 'none'
          });
          return false;
        }
        (0, _ajax.ajax)({
          url: api.setPassword,
          data: {
            password: this.password,
            mobile: this.phone,
            vcode: this.code
          }
        }).then(function (res) {
          if (res.datas.state == 1) {
            wx.showToast({
              title: res.datas.msg
            });
            var timer = setTimeout(function () {
              wx.navigateBack();
              clearTimeout(timer);
            }, 2000);
          } else {
            wx.showToast({
              title: res.datas.msg,
              icon: 'none'
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      console.log(options);
      this.type = options.type;
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/set-up'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldC11cC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwiY2FyZEZsYWciLCJzIiwicGhvbmUiLCJjb2RlIiwicGFzc3dvcmQiLCJ0eXBlIiwiY29tcHV0ZWQiLCJldmVudHMiLCJtZXRob2RzIiwiZSIsImRldGFpbCIsInZhbHVlIiwiY2FyZEJ1dHRvbiIsInRoYXQiLCJsZW5ndGgiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsInVybCIsInNlbmRNb2RpZnlNb2JpbGUiLCJtb2JpbGUiLCJyZXNEYXRhIiwiZGF0YXMiLCJzdGF0ZSIsIm1zZyIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCIkYXBwbHkiLCJjbGVhckludGVydmFsIiwiYWNjb3VudFN1Ym1pdCIsInNldFBhc3N3b3JkIiwidmNvZGUiLCJ0aGVuIiwicmVzIiwic2V0VGltZW91dCIsIm5hdmlnYXRlQmFjayIsImNsZWFyVGltZW91dCIsIm9wdGlvbnMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNvbnNvbGUiLCJsb2ciLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBR3FCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDSEMscUJBQWUsRUFEWjtBQUVIQyxnQkFBVSxLQUZQLEVBRWM7QUFDakJDLFNBQUcsRUFIQSxFQUdJO0FBQ1BDLGFBQU8sRUFKSjtBQUtIQyxZQUFNLEVBTEg7QUFNSEMsZ0JBQVUsRUFOUDtBQU9IQyxZQUFNO0FBUEgsSyxRQVVMQyxRLEdBQVcs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ZUFBTztBQUNiLGNBQUdDLElBQUlYLEtBQUosQ0FBVUMsS0FBVixJQUFtQixDQUF0QixFQUF5QjtBQUN2QlQsZUFBR0MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPaUIsSUFBSVgsS0FBSixDQUFVRTtBQUROLGFBQWI7QUFHQSxnQkFBSUMsUUFBU1MsV0FBVyxZQUFNO0FBQzVCcEIsaUJBQUdxQixZQUFIO0FBQ0FDLDJCQUFhWCxLQUFiO0FBQ0QsYUFIWSxFQUdWLElBSFUsQ0FBYjtBQUlELFdBUkQsTUFRTztBQUNMWCxlQUFHQyxTQUFILENBQWE7QUFDWEMscUJBQU9pQixJQUFJWCxLQUFKLENBQVVFLEdBRE47QUFFWFAsb0JBQU07QUFGSyxhQUFiO0FBSUQ7QUFDRixTQXRCRDtBQXVCRDtBQWhHTyxLOzs7OzsyQkFQSG9CLE8sRUFBUztBQUNaLFdBQUt2QyxhQUFMLEdBQXFCLEtBQUt3QyxPQUFMLENBQWFDLFVBQWIsQ0FBd0J6QyxhQUE3QztBQUNBMEMsY0FBUUMsR0FBUixDQUFZSixPQUFaO0FBQ0EsV0FBS2pDLElBQUwsR0FBWWlDLFFBQVFqQyxJQUFwQjtBQUNIOzs7NkJBQ1EsQ0FDUjs7OztFQTdCOEJzQyxlQUFLQyxJOztrQkFBbkJuRCxLIiwiZmlsZSI6InNldC11cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuvue9ridcclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgICBjYXJkRmxhZzogZmFsc2UsIC8vIOWPkemAgemqjOivgeeggemUgVxyXG4gICAgICBzOiA2MCwgLy8g5YCS6K6h5pe2XHJcbiAgICAgIHBob25lOiAnJyxcclxuICAgICAgY29kZTogJycsXHJcbiAgICAgIHBhc3N3b3JkOiAnJyxcclxuICAgICAgdHlwZTogJycsXHJcbiAgfTtcclxuXHJcbiAgICBjb21wdXRlZCA9IHt9O1xyXG5cclxuXHJcbiAgICBldmVudHMgPSB7fTtcclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICAgICAgY29uc29sZS5sb2cob3B0aW9ucylcclxuICAgICAgICB0aGlzLnR5cGUgPSBvcHRpb25zLnR5cGVcclxuICAgIH1cclxuICAgIG9uU2hvdygpIHtcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIHBob25lKGUpIHtcclxuICAgICAgICB0aGlzLnBob25lID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSxcclxuICAgICAgY29kZShlKSB7XHJcbiAgICAgICAgdGhpcy5jb2RlID0gIGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhc3N3b3JkKGUpIHtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gIGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0sXHJcbiAgICAgICAvLyDngrnlh7vojrflj5bpqozor4HnoIFcclxuICAgICAgYXN5bmMgY2FyZEJ1dHRvbigpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICAgIGlmKHRoaXMucGhvbmUubGVuZ3RoICE9IDExKSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeato+ehruagvOW8j+eahOaJi+acuuWPt+eggScsXHJcbiAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgcmVzRGF0YSA9IGF3YWl0IGFqYXgoe1xyXG4gICAgICAgICAgdXJsOiBhcGkuc2VuZE1vZGlmeU1vYmlsZSxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgbW9iaWxlOiB0aGlzLnBob25lXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZihyZXNEYXRhLmRhdGFzICYmIHJlc0RhdGEuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6IHJlc0RhdGEuZGF0YXMubXNnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgdmFyIHMgPSB0aGlzLnNcclxuICAgICAgICAgIHRoaXMuY2FyZEZsYWcgPSB0cnVlXHJcbiAgICAgICAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGF0LnMgPSAtLXNcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICAgICAgICBpZiAodGhhdC5zID09IDApIHtcclxuICAgICAgICAgICAgICB0aGF0LnMgPSA2MFxyXG4gICAgICAgICAgICAgIHRoYXQuY2FyZEZsYWcgPSBmYWxzZVxyXG4gICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcclxuICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoYXQudGltZXIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiByZXNEYXRhLm1zZyxcclxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgLy8g54K55Ye75rOo5YaMXHJcbiAgICAgIGFjY291bnRTdWJtaXQoKXtcclxuICAgICAgICBpZih0aGlzLnBob25lLmxlbmd0aCAhPSAxMSkge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXmraPnoa7moLzlvI/nmoTmiYvmnLrlj7fnoIEnLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMuY29kZSkge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXpqozor4HnoIEnLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5wYXNzd29yZC5sZW5ndGggIT0gNikge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXmraPnoa7moLzlvI/lr4bnoIEnLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgYWpheCh7XHJcbiAgICAgICAgICB1cmw6IGFwaS5zZXRQYXNzd29yZCxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXHJcbiAgICAgICAgICAgIG1vYmlsZTogdGhpcy5waG9uZSxcclxuICAgICAgICAgICAgdmNvZGU6IHRoaXMuY29kZSxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICBpZihyZXMuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMubXNnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHZhciB0aW1lciA9ICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcclxuICAgICAgICAgICAgfSwgMjAwMClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5tc2csXHJcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuIl19