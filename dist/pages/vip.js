'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../ajax.js');

var _mask = require('./../components/mask.js');

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var api = require('./../api.js');

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
    }, _this.$repeat = {}, _this.$props = { "vipmask": { "xmlns:v-bind": "", "v-bind:maskFlag.sync": "vipFlag" } }, _this.$events = {}, _this.components = {
      vipmask: _mask2.default
    }, _this.mixins = [], _this.data = {
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
      }],
      member_info: null,
      member_data: null,
      vipFlag: false,
      priceArr: [10, 50, 100, 200, 500, 1000],
      price: '',
      priceActive: null
    }, _this.computed = {}, _this.events = {}, _this.methods = {
      changePrice: function changePrice(price, idx) {
        this.price = price;
        this.priceActive = idx;
      },
      bindfocus: function bindfocus() {
        this.price = '';
        this.priceActive = null;
      },
      bindinput: function bindinput(e) {
        this.price = e.detail.value;
      },
      showVipFlag: function showVipFlag(e) {
        this.vipFlag = true;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {}
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      // 用户个人中心数据接口
      (0, _ajax.ajax)({
        url: api.memberInfo
      }).then(function (res) {
        if (res.code == 200) {
          _this2.member_info = res.datas.member_info;
          _this2.member_data = res.datas.member_data;
          switch (res.datas.member_info.level) {
            case 0:
              _this2.bgImg = 'image37.png';
              break;
            case 1:
              _this2.bgImg = 'image38.png';
              break;
            case 2:
              _this2.bgImg = 'image39.png';
              break;
            case 3:
              _this2.bgImg = 'image34.png';
              break;
          }
          _this2.$apply();
        }
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/vip'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpcC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwidmlwbWFzayIsIm1hc2siLCJtaXhpbnMiLCJkYXRhIiwiZ3JhZGVBcnIiLCJ0aXRsZSIsImFjdGl2ZSIsImJnSW1nIiwibWVuYmVyRXhwbGFpbiIsIm1lbWJlcm5hbWUiLCJtZW5iZXJpbnRyb2R1Y2UiLCJtZW1iZXJfaW5mbyIsIm1lbWJlcl9kYXRhIiwidmlwRmxhZyIsInByaWNlQXJyIiwicHJpY2UiLCJwcmljZUFjdGl2ZSIsImNvbXB1dGVkIiwiZXZlbnRzIiwibWV0aG9kcyIsImNoYW5nZVByaWNlIiwiaWR4IiwiYmluZGZvY3VzIiwiYmluZGlucHV0IiwiZSIsImRldGFpbCIsInZhbHVlIiwic2hvd1ZpcEZsYWciLCJvcHRpb25zIiwidXJsIiwibWVtYmVySW5mbyIsInRoZW4iLCJyZXMiLCJjb2RlIiwiZGF0YXMiLCJsZXZlbCIsIiRhcHBseSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFGQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFNcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFdBQVUsRUFBQyxnQkFBZSxFQUFoQixFQUFtQix3QkFBdUIsU0FBMUMsRUFBWCxFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyxlQUFTQztBQURDLEssUUFJWkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLENBQ1IsRUFBRUMsT0FBTyxNQUFULEVBRFEsRUFFUixFQUFFQSxPQUFPLE1BQVQsRUFGUSxFQUdSLEVBQUVBLE9BQU8sTUFBVCxFQUhRLEVBSVIsRUFBRUEsT0FBTyxNQUFULEVBSlEsQ0FETDtBQU9MQyxjQUFRLENBUEg7QUFRTEMsYUFBTyxhQVJGO0FBU0xDLHFCQUFlLENBQ2I7QUFDRUMsb0JBQVksTUFEZDtBQUVFQyx5QkFBaUI7QUFGbkIsT0FEYSxFQUtiO0FBQ0VELG9CQUFZLE1BRGQ7QUFFRUMseUJBQ0U7QUFISixPQUxhLEVBVWI7QUFDRUQsb0JBQVksTUFEZDtBQUVFQyx5QkFDRTtBQUhKLE9BVmEsRUFlYjtBQUNFRCxvQkFBWSxNQURkO0FBRUVDLHlCQUNFO0FBSEosT0FmYSxDQVRWO0FBOEJMQyxtQkFBYSxJQTlCUjtBQStCTEMsbUJBQWEsSUEvQlI7QUFnQ0xDLGVBQVMsS0FoQ0o7QUFpQ0xDLGdCQUFVLENBQUMsRUFBRCxFQUFJLEVBQUosRUFBTyxHQUFQLEVBQVcsR0FBWCxFQUFlLEdBQWYsRUFBb0IsSUFBcEIsQ0FqQ0w7QUFrQ0xDLGFBQU8sRUFsQ0Y7QUFtQ0xDLG1CQUFhO0FBbkNSLEssUUFzQ1BDLFEsR0FBVyxFLFFBRVhDLE0sR0FBUyxFLFFBaUNUQyxPLEdBQVU7QUFDUkMsaUJBRFEsdUJBQ0lMLEtBREosRUFDV00sR0FEWCxFQUNlO0FBQ3JCLGFBQUtOLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUtDLFdBQUwsR0FBbUJLLEdBQW5CO0FBQ0QsT0FKTztBQUtSQyxlQUxRLHVCQUtJO0FBQ1YsYUFBS1AsS0FBTCxHQUFhLEVBQWI7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0QsT0FSTztBQVNSTyxlQVRRLHFCQVNFQyxDQVRGLEVBU0s7QUFDWCxhQUFLVCxLQUFMLEdBQWFTLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdEI7QUFDRCxPQVhPO0FBWVJDLGlCQVpRLHVCQVlJSCxDQVpKLEVBWU87QUFDYixhQUFLWCxPQUFMLEdBQWUsSUFBZjtBQUNEO0FBZE8sSzs7Ozs7MkJBL0JIZSxPLEVBQVMsQ0FFZjs7OzZCQUVPO0FBQUE7O0FBQ0w7QUFDRCxzQkFBSztBQUNIQyxhQUFLdEMsSUFBSXVDO0FBRE4sT0FBTCxFQUVHQyxJQUZILENBRVEsZUFBTztBQUNiLFlBQUdDLElBQUlDLElBQUosSUFBWSxHQUFmLEVBQW9CO0FBQ2xCLGlCQUFLdEIsV0FBTCxHQUFtQnFCLElBQUlFLEtBQUosQ0FBVXZCLFdBQTdCO0FBQ0EsaUJBQUtDLFdBQUwsR0FBbUJvQixJQUFJRSxLQUFKLENBQVV0QixXQUE3QjtBQUNBLGtCQUFRb0IsSUFBSUUsS0FBSixDQUFVdkIsV0FBVixDQUFzQndCLEtBQTlCO0FBQ0UsaUJBQUssQ0FBTDtBQUNFLHFCQUFLNUIsS0FBTCxHQUFhLGFBQWI7QUFDQTtBQUNGLGlCQUFLLENBQUw7QUFDRSxxQkFBS0EsS0FBTCxHQUFhLGFBQWI7QUFDQTtBQUNGLGlCQUFLLENBQUw7QUFDRSxxQkFBS0EsS0FBTCxHQUFhLGFBQWI7QUFDQTtBQUNGLGlCQUFLLENBQUw7QUFDRSxxQkFBS0EsS0FBTCxHQUFhLGFBQWI7QUFDQTtBQVpKO0FBY0EsaUJBQUs2QixNQUFMO0FBQ0Q7QUFDRixPQXRCRDtBQXVCRDs7OztFQXBGZ0NDLGVBQUtDLEk7O2tCQUFuQjdDLEsiLCJmaWxlIjoidmlwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuaW1wb3J0IG1hc2sgZnJvbSAnLi4vY29tcG9uZW50cy9tYXNrJztcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvJrlkZjkuK3lv4MnXHJcbiAgfTtcclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widmlwbWFza1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwidmlwRmxhZ1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICB2aXBtYXNrOiBtYXNrXHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBncmFkZUFycjogW1xyXG4gICAgICB7IHRpdGxlOiAn5pmu6YCa5Lya5ZGYJyB9LFxyXG4gICAgICB7IHRpdGxlOiAn6ZO25Y2h5Lya5ZGYJyB9LFxyXG4gICAgICB7IHRpdGxlOiAn6YeR5Y2h5Lya5ZGYJyB9LFxyXG4gICAgICB7IHRpdGxlOiAn6ZK755+z5Lya5ZGYJyB9XHJcbiAgICBdLFxyXG4gICAgYWN0aXZlOiAzLFxyXG4gICAgYmdJbWc6ICdpbWFnZTM3LnBuZycsXHJcbiAgICBtZW5iZXJFeHBsYWluOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBtZW1iZXJuYW1lOiAn5pmu6YCa5Lya5ZGYJyxcclxuICAgICAgICBtZW5iZXJpbnRyb2R1Y2U6ICflj6rlj4LkuI7np6/liIblkozlhYXlgLwsIOWPquimgeWFs+azqOWFrOS8l+WPt+WNs+WPr+aIkOS4uuaZrumAmuS8muWRmCdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG1lbWJlcm5hbWU6ICfpk7bljaHkvJrlkZgnLFxyXG4gICAgICAgIG1lbmJlcmludHJvZHVjZTpcclxuICAgICAgICAgICfmma7pgJrkvJrlkZjntK/orqHmtojotLnmu6ExMDAw5YWD5oiW6ICF5LiA5qyh5oCn5YWF5YC85ruhNTAw5YWD5Y2z5Y+v5oiQ5Li66ZO25Y2h5Lya5ZGYLOWFqOWcuuWVhuWTgeS6q+WPlzk45oqY5LyY5oOgJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgbWVtYmVybmFtZTogJ+mHkeWNoeS8muWRmCcsXHJcbiAgICAgICAgbWVuYmVyaW50cm9kdWNlOlxyXG4gICAgICAgICAgJ+aZrumAmuS8muWRmOe0r+iuoea2iOi0uea7oTUwMOWFg+aIluiAheS4gOasoeaAp+WFheWAvOa7oTMwMDDlhYM7IFxcbiDpk7bljaHkvJrlkZjkuIDmrKHmgKflhYXlgLwyNTAw5YWD5oyl552A57Sv6K6h5YWF5YC8NTAwMOWFg+WNs+WPr+aIkOS4uumHkeWNoeS8muWRmCzlhajlnLrllYblk4Hkuqvlj5c5LDXmipjkvJjmg6AnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBtZW1iZXJuYW1lOiAn6ZK755+z5Lya5ZGYJyxcclxuICAgICAgICBtZW5iZXJpbnRyb2R1Y2U6XHJcbiAgICAgICAgICAn5pmu6YCa5Lya5ZGY57Sv6K6h5raI6LS5MjAwMDDlhYPmiJbogIXkuIDmrKHmgKflhYXlgLzmu6ExMDAwMOWFgzsgXFxuIOmHkeWNoeS8muWRmOihpeWFhTc1MDDlhYMsIOaZrumAmuS8muWRmOe0r+iuoeWFheWAvDIwMDAw5YWD5Y2z5Y+v5oiQ5Li66ZK755+z5Lya5ZGYLCDlhajlnLrllYblk4Hkuqvlj5c55oqY5LyY5oOgOyBcXG4g5ZCM5pe25LiN5a6a5pyf5o6o5Ye66ZKI5a+56ZK755+z5Lya5ZGY55qE5Yqy54iG5rS75YqoLidcclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIG1lbWJlcl9pbmZvOiBudWxsLFxyXG4gICAgbWVtYmVyX2RhdGE6IG51bGwsXHJcbiAgICB2aXBGbGFnOiBmYWxzZSxcclxuICAgIHByaWNlQXJyOiBbMTAsNTAsMTAwLDIwMCw1MDAsIDEwMDBdLFxyXG4gICAgcHJpY2U6ICcnLFxyXG4gICAgcHJpY2VBY3RpdmU6IG51bGwsXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIG9uU2hvdygpe1xyXG4gICAgIC8vIOeUqOaIt+S4quS6uuS4reW/g+aVsOaNruaOpeWPo1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm1lbWJlckluZm8sXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHRoaXMubWVtYmVyX2luZm8gPSByZXMuZGF0YXMubWVtYmVyX2luZm9cclxuICAgICAgICB0aGlzLm1lbWJlcl9kYXRhID0gcmVzLmRhdGFzLm1lbWJlcl9kYXRhXHJcbiAgICAgICAgc3dpdGNoIChyZXMuZGF0YXMubWVtYmVyX2luZm8ubGV2ZWwpIHtcclxuICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgdGhpcy5iZ0ltZyA9ICdpbWFnZTM3LnBuZyc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICB0aGlzLmJnSW1nID0gJ2ltYWdlMzgucG5nJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHRoaXMuYmdJbWcgPSAnaW1hZ2UzOS5wbmcnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgdGhpcy5iZ0ltZyA9ICdpbWFnZTM0LnBuZyc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgY2hhbmdlUHJpY2UocHJpY2UsIGlkeCl7XHJcbiAgICAgIHRoaXMucHJpY2UgPSBwcmljZVxyXG4gICAgICB0aGlzLnByaWNlQWN0aXZlID0gaWR4XHJcbiAgICB9LFxyXG4gICAgYmluZGZvY3VzKCkge1xyXG4gICAgICB0aGlzLnByaWNlID0gJyc7XHJcbiAgICAgIHRoaXMucHJpY2VBY3RpdmUgPSBudWxsXHJcbiAgICB9LFxyXG4gICAgYmluZGlucHV0KGUpIHtcclxuICAgICAgdGhpcy5wcmljZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9LFxyXG4gICAgc2hvd1ZpcEZsYWcoZSkge1xyXG4gICAgICB0aGlzLnZpcEZsYWcgPSB0cnVlXHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iXX0=