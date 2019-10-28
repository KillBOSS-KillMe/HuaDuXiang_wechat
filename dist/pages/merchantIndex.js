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
      navigationBarTitleText: '商户',
      navigationStyle: 'custom'

    }, _this.components = {}, _this.mixins = [], _this.data = {
      flowData: [{
        id: '1',
        title: '萌分订书机a萌分订书机a萌分订书机a萌分订书机a',
        price: '5',
        exprice: '25',
        img: 'indeximg.png'
      }, {
        id: '2',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: 'indeximg.png'
      }, {
        id: '3',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: 'indeximg.png'
      }, {
        id: '4',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: 'indeximg.png'
      }, {
        id: '5',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: 'indeximg.png'
      }, {
        id: '6',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: 'indeximg.png'
      }]
    }, _this.computed = {}, _this.methods = {
      navigate: function navigate() {
        this.$navigate({ url: 'shopDetails' });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad(t) {
      console.log(t, '店铺id');
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/merchantIndex'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lcmNoYW50SW5kZXguanMiXSwibmFtZXMiOlsiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvblN0eWxlIiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJmbG93RGF0YSIsImlkIiwidGl0bGUiLCJwcmljZSIsImV4cHJpY2UiLCJpbWciLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJuYXZpZ2F0ZSIsIiRuYXZpZ2F0ZSIsInVybCIsImV2ZW50cyIsInQiLCJjb25zb2xlIiwibG9nIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQQyx1QkFBaUI7O0FBRlYsSyxRQU1UQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FDUjtBQUNFQyxZQUFJLEdBRE47QUFFRUMsZUFBTywwQkFGVDtBQUdFQyxlQUFPLEdBSFQ7QUFJRUMsaUJBQVMsSUFKWDtBQUtFQyxhQUFLO0FBTFAsT0FEUSxFQVFSO0FBQ0VKLFlBQUksR0FETjtBQUVFQyxlQUFPLE9BRlQ7QUFHRUMsZUFBTyxHQUhUO0FBSUVDLGlCQUFTLElBSlg7QUFLRUMsYUFBSztBQUxQLE9BUlEsRUFlUjtBQUNFSixZQUFJLEdBRE47QUFFRUMsZUFBTyxPQUZUO0FBR0VDLGVBQU8sR0FIVDtBQUlFQyxpQkFBUyxJQUpYO0FBS0VDLGFBQUs7QUFMUCxPQWZRLEVBc0JSO0FBQ0VKLFlBQUksR0FETjtBQUVFQyxlQUFPLE9BRlQ7QUFHRUMsZUFBTyxHQUhUO0FBSUVDLGlCQUFTLElBSlg7QUFLRUMsYUFBSztBQUxQLE9BdEJRLEVBNkJSO0FBQ0VKLFlBQUksR0FETjtBQUVFQyxlQUFPLE9BRlQ7QUFHRUMsZUFBTyxHQUhUO0FBSUVDLGlCQUFTLElBSlg7QUFLRUMsYUFBSztBQUxQLE9BN0JRLEVBb0NSO0FBQ0VKLFlBQUksR0FETjtBQUVFQyxlQUFPLE9BRlQ7QUFHRUMsZUFBTyxHQUhUO0FBSUVDLGlCQUFTLElBSlg7QUFLRUMsYUFBSztBQUxQLE9BcENRO0FBREwsSyxRQStDUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ1JDLGNBRFEsc0JBQ0c7QUFDVCxhQUFLQyxTQUFMLENBQWUsRUFBRUMsS0FBSyxhQUFQLEVBQWY7QUFDRDtBQUhPLEssUUFNVkMsTSxHQUFTLEU7Ozs7OzZCQUNBLENBQUU7OzsyQkFFSkMsQyxFQUFHO0FBQUNDLGNBQVFDLEdBQVIsQ0FBWUYsQ0FBWixFQUFlLE1BQWY7QUFBdUI7Ozs7RUFyRUVHLGVBQUtDLEk7O2tCQUF0QnZCLFEiLCJmaWxlIjoibWVyY2hhbnRJbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5oi3JyxcclxuICAgIG5hdmlnYXRpb25TdHlsZTogJ2N1c3RvbSdcclxuXHJcbiAgfTtcclxuXHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGZsb3dEYXRhOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzEnLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6YeiQjOWIhuiuouS5puacumHokIzliIborqLkuabmnLph6JCM5YiG6K6i5Lmm5py6YScsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnMicsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICdpbmRleGltZy5wbmcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzMnLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnaW5kZXhpbWcucG5nJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICc0JyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnNScsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICdpbmRleGltZy5wbmcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzYnLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnaW5kZXhpbWcucG5nJ1xyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIG5hdmlnYXRlKCkge1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogJ3Nob3BEZXRhaWxzJyB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvblNob3coKSB7fVxyXG5cclxuICBvbkxvYWQodCkge2NvbnNvbGUubG9nKHQsICflupfpk7ppZCcpfVxyXG59XHJcbiJdfQ==