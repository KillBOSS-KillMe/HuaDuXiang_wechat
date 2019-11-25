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
      navArr: [{ title: '全部', id: 0 }, { title: '待付款' }, { title: '待发货' }, { title: '待收货' }, { title: '已完成' }],
      navIdx: 0,
      orderList: [],
      state_arr: ['', 'state_new', 'state_pay', 'state_send', 'state_noeval'],
      curpage: 1,
      hasmore: false,
      page_total: '',
      disabledSwitch: false,
      allPrice: 0, // 订单金额
      available_predeposit: 0, //用户余额
      payment_type: 0, //付款类型 0微信 1余额
      payFlag: false,
      predepositFlag: true, // 余额支付是否开启
      mini_wxpayFlag: true, // 微信支付是否开启
      order_id: '',
      pay_sn: ''
    }, _this.computed = {
      disabledSwitch: function disabledSwitch() {
        return this.available_predeposit < this.allPrice || !this.predepositFlag;
      }
    }, _this.methods = {
      clickSwitch: function clickSwitch() {
        var that = this;
        if (!this.predepositFlag) {
          wx.showToast({
            title: '余额支付暂未开启，请使用微信支付',
            icon: 'none'
          });
          return false;
        }
        if (this.available_predeposit < this.allPrice) {
          this.payment_type = 0;
          wx.showModal({
            title: "提醒",
            content: "余额不足，是否前往充值？",
            success: function success(res) {
              if (res.confirm) {
                that.$redirect('vip');
              }
            }
          });
        }
      },
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
      getWXPayment: function getWXPayment(order_id, pay_sn, order_amount) {
        this.payFlag = true;
        this.allPrice = Number(order_amount);
        this.order_id = order_id;
        this.pay_sn = pay_sn;
        this.requestPayType();
      },
      pay: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var that, passwordData, resPay, timer;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  that = this;
                  // 余额支付跳框输入密码

                  if (!(this.payment_type == 1)) {
                    _context.next = 11;
                    break;
                  }

                  if (this.password) {
                    _context.next = 5;
                    break;
                  }

                  wx.showToast({
                    title: '请输入密码',
                    icon: 'none'
                  });
                  return _context.abrupt('return', false);

                case 5:
                  _context.next = 7;
                  return (0, _ajax.ajax)({
                    url: api.checkPassword,
                    data: {
                      password: this.password
                    }
                  });

                case 7:
                  passwordData = _context.sent;

                  if (!(passwordData.datas.state == 0)) {
                    _context.next = 11;
                    break;
                  }

                  wx.showToast({
                    title: '密码错误，请重新输入',
                    icon: 'none'
                  });
                  return _context.abrupt('return', false);

                case 11:
                  _context.next = 13;
                  return (0, _ajax.ajax)({
                    url: api.pay,
                    data: {
                      pay_sn: this.pay_sn,
                      payment_code: this.payment_type == 0 ? 'mini_wxpay' : 'predeposit',
                      password: this.password, // 支付密码
                      pd_pay: this.payment_type // 支付方式
                    }
                  }).then(function (res) {
                    return res.datas;
                  });

                case 13:
                  resPay = _context.sent;

                  if (resPay.state == 0) {
                    wx.showToast({
                      title: resPay.msg,
                      icon: 'none'
                    });
                  }
                  if (resPay.state == 1) {
                    if (this.payment_type == 0) {
                      wx.requestPayment(_extends({}, resPay.api_pay, {
                        success: function success(res) {
                          wx.showToast({
                            title: '支付成功'
                          });
                        },
                        fail: function fail(res) {
                          wx.showToast({
                            title: '支付失败'
                          });
                        },
                        complete: function complete() {
                          var timer = setTimeout(function () {
                            that.$redirect('orderlist');
                            clearTimeout(timer);
                          }, 1000);
                        }
                      }));
                    } else {
                      wx.showToast({
                        title: '支付成功'
                      });
                      timer = setTimeout(function () {
                        that.$redirect('orderlist');
                        clearTimeout(timer);
                      }, 1000);
                    }
                  }

                case 16:
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
    key: 'requestPayType',
    value: function requestPayType() {
      var _this2 = this;

      // 用户选择支付方式—
      (0, _ajax.ajax)({
        url: api.payInfo,
        data: {
          pay_sn: this.pay_sn
        }
      }).then(function (res) {
        if (res.code == 200) {
          _this2.mini_wxpayFlag = res.datas.pay_info.mini_wxpay;
          _this2.predepositFlag = res.datas.pay_info.predeposit;
          _this2.$apply();
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(t) {
      var _this3 = this;

      this.navIdx = t.idx || 0;
      // 用户个人中心数据接口
      (0, _ajax.ajax)({
        url: api.memberInfo
      }).then(function (res) {
        if (res.code == 200) {
          _this3.available_predeposit = Number(res.datas.member_data.available_predeposit);
          _this3.$apply();
        }
      });
      this.requestList();
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'requestList',
    value: function requestList() {
      var _this4 = this;

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
        _this4.orderList = _this4.orderList.concat(order_list);

        _this4.page_total = res.page_total;
        _this4.hasmore = res.hasmore;
        _this4.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVybGlzdC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGF5bWFzayIsIm1hc2siLCJtaXhpbnMiLCJkYXRhIiwibmF2QXJyIiwidGl0bGUiLCJpZCIsIm5hdklkeCIsIm9yZGVyTGlzdCIsInN0YXRlX2FyciIsImN1cnBhZ2UiLCJoYXNtb3JlIiwicGFnZV90b3RhbCIsImRpc2FibGVkU3dpdGNoIiwiYWxsUHJpY2UiLCJhdmFpbGFibGVfcHJlZGVwb3NpdCIsInBheW1lbnRfdHlwZSIsInBheUZsYWciLCJwcmVkZXBvc2l0RmxhZyIsIm1pbmlfd3hwYXlGbGFnIiwib3JkZXJfaWQiLCJwYXlfc24iLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJjbGlja1N3aXRjaCIsInRoYXQiLCJ3eCIsInNob3dUb2FzdCIsImljb24iLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCIkcmVkaXJlY3QiLCJpbnB1dFBhc3N3b3JkIiwiZSIsInBhc3N3b3JkIiwiZGV0YWlsIiwidmFsdWUiLCJjaGFuZ2VQYXltZW50IiwiTnVtYmVyIiwib3JkZXJDYW5jZWwiLCJpbmRleCIsInVybCIsInRoZW4iLCJkYXRhcyIsInN0YXRlIiwibXNnIiwib3JkZXJfc3RhdGUiLCIkYXBwbHkiLCJlcnJvciIsIm9yZGVyRGVsZXRlIiwic3BsaWNlIiwib3JkZXJSZWNlaXZlIiwiZ2V0V1hQYXltZW50Iiwib3JkZXJfYW1vdW50IiwicmVxdWVzdFBheVR5cGUiLCJwYXkiLCJjaGVja1Bhc3N3b3JkIiwicGFzc3dvcmREYXRhIiwicGF5bWVudF9jb2RlIiwicGRfcGF5IiwicmVzUGF5IiwicmVxdWVzdFBheW1lbnQiLCJhcGlfcGF5IiwiZmFpbCIsImNvbXBsZXRlIiwidGltZXIiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiY2hhbmdlTmF2IiwiaWR4IiwicmVxdWVzdExpc3QiLCJldmVudHMiLCJwYXlJbmZvIiwiY29kZSIsInBheV9pbmZvIiwibWluaV93eHBheSIsInByZWRlcG9zaXQiLCJ0IiwibWVtYmVySW5mbyIsIm1lbWJlcl9kYXRhIiwicGFnZSIsInN0YXRlX3R5cGUiLCJvcmRlcl9ncm91cF9saXN0Iiwib3JkZXJfbGlzdCIsImZvckVhY2giLCJjb25jYXQiLCJpdGVtIiwid2VweSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUZBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUtxQkMsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsV0FBVSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHdCQUF1QixTQUExQyxFQUFYLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLGVBQVNDO0FBREMsSyxRQUlaQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsY0FBUSxDQUNOLEVBQUVDLE9BQU8sSUFBVCxFQUFlQyxJQUFJLENBQW5CLEVBRE0sRUFFTixFQUFFRCxPQUFPLEtBQVQsRUFGTSxFQUdOLEVBQUVBLE9BQU8sS0FBVCxFQUhNLEVBSU4sRUFBRUEsT0FBTyxLQUFULEVBSk0sRUFLTixFQUFFQSxPQUFPLEtBQVQsRUFMTSxDQURIO0FBUUxFLGNBQVEsQ0FSSDtBQVNMQyxpQkFBVyxFQVROO0FBVUxDLGlCQUFVLENBQUMsRUFBRCxFQUFJLFdBQUosRUFBZ0IsV0FBaEIsRUFBNEIsWUFBNUIsRUFBeUMsY0FBekMsQ0FWTDtBQVdMQyxlQUFTLENBWEo7QUFZTEMsZUFBUyxLQVpKO0FBYUxDLGtCQUFZLEVBYlA7QUFjTEMsc0JBQWdCLEtBZFg7QUFlTEMsZ0JBQVUsQ0FmTCxFQWVRO0FB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QyxXQUFWLENBQXNCbkUsb0JBQTdCLENBQTVCO0FBQ0EsaUJBQUttQyxNQUFMO0FBQ0Q7QUFDRixPQVBEO0FBUUEsV0FBS3VCLFdBQUw7QUFDRDs7OzZCQUNRLENBQ1I7OztrQ0FDWTtBQUFBOztBQUNYLHNCQUFLO0FBQ0g3QixhQUFLckQsSUFBSWlCLFNBRE47QUFFSEwsY0FBTTtBQUNKZ0YsZ0JBQU0sRUFERixFQUNNO0FBQ1Z6RSxtQkFBUyxLQUFLQSxPQUZWLEVBRW9CO0FBQ3hCMEUsc0JBQVksS0FBSzNFLFNBQUwsQ0FBZSxLQUFLRixNQUFwQjtBQUhSO0FBRkgsT0FBTCxFQU9Hc0MsSUFQSCxDQU9RLGVBQU87QUFDYixZQUFJd0MsbUJBQW1CckQsSUFBSWMsS0FBSixDQUFVdUMsZ0JBQVYsSUFBOEIsRUFBckQ7QUFDQSxZQUFJQyxhQUFhLEVBQWpCO0FBQ0FELHlCQUFpQkUsT0FBakIsQ0FBeUIsZ0JBQVE7QUFDL0JELHVCQUFhQSxXQUFXRSxNQUFYLENBQWtCQyxLQUFLSCxVQUF2QixDQUFiO0FBQ0QsU0FGRDtBQUdBLGVBQUs5RSxTQUFMLEdBQWlCLE9BQUtBLFNBQUwsQ0FBZWdGLE1BQWYsQ0FBc0JGLFVBQXRCLENBQWpCOztBQUVBLGVBQUsxRSxVQUFMLEdBQWtCb0IsSUFBSXBCLFVBQXRCO0FBQ0EsZUFBS0QsT0FBTCxHQUFlcUIsSUFBSXJCLE9BQW5CO0FBQ0EsZUFBS3VDLE1BQUw7QUFDRCxPQWxCRDtBQW1CRDs7O29DQUNnQjtBQUNmLFVBQUcsS0FBS3ZDLE9BQVIsRUFBaUI7QUFDZixhQUFLRCxPQUFMO0FBQ0EsYUFBSytELFdBQUw7QUFDRDtBQUNGOzs7O0VBblRtQ2lCLGVBQUtQLEk7O2tCQUF0QjFGLFEiLCJmaWxlIjoib3JkZXJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuaW1wb3J0IG1hc2sgZnJvbSAnLi4vY29tcG9uZW50cy9tYXNrJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleWIl+ihqCdcclxuICB9O1xyXG5cclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wicGF5bWFza1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwicGF5RmxhZ1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBwYXltYXNrOiBtYXNrXHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBuYXZBcnI6IFtcclxuICAgICAgeyB0aXRsZTogJ+WFqOmDqCcsIGlkOiAwIH0sXHJcbiAgICAgIHsgdGl0bGU6ICflvoXku5jmrL4nIH0sXHJcbiAgICAgIHsgdGl0bGU6ICflvoXlj5HotKcnIH0sXHJcbiAgICAgIHsgdGl0bGU6ICflvoXmlLbotKcnIH0sXHJcbiAgICAgIHsgdGl0bGU6ICflt7LlrozmiJAnIH1cclxuICAgIF0sXHJcbiAgICBuYXZJZHg6IDAsXHJcbiAgICBvcmRlckxpc3Q6IFtdLFxyXG4gICAgc3RhdGVfYXJyOlsnJywnc3RhdGVfbmV3Jywnc3RhdGVfcGF5Jywnc3RhdGVfc2VuZCcsJ3N0YXRlX25vZXZhbCddICxcclxuICAgIGN1cnBhZ2U6IDEsXHJcbiAgICBoYXNtb3JlOiBmYWxzZSxcclxuICAgIHBhZ2VfdG90YWw6ICcnLFxyXG4gICAgZGlzYWJsZWRTd2l0Y2g6IGZhbHNlLFxyXG4gICAgYWxsUHJpY2U6IDAsIC8vIOiuouWNlemHkeminVxyXG4gICAgYXZhaWxhYmxlX3ByZWRlcG9zaXQ6IDAsIC8v55So5oi35L2Z6aKdXHJcbiAgICBwYXltZW50X3R5cGU6IDAgLCAvL+S7mOasvuexu+WeiyAw5b6u5L+hIDHkvZnpop1cclxuICAgIHBheUZsYWc6IGZhbHNlLFxyXG4gICAgcHJlZGVwb3NpdEZsYWc6IHRydWUsIC8vIOS9memineaUr+S7mOaYr+WQpuW8gOWQr1xyXG4gICAgbWluaV93eHBheUZsYWc6IHRydWUsIC8vIOW+ruS/oeaUr+S7mOaYr+WQpuW8gOWQr1xyXG4gICAgb3JkZXJfaWQ6ICcnLFxyXG4gICAgcGF5X3NuOiAnJ1xyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge1xyXG4gICAgZGlzYWJsZWRTd2l0Y2goKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmF2YWlsYWJsZV9wcmVkZXBvc2l0IDwgdGhpcy5hbGxQcmljZSB8fCAhdGhpcy5wcmVkZXBvc2l0RmxhZ1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjbGlja1N3aXRjaCgpIHtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIGlmKCF0aGlzLnByZWRlcG9zaXRGbGFnKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn5L2Z6aKd5pSv5LuY5pqC5pyq5byA5ZCv77yM6K+35L2/55So5b6u5L+h5pSv5LuYJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYodGhpcy5hdmFpbGFibGVfcHJlZGVwb3NpdCA8IHRoaXMuYWxsUHJpY2UpIHtcclxuICAgICAgICB0aGlzLnBheW1lbnRfdHlwZSA9IDBcclxuICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgdGl0bGU6IFwi5o+Q6YaSXCIsXHJcbiAgICAgICAgICBjb250ZW50OiBcIuS9memineS4jei2s++8jOaYr+WQpuWJjeW+gOWFheWAvO+8n1wiLFxyXG4gICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgaWYocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICB0aGF0LiRyZWRpcmVjdChgdmlwYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5wdXRQYXNzd29yZChlKSB7XHJcbiAgICAgIHRoaXMucGFzc3dvcmQgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSxcclxuICAgIGNoYW5nZVBheW1lbnQoZSkge1xyXG4gICAgICB0aGlzLnBheW1lbnRfdHlwZSA9IE51bWJlcihlLmRldGFpbC52YWx1ZSlcclxuICAgIH0sXHJcbiAgICBvcmRlckNhbmNlbChvcmRlcl9pZCwgaW5kZXgpe1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+ehruiupOWPlua2iOiuouWNlT8nLFxyXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICBpZihyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICBhamF4KHtcclxuICAgICAgICAgICAgICB1cmw6IGFwaS5vcmRlckNhbmNlbCxcclxuICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcmRlcl9pZFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkudGhlbihlID0+IHtcclxuICAgICAgICAgICAgICBpZihlLmRhdGFzLnN0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLmRhdGFzLm1zZ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoYXQub3JkZXJMaXN0W2luZGV4XS5vcmRlcl9zdGF0ZSA9IGUuZGF0YXMub3JkZXJfc3RhdGVcclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMuZXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIG9yZGVyRGVsZXRlKG9yZGVyX2lkLCBpbmRleCl7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn56Gu6K6k5Yig6Zmk6K6i5Y2VPycsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIGlmKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgICAgIHVybDogYXBpLm9yZGVyRGVsZXRlLFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9yZGVyX2lkXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKGUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKGUuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMubXNnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhhdC5vcmRlckxpc3Quc3BsaWNlKGluZGV4LDEpXHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLmRhdGFzLmVycm9yLFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBvcmRlclJlY2VpdmUob3JkZXJfaWQsIGluZGV4KXtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfnoa7orqTmlLbotKc/JyxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgaWYocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgYWpheCh7XHJcbiAgICAgICAgICAgICAgdXJsOiBhcGkub3JkZXJSZWNlaXZlLFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9yZGVyX2lkXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKGUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKGUuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMubXNnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhhdC5vcmRlckxpc3RbaW5kZXhdLm9yZGVyX3N0YXRlID0gZS5kYXRhcy5vcmRlcl9zdGF0ZVxyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5lcnJvcixcclxuICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0V1hQYXltZW50KG9yZGVyX2lkLCBwYXlfc24sIG9yZGVyX2Ftb3VudCkge1xyXG4gICAgICB0aGlzLnBheUZsYWcgPSB0cnVlXHJcbiAgICAgIHRoaXMuYWxsUHJpY2UgPSBOdW1iZXIob3JkZXJfYW1vdW50KVxyXG4gICAgICB0aGlzLm9yZGVyX2lkID0gb3JkZXJfaWRcclxuICAgICAgdGhpcy5wYXlfc24gPSBwYXlfc25cclxuICAgICAgdGhpcy5yZXF1ZXN0UGF5VHlwZSgpXHJcblxyXG5cclxuICAgIH0sXHJcbiAgICBhc3luYyBwYXkoKSB7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICAvLyDkvZnpop3mlK/ku5jot7PmoYbovpPlhaXlr4bnoIFcclxuICAgICAgaWYodGhpcy5wYXltZW50X3R5cGUgPT0gMSkge1xyXG4gICAgICAgIGlmKCF0aGlzLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeWvhueggScsXHJcbiAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcGFzc3dvcmREYXRhID0gYXdhaXQgYWpheCh7XHJcbiAgICAgICAgICB1cmw6IGFwaS5jaGVja1Bhc3N3b3JkLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYocGFzc3dvcmREYXRhLmRhdGFzLnN0YXRlID09IDApIHtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5a+G56CB6ZSZ6K+v77yM6K+36YeN5paw6L6T5YWlJyxcclxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHZhciByZXNQYXkgPSBhd2FpdCBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5wYXksXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGF5X3NuOiB0aGlzLnBheV9zbixcclxuICAgICAgICAgIHBheW1lbnRfY29kZTogIHRoaXMucGF5bWVudF90eXBlID09IDAgPyAgJ21pbmlfd3hwYXknICA6ICAncHJlZGVwb3NpdCcsXHJcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCwgIC8vIOaUr+S7mOWvhueggVxyXG4gICAgICAgICAgcGRfcGF5OiB0aGlzLnBheW1lbnRfdHlwZSwgIC8vIOaUr+S7mOaWueW8j1xyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmRhdGFzKVxyXG4gICAgICBpZihyZXNQYXkuc3RhdGUgPT0gMCkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogcmVzUGF5Lm1zZyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgaWYocmVzUGF5LnN0YXRlID09IDEpIHtcclxuICAgICAgICBpZih0aGlzLnBheW1lbnRfdHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XHJcbiAgICAgICAgICAgIC4uLnJlc1BheS5hcGlfcGF5LFxyXG4gICAgICAgICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmlK/ku5jmiJDlip8nXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbCAocmVzKSB7XHJcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5aSx6LSlJ1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kcmVkaXJlY3QoYG9yZGVybGlzdGApO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxyXG4gICAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5oiQ5YqfJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGF0LiRyZWRpcmVjdChgb3JkZXJsaXN0YCk7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcclxuICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgfVxyXG4gICAgICB9IFxyXG4gICAgfSxcclxuICAgIGNoYW5nZU5hdihpZHgpIHtcclxuICAgICAgaWYoaWR4ID09IHRoaXMubmF2SWR4KSByZXR1cm5cclxuICAgICAgdGhpcy5uYXZJZHggPSBpZHhcclxuICAgICAgdGhpcy5oYXNtb3JlID0gZmFsc2VcclxuICAgICAgdGhpcy5jdXJwYWdlID0gMVxyXG4gICAgICB0aGlzLm9yZGVyTGlzdCA9IFtdXHJcbiAgICAgIHRoaXMucmVxdWVzdExpc3QoKVxyXG4gICAgfVxyXG4gIH07XHJcbiAgcmVxdWVzdFBheVR5cGUoKSB7XHJcbiAgICAvLyDnlKjmiLfpgInmi6nmlK/ku5jmlrnlvI/igJRcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5wYXlJbmZvLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcGF5X3NuOiB0aGlzLnBheV9zblxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHRoaXMubWluaV93eHBheUZsYWcgPSByZXMuZGF0YXMucGF5X2luZm8ubWluaV93eHBheVxyXG4gICAgICAgIHRoaXMucHJlZGVwb3NpdEZsYWcgPSByZXMuZGF0YXMucGF5X2luZm8ucHJlZGVwb3NpdFxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgb25Mb2FkKHQpIHtcclxuICAgIHRoaXMubmF2SWR4ID0gdC5pZHggfHwgMFxyXG4gICAgLy8g55So5oi35Liq5Lq65Lit5b+D5pWw5o2u5o6l5Y+jXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkubWVtYmVySW5mbyxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5hdmFpbGFibGVfcHJlZGVwb3NpdCA9IE51bWJlcihyZXMuZGF0YXMubWVtYmVyX2RhdGEuYXZhaWxhYmxlX3ByZWRlcG9zaXQpXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgdGhpcy5yZXF1ZXN0TGlzdCgpXHJcbiAgfVxyXG4gIG9uU2hvdygpIHtcclxuICB9XHJcbiAgcmVxdWVzdExpc3QoKXtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5vcmRlckxpc3QsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBwYWdlOiAxMCwgLy8gXHJcbiAgICAgICAgY3VycGFnZTogdGhpcy5jdXJwYWdlLCAgLy8g5b2T5YmN6aG156CBXHJcbiAgICAgICAgc3RhdGVfdHlwZTogdGhpcy5zdGF0ZV9hcnJbdGhpcy5uYXZJZHhdXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdmFyIG9yZGVyX2dyb3VwX2xpc3QgPSByZXMuZGF0YXMub3JkZXJfZ3JvdXBfbGlzdCB8fCBbXVxyXG4gICAgICB2YXIgb3JkZXJfbGlzdCA9IFtdXHJcbiAgICAgIG9yZGVyX2dyb3VwX2xpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBvcmRlcl9saXN0ID0gb3JkZXJfbGlzdC5jb25jYXQoaXRlbS5vcmRlcl9saXN0KVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLm9yZGVyTGlzdCA9IHRoaXMub3JkZXJMaXN0LmNvbmNhdChvcmRlcl9saXN0KVxyXG5cclxuICAgICAgdGhpcy5wYWdlX3RvdGFsID0gcmVzLnBhZ2VfdG90YWxcclxuICAgICAgdGhpcy5oYXNtb3JlID0gcmVzLmhhc21vcmVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgb25SZWFjaEJvdHRvbSAoKSB7XHJcbiAgICBpZih0aGlzLmhhc21vcmUpIHtcclxuICAgICAgdGhpcy5jdXJwYWdlICsrIFxyXG4gICAgICB0aGlzLnJlcXVlc3RMaXN0KClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG59XHJcbiJdfQ==