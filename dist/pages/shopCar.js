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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 底部导航

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
    }, _this.$repeat = { "goods": { "com": "cartCount", "props": "good.sync" } }, _this.$props = { "swiperDel": { "xmlns:v-bind": { "value": "", "for": "goods", "item": "item", "index": "index", "key": "item" }, "v-bind:swiperData.sync": { "value": "item", "type": "item", "for": "goods", "item": "item", "index": "index", "key": "item" }, "xmlns:v-on": { "value": "", "for": "goods", "item": "item", "index": "index", "key": "item" } }, "cartCount": { "v-bind:good.sync": { "value": "item", "type": "item", "for": "goods", "item": "item", "index": "index", "key": "item" } }, "nav": { "class": "nav" } }, _this.$events = { "swiperDel": { "v-on:getDel": "getDel" }, "cartCount": { "v-on:getGood": "getGood" }, "nav": { "v-on:childFn": "goPage" } }, _this.components = {
      swiperDel: _swiper_delete2.default,
      cartCount: _cart_count2.default,
      nav: _nav2.default
    }, _this.mixins = [], _this.data = {
      requestImgUrl: '',
      allSelected: false,
      goods: [{
        id: 1,
        name: '新款冬季棉拖鞋',
        price: 5,
        num: 1,
        tag: '肤色/M',
        imgurl: ''
      }, {
        id: 2,
        name: '萌粉订书机 小型',
        price: 10,
        num: 1,
        tag: '肤色/M',
        imgurl: ''
      }, {
        id: 3,
        name: '创意家居卫生间用品卫生间用品卫生间用品卫生间用品',
        price: 20,
        num: 5,
        tag: '肤色/M',
        imgurl: ''
      }]
    }, _this.computed = {
      totalPrice: function totalPrice() {
        // 总价格
        var that = this;
        var totalPrice = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = that.goods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var good = _step.value;

            if (good.selected) {
              totalPrice += good.num * good.price;
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

        return totalPrice;
      },
      judgeAllSelect: function judgeAllSelect() {
        //判断全选
        var that = this;
        var isAllSelected = that.goods.every(function (item) {
          // 只要有一个没选就为false
          return item.selected;
        });
        isAllSelected ? that.allSelected = true : that.allSelected = false;
        return isAllSelected;
      }
    }, _this.methods = {
      selectList: function selectList(e) {
        // 当前勾选选中
        var that = this;
        var curIndex = e.target.dataset.index; // 获取当前索
        var curItem = that.goods[curIndex];
        curItem.selected = !curItem.selected; // 取反
      },
      selectAll: function selectAll(e) {
        // 全选
        var that = this;
        that.allSelected = !that.allSelected;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = that.goods[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var good = _step2.value;
            // 商品每项选中的值和全选的状态值一致
            good.selected = that.allSelected;
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
        var that = this;
        that.goods.splice(item, 1);
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
      var that = this;
      that.goods.forEach(function (good) {
        // 刚开始默认都是未选中状态
        good.selected = false;
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      // this.userInfo = this.$parent.globalData.userInfo
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/shopCar'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BDYXIuanMiXSwibmFtZXMiOlsiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic3dpcGVyRGVsIiwiY2FydENvdW50IiwibmF2IiwibWl4aW5zIiwiZGF0YSIsInJlcXVlc3RJbWdVcmwiLCJhbGxTZWxlY3RlZCIsImdvb2RzIiwiaWQiLCJuYW1lIiwicHJpY2UiLCJudW0iLCJ0YWciLCJpbWd1cmwiLCJjb21wdXRlZCIsInRvdGFsUHJpY2UiLCJ0aGF0IiwiZ29vZCIsInNlbGVjdGVkIiwianVkZ2VBbGxTZWxlY3QiLCJpc0FsbFNlbGVjdGVkIiwiZXZlcnkiLCJpdGVtIiwibWV0aG9kcyIsInNlbGVjdExpc3QiLCJlIiwiY3VySW5kZXgiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiaW5kZXgiLCJjdXJJdGVtIiwic2VsZWN0QWxsIiwiZ2V0R29vZCIsImdldERlbCIsInNwbGljZSIsImdvUGFnZSIsInVybCIsImV2dCIsIiRyZWRpcmVjdCIsImV2ZW50cyIsImZvckVhY2giLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQW9DOztJQUVmQSxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlWQyxPLEdBQVUsRUFBQyxTQUFRLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsV0FBM0IsRUFBVCxFLFFBQ1hDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sT0FBbEIsRUFBMEIsUUFBTyxNQUFqQyxFQUF3QyxTQUFRLE9BQWhELEVBQXdELE9BQU0sTUFBOUQsRUFBaEIsRUFBc0YsMEJBQXlCLEVBQUMsU0FBUSxNQUFULEVB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QU8sSUFBWDtBQUNBQSxhQUFLVixXQUFMLEdBQW1CLENBQUNVLEtBQUtWLFdBQXpCO0FBRlc7QUFBQTtBQUFBOztBQUFBO0FBR1gsZ0NBQWlCVSxLQUFLVCxLQUF0QixtSUFBNkI7QUFBQSxnQkFBcEJVLElBQW9CO0FBQUU7QUFDN0JBLGlCQUFLQyxRQUFMLEdBQWdCRixLQUFLVixXQUFyQjtBQUNEO0FBTFU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1aLE9BYk87QUFjUjBCLGFBZFEsbUJBY0NWLElBZEQsRUFjTyxDQUFFO0FBQ2Y7QUFDRCxPQWhCTztBQWlCUlcsWUFqQlEsa0JBaUJEWCxJQWpCQyxFQWlCSTtBQUNSLFlBQUlOLE9BQU8sSUFBWDtBQUNBQSxhQUFLVCxLQUFMLENBQVcyQixNQUFYLENBQWtCWixJQUFsQixFQUF1QixDQUF2QjtBQUNILE9BcEJPOztBQXFCUjs7O0FBR0FhLFlBeEJRLGtCQXdCQUMsR0F4QkEsRUF3QktDLEdBeEJMLEVBd0JVO0FBQ2xCO0FBQ0EsYUFBS0MsU0FBTCxDQUFlRixHQUFmO0FBQ0M7QUEzQk8sSyxRQThCVkcsTSxHQUFTLEU7Ozs7OzZCQUNBO0FBQ1AsVUFBSXZCLE9BQU8sSUFBWDtBQUNBQSxXQUFLVCxLQUFMLENBQVdpQyxPQUFYLENBQW1CLFVBQUN2QixJQUFELEVBQVU7QUFBRTtBQUM3QkEsYUFBS0MsUUFBTCxHQUFnQixLQUFoQjtBQUNELE9BRkQ7QUFHRDs7OzZCQUNRO0FBQ0g7QUFDRixXQUFLYixhQUFMLEdBQXFCLEtBQUtvQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JyQyxhQUE3QztBQUNIOzs7O0VBNUdtQ3NDLGVBQUtDLEk7O2tCQUF0Qm5ELFEiLCJmaWxlIjoic2hvcENhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgc3dpcGVyRGVsIGZyb20gJy4uL2NvbXBvbmVudHMvc3dpcGVyX2RlbGV0ZScgXHJcbmltcG9ydCBjYXJ0Q291bnQgZnJvbSAnLi4vY29tcG9uZW50cy9jYXJ0X2NvdW50J1xyXG5pbXBvcnQgbmF2IGZyb20gJy4uL2NvbXBvbmVudHMvbmF2JyAvLyDlupXpg6jlr7zoiKpcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSt54mp6L2mJ1xyXG4gIH07XHJcblxyXG4gJHJlcGVhdCA9IHtcImdvb2RzXCI6e1wiY29tXCI6XCJjYXJ0Q291bnRcIixcInByb3BzXCI6XCJnb29kLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJzd2lwZXJEZWxcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcImdvb2RzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaXRlbVwifSxcInYtYmluZDpzd2lwZXJEYXRhLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJnb29kc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcIml0ZW1cIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJnb29kc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcIml0ZW1cIn19LFwiY2FydENvdW50XCI6e1widi1iaW5kOmdvb2Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImdvb2RzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaXRlbVwifX0sXCJuYXZcIjp7XCJjbGFzc1wiOlwibmF2XCJ9fTtcclxuJGV2ZW50cyA9IHtcInN3aXBlckRlbFwiOntcInYtb246Z2V0RGVsXCI6XCJnZXREZWxcIn0sXCJjYXJ0Q291bnRcIjp7XCJ2LW9uOmdldEdvb2RcIjpcImdldEdvb2RcIn0sXCJuYXZcIjp7XCJ2LW9uOmNoaWxkRm5cIjpcImdvUGFnZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgc3dpcGVyRGVsLFxyXG4gICAgY2FydENvdW50LFxyXG4gICAgbmF2XHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGFsbFNlbGVjdGVkOiBmYWxzZSxcclxuICAgIGdvb2RzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDoxLFxyXG4gICAgICAgIG5hbWU6ICfmlrDmrL7lhqzlraPmo4nmi5bpnosnLFxyXG4gICAgICAgIHByaWNlOiA1LFxyXG4gICAgICAgIG51bTogMSxcclxuICAgICAgICB0YWc6J+iCpOiJsi9NJyxcclxuICAgICAgICBpbWd1cmw6ICcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDoyLFxyXG4gICAgICAgIG5hbWU6ICfokIznsonorqLkuabmnLog5bCP5Z6LJyxcclxuICAgICAgICBwcmljZTogMTAsXHJcbiAgICAgICAgbnVtOiAxLFxyXG4gICAgICAgIHRhZzon6IKk6ImyL00nLFxyXG4gICAgICAgIGltZ3VybDogJydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOjMsXHJcbiAgICAgICAgbmFtZTogJ+WIm+aEj+WutuWxheWNq+eUn+mXtOeUqOWTgeWNq+eUn+mXtOeUqOWTgeWNq+eUn+mXtOeUqOWTgeWNq+eUn+mXtOeUqOWTgScsXHJcbiAgICAgICAgcHJpY2U6IDIwLFxyXG4gICAgICAgIG51bTogNSxcclxuICAgICAgICB0YWc6J+iCpOiJsi9NJyxcclxuICAgICAgICBpbWd1cmw6ICcnXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHtcclxuICAgIHRvdGFsUHJpY2UoKSB7IC8vIOaAu+S7t+agvFxyXG4gICAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgICAgbGV0IHRvdGFsUHJpY2UgPSAwXHJcbiAgICAgIGZvciAobGV0IGdvb2Qgb2YgdGhhdC5nb29kcykge1xyXG4gICAgICAgIGlmIChnb29kLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICB0b3RhbFByaWNlICs9IGdvb2QubnVtICogZ29vZC5wcmljZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG90YWxQcmljZVxyXG4gICAgfSxcclxuICAgIGp1ZGdlQWxsU2VsZWN0KCkgeyAvL+WIpOaWreWFqOmAiVxyXG4gICAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgICAgbGV0IGlzQWxsU2VsZWN0ZWQgPSB0aGF0Lmdvb2RzLmV2ZXJ5KChpdGVtKSA9PiB7IC8vIOWPquimgeacieS4gOS4quayoemAieWwseS4umZhbHNlXHJcbiAgICAgICAgcmV0dXJuIGl0ZW0uc2VsZWN0ZWRcclxuICAgICAgfSlcclxuICAgICAgaXNBbGxTZWxlY3RlZCA/ICh0aGF0LmFsbFNlbGVjdGVkID0gdHJ1ZSkgOiAodGhhdC5hbGxTZWxlY3RlZCA9IGZhbHNlKVxyXG4gICAgICByZXR1cm4gaXNBbGxTZWxlY3RlZFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHNlbGVjdExpc3QoZSkgeyAvLyDlvZPliY3li77pgInpgInkuK1cclxuICAgICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICAgIGxldCBjdXJJbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXggLy8g6I635Y+W5b2T5YmN57SiXHJcbiAgICAgIGxldCBjdXJJdGVtID0gdGhhdC5nb29kc1tjdXJJbmRleF1cclxuICAgICAgY3VySXRlbS5zZWxlY3RlZCA9ICFjdXJJdGVtLnNlbGVjdGVkIC8vIOWPluWPjVxyXG4gICAgfSxcclxuICAgIHNlbGVjdEFsbChlKSB7IC8vIOWFqOmAiVxyXG4gICAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgICAgdGhhdC5hbGxTZWxlY3RlZCA9ICF0aGF0LmFsbFNlbGVjdGVkIFxyXG4gICAgICBmb3IgKGxldCBnb29kIG9mIHRoYXQuZ29vZHMpIHsgLy8g5ZWG5ZOB5q+P6aG56YCJ5Lit55qE5YC85ZKM5YWo6YCJ55qE54q25oCB5YC85LiA6Ie0XHJcbiAgICAgICAgZ29vZC5zZWxlY3RlZCA9IHRoYXQuYWxsU2VsZWN0ZWRcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldEdvb2QgKGl0ZW0pIHsgLy8g6Ieq5a6a5LmJ5LqL5Lu2XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZ29vZHMpXHJcbiAgICB9LFxyXG4gICAgZ2V0RGVsKGl0ZW0pe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gICAgICAgIHRoYXQuZ29vZHMuc3BsaWNlKGl0ZW0sMSlcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOW6lemDqOWvvOiIqui3s+i9rFxyXG4gICAgICovXHJcbiAgICBnb1BhZ2UgKHVybCwgZXZ0KSB7XHJcbiAgICAvLyDplIDmr4HlvZPliY3pobV76Lez6L2sfVxyXG4gICAgdGhpcy4kcmVkaXJlY3QodXJsKVxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvbkxvYWQoKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgIHRoYXQuZ29vZHMuZm9yRWFjaCgoZ29vZCkgPT4geyAvLyDliJrlvIDlp4vpu5jorqTpg73mmK/mnKrpgInkuK3nirbmgIFcclxuICAgICAgZ29vZC5zZWxlY3RlZCA9IGZhbHNlXHJcbiAgICB9KVxyXG4gIH1cclxuICBvblNob3coKSB7XHJcbiAgICAgICAgLy8gdGhpcy51c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvXHJcbiAgICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmxcclxuICB9XHJcbn1cclxuIl19