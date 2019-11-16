'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
      navigationBarTitleText: '订单详情'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      requestImgUrl: '',
      order_info: '',
      goods_price: 0
    }, _this.computed = {}, _this.events = {}, _this.methods = {
      orderCancel: function orderCancel() {
        var that = this;
        wx.showModal({
          title: '确认取消订单?',
          success: function success(res) {
            if (res.confirm) {
              (0, _ajax.ajax)({
                url: api.orderCancel,
                data: {
                  order_id: that.order_id
                }
              }).then(function (e) {
                if (e.datas.state == 1) {
                  wx.showToast({
                    title: e.datas.msg
                  });
                  var timer = setTimeout(function () {
                    wx.navigateBack();
                    clearTimeout(timer);
                  }, 2000);
                } else {
                  wx.showToast({
                    title: e.datas.error,
                    icon: 'none'
                  });
                }
              });
            }
          }
        });
      },
      orderDelete: function orderDelete() {
        var that = this;
        wx.showModal({
          title: '确认删除订单?',
          success: function success(res) {
            if (res.confirm) {
              (0, _ajax.ajax)({
                url: api.orderDelete,
                data: {
                  order_id: that.order_id
                }
              }).then(function (e) {
                if (e.datas.state == 1) {
                  wx.showToast({
                    title: e.datas.msg
                  });
                  var timer = setTimeout(function () {
                    wx.navigateBack();
                    clearTimeout(timer);
                  }, 2000);
                } else {
                  wx.showToast({
                    title: e.datas.error,
                    icon: 'none'
                  });
                }
              });
            }
          }
        });
      },
      orderReceive: function orderReceive() {
        var that = this;
        wx.showModal({
          title: '确认收货?',
          success: function success(res) {
            if (res.confirm) {
              (0, _ajax.ajax)({
                url: api.orderReceive,
                data: {
                  order_id: that.order_id
                }
              }).then(function (e) {
                if (e.datas.state == 1) {
                  wx.showToast({
                    title: e.datas.msg
                  });
                  var timer = setTimeout(function () {
                    wx.navigateBack();
                    clearTimeout(timer);
                  }, 2000);
                } else {
                  wx.showToast({
                    title: e.datas.error,
                    icon: 'none'
                  });
                }
              });
            }
          }
        });
      },
      pay: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var resData, api_pay;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _ajax.ajax)({
                    url: api.pay,
                    data: {
                      pay_sn: '900626631146390007',
                      payment_code: 'mini_wxpay'
                    }
                  });

                case 2:
                  resData = _context.sent;


                  if (resData.datas.state == 1) {
                    api_pay = resData.datas.api_pay;

                    wx.requestPayment(_extends({}, api_pay, {
                      success: function success(res) {
                        console.log(res);
                      },
                      complete: function complete(d) {
                        console.log(d);
                      }
                    }));
                  }

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function pay() {
          return _ref2.apply(this, arguments);
        }

        return pay;
      }(),
      setClipboardData: function setClipboardData(num) {
        wx.setClipboardData({
          data: num
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var _this2 = this;

      this.order_id = options.order_id;
      (0, _ajax.ajax)({
        url: api.orderInfo,
        data: {
          order_id: options.order_id
        }
      }).then(function (res) {
        _this2.order_info = res.datas.order_info;
        var goods_price = res.datas.order_info.goods_list.reduce(function (prev, next) {
          var price = Number(next.goods_price);
          var num = Number(next.goods_num);
          return prev + price * num;
        }, 0);
        _this2.goods_price = goods_price.toFixed(2);

        console.log(res.datas.order_info.if_buyer_cancel);
        _this2.$apply();
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/orderInfo'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVySW5mby5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwib3JkZXJfaW5mbyIsImdvb2RzX3ByaWNlIiwiY29tcHV0ZWQiLCJldmVudHMiLCJtZXRob2RzIiwib3JkZXJDYW5jZWwiLCJ0aGF0Iiwid3giLCJzaG93TW9kYWwiLCJ0aXRsZSIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwidXJsIiwib3JkZXJfaWQiLCJ0aGVuIiwiZSIsImRhdGFzIiwic3RhdGUiLCJzaG93VG9hc3QiLCJtc2ciLCJ0aW1lciIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZUJhY2siLCJjbGVhclRpbWVvdXQiLCJlcnJvciIsImljb24iLCJvcmRlckRlbGV0ZSIsIm9yZGVyUmVjZWl2ZSIsInBheSIsInBheV9zbiIsInBheW1lbnRfY29kZSIsInJlc0RhdGEiLCJhcGlfcGF5IiwicmVxdWVzdFBheW1lbnQiLCJjb25zb2xlIiwibG9nIiwiY29tcGxldGUiLCJkIiwic2V0Q2xpcGJvYXJkRGF0YSIsIm51bSIsIm9wdGlvbnMiLCJvcmRlckluZm8iLCJnb29kc19saXN0IiwicmVkdWNlIiwicHJldiIsIm5leHQiLCJwcmljZSIsIk51bWJlciIsImdvb2RzX251bSIsInRvRml4ZWQiLCJpZl9idXllcl9jYW5jZWwiLCIkYXBwbHkiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUdxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxH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ZUFBS2YsVUFBTCxHQUFrQlcsSUFBSU0sS0FBSixDQUFVakIsVUFBNUI7QUFDQSxZQUFJQyxjQUFjVSxJQUFJTSxLQUFKLENBQVVqQixVQUFWLENBQXFCMkMsVUFBckIsQ0FBZ0NDLE1BQWhDLENBQXVDLFVBQUNDLElBQUQsRUFBT0MsSUFBUCxFQUFnQjtBQUN2RSxjQUFJQyxRQUFRQyxPQUFPRixLQUFLN0MsV0FBWixDQUFaO0FBQ0EsY0FBSXVDLE1BQU1RLE9BQU9GLEtBQUtHLFNBQVosQ0FBVjtBQUNBLGlCQUFPSixPQUFPRSxRQUFNUCxHQUFwQjtBQUNELFNBSmlCLEVBSWYsQ0FKZSxDQUFsQjtBQUtBLGVBQUt2QyxXQUFMLEdBQW1CQSxZQUFZaUQsT0FBWixDQUFvQixDQUFwQixDQUFuQjs7QUFFQWYsZ0JBQVFDLEdBQVIsQ0FBWXpCLElBQUlNLEtBQUosQ0FBVWpCLFVBQVYsQ0FBcUJtRCxlQUFqQztBQUNBLGVBQUtDLE1BQUw7QUFDRCxPQWhCRDtBQWlCRDs7OzZCQUNRO0FBQ1AsV0FBS3JELGFBQUwsR0FBcUIsS0FBS3NELE9BQUwsQ0FBYUMsVUFBYixDQUF3QnZELGFBQTdDO0FBQ0Q7Ozs7RUF4Q2dDd0QsZUFBS0MsSTs7a0JBQW5CL0QsSyIsImZpbGUiOiJvcmRlckluZm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXor6bmg4UnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBvcmRlcl9pbmZvOiAnJyxcclxuICAgIGdvb2RzX3ByaWNlOiAwLFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgdGhpcy5vcmRlcl9pZCA9IG9wdGlvbnMub3JkZXJfaWRcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5vcmRlckluZm8sXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBvcmRlcl9pZDogb3B0aW9ucy5vcmRlcl9pZFxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMub3JkZXJfaW5mbyA9IHJlcy5kYXRhcy5vcmRlcl9pbmZvXHJcbiAgICAgIHZhciBnb29kc19wcmljZSA9IHJlcy5kYXRhcy5vcmRlcl9pbmZvLmdvb2RzX2xpc3QucmVkdWNlKChwcmV2LCBuZXh0KSA9PiB7XHJcbiAgICAgICAgdmFyIHByaWNlID0gTnVtYmVyKG5leHQuZ29vZHNfcHJpY2UpXHJcbiAgICAgICAgdmFyIG51bSA9IE51bWJlcihuZXh0Lmdvb2RzX251bSlcclxuICAgICAgICByZXR1cm4gcHJldiArIHByaWNlKm51bVxyXG4gICAgICB9LCAwKVxyXG4gICAgICB0aGlzLmdvb2RzX3ByaWNlID0gZ29vZHNfcHJpY2UudG9GaXhlZCgyKVxyXG5cclxuICAgICAgY29uc29sZS5sb2cocmVzLmRhdGFzLm9yZGVyX2luZm8uaWZfYnV5ZXJfY2FuY2VsKVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgb3JkZXJDYW5jZWwoKXtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfnoa7orqTlj5bmtojorqLljZU/JyxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgaWYocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgYWpheCh7XHJcbiAgICAgICAgICAgICAgdXJsOiBhcGkub3JkZXJDYW5jZWwsXHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJfaWQ6IHRoYXQub3JkZXJfaWRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYoZS5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5tc2dcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcclxuICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxyXG4gICAgICAgICAgICAgICAgfSwgMjAwMClcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMuZXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIG9yZGVyRGVsZXRlKCl7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn56Gu6K6k5Yig6Zmk6K6i5Y2VPycsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIGlmKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgICAgIHVybDogYXBpLm9yZGVyRGVsZXRlLFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9yZGVyX2lkOiB0aGF0Lm9yZGVyX2lkXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKGUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKGUuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMubXNnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcclxuICAgICAgICAgICAgICAgIH0sIDIwMDApXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLmRhdGFzLmVycm9yLFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBvcmRlclJlY2VpdmUoKXtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfnoa7orqTmlLbotKc/JyxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgaWYocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgYWpheCh7XHJcbiAgICAgICAgICAgICAgdXJsOiBhcGkub3JkZXJSZWNlaXZlLFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9yZGVyX2lkOiB0aGF0Lm9yZGVyX2lkXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKGUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKGUuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMubXNnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcclxuICAgICAgICAgICAgICAgIH0sIDIwMDApXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLmRhdGFzLmVycm9yLFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhc3luYyBwYXkoKSB7XHJcbiAgICAgIHZhciByZXNEYXRhID0gYXdhaXQgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkucGF5LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHBheV9zbjogJzkwMDYyNjYzMTE0NjM5MDAwNycsXHJcbiAgICAgICAgICBwYXltZW50X2NvZGU6ICdtaW5pX3d4cGF5J1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIGlmKHJlc0RhdGEuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgIHZhciBhcGlfcGF5ID0gcmVzRGF0YS5kYXRhcy5hcGlfcGF5XHJcbiAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xyXG4gICAgICAgICAgLi4uYXBpX3BheSxcclxuICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjb21wbGV0ZShkKSB7Y29uc29sZS5sb2coZCl9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNldENsaXBib2FyZERhdGEobnVtKSB7XHJcbiAgICAgIHd4LnNldENsaXBib2FyZERhdGEoe1xyXG4gICAgICAgIGRhdGE6IG51bVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIl19