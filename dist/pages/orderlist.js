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

var ShopCart = function (_wepy$page) {
  _inherits(ShopCart, _wepy$page);

  function ShopCart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ShopCart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShopCart.__proto__ || Object.getPrototypeOf(ShopCart)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '订单列表'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      navArr: [{ title: '全部', id: 0 }, { title: '待付款' }, { title: '待发货' }, { title: '待收货' }, { title: '已完成' }],
      navIdx: 0,
      orderList: [],
      state_arr: ['', 'state_new', 'state_pay', 'state_send', 'state_noeval'],
      curpage: 1,
      hasmore: false,
      page_total: ''
    }, _this.computed = {}, _this.methods = {
      orderCancel: function orderCancel(order_id, index) {
        var that = this;
        wx.showModal({
          title: '确认取消订单?',
          success: function success(res) {
            if (res.confirm) {
              (0, _ajax.ajax)({
                url: api.orderCancel,
                data: {
                  order_id: order_id
                }
              }).then(function (e) {
                if (e.datas.state == 1) {
                  wx.showToast({
                    title: e.datas.msg
                  });
                  that.orderList[index].order_state = e.datas.order_state;
                  that.$apply();
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
      orderDelete: function orderDelete(order_id, index) {
        var that = this;
        wx.showModal({
          title: '确认删除订单?',
          success: function success(res) {
            if (res.confirm) {
              (0, _ajax.ajax)({
                url: api.orderDelete,
                data: {
                  order_id: order_id
                }
              }).then(function (e) {
                if (e.datas.state == 1) {
                  wx.showToast({
                    title: e.datas.msg
                  });
                  that.orderList.splice(index, 1);
                  that.$apply();
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
      orderReceive: function orderReceive(order_id, index) {
        var that = this;
        wx.showModal({
          title: '确认收货?',
          success: function success(res) {
            if (res.confirm) {
              (0, _ajax.ajax)({
                url: api.orderReceive,
                data: {
                  order_id: order_id
                }
              }).then(function (e) {
                if (e.datas.state == 1) {
                  wx.showToast({
                    title: e.datas.msg
                  });
                  that.orderList[index].order_state = e.datas.order_state;
                  that.$apply();
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
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(order_id, index, pay_sn) {
          var resData, api_pay;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _ajax.ajax)({
                    url: api.pay,
                    data: {
                      pay_sn: pay_sn,
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

        function pay(_x, _x2, _x3) {
          return _ref2.apply(this, arguments);
        }

        return pay;
      }(),
      changeNav: function changeNav(idx) {
        if (idx == this.navIdx) return;
        this.navIdx = idx;
        this.hasmore = false;
        this.curpage = 1;
        this.orderList = [];
        this.requestList();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onLoad',
    value: function onLoad(t) {
      this.navIdx = t.idx || 0;
      this.requestList();
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'requestList',
    value: function requestList() {
      var _this2 = this;

      (0, _ajax.ajax)({
        url: api.orderList,
        data: {
          page: 10, // 
          curpage: this.curpage, // 当前页码
          state_type: this.state_arr[this.navIdx]
        }
      }).then(function (res) {
        var order_group_list = res.datas.order_group_list || [];
        var order_list = [];
        order_group_list.forEach(function (item) {
          order_list = order_list.concat(item.order_list);
        });
        _this2.orderList = _this2.orderList.concat(order_list);

        _this2.page_total = res.page_total;
        _this2.hasmore = res.hasmore;
        _this2.$apply();
      });
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.hasmore) {
        this.curpage++;
        this.requestList();
      }
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/orderlist'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVybGlzdC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJuYXZBcnIiLCJ0aXRsZSIsImlkIiwibmF2SWR4Iiwib3JkZXJMaXN0Iiwic3RhdGVfYXJyIiwiY3VycGFnZSIsImhhc21vcmUiLCJwYWdlX3RvdGFsIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwib3JkZXJDYW5jZWwiLCJvcmRlcl9pZCIsImluZGV4IiwidGhhdCIsInd4Iiwic2hvd01vZGFsIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJ1cmwiLCJ0aGVuIiwiZSIsImRhdGFzIiwic3RhdGUiLCJzaG93VG9hc3QiLCJtc2ciLCJvcmRlcl9zdGF0ZSIsIiRhcHBseSIsImVycm9yIiwiaWNvbiIsIm9yZGVyRGVsZXRlIiwic3BsaWNlIiwib3JkZXJSZWNlaXZlIiwicGF5IiwicGF5X3NuIiwicGF5bWVudF9jb2RlIiwicmVzRGF0YSIsImFwaV9wYXkiLCJyZXF1ZXN0UGF5bWVudCIsImNvbnNvbGUiLCJsb2ciLCJjb21wbGV0ZSIsImQiLCJjaGFuZ2VOYXYiLCJpZHgiLCJyZXF1ZXN0TGlzdCIsImV2ZW50cyIsInQiLCJwYWdlIiwic3RhdGVfdHlwZSIsIm9yZGVyX2dyb3VwX2xpc3QiLCJvcmRlcl9saXN0IiwiZm9yRWFjaCIsImNvbmNhdCIsIml0ZW0iLCJ3ZXB5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUlxQkMsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGNBQVEsQ0FDTixFQUFFQyxPQUFPLElBQVQs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UixFQUFpQjtBQUNmLGFBQUtELE9BQUw7QUFDQSxhQUFLd0MsV0FBTDtBQUNEO0FBQ0Y7Ozs7RUFoTG1DVSxlQUFLUCxJOztrQkFBdEJ2RCxRIiwiZmlsZSI6Im9yZGVybGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXliJfooagnXHJcbiAgfTtcclxuXHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIG5hdkFycjogW1xyXG4gICAgICB7IHRpdGxlOiAn5YWo6YOoJywgaWQ6IDAgfSxcclxuICAgICAgeyB0aXRsZTogJ+W+heS7mOasvicgfSxcclxuICAgICAgeyB0aXRsZTogJ+W+heWPkei0pycgfSxcclxuICAgICAgeyB0aXRsZTogJ+W+heaUtui0pycgfSxcclxuICAgICAgeyB0aXRsZTogJ+W3suWujOaIkCcgfVxyXG4gICAgXSxcclxuICAgIG5hdklkeDogMCxcclxuICAgIG9yZGVyTGlzdDogW10sXHJcbiAgICBzdGF0ZV9hcnI6WycnLCdzdGF0ZV9uZXcnLCdzdGF0ZV9wYXknLCdzdGF0ZV9zZW5kJywnc3RhdGVfbm9ldmFsJ10gLFxyXG4gICAgY3VycGFnZTogMSxcclxuICAgIGhhc21vcmU6IGZhbHNlLFxyXG4gICAgcGFnZV90b3RhbDogJycsXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIG9yZGVyQ2FuY2VsKG9yZGVyX2lkLCBpbmRleCl7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn56Gu6K6k5Y+W5raI6K6i5Y2VPycsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIGlmKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgICAgIHVybDogYXBpLm9yZGVyQ2FuY2VsLFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9yZGVyX2lkXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKGUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKGUuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMubXNnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhhdC5vcmRlckxpc3RbaW5kZXhdLm9yZGVyX3N0YXRlID0gZS5kYXRhcy5vcmRlcl9zdGF0ZVxyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5lcnJvcixcclxuICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgb3JkZXJEZWxldGUob3JkZXJfaWQsIGluZGV4KXtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfnoa7orqTliKDpmaTorqLljZU/JyxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgaWYocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgYWpheCh7XHJcbiAgICAgICAgICAgICAgdXJsOiBhcGkub3JkZXJEZWxldGUsXHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJfaWRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYoZS5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5tc2dcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm9yZGVyTGlzdC5zcGxpY2UoaW5kZXgsMSlcclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMuZXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIG9yZGVyUmVjZWl2ZShvcmRlcl9pZCwgaW5kZXgpe1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+ehruiupOaUtui0pz8nLFxyXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICBpZihyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICBhamF4KHtcclxuICAgICAgICAgICAgICB1cmw6IGFwaS5vcmRlclJlY2VpdmUsXHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJfaWRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYoZS5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5tc2dcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm9yZGVyTGlzdFtpbmRleF0ub3JkZXJfc3RhdGUgPSBlLmRhdGFzLm9yZGVyX3N0YXRlXHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLmRhdGFzLmVycm9yLFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhc3luYyBwYXkob3JkZXJfaWQsIGluZGV4LCBwYXlfc24pIHtcclxuICAgICAgdmFyIHJlc0RhdGEgPSBhd2FpdCBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5wYXksXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGF5X3NuOiBwYXlfc24sXHJcbiAgICAgICAgICBwYXltZW50X2NvZGU6ICdtaW5pX3d4cGF5J1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIGlmKHJlc0RhdGEuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgIHZhciBhcGlfcGF5ID0gcmVzRGF0YS5kYXRhcy5hcGlfcGF5XHJcbiAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xyXG4gICAgICAgICAgLi4uYXBpX3BheSxcclxuICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjb21wbGV0ZShkKSB7Y29uc29sZS5sb2coZCl9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNoYW5nZU5hdihpZHgpIHtcclxuICAgICAgaWYoaWR4ID09IHRoaXMubmF2SWR4KSByZXR1cm5cclxuICAgICAgdGhpcy5uYXZJZHggPSBpZHhcclxuICAgICAgdGhpcy5oYXNtb3JlID0gZmFsc2VcclxuICAgICAgdGhpcy5jdXJwYWdlID0gMVxyXG4gICAgICB0aGlzLm9yZGVyTGlzdCA9IFtdXHJcbiAgICAgIHRoaXMucmVxdWVzdExpc3QoKVxyXG4gICAgfVxyXG4gIH07XHJcbiAgb25Mb2FkKHQpIHtcclxuICAgIHRoaXMubmF2SWR4ID0gdC5pZHggfHwgMFxyXG4gICAgdGhpcy5yZXF1ZXN0TGlzdCgpXHJcbiAgfVxyXG4gIG9uU2hvdygpIHtcclxuICB9XHJcbiAgcmVxdWVzdExpc3QoKXtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5vcmRlckxpc3QsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBwYWdlOiAxMCwgLy8gXHJcbiAgICAgICAgY3VycGFnZTogdGhpcy5jdXJwYWdlLCAgLy8g5b2T5YmN6aG156CBXHJcbiAgICAgICAgc3RhdGVfdHlwZTogdGhpcy5zdGF0ZV9hcnJbdGhpcy5uYXZJZHhdXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdmFyIG9yZGVyX2dyb3VwX2xpc3QgPSByZXMuZGF0YXMub3JkZXJfZ3JvdXBfbGlzdCB8fCBbXVxyXG4gICAgICB2YXIgb3JkZXJfbGlzdCA9IFtdXHJcbiAgICAgIG9yZGVyX2dyb3VwX2xpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBvcmRlcl9saXN0ID0gb3JkZXJfbGlzdC5jb25jYXQoaXRlbS5vcmRlcl9saXN0KVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLm9yZGVyTGlzdCA9IHRoaXMub3JkZXJMaXN0LmNvbmNhdChvcmRlcl9saXN0KVxyXG5cclxuICAgICAgdGhpcy5wYWdlX3RvdGFsID0gcmVzLnBhZ2VfdG90YWxcclxuICAgICAgdGhpcy5oYXNtb3JlID0gcmVzLmhhc21vcmVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgb25SZWFjaEJvdHRvbSAoKSB7XHJcbiAgICBpZih0aGlzLmhhc21vcmUpIHtcclxuICAgICAgdGhpcy5jdXJwYWdlICsrIFxyXG4gICAgICB0aGlzLnJlcXVlc3RMaXN0KClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG59XHJcbiJdfQ==