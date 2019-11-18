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
      allpage: null // 没有数据
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
        _this4.allpage = res.datas.allpage || 0;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhcmdhaW4uanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImF0dHJzbWFzayIsIm1hc2siLCJhZGRyZXNzbWFzayIsInNoYXJlc21hc2siLCJtaXhpbnMiLCJkYXRhIiwiZ29vZHNOdW0iLCJwcm9wQXJyIiwiYXR0ckZsYWciLCJhZGRyZXNzRmxhZyIsInNoYXJlRmxhZyIsInJlcXVlc3RJbWdVcmwiLCJiYXJnaW5EYXRhIiwidG9wSW1nIiwiZ29vZHNfaWQiLCJhdHRyIiwidGl0bGUiLCJwcm9wIiwiYWN0aXZlQXR0ciIsImdvb2RzX3NwZWMiLCJzcGVjX2xpc3QiLCJpbWFnZV9saXN0IiwiZ29vZHNfY29udGVudCIsImFkZHJlc3MiLCJjdXJwYWdlIiwiaGFzbW9yZSIsImFsbHBhZ2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJhZGRyZXNzQnRuU3VibWl0IiwiYXR0ckJ0blN1Ym1pdCIsInJlZHVOdW0iLCJhZGROdW0iLCJqdW1wVGltZURldGFpbHMiLCJqb2luIiwiJGFwcGx5IiwiZ2V0U2hvcERldGFpbHMiLCJoaWRlTWFzayIsImNoYW5nZUF0dHIiLCJpbmRleCIsImlkeCIsImVsZSIsImV2ZW50cyIsImFwcCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidGhhdCIsInVybCIsIm9yZGluYXJ5R29vZHNEdGFpbCIsInR5cGUiLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwic3BlY19uYW1lIiwiT2JqZWN0IiwidmFsdWVzIiwic3BlY192YWx1ZSIsImZvckVhY2giLCJpdGVtIiwiY29uc29sZSIsImxvZyIsImtleXMiLCJiYXJnYWluR29vZHNMaXN0IiwibWVtYmVyS2oiLCJpbWdfYXJlYSIsInBhZ2UiLCJsaXN0IiwicmVxdWVzdEluZGV4R29vZHNMaXN0Iiwid2VweSJdLCJtYXBwaW5n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ImZpbGUiOiJiYXJnYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgbWFzayBmcm9tICcuLi9jb21wb25lbnRzL21hc2snO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn56CN5Lu3J1xyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImF0dHJzbWFza1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiYXR0ckZsYWdcIn0sXCJhZGRyZXNzbWFza1wiOntcInYtYmluZDptYXNrRmxhZy5zeW5jXCI6XCJhZGRyZXNzRmxhZ1wifSxcInNoYXJlc21hc2tcIjp7XCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwic2hhcmVGbGFnXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIGF0dHJzbWFzazogbWFzayxcclxuICAgIGFkZHJlc3NtYXNrOiBtYXNrLFxyXG4gICAgc2hhcmVzbWFzazogbWFza1xyXG4gIH07XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgZ29vZHNOdW06IDEsXHJcbiAgICBwcm9wQXJyOiBbMSwgMiwgM10sXHJcbiAgICBhdHRyRmxhZzogZmFsc2UsIC8v5bGe5oCn5by55qGGXHJcbiAgICBhZGRyZXNzRmxhZzogZmFsc2UsIC8v5Zyw5Z2A5by55qGGXHJcbiAgICBzaGFyZUZsYWc6IGZhbHNlLCAvL+WIhuS6q+W8ueahhlxyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBiYXJnaW5EYXRhOiBbXSxcclxuICAgIHRvcEltZzogJycsXHJcbiAgICBnb29kc19pZDogJycsIC8v5b2T5YmN5ZWG5ZOBaWRcclxuICAgIGF0dHI6IFt7dGl0bGU6ICflpKflsI8nLCBwcm9wOiB7JzMxJzogJ+WkpycsJzMyJzogJ+WwjycgfSB9XSwgIC8vIOWVhuWTgeaAu+WxnuaAp+aVsOe7hFxyXG4gICAgYWN0aXZlQXR0cjogW10sIC8vIOW9k+WJjeeCueWHu+WxnuaAp+aVsOe7hFxyXG4gICAgZ29vZHNfc3BlYzogW10sIC8vIOm7mOiupOWxnuaAp+aVsOe7hFxyXG4gICAgc3BlY19saXN0OiB7fSwgLy8g5omA5pyJ5bGe5oCn5a+55bqU55qE5ZWG5ZOBZ29vZHNfaWRcclxuICAgIGltYWdlX2xpc3Q6IFtdLCAvLyDllYblk4Hova7mkq3lm75cclxuICAgIGdvb2RzX2NvbnRlbnQ6ICcnLFxyXG4gICAgYWRkcmVzczogJycsXHJcbiAgICBjdXJwYWdlOiAxLCAvL+W9k+WJjemhteaVsFxyXG4gICAgaGFzbW9yZTogZmFsc2UsIC8v5piv5ZCm5pyJ5LiL5LiA6aG1XHJcbiAgICBhbGxwYWdlOiBudWxsLCAvLyDmsqHmnInmlbDmja5cclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG9uU2hvdygpIHtcclxuICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICB2YXIgYWRkcmVzcyA9IGFwcC5nbG9iYWxEYXRhLmFkZHJlc3NcclxuICAgIHRoaXMuYWRkcmVzcyA9IGFkZHJlc3NcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGFkZHJlc3NCdG5TdWJtaXQoKSB7XHJcbiAgICAgIHRoaXMuYWRkcmVzc0ZsYWcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zaGFyZUZsYWcgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGF0dHJCdG5TdWJtaXQoKSB7XHJcbiAgICAgIHRoaXMuYXR0ckZsYWcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5hZGRyZXNzRmxhZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgcmVkdU51bSgpIHtcclxuICAgICAgaWYgKHRoaXMuZ29vZHNOdW0gPT0gMSkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmdvb2RzTnVtLS07XHJcbiAgICB9LFxyXG4gICAgYWRkTnVtKCkge1xyXG4gICAgICB0aGlzLmdvb2RzTnVtKys7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDot7PovazllYblk4Hor6bmg4VcclxuICAgICAqL1xyXG4gICAganVtcFRpbWVEZXRhaWxzKGdvb2RzX2lkLCBqb2luKSB7XHJcbiAgICAgIC8vIGlmKGpvaW4gPT0gMCkge1xyXG4gICAgICAgIHRoaXMuYXR0ckZsYWcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ29vZHNfaWQgPSBnb29kc19pZFxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB0aGlzLmdldFNob3BEZXRhaWxzKClcclxuICAgICAgLy8gfVxyXG4gICAgfSxcclxuICAgIGhpZGVNYXNrKCkge30sXHJcbiAgICBjaGFuZ2VBdHRyKGluZGV4LCBpZHgsIGVsZSl7XHJcbiAgICAgIHRoaXMuYWN0aXZlQXR0cltpbmRleF0gPSBpZHhcclxuICAgICAgdGhpcy5nb29kc19zcGVjW2luZGV4XSA9IGVsZVxyXG4gICAgICB2YXIgZ29vZHNfaWQgPSB0aGlzLnNwZWNfbGlzdFt0aGlzLmFjdGl2ZUF0dHIuam9pbignfCcpXVxyXG4gICAgICB0aGlzLmdvb2RzX2lkID0gZ29vZHNfaWQ7XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgdGhpcy5nZXRTaG9wRGV0YWlscygpXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIGdldFNob3BEZXRhaWxzKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgLy8g5pmu6YCa5ZWG5ZOB6K+m5oOFXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkub3JkaW5hcnlHb29kc0R0YWlsLFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGdvb2RzX2lkOiB0aGlzLmdvb2RzX2lkXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc19jb250ZW50ID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnRcclxuICAgICAgICB0aGlzLmltYWdlX2xpc3QgPSByZXMuZGF0YXMuaW1hZ2VfbGlzdCB8fCBbXVxyXG4gICAgICAgIC8vIOWVhuWTgeWxnuaAp1xyXG4gICAgICAgIHZhciBzcGVjX25hbWUgPSBPYmplY3QudmFsdWVzKHJlcy5kYXRhcy5nb29kc19jb250ZW50LnNwZWNfbmFtZSlcclxuICAgICAgICB2YXIgc3BlY192YWx1ZSA9IE9iamVjdC52YWx1ZXMocmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuc3BlY192YWx1ZSlcclxuICAgICAgICB2YXIgYXR0ciA9IFtdXHJcbiAgICAgICAgc3BlY192YWx1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgaWYoIWF0dHJbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgIGF0dHJbaW5kZXhdID0ge31cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGF0dHJbaW5kZXhdLnRpdGxlID0gc3BlY19uYW1lW2luZGV4XSBcclxuICAgICAgICAgIGF0dHJbaW5kZXhdLnByb3AgPSBpdGVtXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmF0dHIgPSBhdHRyXHJcbiAgICAgICAgY29uc29sZS5sb2coYXR0cilcclxuICAgICAgICB0aGlzLmdvb2RzX3NwZWMgPSBPYmplY3QudmFsdWVzKHJlcy5kYXRhcy5nb29kc19jb250ZW50Lmdvb2RzX3NwZWMpXHJcbiAgICAgICAgdGhpcy5hY3RpdmVBdHRyID0gT2JqZWN0LmtleXMocmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuZ29vZHNfc3BlYylcclxuICAgICAgICB0aGlzLnNwZWNfbGlzdCA9IHJlcy5kYXRhcy5zcGVjX2xpc3RcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICB0aGlzLmJhcmdhaW5Hb29kc0xpc3QoKVxyXG5cclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5tZW1iZXJLaixcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy50b3BJbWcgPSByZXMuZGF0YXMuaW1nX2FyZWFcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgYmFyZ2Fpbkdvb2RzTGlzdCgpIHtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5iYXJnYWluR29vZHNMaXN0LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcGFnZTogMTAsXHJcbiAgICAgICAgY3VycGFnZTogdGhpcy5jdXJwYWdlXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5iYXJnaW5EYXRhID0gcmVzLmRhdGFzLmxpc3RcclxuXHJcbiAgICAgIHRoaXMuaGFzbW9yZSA9IHJlcy5kYXRhcy5oYXNtb3JlXHJcbiAgICAgIHRoaXMuYWxscGFnZSA9IHJlcy5kYXRhcy5hbGxwYWdlIHx8IDBcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgb25SZWFjaEJvdHRvbSAoKSB7XHJcbiAgICBpZih0aGlzLmhhc21vcmUpIHtcclxuICAgICAgdGhpcy5jdXJwYWdlICsrIFxyXG4gICAgICB0aGlzLnJlcXVlc3RJbmRleEdvb2RzTGlzdCgpXHJcbiAgICB9XHJcbiAgfSAgXHJcbn1cclxuIl19