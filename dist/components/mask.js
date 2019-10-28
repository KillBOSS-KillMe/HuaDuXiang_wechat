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

var Mask = function (_wepy$component) {
  _inherits(Mask, _wepy$component);

  function Mask() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Mask);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mask.__proto__ || Object.getPrototypeOf(Mask)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      maskFlag: {
        twoWay: true,
        default: false,
        type: Boolean
      }
    }, _this.data = {}, _this.events = {}, _this.methods = {
      hideMask: function hideMask() {
        this.maskFlag = false;
        this.$apply();
      },
      move: function move(e) {
        return false;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Mask, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Mask;
}(_wepy2.default.component);

exports.default = Mask;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hc2suanMiXSwibmFtZXMiOlsiTWFzayIsInByb3BzIiwibWFza0ZsYWciLCJ0d29XYXkiLCJkZWZhdWx0IiwidHlwZSIsIkJvb2xlYW4iLCJkYXRhIiwiZXZlbnRzIiwibWV0aG9kcyIsImhpZGVNYXNrIiwiJGFwcGx5IiwibW92ZSIsImUiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLEssR0FBUTtBQUNOQyxnQkFBVTtBQUNSQyxnQkFBUSxJQURBO0FBRVJDLGlCQUFTLEtBRkQ7QUFHUkMsY0FBTUM7QUFIRTtBQURKLEssUUFRUkMsSSxHQUFPLEUsUUFFUEMsTSxHQUFTLEUsUUFFVEMsTyxHQUFVO0FBQ1JDLGNBRFEsc0JBQ0c7QUFDVCxhQUFLUixRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsYUFBS1MsTUFBTDtBQUNELE9BSk87QUFLUkMsVUFMUSxnQkFLSEMsQ0FMRyxFQUtBO0FBQ04sZUFBTyxLQUFQO0FBQ0Q7QUFQTyxLOzs7Ozs2QkFVRCxDQUFFOzs7O0VBdkJxQkMsZUFBS0MsUzs7a0JBQWxCZixJIiwiZmlsZSI6Im1hc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXNrIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gIHByb3BzID0ge1xyXG4gICAgbWFza0ZsYWc6IHtcclxuICAgICAgdHdvV2F5OiB0cnVlLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogQm9vbGVhblxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGRhdGEgPSB7fTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBoaWRlTWFzaygpIHtcclxuICAgICAgdGhpcy5tYXNrRmxhZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfSxcclxuICAgIG1vdmUoZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25Mb2FkKCkge31cclxufVxyXG4iXX0=