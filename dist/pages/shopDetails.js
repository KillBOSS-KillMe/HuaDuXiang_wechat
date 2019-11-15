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
      goods_commend_list: [], //推荐商品列表
      image_list: [], // 商品轮播图
      contractlist: {}, // 商品服务说明
      attr: [], // 商品总属性数组
      activeAttr: [], // 当前点击属性数组
      goods_spec: [], // 默认属性数组
      spec_list: {}, // 所有属性对应的商品goods_id
      type: null
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
      changeAttr: function changeAttr(index, idx, ele) {
        this.activeAttr[index] = idx;
        this.goods_spec[index] = ele;
        var goods_id = this.spec_list[this.activeAttr.join('|')];
        this.goods_id = goods_id;
        this.$apply();
        this.getShopDetails();
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
    value: function onShareAppMessage(e) {
      if (this.type == "share") {
        var user = wx.getStorageSync('user');
        console.log(user);
        return {
          path: '/pages/shopDetails?goods_id=' + this.goods_id + '&userid=' + user.userid
        };
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad(t) {
      console.log(t);
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      this.goods_id = t.goods_id;
      this.type = t.type;
      this.$apply();
      this.getShopDetails();
    }
  }, {
    key: 'getShopDetails',
    value: function getShopDetails() {
      var _this4 = this;

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
          _this4.image_list = res.datas.image_list || [];
          _this4.store_info = res.datas.store_info;
          _this4.goods_commend_list = res.datas.goods_commend_list;
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
          _this4.attr = attr;
          console.log(attr);
          _this4.goods_spec = Object.values(res.datas.goods_content.goods_spec);
          _this4.activeAttr = Object.keys(res.datas.goods_content.goods_spec);
          _this4.spec_list = res.datas.spec_list;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BEZXRhaWxzLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsIm1peGlucyIsImRhdGEiLCJnb29kc051bSIsImF0dHJGbGFnIiwidGFiTGlzdCIsIm5hbWUiLCJjdXJyZW50VGFiIiwiZ29vZHNfaWQiLCJyZXF1ZXN0SW1nVXJsIiwiZ29vZHNfY29udGVudCIsInN0b3JlX2luZm8iLCJnb29kc19jb21tZW5kX2xpc3QiLCJpbWFnZV9saXN0IiwiY29udHJhY3RsaXN0IiwiYXR0ciIsImFjdGl2ZUF0dHIiLCJnb29kc19zcGVjIiwic3BlY19saXN0IiwidHlwZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsInN3aXRjaE5hdiIsImlkeCIsInNob3dBdHRyTWFzayIsImF0dHJCdG5TdWJtaXQiLCJhcHAiLCIkcGFyZW50IiwiY2FydF9pZCIsInVybCIsIm1lbWJlckJ1eU9uZSIsInRoZW4iLCJyZXMiLCJjb2RlIiwiZGF0YXMiLCJnbG9iYWxEYXRhIiwib3JkZXJJbmZvIiwiJG5hdmlnYXRlIiwiYWRkTnVtIiwicmVkdU51bSIsImNoYW5nZUF0dHIiLCJpbmRleCIsImVsZSIsImpvaW4iLCIkYXBwbHkiLCJnZXRTaG9wRGV0YWlscyIsImFkZENhcnQiLCJ0aGF0IiwiY2FydEFkZCIsInF1YW50aXR5Iiwic3RhdGUiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiZXJyb3IiLCJpY29uIiwibmF2R29vZHNEZXRhaWxzIiwiJHJlZGlyZWN0IiwiZXZlbnRzIiwiZSIsInVzZXIiLCJnZXRTdG9yYWdlU3luYyIsImNvbnNvbGUiLCJsb2ciLCJwYXRoIiwidXNlcmlkIiwidCIsIm9yZGluYXJ5R29vZHNEdGFpbCIsInNwZWNfbmFtZSIsIk9iamVjdCIsInZhbHVlcyIsInNwZWNfdmFsdWUiLCJmb3JFYWNoIiwiaXRlbSIsInByb3AiLCJrZXlzIiwiYXJ0aWNsZSIsImdvb2RzX2JvZHkiLCJ3eFBhcnNlIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztBQUVBLElBQUlDLFVBQVVELFFBQVEsNkJBQVIsQ0FBZDs7SUFDcUJFLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFoQixFQUFtQix3QkFBdUIsVUFBMUMsRUFBYixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyxpQkFBV0M7QUFERCxLLFFBSVpDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxnQkFBVSxDQURMO0FBRUxDLGdCQUFVLEtBRkw7QUFHTEMsZUFBUyxDQUFDLEVBQUVDLE1BQU0sTUFBUixFQUFELEVBQWtCLEVBQUVBLE1BQU0sTUFBUixFQUFsQixDQUhKLEVBR3lDO0FBQzlDQyxrQkFBWSxDQUpQLEVBSVU7QUFDZkMsZ0JBQVUsSUFMTCxFQUtXO0FBQ2hCQyxxQkFBZSxJQU5WLEVBTWdCO0FBQ3JCQyxxQkFBZSxJQVBWLEVBT2dCO0FBQ3JCQyxrQkFBWSxJQVJQLEVBUWE7QUFDbEJDLDBCQUFvQixFQVRmLEVBU21CO0FBQ3hCQyxrQkFBWSxFQVZQLEVBVVc7QUFDaEJDLG9CQUFjLEVBWFQsRUFXYTtBQUNsQkMsWUFBTSxFQVpELEVBWU07QUFDWEMsa0JBQVksRUFiUCxFQWFXO0FBQ2hCQyxrQkFBWSxFQWRQLEVBY1c7QUFDaEJDLGlCQUFXLEVBZk4sRUFlVTtBQUNmQyxZQUFNO0FBaEJELEssUUFtQlBDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSO0FBQ0FDLGVBRlEscUJBRUVDLEdBRkYsRUFFTztB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QUFDQXdELHFCQUFXQyxPQUFYLENBQW1CLFVBQUNDLElBQUQsRUFBT2hDLEtBQVAsRUFBaUI7QUFDbEMsZ0JBQUcsQ0FBQzFCLEtBQUswQixLQUFMLENBQUosRUFBaUI7QUFDZjFCLG1CQUFLMEIsS0FBTCxJQUFjLEVBQWQ7QUFDRDtBQUNEMUIsaUJBQUswQixLQUFMLEVBQVlZLEtBQVosR0FBb0JlLFVBQVUzQixLQUFWLENBQXBCO0FBQ0ExQixpQkFBSzBCLEtBQUwsRUFBWWlDLElBQVosR0FBbUJELElBQW5CO0FBQ0QsV0FORDtBQU9BLGlCQUFLMUQsSUFBTCxHQUFZQSxJQUFaO0FBQ0ErQyxrQkFBUUMsR0FBUixDQUFZaEQsSUFBWjtBQUNBLGlCQUFLRSxVQUFMLEdBQWtCb0QsT0FBT0MsTUFBUCxDQUFjdEMsSUFBSUUsS0FBSixDQUFVeEIsYUFBVixDQUF3Qk8sVUFBdEMsQ0FBbEI7QUFDQSxpQkFBS0QsVUFBTCxHQUFrQnFELE9BQU9NLElBQVAsQ0FBWTNDLElBQUlFLEtBQUosQ0FBVXhCLGFBQVYsQ0FBd0JPLFVBQXBDLENBQWxCO0FBQ0EsaUJBQUtDLFNBQUwsR0FBaUJjLElBQUlFLEtBQUosQ0FBVWhCLFNBQTNCO0FBQ0EsaUJBQUswQixNQUFMO0FBQ0EsY0FBSWdDLFVBQVU1QyxJQUFJRSxLQUFKLENBQVV4QixhQUFWLENBQXdCbUUsVUFBdEM7QUFDQTtBQUNBdEYsa0JBQVF1RixPQUFSLENBQWdCLFNBQWhCLEVBQTJCLE1BQTNCLEVBQW1DRixPQUFuQyxFQUE0QzdCLElBQTVDLEVBQWtELENBQWxEO0FBQ0Q7QUFDRixPQWxDRDtBQW1DRDs7OztFQXBLZ0NnQyxlQUFLQyxJOztrQkFBbkJ4RixLIiwiZmlsZSI6InNob3BEZXRhaWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgbWFzayBmcm9tICcuLi9jb21wb25lbnRzL21hc2snO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxudmFyIFd4UGFyc2UgPSByZXF1aXJlKCcuLi91dGlscy93eFBhcnNlL3d4UGFyc2UuanMnKTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4Hor6bmg4UnXHJcbiAgfTtcclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYXR0cnNtYXNrXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDptYXNrRmxhZy5zeW5jXCI6XCJhdHRyRmxhZ1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBhdHRyc21hc2s6IG1hc2tcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGdvb2RzTnVtOiAxLFxyXG4gICAgYXR0ckZsYWc6IGZhbHNlLFxyXG4gICAgdGFiTGlzdDogW3sgbmFtZTogJ+WVhuWTgeS7i+e7jSd9LCB7IG5hbWU6ICflm77mlofor6bmg4UnIH1dLCAvLyDpobbpg6jpgInpobnljaFcclxuICAgIGN1cnJlbnRUYWI6IDAsIC8vIOmhtumDqOmAiemhueWNoee0ouW8lVxyXG4gICAgZ29vZHNfaWQ6IG51bGwsIC8v5ZWG5ZOBZ29vZHNfaWRcclxuICAgIHJlcXVlc3RJbWdVcmw6IG51bGwsIC8v5Zu+54mH5Z+f5ZCNXHJcbiAgICBnb29kc19jb250ZW50OiBudWxsLCAvLyDllYblk4HlhoXlrrlcclxuICAgIHN0b3JlX2luZm86IG51bGwsIC8vIOW6l+mTuuS/oeaBr1xyXG4gICAgZ29vZHNfY29tbWVuZF9saXN0OiBbXSwgLy/mjqjojZDllYblk4HliJfooahcclxuICAgIGltYWdlX2xpc3Q6IFtdLCAvLyDllYblk4Hova7mkq3lm75cclxuICAgIGNvbnRyYWN0bGlzdDoge30sIC8vIOWVhuWTgeacjeWKoeivtOaYjlxyXG4gICAgYXR0cjogW10sICAvLyDllYblk4HmgLvlsZ7mgKfmlbDnu4RcclxuICAgIGFjdGl2ZUF0dHI6IFtdLCAvLyDlvZPliY3ngrnlh7vlsZ7mgKfmlbDnu4RcclxuICAgIGdvb2RzX3NwZWM6IFtdLCAvLyDpu5jorqTlsZ7mgKfmlbDnu4RcclxuICAgIHNwZWNfbGlzdDoge30sIC8vIOaJgOacieWxnuaAp+WvueW6lOeahOWVhuWTgWdvb2RzX2lkXHJcbiAgICB0eXBlOiBudWxsXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBvblNob3coKSB7fVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAvLyDliIfmjaLpobbpg6jlr7zoiKpcclxuICAgIHN3aXRjaE5hdihpZHgpIHtcclxuICAgICAgdGhpcy5jdXJyZW50VGFiID0gaWR4O1xyXG4gICAgfSxcclxuICAgIC8vIOaYvuekuumAieaLqeWVhuWTgeahhlxyXG4gICAgc2hvd0F0dHJNYXNrKCkge1xyXG4gICAgICB0aGlzLmF0dHJGbGFnID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBhdHRyQnRuU3VibWl0KCkge1xyXG4gICAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgICB2YXIgZ29vZHNfaWQgPSB0aGlzLmdvb2RzX2lkXHJcbiAgICAgIHZhciBnb29kc051bSA9IHRoaXMuZ29vZHNOdW1cclxuICAgICAgdmFyIGNhcnRfaWQgPSBgJHtnb29kc19pZH18JHtnb29kc051bX1gXHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLm1lbWJlckJ1eU9uZSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBjYXJ0X2lkLFxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgcmVzLmRhdGFzLmNhcnRfaWQgPSBjYXJ0X2lkXHJcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS5vcmRlckluZm8gPSByZXMuZGF0YXNcclxuICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiAnL3BhZ2VzL3NldHRsZW1lbnQnIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhZGROdW0oKSB7XHJcbiAgICAgIHRoaXMuZ29vZHNOdW0gKytcclxuICAgIH0sXHJcbiAgICByZWR1TnVtKCl7XHJcbiAgICAgIGlmKHRoaXMuZ29vZHNOdW0gPD0gMSkge1xyXG4gICAgICAgIHRoaXMuZ29vZHNOdW0gPSAxXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5nb29kc051bS0tXHJcbiAgICB9LFxyXG4gICAgY2hhbmdlQXR0cihpbmRleCwgaWR4LCBlbGUpe1xyXG4gICAgICB0aGlzLmFjdGl2ZUF0dHJbaW5kZXhdID0gaWR4XHJcbiAgICAgIHRoaXMuZ29vZHNfc3BlY1tpbmRleF0gPSBlbGVcclxuICAgICAgdmFyIGdvb2RzX2lkID0gdGhpcy5zcGVjX2xpc3RbdGhpcy5hY3RpdmVBdHRyLmpvaW4oJ3wnKV1cclxuICAgICAgdGhpcy5nb29kc19pZCA9IGdvb2RzX2lkO1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIHRoaXMuZ2V0U2hvcERldGFpbHMoKVxyXG4gICAgfSxcclxuICAgIGFkZENhcnQoKXtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLmNhcnRBZGQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgZ29vZHNfaWQ6IHRoaXMuZ29vZHNfaWQsXHJcbiAgICAgICAgICBxdWFudGl0eTogdGhpcy5nb29kc051bVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmKHJlcy5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+a3u+WKoOaIkOWKnydcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICB0aGlzLmF0dHJGbGFnID0gZmFsc2VcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5lcnJvcixcclxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBuYXZHb29kc0RldGFpbHMoZ29vZHNfaWQpIHtcclxuICAgICAgdGhpcy4kcmVkaXJlY3QoeyB1cmw6IGBzaG9wRGV0YWlscz9nb29kc19pZD0ke2dvb2RzX2lkfWAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbiAgb25TaGFyZUFwcE1lc3NhZ2UoZSkge1xyXG4gICAgaWYodGhpcy50eXBlID09IFwic2hhcmVcIikge1xyXG4gICAgICB2YXIgdXNlciA9IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VyJylcclxuICAgICAgY29uc29sZS5sb2codXNlcilcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBwYXRoOiBgL3BhZ2VzL3Nob3BEZXRhaWxzP2dvb2RzX2lkPSR7dGhpcy5nb29kc19pZH0mdXNlcmlkPSR7dXNlci51c2VyaWR9YFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uTG9hZCh0KSB7XHJcbiAgICBjb25zb2xlLmxvZyh0KVxyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICAgIHRoaXMuZ29vZHNfaWQgPSB0Lmdvb2RzX2lkO1xyXG4gICAgdGhpcy50eXBlID0gdC50eXBlXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB0aGlzLmdldFNob3BEZXRhaWxzKClcclxuICB9XHJcblxyXG4gIGdldFNob3BEZXRhaWxzKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgLy8g5pmu6YCa5ZWG5ZOB6K+m5oOFXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkub3JkaW5hcnlHb29kc0R0YWlsLFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGdvb2RzX2lkOiB0aGlzLmdvb2RzX2lkXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc19jb250ZW50ID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnRcclxuICAgICAgICB0aGlzLmNvbnRyYWN0bGlzdCA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50LmNvbnRyYWN0bGlzdCB8fCB7fVxyXG4gICAgICAgIHRoaXMuaW1hZ2VfbGlzdCA9IHJlcy5kYXRhcy5pbWFnZV9saXN0IHx8IFtdXHJcbiAgICAgICAgdGhpcy5zdG9yZV9pbmZvID0gcmVzLmRhdGFzLnN0b3JlX2luZm9cclxuICAgICAgICB0aGlzLmdvb2RzX2NvbW1lbmRfbGlzdCA9IHJlcy5kYXRhcy5nb29kc19jb21tZW5kX2xpc3RcclxuICAgICAgICAvLyDllYblk4HlsZ7mgKdcclxuICAgICAgICB2YXIgc3BlY19uYW1lID0gT2JqZWN0LnZhbHVlcyhyZXMuZGF0YXMuZ29vZHNfY29udGVudC5zcGVjX25hbWUpXHJcbiAgICAgICAgdmFyIHNwZWNfdmFsdWUgPSBPYmplY3QudmFsdWVzKHJlcy5kYXRhcy5nb29kc19jb250ZW50LnNwZWNfdmFsdWUpXHJcbiAgICAgICAgdmFyIGF0dHIgPSBbXVxyXG4gICAgICAgIHNwZWNfdmFsdWUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGlmKCFhdHRyW2luZGV4XSkge1xyXG4gICAgICAgICAgICBhdHRyW2luZGV4XSA9IHt9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBhdHRyW2luZGV4XS50aXRsZSA9IHNwZWNfbmFtZVtpbmRleF0gXHJcbiAgICAgICAgICBhdHRyW2luZGV4XS5wcm9wID0gaXRlbVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5hdHRyID0gYXR0clxyXG4gICAgICAgIGNvbnNvbGUubG9nKGF0dHIpXHJcbiAgICAgICAgdGhpcy5nb29kc19zcGVjID0gT2JqZWN0LnZhbHVlcyhyZXMuZGF0YXMuZ29vZHNfY29udGVudC5nb29kc19zcGVjKVxyXG4gICAgICAgIHRoaXMuYWN0aXZlQXR0ciA9IE9iamVjdC5rZXlzKHJlcy5kYXRhcy5nb29kc19jb250ZW50Lmdvb2RzX3NwZWMpXHJcbiAgICAgICAgdGhpcy5zcGVjX2xpc3QgPSByZXMuZGF0YXMuc3BlY19saXN0XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIHZhciBhcnRpY2xlID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuZ29vZHNfYm9keVxyXG4gICAgICAgIC8vIGFydGljbGUgPSBhcnRpY2xlLnJlcGxhY2UoL3NyYz1cIi9nLCBgc3JjPVwiJHt0aGF0LnJlcXVlc3RJbWdVcmx9YCk7XHJcbiAgICAgICAgV3hQYXJzZS53eFBhcnNlKCdhcnRpY2xlJywgJ2h0bWwnLCBhcnRpY2xlLCB0aGF0LCA1KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==