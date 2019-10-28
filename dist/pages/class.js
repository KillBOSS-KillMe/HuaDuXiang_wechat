'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _nav = require('./../components/nav.js');

var _nav2 = _interopRequireDefault(_nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 底部导航

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
      navigationBarTitleText: '分类'
    }, _this.$repeat = {}, _this.$props = { "nav": { "class": "nav", "xmlns:v-on": "" } }, _this.$events = { "nav": { "v-on:childFn": "goPage" } }, _this.components = {
      nav: _nav2.default
    }, _this.mixins = [], _this.data = {
      leftNav: 0
    }, _this.computed = {}, _this.methods = {
      /**
       * 底部导航跳转
       */
      goPage: function goPage(url, evt) {
        // 销毁当前页{跳转}
        this.$redirect(url);
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/class'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hdiIsIm1peGlucyIsImRhdGEiLCJsZWZ0TmF2IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ29QYWdlIiwidXJsIiwiZXZ0IiwiJHJlZGlyZWN0IiwiZXZlbnRzIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUFxQzs7SUFFaEJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLE9BQU0sRUFBQyxTQUFRLEtBQVQsRUFBZSxjQUFhLEVBQTVCLEVBQVAsRSxRQUNUQyxPLEdBQVUsRUFBQyxPQUFNLEVBQUMsZ0JBQWUsUUFBaEIsRUFBUCxFLFFBQ1RDLFUsR0FBYTtBQUNWQyxXQUFLQTtBQURLLEssUUFJWkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGVBQVM7QUFESixLLFFBSVBDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSOzs7QUFHQUMsWUFKUSxrQkFJREMsR0FKQyxFQUlJQyxHQUpKLEVBSVM7QUFDZjtBQUNBLGFBQUtDLFNBQUwsQ0FBZUYsR0FBZjtBQUNEO0FBUE8sSyxRQVVWRyxNLEdBQVMsRTs7Ozs7NkJBRUEsQ0FBRTs7OzZCQUNGLENBQUU7Ozs7RUFoQ3NCQyxlQUFLQyxJOztrQkFBbkJuQixLIiwiZmlsZSI6ImNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgbmF2IGZyb20gJy4uL2NvbXBvbmVudHMvbmF2JzsgLy8g5bqV6YOo5a+86IiqXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WIhuexuydcclxuICB9O1xyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJuYXZcIjp7XCJjbGFzc1wiOlwibmF2XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge1wibmF2XCI6e1widi1vbjpjaGlsZEZuXCI6XCJnb1BhZ2VcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIG5hdjogbmF2XHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBsZWZ0TmF2OiAwXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8qKlxyXG4gICAgICog5bqV6YOo5a+86Iiq6Lez6L2sXHJcbiAgICAgKi9cclxuICAgIGdvUGFnZSh1cmwsIGV2dCkge1xyXG4gICAgICAvLyDplIDmr4HlvZPliY3pobV76Lez6L2sfVxyXG4gICAgICB0aGlzLiRyZWRpcmVjdCh1cmwpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvbkxvYWQoKSB7fVxyXG4gIG9uU2hvdygpIHt9XHJcbn1cclxuIl19