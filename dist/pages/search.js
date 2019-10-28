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
      navigationBarTitleText: '搜索',
      navigationBarBackgroundColor: 'white'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwiZGF0YSIsInZhbCIsIm1ldGhvZHMiLCJzdWJtaXRIYW5sZCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwic2hvd0xvYWRpbmciLCJ0aW1lciIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJpbnB1dFZhbCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBO0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsSUFEakI7QUFFUEMsb0NBQThCO0FBRnZCLEssUUFLVEMsSSxHQUFPO0FBQ0xDLFdBQUs7QUFEQSxLLFFBS1BDLE8sR0FBVTtBQUNSQyxpQkFEUSx5QkFDTTtBQUNaLFlBQUksQ0FBQyxLQUFLRixHQUFWLEVBQWU7QUFDYkcsYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPLFNBREk7QUFFWEMsa0JBQU07QUFGSyxXQUFiO0FBSUQsU0FMRCxNQUtPO0FBQ0xILGFBQUdJLFdBQUg7QUFDQSxjQUFJQyxLQUFKLEVBQVc7QUFDWCxjQUFJQSxRQUFRQyxXQUFXLFlBQU07QUFDM0JOLGVBQUdDLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxNQURJO0FBRVhDLG9CQUFNO0FBRkssYUFBYjtBQUlBSSx5QkFBYUYsS0FBYjtBQUNELFdBTlcsRUFNVCxJQU5TLENBQVo7QUFPRDtBQUNGLE9BbEJPO0FBbUJSRyxjQW5CUSxvQkFtQkNDLENBbkJELEVBbUJJO0FBQ1YsYUFBS1osR0FBTCxHQUFXWSxFQUFFQyxNQUFGLENBQVNDLEtBQXBCO0FBQ0Q7QUFyQk8sSzs7QUFOVjs7O0FBS0E7Ozs7Ozs7QUF5QkE7NkJBQ1M7QUFDUEMsY0FBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDs7OztFQXRDZ0NDLGVBQUtDLEk7O2tCQUFuQnZCLEsiLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuLy/pgJrov4fnu6fmib/oh6p3ZXB5LnBhZ2XnmoTnsbvliJvlu7rpobXpnaLpgLvovpFcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmkJzntKInLFxyXG4gICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJ3doaXRlJ1xyXG4gIH07XHJcbiAgLy/lj6/nlKjkuo7pobXpnaLmqKHmnb/nu5HlrprnmoTmlbDmja5cclxuICBkYXRhID0ge1xyXG4gICAgdmFsOiAnJ1xyXG4gIH07XHJcblxyXG4gIC8v5LqL5Lu25aSE55CG5Ye95pWwKOmbhuS4reS/neWtmOWcqG1ldGhvZHPlr7nosaHkuK0pXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHN1Ym1pdEhhbmxkKCkge1xyXG4gICAgICBpZiAoIXRoaXMudmFsKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5ZWG5ZOB5ZCN56ewJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKCk7XHJcbiAgICAgICAgaWYgKHRpbWVyKSByZXR1cm47XHJcbiAgICAgICAgdmFyIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+aaguaXoOWVhuWTgScsXHJcbiAgICAgICAgICAgIGljb246ICdsb2FkaW5nJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5wdXRWYWwoZSkge1xyXG4gICAgICB0aGlzLnZhbCA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8v6aG16Z2i55qE55Sf5ZG95ZGo5pyf5Ye95pWwXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgY29uc29sZS5sb2coJ29uTG9hZCcpO1xyXG4gIH1cclxufVxyXG4iXX0=