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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hdiIsIm1peGlucyIsImRhdGEiLCJmdW5MaXN0IiwiZnVudGV4dCIsInN0YXRlIiwibnVtIiwiY2FuSVVzZSIsInd4IiwidXNlckluZm8iLCJpbmRleCIsIm1lbWJlcl9pbmZvIiwibWVtYmVyX3NlcnZlc190ZWwiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnZXRVc2VyQWRkcmVzcyIsIiRuYXZpZ2F0ZSIsInVybCIsImdldE15UmFuayIsImdvUGFnZSIsImV2dCIsIiRyZWRpcmVjdCIsImNhbGxQaG9uZSIsIm1ha2VQaG9uZUNhbGwiLCJwaG9uZU51bWJlciIsImV2ZW50cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiY29uc29sZSIsImxvZyIsIm1lbWJlckluZm8iLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwib3JkZXJfbm9wYXlfY291bnQiLCJvcmRlcl9ub3JlY2VpcHRfY291bnQiLCJyZXR1cm4iLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBRnFDO0FBQ3JDLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUdxQkMsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsT0FBTSxFQUFDLFNBQVEsS0FBVCxFQUFlLGNBQWEsRUFBNUIsRUFBUCxFLFFBQ1RDLE8sR0FBVSxFQUFDLE9BQU0sRUFBQyxnQkFBZSxRQUFoQixFQUFQLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDO0FBRFUsSyxRQUlaQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsZUFBUyxDQUNQLEVBQUVDLFNBQVMsS0FBWCxFQUFrQkMsT0FBTyxDQUF6QixFQUE0QkMsS0FBSyxDQUFqQyxFQURPLEVBRVAsRUFBRUYsU0FBUyxLQUFYLEVBQWtCQyxPQUFPLENBQXpCLEVBQTRCQyxLQUFLLENBQWpDLEVBRk8sRUFHUCxFQUFFRixTQUFTLEtBQVgsRUFBa0JDLE9BQU8sQ0FBekIsRUFBNEJDLEtBQUssQ0FBakMsRUFITyxFQUlQLEVBQUVGLFNBQVMsU0FBWCxFQUFzQkMsT0FBTyxDQUE3QixFQUFnQ0MsS0FBSyxDQUFyQyxFQUpPLENBREosRUFNRjtBQUNIQyxlQUFTQyxHQUFHRCxPQUFILENBQVcsOEJBQVgsQ0FQSjtBQVFMRSxnQkFBVSxFQVJMO0FBU0xDLGFBQU8sR0FURjtBQVVMQyxtQkFBYSxJQVZSLEVBVWM7QUFDbkJDLHlCQUFtQixFQVhkLENBV2lCO0FBWGpCLEssUUFjUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ1I7OztBQUdBQyxvQkFKUSw0QkFJUztBQUNmLGFBQUtDLFNBQUwsQ0FBZSxFQUFFQyxrQkFBRixFQUFmO0FBQ0QsT0FOTzs7QUFPUjs7O0FBR0FDLGVBVlEsdUJBVUk7QUFDVixhQUFLRixTQUFMLENBQWUsRUFBRUMsVUFBRixFQUFmO0FBQ0QsT0FaTzs7QUFhUjs7O0FBR0FFLFlBaEJRLGtCQWdCREYsR0FoQkMsRUFnQklHLEdBaEJKLEVBZ0JTO0FBQ2Y7QUFDQSxhQUFLQyxTQUFMLENBQWVKLEdBQWY7QUFDRCxPQW5CTztBQW9CUkssZUFwQlEsdUJBb0JHO0FBQ1RkLFdBQUdlLGFBQUgsQ0FBaUI7QUFDZkMsdUJBQWEsS0FBS1o7QUFESCxTQUFqQjtBQUdEO0FBeEJPLEssUUEyQlZhLE0sR0FBUyxFOzs7Ozs2QkFFQTtBQUNQLFdBQUtoQixRQUFMLEdBQWdCLEtBQUtpQixPQUFMLENBQWFDLFVBQWIsQ0FBd0JsQixRQUF4QztBQUNBbUIsY0FBUUMsR0FBUixDQUFZLEtBQUtwQixRQUFqQjtBQUVEOzs7NkJBQ1E7QUFBQTs7QUFFUDtBQUNBLHNCQUFLO0FBQ0hRLGFBQUsxQixJQUFJdUM7QUFETixPQUFMLEVBRUdDLElBRkgsQ0FFUSxlQUFPO0FBQ2JILGdCQUFRQyxHQUFSLENBQVlHLEdBQVo7QUFDQSxZQUFHQSxJQUFJQyxJQUFKLElBQVksR0FBZixFQUFvQjtBQUNsQixpQkFBS3RCLFdBQUwsR0FBbUJxQixJQUFJRSxLQUFKLENBQVV2QixXQUE3QjtBQUNBLGlCQUFLUixPQUFMLENBQWEsQ0FBYixFQUFnQkcsR0FBaEIsR0FBc0IwQixJQUFJRSxLQUFKLENBQVV2QixXQUFWLENBQXNCd0IsaUJBQXRCLElBQTJDLENBQWpFO0FBQ0EsaUJBQUtoQyxPQUFMLENBQWEsQ0FBYixFQUFnQkcsR0FBaEIsR0FBc0IwQixJQUFJRSxLQUFKLENBQVV2QixXQUFWLENBQXNCeUIscUJBQXRCLElBQStDLENBQXJFO0FBQ0EsaUJBQUtqQyxPQUFMLENBQWEsQ0FBYixFQUFnQkcsR0FBaEIsR0FBc0IwQixJQUFJRSxLQUFKLENBQVV2QixXQUFWLENBQXNCeUIscUJBQXRCLElBQStDLENBQXJFO0FBQ0EsaUJBQUtqQyxPQUFMLENBQWEsQ0FBYixFQUFnQkcsR0FBaEIsR0FBc0IwQixJQUFJRSxLQUFKLENBQVV2QixXQUFWLENBQXNCMEIsTUFBdEIsSUFBZ0MsQ0FBdEQ7QUFDQSxpQkFBS3pCLGlCQUFMLEdBQXlCb0IsSUFBSUUsS0FBSixDQUFVdEIsaUJBQW5DO0FBQ0EsaUJBQUswQixNQUFMO0FBQ0Q7QUFDRixPQWJEO0FBY0Q7QUFDRDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0VBM0ZvQ0MsZUFBS0MsSTs7a0JBQXRCL0MsUSIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgbmF2IGZyb20gJy4uL2NvbXBvbmVudHMvbmF2JzsgLy8g5bqV6YOo5a+86IiqXHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoQnXHJcbiAgfTtcclxuXHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIm5hdlwiOntcImNsYXNzXCI6XCJuYXZcIixcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJuYXZcIjp7XCJ2LW9uOmNoaWxkRm5cIjpcImdvUGFnZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgbmF2XHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBmdW5MaXN0OiBbXHJcbiAgICAgIHsgZnVudGV4dDogJ+W+heS7mOasvicsIHN0YXRlOiAxLCBudW06IDAgfSxcclxuICAgICAgeyBmdW50ZXh0OiAn5b6F5Y+R6LSnJywgc3RhdGU6IDIsIG51bTogMCB9LFxyXG4gICAgICB7IGZ1bnRleHQ6ICflvoXmlLbotKcnLCBzdGF0ZTogMywgbnVtOiAwIH0sXHJcbiAgICAgIHsgZnVudGV4dDogJ+mAgOasviAvIOWUruWQjicsIHN0YXRlOiA0LCBudW06IDAgfVxyXG4gICAgXSwgLy8g5Yqf6IO95YWl5Y+jXHJcbiAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXHJcbiAgICB1c2VySW5mbzoge30sXHJcbiAgICBpbmRleDogJzInLFxyXG4gICAgbWVtYmVyX2luZm86IG51bGwsIC8vIOaOpeWPo+i/lOWbnueUqOaIt+S/oeaBr1xyXG4gICAgbWVtYmVyX3NlcnZlc190ZWw6ICcnLC8v5a6i5pyN55S16K+dXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8qKlxyXG4gICAgICog5pS26LSn5Zyw5Z2AXHJcbiAgICAgKi9cclxuICAgIGdldFVzZXJBZGRyZXNzKCkge1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYGFkZHJlc3NMaXN0YCB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOafpeeci+aIkeeahOS8muWRmOetiee6p1xyXG4gICAgICovXHJcbiAgICBnZXRNeVJhbmsoKSB7XHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgdmlwYCB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOW6lemDqOWvvOiIqui3s+i9rFxyXG4gICAgICovXHJcbiAgICBnb1BhZ2UodXJsLCBldnQpIHtcclxuICAgICAgLy8g6ZSA5q+B5b2T5YmN6aG1e+i3s+i9rH1cclxuICAgICAgdGhpcy4kcmVkaXJlY3QodXJsKTtcclxuICAgIH0sXHJcbiAgICBjYWxsUGhvbmUoKXtcclxuICAgICAgd3gubWFrZVBob25lQ2FsbCh7XHJcbiAgICAgICAgcGhvbmVOdW1iZXI6IHRoaXMubWVtYmVyX3NlcnZlc190ZWxcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy51c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgY29uc29sZS5sb2codGhpcy51c2VySW5mbyk7XHJcbiAgICBcclxuICB9XHJcbiAgb25TaG93KCkge1xyXG5cclxuICAgIC8vIOeUqOaIt+S4quS6uuS4reW/g+aVsOaNruaOpeWPo1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm1lbWJlckluZm8sXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5tZW1iZXJfaW5mbyA9IHJlcy5kYXRhcy5tZW1iZXJfaW5mb1xyXG4gICAgICAgIHRoaXMuZnVuTGlzdFswXS5udW0gPSByZXMuZGF0YXMubWVtYmVyX2luZm8ub3JkZXJfbm9wYXlfY291bnQgfHwgMFxyXG4gICAgICAgIHRoaXMuZnVuTGlzdFsxXS5udW0gPSByZXMuZGF0YXMubWVtYmVyX2luZm8ub3JkZXJfbm9yZWNlaXB0X2NvdW50IHx8IDBcclxuICAgICAgICB0aGlzLmZ1bkxpc3RbMl0ubnVtID0gcmVzLmRhdGFzLm1lbWJlcl9pbmZvLm9yZGVyX25vcmVjZWlwdF9jb3VudCB8fCAwXHJcbiAgICAgICAgdGhpcy5mdW5MaXN0WzNdLm51bSA9IHJlcy5kYXRhcy5tZW1iZXJfaW5mby5yZXR1cm4gfHwgMFxyXG4gICAgICAgIHRoaXMubWVtYmVyX3NlcnZlc190ZWwgPSByZXMuZGF0YXMubWVtYmVyX3NlcnZlc190ZWxcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOeKtuaAgei3s+i9rFxyXG4gICAqL1xyXG4gIC8vICAgZ29TdGF0dXNMaXN0OiBmdW5jdGlvbihlKSB7XHJcbiAgLy8gICAgIGxldCBzdGF0ZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnN0YXRlXHJcbiAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHN0YXRlKVxyXG4gIC8vICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAvLyAgICAgICB1cmw6IFwiL3BhZ2VzL215T3JkZXIvbXlPcmRlcj9zdGF0ZT1cIiArIHN0YXRlXHJcbiAgLy8gICAgIH0pXHJcbiAgLy8gICB9LFxyXG59XHJcbiJdfQ==