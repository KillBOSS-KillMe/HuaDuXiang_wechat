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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInRpbWVyIiwicmVxdWlyZSIsImFwaSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hdiIsInBhc3BvcHVwIiwibWl4aW5zIiwiZGF0YSIsInBhc0ZsYWciLCJwYXNQcmljZSIsImNob29lc0lkIiwiaGFzVXNlckluZm8iLCJ1c2VySW5mbyIsInJlcXVlc3RJbWdVcmwiLCJiZWdpblRpbWUiLCJDaG9vZXNEYXRhIiwiaWQiLCJpbWciLCJ0aXRsZSIsImltZ1VybHMiLCJ3eFRpbWVyTGlzdCIsImdvb2RzX2xpc3QiLCJhcmVhQXJyIiwiYmFubmVyQXJyIiwiaGFzbW9yZSIsImN1cnBhZ2UiLCJpc0pvaW4iLCJnb29kc19saXN0X3l1c2hvdSIsImdvb2RzX2xpc3RfbWlhb3NoYSIsImNvbXB1dGVkIiwibWV0aG9kcyIsInBhc0hhbmxkIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJ0YXBOYW1lIiwidXJsIiwidGhhdCIsImZ4TWVtYmVyQXBwbHkiLCJyZXNEYXRhIiwiZGF0YXMiLCJzdGF0ZSIsInd4Iiwic2hvd01vZGFsIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiJG5hdmlnYXRlIiwianVtcERldGFpbHMiLCJnb29kc19pZCIsInNhbGVfdHlwZSIsIm5hdlNlYXJjaCIsImxvZ29IYW5sZCIsInByZXZpZXdJbWFnZSIsInVybHMiLCJldmVudHMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImdldEFwcFVzZXJJbmZvIiwid2VweSIsImxvZ2luIiwidXNlciIsImdldFN0b3JhZ2VTeW5jIiwidG9rZW4iLCJnZXRUb2tlbiIsImNvZGUiLCJ0aGVuIiwic2V0U3RvcmFnZVN5bmMiLCJpbmRleERlZmF1bHRJbmZvIiwiYXJlYSIsImJhbm5lciIsIiRhcHBseSIsInJlcXVlc3RJbmRleEdvb2RzTGlzdCIsImdvb2RzR2JsaXN0IiwibGlzdCIsImluZGV4R29vZHNMaXN0IiwidHlwZSIsInBhZ2UiLCJjb25jYXQiLCJhcHAiLCJ3YXJuIiwiY2FuSVVzZSIsInVzZXJJbmZvUmVhZHlDYWxsYmFjayIsImdldFVzZXJJbmZvIiwiZGV0YWlsIiwiZXJyTXNnIiwic2V0VXNlcmluZm8iLCJuaWNrTmFtZSIsImdlbmRlciIsImF2YXRhclVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQUxxQztBQUNyQyxJQUFJQSxRQUFRQyxRQUFRLHFCQUFSLENBQVosQyxDQUE0QztBQUM1QyxJQUFJQyxNQUFNRCxRQUFRLFdBQVIsQ0FBVjs7QUFHZ0Q7OztJQUczQkUsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsWUFBVyxFQUFDLGNBQWEsRUFBZCxFQUFpQixnQkFBZSxFQUFoQyxFQUFtQyx1QkFBc0IsU0FBekQsRUFBbUUsd0JBQXVCLFVBQTFGLEVBQVosRSxRQUNUQyxPLEdBQVUsRUFBQyxZQUFXLEVBQUMsaUJBQWdCLFVBQWpCLEVBQVosRSxRQUNUQyxVLEdBQWE7QUFDVkMsV0FBS0EsYUFESztBQUVWQztBQUZVLEssUUFLWkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGVBQVMsS0FESixFQUNZO0FBQ2pCQyxnQkFBVSxNQUZMLEVBRWE7QUFDbEJDLGdCQUFVLEVBSEw7QUFJTEMsbUJBQWEsS0FKUjtBQUtMQyxnQkFBVSxFQUxMO0FBTUxDLHFCQUFlLEVBTlY7QUFPTEMsaUJBQVcsT0FQTjtBQVFMQyxrQkFBWSxDQUNWLEVBQUVDLElBQUksR0FBTixFQUFXQyxLQUFLLHlCQUFoQixFQUEyQ0MsT0FBTyxNQUFsRCxFQURVLEVBRVYsRUFBRUYsSUFBSSxHQUFOLEVBQVdDLEtBQUsseUJBQWhCLEVBQTJDQyxPQUFPLE1BQWxELEVBRlUs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QUEvQjtBQUNBLG1CQUFLRCxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsbUJBQUs2RCxNQUFMO0FBQ0Q7QUFQWSxTQUFmO0FBU0Q7QUFDRjs7O2dDQUNXeEMsQyxFQUFHO0FBQ2IsVUFBSWdELE1BQU0sS0FBS3ZCLE9BQWY7QUFDQSxVQUFJekIsRUFBRXFELE1BQUYsQ0FBU0MsTUFBVCxJQUFtQixnQkFBdkIsRUFBeUM7QUFDdkNOLFlBQUl0QixVQUFKLENBQWU5QyxRQUFmLEdBQTBCb0IsRUFBRXFELE1BQUYsQ0FBU3pFLFFBQW5DO0FBQ0EsYUFBS0EsUUFBTCxHQUFnQm9FLElBQUl0QixVQUFKLENBQWU5QyxRQUEvQjtBQUNBLGFBQUtELFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxZQUFJQyxXQUFXb0IsRUFBRXFELE1BQUYsQ0FBU3pFLFFBQXhCO0FBQ0Esd0JBQUs7QUFDSHdCLGVBQUt4QyxJQUFJMkYsV0FETjtBQUVIaEYsZ0JBQU07QUFDSmlGLHNCQUFVNUUsU0FBUzRFLFFBRGY7QUFFSkMsb0JBQVE3RSxTQUFTNkUsTUFGYjtBQUdKQyx1QkFBVzlFLFNBQVM4RTtBQUhoQjtBQUZILFNBQUw7QUFRRDtBQUNGOzs7d0NBRW1CLENBQUU7OztvQ0FDTDtBQUNmLFVBQUcsS0FBS2xFLE9BQVIsRUFBaUI7QUFDZixhQUFLQyxPQUFMO0FBQ0EsYUFBS2dELHFCQUFMO0FBQ0Q7QUFDRjs7O3NDQUNpQnpDLEMsRUFBRyxDQUNwQjs7OztFQXpNZ0M0QixlQUFLa0IsSTs7a0JBQW5CakYsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG5hdiBmcm9tICcuLi9jb21wb25lbnRzL25hdic7IC8vIOW6lemDqOWvvOiIqlxyXG52YXIgdGltZXIgPSByZXF1aXJlKCcuLi91dGlscy93eFRpbWVyLmpzJyk7IC8vIOWAkuiuoeaXtlxyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcbmltcG9ydCBwYXNwb3B1cCBmcm9tICcuLi9jb21wb25lbnRzL3Bhc19wb3B1cCc7IC8vIOW6lemDqOWvvOiIqlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aaW6aG1J1xyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInBhc3BvcHVwXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhc0ZsYWcuc3luY1wiOlwicGFzRmxhZ1wiLFwidi1iaW5kOnBhc1ByaWNlLnN5bmNcIjpcInBhc1ByaWNlXCJ9fTtcclxuJGV2ZW50cyA9IHtcInBhc3BvcHVwXCI6e1widi1vbjpwYXNIYW5sZFwiOlwicGFzSGFubGRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIG5hdjogbmF2LFxyXG4gICAgcGFzcG9wdXBcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHBhc0ZsYWc6IGZhbHNlLCAgLy8g5L2Z6aKd5pSv5LuYXHJcbiAgICBwYXNQcmljZTogJzEwMDAnLCAvLyDkvZnpop3mlK/ku5hcclxuICAgIGNob29lc0lkOiAnJyxcclxuICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcclxuICAgIHVzZXJJbmZvOiB7fSxcclxuICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgYmVnaW5UaW1lOiAnMTg6MDAnLFxyXG4gICAgQ2hvb2VzRGF0YTogW1xyXG4gICAgICB7IGlkOiAnNycsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTEucG5nJywgdGl0bGU6ICfpmZDml7bnp5LmnYAnIH0sXHJcbiAgICAgIHsgaWQ6ICcyJywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxMi5wbmcnLCB0aXRsZTogJ+eJueWNlumihOi0rScgfSxcclxuICAgICAgeyBpZDogJzUnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTEzLnBuZycsIHRpdGxlOiAn56CN5Lu3JyB9LFxyXG4gICAgICB7IGlkOiAnMScsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTQucG5nJywgdGl0bGU6ICflkIjkvJnkuronIH0sXHJcbiAgICAgIHsgaWQ6ICczJywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNS5wbmcnLCB0aXRsZTogJ+enkui1mumSsScgfSxcclxuICAgICAgeyBpZDogJzQnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE2LnBuZycsIHRpdGxlOiAn6aKG5Yi4JyB9LFxyXG4gICAgICB7IGlkOiAnNicsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTcucG5nJywgdGl0bGU6ICfnibnnuqbllYbmiLcnIH0sXHJcbiAgICAgIHsgaWQ6ICc4JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxOC5wbmcnLCB0aXRsZTogJ+abtOWkmumikemBkycgfVxyXG4gICAgXSxcclxuICAgIC8vIOi9ruaSrVxyXG4gICAgaW1nVXJsczogW10sXHJcbiAgICB3eFRpbWVyTGlzdDoge30sIC8vIOWAkuiuoeaXtlxyXG4gICAgZ29vZHNfbGlzdDogW10sIC8vIOWVhuWTgeWIl+ihqFxyXG4gICAgYXJlYUFycjogW10sIC8vIGFyZWHljLrln59cclxuICAgIGJhbm5lckFycjogW10sIC8v6L2u5pKt5Zu+XHJcbiAgICBoYXNtb3JlOiBmYWxzZSwgLy8g5piv5ZCm5pyJ5LiL5LiA6aG1XHJcbiAgICBjdXJwYWdlOiAxLCAvL+W9k+WJjemhteaVsFxyXG4gICAgaXNKb2luOiAnJywgLy8g5ZWG5a625YWl6am754q25oCBXHJcbiAgICBnb29kc19saXN0X3l1c2hvdTogW10sXHJcbiAgICBnb29kc19saXN0X21pYW9zaGE6IFtdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBhc3luYyBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgdGhpcy5nZXRBcHBVc2VySW5mbygpO1xyXG4gICAgdmFyIGRhdGEgPSBhd2FpdCB3ZXB5LmxvZ2luKCk7XHJcbiAgICB2YXIgdXNlciA9IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VyJylcclxuICAgIGlmKCF1c2VyLnRva2VuKSB7XHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLmdldFRva2VuLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGNvZGU6IGRhdGEuY29kZVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXM9PiB7XHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXInLCByZXMuZGF0YXMpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6aaW6aG1Lei9ruaSreWbvuWSjGFyZWFBcnLoj5zljZVcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5pbmRleERlZmF1bHRJbmZvLFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5hcmVhQXJyID0gcmVzLmRhdGFzLmFyZWEgfHwgW107XHJcbiAgICAgICAgdGhpcy5iYW5uZXJBcnIgPSByZXMuZGF0YXMuYmFubmVyIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucmVxdWVzdEluZGV4R29vZHNMaXN0KClcclxuXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuZ29vZHNHYmxpc3RcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5nb29kc19saXN0X3l1c2hvdSA9IHJlcy5kYXRhcy5nb29kc19saXN0X3l1c2hvdS5saXN0IHx8IFtdXHJcbiAgICAgIHRoaXMuZ29vZHNfbGlzdF9taWFvc2hhID0gcmVzLmRhdGFzLmdvb2RzX2xpc3QubGlzdCB8fCBbXVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBcclxuICAvLyDpppbpobXigJTmma7pgJrllYblk4HliJfooajmjqXlj6NcclxuICByZXF1ZXN0SW5kZXhHb29kc0xpc3QoKSB7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuaW5kZXhHb29kc0xpc3QsXHJcbiAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcGFnZTogMTAsXHJcbiAgICAgICAgY3VycGFnZTogdGhpcy5jdXJwYWdlXHJcbiAgICAgIH0sXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB2YXIgbGlzdCA9IHJlcy5kYXRhcy5nb29kc19saXN0IHx8IFtdXHJcbiAgICAgICAgdGhpcy5nb29kc19saXN0ID0gdGhpcy5nb29kc19saXN0LmNvbmNhdChsaXN0KVxyXG4gICAgICAgIHRoaXMuaGFzbW9yZSA9IHJlcy5oYXNtb3JlXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvblNob3coKSB7fVxyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgLy8g5L2Z6aKd5pSv5LuY5a+G56CB5Zue6LCDXHJcbiAgICBwYXNIYW5sZChlKXtcclxuICAgICAgY29uc29sZS5sb2coZSlcclxuICAgICAgdGhpcy5wYXNGbGFnID0gZmFsc2VcclxuICAgIH0sXHJcbiAgICBhc3luYyB0YXBOYW1lKHVybCwgaWQpIHtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIGlmKHVybCA9PSAnZGlzY291bnQnKSB7XHJcbiAgICAgICAgLy8g55Sz6K+35oiQ5Li65YiG6ZSA5ZWGXHJcbiAgICAgICAgdmFyIHJlc0RhdGEgPSBhd2FpdCBhamF4KHt1cmw6IGFwaS5meE1lbWJlckFwcGx5fSk7XHJcbiAgICAgICAgaWYocmVzRGF0YS5kYXRhcy5zdGF0ZSAhPSAyKSB7XHJcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICBjb250ZW50OiAn55Sz6K+35oiQ5Li65YiG6ZSA5ZGYPycsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kbmF2aWdhdGUoJ2Rpc3RyaWJ1dGlvbicpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKHVybClcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoe3VybDogdXJsfSlcclxuICAgIH0sXHJcbiAgICBqdW1wRGV0YWlscyhnb29kc19pZCwgc2FsZV90eXBlKSB7XHJcbiAgICAgIGlmKHNhbGVfdHlwZSA9PSAncnVzaHNhbGVzJykge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKGAvcGFnZXMvc2Vja2lsbFNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoYC9wYWdlcy9zaG9wRGV0YWlscz9nb29kc19pZD0ke2dvb2RzX2lkfWApO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgbmF2U2VhcmNoKCkge1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL3NlYXJjaCcpO1xyXG4gICAgfSxcclxuICAgIGxvZ29IYW5sZCgpe1xyXG4gICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgIHVybHM6IFsnL2Fzc2V0cy9pbWcvbG9nby5wbmcnXVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBnZXRBcHBVc2VySW5mbygpIHtcclxuICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICBpZiAoYXBwLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgY29uc29sZS53YXJuKCdnbG9iYWxEYXRhJyk7XHJcbiAgICAgIHRoaXMudXNlckluZm8gPSBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0gZWxzZSBpZiAod3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpKSB7XHJcbiAgICAgIGFwcC51c2VySW5mb1JlYWR5Q2FsbGJhY2sgPSByZXMgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUud2FybigndXNlckluZm9SZWFkeUNhbGxiYWNrJyk7XHJcbiAgICAgICAgdGhpcy51c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgICB0aGlzLmhhc1VzZXJJbmZvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUud2FybignZ2V0VXNlckluZm8nKTtcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICAgICAgdGhpcy51c2VySW5mbyA9IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0VXNlckluZm8oZSkge1xyXG4gICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgIGlmIChlLmRldGFpbC5lcnJNc2cgPT0gJ2dldFVzZXJJbmZvOm9rJykge1xyXG4gICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvO1xyXG4gICAgICB0aGlzLnVzZXJJbmZvID0gYXBwLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgICB2YXIgdXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xyXG4gICAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5zZXRVc2VyaW5mbyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBuaWNrTmFtZTogdXNlckluZm8ubmlja05hbWUsXHJcbiAgICAgICAgICBnZW5kZXI6IHVzZXJJbmZvLmdlbmRlcixcclxuICAgICAgICAgIGF2YXRhclVybDogdXNlckluZm8uYXZhdGFyVXJsXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7fVxyXG4gIG9uUmVhY2hCb3R0b20gKCkge1xyXG4gICAgaWYodGhpcy5oYXNtb3JlKSB7XHJcbiAgICAgIHRoaXMuY3VycGFnZSArKyBcclxuICAgICAgdGhpcy5yZXF1ZXN0SW5kZXhHb29kc0xpc3QoKVxyXG4gICAgfVxyXG4gIH1cclxuICBvblB1bGxEb3duUmVmcmVzaChlKSB7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=