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
      member_points: 0, //用户余额
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
                    payment_code: this.payment_type == 0 ? 'mini_wxpay' : 'predeposit'
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
      this.member_points = Number(orderInfo.member_points);
    }
  }]);

  return Settlement;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Settlement , 'pages/settlement'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZW1lbnQuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNldHRsZW1lbnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJwYXNGbGFnIiwicHJpY2VBcnIiLCJ0aXRsZSIsImljb24iLCJmbGFnIiwicmVxdWVzdEltZ1VybCIsImFkZHJlc3MiLCJnb29kc19saXN0Iiwic3RvcmVfY2FydF9saXN0IiwiYWxsUHJpY2UiLCJnb29kc0FsbE51bSIsImFkZHJlc3NfYXBpIiwidmF0X2hhc2giLCJjYXJ0X2lkIiwicGF5bWVudF9saXN0IiwiZ29vZHNfZnJlaWdodCIsInBheW1lbnRfdHlwZSIsIm1lbWJlcl9wb2ludHMiLCJwYXNzd29yZCIsInBvc3RhZ2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJpbnB1dFBhc3N3b3JkIiwiZSIsImRldGFpbCIsInZhbHVlIiwiY2hhbmdlUGF5bWVudCIsIk51bWJlciIsImdldFdYUGF5bWVudCIsInRoYXQiLCJhZGRyZXNzX2lkIiwid3giLCJzaG93VG9hc3QiLCJlc3RhYmxpc2hPcmRlciIsImNoYW5nZVByaWNlVHlwZSIsImlkeCIsImV2ZW50cyIsInVybCIsInBsYWNlT3JkZXIiLCJpZmNhcnQiLCJvZmZwYXlfaGFzaCIsIm9mZnBheV9oYXNoX2JhdGNoIiwicGF5X25hbWUiLCJpbnZvaWNlX2lkIiwicGRfcGF5Iiwidm91Y2hlciIsInRoZW4iLCJyZXMiLCJkYXRhcyIsInJlc09yZGVyIiwicGF5IiwicGF5X3NuIiwicGF5bWVudF9jb2RlIiwicmVzUGF5Iiwic3RhdGUiLCJyZXF1ZXN0UGF5bWVudCIsImFwaV9wYXkiLCJzdWNjZXNzIiwiJHJlZGlyZWN0IiwiZmFpbCIsIm9wdGlvbnMiLCJtZW1iZXJQYXltZW50IiwidHlwZSIsImNvZGUiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImFwcCIsIm9yZGVySW5mbyIsImNvbnRlbnQiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJhZGRyZXNzX2luZm8iLCJ2YWx1ZXMiLCJmb3JFYWNoIiwiY29uY2F0IiwiaXRlbSIsImdvb2RzX251bSIsIm9yZGVyX2Ftb3VudCIsInRvRml4ZWQiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUhBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUtxQkMsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGVBQVMsS0FESjtBQUVMQyxnQkFBVSxDQUFDLEVBQUNDLE9BQU8sTUFBUixFQUFlQyxNQUFNLGFBQXJCLEVBQW9DQyxNQUFNLENBQTFDLEVBQUQsRUFBOEMsRUFBQ0YsT0FBTyxNQUFSLEVBQWVDLE1BQU0sYUFBckIsRUFBbUNDLE1BQU0sQ0FBekMsRUFBOUMsQ0FGTDtBQUdMQyxxQkFBZSxFQUhWO0FBSUxDLGVBQVMsSUFKSixFQUlVO0FBQ2ZDLGtCQUFZLEVBTFAsRUFLVztBQUNoQkMsdUJBQWlCLEVBTlosRUFNZ0I7QUFDckJDLGdCQUFVLENBUEwsRUFPUTtBQUNiQyxtQkFBYSxDQVJSLEVBUVc7QUFDaEJDLG1CQUFhLElBVFIsRUFTYztBQUNuQkMsZ0JBQVUsSUFWTCxFQVVXO0FBQ2hCQyxlQUFTLElBWEosRUFXVTtBQUNmQyxvQkFBYyxFQVpULEVBWWE7QUFDbEJDLHFCQUFlLENBYlYsRUFhYTtBQUNsQkMsb0JBQWMsQ0FkVCxFQWNhO0FBQ2xCQyxxQkFBZSxDQWZWLEVBZWE7QUFDbEJDLGdCQUFVLEVBaEJMLEVBZ0JTO0FBQ2RDLGVBQVMsRUFqQkosQ0FpQlE7O0FBakJSLEssUUFxQlBDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSQyxtQkFEUSx5QkFDTUMsQ0FETixFQUNTO0FBQ2YsYUFB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RCxVQUFVcEQsYUFBL0I7QUFDQTtBQUNBLFdBQUtFLGFBQUwsR0FBcUJVLE9BQU93QyxVQUFVbEQsYUFBakIsQ0FBckI7QUFDRDs7OztFQTFKcUNnRSxlQUFLQyxJOztrQkFBeEJ4RixVIiwiZmlsZSI6InNldHRsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgcGFzcG9wdXAgZnJvbSAnLi4vY29tcG9uZW50cy9wYXNfcG9wdXAnOyBcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRsZW1lbnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmj5DkuqTorqLljZUnXHJcbiAgfTtcclxuXHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHBhc0ZsYWc6IGZhbHNlLFxyXG4gICAgcHJpY2VBcnI6IFt7dGl0bGU6ICflvq7kv6HmlK/ku5gnLGljb246ICdpbWFnZTU3LnBuZycsIGZsYWc6IDF9LHt0aXRsZTogJ+S9memineaUr+S7mCcsaWNvbjogJ2ltYWdlNTgucG5nJyxmbGFnOiAwfV0sXHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGFkZHJlc3M6IG51bGwsIC8v5Zyw5Z2A5L+h5oGvXHJcbiAgICBnb29kc19saXN0OiBbXSwgLy/kuIvljZXllYblk4Hkv6Hmga9cclxuICAgIHN0b3JlX2NhcnRfbGlzdDogW10sIC8v5LiL5Y2V5bqX6ZO65YiX6KGoXHJcbiAgICBhbGxQcmljZTogMCwgLy/orqLljZXmgLvku7fmoLxcclxuICAgIGdvb2RzQWxsTnVtOiAwLCAvL+aAu+WFseS7tuaVsFxyXG4gICAgYWRkcmVzc19hcGk6IG51bGwsIC8vIOWcsOWdgOS/oeaBr2hhc2hcclxuICAgIHZhdF9oYXNoOiBudWxsLCAvL+WPkeelqOS/oeaBr2hhc2hcclxuICAgIGNhcnRfaWQ6IG51bGwsIC8v5ZWG5ZOBaWTmlbDph49cclxuICAgIHBheW1lbnRfbGlzdDogW10sIC8vIOaUr+S7mOaWueW8j1xyXG4gICAgZ29vZHNfZnJlaWdodDogMCwgLy/ov5DotLlcclxuICAgIHBheW1lbnRfdHlwZTogMCAsIC8v5LuY5qy+57G75Z6LIDDlvq7kv6EgMeS9meminVxyXG4gICAgbWVtYmVyX3BvaW50czogMCwgLy/nlKjmiLfkvZnpop1cclxuICAgIHBhc3N3b3JkOiAnJywgLy8g55So5oi35L2Z6aKd5a+G56CBXHJcbiAgICBwb3N0YWdlOiB7fSwgLy/pgq7otLlcclxuXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGlucHV0UGFzc3dvcmQoZSkge1xyXG4gICAgICB0aGlzLnBhc3N3b3JkID0gZS5kZXRhaWwudmFsdWVcclxuICAgIH0sXHJcbiAgICBjaGFuZ2VQYXltZW50KGUpIHtcclxuICAgICAgdGhpcy5wYXltZW50X3R5cGUgPSBOdW1iZXIoZS5kZXRhaWwudmFsdWUpXHJcbiAgICB9LFxyXG4gICAgZ2V0V1hQYXltZW50KCkge1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgaWYoIXRoaXMuYWRkcmVzcy5hZGRyZXNzX2lkKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5Zyw5Z2AJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgLy8g5L2Z6aKd5pSv5LuY6Lez5qGG6L6T5YWl5a+G56CBXHJcbiAgICAgIGlmKHRoaXMucGF5bWVudF90eXBlID09IDEpIHtcclxuICAgICAgICBpZighdGhpcy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXlr4bnoIEnLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5lc3RhYmxpc2hPcmRlcigpXHJcbiAgICB9LFxyXG4gICAgY2hhbmdlUHJpY2VUeXBlKGlkeCkge1xyXG4gICAgICB0aGlzLnBheW1lbnRfdHlwZSA9IGlkeFxyXG4gICAgfVxyXG4gIH07XHJcbiAgYXN5bmMgZXN0YWJsaXNoT3JkZXIoKSB7XHJcbiAgICAvL2FzeW5j5Ye95pWw77yM6YG/5YWN5byC5q2l5Ye95pWw5bWM5aWXIGh0dHBzOi8vd2VweWpzLmdpdGh1Yi5pby93ZXB5LWRvY3MvMS54LyMvP2lkPemSiOWvueWOn+eUn2Fwaei/m+ihjOS8mOWMllxyXG4gICAgdmFyIHJlc09yZGVyID0gYXdhaXQgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLnBsYWNlT3JkZXIsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBjYXJ0X2lkOiB0aGlzLmNhcnRfaWQsXHJcbiAgICAgICAgaWZjYXJ0OiAwLCAgLy8gMT3mmK/otK3nianovabvvIwwPeS4jeaYr+i0reeJqei9plxyXG4gICAgICAgIGFkZHJlc3NfaWQ6IHRoaXMuYWRkcmVzcy5hZGRyZXNzX2lkLCAgLy8g5Zyw5Z2AaWRcclxuICAgICAgICB2YXRfaGFzaDogdGhpcy52YXRfaGFzaCwgIC8v5Y+R56Wo5L+h5oGvaGFzaO+8jFxyXG4gICAgICAgIG9mZnBheV9oYXNoOiB0aGlzLmFkZHJlc3NfYXBpLm9mZnBheV9oYXNoLCAgICAvLyDmmK/lkKbmlK/mjIHotKfliLDku5jmrL7vvIxcclxuICAgICAgICBvZmZwYXlfaGFzaF9iYXRjaDogdGhpcy5hZGRyZXNzX2FwaS5vZmZwYXlfaGFzaF9iYXRjaCwgICAvL+W6l+mTuuaYr+WQpuaUr+aMgei0p+WIsOS7mOasvmhhc2hcclxuICAgICAgICBwYXlfbmFtZTogJ29ubGluZScsXHJcbiAgICAgICAgaW52b2ljZV9pZDogMCwgICAvLyDlj5HnpahcclxuICAgICAgICBwZF9wYXk6IHRoaXMucGF5bWVudF90eXBlLCAgLy8g5pSv5LuY5pa55byPXHJcbiAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsICAvLyDmlK/ku5jlr4bnoIFcclxuICAgICAgICB2b3VjaGVyOiBudWxsLCAgLy8g5LyY5oOg5Yi4XHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHJlcy5kYXRhcylcclxuXHJcbiAgICB2YXIgcmVzUGF5ID0gYXdhaXQgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLnBheSxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHBheV9zbjogcmVzT3JkZXIucGF5X3NuLFxyXG4gICAgICAgIHBheW1lbnRfY29kZTogIHRoaXMucGF5bWVudF90eXBlID09IDAgPyAgJ21pbmlfd3hwYXknICA6ICAncHJlZGVwb3NpdCdcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4gcmVzLmRhdGFzKVxyXG4gICAgXHJcbiAgICBpZihyZXNQYXkuc3RhdGUgPT0gMSkge1xyXG4gICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XHJcbiAgICAgICAgLi4ucmVzUGF5LmFwaV9wYXksXHJcbiAgICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOaIkOWKnydcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICB0aGF0LiRyZWRpcmVjdChgb3JkZXJsaXN0YCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsIChyZXMpIHtcclxuICAgICAgICAgICAgdGhhdC4kcmVkaXJlY3QoYG9yZGVybGlzdGApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0gXHJcbiAgfVxyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgLy8g5pSv5LuY5pa55byP5YiX6KGoXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkubWVtYmVyUGF5bWVudCxcclxuICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHRoaXMucGF5bWVudF9saXN0ID0gcmVzLmRhdGFzLnBheW1lbnRfbGlzdFxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgIC8vIOWFqOWxgOiuouWNleS/oeaBr1xyXG4gICAgdmFyIG9yZGVySW5mbyA9IGFwcC5nbG9iYWxEYXRhLm9yZGVySW5mb1xyXG4gICAgLy8g6YKu6LS55L+h5oGvXHJcbiAgICB0aGlzLnBvc3RhZ2UgPW9yZGVySW5mby5hZGRyZXNzX2FwaS5jb250ZW50IHx8IHt9XHJcbiAgICAvLyDlnLDlnYDkv6Hmga9cclxuICAgIHRoaXMuYWRkcmVzcyA9ICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob3JkZXJJbmZvLmFkZHJlc3NfaW5mbykgID09ICdbb2JqZWN0IE9iamVjdF0nID8gb3JkZXJJbmZvLmFkZHJlc3NfaW5mbyA6ICcnXHJcbiAgICAvLyDlpJrlupfpk7rkv6Hmga9cclxuICAgIHRoaXMuc3RvcmVfY2FydF9saXN0ID0gb3JkZXJJbmZvLnN0b3JlX2NhcnRfbGlzdFxyXG4gICAgLy8g5ZWG5ZOB5YiX6KGoXHJcbiAgICB2YXIgZ29vZHNfbGlzdCA9IFtdXHJcbiAgICAvLyDllYblk4HmgLvku7fmoLxcclxuICAgIE9iamVjdC52YWx1ZXMob3JkZXJJbmZvLnN0b3JlX2NhcnRfbGlzdCkuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgZ29vZHNfbGlzdCA9IGdvb2RzX2xpc3QuY29uY2F0KGl0ZW0uZ29vZHNfbGlzdClcclxuICAgIH0pXHJcbiAgICAvLyDllYblk4HmgLvmlbDph49cclxuICAgIHZhciBnb29kc0FsbE51bSA9IDBcclxuICAgIGdvb2RzX2xpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgZ29vZHNBbGxOdW0gKz0gTnVtYmVyKGl0ZW0uZ29vZHNfbnVtKVxyXG4gICAgfSlcclxuICAgIHRoaXMuZ29vZHNBbGxOdW0gPSBnb29kc0FsbE51bVxyXG4gICAgLy8g6K6i5Y2V5oC75Lu35qC8XHJcbiAgICB0aGlzLmFsbFByaWNlID0gTnVtYmVyKG9yZGVySW5mby5vcmRlcl9hbW91bnQpLnRvRml4ZWQoMilcclxuICAgIC8vIOWcsOWdgGhhc2hcclxuICAgIHRoaXMuYWRkcmVzc19hcGkgPSBvcmRlckluZm8uYWRkcmVzc19hcGlcclxuICAgIC8vIOWPkeelqOS/oeaBr2hhc2hcclxuICAgIHRoaXMudmF0X2hhc2ggPSBvcmRlckluZm8udmF0X2hhc2hcclxuICAgIC8vIOWVhuWTgeS/oeaBr1xyXG4gICAgdGhpcy5jYXJ0X2lkID0gb3JkZXJJbmZvLmNhcnRfaWRcclxuICAgIC8vIOi/kOi0uVxyXG4gICAgdGhpcy5nb29kc19mcmVpZ2h0ID0gb3JkZXJJbmZvLmdvb2RzX2ZyZWlnaHRcclxuICAgIC8vIOS9meminVxyXG4gICAgdGhpcy5tZW1iZXJfcG9pbnRzID0gTnVtYmVyKG9yZGVySW5mby5tZW1iZXJfcG9pbnRzKVxyXG4gIH1cclxufVxyXG4iXX0=