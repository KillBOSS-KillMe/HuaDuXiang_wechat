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

        var data, user;
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
                user = wx.getStorageSync('user');

                if (!user.token) {
                  (0, _ajax.ajax)({
                    url: api.getToken,
                    data: {
                      code: data.code
                    }
                  }).then(function (res) {
                    wx.setStorageSync('user', res.datas);
                  });
                }

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

              case 10:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInRpbWVyIiwicmVxdWlyZSIsImFwaSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJuYXYiLCJtaXhpbnMiLCJkYXRhIiwiY2hvb2VzSWQiLCJoYXNVc2VySW5mbyIsInVzZXJJbmZvIiwicmVxdWVzdEltZ1VybCIsImJlZ2luVGltZSIsIkNob29lc0RhdGEiLCJpZCIsImltZyIsInRpdGxlIiwiaW1nVXJscyIsInd4VGltZXJMaXN0IiwiZ29vZHNfbGlzdCIsImFyZWFBcnIiLCJiYW5uZXJBcnIiLCJoYXNtb3JlIiwiY3VycGFnZSIsImlzSm9pbiIsImdvb2RzX2xpc3RfeXVzaG91IiwiZ29vZHNfbGlzdF9taWFvc2hhIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwidGFwTmFtZSIsInVybCIsInRoYXQiLCJmeE1lbWJlckFwcGx5IiwicmVzRGF0YSIsImRhdGFzIiwic3RhdGUiLCJ3eCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsIiRuYXZpZ2F0ZSIsImNvbnNvbGUiLCJsb2ciLCJqdW1wRGV0YWlscyIsImdvb2RzX2lkIiwic2FsZV90eXBlIiwibmF2U2VhcmNoIiwibG9nb0hhbmxkIiwicHJldmlld0ltYWdlIiwidXJscyIsImV2ZW50cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiZ2V0QXBwVXNlckluZm8iLCJ3ZXB5IiwibG9naW4iLCJ1c2VyIiwiZ2V0U3RvcmFnZVN5bmMiLCJ0b2tlbiIsImdldFRva2VuIiwiY29kZSIsInRoZW4iLCJzZXRTdG9yYWdlU3luYyIsImluZGV4RGVmYXVsdEluZm8iLCJhcmVhIiwiYmFubmVyIiwiJGFwcGx5IiwicmVxdWVzdEluZGV4R29vZHNMaXN0IiwiZ29vZHNHYmxpc3QiLCJsaXN0IiwiaW5kZXhHb29kc0xpc3QiLCJ0eXBlIiwicGFnZSIsImNvbmNhdCIsImFwcCIsIndhcm4iLCJjYW5JVXNlIiwidXNlckluZm9SZWFkeUNhbGxiYWNrIiwiZ2V0VXNlckluZm8iLCJlIiwiZGV0YWlsIiwiZXJyTXNnIiwic2V0VXNlcmluZm8iLCJuaWNrTmFtZSIsImdlbmRlciIsImF2YXRhclVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7Ozs7Ozs7Ozs7QUFIcUM7QUFDckMsSUFBSUEsUUFBUUMsUUFBUSxxQkFBUixDQUFaLEMsQ0FBNEM7QUFDNUMsSUFBSUMsTUFBTUQsUUFBUSxXQUFSLENBQVY7O0lBS3FCRSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWE7QUFDWEMsV0FBS0E7QUFETSxLLFFBSWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTzs7QUFFTEMsZ0JBQVUsRUFGTDtBQUdMQyxtQkFBYSxLQUhSO0FBSUxDLGdCQUFVLEVBSkw7QUFLTEMscUJBQWUsRUFMVjtBQU1MQyxpQkFBVyxPQU5OO0FBT0xDLGtCQUFZLENBQ1YsRUFBRUMsSUFBSSxHQUFOLEVBQVdDLEtBQUsseUJBQWhCLEVBQTJDQyxPQUFPLE1BQWxELEVBRFUsRUFFVixFQUFFRixJQUFJLEdBQU4sRUFBV0MsS0FBSyx5QkFBaEIsRUFBMkNDLE9BQU8sTUFBbEQsRUFGVSxFQUdWLEVBQUVGLElBQUksR0FBTixFQUFXQyxLQUFLLHlCQUFoQixFQUEyQ0MsT0FBTyxJQUFsRCxFQUhVLEVBSVYsRUFBRUYsSUFBSSxHQUFOLEVBQVdDLEtBQUsseUJBQWhCLEVBQTJDQyxPQUFPLEtBQWxELEVBSlUsRUFLVixFQUFFRixJQUFJLEdBQU4sRUFBV0MsS0FBSyx5QkFBaEIsRUFBMkNDLE9BQU8sS0FBbEQsRUFMVSxFQU1WLEVBQUVGLElBQUksR0FBTixFQUFXQyxLQUFLLHlCQUFoQixFQUEyQ0MsT0FBTyxJQUFsRCxFQU5VLEVBT1YsRUFBRUYsSUFBSSxHQUFOLEVBQVdDLEtBQUsseUJBQWhCLEVBQTJDQyxPQUFPLE1BQWxELEVB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RSxzQkFBVTNFLFNBQVMyRSxRQURmO0FBRUpDLG9CQUFRNUUsU0FBUzRFLE1BRmI7QUFHSkMsdUJBQVc3RSxTQUFTNkU7QUFIaEI7QUFGSCxTQUFMO0FBUUQ7QUFDRjs7O3dDQUVtQixDQUFFOzs7b0NBQ0w7QUFDZixVQUFHLEtBQUtqRSxPQUFSLEVBQWlCO0FBQ2YsYUFBS0MsT0FBTDtBQUNBLGFBQUs4QyxxQkFBTDtBQUNEO0FBQ0Y7OztzQ0FDaUJZLEMsRUFBRyxDQUNwQjs7OztFQWhNZ0N6QixlQUFLa0IsSTs7a0JBQW5CekUsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG5hdiBmcm9tICcuLi9jb21wb25lbnRzL25hdic7IC8vIOW6lemDqOWvvOiIqlxyXG52YXIgdGltZXIgPSByZXF1aXJlKCcuLi91dGlscy93eFRpbWVyLmpzJyk7IC8vIOWAkuiuoeaXtlxyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpppbpobUnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge1xyXG4gICAgbmF2OiBuYXZcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIFxyXG4gICAgY2hvb2VzSWQ6ICcnLFxyXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxyXG4gICAgdXNlckluZm86IHt9LFxyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBiZWdpblRpbWU6ICcxODowMCcsXHJcbiAgICBDaG9vZXNEYXRhOiBbXHJcbiAgICAgIHsgaWQ6ICc3JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxMS5wbmcnLCB0aXRsZTogJ+mZkOaXtuenkuadgCcgfSxcclxuICAgICAgeyBpZDogJzInLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTEyLnBuZycsIHRpdGxlOiAn54m55Y2W6aKE6LStJyB9LFxyXG4gICAgICB7IGlkOiAnNScsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTMucG5nJywgdGl0bGU6ICfnoI3ku7cnIH0sXHJcbiAgICAgIHsgaWQ6ICcxJywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNC5wbmcnLCB0aXRsZTogJ+WQiOS8meS6uicgfSxcclxuICAgICAgeyBpZDogJzMnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE1LnBuZycsIHRpdGxlOiAn56eS6LWa6ZKxJyB9LFxyXG4gICAgICB7IGlkOiAnNCcsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTYucG5nJywgdGl0bGU6ICfpoobliLgnIH0sXHJcbiAgICAgIHsgaWQ6ICc2JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNy5wbmcnLCB0aXRsZTogJ+eJuee6puWVhuaItycgfSxcclxuICAgICAgeyBpZDogJzgnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE4LnBuZycsIHRpdGxlOiAn5pu05aSa6aKR6YGTJyB9XHJcbiAgICBdLFxyXG4gICAgLy8g6L2u5pKtXHJcbiAgICBpbWdVcmxzOiBbXSxcclxuICAgIHd4VGltZXJMaXN0OiB7fSwgLy8g5YCS6K6h5pe2XHJcbiAgICBnb29kc19saXN0OiBbXSwgLy8g5ZWG5ZOB5YiX6KGoXHJcbiAgICBhcmVhQXJyOiBbXSwgLy8gYXJlYeWMuuWfn1xyXG4gICAgYmFubmVyQXJyOiBbXSwgLy/ova7mkq3lm75cclxuICAgIGhhc21vcmU6IGZhbHNlLCAvLyDmmK/lkKbmnInkuIvkuIDpobVcclxuICAgIGN1cnBhZ2U6IDEsIC8v5b2T5YmN6aG15pWwXHJcbiAgICBpc0pvaW46ICcnLCAvLyDllYblrrblhaXpqbvnirbmgIFcclxuICAgIGdvb2RzX2xpc3RfeXVzaG91OiBbXSxcclxuICAgIGdvb2RzX2xpc3RfbWlhb3NoYTogW11cclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICB0aGlzLmdldEFwcFVzZXJJbmZvKCk7XHJcbiAgICB2YXIgZGF0YSA9IGF3YWl0IHdlcHkubG9naW4oKTtcclxuICAgIHZhciB1c2VyID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXInKVxyXG4gICAgaWYoIXVzZXIudG9rZW4pIHtcclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkuZ2V0VG9rZW4sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgY29kZTogZGF0YS5jb2RlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcz0+IHtcclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlcicsIHJlcy5kYXRhcylcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDpppbpobUt6L2u5pKt5Zu+5ZKMYXJlYUFycuiPnOWNlVxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmluZGV4RGVmYXVsdEluZm8sXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLmFyZWFBcnIgPSByZXMuZGF0YXMuYXJlYSB8fCBbXTtcclxuICAgICAgICB0aGlzLmJhbm5lckFyciA9IHJlcy5kYXRhcy5iYW5uZXIgfHwgW107XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZXF1ZXN0SW5kZXhHb29kc0xpc3QoKVxyXG5cclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5nb29kc0dibGlzdFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLmdvb2RzX2xpc3RfeXVzaG91ID0gcmVzLmRhdGFzLmdvb2RzX2xpc3RfeXVzaG91Lmxpc3QgfHwgW11cclxuICAgICAgdGhpcy5nb29kc19saXN0X21pYW9zaGEgPSByZXMuZGF0YXMuZ29vZHNfbGlzdC5saXN0IHx8IFtdXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIFxyXG4gIC8vIOmmlumhteKAlOaZrumAmuWVhuWTgeWIl+ihqOaOpeWPo1xyXG4gIHJlcXVlc3RJbmRleEdvb2RzTGlzdCgpIHtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5pbmRleEdvb2RzTGlzdCxcclxuICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBwYWdlOiAxMCxcclxuICAgICAgICBjdXJwYWdlOiB0aGlzLmN1cnBhZ2VcclxuICAgICAgfSxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHZhciBsaXN0ID0gcmVzLmRhdGFzLmdvb2RzX2xpc3QgfHwgW11cclxuICAgICAgICB0aGlzLmdvb2RzX2xpc3QgPSB0aGlzLmdvb2RzX2xpc3QuY29uY2F0KGxpc3QpXHJcbiAgICAgICAgdGhpcy5oYXNtb3JlID0gcmVzLmhhc21vcmVcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uU2hvdygpIHt9XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgIFxyXG4gICAgYXN5bmMgdGFwTmFtZSh1cmwsIGlkKSB7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICBpZih1cmwgPT0gJ2Rpc2NvdW50Jykge1xyXG4gICAgICAgIC8vIOeUs+ivt+aIkOS4uuWIhumUgOWVhlxyXG4gICAgICAgIHZhciByZXNEYXRhID0gYXdhaXQgYWpheCh7dXJsOiBhcGkuZnhNZW1iZXJBcHBseX0pO1xyXG4gICAgICAgIGlmKHJlc0RhdGEuZGF0YXMuc3RhdGUgIT0gMikge1xyXG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgY29udGVudDogJ+eUs+ivt+aIkOS4uuWIhumUgOWRmD8nLFxyXG4gICAgICAgICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuJG5hdmlnYXRlKCdkaXN0cmlidXRpb24nKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyh1cmwpXHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKHt1cmw6IHVybH0pXHJcbiAgICB9LFxyXG4gICAganVtcERldGFpbHMoZ29vZHNfaWQsIHNhbGVfdHlwZSkge1xyXG4gICAgICBpZihzYWxlX3R5cGUgPT0gJ3J1c2hzYWxlcycpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZShgL3BhZ2VzL3NlY2tpbGxTaG9wRGV0YWlscz9nb29kc19pZD0ke2dvb2RzX2lkfWApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKGAvcGFnZXMvc2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG5hdlNlYXJjaCgpIHtcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9zZWFyY2gnKTtcclxuICAgIH0sXHJcbiAgICBsb2dvSGFubGQoKXtcclxuICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICB1cmxzOiBbJy9hc3NldHMvaW1nL2xvZ28ucG5nJ11cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbiAgZ2V0QXBwVXNlckluZm8oKSB7XHJcbiAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignZ2xvYmFsRGF0YScpO1xyXG4gICAgICB0aGlzLnVzZXJJbmZvID0gYXBwLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9IGVsc2UgaWYgKHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSkge1xyXG4gICAgICBhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrID0gcmVzID0+IHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ3VzZXJJbmZvUmVhZHlDYWxsYmFjaycpO1xyXG4gICAgICAgIHRoaXMudXNlckluZm8gPSByZXMudXNlckluZm87XHJcbiAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ2dldFVzZXJJbmZvJyk7XHJcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgICAgIHRoaXMudXNlckluZm8gPSBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgICAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFVzZXJJbmZvKGUpIHtcclxuICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICBpZiAoZS5kZXRhaWwuZXJyTXNnID09ICdnZXRVc2VySW5mbzpvaycpIHtcclxuICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mbztcclxuICAgICAgdGhpcy51c2VySW5mbyA9IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgICB0aGlzLmhhc1VzZXJJbmZvID0gdHJ1ZTtcclxuICAgICAgdmFyIHVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkuc2V0VXNlcmluZm8sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgbmlja05hbWU6IHVzZXJJbmZvLm5pY2tOYW1lLFxyXG4gICAgICAgICAgZ2VuZGVyOiB1c2VySW5mby5nZW5kZXIsXHJcbiAgICAgICAgICBhdmF0YXJVcmw6IHVzZXJJbmZvLmF2YXRhclVybFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge31cclxuICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgIGlmKHRoaXMuaGFzbW9yZSkge1xyXG4gICAgICB0aGlzLmN1cnBhZ2UgKysgXHJcbiAgICAgIHRoaXMucmVxdWVzdEluZGV4R29vZHNMaXN0KClcclxuICAgIH1cclxuICB9XHJcbiAgb25QdWxsRG93blJlZnJlc2goZSkge1xyXG4gIH1cclxuXHJcbn1cclxuIl19