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
      navGoodsDetails: function navGoodsDetails(goods_id, sale_type) {
        //common普通，rushsale秒杀，group团购，advsales预售，freesales砍价
        if (sale_type == 'rushsales') {
          this.$navigate('/pages/seckillShopDetails?goods_id=' + goods_id);
        } else {
          this.$navigate('/pages/shopDetails?goods_id=' + goods_id);
        }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lcmNoYW50SW5kZXguanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25TdHlsZSIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwicmVxdWVzdEltZ1VybCIsInN0b3JlX2luZm8iLCJyZWNfZ29vZHNfbGlzdCIsIm5hdklkeCIsInN0b3JlX2dvb2RzX2NsYXNzIiwic3RvcmVfaWQiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJuYXZHb29kc0RldGFpbHMiLCJnb29kc19pZCIsInNhbGVfdHlwZSIsIiRuYXZpZ2F0ZSIsImNoYW5nZU5hdiIsImlkeCIsIm5hdkdvb2RzTGlzdCIsImlkIiwidXJsIiwiYmFjayIsInd4IiwibmF2aWdhdGVCYWNrIiwiZXZlbnRzIiwidCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiY29uc29sZSIsImxvZyIsInN0b3JlSW5kZXgiLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwiJGFwcGx5Iiwic3RvcmVHb29kc0NsYXNzIiwiZm9yRWFjaCIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsIml0ZW0iLCJzdW4iLCJlbGUiLCJuZXdfbmFtZSIsIm5hbWUiLCJzbGljZSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBRXFCQyxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsSUFEakI7QUFFUEMsdUJBQWlCOztBQUZWLEssUUFNVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLHFCQUFlLEVBRFY7QUFFTEMsa0JBQVksSUFGUCxFQUVhO0FBQ2xCQyxzQkFBZ0IsRUFIWCxFQUdlO0FBQ3BCQyxjQUFRLENBSkg7QUFLTEMseUJBQW1CLEVBTGQsRUFLa0I7QUFDdkJDLGdCQUFVO0FBTkwsSyxRQVNQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDUkMscUJBRFEsMkJBQ1FDLFFBRFIsRUFDa0JDLFNBRGxCLEVBQzZCO0FBQ25DO0FBQ0EsWUFBR0EsYUFBYSxXQUFoQixFQUE2QjtBQUMzQixlQUFLQyxTQUFMLHlDQUFxREYsUUFBckQ7QUFDRCxTQUZELE1BRU87QUFDTCxlQUFLRSxTQUFMLGtDQUE4Q0YsUUFBOUM7QUFDRDtBQUNGLE9BUk87QUFTUkcsZUFUUSxxQkFTRUMsR0FURixFQVNPO0FBQ2IsWUFBR0EsT0FBTyxLQUFLVixNQUFmLEVBQXVCLE9BQU8sS0FBUDtBQUN2QixhQUFLQSxNQUFMLEdBQWNVLEdBQWQ7QUFDRCxPQVpPO0FBYVJDLGtCQWJRLHdCQWFLQyxFQWJMLEVBYVE7QUFDZCxhQUFLSixTQUFMLENBQWUsRUFBRUssd0JBQXNCRCxFQUF0QixrQkFBcUMsS0FBS1YsUUFBNUMsRUFBZjtBQUNELE9BZk87QUFnQlJZLFVBaEJRLGtCQWdCRjtBQUNKQyxXQUFHQyxZQUFIO0FBQ0Q7QUFsQk8sSyxRQXFCVkMsTSxHQUFTLEU7Ozs7OzZCQUNBLENBRVI7OzsyQkFFTUMsQyxFQUFHO0FBQUE7O0FBQ1IsV0FBS3JCLGFBQUwsR0FBcUIsS0FBS3NCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QnZCLGFBQTdDO0FBQ0F3QixjQUFRQyxHQUFSLENBQVlKLENBQVosRUFBZSxNQUFmO0FBQ0EsV0FBS2hCLFFBQUwsR0FBZ0JnQixFQUFFaEIsUUFBbEI7QUFDQTtBQUNBLHNCQUFLO0FBQ0hXLGFBQUt6QixJQUFJbUMsVUFETjtBQUVIM0IsY0FBTTtBQUNKTSxvQkFBVWdCLEVBQUVoQjtBQURSO0FBRkgsT0FBTCxFQUtHc0IsSUFMSCxDQUtRLGVBQU87QUFDYixZQUFHQyxJQUFJQyxJQUFKLElBQVksR0FBZixFQUFvQjtBQUNsQixpQkFBSzVCLFVBQUwsR0FBa0IyQixJQUFJRSxLQUFKLENBQVU3QixVQUE1QjtBQUNBLGlCQUFLQyxjQUFMLEdBQXNCMEIsSUFBSUUsS0FBSixDQUFVNUIsY0FBVixJQUE0QixFQUFsRDtBQUNBLGlCQUFLNkIsTUFBTDtBQUNEO0FBQ0YsT0FYRDs7QUFhQTtBQUNBLHNCQUFLO0FBQ0hmLGFBQUt6QixJQUFJeUMsZUFETjtBQUVIakMsY0FBTTtBQUNKTSxvQkFBVWdCLEVBQUVoQjtBQURSO0FBRkgsT0FBTCxFQUtHc0IsSUFMSCxDQUtRLGVBQU87QUFDYixZQUFHQyxJQUFJQyxJQUFKLElBQVksR0FBZixFQUFvQjtBQUNsQixpQkFBS3pCLGlCQUFMLEdBQXlCd0IsSUFBSUUsS0FBSixDQUFVMUIsaUJBQVYsSUFBK0IsRUFBeEQ7QUFDQXdCLGNBQUlFLEtBQUosQ0FBVTFCLGlCQUFWLENBQTRCNkIsT0FBNUIsQ0FBb0MsZ0JBQVE7QUFDMUMsZ0JBQUlDLE9BQU9DLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCQyxJQUExQixDQUErQkMsS0FBS0MsR0FBcEMsS0FBNEMsZ0JBQWhELEVBQWtFO0FBQ2hFRCxtQkFBS0MsR0FBTCxDQUFTTixPQUFULENBQWlCLGVBQU87QUFDdEJPLG9CQUFJQyxRQUFKLEdBQWVELElBQUlFLElBQUosQ0FBU04sUUFBVCxHQUFvQk8sS0FBcEIsQ0FBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsQ0FBZjtBQUNELGVBRkQ7QUFHRDtBQUNGLFdBTkQ7QUFPQSxpQkFBS1osTUFBTDtBQUNEO0FBQ0YsT0FqQkQ7QUFtQkQ7Ozs7RUF0Rm1DYSxlQUFLQyxJOztrQkFBdEJwRCxRIiwiZmlsZSI6Im1lcmNoYW50SW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuaItycsXHJcbiAgICBuYXZpZ2F0aW9uU3R5bGU6ICdjdXN0b20nXHJcblxyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIHN0b3JlX2luZm86IG51bGwsIC8vIOW6l+mTuuS/oeaBr1xyXG4gICAgcmVjX2dvb2RzX2xpc3Q6IFtdLCAvL+WVhuWTgeWIl+ihqFxyXG4gICAgbmF2SWR4OiAwLFxyXG4gICAgc3RvcmVfZ29vZHNfY2xhc3M6IFtdLCAvL+W6l+mTuuWIhuexu1xyXG4gICAgc3RvcmVfaWQ6IG51bGxcclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgbmF2R29vZHNEZXRhaWxzKGdvb2RzX2lkLCBzYWxlX3R5cGUpIHtcclxuICAgICAgLy9jb21tb27mma7pgJrvvIxydXNoc2FsZeenkuadgO+8jGdyb3Vw5Zui6LSt77yMYWR2c2FsZXPpooTllK7vvIxmcmVlc2FsZXPnoI3ku7dcclxuICAgICAgaWYoc2FsZV90eXBlID09ICdydXNoc2FsZXMnKSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoYC9wYWdlcy9zZWNraWxsU2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZShgL3BhZ2VzL3Nob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjaGFuZ2VOYXYoaWR4KSB7XHJcbiAgICAgIGlmKGlkeCA9PSB0aGlzLm5hdklkeCkgcmV0dXJuIGZhbHNlXHJcbiAgICAgIHRoaXMubmF2SWR4ID0gaWR4XHJcbiAgICB9LFxyXG4gICAgbmF2R29vZHNMaXN0KGlkKXtcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBnb29kc0xpc3Q/c2lkPSR7aWR9JnN0b3JlX2lkPSR7dGhpcy5zdG9yZV9pZH1gIH0pO1xyXG4gICAgfSxcclxuICAgIGJhY2soKXtcclxuICAgICAgd3gubmF2aWdhdGVCYWNrKClcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvblNob3coKSB7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIG9uTG9hZCh0KSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgY29uc29sZS5sb2codCwgJ+W6l+mTumlkJylcclxuICAgIHRoaXMuc3RvcmVfaWQgPSB0LnN0b3JlX2lkXHJcbiAgICAvLyDlupfpk7rpppbpobXmjqXlj6NcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5zdG9yZUluZGV4LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc3RvcmVfaWQ6IHQuc3RvcmVfaWRcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLnN0b3JlX2luZm8gPSByZXMuZGF0YXMuc3RvcmVfaW5mb1xyXG4gICAgICAgIHRoaXMucmVjX2dvb2RzX2xpc3QgPSByZXMuZGF0YXMucmVjX2dvb2RzX2xpc3QgfHwgW11cclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgLy8g5bqX6ZO65ZWG5ZOB5YiG57G75o6l5Y+jXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuc3RvcmVHb29kc0NsYXNzLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc3RvcmVfaWQ6IHQuc3RvcmVfaWRcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLnN0b3JlX2dvb2RzX2NsYXNzID0gcmVzLmRhdGFzLnN0b3JlX2dvb2RzX2NsYXNzIHx8IFtdXHJcbiAgICAgICAgcmVzLmRhdGFzLnN0b3JlX2dvb2RzX2NsYXNzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICBpZiggT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZW0uc3VuKSA9PSAnW29iamVjdCBBcnJheV0nKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uc3VuLmZvckVhY2goZWxlID0+IHtcclxuICAgICAgICAgICAgICBlbGUubmV3X25hbWUgPSBlbGUubmFtZS50b1N0cmluZygpLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gIH1cclxufVxyXG4iXX0=