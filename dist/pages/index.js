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
      flowData: [{
        id: '1',
        title: '萌分订书机a萌分订书机a萌分订书机a萌分订书机a',
        price: '5',
        exprice: '25',
        img: 'indeximg.png'
      }, {
        id: '2',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: 'indeximg.png'
      }, {
        id: '3',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: 'indeximg.png'
      }, {
        id: '4',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: 'indeximg.png'
      }, {
        id: '5',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: 'indeximg.png'
      }, {
        id: '6',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: 'indeximg.png'
      }],
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

      /**
       * 跳转商品详情
       */
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

      /**
       * 底部导航跳转
       */
      navSearch: function navSearch() {
        this.$navigate('/pages/search');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInRpbWVyIiwicmVxdWlyZSIsImFwaSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJjb21wb25lbnRzIiwibmF2IiwibWl4aW5zIiwiZGF0YSIsImNob29lc0lkIiwiaGFzVXNlckluZm8iLCJ1c2VySW5mbyIsInJlcXVlc3RJbWdVcmwiLCJiZWdpblRpbWUiLCJDaG9vZXNEYXRhIiwiaWQiLCJpbWciLCJ0aXRsZSIsImZsb3dEYXRhIiwicHJpY2UiLCJleHByaWNlIiwiaW1nVXJscyIsInd4VGltZXJMaXN0IiwiZ29vZHNfbGlzdCIsImFyZWFBcnIiLCJiYW5uZXJBcnIiLCJoYXNtb3JlIiwiY3VycGFnZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsInRhcE5hbWUiLCJ1cmwiLCIkbmF2aWdhdGUiLCJqdW1wRGV0YWlscyIsImdvb2RzX2lkIiwiZ29vZHNfdHlwZSIsImNvbnNvbGUiLCJsb2ciLCJOdW1iZXIiLCJuYXZTZWFyY2giLCJldmVudHMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImdldEFwcFVzZXJJbmZvIiwiaW5kZXhEZWZhdWx0SW5mbyIsInRoZW4iLCJyZXMiLCJjb2RlIiwiZGF0YXMiLCJhcmVhIiwiYmFubmVyIiwiJGFwcGx5IiwicmVxdWVzdEluZGV4R29vZHNMaXN0IiwiaW5kZXhHb29kc0xpc3QiLCJ0eXBlIiwicGFnZSIsImxpc3QiLCJjb25jYXQiLCJhcHAiLCJ3YXJuIiwid3giLCJjYW5JVXNlIiwidXNlckluZm9SZWFkeUNhbGxiYWNrIiwiZ2V0VXNlckluZm8iLCJzdWNjZXNzIiwiZSIsImRldGFpbCIsImVyck1zZyIsIndlcHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7Ozs7Ozs7OztBQUhxQztBQUNyQyxJQUFJQSxRQUFRQyxRQUFRLHFCQUFSLENBQVosQyxDQUE0QztBQUM1QyxJ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TCxHQUFnQitDLElBQUloQixVQUFKLENBQWUvQixRQUEvQjtBQUNBLGFBQUtELFdBQUwsR0FBbUIsSUFBbkI7QUFDRDtBQUNGOzs7d0NBRW1CLENBQUU7OztvQ0FDTDtBQUNmLFVBQUcsS0FBS2dCLE9BQVIsRUFBaUI7QUFDZixhQUFLQyxPQUFMO0FBQ0EsYUFBS3lCLHFCQUFMO0FBQ0Q7QUFDRjs7O3NDQUNpQmEsQyxFQUFHLENBQ3BCOzs7O0VBbE5nQ0csZUFBS2IsSTs7a0JBQW5CdEQsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG5hdiBmcm9tICcuLi9jb21wb25lbnRzL25hdic7IC8vIOW6lemDqOWvvOiIqlxyXG52YXIgdGltZXIgPSByZXF1aXJlKCcuLi91dGlscy93eFRpbWVyLmpzJyk7IC8vIOWAkuiuoeaXtlxyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpppbpobUnLFxyXG4gICAgLy8gZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlLFxyXG4gICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0J1xyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHtcclxuICAgIG5hdjogbmF2XHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBjaG9vZXNJZDogJycsXHJcbiAgICBoYXNVc2VySW5mbzogZmFsc2UsXHJcbiAgICB1c2VySW5mbzoge30sXHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGJlZ2luVGltZTogJzE4OjAwJyxcclxuICAgIENob29lc0RhdGE6IFtcclxuICAgICAgeyBpZDogJzcnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTExLnBuZycsIHRpdGxlOiAn6ZmQ5pe256eS5p2AJyB9LFxyXG4gICAgICB7IGlkOiAnMicsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTIucG5nJywgdGl0bGU6ICfnibnljZbpooTotK0nIH0sXHJcbiAgICAgIHsgaWQ6ICc1JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxMy5wbmcnLCB0aXRsZTogJ+egjeS7tycgfSxcclxuICAgICAgeyBpZDogJzEnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE0LnBuZycsIHRpdGxlOiAn5ZCI5LyZ5Lq6JyB9LFxyXG4gICAgICB7IGlkOiAnMycsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTUucG5nJywgdGl0bGU6ICfnp5LotZrpkrEnIH0sXHJcbiAgICAgIHsgaWQ6ICc0JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNi5wbmcnLCB0aXRsZTogJ+mihuWIuCcgfSxcclxuICAgICAgeyBpZDogJzYnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE3LnBuZycsIHRpdGxlOiAn54m557qm5ZWG5oi3JyB9LFxyXG4gICAgICB7IGlkOiAnOCcsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTgucG5nJywgdGl0bGU6ICfmm7TlpJrpopHpgZMnIH1cclxuICAgIF0sXHJcbiAgICBmbG93RGF0YTogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICcxJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacumHokIzliIborqLkuabmnLph6JCM5YiG6K6i5Lmm5py6YeiQjOWIhuiuouS5puacumEnLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICdpbmRleGltZy5wbmcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzInLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnaW5kZXhpbWcucG5nJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICczJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnNCcsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICdpbmRleGltZy5wbmcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzUnLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnaW5kZXhpbWcucG5nJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICc2JyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZydcclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIC8vIOi9ruaSrVxyXG4gICAgaW1nVXJsczogW1xyXG4gICAgICB7IGlkOiAnMScsIGltZzogJ2luZGV4bHVuYm8ucG5nJyB9LFxyXG4gICAgICB7IGlkOiAnMicsIGltZzogJ2luZGV4bHVuYm8ucG5nJyB9LFxyXG4gICAgICB7IGlkOiAnMycsIGltZzogJ2luZGV4bHVuYm8ucG5nJyB9LFxyXG4gICAgICB7IGlkOiAnNCcsIGltZzogJ2luZGV4bHVuYm8ucG5nJyB9XHJcbiAgICBdLFxyXG4gICAgd3hUaW1lckxpc3Q6IHt9LCAvLyDlgJLorqHml7ZcclxuICAgIGdvb2RzX2xpc3Q6IFtdLCAvLyDllYblk4HliJfooahcclxuICAgIGFyZWFBcnI6IFtdLCAvLyBhcmVh5Yy65Z+fXHJcbiAgICBiYW5uZXJBcnI6IFtdLCAvL+i9ruaSreWbvlxyXG4gICAgaGFzbW9yZTogZmFsc2UsIC8vIOaYr+WQpuacieS4i+S4gOmhtVxyXG4gICAgY3VycGFnZTogMSwgLy/lvZPliY3pobXmlbBcclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICB0aGlzLmdldEFwcFVzZXJJbmZvKCk7XHJcbiAgICAvLyDpppbpobUt6L2u5pKt5Zu+5ZKMYXJlYUFycuiPnOWNlVxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmluZGV4RGVmYXVsdEluZm8sXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLmFyZWFBcnIgPSByZXMuZGF0YXMuYXJlYSB8fCBbXTtcclxuICAgICAgICB0aGlzLmJhbm5lckFyciA9IHJlcy5kYXRhcy5iYW5uZXIgfHwgW107XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZXF1ZXN0SW5kZXhHb29kc0xpc3QoKVxyXG4gIH1cclxuICBcclxuICAvLyDpppbpobXigJTmma7pgJrllYblk4HliJfooajmjqXlj6NcclxuICByZXF1ZXN0SW5kZXhHb29kc0xpc3QoKSB7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuaW5kZXhHb29kc0xpc3QsXHJcbiAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcGFnZTogMTAsXHJcbiAgICAgICAgY3VycGFnZTogdGhpcy5jdXJwYWdlXHJcbiAgICAgIH0sXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB2YXIgbGlzdCA9IHJlcy5kYXRhcy5nb29kc19saXN0IHx8IFtdXHJcbiAgICAgICAgdGhpcy5nb29kc19saXN0ID0gdGhpcy5nb29kc19saXN0LmNvbmNhdChsaXN0KVxyXG4gICAgICAgIHRoaXMuaGFzbW9yZSA9IHJlcy5oYXNtb3JlXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIG9uU2hvdygpIHt9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHRhcE5hbWUodXJsLCBpZCkge1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7dXJsOiB1cmx9KVxyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgaWYgKGlkID09IDEpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYGFwcGx5UGFydG5lcmAgfSk7IC8vIOeUs+ivt+WQiOS8meS6ulxyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDIpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYHByZT9pZD0ke2lkfWAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gMykge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgZGlzY291bnQ/aWQ9JHtpZH1gIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDQpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYGFzc2VtYmxlP2lkPSR7aWR9YCB9KTsgLy8g5ou85ZuiXHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gNSkge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgYmFyZ2Fpbj9pZD0ke2lkfWAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gNikge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgbWVyY2hhbnQ/aWQ9JHtpZH1gIH0pOyAvLyDnibnnuqbllYbmiLdcclxuICAgICAgfSBlbHNlIGlmIChpZCA9PSA3KSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBzZWNraWxsP2lkPSR7aWR9YCB9KTtcclxuICAgICAgfSBlbHNlIGlmIChpZCA9PSA4KSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBtb3JlQ2hhbm5lbHM/aWQ9JHtpZH1gIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDot7PovazllYblk4Hor6bmg4VcclxuICAgICAqL1xyXG4gICAganVtcERldGFpbHMoZ29vZHNfaWQsIGdvb2RzX3R5cGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZ29vZHNfaWQsIGdvb2RzX3R5cGUpXHJcbiAgICAgIHN3aXRjaCAoTnVtYmVyKGdvb2RzX3R5cGUpKSB7XHJcbiAgICAgICAgY2FzZSAwOiBcclxuICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKGAvcGFnZXMvc2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKGAvcGFnZXMvc2Vja2lsbFNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOW6lemDqOWvvOiIqui3s+i9rFxyXG4gICAgICovXHJcbiAgICBuYXZTZWFyY2goKSB7XHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKCcvcGFnZXMvc2VhcmNoJyk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBldmVudHMgPSB7fTtcclxuICBnZXRBcHBVc2VySW5mbygpIHtcclxuICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICBpZiAoYXBwLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgY29uc29sZS53YXJuKCdnbG9iYWxEYXRhJyk7XHJcbiAgICAgIHRoaXMudXNlckluZm8gPSBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0gZWxzZSBpZiAod3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpKSB7XHJcbiAgICAgIGFwcC51c2VySW5mb1JlYWR5Q2FsbGJhY2sgPSByZXMgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUud2FybigndXNlckluZm9SZWFkeUNhbGxiYWNrJyk7XHJcbiAgICAgICAgdGhpcy51c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgICB0aGlzLmhhc1VzZXJJbmZvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUud2FybignZ2V0VXNlckluZm8nKTtcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICAgICAgdGhpcy51c2VySW5mbyA9IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0VXNlckluZm8oZSkge1xyXG4gICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgIGlmIChlLmRldGFpbC5lcnJNc2cgPT0gJ2dldFVzZXJJbmZvOm9rJykge1xyXG4gICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvO1xyXG4gICAgICB0aGlzLnVzZXJJbmZvID0gYXBwLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7fVxyXG4gIG9uUmVhY2hCb3R0b20gKCkge1xyXG4gICAgaWYodGhpcy5oYXNtb3JlKSB7XHJcbiAgICAgIHRoaXMuY3VycGFnZSArKyBcclxuICAgICAgdGhpcy5yZXF1ZXN0SW5kZXhHb29kc0xpc3QoKVxyXG4gICAgfVxyXG4gIH1cclxuICBvblB1bGxEb3duUmVmcmVzaChlKSB7XHJcbiAgfVxyXG59XHJcbiJdfQ==