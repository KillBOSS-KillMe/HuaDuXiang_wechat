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
      getGood: function getGood(item) {// 自定义事件
        // console.log(this.goods)
      },
      getDel: function getDel(item) {
        var idx = this.goodsList.findIndex(function (ele, idx) {
          return item.cart_id == ele.cart_id;
        });
        this.goodsList.splice(idx, 1);
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
      var _this2 = this;

      (0, _ajax.ajax)({
        url: api.cartList
      }).then(function (res) {
        console.log(res);
        var cart_list = res.datas.cart_list;
        var goodsList = [];
        cart_list.forEach(function (item) {
          goodsList = goodsList.concat(item.goods);
        });
        _this2.goodsList = goodsList;
        _this2.$apply();
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/shopCar'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BDYXIuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInN3aXBlckRlbCIsImNhcnRDb3VudCIsIm5hdiIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwiYWxsU2VsZWN0ZWQiLCJnb29kc0xpc3QiLCJpc0FsbFNlbGVjdGVkIiwiY29tcHV0ZWQiLCJ0b3RhbFByaWNlIiwidGhhdCIsImdvb2QiLCJzZWxlY3RlZCIsIk51bWJlciIsImdvb2RzX251bSIsImdvb2RzX3ByaWNlIiwidG9GaXhlZCIsImp1ZGdlQWxsU2VsZWN0IiwiZXZlcnkiLCJpdGVtIiwibWV0aG9kcyIsInNlbGVjdExpc3QiLCJpZHgiLCJjdXJJdGVtIiwic2VsZWN0QWxsIiwiZSIsImdldEdvb2QiLCJnZXREZWwiLCJmaW5kSW5kZXgiLCJlbGUiLCJjYXJ0X2lkIiwic3BsaWNlIiwiZ29QYWdlIiwidXJsIiwiZXZ0IiwiJHJlZGlyZWN0IiwiZXZlbnRzIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJyZXF1ZXN0R29vZHNMaXN0IiwiY2FydExpc3QiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsInJlcyIsImNhcnRfbGlzdCIsImRhdGFzIiwiZm9yRWFjaCIsImNvbmNhdCIsImdvb2RzIiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7Ozs7Ozs7Ozs7QUFIb0M7O0FBRXBDLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUdxQkMsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVkMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLE9BQU0sV0FBUCxFQUFtQixTQUFR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YXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHN3aXBlckRlbCBmcm9tICcuLi9jb21wb25lbnRzL3N3aXBlcl9kZWxldGUnIFxyXG5pbXBvcnQgY2FydENvdW50IGZyb20gJy4uL2NvbXBvbmVudHMvY2FydF9jb3VudCdcclxuaW1wb3J0IG5hdiBmcm9tICcuLi9jb21wb25lbnRzL25hdicgLy8g5bqV6YOo5a+86IiqXHJcblxyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSt54mp6L2mJ1xyXG4gIH07XHJcblxyXG4gJHJlcGVhdCA9IHtcImdvb2RzTGlzdFwiOntcImNvbVwiOlwiY2FydENvdW50XCIsXCJwcm9wc1wiOlwiZ29vZC5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wic3dpcGVyRGVsXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJnb29kc0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpdGVtXCJ9LFwidi1iaW5kOnN3aXBlckRhdGEuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImdvb2RzTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcIml0ZW1cIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJnb29kc0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpdGVtXCJ9fSxcImNhcnRDb3VudFwiOntcInYtYmluZDpnb29kLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJnb29kc0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpdGVtXCJ9fSxcIm5hdlwiOntcImNsYXNzXCI6XCJuYXZcIn19O1xyXG4kZXZlbnRzID0ge1wic3dpcGVyRGVsXCI6e1widi1vbjpnZXREZWxcIjpcImdldERlbFwifSxcImNhcnRDb3VudFwiOntcInYtb246Z2V0R29vZFwiOlwiZ2V0R29vZFwifSxcIm5hdlwiOntcInYtb246Y2hpbGRGblwiOlwiZ29QYWdlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBzd2lwZXJEZWwsXHJcbiAgICBjYXJ0Q291bnQsXHJcbiAgICBuYXZcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgYWxsU2VsZWN0ZWQ6IGZhbHNlLFxyXG4gICAgZ29vZHNMaXN0OiBbXSxcclxuICAgIGlzQWxsU2VsZWN0ZWQ6IGZhbHNlXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7XHJcbiAgICB0b3RhbFByaWNlKCkgeyAvLyDmgLvku7fmoLxcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICAgIGxldCB0b3RhbFByaWNlID0gMFxyXG4gICAgICBmb3IgKGxldCBnb29kIG9mIHRoYXQuZ29vZHNMaXN0KSB7XHJcbiAgICAgICAgaWYgKGdvb2Quc2VsZWN0ZWQpIHtcclxuICAgICAgICAgIHRvdGFsUHJpY2UgKz0gTnVtYmVyKGdvb2QuZ29vZHNfbnVtKSAqIE51bWJlcihnb29kLmdvb2RzX3ByaWNlKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG90YWxQcmljZS50b0ZpeGVkKDIpXHJcbiAgICB9LFxyXG4gICAganVkZ2VBbGxTZWxlY3QoKSB7IC8v5Yik5pat5YWo6YCJXHJcbiAgICAgIGxldCBpc0FsbFNlbGVjdGVkID0gdGhpcy5nb29kc0xpc3QuZXZlcnkoKGl0ZW0pID0+IHsgLy8g5Y+q6KaB5pyJ5LiA5Liq5rKh6YCJ5bCx5Li6ZmFsc2VcclxuICAgICAgICByZXR1cm4gaXRlbS5zZWxlY3RlZFxyXG4gICAgICB9KVxyXG4gICAgICBpc0FsbFNlbGVjdGVkID8gKHRoaXMuYWxsU2VsZWN0ZWQgPSB0cnVlKSA6ICh0aGlzLmFsbFNlbGVjdGVkID0gZmFsc2UpXHJcbiAgICAgIHJldHVybiBpc0FsbFNlbGVjdGVkXHJcbiAgICB9XHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBzZWxlY3RMaXN0KGlkeCkgeyAvLyDlvZPliY3li77pgInpgInkuK1cclxuICAgICAgbGV0IGN1ckl0ZW0gPSB0aGlzLmdvb2RzTGlzdFtpZHhdXHJcbiAgICAgIGN1ckl0ZW0uc2VsZWN0ZWQgPSAhY3VySXRlbS5zZWxlY3RlZCAvLyDlj5blj41cclxuICAgIH0sXHJcbiAgICBzZWxlY3RBbGwoZSkgeyAvLyDlhajpgIlcclxuICAgICAgdGhpcy5hbGxTZWxlY3RlZCA9ICF0aGlzLmFsbFNlbGVjdGVkIFxyXG4gICAgICBmb3IgKGxldCBnb29kIG9mIHRoaXMuZ29vZHNMaXN0KSB7IC8vIOWVhuWTgeavj+mhuemAieS4reeahOWAvOWSjOWFqOmAieeahOeKtuaAgeWAvOS4gOiHtFxyXG4gICAgICAgIGdvb2Quc2VsZWN0ZWQgPSB0aGlzLmFsbFNlbGVjdGVkXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRHb29kIChpdGVtKSB7IC8vIOiHquWumuS5ieS6i+S7tlxyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmdvb2RzKVxyXG4gICAgfSxcclxuICAgIGdldERlbChpdGVtKXtcclxuICAgICAgdmFyIGlkeCA9IHRoaXMuZ29vZHNMaXN0LmZpbmRJbmRleCgoZWxlLCBpZHgpID0+IGl0ZW0uY2FydF9pZCA9PSBlbGUuY2FydF9pZClcclxuICAgICAgdGhpcy5nb29kc0xpc3Quc3BsaWNlKGlkeCwxKVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog5bqV6YOo5a+86Iiq6Lez6L2sXHJcbiAgICAgKi9cclxuICAgIGdvUGFnZSAodXJsLCBldnQpIHtcclxuICAgIC8vIOmUgOavgeW9k+WJjemhtXvot7Povax9XHJcbiAgICAgIHRoaXMuJHJlZGlyZWN0KHVybClcclxuICAgIH0sXHJcbiAgfVxyXG5cclxuICBldmVudHMgPSB7fVxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXNcclxuICBcclxuICAgIHRoaXMucmVxdWVzdEdvb2RzTGlzdCgpXHJcbiAgfVxyXG4gIHJlcXVlc3RHb29kc0xpc3QgKCkge1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmNhcnRMaXN0XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgdmFyIGNhcnRfbGlzdCA9IHJlcy5kYXRhcy5jYXJ0X2xpc3RcclxuICAgICAgdmFyIGdvb2RzTGlzdCA9IFtdXHJcbiAgICAgIGNhcnRfbGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGdvb2RzTGlzdCA9IGdvb2RzTGlzdC5jb25jYXQoaXRlbS5nb29kcylcclxuICAgICAgfSlcclxuICAgICAgdGhpcy5nb29kc0xpc3QgPSBnb29kc0xpc3RcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgb25TaG93KCkge1xyXG4gIH1cclxufVxyXG4iXX0=