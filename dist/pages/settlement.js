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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZW1lbnQuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwicmVxdWVzdEltZ1VybCIsImFkZHJlc3MiLCJnb29kc19saXN0Iiwic3RvcmVfY2FydF9saXN0IiwiYWxsUHJpY2UiLCJnb29kc1ByaWNlIiwiZ29vZHNBbGxOdW0iLCJhZGRyZXNzX2FwaSIsInZhdF9oYXNoIiwiY2FydF9pZCIsInBheW1lbnRfbGlzdCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdldFdYUGF5bWVudCIsInVybCIsInBsYWNlT3JkZXIiLCJpZmNhcnQiLCJhZGRyZXNzX2lkIiwib2ZmcGF5X2hhc2giLCJvZmZwYXlfaGFzaF9iYXRjaCIsInBheV9uYW1lIiwiaW52b2ljZV9pZCIsInRoZW4iLCJyZXMiLCJkYXRhcyIsInJlc09yZGVyIiwicGF5IiwicGF5X3NuIiwicGF5bWVudF9jb2RlIiwicmVzUGF5Iiwic3RhdGUiLCJ3eCIsInJlcXVlc3RQYXltZW50IiwiYXBpX3BheSIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwiZmFpbCIsImV2ZW50cyIsIm9wdGlvbnMiLCJtZW1iZXJQYXltZW50IiwidHlwZSIsImNvZGUiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImFwcCIsIm9yZGVySW5mbyIsImFkZHJlc3NfaW5mbyIsIk9iamVjdCIsInZhbHVlcyIsImZvckVhY2giLCJjb25jYXQiLCJpdGVtIiwiTnVtYmVyIiwic3RvcmVfZ29vZHNfdG90YWwiLCJ0b0ZpeGVkIiwiZ29vZHNfbnVtIiwib3JkZXJfYW1vdW50Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRkEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBSXFCQyxROzs7Ozs7Ozs7Ozs7OzswTEFD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QUFhLEVBQWpCO0FBQ0E7QUFDQSxVQUFJRyxhQUFhLENBQWpCO0FBQ0EyQyxhQUFPQyxNQUFQLENBQWNILFVBQVUzQyxlQUF4QixFQUF5QytDLE9BQXpDLENBQWlELGdCQUFRO0FBQ3ZEaEQscUJBQWFBLFdBQVdpRCxNQUFYLENBQWtCQyxLQUFLbEQsVUFBdkIsQ0FBYjtBQUNBRyxzQkFBY2dELE9BQU9ELEtBQUtFLGlCQUFaLENBQWQ7QUFDRCxPQUhEO0FBSUEsV0FBS2pELFVBQUwsR0FBa0JBLFdBQVdrRCxPQUFYLENBQW1CLENBQW5CLENBQWxCO0FBQ0EsV0FBS3JELFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0E7QUFDQSxVQUFJSSxjQUFjLENBQWxCO0FBQ0FKLGlCQUFXZ0QsT0FBWCxDQUFtQixnQkFBUTtBQUN6QjVDLHVCQUFlK0MsT0FBT0QsS0FBS0ksU0FBWixDQUFmO0FBQ0QsT0FGRDtBQUdBLFdBQUtsRCxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBO0FBQ0EsV0FBS0YsUUFBTCxHQUFnQmlELE9BQU9QLFVBQVVXLFlBQWpCLEVBQStCRixPQUEvQixDQUF1QyxDQUF2QyxDQUFoQjtBQUNBO0FBQ0EsV0FBS2hELFdBQUwsR0FBbUJ1QyxVQUFVdkMsV0FBN0I7QUFDQTtBQUNBLFdBQUtDLFFBQUwsR0FBZ0JzQyxVQUFVdEMsUUFBMUI7QUFDQTtBQUNBLFdBQUtDLE9BQUwsR0FBZXFDLFVBQVVyQyxPQUF6QjtBQUNEOzs7O0VBN0dtQ2lELGVBQUtDLEk7O2tCQUF0QmpFLFEiLCJmaWxlIjoic2V0dGxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aPkOS6pOiuouWNlSdcclxuICB9O1xyXG5cclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBhZGRyZXNzOiBudWxsLCAvL+WcsOWdgOS/oeaBr1xyXG4gICAgZ29vZHNfbGlzdDogW10sIC8v5LiL5Y2V5ZWG5ZOB5L+h5oGvXHJcbiAgICBzdG9yZV9jYXJ0X2xpc3Q6IFtdLCAvL+S4i+WNleW6l+mTuuWIl+ihqFxyXG4gICAgYWxsUHJpY2U6IDAsIC8v6K6i5Y2V5oC75Lu35qC8XHJcbiAgICBnb29kc1ByaWNlOiAwLCAvLyDllYblk4HmgLvku7fmoLxcclxuICAgIGdvb2RzQWxsTnVtOiAwLCAvL+aAu+WFseS7tuaVsFxyXG4gICAgYWRkcmVzc19hcGk6IG51bGwsIC8vIOWcsOWdgOS/oeaBr2hhc2hcclxuICAgIHZhdF9oYXNoOiBudWxsLCAvL+WPkeelqOS/oeaBr2hhc2hcclxuICAgIGNhcnRfaWQ6IG51bGwsIC8v5ZWG5ZOBaWTmlbDph49cclxuICAgIHBheW1lbnRfbGlzdDogW10sIC8vIOaUr+S7mOaWueW8j1xyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBhc3luYyBnZXRXWFBheW1lbnQoKSB7XHJcbiAgICAgIC8vYXN5bmPlh73mlbDvvIzpgb/lhY3lvILmraXlh73mlbDltYzlpZcgaHR0cHM6Ly93ZXB5anMuZ2l0aHViLmlvL3dlcHktZG9jcy8xLngvIy8/aWQ96ZKI5a+55Y6f55SfYXBp6L+b6KGM5LyY5YyWXHJcbiAgICAgIHZhciByZXNPcmRlciA9IGF3YWl0IGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLnBsYWNlT3JkZXIsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgY2FydF9pZDogdGhpcy5jYXJ0X2lkLFxyXG4gICAgICAgICAgaWZjYXJ0OiAwLCAgLy8gMT3mmK/otK3nianovabvvIwwPeS4jeaYr+i0reeJqei9plxyXG4gICAgICAgICAgYWRkcmVzc19pZDogdGhpcy5hZGRyZXNzLmFkZHJlc3NfaWQsICAvLyDlnLDlnYBpZFxyXG4gICAgICAgICAgdmF0X2hhc2g6IHRoaXMudmF0X2hhc2gsICAvL+WPkeelqOS/oeaBr2hhc2jvvIxcclxuICAgICAgICAgIG9mZnBheV9oYXNoOiB0aGlzLmFkZHJlc3NfYXBpLm9mZnBheV9oYXNoLCAgICAvLyDmmK/lkKbmlK/mjIHotKfliLDku5jmrL7vvIxcclxuICAgICAgICAgIG9mZnBheV9oYXNoX2JhdGNoOiB0aGlzLmFkZHJlc3NfYXBpLm9mZnBheV9oYXNoX2JhdGNoLCAgIC8v5bqX6ZO65piv5ZCm5pSv5oyB6LSn5Yiw5LuY5qy+aGFzaFxyXG4gICAgICAgICAgcGF5X25hbWU6ICdvbmxpbmUnLFxyXG4gICAgICAgICAgaW52b2ljZV9pZDogMCxcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5kYXRhcylcclxuXHJcbiAgICAgIHZhciByZXNQYXkgPSBhd2FpdCBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5wYXksXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGF5X3NuOiByZXNPcmRlci5wYXlfc24sXHJcbiAgICAgICAgICBwYXltZW50X2NvZGU6ICdtaW5pX3d4cGF5JyxcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5kYXRhcylcclxuICAgICAgaWYocmVzUGF5LnN0YXRlID09IDEpIHtcclxuICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XHJcbiAgICAgICAgICAuLi5yZXNQYXkuYXBpX3BheSxcclxuICAgICAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMsICdzdWNjZXNzJylcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsIChyZXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLCdmYWlsJylcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9IFxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAvLyDmlK/ku5jmlrnlvI/liJfooahcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5tZW1iZXJQYXltZW50LFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5wYXltZW50X2xpc3QgPSByZXMuZGF0YXMucGF5bWVudF9saXN0XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIG9uU2hvdygpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgLy8g5YWo5bGA6K6i5Y2V5L+h5oGvXHJcbiAgICB2YXIgb3JkZXJJbmZvID0gYXBwLmdsb2JhbERhdGEub3JkZXJJbmZvXHJcbiAgICBjb25zb2xlLmxvZyhvcmRlckluZm8pXHJcbiAgICAvLyDlnLDlnYDkv6Hmga9cclxuICAgIHRoaXMuYWRkcmVzcyA9IG9yZGVySW5mby5hZGRyZXNzX2luZm9cclxuICAgIC8vIOWkmuW6l+mTuuS/oeaBr1xyXG4gICAgdGhpcy5zdG9yZV9jYXJ0X2xpc3QgPSBvcmRlckluZm8uc3RvcmVfY2FydF9saXN0XHJcbiAgICAvLyDllYblk4HliJfooahcclxuICAgIHZhciBnb29kc19saXN0ID0gW11cclxuICAgIC8vIOWVhuWTgeaAu+S7t+agvFxyXG4gICAgdmFyIGdvb2RzUHJpY2UgPSAwXHJcbiAgICBPYmplY3QudmFsdWVzKG9yZGVySW5mby5zdG9yZV9jYXJ0X2xpc3QpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIGdvb2RzX2xpc3QgPSBnb29kc19saXN0LmNvbmNhdChpdGVtLmdvb2RzX2xpc3QpXHJcbiAgICAgIGdvb2RzUHJpY2UgKz0gTnVtYmVyKGl0ZW0uc3RvcmVfZ29vZHNfdG90YWwpXHJcbiAgICB9KVxyXG4gICAgdGhpcy5nb29kc1ByaWNlID0gZ29vZHNQcmljZS50b0ZpeGVkKDIpXHJcbiAgICB0aGlzLmdvb2RzX2xpc3QgPSBnb29kc19saXN0XHJcbiAgICAvLyDllYblk4HmgLvmlbDph49cclxuICAgIHZhciBnb29kc0FsbE51bSA9IDBcclxuICAgIGdvb2RzX2xpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgZ29vZHNBbGxOdW0gKz0gTnVtYmVyKGl0ZW0uZ29vZHNfbnVtKVxyXG4gICAgfSlcclxuICAgIHRoaXMuZ29vZHNBbGxOdW0gPSBnb29kc0FsbE51bVxyXG4gICAgLy8g6K6i5Y2V5oC75Lu35qC8XHJcbiAgICB0aGlzLmFsbFByaWNlID0gTnVtYmVyKG9yZGVySW5mby5vcmRlcl9hbW91bnQpLnRvRml4ZWQoMilcclxuICAgIC8vIOWcsOWdgGhhc2hcclxuICAgIHRoaXMuYWRkcmVzc19hcGkgPSBvcmRlckluZm8uYWRkcmVzc19hcGlcclxuICAgIC8vIOWPkeelqOS/oeaBr2hhc2hcclxuICAgIHRoaXMudmF0X2hhc2ggPSBvcmRlckluZm8udmF0X2hhc2hcclxuICAgIC8vIOWVhuWTgeS/oeaBr1xyXG4gICAgdGhpcy5jYXJ0X2lkID0gb3JkZXJJbmZvLmNhcnRfaWRcclxuICB9XHJcbn1cclxuIl19