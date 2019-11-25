'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _ajax = require('./ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var api = require('./api.js');

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index', // 底部 首页
      'pages/class', // 分类
      'pages/settled', // 入驻
      'pages/shopCar', // 购物车
      'pages/user', // 我的
      'pages/membersCenter', // 会员中心
      'pages/userDeliveryAddress', // --我的收货地址
      'pages/newdeliveryAddress', // --我的新增地址
      'pages/discount', // 首页模块跳转 秒赚钱
      'pages/pre', // 首页模块跳转 预购
      'pages/sale', // 首页模块跳转 促销
      'pages/assemble', // 首页模块跳转 拼团
      'pages/bargain', // 首页模块跳转 砍价
      'pages/seckill', // 首页模块跳转 秒杀
      'pages/settlement', // 提交订单
      'pages/matchingGoods', // 组合销售 搭配商品页面
      'pages/button', // 所有弹窗 --test
      'pages/shopDetails', // 商品详情
      'pages/seckillShopDetails', // 秒杀商品详情
      'pages/preShopDetails', // 预购商品详情
      'pages/assembleShopDetails', // 拼团商品详情
      'pages/barginInfo', // 砍价 -- 砍价信息 --test
      'pages/search', // 搜索
      'pages/merchant', // 特约商户
      'pages/merchantIndex', // 商户首页
      'pages/applyPartner', // 申请合伙人
      'pages/partnerInput', // 申请合伙人填写
      'pages/moreChannels', // 更多频道
      'pages/orderlist', // 订单列表
      'pages/vip', // 会员
      'pages/settledIn', // 入驻
      'pages/settledInPay', // 入驻付款
      'pages/addressList', // 地址列表
      'pages/addAddress', // 添加地址
      'pages/consignee', // 商品详情跳转添加地址
      'pages/goodsList', 'pages/distribution', // 分销
      'pages/orderInfo', // 订单详情
      'pages/logistics', // 物流信息
      'pages/set-up', // 设置
      'pages/after-sale', //售后
      'pages/wallet', //钱包
      'pages/coupon-list', //优惠券列表
      'pages/wallet-input', //钱包提现输入
      'pages/bargain-list'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#ffffff',
        navigationBarTitleText: '华都详',
        navigationBarTextStyle: 'black'
      }
    };
    _this.globalData = {
      userInfo: '',
      requestImgUrl: 'https://www.hdxsy.cn/system/upfiles/'
    };

    _this.use('promisify');
    _this.intercept('request', {
      config: function config(p) {
        // p.timestamp = new Date().getTime();
        return p;
      },
      success: function success(p) {
        return p;
      },
      fail: function fail(p) {},
      complete: function complete(p) {}
    });
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var data, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // 获取用户信息
                wx.getSetting({
                  success: function success(res) {
                    if (res.authSetting['scope.userInfo']) {
                      wx.getUserInfo({
                        success: function success(res) {
                          _this2.globalData.userInfo = res.userInfo;
                          if (_this2.userInfoReadyCallback) {
                            _this2.userInfoReadyCallback(res);
                          }
                        }
                      });
                    }
                  }
                });

                _context.next = 3;
                return _wepy2.default.login();

              case 3:
                data = _context.sent;
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

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLaunch() {
        return _ref.apply(this, arguments);
      }

      return onLaunch;
    }()
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiY29uZmlnIiwicGFnZXMiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwicmVxdWVzdEltZ1VybCIsInVzZSIsImludGVyY2VwdCIsInAiLCJzdWNjZXNzIiwiZmFpbCIsImNvbXBsZXRlIiwid3giLCJnZXRTZXR0aW5nIiwicmVzIiwiYXV0aFNldHRpbmciLCJnZXRVc2VySW5mbyIsInVzZXJJbmZvUmVhZHlDYWxsYmFjayIsIndlcHkiLCJsb2dpbiIsImRhdGEiLCJ1c2VyIiwiZ2V0U3RvcmFnZVN5bmMiLCJ0b2tlbiIsInVybCIsImdldFRva2VuIiwiY29kZSIsInRoZW4iLCJzZXRTdG9yYWdlU3luYyIsImRhdGFzIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFVBQVIsQ0FBVjs7Ozs7QUFJRSxzQkFBYztBQUFBOztBQUFBOztBQUFBLFVBZWRDLE1BZmMsR0FlTDtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUNVO0FBQ2YsbUJBRkssRUFFVTtBQUNmLHFCQUhLLEVBR1k7QUFDakIscUJBSkssRUFJWTtBQUNqQixrQkFMSyxFQUtTO0FBQ2QsMkJBTkssRUFNa0I7QUFDdkIsaUNBUEssRUFPd0I7QUFDN0IsZ0NBUkssRUFRdUI7QUFDNUIsc0JBVEssRUFTYTtBQUNsQixpQkFWSyxFQVVRO0FBQ2Isa0JBWEssRUFXUztBQUNkLHNCQVpLLEVBWWE7QUFDbEIscUJBYkssRUFhWTtBQUNqQixxQkFkSyxFQWNZO0FBQ2pCLHdCQWZLLEVBZWU7QUFDcEIsMkJBaEJLLEVBZ0JrQjtBQUN2QixvQkFqQkssRUFpQlc7QUFDaEIseUJBbEJLLEVBa0JnQjtBQUNyQixnQ0FuQkssRUFtQnVCO0FBQzVCLDRCQXBCSyxFQW9CbUI7QUFDeEIsaUNBckJLLEVBcUJ3QjtBQUM3Qix3QkF0QkssRUFzQmU7QUFDcEIsb0JBdkJLLEVBdUJXO0FBQ2hCLHNCQXhCSyxFQXdCYTtBQUNsQiwyQkF6QkssRUF5QmtCO0FBQ3ZCLDBCQTFCSyxFQTBCaUI7QUFDdEIsMEJBM0JLLEVBMkJpQjtBQUN0QiwwQkE1QkssRUE0QmlCO0FBQ3RCLHVCQTdCSyxFQTZCYztBQUNuQixpQkE5QkssRUE4QlE7QUFDYix1QkEvQkssRUErQmM7QUFDbkIsMEJBaENLLEVBZ0NpQjtBQUN0Qix5QkFqQ0ssRUFpQ2dCO0FBQ3JCLHdCQWxDSyxFQWtDZTtBQUNwQix1QkFuQ0ssRUFtQ2M7QUFDbkIsdUJBcENLLEVBcUNMLG9CQXJDSyxFQXFDaUI7QUFDdEIsdUJBdENLLEVBc0NjO0FBQ25CLHVCQXZDSyxFQXVDYztBQUNuQixvQkF4Q0ssRUF3Q1c7QUFDaEIsd0JBekNLLEVBeUNlO0FBQ3BCLG9CQTFDSyxFQTBDVztBQUNoQix5QkEzQ0ssRUEyQ2dCO0FBQ3JCLDBCQTVDSyxFQTRDaUI7QUFDdEIsMEJBN0NLLENBREE7QUFnRFBDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLFNBRnhCO0FBR05DLGdDQUF3QixLQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEI7QUFoREQsS0FmSztBQUFBLFVBc0VkQyxVQXRFYyxHQXNFRDtBQUNYQyxnQkFBVSxFQURDO0FBRVhDLHFCQUFlO0FBRkosS0F0RUM7O0FBRVosVUFBS0MsR0FBTCxDQUFTLFdBQVQ7QUFDQSxVQUFLQyxTQUFMLENBQWUsU0FBZixFQUEwQjtBQUN4QlgsWUFEd0Isa0JBQ2pCWSxDQURpQixFQUNkO0FBQ1I7QUFDQSxlQUFPQSxDQUFQO0FBQ0QsT0FKdUI7QUFLeEJDLGFBTHdCLG1CQUtoQkQsQ0FMZ0IsRUFLYjtBQUNULGVBQU9BLENBQVA7QUFDRCxPQVB1QjtBQVF4QkUsVUFSd0IsZ0JBUW5CRixDQVJtQixFQVFoQixDQUFFLENBUmM7QUFTeEJHLGNBVHdCLG9CQVNmSCxDQVRlLEVBU1osQ0FBRTtBQVRVLEtBQTFCO0FBSFk7QUFjYjs7Ozs7Ozs7Ozs7OztBQTZEQztBQUNBSSxtQkFBR0MsVUFBSCxDQUFjO0FBQ1pKLDJCQUFTLHNCQUFPO0FBQ2Qsd0JBQUlLLElBQUlDLFdBQUosQ0FBZ0IsZ0JBQWhCLENBQUosRUFBdUM7QUFDckNILHlCQUFHSSxXQUFILENBQWU7QUFDYlAsaUNBQVMsc0JBQU87QUFDZCxpQ0FBS04sVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJVLElBQUlWLFFBQS9CO0FBQ0EsOEJBQUksT0FBS2EscUJBQVQsRUFBZ0M7QUFDOUIsbUNBQUtBLHFCQUFMLENBQTJCSCxHQUEzQjtBQUNEO0FBQ0Y7QUFOWSx1QkFBZjtBQVFEO0FBQ0Y7QUFaVyxpQkFBZDs7O3VCQWVpQkksZUFBS0MsS0FBTCxFOzs7QUFBYkMsb0I7QUFDQUMsb0IsR0FBT1QsR0FBR1UsY0FBSCxDQUFrQixNQUFsQixDOztBQUNYLG9CQUFHLENBQUNELEtBQUtFLEtBQVQsRUFBZ0I7QUFDZCxrQ0FBSztBQUNIQyx5QkFBSzlCLElBQUkrQixRQUROO0FBRUhMLDBCQUFNO0FBQ0pNLDRCQUFNTixLQUFLTTtBQURQO0FBRkgsbUJBQUwsRUFLR0MsSUFMSCxDQUtRLGVBQU07QUFDWmYsdUJBQUdnQixjQUFILENBQWtCLE1BQWxCLEVBQTBCZCxJQUFJZSxLQUE5QjtBQUNELG1CQVBEO0FBUUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF2R3dCWCxlQUFLWSxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy51c2UoJ3Byb21pc2lmeScpO1xyXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XHJcbiAgICAgIGNvbmZpZyhwKSB7XHJcbiAgICAgICAgLy8gcC50aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgICAgfSxcclxuICAgICAgc3VjY2VzcyhwKSB7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWwocCkge30sXHJcbiAgICAgIGNvbXBsZXRlKHApIHt9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL2luZGV4JywgLy8g5bqV6YOoIOmmlumhtVxyXG4gICAgICAncGFnZXMvY2xhc3MnLCAvLyDliIbnsbtcclxuICAgICAgJ3BhZ2VzL3NldHRsZWQnLCAvLyDlhaXpqbtcclxuICAgICAgJ3BhZ2VzL3Nob3BDYXInLCAvLyDotK3nianovaZcclxuICAgICAgJ3BhZ2VzL3VzZXInLCAvLyDmiJHnmoRcclxuICAgICAgJ3BhZ2VzL21lbWJlcnNDZW50ZXInLCAvLyDkvJrlkZjkuK3lv4NcclxuICAgICAgJ3BhZ2VzL3VzZXJEZWxpdmVyeUFkZHJlc3MnLCAvLyAtLeaIkeeahOaUtui0p+WcsOWdgFxyXG4gICAgICAncGFnZXMvbmV3ZGVsaXZlcnlBZGRyZXNzJywgLy8gLS3miJHnmoTmlrDlop7lnLDlnYBcclxuICAgICAgJ3BhZ2VzL2Rpc2NvdW50JywgLy8g6aaW6aG15qih5Z2X6Lez6L2sIOenkui1mumSsVxyXG4gICAgICAncGFnZXMvcHJlJywgLy8g6aaW6aG15qih5Z2X6Lez6L2sIOmihOi0rVxyXG4gICAgICAncGFnZXMvc2FsZScsIC8vIOmmlumhteaooeWdl+i3s+i9rCDkv4PplIBcclxuICAgICAgJ3BhZ2VzL2Fzc2VtYmxlJywgLy8g6aaW6aG15qih5Z2X6Lez6L2sIOaLvOWbolxyXG4gICAgICAncGFnZXMvYmFyZ2FpbicsIC8vIOmmlumhteaooeWdl+i3s+i9rCDnoI3ku7dcclxuICAgICAgJ3BhZ2VzL3NlY2tpbGwnLCAvLyDpppbpobXmqKHlnZfot7Povawg56eS5p2AXHJcbiAgICAgICdwYWdlcy9zZXR0bGVtZW50JywgLy8g5o+Q5Lqk6K6i5Y2VXHJcbiAgICAgICdwYWdlcy9tYXRjaGluZ0dvb2RzJywgLy8g57uE5ZCI6ZSA5ZSuIOaQremFjeWVhuWTgemhtemdolxyXG4gICAgICAncGFnZXMvYnV0dG9uJywgLy8g5omA5pyJ5by556qXIC0tdGVzdFxyXG4gICAgICAncGFnZXMvc2hvcERldGFpbHMnLCAvLyDllYblk4Hor6bmg4VcclxuICAgICAgJ3BhZ2VzL3NlY2tpbGxTaG9wRGV0YWlscycsIC8vIOenkuadgOWVhuWTgeivpuaDhVxyXG4gICAgICAncGFnZXMvcHJlU2hvcERldGFpbHMnLCAvLyDpooTotK3llYblk4Hor6bmg4VcclxuICAgICAgJ3BhZ2VzL2Fzc2VtYmxlU2hvcERldGFpbHMnLCAvLyDmi7zlm6LllYblk4Hor6bmg4VcclxuICAgICAgJ3BhZ2VzL2JhcmdpbkluZm8nLCAvLyDnoI3ku7cgLS0g56CN5Lu35L+h5oGvIC0tdGVzdFxyXG4gICAgICAncGFnZXMvc2VhcmNoJywgLy8g5pCc57SiXHJcbiAgICAgICdwYWdlcy9tZXJjaGFudCcsIC8vIOeJuee6puWVhuaIt1xyXG4gICAgICAncGFnZXMvbWVyY2hhbnRJbmRleCcsIC8vIOWVhuaIt+mmlumhtVxyXG4gICAgICAncGFnZXMvYXBwbHlQYXJ0bmVyJywgLy8g55Sz6K+35ZCI5LyZ5Lq6XHJcbiAgICAgICdwYWdlcy9wYXJ0bmVySW5wdXQnLCAvLyDnlLPor7flkIjkvJnkurrloavlhplcclxuICAgICAgJ3BhZ2VzL21vcmVDaGFubmVscycsIC8vIOabtOWkmumikemBk1xyXG4gICAgICAncGFnZXMvb3JkZXJsaXN0JywgLy8g6K6i5Y2V5YiX6KGoXHJcbiAgICAgICdwYWdlcy92aXAnLCAvLyDkvJrlkZhcclxuICAgICAgJ3BhZ2VzL3NldHRsZWRJbicsIC8vIOWFpempu1xyXG4gICAgICAncGFnZXMvc2V0dGxlZEluUGF5JywgLy8g5YWl6am75LuY5qy+XHJcbiAgICAgICdwYWdlcy9hZGRyZXNzTGlzdCcsIC8vIOWcsOWdgOWIl+ihqFxyXG4gICAgICAncGFnZXMvYWRkQWRkcmVzcycsIC8vIOa3u+WKoOWcsOWdgFxyXG4gICAgICAncGFnZXMvY29uc2lnbmVlJywgLy8g5ZWG5ZOB6K+m5oOF6Lez6L2s5re75Yqg5Zyw5Z2AXHJcbiAgICAgICdwYWdlcy9nb29kc0xpc3QnLFxyXG4gICAgICAncGFnZXMvZGlzdHJpYnV0aW9uJywgLy8g5YiG6ZSAXHJcbiAgICAgICdwYWdlcy9vcmRlckluZm8nLCAvLyDorqLljZXor6bmg4VcclxuICAgICAgJ3BhZ2VzL2xvZ2lzdGljcycsIC8vIOeJqea1geS/oeaBr1xyXG4gICAgICAncGFnZXMvc2V0LXVwJywgLy8g6K6+572uXHJcbiAgICAgICdwYWdlcy9hZnRlci1zYWxlJywgLy/llK7lkI5cclxuICAgICAgJ3BhZ2VzL3dhbGxldCcsIC8v6ZKx5YyFXHJcbiAgICAgICdwYWdlcy9jb3Vwb24tbGlzdCcsIC8v5LyY5oOg5Yi45YiX6KGoXHJcbiAgICAgICdwYWdlcy93YWxsZXQtaW5wdXQnLCAvL+mSseWMheaPkOeOsOi+k+WFpVxyXG4gICAgICAncGFnZXMvYmFyZ2Fpbi1saXN0JywgLy/pkrHljIXmj5DnjrDovpPlhaVcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y2O6YO96K+mJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xyXG4gICAgfVxyXG4gIH07XHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIHVzZXJJbmZvOiAnJyxcclxuICAgIHJlcXVlc3RJbWdVcmw6ICdodHRwczovL3d3dy5oZHhzeS5jbi9zeXN0ZW0vdXBmaWxlcy8nXHJcbiAgfTtcclxuICBhc3luYyBvbkxhdW5jaCgpIHtcclxuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xyXG4gICAgd3guZ2V0U2V0dGluZyh7XHJcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xyXG4gICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgICAgICAgICBpZiAodGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlckluZm9SZWFkeUNhbGxiYWNrKHJlcyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBkYXRhID0gYXdhaXQgd2VweS5sb2dpbigpO1xyXG4gICAgdmFyIHVzZXIgPSB3eC5nZXRTdG9yYWdlU3luYygndXNlcicpXHJcbiAgICBpZighdXNlci50b2tlbikge1xyXG4gICAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5nZXRUb2tlbixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBjb2RlOiBkYXRhLmNvZGVcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzPT4ge1xyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd1c2VyJywgcmVzLmRhdGFzKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=