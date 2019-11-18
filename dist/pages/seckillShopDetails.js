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
      goods_commend_list: [], //推荐商品列表
      image_list: [], // 商品轮播图
      contractlist: {}, // 商品服务说明
      attr: [], // 商品总属性数组
      activeAttr: [], // 当前点击属性数组
      goods_spec: [], // 默认属性数组
      spec_list: {}, // 所有属性对应的商品goods_id
      end_time: 0 // 倒计时

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

        if (this.wxTimerList.firstTimer.wxTimerSecond <= 0) {
          wx.showToast({
            title: '本场已结束，请等待下场活动',
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
      navGoodsDetails: function navGoodsDetails(goods_id, sale_type) {
        // navigate
        if (sale_type == 'rushsales') {
          this.$redirect('/pages/seckillShopDetails?goods_id=' + goods_id);
        } else {
          this.$redirect('/pages/shopDetails?goods_id=' + goods_id);
        }
      },
      changeAttr: function changeAttr(index, idx, ele) {
        this.activeAttr[index] = idx;
        this.goods_spec[index] = ele;
        var goods_id = this.spec_list[this.activeAttr.join('|')];
        this.goods_id = goods_id;
        this.$apply();
        this.getShopDetails();
      },
      addNum: function addNum() {
        // 0不限购   n 限购n件
        var upper_limit = this.goods_content.upper_limit;
        if (upper_limit != 0 && Number(upper_limit) <= Number(this.goodsNum)) {
          wx.showToast({
            title: '\u5355\u6B21\u6700\u591A\u9009\u62E9' + upper_limit + '\u4EF6\u5546\u54C1',
            icon: 'none'
          });
          this.goodsNum = upper_limit;
          return false;
        } else {
          this.goodsNum++;
        }
      },
      reduNum: function reduNum() {
        if (this.goodsNum <= 1) {
          this.goodsNum = 1;
          return false;
        }
        this.goodsNum--;
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
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      this.$apply();
      this.getShopDetails();
    }
  }, {
    key: 'getShopDetails',
    value: function getShopDetails() {
      var _this3 = this;

      var that = this;
      // 秒杀商品详情
      (0, _ajax.ajax)({
        url: api.ordinaryGoodsDtail,
        type: 'get',
        data: {
          goods_id: this.goods_id,
          sale_type: 'rushsales'
        }
      }).then(function (res) {
        if (res.code == 200) {
          _this3.goodsNum = 1;
          _this3.goods_content = res.datas.goods_content;
          _this3.contractlist = res.datas.goods_content.contractlist || {};
          _this3.image_list = res.datas.image_list || [];
          _this3.store_info = res.datas.store_info;
          _this3.goods_commend_list = res.datas.goods_commend_list;
          // 商品属性
          var spec_name = Object.values(res.datas.goods_content.spec_name || {});
          var spec_value = Object.values(res.datas.goods_content.spec_value || {});
          var attr = [];
          spec_value.forEach(function (item, index) {
            if (!attr[index]) {
              attr[index] = {};
            }
            attr[index].title = spec_name[index];
            attr[index].prop = item;
          });
          _this3.attr = attr;
          _this3.goods_spec = Object.values(res.datas.goods_content.goods_spec || {});
          _this3.activeAttr = Object.keys(res.datas.goods_content.goods_spec || {});
          _this3.spec_list = res.datas.spec_list;
          // 倒计时
          var end_time = res.datas.goods_content.end_time || 0;
          var wxTimer = new timer({
            beginTime: end_time,
            name: 'firstTimer',
            complete: function complete() {}
          });
          wxTimer.start(_this3);
          _this3.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY2tpbGxTaG9wRGV0YWlscy5qcyJdLCJuYW1lcyI6WyJ0aW1lciIsInJlcXVpcmUiLCJhcGkiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsIm1peGlucyIsImRhdGEiLCJnb29kc051bSIsImF0dHJGbGFnIiwidGFiTGlzdCIsIm5hbWUiLCJkb3ROdW0iLCJjdXJyZW50VGFiIiwid3hUaW1lckxpc3QiLCJnb29kc19pZCIsInJlcXVlc3RJbWdVcmwiLCJnb29kc19jb250ZW50Iiwic3RvcmVfaW5mbyIsImdvb2RzX2NvbW1lbmRfbGlzdCIsImltYWdlX2xpc3QiLCJjb250cmFjdGxpc3QiLCJhdHRyIiwiYWN0aXZlQXR0ciIsImdvb2RzX3NwZWMiLCJzcGVjX2xpc3QiLCJlbmRfdGltZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsInN3aXRjaE5hdiIsImlkeCIsInNob3dBdHRyTWFzayIsImF0dHJCdG5TdWJtaXQiLCJmaXJzdFRpbWVyIiwid3hUaW1lclNlY29uZCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiYXBwIiwiJHBhcmVudCIsImNhcnRfaWQiLCJ1cmwiLCJtZW1iZXJCdXlPbmUiLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwiZ2xvYmFsRGF0YSIsIm9yZGVySW5mbyIsIiRuYXZpZ2F0ZSIsIm5hdkdvb2RzRGV0YWlscyIsInNhbGVfdHlwZSIsIiRyZWRpcmVjdCIsImNoYW5nZUF0dHIiLCJpbmRleCIsImVsZSIsImpvaW4iLCIkYXBwbHkiLCJnZXRTaG9wRGV0YWlscyIsImFkZE51bSIsInVwcGVyX2xpbWl0IiwiTnVtYmVyIiwicmVkdU51bSIsImV2ZW50cyIsInQiLCJ0aGF0Iiwib3JkaW5hcnlHb29kc0R0YWlsIiwidHlwZSIsInNwZWNfbmFtZSIsIk9iamVjdCIsInZhbHVlcyIsInNwZWNfdmFsdWUiLCJmb3JFYWNoIiwiaXRlbSIsInByb3AiLCJrZXlzIiwid3hUaW1lciIsImJlZ2luVGltZSIsImNvbXBsZXRlIiwic3RhcnQiLCJhcnRpY2xlIiwiZ29vZHNfYm9keSIsInd4UGFyc2UiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOztBQUNBOzs7Ozs7Ozs7O0FBSEEsSUFBSUEsUUFBUUMsUUFBUSxxQkFBUixDQUFaLEMsQ0FBNEM7QUFDNUMsSUFBSUMsTUFBTUQsUUFBUSxXQUFSLENBQVY7O0FBR0EsSUFBSUUsVUFBVUYsUUFBUSw2QkFBUixDQUFkOztJQUVxQkcsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHdCQUF1QixVQUExQyxFQUFiLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLGlCQUFXQztBQURELEssUUFJWkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLENBREw7QUFFTEMsZ0JBQVUsS0FGTDtBQUdMQyxlQUFTLENBQUMsRUFBRUMsTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQXhCLEVBQUQsRUFBOEIsRUFBRUQsTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQXhCLEVBQTlCLENBSEosRUFHZ0U7QUFDckVDLGtCQUFZLENBSlAsRUFJVTtBQUNmQyxtQkFBYSxFQUxSLEVBS1k7QUFDakJDLGdCQUFVLElBTkwsRUFNVztBQUNoQkMscUJBQWUsSUFQVixFQU9nQjtBQUNyQkMscUJBQWUsSUFSVixFQVFnQjtBQUNyQkMsa0JBQVksSUFUUCxFQVNhO0FBQ2xCQywwQkFBb0IsRUFWZixFQVVtQjtBQUN4QkMsa0JBQVksRUFYUCxFQVdXO0FBQ2hCQyxvQkFBYyxFQVpULEVBWWE7QUFDbEJDLFlBQU0sRUFiRCxF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LEVBQWtELENBQWxEO0FBQ0Q7QUFDRixPQTNDRDtBQTRDRDs7OztFQXRLZ0NrQixlQUFLQyxJOztrQkFBbkJ4RixLIiwiZmlsZSI6InNlY2tpbGxTaG9wRGV0YWlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG1hc2sgZnJvbSAnLi4vY29tcG9uZW50cy9tYXNrJztcclxudmFyIHRpbWVyID0gcmVxdWlyZSgnLi4vdXRpbHMvd3hUaW1lci5qcycpOyAvLyDlgJLorqHml7ZcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICcuLi91dGlscy9iYXNlLmpzJztcclxudmFyIFd4UGFyc2UgPSByZXF1aXJlKCcuLi91dGlscy93eFBhcnNlL3d4UGFyc2UuanMnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImF0dHJzbWFza1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiYXR0ckZsYWdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgYXR0cnNtYXNrOiBtYXNrXHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBnb29kc051bTogMSxcclxuICAgIGF0dHJGbGFnOiBmYWxzZSxcclxuICAgIHRhYkxpc3Q6IFt7IG5hbWU6ICfllYblk4Hku4vnu40nLCBkb3ROdW06IDIgfSwgeyBuYW1lOiAn5Zu+5paH6K+m5oOFJywgZG90TnVtOiAzIH1dLCAvLyDpobbpg6jpgInpobnljaFcclxuICAgIGN1cnJlbnRUYWI6IDAsIC8vIOmhtumDqOmAiemhueWNoee0ouW8lVxyXG4gICAgd3hUaW1lckxpc3Q6IHt9LCAvLyDlgJLorqHml7ZcclxuICAgIGdvb2RzX2lkOiBudWxsLCAvL+WVhuWTgWdvb2RzX2lkXHJcbiAgICByZXF1ZXN0SW1nVXJsOiBudWxsLCAvL+WbvueJh+Wfn+WQjVxyXG4gICAgZ29vZHNfY29udGVudDogbnVsbCwgLy8g5ZWG5ZOB5YaF5a65XHJcbiAgICBzdG9yZV9pbmZvOiBudWxsLCAvLyDlupfpk7rkv6Hmga9cclxuICAgIGdvb2RzX2NvbW1lbmRfbGlzdDogW10sIC8v5o6o6I2Q5ZWG5ZOB5YiX6KGoXHJcbiAgICBpbWFnZV9saXN0OiBbXSwgLy8g5ZWG5ZOB6L2u5pKt5Zu+XHJcbiAgICBjb250cmFjdGxpc3Q6IHt9LCAvLyDllYblk4HmnI3liqHor7TmmI5cclxuICAgIGF0dHI6IFtdLCAgLy8g5ZWG5ZOB5oC75bGe5oCn5pWw57uEXHJcbiAgICBhY3RpdmVBdHRyOiBbXSwgLy8g5b2T5YmN54K55Ye75bGe5oCn5pWw57uEXHJcbiAgICBnb29kc19zcGVjOiBbXSwgLy8g6buY6K6k5bGe5oCn5pWw57uEXHJcbiAgICBzcGVjX2xpc3Q6IHt9LCAvLyDmiYDmnInlsZ7mgKflr7nlupTnmoTllYblk4Fnb29kc19pZFxyXG4gICAgZW5kX3RpbWU6IDAsIC8vIOWAkuiuoeaXtlxyXG5cclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG9uU2hvdygpIHt9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOWIh+aNoumhtumDqOWvvOiIqlxyXG4gICAgc3dpdGNoTmF2KGlkeCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRUYWIgPSBpZHg7XHJcbiAgICB9LFxyXG4gICAgLy8g5pi+56S66YCJ5oup5ZWG5ZOB5qGGXHJcbiAgICBzaG93QXR0ck1hc2sgKCkge1xyXG4gICAgICB0aGlzLmF0dHJGbGFnID0gdHJ1ZVxyXG4gICAgfSxcclxuICAgIGF0dHJCdG5TdWJtaXQoKXtcclxuICAgICAgaWYodGhpcy53eFRpbWVyTGlzdC5maXJzdFRpbWVyLnd4VGltZXJTZWNvbmQgPD0gMCkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+acrOWcuuW3sue7k+adn++8jOivt+etieW+heS4i+Wcuua0u+WKqCcsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICAgIHZhciBnb29kc19pZCA9IHRoaXMuZ29vZHNfaWRcclxuICAgICAgdmFyIGdvb2RzTnVtID0gdGhpcy5nb29kc051bVxyXG4gICAgICB2YXIgY2FydF9pZCA9IGAke2dvb2RzX2lkfXwke2dvb2RzTnVtfWBcclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkubWVtYmVyQnV5T25lLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGNhcnRfaWQsXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICByZXMuZGF0YXMuY2FydF9pZCA9IGNhcnRfaWRcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLm9yZGVySW5mbyA9IHJlcy5kYXRhc1xyXG4gICAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6ICcvcGFnZXMvc2V0dGxlbWVudCcgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIG5hdkdvb2RzRGV0YWlscyhnb29kc19pZCwgc2FsZV90eXBlKSB7XHJcbiAgICAgIC8vIG5hdmlnYXRlXHJcbiAgICAgIGlmKHNhbGVfdHlwZSA9PSAncnVzaHNhbGVzJykge1xyXG4gICAgICAgIHRoaXMuJHJlZGlyZWN0KGAvcGFnZXMvc2Vja2lsbFNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy4kcmVkaXJlY3QoYC9wYWdlcy9zaG9wRGV0YWlscz9nb29kc19pZD0ke2dvb2RzX2lkfWApO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2hhbmdlQXR0cihpbmRleCwgaWR4LCBlbGUpe1xyXG4gICAgICB0aGlzLmFjdGl2ZUF0dHJbaW5kZXhdID0gaWR4XHJcbiAgICAgIHRoaXMuZ29vZHNfc3BlY1tpbmRleF0gPSBlbGVcclxuICAgICAgdmFyIGdvb2RzX2lkID0gdGhpcy5zcGVjX2xpc3RbdGhpcy5hY3RpdmVBdHRyLmpvaW4oJ3wnKV1cclxuICAgICAgdGhpcy5nb29kc19pZCA9IGdvb2RzX2lkO1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIHRoaXMuZ2V0U2hvcERldGFpbHMoKVxyXG4gICAgfSxcclxuICAgIGFkZE51bSgpIHtcclxuICAgICAgLy8gMOS4jemZkOi0rSAgIG4g6ZmQ6LStbuS7tlxyXG4gICAgICB2YXIgdXBwZXJfbGltaXQgPSB0aGlzLmdvb2RzX2NvbnRlbnQudXBwZXJfbGltaXQgIFxyXG4gICAgICBpZih1cHBlcl9saW1pdCAhPSAwICYmIE51bWJlcih1cHBlcl9saW1pdCkgPD0gTnVtYmVyKHRoaXMuZ29vZHNOdW0pKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiBg5Y2V5qyh5pyA5aSa6YCJ5oupJHt1cHBlcl9saW1pdH3ku7bllYblk4FgLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmdvb2RzTnVtID0gdXBwZXJfbGltaXRcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmdvb2RzTnVtICsrXHJcbiAgICAgIH1cclxuICAgICBcclxuICAgIH0sXHJcbiAgICByZWR1TnVtKCl7XHJcbiAgICAgIGlmKHRoaXMuZ29vZHNOdW0gPD0gMSkge1xyXG4gICAgICAgIHRoaXMuZ29vZHNOdW0gPSAxXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5nb29kc051bS0tXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG9uTG9hZCh0KSB7XHJcbiAgICB0aGlzLmdvb2RzX2lkID0gdC5nb29kc19pZDtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB0aGlzLmdldFNob3BEZXRhaWxzKClcclxuICB9XHJcblxyXG4gIGdldFNob3BEZXRhaWxzKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgLy8g56eS5p2A5ZWG5ZOB6K+m5oOFXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkub3JkaW5hcnlHb29kc0R0YWlsLFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGdvb2RzX2lkOiB0aGlzLmdvb2RzX2lkLFxyXG4gICAgICAgIHNhbGVfdHlwZTogJ3J1c2hzYWxlcydcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLmdvb2RzTnVtID0gMVxyXG4gICAgICAgIHRoaXMuZ29vZHNfY29udGVudCA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50XHJcbiAgICAgICAgdGhpcy5jb250cmFjdGxpc3QgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudC5jb250cmFjdGxpc3QgfHwge31cclxuICAgICAgICB0aGlzLmltYWdlX2xpc3QgPSByZXMuZGF0YXMuaW1hZ2VfbGlzdCB8fCBbXVxyXG4gICAgICAgIHRoaXMuc3RvcmVfaW5mbyA9IHJlcy5kYXRhcy5zdG9yZV9pbmZvXHJcbiAgICAgICAgdGhpcy5nb29kc19jb21tZW5kX2xpc3QgPSByZXMuZGF0YXMuZ29vZHNfY29tbWVuZF9saXN0XHJcbiAgICAgICAgLy8g5ZWG5ZOB5bGe5oCnXHJcbiAgICAgICAgdmFyIHNwZWNfbmFtZSA9IE9iamVjdC52YWx1ZXMocmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuc3BlY19uYW1lIHx8IHt9KVxyXG4gICAgICAgIHZhciBzcGVjX3ZhbHVlID0gT2JqZWN0LnZhbHVlcyhyZXMuZGF0YXMuZ29vZHNfY29udGVudC5zcGVjX3ZhbHVlIHx8IHt9KVxyXG4gICAgICAgIHZhciBhdHRyID0gW11cclxuICAgICAgICBzcGVjX3ZhbHVlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICBpZighYXR0cltpbmRleF0pIHtcclxuICAgICAgICAgICAgYXR0cltpbmRleF0gPSB7fVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYXR0cltpbmRleF0udGl0bGUgPSBzcGVjX25hbWVbaW5kZXhdIFxyXG4gICAgICAgICAgYXR0cltpbmRleF0ucHJvcCA9IGl0ZW1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuYXR0ciA9IGF0dHJcclxuICAgICAgICB0aGlzLmdvb2RzX3NwZWMgPSBPYmplY3QudmFsdWVzKHJlcy5kYXRhcy5nb29kc19jb250ZW50Lmdvb2RzX3NwZWMgfHwge30pXHJcbiAgICAgICAgdGhpcy5hY3RpdmVBdHRyID0gT2JqZWN0LmtleXMocmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuZ29vZHNfc3BlYyB8fCB7fSlcclxuICAgICAgICB0aGlzLnNwZWNfbGlzdCA9IHJlcy5kYXRhcy5zcGVjX2xpc3RcclxuICAgICAgICAvLyDlgJLorqHml7ZcclxuICAgICAgICB2YXIgZW5kX3RpbWUgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudC5lbmRfdGltZSB8fCAwXHJcbiAgICAgICAgdmFyIHd4VGltZXIgPSBuZXcgdGltZXIoe1xyXG4gICAgICAgICAgYmVnaW5UaW1lOiBlbmRfdGltZSxcclxuICAgICAgICAgIG5hbWU6ICdmaXJzdFRpbWVyJyxcclxuICAgICAgICAgIGNvbXBsZXRlKCkge31cclxuICAgICAgICB9KTtcclxuICAgICAgICB3eFRpbWVyLnN0YXJ0KHRoaXMpO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB2YXIgYXJ0aWNsZSA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50Lmdvb2RzX2JvZHlcclxuICAgICAgICAvLyBhcnRpY2xlID0gYXJ0aWNsZS5yZXBsYWNlKC9zcmM9XCIvZywgYHNyYz1cIiR7dGhhdC5yZXF1ZXN0SW1nVXJsfWApO1xyXG4gICAgICAgIFd4UGFyc2Uud3hQYXJzZSgnYXJ0aWNsZScsICdodG1sJywgYXJ0aWNsZSwgdGhhdCwgNSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=