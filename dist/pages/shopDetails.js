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
      image_list: [], // 商品轮播图
      contractlist: {}, // 商品服务说明
      attr: [], // 商品总属性数组
      activeAttr: [], // 当前点击属性数组
      goods_spec: [], // 默认属性数组
      spec_list: {} // 所有属性对应的商品goods_id
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
        console.log(goods_id);
        this.$apply();
        // this.getShopDetails()
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
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      this.goods_id = t.goods_id;
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
          _this4.hot_sales = res.datas.hot_sales;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BEZXRhaWxzLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsIm1peGlucyIsImRhdGEiLCJnb29kc051bSIsImF0dHJGbGFnIiwidGFiTGlzdCIsIm5hbWUiLCJjdXJyZW50VGFiIiwiZ29vZHNfaWQiLCJyZXF1ZXN0SW1nVXJsIiwiZ29vZHNfY29udGVudCIsInN0b3JlX2luZm8iLCJob3Rfc2FsZXMiLCJpbWFnZV9saXN0IiwiY29udHJhY3RsaXN0IiwiYXR0ciIsImFjdGl2ZUF0dHIiLCJnb29kc19zcGVjIiwic3BlY19saXN0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic3dpdGNoTmF2IiwiaWR4Iiwic2hvd0F0dHJNYXNrIiwiYXR0ckJ0blN1Ym1pdCIsImFwcCIsIiRwYXJlbnQiLCJjYXJ0X2lkIiwidXJsIiwibWVtYmVyQnV5T25lIiwidGhlbiIsInJlcyIsImNvZGUiLCJkYXRhcyIsImdsb2JhbERhdGEiLCJvcmRlckluZm8iLCIkbmF2aWdhdGUiLCJhZGROdW0iLCJyZWR1TnVtIiwiY2hhbmdlQXR0ciIsImluZGV4IiwiZWxlIiwiam9pbiIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJhZGRDYXJ0IiwidGhhdCIsImNhcnRBZGQiLCJxdWFudGl0eSIsInN0YXRlIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImVycm9yIiwiaWNvbiIsIm5hdkdvb2RzRGV0YWlscyIsIiRyZWRpcmVjdCIsImV2ZW50cyIsInQiLCJnZXRTaG9wRGV0YWlscyIsIm9yZGluYXJ5R29vZHNEdGFpbCIsInR5cGUiLCJzcGVjX25hbWUiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzcGVjX3ZhbHVlIiwiZm9yRWFjaCIsIml0ZW0iLCJwcm9wIiwia2V5cyIsImFydGljbGUiLCJnb29kc19ib2R5Iiwid3hQYXJzZSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7QUFFQSxJQUFJQyxVQUFVRCxRQUFRLDZCQUFSLENBQWQ7O0lBQ3FCRSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQWIsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkMsaUJBQVdDO0FBREQsSyxRQUlaQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FETDtBQUVMQyxnQkFBVSxLQUZMO0FBR0xDLGVBQVMsQ0FBQyxFQUFFQyxNQUFNLE1BQVIsRUFBRCxFQUFrQixFQUFFQSxNQUFNLE1BQVIsRUFBbEIsQ0FISixFQUd5QztBQUM5Q0Msa0JBQVksQ0FKUCxFQUlVO0FBQ2ZDLGdCQUFVLElBTEwsRUFLVztBQUNoQkMscUJBQWUsSUFOVixFQU1nQjtBQUNyQkMscUJBQWUsSUFQVixFQU9nQjtBQUNyQkMsa0JBQVksSUFSUCxFQVFhO0FBQ2xCQyxpQkFBVyxFQVROLEVBU1U7QUFDZkMsa0JBQVksRUFWUCxFQVVXO0FBQ2hCQyxvQkFBYyxFQVhULEVBV2E7QUFDbEJDLFlBQU0sRUFaRCxFQVlNO0FBQ1hDLGtCQUFZLEVBYlAsRUFhVztBQUNoQkMsa0JBQVksRUFkUCxFQWNXO0FBQ2hCQyxpQkFBVyxFQWZOLENBZVM7QUFmVCxLLFFBa0JQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDUjtBQUNBQyxlQUZRLHFCQUVFQyxHQUZGLEVBRU87QUFDYixhQUFLZixVQUFMLEdBQWtCZSxHQUFsQjtBQUNELE9BSk87O0FBS1I7QUFDQUMsa0JBTlEsMEJBTU87QUFDYixhQUFLbkIsUUFBTCxHQUFnQixJQUFoQjtBQUNELE9BUk87QUFTUm9CLG1CQVRRLDJCQVNRO0FBQUE7O0FBQ2QsWUFBSUMsTUFBTSxLQUFLQyxPQUFmO0FBQ0EsWUFBSWxCLFdBQVcsS0FBS0EsUUFBcEI7QUFDQSxZQUFJTCxXQUFXLEtBQUtBLFFBQXBCO0FBQ0EsWUFBSXdCLFVBQWFuQixRQUFiLFNBQXlCTCxRQUE3QjtBQUNBLHdCQUFLO0FBQ0h5QixlQUFLdkMsSUFBSXdDLFlBRE47QUFFSDNCLGdCQUFNO0FBQ0p5QjtBQURJO0FBRkgsU0FBTCxFQUtHRyxJQUxILENBS1EsZUFBTztBQUNiLGNBQUdDLElBQUlDLElBQUosSUFBWSxHQUFmLEVBQW9CO0FBQ2xCRCxnQkFBSUUsS0FBSixDQUFVTixPQUFWLEdBQW9CQSxPQUFwQjtBQUNBRixnQkFBSVMsVUFBSixDQUFlQyxTQUFmLEdBQTJCSixJQUFJRSxLQUEvQjtBQUNBLG1CQUFLRyxTQUFMLENBQWUsRUFBRVIsS0FBSyxtQkFBUCxFQUFmO0FBQ0Q7QUFDRixTQVhEO0FBWUQsT0ExQk87QUEyQlJTLFlBM0JRLG9CQTJCQztBQUNQLGFBQUtsQyxRQUFMO0FBQ0QsT0E3Qk87QUE4QlJtQyxhQTlCUSxxQkE4QkM7QUFDUCxZQUFHLEtBQUtuQyxRQUFMLElBQWlCLENBQXBCLEVBQXVCO0FBQ3JCLGVBQUtBLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxhQUFLQSxRQUFMO0FBQ0QsT0FwQ087QUFxQ1JvQyxnQkFyQ1Esc0JBcUNHQyxLQXJDSCxFQXFDVWxCLEdBckNWLEVBcUNlbUIsR0FyQ2YsRUFxQ21CO0FBQ3pCLGFBQUt6QixVQUFMLENBQWdCd0IsS0FBaEIsSUFBeUJsQixHQUF6QjtBQUNBLGFBQUtMLFVBQUwsQ0FBZ0J1QixLQUFoQixJQUF5QkMsR0FBekI7QUFDQSxZQUFJakMsV0FBVyxLQUFLVSxTQUFMLENBQWUsS0FBS0YsVUFBTCxDQUFnQjBCLElBQWhCLENBQXFCLEdBQXJCLENBQWYsQ0FBZjtBQUNBLGFBQUtsQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBbUMsZ0JBQVFDLEdBQVIsQ0FBWXBDLFFBQVo7QUFDQSxhQUFLcUMsTUFBTDtBQUNBO0FBQ0QsT0E3Q087QUE4Q1JDLGFBOUNRLHFCQThDQztBQUFBOztBQUNQLFlBQUlDLE9BQU8sSUFBWDtBQUNBLHdCQUFLO0FBQ0huQixlQUFLdkMsSUFBSTJELE9BRE47QUFFSDlDLGdCQUFNO0FBQ0pNLHNCQUFVLEtBQUtBLFFBRFg7QUFFSnlDLHNCQUFVLEtBQUs5QztBQUZYO0FBRkgsU0FBTCxFQU1HMkIsSUFOSCxDQU1RLGVBQU87QUFDYixjQUFHQyxJQUFJRSxLQUFKLENBQVVpQixLQUFWLElBQW1CLENBQXRCLEVBQXlCO0FBQ3ZCQyxlQUFHQyxTQUFILENBQWE7QUFDWEMscUJBQU87QUFESSxhQUFiO0FBR0EsbUJBQUtqRCxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsbUJBQUt5QyxNQUFMO0FBQ0QsV0FORCxNQU1PO0FBQ0xNLGVBQUdDLFNBQUgsQ0FBYTtBQUNYQyxxQkFBT3RCLElBQUlFLEtBQUosQ0FBVXFCLEtBRE47QUFFWEMsb0JBQU07QUFGSyxhQUFiO0FBSUQ7QUFDRixTQW5CRDtBQW9CRCxPQXBFTztBQXFFUkMscUJBckVRLDJCQXFFUWhELFFBckVSLEVBcUVrQjtBQUN4QixhQUFLaUQsU0FBTCxDQUFlLEVBQUU3QiwrQkFBNkJwQixRQUEvQixFQUFmO0FBQ0Q7QUF2RU8sSyxRQTBFVmtELE0sR0FBUyxFOzs7Ozs2QkEzRUEsQ0FBRTs7O3dDQTRFUTtBQUNqQmYsY0FBUUMsR0FBUixDQUFZLEdBQVo7QUFDRDs7OzJCQUNNZSxDLEVBQUc7QUFDUixXQUFLbEQsYUFBTCxHQUFxQixLQUFLaUIsT0FBTCxDQUFhUSxVQUFiLENBQXdCekIsYUFBN0M7QUFDQSxXQUFLRCxRQUFMLEdBQWdCbUQsRUFBRW5ELFFBQWxCO0FBQ0EsV0FBS3FDLE1BQUw7QUFDQSxXQUFLZSxjQUFMO0FBQ0Q7OztxQ0FFZ0I7QUFBQTs7QUFDZixVQUFJYixPQUFPLElBQVg7QUFDQTtBQUNBLHNCQUFLO0FBQ0huQixhQUFLdkMsSUFBSXdFLGtCQUROO0FBRUhDLGNBQU0sS0FGSDtBQUdINUQsY0FBTTtBQUNKTSxvQkFBVSxLQUFLQTtBQURYO0FBSEgsT0FBTCxFQU1Hc0IsSUFOSCxDQU1RLGVBQU87QUFDYixZQUFHQyxJQUFJQyxJQUFKLElBQVksR0FBZixFQUFvQjtBQUNsQixpQkFBS3RCLGFBQUwsR0FBcUJxQixJQUFJRSxLQUFKLENBQVV2QixhQUEvQjtBQUNBLGlCQUFLSSxZQUFMLEdBQW9CaUIsSUFBSUUsS0FBSixDQUFVdkIsYUFBVixDQUF3QkksWUFBeEIsSUFBd0MsRUFBNUQ7QUFDQSxpQkFBS0QsVUFBTCxHQUFrQmtCLElBQUlFLEtBQUosQ0FBVXBCLFVBQVYsSUFBd0IsRUFBMUM7QUFDQSxpQkFBS0YsVUFBTCxHQUFrQm9CLElBQUlFLEtBQUosQ0FBVXRCLFVBQTVCO0FBQ0EsaUJBQUtDLFNBQUwsR0FBaUJtQixJQUFJRSxLQUFKLENBQVVyQixTQUEzQjtBQUNBO0FBQ0EsY0FBSW1ELFlBQVlDLE9BQU9DLE1BQVAsQ0FBY2xDLElBQUlFLEtBQUosQ0FBVXZCLGFBQVYsQ0FBd0JxRCxTQUF0QyxDQUFoQjtBQUNBLGNBQUlHLGFBQWFGLE9BQU9DLE1BQVAsQ0FBY2xDLElBQUlFLEtBQUosQ0FBVXZCLGFBQVYsQ0FBd0J3RCxVQUF0QyxDQUFqQjtBQUNBLGNBQUluRCxPQUFPLEVBQVg7QUFDQW1ELHFCQUFXQyxPQUFYLENBQW1CLFVBQUNDLElBQUQsRUFBTzVCLEtBQVAsRUFBaUI7QUFDbEMsZ0JBQUcsQ0FBQ3pCLEtBQUt5QixLQUFMLENBQUosRUFBaUI7QUFDZnpCLG1CQUFLeUIsS0FBTCxJQUFjLEVBQWQ7QUFDRDtBQUNEekIsaUJBQUt5QixLQUFMLEVBQVlhLEtBQVosR0FBb0JVLFVBQVV2QixLQUFWLENBQXBCO0FBQ0F6QixpQkFBS3lCLEtBQUwsRUFBWTZCLElBQVosR0FBbUJELElBQW5CO0FBQ0QsV0FORDtBQU9BLGlCQUFLckQsSUFBTCxHQUFZQSxJQUFaO0FBQ0E0QixrQkFBUUMsR0FBUixDQUFZN0IsSUFBWjtBQUNBLGlCQUFLRSxVQUFMLEdBQWtCK0MsT0FBT0MsTUFBUCxDQUFjbEMsSUFBSUUsS0FBSixDQUFVdkIsYUFBVixDQUF3Qk8sVUFBdEMsQ0FBbEI7QUFDQSxpQkFBS0QsVUFBTCxHQUFrQmdELE9BQU9NLElBQVAsQ0FBWXZDLElBQUlFLEtBQUosQ0FBVXZCLGFBQVYsQ0FBd0JPLFVBQXBDLENBQWxCO0FBQ0EsaUJBQUtDLFNBQUwsR0FBaUJhLElBQUlFLEtBQUosQ0FBVWYsU0FBM0I7QUFDQSxpQkFBSzJCLE1BQUw7QUFDQSxjQUFJMEIsVUFBVXhDLElBQUlFLEtBQUosQ0FBVXZCLGFBQVYsQ0FBd0I4RCxVQUF0QztBQUNBO0FBQ0FqRixrQkFBUWtGLE9BQVIsQ0FBZ0IsU0FBaEIsRUFBMkIsTUFBM0IsRUFBbUNGLE9BQW5DLEVBQTRDeEIsSUFBNUMsRUFBa0QsQ0FBbEQ7QUFDRDtBQUNGLE9BbENEO0FBbUNEOzs7O0VBNUpnQzJCLGVBQUtDLEk7O2tCQUFuQm5GLEsiLCJmaWxlIjoic2hvcERldGFpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBtYXNrIGZyb20gJy4uL2NvbXBvbmVudHMvbWFzayc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG52YXIgV3hQYXJzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL3d4UGFyc2Uvd3hQYXJzZS5qcycpO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeivpuaDhSdcclxuICB9O1xyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJhdHRyc21hc2tcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm1hc2tGbGFnLnN5bmNcIjpcImF0dHJGbGFnXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIGF0dHJzbWFzazogbWFza1xyXG4gIH07XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgZ29vZHNOdW06IDEsXHJcbiAgICBhdHRyRmxhZzogZmFsc2UsXHJcbiAgICB0YWJMaXN0OiBbeyBuYW1lOiAn5ZWG5ZOB5LuL57uNJ30sIHsgbmFtZTogJ+WbvuaWh+ivpuaDhScgfV0sIC8vIOmhtumDqOmAiemhueWNoVxyXG4gICAgY3VycmVudFRhYjogMCwgLy8g6aG26YOo6YCJ6aG55Y2h57Si5byVXHJcbiAgICBnb29kc19pZDogbnVsbCwgLy/llYblk4Fnb29kc19pZFxyXG4gICAgcmVxdWVzdEltZ1VybDogbnVsbCwgLy/lm77niYfln5/lkI1cclxuICAgIGdvb2RzX2NvbnRlbnQ6IG51bGwsIC8vIOWVhuWTgeWGheWuuVxyXG4gICAgc3RvcmVfaW5mbzogbnVsbCwgLy8g5bqX6ZO65L+h5oGvXHJcbiAgICBob3Rfc2FsZXM6IFtdLCAvL+aOqOiNkOWVhuWTgeWIl+ihqFxyXG4gICAgaW1hZ2VfbGlzdDogW10sIC8vIOWVhuWTgei9ruaSreWbvlxyXG4gICAgY29udHJhY3RsaXN0OiB7fSwgLy8g5ZWG5ZOB5pyN5Yqh6K+05piOXHJcbiAgICBhdHRyOiBbXSwgIC8vIOWVhuWTgeaAu+WxnuaAp+aVsOe7hFxyXG4gICAgYWN0aXZlQXR0cjogW10sIC8vIOW9k+WJjeeCueWHu+WxnuaAp+aVsOe7hFxyXG4gICAgZ29vZHNfc3BlYzogW10sIC8vIOm7mOiupOWxnuaAp+aVsOe7hFxyXG4gICAgc3BlY19saXN0OiB7fSAvLyDmiYDmnInlsZ7mgKflr7nlupTnmoTllYblk4Fnb29kc19pZFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25TaG93KCkge31cclxuICBtZXRob2RzID0ge1xyXG4gICAgLy8g5YiH5o2i6aG26YOo5a+86IiqXHJcbiAgICBzd2l0Y2hOYXYoaWR4KSB7XHJcbiAgICAgIHRoaXMuY3VycmVudFRhYiA9IGlkeDtcclxuICAgIH0sXHJcbiAgICAvLyDmmL7npLrpgInmi6nllYblk4HmoYZcclxuICAgIHNob3dBdHRyTWFzaygpIHtcclxuICAgICAgdGhpcy5hdHRyRmxhZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgYXR0ckJ0blN1Ym1pdCgpIHtcclxuICAgICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgICAgdmFyIGdvb2RzX2lkID0gdGhpcy5nb29kc19pZFxyXG4gICAgICB2YXIgZ29vZHNOdW0gPSB0aGlzLmdvb2RzTnVtXHJcbiAgICAgIHZhciBjYXJ0X2lkID0gYCR7Z29vZHNfaWR9fCR7Z29vZHNOdW19YFxyXG4gICAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5tZW1iZXJCdXlPbmUsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgY2FydF9pZCxcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgIHJlcy5kYXRhcy5jYXJ0X2lkID0gY2FydF9pZFxyXG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEub3JkZXJJbmZvID0gcmVzLmRhdGFzXHJcbiAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogJy9wYWdlcy9zZXR0bGVtZW50JyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYWRkTnVtKCkge1xyXG4gICAgICB0aGlzLmdvb2RzTnVtICsrXHJcbiAgICB9LFxyXG4gICAgcmVkdU51bSgpe1xyXG4gICAgICBpZih0aGlzLmdvb2RzTnVtIDw9IDEpIHtcclxuICAgICAgICB0aGlzLmdvb2RzTnVtID0gMVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZ29vZHNOdW0tLVxyXG4gICAgfSxcclxuICAgIGNoYW5nZUF0dHIoaW5kZXgsIGlkeCwgZWxlKXtcclxuICAgICAgdGhpcy5hY3RpdmVBdHRyW2luZGV4XSA9IGlkeFxyXG4gICAgICB0aGlzLmdvb2RzX3NwZWNbaW5kZXhdID0gZWxlXHJcbiAgICAgIHZhciBnb29kc19pZCA9IHRoaXMuc3BlY19saXN0W3RoaXMuYWN0aXZlQXR0ci5qb2luKCd8JyldXHJcbiAgICAgIHRoaXMuZ29vZHNfaWQgPSBnb29kc19pZDtcclxuICAgICAgY29uc29sZS5sb2coZ29vZHNfaWQpXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgLy8gdGhpcy5nZXRTaG9wRGV0YWlscygpXHJcbiAgICB9LFxyXG4gICAgYWRkQ2FydCgpe1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkuY2FydEFkZCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBnb29kc19pZDogdGhpcy5nb29kc19pZCxcclxuICAgICAgICAgIHF1YW50aXR5OiB0aGlzLmdvb2RzTnVtXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYocmVzLmRhdGFzLnN0YXRlID09IDEpIHtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5re75Yqg5oiQ5YqfJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHRoaXMuYXR0ckZsYWcgPSBmYWxzZVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogcmVzLmRhdGFzLmVycm9yLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIG5hdkdvb2RzRGV0YWlscyhnb29kc19pZCkge1xyXG4gICAgICB0aGlzLiRyZWRpcmVjdCh7IHVybDogYHNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvblNoYXJlQXBwTWVzc2FnZSgpe1xyXG4gICAgY29uc29sZS5sb2coOTk5KVxyXG4gIH1cclxuICBvbkxvYWQodCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICAgIHRoaXMuZ29vZHNfaWQgPSB0Lmdvb2RzX2lkO1xyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgdGhpcy5nZXRTaG9wRGV0YWlscygpXHJcbiAgfVxyXG5cclxuICBnZXRTaG9wRGV0YWlscygpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIC8vIOaZrumAmuWVhuWTgeivpuaDhVxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm9yZGluYXJ5R29vZHNEdGFpbCxcclxuICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBnb29kc19pZDogdGhpcy5nb29kc19pZFxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHRoaXMuZ29vZHNfY29udGVudCA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50XHJcbiAgICAgICAgdGhpcy5jb250cmFjdGxpc3QgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudC5jb250cmFjdGxpc3QgfHwge31cclxuICAgICAgICB0aGlzLmltYWdlX2xpc3QgPSByZXMuZGF0YXMuaW1hZ2VfbGlzdCB8fCBbXVxyXG4gICAgICAgIHRoaXMuc3RvcmVfaW5mbyA9IHJlcy5kYXRhcy5zdG9yZV9pbmZvXHJcbiAgICAgICAgdGhpcy5ob3Rfc2FsZXMgPSByZXMuZGF0YXMuaG90X3NhbGVzXHJcbiAgICAgICAgLy8g5ZWG5ZOB5bGe5oCnXHJcbiAgICAgICAgdmFyIHNwZWNfbmFtZSA9IE9iamVjdC52YWx1ZXMocmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuc3BlY19uYW1lKVxyXG4gICAgICAgIHZhciBzcGVjX3ZhbHVlID0gT2JqZWN0LnZhbHVlcyhyZXMuZGF0YXMuZ29vZHNfY29udGVudC5zcGVjX3ZhbHVlKVxyXG4gICAgICAgIHZhciBhdHRyID0gW11cclxuICAgICAgICBzcGVjX3ZhbHVlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICBpZighYXR0cltpbmRleF0pIHtcclxuICAgICAgICAgICAgYXR0cltpbmRleF0gPSB7fVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYXR0cltpbmRleF0udGl0bGUgPSBzcGVjX25hbWVbaW5kZXhdIFxyXG4gICAgICAgICAgYXR0cltpbmRleF0ucHJvcCA9IGl0ZW1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuYXR0ciA9IGF0dHJcclxuICAgICAgICBjb25zb2xlLmxvZyhhdHRyKVxyXG4gICAgICAgIHRoaXMuZ29vZHNfc3BlYyA9IE9iamVjdC52YWx1ZXMocmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuZ29vZHNfc3BlYylcclxuICAgICAgICB0aGlzLmFjdGl2ZUF0dHIgPSBPYmplY3Qua2V5cyhyZXMuZGF0YXMuZ29vZHNfY29udGVudC5nb29kc19zcGVjKVxyXG4gICAgICAgIHRoaXMuc3BlY19saXN0ID0gcmVzLmRhdGFzLnNwZWNfbGlzdFxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB2YXIgYXJ0aWNsZSA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50Lmdvb2RzX2JvZHlcclxuICAgICAgICAvLyBhcnRpY2xlID0gYXJ0aWNsZS5yZXBsYWNlKC9zcmM9XCIvZywgYHNyYz1cIiR7dGhhdC5yZXF1ZXN0SW1nVXJsfWApO1xyXG4gICAgICAgIFd4UGFyc2Uud3hQYXJzZSgnYXJ0aWNsZScsICdodG1sJywgYXJ0aWNsZSwgdGhhdCwgNSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=