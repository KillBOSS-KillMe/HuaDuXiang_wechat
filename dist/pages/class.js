'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _nav = require('./../components/nav.js');

var _nav2 = _interopRequireDefault(_nav);

var _ajax = require('./../ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 底部导航
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
      navigationBarTitleText: '分类'
    }, _this.$repeat = {}, _this.$props = { "nav": { "class": "nav", "xmlns:v-on": "" } }, _this.$events = { "nav": { "v-on:childFn": "goPage" } }, _this.components = {
      nav: _nav2.default
    }, _this.mixins = [], _this.data = {
      leftNav: 0,
      oneList: [],
      twoList: []
    }, _this.computed = {}, _this.methods = {
      // 切换一级分类
      changeLeftNav: function changeLeftNav(idx) {
        if (idx == this.leftNav) return;
        this.leftNav = idx;
        this.setList();
      },
      navGoodsList: function navGoodsList(gc_id) {
        this.$navigate({ url: 'goodsList?gc_id=' + gc_id });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      // 一级分类
      (0, _ajax.ajax)({
        url: api.oneGoodsClass
      }).then(function (res) {
        _this2.oneList = res.datas || [];
        _this2.setList();
        _this2.$apply();
      });
    }
    // 处理二三级分类数据

  }, {
    key: 'setList',
    value: function setList(idx) {
      this.twoList = this.oneList[this.leftNav].two;
      this.twoList.forEach(function (item) {
        if (Object.prototype.toString.call(item.three) == '[object Array]') {
          item.three.forEach(function (ele) {
            ele.new_name = ele.gc_name.toString().slice(0, 4);
          });
        }
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/class'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJuYXYiLCJtaXhpbnMiLCJkYXRhIiwibGVmdE5hdiIsIm9uZUxpc3QiLCJ0d29MaXN0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiY2hhbmdlTGVmdE5hdiIsImlkeCIsInNldExpc3QiLCJuYXZHb29kc0xpc3QiLCJnY19pZCIsIiRuYXZpZ2F0ZSIsInVybCIsImV2ZW50cyIsIm9uZUdvb2RzQ2xhc3MiLCJ0aGVuIiwicmVzIiwiZGF0YXMiLCIkYXBwbHkiLCJ0d28iLCJmb3JFYWNoIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiaXRlbSIsInRocmVlIiwiZWxlIiwibmV3X25hbWUiLCJnY19uYW1lIiwic2xpY2UiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBRnFDO0FBQ3JDLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUdxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsT0FBTSxFQUFDLFNBQVEsS0FBVCxFQUFlLGNBQWEsRUFBNUIsRUFBUCxFLFFBQ1RDLE8sR0FBVSxFQUFDLE9BQU0sRUFBQyxnQkFBZSxRQUFoQixFQUFQLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLFdBQUtBO0FBREssSyxRQUlaQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsZUFBUyxDQURKO0FBRUxDLGVBQVMsRUFGSjtBQUdMQyxlQUFTO0FBSEosSyxRQU1QQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDUjtBQUNBQyxtQkFGUSx5QkFFTUMsR0FGTixFQUVXO0FBQ2pCLFlBQUdBLE9BQU8sS0FBS04sT0FBZixFQUF3QjtBQUN4QixhQUFLQSxPQUFMLEdBQWVNLEdBQWY7QUFDQSxhQUFLQyxPQUFMO0FBQ0QsT0FOTztBQU9SQyxrQkFQUSx3QkFPS0MsS0FQTCxFQU9ZO0FBQ2xCLGFBQUtDLFNBQUwsQ0FBZSxFQUFDQywwQkFBd0JGLEtBQXpCLEVBQWY7QUFDRDtBQVRPLEssUUFZVkcsTSxHQUFTLEU7Ozs7OzZCQUVBLENBQUU7Ozs2QkFDRjtBQUFBOztBQUNQO0FBQ0Esc0JBQUs7QUFDSEQsYUFBS3ZCLElBQUl5QjtBQUROLE9BQUwsRUFFR0MsSUFGSCxDQUVRLGVBQU87QUFDYixlQUFLYixPQUFMLEdBQWVjLElBQUlDLEtBQUosSUFBYSxFQUE1QjtBQUNBLGVBQUtULE9BQUw7QUFDQSxlQUFLVSxNQUFMO0FBQ0QsT0FORDtBQU9EO0FBQ0Q7Ozs7NEJBQ1FYLEcsRUFBSTtBQUNWLFdBQUtKLE9BQUwsR0FBZSxLQUFLRCxPQUFMLENBQWEsS0FBS0QsT0FBbEIsRUFBMkJrQixHQUExQztBQUNBLFdBQUtoQixPQUFMLENBQWFpQixPQUFiLENBQXFCLGdCQUFRO0FBQzNCLFlBQUlDLE9BQU9DLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCQyxJQUExQixDQUErQkMsS0FBS0MsS0FBcEMsS0FBOEMsZ0JBQWxELEVBQW9FO0FBQ2xFRCxlQUFLQyxLQUFMLENBQVdOLE9BQVgsQ0FBbUIsZUFBTztBQUN4Qk8sZ0JBQUlDLFFBQUosR0FBZUQsSUFBSUUsT0FBSixDQUFZTixRQUFaLEdBQXVCTyxLQUF2QixDQUE2QixDQUE3QixFQUFnQyxDQUFoQyxDQUFmO0FBQ0QsV0FGRDtBQUdEO0FBQ0YsT0FORDtBQU9EOzs7O0VBeERnQ0MsZUFBS0MsSTs7a0JBQW5CekMsSyIsImZpbGUiOiJjbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG5hdiBmcm9tICcuLi9jb21wb25lbnRzL25hdic7IC8vIOW6lemDqOWvvOiIqlxyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5YiG57G7J1xyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIm5hdlwiOntcImNsYXNzXCI6XCJuYXZcIixcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJuYXZcIjp7XCJ2LW9uOmNoaWxkRm5cIjpcImdvUGFnZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgbmF2OiBuYXZcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGxlZnROYXY6IDAsXHJcbiAgICBvbmVMaXN0OiBbXSxcclxuICAgIHR3b0xpc3Q6IFtdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOWIh+aNouS4gOe6p+WIhuexu1xyXG4gICAgY2hhbmdlTGVmdE5hdihpZHgpIHtcclxuICAgICAgaWYoaWR4ID09IHRoaXMubGVmdE5hdikgcmV0dXJuXHJcbiAgICAgIHRoaXMubGVmdE5hdiA9IGlkeFxyXG4gICAgICB0aGlzLnNldExpc3QoKVxyXG4gICAgfSxcclxuICAgIG5hdkdvb2RzTGlzdChnY19pZCkge1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7dXJsOiBgZ29vZHNMaXN0P2djX2lkPSR7Z2NfaWR9YH0pXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG9uTG9hZCgpIHt9XHJcbiAgb25TaG93KCkge1xyXG4gICAgLy8g5LiA57qn5YiG57G7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkub25lR29vZHNDbGFzcyxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5vbmVMaXN0ID0gcmVzLmRhdGFzIHx8IFtdXHJcbiAgICAgIHRoaXMuc2V0TGlzdCgpXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIC8vIOWkhOeQhuS6jOS4iee6p+WIhuexu+aVsOaNrlxyXG4gIHNldExpc3QoaWR4KXtcclxuICAgIHRoaXMudHdvTGlzdCA9IHRoaXMub25lTGlzdFt0aGlzLmxlZnROYXZdLnR3b1xyXG4gICAgdGhpcy50d29MaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIGlmKCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlbS50aHJlZSkgPT0gJ1tvYmplY3QgQXJyYXldJykge1xyXG4gICAgICAgIGl0ZW0udGhyZWUuZm9yRWFjaChlbGUgPT4ge1xyXG4gICAgICAgICAgZWxlLm5ld19uYW1lID0gZWxlLmdjX25hbWUudG9TdHJpbmcoKS5zbGljZSgwLCA0KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==