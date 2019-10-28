'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mask = require('./../components/mask.js');

var _mask2 = _interopRequireDefault(_mask);

var _ajax = require('./../ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var api = require('./../api.js');

var WxParse = require('./../utils/wxParse/wxParse.js');

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
      navigationBarTitleText: '商品详情'
    }, _this.$repeat = {}, _this.$props = { "attrsmask": { "xmlns:v-bind": "", "v-bind:maskFlag.sync": "attrFlag" } }, _this.$events = {}, _this.components = {
      attrsmask: _mask2.default
    }, _this.mixins = [], _this.data = {
      goodsNum: 1,
      attrFlag: false,
      tabList: [{ name: '商品介绍' }, { name: '图文详情' }], // 顶部选项卡
      currentTab: 0, // 顶部选项卡索引
      // 店铺
      flowData: [{
        id: '1',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '/assets/img/image.png'
      }, {
        id: '2',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '/assets/img/image.png'
      }, {
        id: '3',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '/assets/img/image.png'
      }, {
        id: '3',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '/assets/img/image.png'
      }],
      goods_id: null, //商品goods_id
      requestImgUrl: null, //图片域名
      goods_content: null, // 商品内容
      store_info: null, // 店铺信息
      hot_sales: [], //推荐商品列表
      goods_image_mobile: [], // 商品轮播图
      contractlist: {} // 商品服务说明
    }, _this.computed = {}, _this.methods = {
      // 切换顶部导航
      switchNav: function switchNav(idx) {
        this.currentTab = idx;
      },

      // 显示选择商品框
      showAttrMask: function showAttrMask() {
        this.attrFlag = true;
      },
      attrBtnSubmit: function attrBtnSubmit() {
        this.$navigate({ url: '/pages/settlement' });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad(t) {
      var _this2 = this;

      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      this.goods_id = t.goods_id;
      var that = this;
      // 普通商品详情
      (0, _ajax.ajax)({
        url: api.ordinaryGoodsDtail,
        type: 'get',
        data: {
          goods_id: this.goods_id
        }
      }).then(function (res) {
        console.log(res);
        if (res.code == 200) {
          _this2.goods_content = res.datas.goods_content;
          _this2.contractlist = res.datas.goods_content.contractlist || {};
          _this2.goods_image_mobile = res.datas.goods_image_mobile || [];
          _this2.store_info = res.datas.store_info;
          _this2.hot_sales = res.datas.hot_sales;
          _this2.$apply();
          var article = res.datas.goods_content.goods_body;
          article = article.replace(/src="/g, 'src="' + that.requestImgUrl);
          WxParse.wxParse('article', 'html', article, that, 5);
        }
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/shopDetails'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BEZXRhaWxzLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsIm1peGlucyIsImRhdGEiLCJnb29kc051bSIsImF0dHJGbGFnIiwidGFiTGlzdCIsIm5hbWUiLCJjdXJyZW50VGFiIiwiZmxvd0RhdGEiLCJpZCIsInRpdGxlIiwicHJpY2UiLCJleHByaWNlIiwiaW1nIiwiZ29vZHNfaWQiLCJyZXF1ZXN0SW1nVXJsIiwiZ29vZHNfY29udGVudCIsInN0b3JlX2luZm8iLCJob3Rfc2FsZXMiLCJnb29kc19pbWFnZV9tb2JpbGUiLCJjb250cmFjdGxpc3QiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJzd2l0Y2hOYXYiLCJpZHgiLCJzaG93QXR0ck1hc2siLCJhdHRyQnRuU3VibWl0IiwiJG5hdmlnYXRlIiwidXJsIiwiZXZlbnRzIiwidCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidGhhdCIsIm9yZGluYXJ5R29vZHNEdGFpbCIsInR5cGUiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsInJlcyIsImNvZGUiLCJkYXRhcyIsIiRhcHBseSIsImFydGljbGUiLCJnb29kc19ib2R5IiwicmVwbGFjZSIsInd4UGFyc2UiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0FBRUEsSUFBSUMsVUFBVUQsUUFBUSw2QkFBUixDQUFkOztJQUNxQkUsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQWhC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QUFoQixZQUFrQ1osS0FBS2xCLGFBQXZDLENBQVY7QUFDQXhCLGtCQUFRdUQsT0FBUixDQUFnQixTQUFoQixFQUEyQixNQUEzQixFQUFtQ0gsT0FBbkMsRUFBNENWLElBQTVDLEVBQWtELENBQWxEO0FBQ0Q7QUFDRixPQW5CRDtBQXFCRDs7OztFQXRHZ0NjLGVBQUtDLEk7O2tCQUFuQnhELEsiLCJmaWxlIjoic2hvcERldGFpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBtYXNrIGZyb20gJy4uL2NvbXBvbmVudHMvbWFzayc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG52YXIgV3hQYXJzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL3d4UGFyc2Uvd3hQYXJzZS5qcycpO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeivpuaDhSdcclxuICB9O1xyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJhdHRyc21hc2tcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm1hc2tGbGFnLnN5bmNcIjpcImF0dHJGbGFnXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIGF0dHJzbWFzazogbWFza1xyXG4gIH07XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgZ29vZHNOdW06IDEsXHJcbiAgICBhdHRyRmxhZzogZmFsc2UsXHJcbiAgICB0YWJMaXN0OiBbeyBuYW1lOiAn5ZWG5ZOB5LuL57uNJ30sIHsgbmFtZTogJ+WbvuaWh+ivpuaDhScgfV0sIC8vIOmhtumDqOmAiemhueWNoVxyXG4gICAgY3VycmVudFRhYjogMCwgLy8g6aG26YOo6YCJ6aG55Y2h57Si5byVXHJcbiAgICAvLyDlupfpk7pcclxuICAgIGZsb3dEYXRhOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzEnLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UucG5nJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICcyJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJy9hc3NldHMvaW1nL2ltYWdlLnBuZydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnMycsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZS5wbmcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzMnLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UucG5nJ1xyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgZ29vZHNfaWQ6IG51bGwsIC8v5ZWG5ZOBZ29vZHNfaWRcclxuICAgIHJlcXVlc3RJbWdVcmw6IG51bGwsIC8v5Zu+54mH5Z+f5ZCNXHJcbiAgICBnb29kc19jb250ZW50OiBudWxsLCAvLyDllYblk4HlhoXlrrlcclxuICAgIHN0b3JlX2luZm86IG51bGwsIC8vIOW6l+mTuuS/oeaBr1xyXG4gICAgaG90X3NhbGVzOiBbXSwgLy/mjqjojZDllYblk4HliJfooahcclxuICAgIGdvb2RzX2ltYWdlX21vYmlsZTogW10sIC8vIOWVhuWTgei9ruaSreWbvlxyXG4gICAgY29udHJhY3RsaXN0OiB7fSwgLy8g5ZWG5ZOB5pyN5Yqh6K+05piOXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBvblNob3coKSB7fVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAvLyDliIfmjaLpobbpg6jlr7zoiKpcclxuICAgIHN3aXRjaE5hdihpZHgpIHtcclxuICAgICAgdGhpcy5jdXJyZW50VGFiID0gaWR4O1xyXG4gICAgfSxcclxuICAgIC8vIOaYvuekuumAieaLqeWVhuWTgeahhlxyXG4gICAgc2hvd0F0dHJNYXNrKCkge1xyXG4gICAgICB0aGlzLmF0dHJGbGFnID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBhdHRyQnRuU3VibWl0KCkge1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogJy9wYWdlcy9zZXR0bGVtZW50JyB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuXHJcbiAgb25Mb2FkKHQpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICB0aGlzLmdvb2RzX2lkID0gdC5nb29kc19pZDtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIC8vIOaZrumAmuWVhuWTgeivpuaDhVxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm9yZGluYXJ5R29vZHNEdGFpbCxcclxuICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBnb29kc19pZDogdGhpcy5nb29kc19pZFxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHRoaXMuZ29vZHNfY29udGVudCA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50XHJcbiAgICAgICAgdGhpcy5jb250cmFjdGxpc3QgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudC5jb250cmFjdGxpc3QgfHwge31cclxuICAgICAgICB0aGlzLmdvb2RzX2ltYWdlX21vYmlsZSA9IHJlcy5kYXRhcy5nb29kc19pbWFnZV9tb2JpbGUgfHwgW11cclxuICAgICAgICB0aGlzLnN0b3JlX2luZm8gPSByZXMuZGF0YXMuc3RvcmVfaW5mb1xyXG4gICAgICAgIHRoaXMuaG90X3NhbGVzID0gcmVzLmRhdGFzLmhvdF9zYWxlc1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB2YXIgYXJ0aWNsZSA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50Lmdvb2RzX2JvZHlcclxuICAgICAgICBhcnRpY2xlID0gYXJ0aWNsZS5yZXBsYWNlKC9zcmM9XCIvZywgYHNyYz1cIiR7dGhhdC5yZXF1ZXN0SW1nVXJsfWApO1xyXG4gICAgICAgIFd4UGFyc2Uud3hQYXJzZSgnYXJ0aWNsZScsICdodG1sJywgYXJ0aWNsZSwgdGhhdCwgNSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB9XHJcbn1cclxuIl19