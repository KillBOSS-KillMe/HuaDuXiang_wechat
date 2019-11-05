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
      goods_id: null, //商品goods_id
      requestImgUrl: null, //图片域名
      goods_content: null, // 商品内容
      store_info: null, // 店铺信息
      hot_sales: [], //推荐商品列表
      goods_image_mobile: [], // 商品轮播图
      contractlist: {}, // 商品服务说明
      attr: [{ title: '大小', prop: ['s', 'x', 'xl', 'xll'] }, { title: '颜色', prop: ['红色', '黑色', '白色', '黄色'] }]
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
        var _this2 = this;

        var propArr = this.attr.filter(function (item) {
          return item.active;
        }).map(function (item) {
          return item.active;
        });
        if (propArr.length !== this.attr.length) {
          wx.showToast({
            title: '请选择商品规格',
            icon: 'none'
          });
          return false;
        }
        var app = this.$parent;
        var goods_id = this.goods_id;
        var goodsNum = this.goodsNum;
        var cart_id = goods_id + '|' + goodsNum;
        (0, _ajax.ajax)({
          url: api.memberBuyOne,
          data: {
            cart_id: cart_id
          }
        }).then(function (res) {
          if (res.code == 200) {
            res.datas.cart_id = cart_id;
            app.globalData.orderInfo = res.datas;
            _this2.$navigate({ url: '/pages/settlement' });
          }
        });
      },
      addNum: function addNum() {
        this.goodsNum++;
      },
      reduNum: function reduNum() {
        if (this.goodsNum <= 1) {
          this.goodsNum = 1;
          return false;
        }
        this.goodsNum--;
      },
      changeAttr: function changeAttr(one, two) {
        this.attr.forEach(function (item, index) {
          if (one == index) {
            item.active = item.prop[two];
          }
        });
      },
      addCart: function addCart() {
        var _this3 = this;

        var that = this;
        (0, _ajax.ajax)({
          url: api.cartAdd,
          data: {
            goods_id: this.goods_id,
            quantity: this.goodsNum
          }
        }).then(function (res) {
          if (res.datas.state == 1) {
            wx.showToast({
              title: '添加成功'
            });
            _this3.attrFlag = false;
            _this3.$apply();
          } else {
            wx.showToast({
              title: res.datas.error,
              icon: 'none'
            });
          }
        });
      },
      navGoodsDetails: function navGoodsDetails(goods_id) {
        this.$redirect({ url: 'shopDetails?goods_id=' + goods_id });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      console.log(999);
    }
  }, {
    key: 'onLoad',
    value: function onLoad(t) {
      var _this4 = this;

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
        if (res.code == 200) {
          _this4.goods_content = res.datas.goods_content;
          _this4.contractlist = res.datas.goods_content.contractlist || {};
          _this4.goods_image_mobile = res.datas.goods_image_mobile || [];
          _this4.store_info = res.datas.store_info;
          _this4.hot_sales = res.datas.hot_sales;
          _this4.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BEZXRhaWxzLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsIm1peGlucyIsImRhdGEiLCJnb29kc051bSIsImF0dHJGbGFnIiwidGFiTGlzdCIsIm5hbWUiLCJjdXJyZW50VGFiIiwiZ29vZHNfaWQiLCJyZXF1ZXN0SW1nVXJsIiwiZ29vZHNfY29udGVudCIsInN0b3JlX2luZm8iLCJob3Rfc2FsZXMiLCJnb29kc19pbWFnZV9tb2JpbGUiLCJjb250cmFjdGxpc3QiLCJhdHRyIiwidGl0bGUiLCJwcm9wIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic3dpdGNoTmF2IiwiaWR4Iiwic2hvd0F0dHJNYXNrIiwiYXR0ckJ0blN1Ym1pdCIsInByb3BBcnIiLCJmaWx0ZXIiLCJpdGVtIiwiYWN0aXZlIiwibWFwIiwibGVuZ3RoIiwid3giLCJzaG93VG9hc3QiLCJpY29uIiwiYXBwIiwiJHBhcmVudCIsImNhcnRfaWQiLCJ1cmwiLCJtZW1iZXJCdXlPbmUiLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwiZ2xvYmFsRGF0YSIsIm9yZGVySW5mbyIsIiRuYXZpZ2F0ZSIsImFkZE51bSIsInJlZHVOdW0iLCJjaGFuZ2VBdHRyIiwib25lIiwidHdvIiwiZm9yRWFjaCIsImluZGV4IiwiYWRkQ2FydCIsInRoYXQiLCJjYXJ0QWRkIiwicXVhbnRpdHkiLCJzdGF0ZSIsIiRhcHBseSIsImVycm9yIiwibmF2R29vZHNEZXRhaWxzIiwiJHJlZGlyZWN0IiwiZXZlbnRzIiwiY29uc29sZSIsImxvZyIsInQiLCJvcmRpbmFyeUdvb2RzRHRhaWwiLCJ0eXBlIiwiYXJ0aWNsZSIsImdvb2RzX2JvZHkiLCJyZXBsYWNlIiwid3hQYXJzZSIsIndlcHkiLCJwYWdlIl0s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dGFpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBtYXNrIGZyb20gJy4uL2NvbXBvbmVudHMvbWFzayc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG52YXIgV3hQYXJzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL3d4UGFyc2Uvd3hQYXJzZS5qcycpO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeivpuaDhSdcclxuICB9O1xyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJhdHRyc21hc2tcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm1hc2tGbGFnLnN5bmNcIjpcImF0dHJGbGFnXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIGF0dHJzbWFzazogbWFza1xyXG4gIH07XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgZ29vZHNOdW06IDEsXHJcbiAgICBhdHRyRmxhZzogZmFsc2UsXHJcbiAgICB0YWJMaXN0OiBbeyBuYW1lOiAn5ZWG5ZOB5LuL57uNJ30sIHsgbmFtZTogJ+WbvuaWh+ivpuaDhScgfV0sIC8vIOmhtumDqOmAiemhueWNoVxyXG4gICAgY3VycmVudFRhYjogMCwgLy8g6aG26YOo6YCJ6aG55Y2h57Si5byVXHJcbiAgICBnb29kc19pZDogbnVsbCwgLy/llYblk4Fnb29kc19pZFxyXG4gICAgcmVxdWVzdEltZ1VybDogbnVsbCwgLy/lm77niYfln5/lkI1cclxuICAgIGdvb2RzX2NvbnRlbnQ6IG51bGwsIC8vIOWVhuWTgeWGheWuuVxyXG4gICAgc3RvcmVfaW5mbzogbnVsbCwgLy8g5bqX6ZO65L+h5oGvXHJcbiAgICBob3Rfc2FsZXM6IFtdLCAvL+aOqOiNkOWVhuWTgeWIl+ihqFxyXG4gICAgZ29vZHNfaW1hZ2VfbW9iaWxlOiBbXSwgLy8g5ZWG5ZOB6L2u5pKt5Zu+XHJcbiAgICBjb250cmFjdGxpc3Q6IHt9LCAvLyDllYblk4HmnI3liqHor7TmmI5cclxuICAgIGF0dHI6IFtcclxuICAgICAge3RpdGxlOiAn5aSn5bCPJywgcHJvcDogWydzJywneCcsJ3hsJywneGxsJ10gfSxcclxuICAgICAge3RpdGxlOiAn6aKc6ImyJywgcHJvcDogWyfnuqLoibInLCfpu5HoibInLCfnmb3oibInLCfpu4ToibInXSB9XHJcbiAgICBdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBvblNob3coKSB7fVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAvLyDliIfmjaLpobbpg6jlr7zoiKpcclxuICAgIHN3aXRjaE5hdihpZHgpIHtcclxuICAgICAgdGhpcy5jdXJyZW50VGFiID0gaWR4O1xyXG4gICAgfSxcclxuICAgIC8vIOaYvuekuumAieaLqeWVhuWTgeahhlxyXG4gICAgc2hvd0F0dHJNYXNrKCkge1xyXG4gICAgICB0aGlzLmF0dHJGbGFnID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBhdHRyQnRuU3VibWl0KCkge1xyXG4gICAgICB2YXIgcHJvcEFyciA9IHRoaXMuYXR0ci5maWx0ZXIoaXRlbSA9PiBpdGVtLmFjdGl2ZSkubWFwKGl0ZW0gPT4gaXRlbS5hY3RpdmUpXHJcbiAgICAgIGlmKHByb3BBcnIubGVuZ3RoICE9PSB0aGlzLmF0dHIubGVuZ3RoKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5ZWG5ZOB6KeE5qC8JyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgICAgdmFyIGdvb2RzX2lkID0gdGhpcy5nb29kc19pZFxyXG4gICAgICB2YXIgZ29vZHNOdW0gPSB0aGlzLmdvb2RzTnVtXHJcbiAgICAgIHZhciBjYXJ0X2lkID0gYCR7Z29vZHNfaWR9fCR7Z29vZHNOdW19YFxyXG4gICAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5tZW1iZXJCdXlPbmUsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgY2FydF9pZCxcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgIHJlcy5kYXRhcy5jYXJ0X2lkID0gY2FydF9pZFxyXG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEub3JkZXJJbmZvID0gcmVzLmRhdGFzXHJcbiAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogJy9wYWdlcy9zZXR0bGVtZW50JyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYWRkTnVtKCkge1xyXG4gICAgICB0aGlzLmdvb2RzTnVtICsrXHJcbiAgICB9LFxyXG4gICAgcmVkdU51bSgpe1xyXG4gICAgICBpZih0aGlzLmdvb2RzTnVtIDw9IDEpIHtcclxuICAgICAgICB0aGlzLmdvb2RzTnVtID0gMVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZ29vZHNOdW0tLVxyXG4gICAgfSxcclxuICAgIGNoYW5nZUF0dHIob25lLCB0d28pe1xyXG4gICAgICB0aGlzLmF0dHIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBpZihvbmUgPT0gaW5kZXgpIHtcclxuICAgICAgICAgIGl0ZW0uYWN0aXZlID0gaXRlbS5wcm9wW3R3b11cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYWRkQ2FydCgpe1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkuY2FydEFkZCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBnb29kc19pZDogdGhpcy5nb29kc19pZCxcclxuICAgICAgICAgIHF1YW50aXR5OiB0aGlzLmdvb2RzTnVtXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYocmVzLmRhdGFzLnN0YXRlID09IDEpIHtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5re75Yqg5oiQ5YqfJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHRoaXMuYXR0ckZsYWcgPSBmYWxzZVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogcmVzLmRhdGFzLmVycm9yLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIG5hdkdvb2RzRGV0YWlscyhnb29kc19pZCkge1xyXG4gICAgICB0aGlzLiRyZWRpcmVjdCh7IHVybDogYHNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvblNoYXJlQXBwTWVzc2FnZSgpe1xyXG4gICAgY29uc29sZS5sb2coOTk5KVxyXG4gIH1cclxuICBvbkxvYWQodCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICAgIHRoaXMuZ29vZHNfaWQgPSB0Lmdvb2RzX2lkO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgLy8g5pmu6YCa5ZWG5ZOB6K+m5oOFXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkub3JkaW5hcnlHb29kc0R0YWlsLFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGdvb2RzX2lkOiB0aGlzLmdvb2RzX2lkXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc19jb250ZW50ID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnRcclxuICAgICAgICB0aGlzLmNvbnRyYWN0bGlzdCA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50LmNvbnRyYWN0bGlzdCB8fCB7fVxyXG4gICAgICAgIHRoaXMuZ29vZHNfaW1hZ2VfbW9iaWxlID0gcmVzLmRhdGFzLmdvb2RzX2ltYWdlX21vYmlsZSB8fCBbXVxyXG4gICAgICAgIHRoaXMuc3RvcmVfaW5mbyA9IHJlcy5kYXRhcy5zdG9yZV9pbmZvXHJcbiAgICAgICAgdGhpcy5ob3Rfc2FsZXMgPSByZXMuZGF0YXMuaG90X3NhbGVzXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIHZhciBhcnRpY2xlID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuZ29vZHNfYm9keVxyXG4gICAgICAgIGFydGljbGUgPSBhcnRpY2xlLnJlcGxhY2UoL3NyYz1cIi9nLCBgc3JjPVwiJHt0aGF0LnJlcXVlc3RJbWdVcmx9YCk7XHJcbiAgICAgICAgV3hQYXJzZS53eFBhcnNlKCdhcnRpY2xlJywgJ2h0bWwnLCBhcnRpY2xlLCB0aGF0LCA1KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuICBcclxufVxyXG4iXX0=