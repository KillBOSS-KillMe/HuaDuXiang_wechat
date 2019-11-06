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
      'pages/orderInfo' // 订单详情

      ],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJyZXF1ZXN0SW1nVXJsIiwidXNlIiwiaW50ZXJjZXB0IiwicCIsInN1Y2Nlc3MiLCJmYWlsIiwiY29tcGxldGUiLCJ3eCIsImdldFNldHRpbmciLCJyZXMiLCJhdXRoU2V0dGluZyIsImdldFVzZXJJbmZvIiwidXNlckluZm9SZWFkeUNhbGxiYWNrIiwid2VweSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7OztBQUdFLHNCQUFjO0FBQUE7O0FBQUE7O0FBQUEsVUFlZEEsTUFmYyxHQWVMO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBQ1U7QUFDZixtQkFGSyxFQUVVO0FBQ2YscUJBSEssRUFHWTtBQUNqQixxQkFKSyxFQUlZO0FBQ2pCLGtCQUxLLEVBS1M7QUFDZCwyQkFOSyxFQU1rQjtBQUN2QixpQ0FQSyxFQU93QjtBQUM3QixnQ0FSSyxFQVF1QjtBQUM1QixzQkFUSyxFQVNhO0FBQ2xCLGlCQVZLLEVBVVE7QUFDYixrQkFYSyxFQVdTO0FBQ2Qsc0JBWkssRUFZYTtBQUNsQixxQkFiSyxFQWFZO0FBQ2pCLHFCQWRLLEVBY1k7QUFDakIsd0JBZkssRUFlZTtBQUNwQiwyQkFoQkssRUFnQmtCO0FBQ3ZCLG9CQWpCSyxFQWlCVztBQUNoQix5QkFsQkssRUFrQmdCO0FBQ3JCLGdDQW5CSyxFQW1CdUI7QUFDNUIsNEJBcEJLLEVBb0JtQjtBQUN4QixpQ0FyQkssRUFxQndCO0FBQzdCLHdCQXRCSyxFQXNCZTtBQUNwQixvQkF2QkssRUF1Qlc7QUFDaEIsc0JBeEJLLEVBd0JhO0FBQ2xCLDJCQXpCSyxFQXlCa0I7QUFDdkIsMEJBMUJLLEVBMEJpQjtBQUN0QiwwQkEzQkssRUEyQmlCO0FBQ3RCLDBCQTVCSyxFQTRCaUI7QUFDdEIsdUJBN0JLLEVBNkJjO0FBQ25CLGlCQTlCSyxFQThCUTtBQUNiLHVCQS9CSyxFQStCYztBQUNuQiwwQkFoQ0ssRUFnQ2lCO0FBQ3RCLHlCQWpDSyxFQWlDZ0I7QUFDckIsd0JBbENLLEVBa0NlO0FBQ3BCLHVCQW5DSyxFQW1DYztBQUNuQix1QkFwQ0ssRUFxQ0wsb0JBckNLLEVBcUNpQjtBQUN0Qix1QkF0Q0ssQ0FzQ2E7O0FBdENiLE9BREE7QUEwQ1BDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLFNBRnhCO0FBR05DLGdDQUF3QixLQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEI7QUExQ0QsS0FmSztBQUFBLFVBZ0VkQyxVQWhFYyxHQWdFRDtBQUNYQyxnQkFBVSxFQURDO0FBRVhDLHFCQUFlO0FBRkosS0FoRUM7O0FBRVosVUFBS0MsR0FBTCxDQUFTLFdBQVQ7QUFDQSxVQUFLQyxTQUFMLENBQWUsU0FBZixFQUEwQjtBQUN4QlgsWUFEd0Isa0JBQ2pCWSxDQURpQixFQUNkO0FBQ1I7QUFDQSxlQUFPQSxDQUFQO0FBQ0QsT0FKdUI7QUFLeEJDLGFBTHdCLG1CQUtoQkQsQ0FMZ0IsRUFLYjtBQUNULGVBQU9BLENBQVA7QUFDRCxPQVB1QjtBQVF4QkUsVUFSd0IsZ0JBUW5CRixDQVJtQixFQVFoQixDQUFFLENBUmM7QUFTeEJHLGNBVHdCLG9CQVNmSCxDQVRlLEVBU1osQ0FBRTtBQVRVLEtBQTFCO0FBSFk7QUFjYjs7OzsrQkFzRFU7QUFBQTs7QUFDVDtBQUNBSSxTQUFHQyxVQUFILENBQWM7QUFDWkosaUJBQVMsc0JBQU87QUFDZCxjQUFJSyxJQUFJQyxXQUFKLENBQWdCLGdCQUFoQixDQUFKLEVBQXVDO0FBQ3JDSCxlQUFHSSxXQUFILENBQWU7QUFDYlAsdUJBQVMsc0JBQU87QUFDZCx1QkFBS04sVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJVLElBQUlWLFFBQS9CO0FBQ0Esb0JBQUksT0FBS2EscUJBQVQsRUFBZ0M7QUFDOUIseUJBQUtBLHFCQUFMLENBQTJCSCxHQUEzQjtBQUNEO0FBQ0Y7QUFOWSxhQUFmO0FBUUQ7QUFDRjtBQVpXLE9BQWQ7QUFjRDs7OztFQXJGMEJJLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy51c2UoJ3Byb21pc2lmeScpO1xyXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XHJcbiAgICAgIGNvbmZpZyhwKSB7XHJcbiAgICAgICAgLy8gcC50aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgICAgfSxcclxuICAgICAgc3VjY2VzcyhwKSB7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWwocCkge30sXHJcbiAgICAgIGNvbXBsZXRlKHApIHt9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL2luZGV4JywgLy8g5bqV6YOoIOmmlumhtVxyXG4gICAgICAncGFnZXMvY2xhc3MnLCAvLyDliIbnsbtcclxuICAgICAgJ3BhZ2VzL3NldHRsZWQnLCAvLyDlhaXpqbtcclxuICAgICAgJ3BhZ2VzL3Nob3BDYXInLCAvLyDotK3nianovaZcclxuICAgICAgJ3BhZ2VzL3VzZXInLCAvLyDmiJHnmoRcclxuICAgICAgJ3BhZ2VzL21lbWJlcnNDZW50ZXInLCAvLyDkvJrlkZjkuK3lv4NcclxuICAgICAgJ3BhZ2VzL3VzZXJEZWxpdmVyeUFkZHJlc3MnLCAvLyAtLeaIkeeahOaUtui0p+WcsOWdgFxyXG4gICAgICAncGFnZXMvbmV3ZGVsaXZlcnlBZGRyZXNzJywgLy8gLS3miJHnmoTmlrDlop7lnLDlnYBcclxuICAgICAgJ3BhZ2VzL2Rpc2NvdW50JywgLy8g6aaW6aG15qih5Z2X6Lez6L2sIOenkui1mumSsVxyXG4gICAgICAncGFnZXMvcHJlJywgLy8g6aaW6aG15qih5Z2X6Lez6L2sIOmihOi0rVxyXG4gICAgICAncGFnZXMvc2FsZScsIC8vIOmmlumhteaooeWdl+i3s+i9rCDkv4PplIBcclxuICAgICAgJ3BhZ2VzL2Fzc2VtYmxlJywgLy8g6aaW6aG15qih5Z2X6Lez6L2sIOaLvOWbolxyXG4gICAgICAncGFnZXMvYmFyZ2FpbicsIC8vIOmmlumhteaooeWdl+i3s+i9rCDnoI3ku7dcclxuICAgICAgJ3BhZ2VzL3NlY2tpbGwnLCAvLyDpppbpobXmqKHlnZfot7Povawg56eS5p2AXHJcbiAgICAgICdwYWdlcy9zZXR0bGVtZW50JywgLy8g5o+Q5Lqk6K6i5Y2VXHJcbiAgICAgICdwYWdlcy9tYXRjaGluZ0dvb2RzJywgLy8g57uE5ZCI6ZSA5ZSuIOaQremFjeWVhuWTgemhtemdolxyXG4gICAgICAncGFnZXMvYnV0dG9uJywgLy8g5omA5pyJ5by556qXIC0tdGVzdFxyXG4gICAgICAncGFnZXMvc2hvcERldGFpbHMnLCAvLyDllYblk4Hor6bmg4VcclxuICAgICAgJ3BhZ2VzL3NlY2tpbGxTaG9wRGV0YWlscycsIC8vIOenkuadgOWVhuWTgeivpuaDhVxyXG4gICAgICAncGFnZXMvcHJlU2hvcERldGFpbHMnLCAvLyDpooTotK3llYblk4Hor6bmg4VcclxuICAgICAgJ3BhZ2VzL2Fzc2VtYmxlU2hvcERldGFpbHMnLCAvLyDmi7zlm6LllYblk4Hor6bmg4VcclxuICAgICAgJ3BhZ2VzL2JhcmdpbkluZm8nLCAvLyDnoI3ku7cgLS0g56CN5Lu35L+h5oGvIC0tdGVzdFxyXG4gICAgICAncGFnZXMvc2VhcmNoJywgLy8g5pCc57SiXHJcbiAgICAgICdwYWdlcy9tZXJjaGFudCcsIC8vIOeJuee6puWVhuaIt1xyXG4gICAgICAncGFnZXMvbWVyY2hhbnRJbmRleCcsIC8vIOWVhuaIt+mmlumhtVxyXG4gICAgICAncGFnZXMvYXBwbHlQYXJ0bmVyJywgLy8g55Sz6K+35ZCI5LyZ5Lq6XHJcbiAgICAgICdwYWdlcy9wYXJ0bmVySW5wdXQnLCAvLyDnlLPor7flkIjkvJnkurrloavlhplcclxuICAgICAgJ3BhZ2VzL21vcmVDaGFubmVscycsIC8vIOabtOWkmumikemBk1xyXG4gICAgICAncGFnZXMvb3JkZXJsaXN0JywgLy8g6K6i5Y2V5YiX6KGoXHJcbiAgICAgICdwYWdlcy92aXAnLCAvLyDkvJrlkZhcclxuICAgICAgJ3BhZ2VzL3NldHRsZWRJbicsIC8vIOWFpempu1xyXG4gICAgICAncGFnZXMvc2V0dGxlZEluUGF5JywgLy8g5YWl6am75LuY5qy+XHJcbiAgICAgICdwYWdlcy9hZGRyZXNzTGlzdCcsIC8vIOWcsOWdgOWIl+ihqFxyXG4gICAgICAncGFnZXMvYWRkQWRkcmVzcycsIC8vIOa3u+WKoOWcsOWdgFxyXG4gICAgICAncGFnZXMvY29uc2lnbmVlJywgLy8g5ZWG5ZOB6K+m5oOF6Lez6L2s5re75Yqg5Zyw5Z2AXHJcbiAgICAgICdwYWdlcy9nb29kc0xpc3QnLFxyXG4gICAgICAncGFnZXMvZGlzdHJpYnV0aW9uJywgLy8g5YiG6ZSAXHJcbiAgICAgICdwYWdlcy9vcmRlckluZm8nIC8vIOiuouWNleivpuaDhVxyXG4gICAgICBcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y2O6YO96K+mJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xyXG4gICAgfVxyXG4gIH07XHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIHVzZXJJbmZvOiAnJyxcclxuICAgIHJlcXVlc3RJbWdVcmw6ICdodHRwOi8vd3d3LnNob3BkYXRlLm1lL3N5c3RlbS91cGZpbGVzLydcclxuICB9O1xyXG4gIG9uTGF1bmNoKCkge1xyXG4gICAgLy8g6I635Y+W55So5oi35L+h5oGvXHJcbiAgICB3eC5nZXRTZXR0aW5nKHtcclxuICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XHJcbiAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICAgICAgICAgIGlmICh0aGlzLnVzZXJJbmZvUmVhZHlDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2socmVzKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==