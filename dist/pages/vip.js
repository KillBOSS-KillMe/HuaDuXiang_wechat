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
      navigationBarTitleText: '会员中心'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      gradeArr: [{ title: '普通会员' }, { title: '银卡会员' }, { title: '金卡会员' }, { title: '钻石会员' }],
      active: 3,
      bgImg: 'image37.png',
      menberExplain: [{
        membername: '普通会员',
        menberintroduce: '只参与积分和充值, 只要关注公众号即可成为普通会员'
      }, {
        membername: '银卡会员',
        menberintroduce: '普通会员累计消费满1000元或者一次性充值满500元即可成为银卡会员,全场商品享受98折优惠'
      }, {
        membername: '金卡会员',
        menberintroduce: '普通会员累计消费满500元或者一次性充值满3000元; \n 银卡会员一次性充值2500元挥着累计充值5000元即可成为金卡会员,全场商品享受9,5折优惠'
      }, {
        membername: '钻石会员',
        menberintroduce: '普通会员累计消费20000元或者一次性充值满10000元; \n 金卡会员补充7500元, 普通会员累计充值20000元即可成为钻石会员, 全场商品享受9折优惠; \n 同时不定期推出针对钻石会员的劲爆活动.'
      }]
    }, _this.computed = {}, _this.events = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      switch (this.active) {
        case 1:
          this.bgImg = 'image37.png';
          break;
        case 2:
          this.bgImg = 'image38.png';
          break;
        case 3:
          this.bgImg = 'image39.png';
          break;
        case 4:
          this.bgImg = 'image34.png';
          break;
      }
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/vip'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpcC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsImdyYWRlQXJyIiwidGl0bGUiLCJhY3RpdmUiLCJiZ0ltZyIsIm1lbmJlckV4cGxhaW4iLCJtZW1iZXJuYW1lIiwibWVuYmVyaW50cm9kdWNlIiwiY29tcHV0ZWQiLCJldmVudHMiLCJtZXRob2RzIiwib3B0aW9ucyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FDUixFQUFFQyxPQUFPLE1BQVQsRUFEUSxFQUVSLEVBQUVBLE9BQU8sTUFBVCxFQUZRLEVBR1IsRUFBRUEsT0FBTyxNQUFULEVBSFEsRUFJUixFQUFFQSxPQUFPLE1BQVQsRUFKUSxDQURMO0FBT0xDLGNBQVEsQ0FQSDtBQVFMQyxhQUFPLGFBUkY7QUFTTEMscUJBQWUsQ0FDYjtBQUNFQyxvQkFBWSxNQURkO0FBRUVDLHlCQUFpQjtBQUZuQixPQURhLEVBS2I7QUFDRUQsb0JBQVksTUFEZDtBQUVFQyx5QkFDRTtBQUhKLE9BTGEsRUFVYjtBQUNFRCxvQkFBWSxNQURkO0FBRUVDLHlCQUNFO0FBSEosT0FWYSxFQWViO0FBQ0VELG9CQUFZLE1BRGQ7QUFFRUMseUJBQ0U7QUFISixPQWZhO0FBVFYsSyxRQWdDUEMsUSxHQUFXLEUsUUFFWEMsTSxHQUFTLEUsUUFtQlRDLE8sR0FBVSxFOzs7OzsyQkFqQkhDLE8sRUFBUztBQUNkLGNBQVEsS0FBS1IsTUFBYjtBQUNFLGFBQUssQ0FBTDtBQUNFLGVBQUtDLEtBQUwsR0FBYSxhQUFiO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRSxlQUFLQSxLQUFMLEdBQWEsYUFBYjtBQUNBO0FBQ0YsYUFBSyxDQUFMO0FBQ0UsZUFBS0EsS0FBTCxHQUFhLGFBQWI7QUFDQTtBQUNGLGFBQUssQ0FBTDtBQUNFLGVBQUtBLEtBQUwsR0FBYSxhQUFiO0FBQ0E7QUFaSjtBQWNEOzs7O0VBM0RnQ1EsZUFBS0MsSTs7a0JBQW5CbEIsSyIsImZpbGUiOiJ2aXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S8muWRmOS4reW/gydcclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBncmFkZUFycjogW1xyXG4gICAgICB7IHRpdGxlOiAn5pmu6YCa5Lya5ZGYJyB9LFxyXG4gICAgICB7IHRpdGxlOiAn6ZO25Y2h5Lya5ZGYJyB9LFxyXG4gICAgICB7IHRpdGxlOiAn6YeR5Y2h5Lya5ZGYJyB9LFxyXG4gICAgICB7IHRpdGxlOiAn6ZK755+z5Lya5ZGYJyB9XHJcbiAgICBdLFxyXG4gICAgYWN0aXZlOiAzLFxyXG4gICAgYmdJbWc6ICdpbWFnZTM3LnBuZycsXHJcbiAgICBtZW5iZXJFeHBsYWluOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBtZW1iZXJuYW1lOiAn5pmu6YCa5Lya5ZGYJyxcclxuICAgICAgICBtZW5iZXJpbnRyb2R1Y2U6ICflj6rlj4LkuI7np6/liIblkozlhYXlgLwsIOWPquimgeWFs+azqOWFrOS8l+WPt+WNs+WPr+aIkOS4uuaZrumAmuS8muWRmCdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG1lbWJlcm5hbWU6ICfpk7bljaHkvJrlkZgnLFxyXG4gICAgICAgIG1lbmJlcmludHJvZHVjZTpcclxuICAgICAgICAgICfmma7pgJrkvJrlkZjntK/orqHmtojotLnmu6ExMDAw5YWD5oiW6ICF5LiA5qyh5oCn5YWF5YC85ruhNTAw5YWD5Y2z5Y+v5oiQ5Li66ZO25Y2h5Lya5ZGYLOWFqOWcuuWVhuWTgeS6q+WPlzk45oqY5LyY5oOgJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgbWVtYmVybmFtZTogJ+mHkeWNoeS8muWRmCcsXHJcbiAgICAgICAgbWVuYmVyaW50cm9kdWNlOlxyXG4gICAgICAgICAgJ+aZrumAmuS8muWRmOe0r+iuoea2iOi0uea7oTUwMOWFg+aIluiAheS4gOasoeaAp+WFheWAvOa7oTMwMDDlhYM7IFxcbiDpk7bljaHkvJrlkZjkuIDmrKHmgKflhYXlgLwyNTAw5YWD5oyl552A57Sv6K6h5YWF5YC8NTAwMOWFg+WNs+WPr+aIkOS4uumHkeWNoeS8muWRmCzlhajlnLrllYblk4Hkuqvlj5c5LDXmipjkvJjmg6AnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBtZW1iZXJuYW1lOiAn6ZK755+z5Lya5ZGYJyxcclxuICAgICAgICBtZW5iZXJpbnRyb2R1Y2U6XHJcbiAgICAgICAgICAn5pmu6YCa5Lya5ZGY57Sv6K6h5raI6LS5MjAwMDDlhYPmiJbogIXkuIDmrKHmgKflhYXlgLzmu6ExMDAwMOWFgzsgXFxuIOmHkeWNoeS8muWRmOihpeWFhTc1MDDlhYMsIOaZrumAmuS8muWRmOe0r+iuoeWFheWAvDIwMDAw5YWD5Y2z5Y+v5oiQ5Li66ZK755+z5Lya5ZGYLCDlhajlnLrllYblk4Hkuqvlj5c55oqY5LyY5oOgOyBcXG4g5ZCM5pe25LiN5a6a5pyf5o6o5Ye66ZKI5a+56ZK755+z5Lya5ZGY55qE5Yqy54iG5rS75YqoLidcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgc3dpdGNoICh0aGlzLmFjdGl2ZSkge1xyXG4gICAgICBjYXNlIDE6XHJcbiAgICAgICAgdGhpcy5iZ0ltZyA9ICdpbWFnZTM3LnBuZyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjpcclxuICAgICAgICB0aGlzLmJnSW1nID0gJ2ltYWdlMzgucG5nJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOlxyXG4gICAgICAgIHRoaXMuYmdJbWcgPSAnaW1hZ2UzOS5wbmcnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDQ6XHJcbiAgICAgICAgdGhpcy5iZ0ltZyA9ICdpbWFnZTM0LnBuZyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtZXRob2RzID0ge307XHJcbn1cclxuIl19