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

// 校验封装
// import check from '../mixins/check'
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
      userInfo: {},
      guangGaoNode: null,
      name: '',
      phone: '',
      id: '',
      navAction: ['action', 'noAction', 'noAction', 'noAction', 'noAction']
    }, _this.props = {}, _this.methods = {
      // 首页
      goIndex: function goIndex() {
        var route = this.$parent.$parent['__route__'];
        if (route == 'pages/index') return;
        this.$parent.$parent.globalData.navAction = ['action', 'noAction', 'noAction', 'noAction', 'noAction'];
        this.$emit('childFn', '/pages/index');
      },

      // 分类
      goClass: function goClass() {
        var route = this.$parent.$parent['__route__'];
        if (route == 'pages/class') return;
        // 顶部导航状态初始化
        this.$parent.$parent.globalData.navAction = ['noAction', 'action', 'noAction', 'noAction', 'noAction', 'noAction'];
        this.$emit('childFn', '/pages/class');
      },


      //入驻
      goSettled: function goSettled() {
        var route = this.$parent.$parent['__route__'];
        if (route == 'pages/settledIn') return;
        this.$parent.$navigate({ url: 'settledIn' });
        // this.$parent.$parent.globalData.navAction = ['noAction', 'noAction', 'action','noAction','noAction']
        // this.$emit('childFn', '/pages/settledIn')
      },

      // 购物车
      goByCar: function goByCar() {
        var route = this.$parent.$parent['__route__'];
        if (route == 'pages/shopCar') return;
        this.$parent.$parent.globalData.navAction = ['noAction', 'noAction', 'noAction', 'action', 'noAction'];
        this.$emit('childFn', '/pages/shopCar');
      },

      // 我的
      goUser: function goUser() {
        var route = this.$parent.$parent['__route__'];
        if (route == 'pages/user') return;
        this.$parent.$parent.globalData.navAction = ['noAction', 'noAction', 'noAction', 'noAction', 'action'];
        this.$emit('childFn', '/pages/user');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // mixins = [check]


  _createClass(Nav, [{
    key: 'onLoad',
    value: function onLoad() {
      this.userInfo = this.$parent.$parent.globalData.userInfo;
      this.navAction = this.$parent.$parent.globalData.navAction;
      this.$apply();
    }
  }]);

  return Nav;
}(_wepy2.default.component);

exports.default = Nav;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdi5qcyJdLCJuYW1lcyI6WyJOYXYiLCJkYXRhIiwidXNlckluZm8iLCJndWFuZ0dhb05vZGUiLCJuYW1lIiwicGhvbmUiLCJpZCIsIm5hdkFjdGlvbiIsInByb3BzIiwibWV0aG9kcyIsImdvSW5kZXgiLCJyb3V0ZSIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiJGVtaXQiLCJnb0NsYXNzIiwiZ29TZXR0bGVkIiwiJG5hdmlnYXRlIiwidXJsIiwiZ29CeUNhciIsImdvVXNlciIsIiRhcHBseSIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0lBQ3FCQSxHOzs7Ozs7Ozs7Ozs7OztnTEFFbkJDLEksR0FBTztBQUNMQyxnQkFBVSxFQURMO0FBRUxDLG9CQUFjLElBRlQ7QUFHTEMsWUFBTSxFQUhEO0FBSUxDLGFBQU8sRUFKRjtBQUtMQyxVQUFJLEVBTEM7QUFNTEMsaUJBQVcsQ0FBQyxRQUFELEVBQVcsVUFBWCxFQUF1QixVQUF2QixFQUFrQyxVQUFsQyxFQUE2QyxVQUE3QztBQU5OLEssUUFRUEMsSyxHQUFRLEUsUUFDUkMsTyxHQUFVO0FBQ1I7QUFDQUMsYUFGUSxxQkFFRTtBQUNSLFlBQUlDLFFBQVEsS0FBS0MsT0FBTCxDQUFhQSxPQUFiLENBQXFCLFdBQXJCLENBQVo7QUFDQSxZQUFHRCxTQUFTLGFBQVosRUFBMkI7QUFDM0IsYUFBS0MsT0FBTCxDQUFhQSxPQUFiLENBQXFCQyxVQUFyQixDQUFnQ04sU0FBaEMsR0FBNEMsQ0FBQyxRQUFELEVBQVcsVUFBWCxFQUF1QixVQUF2QixFQUFrQyxVQUFsQyxFQUE2QyxVQUE3QyxDQUE1QztBQUNBLGFBQUtPLEtBQUwsQ0FBVyxTQUFYLEVBQXNCLGNBQXRCO0FBQ0QsT0FQTzs7QUFRUjtBQUNBQyxhQVRRLHFCQVNFO0FBQ1IsWUFBSUosUUFBUSxLQUFLQyxPQUFMLENBQWFBLE9BQWIsQ0FBcUIsV0FBckIsQ0FBWjtBQUNBLFlBQUdELFNBQVMsYUFBWixFQUEyQjtBQUMzQjtBQUNBLGFBQUtDLE9BQUwsQ0FBYUEsT0FBYixDQUFxQkMsVUFBckIsQ0FBZ0NOLFNBQWhDLEdBQTRDLENBQUMsVUFBRCxFQUFhLFFBQWIsRUFBdUIsVUFBdkIsRUFBa0MsVUFBbEMsRUFBNkMsVUFBN0MsRUFBd0QsVUFBeEQsQ0FBNUM7QUFDQSxhQUFLTyxLQUFMLENBQVcsU0FBWCxFQUFzQixjQUF0QjtBQUNELE9BZk87OztBQWlCUjtBQUNBRSxlQWxCUSx1QkFrQkk7QUFDVixZQUFJTCxRQUFRLEtBQUtDLE9BQUwsQ0FBYUEsT0FBYixDQUFxQixXQUFyQixDQUFaO0FBQ0EsWUFBR0QsU0FBUyxpQkFBWixFQUErQjtBQUMvQixhQUFLQyxPQUFMLENBQWFLLFNBQWIsQ0FBdUIsRUFBQ0MsS0FBSSxXQUFMLEVBQXZCO0FBQ0E7QUFDQTtBQUNELE9BeEJPOztBQXlCUjtBQUNBQyxhQTFCUSxxQkEwQkU7QUFDTixZQUFJUixRQUFRLEtBQUtDLE9BQUwsQ0FBYUEsT0FBYixDQUFxQixXQUFyQixDQUFaO0FBQ0YsWUFBR0QsU0FBUyxlQUFaLEVBQTZCO0FBQzdCLGFBQUtDLE9BQUwsQ0FBYUEsT0FBYixDQUFxQkMsVUFBckIsQ0FBZ0NOLFNBQWhDLEdBQTRDLENBQUMsVUFBRCxFQUFhLFVBQWIsRUFBeUIsVUFBekIsRUFBb0MsUUFBcEMsRUFBNkMsVUFBN0MsQ0FBNUM7QUFDQSxhQUFLTyxLQUFMLENBQVcsU0FBWCxFQUFzQixnQkFBdEI7QUFDRCxPQS9CTzs7QUFnQ0o7QUFDSk0sWUFqQ1Esb0JBaUNDO0FBQ1AsWUFBSVQsUUFBUSxLQUFLQyxPQUFMLENBQWFBLE9BQWIsQ0FBcUIsV0FBckIsQ0FBWjtBQUNBLFlBQUdELFNBQVMsWUFBWixFQUEwQjtBQUMxQixhQUFLQyxPQUFMLENBQWFBLE9BQWIsQ0FBcUJDLFVBQXJCLENBQWdDTixTQUFoQyxHQUE0QyxDQUFDLFVBQUQsRUFBYSxVQUFiLEVBQXdCLFVBQXhCLEVBQW1DLFVBQW5DLEVBQThDLFFBQTlDLENBQTVDO0FBQ0EsYUFBS08sS0FBTCxDQUFXLFNBQVgsRUFBc0IsYUFBdEI7QUFDRDtBQXRDTyxLOztBQVZWOzs7Ozs2QkFrRFM7QUFDUCxXQUFLWixRQUFMLEdBQWdCLEtBQUtVLE9BQUwsQ0FBYUEsT0FBYixDQUFxQkMsVUFBckIsQ0FBZ0NYLFFBQWhEO0FBQ0EsV0FBS0ssU0FBTCxHQUFpQixLQUFLSyxPQUFMLENBQWFBLE9BQWIsQ0FBcUJDLFVBQXJCLENBQWdDTixTQUFqRDtBQUNBLFdBQUtjLE1BQUw7QUFDRDs7OztFQXZEOEJDLGVBQUtDLFM7O2tCQUFqQnZCLEciLCJmaWxlIjoibmF2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbi8vIOagoemqjOWwgeijhVxyXG4vLyBpbXBvcnQgY2hlY2sgZnJvbSAnLi4vbWl4aW5zL2NoZWNrJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXYgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgLy8gbWl4aW5zID0gW2NoZWNrXVxyXG4gIGRhdGEgPSB7XHJcbiAgICB1c2VySW5mbzoge30sXHJcbiAgICBndWFuZ0dhb05vZGU6IG51bGwsXHJcbiAgICBuYW1lOiAnJyxcclxuICAgIHBob25lOiAnJyxcclxuICAgIGlkOiAnJyxcclxuICAgIG5hdkFjdGlvbjogWydhY3Rpb24nLCAnbm9BY3Rpb24nLCAnbm9BY3Rpb24nLCdub0FjdGlvbicsJ25vQWN0aW9uJ11cclxuICB9O1xyXG4gIHByb3BzID0ge307XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOmmlumhtVxyXG4gICAgZ29JbmRleCgpIHtcclxuICAgICAgdmFyIHJvdXRlID0gdGhpcy4kcGFyZW50LiRwYXJlbnRbJ19fcm91dGVfXyddXHJcbiAgICAgIGlmKHJvdXRlID09ICdwYWdlcy9pbmRleCcpIHJldHVyblxyXG4gICAgICB0aGlzLiRwYXJlbnQuJHBhcmVudC5nbG9iYWxEYXRhLm5hdkFjdGlvbiA9IFsnYWN0aW9uJywgJ25vQWN0aW9uJywgJ25vQWN0aW9uJywnbm9BY3Rpb24nLCdub0FjdGlvbiddXHJcbiAgICAgIHRoaXMuJGVtaXQoJ2NoaWxkRm4nLCAnL3BhZ2VzL2luZGV4JylcclxuICAgIH0sXHJcbiAgICAvLyDliIbnsbtcclxuICAgIGdvQ2xhc3MoKSB7XHJcbiAgICAgIHZhciByb3V0ZSA9IHRoaXMuJHBhcmVudC4kcGFyZW50WydfX3JvdXRlX18nXVxyXG4gICAgICBpZihyb3V0ZSA9PSAncGFnZXMvY2xhc3MnKSByZXR1cm5cclxuICAgICAgLy8g6aG26YOo5a+86Iiq54q25oCB5Yid5aeL5YyWXHJcbiAgICAgIHRoaXMuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEubmF2QWN0aW9uID0gWydub0FjdGlvbicsICdhY3Rpb24nLCAnbm9BY3Rpb24nLCdub0FjdGlvbicsJ25vQWN0aW9uJywnbm9BY3Rpb24nXVxyXG4gICAgICB0aGlzLiRlbWl0KCdjaGlsZEZuJywgJy9wYWdlcy9jbGFzcycpXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5YWl6am7XHJcbiAgICBnb1NldHRsZWQoKSB7XHJcbiAgICAgIHZhciByb3V0ZSA9IHRoaXMuJHBhcmVudC4kcGFyZW50WydfX3JvdXRlX18nXVxyXG4gICAgICBpZihyb3V0ZSA9PSAncGFnZXMvc2V0dGxlZEluJykgcmV0dXJuXHJcbiAgICAgIHRoaXMuJHBhcmVudC4kbmF2aWdhdGUoe3VybDonc2V0dGxlZEluJ30pXHJcbiAgICAgIC8vIHRoaXMuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEubmF2QWN0aW9uID0gWydub0FjdGlvbicsICdub0FjdGlvbicsICdhY3Rpb24nLCdub0FjdGlvbicsJ25vQWN0aW9uJ11cclxuICAgICAgLy8gdGhpcy4kZW1pdCgnY2hpbGRGbicsICcvcGFnZXMvc2V0dGxlZEluJylcclxuICAgIH0sXHJcbiAgICAvLyDotK3nianovaZcclxuICAgIGdvQnlDYXIoKSB7XHJcbiAgICAgICAgdmFyIHJvdXRlID0gdGhpcy4kcGFyZW50LiRwYXJlbnRbJ19fcm91dGVfXyddXHJcbiAgICAgIGlmKHJvdXRlID09ICdwYWdlcy9zaG9wQ2FyJykgcmV0dXJuXHJcbiAgICAgIHRoaXMuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEubmF2QWN0aW9uID0gWydub0FjdGlvbicsICdub0FjdGlvbicsICdub0FjdGlvbicsJ2FjdGlvbicsJ25vQWN0aW9uJ11cclxuICAgICAgdGhpcy4kZW1pdCgnY2hpbGRGbicsICcvcGFnZXMvc2hvcENhcicpXHJcbiAgICB9LFxyXG4gICAgICAgIC8vIOaIkeeahFxyXG4gICAgZ29Vc2VyKCkge1xyXG4gICAgICB2YXIgcm91dGUgPSB0aGlzLiRwYXJlbnQuJHBhcmVudFsnX19yb3V0ZV9fJ11cclxuICAgICAgaWYocm91dGUgPT0gJ3BhZ2VzL3VzZXInKSByZXR1cm5cclxuICAgICAgdGhpcy4kcGFyZW50LiRwYXJlbnQuZ2xvYmFsRGF0YS5uYXZBY3Rpb24gPSBbJ25vQWN0aW9uJywgJ25vQWN0aW9uJywnbm9BY3Rpb24nLCdub0FjdGlvbicsJ2FjdGlvbiddXHJcbiAgICAgIHRoaXMuJGVtaXQoJ2NoaWxkRm4nLCAnL3BhZ2VzL3VzZXInKVxyXG4gICAgfSxcclxuICB9O1xyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMudXNlckluZm8gPSB0aGlzLiRwYXJlbnQuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvXHJcbiAgICB0aGlzLm5hdkFjdGlvbiA9IHRoaXMuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEubmF2QWN0aW9uXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgfTtcclxufVxyXG4iXX0=