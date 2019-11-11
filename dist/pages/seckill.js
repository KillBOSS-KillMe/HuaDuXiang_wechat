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

var timer = require('./../utils/wxTimer.js'); // 倒计时
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
      navigationBarTitleText: '秒杀'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      navIdx: 0, //横向导航滚动索引
      scrollIdx: 'scroll0', //横向导航滚动
      wxTimerList: {}, // 倒计时
      requestImgUrl: '',
      topImg: '',
      seckillId: '',
      timeData: [{ id: '1', time: '08:00' }, { id: '2', time: '09:00' }, { id: '3', time: '10:00' }, { id: '3', time: '11:00' }, { id: '3', time: '12:00' }, { id: '3', time: '13:00' }],
      goods_list: [],
      hasmore: false, // 是否有下一页
      curpage: 1 //当前页数
    }, _this.computed = {}, _this.methods = {
      changNav: function changNav(idx) {
        this.navIdx = idx;
        this.scrollIdx = 'scroll' + (idx - 1);
      },

      /**
       * 跳转商品详情
       */
      jumpTimeDetails: function jumpTimeDetails(goods_id, endtime) {
        if (endtime <= 0) {
          wx.showToast({
            title: '活动已过期,请选择其它商品',
            icon: 'none'
          });
          return false;
        }
        this.$navigate('/pages/seckillShopDetails?goods_id=' + goods_id);
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var _this2 = this;

      // 倒计时s
      // var wxTimer = new timer({
      //   beginTime: '10',
      //   name: 'firstTimer',
      //   complete() {}
      // });
      // wxTimer.start(this);


      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      (0, _ajax.ajax)({
        url: api.memberMs
      }).then(function (res) {
        _this2.topImg = res.datas.img_area;
        _this2.$apply();
      });

      this.requestList();
    }
  }, {
    key: 'requestList',
    value: function requestList() {
      var _this3 = this;

      (0, _ajax.ajax)({
        url: api.msGoodsList,
        data: {
          page: 10,
          curpage: this.curpage
        }
      }).then(function (res) {
        if (res.code == 200) {
          var list = res.datas.list || [];
          _this3.goods_list = _this3.goods_list.concat(list);
          _this3.hasmore = res.datas.hasmore;
          _this3.$apply();
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.hasmore) {
        this.curpage++;
        this.requestList();
      }
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/seckill'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY2tpbGwuanMiXSwibmFtZXMiOlsidGltZXIiLCJyZXF1aXJlIiwiYXBpIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJuYXZJZHgiLCJzY3JvbGxJZHgiLCJ3eFRpbWVyTGlzdCIsInJlcXVlc3RJbWdVcmwiLCJ0b3BJbWciLCJzZWNraWxsSWQiLCJ0aW1lRGF0YSIsImlkIiwidGltZSIsImdvb2RzX2xpc3QiLCJoYXNtb3JlIiwiY3VycGFnZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImNoYW5nTmF2IiwiaWR4IiwianVtcFRpbWVEZXRhaWxzIiwiZ29vZHNfaWQiLCJlbmR0aW1lIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCIkbmF2aWdhdGUiLCJldmVudHMiLCJvcHRpb25zIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1cmwiLCJtZW1iZXJNcyIsInRoZW4iLCJyZXMiLCJkYXRhcyIsImltZ19hcmVhIiwiJGFwcGx5IiwicmVxdWVzdExpc3QiLCJtc0dvb2RzTGlzdCIsInBhZ2UiLCJjb2RlIiwibGlzdCIsImNvbmNhdCIsIndlcHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBR0E7Ozs7Ozs7Ozs7QUFGQSxJQUFJQSxRQUFRQyxRQUFRLHFCQUFSLENBQVosQyxDQUE0QztBQUM1QyxJQUFJQyxNQUFNRCxRQUFRLFdBQVIsQ0FBVjs7SUFHcUJFLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxjQUFRLENBREgsRUFDTTtBQUNYQyxpQkFBVyxTQUZOLEVBRWlCO0FBQ3RCQyxtQkFBYSxFQUhSLEVBR1k7QUFDakJDLHFCQUFlLEVBSlY7QUFLTEMsY0FBUSxFQUxIO0FBTUxDLGlCQUFXLEVBTk47QUFPTEMsZ0JBQVUsQ0FDUixFQUFFQyxJQUFJLEdBQU4sRUFBV0MsTUFBTSxPQUFqQixFQURRLEVBRVIsRUFBRUQsSUFBSSxHQUFOLEVBQVdDLE1BQU0sT0FBakIsRUFGUSxFQUdSLEVBQUVELElBQUksR0FBTixFQUFXQyxNQUFNLE9BQWpCLEVBSFEsRUFJUixFQUFFRCxJQUFJLEdBQU4sRUFBV0MsTUFBTSxPQUFqQixFQUpRLEVBS1IsRUFBRUQsSUFBSSxHQUFOLEVBQVdDLE1BQU0sT0FBakIsRUFMUSxFQU1SLEVBQUVELElBQUksR0FBTixFQUFXQyxNQUFNLE9BQWpCLEVBTlEsQ0FQTDtBQWVMQyxrQkFBWSxFQWZQO0FBZ0JMQyxlQUFTLEtBaEJKLEVBZ0JXO0FBQ2hCQyxlQUFTLENBakJKLENBaUJPO0FBakJQLEssUUFvQlBDLFEsR0FBVyxFLFFBdUNYQyxPLEdBQVU7QUFDUkMsY0FEUSxvQkFDQ0MsR0FERCxFQUNNO0FBQ1YsYUFBS2YsTUFBTCxHQUFjZSxHQUFkO0FBQ0EsYUFBS2QsU0FBTCxlQUEwQmMsTUFBSSxDQUE5QjtBQUNILE9BSk87O0FBS1I7OztBQUdBQyxxQkFSUSwyQkFRUUMsUUFSUixFQVFrQkMsT0FSbEIsRUFRMkI7QUFDakMsWUFBR0EsV0FBVyxDQUFkLEVBQWlCO0FBQ2ZDLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxlQURJO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlBLGlCQUFPLEtBQVA7QUFDRDtBQUNELGFBQUtDLFNBQUwseUNBQ3dDTixRQUR4QztBQUdEO0FBbkJPLEssUUE0QlZPLE0sR0FBUyxFOzs7OzsyQkFsRUZDLE8sRUFBUztBQUFBOztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxXQUFLdEIsYUFBTCxHQUFxQixLQUFLdUIsT0FBTCxDQUFhQyxVQUFiLENBQXdCeEIsYUFBN0M7QUFDQSxzQkFBSztBQUNEeUIsYUFBS25DLElBQUlvQztBQURSLE9BQUwsRUFFR0MsSUFGSCxDQUVRLGVBQU87QUFDWCxlQUFLMUIsTUFBTCxHQUFjMkIsSUFBSUMsS0FBSixDQUFVQyxRQUF4QjtBQUNBLGVBQUtDLE1BQUw7QUFDSCxPQUxEOztBQU9BLFdBQUtDLFdBQUw7QUFDRDs7O2tDQUNhO0FBQUE7O0FBQ1osc0JBQUs7QUFDSFAsYUFBS25DLElBQUkyQyxXQUROO0FBRUhyQyxjQUFNO0FBQ0pzQyxnQkFBTSxFQURGO0FBRUoxQixtQkFBUyxLQUFLQTtBQUZWO0FBRkgsT0FBTCxFQU1HbUIsSUFOSCxDQU1RLGVBQU87QUFDYixZQUFJQyxJQUFJTyxJQUFKLElBQVksR0FBaEIsRUFBcUI7QUFDbkIsY0FBSUMsT0FBT1IsSUFBSUMsS0FBSixDQUFVTyxJQUFWLElBQWtCLEVBQTdCO0FBQ0EsaUJBQUs5QixVQUFMLEdBQWtCLE9BQUtBLFVBQUwsQ0FBZ0IrQixNQUFoQixDQUF1QkQsSUFBdkIsQ0FBbEI7QUFDQSxpQkFBSzdCLE9BQUwsR0FBZXFCLElBQUlDLEtBQUosQ0FBVXRCLE9BQXpCO0FBQ0EsaUJBQUt3QixNQUFMO0FBQ0Q7QUFDRixPQWJEO0FBY0Q7Ozs2QkFDUSxDQUNSOzs7b0NBc0JnQjtBQUNmLFVBQUcsS0FBS3hCLE9BQVIsRUFBaUI7QUFDZixhQUFLQyxPQUFMO0FBQ0EsYUFBS3dCLFdBQUw7QUFDRDtBQUNGOzs7O0VBN0ZnQ00sZUFBS0osSTs7a0JBQW5CM0MsSyIsImZpbGUiOiJzZWNraWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG52YXIgdGltZXIgPSByZXF1aXJlKCcuLi91dGlscy93eFRpbWVyLmpzJyk7IC8vIOWAkuiuoeaXtlxyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn56eS5p2AJ1xyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIG5hdklkeDogMCwgLy/mqKrlkJHlr7zoiKrmu5rliqjntKLlvJVcclxuICAgIHNjcm9sbElkeDogJ3Njcm9sbDAnLCAvL+aoquWQkeWvvOiIqua7muWKqFxyXG4gICAgd3hUaW1lckxpc3Q6IHt9LCAvLyDlgJLorqHml7ZcclxuICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgdG9wSW1nOiAnJyxcclxuICAgIHNlY2tpbGxJZDogJycsXHJcbiAgICB0aW1lRGF0YTogW1xyXG4gICAgICB7IGlkOiAnMScsIHRpbWU6ICcwODowMCcgfSxcclxuICAgICAgeyBpZDogJzInLCB0aW1lOiAnMDk6MDAnIH0sXHJcbiAgICAgIHsgaWQ6ICczJywgdGltZTogJzEwOjAwJyB9LFxyXG4gICAgICB7IGlkOiAnMycsIHRpbWU6ICcxMTowMCcgfSxcclxuICAgICAgeyBpZDogJzMnLCB0aW1lOiAnMTI6MDAnIH0sXHJcbiAgICAgIHsgaWQ6ICczJywgdGltZTogJzEzOjAwJyB9XHJcbiAgICBdLFxyXG4gICAgZ29vZHNfbGlzdDogW10sXHJcbiAgICBoYXNtb3JlOiBmYWxzZSwgLy8g5piv5ZCm5pyJ5LiL5LiA6aG1XHJcbiAgICBjdXJwYWdlOiAxLCAvL+W9k+WJjemhteaVsFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIC8vIOWAkuiuoeaXtnNcclxuICAgIC8vIHZhciB3eFRpbWVyID0gbmV3IHRpbWVyKHtcclxuICAgIC8vICAgYmVnaW5UaW1lOiAnMTAnLFxyXG4gICAgLy8gICBuYW1lOiAnZmlyc3RUaW1lcicsXHJcbiAgICAvLyAgIGNvbXBsZXRlKCkge31cclxuICAgIC8vIH0pO1xyXG4gICAgLy8gd3hUaW1lci5zdGFydCh0aGlzKTtcclxuIFxyXG5cclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5tZW1iZXJNcyxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICB0aGlzLnRvcEltZyA9IHJlcy5kYXRhcy5pbWdfYXJlYVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5yZXF1ZXN0TGlzdCgpXHJcbiAgfVxyXG4gIHJlcXVlc3RMaXN0KCkge1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm1zR29vZHNMaXN0LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcGFnZTogMTAsXHJcbiAgICAgICAgY3VycGFnZTogdGhpcy5jdXJwYWdlXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHZhciBsaXN0ID0gcmVzLmRhdGFzLmxpc3QgfHwgW11cclxuICAgICAgICB0aGlzLmdvb2RzX2xpc3QgPSB0aGlzLmdvb2RzX2xpc3QuY29uY2F0KGxpc3QpXHJcbiAgICAgICAgdGhpcy5oYXNtb3JlID0gcmVzLmRhdGFzLmhhc21vcmVcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgb25TaG93KCkge1xyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgY2hhbmdOYXYoaWR4KSB7XHJcbiAgICAgICAgdGhpcy5uYXZJZHggPSBpZHhcclxuICAgICAgICB0aGlzLnNjcm9sbElkeCA9IGBzY3JvbGwke2lkeC0xfWBcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOi3s+i9rOWVhuWTgeivpuaDhVxyXG4gICAgICovXHJcbiAgICBqdW1wVGltZURldGFpbHMoZ29vZHNfaWQsIGVuZHRpbWUpIHtcclxuICAgICAgaWYoZW5kdGltZSA8PSAwKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn5rS75Yqo5bey6L+H5pyfLOivt+mAieaLqeWFtuWug+WVhuWTgScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKFxyXG4gICAgICAgIGAvcGFnZXMvc2Vja2lsbFNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgb25SZWFjaEJvdHRvbSAoKSB7XHJcbiAgICBpZih0aGlzLmhhc21vcmUpIHtcclxuICAgICAgdGhpcy5jdXJwYWdlICsrIFxyXG4gICAgICB0aGlzLnJlcXVlc3RMaXN0KClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG59XHJcbiJdfQ==