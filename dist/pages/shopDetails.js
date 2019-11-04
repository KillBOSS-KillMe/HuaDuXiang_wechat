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
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      console.log(999);
    }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BEZXRhaWxzLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsIm1peGlucyIsImRhdGEiLCJnb29kc051bSIsImF0dHJGbGFnIiwidGFiTGlzdCIsIm5hbWUiLCJjdXJyZW50VGFiIiwiZ29vZHNfaWQiLCJyZXF1ZXN0SW1nVXJsIiwiZ29vZHNfY29udGVudCIsInN0b3JlX2luZm8iLCJob3Rfc2FsZXMiLCJnb29kc19pbWFnZV9tb2JpbGUiLCJjb250cmFjdGxpc3QiLCJhdHRyIiwidGl0bGUiLCJwcm9wIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic3dpdGNoTmF2IiwiaWR4Iiwic2hvd0F0dHJNYXNrIiwiYXR0ckJ0blN1Ym1pdCIsInByb3BBcnIiLCJmaWx0ZXIiLCJpdGVtIiwiYWN0aXZlIiwibWFwIiwibGVuZ3RoIiwid3giLCJzaG93VG9hc3QiLCJpY29uIiwiYXBwIiwiJHBhcmVudCIsImNhcnRfaWQiLCJ1cmwiLCJtZW1iZXJCdXlPbmUiLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwiZ2xvYmFsRGF0YSIsIm9yZGVySW5mbyIsIiRuYXZpZ2F0ZSIsImFkZE51bSIsInJlZHVOdW0iLCJjaGFuZ2VBdHRyIiwib25lIiwidHdvIiwiZm9yRWFjaCIsImluZGV4IiwibmF2R29vZHNEZXRhaWxzIiwiJHJlZGlyZWN0IiwiZXZlbnRzIiwiY29uc29sZSIsImxvZyIsInQiLCJ0aGF0Iiwib3JkaW5hcnlHb29kc0R0YWlsIiwidHlwZSIsIiRhcHBseSIsImFydGljbGUiLCJnb29kc19ib2R5IiwicmVwbGFjZSIsInd4UGFyc2UiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7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NUIsa0JBQVYsSUFBZ0MsRUFBMUQ7QUFDQSxpQkFBS0YsVUFBTCxHQUFrQjRCLElBQUlFLEtBQUosQ0FBVTlCLFVBQTVCO0FBQ0EsaUJBQUtDLFNBQUwsR0FBaUIyQixJQUFJRSxLQUFKLENBQVU3QixTQUEzQjtBQUNBLGlCQUFLaUQsTUFBTDtBQUNBLGNBQUlDLFVBQVV2QixJQUFJRSxLQUFKLENBQVUvQixhQUFWLENBQXdCcUQsVUFBdEM7QUFDQUQsb0JBQVVBLFFBQVFFLE9BQVIsQ0FBZ0IsUUFBaEIsWUFBa0NOLEtBQUtqRCxhQUF2QyxDQUFWO0FBQ0FsQixrQkFBUTBFLE9BQVIsQ0FBZ0IsU0FBaEIsRUFBMkIsTUFBM0IsRUFBbUNILE9BQW5DLEVBQTRDSixJQUE1QyxFQUFrRCxDQUFsRDtBQUNEO0FBQ0YsT0FsQkQ7QUFvQkQ7Ozs7RUF2SGdDUSxlQUFLQyxJOztrQkFBbkIzRSxLIiwiZmlsZSI6InNob3BEZXRhaWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgbWFzayBmcm9tICcuLi9jb21wb25lbnRzL21hc2snO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxudmFyIFd4UGFyc2UgPSByZXF1aXJlKCcuLi91dGlscy93eFBhcnNlL3d4UGFyc2UuanMnKTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4Hor6bmg4UnXHJcbiAgfTtcclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYXR0cnNtYXNrXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDptYXNrRmxhZy5zeW5jXCI6XCJhdHRyRmxhZ1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBhdHRyc21hc2s6IG1hc2tcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGdvb2RzTnVtOiAxLFxyXG4gICAgYXR0ckZsYWc6IGZhbHNlLFxyXG4gICAgdGFiTGlzdDogW3sgbmFtZTogJ+WVhuWTgeS7i+e7jSd9LCB7IG5hbWU6ICflm77mlofor6bmg4UnIH1dLCAvLyDpobbpg6jpgInpobnljaFcclxuICAgIGN1cnJlbnRUYWI6IDAsIC8vIOmhtumDqOmAiemhueWNoee0ouW8lVxyXG4gICAgZ29vZHNfaWQ6IG51bGwsIC8v5ZWG5ZOBZ29vZHNfaWRcclxuICAgIHJlcXVlc3RJbWdVcmw6IG51bGwsIC8v5Zu+54mH5Z+f5ZCNXHJcbiAgICBnb29kc19jb250ZW50OiBudWxsLCAvLyDllYblk4HlhoXlrrlcclxuICAgIHN0b3JlX2luZm86IG51bGwsIC8vIOW6l+mTuuS/oeaBr1xyXG4gICAgaG90X3NhbGVzOiBbXSwgLy/mjqjojZDllYblk4HliJfooahcclxuICAgIGdvb2RzX2ltYWdlX21vYmlsZTogW10sIC8vIOWVhuWTgei9ruaSreWbvlxyXG4gICAgY29udHJhY3RsaXN0OiB7fSwgLy8g5ZWG5ZOB5pyN5Yqh6K+05piOXHJcbiAgICBhdHRyOiBbXHJcbiAgICAgIHt0aXRsZTogJ+Wkp+WwjycsIHByb3A6IFsncycsJ3gnLCd4bCcsJ3hsbCddIH0sXHJcbiAgICAgIHt0aXRsZTogJ+minOiJsicsIHByb3A6IFsn57qi6ImyJywn6buR6ImyJywn55m96ImyJywn6buE6ImyJ10gfVxyXG4gICAgXVxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25TaG93KCkge31cclxuICBtZXRob2RzID0ge1xyXG4gICAgLy8g5YiH5o2i6aG26YOo5a+86IiqXHJcbiAgICBzd2l0Y2hOYXYoaWR4KSB7XHJcbiAgICAgIHRoaXMuY3VycmVudFRhYiA9IGlkeDtcclxuICAgIH0sXHJcbiAgICAvLyDmmL7npLrpgInmi6nllYblk4HmoYZcclxuICAgIHNob3dBdHRyTWFzaygpIHtcclxuICAgICAgdGhpcy5hdHRyRmxhZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgYXR0ckJ0blN1Ym1pdCgpIHtcclxuICAgICAgdmFyIHByb3BBcnIgPSB0aGlzLmF0dHIuZmlsdGVyKGl0ZW0gPT4gaXRlbS5hY3RpdmUpLm1hcChpdGVtID0+IGl0ZW0uYWN0aXZlKVxyXG4gICAgICBpZihwcm9wQXJyLmxlbmd0aCAhPT0gdGhpcy5hdHRyLmxlbmd0aCkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWVhuWTgeinhOagvCcsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICAgIHZhciBnb29kc19pZCA9IHRoaXMuZ29vZHNfaWRcclxuICAgICAgdmFyIGdvb2RzTnVtID0gdGhpcy5nb29kc051bVxyXG4gICAgICB2YXIgY2FydF9pZCA9IGAke2dvb2RzX2lkfXwke2dvb2RzTnVtfWBcclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkubWVtYmVyQnV5T25lLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGNhcnRfaWQsXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICByZXMuZGF0YXMuY2FydF9pZCA9IGNhcnRfaWRcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLm9yZGVySW5mbyA9IHJlcy5kYXRhc1xyXG4gICAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6ICcvcGFnZXMvc2V0dGxlbWVudCcgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGFkZE51bSgpIHtcclxuICAgICAgdGhpcy5nb29kc051bSArK1xyXG4gICAgfSxcclxuICAgIHJlZHVOdW0oKXtcclxuICAgICAgaWYodGhpcy5nb29kc051bSA8PSAxKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc051bSA9IDFcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmdvb2RzTnVtLS1cclxuICAgIH0sXHJcbiAgICBjaGFuZ2VBdHRyKG9uZSwgdHdvKXtcclxuICAgICAgdGhpcy5hdHRyLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYob25lID09IGluZGV4KSB7XHJcbiAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGl0ZW0ucHJvcFt0d29dXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIG5hdkdvb2RzRGV0YWlscyhnb29kc19pZCkge1xyXG4gICAgICB0aGlzLiRyZWRpcmVjdCh7IHVybDogYHNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvblNoYXJlQXBwTWVzc2FnZSgpe1xyXG4gICAgY29uc29sZS5sb2coOTk5KVxyXG4gIH1cclxuICBvbkxvYWQodCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICAgIHRoaXMuZ29vZHNfaWQgPSB0Lmdvb2RzX2lkO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgLy8g5pmu6YCa5ZWG5ZOB6K+m5oOFXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkub3JkaW5hcnlHb29kc0R0YWlsLFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGdvb2RzX2lkOiB0aGlzLmdvb2RzX2lkXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc19jb250ZW50ID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnRcclxuICAgICAgICB0aGlzLmNvbnRyYWN0bGlzdCA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50LmNvbnRyYWN0bGlzdCB8fCB7fVxyXG4gICAgICAgIHRoaXMuZ29vZHNfaW1hZ2VfbW9iaWxlID0gcmVzLmRhdGFzLmdvb2RzX2ltYWdlX21vYmlsZSB8fCBbXVxyXG4gICAgICAgIHRoaXMuc3RvcmVfaW5mbyA9IHJlcy5kYXRhcy5zdG9yZV9pbmZvXHJcbiAgICAgICAgdGhpcy5ob3Rfc2FsZXMgPSByZXMuZGF0YXMuaG90X3NhbGVzXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIHZhciBhcnRpY2xlID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuZ29vZHNfYm9keVxyXG4gICAgICAgIGFydGljbGUgPSBhcnRpY2xlLnJlcGxhY2UoL3NyYz1cIi9nLCBgc3JjPVwiJHt0aGF0LnJlcXVlc3RJbWdVcmx9YCk7XHJcbiAgICAgICAgV3hQYXJzZS53eFBhcnNlKCdhcnRpY2xlJywgJ2h0bWwnLCBhcnRpY2xlLCB0aGF0LCA1KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuICBcclxufVxyXG4iXX0=