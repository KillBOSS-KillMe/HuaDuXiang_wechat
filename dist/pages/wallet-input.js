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

var WalletInput = function (_wepy$page) {
  _inherits(WalletInput, _wepy$page);

  function WalletInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WalletInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WalletInput.__proto__ || Object.getPrototypeOf(WalletInput)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '提现申请'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      requestImgUrl: ''
    }, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WalletInput, [{
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'onShow',
    value: function onShow() {
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
    }
  }]);

  return WalletInput;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(WalletInput , 'pages/wallet-input'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhbGxldC1pbnB1dC5qcyJdLCJuYW1lcyI6WyJXYWxsZXRJbnB1dCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInJlcXVlc3RJbWdVcmwiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJldmVudHMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OztnTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUNiQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMscUJBQWU7QUFEVixLLFFBR1BDLFEsR0FBVyxFLFFBQ1hDLE8sR0FBVSxFLFFBTVZDLE0sR0FBUyxFOzs7Ozs2QkFMQSxDQUFFOzs7NkJBQ0Y7QUFDUCxXQUFLSCxhQUFMLEdBQXFCLEtBQUtJLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkwsYUFBN0M7QUFDRDs7OztFQWZzQ00sZUFBS0MsSTs7a0JBQXpCYixXIiwiZmlsZSI6IndhbGxldC1pbnB1dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxldElucHV0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5o+Q546w55Sz6K+3J1xyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcmVxdWVzdEltZ1VybDogJydcclxuICB9O1xyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgbWV0aG9kcyA9IHt9O1xyXG4gIG9uTG9hZCgpIHt9XHJcbiAgb25TaG93KCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICB9XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG59XHJcbiJdfQ==