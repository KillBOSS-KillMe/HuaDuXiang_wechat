'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


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
      payment_list: [] // 支付方式
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


                  wx.requestPayment({
                    timeStamp: resPay.timeStamp,
                    nonceStr: resPay.nonceStr,
                    package: resPay.package,
                    signType: 'MD5',
                    paySign: resPay.paySign,
                    success: function success(res) {
                      console.log(res, 'success');
                    },
                    fail: function fail(res) {
                      console.log(res, 'fail');
                    }
                  });

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
      }()
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
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/settlement'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZW1lbnQuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwicmVxdWVzdEltZ1VybCIsImFkZHJlc3MiLCJnb29kc19saXN0Iiwic3RvcmVfY2FydF9saXN0IiwiYWxsUHJpY2UiLCJnb29kc1ByaWNlIiwiZ29vZHNBbGxOdW0iLCJhZGRyZXNzX2FwaSIsInZhdF9oYXNoIiwiY2FydF9pZCIsInBheW1lbnRfbGlzdCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdldFdYUGF5bWVudCIsInVybCIsInBsYWNlT3JkZXIiLCJpZmNhcnQiLCJhZGRyZXNzX2lkIiwib2ZmcGF5X2hhc2giLCJvZmZwYXlfaGFzaF9iYXRjaCIsInBheV9uYW1lIiwiaW52b2ljZV9pZCIsInRoZW4iLCJyZXMiLCJkYXRhcyIsInJlc09yZGVyIiwicGF5IiwicGF5X3NuIiwicGF5bWVudF9jb2RlIiwicmVzUGF5Iiwid3giLCJyZXF1ZXN0UGF5bWVudCIsInRpbWVTdGFtcCIsIm5vbmNlU3RyIiwicGFja2FnZSIsInNpZ25UeXBlIiwicGF5U2lnbiIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwiZmFpbCIsImV2ZW50cyIsIm9wdGlvbnMiLCJtZW1iZXJQYXltZW50IiwidHlwZSIsImNvZGUiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImFwcCIsIm9yZGVySW5mbyIsImFkZHJlc3NfaW5mbyIsIk9iamVjdCIsInZhbHVlcyIsImZvckVhY2giLCJjb25jYXQiLCJpdGVtIiwiTnVtYmVyIiwic3RvcmVfZ29vZHNfdG90YWwiLCJ0b0ZpeGVkIiwiZ29vZHNfbnVtIiwib3JkZXJfYW1vdW50Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUZBLElBQUlBLE1BQU1DLFFBQVEsV0FB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QVlVLFNBQVo7QUFDQTtBQUNBLFdBQUtoRCxPQUFMLEdBQWVnRCxVQUFVQyxZQUF6QjtBQUNBO0FBQ0EsV0FBSy9DLGVBQUwsR0FBdUI4QyxVQUFVOUMsZUFBakM7QUFDQTtBQUNBLFVBQUlELGFBQWEsRUFBakI7QUFDQTtBQUNBLFVBQUlHLGFBQWEsQ0FBakI7QUFDQThDLGFBQU9DLE1BQVAsQ0FBY0gsVUFBVTlDLGVBQXhCLEVBQXlDa0QsT0FBekMsQ0FBaUQsZ0JBQVE7QUFDdkRuRCxxQkFBYUEsV0FBV29ELE1BQVgsQ0FBa0JDLEtBQUtyRCxVQUF2QixDQUFiO0FBQ0FHLHNCQUFjbUQsT0FBT0QsS0FBS0UsaUJBQVosQ0FBZDtBQUNELE9BSEQ7QUFJQSxXQUFLcEQsVUFBTCxHQUFrQkEsV0FBV3FELE9BQVgsQ0FBbUIsQ0FBbkIsQ0FBbEI7QUFDQSxXQUFLeEQsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQTtBQUNBLFVBQUlJLGNBQWMsQ0FBbEI7QUFDQUosaUJBQVdtRCxPQUFYLENBQW1CLGdCQUFRO0FBQ3pCL0MsdUJBQWVrRCxPQUFPRCxLQUFLSSxTQUFaLENBQWY7QUFDRCxPQUZEO0FBR0EsV0FBS3JELFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0E7QUFDQSxXQUFLRixRQUFMLEdBQWdCb0QsT0FBT1AsVUFBVVcsWUFBakIsRUFBK0JGLE9BQS9CLENBQXVDLENBQXZDLENBQWhCO0FBQ0E7QUFDQSxXQUFLbkQsV0FBTCxHQUFtQjBDLFVBQVUxQyxXQUE3QjtBQUNBO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQnlDLFVBQVV6QyxRQUExQjtBQUNBO0FBQ0EsV0FBS0MsT0FBTCxHQUFld0MsVUFBVXhDLE9BQXpCO0FBQ0Q7Ozs7RUFqSG1Db0QsZUFBS0MsSTs7a0JBQXRCcEUsUSIsImZpbGUiOiJzZXR0bGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5o+Q5Lqk6K6i5Y2VJ1xyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGFkZHJlc3M6IG51bGwsIC8v5Zyw5Z2A5L+h5oGvXHJcbiAgICBnb29kc19saXN0OiBbXSwgLy/kuIvljZXllYblk4Hkv6Hmga9cclxuICAgIHN0b3JlX2NhcnRfbGlzdDogW10sIC8v5LiL5Y2V5bqX6ZO65YiX6KGoXHJcbiAgICBhbGxQcmljZTogMCwgLy/orqLljZXmgLvku7fmoLxcclxuICAgIGdvb2RzUHJpY2U6IDAsIC8vIOWVhuWTgeaAu+S7t+agvFxyXG4gICAgZ29vZHNBbGxOdW06IDAsIC8v5oC75YWx5Lu25pWwXHJcbiAgICBhZGRyZXNzX2FwaTogbnVsbCwgLy8g5Zyw5Z2A5L+h5oGvaGFzaFxyXG4gICAgdmF0X2hhc2g6IG51bGwsIC8v5Y+R56Wo5L+h5oGvaGFzaFxyXG4gICAgY2FydF9pZDogbnVsbCwgLy/llYblk4FpZOaVsOmHj1xyXG4gICAgcGF5bWVudF9saXN0OiBbXSwgLy8g5pSv5LuY5pa55byPXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGFzeW5jIGdldFdYUGF5bWVudCgpIHtcclxuICAgICAgLy9hc3luY+WHveaVsO+8jOmBv+WFjeW8guatpeWHveaVsOW1jOWllyBodHRwczovL3dlcHlqcy5naXRodWIuaW8vd2VweS1kb2NzLzEueC8jLz9pZD3pkojlr7nljp/nlJ9hcGnov5vooYzkvJjljJZcclxuICAgICAgdmFyIHJlc09yZGVyID0gYXdhaXQgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkucGxhY2VPcmRlcixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBjYXJ0X2lkOiB0aGlzLmNhcnRfaWQsXHJcbiAgICAgICAgICBpZmNhcnQ6IDAsICAvLyAxPeaYr+i0reeJqei9pu+8jDA95LiN5piv6LSt54mp6L2mXHJcbiAgICAgICAgICBhZGRyZXNzX2lkOiB0aGlzLmFkZHJlc3MuYWRkcmVzc19pZCwgIC8vIOWcsOWdgGlkXHJcbiAgICAgICAgICB2YXRfaGFzaDogdGhpcy52YXRfaGFzaCwgIC8v5Y+R56Wo5L+h5oGvaGFzaO+8jFxyXG4gICAgICAgICAgb2ZmcGF5X2hhc2g6IHRoaXMuYWRkcmVzc19hcGkub2ZmcGF5X2hhc2gsICAgIC8vIOaYr+WQpuaUr+aMgei0p+WIsOS7mOasvu+8jFxyXG4gICAgICAgICAgb2ZmcGF5X2hhc2hfYmF0Y2g6IHRoaXMuYWRkcmVzc19hcGkub2ZmcGF5X2hhc2hfYmF0Y2gsICAgLy/lupfpk7rmmK/lkKbmlK/mjIHotKfliLDku5jmrL5oYXNoXHJcbiAgICAgICAgICBwYXlfbmFtZTogJ29ubGluZScsXHJcbiAgICAgICAgICBpbnZvaWNlX2lkOiAwLFxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmRhdGFzKVxyXG5cclxuICAgICAgdmFyIHJlc1BheSA9IGF3YWl0IGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLnBheSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBwYXlfc246IHJlc09yZGVyLnBheV9zbixcclxuICAgICAgICAgIHBheW1lbnRfY29kZTogJ21pbmlfd3hwYXknLFxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmRhdGFzKVxyXG5cclxuICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xyXG4gICAgICAgIHRpbWVTdGFtcDogcmVzUGF5LnRpbWVTdGFtcCxcclxuICAgICAgICBub25jZVN0cjogcmVzUGF5Lm5vbmNlU3RyLFxyXG4gICAgICAgIHBhY2thZ2U6IHJlc1BheS5wYWNrYWdlLFxyXG4gICAgICAgIHNpZ25UeXBlOiAnTUQ1JyxcclxuICAgICAgICBwYXlTaWduOiByZXNQYXkucGF5U2lnbixcclxuICAgICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcywgJ3N1Y2Nlc3MnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbCAocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMsJ2ZhaWwnKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIC8vIOaUr+S7mOaWueW8j+WIl+ihqFxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm1lbWJlclBheW1lbnQsXHJcbiAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLnBheW1lbnRfbGlzdCA9IHJlcy5kYXRhcy5wYXltZW50X2xpc3RcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgb25TaG93KCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICAvLyDlhajlsYDorqLljZXkv6Hmga9cclxuICAgIHZhciBvcmRlckluZm8gPSBhcHAuZ2xvYmFsRGF0YS5vcmRlckluZm9cclxuICAgIGNvbnNvbGUubG9nKG9yZGVySW5mbylcclxuICAgIC8vIOWcsOWdgOS/oeaBr1xyXG4gICAgdGhpcy5hZGRyZXNzID0gb3JkZXJJbmZvLmFkZHJlc3NfaW5mb1xyXG4gICAgLy8g5aSa5bqX6ZO65L+h5oGvXHJcbiAgICB0aGlzLnN0b3JlX2NhcnRfbGlzdCA9IG9yZGVySW5mby5zdG9yZV9jYXJ0X2xpc3RcclxuICAgIC8vIOWVhuWTgeWIl+ihqFxyXG4gICAgdmFyIGdvb2RzX2xpc3QgPSBbXVxyXG4gICAgLy8g5ZWG5ZOB5oC75Lu35qC8XHJcbiAgICB2YXIgZ29vZHNQcmljZSA9IDBcclxuICAgIE9iamVjdC52YWx1ZXMob3JkZXJJbmZvLnN0b3JlX2NhcnRfbGlzdCkuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgZ29vZHNfbGlzdCA9IGdvb2RzX2xpc3QuY29uY2F0KGl0ZW0uZ29vZHNfbGlzdClcclxuICAgICAgZ29vZHNQcmljZSArPSBOdW1iZXIoaXRlbS5zdG9yZV9nb29kc190b3RhbClcclxuICAgIH0pXHJcbiAgICB0aGlzLmdvb2RzUHJpY2UgPSBnb29kc1ByaWNlLnRvRml4ZWQoMilcclxuICAgIHRoaXMuZ29vZHNfbGlzdCA9IGdvb2RzX2xpc3RcclxuICAgIC8vIOWVhuWTgeaAu+aVsOmHj1xyXG4gICAgdmFyIGdvb2RzQWxsTnVtID0gMFxyXG4gICAgZ29vZHNfbGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBnb29kc0FsbE51bSArPSBOdW1iZXIoaXRlbS5nb29kc19udW0pXHJcbiAgICB9KVxyXG4gICAgdGhpcy5nb29kc0FsbE51bSA9IGdvb2RzQWxsTnVtXHJcbiAgICAvLyDorqLljZXmgLvku7fmoLxcclxuICAgIHRoaXMuYWxsUHJpY2UgPSBOdW1iZXIob3JkZXJJbmZvLm9yZGVyX2Ftb3VudCkudG9GaXhlZCgyKVxyXG4gICAgLy8g5Zyw5Z2AaGFzaFxyXG4gICAgdGhpcy5hZGRyZXNzX2FwaSA9IG9yZGVySW5mby5hZGRyZXNzX2FwaVxyXG4gICAgLy8g5Y+R56Wo5L+h5oGvaGFzaFxyXG4gICAgdGhpcy52YXRfaGFzaCA9IG9yZGVySW5mby52YXRfaGFzaFxyXG4gICAgLy8g5ZWG5ZOB5L+h5oGvXHJcbiAgICB0aGlzLmNhcnRfaWQgPSBvcmRlckluZm8uY2FydF9pZFxyXG4gIH1cclxufVxyXG4iXX0=