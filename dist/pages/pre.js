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

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '预购'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      requestImgUrl: '',
      preId: '',
      flowData: [{ id: '1', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }, { id: '2', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }, { id: '3', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }, { id: '4', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }, { id: '5', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }, { id: '6', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }]
    }, _this.computed = {}, _this.events = {}, _this.methods = {
      /**
       * 跳转商品详情
       */
      goPreDetails: function goPreDetails(shopid) {
        // console.log('preId',this.preId)
        this.$navigate('/pages/preShopDetails?shopid=' + shopid + '&preId=' + this.preId);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.preId = options.id;
      console.log('options', options.id);
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      // this.userInfo = this.$parent.globalData.userInfo
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/pre'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZS5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInJlcXVlc3RJbWdVcmwiLCJwcmVJZCIsImZsb3dEYXRhIiwiaWQiLCJ0aXRsZSIsInByaWNlIiwiZXhwcmljZSIsImltZyIsInRhZyIsImNvbXB1dGVkIiwiZXZlbnRzIiwibWV0aG9kcyIsImdvUHJlRGV0YWlscyIsInNob3BpZCIsIiRuYXZpZ2F0ZSIsIm9wdGlvbnMiLCJjb25zb2xlIiwibG9nIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0hDLHFCQUFlLEVBRFo7QUFFSEMsYUFBTyxFQUZKO0FBR0hDLGdCQUFTLENBQ1AsRUFBQ0MsSUFBRyxHQUFKLEVBQVFDLE9BQU0sT0FBZCxFQUFzQkMsT0FBTSxHQUE1QixFQUFnQ0MsU0FBUSxJQUF4QyxFQUE2Q0MsS0FBSSxjQUFqRCxFQUFnRUMsS0FBSSxNQUFwRSxFQURPLEVBRVAsRUFBQ0wsSUFBRyxHQUFKLEVBQVFDLE9BQU0sT0FBZCxFQUFzQkMsT0FBTSxHQUE1QixFQUFnQ0MsU0FBUSxJQUF4QyxFQUE2Q0MsS0FBSSxjQUFqRCxFQUFnRUMsS0FBSSxNQUFwRSxFQUZPLEVBR1AsRUFBQ0wsSUFBRyxHQUFKLEVBQVFDLE9BQU0sT0FBZCxFQUFzQkMsT0FBTSxHQUE1QixFQUFnQ0MsU0FBUSxJQUF4QyxFQUE2Q0MsS0FBSSxjQUFqRCxFQUFnRUMsS0FBSSxNQUFwRSxFQUhPLEVBSVAsRUFBQ0wsSUFBRyxHQUFKLEVBQVFDLE9BQU0sT0FBZCxFQUFzQkMsT0FBTSxHQUE1QixFQUFnQ0MsU0FBUSxJQUF4QyxFQUE2Q0MsS0FBSSxjQUFqRCxFQUFnRUMsS0FBSSxNQUFwRSxFQUpPLEVBS1AsRUFBQ0wsSUFBRyxHQUFKLEVBQVFDLE9BQU0sT0FBZCxFQUFzQkMsT0FBTSxHQUE1QixFQUFnQ0MsU0FBUSxJQUF4QyxFQUE2Q0MsS0FBSSxjQUFqRCxFQUFnRUMsS0FBSSxNQUFwRSxFQUxPLEVBTVAsRUFBQ0wsSUFBRyxHQUFKLEVBQVFDLE9BQU0sT0FBZCxFQUFzQkMsT0FBTSxHQUE1QixFQUFnQ0MsU0FBUSxJQUF4QyxFQUE2Q0MsS0FBSSxjQUFqRCxFQUFnRUMsS0FBSSxNQUFwRSxFQU5PO0FBSE4sSyxRQWFQQyxRLEdBQVcsRSxRQUdYQyxNLEdBQVMsRSxRQVVQQyxPLEdBQVU7QUFDTjs7O0FBR0FDLGtCQUpNLHdCQUlPQyxNQUpQLEVBSWM7QUFDaEI7QUFDQSxhQUFLQyxTQUFMLG1DQUErQ0QsTUFBL0MsZUFBK0QsS0FBS1osS0FBcEU7QUFDSDtBQVBLLEs7Ozs7OzJCQVJIYyxPLEVBQVM7QUFDWixXQUFLZCxLQUFMLEdBQWFjLFFBQVFaLEVBQXJCO0FBQ0FhLGNBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXNCRixRQUFRWixFQUE5QjtBQUNIOzs7NkJBQ1E7QUFDUDtBQUNFLFdBQUtILGFBQUwsR0FBcUIsS0FBS2tCLE9BQUwsQ0FBYUMsVUFBYixDQUF3Qm5CLGFBQTdDO0FBQ0g7Ozs7RUFqQzhCb0IsZUFBS0MsSTs7a0JBQW5CM0IsSyIsImZpbGUiOiJwcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mihOi0rSdcclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgICBwcmVJZDogJycsXHJcbiAgICAgIGZsb3dEYXRhOltcclxuICAgICAgICB7aWQ6JzEnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzon5ruh5LiJ5YeP5LiAJ30sXHJcbiAgICAgICAge2lkOicyJyx0aXRsZTon6JCM5YiG6K6i5Lmm5py6JyxwcmljZTonNScsZXhwcmljZTonMjUnLGltZzonaW5kZXhpbWcucG5nJyx0YWc6J+a7oeS4ieWHj+S4gCd9LFxyXG4gICAgICAgIHtpZDonMycsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOifmu6HkuInlh4/kuIAnfSxcclxuICAgICAgICB7aWQ6JzQnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzon5ruh5LiJ5YeP5LiAJ30sXHJcbiAgICAgICAge2lkOic1Jyx0aXRsZTon6JCM5YiG6K6i5Lmm5py6JyxwcmljZTonNScsZXhwcmljZTonMjUnLGltZzonaW5kZXhpbWcucG5nJyx0YWc6J+a7oeS4ieWHj+S4gCd9LFxyXG4gICAgICAgIHtpZDonNicsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOifmu6HkuInlh4/kuIAnfVxyXG4gICAgICBdLFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG5cclxuICBldmVudHMgPSB7fTtcclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMucHJlSWQgPSBvcHRpb25zLmlkXHJcbiAgICAgICAgY29uc29sZS5sb2coJ29wdGlvbnMnLG9wdGlvbnMuaWQpXHJcbiAgICB9XHJcbiAgICBvblNob3coKSB7XHJcbiAgICAgIC8vIHRoaXMudXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mb1xyXG4gICAgICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmxcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6Lez6L2s5ZWG5ZOB6K+m5oOFXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ29QcmVEZXRhaWxzKHNob3BpZCl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdwcmVJZCcsdGhpcy5wcmVJZClcclxuICAgICAgICAgICAgdGhpcy4kbmF2aWdhdGUoYC9wYWdlcy9wcmVTaG9wRGV0YWlscz9zaG9waWQ9JHtzaG9waWR9JnByZUlkPSR7dGhpcy5wcmVJZH1gKVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuIl19