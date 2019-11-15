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
        if (sale_type == 'common') {
          this.$navigate('shopDetails?goods_id=' + goods_id + '&sale_type=' + sale_type);
        }
        if (sale_type == 'rushsales') {
          this.$navigate('seckillShopDetails?goods_id=' + goods_id + '&sale_type=' + sale_type);
        }
        if (sale_type == 'group') {
          this.$navigate('assembleShopDetails?goods_id=' + goods_id + '&sale_type=' + sale_type);
        }
        if (sale_type == 'advsales') {
          this.$navigate('preShopDetails?goods_id=' + goods_id + '&sale_type=' + sale_type);
        }
        // if(sale_type == 'freesales') {
        //   this.$navigate(`shopDetails?goods_id=${goods_id}&sale_type=${sale_type}`);
        // }
        console.log(sale_type == 'freesales', sale_type);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RzTGlzdC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwibGlzdERhdGEiLCJjdXJwYWdlIiwiaGFzbW9yZSIsImdvb2RzX2xpc3QiLCJwYWdlX3RvdGFsIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibmF2U2hvcERldGFpbHMiLCJnb29kc19pZCIsInNhbGVfdHlwZSIsIiRuYXZpZ2F0ZSIsImNvbnNvbGUiLCJsb2ciLCJldmVudHMiLCJvcHRpb25zIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCIkYXBwbHkiLCJyZXF1ZXN0TGlzdCIsInVybCIsImluZGV4R29vZHNMaXN0IiwicGFnZSIsInRoZW4iLCJsaXN0IiwicmVzIiwiZGF0YXMiLCJjb25jYXQiLCJ3ZXB5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFHcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxxQkFBZSxFQURWO0FBRUxDLGdCQUFVLEVBRkw7QUFHTEMsZUFBUyxDQUhKO0FBSUxDLGVBQVMsS0FKSixFQUlXO0FBQ2hCQyxrQkFBWSxFQUxQO0FBTUxDLGtCQUFZLElBTlAsQ0FNYTtBQU5iLEssUUFTUEMsUSxHQUFXLEUsUUF5QlhDLE8sR0FBVTtBQUNSQyxvQkFEUSwwQkFDT0MsUUFEUCxFQUNpQkMsU0FEakIsRUFDNEI7QUFDbEM7QUFDQSxZQUFHQSxhQUFhLFFBQWhCLEVBQTBCO0FBQ3hCLGVBQUtDLFNBQUwsMkJBQXVDRixRQUF2QyxtQkFBNkRDLFNBQTdEO0FBQ0Q7QUFDRCxZQUFHQSxhQUFhLFdBQWhCLEVBQTZCO0FBQzNCLGVBQUtDLFNBQUwsa0NBQThDRixRQUE5QyxtQkFBb0VDLFNBQXBFO0FBQ0Q7QUFDRCxZQUFHQSxhQUFhLE9BQWhCLEVBQXlCO0FBQ3ZCLGVBQUtDLFNBQUwsbUNBQStDRixRQUEvQyxtQkFBcUVDLFNBQXJFO0FBQ0Q7QUFDRCxZQUFHQSxhQUFhLFVBQWhCLEVBQTRCO0FBQzFCLGVBQUtDLFNBQUwsOEJBQTBDRixRQUExQyxtQkFBZ0VDLFNBQWhFO0FBQ0Q7QUFDRDtBQUNBO0FBQ0E7QUFDQUUsZ0JBQVFDLEdBQVIsQ0FBWUgsYUFBYSxXQUF6QixFQUFzQ0EsU0FBdEM7QUFDRDtBQW5CTyxLLFFBc0JWSSxNLEdBQVMsRTs7Ozs7MkJBOUNGQyxPLEVBQVM7QUFDZCxXQUFLZixhQUFMLEdBQXFCLEtBQUtnQixPQUFMLENBQWFDLFVBQWIsQ0FBd0JqQixhQUE3QztBQUNBWSxjQUFRQyxHQUFSLENBQVlFLE9BQVo7QUFDQSxXQUFLZCxRQUFMLEdBQWdCYyxPQUFoQjtBQUNBLFdBQUtHLE1BQUw7QUFDQSxXQUFLQyxXQUFMO0FBQ0Q7OztrQ0FDYTtBQUFBOztBQUNaLHNCQUFLO0FBQ0hDLGFBQUs1QixJQUFJNkIsY0FETjtBQUVIdEI7QUFDRXVCLGdCQUFNLEVBRFI7QUFFRXBCLG1CQUFTLEtBQUtBO0FBRmhCLFdBR0ssS0FBS0QsUUFIVjtBQUZHLE9BQUwsRUFPR3NCLElBUEgsQ0FPUSxlQUFPO0FBQ1gsWUFBSUMsT0FBT0MsSUFBSUMsS0FBSixDQUFVdEIsVUFBVixJQUF3QixFQUFuQztBQUNBLGVBQUtBLFVBQUwsR0FBa0IsT0FBS0EsVUFBTCxDQUFnQnVCLE1BQWhCLENBQXVCSCxJQUF2QixDQUFsQjtBQUNBLGVBQUtyQixPQUFMLEdBQWVzQixJQUFJdEIsT0FBbkI7QUFDQSxlQUFLRSxVQUFMLEdBQWtCb0IsSUFBSXBCLFVBQXRCO0FBQ0EsZUFBS2EsTUFBTDtBQUNILE9BYkQ7QUFjRDs7OzZCQUNRLENBQUU7OztvQ0F3Qk07QUFDZixVQUFHLEtBQUtmLE9BQVIsRUFBaUI7QUFDZixhQUFLRCxPQUFMO0FBQ0EsYUFBS2lCLFdBQUw7QUFDRDtBQUNGOzs7O0VBdEVnQ1MsZUFBS04sSTs7a0JBQW5CNUIsSyIsImZpbGUiOiJnb29kc0xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4HliJfooagnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBsaXN0RGF0YToge30sXHJcbiAgICBjdXJwYWdlOiAxLFxyXG4gICAgaGFzbW9yZTogZmFsc2UsIC8vIOaYr+WQpuacieS4i+S4gOmhtVxyXG4gICAgZ29vZHNfbGlzdDogW10sXHJcbiAgICBwYWdlX3RvdGFsOiBudWxsICAvLyDmgLvpobXmlbBcclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgY29uc29sZS5sb2cob3B0aW9ucylcclxuICAgIHRoaXMubGlzdERhdGEgPSBvcHRpb25zXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB0aGlzLnJlcXVlc3RMaXN0KClcclxuICB9XHJcbiAgcmVxdWVzdExpc3QoKSB7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuaW5kZXhHb29kc0xpc3QsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBwYWdlOiAxMCxcclxuICAgICAgICBjdXJwYWdlOiB0aGlzLmN1cnBhZ2UsXHJcbiAgICAgICAgLi4udGhpcy5saXN0RGF0YVxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgdmFyIGxpc3QgPSByZXMuZGF0YXMuZ29vZHNfbGlzdCB8fCBbXVxyXG4gICAgICAgIHRoaXMuZ29vZHNfbGlzdCA9IHRoaXMuZ29vZHNfbGlzdC5jb25jYXQobGlzdClcclxuICAgICAgICB0aGlzLmhhc21vcmUgPSByZXMuaGFzbW9yZVxyXG4gICAgICAgIHRoaXMucGFnZV90b3RhbCA9IHJlcy5wYWdlX3RvdGFsXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIG9uU2hvdygpIHt9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIG5hdlNob3BEZXRhaWxzKGdvb2RzX2lkLCBzYWxlX3R5cGUpIHtcclxuICAgICAgLy9jb21tb27mma7pgJrvvIxydXNoc2FsZeenkuadgO+8jGdyb3Vw5Zui6LSt77yMYWR2c2FsZXPpooTllK7vvIxmcmVlc2FsZXPnoI3ku7dcclxuICAgICAgaWYoc2FsZV90eXBlID09ICdjb21tb24nKSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoYHNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9JnNhbGVfdHlwZT0ke3NhbGVfdHlwZX1gKTtcclxuICAgICAgfVxyXG4gICAgICBpZihzYWxlX3R5cGUgPT0gJ3J1c2hzYWxlcycpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZShgc2Vja2lsbFNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9JnNhbGVfdHlwZT0ke3NhbGVfdHlwZX1gKTtcclxuICAgICAgfVxyXG4gICAgICBpZihzYWxlX3R5cGUgPT0gJ2dyb3VwJykge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKGBhc3NlbWJsZVNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9JnNhbGVfdHlwZT0ke3NhbGVfdHlwZX1gKTtcclxuICAgICAgfVxyXG4gICAgICBpZihzYWxlX3R5cGUgPT0gJ2FkdnNhbGVzJykge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKGBwcmVTaG9wRGV0YWlscz9nb29kc19pZD0ke2dvb2RzX2lkfSZzYWxlX3R5cGU9JHtzYWxlX3R5cGV9YCk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gaWYoc2FsZV90eXBlID09ICdmcmVlc2FsZXMnKSB7XHJcbiAgICAgIC8vICAgdGhpcy4kbmF2aWdhdGUoYHNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9JnNhbGVfdHlwZT0ke3NhbGVfdHlwZX1gKTtcclxuICAgICAgLy8gfVxyXG4gICAgICBjb25zb2xlLmxvZyhzYWxlX3R5cGUgPT0gJ2ZyZWVzYWxlcycsIHNhbGVfdHlwZSlcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgIGlmKHRoaXMuaGFzbW9yZSkge1xyXG4gICAgICB0aGlzLmN1cnBhZ2UgKysgXHJcbiAgICAgIHRoaXMucmVxdWVzdExpc3QoKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=