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

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的分销'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      requestImgUrl: '',
      bannerArr: ['收入明细', '我的推荐'],
      navIdx: 0,
      topHeight: null, // 吸顶距离
      scrollFlag: false, // 吸顶flag
      isDist: true // 是否分销员
    }, _this.computed = {}, _this.methods = {
      changeNav: function changeNav(idx) {
        if (idx == this.navIdx) return;
        this.navIdx = idx;
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var that = this;
      wx.getSystemInfo({
        success: function success(res) {
          var windowWidth = res.windowWidth;
          that.topHeight = 270 / 750 * windowWidth;
          console.log(that.topHeight);
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onPageScroll',
    value: function onPageScroll(e) {
      var isSatisfy = e.scrollTop >= this.topHeight ? true : false;
      if (this.scrollFlag == isSatisfy) {
        return false;
      }
      this.scrollFlag = isSatisfy;
      this.$apply();
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/distribution'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3RyaWJ1dGlvbi5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwiYmFubmVyQXJyIiwibmF2SWR4IiwidG9wSGVpZ2h0Iiwic2Nyb2xsRmxhZyIsImlzRGlzdCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImNoYW5nZU5hdiIsImlkeCIsImV2ZW50cyIsIm9wdGlvbnMiLCJ0aGF0Iiwid3giLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsIndpbmRvd1dpZHRoIiwiY29uc29sZSIsImxvZyIsImUiLCJpc1NhdGlzZnkiLCJzY3JvbGxUb3AiLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLHFCQUFlLEVBRFY7QUFFTEMsaUJBQVcsQ0FBQyxNQUFELEVBQVMsTUFBVCxDQUZOO0FBR0xDLGNBQVEsQ0FISDtBQUlMQyxpQkFBVyxJQUpOLEVBSWE7QUFDbEJDLGtCQUFZLEtBTFAsRUFLYztBQUNuQkMsY0FBUSxJQU5ILENBTVM7QUFOVCxLLFFBU1BDLFEsR0FBVyxFLFFBWVhDLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNFQyxHQURGLEVBQ087QUFDYixZQUFJQSxPQUFPLEtBQUtQLE1BQWhCLEVBQXdCO0FBQ3hCLGFBQUtBLE1BQUwsR0FBY08sR0FBZDtBQUNEO0FBSk8sSyxRQWVWQyxNLEdBQVMsRTs7Ozs7MkJBMUJGQyxPLEVBQVM7QUFDZCxVQUFJQyxPQUFPLElBQVg7QUFDQUMsU0FBR0MsYUFBSCxDQUFpQjtBQUNmQyxlQURlLG1CQUNQQyxHQURPLEVBQ0Y7QUFDWCxjQUFJQyxjQUFjRCxJQUFJQyxXQUF0QjtBQUNBTCxlQUFLVCxTQUFMLEdBQWtCLE1BQU0sR0FBUCxHQUFjYyxXQUEvQjtBQUNBQyxrQkFBUUMsR0FBUixDQUFZUCxLQUFLVCxTQUFqQjtBQUNEO0FBTGMsT0FBakI7QUFPRDs7OzZCQUNRLENBQUU7OztpQ0FPRWlCLEMsRUFBRztBQUNkLFVBQUlDLFlBQVlELEVBQUVFLFNBQUYsSUFBZSxLQUFLbkIsU0FBcEIsR0FBZ0MsSUFBaEMsR0FBdUMsS0FBdkQ7QUFDQSxVQUFJLEtBQUtDLFVBQUwsSUFBbUJpQixTQUF2QixFQUFrQztBQUNoQyxlQUFPLEtBQVA7QUFDRDtBQUNELFdBQUtqQixVQUFMLEdBQWtCaUIsU0FBbEI7QUFDQSxXQUFLRSxNQUFMO0FBQ0Q7Ozs7RUExQ2dDQyxlQUFLQyxJOztrQkFBbkIvQixLIiwiZmlsZSI6ImRpc3RyaWJ1dGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE5YiG6ZSAJ1xyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgYmFubmVyQXJyOiBbJ+aUtuWFpeaYjue7hicsICfmiJHnmoTmjqjojZAnXSxcclxuICAgIG5hdklkeDogMCxcclxuICAgIHRvcEhlaWdodDogbnVsbCwgIC8vIOWQuOmhtui3neemu1xyXG4gICAgc2Nyb2xsRmxhZzogZmFsc2UsIC8vIOWQuOmhtmZsYWdcclxuICAgIGlzRGlzdDogdHJ1ZSwgLy8g5piv5ZCm5YiG6ZSA5ZGYXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgd3guZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgdmFyIHdpbmRvd1dpZHRoID0gcmVzLndpbmRvd1dpZHRoO1xyXG4gICAgICAgIHRoYXQudG9wSGVpZ2h0ID0gKDI3MCAvIDc1MCkgKiB3aW5kb3dXaWR0aDtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGF0LnRvcEhlaWdodCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBvblNob3coKSB7fVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjaGFuZ2VOYXYoaWR4KSB7XHJcbiAgICAgIGlmIChpZHggPT0gdGhpcy5uYXZJZHgpIHJldHVybjtcclxuICAgICAgdGhpcy5uYXZJZHggPSBpZHg7XHJcbiAgICB9XHJcbiAgfTtcclxuICBvblBhZ2VTY3JvbGwoZSkge1xyXG4gICAgdmFyIGlzU2F0aXNmeSA9IGUuc2Nyb2xsVG9wID49IHRoaXMudG9wSGVpZ2h0ID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMuc2Nyb2xsRmxhZyA9PSBpc1NhdGlzZnkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zY3JvbGxGbGFnID0gaXNTYXRpc2Z5O1xyXG4gICAgdGhpcy4kYXBwbHkoKTtcclxuICB9XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG59XHJcbiJdfQ==