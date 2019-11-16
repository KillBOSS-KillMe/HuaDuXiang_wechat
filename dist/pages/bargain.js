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
      navigationBarTitleText: '砍价'
    }, _this.$repeat = {}, _this.$props = { "attrsmask": { "xmlns:v-bind": "", "v-bind:maskFlag.sync": "attrFlag" }, "addressmask": { "v-bind:maskFlag.sync": "addressFlag" }, "sharesmask": { "v-bind:maskFlag.sync": "shareFlag" } }, _this.$events = {}, _this.components = {
      attrsmask: _mask2.default,
      addressmask: _mask2.default,
      sharesmask: _mask2.default
    }, _this.mixins = [], _this.data = {
      goodsNum: 1,
      propArr: [1, 2, 3],
      attrFlag: false, //属性弹框
      addressFlag: false, //地址弹框
      shareFlag: false, //分享弹框
      requestImgUrl: '',
      barginData: [],
      topImg: '',
      goods_id: '', //当前商品id
      attr: [{ title: '大小', prop: { '31': '大', '32': '小' } }], // 商品总属性数组
      activeAttr: [], // 当前点击属性数组
      goods_spec: [], // 默认属性数组
      spec_list: {}, // 所有属性对应的商品goods_id
      image_list: [], // 商品轮播图
      goods_content: '',
      address: '',
      curpage: 1, //当前页数
      hasmore: false, //是否有下一页
      state: '' // 没有数据
    }, _this.computed = {}, _this.methods = {
      addressBtnSubmit: function addressBtnSubmit() {
        this.addressFlag = false;
        this.shareFlag = true;
      },
      attrBtnSubmit: function attrBtnSubmit() {
        this.attrFlag = false;
        this.addressFlag = true;
      },
      reduNum: function reduNum() {
        if (this.goodsNum == 1) return;
        this.goodsNum--;
      },
      addNum: function addNum() {
        this.goodsNum++;
      },

      /**
       * 跳转商品详情
       */
      jumpTimeDetails: function jumpTimeDetails(goods_id, join) {
        // if(join == 0) {
        this.attrFlag = true;
        this.goods_id = goods_id;
        this.$apply();
        this.getShopDetails();
        // }
      },
      hideMask: function hideMask() {},
      changeAttr: function changeAttr(index, idx, ele) {
        this.activeAttr[index] = idx;
        this.goods_spec[index] = ele;
        var goods_id = this.spec_list[this.activeAttr.join('|')];
        this.goods_id = goods_id;
        this.$apply();
        this.getShopDetails();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {
      var app = this.$parent;
      var address = app.globalData.address;
      this.address = address;
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
          _this2.image_list = res.datas.image_list || [];
          // 商品属性
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
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this3 = this;

      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      this.bargainGoodsList();

      (0, _ajax.ajax)({
        url: api.memberKj
      }).then(function (res) {
        _this3.topImg = res.datas.img_area;
        _this3.$apply();
      });
    }
  }, {
    key: 'bargainGoodsList',
    value: function bargainGoodsList() {
      var _this4 = this;

      (0, _ajax.ajax)({
        url: api.bargainGoodsList,
        data: {
          page: 10,
          curpage: this.curpage
        }
      }).then(function (res) {
        _this4.barginData = res.datas.list;

        _this4.hasmore = res.datas.hasmore;
        _this4.hasmore = res.datas.state;
        _this4.$apply();
      });
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.hasmore) {
        this.curpage++;
        this.requestIndexGoodsList();
      }
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/bargain'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhcmdhaW4uanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImF0dHJzbWFzayIsIm1hc2siLCJhZGRyZXNzbWFzayIsInNoYXJlc21hc2siLCJtaXhpbnMiLCJkYXRhIiwiZ29vZHNOdW0iLCJwcm9wQXJyIiwiYXR0ckZsYWciLCJhZGRyZXNzRmxhZyIsInNoYXJlRmxhZyIsInJlcXVlc3RJbWdVcmwiLCJiYXJnaW5EYXRhIiwidG9wSW1nIiwiZ29vZHNfaWQiLCJhdHRyIiwidGl0bGUiLCJwcm9wIiwiYWN0aXZlQXR0ciIsImdvb2RzX3NwZWMiLCJzcGVjX2xpc3QiLCJpbWFnZV9saXN0IiwiZ29vZHNfY29udGVudCIsImFkZHJlc3MiLCJjdXJwYWdlIiwiaGFzbW9yZSIsInN0YXRlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYWRkcmVzc0J0blN1Ym1pdCIsImF0dHJCdG5TdWJtaXQiLCJyZWR1TnVtIiwiYWRkTnVtIiwianVtcFRpbWVEZXRhaWxzIiwiam9pbiIsIiRhcHBseSIsImdldFNob3BEZXRhaWxzIiwiaGlkZU1hc2siLCJjaGFuZ2VBdHRyIiwiaW5kZXgiLCJpZHgiLCJlbGUiLCJldmVudHMiLCJhcHAiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInRoYXQiLCJ1cmwiLCJvcmRpbmFyeUdvb2RzRHRhaWwiLCJ0eXBlIiwidGhlbiIsInJlcyIsImNvZGUiLCJkYXRhcyIsInNwZWNfbmFtZSIsIk9iamVjdCIsInZhbHVlcyIsInNwZWNfdmFsdWUiLCJmb3JFYWNoIiwiaXRlbSIsImNvbnNvbGUiLCJsb2ciLCJrZXlzIiwiYmFyZ2Fpbkdvb2RzTGlzdCIsIm1lbWJlcktqIiwiaW1nX2FyZWEiLCJwYWdlIiwibGlzdCIsInJlcXVlc3RJbmRleEdvb2RzTGlzdCIsIndlcHkiXSwibWFwcGluZ3Mi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aW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBtYXNrIGZyb20gJy4uL2NvbXBvbmVudHMvbWFzayc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnoI3ku7cnXHJcbiAgfTtcclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYXR0cnNtYXNrXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDptYXNrRmxhZy5zeW5jXCI6XCJhdHRyRmxhZ1wifSxcImFkZHJlc3NtYXNrXCI6e1widi1iaW5kOm1hc2tGbGFnLnN5bmNcIjpcImFkZHJlc3NGbGFnXCJ9LFwic2hhcmVzbWFza1wiOntcInYtYmluZDptYXNrRmxhZy5zeW5jXCI6XCJzaGFyZUZsYWdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgYXR0cnNtYXNrOiBtYXNrLFxyXG4gICAgYWRkcmVzc21hc2s6IG1hc2ssXHJcbiAgICBzaGFyZXNtYXNrOiBtYXNrXHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBnb29kc051bTogMSxcclxuICAgIHByb3BBcnI6IFsxLCAyLCAzXSxcclxuICAgIGF0dHJGbGFnOiBmYWxzZSwgLy/lsZ7mgKflvLnmoYZcclxuICAgIGFkZHJlc3NGbGFnOiBmYWxzZSwgLy/lnLDlnYDlvLnmoYZcclxuICAgIHNoYXJlRmxhZzogZmFsc2UsIC8v5YiG5Lqr5by55qGGXHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGJhcmdpbkRhdGE6IFtdLFxyXG4gICAgdG9wSW1nOiAnJyxcclxuICAgIGdvb2RzX2lkOiAnJywgLy/lvZPliY3llYblk4FpZFxyXG4gICAgYXR0cjogW3t0aXRsZTogJ+Wkp+WwjycsIHByb3A6IHsnMzEnOiAn5aSnJywnMzInOiAn5bCPJyB9IH1dLCAgLy8g5ZWG5ZOB5oC75bGe5oCn5pWw57uEXHJcbiAgICBhY3RpdmVBdHRyOiBbXSwgLy8g5b2T5YmN54K55Ye75bGe5oCn5pWw57uEXHJcbiAgICBnb29kc19zcGVjOiBbXSwgLy8g6buY6K6k5bGe5oCn5pWw57uEXHJcbiAgICBzcGVjX2xpc3Q6IHt9LCAvLyDmiYDmnInlsZ7mgKflr7nlupTnmoTllYblk4Fnb29kc19pZFxyXG4gICAgaW1hZ2VfbGlzdDogW10sIC8vIOWVhuWTgei9ruaSreWbvlxyXG4gICAgZ29vZHNfY29udGVudDogJycsXHJcbiAgICBhZGRyZXNzOiAnJyxcclxuICAgIGN1cnBhZ2U6IDEsIC8v5b2T5YmN6aG15pWwXHJcbiAgICBoYXNtb3JlOiBmYWxzZSwgLy/mmK/lkKbmnInkuIvkuIDpobVcclxuICAgIHN0YXRlOiAnJywgLy8g5rKh5pyJ5pWw5o2uXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBvblNob3coKSB7XHJcbiAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgdmFyIGFkZHJlc3MgPSBhcHAuZ2xvYmFsRGF0YS5hZGRyZXNzXHJcbiAgICB0aGlzLmFkZHJlc3MgPSBhZGRyZXNzXHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBhZGRyZXNzQnRuU3VibWl0KCkge1xyXG4gICAgICB0aGlzLmFkZHJlc3NGbGFnID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2hhcmVGbGFnID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBhdHRyQnRuU3VibWl0KCkge1xyXG4gICAgICB0aGlzLmF0dHJGbGFnID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYWRkcmVzc0ZsYWcgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIHJlZHVOdW0oKSB7XHJcbiAgICAgIGlmICh0aGlzLmdvb2RzTnVtID09IDEpIHJldHVybjtcclxuICAgICAgdGhpcy5nb29kc051bS0tO1xyXG4gICAgfSxcclxuICAgIGFkZE51bSgpIHtcclxuICAgICAgdGhpcy5nb29kc051bSsrO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog6Lez6L2s5ZWG5ZOB6K+m5oOFXHJcbiAgICAgKi9cclxuICAgIGp1bXBUaW1lRGV0YWlscyhnb29kc19pZCwgam9pbikge1xyXG4gICAgICAvLyBpZihqb2luID09IDApIHtcclxuICAgICAgICB0aGlzLmF0dHJGbGFnID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmdvb2RzX2lkID0gZ29vZHNfaWRcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgdGhpcy5nZXRTaG9wRGV0YWlscygpXHJcbiAgICAgIC8vIH1cclxuICAgIH0sXHJcbiAgICBoaWRlTWFzaygpIHt9LFxyXG4gICAgY2hhbmdlQXR0cihpbmRleCwgaWR4LCBlbGUpe1xyXG4gICAgICB0aGlzLmFjdGl2ZUF0dHJbaW5kZXhdID0gaWR4XHJcbiAgICAgIHRoaXMuZ29vZHNfc3BlY1tpbmRleF0gPSBlbGVcclxuICAgICAgdmFyIGdvb2RzX2lkID0gdGhpcy5zcGVjX2xpc3RbdGhpcy5hY3RpdmVBdHRyLmpvaW4oJ3wnKV1cclxuICAgICAgdGhpcy5nb29kc19pZCA9IGdvb2RzX2lkO1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIHRoaXMuZ2V0U2hvcERldGFpbHMoKVxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICBnZXRTaG9wRGV0YWlscygpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIC8vIOaZrumAmuWVhuWTgeivpuaDhVxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm9yZGluYXJ5R29vZHNEdGFpbCxcclxuICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBnb29kc19pZDogdGhpcy5nb29kc19pZFxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHRoaXMuZ29vZHNfY29udGVudCA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50XHJcbiAgICAgICAgdGhpcy5pbWFnZV9saXN0ID0gcmVzLmRhdGFzLmltYWdlX2xpc3QgfHwgW11cclxuICAgICAgICAvLyDllYblk4HlsZ7mgKdcclxuICAgICAgICB2YXIgc3BlY19uYW1lID0gT2JqZWN0LnZhbHVlcyhyZXMuZGF0YXMuZ29vZHNfY29udGVudC5zcGVjX25hbWUpXHJcbiAgICAgICAgdmFyIHNwZWNfdmFsdWUgPSBPYmplY3QudmFsdWVzKHJlcy5kYXRhcy5nb29kc19jb250ZW50LnNwZWNfdmFsdWUpXHJcbiAgICAgICAgdmFyIGF0dHIgPSBbXVxyXG4gICAgICAgIHNwZWNfdmFsdWUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGlmKCFhdHRyW2luZGV4XSkge1xyXG4gICAgICAgICAgICBhdHRyW2luZGV4XSA9IHt9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBhdHRyW2luZGV4XS50aXRsZSA9IHNwZWNfbmFtZVtpbmRleF0gXHJcbiAgICAgICAgICBhdHRyW2luZGV4XS5wcm9wID0gaXRlbVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5hdHRyID0gYXR0clxyXG4gICAgICAgIGNvbnNvbGUubG9nKGF0dHIpXHJcbiAgICAgICAgdGhpcy5nb29kc19zcGVjID0gT2JqZWN0LnZhbHVlcyhyZXMuZGF0YXMuZ29vZHNfY29udGVudC5nb29kc19zcGVjKVxyXG4gICAgICAgIHRoaXMuYWN0aXZlQXR0ciA9IE9iamVjdC5rZXlzKHJlcy5kYXRhcy5nb29kc19jb250ZW50Lmdvb2RzX3NwZWMpXHJcbiAgICAgICAgdGhpcy5zcGVjX2xpc3QgPSByZXMuZGF0YXMuc3BlY19saXN0XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgdGhpcy5iYXJnYWluR29vZHNMaXN0KClcclxuXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkubWVtYmVyS2osXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMudG9wSW1nID0gcmVzLmRhdGFzLmltZ19hcmVhXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIGJhcmdhaW5Hb29kc0xpc3QoKSB7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuYmFyZ2Fpbkdvb2RzTGlzdCxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHBhZ2U6IDEwLFxyXG4gICAgICAgIGN1cnBhZ2U6IHRoaXMuY3VycGFnZVxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMuYmFyZ2luRGF0YSA9IHJlcy5kYXRhcy5saXN0XHJcblxyXG4gICAgICB0aGlzLmhhc21vcmUgPSByZXMuZGF0YXMuaGFzbW9yZVxyXG4gICAgICB0aGlzLmhhc21vcmUgPSByZXMuZGF0YXMuc3RhdGVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgb25SZWFjaEJvdHRvbSAoKSB7XHJcbiAgICBpZih0aGlzLmhhc21vcmUpIHtcclxuICAgICAgdGhpcy5jdXJwYWdlICsrIFxyXG4gICAgICB0aGlzLnJlcXVlc3RJbmRleEdvb2RzTGlzdCgpXHJcbiAgICB9XHJcbiAgfSAgXHJcbn1cclxuIl19