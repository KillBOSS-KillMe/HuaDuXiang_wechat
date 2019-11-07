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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
      curpage: 1, //当前页数
      isJoin: '' // 商家入驻状态
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

              case 8:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInRpbWVyIiwicmVxdWlyZSIsImFwaSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJjb21wb25lbnRzIiwibmF2IiwibWl4aW5zIiwiZGF0YSIsImNob29lc0lkIiwiaGFzVXNlckluZm8iLCJ1c2VySW5mbyIsInJlcXVlc3RJbWdVcmwiLCJiZWdpblRpbWUiLCJDaG9vZXNEYXRhIiwiaWQiLCJpbWciLCJ0aXRsZSIsImltZ1VybHMiLCJ3eFRpbWVyTGlzdCIsImdvb2RzX2xpc3QiLCJhcmVhQXJyIiwiYmFubmVyQXJyIiwiaGFzbW9yZSIsImN1cnBhZ2UiLCJpc0pvaW4iLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJ0YXBOYW1lIiwidXJsIiwiJG5hdmlnYXRlIiwianVtcERldGFpbHMiLCJnb29kc19pZCIsImdvb2RzX3R5cGUiLCJjb25zb2xlIiwibG9nIiwiTnVtYmVyIiwibmF2U2VhcmNoIiwibG9nb0hhbmxkIiwid3giLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwiZXZlbnRzIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJnZXRBcHBVc2VySW5mbyIsIndlcHkiLCJsb2dpbiIsImdldFRva2VuIiwiY29kZSIsInRoZW4iLCJzZXRTdG9yYWdlU3luYyIsInJlcyIsImRhdGFzIiwiaW5kZXhEZWZhdWx0SW5mbyIsImFyZWEiLCJiYW5uZXIiLCIkYXBwbHkiLCJyZXF1ZXN0SW5kZXhHb29kc0xpc3QiLCJpbmRleEdvb2RzTGlzdCIsInR5cGUiLCJwYWdlIiwibGlzdCIsImNvbmNhdCIsImFwcCIsIndhcm4iLCJjYW5JVXNlIiwidXNlckluZm9SZWFkeUNhbGxiYWNrIiwiZ2V0VXNlckluZm8iLCJzdWNjZXNzIiwiZSIsImRldGFpbCIsImVyck1zZyIsInNldFVzZXJpbmZvIiwibmlja05hbWUiLCJnZW5kZXIiLCJhdmF0YXJVcmwiXSwibWFwcGluZ3Mi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UytELFFBRGY7QUFFSkMsb0JBQVFoRSxTQUFTZ0UsTUFGYjtBQUdKQyx1QkFBV2pFLFNBQVNpRTtBQUhoQjtBQUZILFNBQUw7QUFRRDtBQUNGOzs7d0NBRW1CLENBQUU7OztvQ0FDTDtBQUNmLFVBQUcsS0FBS3JELE9BQVIsRUFBaUI7QUFDZixhQUFLQyxPQUFMO0FBQ0EsYUFBS2tDLHFCQUFMO0FBQ0Q7QUFDRjs7O3NDQUNpQlksQyxFQUFHLENBQ3BCOzs7O0VBNUxnQ3hCLGVBQUtlLEk7O2tCQUFuQjVELEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBuYXYgZnJvbSAnLi4vY29tcG9uZW50cy9uYXYnOyAvLyDlupXpg6jlr7zoiKpcclxudmFyIHRpbWVyID0gcmVxdWlyZSgnLi4vdXRpbHMvd3hUaW1lci5qcycpOyAvLyDlgJLorqHml7ZcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aaW6aG1JyxcclxuICAgIC8vIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZSxcclxuICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCdcclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7XHJcbiAgICBuYXY6IG5hdlxyXG4gIH07XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgY2hvb2VzSWQ6ICcnLFxyXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxyXG4gICAgdXNlckluZm86IHt9LFxyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBiZWdpblRpbWU6ICcxODowMCcsXHJcbiAgICBDaG9vZXNEYXRhOiBbXHJcbiAgICAgIHsgaWQ6ICc3JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxMS5wbmcnLCB0aXRsZTogJ+mZkOaXtuenkuadgCcgfSxcclxuICAgICAgeyBpZDogJzInLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTEyLnBuZycsIHRpdGxlOiAn54m55Y2W6aKE6LStJyB9LFxyXG4gICAgICB7IGlkOiAnNScsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTMucG5nJywgdGl0bGU6ICfnoI3ku7cnIH0sXHJcbiAgICAgIHsgaWQ6ICcxJywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNC5wbmcnLCB0aXRsZTogJ+WQiOS8meS6uicgfSxcclxuICAgICAgeyBpZDogJzMnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE1LnBuZycsIHRpdGxlOiAn56eS6LWa6ZKxJyB9LFxyXG4gICAgICB7IGlkOiAnNCcsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTYucG5nJywgdGl0bGU6ICfpoobliLgnIH0sXHJcbiAgICAgIHsgaWQ6ICc2JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNy5wbmcnLCB0aXRsZTogJ+eJuee6puWVhuaItycgfSxcclxuICAgICAgeyBpZDogJzgnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE4LnBuZycsIHRpdGxlOiAn5pu05aSa6aKR6YGTJyB9XHJcbiAgICBdLFxyXG4gICAgLy8g6L2u5pKtXHJcbiAgICBpbWdVcmxzOiBbXHJcbiAgICAgIHsgaWQ6ICcxJywgaW1nOiAnaW5kZXhsdW5iby5wbmcnIH0sXHJcbiAgICAgIHsgaWQ6ICcyJywgaW1nOiAnaW5kZXhsdW5iby5wbmcnIH0sXHJcbiAgICAgIHsgaWQ6ICczJywgaW1nOiAnaW5kZXhsdW5iby5wbmcnIH0sXHJcbiAgICAgIHsgaWQ6ICc0JywgaW1nOiAnaW5kZXhsdW5iby5wbmcnIH1cclxuICAgIF0sXHJcbiAgICB3eFRpbWVyTGlzdDoge30sIC8vIOWAkuiuoeaXtlxyXG4gICAgZ29vZHNfbGlzdDogW10sIC8vIOWVhuWTgeWIl+ihqFxyXG4gICAgYXJlYUFycjogW10sIC8vIGFyZWHljLrln59cclxuICAgIGJhbm5lckFycjogW10sIC8v6L2u5pKt5Zu+XHJcbiAgICBoYXNtb3JlOiBmYWxzZSwgLy8g5piv5ZCm5pyJ5LiL5LiA6aG1XHJcbiAgICBjdXJwYWdlOiAxLCAvL+W9k+WJjemhteaVsFxyXG4gICAgaXNKb2luOiAnJywgLy8g5ZWG5a625YWl6am754q25oCBXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBhc3luYyBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgdGhpcy5nZXRBcHBVc2VySW5mbygpO1xyXG4gICAgdmFyIGRhdGEgPSBhd2FpdCB3ZXB5LmxvZ2luKCk7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuZ2V0VG9rZW4sXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBjb2RlOiBkYXRhLmNvZGVcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXM9PiB7XHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd1c2VyJywgcmVzLmRhdGFzKVxyXG4gICAgfSlcclxuICAgIC8vIOmmlumhtS3ova7mkq3lm77lkoxhcmVhQXJy6I+c5Y2VXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuaW5kZXhEZWZhdWx0SW5mbyxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHRoaXMuYXJlYUFyciA9IHJlcy5kYXRhcy5hcmVhIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuYmFubmVyQXJyID0gcmVzLmRhdGFzLmJhbm5lciB8fCBbXTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnJlcXVlc3RJbmRleEdvb2RzTGlzdCgpXHJcbiAgfVxyXG4gIFxyXG4gIC8vIOmmlumhteKAlOaZrumAmuWVhuWTgeWIl+ihqOaOpeWPo1xyXG4gIHJlcXVlc3RJbmRleEdvb2RzTGlzdCgpIHtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5pbmRleEdvb2RzTGlzdCxcclxuICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBwYWdlOiAxMCxcclxuICAgICAgICBjdXJwYWdlOiB0aGlzLmN1cnBhZ2VcclxuICAgICAgfSxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHZhciBsaXN0ID0gcmVzLmRhdGFzLmdvb2RzX2xpc3QgfHwgW11cclxuICAgICAgICB0aGlzLmdvb2RzX2xpc3QgPSB0aGlzLmdvb2RzX2xpc3QuY29uY2F0KGxpc3QpXHJcbiAgICAgICAgdGhpcy5oYXNtb3JlID0gcmVzLmhhc21vcmVcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uU2hvdygpIHtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHRhcE5hbWUodXJsLCBpZCkge1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7dXJsOiB1cmx9KVxyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgaWYgKGlkID09IDEpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYGFwcGx5UGFydG5lcmAgfSk7IC8vIOeUs+ivt+WQiOS8meS6ulxyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDIpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYHByZT9pZD0ke2lkfWAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gMykge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgZGlzY291bnQ/aWQ9JHtpZH1gIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDQpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYGFzc2VtYmxlP2lkPSR7aWR9YCB9KTsgLy8g5ou85ZuiXHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gNSkge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgYmFyZ2Fpbj9pZD0ke2lkfWAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gNikge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgbWVyY2hhbnQ/aWQ9JHtpZH1gIH0pOyAvLyDnibnnuqbllYbmiLdcclxuICAgICAgfSBlbHNlIGlmIChpZCA9PSA3KSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBzZWNraWxsP2lkPSR7aWR9YCB9KTtcclxuICAgICAgfSBlbHNlIGlmIChpZCA9PSA4KSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBtb3JlQ2hhbm5lbHM/aWQ9JHtpZH1gIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAganVtcERldGFpbHMoZ29vZHNfaWQsIGdvb2RzX3R5cGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZ29vZHNfaWQsIGdvb2RzX3R5cGUpXHJcbiAgICAgIHN3aXRjaCAoTnVtYmVyKGdvb2RzX3R5cGUpKSB7XHJcbiAgICAgICAgY2FzZSAwOiBcclxuICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKGAvcGFnZXMvc2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKGAvcGFnZXMvc2Vja2lsbFNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBuYXZTZWFyY2goKSB7XHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKCcvcGFnZXMvc2VhcmNoJyk7XHJcbiAgICB9LFxyXG4gICAgbG9nb0hhbmxkKCl7XHJcbiAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgdXJsczogWycvYXNzZXRzL2ltZy9sb2dvLnBuZyddXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfTtcclxuICBldmVudHMgPSB7fTtcclxuICBnZXRBcHBVc2VySW5mbygpIHtcclxuICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICBpZiAoYXBwLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgY29uc29sZS53YXJuKCdnbG9iYWxEYXRhJyk7XHJcbiAgICAgIHRoaXMudXNlckluZm8gPSBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0gZWxzZSBpZiAod3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpKSB7XHJcbiAgICAgIGFwcC51c2VySW5mb1JlYWR5Q2FsbGJhY2sgPSByZXMgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUud2FybigndXNlckluZm9SZWFkeUNhbGxiYWNrJyk7XHJcbiAgICAgICAgdGhpcy51c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgICB0aGlzLmhhc1VzZXJJbmZvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUud2FybignZ2V0VXNlckluZm8nKTtcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICAgICAgdGhpcy51c2VySW5mbyA9IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0VXNlckluZm8oZSkge1xyXG4gICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgIGlmIChlLmRldGFpbC5lcnJNc2cgPT0gJ2dldFVzZXJJbmZvOm9rJykge1xyXG4gICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvO1xyXG4gICAgICB0aGlzLnVzZXJJbmZvID0gYXBwLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgICB2YXIgdXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xyXG4gICAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5zZXRVc2VyaW5mbyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBuaWNrTmFtZTogdXNlckluZm8ubmlja05hbWUsXHJcbiAgICAgICAgICBnZW5kZXI6IHVzZXJJbmZvLmdlbmRlcixcclxuICAgICAgICAgIGF2YXRhclVybDogdXNlckluZm8uYXZhdGFyVXJsXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7fVxyXG4gIG9uUmVhY2hCb3R0b20gKCkge1xyXG4gICAgaWYodGhpcy5oYXNtb3JlKSB7XHJcbiAgICAgIHRoaXMuY3VycGFnZSArKyBcclxuICAgICAgdGhpcy5yZXF1ZXN0SW5kZXhHb29kc0xpc3QoKVxyXG4gICAgfVxyXG4gIH1cclxuICBvblB1bGxEb3duUmVmcmVzaChlKSB7XHJcbiAgfVxyXG59XHJcbiJdfQ==