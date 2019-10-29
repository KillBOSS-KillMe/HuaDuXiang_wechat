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
      attrFlag: true,
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
          return fasle;
        }
        var app = this.$parent;
        var goods_id = this.goods_id;
        var goodsNum = this.goodsNum;
        var key = '7731b8f19c93a412ee7b84a478fa6f8d';
        (0, _ajax.ajax)({
          url: api.memberBuyOne + '&key=' + key,
          data: {
            cart_id: goods_id + '|' + goodsNum
          }
        }).then(function (res) {
          if (res.code == 200) {
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
        var _this3 = this;

        this.attr.forEach(function (item, index) {
          if (one == index) {
            item.active = item.prop[two];
            console.log(_this3);
          }
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {}
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
        console.log(res);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BEZXRhaWxzLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsIm1peGlucyIsImRhdGEiLCJnb29kc051bSIsImF0dHJGbGFnIiwidGFiTGlzdCIsIm5hbWUiLCJjdXJyZW50VGFiIiwiZ29vZHNfaWQiLCJyZXF1ZXN0SW1nVXJsIiwiZ29vZHNfY29udGVudCIsInN0b3JlX2luZm8iLCJob3Rfc2FsZXMiLCJnb29kc19pbWFnZV9tb2JpbGUiLCJjb250cmFjdGxpc3QiLCJhdHRyIiwidGl0bGUiLCJwcm9wIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic3dpdGNoTmF2IiwiaWR4Iiwic2hvd0F0dHJNYXNrIiwiYXR0ckJ0blN1Ym1pdCIsInByb3BBcnIiLCJmaWx0ZXIiLCJpdGVtIiwiYWN0aXZlIiwibWFwIiwibGVuZ3RoIiwid3giLCJzaG93VG9hc3QiLCJpY29uIiwiZmFzbGUiLCJhcHAiLCIkcGFyZW50Iiwia2V5IiwidXJsIiwibWVtYmVyQnV5T25lIiwiY2FydF9pZCIsInRoZW4iLCJyZXMiLCJjb2RlIiwiZ2xvYmFsRGF0YSIsIm9yZGVySW5mbyIsImRhdGFzIiwiJG5hdmlnYXRlIiwiYWRkTnVtIiwicmVkdU51bSIsImNoYW5nZUF0dHIiLCJvbmUiLCJ0d28iLCJmb3JFYWNoIiwiaW5kZXgiLCJjb25zb2xlIiwibG9nIiwiZXZlbnRzIiwidCIsInRoYXQiLCJvcmRpbmFyeUdvb2RzRHRhaWwiLCJ0eXBlIiwiJGFwcGx5IiwiYXJ0aWNsZSIsImdvb2RzX2JvZHkiLCJyZXBsYWNlIiwid3hQYXJzZSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxN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S0FBSixDQUFVakMsU0FBM0I7QUFDQSxpQkFBS2lELE1BQUw7QUFDQSxjQUFJQyxVQUFVckIsSUFBSUksS0FBSixDQUFVbkMsYUFBVixDQUF3QnFELFVBQXRDO0FBQ0FELG9CQUFVQSxRQUFRRSxPQUFSLENBQWdCLFFBQWhCLFlBQWtDTixLQUFLakQsYUFBdkMsQ0FBVjtBQUNBbEIsa0JBQVEwRSxPQUFSLENBQWdCLFNBQWhCLEVBQTJCLE1BQTNCLEVBQW1DSCxPQUFuQyxFQUE0Q0osSUFBNUMsRUFBa0QsQ0FBbEQ7QUFDRDtBQUNGLE9BbkJEO0FBcUJEOzs7O0VBbkhnQ1EsZUFBS0MsSTs7a0JBQW5CM0UsSyIsImZpbGUiOiJzaG9wRGV0YWlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG1hc2sgZnJvbSAnLi4vY29tcG9uZW50cy9tYXNrJztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbnZhciBXeFBhcnNlID0gcmVxdWlyZSgnLi4vdXRpbHMvd3hQYXJzZS93eFBhcnNlLmpzJyk7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImF0dHJzbWFza1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiYXR0ckZsYWdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgYXR0cnNtYXNrOiBtYXNrXHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBnb29kc051bTogMSxcclxuICAgIGF0dHJGbGFnOiB0cnVlLFxyXG4gICAgdGFiTGlzdDogW3sgbmFtZTogJ+WVhuWTgeS7i+e7jSd9LCB7IG5hbWU6ICflm77mlofor6bmg4UnIH1dLCAvLyDpobbpg6jpgInpobnljaFcclxuICAgIGN1cnJlbnRUYWI6IDAsIC8vIOmhtumDqOmAiemhueWNoee0ouW8lVxyXG4gICAgZ29vZHNfaWQ6IG51bGwsIC8v5ZWG5ZOBZ29vZHNfaWRcclxuICAgIHJlcXVlc3RJbWdVcmw6IG51bGwsIC8v5Zu+54mH5Z+f5ZCNXHJcbiAgICBnb29kc19jb250ZW50OiBudWxsLCAvLyDllYblk4HlhoXlrrlcclxuICAgIHN0b3JlX2luZm86IG51bGwsIC8vIOW6l+mTuuS/oeaBr1xyXG4gICAgaG90X3NhbGVzOiBbXSwgLy/mjqjojZDllYblk4HliJfooahcclxuICAgIGdvb2RzX2ltYWdlX21vYmlsZTogW10sIC8vIOWVhuWTgei9ruaSreWbvlxyXG4gICAgY29udHJhY3RsaXN0OiB7fSwgLy8g5ZWG5ZOB5pyN5Yqh6K+05piOXHJcbiAgICBhdHRyOiBbXHJcbiAgICAgIHt0aXRsZTogJ+Wkp+WwjycsIHByb3A6IFsncycsJ3gnLCd4bCcsJ3hsbCddIH0sXHJcbiAgICAgIHt0aXRsZTogJ+minOiJsicsIHByb3A6IFsn57qi6ImyJywn6buR6ImyJywn55m96ImyJywn6buE6ImyJ10gfVxyXG4gICAgXVxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25TaG93KCkge31cclxuICBtZXRob2RzID0ge1xyXG4gICAgLy8g5YiH5o2i6aG26YOo5a+86IiqXHJcbiAgICBzd2l0Y2hOYXYoaWR4KSB7XHJcbiAgICAgIHRoaXMuY3VycmVudFRhYiA9IGlkeDtcclxuICAgIH0sXHJcbiAgICAvLyDmmL7npLrpgInmi6nllYblk4HmoYZcclxuICAgIHNob3dBdHRyTWFzaygpIHtcclxuICAgICAgdGhpcy5hdHRyRmxhZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgYXR0ckJ0blN1Ym1pdCgpIHtcclxuICAgICAgdmFyIHByb3BBcnIgPSB0aGlzLmF0dHIuZmlsdGVyKGl0ZW0gPT4gaXRlbS5hY3RpdmUpLm1hcChpdGVtID0+IGl0ZW0uYWN0aXZlKVxyXG4gICAgICBpZihwcm9wQXJyLmxlbmd0aCAhPT0gdGhpcy5hdHRyLmxlbmd0aCkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWVhuWTgeinhOagvCcsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYXNsZVxyXG4gICAgICB9XHJcbiAgICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICAgIHZhciBnb29kc19pZCA9IHRoaXMuZ29vZHNfaWRcclxuICAgICAgdmFyIGdvb2RzTnVtID0gdGhpcy5nb29kc051bVxyXG4gICAgICB2YXIga2V5ID0gJzc3MzFiOGYxOWM5M2E0MTJlZTdiODRhNDc4ZmE2ZjhkJ1xyXG4gICAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5tZW1iZXJCdXlPbmUgKyAnJmtleT0nICsga2V5LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGNhcnRfaWQ6IGAke2dvb2RzX2lkfXwke2dvb2RzTnVtfWAsXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS5vcmRlckluZm8gPSByZXMuZGF0YXNcclxuICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiAnL3BhZ2VzL3NldHRsZW1lbnQnIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhZGROdW0oKSB7XHJcbiAgICAgIHRoaXMuZ29vZHNOdW0gKytcclxuICAgIH0sXHJcbiAgICByZWR1TnVtKCl7XHJcbiAgICAgIGlmKHRoaXMuZ29vZHNOdW0gPD0gMSkge1xyXG4gICAgICAgIHRoaXMuZ29vZHNOdW0gPSAxXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5nb29kc051bS0tXHJcbiAgICB9LFxyXG4gICAgY2hhbmdlQXR0cihvbmUsIHR3byl7XHJcbiAgICAgIHRoaXMuYXR0ci5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmKG9uZSA9PSBpbmRleCkge1xyXG4gICAgICAgICAgaXRlbS5hY3RpdmUgPSBpdGVtLnByb3BbdHdvXVxyXG4gICAgICAgICAgY29uc29sZS5sb2codGhpcylcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG9uTG9hZCh0KSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgdGhpcy5nb29kc19pZCA9IHQuZ29vZHNfaWQ7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAvLyDmma7pgJrllYblk4Hor6bmg4VcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5vcmRpbmFyeUdvb2RzRHRhaWwsXHJcbiAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgZ29vZHNfaWQ6IHRoaXMuZ29vZHNfaWRcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLmdvb2RzX2NvbnRlbnQgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudFxyXG4gICAgICAgIHRoaXMuY29udHJhY3RsaXN0ID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuY29udHJhY3RsaXN0IHx8IHt9XHJcbiAgICAgICAgdGhpcy5nb29kc19pbWFnZV9tb2JpbGUgPSByZXMuZGF0YXMuZ29vZHNfaW1hZ2VfbW9iaWxlIHx8IFtdXHJcbiAgICAgICAgdGhpcy5zdG9yZV9pbmZvID0gcmVzLmRhdGFzLnN0b3JlX2luZm9cclxuICAgICAgICB0aGlzLmhvdF9zYWxlcyA9IHJlcy5kYXRhcy5ob3Rfc2FsZXNcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgdmFyIGFydGljbGUgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudC5nb29kc19ib2R5XHJcbiAgICAgICAgYXJ0aWNsZSA9IGFydGljbGUucmVwbGFjZSgvc3JjPVwiL2csIGBzcmM9XCIke3RoYXQucmVxdWVzdEltZ1VybH1gKTtcclxuICAgICAgICBXeFBhcnNlLnd4UGFyc2UoJ2FydGljbGUnLCAnaHRtbCcsIGFydGljbGUsIHRoYXQsIDUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG4gIFxyXG59XHJcbiJdfQ==