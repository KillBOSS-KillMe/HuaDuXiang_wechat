'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _nav = require('./../components/nav.js');

var _nav2 = _interopRequireDefault(_nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 底部导航

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
      index: '2'
    }, _this.computed = {}, _this.methods = {
      /**
       * 收货地址
       */
      getUserAddress: function getUserAddress() {
        this.$navigate({ url: 'userDeliveryAddress' });
      },

      /**
       * 查看我的会员等级
       */
      getMyRank: function getMyRank() {
        this.$navigate({ url: 'membersCenter' });
      },

      /**
       * 底部导航跳转
       */
      goPage: function goPage(url, evt) {
        // 销毁当前页{跳转}
        this.$redirect(url);
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
    value: function onShow() {}
    // this.userInfo = this.$parent.globalData.userInfo

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibmF2IiwibWl4aW5zIiwiZGF0YSIsImZ1bkxpc3QiLCJmdW50ZXh0Iiwic3RhdGUiLCJudW0iLCJjYW5JVXNlIiwid3giLCJ1c2VySW5mbyIsImluZGV4IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ2V0VXNlckFkZHJlc3MiLCIkbmF2aWdhdGUiLCJ1cmwiLCJnZXRNeVJhbmsiLCJnb1BhZ2UiLCJldnQiLCIkcmVkaXJlY3QiLCJldmVudHMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNvbnNvbGUiLCJsb2ciLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQXFDOztJQUVoQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsT0FBTSxFQUFDLFNBQVEsS0FBVCxFQUFlLGNBQWEsRUFBNUIsRUFBUCxFLFFBQ1RDLE8sR0FBVSxFQUFDLE9BQU0sRUFBQyxnQkFBZSxRQUFoQixFQUFQLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDO0FBRFUsSyxRQUlaQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsZUFBUyxDQUNQLEVBQUVDLFNBQVMsS0FBWCxFQUFrQkMsT0FBTyxDQUF6QixFQUE0QkMsS0FBSyxDQUFqQyxFQURPLEVBRVAsRUFBRUYsU0FBUyxLQUFYLEVBQWtCQyxPQUFPLENBQXpCLEVBQTRCQyxLQUFLLENBQWpDLEVBRk8sRUFHUCxFQUFFRixTQUFTLEtBQVgsRUFBa0JDLE9BQU8sQ0FBekIsRUFBNEJDLEtBQUssQ0FBakMsRUFITyxFQUlQLEVBQUVGLFNBQVMsU0FBWCxFQUFzQkMsT0FBTyxDQUE3QixFQUFnQ0MsS0FBSyxDQUFyQyxFQUpPLENBREosRUFNRjtBQUNIQyxlQUFTQyxHQUFHRCxPQUFILENBQVcsOEJBQVgsQ0FQSjtBQVFMRSxnQkFBVSxFQVJMO0FBU0xDLGFBQU87QUFURixLLFFBWVBDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSOzs7QUFHQUMsb0JBSlEsNEJBSVM7QUFDZixhQUFLQyxTQUFMLENBQWUsRUFBRUMsMEJBQUYsRUFBZjtBQUNELE9BTk87O0FBT1I7OztBQUdBQyxlQVZRLHVCQVVJO0FBQ1YsYUFBS0YsU0FBTCxDQUFlLEVBQUVDLG9CQUFGLEVBQWY7QUFDRCxPQVpPOztBQWFSOzs7QUFHQUUsWUFoQlEsa0JBZ0JERixHQWhCQyxFQWdCSUcsR0FoQkosRUFnQlM7QUFDZjtBQUNBLGFBQUtDLFNBQUwsQ0FBZUosR0FBZjtBQUNEO0FBbkJPLEssUUFzQlZLLE0sR0FBUyxFOzs7Ozs2QkFFQTtBQUNQLFdBQUtYLFFBQUwsR0FBZ0IsS0FBS1ksT0FBTCxDQUFhQyxVQUFiLENBQXdCYixRQUF4QztBQUNBYyxjQUFRQyxHQUFSLENBQVksS0FBS2YsUUFBakI7QUFDRDs7OzZCQUNRLENBRVI7QUFEQzs7QUFFRjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0VBcEVvQ2dCLGVBQUtDLEk7O2tCQUF0QmpDLFEiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG5hdiBmcm9tICcuLi9jb21wb25lbnRzL25hdic7IC8vIOW6lemDqOWvvOiIqlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoQnXHJcbiAgfTtcclxuXHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIm5hdlwiOntcImNsYXNzXCI6XCJuYXZcIixcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJuYXZcIjp7XCJ2LW9uOmNoaWxkRm5cIjpcImdvUGFnZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgbmF2XHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBmdW5MaXN0OiBbXHJcbiAgICAgIHsgZnVudGV4dDogJ+W+heS7mOasvicsIHN0YXRlOiAxLCBudW06IDAgfSxcclxuICAgICAgeyBmdW50ZXh0OiAn5b6F5Y+R6LSnJywgc3RhdGU6IDIsIG51bTogMCB9LFxyXG4gICAgICB7IGZ1bnRleHQ6ICflvoXmlLbotKcnLCBzdGF0ZTogMywgbnVtOiAwIH0sXHJcbiAgICAgIHsgZnVudGV4dDogJ+mAgOasviAvIOWUruWQjicsIHN0YXRlOiA0LCBudW06IDAgfVxyXG4gICAgXSwgLy8g5Yqf6IO95YWl5Y+jXHJcbiAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXHJcbiAgICB1c2VySW5mbzoge30sXHJcbiAgICBpbmRleDogJzInXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8qKlxyXG4gICAgICog5pS26LSn5Zyw5Z2AXHJcbiAgICAgKi9cclxuICAgIGdldFVzZXJBZGRyZXNzKCkge1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYHVzZXJEZWxpdmVyeUFkZHJlc3NgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog5p+l55yL5oiR55qE5Lya5ZGY562J57qnXHJcbiAgICAgKi9cclxuICAgIGdldE15UmFuaygpIHtcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBtZW1iZXJzQ2VudGVyYCB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOW6lemDqOWvvOiIqui3s+i9rFxyXG4gICAgICovXHJcbiAgICBnb1BhZ2UodXJsLCBldnQpIHtcclxuICAgICAgLy8g6ZSA5q+B5b2T5YmN6aG1e+i3s+i9rH1cclxuICAgICAgdGhpcy4kcmVkaXJlY3QodXJsKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy51c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgY29uc29sZS5sb2codGhpcy51c2VySW5mbyk7XHJcbiAgfVxyXG4gIG9uU2hvdygpIHtcclxuICAgIC8vIHRoaXMudXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mb1xyXG4gIH1cclxuICAvKipcclxuICAgKiDnirbmgIHot7PovaxcclxuICAgKi9cclxuICAvLyAgIGdvU3RhdHVzTGlzdDogZnVuY3Rpb24oZSkge1xyXG4gIC8vICAgICBsZXQgc3RhdGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5zdGF0ZVxyXG4gIC8vICAgICAvLyBjb25zb2xlLmxvZyhzdGF0ZSlcclxuICAvLyAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgLy8gICAgICAgdXJsOiBcIi9wYWdlcy9teU9yZGVyL215T3JkZXI/c3RhdGU9XCIgKyBzdGF0ZVxyXG4gIC8vICAgICB9KVxyXG4gIC8vICAgfSxcclxufVxyXG4iXX0=