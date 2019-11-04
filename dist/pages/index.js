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
      navigationBarTitleText: '首页',
      // enablePullDownRefresh: true,
      backgroundTextStyle: 'light'
    }, _this.components = {
      nav: _nav2.default
    }, _this.mixins = [], _this.data = {
      chooesId: '',
      hasUserInfo: false,
      userInfo: {},
      requestImgUrl: '',
      beginTime: '18:00',
      ChooesData: [{ id: '7', img: '/assets/img/image11.png', title: '限时秒杀' }, { id: '2', img: '/assets/img/image12.png', title: '特卖预购' }, { id: '5', img: '/assets/img/image13.png', title: '砍价' }, { id: '1', img: '/assets/img/image14.png', title: '合伙人' }, { id: '3', img: '/assets/img/image15.png', title: '秒赚钱' }, { id: '4', img: '/assets/img/image16.png', title: '领券' }, { id: '6', img: '/assets/img/image17.png', title: '特约商户' }, { id: '8', img: '/assets/img/image18.png', title: '更多频道' }],
      // 轮播
      imgUrls: [{ id: '1', img: 'indexlunbo.png' }, { id: '2', img: 'indexlunbo.png' }, { id: '3', img: 'indexlunbo.png' }, { id: '4', img: 'indexlunbo.png' }],
      wxTimerList: {}, // 倒计时
      goods_list: [], // 商品列表
      areaArr: [], // area区域
      bannerArr: [], //轮播图
      hasmore: false, // 是否有下一页
      curpage: 1 //当前页数
    }, _this.computed = {}, _this.methods = {
      tapName: function tapName(url, id) {
        this.$navigate({ url: url });
        return false;
        if (id == 1) {
          this.$navigate({ url: 'applyPartner' }); // 申请合伙人
        } else if (id == 2) {
          this.$navigate({ url: 'pre?id=' + id });
        } else if (id == 3) {
          this.$navigate({ url: 'discount?id=' + id });
        } else if (id == 4) {
          this.$navigate({ url: 'assemble?id=' + id }); // 拼团
        } else if (id == 5) {
          this.$navigate({ url: 'bargain?id=' + id });
        } else if (id == 6) {
          this.$navigate({ url: 'merchant?id=' + id }); // 特约商户
        } else if (id == 7) {
          this.$navigate({ url: 'seckill?id=' + id });
        } else if (id == 8) {
          this.$navigate({ url: 'moreChannels?id=' + id });
        }
      },
      jumpDetails: function jumpDetails(goods_id, goods_type) {
        console.log(goods_id, goods_type);
        switch (Number(goods_type)) {
          case 0:
            this.$navigate('/pages/shopDetails?goods_id=' + goods_id);
            break;
          case 1:
            this.$navigate('/pages/seckillShopDetails?goods_id=' + goods_id);
        }
      },
      navSearch: function navSearch() {
        this.$navigate('/pages/search');
      },
      logoHanld: function logoHanld() {
        wx.previewImage({
          urls: ['/assets/img/logo.png']
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      var _this2 = this;

      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      this.getAppUserInfo();
      // 首页-轮播图和areaArr菜单
      (0, _ajax.ajax)({
        url: api.indexDefaultInfo
      }).then(function (res) {
        if (res.code == 200) {
          _this2.areaArr = res.datas.area || [];
          _this2.bannerArr = res.datas.banner || [];
          _this2.$apply();
        }
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
          curpage: this.curpage
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
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'getAppUserInfo',
    value: function getAppUserInfo() {
      var _this4 = this;

      var app = this.$parent;
      if (app.globalData.userInfo) {
        console.warn('globalData');
        this.userInfo = app.globalData.userInfo;
        this.hasUserInfo = true;
        this.$apply();
      } else if (wx.canIUse('button.open-type.getUserInfo')) {
        app.userInfoReadyCallback = function (res) {
          console.warn('userInfoReadyCallback');
          _this4.userInfo = res.userInfo;
          _this4.hasUserInfo = true;
          _this4.$apply();
        };
      } else {
        wx.getUserInfo({
          success: function success(res) {
            console.warn('getUserInfo');
            app.globalData.userInfo = res.userInfo;
            _this4.userInfo = app.globalData.userInfo;
            _this4.hasUserInfo = true;
            _this4.$apply();
          }
        });
      }
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(e) {
      var app = this.$parent;
      if (e.detail.errMsg == 'getUserInfo:ok') {
        app.globalData.userInfo = e.detail.userInfo;
        this.userInfo = app.globalData.userInfo;
        this.hasUserInfo = true;
      }
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {}
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.hasmore) {
        this.curpage++;
        this.requestIndexGoodsList();
      }
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh(e) {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInRpbWVyIiwicmVxdWlyZSIsImFwaSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJjb21wb25lbnRzIiwibmF2IiwibWl4aW5zIiwiZGF0YSIsImNob29lc0lkIiwiaGFzVXNlckluZm8iLCJ1c2VySW5mbyIsInJlcXVlc3RJbWdVcmwiLCJiZWdpblRpbWUiLCJDaG9vZXNEYXRhIiwiaWQiLCJpbWciLCJ0aXRsZSIsImltZ1VybHMiLCJ3eFRpbWVyTGlzdCIsImdvb2RzX2xpc3QiLCJhcmVhQXJyIiwiYmFubmVyQXJyIiwiaGFzbW9yZSIsImN1cnBhZ2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJ0YXBOYW1lIiwidXJsIiwiJG5hdmlnYXRlIiwianVtcERldGFpbHMiLCJnb29kc19pZCIsImdvb2RzX3R5cGUiLCJjb25zb2xlIiwibG9nIiwiTnVtYmVyIiwibmF2U2VhcmNoIiwibG9nb0hhbmxkIiwid3giLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwiZXZlbnRzIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJnZXRBcHBVc2VySW5mbyIsImluZGV4RGVmYXVsdEluZm8iLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwiYXJlYSIsImJhbm5lciIsIiRhcHBseSIsInJlcXVlc3RJbmRleEdvb2RzTGlzdCIsImluZGV4R29vZHNMaXN0IiwidHlwZSIsInBhZ2UiLCJsaXN0IiwiY29uY2F0IiwiYXBwIiwid2FybiIsImNhbklVc2UiLCJ1c2VySW5mb1JlYWR5Q2FsbGJhY2siLCJnZXRVc2VySW5mbyIsInN1Y2Nlc3MiLCJlIiwiZGV0YWlsIiwiZXJyTXNnIiwid2VweSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7Ozs7Ozs7O0FBSHFDO0FBQ3JDLElBQUlBLFFBQVFDLFFBQVEscUJBQVIsQ0FBWixDLENBQTRDO0FB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QUFTLHNCQUFPO0FBQ2QvQixvQkFBUTJCLElBQVIsQ0FBYSxhQUFiO0FBQ0FELGdCQUFJaEIsVUFBSixDQUFlaEMsUUFBZixHQUEwQm9DLElBQUlwQyxRQUE5QjtBQUNBLG1CQUFLQSxRQUFMLEdBQWdCZ0QsSUFBSWhCLFVBQUosQ0FBZWhDLFFBQS9CO0FBQ0EsbUJBQUtELFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxtQkFBSzBDLE1BQUw7QUFDRDtBQVBZLFNBQWY7QUFTRDtBQUNGOzs7Z0NBQ1dhLEMsRUFBRztBQUNiLFVBQUlOLE1BQU0sS0FBS2pCLE9BQWY7QUFDQSxVQUFJdUIsRUFBRUMsTUFBRixDQUFTQyxNQUFULElBQW1CLGdCQUF2QixFQUF5QztBQUN2Q1IsWUFBSWhCLFVBQUosQ0FBZWhDLFFBQWYsR0FBMEJzRCxFQUFFQyxNQUFGLENBQVN2RCxRQUFuQztBQUNBLGFBQUtBLFFBQUwsR0FBZ0JnRCxJQUFJaEIsVUFBSixDQUFlaEMsUUFBL0I7QUFDQSxhQUFLRCxXQUFMLEdBQW1CLElBQW5CO0FBQ0Q7QUFDRjs7O3dDQUVtQixDQUFFOzs7b0NBQ0w7QUFDZixVQUFHLEtBQUthLE9BQVIsRUFBaUI7QUFDZixhQUFLQyxPQUFMO0FBQ0EsYUFBSzZCLHFCQUFMO0FBQ0Q7QUFDRjs7O3NDQUNpQlksQyxFQUFHLENBQ3BCOzs7O0VBdktnQ0csZUFBS1osSTs7a0JBQW5CdkQsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG5hdiBmcm9tICcuLi9jb21wb25lbnRzL25hdic7IC8vIOW6lemDqOWvvOiIqlxyXG52YXIgdGltZXIgPSByZXF1aXJlKCcuLi91dGlscy93eFRpbWVyLmpzJyk7IC8vIOWAkuiuoeaXtlxyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpppbpobUnLFxyXG4gICAgLy8gZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlLFxyXG4gICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0J1xyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHtcclxuICAgIG5hdjogbmF2XHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBjaG9vZXNJZDogJycsXHJcbiAgICBoYXNVc2VySW5mbzogZmFsc2UsXHJcbiAgICB1c2VySW5mbzoge30sXHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGJlZ2luVGltZTogJzE4OjAwJyxcclxuICAgIENob29lc0RhdGE6IFtcclxuICAgICAgeyBpZDogJzcnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTExLnBuZycsIHRpdGxlOiAn6ZmQ5pe256eS5p2AJyB9LFxyXG4gICAgICB7IGlkOiAnMicsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTIucG5nJywgdGl0bGU6ICfnibnljZbpooTotK0nIH0sXHJcbiAgICAgIHsgaWQ6ICc1JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxMy5wbmcnLCB0aXRsZTogJ+egjeS7tycgfSxcclxuICAgICAgeyBpZDogJzEnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE0LnBuZycsIHRpdGxlOiAn5ZCI5LyZ5Lq6JyB9LFxyXG4gICAgICB7IGlkOiAnMycsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTUucG5nJywgdGl0bGU6ICfnp5LotZrpkrEnIH0sXHJcbiAgICAgIHsgaWQ6ICc0JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNi5wbmcnLCB0aXRsZTogJ+mihuWIuCcgfSxcclxuICAgICAgeyBpZDogJzYnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE3LnBuZycsIHRpdGxlOiAn54m557qm5ZWG5oi3JyB9LFxyXG4gICAgICB7IGlkOiAnOCcsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTgucG5nJywgdGl0bGU6ICfmm7TlpJrpopHpgZMnIH1cclxuICAgIF0sXHJcbiAgICAvLyDova7mkq1cclxuICAgIGltZ1VybHM6IFtcclxuICAgICAgeyBpZDogJzEnLCBpbWc6ICdpbmRleGx1bmJvLnBuZycgfSxcclxuICAgICAgeyBpZDogJzInLCBpbWc6ICdpbmRleGx1bmJvLnBuZycgfSxcclxuICAgICAgeyBpZDogJzMnLCBpbWc6ICdpbmRleGx1bmJvLnBuZycgfSxcclxuICAgICAgeyBpZDogJzQnLCBpbWc6ICdpbmRleGx1bmJvLnBuZycgfVxyXG4gICAgXSxcclxuICAgIHd4VGltZXJMaXN0OiB7fSwgLy8g5YCS6K6h5pe2XHJcbiAgICBnb29kc19saXN0OiBbXSwgLy8g5ZWG5ZOB5YiX6KGoXHJcbiAgICBhcmVhQXJyOiBbXSwgLy8gYXJlYeWMuuWfn1xyXG4gICAgYmFubmVyQXJyOiBbXSwgLy/ova7mkq3lm75cclxuICAgIGhhc21vcmU6IGZhbHNlLCAvLyDmmK/lkKbmnInkuIvkuIDpobVcclxuICAgIGN1cnBhZ2U6IDEsIC8v5b2T5YmN6aG15pWwXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgdGhpcy5nZXRBcHBVc2VySW5mbygpO1xyXG4gICAgLy8g6aaW6aG1Lei9ruaSreWbvuWSjGFyZWFBcnLoj5zljZVcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5pbmRleERlZmF1bHRJbmZvLFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5hcmVhQXJyID0gcmVzLmRhdGFzLmFyZWEgfHwgW107XHJcbiAgICAgICAgdGhpcy5iYW5uZXJBcnIgPSByZXMuZGF0YXMuYmFubmVyIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucmVxdWVzdEluZGV4R29vZHNMaXN0KClcclxuICB9XHJcbiAgXHJcbiAgLy8g6aaW6aG14oCU5pmu6YCa5ZWG5ZOB5YiX6KGo5o6l5Y+jXHJcbiAgcmVxdWVzdEluZGV4R29vZHNMaXN0KCkge1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmluZGV4R29vZHNMaXN0LFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHBhZ2U6IDEwLFxyXG4gICAgICAgIGN1cnBhZ2U6IHRoaXMuY3VycGFnZVxyXG4gICAgICB9LFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdmFyIGxpc3QgPSByZXMuZGF0YXMuZ29vZHNfbGlzdCB8fCBbXVxyXG4gICAgICAgIHRoaXMuZ29vZHNfbGlzdCA9IHRoaXMuZ29vZHNfbGlzdC5jb25jYXQobGlzdClcclxuICAgICAgICB0aGlzLmhhc21vcmUgPSByZXMuaGFzbW9yZVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25TaG93KCkge31cclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHRhcE5hbWUodXJsLCBpZCkge1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7dXJsOiB1cmx9KVxyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgaWYgKGlkID09IDEpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYGFwcGx5UGFydG5lcmAgfSk7IC8vIOeUs+ivt+WQiOS8meS6ulxyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDIpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYHByZT9pZD0ke2lkfWAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gMykge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgZGlzY291bnQ/aWQ9JHtpZH1gIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDQpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYGFzc2VtYmxlP2lkPSR7aWR9YCB9KTsgLy8g5ou85ZuiXHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gNSkge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgYmFyZ2Fpbj9pZD0ke2lkfWAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gNikge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgbWVyY2hhbnQ/aWQ9JHtpZH1gIH0pOyAvLyDnibnnuqbllYbmiLdcclxuICAgICAgfSBlbHNlIGlmIChpZCA9PSA3KSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBzZWNraWxsP2lkPSR7aWR9YCB9KTtcclxuICAgICAgfSBlbHNlIGlmIChpZCA9PSA4KSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBtb3JlQ2hhbm5lbHM/aWQ9JHtpZH1gIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAganVtcERldGFpbHMoZ29vZHNfaWQsIGdvb2RzX3R5cGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZ29vZHNfaWQsIGdvb2RzX3R5cGUpXHJcbiAgICAgIHN3aXRjaCAoTnVtYmVyKGdvb2RzX3R5cGUpKSB7XHJcbiAgICAgICAgY2FzZSAwOiBcclxuICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKGAvcGFnZXMvc2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKGAvcGFnZXMvc2Vja2lsbFNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBuYXZTZWFyY2goKSB7XHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKCcvcGFnZXMvc2VhcmNoJyk7XHJcbiAgICB9LFxyXG4gICAgbG9nb0hhbmxkKCl7XHJcbiAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgdXJsczogWycvYXNzZXRzL2ltZy9sb2dvLnBuZyddXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfTtcclxuICBldmVudHMgPSB7fTtcclxuICBnZXRBcHBVc2VySW5mbygpIHtcclxuICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICBpZiAoYXBwLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgY29uc29sZS53YXJuKCdnbG9iYWxEYXRhJyk7XHJcbiAgICAgIHRoaXMudXNlckluZm8gPSBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0gZWxzZSBpZiAod3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpKSB7XHJcbiAgICAgIGFwcC51c2VySW5mb1JlYWR5Q2FsbGJhY2sgPSByZXMgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUud2FybigndXNlckluZm9SZWFkeUNhbGxiYWNrJyk7XHJcbiAgICAgICAgdGhpcy51c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgICB0aGlzLmhhc1VzZXJJbmZvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUud2FybignZ2V0VXNlckluZm8nKTtcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICAgICAgdGhpcy51c2VySW5mbyA9IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0VXNlckluZm8oZSkge1xyXG4gICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgIGlmIChlLmRldGFpbC5lcnJNc2cgPT0gJ2dldFVzZXJJbmZvOm9rJykge1xyXG4gICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvO1xyXG4gICAgICB0aGlzLnVzZXJJbmZvID0gYXBwLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7fVxyXG4gIG9uUmVhY2hCb3R0b20gKCkge1xyXG4gICAgaWYodGhpcy5oYXNtb3JlKSB7XHJcbiAgICAgIHRoaXMuY3VycGFnZSArKyBcclxuICAgICAgdGhpcy5yZXF1ZXN0SW5kZXhHb29kc0xpc3QoKVxyXG4gICAgfVxyXG4gIH1cclxuICBvblB1bGxEb3duUmVmcmVzaChlKSB7XHJcbiAgfVxyXG59XHJcbiJdfQ==