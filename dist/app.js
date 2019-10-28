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
      'pages/discount', // 首页模块跳转 折扣
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
      'pages/consignee' // 商品详情跳转添加地址
      ],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#ffffff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      }
    };
    _this.globalData = {
      userInfo: '',
      requestImgUrl: 'http://www.shopdate.me/system/upfiles/'
    };

    _this.use('promisify');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJyZXF1ZXN0SW1nVXJsIiwidXNlIiwid3giLCJnZXRTZXR0aW5nIiwic3VjY2VzcyIsInJlcyIsImF1dGhTZXR0aW5nIiwiZ2V0VXNlckluZm8iLCJ1c2VySW5mb1JlYWR5Q2FsbGJhY2siLCJ3ZXB5IiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7O0FBR0Usc0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxVQUlkQSxNQUpjLEdBSUw7QUFDUEMsYUFBTyxDQUNMLGFBREssRUFDVTtBQUNmLG1CQUZLLEVBRVU7QUFDZixxQkFISyxFQUdZO0FBQ2pCLHFCQUpLLEVBSVk7QUFDakIsa0JBTEssRUFLUztBQUNkLDJCQU5LLEVBTWtCO0FBQ3ZCLGlDQVBLLEVBT3dCO0FBQzdCLGdDQVJLLEVBUXVCO0FBQzVCLHNCQVRLLEVBU2E7QUFDbEIsaUJBVkssRUFVUTtBQUNiLGtCQVhLLEVBV1M7QUFDZCxzQkFaSyxFQVlhO0FBQ2xCLHFCQWJLLEVBYVk7QUFDakIscUJBZEssRUFjWTtBQUNqQix3QkFmSyxFQWVlO0FBQ3BCLDJCQWhCSyxFQWdCa0I7QUFDdkIsb0JBakJLLEVBaUJXO0FBQ2hCLHlCQWxCSyxFQWtCZ0I7QUFDckIsZ0NBbkJLLEVBbUJ1QjtBQUM1Qiw0QkFwQkssRUFvQm1CO0FBQ3hCLGlDQXJCSyxFQXFCd0I7QUFDN0Isd0JBdEJLLEVBc0JlO0FBQ3BCLG9CQXZCSyxFQXVCVztBQUNoQixzQkF4QkssRUF3QmE7QUFDbEIsMkJBekJLLEVBeUJrQjtBQUN2QiwwQkExQkssRUEwQmlCO0FBQ3RCLDBCQTNCSyxFQTJCaUI7QUFDdEIsMEJBNUJLLEVBNEJpQjtBQUN0Qix1QkE3QkssRUE2QmM7QUFDbkIsaUJBOUJLLEVBOEJRO0FBQ2IsdUJBL0JLLEVBK0JjO0FBQ25CLDBCQWhDSyxFQWdDaUI7QUFDdEIseUJBakNLLEVBaUNnQjtBQUNyQix3QkFsQ0ssRUFrQ2U7QUFDcEIsdUJBbkNLLENBbUNhO0FBbkNiLE9BREE7QUFzQ1BDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLFNBRnhCO0FBR05DLGdDQUF3QixRQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEI7QUF0Q0QsS0FKSztBQUFBLFVBaURkQyxVQWpEYyxHQWlERDtBQUNYQyxnQkFBVSxFQURDO0FBRVhDLHFCQUFlO0FBRkosS0FqREM7O0FBRVosVUFBS0MsR0FBTCxDQUFTLFdBQVQ7QUFGWTtBQUdiOzs7OytCQWtEVTtBQUFBOztBQUNUO0FBQ0FDLFNBQUdDLFVBQUgsQ0FBYztBQUNaQyxpQkFBUyxzQkFBTztBQUNkLGNBQUlDLElBQUlDLFdBQUosQ0FBZ0IsZ0JBQWhCLENBQUosRUFBdUM7QUFDckNKLGVBQUdLLFdBQUgsQ0FBZTtBQUNiSCx1QkFBUyxzQkFBTztBQUNkLHVCQUFLTixVQUFMLENBQWdCQyxRQUFoQixHQUEyQk0sSUFBSU4sUUFBL0I7QUFDQSxvQkFBSSxPQUFLUyxxQkFBVCxFQUFnQztBQUM5Qix5QkFBS0EscUJBQUwsQ0FBMkJILEdBQTNCO0FBQ0Q7QUFDRjtBQU5ZLGFBQWY7QUFRRDtBQUNGO0FBWlcsT0FBZDtBQWNEOzs7O0VBdEUwQkksZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnVzZSgncHJvbWlzaWZ5Jyk7XHJcbiAgfVxyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9pbmRleCcsIC8vIOW6lemDqCDpppbpobVcclxuICAgICAgJ3BhZ2VzL2NsYXNzJywgLy8g5YiG57G7XHJcbiAgICAgICdwYWdlcy9zZXR0bGVkJywgLy8g5YWl6am7XHJcbiAgICAgICdwYWdlcy9zaG9wQ2FyJywgLy8g6LSt54mp6L2mXHJcbiAgICAgICdwYWdlcy91c2VyJywgLy8g5oiR55qEXHJcbiAgICAgICdwYWdlcy9tZW1iZXJzQ2VudGVyJywgLy8g5Lya5ZGY5Lit5b+DXHJcbiAgICAgICdwYWdlcy91c2VyRGVsaXZlcnlBZGRyZXNzJywgLy8gLS3miJHnmoTmlLbotKflnLDlnYBcclxuICAgICAgJ3BhZ2VzL25ld2RlbGl2ZXJ5QWRkcmVzcycsIC8vIC0t5oiR55qE5paw5aKe5Zyw5Z2AXHJcbiAgICAgICdwYWdlcy9kaXNjb3VudCcsIC8vIOmmlumhteaooeWdl+i3s+i9rCDmipjmiaNcclxuICAgICAgJ3BhZ2VzL3ByZScsIC8vIOmmlumhteaooeWdl+i3s+i9rCDpooTotK1cclxuICAgICAgJ3BhZ2VzL3NhbGUnLCAvLyDpppbpobXmqKHlnZfot7Povawg5L+D6ZSAXHJcbiAgICAgICdwYWdlcy9hc3NlbWJsZScsIC8vIOmmlumhteaooeWdl+i3s+i9rCDmi7zlm6JcclxuICAgICAgJ3BhZ2VzL2JhcmdhaW4nLCAvLyDpppbpobXmqKHlnZfot7Povawg56CN5Lu3XHJcbiAgICAgICdwYWdlcy9zZWNraWxsJywgLy8g6aaW6aG15qih5Z2X6Lez6L2sIOenkuadgFxyXG4gICAgICAncGFnZXMvc2V0dGxlbWVudCcsIC8vIOaPkOS6pOiuouWNlVxyXG4gICAgICAncGFnZXMvbWF0Y2hpbmdHb29kcycsIC8vIOe7hOWQiOmUgOWUriDmkK3phY3llYblk4HpobXpnaJcclxuICAgICAgJ3BhZ2VzL2J1dHRvbicsIC8vIOaJgOacieW8ueeqlyAtLXRlc3RcclxuICAgICAgJ3BhZ2VzL3Nob3BEZXRhaWxzJywgLy8g5ZWG5ZOB6K+m5oOFXHJcbiAgICAgICdwYWdlcy9zZWNraWxsU2hvcERldGFpbHMnLCAvLyDnp5LmnYDllYblk4Hor6bmg4VcclxuICAgICAgJ3BhZ2VzL3ByZVNob3BEZXRhaWxzJywgLy8g6aKE6LSt5ZWG5ZOB6K+m5oOFXHJcbiAgICAgICdwYWdlcy9hc3NlbWJsZVNob3BEZXRhaWxzJywgLy8g5ou85Zui5ZWG5ZOB6K+m5oOFXHJcbiAgICAgICdwYWdlcy9iYXJnaW5JbmZvJywgLy8g56CN5Lu3IC0tIOegjeS7t+S/oeaBryAtLXRlc3RcclxuICAgICAgJ3BhZ2VzL3NlYXJjaCcsIC8vIOaQnOe0olxyXG4gICAgICAncGFnZXMvbWVyY2hhbnQnLCAvLyDnibnnuqbllYbmiLdcclxuICAgICAgJ3BhZ2VzL21lcmNoYW50SW5kZXgnLCAvLyDllYbmiLfpppbpobVcclxuICAgICAgJ3BhZ2VzL2FwcGx5UGFydG5lcicsIC8vIOeUs+ivt+WQiOS8meS6ulxyXG4gICAgICAncGFnZXMvcGFydG5lcklucHV0JywgLy8g55Sz6K+35ZCI5LyZ5Lq65aGr5YaZXHJcbiAgICAgICdwYWdlcy9tb3JlQ2hhbm5lbHMnLCAvLyDmm7TlpJrpopHpgZNcclxuICAgICAgJ3BhZ2VzL29yZGVybGlzdCcsIC8vIOiuouWNleWIl+ihqFxyXG4gICAgICAncGFnZXMvdmlwJywgLy8g5Lya5ZGYXHJcbiAgICAgICdwYWdlcy9zZXR0bGVkSW4nLCAvLyDlhaXpqbtcclxuICAgICAgJ3BhZ2VzL3NldHRsZWRJblBheScsIC8vIOWFpempu+S7mOasvlxyXG4gICAgICAncGFnZXMvYWRkcmVzc0xpc3QnLCAvLyDlnLDlnYDliJfooahcclxuICAgICAgJ3BhZ2VzL2FkZEFkZHJlc3MnLCAvLyDmt7vliqDlnLDlnYBcclxuICAgICAgJ3BhZ2VzL2NvbnNpZ25lZScgLy8g5ZWG5ZOB6K+m5oOF6Lez6L2s5re75Yqg5Zyw5Z2AXHJcbiAgICBdLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgIH1cclxuICB9O1xyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogJycsXHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnaHR0cDovL3d3dy5zaG9wZGF0ZS5tZS9zeXN0ZW0vdXBmaWxlcy8nXHJcbiAgfTtcclxuICBvbkxhdW5jaCgpIHtcclxuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xyXG4gICAgd3guZ2V0U2V0dGluZyh7XHJcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xyXG4gICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgICAgICAgICBpZiAodGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlckluZm9SZWFkeUNhbGxiYWNrKHJlcyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=