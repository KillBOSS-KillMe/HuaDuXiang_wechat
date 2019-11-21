'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ajax = require('./../ajax.js');

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
      navigationBarTitleText: '提交订单'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      priceArr: [{ title: '微信支付', icon: 'image57.png', flag: 1 }, { title: '余额支付', icon: 'image58.png', flag: 0 }],
      requestImgUrl: '',
      address: null, //地址信息
      goods_list: [], //下单商品信息
      store_cart_list: [], //下单店铺列表
      allPrice: 0, //订单总价格
      goodsPrice: 0, // 商品总价格
      goodsAllNum: 0, //总共件数
      address_api: null, // 地址信息hash
      vat_hash: null, //发票信息hash
      cart_id: null, //商品id数量
      payment_list: [], // 支付方式
      goods_freight: 0, //运费
      payment_type: 0, //付款类型 0微信 1余额
      member_points: 0 //用户余额
    }, _this.computed = {}, _this.methods = {
      getWXPayment: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var that, resOrder, resPay;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  that = this;

                  if (this.address.address_id) {
                    _context.next = 4;
                    break;
                  }

                  wx.showToast({
                    title: '请选择地址',
                    icon: 'none'
                  });
                  return _context.abrupt('return', false);

                case 4:
                  _context.next = 6;
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
                      invoice_id: 0
                    }
                  }).then(function (res) {
                    return res.datas;
                  });

                case 6:
                  resOrder = _context.sent;
                  _context.next = 9;
                  return (0, _ajax.ajax)({
                    url: api.pay,
                    data: {
                      pay_sn: resOrder.pay_sn,
                      payment_code: this.payment_type == 0 ? 'mini_wxpay' : 'predeposit'
                    }
                  }).then(function (res) {
                    return res.datas;
                  });

                case 9:
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

                case 11:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getWXPayment() {
          return _ref2.apply(this, arguments);
        }

        return getWXPayment;
      }(),
      changePriceType: function changePriceType(idx) {
        this.payment_type = idx;
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
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
      console.log(orderInfo);
      // 地址信息
      this.address = Object.prototype.toString.call(orderInfo.address_info) == '[object Object]' ? orderInfo.address_info : '';
      // 多店铺信息
      this.store_cart_list = orderInfo.store_cart_list;
      // 商品列表
      var goods_list = [];
      // 商品总价格
      var goodsPrice = 0;
      Object.values(orderInfo.store_cart_list).forEach(function (item) {
        goods_list = goods_list.concat(item.goods_list);
        goodsPrice += Number(item.store_goods_total);
      });
      this.goodsPrice = goodsPrice.toFixed(2);
      this.goods_list = goods_list;
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
      this.member_points = orderInfo.member_points;
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/settlement'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZW1lbnQuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwicHJpY2VBcnIiLCJ0aXRsZSIsImljb24iLCJmbGFnIiwicmVxdWVzdEltZ1VybCIsImFkZHJlc3MiLCJnb29kc19saXN0Iiwic3RvcmVfY2FydF9saXN0IiwiYWxsUHJpY2UiLCJnb29kc1ByaWNlIiwiZ29vZHNBbGxOdW0iLCJhZGRyZXNzX2FwaSIsInZhdF9oYXNoIiwiY2FydF9pZCIsInBheW1lbnRfbGlzdCIsImdvb2RzX2ZyZWlnaHQiLCJwYXltZW50X3R5cGUiLCJtZW1iZXJfcG9pbnRzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ2V0V1hQYXltZW50IiwidGhhdCIsImFkZHJlc3NfaWQiLCJ3eCIsInNob3dUb2FzdCIsInVybCIsInBsYWNlT3JkZXIiLCJpZmNhcnQiLCJvZmZwYXlfaGFzaCIsIm9mZnBheV9oYXNoX2JhdGNoIiwicGF5X25hbWUiLCJpbnZvaWNlX2lkIiwidGhlbiIsInJlcyIsImRhdGFzIiwicmVzT3JkZXIiLCJwYXkiLCJwYXlfc24iLCJwYXltZW50X2NvZGUiLCJyZXNQYXkiLCJzdGF0ZSIsInJlcXVlc3RQYXltZW50IiwiYXBpX3BheSIsInN1Y2Nlc3MiLCIkcmVkaXJlY3QiLCJmYWlsIiwiY2hhbmdlUHJpY2VUeXBlIiwiaWR4IiwiZXZlbnRzIiwib3B0aW9ucyIsIm1lbWJlclBheW1lbnQiLCJ0eXBlIiwiY29kZSIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiYXBwIiwib3JkZXJJbmZvIiwiY29uc29sZSIsImxvZyIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsImFkZHJlc3NfaW5mbyIsInZhbHVlcyIsImZvckVhY2giLCJjb25jYXQiLCJpdGVtIiwiTnVtYmVyIiwic3RvcmVfZ29vZHNf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QixDQUFiO0FBQ0FHLHNCQUFjMkQsT0FBT0QsS0FBS0UsaUJBQVosQ0FBZDtBQUNELE9BSEQ7QUFJQSxXQUFLNUQsVUFBTCxHQUFrQkEsV0FBVzZELE9BQVgsQ0FBbUIsQ0FBbkIsQ0FBbEI7QUFDQSxXQUFLaEUsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQTtBQUNBLFVBQUlJLGNBQWMsQ0FBbEI7QUFDQUosaUJBQVcyRCxPQUFYLENBQW1CLGdCQUFRO0FBQ3pCdkQsdUJBQWUwRCxPQUFPRCxLQUFLSSxTQUFaLENBQWY7QUFDRCxPQUZEO0FBR0EsV0FBSzdELFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0E7QUFDQSxXQUFLRixRQUFMLEdBQWdCNEQsT0FBT1osVUFBVWdCLFlBQWpCLEVBQStCRixPQUEvQixDQUF1QyxDQUF2QyxDQUFoQjtBQUNBO0FBQ0EsV0FBSzNELFdBQUwsR0FBbUI2QyxVQUFVN0MsV0FBN0I7QUFDQTtBQUNBLFdBQUtDLFFBQUwsR0FBZ0I0QyxVQUFVNUMsUUFBMUI7QUFDQTtBQUNBLFdBQUtDLE9BQUwsR0FBZTJDLFVBQVUzQyxPQUF6QjtBQUNBO0FBQ0EsV0FBS0UsYUFBTCxHQUFxQnlDLFVBQVV6QyxhQUEvQjtBQUNBO0FBQ0EsV0FBS0UsYUFBTCxHQUFxQnVDLFVBQVV2QyxhQUEvQjtBQUNEOzs7O0VBbkltQ3dELGVBQUtDLEk7O2tCQUF0QmhGLFEiLCJmaWxlIjoic2V0dGxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aPkOS6pOiuouWNlSdcclxuICB9O1xyXG5cclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcHJpY2VBcnI6IFt7dGl0bGU6ICflvq7kv6HmlK/ku5gnLGljb246ICdpbWFnZTU3LnBuZycsIGZsYWc6IDF9LHt0aXRsZTogJ+S9memineaUr+S7mCcsaWNvbjogJ2ltYWdlNTgucG5nJyxmbGFnOiAwfV0sXHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGFkZHJlc3M6IG51bGwsIC8v5Zyw5Z2A5L+h5oGvXHJcbiAgICBnb29kc19saXN0OiBbXSwgLy/kuIvljZXllYblk4Hkv6Hmga9cclxuICAgIHN0b3JlX2NhcnRfbGlzdDogW10sIC8v5LiL5Y2V5bqX6ZO65YiX6KGoXHJcbiAgICBhbGxQcmljZTogMCwgLy/orqLljZXmgLvku7fmoLxcclxuICAgIGdvb2RzUHJpY2U6IDAsIC8vIOWVhuWTgeaAu+S7t+agvFxyXG4gICAgZ29vZHNBbGxOdW06IDAsIC8v5oC75YWx5Lu25pWwXHJcbiAgICBhZGRyZXNzX2FwaTogbnVsbCwgLy8g5Zyw5Z2A5L+h5oGvaGFzaFxyXG4gICAgdmF0X2hhc2g6IG51bGwsIC8v5Y+R56Wo5L+h5oGvaGFzaFxyXG4gICAgY2FydF9pZDogbnVsbCwgLy/llYblk4FpZOaVsOmHj1xyXG4gICAgcGF5bWVudF9saXN0OiBbXSwgLy8g5pSv5LuY5pa55byPXHJcbiAgICBnb29kc19mcmVpZ2h0OiAwLCAvL+i/kOi0uVxyXG4gICAgcGF5bWVudF90eXBlOiAwICwgLy/ku5jmrL7nsbvlnosgMOW+ruS/oSAx5L2Z6aKdXHJcbiAgICBtZW1iZXJfcG9pbnRzOiAwLCAvL+eUqOaIt+S9meminVxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBhc3luYyBnZXRXWFBheW1lbnQoKSB7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICBpZighdGhpcy5hZGRyZXNzLmFkZHJlc3NfaWQpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nlnLDlnYAnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICAvL2FzeW5j5Ye95pWw77yM6YG/5YWN5byC5q2l5Ye95pWw5bWM5aWXIGh0dHBzOi8vd2VweWpzLmdpdGh1Yi5pby93ZXB5LWRvY3MvMS54LyMvP2lkPemSiOWvueWOn+eUn2Fwaei/m+ihjOS8mOWMllxyXG4gICAgICB2YXIgcmVzT3JkZXIgPSBhd2FpdCBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5wbGFjZU9yZGVyLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGNhcnRfaWQ6IHRoaXMuY2FydF9pZCxcclxuICAgICAgICAgIGlmY2FydDogMCwgIC8vIDE95piv6LSt54mp6L2m77yMMD3kuI3mmK/otK3nianovaZcclxuICAgICAgICAgIGFkZHJlc3NfaWQ6IHRoaXMuYWRkcmVzcy5hZGRyZXNzX2lkLCAgLy8g5Zyw5Z2AaWRcclxuICAgICAgICAgIHZhdF9oYXNoOiB0aGlzLnZhdF9oYXNoLCAgLy/lj5Hnpajkv6Hmga9oYXNo77yMXHJcbiAgICAgICAgICBvZmZwYXlfaGFzaDogdGhpcy5hZGRyZXNzX2FwaS5vZmZwYXlfaGFzaCwgICAgLy8g5piv5ZCm5pSv5oyB6LSn5Yiw5LuY5qy+77yMXHJcbiAgICAgICAgICBvZmZwYXlfaGFzaF9iYXRjaDogdGhpcy5hZGRyZXNzX2FwaS5vZmZwYXlfaGFzaF9iYXRjaCwgICAvL+W6l+mTuuaYr+WQpuaUr+aMgei0p+WIsOS7mOasvmhhc2hcclxuICAgICAgICAgIHBheV9uYW1lOiAnb25saW5lJyxcclxuICAgICAgICAgIGludm9pY2VfaWQ6IDAsXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiByZXMuZGF0YXMpXHJcblxyXG4gICAgICB2YXIgcmVzUGF5ID0gYXdhaXQgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkucGF5LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHBheV9zbjogcmVzT3JkZXIucGF5X3NuLFxyXG4gICAgICAgICAgcGF5bWVudF9jb2RlOiAgdGhpcy5wYXltZW50X3R5cGUgPT0gMCA/ICAnbWluaV93eHBheScgIDogICdwcmVkZXBvc2l0J1xyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmRhdGFzKVxyXG4gICAgICBpZihyZXNQYXkuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgIHd4LnJlcXVlc3RQYXltZW50KHtcclxuICAgICAgICAgIC4uLnJlc1BheS5hcGlfcGF5LFxyXG4gICAgICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfmlK/ku5jmiJDlip8nXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoYXQuJHJlZGlyZWN0KGBvcmRlcmxpc3RgKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsIChyZXMpIHtcclxuICAgICAgICAgICAgIHRoYXQuJHJlZGlyZWN0KGBvcmRlcmxpc3RgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9IFxyXG4gICAgfSxcclxuICAgIGNoYW5nZVByaWNlVHlwZShpZHgpIHtcclxuICAgICAgdGhpcy5wYXltZW50X3R5cGUgPSBpZHhcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgLy8g5pSv5LuY5pa55byP5YiX6KGoXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkubWVtYmVyUGF5bWVudCxcclxuICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHRoaXMucGF5bWVudF9saXN0ID0gcmVzLmRhdGFzLnBheW1lbnRfbGlzdFxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgIC8vIOWFqOWxgOiuouWNleS/oeaBr1xyXG4gICAgdmFyIG9yZGVySW5mbyA9IGFwcC5nbG9iYWxEYXRhLm9yZGVySW5mb1xyXG4gICAgY29uc29sZS5sb2cob3JkZXJJbmZvKVxyXG4gICAgLy8g5Zyw5Z2A5L+h5oGvXHJcbiAgICB0aGlzLmFkZHJlc3MgPSAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9yZGVySW5mby5hZGRyZXNzX2luZm8pICA9PSAnW29iamVjdCBPYmplY3RdJyA/IG9yZGVySW5mby5hZGRyZXNzX2luZm8gOiAnJ1xyXG4gICAgLy8g5aSa5bqX6ZO65L+h5oGvXHJcbiAgICB0aGlzLnN0b3JlX2NhcnRfbGlzdCA9IG9yZGVySW5mby5zdG9yZV9jYXJ0X2xpc3RcclxuICAgIC8vIOWVhuWTgeWIl+ihqFxyXG4gICAgdmFyIGdvb2RzX2xpc3QgPSBbXVxyXG4gICAgLy8g5ZWG5ZOB5oC75Lu35qC8XHJcbiAgICB2YXIgZ29vZHNQcmljZSA9IDBcclxuICAgIE9iamVjdC52YWx1ZXMob3JkZXJJbmZvLnN0b3JlX2NhcnRfbGlzdCkuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgZ29vZHNfbGlzdCA9IGdvb2RzX2xpc3QuY29uY2F0KGl0ZW0uZ29vZHNfbGlzdClcclxuICAgICAgZ29vZHNQcmljZSArPSBOdW1iZXIoaXRlbS5zdG9yZV9nb29kc190b3RhbClcclxuICAgIH0pXHJcbiAgICB0aGlzLmdvb2RzUHJpY2UgPSBnb29kc1ByaWNlLnRvRml4ZWQoMilcclxuICAgIHRoaXMuZ29vZHNfbGlzdCA9IGdvb2RzX2xpc3RcclxuICAgIC8vIOWVhuWTgeaAu+aVsOmHj1xyXG4gICAgdmFyIGdvb2RzQWxsTnVtID0gMFxyXG4gICAgZ29vZHNfbGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBnb29kc0FsbE51bSArPSBOdW1iZXIoaXRlbS5nb29kc19udW0pXHJcbiAgICB9KVxyXG4gICAgdGhpcy5nb29kc0FsbE51bSA9IGdvb2RzQWxsTnVtXHJcbiAgICAvLyDorqLljZXmgLvku7fmoLxcclxuICAgIHRoaXMuYWxsUHJpY2UgPSBOdW1iZXIob3JkZXJJbmZvLm9yZGVyX2Ftb3VudCkudG9GaXhlZCgyKVxyXG4gICAgLy8g5Zyw5Z2AaGFzaFxyXG4gICAgdGhpcy5hZGRyZXNzX2FwaSA9IG9yZGVySW5mby5hZGRyZXNzX2FwaVxyXG4gICAgLy8g5Y+R56Wo5L+h5oGvaGFzaFxyXG4gICAgdGhpcy52YXRfaGFzaCA9IG9yZGVySW5mby52YXRfaGFzaFxyXG4gICAgLy8g5ZWG5ZOB5L+h5oGvXHJcbiAgICB0aGlzLmNhcnRfaWQgPSBvcmRlckluZm8uY2FydF9pZFxyXG4gICAgLy8g6L+Q6LS5XHJcbiAgICB0aGlzLmdvb2RzX2ZyZWlnaHQgPSBvcmRlckluZm8uZ29vZHNfZnJlaWdodFxyXG4gICAgLy8g5L2Z6aKdXHJcbiAgICB0aGlzLm1lbWJlcl9wb2ludHMgPSBvcmRlckluZm8ubWVtYmVyX3BvaW50c1xyXG4gIH1cclxufVxyXG4iXX0=