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
      'pages/goodsList'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJyZXF1ZXN0SW1nVXJsIiwidXNlIiwiaW50ZXJjZXB0IiwicCIsInN1Y2Nlc3MiLCJmYWlsIiwiY29tcGxldGUiLCJ3eCIsImdldFNldHRpbmciLCJyZXMiLCJhdXRoU2V0dGluZyIsImdldFVzZXJJbmZvIiwidXNlckluZm9SZWFkeUNhbGxiYWNrIiwid2VweSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7OztBQUdFLHNCQUFjO0FBQUE7O0FBQUE7O0FBQUEsVUFlZEEsTUFmYyxHQWVMO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBQ1U7QUFDZixtQkFGSyxFQUVVO0FBQ2YscUJBSEssRUFHWTtBQUNqQixxQkFKSyxFQUlZO0FBQ2pCLGtCQUxLLEVBS1M7QUFDZCwyQkFOSyxFQU1rQjtBQUN2QixpQ0FQSyxFQU93QjtBQUM3QixnQ0FSSyxFQVF1QjtBQUM1QixzQkFUSyxFQVNhO0FBQ2xCLGlCQVZLLEVBVVE7QUFDYixrQkFYSyxFQVdTO0FBQ2Qsc0JBWkssRUFZYTtBQUNsQixxQkFiSyxFQWFZO0FBQ2pCLHFCQWRLLEVBY1k7QUFDakIsd0JBZkssRUFlZTtBQUNwQiwyQkFoQkssRUFnQmtCO0FBQ3ZCLG9CQWpCSyxFQWlCVztBQUNoQix5QkFsQkssRUFrQmdCO0FBQ3JCLGdDQW5CSyxFQW1CdUI7QUFDNUIsNEJBcEJLLEVBb0JtQjtBQUN4QixpQ0FyQkssRUFxQndCO0FBQzdCLHdCQXRCSyxFQXNCZTtBQUNwQixvQkF2QkssRUF1Qlc7QUFDaEIsc0JBeEJLLEVBd0JhO0FBQ2xCLDJCQXpCSyxFQXlCa0I7QUFDdkIsMEJBMUJLLEVBMEJpQjtBQUN0QiwwQkEzQkssRUEyQmlCO0FBQ3RCLDBCQTVCSyxFQTRCaUI7QUFDdEIsdUJBN0JLLEVBNkJjO0FBQ25CLGlCQTlCSyxFQThCUTtBQUNiLHVCQS9CSyxFQStCYztBQUNuQiwwQkFoQ0ssRUFnQ2lCO0FBQ3RCLHlCQWpDSyxFQWlDZ0I7QUFDckIsd0JBbENLLEVBa0NlO0FBQ3BCLHVCQW5DSyxFQW1DYztBQUNuQix1QkFwQ0ssQ0FEQTtBQXVDUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLEtBSGxCO0FBSU5DLGdDQUF3QjtBQUpsQjtBQXZDRCxLQWZLO0FBQUEsVUE2RGRDLFVBN0RjLEdBNkREO0FBQ1hDLGdCQUFVLEVBREM7QUFFWEMscUJBQWU7QUFGSixLQTdEQzs7QUFFWixVQUFLQyxHQUFMLENBQVMsV0FBVDtBQUNBLFVBQUtDLFNBQUwsQ0FBZSxTQUFmLEVBQTBCO0FBQ3hCWCxZQUR3QixrQkFDakJZLENBRGlCLEVBQ2Q7QUFDUjtBQUNBLGVBQU9BLENBQVA7QUFDRCxPQUp1QjtBQUt4QkMsYUFMd0IsbUJBS2hCRCxDQUxnQixFQUtiO0FBQ1QsZUFBT0EsQ0FBUDtBQUNELE9BUHVCO0FBUXhCRSxVQVJ3QixnQkFRbkJGLENBUm1CLEVBUWhCLENBQUUsQ0FSYztBQVN4QkcsY0FUd0Isb0JBU2ZILENBVGUsRUFTWixDQUFFO0FBVFUsS0FBMUI7QUFIWTtBQWNiOzs7OytCQW1EVTtBQUFBOztBQUNUO0FBQ0FJLFNBQUdDLFVBQUgsQ0FBYztBQUNaSixpQkFBUyxzQkFBTztBQUNkLGNBQUlLLElBQUlDLFdBQUosQ0FBZ0IsZ0JBQWhCLENBQUosRUFBdUM7QUFDckNILGVBQUdJLFdBQUgsQ0FBZTtBQUNiUCx1QkFBUyxzQkFBTztBQUNkLHVCQUFLTixVQUFMLENBQWdCQyxRQUFoQixHQUEyQlUsSUFBSVYsUUFBL0I7QUFDQSxvQkFBSSxPQUFLYSxxQkFBVCxFQUFnQztBQUM5Qix5QkFBS0EscUJBQUwsQ0FBMkJILEdBQTNCO0FBQ0Q7QUFDRjtBQU5ZLGFBQWY7QUFRRDtBQUNGO0FBWlcsT0FBZDtBQWNEOzs7O0VBbEYwQkksZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnVzZSgncHJvbWlzaWZ5Jyk7XHJcbiAgICB0aGlzLmludGVyY2VwdCgncmVxdWVzdCcsIHtcclxuICAgICAgY29uZmlnKHApIHtcclxuICAgICAgICAvLyBwLnRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgICB9LFxyXG4gICAgICBzdWNjZXNzKHApIHtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgICAgfSxcclxuICAgICAgZmFpbChwKSB7fSxcclxuICAgICAgY29tcGxldGUocCkge31cclxuICAgIH0pO1xyXG4gIH1cclxuICBjb25maWcgPSB7XHJcbiAgICBwYWdlczogW1xyXG4gICAgICAncGFnZXMvaW5kZXgnLCAvLyDlupXpg6gg6aaW6aG1XHJcbiAgICAgICdwYWdlcy9jbGFzcycsIC8vIOWIhuexu1xyXG4gICAgICAncGFnZXMvc2V0dGxlZCcsIC8vIOWFpempu1xyXG4gICAgICAncGFnZXMvc2hvcENhcicsIC8vIOi0reeJqei9plxyXG4gICAgICAncGFnZXMvdXNlcicsIC8vIOaIkeeahFxyXG4gICAgICAncGFnZXMvbWVtYmVyc0NlbnRlcicsIC8vIOS8muWRmOS4reW/g1xyXG4gICAgICAncGFnZXMvdXNlckRlbGl2ZXJ5QWRkcmVzcycsIC8vIC0t5oiR55qE5pS26LSn5Zyw5Z2AXHJcbiAgICAgICdwYWdlcy9uZXdkZWxpdmVyeUFkZHJlc3MnLCAvLyAtLeaIkeeahOaWsOWinuWcsOWdgFxyXG4gICAgICAncGFnZXMvZGlzY291bnQnLCAvLyDpppbpobXmqKHlnZfot7Povawg56eS6LWa6ZKxXHJcbiAgICAgICdwYWdlcy9wcmUnLCAvLyDpppbpobXmqKHlnZfot7Povawg6aKE6LStXHJcbiAgICAgICdwYWdlcy9zYWxlJywgLy8g6aaW6aG15qih5Z2X6Lez6L2sIOS/g+mUgFxyXG4gICAgICAncGFnZXMvYXNzZW1ibGUnLCAvLyDpppbpobXmqKHlnZfot7Povawg5ou85ZuiXHJcbiAgICAgICdwYWdlcy9iYXJnYWluJywgLy8g6aaW6aG15qih5Z2X6Lez6L2sIOegjeS7t1xyXG4gICAgICAncGFnZXMvc2Vja2lsbCcsIC8vIOmmlumhteaooeWdl+i3s+i9rCDnp5LmnYBcclxuICAgICAgJ3BhZ2VzL3NldHRsZW1lbnQnLCAvLyDmj5DkuqTorqLljZVcclxuICAgICAgJ3BhZ2VzL21hdGNoaW5nR29vZHMnLCAvLyDnu4TlkIjplIDllK4g5pCt6YWN5ZWG5ZOB6aG16Z2iXHJcbiAgICAgICdwYWdlcy9idXR0b24nLCAvLyDmiYDmnInlvLnnqpcgLS10ZXN0XHJcbiAgICAgICdwYWdlcy9zaG9wRGV0YWlscycsIC8vIOWVhuWTgeivpuaDhVxyXG4gICAgICAncGFnZXMvc2Vja2lsbFNob3BEZXRhaWxzJywgLy8g56eS5p2A5ZWG5ZOB6K+m5oOFXHJcbiAgICAgICdwYWdlcy9wcmVTaG9wRGV0YWlscycsIC8vIOmihOi0reWVhuWTgeivpuaDhVxyXG4gICAgICAncGFnZXMvYXNzZW1ibGVTaG9wRGV0YWlscycsIC8vIOaLvOWbouWVhuWTgeivpuaDhVxyXG4gICAgICAncGFnZXMvYmFyZ2luSW5mbycsIC8vIOegjeS7tyAtLSDnoI3ku7fkv6Hmga8gLS10ZXN0XHJcbiAgICAgICdwYWdlcy9zZWFyY2gnLCAvLyDmkJzntKJcclxuICAgICAgJ3BhZ2VzL21lcmNoYW50JywgLy8g54m557qm5ZWG5oi3XHJcbiAgICAgICdwYWdlcy9tZXJjaGFudEluZGV4JywgLy8g5ZWG5oi36aaW6aG1XHJcbiAgICAgICdwYWdlcy9hcHBseVBhcnRuZXInLCAvLyDnlLPor7flkIjkvJnkurpcclxuICAgICAgJ3BhZ2VzL3BhcnRuZXJJbnB1dCcsIC8vIOeUs+ivt+WQiOS8meS6uuWhq+WGmVxyXG4gICAgICAncGFnZXMvbW9yZUNoYW5uZWxzJywgLy8g5pu05aSa6aKR6YGTXHJcbiAgICAgICdwYWdlcy9vcmRlcmxpc3QnLCAvLyDorqLljZXliJfooahcclxuICAgICAgJ3BhZ2VzL3ZpcCcsIC8vIOS8muWRmFxyXG4gICAgICAncGFnZXMvc2V0dGxlZEluJywgLy8g5YWl6am7XHJcbiAgICAgICdwYWdlcy9zZXR0bGVkSW5QYXknLCAvLyDlhaXpqbvku5jmrL5cclxuICAgICAgJ3BhZ2VzL2FkZHJlc3NMaXN0JywgLy8g5Zyw5Z2A5YiX6KGoXHJcbiAgICAgICdwYWdlcy9hZGRBZGRyZXNzJywgLy8g5re75Yqg5Zyw5Z2AXHJcbiAgICAgICdwYWdlcy9jb25zaWduZWUnLCAvLyDllYblk4Hor6bmg4Xot7Povazmt7vliqDlnLDlnYBcclxuICAgICAgJ3BhZ2VzL2dvb2RzTGlzdCdcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y2O6YO96K+mJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xyXG4gICAgfVxyXG4gIH07XHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIHVzZXJJbmZvOiAnJyxcclxuICAgIHJlcXVlc3RJbWdVcmw6ICdodHRwOi8vd3d3LnNob3BkYXRlLm1lL3N5c3RlbS91cGZpbGVzLydcclxuICB9O1xyXG4gIG9uTGF1bmNoKCkge1xyXG4gICAgLy8g6I635Y+W55So5oi35L+h5oGvXHJcbiAgICB3eC5nZXRTZXR0aW5nKHtcclxuICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XHJcbiAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICAgICAgICAgIGlmICh0aGlzLnVzZXJJbmZvUmVhZHlDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2socmVzKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==