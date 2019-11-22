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
    }, _this.$repeat = {}, _this.$props = { "paspopup": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:pasFlag.sync": "pasFlag", "v-bind:pasPrice.sync": "pasPrice" } }, _this.$events = { "paspopup": { "v-on:pasHanld": "pasHanld" } }, _this.components = {
      paspopup: _pas_popup2.default
    }, _this.mixins = [], _this.data = {
      pasFlag: false, // 余额支付
      pasPrice: '1000', // 余额支付
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
      // 余额支付密码回调
      pasHanld: function pasHanld(e) {
        console.log(e);
        this.pasFlag = false;
        this.establishOrder();
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
          this.pasFlag = true;
          return false;
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
                    password: '666', // 支付密码
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZW1lbnQuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNldHRsZW1lbnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGFzcG9wdXAiLCJtaXhpbnMiLCJkYXRhIiwicGFzRmxhZyIsInBhc1ByaWNlIiwicHJpY2VBcnIiLCJ0aXRsZSIsImljb24iLCJmbGFnIiwicmVxdWVzdEltZ1VybCIsImFkZHJlc3MiLCJnb29kc19saXN0Iiwic3RvcmVfY2FydF9saXN0IiwiYWxsUHJpY2UiLCJnb29kc0FsbE51bSIsImFkZHJlc3NfYXBpIiwidmF0X2hhc2giLCJjYXJ0X2lkIiwicGF5bWVudF9saXN0IiwiZ29vZHNfZnJlaWdodCIsInBheW1lbnRfdHlwZSIsIm1lbWJlcl9wb2ludHMiLCJwYXNzd29yZCIsInBvc3RhZ2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJwYXNIYW5sZCIsImUiLCJjb25zb2xlIiwibG9nIiwiZXN0YWJsaXNoT3JkZXIiLCJnZXRXWFBheW1lbnQiLCJ0aGF0IiwiYWRkcmVzc19pZCIsInd4Iiwic2hvd1RvYXN0IiwiY2hhbmdlUHJpY2VUeXBlIiwiaWR4IiwiZXZlbnRzIiwidXJsIiwicGxhY2VPcmRlciIsImlmY2FydCIsIm9mZnBheV9oYXNoIiwib2ZmcGF5X2hhc2hfYmF0Y2giLCJwYXlfbmFtZSIsImludm9pY2VfaWQiLCJwZF9wYXkiLCJ2b3VjaGVyIiwidGhlbiIsInJlcyIsImRhdGFzIiwicmVzT3JkZXIiLCJwYXkiLCJwYXlfc24iLCJwYXltZW50X2NvZGUiLCJyZXNQYXkiLCJzdGF0ZSIsInJlcXVlc3RQYXltZW50IiwiYXBpX3BheSIsInN1Y2Nlc3MiLCIkcmVkaXJlY3QiLCJmYWlsIiwib3B0aW9ucyIsIm1lbWJlclBheW1lbnQiLCJ0eXBlIiwiY29kZSIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiYXBwIiwib3JkZXJJbmZvIiwiY29udGVudCIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsImFkZHJlc3NfaW5mbyIsInZhbHVlcyIsImZvckVhY2giLCJjb25jYXQiLCJpdGVtIiwiTnVtYmVyIiwiZ29vZHNfbnVtIiwib3JkZXJfYW1vdW50IiwidG9GaXhlZCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBSEEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBS3FCQyxVOzs7Ozs7Ozs7Ozs7Ozs4TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsY0FBYSxFQUFkLEVBQWlCLGdCQUFlLEVBQWhDLEVBQW1DLHVCQUFzQixTQUF6RCxFQUFtRSx3QkFBdUIsVUFBMUYsRUFBWixFLFFBQ1RDLE8sR0FBVSxFQUFDLFlBQVcsRUFBQyxpQkFBZ0IsVUFBakIsRUFBWixFLFFBQ1RDLFUsR0FBYTtBQUNWQztBQURVLEssUUFJWkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGVBQVMsS0FESixFQUNZO0FBQ2pCQyxnQkFBVSxNQUZMLEVBRWE7QUFDbEJDLGdCQUFVLENBQUMsRUFBQ0MsT0FBTyxNQUFSLEVBQWVDLE1BQU0sYUFBckIsRUFBb0NDLE1BQU0sQ0FBMUMsRUFBRCxFQUE4QyxFQUFDRixPQUFPLE1BQVIsRUFBZUMsTUFBTSxhQUFyQixFQUFtQ0MsTUFBTSxDQUF6QyxFQUE5QyxDQUhMO0FBSUxDLHFCQUFlLEVBSlY7QUFLTEMsZUFBUyxJQUxKLEVBS1U7QUFDZkMsa0JBQVksRUFOUCxFQU1XO0FBQ2hCQyx1QkFBaUIsRUFQWixFQU9nQjtBQUNyQkMsZ0JBQVUsQ0FSTCxFQVFRO0FBQ2JDLG1CQUFhLENBVFIsRUFTVztBQUNoQkMsbUJBQWEsSUFWUixFQVVjO0FBQ25CQyxnQkFBVSxJQVhMLEVBV1c7QUFD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Z0JxRCxVQUFVckQsUUFBMUI7QUFDQTtBQUNBLFdBQUtDLE9BQUwsR0FBZW9ELFVBQVVwRCxPQUF6QjtBQUNBO0FBQ0EsV0FBS0UsYUFBTCxHQUFxQmtELFVBQVVsRCxhQUEvQjtBQUNBO0FBQ0EsV0FBS0UsYUFBTCxHQUFxQjJELE9BQU9YLFVBQVVoRCxhQUFqQixDQUFyQjtBQUNEOzs7O0VBM0pxQytELGVBQUtDLEk7O2tCQUF4QjVGLFUiLCJmaWxlIjoic2V0dGxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBwYXNwb3B1cCBmcm9tICcuLi9jb21wb25lbnRzL3Bhc19wb3B1cCc7IFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGxlbWVudCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aPkOS6pOiuouWNlSdcclxuICB9O1xyXG5cclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wicGFzcG9wdXBcIjp7XCJ4bWxuczp2LW9uXCI6XCJcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cGFzRmxhZy5zeW5jXCI6XCJwYXNGbGFnXCIsXCJ2LWJpbmQ6cGFzUHJpY2Uuc3luY1wiOlwicGFzUHJpY2VcIn19O1xyXG4kZXZlbnRzID0ge1wicGFzcG9wdXBcIjp7XCJ2LW9uOnBhc0hhbmxkXCI6XCJwYXNIYW5sZFwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgcGFzcG9wdXBcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHBhc0ZsYWc6IGZhbHNlLCAgLy8g5L2Z6aKd5pSv5LuYXHJcbiAgICBwYXNQcmljZTogJzEwMDAnLCAvLyDkvZnpop3mlK/ku5hcclxuICAgIHByaWNlQXJyOiBbe3RpdGxlOiAn5b6u5L+h5pSv5LuYJyxpY29uOiAnaW1hZ2U1Ny5wbmcnLCBmbGFnOiAxfSx7dGl0bGU6ICfkvZnpop3mlK/ku5gnLGljb246ICdpbWFnZTU4LnBuZycsZmxhZzogMH1dLFxyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBhZGRyZXNzOiBudWxsLCAvL+WcsOWdgOS/oeaBr1xyXG4gICAgZ29vZHNfbGlzdDogW10sIC8v5LiL5Y2V5ZWG5ZOB5L+h5oGvXHJcbiAgICBzdG9yZV9jYXJ0X2xpc3Q6IFtdLCAvL+S4i+WNleW6l+mTuuWIl+ihqFxyXG4gICAgYWxsUHJpY2U6IDAsIC8v6K6i5Y2V5oC75Lu35qC8XHJcbiAgICBnb29kc0FsbE51bTogMCwgLy/mgLvlhbHku7bmlbBcclxuICAgIGFkZHJlc3NfYXBpOiBudWxsLCAvLyDlnLDlnYDkv6Hmga9oYXNoXHJcbiAgICB2YXRfaGFzaDogbnVsbCwgLy/lj5Hnpajkv6Hmga9oYXNoXHJcbiAgICBjYXJ0X2lkOiBudWxsLCAvL+WVhuWTgWlk5pWw6YePXHJcbiAgICBwYXltZW50X2xpc3Q6IFtdLCAvLyDmlK/ku5jmlrnlvI9cclxuICAgIGdvb2RzX2ZyZWlnaHQ6IDAsIC8v6L+Q6LS5XHJcbiAgICBwYXltZW50X3R5cGU6IDAgLCAvL+S7mOasvuexu+WeiyAw5b6u5L+hIDHkvZnpop1cclxuICAgIG1lbWJlcl9wb2ludHM6IDAsIC8v55So5oi35L2Z6aKdXHJcbiAgICBwYXNzd29yZDogJycsIC8vIOeUqOaIt+S9memineWvhueggVxyXG4gICAgcG9zdGFnZToge30sIC8v6YKu6LS5XHJcblxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAgLy8g5L2Z6aKd5pSv5LuY5a+G56CB5Zue6LCDXHJcbiAgICBwYXNIYW5sZChlKXtcclxuICAgICAgY29uc29sZS5sb2coZSlcclxuICAgICAgdGhpcy5wYXNGbGFnID0gZmFsc2VcclxuICAgICAgdGhpcy5lc3RhYmxpc2hPcmRlcigpXHJcbiAgICB9LFxyXG4gICAgZ2V0V1hQYXltZW50KCkge1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgaWYoIXRoaXMuYWRkcmVzcy5hZGRyZXNzX2lkKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5Zyw5Z2AJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgLy8g5L2Z6aKd5pSv5LuY6Lez5qGG6L6T5YWl5a+G56CBXHJcbiAgICAgIGlmKHRoaXMucGF5bWVudF90eXBlID09IDEpIHtcclxuICAgICAgICB0aGlzLnBhc0ZsYWcgPSB0cnVlXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5lc3RhYmxpc2hPcmRlcigpXHJcbiAgICB9LFxyXG4gICAgY2hhbmdlUHJpY2VUeXBlKGlkeCkge1xyXG4gICAgICB0aGlzLnBheW1lbnRfdHlwZSA9IGlkeFxyXG4gICAgfVxyXG4gIH07XHJcbiAgYXN5bmMgZXN0YWJsaXNoT3JkZXIoKSB7XHJcbiAgICAvL2FzeW5j5Ye95pWw77yM6YG/5YWN5byC5q2l5Ye95pWw5bWM5aWXIGh0dHBzOi8vd2VweWpzLmdpdGh1Yi5pby93ZXB5LWRvY3MvMS54LyMvP2lkPemSiOWvueWOn+eUn2Fwaei/m+ihjOS8mOWMllxyXG4gICAgdmFyIHJlc09yZGVyID0gYXdhaXQgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLnBsYWNlT3JkZXIsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBjYXJ0X2lkOiB0aGlzLmNhcnRfaWQsXHJcbiAgICAgICAgaWZjYXJ0OiAwLCAgLy8gMT3mmK/otK3nianovabvvIwwPeS4jeaYr+i0reeJqei9plxyXG4gICAgICAgIGFkZHJlc3NfaWQ6IHRoaXMuYWRkcmVzcy5hZGRyZXNzX2lkLCAgLy8g5Zyw5Z2AaWRcclxuICAgICAgICB2YXRfaGFzaDogdGhpcy52YXRfaGFzaCwgIC8v5Y+R56Wo5L+h5oGvaGFzaO+8jFxyXG4gICAgICAgIG9mZnBheV9oYXNoOiB0aGlzLmFkZHJlc3NfYXBpLm9mZnBheV9oYXNoLCAgICAvLyDmmK/lkKbmlK/mjIHotKfliLDku5jmrL7vvIxcclxuICAgICAgICBvZmZwYXlfaGFzaF9iYXRjaDogdGhpcy5hZGRyZXNzX2FwaS5vZmZwYXlfaGFzaF9iYXRjaCwgICAvL+W6l+mTuuaYr+WQpuaUr+aMgei0p+WIsOS7mOasvmhhc2hcclxuICAgICAgICBwYXlfbmFtZTogJ29ubGluZScsXHJcbiAgICAgICAgaW52b2ljZV9pZDogMCwgICAvLyDlj5HnpahcclxuICAgICAgICBwZF9wYXk6IHRoaXMucGF5bWVudF90eXBlLCAgLy8g5pSv5LuY5pa55byPXHJcbiAgICAgICAgcGFzc3dvcmQ6ICc2NjYnLCAgLy8g5pSv5LuY5a+G56CBXHJcbiAgICAgICAgdm91Y2hlcjogbnVsbCwgIC8vIOS8mOaDoOWIuFxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiByZXMuZGF0YXMpXHJcblxyXG4gICAgdmFyIHJlc1BheSA9IGF3YWl0IGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5wYXksXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBwYXlfc246IHJlc09yZGVyLnBheV9zbixcclxuICAgICAgICBwYXltZW50X2NvZGU6ICB0aGlzLnBheW1lbnRfdHlwZSA9PSAwID8gICdtaW5pX3d4cGF5JyAgOiAgJ3ByZWRlcG9zaXQnXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHJlcy5kYXRhcylcclxuICAgIFxyXG4gICAgaWYocmVzUGF5LnN0YXRlID09IDEpIHtcclxuICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xyXG4gICAgICAgIC4uLnJlc1BheS5hcGlfcGF5LFxyXG4gICAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfmlK/ku5jmiJDlip8nXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgdGhhdC4kcmVkaXJlY3QoYG9yZGVybGlzdGApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbCAocmVzKSB7XHJcbiAgICAgICAgICAgIHRoYXQuJHJlZGlyZWN0KGBvcmRlcmxpc3RgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9IFxyXG4gIH1cclxuXHJcbiAgZXZlbnRzID0ge307XHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIC8vIOaUr+S7mOaWueW8j+WIl+ihqFxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm1lbWJlclBheW1lbnQsXHJcbiAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLnBheW1lbnRfbGlzdCA9IHJlcy5kYXRhcy5wYXltZW50X2xpc3RcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgb25TaG93KCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICAvLyDlhajlsYDorqLljZXkv6Hmga9cclxuICAgIHZhciBvcmRlckluZm8gPSBhcHAuZ2xvYmFsRGF0YS5vcmRlckluZm9cclxuICAgIC8vIOmCrui0ueS/oeaBr1xyXG4gICAgdGhpcy5wb3N0YWdlID1vcmRlckluZm8uYWRkcmVzc19hcGkuY29udGVudCB8fCB7fVxyXG4gICAgLy8g5Zyw5Z2A5L+h5oGvXHJcbiAgICB0aGlzLmFkZHJlc3MgPSAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9yZGVySW5mby5hZGRyZXNzX2luZm8pICA9PSAnW29iamVjdCBPYmplY3RdJyA/IG9yZGVySW5mby5hZGRyZXNzX2luZm8gOiAnJ1xyXG4gICAgLy8g5aSa5bqX6ZO65L+h5oGvXHJcbiAgICB0aGlzLnN0b3JlX2NhcnRfbGlzdCA9IG9yZGVySW5mby5zdG9yZV9jYXJ0X2xpc3RcclxuICAgIC8vIOWVhuWTgeWIl+ihqFxyXG4gICAgdmFyIGdvb2RzX2xpc3QgPSBbXVxyXG4gICAgLy8g5ZWG5ZOB5oC75Lu35qC8XHJcbiAgICBPYmplY3QudmFsdWVzKG9yZGVySW5mby5zdG9yZV9jYXJ0X2xpc3QpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIGdvb2RzX2xpc3QgPSBnb29kc19saXN0LmNvbmNhdChpdGVtLmdvb2RzX2xpc3QpXHJcbiAgICB9KVxyXG4gICAgLy8g5ZWG5ZOB5oC75pWw6YePXHJcbiAgICB2YXIgZ29vZHNBbGxOdW0gPSAwXHJcbiAgICBnb29kc19saXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIGdvb2RzQWxsTnVtICs9IE51bWJlcihpdGVtLmdvb2RzX251bSlcclxuICAgIH0pXHJcbiAgICB0aGlzLmdvb2RzQWxsTnVtID0gZ29vZHNBbGxOdW1cclxuICAgIC8vIOiuouWNleaAu+S7t+agvFxyXG4gICAgdGhpcy5hbGxQcmljZSA9IE51bWJlcihvcmRlckluZm8ub3JkZXJfYW1vdW50KS50b0ZpeGVkKDIpXHJcbiAgICAvLyDlnLDlnYBoYXNoXHJcbiAgICB0aGlzLmFkZHJlc3NfYXBpID0gb3JkZXJJbmZvLmFkZHJlc3NfYXBpXHJcbiAgICAvLyDlj5Hnpajkv6Hmga9oYXNoXHJcbiAgICB0aGlzLnZhdF9oYXNoID0gb3JkZXJJbmZvLnZhdF9oYXNoXHJcbiAgICAvLyDllYblk4Hkv6Hmga9cclxuICAgIHRoaXMuY2FydF9pZCA9IG9yZGVySW5mby5jYXJ0X2lkXHJcbiAgICAvLyDov5DotLlcclxuICAgIHRoaXMuZ29vZHNfZnJlaWdodCA9IG9yZGVySW5mby5nb29kc19mcmVpZ2h0XHJcbiAgICAvLyDkvZnpop1cclxuICAgIHRoaXMubWVtYmVyX3BvaW50cyA9IE51bWJlcihvcmRlckluZm8ubWVtYmVyX3BvaW50cylcclxuICB9XHJcbn1cclxuIl19