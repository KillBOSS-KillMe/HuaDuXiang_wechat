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
      navGoodsDetails: function navGoodsDetails(goods_id, sale_type) {
        // navigate
        if (sale_type == 'rushsales') {
          this.$redirect('/pages/seckillShopDetails?goods_id=' + goods_id);
        } else {
          this.$redirect('/pages/shopDetails?goods_id=' + goods_id);
        }
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
        type: 'get',
        data: {
          page: 10,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc2NvdW50LmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInJlcXVlc3RJbWdVcmwiLCJ0b3BJbWciLCJnb29kc19saXN0IiwiaGFzbW9yZSIsImN1cnBhZ2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJuYXZHb29kc0RldGFpbHMiLCJnb29kc19pZCIsInNhbGVfdHlwZSIsIiRyZWRpcmVjdCIsImV2ZW50cyIsIm9wdGlvbnMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVybCIsIm1lbWJlckZ4IiwidGhlbiIsInJlcyIsImRhdGFzIiwiaW1nX2FyZWEiLCJyZXF1ZXN0SW5kZXhHb29kc0xpc3QiLCJpbmRleEdvb2RzTGlzdCIsInR5cGUiLCJwYWdlIiwiaXNfZngiLCJjb2RlIiwibGlzdCIsImNvbmNhdCIsIiRhcHBseSIsIndlcHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFHcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxxQkFBZSxFQURWO0FBRUxDLGNBQVEsRUFGSCxFQUVPO0FBQ1pDLGtCQUFZLEVBSFA7QUFJTEMsZUFBUyxLQUpKLEVBSVc7QUFDaEJDLGVBQVMsQ0FMSixDQUtPO0FBTFAsSyxRQVFQQyxRLEdBQVcsRSxRQXNDWEMsTyxHQUFVO0FBQ1JDLHFCQURRLDJCQUNRQyxRQURSLEVBQ2tCQyxTQURsQixFQUM2QjtBQUNuQztBQUNBLFlBQUdBLGFBQWEsV0FBaEIsRUFBNkI7QUFDM0IsZUFBS0MsU0FBTCx5Q0FBcURGLFFBQXJEO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZUFBS0UsU0FBTCxrQ0FBOENGLFFBQTlDO0FBQ0Q7QUFDRjtBQVJPLEssUUFXVkcsTSxHQUFTLEU7Ozs7OzJCQWhERkMsTyxFQUFTO0FBQUE7O0FBQ2QsV0FBS1osYUFBTCxHQUFxQixLQUFLYSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JkLGFBQTdDO0FBQ0Esc0JBQUs7QUFDSGUsYUFBS3ZCLElBQUl3QjtBQUROLE9BQUwsRUFFR0MsSUFGSCxDQUVRLGVBQU87QUFDYixlQUFLaEIsTUFBTCxHQUFjaUIsSUFBSUMsS0FBSixDQUFVQyxRQUF4QjtBQUNELE9BSkQ7O0FBTUEsV0FBS0MscUJBQUw7QUFDRDtBQUNEOzs7OzRDQUN3QjtBQUFBOztBQUN0QixzQkFBSztBQUNITixhQUFLdkIsSUFBSThCLGNBRE47QUFFSEMsY0FBTSxLQUZIO0FBR0h4QixjQUFNO0FBQ0p5QixnQkFBTSxFQURGO0FBRUpwQixtQkFBUyxLQUFLQSxPQUZWO0FBR0pxQixpQkFBTyxDQUhILENBR0s7QUFITDtBQUhILE9BQUwsRUFRR1IsSUFSSCxDQVFRLGVBQU87QUFDYixZQUFJQyxJQUFJUSxJQUFKLElBQVksR0FBaEIsRUFBcUI7QUFDbkIsY0FBSUMsT0FBT1QsSUFBSUMsS0FBSixDQUFVakIsVUFBVixJQUF3QixFQUFuQztBQUNBLGlCQUFLQSxVQUFMLEdBQWtCLE9BQUtBLFVBQUwsQ0FBZ0IwQixNQUFoQixDQUF1QkQsSUFBdkIsQ0FBbEI7QUFDQSxpQkFBS3hCLE9BQUwsR0FBZWUsSUFBSWYsT0FBbkI7QUFDQSxpQkFBSzBCLE1BQUw7QUFDRDtBQUNGLE9BZkQ7QUFnQkQ7OztvQ0FDZ0I7QUFDZixVQUFHLEtBQUsxQixPQUFSLEVBQWlCO0FBQ2YsYUFBS0MsT0FBTDtBQUNBLGFBQUtpQixxQkFBTDtBQUNEO0FBQ0Y7Ozs2QkFDUSxDQUNSOzs7O0VBckRnQ1MsZUFBS04sSTs7a0JBQW5COUIsSyIsImZpbGUiOiJkaXNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+enkui1mumSsSdcclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIHRvcEltZzogJycsIC8vIOmhtumDqOWVhuWTgeWbvlxyXG4gICAgZ29vZHNfbGlzdDogW10sXHJcbiAgICBoYXNtb3JlOiBmYWxzZSwgLy8g5piv5ZCm5pyJ5LiL5LiA6aG1XHJcbiAgICBjdXJwYWdlOiAxLCAvL+W9k+WJjemhteaVsFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkubWVtYmVyRngsXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMudG9wSW1nID0gcmVzLmRhdGFzLmltZ19hcmVhXHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMucmVxdWVzdEluZGV4R29vZHNMaXN0KClcclxuICB9XHJcbiAgLy8g6aaW6aG14oCU5pmu6YCa5ZWG5ZOB5YiX6KGo5o6l5Y+jXHJcbiAgcmVxdWVzdEluZGV4R29vZHNMaXN0KCkge1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmluZGV4R29vZHNMaXN0LFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHBhZ2U6IDEwLFxyXG4gICAgICAgIGN1cnBhZ2U6IHRoaXMuY3VycGFnZSxcclxuICAgICAgICBpc19meDogMSAvLyDpu5jorqTlgLzkuLox77yM6KGo56S66I635Y+W5YiG6ZSA5ZWG5ZOB55qE5YiX6KGoXHJcbiAgICAgIH0sXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB2YXIgbGlzdCA9IHJlcy5kYXRhcy5nb29kc19saXN0IHx8IFtdXHJcbiAgICAgICAgdGhpcy5nb29kc19saXN0ID0gdGhpcy5nb29kc19saXN0LmNvbmNhdChsaXN0KVxyXG4gICAgICAgIHRoaXMuaGFzbW9yZSA9IHJlcy5oYXNtb3JlXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIG9uUmVhY2hCb3R0b20gKCkge1xyXG4gICAgaWYodGhpcy5oYXNtb3JlKSB7XHJcbiAgICAgIHRoaXMuY3VycGFnZSArKyBcclxuICAgICAgdGhpcy5yZXF1ZXN0SW5kZXhHb29kc0xpc3QoKVxyXG4gICAgfVxyXG4gIH1cclxuICBvblNob3coKSB7XHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBuYXZHb29kc0RldGFpbHMoZ29vZHNfaWQsIHNhbGVfdHlwZSkge1xyXG4gICAgICAvLyBuYXZpZ2F0ZVxyXG4gICAgICBpZihzYWxlX3R5cGUgPT0gJ3J1c2hzYWxlcycpIHtcclxuICAgICAgICB0aGlzLiRyZWRpcmVjdChgL3BhZ2VzL3NlY2tpbGxTaG9wRGV0YWlscz9nb29kc19pZD0ke2dvb2RzX2lkfWApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuJHJlZGlyZWN0KGAvcGFnZXMvc2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxufVxyXG4iXX0=