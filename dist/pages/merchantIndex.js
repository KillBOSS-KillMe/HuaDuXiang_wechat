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
      navigationBarTitleText: '商户',
      navigationStyle: 'custom'

    }, _this.components = {}, _this.mixins = [], _this.data = {
      requestImgUrl: '',
      store_info: null, // 店铺信息
      rec_goods_list: [], //商品列表
      navIdx: 0,
      store_goods_class: [], //店铺分类
      store_id: null
    }, _this.computed = {}, _this.methods = {
      navGoodsDetails: function navGoodsDetails(goods_id) {
        this.$navigate({ url: 'shopDetails?goods_id=' + goods_id });
      },
      changeNav: function changeNav(idx) {
        if (idx == this.navIdx) return false;
        this.navIdx = idx;
      },
      navGoodsList: function navGoodsList(id) {
        this.$navigate({ url: 'goodsList?sid=' + id + '&store_id=' + this.store_id });
      },
      back: function back() {
        wx.navigateBack();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad(t) {
      var _this2 = this;

      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      console.log(t, '店铺id');
      this.store_id = t.store_id;
      // 店铺首页接口
      (0, _ajax.ajax)({
        url: api.storeIndex,
        data: {
          store_id: t.store_id
        }
      }).then(function (res) {
        if (res.code == 200) {
          _this2.store_info = res.datas.store_info;
          _this2.rec_goods_list = res.datas.rec_goods_list || [];
          _this2.$apply();
        }
      });

      // 店铺商品分类接口
      (0, _ajax.ajax)({
        url: api.storeGoodsClass,
        data: {
          store_id: t.store_id
        }
      }).then(function (res) {
        if (res.code == 200) {
          _this2.store_goods_class = res.datas.store_goods_class || [];
          res.datas.store_goods_class.forEach(function (item) {
            if (Object.prototype.toString.call(item.sun) == '[object Array]') {
              item.sun.forEach(function (ele) {
                ele.new_name = ele.name.toString().slice(0, 5);
              });
            }
          });
          _this2.$apply();
        }
      });
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/merchantIndex'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lcmNoYW50SW5kZXguanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25TdHlsZSIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwicmVxdWVzdEltZ1VybCIsInN0b3JlX2luZm8iLCJyZWNfZ29vZHNfbGlzdCIsIm5hdklkeCIsInN0b3JlX2dvb2RzX2NsYXNzIiwic3RvcmVfaWQiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJuYXZHb29kc0RldGFpbHMiLCJnb29kc19pZCIsIiRuYXZpZ2F0ZSIsInVybCIsImNoYW5nZU5hdiIsImlkeCIsIm5hdkdvb2RzTGlzdCIsImlkIiwiYmFjayIsInd4IiwibmF2aWdhdGVCYWNrIiwiZXZlbnRzIiwidCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiY29uc29sZSIsImxvZyIsInN0b3JlSW5kZXgiLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwiJGFwcGx5Iiwic3RvcmVHb29kc0NsYXNzIiwiZm9yRWFjaCIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsIml0ZW0iLCJzdW4iLCJlbGUiLCJuZXdfbmFtZSIsIm5hbWUiLCJzbGljZSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBRXFCQyxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsSUFEakI7QUFFUEMsdUJBQWlCOztBQUZWLEssUUFNVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLHFCQUFlLEVBRFY7QUFFTEMsa0JBQVksSUFGUCxFQUVhO0FBQ2xCQyxzQkFBZ0IsRUFIWCxFQUdlO0FBQ3BCQyxjQUFRLENBSkg7QUFLTEMseUJBQW1CLEVBTGQsRUFLa0I7QUFDdkJDLGdCQUFVO0FBTkwsSyxRQVNQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDUkMscUJBRFEsMkJBQ1FDLFFBRFIsRUFDa0I7QUFDeEIsYUFBS0MsU0FBTCxDQUFlLEVBQUVDLCtCQUE2QkYsUUFBL0IsRUFBZjtBQUNELE9BSE87QUFJUkcsZUFKUSxxQkFJRUMsR0FKRixFQUlPO0FBQ2IsWUFBR0EsT0FBTyxLQUFLVixNQUFmLEVBQXVCLE9BQU8sS0FBUDtBQUN2QixhQUFLQSxNQUFMLEdBQWNVLEdBQWQ7QUFDRCxPQVBPO0FBUVJDLGtCQVJRLHdCQVFLQyxFQVJMLEVBUVE7QUFDZCxhQUFLTCxTQUFMLENBQWUsRUFBRUMsd0JBQXNCSSxFQUF0QixrQkFBcUMsS0FBS1YsUUFBNUMsRUFBZjtBQUNELE9BVk87QUFXUlcsVUFYUSxrQkFXRjtBQUNKQyxXQUFHQyxZQUFIO0FBQ0Q7QUFiTyxLLFFBZ0JWQyxNLEdBQVMsRTs7Ozs7NkJBQ0EsQ0FFUjs7OzJCQUVNQyxDLEVBQUc7QUFBQTs7QUFDUixXQUFLcEIsYUFBTCxHQUFxQixLQUFLcUIsT0FBTCxDQUFhQyxVQUFiLENBQXdCdEIsYUFBN0M7QUFDQXVCLGNBQVFDLEdBQVIsQ0FBWUosQ0FBWixFQUFlLE1BQWY7QUFDQSxXQUFLZixRQUFMLEdBQWdCZSxFQUFFZixRQUFsQjtBQUNBO0FBQ0Esc0JBQUs7QUFDSE0sYUFBS3BCLElBQUlrQyxVQUROO0FBRUgxQixjQUFNO0FBQ0pNLG9CQUFVZSxFQUFFZjtBQURSO0FBRkgsT0FBTCxFQUtHcUIsSUFMSCxDQUtRLGVBQU87QUFDYixZQUFHQyxJQUFJQyxJQUFKLElBQVksR0FBZixFQUFvQjtBQUNsQixpQkFBSzNCLFVBQUwsR0FBa0IwQixJQUFJRSxLQUFKLENBQVU1QixVQUE1QjtBQUNBLGlCQUFLQyxjQUFMLEdBQXNCeUIsSUFBSUUsS0FBSixDQUFVM0IsY0FBVixJQUE0QixFQUFsRDtBQUNBLGlCQUFLNEIsTUFBTDtBQUNEO0FBQ0YsT0FYRDs7QUFhQTtBQUNBLHNCQUFLO0FBQ0huQixhQUFLcEIsSUFBSXdDLGVBRE47QUFFSGhDLGNBQU07QUFDSk0sb0JBQVVlLEVBQUVmO0FBRFI7QUFGSCxPQUFMLEVBS0dxQixJQUxILENBS1EsZUFBTztBQUNiLFlBQUdDLElBQUlDLElBQUosSUFBWSxHQUFmLEVBQW9CO0FBQ2xCLGlCQUFLeEIsaUJBQUwsR0FBeUJ1QixJQUFJRSxLQUFKLENBQVV6QixpQkFBVixJQUErQixFQUF4RDtBQUNBdUIsY0FBSUUsS0FBSixDQUFVekIsaUJBQVYsQ0FBNEI0QixPQUE1QixDQUFvQyxnQkFBUTtBQUMxQyxnQkFBSUMsT0FBT0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCQyxLQUFLQyxHQUFwQyxLQUE0QyxnQkFBaEQsRUFBa0U7QUFDaEVELG1CQUFLQyxHQUFMLENBQVNOLE9BQVQsQ0FBaUIsZUFBTztBQUN0Qk8sb0JBQUlDLFFBQUosR0FBZUQsSUFBSUUsSUFBSixDQUFTTixRQUFULEdBQW9CTyxLQUFwQixDQUEwQixDQUExQixFQUE2QixDQUE3QixDQUFmO0FBQ0QsZUFGRDtBQUdEO0FBQ0YsV0FORDtBQU9BLGlCQUFLWixNQUFMO0FBQ0Q7QUFDRixPQWpCRDtBQW1CRDs7OztFQWpGbUNhLGVBQUtDLEk7O2tCQUF0Qm5ELFEiLCJmaWxlIjoibWVyY2hhbnRJbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5oi3JyxcclxuICAgIG5hdmlnYXRpb25TdHlsZTogJ2N1c3RvbSdcclxuXHJcbiAgfTtcclxuXHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgc3RvcmVfaW5mbzogbnVsbCwgLy8g5bqX6ZO65L+h5oGvXHJcbiAgICByZWNfZ29vZHNfbGlzdDogW10sIC8v5ZWG5ZOB5YiX6KGoXHJcbiAgICBuYXZJZHg6IDAsXHJcbiAgICBzdG9yZV9nb29kc19jbGFzczogW10sIC8v5bqX6ZO65YiG57G7XHJcbiAgICBzdG9yZV9pZDogbnVsbFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBuYXZHb29kc0RldGFpbHMoZ29vZHNfaWQpIHtcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBzaG9wRGV0YWlscz9nb29kc19pZD0ke2dvb2RzX2lkfWAgfSk7XHJcbiAgICB9LFxyXG4gICAgY2hhbmdlTmF2KGlkeCkge1xyXG4gICAgICBpZihpZHggPT0gdGhpcy5uYXZJZHgpIHJldHVybiBmYWxzZVxyXG4gICAgICB0aGlzLm5hdklkeCA9IGlkeFxyXG4gICAgfSxcclxuICAgIG5hdkdvb2RzTGlzdChpZCl7XHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgZ29vZHNMaXN0P3NpZD0ke2lkfSZzdG9yZV9pZD0ke3RoaXMuc3RvcmVfaWR9YCB9KTtcclxuICAgIH0sXHJcbiAgICBiYWNrKCl7XHJcbiAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbiAgb25TaG93KCkge1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBvbkxvYWQodCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICAgIGNvbnNvbGUubG9nKHQsICflupfpk7ppZCcpXHJcbiAgICB0aGlzLnN0b3JlX2lkID0gdC5zdG9yZV9pZFxyXG4gICAgLy8g5bqX6ZO66aaW6aG15o6l5Y+jXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuc3RvcmVJbmRleCxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHN0b3JlX2lkOiB0LnN0b3JlX2lkXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZV9pbmZvID0gcmVzLmRhdGFzLnN0b3JlX2luZm9cclxuICAgICAgICB0aGlzLnJlY19nb29kc19saXN0ID0gcmVzLmRhdGFzLnJlY19nb29kc19saXN0IHx8IFtdXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIOW6l+mTuuWVhuWTgeWIhuexu+aOpeWPo1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLnN0b3JlR29vZHNDbGFzcyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHN0b3JlX2lkOiB0LnN0b3JlX2lkXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZV9nb29kc19jbGFzcyA9IHJlcy5kYXRhcy5zdG9yZV9nb29kc19jbGFzcyB8fCBbXVxyXG4gICAgICAgIHJlcy5kYXRhcy5zdG9yZV9nb29kc19jbGFzcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgaWYoIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVtLnN1bikgPT0gJ1tvYmplY3QgQXJyYXldJykge1xyXG4gICAgICAgICAgICBpdGVtLnN1bi5mb3JFYWNoKGVsZSA9PiB7XHJcbiAgICAgICAgICAgICAgZWxlLm5ld19uYW1lID0gZWxlLm5hbWUudG9TdHJpbmcoKS5zbGljZSgwLCA1KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICB9XHJcbn1cclxuIl19