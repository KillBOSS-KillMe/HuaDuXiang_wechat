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
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(order_id, index) {
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

        function pay(_x, _x2) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVybGlzdC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJuYXZBcnIiLCJ0aXRsZSIsImlkIiwibmF2SWR4Iiwib3JkZXJMaXN0Iiwic3RhdGVfYXJyIiwiY3VycGFnZSIsImhhc21vcmUiLCJwYWdlX3RvdGFsIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwib3JkZXJDYW5jZWwiLCJvcmRlcl9pZCIsImluZGV4IiwidGhhdCIsInd4Iiwic2hvd01vZGFsIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJ1cmwiLCJ0aGVuIiwiZSIsImRhdGFzIiwic3RhdGUiLCJzaG93VG9hc3QiLCJtc2ciLCJvcmRlcl9zdGF0ZSIsIiRhcHBseSIsImVycm9yIiwiaWNvbiIsIm9yZGVyRGVsZXRlIiwic3BsaWNlIiwib3JkZXJSZWNlaXZlIiwicGF5IiwicGF5X3NuIiwicGF5bWVudF9jb2RlIiwicmVzRGF0YSIsImFwaV9wYXkiLCJyZXF1ZXN0UGF5bWVudCIsImNvbnNvbGUiLCJsb2ciLCJjb21wbGV0ZSIsImQiLCJjaGFuZ2VOYXYiLCJpZHgiLCJyZXF1ZXN0TGlzdCIsImV2ZW50cyIsInQiLCJwYWdlIiwic3RhdGVfdHlwZSIsIm9yZGVyX2dyb3VwX2xpc3QiLCJvcmRlcl9saXN0IiwiZm9yRWFjaCIsImNvbmNhdCIsIml0ZW0iLCJ3ZXB5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUlxQkMsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGNBQVEsQ0FDTixFQUFFQyxPQUFPLElBQVQs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S0QsT0FBTDtBQUNBLGFBQUt3QyxXQUFMO0FBQ0Q7QUFDRjs7OztFQWhMbUNVLGVBQUtQLEk7O2tCQUF0QnZELFEiLCJmaWxlIjoib3JkZXJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleWIl+ihqCdcclxuICB9O1xyXG5cclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgbmF2QXJyOiBbXHJcbiAgICAgIHsgdGl0bGU6ICflhajpg6gnLCBpZDogMCB9LFxyXG4gICAgICB7IHRpdGxlOiAn5b6F5LuY5qy+JyB9LFxyXG4gICAgICB7IHRpdGxlOiAn5b6F5Y+R6LSnJyB9LFxyXG4gICAgICB7IHRpdGxlOiAn5b6F5pS26LSnJyB9LFxyXG4gICAgICB7IHRpdGxlOiAn5bey5a6M5oiQJyB9XHJcbiAgICBdLFxyXG4gICAgbmF2SWR4OiAwLFxyXG4gICAgb3JkZXJMaXN0OiBbXSxcclxuICAgIHN0YXRlX2FycjpbJycsJ3N0YXRlX25ldycsJ3N0YXRlX3BheScsJ3N0YXRlX3NlbmQnLCdzdGF0ZV9ub2V2YWwnXSAsXHJcbiAgICBjdXJwYWdlOiAxLFxyXG4gICAgaGFzbW9yZTogZmFsc2UsXHJcbiAgICBwYWdlX3RvdGFsOiAnJyxcclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgb3JkZXJDYW5jZWwob3JkZXJfaWQsIGluZGV4KXtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfnoa7orqTlj5bmtojorqLljZU/JyxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgaWYocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgYWpheCh7XHJcbiAgICAgICAgICAgICAgdXJsOiBhcGkub3JkZXJDYW5jZWwsXHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJfaWRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYoZS5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5tc2dcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm9yZGVyTGlzdFtpbmRleF0ub3JkZXJfc3RhdGUgPSBlLmRhdGFzLm9yZGVyX3N0YXRlXHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLmRhdGFzLmVycm9yLFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBvcmRlckRlbGV0ZShvcmRlcl9pZCwgaW5kZXgpe1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+ehruiupOWIoOmZpOiuouWNlT8nLFxyXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICBpZihyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICBhamF4KHtcclxuICAgICAgICAgICAgICB1cmw6IGFwaS5vcmRlckRlbGV0ZSxcclxuICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcmRlcl9pZFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkudGhlbihlID0+IHtcclxuICAgICAgICAgICAgICBpZihlLmRhdGFzLnN0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLmRhdGFzLm1zZ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoYXQub3JkZXJMaXN0LnNwbGljZShpbmRleCwxKVxyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5lcnJvcixcclxuICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgb3JkZXJSZWNlaXZlKG9yZGVyX2lkLCBpbmRleCl7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn56Gu6K6k5pS26LSnPycsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIGlmKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgICAgIHVybDogYXBpLm9yZGVyUmVjZWl2ZSxcclxuICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcmRlcl9pZFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkudGhlbihlID0+IHtcclxuICAgICAgICAgICAgICBpZihlLmRhdGFzLnN0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLmRhdGFzLm1zZ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoYXQub3JkZXJMaXN0W2luZGV4XS5vcmRlcl9zdGF0ZSA9IGUuZGF0YXMub3JkZXJfc3RhdGVcclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMuZXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGFzeW5jIHBheShvcmRlcl9pZCwgaW5kZXgpIHtcclxuICAgICAgdmFyIHJlc0RhdGEgPSBhd2FpdCBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5wYXksXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGF5X3NuOiAnOTAwNjI2NjMxMTQ2MzkwMDA3JyxcclxuICAgICAgICAgIHBheW1lbnRfY29kZTogJ21pbmlfd3hwYXknXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgaWYocmVzRGF0YS5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGFwaV9wYXkgPSByZXNEYXRhLmRhdGFzLmFwaV9wYXlcclxuICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XHJcbiAgICAgICAgICAuLi5hcGlfcGF5LFxyXG4gICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNvbXBsZXRlKGQpIHtjb25zb2xlLmxvZyhkKX1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2hhbmdlTmF2KGlkeCkge1xyXG4gICAgICBpZihpZHggPT0gdGhpcy5uYXZJZHgpIHJldHVyblxyXG4gICAgICB0aGlzLm5hdklkeCA9IGlkeFxyXG4gICAgICB0aGlzLmhhc21vcmUgPSBmYWxzZVxyXG4gICAgICB0aGlzLmN1cnBhZ2UgPSAxXHJcbiAgICAgIHRoaXMub3JkZXJMaXN0ID0gW11cclxuICAgICAgdGhpcy5yZXF1ZXN0TGlzdCgpXHJcbiAgICB9XHJcbiAgfTtcclxuICBvbkxvYWQodCkge1xyXG4gICAgdGhpcy5uYXZJZHggPSB0LmlkeCB8fCAwXHJcbiAgICB0aGlzLnJlcXVlc3RMaXN0KClcclxuICB9XHJcbiAgb25TaG93KCkge1xyXG4gIH1cclxuICByZXF1ZXN0TGlzdCgpe1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm9yZGVyTGlzdCxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHBhZ2U6IDEwLCAvLyBcclxuICAgICAgICBjdXJwYWdlOiB0aGlzLmN1cnBhZ2UsICAvLyDlvZPliY3pobXnoIFcclxuICAgICAgICBzdGF0ZV90eXBlOiB0aGlzLnN0YXRlX2Fyclt0aGlzLm5hdklkeF1cclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB2YXIgb3JkZXJfZ3JvdXBfbGlzdCA9IHJlcy5kYXRhcy5vcmRlcl9ncm91cF9saXN0IHx8IFtdXHJcbiAgICAgIHZhciBvcmRlcl9saXN0ID0gW11cclxuICAgICAgb3JkZXJfZ3JvdXBfbGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIG9yZGVyX2xpc3QgPSBvcmRlcl9saXN0LmNvbmNhdChpdGVtLm9yZGVyX2xpc3QpXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMub3JkZXJMaXN0ID0gdGhpcy5vcmRlckxpc3QuY29uY2F0KG9yZGVyX2xpc3QpXHJcblxyXG4gICAgICB0aGlzLnBhZ2VfdG90YWwgPSByZXMucGFnZV90b3RhbFxyXG4gICAgICB0aGlzLmhhc21vcmUgPSByZXMuaGFzbW9yZVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgIGlmKHRoaXMuaGFzbW9yZSkge1xyXG4gICAgICB0aGlzLmN1cnBhZ2UgKysgXHJcbiAgICAgIHRoaXMucmVxdWVzdExpc3QoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXZlbnRzID0ge307XHJcbn1cclxuIl19