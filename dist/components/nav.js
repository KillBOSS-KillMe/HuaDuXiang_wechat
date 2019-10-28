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

var Nav = function (_wepy$component) {
  _inherits(Nav, _wepy$component);

  function Nav() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Nav);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Nav.__proto__ || Object.getPrototypeOf(Nav)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      navList: [{ title: '首页', icon: 'iconshouye-copy', url: 'pages/index' }, { title: '分类', icon: 'iconfenlei', url: 'pages/class' }, { title: '入驻', icon: 'iconshezhi', url: 'pages/settledIn' }, { title: '购物车', icon: 'icongouwuche-copy', url: 'pages/shopCar' }, { title: '我的', icon: 'iconwode', url: 'pages/user' }]
    }, _this.props = {}, _this.methods = {
      navPage: function navPage(url) {
        var route = this.$parent.$parent['__route__'];
        if (url != route) {
          wx.redirectTo({
            url: '/' + url
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Nav, [{
    key: 'onLoad',
    value: function onLoad() {
      var pages = getCurrentPages();
      var route = pages[pages.length - 1].route;
      this.navList.forEach(function (item) {
        if (item.url == route) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      this.$apply();
    }
  }]);

  return Nav;
}(_wepy2.default.component);

exports.default = Nav;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdi5qcyJdLCJuYW1lcyI6WyJOYXYiLCJkYXRhIiwibmF2TGlzdCIsInRpdGxlIiwiaWNvbiIsInVybCIsInByb3BzIiwibWV0aG9kcyIsIm5hdlBhZ2UiLCJyb3V0ZSIsIiRwYXJlbnQiLCJ3eCIsInJlZGlyZWN0VG8iLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsImxlbmd0aCIsImZvckVhY2giLCJpdGVtIiwiYWN0aXZlIiwiJGFwcGx5Iiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsRzs7Ozs7Ozs7Ozs7Ozs7Z0xBQ25CQyxJLEdBQU87QUFDTEMsZUFBUyxDQUNQLEVBQUVDLE9BQU8sSUFBVCxFQUFlQyxNQUFNLGlCQUFyQixFQUF3Q0MsS0FBSyxhQUE3QyxFQURPLEVBRVAsRUFBRUYsT0FBTyxJQUFULEVBQWVDLE1BQU0sWUFBckIsRUFBbUNDLEtBQUssYUFBeEMsRUFGTyxFQUdQLEVBQUVGLE9BQU8sSUFBVCxFQUFlQyxNQUFNLFlBQXJCLEVBQW1DQyxLQUFLLGlCQUF4QyxFQUhPLEVBSVAsRUFBRUYsT0FBTyxLQUFULEVBQWdCQyxNQUFNLG1CQUF0QixFQUEyQ0MsS0FBSyxlQUFoRCxFQUpPLEVBS1AsRUFBRUYsT0FBTyxJQUFULEVBQWVDLE1BQU0sVUFBckIsRUFBaUNDLEtBQUssWUFBdEMsRUFMTztBQURKLEssUUFTUEMsSyxHQUFRLEUsUUFDUkMsTyxHQUFVO0FBQ1JDLGFBRFEsbUJBQ0FILEdBREEsRUFDSztBQUNYLFlBQUlJLFFBQVEsS0FBS0MsT0FBTCxDQUFhQSxPQUFiLENBQXFCLFdBQXJCLENBQVo7QUFDQSxZQUFJTCxPQUFPSSxLQUFYLEVBQWtCO0FBQ2hCRSxhQUFHQyxVQUFILENBQWM7QUFDWlAsdUJBQVNBO0FBREcsV0FBZDtBQUdEO0FBQ0Y7QUFSTyxLOzs7Ozs2QkFVRDtBQUNQLFVBQUlRLFFBQVFDLGlCQUFaO0FBQ0EsVUFBSUwsUUFBUUksTUFBTUEsTUFBTUUsTUFBTixHQUFlLENBQXJCLEVBQXdCTixLQUFwQztBQUNBLFdBQUtQLE9BQUwsQ0FBYWMsT0FBYixDQUFxQixnQkFBUTtBQUMzQixZQUFJQyxLQUFLWixHQUFMLElBQVlJLEtBQWhCLEVBQXVCO0FBQ3JCUSxlQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNELFNBRkQsTUFFTztBQUNMRCxlQUFLQyxNQUFMLEdBQWMsS0FBZDtBQUNEO0FBQ0YsT0FORDtBQU9BLFdBQUtDLE1BQUw7QUFDRDs7OztFQWhDOEJDLGVBQUtDLFM7O2tCQUFqQnJCLEciLCJmaWxlIjoibmF2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXYgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgZGF0YSA9IHtcclxuICAgIG5hdkxpc3Q6IFtcclxuICAgICAgeyB0aXRsZTogJ+mmlumhtScsIGljb246ICdpY29uc2hvdXllLWNvcHknLCB1cmw6ICdwYWdlcy9pbmRleCcgfSxcclxuICAgICAgeyB0aXRsZTogJ+WIhuexuycsIGljb246ICdpY29uZmVubGVpJywgdXJsOiAncGFnZXMvY2xhc3MnIH0sXHJcbiAgICAgIHsgdGl0bGU6ICflhaXpqbsnLCBpY29uOiAnaWNvbnNoZXpoaScsIHVybDogJ3BhZ2VzL3NldHRsZWRJbicgfSxcclxuICAgICAgeyB0aXRsZTogJ+i0reeJqei9picsIGljb246ICdpY29uZ291d3VjaGUtY29weScsIHVybDogJ3BhZ2VzL3Nob3BDYXInIH0sXHJcbiAgICAgIHsgdGl0bGU6ICfmiJHnmoQnLCBpY29uOiAnaWNvbndvZGUnLCB1cmw6ICdwYWdlcy91c2VyJyB9XHJcbiAgICBdXHJcbiAgfTtcclxuICBwcm9wcyA9IHt9O1xyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBuYXZQYWdlKHVybCkge1xyXG4gICAgICB2YXIgcm91dGUgPSB0aGlzLiRwYXJlbnQuJHBhcmVudFsnX19yb3V0ZV9fJ107XHJcbiAgICAgIGlmICh1cmwgIT0gcm91dGUpIHtcclxuICAgICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgIHVybDogYC8ke3VybH1gXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIG9uTG9hZCgpIHtcclxuICAgIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgdmFyIHJvdXRlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV0ucm91dGU7XHJcbiAgICB0aGlzLm5hdkxpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgaWYgKGl0ZW0udXJsID09IHJvdXRlKSB7XHJcbiAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy4kYXBwbHkoKTtcclxuICB9XHJcbn1cclxuIl19