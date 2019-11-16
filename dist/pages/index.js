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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInRpbWVyIiwicmVxdWlyZSIsImFwaSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hdiIsInBhc3BvcHVwIiwibWl4aW5zIiwiZGF0YSIsInBhc0ZsYWciLCJwYXNQcmljZSIsImNob29lc0lkIiwiaGFzVXNlckluZm8iLCJ1c2VySW5mbyIsInJlcXVlc3RJbWdVcmwiLCJiZWdpblRpbWUiLCJDaG9vZXNEYXRhIiwiaWQiLCJpbWciLCJ0aXRsZSIsImltZ1VybHMiLCJ3eFRpbWVyTGlzdCIsImdvb2RzX2xpc3QiLCJhcmVhQXJyIiwiYmFubmVyQXJyIiwiaGFzbW9yZSIsImN1cnBhZ2UiLCJpc0pvaW4iLCJnb29kc19saXN0X3l1c2hvdSIsImdvb2RzX2xpc3RfbWlhb3NoYSIsImNvbXB1dGVkIiwibWV0aG9kcyIsInBhc0hhbmxkIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJ0YXBOYW1lIiwidXJsIiwidGhhdCIsImZ4TWVtYmVyQXBwbHkiLCJyZXNEYXRhIiwiZGF0YXMiLCJzdGF0ZSIsInd4Iiwic2hvd01vZGFsIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiJG5hdmlnYXRlIiwianVtcERldGFpbHMiLCJnb29kc19pZCIsImdvb2RzX3R5cGUiLCJuYXZTZWFyY2giLCJsb2dvSGFubGQiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwiZXZlbnRzIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJnZXRBcHBVc2VySW5mbyIsIndlcHkiLCJsb2dpbiIsImdldFRva2VuIiwiY29kZSIsInRoZW4iLCJzZXRTdG9yYWdlU3luYyIsImluZGV4RGVmYXVsdEluZm8iLCJhcmVhIiwiYmFubmVyIiwiJGFwcGx5IiwicmVxdWVzdEluZGV4R29vZHNMaXN0IiwiZ29vZHNHYmxpc3QiLCJsaXN0IiwiaW5kZXhHb29kc0xpc3QiLCJ0eXBlIiwicGFnZSIsImNvbmNhdCIsImFwcCIsIndhcm4iLCJjYW5JVXNlIiwidXNlckluZm9SZWFkeUNhbGxiYWNrIiwiZ2V0VXNlckluZm8iLCJkZXRhaWwiLCJlcnJNc2ciLCJzZXRVc2VyaW5mbyIsIm5pY2tOYW1lIiwiZ2VuZGVyIiwiYXZhdGFyVXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBTHFDO0FBQ3JDLElBQUlBLFFBQVFDLFFBQVEscUJBQVIsQ0FBWixDLENBQTRDO0FBQzVDLElBQUlDLE1BQU1ELFFBQVEsV0FBUixDQUFWOztBQUdnRDs7O0lBRzNCRSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsY0FBYSxFQUFkLEVBQWlCLGdCQUFlLEVBQWhDLEVBQW1DLHVCQUFzQixTQUF6RCxFQUFtRSx3QkFBdUIsVUFBMUYsRUFBWixFLFFBQ1RDLE8sR0FBVSxFQUFDLFlBQVcsRUFBQyxpQkFBZ0IsVUFBakIsRUFBWixFLFFBQ1RDLFUsR0FBYTtBQUNWQyxXQUFLQSxhQURLO0FBRVZDO0FBRlUsSyxRQUtaQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsZUFBUyxLQURKLEVBQ1k7QUFDakJDLGdCQUFVLE1BRkwsRUFFYTtBQUNsQkMsZ0JBQVUsRUFITDtBQUlMQyxtQkFBYSxLQUpSO0FBS0xDLGdCQUFVLEVBTEw7QUFNTEMscUJBQWUsRUFOVjtBQU9MQyxpQkFBVyxPQVBOO0FBUUxDLGtCQUFZLENBQ1YsRUFBRUMsSUFBSSxHQUFOLEVBQVdDLEtBQUsseUJBQWhCLEVBQTJDQyxPQUFPLE1BQWxELEVBRFUsRUFFVixFQUFFRixJQUFJLEdBQU4sRUFBV0MsS0FBSyx5QkFBaEIsRUFBMkNDLE9BQU8sTUFBbEQsRUFGVSxFQUdWLEVBQUVGLElBQUksR0FBTixFQUFXQyxLQUFL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QUFKLENBQWU5QyxRQUFmLEdBQTBCb0IsRUFBRWtELE1BQUYsQ0FBU3RFLFFBQW5DO0FBQ0EsYUFBS0EsUUFBTCxHQUFnQmlFLElBQUluQixVQUFKLENBQWU5QyxRQUEvQjtBQUNBLGFBQUtELFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxZQUFJQyxXQUFXb0IsRUFBRWtELE1BQUYsQ0FBU3RFLFFBQXhCO0FBQ0Esd0JBQUs7QUFDSHdCLGVBQUt4QyxJQUFJd0YsV0FETjtBQUVIN0UsZ0JBQU07QUFDSjhFLHNCQUFVekUsU0FBU3lFLFFBRGY7QUFFSkMsb0JBQVExRSxTQUFTMEUsTUFGYjtBQUdKQyx1QkFBVzNFLFNBQVMyRTtBQUhoQjtBQUZILFNBQUw7QUFRRDtBQUNGOzs7d0NBRW1CLENBQUU7OztvQ0FDTDtBQUNmLFVBQUcsS0FBSy9ELE9BQVIsRUFBaUI7QUFDZixhQUFLQyxPQUFMO0FBQ0EsYUFBSzZDLHFCQUFMO0FBQ0Q7QUFDRjs7O3NDQUNpQnRDLEMsRUFBRyxDQUNwQjs7OztFQWxNZ0M0QixlQUFLZSxJOztrQkFBbkI5RSxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgbmF2IGZyb20gJy4uL2NvbXBvbmVudHMvbmF2JzsgLy8g5bqV6YOo5a+86IiqXHJcbnZhciB0aW1lciA9IHJlcXVpcmUoJy4uL3V0aWxzL3d4VGltZXIuanMnKTsgLy8g5YCS6K6h5pe2XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuaW1wb3J0IHBhc3BvcHVwIGZyb20gJy4uL2NvbXBvbmVudHMvcGFzX3BvcHVwJzsgLy8g5bqV6YOo5a+86IiqXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpppbpobUnXHJcbiAgfTtcclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wicGFzcG9wdXBcIjp7XCJ4bWxuczp2LW9uXCI6XCJcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cGFzRmxhZy5zeW5jXCI6XCJwYXNGbGFnXCIsXCJ2LWJpbmQ6cGFzUHJpY2Uuc3luY1wiOlwicGFzUHJpY2VcIn19O1xyXG4kZXZlbnRzID0ge1wicGFzcG9wdXBcIjp7XCJ2LW9uOnBhc0hhbmxkXCI6XCJwYXNIYW5sZFwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgbmF2OiBuYXYsXHJcbiAgICBwYXNwb3B1cFxyXG4gIH07XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcGFzRmxhZzogZmFsc2UsICAvLyDkvZnpop3mlK/ku5hcclxuICAgIHBhc1ByaWNlOiAnMTAwMCcsIC8vIOS9memineaUr+S7mFxyXG4gICAgY2hvb2VzSWQ6ICcnLFxyXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxyXG4gICAgdXNlckluZm86IHt9LFxyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBiZWdpblRpbWU6ICcxODowMCcsXHJcbiAgICBDaG9vZXNEYXRhOiBbXHJcbiAgICAgIHsgaWQ6ICc3JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxMS5wbmcnLCB0aXRsZTogJ+mZkOaXtuenkuadgCcgfSxcclxuICAgICAgeyBpZDogJzInLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTEyLnBuZycsIHRpdGxlOiAn54m55Y2W6aKE6LStJyB9LFxyXG4gICAgICB7IGlkOiAnNScsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTMucG5nJywgdGl0bGU6ICfnoI3ku7cnIH0sXHJcbiAgICAgIHsgaWQ6ICcxJywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNC5wbmcnLCB0aXRsZTogJ+WQiOS8meS6uicgfSxcclxuICAgICAgeyBpZDogJzMnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE1LnBuZycsIHRpdGxlOiAn56eS6LWa6ZKxJyB9LFxyXG4gICAgICB7IGlkOiAnNCcsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTYucG5nJywgdGl0bGU6ICfpoobliLgnIH0sXHJcbiAgICAgIHsgaWQ6ICc2JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNy5wbmcnLCB0aXRsZTogJ+eJuee6puWVhuaItycgfSxcclxuICAgICAgeyBpZDogJzgnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE4LnBuZycsIHRpdGxlOiAn5pu05aSa6aKR6YGTJyB9XHJcbiAgICBdLFxyXG4gICAgLy8g6L2u5pKtXHJcbiAgICBpbWdVcmxzOiBbXSxcclxuICAgIHd4VGltZXJMaXN0OiB7fSwgLy8g5YCS6K6h5pe2XHJcbiAgICBnb29kc19saXN0OiBbXSwgLy8g5ZWG5ZOB5YiX6KGoXHJcbiAgICBhcmVhQXJyOiBbXSwgLy8gYXJlYeWMuuWfn1xyXG4gICAgYmFubmVyQXJyOiBbXSwgLy/ova7mkq3lm75cclxuICAgIGhhc21vcmU6IGZhbHNlLCAvLyDmmK/lkKbmnInkuIvkuIDpobVcclxuICAgIGN1cnBhZ2U6IDEsIC8v5b2T5YmN6aG15pWwXHJcbiAgICBpc0pvaW46ICcnLCAvLyDllYblrrblhaXpqbvnirbmgIFcclxuICAgIGdvb2RzX2xpc3RfeXVzaG91OiBbXSxcclxuICAgIGdvb2RzX2xpc3RfbWlhb3NoYTogW11cclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICB0aGlzLmdldEFwcFVzZXJJbmZvKCk7XHJcbiAgICB2YXIgZGF0YSA9IGF3YWl0IHdlcHkubG9naW4oKTtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5nZXRUb2tlbixcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGNvZGU6IGRhdGEuY29kZVxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcz0+IHtcclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXInLCByZXMuZGF0YXMpXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIOmmlumhtS3ova7mkq3lm77lkoxhcmVhQXJy6I+c5Y2VXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuaW5kZXhEZWZhdWx0SW5mbyxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHRoaXMuYXJlYUFyciA9IHJlcy5kYXRhcy5hcmVhIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuYmFubmVyQXJyID0gcmVzLmRhdGFzLmJhbm5lciB8fCBbXTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnJlcXVlc3RJbmRleEdvb2RzTGlzdCgpXHJcblxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmdvb2RzR2JsaXN0XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMuZ29vZHNfbGlzdF95dXNob3UgPSByZXMuZGF0YXMuZ29vZHNfbGlzdF95dXNob3UubGlzdCB8fCBbXVxyXG4gICAgICB0aGlzLmdvb2RzX2xpc3RfbWlhb3NoYSA9IHJlcy5kYXRhcy5nb29kc19saXN0Lmxpc3QgfHwgW11cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgXHJcbiAgLy8g6aaW6aG14oCU5pmu6YCa5ZWG5ZOB5YiX6KGo5o6l5Y+jXHJcbiAgcmVxdWVzdEluZGV4R29vZHNMaXN0KCkge1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmluZGV4R29vZHNMaXN0LFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHBhZ2U6IDEwLFxyXG4gICAgICAgIGN1cnBhZ2U6IHRoaXMuY3VycGFnZVxyXG4gICAgICB9LFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdmFyIGxpc3QgPSByZXMuZGF0YXMuZ29vZHNfbGlzdCB8fCBbXVxyXG4gICAgICAgIHRoaXMuZ29vZHNfbGlzdCA9IHRoaXMuZ29vZHNfbGlzdC5jb25jYXQobGlzdClcclxuICAgICAgICB0aGlzLmhhc21vcmUgPSByZXMuaGFzbW9yZVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25TaG93KCkge31cclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOS9memineaUr+S7mOWvhueggeWbnuiwg1xyXG4gICAgcGFzSGFubGQoZSl7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICAgIHRoaXMucGFzRmxhZyA9IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgdGFwTmFtZSh1cmwsIGlkKSB7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICBpZih1cmwgPT0gJ2Rpc2NvdW50Jykge1xyXG4gICAgICAgIC8vIOeUs+ivt+aIkOS4uuWIhumUgOWVhlxyXG4gICAgICAgIHZhciByZXNEYXRhID0gYXdhaXQgYWpheCh7dXJsOiBhcGkuZnhNZW1iZXJBcHBseX0pO1xyXG4gICAgICAgIGlmKHJlc0RhdGEuZGF0YXMuc3RhdGUgIT0gMikge1xyXG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgY29udGVudDogJ+eUs+ivt+aIkOS4uuWIhumUgOWRmD8nLFxyXG4gICAgICAgICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuJG5hdmlnYXRlKCdkaXN0cmlidXRpb24nKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyh1cmwpXHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKHt1cmw6IHVybH0pXHJcbiAgICB9LFxyXG4gICAganVtcERldGFpbHMoZ29vZHNfaWQsIGdvb2RzX3R5cGUpIHtcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoYC9wYWdlcy9zaG9wRGV0YWlscz9nb29kc19pZD0ke2dvb2RzX2lkfWApO1xyXG4gICAgfSxcclxuICAgIG5hdlNlYXJjaCgpIHtcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9zZWFyY2gnKTtcclxuICAgIH0sXHJcbiAgICBsb2dvSGFubGQoKXtcclxuICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICB1cmxzOiBbJy9hc3NldHMvaW1nL2xvZ28ucG5nJ11cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbiAgZ2V0QXBwVXNlckluZm8oKSB7XHJcbiAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignZ2xvYmFsRGF0YScpO1xyXG4gICAgICB0aGlzLnVzZXJJbmZvID0gYXBwLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9IGVsc2UgaWYgKHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSkge1xyXG4gICAgICBhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrID0gcmVzID0+IHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ3VzZXJJbmZvUmVhZHlDYWxsYmFjaycpO1xyXG4gICAgICAgIHRoaXMudXNlckluZm8gPSByZXMudXNlckluZm87XHJcbiAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ2dldFVzZXJJbmZvJyk7XHJcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgICAgIHRoaXMudXNlckluZm8gPSBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgICAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFVzZXJJbmZvKGUpIHtcclxuICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICBpZiAoZS5kZXRhaWwuZXJyTXNnID09ICdnZXRVc2VySW5mbzpvaycpIHtcclxuICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mbztcclxuICAgICAgdGhpcy51c2VySW5mbyA9IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgICB0aGlzLmhhc1VzZXJJbmZvID0gdHJ1ZTtcclxuICAgICAgdmFyIHVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkuc2V0VXNlcmluZm8sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgbmlja05hbWU6IHVzZXJJbmZvLm5pY2tOYW1lLFxyXG4gICAgICAgICAgZ2VuZGVyOiB1c2VySW5mby5nZW5kZXIsXHJcbiAgICAgICAgICBhdmF0YXJVcmw6IHVzZXJJbmZvLmF2YXRhclVybFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge31cclxuICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgIGlmKHRoaXMuaGFzbW9yZSkge1xyXG4gICAgICB0aGlzLmN1cnBhZ2UgKysgXHJcbiAgICAgIHRoaXMucmVxdWVzdEluZGV4R29vZHNMaXN0KClcclxuICAgIH1cclxuICB9XHJcbiAgb25QdWxsRG93blJlZnJlc2goZSkge1xyXG4gIH1cclxuXHJcbn1cclxuIl19