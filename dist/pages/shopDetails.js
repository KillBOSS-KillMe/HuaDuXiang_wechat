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
    }, _this.$repeat = {}, _this.$props = { "attrsmask": { "xmlns:v-bind": "", "v-bind:maskFlag.sync": "attrFlag" }, "couponmask": { "v-bind:maskFlag.sync": "couponFlag" } }, _this.$events = {}, _this.components = {
      attrsmask: _mask2.default,
      couponmask: _mask2.default
    }, _this.mixins = [], _this.data = {
      couponFlag: false,
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
      type: null,
      sale_type: '' // 商品类型
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
      navGoodsDetails: function navGoodsDetails(goods_id, sale_type) {
        // navigate
        if (sale_type == 'rushsales') {
          this.$redirect('/pages/seckillShopDetails?goods_id=' + goods_id);
        } else {
          this.$redirect('/pages/shopDetails?goods_id=' + goods_id);
        }
      },
      showCouponMask: function showCouponMask() {
        this.couponFlag = true;
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
          _this4.sale_type = res.datas.goods_content.sale_type;
          _this4.contractlist = res.datas.goods_content.contractlist || {};
          _this4.image_list = res.datas.image_list || [];
          _this4.store_info = res.datas.store_info;
          _this4.goods_commend_list = res.datas.goods_commend_list;
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
          _this4.attr = attr;
          _this4.goods_spec = Object.values(res.datas.goods_content.goods_spec || {});
          _this4.activeAttr = Object.keys(res.datas.goods_content.goods_spec || {});
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BEZXRhaWxzLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsImNvdXBvbm1hc2siLCJtaXhpbnMiLCJkYXRhIiwiY291cG9uRmxhZyIsImdvb2RzTnVtIiwiYXR0ckZsYWciLCJ0YWJMaXN0IiwibmFtZSIsImN1cnJlbnRUYWIiLCJnb29kc19pZCIsInJlcXVlc3RJbWdVcmwiLCJnb29kc19jb250ZW50Iiwic3RvcmVfaW5mbyIsImdvb2RzX2NvbW1lbmRfbGlzdCIsImltYWdlX2xpc3QiLCJjb250cmFjdGxpc3QiLCJhdHRyIiwiYWN0aXZlQXR0ciIsImdvb2RzX3NwZWMiLCJzcGVjX2xpc3QiLCJ0eXBlIiwic2FsZV90eXBlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic3dpdGNoTmF2IiwiaWR4Iiwic2hvd0F0dHJNYXNrIiwiYXR0ckJ0blN1Ym1pdCIsImFwcCIsIiRwYXJlbnQiLCJjYXJ0X2lkIiwidXJsIiwibWVtYmVyQnV5T25lIiwidGhlbiIsInJlcyIsImNvZGUiLCJkYXRhcyIsImdsb2JhbERhdGEiLCJvcmRlckluZm8iLCIkbmF2aWdhdGUiLCJhZGROdW0iLCJyZWR1TnVtIiwiY2hhbmdlQXR0ciIsImluZGV4IiwiZWxlIiwiam9pbiIsIiRhcHBseSIsImdldFNob3BEZXRhaWxzIiwiYWRkQ2FydCIsInRoYXQiLCJjYXJ0QWRkIiwicXVhbnRpdHkiLCJzdGF0ZSIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJlcnJvciIsImljb24iLCJuYXZHb29kc0RldGFpbHMiLCIkcmVkaXJlY3QiLCJzaG93Q291cG9uTWFzayIsImV2ZW50cyIsImUiLCJ1c2VyIiwiZ2V0U3RvcmFnZVN5bmMiLCJjb25zb2xlIiwibG9nIiwicGF0aCIsInVzZXJpZCIsInQiLCJvcmRpbmFyeUdvb2RzRHRhaWwiLCJzcGVjX25hbWUiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzcGVjX3ZhbHVlIiwiZm9yRWFjaCIsIml0ZW0iLCJwcm9wIiwia2V5cyIsImFydGljbGUiLCJnb29kc19ib2R5Iiwid3hQYXJzZSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7QUFFQSxJQUFJQyxVQUFVRCxRQUFRLDZCQUFSLENBQWQ7O0lBQ3FCRSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQWIsRUFBbUUsY0FBYSxFQUFDLHdCQUF1QixZQUF4QixFQUFoRixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyxpQkFBV0MsY0FERDtBQUVWQyxrQkFBWUQ7QUFGRixLLFFBS1pFLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxrQkFBWSxLQURQO0FBRUxDLGdCQUFVLENBRkw7QUFHTEMsZ0JBQVUsS0FITDtBQUlMQyxlQUFTLENBQUMsRUFBRUMsTUFBTSxNQUFSLEVBQUQsRUFBa0IsRUFBRUEsTUFBTSxNQUFSLEVBQWxCLENBSkosRUFJeUM7QUFDOUNDLGtCQUFZLENBTFAsRUFLVTtBQUNmQyxnQkFBVSxJQU5MLEVBTVc7QUFDaEJDLHFCQUFlLElBUFYsRUFPZ0I7QUFDckJDLHFCQUFlLElBUlYsRUFRZ0I7QUFDckJDLGtCQUFZLElBVFAsRUFTYTtBQUNsQkMsMEJBQW9CLEVBVmYsRUFVbUI7QUFDeEJDLGtCQUFZLEVBWFAsRUFXVztBQUNoQkMsb0JBQWMsRUFaVCxFQVlhO0FBQ2xCQyxZQUFNLEVBYkQsRUFhTTtBQUNYQyxrQkFBWSxFQWRQLEVBY1c7QUFDaEJDLGtCQUFZLEVBZlAsRUFlVztBQUNoQkMsaUJBQVcsRUFoQk4sRUFnQlU7QUFDZkMsWUFBTSxJQWpCRDtBQWtCTEMsaUJBQVcsRUFsQk4sQ0FrQlU7QUFsQlYsSyxRQXFCUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ1I7QUFDQUMsZUFGUSxxQkFFRUMsR0FGRixFQUVPO0FBQ2IsYUFBS2pCLFVBQUwsR0FBa0JpQixHQUFsQjtBQUNELE9BSk87O0FBS1I7QUFDQUMsa0JBTlEsMEJBTU87QUFDYixhQUFLckIsUUFBTCxHQUFnQixJQUFoQjtBQUNELE9BUk87QUFTUnNCLG1CQVRRLDJCQVNRO0FBQUE7O0FBQ2QsWUFBSUMsTUFBTSxLQUFLQyxPQUFmO0FBQ0EsWUFBSXBCLFdBQVcsS0FBS0EsUUFBcEI7QUFDQSxZQUFJTCxXQUFXLEtBQUtBLFFBQXBCO0FBQ0EsWUFBSTBCLFVBQWFyQixRQUFiLFNBQXlCTCxRQUE3QjtBQUNBLHdCQUFLO0FBQ0gyQixlQUFLM0MsSUFBSTRDLFlBRE47QUFFSDlCLGdCQUFNO0FBQ0o0QjtBQURJO0FBRkgsU0FBTCxFQUtHRyxJQUxILENBS1EsZUFBTztBQUNiLGNBQUdDLElBQUlDLElBQUosSUFBWSxHQUFmLEVBQW9CO0FBQ2xCRCxnQkFBSUUsS0FBSixDQUFVTixPQUFWLEdBQW9CQSxPQUFwQjtBQUNBRixnQkFBSVMsVUFBSixDQUFlQyxTQUFmLEdBQTJCSixJQUFJRSxLQUEvQjtBQUNBLG1CQUFLRyxTQUFMLENBQWUsRUFBRVIsS0FBSyxtQkFBUCxFQUFmO0FBQ0Q7QUFDRixTQVhEO0FBWUQsT0ExQk87QUEyQlJTLFlBM0JRLG9CQTJCQztBQUNQLGFBQUtwQyxRQUFMO0FBQ0QsT0E3Qk87QUE4QlJxQyxhQTlCUSxxQkE4QkM7QUFDUCxZQUFHLEtBQUtyQyxRQUFMLElBQWlCLENBQXBCLEVBQXVCO0FBQ3JCLGVBQUtBLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxhQUFLQSxRQUFMO0FBQ0QsT0FwQ087QUFxQ1JzQyxnQkFyQ1Esc0JBcUNHQyxLQXJDSCxFQXFDVWxCLEdBckNWLEVBcUNlbUIsR0FyQ2YsRUFxQ21CO0FBQ3pCLGFBQUszQixVQUFMLENBQWdCMEIsS0FBaEIsSUFBeUJsQixHQUF6QjtBQUNBLGFBQUtQLFVBQUwsQ0FBZ0J5QixLQUFoQixJQUF5QkMsR0FBekI7QUFDQSxZQUFJbkMsV0FBVyxLQUFLVSxTQUFMLENBQWUsS0FBS0YsVUFBTCxDQUFnQjRCLElBQWhCLENBQXFCLEdBQXJCLENBQWYsQ0FBZjtBQUNBLGFBQUtwQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLGFBQUtxQyxNQUFMO0FBQ0EsYUFBS0MsY0FBTDtBQUNELE9BNUNPO0FBNkNSQyxhQTdDUSxxQkE2Q0M7QUFBQTs7QUFDUCxZQUFJQyxPQUFPLElBQVg7QUFDQSx3QkFBSztBQUNIbEIsZUFBSzNDLElBQUk4RCxPQUROO0FBRUhoRCxnQkFBTTtBQUNKTyxzQkFBVSxLQUFLQSxRQURYO0FBRUowQyxzQkFBVSxLQUFLL0M7QUFGWDtBQUZILFNBQUwsRUFNRzZCLElBTkgsQ0FNUSxlQUFPO0FBQ2IsY0FBR0MsSUFBSUUsS0FBSixDQUFVZ0IsS0FBVixJQUFtQixDQUF0QixFQUF5QjtBQUN2QkMsZUFBR0MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPO0FBREksYUFBYjtBQUdBLG1CQUFLbEQsUUFBTCxHQUFnQixLQUFoQjtBQUNBLG1CQUFLeUMsTUFBTDtBQUNELFdBTkQsTUFNTztBQUNMTyxlQUFHQyxTQUFILENBQWE7QUFDWEMscUJBQU9yQixJQUFJRSxLQUFKLENBQVVvQixLQUROO0FBRVhDLG9CQUFNO0FBRkssYUFBYjtBQUlEO0FBQ0YsU0FuQkQ7QUFvQkQsT0FuRU87QUFvRVJDLHFCQXBFUSwyQkFvRVFqRCxRQXBFUixFQW9Fa0JZLFNBcEVsQixFQW9FNkI7QUFDbkM7QUFDQSxZQUFHQSxhQUFhLFdBQWhCLEVBQTZCO0FBQzNCLGVBQUtzQyxTQUFMLHlDQUFxRGxELFFBQXJEO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZUFBS2tELFNBQUwsa0NBQThDbEQsUUFBOUM7QUFDRDtBQUNGLE9BM0VPO0FBNEVSbUQsb0JBNUVRLDRCQTRFUztBQUNmLGFBQUt6RCxVQUFMLEdBQWtCLElBQWxCO0FBQ0Q7QUE5RU8sSyxRQWlGVjBELE0sR0FBUyxFOzs7Ozs2QkFsRkEsQ0FBRTs7O3NDQW1GT0MsQyxFQUFHO0FBQ25CLFVBQUcsS0FBSzFDLElBQUwsSUFBYSxPQUFoQixFQUF5QjtBQUN2QixZQUFJMkMsT0FBT1YsR0FBR1csY0FBSCxDQUFrQixNQUFsQixDQUFYO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVlILElBQVo7QUFDQSxlQUFPO0FBQ0xJLGlEQUFxQyxLQUFLMUQsUUFBMUMsZ0JBQTZEc0QsS0FBS0s7QUFEN0QsU0FBUDtBQUdEO0FBQ0Y7OzsyQkFDTUMsQyxFQUFHO0FBQ1JKLGNBQVFDLEdBQVIsQ0FBWUcsQ0FBWjtBQUNBLFdBQUszRCxhQUFMLEdBQXFCLEtBQUttQixPQUFMLENBQWFRLFVBQWIsQ0FBd0IzQixhQUE3QztBQUNBLFdBQUtELFFBQUwsR0FBZ0I0RCxFQUFFNUQsUUFBbEI7QUFDQSxXQUFLVyxJQUFMLEdBQVlpRCxFQUFFakQsSUFBZDtBQUNBLFdBQUswQixNQUFMO0FBQ0EsV0FBS0MsY0FBTDtBQUNEOzs7cUNBRWdCO0FBQUE7O0FBQ2YsVUFBSUUsT0FBTyxJQUFYO0FBQ0E7QUFDQSxzQkFBSztBQUNIbEIsYUFBSzNDLElBQUlrRixrQkFETjtBQUVIbEQsY0FBTSxLQUZIO0FBR0hsQixjQUFNO0FBQ0pPLG9CQUFVLEtBQUtBO0FBRFg7QUFISCxPQUFMLEVBTUd3QixJQU5ILENBTVEsZUFBTztBQUNiLFlBQUdDLElBQUlDLElBQUosSUFBWSxHQUFmLEVBQW9CO0FBQ2xCLGlCQUFLeEIsYUFBTCxHQUFxQnVCLElBQUlFLEtBQUosQ0FBVXpCLGFBQS9CO0FBQ0EsaUJBQUtVLFNBQUwsR0FBaUJhLElBQUlFLEtBQUosQ0FBVXpCLGFBQVYsQ0FBd0JVLFNBQXpDO0FBQ0EsaUJBQUtOLFlBQUwsR0FBb0JtQixJQUFJRSxLQUFKLENBQVV6QixhQUFWLENBQXdCSSxZQUF4QixJQUF3QyxFQUE1RDtBQUNBLGlCQUFLRCxVQUFMLEdBQWtCb0IsSUFBSUUsS0FBSixDQUFVdEIsVUFBVixJQUF3QixFQUExQztBQUNBLGlCQUFLRixVQUFMLEdBQWtCc0IsSUFBSUUsS0FBSixDQUFVeEIsVUFBNUI7QUFDQSxpQkFBS0Msa0JBQUwsR0FBMEJxQixJQUFJRSxLQUFKLENBQVV2QixrQkFBcEM7QUFDQTtBQUNBLGNBQUkwRCxZQUFZQyxPQUFPQyxNQUFQLENBQWN2QyxJQUFJRSxLQUFKLENBQVV6QixhQUFWLENBQXdCNEQsU0FBeEIsSUFBcUMsRUFBbkQsQ0FBaEI7QUFDQSxjQUFJRyxhQUFhRixPQUFPQyxNQUFQLENBQWN2QyxJQUFJRSxLQUFKLENBQVV6QixhQUFWLENBQXdCK0QsVUFBeEIsSUFBdUMsRUFBckQsQ0FBakI7QUFDQSxjQUFJMUQsT0FBTyxFQUFYO0FBQ0EwRCxxQkFBV0MsT0FBWCxDQUFtQixVQUFDQyxJQUFELEVBQU9qQyxLQUFQLEVBQWlCO0FBQ2xDLGdCQUFHLENBQUMzQixLQUFLMkIsS0FBTCxDQUFKLEVBQWlCO0FBQ2YzQixtQkFBSzJCLEtBQUwsSUFBYyxFQUFkO0FBQ0Q7QUFDRDNCLGlCQUFLMkIsS0FBTCxFQUFZWSxLQUFaLEdBQW9CZ0IsVUFBVTVCLEtBQVYsQ0FBcEI7QUFDQTNCLGlCQUFLMkIsS0FBTCxFQUFZa0MsSUFBWixHQUFtQkQsSUFBbkI7QUFDRCxXQU5EO0FBT0EsaUJBQUs1RCxJQUFMLEdBQVlBLElBQVo7QUFDQSxpQkFBS0UsVUFBTCxHQUFrQnNELE9BQU9DLE1BQVAsQ0FBY3ZDLElBQUlFLEtBQUosQ0FBVXpCLGFBQVYsQ0FBd0JPLFVBQXhCLElBQXVDLEVBQXJELENBQWxCO0FBQ0EsaUJBQUtELFVBQUwsR0FBa0J1RCxPQUFPTSxJQUFQLENBQVk1QyxJQUFJRSxLQUFKLENBQVV6QixhQUFWLENBQXdCTyxVQUF4QixJQUF1QyxFQUFuRCxDQUFsQjtBQUNBLGlCQUFLQyxTQUFMLEdBQWlCZSxJQUFJRSxLQUFKLENBQVVqQixTQUEzQjtBQUNBLGlCQUFLMkIsTUFBTDtBQUNBLGNBQUlpQyxVQUFVN0MsSUFBSUUsS0FBSixDQUFVekIsYUFBVixDQUF3QnFFLFVBQXRDO0FBQ0E7QUFDQTFGLGtCQUFRMkYsT0FBUixDQUFnQixTQUFoQixFQUEyQixNQUEzQixFQUFtQ0YsT0FBbkMsRUFBNEM5QixJQUE1QyxFQUFrRCxDQUFsRDtBQUNEO0FBQ0YsT0FsQ0Q7QUFtQ0Q7Ozs7RUEvS2dDaUMsZUFBS0MsSTs7a0JBQW5CNUYsSyIsImZpbGUiOiJzaG9wRGV0YWlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG1hc2sgZnJvbSAnLi4vY29tcG9uZW50cy9tYXNrJztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbnZhciBXeFBhcnNlID0gcmVxdWlyZSgnLi4vdXRpbHMvd3hQYXJzZS93eFBhcnNlLmpzJyk7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImF0dHJzbWFza1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiYXR0ckZsYWdcIn0sXCJjb3Vwb25tYXNrXCI6e1widi1iaW5kOm1hc2tGbGFnLnN5bmNcIjpcImNvdXBvbkZsYWdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgYXR0cnNtYXNrOiBtYXNrLFxyXG4gICAgY291cG9ubWFzazogbWFzayxcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGNvdXBvbkZsYWc6IGZhbHNlLFxyXG4gICAgZ29vZHNOdW06IDEsXHJcbiAgICBhdHRyRmxhZzogZmFsc2UsXHJcbiAgICB0YWJMaXN0OiBbeyBuYW1lOiAn5ZWG5ZOB5LuL57uNJ30sIHsgbmFtZTogJ+WbvuaWh+ivpuaDhScgfV0sIC8vIOmhtumDqOmAiemhueWNoVxyXG4gICAgY3VycmVudFRhYjogMCwgLy8g6aG26YOo6YCJ6aG55Y2h57Si5byVXHJcbiAgICBnb29kc19pZDogbnVsbCwgLy/llYblk4Fnb29kc19pZFxyXG4gICAgcmVxdWVzdEltZ1VybDogbnVsbCwgLy/lm77niYfln5/lkI1cclxuICAgIGdvb2RzX2NvbnRlbnQ6IG51bGwsIC8vIOWVhuWTgeWGheWuuVxyXG4gICAgc3RvcmVfaW5mbzogbnVsbCwgLy8g5bqX6ZO65L+h5oGvXHJcbiAgICBnb29kc19jb21tZW5kX2xpc3Q6IFtdLCAvL+aOqOiNkOWVhuWTgeWIl+ihqFxyXG4gICAgaW1hZ2VfbGlzdDogW10sIC8vIOWVhuWTgei9ruaSreWbvlxyXG4gICAgY29udHJhY3RsaXN0OiB7fSwgLy8g5ZWG5ZOB5pyN5Yqh6K+05piOXHJcbiAgICBhdHRyOiBbXSwgIC8vIOWVhuWTgeaAu+WxnuaAp+aVsOe7hFxyXG4gICAgYWN0aXZlQXR0cjogW10sIC8vIOW9k+WJjeeCueWHu+WxnuaAp+aVsOe7hFxyXG4gICAgZ29vZHNfc3BlYzogW10sIC8vIOm7mOiupOWxnuaAp+aVsOe7hFxyXG4gICAgc3BlY19saXN0OiB7fSwgLy8g5omA5pyJ5bGe5oCn5a+55bqU55qE5ZWG5ZOBZ29vZHNfaWRcclxuICAgIHR5cGU6IG51bGwsXHJcbiAgICBzYWxlX3R5cGU6ICcnLCAvLyDllYblk4HnsbvlnotcclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG9uU2hvdygpIHt9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOWIh+aNoumhtumDqOWvvOiIqlxyXG4gICAgc3dpdGNoTmF2KGlkeCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRUYWIgPSBpZHg7XHJcbiAgICB9LFxyXG4gICAgLy8g5pi+56S66YCJ5oup5ZWG5ZOB5qGGXHJcbiAgICBzaG93QXR0ck1hc2soKSB7XHJcbiAgICAgIHRoaXMuYXR0ckZsYWcgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGF0dHJCdG5TdWJtaXQoKSB7XHJcbiAgICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICAgIHZhciBnb29kc19pZCA9IHRoaXMuZ29vZHNfaWRcclxuICAgICAgdmFyIGdvb2RzTnVtID0gdGhpcy5nb29kc051bVxyXG4gICAgICB2YXIgY2FydF9pZCA9IGAke2dvb2RzX2lkfXwke2dvb2RzTnVtfWBcclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkubWVtYmVyQnV5T25lLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGNhcnRfaWQsXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICByZXMuZGF0YXMuY2FydF9pZCA9IGNhcnRfaWRcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLm9yZGVySW5mbyA9IHJlcy5kYXRhc1xyXG4gICAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6ICcvcGFnZXMvc2V0dGxlbWVudCcgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGFkZE51bSgpIHtcclxuICAgICAgdGhpcy5nb29kc051bSArK1xyXG4gICAgfSxcclxuICAgIHJlZHVOdW0oKXtcclxuICAgICAgaWYodGhpcy5nb29kc051bSA8PSAxKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc051bSA9IDFcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmdvb2RzTnVtLS1cclxuICAgIH0sXHJcbiAgICBjaGFuZ2VBdHRyKGluZGV4LCBpZHgsIGVsZSl7XHJcbiAgICAgIHRoaXMuYWN0aXZlQXR0cltpbmRleF0gPSBpZHhcclxuICAgICAgdGhpcy5nb29kc19zcGVjW2luZGV4XSA9IGVsZVxyXG4gICAgICB2YXIgZ29vZHNfaWQgPSB0aGlzLnNwZWNfbGlzdFt0aGlzLmFjdGl2ZUF0dHIuam9pbignfCcpXVxyXG4gICAgICB0aGlzLmdvb2RzX2lkID0gZ29vZHNfaWQ7XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgdGhpcy5nZXRTaG9wRGV0YWlscygpXHJcbiAgICB9LFxyXG4gICAgYWRkQ2FydCgpe1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkuY2FydEFkZCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBnb29kc19pZDogdGhpcy5nb29kc19pZCxcclxuICAgICAgICAgIHF1YW50aXR5OiB0aGlzLmdvb2RzTnVtXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYocmVzLmRhdGFzLnN0YXRlID09IDEpIHtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5re75Yqg5oiQ5YqfJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHRoaXMuYXR0ckZsYWcgPSBmYWxzZVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogcmVzLmRhdGFzLmVycm9yLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIG5hdkdvb2RzRGV0YWlscyhnb29kc19pZCwgc2FsZV90eXBlKSB7XHJcbiAgICAgIC8vIG5hdmlnYXRlXHJcbiAgICAgIGlmKHNhbGVfdHlwZSA9PSAncnVzaHNhbGVzJykge1xyXG4gICAgICAgIHRoaXMuJHJlZGlyZWN0KGAvcGFnZXMvc2Vja2lsbFNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy4kcmVkaXJlY3QoYC9wYWdlcy9zaG9wRGV0YWlscz9nb29kc19pZD0ke2dvb2RzX2lkfWApO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2hvd0NvdXBvbk1hc2soKSB7XHJcbiAgICAgIHRoaXMuY291cG9uRmxhZyA9IHRydWVcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvblNoYXJlQXBwTWVzc2FnZShlKSB7XHJcbiAgICBpZih0aGlzLnR5cGUgPT0gXCJzaGFyZVwiKSB7XHJcbiAgICAgIHZhciB1c2VyID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXInKVxyXG4gICAgICBjb25zb2xlLmxvZyh1c2VyKVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHBhdGg6IGAvcGFnZXMvc2hvcERldGFpbHM/Z29vZHNfaWQ9JHt0aGlzLmdvb2RzX2lkfSZ1c2VyaWQ9JHt1c2VyLnVzZXJpZH1gXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgb25Mb2FkKHQpIHtcclxuICAgIGNvbnNvbGUubG9nKHQpXHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgdGhpcy5nb29kc19pZCA9IHQuZ29vZHNfaWQ7XHJcbiAgICB0aGlzLnR5cGUgPSB0LnR5cGVcclxuICAgIHRoaXMuJGFwcGx5KClcclxuICAgIHRoaXMuZ2V0U2hvcERldGFpbHMoKVxyXG4gIH1cclxuXHJcbiAgZ2V0U2hvcERldGFpbHMoKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAvLyDmma7pgJrllYblk4Hor6bmg4VcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5vcmRpbmFyeUdvb2RzRHRhaWwsXHJcbiAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgZ29vZHNfaWQ6IHRoaXMuZ29vZHNfaWRcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLmdvb2RzX2NvbnRlbnQgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudFxyXG4gICAgICAgIHRoaXMuc2FsZV90eXBlID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuc2FsZV90eXBlXHJcbiAgICAgICAgdGhpcy5jb250cmFjdGxpc3QgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudC5jb250cmFjdGxpc3QgfHwge31cclxuICAgICAgICB0aGlzLmltYWdlX2xpc3QgPSByZXMuZGF0YXMuaW1hZ2VfbGlzdCB8fCBbXVxyXG4gICAgICAgIHRoaXMuc3RvcmVfaW5mbyA9IHJlcy5kYXRhcy5zdG9yZV9pbmZvXHJcbiAgICAgICAgdGhpcy5nb29kc19jb21tZW5kX2xpc3QgPSByZXMuZGF0YXMuZ29vZHNfY29tbWVuZF9saXN0XHJcbiAgICAgICAgLy8g5ZWG5ZOB5bGe5oCnXHJcbiAgICAgICAgdmFyIHNwZWNfbmFtZSA9IE9iamVjdC52YWx1ZXMocmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuc3BlY19uYW1lIHx8IHt9KVxyXG4gICAgICAgIHZhciBzcGVjX3ZhbHVlID0gT2JqZWN0LnZhbHVlcyhyZXMuZGF0YXMuZ29vZHNfY29udGVudC5zcGVjX3ZhbHVlICB8fCB7fSlcclxuICAgICAgICB2YXIgYXR0ciA9IFtdXHJcbiAgICAgICAgc3BlY192YWx1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgaWYoIWF0dHJbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgIGF0dHJbaW5kZXhdID0ge31cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGF0dHJbaW5kZXhdLnRpdGxlID0gc3BlY19uYW1lW2luZGV4XSBcclxuICAgICAgICAgIGF0dHJbaW5kZXhdLnByb3AgPSBpdGVtXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmF0dHIgPSBhdHRyXHJcbiAgICAgICAgdGhpcy5nb29kc19zcGVjID0gT2JqZWN0LnZhbHVlcyhyZXMuZGF0YXMuZ29vZHNfY29udGVudC5nb29kc19zcGVjICB8fCB7fSlcclxuICAgICAgICB0aGlzLmFjdGl2ZUF0dHIgPSBPYmplY3Qua2V5cyhyZXMuZGF0YXMuZ29vZHNfY29udGVudC5nb29kc19zcGVjICB8fCB7fSlcclxuICAgICAgICB0aGlzLnNwZWNfbGlzdCA9IHJlcy5kYXRhcy5zcGVjX2xpc3RcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgdmFyIGFydGljbGUgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudC5nb29kc19ib2R5XHJcbiAgICAgICAgLy8gYXJ0aWNsZSA9IGFydGljbGUucmVwbGFjZSgvc3JjPVwiL2csIGBzcmM9XCIke3RoYXQucmVxdWVzdEltZ1VybH1gKTtcclxuICAgICAgICBXeFBhcnNlLnd4UGFyc2UoJ2FydGljbGUnLCAnaHRtbCcsIGFydGljbGUsIHRoYXQsIDUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19