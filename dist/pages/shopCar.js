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
    }, _this.$repeat = { "goodsList": { "com": "cartCount", "props": "good.sync" } }, _this.$props = { "swiperDel": { "xmlns:v-bind": { "value": "", "for": "goodsList", "item": "item", "index": "index", "key": "item" }, "v-bind:swiperData.sync": { "value": "item", "type": "item", "for": "goodsList", "item": "item", "index": "index", "key": "item" }, "xmlns:v-on": { "value": "", "for": "goodsList", "item": "item", "index": "index", "key": "item" } }, "cartCount": { "v-bind:good.sync": { "value": "item", "type": "item", "for": "goodsList", "item": "item", "index": "index", "key": "item" } }, "nav": { "class": "nav" } }, _this.$events = { "swiperDel": { "v-on:getDel": "getDel" }, "cartCount": { "v-on:getGood": "getGood" } }, _this.components = {
      swiperDel: _swiper_delete2.default,
      cartCount: _cart_count2.default,
      nav: _nav2.default
    }, _this.mixins = [], _this.data = {
      requestImgUrl: '',
      allSelected: false,
      goodsList: [],
      isAllSelected: false,
      cart_count: null,
      address_list: []
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
            _this2.requestGoodsList();
            // this.goodsList.splice(idx,1)
            // this.$apply()
          } else {
            wx.showToast({
              title: res.datas.msg,
              icon: 'none'
            });
          }
        });
      },
      settlement: function settlement() {
        var _this3 = this;

        var app = this.$parent;
        var that = this;
        var selectedCartList = this.goodsList.filter(function (item) {
          return item.selected;
        }).map(function (item) {
          return item.cart_id + '|' + item.goods_num;
        });
        if (selectedCartList.length == 0) {
          wx.showToast({
            title: '请选择商品',
            icon: 'none'
          });
          return false;
        }
        (0, _ajax.ajax)({
          url: api.memberBuyOne,
          data: {
            ifcart: 1,
            cart_id: selectedCartList.join(',')
          }
        }).then(function (res) {
          if (res.code == 200) {
            res.datas.cart_id = selectedCartList.join(',');
            app.globalData.orderInfo = res.datas;
            if (that.address_list.length) {
              _this3.$navigate({ url: '/pages/settlement' });
            } else {
              wx.showModal({
                title: '提醒',
                content: '暂无地址，添加新地址',
                success: function success(e) {
                  if (e.confirm) {
                    that.$navigate({ url: 'consignee' });
                  }
                }
              });
            }
          } else {
            wx.showToast({
              title: res.datas.error,
              icon: 'none'
            });
          }
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onLoad',
    value: function onLoad() {
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      var that = this;
    }
  }, {
    key: 'requestGoodsList',
    value: function requestGoodsList() {
      var _this4 = this;

      (0, _ajax.ajax)({
        url: api.cartList
      }).then(function (res) {
        var cart_list = res.datas.cart_list;
        var goodsList = [];
        cart_list.forEach(function (item) {
          goodsList = goodsList.concat(item.goods);
        });
        _this4.goodsList = goodsList;
        _this4.cart_count = res.datas.cart_count;
        _this4.$apply();
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this5 = this;

      this.requestGoodsList();
      // 用户收货地址列表
      (0, _ajax.ajax)({
        url: api.addressList
      }).then(function (res) {
        _this5.address_list = res.datas.address_list || [];
        _this5.$apply();
      });
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/shopCar'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BDYXIuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInN3aXBlckRlbCIsImNhcnRDb3VudCIsIm5hdiIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwiYWxsU2VsZWN0ZWQiLCJnb29kc0xpc3QiLCJpc0FsbFNlbGVjdGVkIiwiY2FydF9jb3VudCIsImFkZHJlc3NfbGlzdCIsImNvbXB1dGVkIiwidG90YWxQcmljZSIsInRoYXQiLCJnb29kIiwic2VsZWN0ZWQiLCJOdW1iZXIiLCJnb29kc19udW0iLCJnb29kc19wcmljZSIsInRvRml4ZWQiLCJqdWRnZUFsbFNlbGVjdCIsImV2ZXJ5IiwiaXRlbSIsIm1ldGhvZHMiLCJzZWxlY3RMaXN0IiwiaWR4IiwiY3VySXRlbSIsInNlbGVjdEFsbCIsImUiLCJnZXRHb29kIiwidHlwZSIsImdldERlbCIsImZpbmRJbmRleCIsImVsZSIsImNhcnRfaWQiLCJ1cmwiLCJjYXJ0RGVsIiwidGhlbiIsInJlcyIsImRhdGFzIiwic3RhdGUiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwibXNnIiwicmVxdWVzdEdvb2RzTGlzdCIsImljb24iLCJzZXR0bGVtZW50IiwiYXBwIiwiJHBhcmVudCIsInNlbGVjdGVkQ2FydExpc3QiLCJmaWx0ZXIiLCJtYXAiLCJsZW5ndGgiLCJtZW1iZXJCdXlPbmUiLCJpZmNhcnQiLCJqb2luIiwiY29kZSIsImdsb2JhbERhdGEiLCJvcmRlckluZm8iLCIkbmF2aWdhdGUiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsImNvbmZpcm0iLCJlcnJvciIsImV2ZW50cyIsImNhcnRMaXN0IiwiY2FydF9saXN0IiwiZm9yRWFjaCIsImNvbmNhdCIsImdvb2RzIiwiJGFwcGx5IiwiYWRkcmVzc0xpc3QiLCJ3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Q0YsV0FoQkQsTUFnQk87QUFDTE0sZUFBR0MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPTCxJQUFJQyxLQUFKLENBQVUwQixLQUROO0FBRVhuQixvQkFBTTtBQUZLLGFBQWI7QUFJRDtBQUNGLFNBN0JEO0FBOEJEO0FBL0VPLEssUUFtRlZvQixNLEdBQVMsRTs7Ozs7NkJBQ0E7QUFDUCxXQUFLN0QsYUFBTCxHQUFxQixLQUFLNEMsT0FBTCxDQUFhUyxVQUFiLENBQXdCckQsYUFBN0M7QUFDQSxVQUFJUSxPQUFPLElBQVg7QUFFRDs7O3VDQUNtQjtBQUFBOztBQUNsQixzQkFBSztBQUNIc0IsYUFBSzVDLElBQUk0RTtBQUROLE9BQUwsRUFFRzlCLElBRkgsQ0FFUSxlQUFPO0FBQ2IsWUFBSStCLFlBQVk5QixJQUFJQyxLQUFKLENBQVU2QixTQUExQjtBQUNBLFlBQUk3RCxZQUFZLEVBQWhCO0FBQ0E2RCxrQkFBVUMsT0FBVixDQUFrQixnQkFBUTtBQUN4QjlELHNCQUFZQSxVQUFVK0QsTUFBVixDQUFpQmhELEtBQUtpRCxLQUF0QixDQUFaO0FBQ0QsU0FGRDtBQUdBLGVBQUtoRSxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLGVBQUtFLFVBQUwsR0FBa0I2QixJQUFJQyxLQUFKLENBQVU5QixVQUE1QjtBQUNBLGVBQUsrRCxNQUFMO0FBQ0QsT0FYRDtBQVlEOzs7NkJBQ1E7QUFBQTs7QUFDUCxXQUFLM0IsZ0JBQUw7QUFDQTtBQUNBLHNCQUFLO0FBQ0hWLGFBQUs1QyxJQUFJa0Y7QUFETixPQUFMLEVBRUdwQyxJQUZILENBRVEsZUFBTztBQUNiLGVBQUszQixZQUFMLEdBQW9CNEIsSUFBSUMsS0FBSixDQUFVN0IsWUFBVixJQUEwQixFQUE5QztBQUNBLGVBQUs4RCxNQUFMO0FBQ0QsT0FMRDtBQU1EOzs7O0VBNUptQ0UsZUFBS0MsSTs7a0JBQXRCbEYsUSIsImZpbGUiOiJzaG9wQ2FyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBzd2lwZXJEZWwgZnJvbSAnLi4vY29tcG9uZW50cy9zd2lwZXJfZGVsZXRlJyBcclxuaW1wb3J0IGNhcnRDb3VudCBmcm9tICcuLi9jb21wb25lbnRzL2NhcnRfY291bnQnXHJcbmltcG9ydCBuYXYgZnJvbSAnLi4vY29tcG9uZW50cy9uYXYnIC8vIOW6lemDqOWvvOiIqlxyXG5cclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i0reeJqei9pidcclxuICB9O1xyXG5cclxuICRyZXBlYXQgPSB7XCJnb29kc0xpc3RcIjp7XCJjb21cIjpcImNhcnRDb3VudFwiLFwicHJvcHNcIjpcImdvb2Quc3luY1wifX07XHJcbiRwcm9wcyA9IHtcInN3aXBlckRlbFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiZ29vZHNMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaXRlbVwifSxcInYtYmluZDpzd2lwZXJEYXRhLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJnb29kc0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpdGVtXCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiZ29vZHNMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaXRlbVwifX0sXCJjYXJ0Q291bnRcIjp7XCJ2LWJpbmQ6Z29vZC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwiZ29vZHNMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaXRlbVwifX0sXCJuYXZcIjp7XCJjbGFzc1wiOlwibmF2XCJ9fTtcclxuJGV2ZW50cyA9IHtcInN3aXBlckRlbFwiOntcInYtb246Z2V0RGVsXCI6XCJnZXREZWxcIn0sXCJjYXJ0Q291bnRcIjp7XCJ2LW9uOmdldEdvb2RcIjpcImdldEdvb2RcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIHN3aXBlckRlbCxcclxuICAgIGNhcnRDb3VudCxcclxuICAgIG5hdlxyXG4gIH07XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBhbGxTZWxlY3RlZDogZmFsc2UsXHJcbiAgICBnb29kc0xpc3Q6IFtdLFxyXG4gICAgaXNBbGxTZWxlY3RlZDogZmFsc2UsXHJcbiAgICBjYXJ0X2NvdW50OiBudWxsLFxyXG4gICAgYWRkcmVzc19saXN0OiBbXSxcclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHtcclxuICAgIHRvdGFsUHJpY2UoKSB7IC8vIOaAu+S7t+agvFxyXG4gICAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgICAgbGV0IHRvdGFsUHJpY2UgPSAwXHJcbiAgICAgIGZvciAobGV0IGdvb2Qgb2YgdGhhdC5nb29kc0xpc3QpIHtcclxuICAgICAgICBpZiAoZ29vZC5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgdG90YWxQcmljZSArPSBOdW1iZXIoZ29vZC5nb29kc19udW0pICogTnVtYmVyKGdvb2QuZ29vZHNfcHJpY2UpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0b3RhbFByaWNlLnRvRml4ZWQoMilcclxuICAgIH0sXHJcbiAgICBqdWRnZUFsbFNlbGVjdCgpIHsgLy/liKTmlq3lhajpgIlcclxuICAgICAgbGV0IGlzQWxsU2VsZWN0ZWQgPSB0aGlzLmdvb2RzTGlzdC5ldmVyeSgoaXRlbSkgPT4geyAvLyDlj6ropoHmnInkuIDkuKrmsqHpgInlsLHkuLpmYWxzZVxyXG4gICAgICAgIHJldHVybiBpdGVtLnNlbGVjdGVkXHJcbiAgICAgIH0pXHJcbiAgICAgIGlzQWxsU2VsZWN0ZWQgPyAodGhpcy5hbGxTZWxlY3RlZCA9IHRydWUpIDogKHRoaXMuYWxsU2VsZWN0ZWQgPSBmYWxzZSlcclxuICAgICAgcmV0dXJuIGlzQWxsU2VsZWN0ZWRcclxuICAgIH1cclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHNlbGVjdExpc3QoaWR4KSB7IC8vIOW9k+WJjeWLvumAiemAieS4rVxyXG4gICAgICBsZXQgY3VySXRlbSA9IHRoaXMuZ29vZHNMaXN0W2lkeF1cclxuICAgICAgY3VySXRlbS5zZWxlY3RlZCA9ICFjdXJJdGVtLnNlbGVjdGVkIC8vIOWPluWPjVxyXG4gICAgfSxcclxuICAgIHNlbGVjdEFsbChlKSB7IC8vIOWFqOmAiVxyXG4gICAgICB0aGlzLmFsbFNlbGVjdGVkID0gIXRoaXMuYWxsU2VsZWN0ZWQgXHJcbiAgICAgIGZvciAobGV0IGdvb2Qgb2YgdGhpcy5nb29kc0xpc3QpIHsgLy8g5ZWG5ZOB5q+P6aG56YCJ5Lit55qE5YC85ZKM5YWo6YCJ55qE54q25oCB5YC85LiA6Ie0XHJcbiAgICAgICAgZ29vZC5zZWxlY3RlZCA9IHRoaXMuYWxsU2VsZWN0ZWRcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldEdvb2QgKGl0ZW0sIHR5cGUpIHsgLy8g6Ieq5a6a5LmJ5LqL5Lu2XHJcbiAgICBcclxuICAgIH0sXHJcbiAgICBnZXREZWwoaXRlbSl7XHJcbiAgICAgIHZhciBpZHggPSB0aGlzLmdvb2RzTGlzdC5maW5kSW5kZXgoKGVsZSwgaWR4KSA9PiBpdGVtLmNhcnRfaWQgPT0gZWxlLmNhcnRfaWQpXHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLmNhcnREZWwsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgY2FydF9pZDogaXRlbS5jYXJ0X2lkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYocmVzLmRhdGFzLnN0YXRlID09IDEpIHtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMubXNnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgdGhpcy5yZXF1ZXN0R29vZHNMaXN0KClcclxuICAgICAgICAgIC8vIHRoaXMuZ29vZHNMaXN0LnNwbGljZShpZHgsMSlcclxuICAgICAgICAgIC8vIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMubXNnLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgIH0sXHJcbiAgICBzZXR0bGVtZW50KCkge1xyXG4gICAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgdmFyIHNlbGVjdGVkQ2FydExpc3QgPSB0aGlzLmdvb2RzTGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLnNlbGVjdGVkKS5tYXAoaXRlbSA9PiBgJHtpdGVtLmNhcnRfaWR9fCR7aXRlbS5nb29kc19udW19YClcclxuICAgICAgaWYoc2VsZWN0ZWRDYXJ0TGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWVhuWTgScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLm1lbWJlckJ1eU9uZSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBpZmNhcnQ6IDEsXHJcbiAgICAgICAgICBjYXJ0X2lkOiBzZWxlY3RlZENhcnRMaXN0LmpvaW4oJywnKVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgcmVzLmRhdGFzLmNhcnRfaWQgPSAgc2VsZWN0ZWRDYXJ0TGlzdC5qb2luKCcsJylcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLm9yZGVySW5mbyA9IHJlcy5kYXRhc1xyXG4gICAgICAgICAgaWYodGhhdC5hZGRyZXNzX2xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiAnL3BhZ2VzL3NldHRsZW1lbnQnIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+aPkOmGkicsXHJcbiAgICAgICAgICAgICAgY29udGVudDogJ+aaguaXoOWcsOWdgO+8jOa3u+WKoOaWsOWcsOWdgCcsXHJcbiAgICAgICAgICAgICAgc3VjY2VzcyhlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihlLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgdGhhdC4kbmF2aWdhdGUoeyB1cmw6ICdjb25zaWduZWUnIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5lcnJvcixcclxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuXHJcbiAgZXZlbnRzID0ge31cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgXHJcbiAgfVxyXG4gIHJlcXVlc3RHb29kc0xpc3QgKCkge1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmNhcnRMaXN0XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHZhciBjYXJ0X2xpc3QgPSByZXMuZGF0YXMuY2FydF9saXN0XHJcbiAgICAgIHZhciBnb29kc0xpc3QgPSBbXVxyXG4gICAgICBjYXJ0X2xpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBnb29kc0xpc3QgPSBnb29kc0xpc3QuY29uY2F0KGl0ZW0uZ29vZHMpXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuZ29vZHNMaXN0ID0gZ29vZHNMaXN0XHJcbiAgICAgIHRoaXMuY2FydF9jb3VudCA9IHJlcy5kYXRhcy5jYXJ0X2NvdW50XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIG9uU2hvdygpIHtcclxuICAgIHRoaXMucmVxdWVzdEdvb2RzTGlzdCgpXHJcbiAgICAvLyDnlKjmiLfmlLbotKflnLDlnYDliJfooahcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5hZGRyZXNzTGlzdFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLmFkZHJlc3NfbGlzdCA9IHJlcy5kYXRhcy5hZGRyZXNzX2xpc3QgfHwgW11cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19