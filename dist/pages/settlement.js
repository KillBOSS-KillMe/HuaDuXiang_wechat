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
      preId: '1', //预购id
      allSelected: false,
      goodsAllNum: 0, //总共件数
      goodsAllPrice: 0, // 总共价格
      userinfo: {
        username: '李白',
        phone: '18002101520',
        address: '陕西省西安市莲湖区安美居构建公司家属院'
      }
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
      // this.userInfo = this.$parent.globalData.userInfo
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/settlement'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZW1lbnQuanMiXSwibmFtZXMiOlsiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwicHJlSWQiLCJhbGxTZWxlY3RlZCIsImdvb2RzQWxsTnVtIiwiZ29vZHNBbGxQcmljZSIsInVzZXJpbmZvIiwidXNlcm5hbWUiLCJwaG9uZSIsImFkZHJlc3MiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnZXRXWFBheW1lbnQiLCJjb25zb2xlIiwibG9nIiwiZXZlbnRzIiwib3B0aW9ucyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxxQkFBZSxFQURWO0FBRUxDLGFBQU8sR0FGRixFQUVPO0FBQ1pDLG1CQUFhLEtBSFI7QUFJTEMsbUJBQWEsQ0FKUixFQUlXO0FBQ2hCQyxxQkFBZSxDQUxWLEVBS2E7QUFDbEJDLGdCQUFVO0FBQ1JDLGtCQUFVLElBREY7QUFFUkMsZUFBTyxhQUZDO0FBR1JDLGlCQUFTO0FBSEQ7QUFOTCxLLFFBYVBDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSQyxrQkFEUSwwQkFDTztBQUNiQyxnQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDRDtBQUhPLEssUUFNVkMsTSxHQUFTLEU7Ozs7OzJCQUNGQyxPLEVBQVMsQ0FBRTs7OzZCQUNUO0FBQ1A7QUFDQSxXQUFLZixhQUFMLEdBQXFCLEtBQUtnQixPQUFMLENBQWFDLFVBQWIsQ0FBd0JqQixhQUE3QztBQUNEOzs7O0VBbkNtQ2tCLGVBQUtDLEk7O2tCQUF0QnpCLFEiLCJmaWxlIjoic2V0dGxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5o+Q5Lqk6K6i5Y2VJ1xyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIHByZUlkOiAnMScsIC8v6aKE6LStaWRcclxuICAgIGFsbFNlbGVjdGVkOiBmYWxzZSxcclxuICAgIGdvb2RzQWxsTnVtOiAwLCAvL+aAu+WFseS7tuaVsFxyXG4gICAgZ29vZHNBbGxQcmljZTogMCwgLy8g5oC75YWx5Lu35qC8XHJcbiAgICB1c2VyaW5mbzoge1xyXG4gICAgICB1c2VybmFtZTogJ+adjueZvScsXHJcbiAgICAgIHBob25lOiAnMTgwMDIxMDE1MjAnLFxyXG4gICAgICBhZGRyZXNzOiAn6ZmV6KW/55yB6KW/5a6J5biC6I6y5rmW5Yy65a6J576O5bGF5p6E5bu65YWs5Y+45a625bGe6ZmiJ1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBnZXRXWFBheW1lbnQoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfmj5DkuqTorqLljZUnKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvbkxvYWQob3B0aW9ucykge31cclxuICBvblNob3coKSB7XHJcbiAgICAvLyB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgfVxyXG59XHJcbiJdfQ==