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

var _base = require('./../utils/base.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var timer = require('./../utils/wxTimer.js'); // 倒计时
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
      tabList: [{ name: '商品介绍', dotNum: 2 }, { name: '图文详情', dotNum: 3 }], // 顶部选项卡
      currentTab: 0, // 顶部选项卡索引
      wxTimerList: {}, // 倒计时
      goods_id: null, //商品goods_id
      requestImgUrl: null, //图片域名
      goods_content: null, // 商品内容
      store_info: null, // 店铺信息
      hot_sales: [], //推荐商品列表
      image_list: [], // 商品轮播图
      contractlist: {}, // 商品服务说明
      attr: [], // 商品总属性数组
      activeAttr: [], // 当前点击属性数组
      goods_spec: [], // 默认属性数组
      spec_list: {} // 所有属性对应的商品goods_id

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
      this.goods_id = t.goods_id;
      this.$apply();
      // 倒计时s
      var wxTimer = new timer({
        beginTime: '10',
        name: 'firstTimer',
        complete: function complete() {}
      });
      wxTimer.start(this);
      // setTimeout(() => {
      //   wxTimer.stop();
      // }, 5000);
      // 倒计时e
      this.getShopDetails();
    }
  }, {
    key: 'getShopDetails',
    value: function getShopDetails() {
      var _this2 = this;

      var that = this;
      // 普通商品详情
      (0, _ajax.ajax)({
        url: api.ordinaryGoodsDtail,
        type: 'get',
        data: {
          goods_id: this.goods_id
        }
      }).then(function (res) {
        if (res.code == 200) {
          _this2.goods_content = res.datas.goods_content;
          _this2.contractlist = res.datas.goods_content.contractlist || {};
          _this2.image_list = res.datas.image_list || [];
          _this2.store_info = res.datas.store_info;
          _this2.hot_sales = res.datas.hot_sales;
          // 商品属性
          return false;
          var spec_name = Object.values(res.datas.goods_content.spec_name);
          var spec_value = Object.values(res.datas.goods_content.spec_value);
          var attr = [];
          spec_value.forEach(function (item, index) {
            if (!attr[index]) {
              attr[index] = {};
            }
            attr[index].title = spec_name[index];
            attr[index].prop = item;
          });
          _this2.attr = attr;
          console.log(attr);
          _this2.goods_spec = Object.values(res.datas.goods_content.goods_spec);
          _this2.activeAttr = Object.keys(res.datas.goods_content.goods_spec);
          _this2.spec_list = res.datas.spec_list;
          _this2.$apply();
          var article = res.datas.goods_content.goods_body;
          // article = article.replace(/src="/g, `src="${that.requestImgUrl}`);
          WxParse.wxParse('article', 'html', article, that, 5);
        }
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/seckillShopDetails'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY2tpbGxTaG9wRGV0YWlscy5qcyJdLCJuYW1lcyI6WyJ0aW1lciIsInJlcXVpcmUiLCJhcGkiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsIm1peGlucyIsImRhdGEiLCJnb29kc051bSIsImF0dHJGbGFnIiwidGFiTGlzdCIsIm5hbWUiLCJkb3ROdW0iLCJjdXJyZW50VGFiIiwid3hUaW1lckxpc3QiLCJnb29kc19pZCIsInJlcXVlc3RJbWdVcmwiLCJnb29kc19jb250ZW50Iiwic3RvcmVfaW5mbyIsImhvdF9zYWxlcyIsImltYWdlX2xpc3QiLCJjb250cmFjdGxpc3QiLCJhdHRyIiwiYWN0aXZlQXR0ciIsImdvb2RzX3NwZWMiLCJzcGVjX2xpc3QiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJzd2l0Y2hOYXYiLCJpZHgiLCJzaG93QXR0ck1hc2siLCJhdHRyQnRuU3VibWl0IiwiJG5hdmlnYXRlIiwidXJsIiwiZXZlbnRzIiwidCIsIiRhcHBseSIsInd4VGltZXIiLCJiZWdpblRpbWUiLCJjb21wbGV0ZSIsInN0YXJ0IiwiZ2V0U2hvcERldGFpbHMiLCJ0aGF0Iiwib3JkaW5hcnlHb29kc0R0YWlsIiwidHlwZSIsInRoZW4iLCJyZXMiLCJjb2RlIiwiZGF0YXMiLCJzcGVjX25hbWUiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzcGVjX3ZhbHVlIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsInRpdGxlIiwicHJvcCIsImNvbnNvbGUiLCJsb2ciLCJrZXlzIiwiYXJ0aWNsZSIsImdvb2RzX2JvZHkiLCJ3eFBhcnNlIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7QUFDQTs7Ozs7Ozs7OztBQUhBLElBQUlBLFFBQVFDLFFBQVEscUJBQVIsQ0FB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aG9wRGV0YWlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG1hc2sgZnJvbSAnLi4vY29tcG9uZW50cy9tYXNrJztcclxudmFyIHRpbWVyID0gcmVxdWlyZSgnLi4vdXRpbHMvd3hUaW1lci5qcycpOyAvLyDlgJLorqHml7ZcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICcuLi91dGlscy9iYXNlLmpzJztcclxudmFyIFd4UGFyc2UgPSByZXF1aXJlKCcuLi91dGlscy93eFBhcnNlL3d4UGFyc2UuanMnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImF0dHJzbWFza1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiYXR0ckZsYWdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgYXR0cnNtYXNrOiBtYXNrXHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBnb29kc051bTogMSxcclxuICAgIGF0dHJGbGFnOiBmYWxzZSxcclxuICAgIHRhYkxpc3Q6IFt7IG5hbWU6ICfllYblk4Hku4vnu40nLCBkb3ROdW06IDIgfSwgeyBuYW1lOiAn5Zu+5paH6K+m5oOFJywgZG90TnVtOiAzIH1dLCAvLyDpobbpg6jpgInpobnljaFcclxuICAgIGN1cnJlbnRUYWI6IDAsIC8vIOmhtumDqOmAiemhueWNoee0ouW8lVxyXG4gICAgd3hUaW1lckxpc3Q6IHt9LCAvLyDlgJLorqHml7ZcclxuICAgIGdvb2RzX2lkOiBudWxsLCAvL+WVhuWTgWdvb2RzX2lkXHJcbiAgICByZXF1ZXN0SW1nVXJsOiBudWxsLCAvL+WbvueJh+Wfn+WQjVxyXG4gICAgZ29vZHNfY29udGVudDogbnVsbCwgLy8g5ZWG5ZOB5YaF5a65XHJcbiAgICBzdG9yZV9pbmZvOiBudWxsLCAvLyDlupfpk7rkv6Hmga9cclxuICAgIGhvdF9zYWxlczogW10sIC8v5o6o6I2Q5ZWG5ZOB5YiX6KGoXHJcbiAgICBpbWFnZV9saXN0OiBbXSwgLy8g5ZWG5ZOB6L2u5pKt5Zu+XHJcbiAgICBjb250cmFjdGxpc3Q6IHt9LCAvLyDllYblk4HmnI3liqHor7TmmI5cclxuICAgIGF0dHI6IFtdLCAgLy8g5ZWG5ZOB5oC75bGe5oCn5pWw57uEXHJcbiAgICBhY3RpdmVBdHRyOiBbXSwgLy8g5b2T5YmN54K55Ye75bGe5oCn5pWw57uEXHJcbiAgICBnb29kc19zcGVjOiBbXSwgLy8g6buY6K6k5bGe5oCn5pWw57uEXHJcbiAgICBzcGVjX2xpc3Q6IHt9IC8vIOaJgOacieWxnuaAp+WvueW6lOeahOWVhuWTgWdvb2RzX2lkXHJcblxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25TaG93KCkge31cclxuICBtZXRob2RzID0ge1xyXG4gICAgLy8g5YiH5o2i6aG26YOo5a+86IiqXHJcbiAgICBzd2l0Y2hOYXYoaWR4KSB7XHJcbiAgICAgIHRoaXMuY3VycmVudFRhYiA9IGlkeDtcclxuICAgIH0sXHJcbiAgICAvLyDmmL7npLrpgInmi6nllYblk4HmoYZcclxuICAgIHNob3dBdHRyTWFzayAoKSB7XHJcbiAgICAgIHRoaXMuYXR0ckZsYWcgPSB0cnVlXHJcbiAgICB9LFxyXG4gICAgYXR0ckJ0blN1Ym1pdCgpe1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7dXJsOiAnL3BhZ2VzL3NldHRsZW1lbnQnfSlcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuXHJcbiAgb25Mb2FkKHQpIHtcclxuICAgIHRoaXMuZ29vZHNfaWQgPSB0Lmdvb2RzX2lkO1xyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgLy8g5YCS6K6h5pe2c1xyXG4gICAgdmFyIHd4VGltZXIgPSBuZXcgdGltZXIoe1xyXG4gICAgICBiZWdpblRpbWU6ICcxMCcsXHJcbiAgICAgIG5hbWU6ICdmaXJzdFRpbWVyJyxcclxuICAgICAgY29tcGxldGUoKSB7fVxyXG4gICAgfSk7XHJcbiAgICB3eFRpbWVyLnN0YXJ0KHRoaXMpO1xyXG4gICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAvLyAgIHd4VGltZXIuc3RvcCgpO1xyXG4gICAgLy8gfSwgNTAwMCk7XHJcbiAgICAvLyDlgJLorqHml7ZlXHJcbiAgICB0aGlzLmdldFNob3BEZXRhaWxzKClcclxuICB9XHJcblxyXG4gIGdldFNob3BEZXRhaWxzKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgLy8g5pmu6YCa5ZWG5ZOB6K+m5oOFXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkub3JkaW5hcnlHb29kc0R0YWlsLFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGdvb2RzX2lkOiB0aGlzLmdvb2RzX2lkXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc19jb250ZW50ID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnRcclxuICAgICAgICB0aGlzLmNvbnRyYWN0bGlzdCA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50LmNvbnRyYWN0bGlzdCB8fCB7fVxyXG4gICAgICAgIHRoaXMuaW1hZ2VfbGlzdCA9IHJlcy5kYXRhcy5pbWFnZV9saXN0IHx8IFtdXHJcbiAgICAgICAgdGhpcy5zdG9yZV9pbmZvID0gcmVzLmRhdGFzLnN0b3JlX2luZm9cclxuICAgICAgICB0aGlzLmhvdF9zYWxlcyA9IHJlcy5kYXRhcy5ob3Rfc2FsZXNcclxuICAgICAgICAvLyDllYblk4HlsZ7mgKdcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB2YXIgc3BlY19uYW1lID0gT2JqZWN0LnZhbHVlcyhyZXMuZGF0YXMuZ29vZHNfY29udGVudC5zcGVjX25hbWUpXHJcbiAgICAgICAgdmFyIHNwZWNfdmFsdWUgPSBPYmplY3QudmFsdWVzKHJlcy5kYXRhcy5nb29kc19jb250ZW50LnNwZWNfdmFsdWUpXHJcbiAgICAgICAgdmFyIGF0dHIgPSBbXVxyXG4gICAgICAgIHNwZWNfdmFsdWUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGlmKCFhdHRyW2luZGV4XSkge1xyXG4gICAgICAgICAgICBhdHRyW2luZGV4XSA9IHt9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBhdHRyW2luZGV4XS50aXRsZSA9IHNwZWNfbmFtZVtpbmRleF0gXHJcbiAgICAgICAgICBhdHRyW2luZGV4XS5wcm9wID0gaXRlbVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5hdHRyID0gYXR0clxyXG4gICAgICAgIGNvbnNvbGUubG9nKGF0dHIpXHJcbiAgICAgICAgdGhpcy5nb29kc19zcGVjID0gT2JqZWN0LnZhbHVlcyhyZXMuZGF0YXMuZ29vZHNfY29udGVudC5nb29kc19zcGVjKVxyXG4gICAgICAgIHRoaXMuYWN0aXZlQXR0ciA9IE9iamVjdC5rZXlzKHJlcy5kYXRhcy5nb29kc19jb250ZW50Lmdvb2RzX3NwZWMpXHJcbiAgICAgICAgdGhpcy5zcGVjX2xpc3QgPSByZXMuZGF0YXMuc3BlY19saXN0XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIHZhciBhcnRpY2xlID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuZ29vZHNfYm9keVxyXG4gICAgICAgIC8vIGFydGljbGUgPSBhcnRpY2xlLnJlcGxhY2UoL3NyYz1cIi9nLCBgc3JjPVwiJHt0aGF0LnJlcXVlc3RJbWdVcmx9YCk7XHJcbiAgICAgICAgV3hQYXJzZS53eFBhcnNlKCdhcnRpY2xlJywgJ2h0bWwnLCBhcnRpY2xlLCB0aGF0LCA1KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==