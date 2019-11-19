'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _swiper_delete = require('./../components/swiper_delete.js');

var _swiper_delete2 = _interopRequireDefault(_swiper_delete);

var _cart_count = require('./../components/cart_count.js');

var _cart_count2 = _interopRequireDefault(_cart_count);

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
      navigationBarTitleText: '购物车'
    }, _this.$repeat = { "goodsList": { "com": "cartCount", "props": "good.sync" } }, _this.$props = { "swiperDel": { "xmlns:v-bind": { "value": "", "for": "goodsList", "item": "item", "index": "index", "key": "item" }, "v-bind:swiperData.sync": { "value": "item", "type": "item", "for": "goodsList", "item": "item", "index": "index", "key": "item" }, "xmlns:v-on": { "value": "", "for": "goodsList", "item": "item", "index": "index", "key": "item" } }, "cartCount": { "v-bind:good.sync": { "value": "item", "type": "item", "for": "goodsList", "item": "item", "index": "index", "key": "item" } }, "nav": { "class": "nav" } }, _this.$events = { "swiperDel": { "v-on:getDel": "getDel" }, "cartCount": { "v-on:getGood": "getGood" }, "nav": { "v-on:childFn": "goPage" } }, _this.components = {
      swiperDel: _swiper_delete2.default,
      cartCount: _cart_count2.default,
      nav: _nav2.default
    }, _this.mixins = [], _this.data = {
      requestImgUrl: '',
      allSelected: false,
      goodsList: [],
      isAllSelected: false,
      cart_count: null
    }, _this.computed = {
      totalPrice: function totalPrice() {
        // 总价格
        var that = this;
        var totalPrice = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = that.goodsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var good = _step.value;

            if (good.selected) {
              totalPrice += Number(good.goods_num) * Number(good.goods_price);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return totalPrice.toFixed(2);
      },
      judgeAllSelect: function judgeAllSelect() {
        //判断全选
        var isAllSelected = this.goodsList.every(function (item) {
          // 只要有一个没选就为false
          return item.selected;
        });
        isAllSelected ? this.allSelected = true : this.allSelected = false;
        return isAllSelected;
      }
    }, _this.methods = {
      selectList: function selectList(idx) {
        // 当前勾选选中
        var curItem = this.goodsList[idx];
        curItem.selected = !curItem.selected; // 取反
      },
      selectAll: function selectAll(e) {
        // 全选
        this.allSelected = !this.allSelected;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.goodsList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var good = _step2.value;
            // 商品每项选中的值和全选的状态值一致
            good.selected = this.allSelected;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      },
      getGood: function getGood(item, type) {// 自定义事件

      },
      getDel: function getDel(item) {
        var _this2 = this;

        var idx = this.goodsList.findIndex(function (ele, idx) {
          return item.cart_id == ele.cart_id;
        });
        (0, _ajax.ajax)({
          url: api.cartDel,
          data: {
            cart_id: item.cart_id
          }
        }).then(function (res) {
          if (res.datas.state == 1) {
            wx.showToast({
              title: res.datas.msg
            });
            _this2.goodsList.splice(idx, 1);
            _this2.$apply();
          } else {
            wx.showToast({
              title: res.datas.msg,
              icon: 'none'
            });
          }
        });
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
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      var that = this;

      this.requestGoodsList();
    }
  }, {
    key: 'requestGoodsList',
    value: function requestGoodsList() {
      var _this3 = this;

      (0, _ajax.ajax)({
        url: api.cartList
      }).then(function (res) {
        console.log(res);
        var cart_list = res.datas.cart_list;
        var goodsList = [];
        cart_list.forEach(function (item) {
          goodsList = goodsList.concat(item.goods);
        });
        _this3.goodsList = goodsList;
        _this3.cart_count = res.datas.cart_count;
        _this3.$apply();
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/shopCar'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BDYXIuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInN3aXBlckRlbCIsImNhcnRDb3VudCIsIm5hdiIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwiYWxsU2VsZWN0ZWQiLCJnb29kc0xpc3QiLCJpc0FsbFNlbGVjdGVkIiwiY2FydF9jb3VudCIsImNvbXB1dGVkIiwidG90YWxQcmljZSIsInRoYXQiLCJnb29kIiwic2VsZWN0ZWQiLCJOdW1iZXIiLCJnb29kc19udW0iLCJnb29kc19wcmljZSIsInRvRml4ZWQiLCJqdWRnZUFsbFNlbGVjdCIsImV2ZXJ5IiwiaXRlbSIsIm1ldGhvZHMiLCJzZWxlY3RMaXN0IiwiaWR4IiwiY3VySXRlbSIsInNlbGVjdEFsbCIsImUiLCJnZXRHb29kIiwidHlwZSIsImdldERlbCIsImZpbmRJbmRleCIsImVsZSIsImNhcnRfaWQiLCJ1cmwiLCJjYXJ0RGVsIiwidGhlbiIsInJlcyIsImRhdGFzIiwic3RhdGUiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwibXNnIiwic3BsaWNlIiwiJGFwcGx5IiwiaWNvbiIsImdvUGFnZSIsImV2dCIsIiRyZWRpcmVjdCIsImV2ZW50cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwicmVxdWVzdEdvb2RzTGlzdCIsImNhcnRMaXN0IiwiY29uc29sZSIsImxvZyIsImNhcnRfbGlzdCIsImZvckVhY2giLCJjb25jYXQiLCJnb29kcyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7Ozs7Ozs7O0FBSG9DOztBQUVwQyxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFHcUJDLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMs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QUFMLENBQWFDLFVBQWIsQ0FBd0IvQyxhQUE3QztBQUNBLFVBQUlPLE9BQU8sSUFBWDs7QUFFQSxXQUFLeUMsZ0JBQUw7QUFDRDs7O3VDQUNtQjtBQUFBOztBQUNsQixzQkFBSztBQUNIbkIsYUFBSzNDLElBQUkrRDtBQUROLE9BQUwsRUFFR2xCLElBRkgsQ0FFUSxlQUFPO0FBQ2JtQixnQkFBUUMsR0FBUixDQUFZbkIsR0FBWjtBQUNBLFlBQUlvQixZQUFZcEIsSUFBSUMsS0FBSixDQUFVbUIsU0FBMUI7QUFDQSxZQUFJbEQsWUFBWSxFQUFoQjtBQUNBa0Qsa0JBQVVDLE9BQVYsQ0FBa0IsZ0JBQVE7QUFDeEJuRCxzQkFBWUEsVUFBVW9ELE1BQVYsQ0FBaUJ0QyxLQUFLdUMsS0FBdEIsQ0FBWjtBQUNELFNBRkQ7QUFHQSxlQUFLckQsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxlQUFLRSxVQUFMLEdBQWtCNEIsSUFBSUMsS0FBSixDQUFVN0IsVUFBNUI7QUFDQSxlQUFLb0MsTUFBTDtBQUNELE9BWkQ7QUFhRDs7OzZCQUNRLENBQ1I7Ozs7RUFoSG1DZ0IsZUFBS0MsSTs7a0JBQXRCckUsUSIsImZpbGUiOiJzaG9wQ2FyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBzd2lwZXJEZWwgZnJvbSAnLi4vY29tcG9uZW50cy9zd2lwZXJfZGVsZXRlJyBcclxuaW1wb3J0IGNhcnRDb3VudCBmcm9tICcuLi9jb21wb25lbnRzL2NhcnRfY291bnQnXHJcbmltcG9ydCBuYXYgZnJvbSAnLi4vY29tcG9uZW50cy9uYXYnIC8vIOW6lemDqOWvvOiIqlxyXG5cclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i0reeJqei9pidcclxuICB9O1xyXG5cclxuICRyZXBlYXQgPSB7XCJnb29kc0xpc3RcIjp7XCJjb21cIjpcImNhcnRDb3VudFwiLFwicHJvcHNcIjpcImdvb2Quc3luY1wifX07XHJcbiRwcm9wcyA9IHtcInN3aXBlckRlbFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiZ29vZHNMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaXRlbVwifSxcInYtYmluZDpzd2lwZXJEYXRhLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJnb29kc0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpdGVtXCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiZ29vZHNMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaXRlbVwifX0sXCJjYXJ0Q291bnRcIjp7XCJ2LWJpbmQ6Z29vZC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwiZ29vZHNMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaXRlbVwifX0sXCJuYXZcIjp7XCJjbGFzc1wiOlwibmF2XCJ9fTtcclxuJGV2ZW50cyA9IHtcInN3aXBlckRlbFwiOntcInYtb246Z2V0RGVsXCI6XCJnZXREZWxcIn0sXCJjYXJ0Q291bnRcIjp7XCJ2LW9uOmdldEdvb2RcIjpcImdldEdvb2RcIn0sXCJuYXZcIjp7XCJ2LW9uOmNoaWxkRm5cIjpcImdvUGFnZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgc3dpcGVyRGVsLFxyXG4gICAgY2FydENvdW50LFxyXG4gICAgbmF2XHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGFsbFNlbGVjdGVkOiBmYWxzZSxcclxuICAgIGdvb2RzTGlzdDogW10sXHJcbiAgICBpc0FsbFNlbGVjdGVkOiBmYWxzZSxcclxuICAgIGNhcnRfY291bnQ6IG51bGwsXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7XHJcbiAgICB0b3RhbFByaWNlKCkgeyAvLyDmgLvku7fmoLxcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICAgIGxldCB0b3RhbFByaWNlID0gMFxyXG4gICAgICBmb3IgKGxldCBnb29kIG9mIHRoYXQuZ29vZHNMaXN0KSB7XHJcbiAgICAgICAgaWYgKGdvb2Quc2VsZWN0ZWQpIHtcclxuICAgICAgICAgIHRvdGFsUHJpY2UgKz0gTnVtYmVyKGdvb2QuZ29vZHNfbnVtKSAqIE51bWJlcihnb29kLmdvb2RzX3ByaWNlKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG90YWxQcmljZS50b0ZpeGVkKDIpXHJcbiAgICB9LFxyXG4gICAganVkZ2VBbGxTZWxlY3QoKSB7IC8v5Yik5pat5YWo6YCJXHJcbiAgICAgIGxldCBpc0FsbFNlbGVjdGVkID0gdGhpcy5nb29kc0xpc3QuZXZlcnkoKGl0ZW0pID0+IHsgLy8g5Y+q6KaB5pyJ5LiA5Liq5rKh6YCJ5bCx5Li6ZmFsc2VcclxuICAgICAgICByZXR1cm4gaXRlbS5zZWxlY3RlZFxyXG4gICAgICB9KVxyXG4gICAgICBpc0FsbFNlbGVjdGVkID8gKHRoaXMuYWxsU2VsZWN0ZWQgPSB0cnVlKSA6ICh0aGlzLmFsbFNlbGVjdGVkID0gZmFsc2UpXHJcbiAgICAgIHJldHVybiBpc0FsbFNlbGVjdGVkXHJcbiAgICB9XHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBzZWxlY3RMaXN0KGlkeCkgeyAvLyDlvZPliY3li77pgInpgInkuK1cclxuICAgICAgbGV0IGN1ckl0ZW0gPSB0aGlzLmdvb2RzTGlzdFtpZHhdXHJcbiAgICAgIGN1ckl0ZW0uc2VsZWN0ZWQgPSAhY3VySXRlbS5zZWxlY3RlZCAvLyDlj5blj41cclxuICAgIH0sXHJcbiAgICBzZWxlY3RBbGwoZSkgeyAvLyDlhajpgIlcclxuICAgICAgdGhpcy5hbGxTZWxlY3RlZCA9ICF0aGlzLmFsbFNlbGVjdGVkIFxyXG4gICAgICBmb3IgKGxldCBnb29kIG9mIHRoaXMuZ29vZHNMaXN0KSB7IC8vIOWVhuWTgeavj+mhuemAieS4reeahOWAvOWSjOWFqOmAieeahOeKtuaAgeWAvOS4gOiHtFxyXG4gICAgICAgIGdvb2Quc2VsZWN0ZWQgPSB0aGlzLmFsbFNlbGVjdGVkXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRHb29kIChpdGVtLCB0eXBlKSB7IC8vIOiHquWumuS5ieS6i+S7tlxyXG4gICAgXHJcbiAgICB9LFxyXG4gICAgZ2V0RGVsKGl0ZW0pe1xyXG4gICAgICB2YXIgaWR4ID0gdGhpcy5nb29kc0xpc3QuZmluZEluZGV4KChlbGUsIGlkeCkgPT4gaXRlbS5jYXJ0X2lkID09IGVsZS5jYXJ0X2lkKVxyXG4gICAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5jYXJ0RGVsLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGNhcnRfaWQ6IGl0ZW0uY2FydF9pZFxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmKHJlcy5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogcmVzLmRhdGFzLm1zZ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHRoaXMuZ29vZHNMaXN0LnNwbGljZShpZHgsMSlcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMubXNnLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOW6lemDqOWvvOiIqui3s+i9rFxyXG4gICAgICovXHJcbiAgICBnb1BhZ2UgKHVybCwgZXZ0KSB7XHJcbiAgICAvLyDplIDmr4HlvZPliY3pobV76Lez6L2sfVxyXG4gICAgICB0aGlzLiRyZWRpcmVjdCh1cmwpXHJcbiAgICB9LFxyXG4gIH1cclxuXHJcbiAgZXZlbnRzID0ge31cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgXHJcbiAgICB0aGlzLnJlcXVlc3RHb29kc0xpc3QoKVxyXG4gIH1cclxuICByZXF1ZXN0R29vZHNMaXN0ICgpIHtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5jYXJ0TGlzdFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIHZhciBjYXJ0X2xpc3QgPSByZXMuZGF0YXMuY2FydF9saXN0XHJcbiAgICAgIHZhciBnb29kc0xpc3QgPSBbXVxyXG4gICAgICBjYXJ0X2xpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBnb29kc0xpc3QgPSBnb29kc0xpc3QuY29uY2F0KGl0ZW0uZ29vZHMpXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuZ29vZHNMaXN0ID0gZ29vZHNMaXN0XHJcbiAgICAgIHRoaXMuY2FydF9jb3VudCA9IHJlcy5kYXRhcy5jYXJ0X2NvdW50XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIG9uU2hvdygpIHtcclxuICB9XHJcbn1cclxuIl19