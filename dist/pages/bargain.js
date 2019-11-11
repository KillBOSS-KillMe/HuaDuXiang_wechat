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
      spec_list: {} // 所有属性对应的商品goods_id
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
        if (join == 0) {
          this.attrFlag = true;
          this.goods_id = goods_id;
          this.$apply();
          this.getShopDetails();
        }
      },
      hideMask: function hideMask() {}
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      // this.userInfo = this.$parent.globalData.userInfo
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      (0, _ajax.ajax)({
        url: api.bargainGoodsList
      }).then(function (res) {
        _this2.barginData = res.datas.list;
        _this2.$apply();
      });
    }
  }, {
    key: 'getShopDetails',
    value: function getShopDetails() {
      var _this3 = this;

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
          _this3.attr = attr;
          console.log(attr);
          _this3.goods_spec = Object.values(res.datas.goods_content.goods_spec);
          _this3.activeAttr = Object.keys(res.datas.goods_content.goods_spec);
          _this3.spec_list = res.datas.spec_list;
          _this3.$apply();
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this4 = this;

      this.requestImgUrl = this.$parent.globalData.requestImgUrl;

      (0, _ajax.ajax)({
        url: api.memberKj
      }).then(function (res) {
        _this4.topImg = res.datas.img_area;
        _this4.$apply();
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/bargain'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhcmdhaW4uanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImF0dHJzbWFzayIsIm1hc2siLCJhZGRyZXNzbWFzayIsInNoYXJlc21hc2siLCJtaXhpbnMiLCJkYXRhIiwiZ29vZHNOdW0iLCJwcm9wQXJyIiwiYXR0ckZsYWciLCJhZGRyZXNzRmxhZyIsInNoYXJlRmxhZyIsInJlcXVlc3RJbWdVcmwiLCJiYXJnaW5EYXRhIiwidG9wSW1nIiwiZ29vZHNfaWQiLCJhdHRyIiwidGl0bGUiLCJwcm9wIiwiYWN0aXZlQXR0ciIsImdvb2RzX3NwZWMiLCJzcGVjX2xpc3QiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJhZGRyZXNzQnRuU3VibWl0IiwiYXR0ckJ0blN1Ym1pdCIsInJlZHVOdW0iLCJhZGROdW0iLCJqdW1wVGltZURldGFpbHMiLCJqb2luIiwiJGFwcGx5IiwiZ2V0U2hvcERldGFpbHMiLCJoaWRlTWFzayIsImV2ZW50cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidXJsIiwiYmFyZ2Fpbkdvb2RzTGlzdCIsInRoZW4iLCJyZXMiLCJkYXRhcyIsImxpc3QiLCJ0aGF0Iiwib3JkaW5hcnlHb29kc0R0YWlsIiwidHlwZSIsImNvZGUiLCJzcGVjX25hbWUiLCJPYmplY3QiLCJ2YWx1ZXMiLCJnb29kc19jb250ZW50Iiwic3BlY192YWx1ZSIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJjb25zb2xlIiwibG9nIiwia2V5cyIsIm1lbWJlcktqIiwiaW1nX2FyZWEiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBR3FCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0s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ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgbWFzayBmcm9tICcuLi9jb21wb25lbnRzL21hc2snO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn56CN5Lu3J1xyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImF0dHJzbWFza1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiYXR0ckZsYWdcIn0sXCJhZGRyZXNzbWFza1wiOntcInYtYmluZDptYXNrRmxhZy5zeW5jXCI6XCJhZGRyZXNzRmxhZ1wifSxcInNoYXJlc21hc2tcIjp7XCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwic2hhcmVGbGFnXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIGF0dHJzbWFzazogbWFzayxcclxuICAgIGFkZHJlc3NtYXNrOiBtYXNrLFxyXG4gICAgc2hhcmVzbWFzazogbWFza1xyXG4gIH07XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgZ29vZHNOdW06IDEsXHJcbiAgICBwcm9wQXJyOiBbMSwgMiwgM10sXHJcbiAgICBhdHRyRmxhZzogZmFsc2UsIC8v5bGe5oCn5by55qGGXHJcbiAgICBhZGRyZXNzRmxhZzogZmFsc2UsIC8v5Zyw5Z2A5by55qGGXHJcbiAgICBzaGFyZUZsYWc6IGZhbHNlLCAvL+WIhuS6q+W8ueahhlxyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBiYXJnaW5EYXRhOiBbXSxcclxuICAgIHRvcEltZzogJycsXHJcbiAgICBnb29kc19pZDogJycsIC8v5b2T5YmN5ZWG5ZOBaWRcclxuICAgIGF0dHI6IFt7dGl0bGU6ICflpKflsI8nLCBwcm9wOiB7JzMxJzogJ+WkpycsJzMyJzogJ+WwjycgfSB9XSwgIC8vIOWVhuWTgeaAu+WxnuaAp+aVsOe7hFxyXG4gICAgYWN0aXZlQXR0cjogW10sIC8vIOW9k+WJjeeCueWHu+WxnuaAp+aVsOe7hFxyXG4gICAgZ29vZHNfc3BlYzogW10sIC8vIOm7mOiupOWxnuaAp+aVsOe7hFxyXG4gICAgc3BlY19saXN0OiB7fSAvLyDmiYDmnInlsZ7mgKflr7nlupTnmoTllYblk4Fnb29kc19pZFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25TaG93KCkge1xyXG4gICAgLy8gdGhpcy51c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvXHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmJhcmdhaW5Hb29kc0xpc3RcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5iYXJnaW5EYXRhID0gcmVzLmRhdGFzLmxpc3RcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGFkZHJlc3NCdG5TdWJtaXQoKSB7XHJcbiAgICAgIHRoaXMuYWRkcmVzc0ZsYWcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zaGFyZUZsYWcgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGF0dHJCdG5TdWJtaXQoKSB7XHJcbiAgICAgIHRoaXMuYXR0ckZsYWcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5hZGRyZXNzRmxhZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgcmVkdU51bSgpIHtcclxuICAgICAgaWYgKHRoaXMuZ29vZHNOdW0gPT0gMSkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmdvb2RzTnVtLS07XHJcbiAgICB9LFxyXG4gICAgYWRkTnVtKCkge1xyXG4gICAgICB0aGlzLmdvb2RzTnVtKys7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDot7PovazllYblk4Hor6bmg4VcclxuICAgICAqL1xyXG4gICAganVtcFRpbWVEZXRhaWxzKGdvb2RzX2lkLCBqb2luKSB7XHJcbiAgICAgIGlmKGpvaW4gPT0gMCkge1xyXG4gICAgICAgIHRoaXMuYXR0ckZsYWcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ29vZHNfaWQgPSBnb29kc19pZFxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB0aGlzLmdldFNob3BEZXRhaWxzKClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGhpZGVNYXNrKCkge31cclxuICB9O1xyXG5cclxuICBnZXRTaG9wRGV0YWlscygpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIC8vIOaZrumAmuWVhuWTgeivpuaDhVxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm9yZGluYXJ5R29vZHNEdGFpbCxcclxuICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBnb29kc19pZDogdGhpcy5nb29kc19pZFxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIC8vIOWVhuWTgeWxnuaAp1xyXG4gICAgICAgIHZhciBzcGVjX25hbWUgPSBPYmplY3QudmFsdWVzKHJlcy5kYXRhcy5nb29kc19jb250ZW50LnNwZWNfbmFtZSlcclxuICAgICAgICB2YXIgc3BlY192YWx1ZSA9IE9iamVjdC52YWx1ZXMocmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuc3BlY192YWx1ZSlcclxuICAgICAgICB2YXIgYXR0ciA9IFtdXHJcbiAgICAgICAgc3BlY192YWx1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgaWYoIWF0dHJbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgIGF0dHJbaW5kZXhdID0ge31cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGF0dHJbaW5kZXhdLnRpdGxlID0gc3BlY19uYW1lW2luZGV4XSBcclxuICAgICAgICAgIGF0dHJbaW5kZXhdLnByb3AgPSBpdGVtXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmF0dHIgPSBhdHRyXHJcbiAgICAgICAgY29uc29sZS5sb2coYXR0cilcclxuICAgICAgICB0aGlzLmdvb2RzX3NwZWMgPSBPYmplY3QudmFsdWVzKHJlcy5kYXRhcy5nb29kc19jb250ZW50Lmdvb2RzX3NwZWMpXHJcbiAgICAgICAgdGhpcy5hY3RpdmVBdHRyID0gT2JqZWN0LmtleXMocmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuZ29vZHNfc3BlYylcclxuICAgICAgICB0aGlzLnNwZWNfbGlzdCA9IHJlcy5kYXRhcy5zcGVjX2xpc3RcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcblxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm1lbWJlcktqLFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnRvcEltZyA9IHJlcy5kYXRhcy5pbWdfYXJlYVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=