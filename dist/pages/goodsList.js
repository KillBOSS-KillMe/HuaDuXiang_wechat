'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../ajax.js');

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
      navigationBarTitleText: '商品列表'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      requestImgUrl: '',
      listData: {},
      curpage: 1,
      hasmore: false, // 是否有下一页
      goods_list: [],
      page_total: null // 总页数
    }, _this.computed = {}, _this.methods = {
      navShopDetails: function navShopDetails(goods_id, sale_type) {
        //common普通，rushsale秒杀，group团购，advsales预售，freesales砍价
        if (sale_type == 'rushsales') {
          this.$navigate('/pages/seckillShopDetails?goods_id=' + goods_id);
        } else {
          this.$navigate('/pages/shopDetails?goods_id=' + goods_id);
        }
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      console.log(options);
      this.listData = options;
      this.$apply();
      this.requestList();
    }
  }, {
    key: 'requestList',
    value: function requestList() {
      var _this2 = this;

      (0, _ajax.ajax)({
        url: api.indexGoodsList,
        data: _extends({
          page: 10,
          curpage: this.curpage
        }, this.listData)
      }).then(function (res) {
        var list = res.datas.goods_list || [];
        _this2.goods_list = _this2.goods_list.concat(list);
        _this2.hasmore = res.hasmore;
        _this2.page_total = res.page_total;
        _this2.$apply();
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.hasmore) {
        this.curpage++;
        this.requestList();
      }
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/goodsList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RzTGlzdC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwibGlzdERhdGEiLCJjdXJwYWdlIiwiaGFzbW9yZSIsImdvb2RzX2xpc3QiLCJwYWdlX3RvdGFsIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibmF2U2hvcERldGFpbHMiLCJnb29kc19pZCIsInNhbGVfdHlwZSIsIiRuYXZpZ2F0ZSIsImV2ZW50cyIsIm9wdGlvbnMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJyZXF1ZXN0TGlzdCIsInVybCIsImluZGV4R29vZHNMaXN0IiwicGFnZSIsInRoZW4iLCJsaXN0IiwicmVzIiwiZGF0YXMiLCJjb25jYXQiLCJ3ZXB5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFHcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxxQkFBZSxFQURWO0FBRUxDLGdCQUFVLEVBRkw7QUFHTEMsZUFBUyxDQUhKO0FBSUxDLGVBQVMsS0FKSixFQUlXO0FBQ2hCQyxrQkFBWSxFQUxQO0FBTUxDLGtCQUFZLElBTlAsQ0FNYTtBQU5iLEssUUFTUEMsUSxHQUFXLEUsUUF5QlhDLE8sR0FBVTtBQUNSQyxvQkFEUSwwQkFDT0MsUUFEUCxFQUNpQkMsU0FEakIsRUFDNEI7QUFDbEM7QUFDQSxZQUFHQSxhQUFhLFdBQWhCLEVBQTZCO0FBQzNCLGVBQUtDLFNBQUwseUNBQXFERixRQUFyRDtBQUNELFNBRkQsTUFFTztBQUNMLGVBQUtFLFNBQUwsa0NBQThDRixRQUE5QztBQUNEO0FBQ0Y7QUFSTyxLLFFBV1ZHLE0sR0FBUyxFOzs7OzsyQkFuQ0ZDLE8sRUFBUztBQUNkLFdBQUtiLGFBQUwsR0FBcUIsS0FBS2MsT0FBTCxDQUFhQyxVQUFiLENBQXdCZixhQUE3QztBQUNBZ0IsY0FBUUMsR0FBUixDQUFZSixPQUFaO0FBQ0EsV0FBS1osUUFBTCxHQUFnQlksT0FBaEI7QUFDQSxXQUFLSyxNQUFMO0FBQ0EsV0FBS0MsV0FBTDtBQUNEOzs7a0NBQ2E7QUFBQTs7QUFDWixzQkFBSztBQUNIQyxhQUFLNUIsSUFBSTZCLGNBRE47QUFFSHRCO0FBQ0V1QixnQkFBTSxFQURSO0FBRUVwQixtQkFBUyxLQUFLQTtBQUZoQixXQUdLLEtBQUtELFFBSFY7QUFGRyxPQUFMLEVBT0dzQixJQVBILENBT1EsZUFBTztBQUNYLFlBQUlDLE9BQU9DLElBQUlDLEtBQUosQ0FBVXRCLFVBQVYsSUFBd0IsRUFBbkM7QUFDQSxlQUFLQSxVQUFMLEdBQWtCLE9BQUtBLFVBQUwsQ0FBZ0J1QixNQUFoQixDQUF1QkgsSUFBdkIsQ0FBbEI7QUFDQSxlQUFLckIsT0FBTCxHQUFlc0IsSUFBSXRCLE9BQW5CO0FBQ0EsZUFBS0UsVUFBTCxHQUFrQm9CLElBQUlwQixVQUF0QjtBQUNBLGVBQUthLE1BQUw7QUFDSCxPQWJEO0FBY0Q7Ozs2QkFDUSxDQUFFOzs7b0NBYU07QUFDZixVQUFHLEtBQUtmLE9BQVIsRUFBaUI7QUFDZixhQUFLRCxPQUFMO0FBQ0EsYUFBS2lCLFdBQUw7QUFDRDtBQUNGOzs7O0VBM0RnQ1MsZUFBS04sSTs7a0JBQW5CNUIsSyIsImZpbGUiOiJnb29kc0xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4HliJfooagnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBsaXN0RGF0YToge30sXHJcbiAgICBjdXJwYWdlOiAxLFxyXG4gICAgaGFzbW9yZTogZmFsc2UsIC8vIOaYr+WQpuacieS4i+S4gOmhtVxyXG4gICAgZ29vZHNfbGlzdDogW10sXHJcbiAgICBwYWdlX3RvdGFsOiBudWxsICAvLyDmgLvpobXmlbBcclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgY29uc29sZS5sb2cob3B0aW9ucylcclxuICAgIHRoaXMubGlzdERhdGEgPSBvcHRpb25zXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB0aGlzLnJlcXVlc3RMaXN0KClcclxuICB9XHJcbiAgcmVxdWVzdExpc3QoKSB7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuaW5kZXhHb29kc0xpc3QsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBwYWdlOiAxMCxcclxuICAgICAgICBjdXJwYWdlOiB0aGlzLmN1cnBhZ2UsXHJcbiAgICAgICAgLi4udGhpcy5saXN0RGF0YVxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgdmFyIGxpc3QgPSByZXMuZGF0YXMuZ29vZHNfbGlzdCB8fCBbXVxyXG4gICAgICAgIHRoaXMuZ29vZHNfbGlzdCA9IHRoaXMuZ29vZHNfbGlzdC5jb25jYXQobGlzdClcclxuICAgICAgICB0aGlzLmhhc21vcmUgPSByZXMuaGFzbW9yZVxyXG4gICAgICAgIHRoaXMucGFnZV90b3RhbCA9IHJlcy5wYWdlX3RvdGFsXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIG9uU2hvdygpIHt9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIG5hdlNob3BEZXRhaWxzKGdvb2RzX2lkLCBzYWxlX3R5cGUpIHtcclxuICAgICAgLy9jb21tb27mma7pgJrvvIxydXNoc2FsZeenkuadgO+8jGdyb3Vw5Zui6LSt77yMYWR2c2FsZXPpooTllK7vvIxmcmVlc2FsZXPnoI3ku7dcclxuICAgICAgaWYoc2FsZV90eXBlID09ICdydXNoc2FsZXMnKSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoYC9wYWdlcy9zZWNraWxsU2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZShgL3BhZ2VzL3Nob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgIGlmKHRoaXMuaGFzbW9yZSkge1xyXG4gICAgICB0aGlzLmN1cnBhZ2UgKysgXHJcbiAgICAgIHRoaXMucmVxdWVzdExpc3QoKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=