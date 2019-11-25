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
      navigationBarTitleText: '首页'
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
      jumpDetails: function jumpDetails(goods_id, sale_type) {
        if (sale_type == 'rushsales') {
          this.$navigate('/pages/seckillShopDetails?goods_id=' + goods_id);
        } else {
          this.$navigate('/pages/shopDetails?goods_id=' + goods_id);
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
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
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

                (0, _ajax.ajax)({
                  url: api.goodsGblist
                }).then(function (res) {
                  _this2.goods_list_yushou = res.datas.goods_list_yushou.list || [];
                  _this2.goods_list_miaosha = res.datas.goods_list.list || [];
                  _this2.$apply();
                });

              case 5:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInRpbWVyIiwicmVxdWlyZSIsImFwaSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJuYXYiLCJtaXhpbnMiLCJkYXRhIiwiY2hvb2VzSWQiLCJoYXNVc2VySW5mbyIsInVzZXJJbmZvIiwicmVxdWVzdEltZ1VybCIsImJlZ2luVGltZSIsIkNob29lc0RhdGEiLCJpZCIsImltZyIsInRpdGxlIiwiaW1nVXJscyIsInd4VGltZXJMaXN0IiwiZ29vZHNfbGlzdCIsImFyZWFBcnIiLCJiYW5uZXJBcnIiLCJoYXNtb3JlIiwiY3VycGFnZSIsImlzSm9pbiIsImdvb2RzX2xpc3RfeXVzaG91IiwiZ29vZHNfbGlzdF9taWFvc2hhIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwidGFwTmFtZSIsInVybCIsInRoYXQiLCJmeE1lbWJlckFwcGx5IiwicmVzRGF0YSIsImRhdGFzIiwic3RhdGUiLCJ3eCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsIiRuYXZpZ2F0ZSIsImNvbnNvbGUiLCJsb2ciLCJqdW1wRGV0YWlscyIsImdvb2RzX2lkIiwic2FsZV90eXBlIiwibmF2U2VhcmNoIiwibG9nb0hhbmxkIiwicHJldmlld0ltYWdlIiwidXJscyIsImV2ZW50cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiZ2V0QXBwVXNlckluZm8iLCJpbmRleERlZmF1bHRJbmZvIiwidGhlbiIsImNvZGUiLCJhcmVhIiwiYmFubmVyIiwiJGFwcGx5IiwicmVxdWVzdEluZGV4R29vZHNMaXN0IiwiZ29vZHNHYmxpc3QiLCJsaXN0IiwiaW5kZXhHb29kc0xpc3QiLCJ0eXBlIiwicGFnZSIsImNvbmNhdCIsImFwcCIsIndhcm4iLCJjYW5JVXNlIiwidXNlckluZm9SZWFkeUNhbGxiYWNrIiwiZ2V0VXNlckluZm8iLCJlIiwiZGV0YWlsIiwiZXJyTXNnIiwic2V0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QU87QUFDZEksb0JBQVEyQixJQUFSLENBQWEsYUFBYjtBQUNBRCxnQkFBSWYsVUFBSixDQUFlNUMsUUFBZixHQUEwQjhCLElBQUk5QixRQUE5QjtBQUNBLG1CQUFLQSxRQUFMLEdBQWdCMkQsSUFBSWYsVUFBSixDQUFlNUMsUUFBL0I7QUFDQSxtQkFBS0QsV0FBTCxHQUFtQixJQUFuQjtBQUNBLG1CQUFLb0QsTUFBTDtBQUNEO0FBUFksU0FBZjtBQVNEO0FBQ0Y7OztnQ0FDV2EsQyxFQUFHO0FBQ2IsVUFBSUwsTUFBTSxLQUFLaEIsT0FBZjtBQUNBLFVBQUlxQixFQUFFQyxNQUFGLENBQVNDLE1BQVQsSUFBbUIsZ0JBQXZCLEVBQXlDO0FBQ3ZDUCxZQUFJZixVQUFKLENBQWU1QyxRQUFmLEdBQTBCZ0UsRUFBRUMsTUFBRixDQUFTakUsUUFBbkM7QUFDQSxhQUFLQSxRQUFMLEdBQWdCMkQsSUFBSWYsVUFBSixDQUFlNUMsUUFBL0I7QUFDQSxhQUFLRCxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsWUFBSUMsV0FBV2dFLEVBQUVDLE1BQUYsQ0FBU2pFLFFBQXhCO0FBQ0Esd0JBQUs7QUFDSG9CLGVBQUs5QixJQUFJNkUsV0FETjtBQUVIdEUsZ0JBQU07QUFDSnVFLHNCQUFVcEUsU0FBU29FLFFBRGY7QUFFSkMsb0JBQVFyRSxTQUFTcUUsTUFGYjtBQUdKQyx1QkFBV3RFLFNBQVNzRTtBQUhoQjtBQUZILFNBQUw7QUFRRDtBQUNGOzs7d0NBRW1CLENBQUU7OztvQ0FDTDtBQUNmLFVBQUcsS0FBSzFELE9BQVIsRUFBaUI7QUFDZixhQUFLQyxPQUFMO0FBQ0EsYUFBS3VDLHFCQUFMO0FBQ0Q7QUFDRjs7O3NDQUNpQlksQyxFQUFHLENBQ3BCOzs7O0VBcExnQ08sZUFBS2QsSTs7a0JBQW5CbEUsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG5hdiBmcm9tICcuLi9jb21wb25lbnRzL25hdic7IC8vIOW6lemDqOWvvOiIqlxyXG52YXIgdGltZXIgPSByZXF1aXJlKCcuLi91dGlscy93eFRpbWVyLmpzJyk7IC8vIOWAkuiuoeaXtlxyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpppbpobUnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge1xyXG4gICAgbmF2OiBuYXZcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIFxyXG4gICAgY2hvb2VzSWQ6ICcnLFxyXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxyXG4gICAgdXNlckluZm86IHt9LFxyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBiZWdpblRpbWU6ICcxODowMCcsXHJcbiAgICBDaG9vZXNEYXRhOiBbXHJcbiAgICAgIHsgaWQ6ICc3JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxMS5wbmcnLCB0aXRsZTogJ+mZkOaXtuenkuadgCcgfSxcclxuICAgICAgeyBpZDogJzInLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTEyLnBuZycsIHRpdGxlOiAn54m55Y2W6aKE6LStJyB9LFxyXG4gICAgICB7IGlkOiAnNScsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTMucG5nJywgdGl0bGU6ICfnoI3ku7cnIH0sXHJcbiAgICAgIHsgaWQ6ICcxJywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNC5wbmcnLCB0aXRsZTogJ+WQiOS8meS6uicgfSxcclxuICAgICAgeyBpZDogJzMnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE1LnBuZycsIHRpdGxlOiAn56eS6LWa6ZKxJyB9LFxyXG4gICAgICB7IGlkOiAnNCcsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTYucG5nJywgdGl0bGU6ICfpoobliLgnIH0sXHJcbiAgICAgIHsgaWQ6ICc2JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNy5wbmcnLCB0aXRsZTogJ+eJuee6puWVhuaItycgfSxcclxuICAgICAgeyBpZDogJzgnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE4LnBuZycsIHRpdGxlOiAn5pu05aSa6aKR6YGTJyB9XHJcbiAgICBdLFxyXG4gICAgLy8g6L2u5pKtXHJcbiAgICBpbWdVcmxzOiBbXSxcclxuICAgIHd4VGltZXJMaXN0OiB7fSwgLy8g5YCS6K6h5pe2XHJcbiAgICBnb29kc19saXN0OiBbXSwgLy8g5ZWG5ZOB5YiX6KGoXHJcbiAgICBhcmVhQXJyOiBbXSwgLy8gYXJlYeWMuuWfn1xyXG4gICAgYmFubmVyQXJyOiBbXSwgLy/ova7mkq3lm75cclxuICAgIGhhc21vcmU6IGZhbHNlLCAvLyDmmK/lkKbmnInkuIvkuIDpobVcclxuICAgIGN1cnBhZ2U6IDEsIC8v5b2T5YmN6aG15pWwXHJcbiAgICBpc0pvaW46ICcnLCAvLyDllYblrrblhaXpqbvnirbmgIFcclxuICAgIGdvb2RzX2xpc3RfeXVzaG91OiBbXSxcclxuICAgIGdvb2RzX2xpc3RfbWlhb3NoYTogW11cclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICB0aGlzLmdldEFwcFVzZXJJbmZvKCk7XHJcblxyXG4gICAgLy8g6aaW6aG1Lei9ruaSreWbvuWSjGFyZWFBcnLoj5zljZVcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5pbmRleERlZmF1bHRJbmZvLFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5hcmVhQXJyID0gcmVzLmRhdGFzLmFyZWEgfHwgW107XHJcbiAgICAgICAgdGhpcy5iYW5uZXJBcnIgPSByZXMuZGF0YXMuYmFubmVyIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucmVxdWVzdEluZGV4R29vZHNMaXN0KClcclxuXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuZ29vZHNHYmxpc3RcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5nb29kc19saXN0X3l1c2hvdSA9IHJlcy5kYXRhcy5nb29kc19saXN0X3l1c2hvdS5saXN0IHx8IFtdXHJcbiAgICAgIHRoaXMuZ29vZHNfbGlzdF9taWFvc2hhID0gcmVzLmRhdGFzLmdvb2RzX2xpc3QubGlzdCB8fCBbXVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBcclxuICAvLyDpppbpobXigJTmma7pgJrllYblk4HliJfooajmjqXlj6NcclxuICByZXF1ZXN0SW5kZXhHb29kc0xpc3QoKSB7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuaW5kZXhHb29kc0xpc3QsXHJcbiAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcGFnZTogMTAsXHJcbiAgICAgICAgY3VycGFnZTogdGhpcy5jdXJwYWdlXHJcbiAgICAgIH0sXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB2YXIgbGlzdCA9IHJlcy5kYXRhcy5nb29kc19saXN0IHx8IFtdXHJcbiAgICAgICAgdGhpcy5nb29kc19saXN0ID0gdGhpcy5nb29kc19saXN0LmNvbmNhdChsaXN0KVxyXG4gICAgICAgIHRoaXMuaGFzbW9yZSA9IHJlcy5oYXNtb3JlXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvblNob3coKSB7fVxyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICBcclxuICAgIGFzeW5jIHRhcE5hbWUodXJsLCBpZCkge1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgaWYodXJsID09ICdkaXNjb3VudCcpIHtcclxuICAgICAgICAvLyDnlLPor7fmiJDkuLrliIbplIDllYZcclxuICAgICAgICB2YXIgcmVzRGF0YSA9IGF3YWl0IGFqYXgoe3VybDogYXBpLmZ4TWVtYmVyQXBwbHl9KTtcclxuICAgICAgICBpZihyZXNEYXRhLmRhdGFzLnN0YXRlICE9IDIpIHtcclxuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfnlLPor7fmiJDkuLrliIbplIDlkZg/JyxcclxuICAgICAgICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRuYXZpZ2F0ZSgnZGlzdHJpYnV0aW9uJylcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS5sb2codXJsKVxyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7dXJsOiB1cmx9KVxyXG4gICAgfSxcclxuICAgIGp1bXBEZXRhaWxzKGdvb2RzX2lkLCBzYWxlX3R5cGUpIHtcclxuICAgICAgaWYoc2FsZV90eXBlID09ICdydXNoc2FsZXMnKSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoYC9wYWdlcy9zZWNraWxsU2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZShgL3BhZ2VzL3Nob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBuYXZTZWFyY2goKSB7XHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKCcvcGFnZXMvc2VhcmNoJyk7XHJcbiAgICB9LFxyXG4gICAgbG9nb0hhbmxkKCl7XHJcbiAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgdXJsczogWycvYXNzZXRzL2ltZy9sb2dvLnBuZyddXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG4gIGdldEFwcFVzZXJJbmZvKCkge1xyXG4gICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgIGlmIChhcHAuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ2dsb2JhbERhdGEnKTtcclxuICAgICAgdGhpcy51c2VySW5mbyA9IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgICB0aGlzLmhhc1VzZXJJbmZvID0gdHJ1ZTtcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSBlbHNlIGlmICh3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJykpIHtcclxuICAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IHJlcyA9PiB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCd1c2VySW5mb1JlYWR5Q2FsbGJhY2snKTtcclxuICAgICAgICB0aGlzLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKCdnZXRVc2VySW5mbycpO1xyXG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm87XHJcbiAgICAgICAgICB0aGlzLnVzZXJJbmZvID0gYXBwLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICAgICAgICB0aGlzLmhhc1VzZXJJbmZvID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRVc2VySW5mbyhlKSB7XHJcbiAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgaWYgKGUuZGV0YWlsLmVyck1zZyA9PSAnZ2V0VXNlckluZm86b2snKSB7XHJcbiAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm87XHJcbiAgICAgIHRoaXMudXNlckluZm8gPSBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgIHZhciB1c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLnNldFVzZXJpbmZvLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIG5pY2tOYW1lOiB1c2VySW5mby5uaWNrTmFtZSxcclxuICAgICAgICAgIGdlbmRlcjogdXNlckluZm8uZ2VuZGVyLFxyXG4gICAgICAgICAgYXZhdGFyVXJsOiB1c2VySW5mby5hdmF0YXJVcmxcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHt9XHJcbiAgb25SZWFjaEJvdHRvbSAoKSB7XHJcbiAgICBpZih0aGlzLmhhc21vcmUpIHtcclxuICAgICAgdGhpcy5jdXJwYWdlICsrIFxyXG4gICAgICB0aGlzLnJlcXVlc3RJbmRleEdvb2RzTGlzdCgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uUHVsbERvd25SZWZyZXNoKGUpIHtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==