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

var Share = function (_wepy$page) {
  _inherits(Share, _wepy$page);

  function Share() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Share);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Share.__proto__ || Object.getPrototypeOf(Share)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.data = {
      show: true
    }, _this.props = {
      proupData: {
        //父组件传过来的数据
        type: Object,
        default: []
      }
    }, _this.methods = {
      // 页面跳转
      navigateUrl: function navigateUrl(e) {
        var url = e.currentTarget.dataset.url;
        url && wx.navigateTo({
          url: url
        });
      },
      // 关闭弹窗
      hideShare: function hideShare(e) {
        this.show = false;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Share, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log('this.proupData', this.proupData);
      this.$emit('getProupData', this.proupData);
    }
  }]);

  return Share;
}(_wepy2.default.page);

exports.default = Share;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pZGRsZVBvcHVwLmpzIl0sIm5hbWVzIjpbIlNoYXJlIiwiY29uZmlnIiwiZGF0YSIsInNob3ciLCJwcm9wcyIsInByb3VwRGF0YSIsInR5cGUiLCJPYmplY3QiLCJkZWZhdWx0IiwibWV0aG9kcyIsIm5hdmlnYXRlVXJsIiwiZSIsInVybCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwid3giLCJuYXZpZ2F0ZVRvIiwiaGlkZVNoYXJlIiwiY29uc29sZSIsImxvZyIsIiRlbWl0Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTLEUsUUFDVEMsSSxHQUFPO0FBQ0xDLFlBQU07QUFERCxLLFFBSVBDLEssR0FBUTtBQUNOQyxpQkFBVztBQUNUO0FBQ0FDLGNBQU1DLE1BRkc7QUFHVEMsaUJBQVM7QUFIQTtBQURMLEssUUFZUkMsTyxHQUFVO0FBQ1I7QUFDQUMsbUJBQWEscUJBQVNDLENBQVQsRUFBWTtBQUN2QixZQUFJQyxNQUFNRCxFQUFFRSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkYsR0FBbEM7QUFDQUEsZUFDRUcsR0FBR0MsVUFBSCxDQUFjO0FBQ1pKLGVBQUtBO0FBRE8sU0FBZCxDQURGO0FBSUQsT0FSTztBQVNSO0FBQ0FLLGlCQUFXLG1CQUFTTixDQUFULEVBQVk7QUFDckIsYUFBS1IsSUFBTCxHQUFZLEtBQVo7QUFDRDtBQVpPLEs7Ozs7OzZCQUxEO0FBQ0xlLGNBQVFDLEdBQVIsQ0FBWSxnQkFBWixFQUE2QixLQUFLZCxTQUFsQztBQUNGLFdBQUtlLEtBQUwsQ0FBVyxjQUFYLEVBQTJCLEtBQUtmLFNBQWhDO0FBQ0Q7Ozs7RUFoQmdDZ0IsZUFBS0MsSTs7a0JBQW5CdEIsSyIsImZpbGUiOiJtaWRkbGVQb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcmUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHt9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICBzaG93OiB0cnVlXHJcbiAgfTtcclxuXHJcbiAgcHJvcHMgPSB7XHJcbiAgICBwcm91cERhdGE6IHtcclxuICAgICAgLy/niLbnu4Tku7bkvKDov4fmnaXnmoTmlbDmja5cclxuICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICBkZWZhdWx0OiBbXVxyXG4gICAgfVxyXG4gIH07XHJcbiAgb25Mb2FkKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygndGhpcy5wcm91cERhdGEnLHRoaXMucHJvdXBEYXRhKVxyXG4gICAgdGhpcy4kZW1pdCgnZ2V0UHJvdXBEYXRhJywgdGhpcy5wcm91cERhdGEpO1xyXG4gIH1cclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOmhtemdoui3s+i9rFxyXG4gICAgbmF2aWdhdGVVcmw6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgdmFyIHVybCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybDtcclxuICAgICAgdXJsICYmXHJcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICB1cmw6IHVybFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vIOWFs+mXreW8ueeql1xyXG4gICAgaGlkZVNoYXJlOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIl19