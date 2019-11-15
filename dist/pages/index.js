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

var _pas_popup = require('./../components/pas_popup.js');

var _pas_popup2 = _interopRequireDefault(_pas_popup);

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
      navigationBarTitleText: '首页'
    }, _this.$repeat = {}, _this.$props = { "paspopup": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:pasFlag.sync": "pasFlag", "v-bind:pasPrice.sync": "pasPrice" } }, _this.$events = { "paspopup": { "v-on:pasHanld": "pasHanld" } }, _this.components = {
      nav: _nav2.default,
      paspopup: _pas_popup2.default
    }, _this.mixins = [], _this.data = {
      pasFlag: false, // 余额支付
      pasPrice: '1000', // 余额支付
      chooesId: '',
      hasUserInfo: false,
      userInfo: {},
      requestImgUrl: '',
      beginTime: '18:00',
      ChooesData: [{ id: '7', img: '/assets/img/image11.png', title: '限时秒杀' }, { id: '2', img: '/assets/img/image12.png', title: '特卖预购' }, { id: '5', img: '/assets/img/image13.png', title: '砍价' }, { id: '1', img: '/assets/img/image14.png', title: '合伙人' }, { id: '3', img: '/assets/img/image15.png', title: '秒赚钱' }, { id: '4', img: '/assets/img/image16.png', title: '领券' }, { id: '6', img: '/assets/img/image17.png', title: '特约商户' }, { id: '8', img: '/assets/img/image18.png', title: '更多频道' }],
      // 轮播
      imgUrls: [],
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
      // 余额支付密码回调
      pasHanld: function pasHanld(e) {
        console.log(e);
        this.pasFlag = false;
      },
      tapName: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, id) {
          var that, resData;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  that = this;

                  if (!(url == 'discount')) {
                    _context.next = 8;
                    break;
                  }

                  _context.next = 4;
                  return (0, _ajax.ajax)({ url: api.fxMemberApply });

                case 4:
                  resData = _context.sent;

                  if (!(resData.datas.state != 2)) {
                    _context.next = 8;
                    break;
                  }

                  wx.showModal({
                    content: '申请成为分销员?',
                    success: function success(res) {
                      if (res.confirm) {
                        that.$navigate('distribution');
                      }
                    }
                  });
                  return _context.abrupt('return', false);

                case 8:
                  console.log(url);
                  this.$navigate({ url: url });

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function tapName(_x, _x2) {
          return _ref2.apply(this, arguments);
        }

        return tapName;
      }(),
      jumpDetails: function jumpDetails(goods_id, goods_type) {
        this.$navigate('/pages/shopDetails?goods_id=' + goods_id);
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
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.requestImgUrl = this.$parent.globalData.requestImgUrl;
                this.getAppUserInfo();
                _context2.next = 4;
                return _wepy2.default.login();

              case 4:
                data = _context2.sent;

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
                  _this2.goods_list_yushou = res.datas.goods_list_yushou.list || [];
                  _this2.goods_list_miaosha = res.datas.goods_list.list || [];
                  _this2.$apply();
                });

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onLoad() {
        return _ref3.apply(this, arguments);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInRpbWVyIiwicmVxdWlyZSIsImFwaSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hdiIsInBhc3BvcHVwIiwibWl4aW5zIiwiZGF0YSIsInBhc0ZsYWciLCJwYXNQcmljZSIsImNob29lc0lkIiwiaGFzVXNlckluZm8iLCJ1c2VySW5mbyIsInJlcXVlc3RJbWdVcmwiLCJiZWdpblRpbWUiLCJDaG9vZXNEYXRhIiwiaWQiLCJpbWciLCJ0aXRsZSIsImltZ1VybHMiLCJ3eFRpbWVyTGlzdCIsImdvb2RzX2xpc3QiLCJhcmVhQXJyIiwiYmFubmVyQXJyIiwiaGFzbW9yZSIsImN1cnBhZ2UiLCJpc0pvaW4iLCJnb29kc19saXN0X3l1c2hvdSIsImdvb2RzX2xpc3RfbWlhb3NoYSIsImNvbXB1dGVkIiwibWV0aG9kcyIsInBhc0hhbmxkIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJ0YXBOYW1lIiwidXJsIiwidGhhdCIsImZ4TWVtYmVyQXBwbHkiLCJyZXNEYXRhIiwiZGF0YXMiLCJzdGF0ZSIsInd4Iiwic2hvd01vZGFsIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiJG5hdmlnYXRlIiwianVtcERldGFpbHMiLCJnb29kc19pZCIsImdvb2RzX3R5cGUiLCJuYXZTZWFyY2giLCJsb2dvSGFubGQiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwiZXZlbnRzIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJnZXRBcHBVc2VySW5mbyIsIndlcHkiLCJsb2dpbiIsImdldFRva2VuIiwiY29kZSIsInRoZW4iLCJzZXRTdG9yYWdlU3luYyIsImluZGV4RGVmYXVsdEluZm8iLCJhcmVhIiwiYmFubmVyIiwiJGFwcGx5IiwicmVxdWVzdEluZGV4R29vZHNMaXN0IiwiZ29vZHNHYmxpc3QiLCJsaXN0IiwiaW5kZXhHb29kc0xpc3QiLCJ0eXBlIiwicGFnZSIsImNvbmNhdCIsImFwcCIsIndhcm4iLCJjYW5JVXNlIiwidXNlckluZm9SZWFkeUNhbGxiYWNrIiwiZ2V0VXNlckluZm8iLCJkZXRhaWwiLCJlcnJNc2ciLCJzZXRVc2VyaW5mbyIsIm5pY2tOYW1lIiwiZ2VuZGVyIiwiYXZhdGFyVXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBTHFDO0FBQ3JDLElBQUlBLFFBQVFDLFFBQVEscUJBQVIsQ0FBWixDLENBQTRDO0FBQzVDLElBQUlDLE1BQU1ELFFBQVEsV0FBUixDQUFWOztBQUdnRDs7O0lBRzNCRSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsY0FBYSxFQUFkLEVBQWlCLGdCQUFlLEVBQWhDLEVBQW1DLHVCQUFzQixTQUF6RCxFQUFtRSx3QkFBdUIsVUFBMUYsRUFBWixFLFFBQ1RDLE8sR0FBVSxFQUFDLFlBQVcsRUFBQyxpQkFBZ0IsVUFBakIsRUFBWixFLFFBQ1RDLFUsR0FBYTtBQUNWQyxXQUFLQSxhQURLO0FBRVZDO0FBRlUsSyxRQUtaQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsZUFBUyxLQURKLEVBQ1k7QUFDakJDLGdCQUFVLE1BRkwsRUFFYTtBQUNsQkMsZ0JBQVUsRUFITDtBQUlMQyxtQkFBYSxLQUpSO0FBS0xDLGdCQUFVLEVBTEw7QUFNTEMscUJBQWUsRUFOVjtBQU9MQyxpQkFBVyxPQVBOO0FBUUxDLGtCQUFZLENBQ1YsRUFBRUMsSUFBSSxHQUFOLEVBQVdDLEtBQUsseUJBQWhCLEVBQTJDQyxPQUFPLE1BQWxELEVBRFUsRUFFVixFQUFFRixJQUFJLEdBQU4sRUFBV0MsS0FBSyx5QkFBaEIsRUFBMkNDLE9BQU8sTUFBbEQsRUFGVSxFQUdWLEVBQUVGLElBQUksR0FBTixFQUFXQyxLQUFL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VUFBSixDQUFlOUMsUUFBZixHQUEwQm9CLEVBQUVrRCxNQUFGLENBQVN0RSxRQUFuQztBQUNBLGFBQUtBLFFBQUwsR0FBZ0JpRSxJQUFJbkIsVUFBSixDQUFlOUMsUUFBL0I7QUFDQSxhQUFLRCxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsWUFBSUMsV0FBV29CLEVBQUVrRCxNQUFGLENBQVN0RSxRQUF4QjtBQUNBLHdCQUFLO0FBQ0h3QixlQUFLeEMsSUFBSXdGLFdBRE47QUFFSDdFLGdCQUFNO0FBQ0o4RSxzQkFBVXpFLFNBQVN5RSxRQURmO0FBRUpDLG9CQUFRMUUsU0FBUzBFLE1BRmI7QUFHSkMsdUJBQVczRSxTQUFTMkU7QUFIaEI7QUFGSCxTQUFMO0FBUUQ7QUFDRjs7O3dDQUVtQixDQUFFOzs7b0NBQ0w7QUFDZixVQUFHLEtBQUsvRCxPQUFSLEVBQWlCO0FBQ2YsYUFBS0MsT0FBTDtBQUNBLGFBQUs2QyxxQkFBTDtBQUNEO0FBQ0Y7OztzQ0FDaUJ0QyxDLEVBQUcsQ0FDcEI7Ozs7RUFwTWdDNEIsZUFBS2UsSTs7a0JBQW5COUUsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG5hdiBmcm9tICcuLi9jb21wb25lbnRzL25hdic7IC8vIOW6lemDqOWvvOiIqlxyXG52YXIgdGltZXIgPSByZXF1aXJlKCcuLi91dGlscy93eFRpbWVyLmpzJyk7IC8vIOWAkuiuoeaXtlxyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcbmltcG9ydCBwYXNwb3B1cCBmcm9tICcuLi9jb21wb25lbnRzL3Bhc19wb3B1cCc7IC8vIOW6lemDqOWvvOiIqlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aaW6aG1J1xyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInBhc3BvcHVwXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhc0ZsYWcuc3luY1wiOlwicGFzRmxhZ1wiLFwidi1iaW5kOnBhc1ByaWNlLnN5bmNcIjpcInBhc1ByaWNlXCJ9fTtcclxuJGV2ZW50cyA9IHtcInBhc3BvcHVwXCI6e1widi1vbjpwYXNIYW5sZFwiOlwicGFzSGFubGRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIG5hdjogbmF2LFxyXG4gICAgcGFzcG9wdXBcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHBhc0ZsYWc6IGZhbHNlLCAgLy8g5L2Z6aKd5pSv5LuYXHJcbiAgICBwYXNQcmljZTogJzEwMDAnLCAvLyDkvZnpop3mlK/ku5hcclxuICAgIGNob29lc0lkOiAnJyxcclxuICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcclxuICAgIHVzZXJJbmZvOiB7fSxcclxuICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgYmVnaW5UaW1lOiAnMTg6MDAnLFxyXG4gICAgQ2hvb2VzRGF0YTogW1xyXG4gICAgICB7IGlkOiAnNycsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTEucG5nJywgdGl0bGU6ICfpmZDml7bnp5LmnYAnIH0sXHJcbiAgICAgIHsgaWQ6ICcyJywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxMi5wbmcnLCB0aXRsZTogJ+eJueWNlumihOi0rScgfSxcclxuICAgICAgeyBpZDogJzUnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTEzLnBuZycsIHRpdGxlOiAn56CN5Lu3JyB9LFxyXG4gICAgICB7IGlkOiAnMScsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTQucG5nJywgdGl0bGU6ICflkIjkvJnkuronIH0sXHJcbiAgICAgIHsgaWQ6ICczJywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNS5wbmcnLCB0aXRsZTogJ+enkui1mumSsScgfSxcclxuICAgICAgeyBpZDogJzQnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE2LnBuZycsIHRpdGxlOiAn6aKG5Yi4JyB9LFxyXG4gICAgICB7IGlkOiAnNicsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTcucG5nJywgdGl0bGU6ICfnibnnuqbllYbmiLcnIH0sXHJcbiAgICAgIHsgaWQ6ICc4JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxOC5wbmcnLCB0aXRsZTogJ+abtOWkmumikemBkycgfVxyXG4gICAgXSxcclxuICAgIC8vIOi9ruaSrVxyXG4gICAgaW1nVXJsczogW10sXHJcbiAgICB3eFRpbWVyTGlzdDoge30sIC8vIOWAkuiuoeaXtlxyXG4gICAgZ29vZHNfbGlzdDogW10sIC8vIOWVhuWTgeWIl+ihqFxyXG4gICAgYXJlYUFycjogW10sIC8vIGFyZWHljLrln59cclxuICAgIGJhbm5lckFycjogW10sIC8v6L2u5pKt5Zu+XHJcbiAgICBoYXNtb3JlOiBmYWxzZSwgLy8g5piv5ZCm5pyJ5LiL5LiA6aG1XHJcbiAgICBjdXJwYWdlOiAxLCAvL+W9k+WJjemhteaVsFxyXG4gICAgaXNKb2luOiAnJywgLy8g5ZWG5a625YWl6am754q25oCBXHJcbiAgICBnb29kc19saXN0X3l1c2hvdTogW10sXHJcbiAgICBnb29kc19saXN0X21pYW9zaGE6IFtdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBhc3luYyBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgdGhpcy5nZXRBcHBVc2VySW5mbygpO1xyXG4gICAgdmFyIGRhdGEgPSBhd2FpdCB3ZXB5LmxvZ2luKCk7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuZ2V0VG9rZW4sXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBjb2RlOiBkYXRhLmNvZGVcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXM9PiB7XHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd1c2VyJywgcmVzLmRhdGFzKVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyDpppbpobUt6L2u5pKt5Zu+5ZKMYXJlYUFycuiPnOWNlVxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmluZGV4RGVmYXVsdEluZm8sXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLmFyZWFBcnIgPSByZXMuZGF0YXMuYXJlYSB8fCBbXTtcclxuICAgICAgICB0aGlzLmJhbm5lckFyciA9IHJlcy5kYXRhcy5iYW5uZXIgfHwgW107XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZXF1ZXN0SW5kZXhHb29kc0xpc3QoKVxyXG5cclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5nb29kc0dibGlzdFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLmdvb2RzX2xpc3RfeXVzaG91ID0gcmVzLmRhdGFzLmdvb2RzX2xpc3RfeXVzaG91Lmxpc3QgfHwgW11cclxuICAgICAgdGhpcy5nb29kc19saXN0X21pYW9zaGEgPSByZXMuZGF0YXMuZ29vZHNfbGlzdC5saXN0IHx8IFtdXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIFxyXG4gIC8vIOmmlumhteKAlOaZrumAmuWVhuWTgeWIl+ihqOaOpeWPo1xyXG4gIHJlcXVlc3RJbmRleEdvb2RzTGlzdCgpIHtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5pbmRleEdvb2RzTGlzdCxcclxuICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBwYWdlOiAxMCxcclxuICAgICAgICBjdXJwYWdlOiB0aGlzLmN1cnBhZ2VcclxuICAgICAgfSxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHZhciBsaXN0ID0gcmVzLmRhdGFzLmdvb2RzX2xpc3QgfHwgW11cclxuICAgICAgICB0aGlzLmdvb2RzX2xpc3QgPSB0aGlzLmdvb2RzX2xpc3QuY29uY2F0KGxpc3QpXHJcbiAgICAgICAgdGhpcy5oYXNtb3JlID0gcmVzLmhhc21vcmVcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uU2hvdygpIHtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOS9memineaUr+S7mOWvhueggeWbnuiwg1xyXG4gICAgcGFzSGFubGQoZSl7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICAgIHRoaXMucGFzRmxhZyA9IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgdGFwTmFtZSh1cmwsIGlkKSB7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICBpZih1cmwgPT0gJ2Rpc2NvdW50Jykge1xyXG4gICAgICAgIC8vIOeUs+ivt+aIkOS4uuWIhumUgOWVhlxyXG4gICAgICAgIHZhciByZXNEYXRhID0gYXdhaXQgYWpheCh7dXJsOiBhcGkuZnhNZW1iZXJBcHBseX0pO1xyXG4gICAgICAgIGlmKHJlc0RhdGEuZGF0YXMuc3RhdGUgIT0gMikge1xyXG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgY29udGVudDogJ+eUs+ivt+aIkOS4uuWIhumUgOWRmD8nLFxyXG4gICAgICAgICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuJG5hdmlnYXRlKCdkaXN0cmlidXRpb24nKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyh1cmwpXHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKHt1cmw6IHVybH0pXHJcbiAgICB9LFxyXG4gICAganVtcERldGFpbHMoZ29vZHNfaWQsIGdvb2RzX3R5cGUpIHtcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoYC9wYWdlcy9zaG9wRGV0YWlscz9nb29kc19pZD0ke2dvb2RzX2lkfWApO1xyXG4gICAgfSxcclxuICAgIG5hdlNlYXJjaCgpIHtcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9zZWFyY2gnKTtcclxuICAgIH0sXHJcbiAgICBsb2dvSGFubGQoKXtcclxuICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICB1cmxzOiBbJy9hc3NldHMvaW1nL2xvZ28ucG5nJ11cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbiAgZ2V0QXBwVXNlckluZm8oKSB7XHJcbiAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignZ2xvYmFsRGF0YScpO1xyXG4gICAgICB0aGlzLnVzZXJJbmZvID0gYXBwLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9IGVsc2UgaWYgKHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSkge1xyXG4gICAgICBhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrID0gcmVzID0+IHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ3VzZXJJbmZvUmVhZHlDYWxsYmFjaycpO1xyXG4gICAgICAgIHRoaXMudXNlckluZm8gPSByZXMudXNlckluZm87XHJcbiAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ2dldFVzZXJJbmZvJyk7XHJcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgICAgIHRoaXMudXNlckluZm8gPSBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgICAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFVzZXJJbmZvKGUpIHtcclxuICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICBpZiAoZS5kZXRhaWwuZXJyTXNnID09ICdnZXRVc2VySW5mbzpvaycpIHtcclxuICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mbztcclxuICAgICAgdGhpcy51c2VySW5mbyA9IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgICB0aGlzLmhhc1VzZXJJbmZvID0gdHJ1ZTtcclxuICAgICAgdmFyIHVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkuc2V0VXNlcmluZm8sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgbmlja05hbWU6IHVzZXJJbmZvLm5pY2tOYW1lLFxyXG4gICAgICAgICAgZ2VuZGVyOiB1c2VySW5mby5nZW5kZXIsXHJcbiAgICAgICAgICBhdmF0YXJVcmw6IHVzZXJJbmZvLmF2YXRhclVybFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge31cclxuICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgIGlmKHRoaXMuaGFzbW9yZSkge1xyXG4gICAgICB0aGlzLmN1cnBhZ2UgKysgXHJcbiAgICAgIHRoaXMucmVxdWVzdEluZGV4R29vZHNMaXN0KClcclxuICAgIH1cclxuICB9XHJcbiAgb25QdWxsRG93blJlZnJlc2goZSkge1xyXG4gIH1cclxuXHJcbn1cclxuIl19