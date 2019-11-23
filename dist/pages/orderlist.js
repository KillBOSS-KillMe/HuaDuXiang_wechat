'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../ajax.js');

var _mask = require('./../components/mask.js');

var _mask2 = _interopRequireDefault(_mask);

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
    }, _this.$repeat = {}, _this.$props = { "paymask": { "xmlns:v-bind": "", "v-bind:maskFlag.sync": "payFlag" } }, _this.$events = {}, _this.components = {
      paymask: _mask2.default
    }, _this.mixins = [], _this.data = {
      payment_type: 0, //付款类型 0微信 1余额
      payFlag: true,
      navArr: [{ title: '全部', id: 0 }, { title: '待付款' }, { title: '待发货' }, { title: '待收货' }, { title: '已完成' }],
      navIdx: 0,
      orderList: [],
      state_arr: ['', 'state_new', 'state_pay', 'state_send', 'state_noeval'],
      curpage: 1,
      hasmore: false,
      page_total: ''
    }, _this.computed = {}, _this.methods = {
      inputPassword: function inputPassword(e) {
        this.password = e.detail.value;
      },
      changePayment: function changePayment(e) {
        this.payment_type = Number(e.detail.value);
      },
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
                  this.payFlag = true;
                  _context.next = 3;
                  return (0, _ajax.ajax)({
                    url: api.pay,
                    data: {
                      pay_sn: pay_sn,
                      payment_code: 'mini_wxpay'
                    }
                  });

                case 3:
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

                case 5:
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
      truePay: function truePay() {},
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVybGlzdC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGF5bWFzayIsIm1hc2siLCJtaXhpbnMiLCJkYXRhIiwicGF5bWVudF90eXBlIiwicGF5RmxhZyIsIm5hdkFyciIsInRpdGxlIiwiaWQiLCJuYXZJZHgiLCJvcmRlckxpc3QiLCJzdGF0ZV9hcnIiLCJjdXJwYWdlIiwiaGFzbW9yZSIsInBhZ2VfdG90YWwiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJpbnB1dFBhc3N3b3JkIiwiZSIsInBhc3N3b3JkIiwiZGV0YWlsIiwidmFsdWUiLCJjaGFuZ2VQYXltZW50IiwiTnVtYmVyIiwib3JkZXJDYW5jZWwiLCJvcmRlcl9pZCIsImluZGV4IiwidGhhdCIsInd4Iiwic2hvd01vZGFsIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJ1cmwiLCJ0aGVuIiwiZGF0YXMiLCJzdGF0ZSIsInNob3dUb2FzdCIsIm1zZyIsIm9yZGVyX3N0YXRlIiwiJGFwcGx5IiwiZXJyb3IiLCJpY29uIiwib3JkZXJEZWxldGUiLCJzcGxpY2UiLCJvcmRlclJlY2VpdmUiLCJwYXkiLCJwYXlfc24iLCJwYXltZW50X2NvZGUiLCJyZXNEYXRhIiwiYXBpX3BheSIsInJlcXVlc3RQYXltZW50IiwiY29uc29sZSIsImxvZyIsImNvbXBsZXRlIiwiZCIsInRydWVQYXkiLCJjaGFuZ2VOYXYiLCJpZHgiLCJyZXF1ZXN0TGlzdCIsImV2ZW50cyIsInQiLCJwYWdlIiwic3RhdGVfdHlwZSIsIm9yZGVyX2dyb3VwX2xpc3QiLCJvcmRlcl9saXN0IiwiZm9yRWFjaCIsImNvbmNhdCIsIml0ZW0iLCJ3ZXB5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRkEsSUFB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Ozs7NkJBQ1EsQ0FDUjs7O2tDQUNZO0FBQUE7O0FBQ1gsc0JBQUs7QUFDSDFCLGFBQUsxQyxJQUFJbUIsU0FETjtBQUVIUCxjQUFNO0FBQ0oyRCxnQkFBTSxFQURGLEVBQ007QUFDVmxELG1CQUFTLEtBQUtBLE9BRlYsRUFFb0I7QUFDeEJtRCxzQkFBWSxLQUFLcEQsU0FBTCxDQUFlLEtBQUtGLE1BQXBCO0FBSFI7QUFGSCxPQUFMLEVBT0d5QixJQVBILENBT1EsZUFBTztBQUNiLFlBQUk4QixtQkFBbUJqQyxJQUFJSSxLQUFKLENBQVU2QixnQkFBVixJQUE4QixFQUFyRDtBQUNBLFlBQUlDLGFBQWEsRUFBakI7QUFDQUQseUJBQWlCRSxPQUFqQixDQUF5QixnQkFBUTtBQUMvQkQsdUJBQWFBLFdBQVdFLE1BQVgsQ0FBa0JDLEtBQUtILFVBQXZCLENBQWI7QUFDRCxTQUZEO0FBR0EsZUFBS3ZELFNBQUwsR0FBaUIsT0FBS0EsU0FBTCxDQUFleUQsTUFBZixDQUFzQkYsVUFBdEIsQ0FBakI7O0FBRUEsZUFBS25ELFVBQUwsR0FBa0JpQixJQUFJakIsVUFBdEI7QUFDQSxlQUFLRCxPQUFMLEdBQWVrQixJQUFJbEIsT0FBbkI7QUFDQSxlQUFLMkIsTUFBTDtBQUNELE9BbEJEO0FBbUJEOzs7b0NBQ2dCO0FBQ2YsVUFBRyxLQUFLM0IsT0FBUixFQUFpQjtBQUNmLGFBQUtELE9BQUw7QUFDQSxhQUFLK0MsV0FBTDtBQUNEO0FBQ0Y7Ozs7RUFqTW1DVSxlQUFLUCxJOztrQkFBdEJyRSxRIiwiZmlsZSI6Im9yZGVybGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbmltcG9ydCBtYXNrIGZyb20gJy4uL2NvbXBvbmVudHMvbWFzayc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXliJfooagnXHJcbiAgfTtcclxuXHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInBheW1hc2tcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm1hc2tGbGFnLnN5bmNcIjpcInBheUZsYWdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgcGF5bWFzazogbWFza1xyXG4gIH07XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcGF5bWVudF90eXBlOiAwICwgLy/ku5jmrL7nsbvlnosgMOW+ruS/oSAx5L2Z6aKdXHJcbiAgICBwYXlGbGFnOiB0cnVlLFxyXG4gICAgbmF2QXJyOiBbXHJcbiAgICAgIHsgdGl0bGU6ICflhajpg6gnLCBpZDogMCB9LFxyXG4gICAgICB7IHRpdGxlOiAn5b6F5LuY5qy+JyB9LFxyXG4gICAgICB7IHRpdGxlOiAn5b6F5Y+R6LSnJyB9LFxyXG4gICAgICB7IHRpdGxlOiAn5b6F5pS26LSnJyB9LFxyXG4gICAgICB7IHRpdGxlOiAn5bey5a6M5oiQJyB9XHJcbiAgICBdLFxyXG4gICAgbmF2SWR4OiAwLFxyXG4gICAgb3JkZXJMaXN0OiBbXSxcclxuICAgIHN0YXRlX2FycjpbJycsJ3N0YXRlX25ldycsJ3N0YXRlX3BheScsJ3N0YXRlX3NlbmQnLCdzdGF0ZV9ub2V2YWwnXSAsXHJcbiAgICBjdXJwYWdlOiAxLFxyXG4gICAgaGFzbW9yZTogZmFsc2UsXHJcbiAgICBwYWdlX3RvdGFsOiAnJyxcclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgaW5wdXRQYXNzd29yZChlKSB7XHJcbiAgICAgIHRoaXMucGFzc3dvcmQgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSxcclxuICAgIGNoYW5nZVBheW1lbnQoZSkge1xyXG4gICAgICB0aGlzLnBheW1lbnRfdHlwZSA9IE51bWJlcihlLmRldGFpbC52YWx1ZSlcclxuICAgIH0sXHJcbiAgICBvcmRlckNhbmNlbChvcmRlcl9pZCwgaW5kZXgpe1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+ehruiupOWPlua2iOiuouWNlT8nLFxyXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICBpZihyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICBhamF4KHtcclxuICAgICAgICAgICAgICB1cmw6IGFwaS5vcmRlckNhbmNlbCxcclxuICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcmRlcl9pZFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkudGhlbihlID0+IHtcclxuICAgICAgICAgICAgICBpZihlLmRhdGFzLnN0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLmRhdGFzLm1zZ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoYXQub3JkZXJMaXN0W2luZGV4XS5vcmRlcl9zdGF0ZSA9IGUuZGF0YXMub3JkZXJfc3RhdGVcclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMuZXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIG9yZGVyRGVsZXRlKG9yZGVyX2lkLCBpbmRleCl7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn56Gu6K6k5Yig6Zmk6K6i5Y2VPycsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIGlmKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgICAgIHVybDogYXBpLm9yZGVyRGVsZXRlLFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9yZGVyX2lkXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKGUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKGUuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMubXNnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhhdC5vcmRlckxpc3Quc3BsaWNlKGluZGV4LDEpXHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLmRhdGFzLmVycm9yLFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBvcmRlclJlY2VpdmUob3JkZXJfaWQsIGluZGV4KXtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfnoa7orqTmlLbotKc/JyxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgaWYocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgYWpheCh7XHJcbiAgICAgICAgICAgICAgdXJsOiBhcGkub3JkZXJSZWNlaXZlLFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9yZGVyX2lkXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKGUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKGUuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMubXNnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhhdC5vcmRlckxpc3RbaW5kZXhdLm9yZGVyX3N0YXRlID0gZS5kYXRhcy5vcmRlcl9zdGF0ZVxyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5lcnJvcixcclxuICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgcGF5KG9yZGVyX2lkLCBpbmRleCwgcGF5X3NuKSB7XHJcbiAgICAgIHRoaXMucGF5RmxhZyA9IHRydWVcclxuICAgICAgdmFyIHJlc0RhdGEgPSBhd2FpdCBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5wYXksXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGF5X3NuOiBwYXlfc24sXHJcbiAgICAgICAgICBwYXltZW50X2NvZGU6ICdtaW5pX3d4cGF5J1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIGlmKHJlc0RhdGEuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgIHZhciBhcGlfcGF5ID0gcmVzRGF0YS5kYXRhcy5hcGlfcGF5XHJcbiAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xyXG4gICAgICAgICAgLi4uYXBpX3BheSxcclxuICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjb21wbGV0ZShkKSB7Y29uc29sZS5sb2coZCl9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRydWVQYXkoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGNoYW5nZU5hdihpZHgpIHtcclxuICAgICAgaWYoaWR4ID09IHRoaXMubmF2SWR4KSByZXR1cm5cclxuICAgICAgdGhpcy5uYXZJZHggPSBpZHhcclxuICAgICAgdGhpcy5oYXNtb3JlID0gZmFsc2VcclxuICAgICAgdGhpcy5jdXJwYWdlID0gMVxyXG4gICAgICB0aGlzLm9yZGVyTGlzdCA9IFtdXHJcbiAgICAgIHRoaXMucmVxdWVzdExpc3QoKVxyXG4gICAgfVxyXG4gIH07XHJcbiAgb25Mb2FkKHQpIHtcclxuICAgIHRoaXMubmF2SWR4ID0gdC5pZHggfHwgMFxyXG4gICAgdGhpcy5yZXF1ZXN0TGlzdCgpXHJcbiAgfVxyXG4gIG9uU2hvdygpIHtcclxuICB9XHJcbiAgcmVxdWVzdExpc3QoKXtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5vcmRlckxpc3QsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBwYWdlOiAxMCwgLy8gXHJcbiAgICAgICAgY3VycGFnZTogdGhpcy5jdXJwYWdlLCAgLy8g5b2T5YmN6aG156CBXHJcbiAgICAgICAgc3RhdGVfdHlwZTogdGhpcy5zdGF0ZV9hcnJbdGhpcy5uYXZJZHhdXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdmFyIG9yZGVyX2dyb3VwX2xpc3QgPSByZXMuZGF0YXMub3JkZXJfZ3JvdXBfbGlzdCB8fCBbXVxyXG4gICAgICB2YXIgb3JkZXJfbGlzdCA9IFtdXHJcbiAgICAgIG9yZGVyX2dyb3VwX2xpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBvcmRlcl9saXN0ID0gb3JkZXJfbGlzdC5jb25jYXQoaXRlbS5vcmRlcl9saXN0KVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLm9yZGVyTGlzdCA9IHRoaXMub3JkZXJMaXN0LmNvbmNhdChvcmRlcl9saXN0KVxyXG5cclxuICAgICAgdGhpcy5wYWdlX3RvdGFsID0gcmVzLnBhZ2VfdG90YWxcclxuICAgICAgdGhpcy5oYXNtb3JlID0gcmVzLmhhc21vcmVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgb25SZWFjaEJvdHRvbSAoKSB7XHJcbiAgICBpZih0aGlzLmhhc21vcmUpIHtcclxuICAgICAgdGhpcy5jdXJwYWdlICsrIFxyXG4gICAgICB0aGlzLnJlcXVlc3RMaXN0KClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG59XHJcbiJdfQ==