'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ajax = require('./../ajax.js');

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mask = require('./../components/mask.js');

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var api = require('./../api.js');

// 支付流程
// 1.立即购买(选择规格数量) w=member_buy&t=buy_step1
// 2.提交订单 w=member_buy&t=buy_step2
// 3.判断此订单支付的支付方式 w=member_buy&t=pay
// 3.1 微信支付 w=member_payment&t=pay 拉起支付 支付成功与否跳转订单列表
// 3.2 余额支付 (1)根据3判断此订单是否开启余额支付(predepositFlag) true:进行(2);
//             (2)根据余额与支付金额判断是否支持余额支付  true:进行(3); false: 询问是否前去充值页面;
//             (3)输入密码判断正确与否 w=member_index&t=check_password  true:进行(4)
//             (4)w=member_payment&t=pay  支付成功与否跳转订单列表

var Settlement = function (_wepy$page) {
  _inherits(Settlement, _wepy$page);

  function Settlement() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Settlement);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Settlement.__proto__ || Object.getPrototypeOf(Settlement)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '提交订单'
    }, _this.$repeat = {}, _this.$props = { "paymask": { "xmlns:v-bind": "", "v-bind:maskFlag.sync": "payFlag" } }, _this.$events = {}, _this.components = {
      paymask: _mask2.default
    }, _this.mixins = [], _this.data = {
      payFlag: false,
      priceArr: [{ title: '微信支付', icon: 'image57.png', flag: 1 }, { title: '余额支付', icon: 'image58.png', flag: 0 }],
      requestImgUrl: '',
      address: null, //地址信息
      goods_list: [], //下单商品信息
      store_cart_list: [], //下单店铺列表
      allPrice: 0, //订单总价格
      goodsAllNum: 0, //总共件数
      address_api: null, // 地址信息hash
      vat_hash: null, //发票信息hash
      cart_id: null, //商品id数量
      payment_list: [], // 支付方式
      goods_freight: 0, //运费
      payment_type: 0, //付款类型 0微信 1余额
      available_predeposit: 0, //用户余额
      password: '', // 用户余额密码
      postage: {}, //邮费
      pay_sn: '', // 支付参数
      disabledSwitch: false,
      predepositFlag: true, // 余额支付是否开启
      mini_wxpayFlag: true // 微信支付是否开启

    }, _this.computed = {
      disabledSwitch: function disabledSwitch() {
        return this.available_predeposit < this.allPrice || !this.predepositFlag;
      }
    }, _this.methods = {
      inputPassword: function inputPassword(e) {
        this.password = e.detail.value;
      },
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
      changePayment: function changePayment(e) {
        this.payment_type = Number(e.detail.value);
        this.password = '';
      },
      getWXPayment: function getWXPayment() {
        var _this2 = this;

        var that = this;
        if (!this.address.address_id) {
          wx.showToast({
            title: '请选择地址',
            icon: 'none'
          });
          return false;
        }
        if (this.pay_sn) {
          this.payFlag = true;
          return false;
        }
        (0, _ajax.ajax)({
          url: api.placeOrder,
          data: {
            cart_id: this.cart_id,
            ifcart: 0, // 1=是购物车，0=不是购物车
            address_id: this.address.address_id, // 地址id
            vat_hash: this.vat_hash, //发票信息hash，
            offpay_hash: this.address_api.offpay_hash, // 是否支持货到付款，
            offpay_hash_batch: this.address_api.offpay_hash_batch, //店铺是否支持货到付款hash
            pay_name: 'online',
            invoice_id: 0, // 发票
            // pd_pay: this.payment_type,  // 支付方式
            // password: this.password,  // 支付密码
            voucher: null // 优惠券

          }
        }).then(function (res) {
          if (res.code == 200) {
            _this2.payFlag = true;
            _this2.pay_sn = res.datas.pay_sn;
            _this2.$apply();
            _this2.requestPayType();
          } else {
            wx.showToast({
              title: '网络错误，请稍后再试',
              icon: 'none'
            });
          }
        });
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
      }()
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Settlement, [{
    key: 'requestPayType',
    value: function requestPayType() {
      var _this3 = this;

      // 用户选择支付方式—
      (0, _ajax.ajax)({
        url: api.payInfo,
        data: {
          pay_sn: this.pay_sn
        }
      }).then(function (res) {
        if (res.code == 200) {
          _this3.mini_wxpayFlag = res.datas.pay_info.mini_wxpay;
          _this3.predepositFlag = res.datas.pay_info.predeposit;
          _this3.$apply();
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(options) {}
  }, {
    key: 'onShow',
    value: function onShow() {
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      var app = this.$parent;
      // 全局订单信息
      var orderInfo = app.globalData.orderInfo;
      // 邮费信息
      this.postage = orderInfo.address_api.content || {};
      // 地址信息
      this.address = Object.prototype.toString.call(orderInfo.address_info) == '[object Object]' ? orderInfo.address_info : '';
      // 多店铺信息
      this.store_cart_list = orderInfo.store_cart_list;
      // 商品列表
      var goods_list = [];
      // 商品总价格
      Object.values(orderInfo.store_cart_list).forEach(function (item) {
        goods_list = goods_list.concat(item.goods_list);
      });
      // 商品总数量
      var goodsAllNum = 0;
      goods_list.forEach(function (item) {
        goodsAllNum += Number(item.goods_num);
      });
      this.goodsAllNum = goodsAllNum;
      // 订单总价格
      this.allPrice = Number(orderInfo.order_amount).toFixed(2);
      // 地址hash
      this.address_api = orderInfo.address_api;
      // 发票信息hash
      this.vat_hash = orderInfo.vat_hash;
      // 商品信息
      this.cart_id = orderInfo.cart_id;
      // 运费
      this.goods_freight = orderInfo.goods_freight;
      // 余额
      this.available_predeposit = Number(orderInfo.available_predeposit);
    }
  }]);

  return Settlement;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Settlement , 'pages/settlement'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZW1lbnQuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNldHRsZW1lbnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGF5bWFzayIsIm1hc2siLCJtaXhpbnMiLCJkYXRhIiwicGF5RmxhZyIsInByaWNlQXJyIiwidGl0bGUiLCJpY29uIiwiZmxhZyIsInJlcXVlc3RJbWdVcmwiLCJhZGRyZXNzIiwiZ29vZHNfbGlzdCIsInN0b3JlX2NhcnRfbGlzdCIsImFsbFByaWNlIiwiZ29vZHNBbGxOdW0iLCJhZGRyZXNzX2FwaSIsInZhdF9oYXNoIiwiY2FydF9pZCIsInBheW1lbnRfbGlzdCIsImdvb2RzX2ZyZWlnaHQiLCJwYXltZW50X3R5cGUiLCJhdmFpbGFibGVfcHJlZGVwb3NpdCIsInBhc3N3b3JkIiwicG9zdGFnZSIsInBheV9zbiIsImRpc2FibGVkU3dpdGNoIiwicHJlZGVwb3NpdEZsYWciLCJtaW5pX3d4cGF5RmxhZyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImlucHV0UGFzc3dvcmQiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJjbGlja1N3aXRjaCIsInRoYXQiLCJ3eCIsInNob3dUb2FzdCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsIiRyZWRpcmVjdCIsImNoYW5nZVBheW1lbnQiLCJOdW1iZXIiLCJnZXRXWFBheW1lbnQiLCJhZGRyZXNzX2lkIiwidXJsIiwicGxhY2VPcmRlciIsImlmY2FydCIsIm9mZnBheV9oYXNoIiwib2ZmcGF5X2hhc2hfYmF0Y2giLCJwYXlfbmFtZSIsImludm9pY2VfaWQiLCJ2b3VjaGVyIiwidGhlbiIsImNvZGUiLCJkYXRhcyIsIiRhcHBseSIsInJlcXVlc3RQYXlUeXBlIiwicGF5IiwiY2hlY2tQYXNzd29yZCIsInBhc3N3b3JkRGF0YSIsInN0YXRlIiwicGF5bWVudF9jb2RlIiwicGRfcGF5IiwicmVzUGF5IiwibXNnIiwicmVxdWVzdFBheW1lbnQiLCJhcGlfcGF5IiwiZmFpbCIsImNvbXBsZXRlIiwidGltZXIiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiZXZlbnRzIiwicGF5SW5mbyIsInBheV9pbmZvIiwibWluaV93eHBheSIsInByZWRlcG9zaXQiLCJvcHRpb25zIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJhcHAiLCJvcmRlckluZm8iLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJhZGRyZXNzX2luZm8iLCJ2YWx1ZXMiLCJmb3JFYWNoIiwiY29uY2F0IiwiaXRlbSIsImdvb2RzX251bSIsIm9yZGVyX2Ftb3VudCIsInRvRml4ZWQiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUhBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFFcUJDLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFdBQVUsRUFBQyxnQkFBZSxFQUFoQixFQUFtQix3QkFBdUIsU0FBMUMsRUFBWCxFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyxlQUFTQztBQURDLEssUUFJWkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGVBQVMsS0FESjtBQUVMQyxnQkFBVSxDQUFDLEVBQUNDLE9BQU8sTUFBUixFQUFlQyxNQUFNLGFBQXJCLEVBQW9DQyxNQUFNLENBQTFDLEVBQUQsRUFBOEMsRUFBQ0YsT0FBTyxNQUFSLEVBQWVDLE1BQU0sYUFBckIsRUFBbUNDLE1BQU0sQ0FBekMsRUFBOUMsQ0FGTDtBQUdMQyxxQkFBZSxFQUhWO0FBSUxDLGVBQVMsSUFK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LGVBQXhCLEVBQXlDZ0YsT0FBekMsQ0FBaUQsZ0JBQVE7QUFDdkRqRixxQkFBYUEsV0FBV2tGLE1BQVgsQ0FBa0JDLEtBQUtuRixVQUF2QixDQUFiO0FBQ0QsT0FGRDtBQUdBO0FBQ0EsVUFBSUcsY0FBYyxDQUFsQjtBQUNBSCxpQkFBV2lGLE9BQVgsQ0FBbUIsZ0JBQVE7QUFDekI5RSx1QkFBZStCLE9BQU9pRCxLQUFLQyxTQUFaLENBQWY7QUFDRCxPQUZEO0FBR0EsV0FBS2pGLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0E7QUFDQSxXQUFLRCxRQUFMLEdBQWdCZ0MsT0FBT3dDLFVBQVVXLFlBQWpCLEVBQStCQyxPQUEvQixDQUF1QyxDQUF2QyxDQUFoQjtBQUNBO0FBQ0EsV0FBS2xGLFdBQUwsR0FBbUJzRSxVQUFVdEUsV0FBN0I7QUFDQTtBQUNBLFdBQUtDLFFBQUwsR0FBZ0JxRSxVQUFVckUsUUFBMUI7QUFDQTtBQUNBLFdBQUtDLE9BQUwsR0FBZW9FLFVBQVVwRSxPQUF6QjtBQUNBO0FBQ0EsV0FBS0UsYUFBTCxHQUFxQmtFLFVBQVVsRSxhQUEvQjtBQUNBO0FBQ0EsV0FBS0Usb0JBQUwsR0FBNEJ3QixPQUFPd0MsVUFBVWhFLG9CQUFqQixDQUE1QjtBQUdEOzs7O0VBclBxQzZFLGVBQUtDLEk7O2tCQUF4QjFHLFUiLCJmaWxlIjoic2V0dGxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBtYXNrIGZyb20gJy4uL2NvbXBvbmVudHMvbWFzayc7XHJcblxyXG4vLyDmlK/ku5jmtYHnqItcclxuLy8gMS7nq4vljbPotK3kubAo6YCJ5oup6KeE5qC85pWw6YePKSB3PW1lbWJlcl9idXkmdD1idXlfc3RlcDFcclxuLy8gMi7mj5DkuqTorqLljZUgdz1tZW1iZXJfYnV5JnQ9YnV5X3N0ZXAyXHJcbi8vIDMu5Yik5pat5q2k6K6i5Y2V5pSv5LuY55qE5pSv5LuY5pa55byPIHc9bWVtYmVyX2J1eSZ0PXBheVxyXG4vLyAzLjEg5b6u5L+h5pSv5LuYIHc9bWVtYmVyX3BheW1lbnQmdD1wYXkg5ouJ6LW35pSv5LuYIOaUr+S7mOaIkOWKn+S4juWQpui3s+i9rOiuouWNleWIl+ihqFxyXG4vLyAzLjIg5L2Z6aKd5pSv5LuYICgxKeagueaNrjPliKTmlq3mraTorqLljZXmmK/lkKblvIDlkK/kvZnpop3mlK/ku5gocHJlZGVwb3NpdEZsYWcpIHRydWU66L+b6KGMKDIpO1xyXG4vLyAgICAgICAgICAgICAoMinmoLnmja7kvZnpop3kuI7mlK/ku5jph5Hpop3liKTmlq3mmK/lkKbmlK/mjIHkvZnpop3mlK/ku5ggIHRydWU66L+b6KGMKDMpOyBmYWxzZTog6K+i6Zeu5piv5ZCm5YmN5Y675YWF5YC86aG16Z2iO1xyXG4vLyAgICAgICAgICAgICAoMynovpPlhaXlr4bnoIHliKTmlq3mraPnoa7kuI7lkKYgdz1tZW1iZXJfaW5kZXgmdD1jaGVja19wYXNzd29yZCAgdHJ1ZTrov5vooYwoNClcclxuLy8gICAgICAgICAgICAgKDQpdz1tZW1iZXJfcGF5bWVudCZ0PXBheSAg5pSv5LuY5oiQ5Yqf5LiO5ZCm6Lez6L2s6K6i5Y2V5YiX6KGoXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0bGVtZW50IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5o+Q5Lqk6K6i5Y2VJ1xyXG4gIH07XHJcblxyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJwYXltYXNrXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDptYXNrRmxhZy5zeW5jXCI6XCJwYXlGbGFnXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIHBheW1hc2s6IG1hc2tcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHBheUZsYWc6IGZhbHNlLFxyXG4gICAgcHJpY2VBcnI6IFt7dGl0bGU6ICflvq7kv6HmlK/ku5gnLGljb246ICdpbWFnZTU3LnBuZycsIGZsYWc6IDF9LHt0aXRsZTogJ+S9memineaUr+S7mCcsaWNvbjogJ2ltYWdlNTgucG5nJyxmbGFnOiAwfV0sXHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGFkZHJlc3M6IG51bGwsIC8v5Zyw5Z2A5L+h5oGvXHJcbiAgICBnb29kc19saXN0OiBbXSwgLy/kuIvljZXllYblk4Hkv6Hmga9cclxuICAgIHN0b3JlX2NhcnRfbGlzdDogW10sIC8v5LiL5Y2V5bqX6ZO65YiX6KGoXHJcbiAgICBhbGxQcmljZTogMCwgLy/orqLljZXmgLvku7fmoLxcclxuICAgIGdvb2RzQWxsTnVtOiAwLCAvL+aAu+WFseS7tuaVsFxyXG4gICAgYWRkcmVzc19hcGk6IG51bGwsIC8vIOWcsOWdgOS/oeaBr2hhc2hcclxuICAgIHZhdF9oYXNoOiBudWxsLCAvL+WPkeelqOS/oeaBr2hhc2hcclxuICAgIGNhcnRfaWQ6IG51bGwsIC8v5ZWG5ZOBaWTmlbDph49cclxuICAgIHBheW1lbnRfbGlzdDogW10sIC8vIOaUr+S7mOaWueW8j1xyXG4gICAgZ29vZHNfZnJlaWdodDogMCwgLy/ov5DotLlcclxuICAgIHBheW1lbnRfdHlwZTogMCAsIC8v5LuY5qy+57G75Z6LIDDlvq7kv6EgMeS9meminVxyXG4gICAgYXZhaWxhYmxlX3ByZWRlcG9zaXQ6IDAsIC8v55So5oi35L2Z6aKdXHJcbiAgICBwYXNzd29yZDogJycsIC8vIOeUqOaIt+S9memineWvhueggVxyXG4gICAgcG9zdGFnZToge30sIC8v6YKu6LS5XHJcbiAgICBwYXlfc246ICcnLCAgLy8g5pSv5LuY5Y+C5pWwXHJcbiAgICBkaXNhYmxlZFN3aXRjaDogZmFsc2UsXHJcbiAgICBwcmVkZXBvc2l0RmxhZzogdHJ1ZSwgLy8g5L2Z6aKd5pSv5LuY5piv5ZCm5byA5ZCvXHJcbiAgICBtaW5pX3d4cGF5RmxhZzogdHJ1ZSwgLy8g5b6u5L+h5pSv5LuY5piv5ZCm5byA5ZCvXHJcblxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge1xyXG4gICAgZGlzYWJsZWRTd2l0Y2goKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmF2YWlsYWJsZV9wcmVkZXBvc2l0IDwgdGhpcy5hbGxQcmljZSB8fCAhdGhpcy5wcmVkZXBvc2l0RmxhZ1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBpbnB1dFBhc3N3b3JkKGUpIHtcclxuICAgICAgdGhpcy5wYXNzd29yZCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9LFxyXG4gICAgY2xpY2tTd2l0Y2goKSB7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICBpZighdGhpcy5wcmVkZXBvc2l0RmxhZykge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+S9memineaUr+S7mOaaguacquW8gOWQr++8jOivt+S9v+eUqOW+ruS/oeaUr+S7mCcsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGlmKHRoaXMuYXZhaWxhYmxlX3ByZWRlcG9zaXQgPCB0aGlzLmFsbFByaWNlKSB7XHJcbiAgICAgICAgdGhpcy5wYXltZW50X3R5cGUgPSAwXHJcbiAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgIHRpdGxlOiBcIuaPkOmGklwiLFxyXG4gICAgICAgICAgY29udGVudDogXCLkvZnpop3kuI3otrPvvIzmmK/lkKbliY3lvoDlhYXlgLzvvJ9cIixcclxuICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgIGlmKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgdGhhdC4kcmVkaXJlY3QoYHZpcGApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNoYW5nZVBheW1lbnQoZSkge1xyXG4gICAgICB0aGlzLnBheW1lbnRfdHlwZSA9IE51bWJlcihlLmRldGFpbC52YWx1ZSlcclxuICAgICAgdGhpcy5wYXNzd29yZCA9ICcnXHJcbiAgICB9LFxyXG4gICAgZ2V0V1hQYXltZW50KCkge1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgaWYoIXRoaXMuYWRkcmVzcy5hZGRyZXNzX2lkKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5Zyw5Z2AJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYodGhpcy5wYXlfc24pIHtcclxuICAgICAgICB0aGlzLnBheUZsYWcgPSB0cnVlXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkucGxhY2VPcmRlcixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBjYXJ0X2lkOiB0aGlzLmNhcnRfaWQsXHJcbiAgICAgICAgICBpZmNhcnQ6IDAsICAvLyAxPeaYr+i0reeJqei9pu+8jDA95LiN5piv6LSt54mp6L2mXHJcbiAgICAgICAgICBhZGRyZXNzX2lkOiB0aGlzLmFkZHJlc3MuYWRkcmVzc19pZCwgIC8vIOWcsOWdgGlkXHJcbiAgICAgICAgICB2YXRfaGFzaDogdGhpcy52YXRfaGFzaCwgIC8v5Y+R56Wo5L+h5oGvaGFzaO+8jFxyXG4gICAgICAgICAgb2ZmcGF5X2hhc2g6IHRoaXMuYWRkcmVzc19hcGkub2ZmcGF5X2hhc2gsICAgIC8vIOaYr+WQpuaUr+aMgei0p+WIsOS7mOasvu+8jFxyXG4gICAgICAgICAgb2ZmcGF5X2hhc2hfYmF0Y2g6IHRoaXMuYWRkcmVzc19hcGkub2ZmcGF5X2hhc2hfYmF0Y2gsICAgLy/lupfpk7rmmK/lkKbmlK/mjIHotKfliLDku5jmrL5oYXNoXHJcbiAgICAgICAgICBwYXlfbmFtZTogJ29ubGluZScsXHJcbiAgICAgICAgICBpbnZvaWNlX2lkOiAwLCAgIC8vIOWPkeelqFxyXG4gICAgICAgICAgLy8gcGRfcGF5OiB0aGlzLnBheW1lbnRfdHlwZSwgIC8vIOaUr+S7mOaWueW8j1xyXG4gICAgICAgICAgLy8gcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsICAvLyDmlK/ku5jlr4bnoIFcclxuICAgICAgICAgIHZvdWNoZXI6IG51bGwsICAvLyDkvJjmg6DliLhcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICB0aGlzLnBheUZsYWcgPSB0cnVlXHJcbiAgICAgICAgICB0aGlzLnBheV9zbiA9IHJlcy5kYXRhcy5wYXlfc25cclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIHRoaXMucmVxdWVzdFBheVR5cGUoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+e9kee7nOmUmeivr++8jOivt+eojeWQjuWGjeivlScsXHJcbiAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgcGF5KCkge1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgLy8g5L2Z6aKd5pSv5LuY6Lez5qGG6L6T5YWl5a+G56CBXHJcbiAgICAgIGlmKHRoaXMucGF5bWVudF90eXBlID09IDEpIHtcclxuICAgICAgICBpZighdGhpcy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXlr4bnoIEnLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHBhc3N3b3JkRGF0YSA9IGF3YWl0IGFqYXgoe1xyXG4gICAgICAgICAgdXJsOiBhcGkuY2hlY2tQYXNzd29yZCxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmKHBhc3N3b3JkRGF0YS5kYXRhcy5zdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+WvhueggemUmeivr++8jOivt+mHjeaWsOi+k+WFpScsXHJcbiAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB2YXIgcmVzUGF5ID0gYXdhaXQgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkucGF5LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHBheV9zbjogdGhpcy5wYXlfc24sXHJcbiAgICAgICAgICBwYXltZW50X2NvZGU6ICB0aGlzLnBheW1lbnRfdHlwZSA9PSAwID8gICdtaW5pX3d4cGF5JyAgOiAgJ3ByZWRlcG9zaXQnLFxyXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsICAvLyDmlK/ku5jlr4bnoIFcclxuICAgICAgICAgIHBkX3BheTogdGhpcy5wYXltZW50X3R5cGUsICAvLyDmlK/ku5jmlrnlvI9cclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5kYXRhcylcclxuICAgICAgaWYocmVzUGF5LnN0YXRlID09IDApIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6IHJlc1BheS5tc2csXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgIGlmKHJlc1BheS5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgaWYodGhpcy5wYXltZW50X3R5cGUgPT0gMCkge1xyXG4gICAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xyXG4gICAgICAgICAgICAuLi5yZXNQYXkuYXBpX3BheSxcclxuICAgICAgICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5oiQ5YqfJ1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwgKHJlcykge1xyXG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOWksei0pSdcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuJHJlZGlyZWN0KGBvcmRlcmxpc3RgKTtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcclxuICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOaIkOWKnydcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhhdC4kcmVkaXJlY3QoYG9yZGVybGlzdGApO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXHJcbiAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgIH1cclxuICAgICAgfSBcclxuICAgIH1cclxuICB9O1xyXG4gIGV2ZW50cyA9IHt9O1xyXG4gIHJlcXVlc3RQYXlUeXBlKCkge1xyXG4gICAgLy8g55So5oi36YCJ5oup5pSv5LuY5pa55byP4oCUXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkucGF5SW5mbyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHBheV9zbjogdGhpcy5wYXlfc25cclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLm1pbmlfd3hwYXlGbGFnID0gcmVzLmRhdGFzLnBheV9pbmZvLm1pbmlfd3hwYXlcclxuICAgICAgICB0aGlzLnByZWRlcG9zaXRGbGFnID0gcmVzLmRhdGFzLnBheV9pbmZvLnByZWRlcG9zaXRcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIG9uTG9hZChvcHRpb25zKSB7fVxyXG4gIG9uU2hvdygpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgLy8g5YWo5bGA6K6i5Y2V5L+h5oGvXHJcbiAgICB2YXIgb3JkZXJJbmZvID0gYXBwLmdsb2JhbERhdGEub3JkZXJJbmZvXHJcbiAgICAvLyDpgq7otLnkv6Hmga9cclxuICAgIHRoaXMucG9zdGFnZSA9b3JkZXJJbmZvLmFkZHJlc3NfYXBpLmNvbnRlbnQgfHwge31cclxuICAgIC8vIOWcsOWdgOS/oeaBr1xyXG4gICAgdGhpcy5hZGRyZXNzID0gIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvcmRlckluZm8uYWRkcmVzc19pbmZvKSAgPT0gJ1tvYmplY3QgT2JqZWN0XScgPyBvcmRlckluZm8uYWRkcmVzc19pbmZvIDogJydcclxuICAgIC8vIOWkmuW6l+mTuuS/oeaBr1xyXG4gICAgdGhpcy5zdG9yZV9jYXJ0X2xpc3QgPSBvcmRlckluZm8uc3RvcmVfY2FydF9saXN0XHJcbiAgICAvLyDllYblk4HliJfooahcclxuICAgIHZhciBnb29kc19saXN0ID0gW11cclxuICAgIC8vIOWVhuWTgeaAu+S7t+agvFxyXG4gICAgT2JqZWN0LnZhbHVlcyhvcmRlckluZm8uc3RvcmVfY2FydF9saXN0KS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBnb29kc19saXN0ID0gZ29vZHNfbGlzdC5jb25jYXQoaXRlbS5nb29kc19saXN0KVxyXG4gICAgfSlcclxuICAgIC8vIOWVhuWTgeaAu+aVsOmHj1xyXG4gICAgdmFyIGdvb2RzQWxsTnVtID0gMFxyXG4gICAgZ29vZHNfbGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBnb29kc0FsbE51bSArPSBOdW1iZXIoaXRlbS5nb29kc19udW0pXHJcbiAgICB9KVxyXG4gICAgdGhpcy5nb29kc0FsbE51bSA9IGdvb2RzQWxsTnVtXHJcbiAgICAvLyDorqLljZXmgLvku7fmoLxcclxuICAgIHRoaXMuYWxsUHJpY2UgPSBOdW1iZXIob3JkZXJJbmZvLm9yZGVyX2Ftb3VudCkudG9GaXhlZCgyKVxyXG4gICAgLy8g5Zyw5Z2AaGFzaFxyXG4gICAgdGhpcy5hZGRyZXNzX2FwaSA9IG9yZGVySW5mby5hZGRyZXNzX2FwaVxyXG4gICAgLy8g5Y+R56Wo5L+h5oGvaGFzaFxyXG4gICAgdGhpcy52YXRfaGFzaCA9IG9yZGVySW5mby52YXRfaGFzaFxyXG4gICAgLy8g5ZWG5ZOB5L+h5oGvXHJcbiAgICB0aGlzLmNhcnRfaWQgPSBvcmRlckluZm8uY2FydF9pZFxyXG4gICAgLy8g6L+Q6LS5XHJcbiAgICB0aGlzLmdvb2RzX2ZyZWlnaHQgPSBvcmRlckluZm8uZ29vZHNfZnJlaWdodFxyXG4gICAgLy8g5L2Z6aKdXHJcbiAgICB0aGlzLmF2YWlsYWJsZV9wcmVkZXBvc2l0ID0gTnVtYmVyKG9yZGVySW5mby5hdmFpbGFibGVfcHJlZGVwb3NpdClcclxuXHJcblxyXG4gIH1cclxufVxyXG4iXX0=