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
      navGoodsDetails: function navGoodsDetails(goods_id) {
        this.$redirect({ url: 'shopDetails?goods_id=' + goods_id });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad(t) {
      var _this3 = this;

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
          _this3.goods_content = res.datas.goods_content;
          _this3.contractlist = res.datas.goods_content.contractlist || {};
          _this3.goods_image_mobile = res.datas.goods_image_mobile || [];
          _this3.store_info = res.datas.store_info;
          _this3.hot_sales = res.datas.hot_sales;
          _this3.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BEZXRhaWxzLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsIm1peGlucyIsImRhdGEiLCJnb29kc051bSIsImF0dHJGbGFnIiwidGFiTGlzdCIsIm5hbWUiLCJjdXJyZW50VGFiIiwiZ29vZHNfaWQiLCJyZXF1ZXN0SW1nVXJsIiwiZ29vZHNfY29udGVudCIsInN0b3JlX2luZm8iLCJob3Rfc2FsZXMiLCJnb29kc19pbWFnZV9tb2JpbGUiLCJjb250cmFjdGxpc3QiLCJhdHRyIiwidGl0bGUiLCJwcm9wIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic3dpdGNoTmF2IiwiaWR4Iiwic2hvd0F0dHJNYXNrIiwiYXR0ckJ0blN1Ym1pdCIsInByb3BBcnIiLCJmaWx0ZXIiLCJpdGVtIiwiYWN0aXZlIiwibWFwIiwibGVuZ3RoIiwid3giLCJzaG93VG9hc3QiLCJpY29uIiwiYXBwIiwiJHBhcmVudCIsImNhcnRfaWQiLCJ1cmwiLCJtZW1iZXJCdXlPbmUiLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwiZ2xvYmFsRGF0YSIsIm9yZGVySW5mbyIsIiRuYXZpZ2F0ZSIsImFkZE51bSIsInJlZHVOdW0iLCJjaGFuZ2VBdHRyIiwib25lIiwidHdvIiwiZm9yRWFjaCIsImluZGV4IiwibmF2R29vZHNEZXRhaWxzIiwiJHJlZGlyZWN0IiwiZXZlbnRzIiwidCIsInRoYXQiLCJvcmRpbmFyeUdvb2RzRHRhaWwiLCJ0eXBlIiwiJGFwcGx5IiwiYXJ0aWNsZSIsImdvb2RzX2JvZHkiLCJyZXBsYWNlIiwid3hQYXJzZSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxN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Q0FBVTlCLFVBQTVCO0FBQ0EsaUJBQUtDLFNBQUwsR0FBaUIyQixJQUFJRSxLQUFKLENBQVU3QixTQUEzQjtBQUNBLGlCQUFLK0MsTUFBTDtBQUNBLGNBQUlDLFVBQVVyQixJQUFJRSxLQUFKLENBQVUvQixhQUFWLENBQXdCbUQsVUFBdEM7QUFDQUQsb0JBQVVBLFFBQVFFLE9BQVIsQ0FBZ0IsUUFBaEIsWUFBa0NOLEtBQUsvQyxhQUF2QyxDQUFWO0FBQ0FsQixrQkFBUXdFLE9BQVIsQ0FBZ0IsU0FBaEIsRUFBMkIsTUFBM0IsRUFBbUNILE9BQW5DLEVBQTRDSixJQUE1QyxFQUFrRCxDQUFsRDtBQUNEO0FBQ0YsT0FsQkQ7QUFvQkQ7Ozs7RUFySGdDUSxlQUFLQyxJOztrQkFBbkJ6RSxLIiwiZmlsZSI6InNob3BEZXRhaWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgbWFzayBmcm9tICcuLi9jb21wb25lbnRzL21hc2snO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxudmFyIFd4UGFyc2UgPSByZXF1aXJlKCcuLi91dGlscy93eFBhcnNlL3d4UGFyc2UuanMnKTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4Hor6bmg4UnXHJcbiAgfTtcclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYXR0cnNtYXNrXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDptYXNrRmxhZy5zeW5jXCI6XCJhdHRyRmxhZ1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBhdHRyc21hc2s6IG1hc2tcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGdvb2RzTnVtOiAxLFxyXG4gICAgYXR0ckZsYWc6IGZhbHNlLFxyXG4gICAgdGFiTGlzdDogW3sgbmFtZTogJ+WVhuWTgeS7i+e7jSd9LCB7IG5hbWU6ICflm77mlofor6bmg4UnIH1dLCAvLyDpobbpg6jpgInpobnljaFcclxuICAgIGN1cnJlbnRUYWI6IDAsIC8vIOmhtumDqOmAiemhueWNoee0ouW8lVxyXG4gICAgZ29vZHNfaWQ6IG51bGwsIC8v5ZWG5ZOBZ29vZHNfaWRcclxuICAgIHJlcXVlc3RJbWdVcmw6IG51bGwsIC8v5Zu+54mH5Z+f5ZCNXHJcbiAgICBnb29kc19jb250ZW50OiBudWxsLCAvLyDllYblk4HlhoXlrrlcclxuICAgIHN0b3JlX2luZm86IG51bGwsIC8vIOW6l+mTuuS/oeaBr1xyXG4gICAgaG90X3NhbGVzOiBbXSwgLy/mjqjojZDllYblk4HliJfooahcclxuICAgIGdvb2RzX2ltYWdlX21vYmlsZTogW10sIC8vIOWVhuWTgei9ruaSreWbvlxyXG4gICAgY29udHJhY3RsaXN0OiB7fSwgLy8g5ZWG5ZOB5pyN5Yqh6K+05piOXHJcbiAgICBhdHRyOiBbXHJcbiAgICAgIHt0aXRsZTogJ+Wkp+WwjycsIHByb3A6IFsncycsJ3gnLCd4bCcsJ3hsbCddIH0sXHJcbiAgICAgIHt0aXRsZTogJ+minOiJsicsIHByb3A6IFsn57qi6ImyJywn6buR6ImyJywn55m96ImyJywn6buE6ImyJ10gfVxyXG4gICAgXVxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25TaG93KCkge31cclxuICBtZXRob2RzID0ge1xyXG4gICAgLy8g5YiH5o2i6aG26YOo5a+86IiqXHJcbiAgICBzd2l0Y2hOYXYoaWR4KSB7XHJcbiAgICAgIHRoaXMuY3VycmVudFRhYiA9IGlkeDtcclxuICAgIH0sXHJcbiAgICAvLyDmmL7npLrpgInmi6nllYblk4HmoYZcclxuICAgIHNob3dBdHRyTWFzaygpIHtcclxuICAgICAgdGhpcy5hdHRyRmxhZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgYXR0ckJ0blN1Ym1pdCgpIHtcclxuICAgICAgdmFyIHByb3BBcnIgPSB0aGlzLmF0dHIuZmlsdGVyKGl0ZW0gPT4gaXRlbS5hY3RpdmUpLm1hcChpdGVtID0+IGl0ZW0uYWN0aXZlKVxyXG4gICAgICBpZihwcm9wQXJyLmxlbmd0aCAhPT0gdGhpcy5hdHRyLmxlbmd0aCkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWVhuWTgeinhOagvCcsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICAgIHZhciBnb29kc19pZCA9IHRoaXMuZ29vZHNfaWRcclxuICAgICAgdmFyIGdvb2RzTnVtID0gdGhpcy5nb29kc051bVxyXG4gICAgICB2YXIgY2FydF9pZCA9IGAke2dvb2RzX2lkfXwke2dvb2RzTnVtfWBcclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkubWVtYmVyQnV5T25lLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGNhcnRfaWQsXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICByZXMuZGF0YXMuY2FydF9pZCA9IGNhcnRfaWRcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLm9yZGVySW5mbyA9IHJlcy5kYXRhc1xyXG4gICAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6ICcvcGFnZXMvc2V0dGxlbWVudCcgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGFkZE51bSgpIHtcclxuICAgICAgdGhpcy5nb29kc051bSArK1xyXG4gICAgfSxcclxuICAgIHJlZHVOdW0oKXtcclxuICAgICAgaWYodGhpcy5nb29kc051bSA8PSAxKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc051bSA9IDFcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmdvb2RzTnVtLS1cclxuICAgIH0sXHJcbiAgICBjaGFuZ2VBdHRyKG9uZSwgdHdvKXtcclxuICAgICAgdGhpcy5hdHRyLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYob25lID09IGluZGV4KSB7XHJcbiAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGl0ZW0ucHJvcFt0d29dXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIG5hdkdvb2RzRGV0YWlscyhnb29kc19pZCkge1xyXG4gICAgICB0aGlzLiRyZWRpcmVjdCh7IHVybDogYHNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuXHJcbiAgb25Mb2FkKHQpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICB0aGlzLmdvb2RzX2lkID0gdC5nb29kc19pZDtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIC8vIOaZrumAmuWVhuWTgeivpuaDhVxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm9yZGluYXJ5R29vZHNEdGFpbCxcclxuICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBnb29kc19pZDogdGhpcy5nb29kc19pZFxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHRoaXMuZ29vZHNfY29udGVudCA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50XHJcbiAgICAgICAgdGhpcy5jb250cmFjdGxpc3QgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudC5jb250cmFjdGxpc3QgfHwge31cclxuICAgICAgICB0aGlzLmdvb2RzX2ltYWdlX21vYmlsZSA9IHJlcy5kYXRhcy5nb29kc19pbWFnZV9tb2JpbGUgfHwgW11cclxuICAgICAgICB0aGlzLnN0b3JlX2luZm8gPSByZXMuZGF0YXMuc3RvcmVfaW5mb1xyXG4gICAgICAgIHRoaXMuaG90X3NhbGVzID0gcmVzLmRhdGFzLmhvdF9zYWxlc1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB2YXIgYXJ0aWNsZSA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50Lmdvb2RzX2JvZHlcclxuICAgICAgICBhcnRpY2xlID0gYXJ0aWNsZS5yZXBsYWNlKC9zcmM9XCIvZywgYHNyYz1cIiR7dGhhdC5yZXF1ZXN0SW1nVXJsfWApO1xyXG4gICAgICAgIFd4UGFyc2Uud3hQYXJzZSgnYXJ0aWNsZScsICdodG1sJywgYXJ0aWNsZSwgdGhhdCwgNSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB9XHJcbiAgXHJcbn1cclxuIl19