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
      navigationBarTitleText: '订单列表'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      navArr: [{ title: '全部', id: 0 }, { title: '待付款' }, { title: '待发货' }, { title: '待收货' }, { title: '已完成' }],
      navIdx: 0
    }, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/orderlist'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVybGlzdC5qcyJdLCJuYW1lcyI6WyJTaG9wQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsIm5hdkFyciIsInRpdGxlIiwiaWQiLCJuYXZJZHgiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJldmVudHMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGNBQVEsQ0FDTixFQUFFQyxPQUFPLElBQVQsRUFBZUMsSUFBSSxDQUFuQixFQURNLEVBRU4sRUFBRUQsT0FBTyxLQUFULEVBRk0sRUFHTixFQUFFQSxPQUFPLEtBQVQsRUFITSxFQUlOLEVBQUVBLE9BQU8sS0FBVCxFQUpNLEVBS04sRUFBRUEsT0FBTyxLQUFULEVBTE0sQ0FESDtBQVFMRSxjQUFRO0FBUkgsSyxRQVdQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVUsRSxRQUlWQyxNLEdBQVMsRTs7Ozs7NkJBSEEsQ0FBRTs7OzZCQUNGLENBQUU7Ozs7RUF4QnlCQyxlQUFLQyxJOztrQkFBdEJkLFEiLCJmaWxlIjoib3JkZXJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXliJfooagnXHJcbiAgfTtcclxuXHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIG5hdkFycjogW1xyXG4gICAgICB7IHRpdGxlOiAn5YWo6YOoJywgaWQ6IDAgfSxcclxuICAgICAgeyB0aXRsZTogJ+W+heS7mOasvicgfSxcclxuICAgICAgeyB0aXRsZTogJ+W+heWPkei0pycgfSxcclxuICAgICAgeyB0aXRsZTogJ+W+heaUtui0pycgfSxcclxuICAgICAgeyB0aXRsZTogJ+W3suWujOaIkCcgfVxyXG4gICAgXSxcclxuICAgIG5hdklkeDogMFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7fTtcclxuICBvbkxvYWQoKSB7fVxyXG4gIG9uU2hvdygpIHt9XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG59XHJcbiJdfQ==