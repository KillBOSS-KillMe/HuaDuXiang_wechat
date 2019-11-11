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
      orderList: []
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
      }()
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'onShow',
    value: function onShow() {
      this.requestList();
    }
  }, {
    key: 'requestList',
    value: function requestList() {
      var _this2 = this;

      (0, _ajax.ajax)({
        url: api.orderList,
        data: {
          page: 3, // 
          curpage: 1 // 当前页码
        }
      }).then(function (res) {
        var order_group_list = res.datas.order_group_list || [];
        var order_list = [];
        order_group_list.forEach(function (item) {
          order_list = order_list.concat(item.order_list);
        });
        _this2.orderList = order_list;
        _this2.$apply();
      });
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/orderlist'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVybGlzdC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJuYXZBcnIiLCJ0aXRsZSIsImlkIiwibmF2SWR4Iiwib3JkZXJMaXN0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwib3JkZXJDYW5jZWwiLCJvcmRlcl9pZCIsImluZGV4IiwidGhhdCIsInd4Iiwic2hvd01vZGFsIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJ1cmwiLCJ0aGVuIiwiZSIsImRhdGFzIiwic3RhdGUiLCJzaG93VG9hc3QiLCJtc2ciLCJvcmRlcl9zdGF0ZSIsIiRhcHBseSIsImVycm9yIiwiaWNvbiIsIm9yZGVyRGVsZXRlIiwic3BsaWNlIiwib3JkZXJSZWNlaXZlIiwicGF5IiwicGF5X3NuIiwicGF5bWVudF9jb2RlIiwicmVzRGF0YSIsImFwaV9wYXkiLCJyZXF1ZXN0UGF5bWVudCIsImNvbnNvbGUiLCJsb2ciLCJjb21wbGV0ZSIsImQiLCJldmVudHMiLCJyZXF1ZXN0TGlzdCIsInBhZ2UiLCJjdXJwYWdlIiwib3JkZXJfZ3JvdXBfbGlzdCIsIm9yZGVyX2xpc3QiLCJmb3JFYWNoIiwiY29uY2F0IiwiaXRlbSIsIndlcHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBSXFCQyxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsY0FBUSxDQUNOLEVBQUVDLE9BQU8sSUFBVCxFQUFlQyxJQUFJLENBQW5CLEVBRE0sRUFFTixFQUFFRCxPQUFPLEtBQVQsRUFGTSxFQUdOLEVBQUVBLE9BQU8sS0FBVCxF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TkgsQ0FNUSxlQUFPO0FBQ2IsWUFBSTJCLG1CQUFtQjlCLElBQUlLLEtBQUosQ0FBVXlCLGdCQUFWLElBQThCLEVBQXJEO0FBQ0EsWUFBSUMsYUFBYSxFQUFqQjtBQUNBRCx5QkFBaUJFLE9BQWpCLENBQXlCLGdCQUFRO0FBQy9CRCx1QkFBYUEsV0FBV0UsTUFBWCxDQUFrQkMsS0FBS0gsVUFBdkIsQ0FBYjtBQUNELFNBRkQ7QUFHQSxlQUFLekMsU0FBTCxHQUFpQnlDLFVBQWpCO0FBQ0EsZUFBS3JCLE1BQUw7QUFDRCxPQWREO0FBZUQ7Ozs7RUF4Sm1DeUIsZUFBS1AsSTs7a0JBQXRCaEQsUSIsImZpbGUiOiJvcmRlcmxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K6i5Y2V5YiX6KGoJ1xyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBuYXZBcnI6IFtcclxuICAgICAgeyB0aXRsZTogJ+WFqOmDqCcsIGlkOiAwIH0sXHJcbiAgICAgIHsgdGl0bGU6ICflvoXku5jmrL4nIH0sXHJcbiAgICAgIHsgdGl0bGU6ICflvoXlj5HotKcnIH0sXHJcbiAgICAgIHsgdGl0bGU6ICflvoXmlLbotKcnIH0sXHJcbiAgICAgIHsgdGl0bGU6ICflt7LlrozmiJAnIH1cclxuICAgIF0sXHJcbiAgICBuYXZJZHg6IDAsXHJcbiAgICBvcmRlckxpc3Q6IFtdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIG9yZGVyQ2FuY2VsKG9yZGVyX2lkLCBpbmRleCl7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn56Gu6K6k5Y+W5raI6K6i5Y2VPycsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIGlmKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgICAgIHVybDogYXBpLm9yZGVyQ2FuY2VsLFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9yZGVyX2lkXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKGUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKGUuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMubXNnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhhdC5vcmRlckxpc3RbaW5kZXhdLm9yZGVyX3N0YXRlID0gZS5kYXRhcy5vcmRlcl9zdGF0ZVxyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5lcnJvcixcclxuICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgb3JkZXJEZWxldGUob3JkZXJfaWQsIGluZGV4KXtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfnoa7orqTliKDpmaTorqLljZU/JyxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgaWYocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgYWpheCh7XHJcbiAgICAgICAgICAgICAgdXJsOiBhcGkub3JkZXJEZWxldGUsXHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJfaWRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYoZS5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5tc2dcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm9yZGVyTGlzdC5zcGxpY2UoaW5kZXgsMSlcclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMuZXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIG9yZGVyUmVjZWl2ZShvcmRlcl9pZCwgaW5kZXgpe1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+ehruiupOaUtui0pz8nLFxyXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICBpZihyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICBhamF4KHtcclxuICAgICAgICAgICAgICB1cmw6IGFwaS5vcmRlclJlY2VpdmUsXHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJfaWRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYoZS5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5tc2dcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm9yZGVyTGlzdFtpbmRleF0ub3JkZXJfc3RhdGUgPSBlLmRhdGFzLm9yZGVyX3N0YXRlXHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLmRhdGFzLmVycm9yLFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhc3luYyBwYXkob3JkZXJfaWQsIGluZGV4KSB7XHJcbiAgICAgIHZhciByZXNEYXRhID0gYXdhaXQgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkucGF5LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHBheV9zbjogJzkwMDYyNjYzMTE0NjM5MDAwNycsXHJcbiAgICAgICAgICBwYXltZW50X2NvZGU6ICdtaW5pX3d4cGF5J1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIGlmKHJlc0RhdGEuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgIHZhciBhcGlfcGF5ID0gcmVzRGF0YS5kYXRhcy5hcGlfcGF5XHJcbiAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xyXG4gICAgICAgICAgLi4uYXBpX3BheSxcclxuICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjb21wbGV0ZShkKSB7Y29uc29sZS5sb2coZCl9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbiAgb25Mb2FkKCkge31cclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RMaXN0KClcclxuICB9XHJcbiAgcmVxdWVzdExpc3QoKXtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5vcmRlckxpc3QsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBwYWdlOiAzLCAvLyBcclxuICAgICAgICBjdXJwYWdlOiAxICAvLyDlvZPliY3pobXnoIFcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB2YXIgb3JkZXJfZ3JvdXBfbGlzdCA9IHJlcy5kYXRhcy5vcmRlcl9ncm91cF9saXN0IHx8IFtdXHJcbiAgICAgIHZhciBvcmRlcl9saXN0ID0gW11cclxuICAgICAgb3JkZXJfZ3JvdXBfbGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIG9yZGVyX2xpc3QgPSBvcmRlcl9saXN0LmNvbmNhdChpdGVtLm9yZGVyX2xpc3QpXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMub3JkZXJMaXN0ID0gb3JkZXJfbGlzdFxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZXZlbnRzID0ge307XHJcbn1cclxuIl19