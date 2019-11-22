'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../ajax.js');

var _base = require('./../utils/base.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var api = require('./../api.js');

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '优惠券列表'
    }, _this.data = {
      hasmore: false, // 是否有下一页
      curpage: 1, //当前页数
      page_total: '', // 总页数
      voucher_list: []
    }, _this.components = {}, _this.computed = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.requestCouponList();
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'requestCouponList',
    value: function requestCouponList() {
      var _this2 = this;

      (0, _ajax.ajax)({
        url: api.voucherList,
        data: {
          page: 10,
          curpage: this.curpage
        }
      }).then(function (res) {
        if (res.code == 200) {
          var list = res.datas.voucher_list || [];
          list.forEach(function (item) {
            item.couponTime = (0, _base.formatDate)(item.voucher_start_date) + ' \u81F3 ' + (0, _base.formatDate)(item.voucher_end_date);
          });
          _this2.voucher_list = _this2.voucher_list.concat(list);
          _this2.hasmore = res.hasmore;
          _this2.page_total = res.page_total;
          _this2.$apply();
        }
      });
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.hasmore) {
        this.curpage++;
        this.requestCouponList();
      }
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/coupon-list'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbi1saXN0LmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiaGFzbW9yZSIsImN1cnBhZ2UiLCJwYWdlX3RvdGFsIiwidm91Y2hlcl9saXN0IiwiY29tcG9uZW50cyIsImNvbXB1dGVkIiwibWV0aG9kcyIsIm9wdGlvbnMiLCJyZXF1ZXN0Q291cG9uTGlzdCIsInVybCIsInZvdWNoZXJMaXN0IiwicGFnZSIsInRoZW4iLCJyZXMiLCJjb2RlIiwibGlzdCIsImRhdGFzIiwiZm9yRWFjaCIsIml0ZW0iLCJjb3Vwb25UaW1lIiwidm91Y2hlcl9zdGFydF9kYXRlIiwidm91Y2hlcl9lbmRfZGF0ZSIsImNvbmNhdCIsIiRhcHBseSIsIndlcHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7QUFGQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFJcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNIQyxlQUFTLEtBRE4sRUFDYTtBQUNoQkMsZUFBUyxDQUZOLEVBRVM7QUFDWkMsa0JBQVksRUFIVCxFQUdhO0FBQ2hCQyxvQkFBYztBQUpYLEssUUFNUEMsVSxHQUFhLEUsUUFDYkMsUSxHQUFXLEUsUUFDWEMsTyxHQUFVLEU7Ozs7OzJCQUdIQyxPLEVBQVM7QUFDZCxXQUFLQyxpQkFBTDtBQUNEOzs7NkJBQ1MsQ0FFVDs7O3dDQUNtQjtBQUFBOztBQUNsQixzQkFBSztBQUNIQyxhQUFLZixJQUFJZ0IsV0FETjtBQUVIWCxjQUFNO0FBQ0pZLGdCQUFNLEVBREY7QUFFSlYsbUJBQVMsS0FBS0E7QUFGVjtBQUZILE9BQUwsRUFNR1csSUFOSCxDQU1RLGVBQU87QUFDYixZQUFJQyxJQUFJQyxJQUFKLElBQVksR0FBaEIsRUFBcUI7QUFDbkIsY0FBSUMsT0FBT0YsSUFBSUcsS0FBSixDQUFVYixZQUFWLElBQTBCLEVBQXJDO0FBQ0FZLGVBQUtFLE9BQUwsQ0FBYSxnQkFBUTtBQUNuQkMsaUJBQUtDLFVBQUwsR0FBcUIsc0JBQVdELEtBQUtFLGtCQUFoQixDQUFyQixnQkFBOEQsc0JBQVdGLEtBQUtHLGdCQUFoQixDQUE5RDtBQUNELFdBRkQ7QUFHQSxpQkFBS2xCLFlBQUwsR0FBb0IsT0FBS0EsWUFBTCxDQUFrQm1CLE1BQWxCLENBQXlCUCxJQUF6QixDQUFwQjtBQUNBLGlCQUFLZixPQUFMLEdBQWVhLElBQUliLE9BQW5CO0FBQ0EsaUJBQUtFLFVBQUwsR0FBa0JXLElBQUlYLFVBQXRCO0FBQ0EsaUJBQUtxQixNQUFMO0FBQ0Q7QUFDRixPQWpCRDtBQWtCRDs7O29DQUNnQjtBQUNmLFVBQUcsS0FBS3ZCLE9BQVIsRUFBaUI7QUFDZixhQUFLQyxPQUFMO0FBQ0EsYUFBS08saUJBQUw7QUFDRDtBQUNGOzs7O0VBOUNnQ2dCLGVBQUtiLEk7O2tCQUFuQmYsSyIsImZpbGUiOiJjb3Vwb24tbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbmltcG9ydCB7Zm9ybWF0RGF0ZX0gZnJvbSAnLi4vdXRpbHMvYmFzZS5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LyY5oOg5Yi45YiX6KGoJ1xyXG4gIH07XHJcbiAgZGF0YSA9IHtcclxuICAgICAgaGFzbW9yZTogZmFsc2UsIC8vIOaYr+WQpuacieS4i+S4gOmhtVxyXG4gICAgICBjdXJwYWdlOiAxLCAvL+W9k+WJjemhteaVsFxyXG4gICAgICBwYWdlX3RvdGFsOiAnJywgLy8g5oC76aG15pWwXHJcbiAgICAgIHZvdWNoZXJfbGlzdDogW11cclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBcclxuICB9O1xyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RDb3Vwb25MaXN0KClcclxuICB9XHJcbiAgb25TaG93ICgpIHtcclxuICAgIFxyXG4gIH1cclxuICByZXF1ZXN0Q291cG9uTGlzdCgpIHtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS52b3VjaGVyTGlzdCxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHBhZ2U6IDEwLFxyXG4gICAgICAgIGN1cnBhZ2U6IHRoaXMuY3VycGFnZVxyXG4gICAgICB9LFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdmFyIGxpc3QgPSByZXMuZGF0YXMudm91Y2hlcl9saXN0IHx8IFtdXHJcbiAgICAgICAgbGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgaXRlbS5jb3Vwb25UaW1lID0gYCR7Zm9ybWF0RGF0ZShpdGVtLnZvdWNoZXJfc3RhcnRfZGF0ZSl9IOiHsyAke2Zvcm1hdERhdGUoaXRlbS52b3VjaGVyX2VuZF9kYXRlKX1gXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnZvdWNoZXJfbGlzdCA9IHRoaXMudm91Y2hlcl9saXN0LmNvbmNhdChsaXN0KVxyXG4gICAgICAgIHRoaXMuaGFzbW9yZSA9IHJlcy5oYXNtb3JlXHJcbiAgICAgICAgdGhpcy5wYWdlX3RvdGFsID0gcmVzLnBhZ2VfdG90YWxcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgb25SZWFjaEJvdHRvbSAoKSB7XHJcbiAgICBpZih0aGlzLmhhc21vcmUpIHtcclxuICAgICAgdGhpcy5jdXJwYWdlICsrIFxyXG4gICAgICB0aGlzLnJlcXVlc3RDb3Vwb25MaXN0KClcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19