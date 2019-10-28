'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      itemleft: 0, // 判断已注册的图标距离左边的位置
      itemline: 0, // 判断注册后线距离左边的位置
      btnText: '', // 根据class判断按钮文字
      tagText: '', // 充值提示信息
      balancetext: 0, //余额
      balanceshow: true, //余额显示
      btnshow: true, //充值按钮显示
      goldenclass: '',
      menberImg: 'menber.png', // 会员背景图片
      //
      userMember: {
        name: '',
        integral: '200',
        class: 1
      },
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
      noCenter: [{ iamgs: 'nocenter.png' }, { iamgs: 'nocenter.png' }, { iamgs: 'nocenter.png' }, { iamgs: 'nocenter.png' }, { iamgs: 'nocenter.png' }]
    }, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onShow',
    value: function onShow() {
      // this.userInfo = this.$parent.globalData.userInfo
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.userInfo = this.$parent.globalData.userInfo;
      console.log(this.noCenter[0].iamgs);
      switch (this.userMember.class) {
        case 0:
          this.userMember.class = '非会员';
          this.itemleft = 4.5;
          this.itemline = 5;
          this.balanceshow = false;
          this.btnText = '立即关注';
          this.tagText = '关注公众号即可成为普通会员';
          break;
        case 1:
          this.userMember.class = '普通会员';
          this.itemleft = 26;
          this.itemline = 26;
          this.btnText = '立即充值';
          this.tagText = '充值1000元即可成为银卡会员';
          this.noCenter[0].iamgs = 'center.png';
          break;
        case 2:
          this.userMember.class = '银卡会员';
          this.itemleft = 48;
          this.itemline = 48;
          this.btnText = '立即充值';
          this.tagText = '充值2500元即可成为h金卡会员';
          this.noCenter[0].iamgs = 'center.png';
          this.noCenter[1].iamgs = 'center.png';
          break;
        case 3:
          this.userMember.class = '金卡会员';
          this.itemleft = 69.5;
          this.itemline = 70;
          this.btnText = '立即充值';
          this.tagText = '充值7000元即可成为钻石会员';
          this.menberImg = 'golden.png';
          this.goldenclass = '#BE8D53';

          this.noCenter[0].iamgs = 'center.png';
          this.noCenter[1].iamgs = 'center.png';
          this.noCenter[2].iamgs = 'center.png';
          break;
        case 4:
          this.userMember.class = '钻石会员';
          this.itemleft = 91.5;
          this.itemline = 100;
          this.menberImg = 'black.png';
          this.goldenclass = '#BE8D53';
          this.btnshow = false;
          this.noCenter[0].iamgs = 'center.png';
          this.noCenter[1].iamgs = 'center.png';
          this.noCenter[2].iamgs = 'center.png';
          this.noCenter[3].iamgs = 'center.png';

          break;

        default:
          break;
      }
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/membersCenter'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbWJlcnNDZW50ZXIuanMiXSwibmFtZXMiOlsiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwiY2FuSVVzZSIsInd4IiwidXNlckluZm8iLCJpdGVtbGVmdCIsIml0ZW1saW5lIiwiYnRuVGV4dCIsInRhZ1RleHQiLCJiYWxhbmNldGV4dCIsImJhbGFuY2VzaG93IiwiYnRuc2hvdyIsImdvbGRlbmNsYXNzIiwibWVuYmVySW1nIiwidXNlck1lbWJlciIsIm5hbWUiLCJpbnRlZ3JhbCIsImNsYXNzIiwibWVuYmVyRXhwbGFpbiIsIm1lbWJlcm5hbWUiLCJtZW5iZXJpbnRyb2R1Y2UiLCJub0NlbnRlciIsImlhbWdzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZXZlbnRzIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjb25zb2xlIiwibG9nIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxxQkFBZSxFQURWO0FBRUxDLGVBQVNDLEdBQUdELE9BQUgsQ0FBVyw4QkFBWCxDQUZKO0FBR0xFLGdCQUFVLEVBSEw7QUFJTEMsZ0JBQVUsQ0FKTCxFQUlRO0FBQ2JDLGdCQUFVLENBTEwsRUFLUTtBQUNiQyxlQUFTLEVBTkosRUFNUTtBQUNiQyxlQUFTLEVBUEosRUFPUTtBQUNiQyxtQkFBYSxDQVJSLEVBUVc7QUFDaEJDLG1CQUFhLElBVFIsRUFTYztBQUNuQkMsZUFBUyxJQVZKLEVBVVU7QUFDZkMsbUJBQWEsRUFYUjtBQVlMQyxpQkFBVyxZQVpOLEVBWW9CO0FBQ3pCO0FBQ0FDLGtCQUFZO0FBQ1ZDLGNBQU0sRUFE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QUFkLEVBQWlCQyxLQUFqQixHQUF5QixZQUF6QjtBQUNBO0FBQ0YsYUFBSyxDQUFMO0FBQ0UsZUFBS1IsVUFBTCxDQUFnQkcsS0FBaEIsR0FBd0IsTUFBeEI7QUFDQSxlQUFLWixRQUFMLEdBQWdCLElBQWhCO0FBQ0EsZUFBS0MsUUFBTCxHQUFnQixHQUFoQjtBQUNBLGVBQUtPLFNBQUwsR0FBaUIsV0FBakI7QUFDQSxlQUFLRCxXQUFMLEdBQW1CLFNBQW5CO0FBQ0EsZUFBS0QsT0FBTCxHQUFlLEtBQWY7QUFDQSxlQUFLVSxRQUFMLENBQWMsQ0FBZCxFQUFpQkMsS0FBakIsR0FBeUIsWUFBekI7QUFDQSxlQUFLRCxRQUFMLENBQWMsQ0FBZCxFQUFpQkMsS0FBakIsR0FBeUIsWUFBekI7QUFDQSxlQUFLRCxRQUFMLENBQWMsQ0FBZCxFQUFpQkMsS0FBakIsR0FBeUIsWUFBekI7QUFDQSxlQUFLRCxRQUFMLENBQWMsQ0FBZCxFQUFpQkMsS0FBakIsR0FBeUIsWUFBekI7O0FBRUE7O0FBRUY7QUFDRTtBQXRESjtBQXdERDs7OztFQXBJbUNRLGVBQUtDLEk7O2tCQUF0QnBDLFEiLCJmaWxlIjoibWVtYmVyc0NlbnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Lya5ZGY5Lit5b+DJ1xyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcclxuICAgIHVzZXJJbmZvOiB7fSxcclxuICAgIGl0ZW1sZWZ0OiAwLCAvLyDliKTmlq3lt7Lms6jlhoznmoTlm77moIfot53nprvlt6bovrnnmoTkvY3nva5cclxuICAgIGl0ZW1saW5lOiAwLCAvLyDliKTmlq3ms6jlhozlkI7nur/ot53nprvlt6bovrnnmoTkvY3nva5cclxuICAgIGJ0blRleHQ6ICcnLCAvLyDmoLnmja5jbGFzc+WIpOaWreaMiemSruaWh+Wtl1xyXG4gICAgdGFnVGV4dDogJycsIC8vIOWFheWAvOaPkOekuuS/oeaBr1xyXG4gICAgYmFsYW5jZXRleHQ6IDAsIC8v5L2Z6aKdXHJcbiAgICBiYWxhbmNlc2hvdzogdHJ1ZSwgLy/kvZnpop3mmL7npLpcclxuICAgIGJ0bnNob3c6IHRydWUsIC8v5YWF5YC85oyJ6ZKu5pi+56S6XHJcbiAgICBnb2xkZW5jbGFzczogJycsXHJcbiAgICBtZW5iZXJJbWc6ICdtZW5iZXIucG5nJywgLy8g5Lya5ZGY6IOM5pmv5Zu+54mHXHJcbiAgICAvL1xyXG4gICAgdXNlck1lbWJlcjoge1xyXG4gICAgICBuYW1lOiAnJyxcclxuICAgICAgaW50ZWdyYWw6ICcyMDAnLFxyXG4gICAgICBjbGFzczogMVxyXG4gICAgfSxcclxuICAgIG1lbmJlckV4cGxhaW46IFtcclxuICAgICAgeyBjbGFzczogMCB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgY2xhc3M6IDEsXHJcbiAgICAgICAgbWVtYmVybmFtZTogJ+aZrumAmuS8muWRmCcsXHJcbiAgICAgICAgbWVuYmVyaW50cm9kdWNlOiAn5Y+q5Y+C5LiO56ev5YiG5ZKM5YWF5YC8LCDlj6ropoHlhbPms6jlhazkvJflj7fljbPlj6/miJDkuLrmma7pgJrkvJrlkZgnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBjbGFzczogMixcclxuICAgICAgICBtZW1iZXJuYW1lOiAn6ZO25Y2h5Lya5ZGYJyxcclxuICAgICAgICBtZW5iZXJpbnRyb2R1Y2U6XHJcbiAgICAgICAgICAn5pmu6YCa5Lya5ZGY57Sv6K6h5raI6LS55ruhMTAwMOWFg+aIluiAheS4gOasoeaAp+WFheWAvOa7oTUwMOWFg+WNs+WPr+aIkOS4uumTtuWNoeS8muWRmCzlhajlnLrllYblk4Hkuqvlj5c5OOaKmOS8mOaDoCdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGNsYXNzOiAzLFxyXG4gICAgICAgIG1lbWJlcm5hbWU6ICfph5HljaHkvJrlkZgnLFxyXG4gICAgICAgIG1lbmJlcmludHJvZHVjZTpcclxuICAgICAgICAgICfmma7pgJrkvJrlkZjntK/orqHmtojotLnmu6E1MDDlhYPmiJbogIXkuIDmrKHmgKflhYXlgLzmu6EzMDAw5YWDOyBcXG4g6ZO25Y2h5Lya5ZGY5LiA5qyh5oCn5YWF5YC8MjUwMOWFg+aMpeedgOe0r+iuoeWFheWAvDUwMDDlhYPljbPlj6/miJDkuLrph5HljaHkvJrlkZgs5YWo5Zy65ZWG5ZOB5Lqr5Y+XOSw15oqY5LyY5oOgJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgY2xhc3M6IDQsXHJcbiAgICAgICAgbWVtYmVybmFtZTogJ+mSu+efs+S8muWRmCcsXHJcbiAgICAgICAgbWVuYmVyaW50cm9kdWNlOlxyXG4gICAgICAgICAgJ+aZrumAmuS8muWRmOe0r+iuoea2iOi0uTIwMDAw5YWD5oiW6ICF5LiA5qyh5oCn5YWF5YC85ruhMTAwMDDlhYM7IFxcbiDph5HljaHkvJrlkZjooaXlhYU3NTAw5YWDLCDmma7pgJrkvJrlkZjntK/orqHlhYXlgLwyMDAwMOWFg+WNs+WPr+aIkOS4uumSu+efs+S8muWRmCwg5YWo5Zy65ZWG5ZOB5Lqr5Y+XOeaKmOS8mOaDoDsgXFxuIOWQjOaXtuS4jeWumuacn+aOqOWHuumSiOWvuemSu+efs+S8muWRmOeahOWKsueIhua0u+WKqC4nXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBub0NlbnRlcjogW1xyXG4gICAgICB7IGlhbWdzOiAnbm9jZW50ZXIucG5nJyB9LFxyXG4gICAgICB7IGlhbWdzOiAnbm9jZW50ZXIucG5nJyB9LFxyXG4gICAgICB7IGlhbWdzOiAnbm9jZW50ZXIucG5nJyB9LFxyXG4gICAgICB7IGlhbWdzOiAnbm9jZW50ZXIucG5nJyB9LFxyXG4gICAgICB7IGlhbWdzOiAnbm9jZW50ZXIucG5nJyB9XHJcbiAgICBdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHt9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvblNob3coKSB7XHJcbiAgICAvLyB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgfVxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5vQ2VudGVyWzBdLmlhbWdzKTtcclxuICAgIHN3aXRjaCAodGhpcy51c2VyTWVtYmVyLmNsYXNzKSB7XHJcbiAgICAgIGNhc2UgMDpcclxuICAgICAgICB0aGlzLnVzZXJNZW1iZXIuY2xhc3MgPSAn6Z2e5Lya5ZGYJztcclxuICAgICAgICB0aGlzLml0ZW1sZWZ0ID0gNC41O1xyXG4gICAgICAgIHRoaXMuaXRlbWxpbmUgPSA1O1xyXG4gICAgICAgIHRoaXMuYmFsYW5jZXNob3cgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJ0blRleHQgPSAn56uL5Y2z5YWz5rOoJztcclxuICAgICAgICB0aGlzLnRhZ1RleHQgPSAn5YWz5rOo5YWs5LyX5Y+35Y2z5Y+v5oiQ5Li65pmu6YCa5Lya5ZGYJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIHRoaXMudXNlck1lbWJlci5jbGFzcyA9ICfmma7pgJrkvJrlkZgnO1xyXG4gICAgICAgIHRoaXMuaXRlbWxlZnQgPSAyNjtcclxuICAgICAgICB0aGlzLml0ZW1saW5lID0gMjY7XHJcbiAgICAgICAgdGhpcy5idG5UZXh0ID0gJ+eri+WNs+WFheWAvCc7XHJcbiAgICAgICAgdGhpcy50YWdUZXh0ID0gJ+WFheWAvDEwMDDlhYPljbPlj6/miJDkuLrpk7bljaHkvJrlkZgnO1xyXG4gICAgICAgIHRoaXMubm9DZW50ZXJbMF0uaWFtZ3MgPSAnY2VudGVyLnBuZyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjpcclxuICAgICAgICB0aGlzLnVzZXJNZW1iZXIuY2xhc3MgPSAn6ZO25Y2h5Lya5ZGYJztcclxuICAgICAgICB0aGlzLml0ZW1sZWZ0ID0gNDg7XHJcbiAgICAgICAgdGhpcy5pdGVtbGluZSA9IDQ4O1xyXG4gICAgICAgIHRoaXMuYnRuVGV4dCA9ICfnq4vljbPlhYXlgLwnO1xyXG4gICAgICAgIHRoaXMudGFnVGV4dCA9ICflhYXlgLwyNTAw5YWD5Y2z5Y+v5oiQ5Li6aOmHkeWNoeS8muWRmCc7XHJcbiAgICAgICAgdGhpcy5ub0NlbnRlclswXS5pYW1ncyA9ICdjZW50ZXIucG5nJztcclxuICAgICAgICB0aGlzLm5vQ2VudGVyWzFdLmlhbWdzID0gJ2NlbnRlci5wbmcnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6XHJcbiAgICAgICAgdGhpcy51c2VyTWVtYmVyLmNsYXNzID0gJ+mHkeWNoeS8muWRmCc7XHJcbiAgICAgICAgdGhpcy5pdGVtbGVmdCA9IDY5LjU7XHJcbiAgICAgICAgdGhpcy5pdGVtbGluZSA9IDcwO1xyXG4gICAgICAgIHRoaXMuYnRuVGV4dCA9ICfnq4vljbPlhYXlgLwnO1xyXG4gICAgICAgIHRoaXMudGFnVGV4dCA9ICflhYXlgLw3MDAw5YWD5Y2z5Y+v5oiQ5Li66ZK755+z5Lya5ZGYJztcclxuICAgICAgICB0aGlzLm1lbmJlckltZyA9ICdnb2xkZW4ucG5nJztcclxuICAgICAgICB0aGlzLmdvbGRlbmNsYXNzID0gJyNCRThENTMnO1xyXG5cclxuICAgICAgICB0aGlzLm5vQ2VudGVyWzBdLmlhbWdzID0gJ2NlbnRlci5wbmcnO1xyXG4gICAgICAgIHRoaXMubm9DZW50ZXJbMV0uaWFtZ3MgPSAnY2VudGVyLnBuZyc7XHJcbiAgICAgICAgdGhpcy5ub0NlbnRlclsyXS5pYW1ncyA9ICdjZW50ZXIucG5nJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA0OlxyXG4gICAgICAgIHRoaXMudXNlck1lbWJlci5jbGFzcyA9ICfpkrvnn7PkvJrlkZgnO1xyXG4gICAgICAgIHRoaXMuaXRlbWxlZnQgPSA5MS41O1xyXG4gICAgICAgIHRoaXMuaXRlbWxpbmUgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5tZW5iZXJJbWcgPSAnYmxhY2sucG5nJztcclxuICAgICAgICB0aGlzLmdvbGRlbmNsYXNzID0gJyNCRThENTMnO1xyXG4gICAgICAgIHRoaXMuYnRuc2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9DZW50ZXJbMF0uaWFtZ3MgPSAnY2VudGVyLnBuZyc7XHJcbiAgICAgICAgdGhpcy5ub0NlbnRlclsxXS5pYW1ncyA9ICdjZW50ZXIucG5nJztcclxuICAgICAgICB0aGlzLm5vQ2VudGVyWzJdLmlhbWdzID0gJ2NlbnRlci5wbmcnO1xyXG4gICAgICAgIHRoaXMubm9DZW50ZXJbM10uaWFtZ3MgPSAnY2VudGVyLnBuZyc7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19