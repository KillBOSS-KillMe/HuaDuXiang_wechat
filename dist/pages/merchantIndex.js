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
      navIdx: 1,
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
          _this2.$apply();
        }
      });
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/merchantIndex'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lcmNoYW50SW5kZXguanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIlNob3BDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25TdHlsZSIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwicmVxdWVzdEltZ1VybCIsInN0b3JlX2luZm8iLCJyZWNfZ29vZHNfbGlzdCIsIm5hdklkeCIsInN0b3JlX2dvb2RzX2NsYXNzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibmF2R29vZHNEZXRhaWxzIiwiZ29vZHNfaWQiLCIkbmF2aWdhdGUiLCJ1cmwiLCJjaGFuZ2VOYXYiLCJpZHgiLCJuYXZHb29kc0xpc3QiLCJiYWNrIiwid3giLCJuYXZpZ2F0ZUJhY2siLCJldmVudHMiLCJ0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjb25zb2xlIiwibG9nIiwic3RvcmVJbmRleCIsInN0b3JlX2lkIiwidGhlbiIsInJlcyIsImNvZGUiLCJkYXRhcyIsIiRhcHBseSIsInN0b3JlR29vZHNDbGFzcyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBRXFCQyxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsSUFEakI7QUFFUEMsdUJBQWlCOztBQUZWLEssUUFNVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLHFCQUFlLEVBRFY7QUFFTEMsa0JBQVksSUFGUCxFQUVhO0FBQ2xCQyxzQkFBZ0IsRUFIWCxFQUdlO0FBQ3BCQyxjQUFRLENBSkg7QUFLTEMseUJBQW1CLEVBTGQsQ0FLaUI7QUFMakIsSyxRQVFQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDUkMscUJBRFEsMkJBQ1FDLFFBRFIsRUFDa0I7QUFDeEIsYUFBS0MsU0FBTCxDQUFlLEVBQUVDLCtCQUE2QkYsUUFBL0IsRUFBZjtBQUNELE9BSE87QUFJUkcsZUFKUSxxQkFJRUMsR0FKRixFQUlPO0FBQ2IsWUFBR0EsT0FBTyxLQUFLVCxNQUFmLEVBQXVCLE9BQU8sS0FBUDtBQUN2QixhQUFLQSxNQUFMLEdBQWNTLEdBQWQ7QUFDRCxPQVBPO0FBUVJDLGtCQVJRLDBCQVFNO0FBQ1osYUFBS0osU0FBTCxDQUFlLEVBQUVDLGdCQUFGLEVBQWY7QUFDRCxPQVZPO0FBV1JJLFVBWFEsa0JBV0Y7QUFDSkMsV0FBR0MsWUFBSDtBQUNEO0FBYk8sSyxRQWdCVkMsTSxHQUFTLEU7Ozs7OzZCQUNBLENBRVI7OzsyQkFFTUMsQyxFQUFHO0FBQUE7O0FBQ1IsV0FBS2xCLGFBQUwsR0FBcUIsS0FBS21CLE9BQUwsQ0FBYUMsVUFBYixDQUF3QnBCLGFBQTdDOztBQUVBcUIsY0FBUUMsR0FBUixDQUFZSixDQUFaLEVBQWUsTUFBZjtBQUNBO0FBQ0Esc0JBQUs7QUFDSFIsYUFBS25CLElBQUlnQyxVQUROO0FBRUh4QixjQUFNO0FBQ0p5QixvQkFBVU4sRUFBRU07QUFEUjtBQUZILE9BQUwsRUFLR0MsSUFMSCxDQUtRLGVBQU87QUFDYixZQUFHQyxJQUFJQyxJQUFKLElBQVksR0FBZixFQUFvQjtBQUNsQk4sa0JBQVFDLEdBQVIsQ0FBWUksSUFBSUUsS0FBaEI7QUFDQSxpQkFBSzNCLFVBQUwsR0FBa0J5QixJQUFJRSxLQUFKLENBQVUzQixVQUE1QjtBQUNBLGlCQUFLQyxjQUFMLEdBQXNCd0IsSUFBSUUsS0FBSixDQUFVMUIsY0FBVixJQUE0QixFQUFsRDtBQUNBLGlCQUFLMkIsTUFBTDtBQUNEO0FBQ0YsT0FaRDs7QUFjQTtBQUNBLHNCQUFLO0FBQ0huQixhQUFLbkIsSUFBSXVDLGVBRE47QUFFSC9CLGNBQU07QUFDSnlCLG9CQUFVTixFQUFFTTtBQURSO0FBRkgsT0FBTCxFQUtHQyxJQUxILENBS1EsZUFBTztBQUNiLFlBQUdDLElBQUlDLElBQUosSUFBWSxHQUFmLEVBQW9CO0FBQ2xCLGlCQUFLdkIsaUJBQUwsR0FBeUJzQixJQUFJRSxLQUFKLENBQVV4QixpQkFBVixJQUErQixFQUF4RDtBQUNBLGlCQUFLeUIsTUFBTDtBQUNEO0FBQ0YsT0FWRDtBQVlEOzs7O0VBMUVtQ0UsZUFBS0MsSTs7a0JBQXRCdkMsUSIsImZpbGUiOiJtZXJjaGFudEluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYbmiLcnLFxyXG4gICAgbmF2aWdhdGlvblN0eWxlOiAnY3VzdG9tJ1xyXG5cclxuICB9O1xyXG5cclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBzdG9yZV9pbmZvOiBudWxsLCAvLyDlupfpk7rkv6Hmga9cclxuICAgIHJlY19nb29kc19saXN0OiBbXSwgLy/llYblk4HliJfooahcclxuICAgIG5hdklkeDogMSxcclxuICAgIHN0b3JlX2dvb2RzX2NsYXNzOiBbXSAvL+W6l+mTuuWIhuexu1xyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBuYXZHb29kc0RldGFpbHMoZ29vZHNfaWQpIHtcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBzaG9wRGV0YWlscz9nb29kc19pZD0ke2dvb2RzX2lkfWAgfSk7XHJcbiAgICB9LFxyXG4gICAgY2hhbmdlTmF2KGlkeCkge1xyXG4gICAgICBpZihpZHggPT0gdGhpcy5uYXZJZHgpIHJldHVybiBmYWxzZVxyXG4gICAgICB0aGlzLm5hdklkeCA9IGlkeFxyXG4gICAgfSxcclxuICAgIG5hdkdvb2RzTGlzdCgpe1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYGdvb2RzTGlzdGAgfSk7XHJcbiAgICB9LFxyXG4gICAgYmFjaygpe1xyXG4gICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG4gIG9uU2hvdygpIHtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgb25Mb2FkKHQpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcblxyXG4gICAgY29uc29sZS5sb2codCwgJ+W6l+mTumlkJylcclxuICAgIC8vIOW6l+mTuummlumhteaOpeWPo1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLnN0b3JlSW5kZXgsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBzdG9yZV9pZDogdC5zdG9yZV9pZFxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhcylcclxuICAgICAgICB0aGlzLnN0b3JlX2luZm8gPSByZXMuZGF0YXMuc3RvcmVfaW5mb1xyXG4gICAgICAgIHRoaXMucmVjX2dvb2RzX2xpc3QgPSByZXMuZGF0YXMucmVjX2dvb2RzX2xpc3QgfHwgW11cclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgLy8g5bqX6ZO65ZWG5ZOB5YiG57G75o6l5Y+jXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuc3RvcmVHb29kc0NsYXNzLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc3RvcmVfaWQ6IHQuc3RvcmVfaWRcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLnN0b3JlX2dvb2RzX2NsYXNzID0gcmVzLmRhdGFzLnN0b3JlX2dvb2RzX2NsYXNzIHx8IFtdXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICB9XHJcbn1cclxuIl19