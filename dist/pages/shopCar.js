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
      isAllSelected: false
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BDYXIuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInN3aXBlckRlbCIsImNhcnRDb3VudCIsIm5hdiIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwiYWxsU2VsZWN0ZWQiLCJnb29kc0xpc3QiLCJpc0FsbFNlbGVjdGVkIiwiY29tcHV0ZWQiLCJ0b3RhbFByaWNlIiwidGhhdCIsImdvb2QiLCJzZWxlY3RlZCIsIk51bWJlciIsImdvb2RzX251bSIsImdvb2RzX3ByaWNlIiwidG9GaXhlZCIsImp1ZGdlQWxsU2VsZWN0IiwiZXZlcnkiLCJpdGVtIiwibWV0aG9kcyIsInNlbGVjdExpc3QiLCJpZHgiLCJjdXJJdGVtIiwic2VsZWN0QWxsIiwiZSIsImdldEdvb2QiLCJ0eXBlIiwiZ2V0RGVsIiwiZmluZEluZGV4IiwiZWxlIiwiY2FydF9pZCIsInVybCIsImNhcnREZWwiLCJ0aGVuIiwicmVzIiwiZGF0YXMiLCJzdGF0ZSIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJtc2ciLCJzcGxpY2UiLCIkYXBwbHkiLCJpY29uIiwiZ29QYWdlIiwiZXZ0IiwiJHJlZGlyZWN0IiwiZXZlbnRzIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJyZXF1ZXN0R29vZHNMaXN0IiwiY2FydExpc3QiLCJjb25zb2xlIiwibG9nIiwiY2FydF9saXN0IiwiZm9yRWFjaCIsImNvbmNhdCIsImdvb2RzIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7Ozs7Ozs7Ozs7QUFIb0M7O0FBRXBDLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUdxQkMsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMs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QUNBLFVBQUlNLE9BQU8sSUFBWDs7QUFFQSxXQUFLeUMsZ0JBQUw7QUFDRDs7O3VDQUNtQjtBQUFBOztBQUNsQixzQkFBSztBQUNIbkIsYUFBSzFDLElBQUk4RDtBQUROLE9BQUwsRUFFR2xCLElBRkgsQ0FFUSxlQUFPO0FBQ2JtQixnQkFBUUMsR0FBUixDQUFZbkIsR0FBWjtBQUNBLFlBQUlvQixZQUFZcEIsSUFBSUMsS0FBSixDQUFVbUIsU0FBMUI7QUFDQSxZQUFJakQsWUFBWSxFQUFoQjtBQUNBaUQsa0JBQVVDLE9BQVYsQ0FBa0IsZ0JBQVE7QUFDeEJsRCxzQkFBWUEsVUFBVW1ELE1BQVYsQ0FBaUJ0QyxLQUFLdUMsS0FBdEIsQ0FBWjtBQUNELFNBRkQ7QUFHQSxlQUFLcEQsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxlQUFLcUMsTUFBTDtBQUNELE9BWEQ7QUFZRDs7OzZCQUNRLENBQ1I7Ozs7RUE5R21DZ0IsZUFBS0MsSTs7a0JBQXRCcEUsUSIsImZpbGUiOiJzaG9wQ2FyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBzd2lwZXJEZWwgZnJvbSAnLi4vY29tcG9uZW50cy9zd2lwZXJfZGVsZXRlJyBcclxuaW1wb3J0IGNhcnRDb3VudCBmcm9tICcuLi9jb21wb25lbnRzL2NhcnRfY291bnQnXHJcbmltcG9ydCBuYXYgZnJvbSAnLi4vY29tcG9uZW50cy9uYXYnIC8vIOW6lemDqOWvvOiIqlxyXG5cclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i0reeJqei9pidcclxuICB9O1xyXG5cclxuICRyZXBlYXQgPSB7XCJnb29kc0xpc3RcIjp7XCJjb21cIjpcImNhcnRDb3VudFwiLFwicHJvcHNcIjpcImdvb2Quc3luY1wifX07XHJcbiRwcm9wcyA9IHtcInN3aXBlckRlbFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiZ29vZHNMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaXRlbVwifSxcInYtYmluZDpzd2lwZXJEYXRhLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJnb29kc0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpdGVtXCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiZ29vZHNMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaXRlbVwifX0sXCJjYXJ0Q291bnRcIjp7XCJ2LWJpbmQ6Z29vZC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwiZ29vZHNMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaXRlbVwifX0sXCJuYXZcIjp7XCJjbGFzc1wiOlwibmF2XCJ9fTtcclxuJGV2ZW50cyA9IHtcInN3aXBlckRlbFwiOntcInYtb246Z2V0RGVsXCI6XCJnZXREZWxcIn0sXCJjYXJ0Q291bnRcIjp7XCJ2LW9uOmdldEdvb2RcIjpcImdldEdvb2RcIn0sXCJuYXZcIjp7XCJ2LW9uOmNoaWxkRm5cIjpcImdvUGFnZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgc3dpcGVyRGVsLFxyXG4gICAgY2FydENvdW50LFxyXG4gICAgbmF2XHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGFsbFNlbGVjdGVkOiBmYWxzZSxcclxuICAgIGdvb2RzTGlzdDogW10sXHJcbiAgICBpc0FsbFNlbGVjdGVkOiBmYWxzZVxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge1xyXG4gICAgdG90YWxQcmljZSgpIHsgLy8g5oC75Lu35qC8XHJcbiAgICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gICAgICBsZXQgdG90YWxQcmljZSA9IDBcclxuICAgICAgZm9yIChsZXQgZ29vZCBvZiB0aGF0Lmdvb2RzTGlzdCkge1xyXG4gICAgICAgIGlmIChnb29kLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICB0b3RhbFByaWNlICs9IE51bWJlcihnb29kLmdvb2RzX251bSkgKiBOdW1iZXIoZ29vZC5nb29kc19wcmljZSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRvdGFsUHJpY2UudG9GaXhlZCgyKVxyXG4gICAgfSxcclxuICAgIGp1ZGdlQWxsU2VsZWN0KCkgeyAvL+WIpOaWreWFqOmAiVxyXG4gICAgICBsZXQgaXNBbGxTZWxlY3RlZCA9IHRoaXMuZ29vZHNMaXN0LmV2ZXJ5KChpdGVtKSA9PiB7IC8vIOWPquimgeacieS4gOS4quayoemAieWwseS4umZhbHNlXHJcbiAgICAgICAgcmV0dXJuIGl0ZW0uc2VsZWN0ZWRcclxuICAgICAgfSlcclxuICAgICAgaXNBbGxTZWxlY3RlZCA/ICh0aGlzLmFsbFNlbGVjdGVkID0gdHJ1ZSkgOiAodGhpcy5hbGxTZWxlY3RlZCA9IGZhbHNlKVxyXG4gICAgICByZXR1cm4gaXNBbGxTZWxlY3RlZFxyXG4gICAgfVxyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgc2VsZWN0TGlzdChpZHgpIHsgLy8g5b2T5YmN5Yu+6YCJ6YCJ5LitXHJcbiAgICAgIGxldCBjdXJJdGVtID0gdGhpcy5nb29kc0xpc3RbaWR4XVxyXG4gICAgICBjdXJJdGVtLnNlbGVjdGVkID0gIWN1ckl0ZW0uc2VsZWN0ZWQgLy8g5Y+W5Y+NXHJcbiAgICB9LFxyXG4gICAgc2VsZWN0QWxsKGUpIHsgLy8g5YWo6YCJXHJcbiAgICAgIHRoaXMuYWxsU2VsZWN0ZWQgPSAhdGhpcy5hbGxTZWxlY3RlZCBcclxuICAgICAgZm9yIChsZXQgZ29vZCBvZiB0aGlzLmdvb2RzTGlzdCkgeyAvLyDllYblk4Hmr4/pobnpgInkuK3nmoTlgLzlkozlhajpgInnmoTnirbmgIHlgLzkuIDoh7RcclxuICAgICAgICBnb29kLnNlbGVjdGVkID0gdGhpcy5hbGxTZWxlY3RlZFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0R29vZCAoaXRlbSwgdHlwZSkgeyAvLyDoh6rlrprkuYnkuovku7ZcclxuICAgIFxyXG4gICAgfSxcclxuICAgIGdldERlbChpdGVtKXtcclxuICAgICAgdmFyIGlkeCA9IHRoaXMuZ29vZHNMaXN0LmZpbmRJbmRleCgoZWxlLCBpZHgpID0+IGl0ZW0uY2FydF9pZCA9PSBlbGUuY2FydF9pZClcclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkuY2FydERlbCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBjYXJ0X2lkOiBpdGVtLmNhcnRfaWRcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZihyZXMuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5tc2dcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICB0aGlzLmdvb2RzTGlzdC5zcGxpY2UoaWR4LDEpXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogcmVzLmRhdGFzLm1zZyxcclxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDlupXpg6jlr7zoiKrot7PovaxcclxuICAgICAqL1xyXG4gICAgZ29QYWdlICh1cmwsIGV2dCkge1xyXG4gICAgLy8g6ZSA5q+B5b2T5YmN6aG1e+i3s+i9rH1cclxuICAgICAgdGhpcy4kcmVkaXJlY3QodXJsKVxyXG4gICAgfSxcclxuICB9XHJcblxyXG4gIGV2ZW50cyA9IHt9XHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gIFxyXG4gICAgdGhpcy5yZXF1ZXN0R29vZHNMaXN0KClcclxuICB9XHJcbiAgcmVxdWVzdEdvb2RzTGlzdCAoKSB7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuY2FydExpc3RcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICB2YXIgY2FydF9saXN0ID0gcmVzLmRhdGFzLmNhcnRfbGlzdFxyXG4gICAgICB2YXIgZ29vZHNMaXN0ID0gW11cclxuICAgICAgY2FydF9saXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgZ29vZHNMaXN0ID0gZ29vZHNMaXN0LmNvbmNhdChpdGVtLmdvb2RzKVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmdvb2RzTGlzdCA9IGdvb2RzTGlzdFxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBvblNob3coKSB7XHJcbiAgfVxyXG59XHJcbiJdfQ==