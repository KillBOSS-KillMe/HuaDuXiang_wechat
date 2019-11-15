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
          this.$navigate({ url: 'goodsList?keyword=' + this.val });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidmFsIiwibWV0aG9kcyIsInN1Ym1pdEhhbmxkIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCIkbmF2aWdhdGUiLCJ1cmwiLCJpbnB1dFZhbCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBO0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU87QUFDTEMsV0FBSztBQURBLEssUUFLUEMsTyxHQUFVO0FBQ1JDLGlCQURRLHlCQUNNO0FBQ1osWUFBSSxDQUFDLEtBQUtGLEdBQVYsRUFBZTtBQUNiRyxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sU0FESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJRCxTQUxELE1BS087QUFDSixlQUFLQyxTQUFMLENBQWUsRUFBRUMsNEJBQTBCLEtBQUtSLEdBQWpDLEVBQWY7QUFDRjtBQUNGLE9BVk87QUFXUlMsY0FYUSxvQkFXQ0MsQ0FYRCxFQVdJO0FBQ1YsYUFBS1YsR0FBTCxHQUFXVSxFQUFFQyxNQUFGLENBQVNDLEtBQXBCO0FBQ0Q7QUFiTyxLOztBQU5WOzs7QUFLQTs7Ozs7OztBQWlCQTs2QkFDUztBQUNQQyxjQUFRQyxHQUFSLENBQVksUUFBWjtBQUNEOzs7O0VBN0JnQ0MsZUFBS0MsSTs7a0JBQW5CcEIsSyIsImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG4vL+mAmui/h+e7p+aJv+iHqndlcHkucGFnZeeahOexu+WIm+W7uumhtemdoumAu+i+kVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aQnOe0oidcclxuICB9O1xyXG4gIC8v5Y+v55So5LqO6aG16Z2i5qih5p2/57uR5a6a55qE5pWw5o2uXHJcbiAgZGF0YSA9IHtcclxuICAgIHZhbDogJydcclxuICB9O1xyXG5cclxuICAvL+S6i+S7tuWkhOeQhuWHveaVsCjpm4bkuK3kv53lrZjlnKhtZXRob2Rz5a+56LGh5LitKVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBzdWJtaXRIYW5sZCgpIHtcclxuICAgICAgaWYgKCF0aGlzLnZhbCkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeWVhuWTgeWQjeensCcsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBnb29kc0xpc3Q/a2V5d29yZD0ke3RoaXMudmFsfWAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpbnB1dFZhbChlKSB7XHJcbiAgICAgIHRoaXMudmFsID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy/pobXpnaLnmoTnlJ/lkb3lkajmnJ/lh73mlbBcclxuICBvbkxvYWQoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnb25Mb2FkJyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==