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

//通过继承自wepy.page的类创建页面逻辑
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
      navigationBarTitleText: '搜索'
    }, _this.data = {
      val: ''
    }, _this.methods = {
      submitHanld: function submitHanld() {
        if (!this.val) {
          wx.showToast({
            title: '请输入商品名称',
            icon: 'none'
          });
        } else {
          wx.showLoading();
          if (timer) return;
          var timer = setTimeout(function () {
            wx.showToast({
              title: '暂无商品',
              icon: 'loading'
            });
            clearTimeout(timer);
          }, 1000);
        }
      },
      inputVal: function inputVal(e) {
        this.val = e.detail.value;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  //可用于页面模板绑定的数据


  //事件处理函数(集中保存在methods对象中)


  _createClass(Index, [{
    key: 'onLoad',


    //页面的生命周期函数
    value: function onLoad() {
      console.log('onLoad');
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/search'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidmFsIiwibWV0aG9kcyIsInN1Ym1pdEhhbmxkIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJzaG93TG9hZGluZyIsInRpbWVyIiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsImlucHV0VmFsIiwiZSIsImRldGFpbCIsInZhbHVlIiwiY29uc29sZSIsImxvZyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxXQUFLO0FBREEsSyxRQUtQQyxPLEdBQVU7QUFDUkMsaUJBRFEseUJBQ007QUFDWixZQUFJLENBQUMsS0FBS0YsR0FBVixFQUFlO0FBQ2JHLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxTQURJO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlELFNBTEQsTUFLTztBQUNMSCxhQUFHSSxXQUFIO0FBQ0EsY0FBSUMsS0FBSixFQUFXO0FBQ1gsY0FBSUEsUUFBUUMsV0FBVyxZQUFNO0FBQzNCTixlQUFHQyxTQUFILENBQWE7QUFDWEMscUJBQU8sTUFESTtBQUVYQyxvQkFBTTtBQUZLLGFBQWI7QUFJQUkseUJBQWFGLEtBQWI7QUFDRCxXQU5XLEVBTVQsSUFOUyxDQUFaO0FBT0Q7QUFDRixPQWxCTztBQW1CUkcsY0FuQlEsb0JBbUJDQyxDQW5CRCxFQW1CSTtBQUNWLGFBQUtaLEdBQUwsR0FBV1ksRUFBRUMsTUFBRixDQUFTQyxLQUFwQjtBQUNEO0FBckJPLEs7O0FBTlY7OztBQUtBOzs7Ozs7O0FBeUJBOzZCQUNTO0FBQ1BDLGNBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0Q7Ozs7RUFyQ2dDQyxlQUFLQyxJOztrQkFBbkJ0QixLIiwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbi8v6YCa6L+H57un5om/6Ieqd2VweS5wYWdl55qE57G75Yib5bu66aG16Z2i6YC76L6RXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pCc57SiJ1xyXG4gIH07XHJcbiAgLy/lj6/nlKjkuo7pobXpnaLmqKHmnb/nu5HlrprnmoTmlbDmja5cclxuICBkYXRhID0ge1xyXG4gICAgdmFsOiAnJ1xyXG4gIH07XHJcblxyXG4gIC8v5LqL5Lu25aSE55CG5Ye95pWwKOmbhuS4reS/neWtmOWcqG1ldGhvZHPlr7nosaHkuK0pXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHN1Ym1pdEhhbmxkKCkge1xyXG4gICAgICBpZiAoIXRoaXMudmFsKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5ZWG5ZOB5ZCN56ewJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKCk7XHJcbiAgICAgICAgaWYgKHRpbWVyKSByZXR1cm47XHJcbiAgICAgICAgdmFyIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+aaguaXoOWVhuWTgScsXHJcbiAgICAgICAgICAgIGljb246ICdsb2FkaW5nJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5wdXRWYWwoZSkge1xyXG4gICAgICB0aGlzLnZhbCA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8v6aG16Z2i55qE55Sf5ZG95ZGo5pyf5Ye95pWwXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgY29uc29sZS5sb2coJ29uTG9hZCcpO1xyXG4gIH1cclxufVxyXG4iXX0=