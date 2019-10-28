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
      navigationBarTitleText: '首页'
    }, _this.$repeat = {}, _this.$props = { "nav": { "xmlns:v-on": "" } }, _this.$events = { "nav": { "v-on:childFn": "goPage" } }, _this.components = {
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
      bannerArr: [] //轮播图
    }, _this.computed = {}, _this.methods = {
      tapName: function tapName(id) {
        if (id == 1) {
          // this.$navigate({ url: `sale?id=${id}` }); // 促销
          this.$navigate({ url: 'applyPartner' }); // 申请合伙人
        } else if (id == 2) {
          this.$navigate({ url: 'pre?id=' + id });
        } else if (id == 3) {
          this.$navigate({ url: 'discount?id=' + id });
        } else if (id == 4) {
          // this.$navigate({ url: `sale?id=${id}` }); // 促销
          this.$navigate({ url: 'assemble?id=' + id }); // 拼团
        } else if (id == 5) {
          this.$navigate({ url: 'bargain?id=' + id });
        } else if (id == 6) {
          // this.$navigate({ url: `assemble?id=${id}` }); // 拼团
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
      goPage: function goPage(url, evt) {
        // 销毁当前页{跳转}
        this.$redirect(url);
      },
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
      // 倒计时s
      var wxTimer = new timer({
        beginTime: '6',
        name: 'firstTimer',
        complete: function complete() {}
      });
      wxTimer.start(this);
      // setTimeout(() => {
      //   wxTimer.stop();
      // }, 5000);
      // 倒计时e
      this.getAppUserInfo();

      // 首页—普通商品列表接口
      (0, _ajax.ajax)({
        url: api.indexGoodsList
      }).then(function (res) {
        if (res.code == 200) {
          _this2.goods_list = res.datas.goods_list;
          _this2.$apply();
        }
      });
      // 首页-轮播图和areaArr菜单
      (0, _ajax.ajax)({
        url: api.indexDefaultInfo
        // type: 'get'
      }).then(function (res) {
        console.log(res);
        if (res.code == 200) {
          _this2.areaArr = res.datas.area || [];
          _this2.bannerArr = res.datas.banner || [];
          _this2.$apply();
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'getAppUserInfo',
    value: function getAppUserInfo() {
      var _this3 = this;

      var app = this.$parent;
      if (app.globalData.userInfo) {
        console.warn('globalData');
        this.userInfo = app.globalData.userInfo;
        this.hasUserInfo = true;
      } else if (wx.canIUse('button.open-type.getUserInfo')) {
        app.userInfoReadyCallback = function (res) {
          console.warn('userInfoReadyCallback');
          _this3.userInfo = app.globalData.userInfo;
          _this3.hasUserInfo = true;
        };
      } else {
        wx.getUserInfo({
          success: function success(res) {
            console.warn('getUserInfo');
            app.globalData.userInfo = res.userInfo;
            _this3.userInfo = app.globalData.userInfo;
            _this3.hasUserInfo = true;
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
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInRpbWVyIiwicmVxdWlyZSIsImFwaSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hdiIsIm1peGlucyIsImRhdGEiLCJjaG9vZXNJZCIsImhhc1VzZXJJbmZvIiwidXNlckluZm8iLCJyZXF1ZXN0SW1nVXJsIiwiYmVnaW5UaW1lIiwiQ2hvb2VzRGF0YSIsImlkIiwiaW1nIiwidGl0bGUiLCJmbG93RGF0YSIsInByaWNlIiwiZXhwcmljZSIsImltZ1VybHMiLCJ3eFRpbWVyTGlzdCIsImdvb2RzX2xpc3QiLCJhcmVhQXJyIiwiYmFubmVyQXJyIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwidGFwTmFtZSIsIiRuYXZpZ2F0ZSIsInVybCIsImp1bXBEZXRhaWxzIiwiZ29vZHNfaWQiLCJnb29kc190eXBlIiwiY29uc29sZSIsImxvZyIsIk51bWJlciIsImdvUGFnZSIsImV2dCIsIiRyZWRpcmVjdCIsIm5hdlNlYXJjaCIsImV2ZW50cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwid3hUaW1lciIsIm5hbWUiLCJjb21wbGV0ZSIsInN0YXJ0IiwiZ2V0QXBwVXNlckluZm8iLCJpbmRleEdvb2RzTGlzdCIsInRoZW4iLCJyZXMiLCJjb2RlIiwiZGF0YXMiLCIkYXBwbHkiLCJpbmRleERlZmF1bHRJbmZvIiwiYXJlYSIsImJhbm5lciIsImFwcCIsIndhcm4iLCJ3eCIsImNhbklVc2UiLCJ1c2VySW5mb1JlYWR5Q2FsbGJhY2siLCJnZXRVc2VySW5mbyIsInN1Y2Nlc3MiLCJlIiwiZGV0YWlsIiwiZXJyTXNnIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7Ozs7Ozs7OztBQUhxQztBQUNyQyxJQUFJQSxRQUFRQyxRQUFRLHFCQUFSLENBQVosQyxDQUE0QztBQUM1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QUFJZixVQUFKLENBQWVoQyxRQUEvQjtBQUNBLGFBQUtELFdBQUwsR0FBbUIsSUFBbkI7QUFDRDtBQUNGOzs7d0NBRW1CLENBQUU7Ozs7RUE3TVcwRCxlQUFLQyxJOztrQkFBbkJ0RSxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgbmF2IGZyb20gJy4uL2NvbXBvbmVudHMvbmF2JzsgLy8g5bqV6YOo5a+86IiqXHJcbnZhciB0aW1lciA9IHJlcXVpcmUoJy4uL3V0aWxzL3d4VGltZXIuanMnKTsgLy8g5YCS6K6h5pe2XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mmlumhtSdcclxuICB9O1xyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJuYXZcIjp7XCJ4bWxuczp2LW9uXCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge1wibmF2XCI6e1widi1vbjpjaGlsZEZuXCI6XCJnb1BhZ2VcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIG5hdjogbmF2XHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBjaG9vZXNJZDogJycsXHJcbiAgICBoYXNVc2VySW5mbzogZmFsc2UsXHJcbiAgICB1c2VySW5mbzoge30sXHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGJlZ2luVGltZTogJzE4OjAwJyxcclxuICAgIENob29lc0RhdGE6IFtcclxuICAgICAgeyBpZDogJzcnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTExLnBuZycsIHRpdGxlOiAn6ZmQ5pe256eS5p2AJyB9LFxyXG4gICAgICB7IGlkOiAnMicsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTIucG5nJywgdGl0bGU6ICfnibnljZbpooTotK0nIH0sXHJcbiAgICAgIHsgaWQ6ICc1JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxMy5wbmcnLCB0aXRsZTogJ+egjeS7tycgfSxcclxuICAgICAgeyBpZDogJzEnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE0LnBuZycsIHRpdGxlOiAn5ZCI5LyZ5Lq6JyB9LFxyXG4gICAgICB7IGlkOiAnMycsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTUucG5nJywgdGl0bGU6ICfnp5LotZrpkrEnIH0sXHJcbiAgICAgIHsgaWQ6ICc0JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNi5wbmcnLCB0aXRsZTogJ+mihuWIuCcgfSxcclxuICAgICAgeyBpZDogJzYnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE3LnBuZycsIHRpdGxlOiAn54m557qm5ZWG5oi3JyB9LFxyXG4gICAgICB7IGlkOiAnOCcsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTgucG5nJywgdGl0bGU6ICfmm7TlpJrpopHpgZMnIH1cclxuICAgIF0sXHJcbiAgICBmbG93RGF0YTogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICcxJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacumHokIzliIborqLkuabmnLph6JCM5YiG6K6i5Lmm5py6YeiQjOWIhuiuouS5puacumEnLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICdpbmRleGltZy5wbmcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzInLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnaW5kZXhpbWcucG5nJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICczJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnNCcsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICdpbmRleGltZy5wbmcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzUnLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnaW5kZXhpbWcucG5nJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICc2JyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZydcclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIC8vIOi9ruaSrVxyXG4gICAgaW1nVXJsczogW1xyXG4gICAgICB7IGlkOiAnMScsIGltZzogJ2luZGV4bHVuYm8ucG5nJyB9LFxyXG4gICAgICB7IGlkOiAnMicsIGltZzogJ2luZGV4bHVuYm8ucG5nJyB9LFxyXG4gICAgICB7IGlkOiAnMycsIGltZzogJ2luZGV4bHVuYm8ucG5nJyB9LFxyXG4gICAgICB7IGlkOiAnNCcsIGltZzogJ2luZGV4bHVuYm8ucG5nJyB9XHJcbiAgICBdLFxyXG4gICAgd3hUaW1lckxpc3Q6IHt9LCAvLyDlgJLorqHml7ZcclxuICAgIGdvb2RzX2xpc3Q6IFtdLCAvLyDllYblk4HliJfooahcclxuICAgIGFyZWFBcnI6IFtdLCAvLyBhcmVh5Yy65Z+fXHJcbiAgICBiYW5uZXJBcnI6IFtdIC8v6L2u5pKt5Zu+XHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgLy8g5YCS6K6h5pe2c1xyXG4gICAgdmFyIHd4VGltZXIgPSBuZXcgdGltZXIoe1xyXG4gICAgICBiZWdpblRpbWU6ICc2JyxcclxuICAgICAgbmFtZTogJ2ZpcnN0VGltZXInLFxyXG4gICAgICBjb21wbGV0ZSgpIHt9XHJcbiAgICB9KTtcclxuICAgIHd4VGltZXIuc3RhcnQodGhpcyk7XHJcbiAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIC8vICAgd3hUaW1lci5zdG9wKCk7XHJcbiAgICAvLyB9LCA1MDAwKTtcclxuICAgIC8vIOWAkuiuoeaXtmVcclxuICAgIHRoaXMuZ2V0QXBwVXNlckluZm8oKTtcclxuXHJcbiAgICAvLyDpppbpobXigJTmma7pgJrllYblk4HliJfooajmjqXlj6NcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5pbmRleEdvb2RzTGlzdFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc19saXN0ID0gcmVzLmRhdGFzLmdvb2RzX2xpc3Q7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyDpppbpobUt6L2u5pKt5Zu+5ZKMYXJlYUFycuiPnOWNlVxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmluZGV4RGVmYXVsdEluZm8sXHJcbiAgICAgIC8vIHR5cGU6ICdnZXQnXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLmFyZWFBcnIgPSByZXMuZGF0YXMuYXJlYSB8fCBbXTtcclxuICAgICAgICB0aGlzLmJhbm5lckFyciA9IHJlcy5kYXRhcy5iYW5uZXIgfHwgW107XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIG9uU2hvdygpIHt9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHRhcE5hbWUoaWQpIHtcclxuICAgICAgaWYgKGlkID09IDEpIHtcclxuICAgICAgICAvLyB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYHNhbGU/aWQ9JHtpZH1gIH0pOyAvLyDkv4PplIBcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYGFwcGx5UGFydG5lcmAgfSk7IC8vIOeUs+ivt+WQiOS8meS6ulxyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDIpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYHByZT9pZD0ke2lkfWAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gMykge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgZGlzY291bnQ/aWQ9JHtpZH1gIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDQpIHtcclxuICAgICAgICAvLyB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYHNhbGU/aWQ9JHtpZH1gIH0pOyAvLyDkv4PplIBcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYGFzc2VtYmxlP2lkPSR7aWR9YCB9KTsgLy8g5ou85ZuiXHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gNSkge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgYmFyZ2Fpbj9pZD0ke2lkfWAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gNikge1xyXG4gICAgICAgIC8vIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgYXNzZW1ibGU/aWQ9JHtpZH1gIH0pOyAvLyDmi7zlm6JcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYG1lcmNoYW50P2lkPSR7aWR9YCB9KTsgLy8g54m557qm5ZWG5oi3XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gNykge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgc2Vja2lsbD9pZD0ke2lkfWAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gOCkge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgbW9yZUNoYW5uZWxzP2lkPSR7aWR9YCB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog6Lez6L2s5ZWG5ZOB6K+m5oOFXHJcbiAgICAgKi9cclxuICAgIGp1bXBEZXRhaWxzKGdvb2RzX2lkLCBnb29kc190eXBlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGdvb2RzX2lkLCBnb29kc190eXBlKVxyXG4gICAgICBzd2l0Y2ggKE51bWJlcihnb29kc190eXBlKSkge1xyXG4gICAgICAgIGNhc2UgMDogXHJcbiAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZShgL3BhZ2VzL3Nob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZShgL3BhZ2VzL3NlY2tpbGxTaG9wRGV0YWlscz9nb29kc19pZD0ke2dvb2RzX2lkfWApO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDlupXpg6jlr7zoiKrot7PovaxcclxuICAgICAqL1xyXG4gICAgZ29QYWdlKHVybCwgZXZ0KSB7XHJcbiAgICAgIC8vIOmUgOavgeW9k+WJjemhtXvot7Povax9XHJcbiAgICAgIHRoaXMuJHJlZGlyZWN0KHVybCk7XHJcbiAgICB9LFxyXG4gICAgbmF2U2VhcmNoKCkge1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL3NlYXJjaCcpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgZXZlbnRzID0ge307XHJcbiAgZ2V0QXBwVXNlckluZm8oKSB7XHJcbiAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignZ2xvYmFsRGF0YScpO1xyXG4gICAgICB0aGlzLnVzZXJJbmZvID0gYXBwLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmICh3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJykpIHtcclxuICAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IHJlcyA9PiB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCd1c2VySW5mb1JlYWR5Q2FsbGJhY2snKTtcclxuICAgICAgICB0aGlzLnVzZXJJbmZvID0gYXBwLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUud2FybignZ2V0VXNlckluZm8nKTtcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICAgICAgdGhpcy51c2VySW5mbyA9IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0VXNlckluZm8oZSkge1xyXG4gICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgIGlmIChlLmRldGFpbC5lcnJNc2cgPT0gJ2dldFVzZXJJbmZvOm9rJykge1xyXG4gICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvO1xyXG4gICAgICB0aGlzLnVzZXJJbmZvID0gYXBwLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7fVxyXG59XHJcbiJdfQ==