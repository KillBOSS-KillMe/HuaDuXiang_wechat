'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var api = require('./../api.js');

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
        var num = this.good.goods_num;
        num++;
        this.changeNum(num);
      },
      decrease: function decrease() {
        var num = this.good.goods_num;
        if (num === 1) {
          return false;
        }
        num--;
        this.changeNum(num);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // 计算属性

  // 方法集


  _createClass(CartCount, [{
    key: 'changeNum',
    value: function changeNum(num) {
      var _this2 = this;

      (0, _ajax.ajax)({
        url: api.cartEditQuantity,
        data: {
          goods_id: this.good.goods_id,
          cart_id: this.good.cart_id,
          quantity: num
        }
      }).then(function (res) {
        if (res.datas.state == 1) {
          _this2.good.goods_num = res.datas.quantity;
          _this2.good.goods_price = res.datas.goods_price;
          _this2.$apply();
          // this.$emit('getGood', this.good);
        } else {
          wx.showToast({
            title: res.datas.error,
            icon: 'none'
          });
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return CartCount;
}(_wepy2.default.component);

exports.default = CartCount;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnRfY291bnQuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIkNhcnRDb3VudCIsImRhdGEiLCJwcm9wcyIsImdvb2QiLCJ0eXBlIiwiT2JqZWN0IiwiY29tcG9uZW50cyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImFkZCIsIm51bSIsImdvb2RzX251bSIsImNoYW5nZU51bSIsImRlY3JlYXNlIiwidXJsIiwiY2FydEVkaXRRdWFudGl0eSIsImdvb2RzX2lkIiwiY2FydF9pZCIsInF1YW50aXR5IiwidGhlbiIsInJlcyIsImRhdGFzIiwic3RhdGUiLCJnb29kc19wcmljZSIsIiRhcHBseSIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJlcnJvciIsImljb24iLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBR3FCQyxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEksR0FBTyxFLFFBQ1BDLEssR0FBUTtBQUNOQyxZQUFNO0FBQ0pDLGNBQU1DO0FBREY7QUFEQSxLLFFBS1JDLFUsR0FBYSxFLFFBRWJDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSQyxTQURRLGlCQUNGO0FBQ0osWUFBSUMsTUFBTSxLQUFLUCxJQUFMLENBQVVRLFNBQXBCO0FBQ0FEO0FBQ0EsYUFBS0UsU0FBTCxDQUFlRixHQUFmO0FBQ0QsT0FMTztBQU1SRyxjQU5RLHNCQU1HO0FBQ1QsWUFBSUgsTUFBTSxLQUFLUCxJQUFMLENBQVVRLFNBQXBCO0FBQ0EsWUFBSUQsUUFBUSxDQUFaLEVBQWU7QUFDYixpQkFBTyxLQUFQO0FBQ0Q7QUFDREE7QUFDQSxhQUFLRSxTQUFMLENBQWVGLEdBQWY7QUFDRDtBQWJPLEs7O0FBSFY7O0FBRUE7Ozs7OzhCQWdCVUEsRyxFQUFLO0FBQUE7O0FBQ2Isc0JBQUs7QUFDSEksYUFBS2hCLElBQUlpQixnQkFETjtBQUVIZCxjQUFNO0FBQ0plLG9CQUFVLEtBQUtiLElBQUwsQ0FBVWEsUUFEaEI7QUFFSkMsbUJBQVMsS0FBS2QsSUFBTCxDQUFVYyxPQUZmO0FBR0pDLG9CQUFVUjtBQUhOO0FBRkgsT0FBTCxFQU9HUyxJQVBILENBT1EsZUFBTztBQUNiLFlBQUlDLElBQUlDLEtBQUosQ0FBVUMsS0FBVixJQUFtQixDQUF2QixFQUEwQjtBQUN4QixpQkFBS25CLElBQUwsQ0FBVVEsU0FBVixHQUFzQlMsSUFBSUMsS0FBSixDQUFVSCxRQUFoQztBQUNBLGlCQUFLZixJQUFMLENBQVVvQixXQUFWLEdBQXdCSCxJQUFJQyxLQUFKLENBQVVFLFdBQWxDO0FBQ0EsaUJBQUtDLE1BQUw7QUFDQTtBQUNELFNBTEQsTUFLTztBQUNMQyxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU9QLElBQUlDLEtBQUosQ0FBVU8sS0FETjtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJRDtBQUNGLE9BbkJEO0FBb0JEOzs7NkJBQ1EsQ0FDUjs7OztFQWpEb0NDLGVBQUtDLFM7O2tCQUF2Qi9CLFMiLCJmaWxlIjoiY2FydF9jb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0Q291bnQgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgZGF0YSA9IHt9O1xyXG4gIHByb3BzID0ge1xyXG4gICAgZ29vZDoge1xyXG4gICAgICB0eXBlOiBPYmplY3RcclxuICAgIH1cclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuICAvLyDorqHnrpflsZ7mgKdcclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIC8vIOaWueazlembhlxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBhZGQoKSB7XHJcbiAgICAgIHZhciBudW0gPSB0aGlzLmdvb2QuZ29vZHNfbnVtO1xyXG4gICAgICBudW0rK1xyXG4gICAgICB0aGlzLmNoYW5nZU51bShudW0pXHJcbiAgICB9LFxyXG4gICAgZGVjcmVhc2UoKSB7XHJcbiAgICAgIHZhciBudW0gPSB0aGlzLmdvb2QuZ29vZHNfbnVtO1xyXG4gICAgICBpZiAobnVtID09PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIG51bS0tXHJcbiAgICAgIHRoaXMuY2hhbmdlTnVtKG51bSlcclxuICAgIH0sXHJcbiAgfTtcclxuICBjaGFuZ2VOdW0obnVtKSB7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuY2FydEVkaXRRdWFudGl0eSxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGdvb2RzX2lkOiB0aGlzLmdvb2QuZ29vZHNfaWQsXHJcbiAgICAgICAgY2FydF9pZDogdGhpcy5nb29kLmNhcnRfaWQsXHJcbiAgICAgICAgcXVhbnRpdHk6IG51bVxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgIHRoaXMuZ29vZC5nb29kc19udW0gPSByZXMuZGF0YXMucXVhbnRpdHk7XHJcbiAgICAgICAgdGhpcy5nb29kLmdvb2RzX3ByaWNlID0gcmVzLmRhdGFzLmdvb2RzX3ByaWNlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgLy8gdGhpcy4kZW1pdCgnZ2V0R29vZCcsIHRoaXMuZ29vZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMuZXJyb3IsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIG9uTG9hZCgpIHtcclxuICB9XHJcbn1cclxuIl19