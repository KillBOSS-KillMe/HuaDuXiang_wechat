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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      navigationBarTitleText: '搭配商品'
    }, _this.$repeat = { "goods": { "com": "cartCount", "props": "good.sync" } }, _this.$props = { "cartCount": { "xmlns:v-bind": { "value": "", "for": "goods", "item": "item", "index": "index", "key": "item" }, "v-bind:good.sync": { "value": "item", "type": "item", "for": "goods", "item": "item", "index": "index", "key": "item" }, "xmlns:v-on": { "value": "", "for": "goods", "item": "item", "index": "index", "key": "item" } } }, _this.$events = { "cartCount": { "v-on:getGood": "getGood" } }, _this.components = {
      swiperDel: _swiper_delete2.default,
      cartCount: _cart_count2.default
    }, _this.mixins = [], _this.data = {
      selectInformation: '', //单选选中数据
      allSelected: false,
      goods: [{
        id: 1,
        name: '新款冬季棉拖鞋',
        price: 100,
        exprice: 20,
        num: 1,
        tag: '肤色/M',
        imgurl: ''
      }, {
        id: 2,
        name: '萌粉订书机 小型',
        price: 100,
        exprice: 20,
        num: 1,
        tag: '肤色/M',
        imgurl: ''
      }, {
        id: 3,
        name: '创意家居卫生间用品卫生间用品卫生间用品卫生间用品',
        price: 100,
        exprice: 20,
        num: 5,
        tag: '肤色/M',
        imgurl: ''
      }]
    }, _this.computed = {
      totalPrice: function totalPrice() {
        // 总价格
        var totalPrice = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.goods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
        var isAllSelected = this.goods.every(function (item) {
          // 只要有一个没选就为false
          return item.selected;
        });
        isAllSelected ? this.allSelected = true : this.allSelected = false;
        return isAllSelected;
      }
    }, _this.methods = {
      selectList: function selectList(e) {
        // 当前勾选选中
        var curIndex = e.target.dataset.index; // 获取当前索
        var curItem = this.goods[curIndex];
        curItem.selected = !curItem.selected; // 取反
        this.selectInformation = curItem; // 单选数据 存储
      },
      selectAll: function selectAll(e) {
        // 全选
        this.allSelected = !this.allSelected;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.goods[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
        this.goods.splice(item, 1);
      },
      selectGoodsSure: function selectGoodsSure() {
        if (!this.selectInformation) {
          console.log(11);
          wx.showToast({
            icon: 'none',
            title: '请选择商品'
          });
        } else {
          wx.navigateBack({
            delta: 1
          });
          console.log('this.selectInformation', this.selectInformation);
        }
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onLoad',
    value: function onLoad() {
      this.goods.forEach(function (good) {
        // 刚开始默认都是未选中状态
        good.selected = false;
      });
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/matchingGoods'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hdGNoaW5nR29vZHMuanMiXSwibmFtZXMiOlsiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic3dpcGVyRGVsIiwiY2FydENvdW50IiwibWl4aW5zIiwiZGF0YSIsInNlbGVjdEluZm9ybWF0aW9uIiwiYWxsU2VsZWN0ZWQiLCJnb29kcyIsImlkIiwibmFtZSIsInByaWNlIiwiZXhwcmljZSIsIm51bSIsInRhZyIsImltZ3VybCIsImNvbXB1dGVkIiwidG90YWxQcmljZSIsImdvb2QiLCJzZWxlY3RlZCIsImp1ZGdlQWxsU2VsZWN0IiwiaXNBbGxTZWxlY3RlZCIsImV2ZXJ5IiwiaXRlbSIsIm1ldGhvZHMiLCJzZWxlY3RMaXN0IiwiZSIsImN1ckluZGV4IiwidGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwiY3VySXRlbSIsInNlbGVjdEFsbCIsImdldEdvb2QiLCJnZXREZWwiLCJzcGxpY2UiLCJzZWxlY3RHb29kc1N1cmUiLCJjb25zb2xlIiwibG9nIiwid3giLCJzaG93VG9hc3QiLCJpY29uIiwidGl0bGUiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsImV2ZW50cyIsImZvckVhY2giLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVZDLE8sR0FBVSxFQUFDLFNBQVEsRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxXQUEzQixFQUFULEUsUUFDWEMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxPQUFsQixFQUEwQixRQUFPLE1BQWpDLEVBQXdDLFNBQVEsT0FBaEQsRUFBd0QsT0FBTSxNQUE5RCxFQUFoQixFQUFz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O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS1osT0FaTztBQWFSMEIsYUFiUSxtQkFhQ1YsSUFiRCxFQWFPLENBQUU7QUFDZjtBQUNELE9BZk87QUFnQlJXLFlBaEJRLGtCQWdCRFgsSUFoQkMsRUFnQkk7QUFDUixhQUFLZixLQUFMLENBQVcyQixNQUFYLENBQWtCWixJQUFsQixFQUF1QixDQUF2QjtBQUNILE9BbEJPO0FBbUJSYSxxQkFuQlEsNkJBbUJTO0FBQ2IsWUFBRyxDQUFDLEtBQUs5QixpQkFBVCxFQUEyQjtBQUN2QitCLGtCQUFRQyxHQUFSLENBQVksRUFBWjtBQUNBQyxhQUFHQyxTQUFILENBQWE7QUFDVEMsa0JBQU0sTUFERztBQUVUQyxtQkFBTztBQUZFLFdBQWI7QUFJSCxTQU5ELE1BTUs7QUFDREgsYUFBR0ksWUFBSCxDQUFnQjtBQUNaQyxtQkFBTztBQURLLFdBQWhCO0FBR0FQLGtCQUFRQyxHQUFSLENBQVksd0JBQVosRUFBcUMsS0FBS2hDLGlCQUExQztBQUNIO0FBQ0o7QUFoQ08sSyxRQW1DVnVDLE0sR0FBUyxFOzs7Ozs2QkFDQTtBQUNQLFdBQUtyQyxLQUFMLENBQVdzQyxPQUFYLENBQW1CLFVBQUM1QixJQUFELEVBQVU7QUFBRTtBQUM3QkEsYUFBS0MsUUFBTCxHQUFnQixLQUFoQjtBQUNELE9BRkQ7QUFHRDs7OztFQTVHbUM0QixlQUFLQyxJOztrQkFBdEJyRCxRIiwiZmlsZSI6Im1hdGNoaW5nR29vZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHN3aXBlckRlbCBmcm9tICcuLi9jb21wb25lbnRzL3N3aXBlcl9kZWxldGUnIFxyXG5pbXBvcnQgY2FydENvdW50IGZyb20gJy4uL2NvbXBvbmVudHMvY2FydF9jb3VudCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pCt6YWN5ZWG5ZOBJ1xyXG4gIH07XHJcblxyXG4gJHJlcGVhdCA9IHtcImdvb2RzXCI6e1wiY29tXCI6XCJjYXJ0Q291bnRcIixcInByb3BzXCI6XCJnb29kLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJjYXJ0Q291bnRcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcImdvb2RzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaXRlbVwifSxcInYtYmluZDpnb29kLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJnb29kc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcIml0ZW1cIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJnb29kc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcIml0ZW1cIn19fTtcclxuJGV2ZW50cyA9IHtcImNhcnRDb3VudFwiOntcInYtb246Z2V0R29vZFwiOlwiZ2V0R29vZFwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgc3dpcGVyRGVsLFxyXG4gICAgY2FydENvdW50XHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBzZWxlY3RJbmZvcm1hdGlvbjonJywgLy/ljZXpgInpgInkuK3mlbDmja5cclxuICAgIGFsbFNlbGVjdGVkOiBmYWxzZSxcclxuICAgIGdvb2RzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDoxLFxyXG4gICAgICAgIG5hbWU6ICfmlrDmrL7lhqzlraPmo4nmi5bpnosnLFxyXG4gICAgICAgIHByaWNlOiAxMDAsXHJcbiAgICAgICAgZXhwcmljZTogMjAsXHJcbiAgICAgICAgbnVtOiAxLFxyXG4gICAgICAgIHRhZzon6IKk6ImyL00nLFxyXG4gICAgICAgIGltZ3VybDogJydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOjIsXHJcbiAgICAgICAgbmFtZTogJ+iQjOeyieiuouS5puacuiDlsI/lnosnLFxyXG4gICAgICAgIHByaWNlOiAxMDAsXHJcbiAgICAgICAgZXhwcmljZTogMjAsXHJcbiAgICAgICAgbnVtOiAxLFxyXG4gICAgICAgIHRhZzon6IKk6ImyL00nLFxyXG4gICAgICAgIGltZ3VybDogJydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOjMsXHJcbiAgICAgICAgbmFtZTogJ+WIm+aEj+WutuWxheWNq+eUn+mXtOeUqOWTgeWNq+eUn+mXtOeUqOWTgeWNq+eUn+mXtOeUqOWTgeWNq+eUn+mXtOeUqOWTgScsXHJcbiAgICAgICAgcHJpY2U6IDEwMCxcclxuICAgICAgICBleHByaWNlOiAyMCxcclxuICAgICAgICBudW06IDUsXHJcbiAgICAgICAgdGFnOifogqToibIvTScsXHJcbiAgICAgICAgaW1ndXJsOiAnJ1xyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7XHJcbiAgICB0b3RhbFByaWNlKCkgeyAvLyDmgLvku7fmoLxcclxuICAgICAgbGV0IHRvdGFsUHJpY2UgPSAwXHJcbiAgICAgIGZvciAobGV0IGdvb2Qgb2YgdGhpcy5nb29kcykge1xyXG4gICAgICAgIGlmIChnb29kLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICB0b3RhbFByaWNlICs9IGdvb2QubnVtICogZ29vZC5wcmljZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG90YWxQcmljZVxyXG4gICAgfSxcclxuICAgIGp1ZGdlQWxsU2VsZWN0KCkgeyAvL+WIpOaWreWFqOmAiVxyXG4gICAgICBsZXQgaXNBbGxTZWxlY3RlZCA9IHRoaXMuZ29vZHMuZXZlcnkoKGl0ZW0pID0+IHsgLy8g5Y+q6KaB5pyJ5LiA5Liq5rKh6YCJ5bCx5Li6ZmFsc2VcclxuICAgICAgICByZXR1cm4gaXRlbS5zZWxlY3RlZFxyXG4gICAgICB9KVxyXG4gICAgICBpc0FsbFNlbGVjdGVkID8gKHRoaXMuYWxsU2VsZWN0ZWQgPSB0cnVlKSA6ICh0aGlzLmFsbFNlbGVjdGVkID0gZmFsc2UpXHJcbiAgICAgIHJldHVybiBpc0FsbFNlbGVjdGVkXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgc2VsZWN0TGlzdChlKSB7IC8vIOW9k+WJjeWLvumAiemAieS4rVxyXG4gICAgICBsZXQgY3VySW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4IC8vIOiOt+WPluW9k+WJjee0olxyXG4gICAgICBsZXQgY3VySXRlbSA9IHRoaXMuZ29vZHNbY3VySW5kZXhdXHJcbiAgICAgIGN1ckl0ZW0uc2VsZWN0ZWQgPSAhY3VySXRlbS5zZWxlY3RlZCAvLyDlj5blj41cclxuICAgICAgdGhpcy5zZWxlY3RJbmZvcm1hdGlvbiA9IGN1ckl0ZW0gLy8g5Y2V6YCJ5pWw5o2uIOWtmOWCqFxyXG4gICAgfSxcclxuICAgIHNlbGVjdEFsbChlKSB7IC8vIOWFqOmAiVxyXG4gICAgICB0aGlzLmFsbFNlbGVjdGVkID0gIXRoaXMuYWxsU2VsZWN0ZWQgXHJcbiAgICAgIGZvciAobGV0IGdvb2Qgb2YgdGhpcy5nb29kcykgeyAvLyDllYblk4Hmr4/pobnpgInkuK3nmoTlgLzlkozlhajpgInnmoTnirbmgIHlgLzkuIDoh7RcclxuICAgICAgICBnb29kLnNlbGVjdGVkID0gdGhpcy5hbGxTZWxlY3RlZFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0R29vZCAoaXRlbSkgeyAvLyDoh6rlrprkuYnkuovku7ZcclxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5nb29kcylcclxuICAgIH0sXHJcbiAgICBnZXREZWwoaXRlbSl7XHJcbiAgICAgICAgdGhpcy5nb29kcy5zcGxpY2UoaXRlbSwxKVxyXG4gICAgfSxcclxuICAgIHNlbGVjdEdvb2RzU3VyZSgpe1xyXG4gICAgICAgIGlmKCF0aGlzLnNlbGVjdEluZm9ybWF0aW9uKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coMTEpXHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWVhuWTgSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcy5zZWxlY3RJbmZvcm1hdGlvbicsdGhpcy5zZWxlY3RJbmZvcm1hdGlvbilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5nb29kcy5mb3JFYWNoKChnb29kKSA9PiB7IC8vIOWImuW8gOWni+m7mOiupOmDveaYr+acqumAieS4reeKtuaAgVxyXG4gICAgICBnb29kLnNlbGVjdGVkID0gZmFsc2VcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==