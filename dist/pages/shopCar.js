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

      this.requestGoodsList();
    }
  }, {
    key: 'requestGoodsList',
    value: function requestGoodsList() {
      var _this4 = this;

      (0, _ajax.ajax)({
        url: api.cartList
      }).then(function (res) {
        console.log(res);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BDYXIuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInN3aXBlckRlbCIsImNhcnRDb3VudCIsIm5hdiIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwiYWxsU2VsZWN0ZWQiLCJnb29kc0xpc3QiLCJpc0FsbFNlbGVjdGVkIiwiY2FydF9jb3VudCIsImFkZHJlc3NfbGlzdCIsImNvbXB1dGVkIiwidG90YWxQcmljZSIsInRoYXQiLCJnb29kIiwic2VsZWN0ZWQiLCJOdW1iZXIiLCJnb29kc19udW0iLCJnb29kc19wcmljZSIsInRvRml4ZWQiLCJqdWRnZUFsbFNlbGVjdCIsImV2ZXJ5IiwiaXRlbSIsIm1ldGhvZHMiLCJzZWxlY3RMaXN0IiwiaWR4IiwiY3VySXRlbSIsInNlbGVjdEFsbCIsImUiLCJnZXRHb29kIiwidHlwZSIsImdldERlbCIsImZpbmRJbmRleCIsImVsZSIsImNhcnRfaWQiLCJ1cmwiLCJjYXJ0RGVsIiwidGhlbiIsInJlcyIsImRhdGFzIiwic3RhdGUiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwibXNnIiwic3BsaWNlIiwiJGFwcGx5IiwiaWNvbiIsInNldHRsZW1lbnQiLCJhcHAiLCIkcGFyZW50Iiwic2VsZWN0ZWRDYXJ0TGlzdCIsImZpbHRlciIsIm1hcCIsImxlbmd0aCIsIm1lbWJlckJ1eU9uZSIsImlmY2FydCIsImpvaW4iLCJjb2RlIiwiZ2xvYmFsRGF0YSIsIm9yZGVySW5mbyIsIiRuYXZpZ2F0ZSIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwiY29uZmlybSIsImVycm9yIiwiZXZlbnRzIiwicmVxdWVzdEdvb2RzTGlzdCIsImNhcnRMaXN0IiwiY29uc29sZSIsImxvZyIsImNhcnRfbGlzdCIsImZvckVhY2giLCJjb25jYXQi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QyxJOztrQkFBdEJyRixRIiwiZmlsZSI6InNob3BDYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHN3aXBlckRlbCBmcm9tICcuLi9jb21wb25lbnRzL3N3aXBlcl9kZWxldGUnIFxyXG5pbXBvcnQgY2FydENvdW50IGZyb20gJy4uL2NvbXBvbmVudHMvY2FydF9jb3VudCdcclxuaW1wb3J0IG5hdiBmcm9tICcuLi9jb21wb25lbnRzL25hdicgLy8g5bqV6YOo5a+86IiqXHJcblxyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSt54mp6L2mJ1xyXG4gIH07XHJcblxyXG4gJHJlcGVhdCA9IHtcImdvb2RzTGlzdFwiOntcImNvbVwiOlwiY2FydENvdW50XCIsXCJwcm9wc1wiOlwiZ29vZC5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wic3dpcGVyRGVsXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJnb29kc0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpdGVtXCJ9LFwidi1iaW5kOnN3aXBlckRhdGEuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImdvb2RzTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcIml0ZW1cIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJnb29kc0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpdGVtXCJ9fSxcImNhcnRDb3VudFwiOntcInYtYmluZDpnb29kLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJnb29kc0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpdGVtXCJ9fSxcIm5hdlwiOntcImNsYXNzXCI6XCJuYXZcIn19O1xyXG4kZXZlbnRzID0ge1wic3dpcGVyRGVsXCI6e1widi1vbjpnZXREZWxcIjpcImdldERlbFwifSxcImNhcnRDb3VudFwiOntcInYtb246Z2V0R29vZFwiOlwiZ2V0R29vZFwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgc3dpcGVyRGVsLFxyXG4gICAgY2FydENvdW50LFxyXG4gICAgbmF2XHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGFsbFNlbGVjdGVkOiBmYWxzZSxcclxuICAgIGdvb2RzTGlzdDogW10sXHJcbiAgICBpc0FsbFNlbGVjdGVkOiBmYWxzZSxcclxuICAgIGNhcnRfY291bnQ6IG51bGwsXHJcbiAgICBhZGRyZXNzX2xpc3Q6IFtdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7XHJcbiAgICB0b3RhbFByaWNlKCkgeyAvLyDmgLvku7fmoLxcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICAgIGxldCB0b3RhbFByaWNlID0gMFxyXG4gICAgICBmb3IgKGxldCBnb29kIG9mIHRoYXQuZ29vZHNMaXN0KSB7XHJcbiAgICAgICAgaWYgKGdvb2Quc2VsZWN0ZWQpIHtcclxuICAgICAgICAgIHRvdGFsUHJpY2UgKz0gTnVtYmVyKGdvb2QuZ29vZHNfbnVtKSAqIE51bWJlcihnb29kLmdvb2RzX3ByaWNlKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG90YWxQcmljZS50b0ZpeGVkKDIpXHJcbiAgICB9LFxyXG4gICAganVkZ2VBbGxTZWxlY3QoKSB7IC8v5Yik5pat5YWo6YCJXHJcbiAgICAgIGxldCBpc0FsbFNlbGVjdGVkID0gdGhpcy5nb29kc0xpc3QuZXZlcnkoKGl0ZW0pID0+IHsgLy8g5Y+q6KaB5pyJ5LiA5Liq5rKh6YCJ5bCx5Li6ZmFsc2VcclxuICAgICAgICByZXR1cm4gaXRlbS5zZWxlY3RlZFxyXG4gICAgICB9KVxyXG4gICAgICBpc0FsbFNlbGVjdGVkID8gKHRoaXMuYWxsU2VsZWN0ZWQgPSB0cnVlKSA6ICh0aGlzLmFsbFNlbGVjdGVkID0gZmFsc2UpXHJcbiAgICAgIHJldHVybiBpc0FsbFNlbGVjdGVkXHJcbiAgICB9XHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBzZWxlY3RMaXN0KGlkeCkgeyAvLyDlvZPliY3li77pgInpgInkuK1cclxuICAgICAgbGV0IGN1ckl0ZW0gPSB0aGlzLmdvb2RzTGlzdFtpZHhdXHJcbiAgICAgIGN1ckl0ZW0uc2VsZWN0ZWQgPSAhY3VySXRlbS5zZWxlY3RlZCAvLyDlj5blj41cclxuICAgIH0sXHJcbiAgICBzZWxlY3RBbGwoZSkgeyAvLyDlhajpgIlcclxuICAgICAgdGhpcy5hbGxTZWxlY3RlZCA9ICF0aGlzLmFsbFNlbGVjdGVkIFxyXG4gICAgICBmb3IgKGxldCBnb29kIG9mIHRoaXMuZ29vZHNMaXN0KSB7IC8vIOWVhuWTgeavj+mhuemAieS4reeahOWAvOWSjOWFqOmAieeahOeKtuaAgeWAvOS4gOiHtFxyXG4gICAgICAgIGdvb2Quc2VsZWN0ZWQgPSB0aGlzLmFsbFNlbGVjdGVkXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRHb29kIChpdGVtLCB0eXBlKSB7IC8vIOiHquWumuS5ieS6i+S7tlxyXG4gICAgXHJcbiAgICB9LFxyXG4gICAgZ2V0RGVsKGl0ZW0pe1xyXG4gICAgICB2YXIgaWR4ID0gdGhpcy5nb29kc0xpc3QuZmluZEluZGV4KChlbGUsIGlkeCkgPT4gaXRlbS5jYXJ0X2lkID09IGVsZS5jYXJ0X2lkKVxyXG4gICAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5jYXJ0RGVsLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGNhcnRfaWQ6IGl0ZW0uY2FydF9pZFxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmKHJlcy5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogcmVzLmRhdGFzLm1zZ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHRoaXMuZ29vZHNMaXN0LnNwbGljZShpZHgsMSlcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMubXNnLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgIH0sXHJcbiAgICBzZXR0bGVtZW50KCkge1xyXG4gICAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgdmFyIHNlbGVjdGVkQ2FydExpc3QgPSB0aGlzLmdvb2RzTGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLnNlbGVjdGVkKS5tYXAoaXRlbSA9PiBgJHtpdGVtLmNhcnRfaWR9fCR7aXRlbS5nb29kc19udW19YClcclxuICAgICAgaWYoc2VsZWN0ZWRDYXJ0TGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWVhuWTgScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLm1lbWJlckJ1eU9uZSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBpZmNhcnQ6IDEsXHJcbiAgICAgICAgICBjYXJ0X2lkOiBzZWxlY3RlZENhcnRMaXN0LmpvaW4oJywnKVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgcmVzLmRhdGFzLmNhcnRfaWQgPSAgc2VsZWN0ZWRDYXJ0TGlzdC5qb2luKCcsJylcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLm9yZGVySW5mbyA9IHJlcy5kYXRhc1xyXG4gICAgICAgICAgaWYodGhhdC5hZGRyZXNzX2xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiAnL3BhZ2VzL3NldHRsZW1lbnQnIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+aPkOmGkicsXHJcbiAgICAgICAgICAgICAgY29udGVudDogJ+aaguaXoOWcsOWdgO+8jOa3u+WKoOaWsOWcsOWdgCcsXHJcbiAgICAgICAgICAgICAgc3VjY2VzcyhlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihlLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgdGhhdC4kbmF2aWdhdGUoeyB1cmw6ICdjb25zaWduZWUnIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5lcnJvcixcclxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuXHJcbiAgZXZlbnRzID0ge31cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgXHJcbiAgICB0aGlzLnJlcXVlc3RHb29kc0xpc3QoKVxyXG4gIH1cclxuICByZXF1ZXN0R29vZHNMaXN0ICgpIHtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5jYXJ0TGlzdFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIHZhciBjYXJ0X2xpc3QgPSByZXMuZGF0YXMuY2FydF9saXN0XHJcbiAgICAgIHZhciBnb29kc0xpc3QgPSBbXVxyXG4gICAgICBjYXJ0X2xpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBnb29kc0xpc3QgPSBnb29kc0xpc3QuY29uY2F0KGl0ZW0uZ29vZHMpXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuZ29vZHNMaXN0ID0gZ29vZHNMaXN0XHJcbiAgICAgIHRoaXMuY2FydF9jb3VudCA9IHJlcy5kYXRhcy5jYXJ0X2NvdW50XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIG9uU2hvdygpIHtcclxuICAgIC8vIOeUqOaIt+aUtui0p+WcsOWdgOWIl+ihqFxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmFkZHJlc3NMaXN0XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMuYWRkcmVzc19saXN0ID0gcmVzLmRhdGFzLmFkZHJlc3NfbGlzdCB8fCBbXVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=