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

var _painter = require('./../components/painter/painter.js');

var _painter2 = _interopRequireDefault(_painter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 底部导航
var timer = require('./../utils/wxTimer.js'); // 倒计时
var api = require('./../api.js');

// 底部导航

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
      nav: _nav2.default,
      Painter: _painter2.default
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
      curpage: 1, //当前页数
      isJoin: '', // 商家入驻状态
      goods_list_yushou: [],
      goods_list_miaosha: []
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
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.requestImgUrl = this.$parent.globalData.requestImgUrl;
                this.getAppUserInfo();
                _context.next = 4;
                return _wepy2.default.login();

              case 4:
                data = _context.sent;

                (0, _ajax.ajax)({
                  url: api.getToken,
                  data: {
                    code: data.code
                  }
                }).then(function (res) {
                  wx.setStorageSync('user', res.datas);
                });
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

                (0, _ajax.ajax)({
                  url: api.goodsGblist
                }).then(function (res) {
                  _this2.goods_list_yushou = res.datas.goods_list_yushou || [];
                  _this2.goods_list_miaosha = res.datas.goods_list || [];
                  _this2.$apply();
                });

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLoad() {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()

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
        var userInfo = e.detail.userInfo;
        (0, _ajax.ajax)({
          url: api.setUserinfo,
          data: {
            nickName: userInfo.nickName,
            gender: userInfo.gender,
            avatarUrl: userInfo.avatarUrl
          }
        });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInRpbWVyIiwicmVxdWlyZSIsImFwaSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJjb21wb25lbnRzIiwibmF2IiwiUGFpbnRlciIsIm1peGlucyIsImRhdGEiLCJjaG9vZXNJZCIsImhhc1VzZXJJbmZvIiwidXNlckluZm8iLCJyZXF1ZXN0SW1nVXJsIiwiYmVnaW5UaW1lIiwiQ2hvb2VzRGF0YSIsImlkIiwiaW1nIiwidGl0bGUiLCJpbWdVcmxzIiwid3hUaW1lckxpc3QiLCJnb29kc19saXN0IiwiYXJlYUFyciIsImJhbm5lckFyciIsImhhc21vcmUiLCJjdXJwYWdlIiwiaXNKb2luIiwiZ29vZHNfbGlzdF95dXNob3UiLCJnb29kc19saXN0X21pYW9zaGEiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJ0YXBOYW1lIiwidXJsIiwiJG5hdmlnYXRlIiwianVtcERldGFpbHMiLCJnb29kc19pZCIsImdvb2RzX3R5cGUiLCJjb25zb2xlIiwibG9nIiwiTnVtYmVyIiwibmF2U2VhcmNoIiwibG9nb0hhbmxkIiwid3giLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwiZXZlbnRzIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJnZXRBcHBVc2VySW5mbyIsIndlcHkiLCJsb2dpbiIsImdldFRva2VuIiwiY29kZSIsInRoZW4iLCJzZXRTdG9yYWdlU3luYyIsInJlcyIsImRhdGFzIiwiaW5kZXhEZWZhdWx0SW5mbyIsImFyZWEiLCJiYW5uZXIiLCIkYXBwbHkiLCJyZXF1ZXN0SW5kZXhHb29kc0xpc3QiLCJnb29kc0dibGlzdCIsImluZGV4R29vZHNMaXN0IiwidHlwZSIsInBhZ2UiLCJsaXN0IiwiY29uY2F0IiwiYXBwIiwid2FybiIsImNhbklVc2UiLCJ1c2VySW5mb1JlYWR5Q2FsbGJhY2siLCJnZXRVc2VySW5mbyIsInN1Y2Nlc3MiLCJlIiwiZGV0YWlsIiwi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O0FBUFksU0FBZjtBQVNEO0FBQ0Y7OztnQ0FDV2MsQyxFQUFHO0FBQ2IsVUFBSU4sTUFBTSxLQUFLdEIsT0FBZjtBQUNBLFVBQUk0QixFQUFFQyxNQUFGLENBQVNDLE1BQVQsSUFBbUIsZ0JBQXZCLEVBQXlDO0FBQ3ZDUixZQUFJckIsVUFBSixDQUFlbkMsUUFBZixHQUEwQjhELEVBQUVDLE1BQUYsQ0FBUy9ELFFBQW5DO0FBQ0EsYUFBS0EsUUFBTCxHQUFnQndELElBQUlyQixVQUFKLENBQWVuQyxRQUEvQjtBQUNBLGFBQUtELFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxZQUFJQyxXQUFXOEQsRUFBRUMsTUFBRixDQUFTL0QsUUFBeEI7QUFDQSx3QkFBSztBQUNIb0IsZUFBS2hDLElBQUk2RSxXQUROO0FBRUhwRSxnQkFBTTtBQUNKcUUsc0JBQVVsRSxTQUFTa0UsUUFEZjtBQUVKQyxvQkFBUW5FLFNBQVNtRSxNQUZiO0FBR0pDLHVCQUFXcEUsU0FBU29FO0FBSGhCO0FBRkgsU0FBTDtBQVFEO0FBQ0Y7Ozt3Q0FFbUIsQ0FBRTs7O29DQUNMO0FBQ2YsVUFBRyxLQUFLeEQsT0FBUixFQUFpQjtBQUNmLGFBQUtDLE9BQUw7QUFDQSxhQUFLb0MscUJBQUw7QUFDRDtBQUNGOzs7c0NBQ2lCYSxDLEVBQUcsQ0FDcEI7Ozs7RUF2TWdDekIsZUFBS2dCLEk7O2tCQUFuQmhFLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBuYXYgZnJvbSAnLi4vY29tcG9uZW50cy9uYXYnOyAvLyDlupXpg6jlr7zoiKpcclxudmFyIHRpbWVyID0gcmVxdWlyZSgnLi4vdXRpbHMvd3hUaW1lci5qcycpOyAvLyDlgJLorqHml7ZcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5pbXBvcnQgUGFpbnRlciBmcm9tICcuLi9jb21wb25lbnRzL3BhaW50ZXIvcGFpbnRlcic7IC8vIOW6lemDqOWvvOiIqlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpppbpobUnLFxyXG4gICAgLy8gZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlLFxyXG4gICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0J1xyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHtcclxuICAgIG5hdjogbmF2LFxyXG4gICAgUGFpbnRlcjogUGFpbnRlclxyXG4gIH07XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgY2hvb2VzSWQ6ICcnLFxyXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxyXG4gICAgdXNlckluZm86IHt9LFxyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBiZWdpblRpbWU6ICcxODowMCcsXHJcbiAgICBDaG9vZXNEYXRhOiBbXHJcbiAgICAgIHsgaWQ6ICc3JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxMS5wbmcnLCB0aXRsZTogJ+mZkOaXtuenkuadgCcgfSxcclxuICAgICAgeyBpZDogJzInLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTEyLnBuZycsIHRpdGxlOiAn54m55Y2W6aKE6LStJyB9LFxyXG4gICAgICB7IGlkOiAnNScsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTMucG5nJywgdGl0bGU6ICfnoI3ku7cnIH0sXHJcbiAgICAgIHsgaWQ6ICcxJywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNC5wbmcnLCB0aXRsZTogJ+WQiOS8meS6uicgfSxcclxuICAgICAgeyBpZDogJzMnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE1LnBuZycsIHRpdGxlOiAn56eS6LWa6ZKxJyB9LFxyXG4gICAgICB7IGlkOiAnNCcsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTYucG5nJywgdGl0bGU6ICfpoobliLgnIH0sXHJcbiAgICAgIHsgaWQ6ICc2JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNy5wbmcnLCB0aXRsZTogJ+eJuee6puWVhuaItycgfSxcclxuICAgICAgeyBpZDogJzgnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE4LnBuZycsIHRpdGxlOiAn5pu05aSa6aKR6YGTJyB9XHJcbiAgICBdLFxyXG4gICAgLy8g6L2u5pKtXHJcbiAgICBpbWdVcmxzOiBbXHJcbiAgICAgIHsgaWQ6ICcxJywgaW1nOiAnaW5kZXhsdW5iby5wbmcnIH0sXHJcbiAgICAgIHsgaWQ6ICcyJywgaW1nOiAnaW5kZXhsdW5iby5wbmcnIH0sXHJcbiAgICAgIHsgaWQ6ICczJywgaW1nOiAnaW5kZXhsdW5iby5wbmcnIH0sXHJcbiAgICAgIHsgaWQ6ICc0JywgaW1nOiAnaW5kZXhsdW5iby5wbmcnIH1cclxuICAgIF0sXHJcbiAgICB3eFRpbWVyTGlzdDoge30sIC8vIOWAkuiuoeaXtlxyXG4gICAgZ29vZHNfbGlzdDogW10sIC8vIOWVhuWTgeWIl+ihqFxyXG4gICAgYXJlYUFycjogW10sIC8vIGFyZWHljLrln59cclxuICAgIGJhbm5lckFycjogW10sIC8v6L2u5pKt5Zu+XHJcbiAgICBoYXNtb3JlOiBmYWxzZSwgLy8g5piv5ZCm5pyJ5LiL5LiA6aG1XHJcbiAgICBjdXJwYWdlOiAxLCAvL+W9k+WJjemhteaVsFxyXG4gICAgaXNKb2luOiAnJywgLy8g5ZWG5a625YWl6am754q25oCBXHJcbiAgICBnb29kc19saXN0X3l1c2hvdTogW10sXHJcbiAgICBnb29kc19saXN0X21pYW9zaGE6IFtdLFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgYXN5bmMgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICAgIHRoaXMuZ2V0QXBwVXNlckluZm8oKTtcclxuICAgIHZhciBkYXRhID0gYXdhaXQgd2VweS5sb2dpbigpO1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmdldFRva2VuLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgY29kZTogZGF0YS5jb2RlXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzPT4ge1xyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlcicsIHJlcy5kYXRhcylcclxuICAgIH0pXHJcbiAgICAvLyDpppbpobUt6L2u5pKt5Zu+5ZKMYXJlYUFycuiPnOWNlVxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmluZGV4RGVmYXVsdEluZm8sXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLmFyZWFBcnIgPSByZXMuZGF0YXMuYXJlYSB8fCBbXTtcclxuICAgICAgICB0aGlzLmJhbm5lckFyciA9IHJlcy5kYXRhcy5iYW5uZXIgfHwgW107XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZXF1ZXN0SW5kZXhHb29kc0xpc3QoKVxyXG5cclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5nb29kc0dibGlzdFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLmdvb2RzX2xpc3RfeXVzaG91ID0gcmVzLmRhdGFzLmdvb2RzX2xpc3RfeXVzaG91IHx8IFtdXHJcbiAgICAgIHRoaXMuZ29vZHNfbGlzdF9taWFvc2hhID0gcmVzLmRhdGFzLmdvb2RzX2xpc3QgfHwgW11cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgXHJcbiAgLy8g6aaW6aG14oCU5pmu6YCa5ZWG5ZOB5YiX6KGo5o6l5Y+jXHJcbiAgcmVxdWVzdEluZGV4R29vZHNMaXN0KCkge1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmluZGV4R29vZHNMaXN0LFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHBhZ2U6IDEwLFxyXG4gICAgICAgIGN1cnBhZ2U6IHRoaXMuY3VycGFnZVxyXG4gICAgICB9LFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdmFyIGxpc3QgPSByZXMuZGF0YXMuZ29vZHNfbGlzdCB8fCBbXVxyXG4gICAgICAgIHRoaXMuZ29vZHNfbGlzdCA9IHRoaXMuZ29vZHNfbGlzdC5jb25jYXQobGlzdClcclxuICAgICAgICB0aGlzLmhhc21vcmUgPSByZXMuaGFzbW9yZVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25TaG93KCkge1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgdGFwTmFtZSh1cmwsIGlkKSB7XHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKHt1cmw6IHVybH0pXHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICBpZiAoaWQgPT0gMSkge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgYXBwbHlQYXJ0bmVyYCB9KTsgLy8g55Sz6K+35ZCI5LyZ5Lq6XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gMikge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgcHJlP2lkPSR7aWR9YCB9KTtcclxuICAgICAgfSBlbHNlIGlmIChpZCA9PSAzKSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBkaXNjb3VudD9pZD0ke2lkfWAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gNCkge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgYXNzZW1ibGU/aWQ9JHtpZH1gIH0pOyAvLyDmi7zlm6JcclxuICAgICAgfSBlbHNlIGlmIChpZCA9PSA1KSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBiYXJnYWluP2lkPSR7aWR9YCB9KTtcclxuICAgICAgfSBlbHNlIGlmIChpZCA9PSA2KSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBtZXJjaGFudD9pZD0ke2lkfWAgfSk7IC8vIOeJuee6puWVhuaIt1xyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDcpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYHNlY2tpbGw/aWQ9JHtpZH1gIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDgpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYG1vcmVDaGFubmVscz9pZD0ke2lkfWAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBqdW1wRGV0YWlscyhnb29kc19pZCwgZ29vZHNfdHlwZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhnb29kc19pZCwgZ29vZHNfdHlwZSlcclxuICAgICAgc3dpdGNoIChOdW1iZXIoZ29vZHNfdHlwZSkpIHtcclxuICAgICAgICBjYXNlIDA6IFxyXG4gICAgICAgICAgdGhpcy4kbmF2aWdhdGUoYC9wYWdlcy9zaG9wRGV0YWlscz9nb29kc19pZD0ke2dvb2RzX2lkfWApO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgdGhpcy4kbmF2aWdhdGUoYC9wYWdlcy9zZWNraWxsU2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG5hdlNlYXJjaCgpIHtcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9zZWFyY2gnKTtcclxuICAgIH0sXHJcbiAgICBsb2dvSGFubGQoKXtcclxuICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICB1cmxzOiBbJy9hc3NldHMvaW1nL2xvZ28ucG5nJ11cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9O1xyXG4gIGV2ZW50cyA9IHt9O1xyXG4gIGdldEFwcFVzZXJJbmZvKCkge1xyXG4gICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgIGlmIChhcHAuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ2dsb2JhbERhdGEnKTtcclxuICAgICAgdGhpcy51c2VySW5mbyA9IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgICB0aGlzLmhhc1VzZXJJbmZvID0gdHJ1ZTtcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSBlbHNlIGlmICh3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJykpIHtcclxuICAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IHJlcyA9PiB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCd1c2VySW5mb1JlYWR5Q2FsbGJhY2snKTtcclxuICAgICAgICB0aGlzLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKCdnZXRVc2VySW5mbycpO1xyXG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm87XHJcbiAgICAgICAgICB0aGlzLnVzZXJJbmZvID0gYXBwLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICAgICAgICB0aGlzLmhhc1VzZXJJbmZvID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRVc2VySW5mbyhlKSB7XHJcbiAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgaWYgKGUuZGV0YWlsLmVyck1zZyA9PSAnZ2V0VXNlckluZm86b2snKSB7XHJcbiAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm87XHJcbiAgICAgIHRoaXMudXNlckluZm8gPSBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgIHZhciB1c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLnNldFVzZXJpbmZvLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIG5pY2tOYW1lOiB1c2VySW5mby5uaWNrTmFtZSxcclxuICAgICAgICAgIGdlbmRlcjogdXNlckluZm8uZ2VuZGVyLFxyXG4gICAgICAgICAgYXZhdGFyVXJsOiB1c2VySW5mby5hdmF0YXJVcmxcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHt9XHJcbiAgb25SZWFjaEJvdHRvbSAoKSB7XHJcbiAgICBpZih0aGlzLmhhc21vcmUpIHtcclxuICAgICAgdGhpcy5jdXJwYWdlICsrIFxyXG4gICAgICB0aGlzLnJlcXVlc3RJbmRleEdvb2RzTGlzdCgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uUHVsbERvd25SZWZyZXNoKGUpIHtcclxuICB9XHJcbn1cclxuIl19