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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 底部导航
var api = require('./../api.js');

var ShopCart = function (_wepy$page) {
  _inherits(ShopCart, _wepy$page);

  function ShopCart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ShopCart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShopCart.__proto__ || Object.getPrototypeOf(ShopCart)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的'
    }, _this.$repeat = {}, _this.$props = { "nav": { "class": "nav", "xmlns:v-on": "" } }, _this.$events = { "nav": { "v-on:childFn": "goPage" } }, _this.components = {
      nav: _nav2.default
    }, _this.mixins = [], _this.data = {
      funList: [{ funtext: '待付款', state: 1, num: 0 }, { funtext: '待发货', state: 2, num: 0 }, { funtext: '待收货', state: 3, num: 0 }, { funtext: '退款 / 售后', state: 4, num: 0 }], // 功能入口
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      userInfo: {},
      index: '2',
      member_info: null, // 接口返回用户信息
      member_serves_tel: '' //客服电话
    }, _this.computed = {}, _this.methods = {
      /**
       * 收货地址
       */
      getUserAddress: function getUserAddress() {
        this.$navigate({ url: 'addressList' });
      },

      /**
       * 查看我的会员等级
       */
      getMyRank: function getMyRank() {
        this.$navigate({ url: 'vip' });
      },

      /**
       * 底部导航跳转
       */
      goPage: function goPage(url, evt) {
        // 销毁当前页{跳转}
        this.$redirect(url);
      },
      callPhone: function callPhone() {
        wx.makePhoneCall({
          phoneNumber: this.member_serves_tel
        });
      },
      orderlist: function orderlist(idx) {
        if (idx == 3) {} else {
          this.$navigate('orderlist?idx=' + (idx + 1));
        }
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onLoad',
    value: function onLoad() {
      this.userInfo = this.$parent.globalData.userInfo;
      console.log(this.userInfo);
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      // 用户个人中心数据接口
      (0, _ajax.ajax)({
        url: api.memberInfo
      }).then(function (res) {
        console.log(res);
        if (res.code == 200) {
          _this2.member_info = res.datas.member_info;
          _this2.funList[0].num = res.datas.member_info.order_nopay_count || 0;
          _this2.funList[1].num = res.datas.member_info.order_noreceipt_count || 0;
          _this2.funList[2].num = res.datas.member_info.order_noreceipt_count || 0;
          _this2.funList[3].num = res.datas.member_info.return || 0;
          _this2.member_serves_tel = res.datas.member_serves_tel;
          _this2.$apply();
        }
      });
    }
    /**
     * 状态跳转
     */
    //   goStatusList: function(e) {
    //     let state = e.currentTarget.dataset.state
    //     // console.log(state)
    //     wx.navigateTo({
    //       url: "/pages/myOrder/myOrder?state=" + state
    //     })
    //   },

  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/user'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hdiIsIm1peGlucyIsImRhdGEiLCJmdW5MaXN0IiwiZnVudGV4dCIsInN0YXRlIiwibnVtIiwiY2FuSVVzZSIsInd4IiwidXNlckluZm8iLCJpbmRleCIsIm1lbWJlcl9pbmZvIiwibWVtYmVyX3NlcnZlc190ZWwiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnZXRVc2VyQWRkcmVzcyIsIiRuYXZpZ2F0ZSIsInVybCIsImdldE15UmFuayIsImdvUGFnZSIsImV2dCIsIiRyZWRpcmVjdCIsImNhbGxQaG9uZSIsIm1ha2VQaG9uZUNhbGwiLCJwaG9uZU51bWJlciIsIm9yZGVybGlzdCIsImlkeCIsImV2ZW50cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiY29uc29sZSIsImxvZyIsIm1lbWJlckluZm8iLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwib3JkZXJfbm9wYXlfY291bnQiLCJvcmRlcl9ub3JlY2VpcHRfY291bnQiLCJyZXR1cm4iLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBRnFDO0FBQ3JDLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUdxQkMsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsT0FBTSxFQUFDLFNBQVEsS0FBVCxFQUFlLGNBQWEsRUFBNUIsRUFBUCxFLFFBQ1RDLE8sR0FBVSxFQUFDLE9BQU0sRUFBQyxnQkFBZSxRQUFoQixFQUFQLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDO0FBRFUsSyxRQUlaQyxNLEdB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Y2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBuYXYgZnJvbSAnLi4vY29tcG9uZW50cy9uYXYnOyAvLyDlupXpg6jlr7zoiKpcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahCdcclxuICB9O1xyXG5cclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wibmF2XCI6e1wiY2xhc3NcIjpcIm5hdlwiLFwieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcIm5hdlwiOntcInYtb246Y2hpbGRGblwiOlwiZ29QYWdlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBuYXZcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGZ1bkxpc3Q6IFtcclxuICAgICAgeyBmdW50ZXh0OiAn5b6F5LuY5qy+Jywgc3RhdGU6IDEsIG51bTogMCB9LFxyXG4gICAgICB7IGZ1bnRleHQ6ICflvoXlj5HotKcnLCBzdGF0ZTogMiwgbnVtOiAwIH0sXHJcbiAgICAgIHsgZnVudGV4dDogJ+W+heaUtui0pycsIHN0YXRlOiAzLCBudW06IDAgfSxcclxuICAgICAgeyBmdW50ZXh0OiAn6YCA5qy+IC8g5ZSu5ZCOJywgc3RhdGU6IDQsIG51bTogMCB9XHJcbiAgICBdLCAvLyDlip/og73lhaXlj6NcclxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcclxuICAgIHVzZXJJbmZvOiB7fSxcclxuICAgIGluZGV4OiAnMicsXHJcbiAgICBtZW1iZXJfaW5mbzogbnVsbCwgLy8g5o6l5Y+j6L+U5Zue55So5oi35L+h5oGvXHJcbiAgICBtZW1iZXJfc2VydmVzX3RlbDogJycsLy/lrqLmnI3nlLXor51cclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiDmlLbotKflnLDlnYBcclxuICAgICAqL1xyXG4gICAgZ2V0VXNlckFkZHJlc3MoKSB7XHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgYWRkcmVzc0xpc3RgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog5p+l55yL5oiR55qE5Lya5ZGY562J57qnXHJcbiAgICAgKi9cclxuICAgIGdldE15UmFuaygpIHtcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGB2aXBgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog5bqV6YOo5a+86Iiq6Lez6L2sXHJcbiAgICAgKi9cclxuICAgIGdvUGFnZSh1cmwsIGV2dCkge1xyXG4gICAgICAvLyDplIDmr4HlvZPliY3pobV76Lez6L2sfVxyXG4gICAgICB0aGlzLiRyZWRpcmVjdCh1cmwpO1xyXG4gICAgfSxcclxuICAgIGNhbGxQaG9uZSgpe1xyXG4gICAgICB3eC5tYWtlUGhvbmVDYWxsKHtcclxuICAgICAgICBwaG9uZU51bWJlcjogdGhpcy5tZW1iZXJfc2VydmVzX3RlbFxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIG9yZGVybGlzdChpZHgpIHtcclxuICAgICAgaWYoaWR4ID09IDMpIHtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoYG9yZGVybGlzdD9pZHg9JHtpZHgrMX1gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJJbmZvKTtcclxuICAgIFxyXG4gIH1cclxuICBvblNob3coKSB7XHJcblxyXG4gICAgLy8g55So5oi35Liq5Lq65Lit5b+D5pWw5o2u5o6l5Y+jXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkubWVtYmVySW5mbyxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLm1lbWJlcl9pbmZvID0gcmVzLmRhdGFzLm1lbWJlcl9pbmZvXHJcbiAgICAgICAgdGhpcy5mdW5MaXN0WzBdLm51bSA9IHJlcy5kYXRhcy5tZW1iZXJfaW5mby5vcmRlcl9ub3BheV9jb3VudCB8fCAwXHJcbiAgICAgICAgdGhpcy5mdW5MaXN0WzFdLm51bSA9IHJlcy5kYXRhcy5tZW1iZXJfaW5mby5vcmRlcl9ub3JlY2VpcHRfY291bnQgfHwgMFxyXG4gICAgICAgIHRoaXMuZnVuTGlzdFsyXS5udW0gPSByZXMuZGF0YXMubWVtYmVyX2luZm8ub3JkZXJfbm9yZWNlaXB0X2NvdW50IHx8IDBcclxuICAgICAgICB0aGlzLmZ1bkxpc3RbM10ubnVtID0gcmVzLmRhdGFzLm1lbWJlcl9pbmZvLnJldHVybiB8fCAwXHJcbiAgICAgICAgdGhpcy5tZW1iZXJfc2VydmVzX3RlbCA9IHJlcy5kYXRhcy5tZW1iZXJfc2VydmVzX3RlbFxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgLyoqXHJcbiAgICog54q25oCB6Lez6L2sXHJcbiAgICovXHJcbiAgLy8gICBnb1N0YXR1c0xpc3Q6IGZ1bmN0aW9uKGUpIHtcclxuICAvLyAgICAgbGV0IHN0YXRlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuc3RhdGVcclxuICAvLyAgICAgLy8gY29uc29sZS5sb2coc3RhdGUpXHJcbiAgLy8gICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gIC8vICAgICAgIHVybDogXCIvcGFnZXMvbXlPcmRlci9teU9yZGVyP3N0YXRlPVwiICsgc3RhdGVcclxuICAvLyAgICAgfSlcclxuICAvLyAgIH0sXHJcbn1cclxuIl19