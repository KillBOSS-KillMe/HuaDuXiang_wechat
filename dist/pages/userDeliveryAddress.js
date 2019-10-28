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
      navigationBarTitleText: '收货地址'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      userName: '哈哈',
      userPhone: '14520325420',
      detailedAddress: '北京市昌平区'
    }, _this.computed = {}, _this.events = {}, _this.methods = {
      orderMeeting: function orderMeeting() {
        //提交input信息到后台
        var userName = this.userName;
        var userPhone = this.userPhone;
        var detailedAddress = this.detailedAddress;
        // this.$navigate({ url: `newdeliveryAddress?id=${id}` });
        this.$navigate({ url: 'newdeliveryAddress' });
        // if (userName == '' || userPhone == '' || userRegion == '' || detailedAddress == '') {
        // app.showModal('请完善信息');
        // return;
        // }
        // 检测手机号是否填写
        // if (app.validate(userPhone, 'emoji')) {
        // app.showModal('手机号不能包含特殊字符');
        // return;
        // }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/userDeliveryAddress'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJEZWxpdmVyeUFkZHJlc3MuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJ1c2VyTmFtZSIsInVzZXJQaG9uZSIsImRldGFpbGVkQWRkcmVzcyIsImNvbXB1dGVkIiwiZXZlbnRzIiwibWV0aG9kcyIsIm9yZGVyTWVldGluZyIsIiRuYXZpZ2F0ZSIsInVybCIsIm9wdGlvbnMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLElBREw7QUFFTEMsaUJBQVcsYUFGTjtBQUdMQyx1QkFBaUI7QUFIWixLLFFBTVBDLFEsR0FBVyxFLFFBRVhDLE0sR0FBUyxFLFFBSVRDLE8sR0FBVTtBQUNSQyxvQkFBYyx3QkFBVztBQUN2QjtBQUNBLFlBQUlOLFdBQVcsS0FBS0EsUUFBcEI7QUFDQSxZQUFJQyxZQUFZLEtBQUtBLFNBQXJCO0FBQ0EsWUFBSUMsa0JBQWtCLEtBQUtBLGVBQTNCO0FBQ0E7QUFDQSxhQUFLSyxTQUFMLENBQWUsRUFBRUMseUJBQUYsRUFBZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEO0FBakJPLEs7Ozs7OzJCQUZIQyxPLEVBQVMsQ0FBRTs7OztFQWxCZUMsZUFBS0MsSTs7a0JBQW5CakIsSyIsImZpbGUiOiJ1c2VyRGVsaXZlcnlBZGRyZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlLbotKflnLDlnYAnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgdXNlck5hbWU6ICflk4jlk4gnLFxyXG4gICAgdXNlclBob25lOiAnMTQ1MjAzMjU0MjAnLFxyXG4gICAgZGV0YWlsZWRBZGRyZXNzOiAn5YyX5Lqs5biC5piM5bmz5Yy6J1xyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvbkxvYWQob3B0aW9ucykge31cclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIG9yZGVyTWVldGluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgIC8v5o+Q5LqkaW5wdXTkv6Hmga/liLDlkI7lj7BcclxuICAgICAgdmFyIHVzZXJOYW1lID0gdGhpcy51c2VyTmFtZTtcclxuICAgICAgdmFyIHVzZXJQaG9uZSA9IHRoaXMudXNlclBob25lO1xyXG4gICAgICB2YXIgZGV0YWlsZWRBZGRyZXNzID0gdGhpcy5kZXRhaWxlZEFkZHJlc3M7XHJcbiAgICAgIC8vIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgbmV3ZGVsaXZlcnlBZGRyZXNzP2lkPSR7aWR9YCB9KTtcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBuZXdkZWxpdmVyeUFkZHJlc3NgIH0pO1xyXG4gICAgICAvLyBpZiAodXNlck5hbWUgPT0gJycgfHwgdXNlclBob25lID09ICcnIHx8IHVzZXJSZWdpb24gPT0gJycgfHwgZGV0YWlsZWRBZGRyZXNzID09ICcnKSB7XHJcbiAgICAgIC8vIGFwcC5zaG93TW9kYWwoJ+ivt+WujOWWhOS/oeaBrycpO1xyXG4gICAgICAvLyByZXR1cm47XHJcbiAgICAgIC8vIH1cclxuICAgICAgLy8g5qOA5rWL5omL5py65Y+35piv5ZCm5aGr5YaZXHJcbiAgICAgIC8vIGlmIChhcHAudmFsaWRhdGUodXNlclBob25lLCAnZW1vamknKSkge1xyXG4gICAgICAvLyBhcHAuc2hvd01vZGFsKCfmiYvmnLrlj7fkuI3og73ljIXlkKvnibnmrorlrZfnrKYnKTtcclxuICAgICAgLy8gcmV0dXJuO1xyXG4gICAgICAvLyB9XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iXX0=