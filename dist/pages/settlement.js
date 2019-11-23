'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ajax = require('./../ajax.js');

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _pas_popup = require('./../components/pas_popup.js');

var _pas_popup2 = _interopRequireDefault(_pas_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var api = require('./../api.js');

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
    }, _this.components = {}, _this.mixins = [], _this.data = {
      pasFlag: false,
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
      postage: {} //邮费

    }, _this.computed = {}, _this.methods = {
      inputPassword: function inputPassword(e) {
        this.password = e.detail.value;
      },
      changePayment: function changePayment(e) {
        this.payment_type = Number(e.detail.value);
      },
      getWXPayment: function getWXPayment() {
        var that = this;
        if (!this.address.address_id) {
          wx.showToast({
            title: '请选择地址',
            icon: 'none'
          });
          return false;
        }
        // 余额支付跳框输入密码
        if (this.payment_type == 1) {
          if (!this.password) {
            wx.showToast({
              title: '请输入密码',
              icon: 'none'
            });
            return false;
          }
        }
        this.establishOrder();
      },
      changePriceType: function changePriceType(idx) {
        this.payment_type = idx;
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Settlement, [{
    key: 'establishOrder',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var resOrder, resPay;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _ajax.ajax)({
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
                    pd_pay: this.payment_type, // 支付方式
                    password: this.password, // 支付密码
                    voucher: null // 优惠券
                  }
                }).then(function (res) {
                  return res.datas;
                });

              case 2:
                resOrder = _context.sent;
                _context.next = 5;
                return (0, _ajax.ajax)({
                  url: api.pay,
                  data: {
                    pay_sn: resOrder.pay_sn,
                    payment_code: this.payment_type == 0 ? 'mini_wxpay' : 'predeposit',
                    password: this.password // 支付密码
                  }
                }).then(function (res) {
                  return res.datas;
                });

              case 5:
                resPay = _context.sent;


                if (resPay.state == 1) {
                  wx.requestPayment(_extends({}, resPay.api_pay, {
                    success: function success(res) {
                      wx.showToast({
                        title: '支付成功'
                      });
                      that.$redirect('orderlist');
                    },
                    fail: function fail(res) {
                      that.$redirect('orderlist');
                    }
                  }));
                }

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function establishOrder() {
        return _ref2.apply(this, arguments);
      }

      return establishOrder;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      var _this2 = this;

      // 支付方式列表
      (0, _ajax.ajax)({
        url: api.memberPayment,
        type: 'get'
      }).then(function (res) {
        if (res.code == 200) {
          _this2.payment_list = res.datas.payment_list;
        }
      });
    }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZW1lbnQuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNldHRsZW1lbnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJwYXNGbGFnIiwicHJpY2VBcnIiLCJ0aXRsZSIsImljb24iLCJmbGFnIiwicmVxdWVzdEltZ1VybCIsImFkZHJlc3MiLCJnb29kc19saXN0Iiwic3RvcmVfY2FydF9saXN0IiwiYWxsUHJpY2UiLCJnb29kc0FsbE51bSIsImFkZHJlc3NfYXBpIiwidmF0X2hhc2giLCJjYXJ0X2lkIiwicGF5bWVudF9saXN0IiwiZ29vZHNfZnJlaWdodCIsInBheW1lbnRfdHlwZSIsImF2YWlsYWJsZV9wcmVkZXBvc2l0IiwicGFzc3dvcmQiLCJwb3N0YWdlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiaW5wdXRQYXNzd29yZCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImNoYW5nZVBheW1lbnQiLCJOdW1iZXIiLCJnZXRXWFBheW1lbnQiLCJ0aGF0IiwiYWRkcmVzc19pZCIsInd4Iiwic2hvd1RvYXN0IiwiZXN0YWJsaXNoT3JkZXIiLCJjaGFuZ2VQcmljZVR5cGUiLCJpZHgiLCJldmVudHMiLCJ1cmwiLCJwbGFjZU9yZGVyIiwiaWZjYXJ0Iiwib2ZmcGF5X2hhc2giLCJvZmZwYXlfaGFzaF9iYXRjaCIsInBheV9uYW1lIiwiaW52b2ljZV9pZCIsInBkX3BheSIsInZvdWNoZXIiLCJ0aGVuIiwicmVzIiwiZGF0YXMiLCJyZXNPcmRlciIsInBheSIsInBheV9zbiIsInBheW1lbnRfY29kZSIsInJlc1BheSIsInN0YXRlIiwicmVxdWVzdFBheW1lbnQiLCJhcGlfcGF5Iiwic3VjY2VzcyIsIiRyZWRpcmVjdCIsImZhaWwiLCJvcHRpb25zIiwibWVtYmVyUGF5bWVudCIsInR5cGUiLCJjb2RlIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJhcHAiLCJvcmRlckluZm8iLCJjb250ZW50IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiYWRkcmVzc19pbmZvIiwidmFsdWVzIiwiZm9yRWFjaCIsImNvbmNhdCIsIml0ZW0iLCJnb29kc19udW0iLCJvcmRlcl9hbW91bnQiLCJ0b0ZpeGVkIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFIQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFLcUJDLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxlQUFTLEtBREo7QUFFTEMsZ0JBQVUsQ0FBQyxFQUFDQyxPQUFPLE1BQVIsRUFBZUMsTUFBTSxhQUFyQixFQUFvQ0MsTUFBTSxDQUExQyxFQUFELEVBQThDLEVBQUNGLE9BQU8sTUFBUixFQUFlQyxNQUFNLGFBQXJCLEVBQW1DQyxNQUFNLENBQXpDLEVBQTlDLENBRkw7QUFHTEMscUJBQWUsRUFIVjtBQUlMQyxlQUFTLElBSkosRUFJVTtBQUNmQyxrQkFBWSxFQUxQLEVBS1c7QUFDaEJDLHVCQUFpQixFQU5aLEVBTWdCO0FBQ3JCQyxnQkFBVSxDQVBMLEVBT1E7QUFDYkMsbUJBQWEsQ0FSUixFQVFXO0FBQ2hCQyxtQkFBYSxJQVRSLEVBU2M7QUFDbkJDLGdCQUFVLElBVkwsRUFVVztBQUNoQkMsZUFBUyxJQVhKLEVBV1U7QUFDZkMsb0JBQWMsRUFaVCxFQVlhO0FBQ2xCQyxxQkFBZSxDQWJWLEVBYWE7QUFDbEJDLG9CQUFjLENBZFQsRUFjYTtBQUNsQkMsNEJBQXNCLENBZmpCLEVBZW9CO0FBQ3pCQyxnQkFBVSxFQWhCTCxFQWdCUztBQUNkQyxlQUFTLEVBakJKLENBaUJROztBQWpCUixLLFFBcUJQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDUkMsbUJBRFEseUJBQ01DLENBRE4sRUFD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QWVzRCxVQUFVdEQsT0FBekI7QUFDQTtBQUNBLFdBQUtFLGFBQUwsR0FBcUJvRCxVQUFVcEQsYUFBL0I7QUFDQTtBQUNBLFdBQUtFLG9CQUFMLEdBQTRCVSxPQUFPd0MsVUFBVWxELG9CQUFqQixDQUE1QjtBQUNEOzs7O0VBM0pxQ2dFLGVBQUtDLEk7O2tCQUF4QnhGLFUiLCJmaWxlIjoic2V0dGxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBwYXNwb3B1cCBmcm9tICcuLi9jb21wb25lbnRzL3Bhc19wb3B1cCc7IFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGxlbWVudCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aPkOS6pOiuouWNlSdcclxuICB9O1xyXG5cclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcGFzRmxhZzogZmFsc2UsXHJcbiAgICBwcmljZUFycjogW3t0aXRsZTogJ+W+ruS/oeaUr+S7mCcsaWNvbjogJ2ltYWdlNTcucG5nJywgZmxhZzogMX0se3RpdGxlOiAn5L2Z6aKd5pSv5LuYJyxpY29uOiAnaW1hZ2U1OC5wbmcnLGZsYWc6IDB9XSxcclxuICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgYWRkcmVzczogbnVsbCwgLy/lnLDlnYDkv6Hmga9cclxuICAgIGdvb2RzX2xpc3Q6IFtdLCAvL+S4i+WNleWVhuWTgeS/oeaBr1xyXG4gICAgc3RvcmVfY2FydF9saXN0OiBbXSwgLy/kuIvljZXlupfpk7rliJfooahcclxuICAgIGFsbFByaWNlOiAwLCAvL+iuouWNleaAu+S7t+agvFxyXG4gICAgZ29vZHNBbGxOdW06IDAsIC8v5oC75YWx5Lu25pWwXHJcbiAgICBhZGRyZXNzX2FwaTogbnVsbCwgLy8g5Zyw5Z2A5L+h5oGvaGFzaFxyXG4gICAgdmF0X2hhc2g6IG51bGwsIC8v5Y+R56Wo5L+h5oGvaGFzaFxyXG4gICAgY2FydF9pZDogbnVsbCwgLy/llYblk4FpZOaVsOmHj1xyXG4gICAgcGF5bWVudF9saXN0OiBbXSwgLy8g5pSv5LuY5pa55byPXHJcbiAgICBnb29kc19mcmVpZ2h0OiAwLCAvL+i/kOi0uVxyXG4gICAgcGF5bWVudF90eXBlOiAwICwgLy/ku5jmrL7nsbvlnosgMOW+ruS/oSAx5L2Z6aKdXHJcbiAgICBhdmFpbGFibGVfcHJlZGVwb3NpdDogMCwgLy/nlKjmiLfkvZnpop1cclxuICAgIHBhc3N3b3JkOiAnJywgLy8g55So5oi35L2Z6aKd5a+G56CBXHJcbiAgICBwb3N0YWdlOiB7fSwgLy/pgq7otLlcclxuXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGlucHV0UGFzc3dvcmQoZSkge1xyXG4gICAgICB0aGlzLnBhc3N3b3JkID0gZS5kZXRhaWwudmFsdWVcclxuICAgIH0sXHJcbiAgICBjaGFuZ2VQYXltZW50KGUpIHtcclxuICAgICAgdGhpcy5wYXltZW50X3R5cGUgPSBOdW1iZXIoZS5kZXRhaWwudmFsdWUpXHJcbiAgICB9LFxyXG4gICAgZ2V0V1hQYXltZW50KCkge1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgaWYoIXRoaXMuYWRkcmVzcy5hZGRyZXNzX2lkKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5Zyw5Z2AJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgLy8g5L2Z6aKd5pSv5LuY6Lez5qGG6L6T5YWl5a+G56CBXHJcbiAgICAgIGlmKHRoaXMucGF5bWVudF90eXBlID09IDEpIHtcclxuICAgICAgICBpZighdGhpcy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXlr4bnoIEnLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5lc3RhYmxpc2hPcmRlcigpXHJcbiAgICB9LFxyXG4gICAgY2hhbmdlUHJpY2VUeXBlKGlkeCkge1xyXG4gICAgICB0aGlzLnBheW1lbnRfdHlwZSA9IGlkeFxyXG4gICAgfVxyXG4gIH07XHJcbiAgYXN5bmMgZXN0YWJsaXNoT3JkZXIoKSB7XHJcbiAgICAvL2FzeW5j5Ye95pWw77yM6YG/5YWN5byC5q2l5Ye95pWw5bWM5aWXIGh0dHBzOi8vd2VweWpzLmdpdGh1Yi5pby93ZXB5LWRvY3MvMS54LyMvP2lkPemSiOWvueWOn+eUn2Fwaei/m+ihjOS8mOWMllxyXG4gICAgdmFyIHJlc09yZGVyID0gYXdhaXQgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLnBsYWNlT3JkZXIsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBjYXJ0X2lkOiB0aGlzLmNhcnRfaWQsXHJcbiAgICAgICAgaWZjYXJ0OiAwLCAgLy8gMT3mmK/otK3nianovabvvIwwPeS4jeaYr+i0reeJqei9plxyXG4gICAgICAgIGFkZHJlc3NfaWQ6IHRoaXMuYWRkcmVzcy5hZGRyZXNzX2lkLCAgLy8g5Zyw5Z2AaWRcclxuICAgICAgICB2YXRfaGFzaDogdGhpcy52YXRfaGFzaCwgIC8v5Y+R56Wo5L+h5oGvaGFzaO+8jFxyXG4gICAgICAgIG9mZnBheV9oYXNoOiB0aGlzLmFkZHJlc3NfYXBpLm9mZnBheV9oYXNoLCAgICAvLyDmmK/lkKbmlK/mjIHotKfliLDku5jmrL7vvIxcclxuICAgICAgICBvZmZwYXlfaGFzaF9iYXRjaDogdGhpcy5hZGRyZXNzX2FwaS5vZmZwYXlfaGFzaF9iYXRjaCwgICAvL+W6l+mTuuaYr+WQpuaUr+aMgei0p+WIsOS7mOasvmhhc2hcclxuICAgICAgICBwYXlfbmFtZTogJ29ubGluZScsXHJcbiAgICAgICAgaW52b2ljZV9pZDogMCwgICAvLyDlj5HnpahcclxuICAgICAgICBwZF9wYXk6IHRoaXMucGF5bWVudF90eXBlLCAgLy8g5pSv5LuY5pa55byPXHJcbiAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsICAvLyDmlK/ku5jlr4bnoIFcclxuICAgICAgICB2b3VjaGVyOiBudWxsLCAgLy8g5LyY5oOg5Yi4XHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHJlcy5kYXRhcylcclxuXHJcbiAgICB2YXIgcmVzUGF5ID0gYXdhaXQgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLnBheSxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHBheV9zbjogcmVzT3JkZXIucGF5X3NuLFxyXG4gICAgICAgIHBheW1lbnRfY29kZTogIHRoaXMucGF5bWVudF90eXBlID09IDAgPyAgJ21pbmlfd3hwYXknICA6ICAncHJlZGVwb3NpdCcsXHJcbiAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsICAvLyDmlK/ku5jlr4bnoIFcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4gcmVzLmRhdGFzKVxyXG4gICAgXHJcbiAgICBpZihyZXNQYXkuc3RhdGUgPT0gMSkge1xyXG4gICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XHJcbiAgICAgICAgLi4ucmVzUGF5LmFwaV9wYXksXHJcbiAgICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOaIkOWKnydcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICB0aGF0LiRyZWRpcmVjdChgb3JkZXJsaXN0YCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsIChyZXMpIHtcclxuICAgICAgICAgICAgdGhhdC4kcmVkaXJlY3QoYG9yZGVybGlzdGApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0gXHJcbiAgfVxyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgLy8g5pSv5LuY5pa55byP5YiX6KGoXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkubWVtYmVyUGF5bWVudCxcclxuICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHRoaXMucGF5bWVudF9saXN0ID0gcmVzLmRhdGFzLnBheW1lbnRfbGlzdFxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgIC8vIOWFqOWxgOiuouWNleS/oeaBr1xyXG4gICAgdmFyIG9yZGVySW5mbyA9IGFwcC5nbG9iYWxEYXRhLm9yZGVySW5mb1xyXG4gICAgLy8g6YKu6LS55L+h5oGvXHJcbiAgICB0aGlzLnBvc3RhZ2UgPW9yZGVySW5mby5hZGRyZXNzX2FwaS5jb250ZW50IHx8IHt9XHJcbiAgICAvLyDlnLDlnYDkv6Hmga9cclxuICAgIHRoaXMuYWRkcmVzcyA9ICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob3JkZXJJbmZvLmFkZHJlc3NfaW5mbykgID09ICdbb2JqZWN0IE9iamVjdF0nID8gb3JkZXJJbmZvLmFkZHJlc3NfaW5mbyA6ICcnXHJcbiAgICAvLyDlpJrlupfpk7rkv6Hmga9cclxuICAgIHRoaXMuc3RvcmVfY2FydF9saXN0ID0gb3JkZXJJbmZvLnN0b3JlX2NhcnRfbGlzdFxyXG4gICAgLy8g5ZWG5ZOB5YiX6KGoXHJcbiAgICB2YXIgZ29vZHNfbGlzdCA9IFtdXHJcbiAgICAvLyDllYblk4HmgLvku7fmoLxcclxuICAgIE9iamVjdC52YWx1ZXMob3JkZXJJbmZvLnN0b3JlX2NhcnRfbGlzdCkuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgZ29vZHNfbGlzdCA9IGdvb2RzX2xpc3QuY29uY2F0KGl0ZW0uZ29vZHNfbGlzdClcclxuICAgIH0pXHJcbiAgICAvLyDllYblk4HmgLvmlbDph49cclxuICAgIHZhciBnb29kc0FsbE51bSA9IDBcclxuICAgIGdvb2RzX2xpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgZ29vZHNBbGxOdW0gKz0gTnVtYmVyKGl0ZW0uZ29vZHNfbnVtKVxyXG4gICAgfSlcclxuICAgIHRoaXMuZ29vZHNBbGxOdW0gPSBnb29kc0FsbE51bVxyXG4gICAgLy8g6K6i5Y2V5oC75Lu35qC8XHJcbiAgICB0aGlzLmFsbFByaWNlID0gTnVtYmVyKG9yZGVySW5mby5vcmRlcl9hbW91bnQpLnRvRml4ZWQoMilcclxuICAgIC8vIOWcsOWdgGhhc2hcclxuICAgIHRoaXMuYWRkcmVzc19hcGkgPSBvcmRlckluZm8uYWRkcmVzc19hcGlcclxuICAgIC8vIOWPkeelqOS/oeaBr2hhc2hcclxuICAgIHRoaXMudmF0X2hhc2ggPSBvcmRlckluZm8udmF0X2hhc2hcclxuICAgIC8vIOWVhuWTgeS/oeaBr1xyXG4gICAgdGhpcy5jYXJ0X2lkID0gb3JkZXJJbmZvLmNhcnRfaWRcclxuICAgIC8vIOi/kOi0uVxyXG4gICAgdGhpcy5nb29kc19mcmVpZ2h0ID0gb3JkZXJJbmZvLmdvb2RzX2ZyZWlnaHRcclxuICAgIC8vIOS9meminVxyXG4gICAgdGhpcy5hdmFpbGFibGVfcHJlZGVwb3NpdCA9IE51bWJlcihvcmRlckluZm8uYXZhaWxhYmxlX3ByZWRlcG9zaXQpXHJcbiAgfVxyXG59XHJcbiJdfQ==