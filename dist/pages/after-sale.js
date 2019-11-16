'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      navigationBarTitleText: '售后'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      navIdx: 0
    }, _this.computed = {}, _this.methods = {
      changeNav: function changeNav(idx) {
        if (idx == this.navIdx) return;
        this.navIdx = idx;
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/after-sale'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFmdGVyLXNhbGUuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwibmF2SWR4IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiY2hhbmdlTmF2IiwiaWR4IiwiZXZlbnRzIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFHcUJDLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxjQUFRO0FBREgsSyxRQUlQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDUkMsZUFEUSxxQkFDRUMsR0FERixFQUNPO0FBQ2IsWUFBSUEsT0FBTyxLQUFLSixNQUFoQixFQUF3QjtBQUN4QixhQUFLQSxNQUFMLEdBQWNJLEdBQWQ7QUFDRDtBQUpPLEssUUFPVkMsTSxHQUFTLEU7Ozs7OzZCQUNBLENBQUU7Ozs2QkFFRixDQUFFOzs7O0VBekJ5QkMsZUFBS0MsSTs7a0JBQXRCYixRIiwiZmlsZSI6ImFmdGVyLXNhbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllK7lkI4nXHJcbiAgfTtcclxuXHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIG5hdklkeDogMFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjaGFuZ2VOYXYoaWR4KSB7XHJcbiAgICAgIGlmIChpZHggPT0gdGhpcy5uYXZJZHgpIHJldHVybjtcclxuICAgICAgdGhpcy5uYXZJZHggPSBpZHg7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbiAgb25TaG93KCkge31cclxuXHJcbiAgb25Mb2FkKCkge31cclxufVxyXG4iXX0=