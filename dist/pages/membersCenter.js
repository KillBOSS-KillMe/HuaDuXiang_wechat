'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      navigationBarTitleText: '会员中心'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      requestImgUrl: '',
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      userInfo: {},
      btnText: '', // 根据class判断按钮文字
      tagText: '', // 充值提示信息
      balancetext: 0, //余额
      balanceshow: true, //余额显示
      btnshow: true, //充值按钮显示
      goldenclass: '',
      menberExplain: [{ class: 0 }, {
        class: 1,
        membername: '普通会员',
        menberintroduce: '只参与积分和充值, 只要关注公众号即可成为普通会员'
      }, {
        class: 2,
        membername: '银卡会员',
        menberintroduce: '普通会员累计消费满1000元或者一次性充值满500元即可成为银卡会员,全场商品享受98折优惠'
      }, {
        class: 3,
        membername: '金卡会员',
        menberintroduce: '普通会员累计消费满500元或者一次性充值满3000元; \n 银卡会员一次性充值2500元挥着累计充值5000元即可成为金卡会员,全场商品享受9,5折优惠'
      }, {
        class: 4,
        membername: '钻石会员',
        menberintroduce: '普通会员累计消费20000元或者一次性充值满10000元; \n 金卡会员补充7500元, 普通会员累计充值20000元即可成为钻石会员, 全场商品享受9折优惠; \n 同时不定期推出针对钻石会员的劲爆活动.'
      }],
      noCenter: [{ iamgs: 'nocenter.png' }, { iamgs: 'nocenter.png' }, { iamgs: 'nocenter.png' }, { iamgs: 'nocenter.png' }, { iamgs: 'nocenter.png' }],
      member_info: null
    }, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      this.requestImgUrl = this.$parent.globalData.requestImgUrl;

      // 用户个人中心数据接口
      (0, _ajax.ajax)({
        url: api.memberInfo
      }).then(function (res) {
        console.log(res);
        if (res.code == 200) {
          _this2.member_info = res.datas.member_info;

          _this2.$apply();
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/membersCenter'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbWJlcnNDZW50ZXIuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwicmVxdWVzdEltZ1VybCIsImNhbklVc2UiLCJ3eCIsInVzZXJJbmZvIiwiYnRuVGV4dCIsInRhZ1RleHQiLCJiYWxhbmNldGV4dCIsImJhbGFuY2VzaG93IiwiYnRuc2hvdyIsImdvbGRlbmNsYXNzIiwibWVuYmVyRXhwbGFpbiIsImNsYXNzIiwibWVtYmVybmFtZSIsIm1lbmJlcmludHJvZHVjZSIsIm5vQ2VudGVyIiwiaWFtZ3MiLCJtZW1iZXJfaW5mbyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidXJsIiwibWVtYmVySW5mbyIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVzIiwiY29kZSIsImRhdGFzIiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFHcUJDLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxxQkFBZSxFQURWO0FBRUxDLGVBQVNDLEdBQUdELE9BQUgsQ0FBVyw4QkFBWCxDQUZKO0FBR0xFLGdCQUFVLEVBSEw7QUFJTEMsZUFBUyxFQUpKLEVBSVE7QUFDYkMsZUFBUyxFQUxKLEVBS1E7QUFDYkMsbUJBQWEsQ0FOUixFQU1XO0FBQ2hCQyxtQkFBYSxJQVBSLEVBT2M7QUFDbkJDLGVBQVMsSUFSSixFQVFVO0FBQ2ZDLG1CQUFhLEVBVFI7QUFVTEMscUJBQWUsQ0FDYixFQUFFQyxPQUFPLENBQVQsRUFEYSxFQUViO0FBQ0VBLGVBQU8sQ0FEVDtBQUVFQyxvQkFBWSxNQUZkO0FBR0VDLHlCQUFpQjtBQUhuQixPQUZhLEVBT2I7QUFDRUYsZUFBTyxDQURUO0FBRUVDLG9CQUFZLE1BRmQ7QUFHRUMseUJBQ0U7QUFKSixPQVBhLEVBYWI7QUFDRUYsZUFBTyxDQURUO0FBRUVDLG9CQUFZLE1BRmQ7QUFHRUMseUJBQ0U7QUFKSixPQWJhLEVBbUJiO0FBQ0VGLGVBQU8sQ0FEVDtBQUVFQyxvQkFBWSxNQUZkO0FBR0VDLHlCQUNFO0FBSkosT0FuQmEsQ0FWVjtBQW9DTEMsZ0JBQVUsQ0FDUixFQUFFQyxPQUFPLGNBQVQsRUFEUSxFQUVSLEVBQUVBLE9BQU8sY0FBVCxFQUZRLEVBR1IsRUFBRUEsT0FBTyxjQUFULEVBSFEsRUFJUixFQUFFQSxPQUFPLGNBQVQsRUFKUSxFQUtSLEVBQUVBLE9BQU8sY0FBVCxFQUxRLENBcENMO0FBMkNMQyxtQkFBYTtBQTNDUixLLFFBOENQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVUsRSxRQUVWQyxNLEdBQVMsRTs7Ozs7NkJBQ0E7QUFBQTs7QUFDUCxXQUFLbkIsYUFBTCxHQUFxQixLQUFLb0IsT0FBTCxDQUFhQyxVQUFiLENBQXdCckIsYUFBN0M7O0FBRUM7QUFDRCxzQkFBSztBQUNIc0IsYUFBSzlCLElBQUkrQjtBQUROLE9BQUwsRUFFR0MsSUFGSCxDQUVRLGVBQU87QUFDYkMsZ0JBQVFDLEdBQVIsQ0FBWUMsR0FBWjtBQUNBLFlBQUdBLElBQUlDLElBQUosSUFBWSxHQUFmLEVBQW9CO0FBQ2xCLGlCQUFLWixXQUFMLEdBQW1CVyxJQUFJRSxLQUFKLENBQVViLFdBQTdCOztBQUVBLGlCQUFLYyxNQUFMO0FBQ0Q7QUFDRixPQVREO0FBVUQ7Ozs2QkFFUSxDQUVSOzs7O0VBOUVtQ0MsZUFBS0MsSTs7a0JBQXRCdEMsUSIsImZpbGUiOiJtZW1iZXJzQ2VudGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Lya5ZGY5Lit5b+DJ1xyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcclxuICAgIHVzZXJJbmZvOiB7fSxcclxuICAgIGJ0blRleHQ6ICcnLCAvLyDmoLnmja5jbGFzc+WIpOaWreaMiemSruaWh+Wtl1xyXG4gICAgdGFnVGV4dDogJycsIC8vIOWFheWAvOaPkOekuuS/oeaBr1xyXG4gICAgYmFsYW5jZXRleHQ6IDAsIC8v5L2Z6aKdXHJcbiAgICBiYWxhbmNlc2hvdzogdHJ1ZSwgLy/kvZnpop3mmL7npLpcclxuICAgIGJ0bnNob3c6IHRydWUsIC8v5YWF5YC85oyJ6ZKu5pi+56S6XHJcbiAgICBnb2xkZW5jbGFzczogJycsXHJcbiAgICBtZW5iZXJFeHBsYWluOiBbXHJcbiAgICAgIHsgY2xhc3M6IDAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGNsYXNzOiAxLFxyXG4gICAgICAgIG1lbWJlcm5hbWU6ICfmma7pgJrkvJrlkZgnLFxyXG4gICAgICAgIG1lbmJlcmludHJvZHVjZTogJ+WPquWPguS4juenr+WIhuWSjOWFheWAvCwg5Y+q6KaB5YWz5rOo5YWs5LyX5Y+35Y2z5Y+v5oiQ5Li65pmu6YCa5Lya5ZGYJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgY2xhc3M6IDIsXHJcbiAgICAgICAgbWVtYmVybmFtZTogJ+mTtuWNoeS8muWRmCcsXHJcbiAgICAgICAgbWVuYmVyaW50cm9kdWNlOlxyXG4gICAgICAgICAgJ+aZrumAmuS8muWRmOe0r+iuoea2iOi0uea7oTEwMDDlhYPmiJbogIXkuIDmrKHmgKflhYXlgLzmu6E1MDDlhYPljbPlj6/miJDkuLrpk7bljaHkvJrlkZgs5YWo5Zy65ZWG5ZOB5Lqr5Y+XOTjmipjkvJjmg6AnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBjbGFzczogMyxcclxuICAgICAgICBtZW1iZXJuYW1lOiAn6YeR5Y2h5Lya5ZGYJyxcclxuICAgICAgICBtZW5iZXJpbnRyb2R1Y2U6XHJcbiAgICAgICAgICAn5pmu6YCa5Lya5ZGY57Sv6K6h5raI6LS55ruhNTAw5YWD5oiW6ICF5LiA5qyh5oCn5YWF5YC85ruhMzAwMOWFgzsgXFxuIOmTtuWNoeS8muWRmOS4gOasoeaAp+WFheWAvDI1MDDlhYPmjKXnnYDntK/orqHlhYXlgLw1MDAw5YWD5Y2z5Y+v5oiQ5Li66YeR5Y2h5Lya5ZGYLOWFqOWcuuWVhuWTgeS6q+WPlzksNeaKmOS8mOaDoCdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGNsYXNzOiA0LFxyXG4gICAgICAgIG1lbWJlcm5hbWU6ICfpkrvnn7PkvJrlkZgnLFxyXG4gICAgICAgIG1lbmJlcmludHJvZHVjZTpcclxuICAgICAgICAgICfmma7pgJrkvJrlkZjntK/orqHmtojotLkyMDAwMOWFg+aIluiAheS4gOasoeaAp+WFheWAvOa7oTEwMDAw5YWDOyBcXG4g6YeR5Y2h5Lya5ZGY6KGl5YWFNzUwMOWFgywg5pmu6YCa5Lya5ZGY57Sv6K6h5YWF5YC8MjAwMDDlhYPljbPlj6/miJDkuLrpkrvnn7PkvJrlkZgsIOWFqOWcuuWVhuWTgeS6q+WPlznmipjkvJjmg6A7IFxcbiDlkIzml7bkuI3lrprmnJ/mjqjlh7rpkojlr7npkrvnn7PkvJrlkZjnmoTlirLniIbmtLvliqguJ1xyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgbm9DZW50ZXI6IFtcclxuICAgICAgeyBpYW1nczogJ25vY2VudGVyLnBuZycgfSxcclxuICAgICAgeyBpYW1nczogJ25vY2VudGVyLnBuZycgfSxcclxuICAgICAgeyBpYW1nczogJ25vY2VudGVyLnBuZycgfSxcclxuICAgICAgeyBpYW1nczogJ25vY2VudGVyLnBuZycgfSxcclxuICAgICAgeyBpYW1nczogJ25vY2VudGVyLnBuZycgfVxyXG4gICAgXSxcclxuICAgIG1lbWJlcl9pbmZvOiBudWxsLFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7fTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbiAgb25TaG93KCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuXHJcbiAgICAgLy8g55So5oi35Liq5Lq65Lit5b+D5pWw5o2u5o6l5Y+jXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkubWVtYmVySW5mbyxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLm1lbWJlcl9pbmZvID0gcmVzLmRhdGFzLm1lbWJlcl9pbmZvXHJcbiAgICAgIFxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgXHJcbiAgfVxyXG59XHJcbiJdfQ==