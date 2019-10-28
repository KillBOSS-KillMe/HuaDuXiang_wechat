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
        this.good.num++;
        this.$emit('getGood', this.good);
      },
      decrease: function decrease() {
        if (this.good.num === 1) {
          return false;
        }
        this.good.num--;
        this.$emit('getGood', this.good);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // 计算属性

  // 方法集


  _createClass(CartCount, [{
    key: 'onLoad',
    value: function onLoad() {
      // console.log(this.good)
    }
  }]);

  return CartCount;
}(_wepy2.default.component);

exports.default = CartCount;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnRfY291bnQuanMiXSwibmFtZXMiOlsiQ2FydENvdW50IiwiZGF0YSIsInByb3BzIiwiZ29vZCIsInR5cGUiLCJPYmplY3QiLCJjb21wb25lbnRzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYWRkIiwibnVtIiwiJGVtaXQiLCJkZWNyZWFzZSIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSSxHQUFPLEUsUUFDUEMsSyxHQUFRO0FBQ05DLFlBQU07QUFDSkMsY0FBTUM7QUFERjtBQURBLEssUUFLUkMsVSxHQUFhLEUsUUFFYkMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ1JDLFNBRFEsaUJBQ0Q7QUFDTCxhQUFLTixJQUFMLENBQVVPLEdBQVY7QUFDQSxhQUFLQyxLQUFMLENBQVcsU0FBWCxFQUFzQixLQUFLUixJQUEzQjtBQUNELE9BSk87QUFLUlMsY0FMUSxzQkFLSTtBQUNWLFlBQUksS0FBS1QsSUFBTCxDQUFVTyxHQUFWLEtBQWtCLENBQXRCLEVBQXdCO0FBQ3JCLGlCQUFPLEtBQVA7QUFDRjtBQUNELGFBQUtQLElBQUwsQ0FBVU8sR0FBVjtBQUNBLGFBQUtDLEtBQUwsQ0FBVyxTQUFYLEVBQXNCLEtBQUtSLElBQTNCO0FBQ0Q7QUFYTyxLOztBQUhWOztBQUVBOzs7Ozs2QkFjVTtBQUNSO0FBQ0Q7Ozs7RUExQm9DVSxlQUFLQyxTOztrQkFBdkJkLFMiLCJmaWxlIjoiY2FydF9jb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydENvdW50IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gIGRhdGEgPSB7fVxyXG4gIHByb3BzID0ge1xyXG4gICAgZ29vZDoge1xyXG4gICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbXBvbmVudHMgPSB7fVxyXG4gIC8vIOiuoeeul+WxnuaAp1xyXG4gIGNvbXB1dGVkID0ge31cclxuICAvLyDmlrnms5Xpm4ZcclxuICBtZXRob2RzID0ge1xyXG4gICAgYWRkICgpIHtcclxuICAgICAgdGhpcy5nb29kLm51bSsrXHJcbiAgICAgIHRoaXMuJGVtaXQoJ2dldEdvb2QnLCB0aGlzLmdvb2QpXHJcbiAgICB9LFxyXG4gICAgZGVjcmVhc2UgKCkge1xyXG4gICAgICBpZiAodGhpcy5nb29kLm51bSA9PT0gMSl7XHJcbiAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZ29vZC5udW0tLVxyXG4gICAgICB0aGlzLiRlbWl0KCdnZXRHb29kJywgdGhpcy5nb29kKVxyXG4gICAgfVxyXG4gIH1cclxuICBvbkxvYWQgKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5nb29kKVxyXG4gIH1cclxufVxyXG4iXX0=