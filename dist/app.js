'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      'pages/set-up'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#ffffff',
        navigationBarTitleText: '华都详',
        navigationBarTextStyle: 'black'
      }
    };
    _this.globalData = {
      userInfo: '',
      requestImgUrl: 'http://www.shopdate.me/system/upfiles/'
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
    value: function onLaunch() {
      var _this2 = this;

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
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJyZXF1ZXN0SW1nVXJsIiwidXNlIiwiaW50ZXJjZXB0IiwicCIsInN1Y2Nlc3MiLCJmYWlsIiwiY29tcGxldGUiLCJ3eCIsImdldFNldHRpbmciLCJyZXMiLCJhdXRoU2V0dGluZyIsImdldFVzZXJJbmZvIiwidXNlckluZm9SZWFkeUNhbGxiYWNrIiwid2VweSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7OztBQUdFLHNCQUFjO0FBQUE7O0FBQUE7O0FBQUEsVUFlZEEsTUFmYyxHQWVMO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBQ1U7QUFDZixtQkFGSyxFQUVVO0FBQ2YscUJBSEssRUFHWTtBQUNqQixxQkFKSyxFQUlZO0FBQ2pCLGtCQUxLLEVBS1M7QUFDZCwyQkFOSyxFQU1rQjtBQUN2QixpQ0FQSyxFQU93QjtBQUM3QixnQ0FSSyxFQVF1QjtBQUM1QixzQkFUSyxFQVNhO0FBQ2xCLGlCQVZLLEVBVVE7QUFDYixrQkFYSyxFQVdTO0FBQ2Qsc0JBWkssRUFZYTtBQUNsQixxQkFiSyxFQWFZO0FBQ2pCLHFCQWRLLEVBY1k7QUFDakIsd0JBZkssRUFlZTtBQUNwQiwyQkFoQkssRUFnQmtCO0FBQ3ZCLG9CQWpCSyxFQWlCVztBQUNoQix5QkFsQkssRUFrQmdCO0FBQ3JCLGdDQW5CSyxFQW1CdUI7QUFDNUIsNEJBcEJLLEVBb0JtQjtBQUN4QixpQ0FyQkssRUFxQndCO0FBQzdCLHdCQXRCSyxFQXNCZTtBQUNwQixvQkF2QkssRUF1Qlc7QUFDaEIsc0JBeEJLLEVBd0JhO0FBQ2xCLDJCQXpCSyxFQXlCa0I7QUFDdkIsMEJBMUJLLEVBMEJpQjtBQUN0QiwwQkEzQkssRUEyQmlCO0FBQ3RCLDBCQTVCSyxFQTRCaUI7QUFDdEIsdUJBN0JLLEVBNkJjO0FBQ25CLGlCQTlCSyxFQThCUTtBQUNiLHVCQS9CSyxFQStCYztBQUNuQiwwQkFoQ0ssRUFnQ2lCO0FBQ3RCLHlCQWpDSyxFQWlDZ0I7QUFDckIsd0JBbENLLEVBa0NlO0FBQ3BCLHVCQW5DSyxFQW1DYztBQUNuQix1QkFwQ0ssRUFxQ0wsb0JBckNLLEVBcUNpQjtBQUN0Qix1QkF0Q0ssRUFzQ2M7QUFDbkIsdUJBdkNLLEVBdUNjO0FBQ25CLG9CQXhDSyxDQURBO0FBNENQQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixTQUZ4QjtBQUdOQyxnQ0FBd0IsS0FIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCO0FBNUNELEtBZks7QUFBQSxVQWtFZEMsVUFsRWMsR0FrRUQ7QUFDWEMsZ0JBQVUsRUFEQztBQUVYQyxxQkFBZTtBQUZKLEtBbEVDOztBQUVaLFVBQUtDLEdBQUwsQ0FBUyxXQUFUO0FBQ0EsVUFBS0MsU0FBTCxDQUFlLFNBQWYsRUFBMEI7QUFDeEJYLFlBRHdCLGtCQUNqQlksQ0FEaUIsRUFDZDtBQUNSO0FBQ0EsZUFBT0EsQ0FBUDtBQUNELE9BSnVCO0FBS3hCQyxhQUx3QixtQkFLaEJELENBTGdCLEVBS2I7QUFDVCxlQUFPQSxDQUFQO0FBQ0QsT0FQdUI7QUFReEJFLFVBUndCLGdCQVFuQkYsQ0FSbUIsRUFRaEIsQ0FBRSxDQVJjO0FBU3hCRyxjQVR3QixvQkFTZkgsQ0FUZSxFQVNaLENBQUU7QUFUVSxLQUExQjtBQUhZO0FBY2I7Ozs7K0JBd0RVO0FBQUE7O0FBQ1Q7QUFDQUksU0FBR0MsVUFBSCxDQUFjO0FBQ1pKLGlCQUFTLHNCQUFPO0FBQ2QsY0FBSUssSUFBSUMsV0FBSixDQUFnQixnQkFBaEIsQ0FBSixFQUF1QztBQUNyQ0gsZUFBR0ksV0FBSCxDQUFlO0FBQ2JQLHVCQUFTLHNCQUFPO0FBQ2QsdUJBQUtOLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCVSxJQUFJVixRQUEvQjtBQUNBLG9CQUFJLE9BQUthLHFCQUFULEVBQWdDO0FBQzlCLHlCQUFLQSxxQkFBTCxDQUEyQkgsR0FBM0I7QUFDRDtBQUNGO0FBTlksYUFBZjtBQVFEO0FBQ0Y7QUFaVyxPQUFkO0FBY0Q7Ozs7RUF2RjBCSSxlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKTtcclxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xyXG4gICAgICBjb25maWcocCkge1xyXG4gICAgICAgIC8vIHAudGltZXN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgIH0sXHJcbiAgICAgIHN1Y2Nlc3MocCkge1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgICB9LFxyXG4gICAgICBmYWlsKHApIHt9LFxyXG4gICAgICBjb21wbGV0ZShwKSB7fVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9pbmRleCcsIC8vIOW6lemDqCDpppbpobVcclxuICAgICAgJ3BhZ2VzL2NsYXNzJywgLy8g5YiG57G7XHJcbiAgICAgICdwYWdlcy9zZXR0bGVkJywgLy8g5YWl6am7XHJcbiAgICAgICdwYWdlcy9zaG9wQ2FyJywgLy8g6LSt54mp6L2mXHJcbiAgICAgICdwYWdlcy91c2VyJywgLy8g5oiR55qEXHJcbiAgICAgICdwYWdlcy9tZW1iZXJzQ2VudGVyJywgLy8g5Lya5ZGY5Lit5b+DXHJcbiAgICAgICdwYWdlcy91c2VyRGVsaXZlcnlBZGRyZXNzJywgLy8gLS3miJHnmoTmlLbotKflnLDlnYBcclxuICAgICAgJ3BhZ2VzL25ld2RlbGl2ZXJ5QWRkcmVzcycsIC8vIC0t5oiR55qE5paw5aKe5Zyw5Z2AXHJcbiAgICAgICdwYWdlcy9kaXNjb3VudCcsIC8vIOmmlumhteaooeWdl+i3s+i9rCDnp5LotZrpkrFcclxuICAgICAgJ3BhZ2VzL3ByZScsIC8vIOmmlumhteaooeWdl+i3s+i9rCDpooTotK1cclxuICAgICAgJ3BhZ2VzL3NhbGUnLCAvLyDpppbpobXmqKHlnZfot7Povawg5L+D6ZSAXHJcbiAgICAgICdwYWdlcy9hc3NlbWJsZScsIC8vIOmmlumhteaooeWdl+i3s+i9rCDmi7zlm6JcclxuICAgICAgJ3BhZ2VzL2JhcmdhaW4nLCAvLyDpppbpobXmqKHlnZfot7Povawg56CN5Lu3XHJcbiAgICAgICdwYWdlcy9zZWNraWxsJywgLy8g6aaW6aG15qih5Z2X6Lez6L2sIOenkuadgFxyXG4gICAgICAncGFnZXMvc2V0dGxlbWVudCcsIC8vIOaPkOS6pOiuouWNlVxyXG4gICAgICAncGFnZXMvbWF0Y2hpbmdHb29kcycsIC8vIOe7hOWQiOmUgOWUriDmkK3phY3llYblk4HpobXpnaJcclxuICAgICAgJ3BhZ2VzL2J1dHRvbicsIC8vIOaJgOacieW8ueeqlyAtLXRlc3RcclxuICAgICAgJ3BhZ2VzL3Nob3BEZXRhaWxzJywgLy8g5ZWG5ZOB6K+m5oOFXHJcbiAgICAgICdwYWdlcy9zZWNraWxsU2hvcERldGFpbHMnLCAvLyDnp5LmnYDllYblk4Hor6bmg4VcclxuICAgICAgJ3BhZ2VzL3ByZVNob3BEZXRhaWxzJywgLy8g6aKE6LSt5ZWG5ZOB6K+m5oOFXHJcbiAgICAgICdwYWdlcy9hc3NlbWJsZVNob3BEZXRhaWxzJywgLy8g5ou85Zui5ZWG5ZOB6K+m5oOFXHJcbiAgICAgICdwYWdlcy9iYXJnaW5JbmZvJywgLy8g56CN5Lu3IC0tIOegjeS7t+S/oeaBryAtLXRlc3RcclxuICAgICAgJ3BhZ2VzL3NlYXJjaCcsIC8vIOaQnOe0olxyXG4gICAgICAncGFnZXMvbWVyY2hhbnQnLCAvLyDnibnnuqbllYbmiLdcclxuICAgICAgJ3BhZ2VzL21lcmNoYW50SW5kZXgnLCAvLyDllYbmiLfpppbpobVcclxuICAgICAgJ3BhZ2VzL2FwcGx5UGFydG5lcicsIC8vIOeUs+ivt+WQiOS8meS6ulxyXG4gICAgICAncGFnZXMvcGFydG5lcklucHV0JywgLy8g55Sz6K+35ZCI5LyZ5Lq65aGr5YaZXHJcbiAgICAgICdwYWdlcy9tb3JlQ2hhbm5lbHMnLCAvLyDmm7TlpJrpopHpgZNcclxuICAgICAgJ3BhZ2VzL29yZGVybGlzdCcsIC8vIOiuouWNleWIl+ihqFxyXG4gICAgICAncGFnZXMvdmlwJywgLy8g5Lya5ZGYXHJcbiAgICAgICdwYWdlcy9zZXR0bGVkSW4nLCAvLyDlhaXpqbtcclxuICAgICAgJ3BhZ2VzL3NldHRsZWRJblBheScsIC8vIOWFpempu+S7mOasvlxyXG4gICAgICAncGFnZXMvYWRkcmVzc0xpc3QnLCAvLyDlnLDlnYDliJfooahcclxuICAgICAgJ3BhZ2VzL2FkZEFkZHJlc3MnLCAvLyDmt7vliqDlnLDlnYBcclxuICAgICAgJ3BhZ2VzL2NvbnNpZ25lZScsIC8vIOWVhuWTgeivpuaDhei3s+i9rOa3u+WKoOWcsOWdgFxyXG4gICAgICAncGFnZXMvZ29vZHNMaXN0JyxcclxuICAgICAgJ3BhZ2VzL2Rpc3RyaWJ1dGlvbicsIC8vIOWIhumUgFxyXG4gICAgICAncGFnZXMvb3JkZXJJbmZvJywgLy8g6K6i5Y2V6K+m5oOFXHJcbiAgICAgICdwYWdlcy9sb2dpc3RpY3MnLCAvLyDnianmtYHkv6Hmga9cclxuICAgICAgJ3BhZ2VzL3NldC11cCcsIC8vIOiuvue9rlxyXG4gICAgICBcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y2O6YO96K+mJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xyXG4gICAgfVxyXG4gIH07XHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIHVzZXJJbmZvOiAnJyxcclxuICAgIHJlcXVlc3RJbWdVcmw6ICdodHRwOi8vd3d3LnNob3BkYXRlLm1lL3N5c3RlbS91cGZpbGVzLydcclxuICB9O1xyXG4gIG9uTGF1bmNoKCkge1xyXG4gICAgLy8g6I635Y+W55So5oi35L+h5oGvXHJcbiAgICB3eC5nZXRTZXR0aW5nKHtcclxuICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XHJcbiAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICAgICAgICAgIGlmICh0aGlzLnVzZXJJbmZvUmVhZHlDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2socmVzKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==