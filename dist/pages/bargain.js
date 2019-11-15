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
      address: ''

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
      console.log(address);
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
      (0, _ajax.ajax)({
        url: api.bargainGoodsList
      }).then(function (res) {
        _this3.barginData = res.datas.list;
        _this3.$apply();
      });

      (0, _ajax.ajax)({
        url: api.memberKj
      }).then(function (res) {
        _this3.topImg = res.datas.img_area;
        _this3.$apply();
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/bargain'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhcmdhaW4uanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImF0dHJzbWFzayIsIm1hc2siLCJhZGRyZXNzbWFzayIsInNoYXJlc21hc2siLCJtaXhpbnMiLCJkYXRhIiwiZ29vZHNOdW0iLCJwcm9wQXJyIiwiYXR0ckZsYWciLCJhZGRyZXNzRmxhZyIsInNoYXJlRmxhZyIsInJlcXVlc3RJbWdVcmwiLCJiYXJnaW5EYXRhIiwidG9wSW1nIiwiZ29vZHNfaWQiLCJhdHRyIiwidGl0bGUiLCJwcm9wIiwiYWN0aXZlQXR0ciIsImdvb2RzX3NwZWMiLCJzcGVjX2xpc3QiLCJpbWFnZV9saXN0IiwiZ29vZHNfY29udGVudCIsImFkZHJlc3MiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJhZGRyZXNzQnRuU3VibWl0IiwiYXR0ckJ0blN1Ym1pdCIsInJlZHVOdW0iLCJhZGROdW0iLCJqdW1wVGltZURldGFpbHMiLCJqb2luIiwiJGFwcGx5IiwiZ2V0U2hvcERldGFpbHMiLCJoaWRlTWFzayIsImNoYW5nZUF0dHIiLCJpbmRleCIsImlkeCIsImVsZSIsImV2ZW50cyIsImFwcCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiY29uc29sZSIsImxvZyIsInRoYXQiLCJ1cmwiLCJvcmRpbmFyeUdvb2RzRHRhaWwiLCJ0eXBlIiwidGhlbiIsInJlcyIsImNvZGUiLCJkYXRhcyIsInNwZWNfbmFtZSIsIk9iamVjdCIsInZhbHVlcyIsInNwZWNfdmFsdWUiLCJmb3JFYWNoIiwiaXRlbSIsImtleXMiLCJiYXJnYWluR29vZHNMaXN0IiwibGlzdCIsIm1lbWJlcktqIiwiaW1nX2FyZWEiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBREEsSUFBSUEs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QUlFLEtBQUosQ0FBVTlCLGFBQVYsQ0FBd0JILFVBQXBDLENBQWxCO0FBQ0EsaUJBQUtDLFNBQUwsR0FBaUI4QixJQUFJRSxLQUFKLENBQVVoQyxTQUEzQjtBQUNBLGlCQUFLWSxNQUFMO0FBQ0Q7QUFDRixPQTVCRDtBQTZCRDs7OzZCQUlRO0FBQUE7O0FBQ1AsV0FBS3JCLGFBQUwsR0FBcUIsS0FBSzhCLE9BQUwsQ0FBYUMsVUFBYixDQUF3Qi9CLGFBQTdDO0FBQ0Esc0JBQUs7QUFDSG1DLGFBQUt2RCxJQUFJcUU7QUFETixPQUFMLEVBRUdYLElBRkgsQ0FFUSxlQUFPO0FBQ2IsZUFBS3JDLFVBQUwsR0FBa0JzQyxJQUFJRSxLQUFKLENBQVVTLElBQTVCO0FBQ0EsZUFBSzdCLE1BQUw7QUFDRCxPQUxEOztBQU9BLHNCQUFLO0FBQ0hjLGFBQUt2RCxJQUFJdUU7QUFETixPQUFMLEVBRUdiLElBRkgsQ0FFUSxlQUFPO0FBQ2IsZUFBS3BDLE1BQUwsR0FBY3FDLElBQUlFLEtBQUosQ0FBVVcsUUFBeEI7QUFDQSxlQUFLL0IsTUFBTDtBQUNELE9BTEQ7QUFRRDs7OztFQXRJZ0NnQyxlQUFLQyxJOztrQkFBbkJ4RSxLIiwiZmlsZSI6ImJhcmdhaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBtYXNrIGZyb20gJy4uL2NvbXBvbmVudHMvbWFzayc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnoI3ku7cnXHJcbiAgfTtcclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYXR0cnNtYXNrXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDptYXNrRmxhZy5zeW5jXCI6XCJhdHRyRmxhZ1wifSxcImFkZHJlc3NtYXNrXCI6e1widi1iaW5kOm1hc2tGbGFnLnN5bmNcIjpcImFkZHJlc3NGbGFnXCJ9LFwic2hhcmVzbWFza1wiOntcInYtYmluZDptYXNrRmxhZy5zeW5jXCI6XCJzaGFyZUZsYWdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgYXR0cnNtYXNrOiBtYXNrLFxyXG4gICAgYWRkcmVzc21hc2s6IG1hc2ssXHJcbiAgICBzaGFyZXNtYXNrOiBtYXNrXHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBnb29kc051bTogMSxcclxuICAgIHByb3BBcnI6IFsxLCAyLCAzXSxcclxuICAgIGF0dHJGbGFnOiBmYWxzZSwgLy/lsZ7mgKflvLnmoYZcclxuICAgIGFkZHJlc3NGbGFnOiBmYWxzZSwgLy/lnLDlnYDlvLnmoYZcclxuICAgIHNoYXJlRmxhZzogZmFsc2UsIC8v5YiG5Lqr5by55qGGXHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGJhcmdpbkRhdGE6IFtdLFxyXG4gICAgdG9wSW1nOiAnJyxcclxuICAgIGdvb2RzX2lkOiAnJywgLy/lvZPliY3llYblk4FpZFxyXG4gICAgYXR0cjogW3t0aXRsZTogJ+Wkp+WwjycsIHByb3A6IHsnMzEnOiAn5aSnJywnMzInOiAn5bCPJyB9IH1dLCAgLy8g5ZWG5ZOB5oC75bGe5oCn5pWw57uEXHJcbiAgICBhY3RpdmVBdHRyOiBbXSwgLy8g5b2T5YmN54K55Ye75bGe5oCn5pWw57uEXHJcbiAgICBnb29kc19zcGVjOiBbXSwgLy8g6buY6K6k5bGe5oCn5pWw57uEXHJcbiAgICBzcGVjX2xpc3Q6IHt9LCAvLyDmiYDmnInlsZ7mgKflr7nlupTnmoTllYblk4Fnb29kc19pZFxyXG4gICAgaW1hZ2VfbGlzdDogW10sIC8vIOWVhuWTgei9ruaSreWbvlxyXG4gICAgZ29vZHNfY29udGVudDogJycsXHJcbiAgICBhZGRyZXNzOiAnJ1xyXG5cclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG9uU2hvdygpIHtcclxuICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICB2YXIgYWRkcmVzcyA9IGFwcC5nbG9iYWxEYXRhLmFkZHJlc3NcclxuICAgIHRoaXMuYWRkcmVzcyA9IGFkZHJlc3NcclxuICAgIGNvbnNvbGUubG9nKGFkZHJlc3MpXHJcbiAgICBcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGFkZHJlc3NCdG5TdWJtaXQoKSB7XHJcbiAgICAgIHRoaXMuYWRkcmVzc0ZsYWcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zaGFyZUZsYWcgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGF0dHJCdG5TdWJtaXQoKSB7XHJcbiAgICAgIHRoaXMuYXR0ckZsYWcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5hZGRyZXNzRmxhZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgcmVkdU51bSgpIHtcclxuICAgICAgaWYgKHRoaXMuZ29vZHNOdW0gPT0gMSkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmdvb2RzTnVtLS07XHJcbiAgICB9LFxyXG4gICAgYWRkTnVtKCkge1xyXG4gICAgICB0aGlzLmdvb2RzTnVtKys7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDot7PovazllYblk4Hor6bmg4VcclxuICAgICAqL1xyXG4gICAganVtcFRpbWVEZXRhaWxzKGdvb2RzX2lkLCBqb2luKSB7XHJcbiAgICAgIC8vIGlmKGpvaW4gPT0gMCkge1xyXG4gICAgICAgIHRoaXMuYXR0ckZsYWcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ29vZHNfaWQgPSBnb29kc19pZFxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB0aGlzLmdldFNob3BEZXRhaWxzKClcclxuICAgICAgLy8gfVxyXG4gICAgfSxcclxuICAgIGhpZGVNYXNrKCkge30sXHJcbiAgICBjaGFuZ2VBdHRyKGluZGV4LCBpZHgsIGVsZSl7XHJcbiAgICAgIHRoaXMuYWN0aXZlQXR0cltpbmRleF0gPSBpZHhcclxuICAgICAgdGhpcy5nb29kc19zcGVjW2luZGV4XSA9IGVsZVxyXG4gICAgICB2YXIgZ29vZHNfaWQgPSB0aGlzLnNwZWNfbGlzdFt0aGlzLmFjdGl2ZUF0dHIuam9pbignfCcpXVxyXG4gICAgICB0aGlzLmdvb2RzX2lkID0gZ29vZHNfaWQ7XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgdGhpcy5nZXRTaG9wRGV0YWlscygpXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIGdldFNob3BEZXRhaWxzKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgLy8g5pmu6YCa5ZWG5ZOB6K+m5oOFXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkub3JkaW5hcnlHb29kc0R0YWlsLFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGdvb2RzX2lkOiB0aGlzLmdvb2RzX2lkXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc19jb250ZW50ID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnRcclxuICAgICAgICB0aGlzLmltYWdlX2xpc3QgPSByZXMuZGF0YXMuaW1hZ2VfbGlzdCB8fCBbXVxyXG4gICAgICAgIC8vIOWVhuWTgeWxnuaAp1xyXG4gICAgICAgIHZhciBzcGVjX25hbWUgPSBPYmplY3QudmFsdWVzKHJlcy5kYXRhcy5nb29kc19jb250ZW50LnNwZWNfbmFtZSlcclxuICAgICAgICB2YXIgc3BlY192YWx1ZSA9IE9iamVjdC52YWx1ZXMocmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuc3BlY192YWx1ZSlcclxuICAgICAgICB2YXIgYXR0ciA9IFtdXHJcbiAgICAgICAgc3BlY192YWx1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgaWYoIWF0dHJbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgIGF0dHJbaW5kZXhdID0ge31cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGF0dHJbaW5kZXhdLnRpdGxlID0gc3BlY19uYW1lW2luZGV4XSBcclxuICAgICAgICAgIGF0dHJbaW5kZXhdLnByb3AgPSBpdGVtXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmF0dHIgPSBhdHRyXHJcbiAgICAgICAgY29uc29sZS5sb2coYXR0cilcclxuICAgICAgICB0aGlzLmdvb2RzX3NwZWMgPSBPYmplY3QudmFsdWVzKHJlcy5kYXRhcy5nb29kc19jb250ZW50Lmdvb2RzX3NwZWMpXHJcbiAgICAgICAgdGhpcy5hY3RpdmVBdHRyID0gT2JqZWN0LmtleXMocmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuZ29vZHNfc3BlYylcclxuICAgICAgICB0aGlzLnNwZWNfbGlzdCA9IHJlcy5kYXRhcy5zcGVjX2xpc3RcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuYmFyZ2Fpbkdvb2RzTGlzdFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLmJhcmdpbkRhdGEgPSByZXMuZGF0YXMubGlzdFxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG5cclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5tZW1iZXJLaixcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy50b3BJbWcgPSByZXMuZGF0YXMuaW1nX2FyZWFcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuXHJcbiAgIFxyXG4gIH1cclxufVxyXG4iXX0=