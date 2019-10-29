'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      goodsAllNum: 0 //总共件数

    }, _this.computed = {}, _this.methods = {
      getWXPayment: function getWXPayment() {
        console.log('提交订单');
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onLoad',
    value: function onLoad(options) {}
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
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/settlement'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZW1lbnQuanMiXSwibmFtZXMiOlsiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwiYWRkcmVzcyIsImdvb2RzX2xpc3QiLCJzdG9yZV9jYXJ0X2xpc3QiLCJhbGxQcmljZSIsImdvb2RzUHJpY2UiLCJnb29kc0FsbE51bSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdldFdYUGF5bWVudCIsImNvbnNvbGUiLCJsb2ciLCJldmVudHMiLCJvcHRpb25zIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJhcHAiLCJvcmRlckluZm8iLCJhZGRyZXNzX2luZm8iLCJPYmplY3QiLCJ2YWx1ZXMiLCJmb3JFYWNoIiwiY29uY2F0IiwiaXRlbSIsIk51bWJlciIsInN0b3JlX2dvb2RzX3RvdGFsIiwidG9GaXhlZCIsImdvb2RzX251bSIsIm9yZGVyX2Ftb3VudCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMscUJBQWUsRUFEVjtBQUVMQyxlQUFTLElBRkosRUFFVTtBQUNmQyxrQkFBWSxFQUhQLEVBR1c7QUFDaEJDLHVCQUFpQixFQUpaLEVBSWdCO0FBQ3JCQyxnQkFBVSxDQUxMLEVBS1E7QUFDYkMsa0JBQVksQ0FOUCxFQU1VO0FBQ2ZDLG1CQUFhLENBUFIsQ0FPVzs7QUFQWCxLLFFBV1BDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSQyxrQkFEUSwwQkFDTztBQUNiQyxnQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDRDtBQUhPLEssUUFNVkMsTSxHQUFTLEU7Ozs7OzJCQUNGQyxPLEVBQVMsQ0FBRTs7OzZCQUNUO0FBQ1AsV0FBS2IsYUFBTCxHQUFxQixLQUFLYyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JmLGFBQTdDO0FBQ0EsVUFBSWdCLE1BQU0sS0FBS0YsT0FBZjtBQUNBO0FBQ0EsVUFBSUcsWUFBWUQsSUFBSUQsVUFBSixDQUFlRSxTQUEvQjtBQUNBUCxjQUFRQyxHQUFSLENBQVlNLFNBQVo7QUFDQTtBQUNBLFdBQUtoQixPQUFMLEdBQWVnQixVQUFVQyxZQUF6QjtBQUNBO0FBQ0EsV0FBS2YsZUFBTCxHQUF1QmMsVUFBVWQsZUFBakM7QUFDQTtBQUNBLFVBQUlELGFBQWEsRUFBakI7QUFDQTtBQUNBLFVBQUlHLGFBQWEsQ0FBakI7QUFDQWMsYUFBT0MsTUFBUCxDQUFjSCxVQUFVZCxlQUF4QixFQUF5Q2tCLE9BQXpDLENBQWlELGdCQUFRO0FBQ3ZEbkIscUJBQWFBLFdBQVdvQixNQUFYLENBQWtCQyxLQUFLckIsVUFBdkIsQ0FBYjtBQUNBRyxzQkFBY21CLE9BQU9ELEtBQUtFLGlCQUFaLENBQWQ7QUFDRCxPQUhEO0FBSUEsV0FBS3BCLFVBQUwsR0FBa0JBLFdBQVdxQixPQUFYLENBQW1CLENBQW5CLENBQWxCO0FBQ0EsV0FBS3hCLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0E7QUFDQSxVQUFJSSxjQUFjLENBQWxCO0FBQ0FKLGlCQUFXbUIsT0FBWCxDQUFtQixnQkFBUTtBQUN6QmYsdUJBQWVrQixPQUFPRCxLQUFLSSxTQUFaLENBQWY7QUFDRCxPQUZEO0FBR0EsV0FBS3JCLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBO0FBQ0EsV0FBS0YsUUFBTCxHQUFnQm9CLE9BQU9QLFVBQVVXLFlBQWpCLEVBQStCRixPQUEvQixDQUF1QyxDQUF2QyxDQUFoQjtBQUNEOzs7O0VBM0RtQ0csZUFBS0MsSTs7a0JBQXRCcEMsUSIsImZpbGUiOiJzZXR0bGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmj5DkuqTorqLljZUnXHJcbiAgfTtcclxuXHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgYWRkcmVzczogbnVsbCwgLy/lnLDlnYDkv6Hmga9cclxuICAgIGdvb2RzX2xpc3Q6IFtdLCAvL+S4i+WNleWVhuWTgeS/oeaBr1xyXG4gICAgc3RvcmVfY2FydF9saXN0OiBbXSwgLy/kuIvljZXlupfpk7rliJfooahcclxuICAgIGFsbFByaWNlOiAwLCAvL+iuouWNleaAu+S7t+agvFxyXG4gICAgZ29vZHNQcmljZTogMCwgLy8g5ZWG5ZOB5oC75Lu35qC8XHJcbiAgICBnb29kc0FsbE51bTogMCwgLy/mgLvlhbHku7bmlbBcclxuICAgIFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBnZXRXWFBheW1lbnQoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfmj5DkuqTorqLljZUnKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvbkxvYWQob3B0aW9ucykge31cclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgIC8vIOWFqOWxgOiuouWNleS/oeaBr1xyXG4gICAgdmFyIG9yZGVySW5mbyA9IGFwcC5nbG9iYWxEYXRhLm9yZGVySW5mb1xyXG4gICAgY29uc29sZS5sb2cob3JkZXJJbmZvKVxyXG4gICAgLy8g5Zyw5Z2A5L+h5oGvXHJcbiAgICB0aGlzLmFkZHJlc3MgPSBvcmRlckluZm8uYWRkcmVzc19pbmZvXHJcbiAgICAvLyDlpJrlupfpk7rkv6Hmga9cclxuICAgIHRoaXMuc3RvcmVfY2FydF9saXN0ID0gb3JkZXJJbmZvLnN0b3JlX2NhcnRfbGlzdFxyXG4gICAgLy8g5ZWG5ZOB5YiX6KGoXHJcbiAgICB2YXIgZ29vZHNfbGlzdCA9IFtdXHJcbiAgICAvLyDllYblk4HmgLvku7fmoLxcclxuICAgIHZhciBnb29kc1ByaWNlID0gMFxyXG4gICAgT2JqZWN0LnZhbHVlcyhvcmRlckluZm8uc3RvcmVfY2FydF9saXN0KS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBnb29kc19saXN0ID0gZ29vZHNfbGlzdC5jb25jYXQoaXRlbS5nb29kc19saXN0KVxyXG4gICAgICBnb29kc1ByaWNlICs9IE51bWJlcihpdGVtLnN0b3JlX2dvb2RzX3RvdGFsKVxyXG4gICAgfSlcclxuICAgIHRoaXMuZ29vZHNQcmljZSA9IGdvb2RzUHJpY2UudG9GaXhlZCgyKVxyXG4gICAgdGhpcy5nb29kc19saXN0ID0gZ29vZHNfbGlzdFxyXG4gICAgLy8g5ZWG5ZOB5oC75pWw6YePXHJcbiAgICB2YXIgZ29vZHNBbGxOdW0gPSAwXHJcbiAgICBnb29kc19saXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIGdvb2RzQWxsTnVtICs9IE51bWJlcihpdGVtLmdvb2RzX251bSlcclxuICAgIH0pXHJcbiAgICB0aGlzLmdvb2RzQWxsTnVtID0gZ29vZHNBbGxOdW1cclxuXHJcbiAgICAvLyDorqLljZXmgLvku7fmoLxcclxuICAgIHRoaXMuYWxsUHJpY2UgPSBOdW1iZXIob3JkZXJJbmZvLm9yZGVyX2Ftb3VudCkudG9GaXhlZCgyKVxyXG4gIH1cclxufVxyXG4iXX0=