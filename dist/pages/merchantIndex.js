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
      store_goods_class: [] //店铺分类
    }, _this.computed = {}, _this.methods = {
      navGoodsDetails: function navGoodsDetails(goods_id) {
        this.$navigate({ url: 'shopDetails?goods_id=' + goods_id });
      },
      changeNav: function changeNav(idx) {
        if (idx == this.navIdx) return false;
        this.navIdx = idx;
      },
      navGoodsList: function navGoodsList() {
        this.$navigate({ url: 'goodsList' });
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
      // 店铺首页接口
      (0, _ajax.ajax)({
        url: api.storeIndex,
        data: {
          store_id: t.store_id
        }
      }).then(function (res) {
        if (res.code == 200) {
          console.log(res.datas);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lcmNoYW50SW5kZXguanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25TdHlsZSIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwicmVxdWVzdEltZ1VybCIsInN0b3JlX2luZm8iLCJyZWNfZ29vZHNfbGlzdCIsIm5hdklkeCIsInN0b3JlX2dvb2RzX2NsYXNzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibmF2R29vZHNEZXRhaWxzIiwiZ29vZHNfaWQiLCIkbmF2aWdhdGUiLCJ1cmwiLCJjaGFuZ2VOYXYiLCJpZHgiLCJuYXZHb29kc0xpc3QiLCJiYWNrIiwid3giLCJuYXZpZ2F0ZUJhY2siLCJldmVudHMiLCJ0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjb25zb2xlIiwibG9nIiwic3RvcmVJbmRleCIsInN0b3JlX2lkIiwidGhlbiIsInJlcyIsImNvZGUiLCJkYXRhcyIsIiRhcHBseSIsInN0b3JlR29vZHNDbGFzcyIsImZvckVhY2giLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJpdGVtIiwic3VuIiwiZWxlIiwibmV3X25hbWUiLCJuYW1lIiwic2xpY2UiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUVxQkMsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLElBRGpCO0FBRVBDLHVCQUFpQjs7QUFGVixLLFFBTVRDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxxQkFBZSxFQURWO0FBRUxDLGtCQUFZLElBRlAsRUFFYTtBQUNsQkMsc0JBQWdCLEVBSFgsRUFHZTtBQUNwQkMsY0FBUSxDQUpIO0FBS0xDLHlCQUFtQixFQUxkLENBS2lCO0FBTGpCLEssUUFRUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ1JDLHFCQURRLDJCQUNRQyxRQURSLEVBQ2tCO0FBQ3hCLGFBQUtDLFNBQUwsQ0FBZSxFQUFFQywrQkFBNkJGLFFBQS9CLEVBQWY7QUFDRCxPQUhPO0FBSVJHLGVBSlEscUJBSUVDLEdBSkYsRUFJTztBQUNiLFlBQUdBLE9BQU8sS0FBS1QsTUFBZixFQUF1QixPQUFPLEtBQVA7QUFDdkIsYUFBS0EsTUFBTCxHQUFjUyxHQUFkO0FBQ0QsT0FQTztBQVFSQyxrQkFSUSwwQkFRTTtBQUNaLGFBQUtKLFNBQUwsQ0FBZSxFQUFFQyxnQkFBRixFQUFmO0FBQ0QsT0FWTztBQVdSSSxVQVhRLGtCQVdGO0FBQ0pDLFdBQUdDLFlBQUg7QUFDRDtBQWJPLEssUUFnQlZDLE0sR0FBUyxFOzs7Ozs2QkFDQSxDQUVSOzs7MkJBRU1DLEMsRUFBRztBQUFBOztBQUNSLFdBQUtsQixhQUFMLEdBQXFCLEtBQUttQixPQUFMLENBQWFDLFVBQWIsQ0FBd0JwQixhQUE3Qzs7QUFFQXFCLGNBQVFDLEdBQVIsQ0FBWUosQ0FBWixFQUFlLE1BQWY7QUFDQTtBQUNBLHNCQUFLO0FBQ0hSLGFBQUtuQixJQUFJZ0MsVUFETjtBQUVIeEIsY0FBTTtBQUNKeUIsb0JBQVVOLEVBQUVNO0FBRFI7QUFGSCxPQUFMLEVBS0dDLElBTEgsQ0FLUSxlQUFPO0FBQ2IsWUFBR0MsSUFBSUMsSUFBSixJQUFZLEdBQWYsRUFBb0I7QUFDbEJOLGtCQUFRQyxHQUFSLENBQVlJLElBQUlFLEtBQWhCO0FBQ0EsaUJBQUszQixVQUFMLEdBQWtCeUIsSUFBSUUsS0FBSixDQUFVM0IsVUFBNUI7QUFDQSxpQkFBS0MsY0FBTCxHQUFzQndCLElBQUlFLEtBQUosQ0FBVTFCLGNBQVYsSUFBNEIsRUFBbEQ7QUFDQSxpQkFBSzJCLE1BQUw7QUFDRDtBQUNGLE9BWkQ7O0FBY0E7QUFDQSxzQkFBSztBQUNIbkIsYUFBS25CLElBQUl1QyxlQUROO0FBRUgvQixjQUFNO0FBQ0p5QixvQkFBVU4sRUFBRU07QUFEUjtBQUZILE9BQUwsRUFLR0MsSUFMSCxDQUtRLGVBQU87QUFDYixZQUFHQyxJQUFJQyxJQUFKLElBQVksR0FBZixFQUFvQjtBQUNsQixpQkFBS3ZCLGlCQUFMLEdBQXlCc0IsSUFBSUUsS0FBSixDQUFVeEIsaUJBQVYsSUFBK0IsRUFBeEQ7QUFDQXNCLGNBQUlFLEtBQUosQ0FBVXhCLGlCQUFWLENBQTRCMkIsT0FBNUIsQ0FBb0MsZ0JBQVE7QUFDMUMsZ0JBQUlDLE9BQU9DLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCQyxJQUExQixDQUErQkMsS0FBS0MsR0FBcEMsS0FBNEMsZ0JBQWhELEVBQWtFO0FBQ2hFRCxtQkFBS0MsR0FBTCxDQUFTTixPQUFULENBQWlCLGVBQU87QUFDdEJPLG9CQUFJQyxRQUFKLEdBQWVELElBQUlFLElBQUosQ0FBU04sUUFBVCxHQUFvQk8sS0FBcEIsQ0FBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsQ0FBZjtBQUNELGVBRkQ7QUFHRDtBQUNGLFdBTkQ7QUFPQSxpQkFBS1osTUFBTDtBQUNEO0FBQ0YsT0FqQkQ7QUFtQkQ7Ozs7RUFqRm1DYSxlQUFLQyxJOztrQkFBdEJsRCxRIiwiZmlsZSI6Im1lcmNoYW50SW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuaItycsXHJcbiAgICBuYXZpZ2F0aW9uU3R5bGU6ICdjdXN0b20nXHJcblxyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIHN0b3JlX2luZm86IG51bGwsIC8vIOW6l+mTuuS/oeaBr1xyXG4gICAgcmVjX2dvb2RzX2xpc3Q6IFtdLCAvL+WVhuWTgeWIl+ihqFxyXG4gICAgbmF2SWR4OiAwLFxyXG4gICAgc3RvcmVfZ29vZHNfY2xhc3M6IFtdIC8v5bqX6ZO65YiG57G7XHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIG5hdkdvb2RzRGV0YWlscyhnb29kc19pZCkge1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYHNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCB9KTtcclxuICAgIH0sXHJcbiAgICBjaGFuZ2VOYXYoaWR4KSB7XHJcbiAgICAgIGlmKGlkeCA9PSB0aGlzLm5hdklkeCkgcmV0dXJuIGZhbHNlXHJcbiAgICAgIHRoaXMubmF2SWR4ID0gaWR4XHJcbiAgICB9LFxyXG4gICAgbmF2R29vZHNMaXN0KCl7XHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgZ29vZHNMaXN0YCB9KTtcclxuICAgIH0sXHJcbiAgICBiYWNrKCl7XHJcbiAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbiAgb25TaG93KCkge1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBvbkxvYWQodCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuXHJcbiAgICBjb25zb2xlLmxvZyh0LCAn5bqX6ZO6aWQnKVxyXG4gICAgLy8g5bqX6ZO66aaW6aG15o6l5Y+jXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuc3RvcmVJbmRleCxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHN0b3JlX2lkOiB0LnN0b3JlX2lkXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGFzKVxyXG4gICAgICAgIHRoaXMuc3RvcmVfaW5mbyA9IHJlcy5kYXRhcy5zdG9yZV9pbmZvXHJcbiAgICAgICAgdGhpcy5yZWNfZ29vZHNfbGlzdCA9IHJlcy5kYXRhcy5yZWNfZ29vZHNfbGlzdCB8fCBbXVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyDlupfpk7rllYblk4HliIbnsbvmjqXlj6NcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5zdG9yZUdvb2RzQ2xhc3MsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBzdG9yZV9pZDogdC5zdG9yZV9pZFxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmVfZ29vZHNfY2xhc3MgPSByZXMuZGF0YXMuc3RvcmVfZ29vZHNfY2xhc3MgfHwgW11cclxuICAgICAgICByZXMuZGF0YXMuc3RvcmVfZ29vZHNfY2xhc3MuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgIGlmKCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlbS5zdW4pID09ICdbb2JqZWN0IEFycmF5XScpIHtcclxuICAgICAgICAgICAgaXRlbS5zdW4uZm9yRWFjaChlbGUgPT4ge1xyXG4gICAgICAgICAgICAgIGVsZS5uZXdfbmFtZSA9IGVsZS5uYW1lLnRvU3RyaW5nKCkuc2xpY2UoMCwgNSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG59XHJcbiJdfQ==