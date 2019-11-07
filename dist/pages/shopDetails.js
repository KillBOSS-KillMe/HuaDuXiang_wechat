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
          // article = article.replace(/src="/g, `src="${that.requestImgUrl}`);
          WxParse.wxParse('article', 'html', article, that, 5);
        }
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/shopDetails'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BEZXRhaWxzLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsIm1peGlucyIsImRhdGEiLCJnb29kc051bSIsImF0dHJGbGFnIiwidGFiTGlzdCIsIm5hbWUiLCJjdXJyZW50VGFiIiwiZ29vZHNfaWQiLCJyZXF1ZXN0SW1nVXJsIiwiZ29vZHNfY29udGVudCIsInN0b3JlX2luZm8iLCJob3Rfc2FsZXMiLCJnb29kc19pbWFnZV9tb2JpbGUiLCJjb250cmFjdGxpc3QiLCJhdHRyIiwidGl0bGUiLCJwcm9wIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic3dpdGNoTmF2IiwiaWR4Iiwic2hvd0F0dHJNYXNrIiwiYXR0ckJ0blN1Ym1pdCIsInByb3BBcnIiLCJmaWx0ZXIiLCJpdGVtIiwiYWN0aXZlIiwibWFwIiwibGVuZ3RoIiwid3giLCJzaG93VG9hc3QiLCJpY29uIiwiYXBwIiwiJHBhcmVudCIsImNhcnRfaWQiLCJ1cmwiLCJtZW1iZXJCdXlPbmUiLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwiZ2xvYmFsRGF0YSIsIm9yZGVySW5mbyIsIiRuYXZpZ2F0ZSIsImFkZE51bSIsInJlZHVOdW0iLCJjaGFuZ2VBdHRyIiwib25lIiwidHdvIiwiZm9yRWFjaCIsImluZGV4IiwiYWRkQ2FydCIsInRoYXQiLCJjYXJ0QWRkIiwicXVhbnRpdHkiLCJzdGF0ZSIsIiRhcHBseSIsImVycm9yIiwibmF2R29vZHNEZXRhaWxzIiwiJHJlZGlyZWN0IiwiZXZlbnRzIiwiY29uc29sZSIsImxvZyIsInQiLCJvcmRpbmFyeUdvb2RzRHRhaWwiLCJ0eXBlIiwiYXJ0aWNsZSIsImdvb2RzX2JvZHkiLCJ3eFBhcnNlIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3Mi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Q0FBWSxHQUFaO0FBQ0Q7OzsyQkFDTUMsQyxFQUFHO0FBQUE7O0FBQ1IsV0FBS3ZELGFBQUwsR0FBcUIsS0FBS3lCLE9BQUwsQ0FBYVEsVUFBYixDQUF3QmpDLGFBQTdDO0FBQ0EsV0FBS0QsUUFBTCxHQUFnQndELEVBQUV4RCxRQUFsQjtBQUNBLFVBQUk2QyxPQUFPLElBQVg7QUFDQTtBQUNBLHNCQUFLO0FBQ0hqQixhQUFLL0MsSUFBSTRFLGtCQUROO0FBRUhDLGNBQU0sS0FGSDtBQUdIaEUsY0FBTTtBQUNKTSxvQkFBVSxLQUFLQTtBQURYO0FBSEgsT0FBTCxFQU1HOEIsSUFOSCxDQU1RLGVBQU87QUFDYixZQUFHQyxJQUFJQyxJQUFKLElBQVksR0FBZixFQUFvQjtBQUNsQixpQkFBSzlCLGFBQUwsR0FBcUI2QixJQUFJRSxLQUFKLENBQVUvQixhQUEvQjtBQUNBLGlCQUFLSSxZQUFMLEdBQW9CeUIsSUFBSUUsS0FBSixDQUFVL0IsYUFBVixDQUF3QkksWUFBeEIsSUFBd0MsRUFBNUQ7QUFDQSxpQkFBS0Qsa0JBQUwsR0FBMEIwQixJQUFJRSxLQUFKLENBQVU1QixrQkFBVixJQUFnQyxFQUExRDtBQUNBLGlCQUFLRixVQUFMLEdBQWtCNEIsSUFBSUUsS0FBSixDQUFVOUIsVUFBNUI7QUFDQSxpQkFBS0MsU0FBTCxHQUFpQjJCLElBQUlFLEtBQUosQ0FBVTdCLFNBQTNCO0FBQ0EsaUJBQUs2QyxNQUFMO0FBQ0EsY0FBSVUsVUFBVTVCLElBQUlFLEtBQUosQ0FBVS9CLGFBQVYsQ0FBd0IwRCxVQUF0QztBQUNBO0FBQ0E3RSxrQkFBUThFLE9BQVIsQ0FBZ0IsU0FBaEIsRUFBMkIsTUFBM0IsRUFBbUNGLE9BQW5DLEVBQTRDZCxJQUE1QyxFQUFrRCxDQUFsRDtBQUNEO0FBQ0YsT0FsQkQ7QUFvQkQ7Ozs7RUE5SWdDaUIsZUFBS0MsSTs7a0JBQW5CL0UsSyIsImZpbGUiOiJzaG9wRGV0YWlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG1hc2sgZnJvbSAnLi4vY29tcG9uZW50cy9tYXNrJztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbnZhciBXeFBhcnNlID0gcmVxdWlyZSgnLi4vdXRpbHMvd3hQYXJzZS93eFBhcnNlLmpzJyk7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImF0dHJzbWFza1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiYXR0ckZsYWdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgYXR0cnNtYXNrOiBtYXNrXHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBnb29kc051bTogMSxcclxuICAgIGF0dHJGbGFnOiBmYWxzZSxcclxuICAgIHRhYkxpc3Q6IFt7IG5hbWU6ICfllYblk4Hku4vnu40nfSwgeyBuYW1lOiAn5Zu+5paH6K+m5oOFJyB9XSwgLy8g6aG26YOo6YCJ6aG55Y2hXHJcbiAgICBjdXJyZW50VGFiOiAwLCAvLyDpobbpg6jpgInpobnljaHntKLlvJVcclxuICAgIGdvb2RzX2lkOiBudWxsLCAvL+WVhuWTgWdvb2RzX2lkXHJcbiAgICByZXF1ZXN0SW1nVXJsOiBudWxsLCAvL+WbvueJh+Wfn+WQjVxyXG4gICAgZ29vZHNfY29udGVudDogbnVsbCwgLy8g5ZWG5ZOB5YaF5a65XHJcbiAgICBzdG9yZV9pbmZvOiBudWxsLCAvLyDlupfpk7rkv6Hmga9cclxuICAgIGhvdF9zYWxlczogW10sIC8v5o6o6I2Q5ZWG5ZOB5YiX6KGoXHJcbiAgICBnb29kc19pbWFnZV9tb2JpbGU6IFtdLCAvLyDllYblk4Hova7mkq3lm75cclxuICAgIGNvbnRyYWN0bGlzdDoge30sIC8vIOWVhuWTgeacjeWKoeivtOaYjlxyXG4gICAgYXR0cjogW1xyXG4gICAgICB7dGl0bGU6ICflpKflsI8nLCBwcm9wOiBbJ3MnLCd4JywneGwnLCd4bGwnXSB9LFxyXG4gICAgICB7dGl0bGU6ICfpopzoibInLCBwcm9wOiBbJ+e6ouiJsicsJ+m7keiJsicsJ+eZveiJsicsJ+m7hOiJsiddIH1cclxuICAgIF1cclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG9uU2hvdygpIHt9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOWIh+aNoumhtumDqOWvvOiIqlxyXG4gICAgc3dpdGNoTmF2KGlkeCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRUYWIgPSBpZHg7XHJcbiAgICB9LFxyXG4gICAgLy8g5pi+56S66YCJ5oup5ZWG5ZOB5qGGXHJcbiAgICBzaG93QXR0ck1hc2soKSB7XHJcbiAgICAgIHRoaXMuYXR0ckZsYWcgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGF0dHJCdG5TdWJtaXQoKSB7XHJcbiAgICAgIHZhciBwcm9wQXJyID0gdGhpcy5hdHRyLmZpbHRlcihpdGVtID0+IGl0ZW0uYWN0aXZlKS5tYXAoaXRlbSA9PiBpdGVtLmFjdGl2ZSlcclxuICAgICAgaWYocHJvcEFyci5sZW5ndGggIT09IHRoaXMuYXR0ci5sZW5ndGgpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nllYblk4Hop4TmoLwnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgICB2YXIgZ29vZHNfaWQgPSB0aGlzLmdvb2RzX2lkXHJcbiAgICAgIHZhciBnb29kc051bSA9IHRoaXMuZ29vZHNOdW1cclxuICAgICAgdmFyIGNhcnRfaWQgPSBgJHtnb29kc19pZH18JHtnb29kc051bX1gXHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLm1lbWJlckJ1eU9uZSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBjYXJ0X2lkLFxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgcmVzLmRhdGFzLmNhcnRfaWQgPSBjYXJ0X2lkXHJcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS5vcmRlckluZm8gPSByZXMuZGF0YXNcclxuICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiAnL3BhZ2VzL3NldHRsZW1lbnQnIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhZGROdW0oKSB7XHJcbiAgICAgIHRoaXMuZ29vZHNOdW0gKytcclxuICAgIH0sXHJcbiAgICByZWR1TnVtKCl7XHJcbiAgICAgIGlmKHRoaXMuZ29vZHNOdW0gPD0gMSkge1xyXG4gICAgICAgIHRoaXMuZ29vZHNOdW0gPSAxXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5nb29kc051bS0tXHJcbiAgICB9LFxyXG4gICAgY2hhbmdlQXR0cihvbmUsIHR3byl7XHJcbiAgICAgIHRoaXMuYXR0ci5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmKG9uZSA9PSBpbmRleCkge1xyXG4gICAgICAgICAgaXRlbS5hY3RpdmUgPSBpdGVtLnByb3BbdHdvXVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhZGRDYXJ0KCl7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5jYXJ0QWRkLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGdvb2RzX2lkOiB0aGlzLmdvb2RzX2lkLFxyXG4gICAgICAgICAgcXVhbnRpdHk6IHRoaXMuZ29vZHNOdW1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZihyZXMuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfmt7vliqDmiJDlip8nXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgdGhpcy5hdHRyRmxhZyA9IGZhbHNlXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMuZXJyb3IsXHJcbiAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgbmF2R29vZHNEZXRhaWxzKGdvb2RzX2lkKSB7XHJcbiAgICAgIHRoaXMuJHJlZGlyZWN0KHsgdXJsOiBgc2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCl7XHJcbiAgICBjb25zb2xlLmxvZyg5OTkpXHJcbiAgfVxyXG4gIG9uTG9hZCh0KSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgdGhpcy5nb29kc19pZCA9IHQuZ29vZHNfaWQ7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAvLyDmma7pgJrllYblk4Hor6bmg4VcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5vcmRpbmFyeUdvb2RzRHRhaWwsXHJcbiAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgZ29vZHNfaWQ6IHRoaXMuZ29vZHNfaWRcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLmdvb2RzX2NvbnRlbnQgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudFxyXG4gICAgICAgIHRoaXMuY29udHJhY3RsaXN0ID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuY29udHJhY3RsaXN0IHx8IHt9XHJcbiAgICAgICAgdGhpcy5nb29kc19pbWFnZV9tb2JpbGUgPSByZXMuZGF0YXMuZ29vZHNfaW1hZ2VfbW9iaWxlIHx8IFtdXHJcbiAgICAgICAgdGhpcy5zdG9yZV9pbmZvID0gcmVzLmRhdGFzLnN0b3JlX2luZm9cclxuICAgICAgICB0aGlzLmhvdF9zYWxlcyA9IHJlcy5kYXRhcy5ob3Rfc2FsZXNcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgdmFyIGFydGljbGUgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudC5nb29kc19ib2R5XHJcbiAgICAgICAgLy8gYXJ0aWNsZSA9IGFydGljbGUucmVwbGFjZSgvc3JjPVwiL2csIGBzcmM9XCIke3RoYXQucmVxdWVzdEltZ1VybH1gKTtcclxuICAgICAgICBXeFBhcnNlLnd4UGFyc2UoJ2FydGljbGUnLCAnaHRtbCcsIGFydGljbGUsIHRoYXQsIDUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG4gIFxyXG59XHJcbiJdfQ==