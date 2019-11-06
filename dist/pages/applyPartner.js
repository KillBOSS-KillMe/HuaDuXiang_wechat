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
      navigationBarTitleText: '申请合伙人',
      navigationStyle: 'custom'
    }, _this.components = {}, _this.mixins = [], _this.data = {}, _this.computed = {}, _this.methods = {
      navPartner: function navPartner() {
        this.isPartner();
      },
      back: function back() {
        wx.navigateBack();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'isPartner',
    value: function isPartner() {
      var _this2 = this;

      (0, _ajax.ajax)({
        url: api.isPartner
      }).then(function (res) {
        if (res.datas.state == -1 || res.datas.state == 0) {
          _this2.$navigate('partnerInput');
        } else if (res.datas.state == 1 || res.datas.state == 2) {
          wx.showToast({
            title: res.datas.msg,
            icon: 'none'
          });
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/applyPartner'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGx5UGFydG5lci5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvblN0eWxlIiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJuYXZQYXJ0bmVyIiwiaXNQYXJ0bmVyIiwiYmFjayIsInd4IiwibmF2aWdhdGVCYWNrIiwiZXZlbnRzIiwidXJsIiwidGhlbiIsInJlcyIsImRhdGFzIiwic3RhdGUiLCIkbmF2aWdhdGUiLCJzaG93VG9hc3QiLCJ0aXRsZSIsIm1zZyIsImljb24iLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUdxQkMsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE9BRGpCO0FBRVBDLHVCQUFpQjtBQUZWLEssUUFLVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPLEUsUUFJUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ1JDLGdCQURRLHdCQUNJO0FBQ1YsYUFBS0MsU0FBTDtBQUNELE9BSE87QUFJUkMsVUFKUSxrQkFJRjtBQUNKQyxXQUFHQyxZQUFIO0FBQ0Q7QUFOTyxLLFFBU1ZDLE0sR0FBUyxFOzs7Ozs2QkFDQSxDQUNOOzs7Z0NBQ1E7QUFBQTs7QUFDVCxzQkFBSztBQUNIQyxhQUFLakIsSUFBSVk7QUFETixPQUFMLEVBRUdNLElBRkgsQ0FFUSxlQUFPO0FBQ2IsWUFBR0MsSUFBSUMsS0FBSixDQUFVQyxLQUFWLElBQW1CLENBQUMsQ0FBcEIsSUFBeUJGLElBQUlDLEtBQUosQ0FBVUMsS0FBVixJQUFtQixDQUEvQyxFQUFrRDtBQUNoRCxpQkFBS0MsU0FBTCxDQUFlLGNBQWY7QUFDRCxTQUZELE1BRU8sSUFBR0gsSUFBSUMsS0FBSixDQUFVQyxLQUFWLElBQW1CLENBQW5CLElBQXdCRixJQUFJQyxLQUFKLENBQVVDLEtBQVYsSUFBbUIsQ0FBOUMsRUFBaUQ7QUFDdERQLGFBQUdTLFNBQUgsQ0FBYTtBQUNYQyxtQkFBT0wsSUFBSUMsS0FBSixDQUFVSyxHQUROO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlEO0FBQ0YsT0FYRDtBQVlEOzs7NkJBRVEsQ0FBRTs7OztFQTNDeUJDLGVBQUtDLEk7O2tCQUF0QjFCLFEiLCJmaWxlIjoiYXBwbHlQYXJ0bmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55Sz6K+35ZCI5LyZ5Lq6JyxcclxuICAgIG5hdmlnYXRpb25TdHlsZTogJ2N1c3RvbSdcclxuICB9O1xyXG5cclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICBcclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgbmF2UGFydG5lcigpe1xyXG4gICAgICB0aGlzLmlzUGFydG5lcigpXHJcbiAgICB9LFxyXG4gICAgYmFjaygpe1xyXG4gICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG4gIG9uU2hvdygpIHtcclxuICAgIH1cclxuICBpc1BhcnRuZXIoKXtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5pc1BhcnRuZXIsXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5kYXRhcy5zdGF0ZSA9PSAtMSB8fCByZXMuZGF0YXMuc3RhdGUgPT0gMCkge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKCdwYXJ0bmVySW5wdXQnKVxyXG4gICAgICB9IGVsc2UgaWYocmVzLmRhdGFzLnN0YXRlID09IDEgfHwgcmVzLmRhdGFzLnN0YXRlID09IDIpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5tc2csXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgb25Mb2FkKCkge31cclxufVxyXG4iXX0=