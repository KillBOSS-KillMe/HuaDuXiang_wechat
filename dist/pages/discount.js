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
      navigationBarTitleText: '秒赚钱'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      requestImgUrl: '',
      topImg: '', // 顶部商品图
      goods_list: [],
      hasmore: false, // 是否有下一页
      curpage: 1 //当前页数
    }, _this.computed = {}, _this.methods = {
      navShopDetails: function navShopDetails(goods_id) {
        this.$navigate('/pages/shopDetails?goods_id=' + goods_id);
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var _this2 = this;

      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      (0, _ajax.ajax)({
        url: api.memberFx
      }).then(function (res) {
        _this2.topImg = res.datas.img_area;
      });

      this.requestIndexGoodsList();
    }
    // 首页—普通商品列表接口

  }, {
    key: 'requestIndexGoodsList',
    value: function requestIndexGoodsList() {
      var _this3 = this;

      (0, _ajax.ajax)({
        url: api.indexGoodsList,
        data: {
          page: 3,
          curpage: this.curpage,
          is_fx: 1 // 默认值为1，表示获取分销商品的列表
        }
      }).then(function (res) {
        if (res.code == 200) {
          var list = res.datas.goods_list || [];
          _this3.goods_list = _this3.goods_list.concat(list);
          _this3.hasmore = res.hasmore;
          _this3.$apply();
        }
      });
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.hasmore) {
        this.curpage++;
        this.requestIndexGoodsList();
      }
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/discount'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc2NvdW50LmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInJlcXVlc3RJbWdVcmwiLCJ0b3BJbWciLCJnb29kc19saXN0IiwiaGFzbW9yZSIsImN1cnBhZ2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJuYXZTaG9wRGV0YWlscyIsImdvb2RzX2lkIiwiJG5hdmlnYXRlIiwiZXZlbnRzIiwib3B0aW9ucyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidXJsIiwibWVtYmVyRngiLCJ0aGVuIiwicmVzIiwiZGF0YXMiLCJpbWdfYXJlYSIsInJlcXVlc3RJbmRleEdvb2RzTGlzdCIsImluZGV4R29vZHNMaXN0IiwicGFnZSIsImlzX2Z4IiwiY29kZSIsImxpc3QiLCJjb25jYXQiLCIkYXBwbHkiLCJ3ZXB5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBR3FCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMscUJBQWUsRUFEVjtBQUVMQyxjQUFRLEVBRkgsRUFFTztBQUNaQyxrQkFBWSxFQUhQO0FBSUxDLGVBQVMsS0FKSixFQUlXO0FBQ2hCQyxlQUFTLENBTEosQ0FLTztBQUxQLEssUUFRUEMsUSxHQUFXLEUsUUFxQ1hDLE8sR0FBVTtBQUNSQyxvQkFEUSwwQkFDT0MsUUFEUCxFQUNnQjtBQUN0QixhQUFLQyxTQUFMLGtDQUE4Q0QsUUFBOUM7QUFDRDtBQUhPLEssUUFNVkUsTSxHQUFTLEU7Ozs7OzJCQTFDRkMsTyxFQUFTO0FBQUE7O0FBQ2QsV0FBS1gsYUFBTCxHQUFxQixLQUFLWSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JiLGFBQTdDO0FBQ0Esc0JBQUs7QUFDSGMsYUFBS3RCLElBQUl1QjtBQUROLE9BQUwsRUFFR0MsSUFGSCxDQUVRLGVBQU87QUFDYixlQUFLZixNQUFMLEdBQWNnQixJQUFJQyxLQUFKLENBQVVDLFFBQXhCO0FBQ0QsT0FKRDs7QUFNQSxXQUFLQyxxQkFBTDtBQUNEO0FBQ0Q7Ozs7NENBQ3dCO0FBQUE7O0FBQ3RCLHNCQUFLO0FBQ0hOLGFBQUt0QixJQUFJNkIsY0FETjtBQUVIdEIsY0FBTTtBQUNKdUIsZ0JBQU0sQ0FERjtBQUVKbEIsbUJBQVMsS0FBS0EsT0FGVjtBQUdKbUIsaUJBQU8sQ0FISCxDQUdLO0FBSEw7QUFGSCxPQUFMLEVBT0dQLElBUEgsQ0FPUSxlQUFPO0FBQ2IsWUFBSUMsSUFBSU8sSUFBSixJQUFZLEdBQWhCLEVBQXFCO0FBQ25CLGNBQUlDLE9BQU9SLElBQUlDLEtBQUosQ0FBVWhCLFVBQVYsSUFBd0IsRUFBbkM7QUFDQSxpQkFBS0EsVUFBTCxHQUFrQixPQUFLQSxVQUFMLENBQWdCd0IsTUFBaEIsQ0FBdUJELElBQXZCLENBQWxCO0FBQ0EsaUJBQUt0QixPQUFMLEdBQWVjLElBQUlkLE9BQW5CO0FBQ0EsaUJBQUt3QixNQUFMO0FBQ0Q7QUFDRixPQWREO0FBZUQ7OztvQ0FDZ0I7QUFDZixVQUFHLEtBQUt4QixPQUFSLEVBQWlCO0FBQ2YsYUFBS0MsT0FBTDtBQUNBLGFBQUtnQixxQkFBTDtBQUNEO0FBQ0Y7Ozs2QkFDUSxDQUNSOzs7O0VBcERnQ1EsZUFBS04sSTs7a0JBQW5CNUIsSyIsImZpbGUiOiJkaXNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+enkui1mumSsSdcclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIHRvcEltZzogJycsIC8vIOmhtumDqOWVhuWTgeWbvlxyXG4gICAgZ29vZHNfbGlzdDogW10sXHJcbiAgICBoYXNtb3JlOiBmYWxzZSwgLy8g5piv5ZCm5pyJ5LiL5LiA6aG1XHJcbiAgICBjdXJwYWdlOiAxLCAvL+W9k+WJjemhteaVsFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkubWVtYmVyRngsXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMudG9wSW1nID0gcmVzLmRhdGFzLmltZ19hcmVhXHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMucmVxdWVzdEluZGV4R29vZHNMaXN0KClcclxuICB9XHJcbiAgLy8g6aaW6aG14oCU5pmu6YCa5ZWG5ZOB5YiX6KGo5o6l5Y+jXHJcbiAgcmVxdWVzdEluZGV4R29vZHNMaXN0KCkge1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmluZGV4R29vZHNMaXN0LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcGFnZTogMyxcclxuICAgICAgICBjdXJwYWdlOiB0aGlzLmN1cnBhZ2UsXHJcbiAgICAgICAgaXNfZng6IDEgLy8g6buY6K6k5YC85Li6Me+8jOihqOekuuiOt+WPluWIhumUgOWVhuWTgeeahOWIl+ihqFxyXG4gICAgICB9LFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdmFyIGxpc3QgPSByZXMuZGF0YXMuZ29vZHNfbGlzdCB8fCBbXVxyXG4gICAgICAgIHRoaXMuZ29vZHNfbGlzdCA9IHRoaXMuZ29vZHNfbGlzdC5jb25jYXQobGlzdClcclxuICAgICAgICB0aGlzLmhhc21vcmUgPSByZXMuaGFzbW9yZVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgIGlmKHRoaXMuaGFzbW9yZSkge1xyXG4gICAgICB0aGlzLmN1cnBhZ2UgKysgXHJcbiAgICAgIHRoaXMucmVxdWVzdEluZGV4R29vZHNMaXN0KClcclxuICAgIH1cclxuICB9XHJcbiAgb25TaG93KCkge1xyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgbmF2U2hvcERldGFpbHMoZ29vZHNfaWQpe1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZShgL3BhZ2VzL3Nob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YClcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxufVxyXG4iXX0=