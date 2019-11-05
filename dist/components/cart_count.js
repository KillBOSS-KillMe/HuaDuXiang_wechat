'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CartCount = function (_wepy$component) {
  _inherits(CartCount, _wepy$component);

  function CartCount() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CartCount);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CartCount.__proto__ || Object.getPrototypeOf(CartCount)).call.apply(_ref, [this].concat(args))), _this), _this.data = {}, _this.props = {
      good: {
        type: Object
      }
    }, _this.components = {}, _this.computed = {}, _this.methods = {
      add: function add() {
        this.good.goods_num++;
        this.$emit('getGood', this.good);
      },
      decrease: function decrease() {
        if (this.good.goods_num === 1) {
          return false;
        }
        this.good.goods_num--;
        this.$emit('getGood', this.good);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // 计算属性

  // 方法集


  _createClass(CartCount, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return CartCount;
}(_wepy2.default.component);

exports.default = CartCount;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnRfY291bnQuanMiXSwibmFtZXMiOlsiQ2FydENvdW50IiwiZGF0YSIsInByb3BzIiwiZ29vZCIsInR5cGUiLCJPYmplY3QiLCJjb21wb25lbnRzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYWRkIiwiZ29vZHNfbnVtIiwiJGVtaXQiLCJkZWNyZWFzZSIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSSxHQUFPLEUsUUFDUEMsSyxHQUFRO0FBQ05DLFlBQU07QUFDSkMsY0FBTUM7QUFERjtBQURBLEssUUFLUkMsVSxHQUFhLEUsUUFFYkMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ1JDLFNBRFEsaUJBQ0Q7QUFDTCxhQUFLTixJQUFMLENBQVVPLFNBQVY7QUFDQSxhQUFLQyxLQUFMLENBQVcsU0FBWCxFQUFzQixLQUFLUixJQUEzQjtBQUNELE9BSk87QUFLUlMsY0FMUSxzQkFLSTtBQUNWLFlBQUksS0FBS1QsSUFBTCxDQUFVTyxTQUFWLEtBQXdCLENBQTVCLEVBQThCO0FBQzNCLGlCQUFPLEtBQVA7QUFDRjtBQUNELGFBQUtQLElBQUwsQ0FBVU8sU0FBVjtBQUNBLGFBQUtDLEtBQUwsQ0FBVyxTQUFYLEVBQXNCLEtBQUtSLElBQTNCO0FBQ0Q7QUFYTyxLOztBQUhWOztBQUVBOzs7Ozs2QkFjVSxDQUNUOzs7O0VBekJvQ1UsZUFBS0MsUzs7a0JBQXZCZCxTIiwiZmlsZSI6ImNhcnRfY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnRDb3VudCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICBkYXRhID0ge31cclxuICBwcm9wcyA9IHtcclxuICAgIGdvb2Q6IHtcclxuICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgfVxyXG4gIH1cclxuICBjb21wb25lbnRzID0ge31cclxuICAvLyDorqHnrpflsZ7mgKdcclxuICBjb21wdXRlZCA9IHt9XHJcbiAgLy8g5pa55rOV6ZuGXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGFkZCAoKSB7XHJcbiAgICAgIHRoaXMuZ29vZC5nb29kc19udW0rK1xyXG4gICAgICB0aGlzLiRlbWl0KCdnZXRHb29kJywgdGhpcy5nb29kKVxyXG4gICAgfSxcclxuICAgIGRlY3JlYXNlICgpIHtcclxuICAgICAgaWYgKHRoaXMuZ29vZC5nb29kc19udW0gPT09IDEpe1xyXG4gICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmdvb2QuZ29vZHNfbnVtLS1cclxuICAgICAgdGhpcy4kZW1pdCgnZ2V0R29vZCcsIHRoaXMuZ29vZClcclxuICAgIH1cclxuICB9XHJcbiAgb25Mb2FkICgpIHtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==