'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mask = require('./../components/mask.js');

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wallet = function (_wepy$page) {
  _inherits(Wallet, _wepy$page);

  function Wallet() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Wallet);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Wallet.__proto__ || Object.getPrototypeOf(Wallet)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的钱包'
    }, _this.components = { mask: _mask2.default }, _this.mixins = [], _this.data = {
      requestImgUrl: ''
    }, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Wallet, [{
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'onShow',
    value: function onShow() {
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
    }
  }]);

  return Wallet;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Wallet , 'pages/wallet'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhbGxldC5qcyJdLCJuYW1lcyI6WyJXYWxsZXQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1hc2siLCJtaXhpbnMiLCJkYXRhIiwicmVxdWVzdEltZ1VybCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEVBQUVDLG9CQUFGLEUsUUFDYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLHFCQUFlO0FBRFYsSyxRQUdQQyxRLEdBQVcsRSxRQUNYQyxPLEdBQVUsRSxRQVFWQyxNLEdBQVMsRTs7Ozs7NkJBTEEsQ0FBRTs7OzZCQUNGO0FBQ1AsV0FBS0gsYUFBTCxHQUFxQixLQUFLSSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JMLGFBQTdDO0FBQ0Q7Ozs7RUFqQmlDTSxlQUFLQyxJOztrQkFBcEJkLE0iLCJmaWxlIjoid2FsbGV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgbWFzayBmcm9tICcuLi9jb21wb25lbnRzL21hc2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbGV0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE6ZKx5YyFJ1xyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHsgbWFzayB9O1xyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcmVxdWVzdEltZ1VybDogJydcclxuICB9O1xyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIFxyXG4gIH07XHJcbiAgb25Mb2FkKCkge31cclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gIH1cclxuXHJcbiAgZXZlbnRzID0ge307XHJcbn1cclxuIl19