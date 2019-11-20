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
                      invoice_id: 0
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
                      payment_code: 'mini_wxpay'
                    }
                  }).then(function (res) {
                    return res.datas;
                  });

                case 5:
                  resPay = _context.sent;

                  if (resPay.state == 1) {
                    wx.requestPayment(_extends({}, resPay.api_pay, {
                      success: function success(res) {
                        console.log(res, 'success');
                      },
                      fail: function fail(res) {
                        console.log(res, 'fail');
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
      this.address = orderInfo.address_info;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZW1lbnQuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwicHJpY2VBcnIiLCJ0aXRsZSIsImljb24iLCJmbGFnIiwicmVxdWVzdEltZ1VybCIsImFkZHJlc3MiLCJnb29kc19saXN0Iiwic3RvcmVfY2FydF9saXN0IiwiYWxsUHJpY2UiLCJnb29kc1ByaWNlIiwiZ29vZHNBbGxOdW0iLCJhZGRyZXNzX2FwaSIsInZhdF9oYXNoIiwiY2FydF9pZCIsInBheW1lbnRfbGlzdCIsImdvb2RzX2ZyZWlnaHQiLCJwYXltZW50X3R5cGUiLCJtZW1iZXJfcG9pbnRzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ2V0V1hQYXltZW50IiwidXJsIiwicGxhY2VPcmRlciIsImlmY2FydCIsImFkZHJlc3NfaWQiLCJvZmZwYXlfaGFzaCIsIm9mZnBheV9oYXNoX2JhdGNoIiwicGF5X25hbWUiLCJpbnZvaWNlX2lkIiwidGhlbiIsInJlcyIsImRhdGFzIiwicmVzT3JkZXIiLCJwYXkiLCJwYXlfc24iLCJwYXltZW50X2NvZGUiLCJyZXNQYXkiLCJzdGF0ZSIsInd4IiwicmVxdWVzdFBheW1lbnQiLCJhcGlfcGF5Iiwic3VjY2VzcyIsImNvbnNvbGUiLCJsb2ciLCJmYWlsIiwiY2hhbmdlUHJpY2VUeXBlIiwiaWR4IiwiZXZlbnRzIiwib3B0aW9ucyIsIm1lbWJlclBheW1lbnQiLCJ0eXBlIiwiY29kZSIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiYXBwIiwib3JkZXJJbmZvIiwiYWRkcmVzc19pbmZvIiwiT2JqZWN0IiwidmFsdWVzIiwiZm9yRWFjaCIsImNvbmNhdCIsIml0ZW0iLCJOdW1iZXIiLCJzdG9yZV9nb29kc190b3RhbCIsInRvRml4ZWQiLCJnb29kc19udW0iLCJvcmRlcl9hbW91bnQiLCJ3ZXB5IiwicGFnZSJdLCJt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ckQsV0FBTCxHQUFtQjRDLFVBQVU1QyxXQUE3QjtBQUNBO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQjJDLFVBQVUzQyxRQUExQjtBQUNBO0FBQ0EsV0FBS0MsT0FBTCxHQUFlMEMsVUFBVTFDLE9BQXpCO0FBQ0E7QUFDQSxXQUFLRSxhQUFMLEdBQXFCd0MsVUFBVXhDLGFBQS9CO0FBQ0E7QUFDQSxXQUFLRSxhQUFMLEdBQXFCc0MsVUFBVXRDLGFBQS9CO0FBQ0Q7Ozs7RUF4SG1Da0QsZUFBS0MsSTs7a0JBQXRCMUUsUSIsImZpbGUiOiJzZXR0bGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5o+Q5Lqk6K6i5Y2VJ1xyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBwcmljZUFycjogW3t0aXRsZTogJ+W+ruS/oeaUr+S7mCcsaWNvbjogJ2ltYWdlNTcucG5nJywgZmxhZzogMX0se3RpdGxlOiAn5L2Z6aKd5pSv5LuYJyxpY29uOiAnaW1hZ2U1OC5wbmcnLGZsYWc6IDB9XSxcclxuICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgYWRkcmVzczogbnVsbCwgLy/lnLDlnYDkv6Hmga9cclxuICAgIGdvb2RzX2xpc3Q6IFtdLCAvL+S4i+WNleWVhuWTgeS/oeaBr1xyXG4gICAgc3RvcmVfY2FydF9saXN0OiBbXSwgLy/kuIvljZXlupfpk7rliJfooahcclxuICAgIGFsbFByaWNlOiAwLCAvL+iuouWNleaAu+S7t+agvFxyXG4gICAgZ29vZHNQcmljZTogMCwgLy8g5ZWG5ZOB5oC75Lu35qC8XHJcbiAgICBnb29kc0FsbE51bTogMCwgLy/mgLvlhbHku7bmlbBcclxuICAgIGFkZHJlc3NfYXBpOiBudWxsLCAvLyDlnLDlnYDkv6Hmga9oYXNoXHJcbiAgICB2YXRfaGFzaDogbnVsbCwgLy/lj5Hnpajkv6Hmga9oYXNoXHJcbiAgICBjYXJ0X2lkOiBudWxsLCAvL+WVhuWTgWlk5pWw6YePXHJcbiAgICBwYXltZW50X2xpc3Q6IFtdLCAvLyDmlK/ku5jmlrnlvI9cclxuICAgIGdvb2RzX2ZyZWlnaHQ6IDAsIC8v6L+Q6LS5XHJcbiAgICBwYXltZW50X3R5cGU6IDAgLCAvL+S7mOasvuexu+WeiyAw5b6u5L+hIDHkvZnpop1cclxuICAgIG1lbWJlcl9wb2ludHM6IDAsIC8v55So5oi35L2Z6aKdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGFzeW5jIGdldFdYUGF5bWVudCgpIHtcclxuICAgICAgLy9hc3luY+WHveaVsO+8jOmBv+WFjeW8guatpeWHveaVsOW1jOWllyBodHRwczovL3dlcHlqcy5naXRodWIuaW8vd2VweS1kb2NzLzEueC8jLz9pZD3pkojlr7nljp/nlJ9hcGnov5vooYzkvJjljJZcclxuICAgICAgdmFyIHJlc09yZGVyID0gYXdhaXQgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkucGxhY2VPcmRlcixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBjYXJ0X2lkOiB0aGlzLmNhcnRfaWQsXHJcbiAgICAgICAgICBpZmNhcnQ6IDAsICAvLyAxPeaYr+i0reeJqei9pu+8jDA95LiN5piv6LSt54mp6L2mXHJcbiAgICAgICAgICBhZGRyZXNzX2lkOiB0aGlzLmFkZHJlc3MuYWRkcmVzc19pZCwgIC8vIOWcsOWdgGlkXHJcbiAgICAgICAgICB2YXRfaGFzaDogdGhpcy52YXRfaGFzaCwgIC8v5Y+R56Wo5L+h5oGvaGFzaO+8jFxyXG4gICAgICAgICAgb2ZmcGF5X2hhc2g6IHRoaXMuYWRkcmVzc19hcGkub2ZmcGF5X2hhc2gsICAgIC8vIOaYr+WQpuaUr+aMgei0p+WIsOS7mOasvu+8jFxyXG4gICAgICAgICAgb2ZmcGF5X2hhc2hfYmF0Y2g6IHRoaXMuYWRkcmVzc19hcGkub2ZmcGF5X2hhc2hfYmF0Y2gsICAgLy/lupfpk7rmmK/lkKbmlK/mjIHotKfliLDku5jmrL5oYXNoXHJcbiAgICAgICAgICBwYXlfbmFtZTogJ29ubGluZScsXHJcbiAgICAgICAgICBpbnZvaWNlX2lkOiAwLFxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmRhdGFzKVxyXG5cclxuICAgICAgdmFyIHJlc1BheSA9IGF3YWl0IGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLnBheSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBwYXlfc246IHJlc09yZGVyLnBheV9zbixcclxuICAgICAgICAgIHBheW1lbnRfY29kZTogJ21pbmlfd3hwYXknXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiByZXMuZGF0YXMpXHJcbiAgICAgIGlmKHJlc1BheS5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xyXG4gICAgICAgICAgLi4ucmVzUGF5LmFwaV9wYXksXHJcbiAgICAgICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLCAnc3VjY2VzcycpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbCAocmVzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcywnZmFpbCcpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSBcclxuICAgIH0sXHJcbiAgICBjaGFuZ2VQcmljZVR5cGUoaWR4KSB7XHJcbiAgICAgIHRoaXMucGF5bWVudF90eXBlID0gaWR4XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIC8vIOaUr+S7mOaWueW8j+WIl+ihqFxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm1lbWJlclBheW1lbnQsXHJcbiAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLnBheW1lbnRfbGlzdCA9IHJlcy5kYXRhcy5wYXltZW50X2xpc3RcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgb25TaG93KCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICAvLyDlhajlsYDorqLljZXkv6Hmga9cclxuICAgIHZhciBvcmRlckluZm8gPSBhcHAuZ2xvYmFsRGF0YS5vcmRlckluZm9cclxuICAgIGNvbnNvbGUubG9nKG9yZGVySW5mbylcclxuICAgIC8vIOWcsOWdgOS/oeaBr1xyXG4gICAgdGhpcy5hZGRyZXNzID0gb3JkZXJJbmZvLmFkZHJlc3NfaW5mb1xyXG4gICAgLy8g5aSa5bqX6ZO65L+h5oGvXHJcbiAgICB0aGlzLnN0b3JlX2NhcnRfbGlzdCA9IG9yZGVySW5mby5zdG9yZV9jYXJ0X2xpc3RcclxuICAgIC8vIOWVhuWTgeWIl+ihqFxyXG4gICAgdmFyIGdvb2RzX2xpc3QgPSBbXVxyXG4gICAgLy8g5ZWG5ZOB5oC75Lu35qC8XHJcbiAgICB2YXIgZ29vZHNQcmljZSA9IDBcclxuICAgIE9iamVjdC52YWx1ZXMob3JkZXJJbmZvLnN0b3JlX2NhcnRfbGlzdCkuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgZ29vZHNfbGlzdCA9IGdvb2RzX2xpc3QuY29uY2F0KGl0ZW0uZ29vZHNfbGlzdClcclxuICAgICAgZ29vZHNQcmljZSArPSBOdW1iZXIoaXRlbS5zdG9yZV9nb29kc190b3RhbClcclxuICAgIH0pXHJcbiAgICB0aGlzLmdvb2RzUHJpY2UgPSBnb29kc1ByaWNlLnRvRml4ZWQoMilcclxuICAgIHRoaXMuZ29vZHNfbGlzdCA9IGdvb2RzX2xpc3RcclxuICAgIC8vIOWVhuWTgeaAu+aVsOmHj1xyXG4gICAgdmFyIGdvb2RzQWxsTnVtID0gMFxyXG4gICAgZ29vZHNfbGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBnb29kc0FsbE51bSArPSBOdW1iZXIoaXRlbS5nb29kc19udW0pXHJcbiAgICB9KVxyXG4gICAgdGhpcy5nb29kc0FsbE51bSA9IGdvb2RzQWxsTnVtXHJcbiAgICAvLyDorqLljZXmgLvku7fmoLxcclxuICAgIHRoaXMuYWxsUHJpY2UgPSBOdW1iZXIob3JkZXJJbmZvLm9yZGVyX2Ftb3VudCkudG9GaXhlZCgyKVxyXG4gICAgLy8g5Zyw5Z2AaGFzaFxyXG4gICAgdGhpcy5hZGRyZXNzX2FwaSA9IG9yZGVySW5mby5hZGRyZXNzX2FwaVxyXG4gICAgLy8g5Y+R56Wo5L+h5oGvaGFzaFxyXG4gICAgdGhpcy52YXRfaGFzaCA9IG9yZGVySW5mby52YXRfaGFzaFxyXG4gICAgLy8g5ZWG5ZOB5L+h5oGvXHJcbiAgICB0aGlzLmNhcnRfaWQgPSBvcmRlckluZm8uY2FydF9pZFxyXG4gICAgLy8g6L+Q6LS5XHJcbiAgICB0aGlzLmdvb2RzX2ZyZWlnaHQgPSBvcmRlckluZm8uZ29vZHNfZnJlaWdodFxyXG4gICAgLy8g5L2Z6aKdXHJcbiAgICB0aGlzLm1lbWJlcl9wb2ludHMgPSBvcmRlckluZm8ubWVtYmVyX3BvaW50c1xyXG4gIH1cclxufVxyXG4iXX0=