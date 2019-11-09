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

      var t = this.formatDate('1573206175');
      console.log(t);
    }
  }, {
    key: 'formatDate',
    value: function formatDate(secs) {
      //123456789 --> 年-月-日 时：分：秒
      var length = secs.toString().length;
      secs = length == 10 ? Number(secs + '000') : Number(secs);
      var t = new Date(secs);
      var year = t.getFullYear();
      var month = t.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }
      var date = t.getDate();
      if (date < 10) {
        date = '0' + date;
      }
      var hour = t.getHours();
      if (hour < 10) {
        hour = '0' + hour;
      }
      var minute = t.getMinutes();
      if (minute < 10) {
        minute = '0' + minute;
      }
      var second = t.getSeconds();
      if (second < 10) {
        second = '0' + second;
      }
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/shopDetails'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BEZXRhaWxzLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsIm1peGlucyIsImRhdGEiLCJnb29kc051bSIsImF0dHJGbGFnIiwidGFiTGlzdCIsIm5hbWUiLCJjdXJyZW50VGFiIiwiZ29vZHNfaWQiLCJyZXF1ZXN0SW1nVXJsIiwiZ29vZHNfY29udGVudCIsInN0b3JlX2luZm8iLCJob3Rfc2FsZXMiLCJnb29kc19pbWFnZV9tb2JpbGUiLCJjb250cmFjdGxpc3QiLCJhdHRyIiwidGl0bGUiLCJwcm9wIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic3dpdGNoTmF2IiwiaWR4Iiwic2hvd0F0dHJNYXNrIiwiYXR0ckJ0blN1Ym1pdCIsInByb3BBcnIiLCJmaWx0ZXIiLCJpdGVtIiwiYWN0aXZlIiwibWFwIiwibGVuZ3RoIiwid3giLCJzaG93VG9hc3QiLCJpY29uIiwiYXBwIiwiJHBhcmVudCIsImNhcnRfaWQiLCJ1cmwiLCJtZW1iZXJCdXlPbmUiLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwiZ2xvYmFsRGF0YSIsIm9yZGVySW5mbyIsIiRuYXZpZ2F0ZSIsImFkZE51bSIsInJlZHVOdW0iLCJjaGFuZ2VBdHRyIiwib25lIiwidHdvIiwiZm9yRWFjaCIsImluZGV4IiwiYWRkQ2FydCIsInRoYXQiLCJjYXJ0QWRkIiwicXVhbnRpdHkiLCJzdGF0ZSIsIiRhcHBseSIsImVycm9yIiwibmF2R29vZHNEZXRhaWxzIiwiJHJlZGlyZWN0IiwiZXZlbnRzIiwiY29uc29sZSIsImxvZyIsInQiLCJvcmRpbmFyeUdvb2RzRHRhaWwiLCJ0eXBlIiwiYXJ0aWNsZSIsImdvb2RzX2JvZHkiLCJ3eFBhcnNlIiwiZm9ybWF0RGF0ZSIsInNlY3MiLCJ0b1N0cmluZyIsIk51bWJlciIsIkRhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJtb250aCIsImdldE1vbnRoIiwiZGF0ZSIsImdldERhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW51dGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7QUFFQSxJQUFJQyxVQUFVRCxRQUFRLDZCQUFSLENBQWQ7O0lBQ3FCRSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQWIsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkMsaUJBQVdDO0FBREQsSyxRQUlaQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FETDtBQUVMQyxnQkFBVSxLQUZMO0FBR0xDLGVBQVMsQ0FBQyxFQUFFQyxNQUFNLE1BQVIsRUFBRCxFQUFrQixFQUFFQSxNQUFNLE1BQVIsRUFBbEIsQ0FISixFQUd5QztBQUM5Q0Msa0JBQVksQ0FKUCxFQUlVO0FBQ2ZDLGdCQUFVLElBTEwsRUFLVztBQUNoQkMscUJBQWUsSUFOVixFQU1nQjtBQUNyQkMscUJBQWUsSUFQVixFQU9nQjtBQUNyQkMsa0JBQVksSUFSUCxFQVFhO0FBQ2xCQyxpQkFBVyxFQVROLEVBU1U7QUFDZkMsMEJBQW9CLEVBVmYsRUFVbUI7QUFDeEJDLG9CQUFjLEVBWFQsRUFXYTtBQUNsQkMsWUFBTSxDQUNKLEVBQUNDLE9BQU8sSUFBUixFQUFjQyxNQUFNLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxJQUFULEVBQWMsS0FBZCxDQUFwQixFQURJLEVBRUosRUFBQ0QsT0FBTyxJQUFSLEVBQWNDLE1BQU0sQ0FBQyxJQUFELEVBQU0sSUFBTixFQUFXLElBQVgsRUFBZ0IsSUFBaEIsQ0FBcEIsRUFGSTtBQVpELEssUUFrQlBDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSO0FBQ0FDLGVBRlEscUJBRUVDLEdBRkYsRUFFTztBQUNiLGFBQUtkLFVBQUwsR0FBa0JjLEdBQWxCO0FBQ0QsT0FKTzs7QUFLUjtBQUNBQyxrQkFOUSwwQkFNTztBQUNiLGFBQUtsQixRQUFMLEdBQWdCLElBQWhCO0FBQ0QsT0FSTztBQVNSbUIsbUJBVFEsMkJBU1E7QUFBQTs7QUFDZCxZQUFJQyxVQUFVLEtBQUtULElBQUwsQ0FBVVUsTUFBVixDQUFpQjtBQUFBLGlCQUFRQyxLQUFLQyxNQUFiO0FBQUEsU0FBakIsRUFBc0NDLEdBQXRDLENBQTBDO0FBQUEsaUJBQVFGLEtBQUtDLE1BQWI7QUFBQSxTQUExQyxDQUFkO0FBQ0EsWUFBR0gsUUFBUUssTUFBUixLQUFtQixLQUFLZCxJQUFMLENBQVVjLE1BQWhDLEVBQXdDO0FBQ3RDQyxhQUFHQyxTQUFILENBQWE7QUFDWGYsbUJBQU8sU0FESTtBQUVYZ0Isa0JBQU07QUFGSyxXQUFiO0FBSUEsaUJBQU8sS0FBUDtBQUNEO0FBQ0QsWUFBSUMsTUFBTSxLQUFLQyxPQUFmO0FBQ0EsWUFBSTFCLFdBQVcsS0FBS0EsUUFBcEI7QUFDQSxZQUFJTCxXQUFXLEtBQUtBLFFBQXBCO0FBQ0EsWUFBSWdDLFVBQWEzQixRQUFiLFNBQXlCTCxRQUE3QjtBQUNBLHdCQUFLO0FBQ0hpQyxlQUFLL0MsSUFBSWdELFlBRE47QUFFSG5DLGdCQUFNO0FBQ0ppQztBQURJO0FBRkgsU0FBTCxFQUtHRyxJQUxILENBS1EsZUFBTztBQUNiLGNBQUdDLElBQUlDLElBQUosSUFBWSxHQUFmLEVBQW9CO0FBQ2xCRCxnQkFBSUUsS0FBSixDQUFVTixPQUFWLEdBQW9CQSxPQUFwQjtBQUNBRixnQkFBSVMsVUFBSixDQUFlQyxTQUFmLEdBQTJCSixJQUFJRSxLQUEvQjtBQUNBLG1CQUFLRyxTQUFMLENBQWUsRUFBRVIsS0FBSyxtQkFBUCxFQUFmO0FBQ0Q7QUFDRixTQVhEO0FBWUQsT0FsQ087QUFtQ1JTLFlBbkNRLG9CQW1DQztBQUNQLGFBQUsxQyxRQUFMO0FBQ0QsT0FyQ087QUFzQ1IyQyxhQXRDUSxxQkFzQ0M7QUFDUCxZQUFHLEtBQUszQyxRQUFMLElBQWlCLENBQXBCLEVBQXVCO0FBQ3JCLGVBQUtBLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxhQUFLQSxRQUFMO0FBQ0QsT0E1Q087QUE2Q1I0QyxnQkE3Q1Esc0JBNkNHQyxHQTdDSCxFQTZDUUMsR0E3Q1IsRUE2Q1k7QUFDbEIsYUFBS2xDLElBQUwsQ0FBVW1DLE9BQVYsQ0FBa0IsVUFBQ3hCLElBQUQsRUFBT3lCLEtBQVAsRUFBaUI7QUFDakMsY0FBR0gsT0FBT0csS0FBVixFQUFpQjtBQUNmekIsaUJBQUtDLE1BQUwsR0FBY0QsS0FBS1QsSUFBTCxDQUFVZ0MsR0FBVixDQUFkO0FBQ0Q7QUFDRixTQUpEO0FBS0QsT0FuRE87QUFvRFJHLGFBcERRLHFCQW9EQztBQUFBOztBQUNQLFlBQUlDLE9BQU8sSUFBWDtBQUNBLHdCQUFLO0FBQ0hqQixlQUFLL0MsSUFBSWlFLE9BRE47QUFFSHBELGdCQUFNO0FBQ0pNLHNCQUFVLEtBQUtBLFFBRFg7QUFFSitDLHNCQUFVLEtBQUtwRDtBQUZYO0FBRkgsU0FBTCxFQU1HbUMsSUFOSCxDQU1RLGVBQU87QUFDYixjQUFHQyxJQUFJRSxLQUFKLENBQVVlLEtBQVYsSUFBbUIsQ0FBdEIsRUFBeUI7QUFDdkIxQixlQUFHQyxTQUFILENBQWE7QUFDWGYscUJBQU87QUFESSxhQUFiO0FBR0EsbUJBQUtaLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxtQkFBS3FELE1BQUw7QUFDRCxXQU5ELE1BTU87QUFDTDNCLGVBQUdDLFNBQUgsQ0FBYTtBQUNYZixxQkFBT3VCLElBQUlFLEtBQUosQ0FBVWlCLEtBRE47QUFFWDFCLG9CQUFNO0FBRkssYUFBYjtBQUlEO0FBQ0YsU0FuQkQ7QUFvQkQsT0ExRU87QUEyRVIyQixxQkEzRVEsMkJBMkVRbkQsUUEzRVIsRUEyRWtCO0FBQ3hCLGFBQUtvRCxTQUFMLENBQWUsRUFBRXhCLCtCQUE2QjVCLFFBQS9CLEVBQWY7QUFDRDtBQTdFTyxLLFFBZ0ZWcUQsTSxHQUFTLEU7Ozs7OzZCQWpGQSxDQUFFOzs7d0NBa0ZRO0FBQ2pCQyxjQUFRQyxHQUFSLENBQVksR0FBWjtBQUNEOzs7MkJBQ01DLEMsRUFBRztBQUFBOztBQUNSLFdBQUt2RCxhQUFMLEdBQXFCLEtBQUt5QixPQUFMLENBQWFRLFVBQWIsQ0FBd0JqQyxhQUE3QztBQUNBLFdBQUtELFFBQUwsR0FBZ0J3RCxFQUFFeEQsUUFBbEI7QUFDQSxVQUFJNkMsT0FBTyxJQUFYO0FBQ0E7QUFDQSxzQkFBSztBQUNIakIsYUFBSy9DLElBQUk0RSxrQkFETjtBQUVIQyxjQUFNLEtBRkg7QUFHSGhFLGNBQU07QUFDSk0sb0JBQVUsS0FBS0E7QUFEWDtBQUhILE9BQUwsRUFNRzhCLElBTkgsQ0FNUSxlQUFPO0FBQ2IsWUFBR0MsSUFBSUMsSUFBSixJQUFZLEdBQWYsRUFBb0I7QUFDbEIsaUJBQUs5QixhQUFMLEdBQXFCNkIsSUFBSUUsS0FBSixDQUFVL0IsYUFBL0I7QUFDQSxpQkFBS0ksWUFBTCxHQUFvQnlCLElBQUlFLEtBQUosQ0FBVS9CLGFBQVYsQ0FBd0JJLFlBQXhCLElBQXdDLEVBQTVEO0FBQ0EsaUJBQUtELGtCQUFMLEdBQTBCMEIsSUFBSUUsS0FBSixDQUFVNUIsa0JBQVYsSUFBZ0MsRUFBMUQ7QUFDQSxpQkFBS0YsVUFBTCxHQUFrQjRCLElBQUlFLEtBQUosQ0FBVTlCLFVBQTVCO0FBQ0EsaUJBQUtDLFNBQUwsR0FBaUIyQixJQUFJRSxLQUFKLENBQVU3QixTQUEzQjtBQUNBLGlCQUFLNkMsTUFBTDtBQUNBLGNBQUlVLFVBQVU1QixJQUFJRSxLQUFKLENBQVUvQixhQUFWLENBQXdCMEQsVUFBdEM7QUFDQTtBQUNBN0Usa0JBQVE4RSxPQUFSLENBQWdCLFNBQWhCLEVBQTJCLE1BQTNCLEVBQW1DRixPQUFuQyxFQUE0Q2QsSUFBNUMsRUFBa0QsQ0FBbEQ7QUFDRDtBQUNGLE9BbEJEOztBQXFCQSxVQUFJVyxJQUFJLEtBQUtNLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBUjtBQUNBUixjQUFRQyxHQUFSLENBQVlDLENBQVo7QUFDRDs7OytCQUVXTyxJLEVBQUs7QUFBRTtBQUNoQixVQUFJMUMsU0FBUzBDLEtBQUtDLFFBQUwsR0FBZ0IzQyxNQUE3QjtBQUNBMEMsYUFBTzFDLFVBQVUsRUFBVixHQUFlNEMsT0FBT0YsT0FBTyxLQUFkLENBQWYsR0FBc0NFLE9BQU9GLElBQVAsQ0FBN0M7QUFDQSxVQUFJUCxJQUFJLElBQUlVLElBQUosQ0FBU0gsSUFBVCxDQUFSO0FBQ0EsVUFBSUksT0FBT1gsRUFBRVksV0FBRixFQUFYO0FBQ0EsVUFBSUMsUUFBUWIsRUFBRWMsUUFBRixLQUFlLENBQTNCO0FBQ0EsVUFBR0QsUUFBUSxFQUFYLEVBQWM7QUFBQ0EsZ0JBQVEsTUFBTUEsS0FBZDtBQUFvQjtBQUNuQyxVQUFJRSxPQUFPZixFQUFFZ0IsT0FBRixFQUFYO0FBQ0EsVUFBR0QsT0FBTyxFQUFWLEVBQWE7QUFBQ0EsZUFBTyxNQUFNQSxJQUFiO0FBQWtCO0FBQ2hDLFVBQUlFLE9BQU9qQixFQUFFa0IsUUFBRixFQUFYO0FBQ0EsVUFBR0QsT0FBTyxFQUFWLEVBQWE7QUFBQ0EsZUFBTyxNQUFNQSxJQUFiO0FBQWtCO0FBQ2hDLFVBQUlFLFNBQVNuQixFQUFFb0IsVUFBRixFQUFiO0FBQ0EsVUFBR0QsU0FBUyxFQUFaLEVBQWU7QUFBQ0EsaUJBQVMsTUFBTUEsTUFBZjtBQUFzQjtBQUN0QyxVQUFJRSxTQUFTckIsRUFBRXNCLFVBQUYsRUFBYjtBQUNBLFVBQUdELFNBQVMsRUFBWixFQUFlO0FBQUNBLGlCQUFTLE1BQU1BLE1BQWY7QUFBc0I7QUFDdEMsYUFBT1YsT0FBSyxHQUFMLEdBQVNFLEtBQVQsR0FBZSxHQUFmLEdBQW1CRSxJQUFuQixHQUF3QixHQUF4QixHQUE0QkUsSUFBNUIsR0FBaUMsR0FBakMsR0FBcUNFLE1BQXJDLEdBQTRDLEdBQTVDLEdBQWdERSxNQUF2RDtBQUNKOzs7O0VBbktrQ0UsZUFBS0MsSTs7a0JBQW5CaEcsSyIsImZpbGUiOiJzaG9wRGV0YWlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG1hc2sgZnJvbSAnLi4vY29tcG9uZW50cy9tYXNrJztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbnZhciBXeFBhcnNlID0gcmVxdWlyZSgnLi4vdXRpbHMvd3hQYXJzZS93eFBhcnNlLmpzJyk7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImF0dHJzbWFza1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiYXR0ckZsYWdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgYXR0cnNtYXNrOiBtYXNrXHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBnb29kc051bTogMSxcclxuICAgIGF0dHJGbGFnOiBmYWxzZSxcclxuICAgIHRhYkxpc3Q6IFt7IG5hbWU6ICfllYblk4Hku4vnu40nfSwgeyBuYW1lOiAn5Zu+5paH6K+m5oOFJyB9XSwgLy8g6aG26YOo6YCJ6aG55Y2hXHJcbiAgICBjdXJyZW50VGFiOiAwLCAvLyDpobbpg6jpgInpobnljaHntKLlvJVcclxuICAgIGdvb2RzX2lkOiBudWxsLCAvL+WVhuWTgWdvb2RzX2lkXHJcbiAgICByZXF1ZXN0SW1nVXJsOiBudWxsLCAvL+WbvueJh+Wfn+WQjVxyXG4gICAgZ29vZHNfY29udGVudDogbnVsbCwgLy8g5ZWG5ZOB5YaF5a65XHJcbiAgICBzdG9yZV9pbmZvOiBudWxsLCAvLyDlupfpk7rkv6Hmga9cclxuICAgIGhvdF9zYWxlczogW10sIC8v5o6o6I2Q5ZWG5ZOB5YiX6KGoXHJcbiAgICBnb29kc19pbWFnZV9tb2JpbGU6IFtdLCAvLyDllYblk4Hova7mkq3lm75cclxuICAgIGNvbnRyYWN0bGlzdDoge30sIC8vIOWVhuWTgeacjeWKoeivtOaYjlxyXG4gICAgYXR0cjogW1xyXG4gICAgICB7dGl0bGU6ICflpKflsI8nLCBwcm9wOiBbJ3MnLCd4JywneGwnLCd4bGwnXSB9LFxyXG4gICAgICB7dGl0bGU6ICfpopzoibInLCBwcm9wOiBbJ+e6ouiJsicsJ+m7keiJsicsJ+eZveiJsicsJ+m7hOiJsiddIH1cclxuICAgIF1cclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG9uU2hvdygpIHt9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOWIh+aNoumhtumDqOWvvOiIqlxyXG4gICAgc3dpdGNoTmF2KGlkeCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRUYWIgPSBpZHg7XHJcbiAgICB9LFxyXG4gICAgLy8g5pi+56S66YCJ5oup5ZWG5ZOB5qGGXHJcbiAgICBzaG93QXR0ck1hc2soKSB7XHJcbiAgICAgIHRoaXMuYXR0ckZsYWcgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGF0dHJCdG5TdWJtaXQoKSB7XHJcbiAgICAgIHZhciBwcm9wQXJyID0gdGhpcy5hdHRyLmZpbHRlcihpdGVtID0+IGl0ZW0uYWN0aXZlKS5tYXAoaXRlbSA9PiBpdGVtLmFjdGl2ZSlcclxuICAgICAgaWYocHJvcEFyci5sZW5ndGggIT09IHRoaXMuYXR0ci5sZW5ndGgpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nllYblk4Hop4TmoLwnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgICB2YXIgZ29vZHNfaWQgPSB0aGlzLmdvb2RzX2lkXHJcbiAgICAgIHZhciBnb29kc051bSA9IHRoaXMuZ29vZHNOdW1cclxuICAgICAgdmFyIGNhcnRfaWQgPSBgJHtnb29kc19pZH18JHtnb29kc051bX1gXHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLm1lbWJlckJ1eU9uZSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBjYXJ0X2lkLFxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgcmVzLmRhdGFzLmNhcnRfaWQgPSBjYXJ0X2lkXHJcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS5vcmRlckluZm8gPSByZXMuZGF0YXNcclxuICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiAnL3BhZ2VzL3NldHRsZW1lbnQnIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhZGROdW0oKSB7XHJcbiAgICAgIHRoaXMuZ29vZHNOdW0gKytcclxuICAgIH0sXHJcbiAgICByZWR1TnVtKCl7XHJcbiAgICAgIGlmKHRoaXMuZ29vZHNOdW0gPD0gMSkge1xyXG4gICAgICAgIHRoaXMuZ29vZHNOdW0gPSAxXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5nb29kc051bS0tXHJcbiAgICB9LFxyXG4gICAgY2hhbmdlQXR0cihvbmUsIHR3byl7XHJcbiAgICAgIHRoaXMuYXR0ci5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmKG9uZSA9PSBpbmRleCkge1xyXG4gICAgICAgICAgaXRlbS5hY3RpdmUgPSBpdGVtLnByb3BbdHdvXVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhZGRDYXJ0KCl7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5jYXJ0QWRkLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGdvb2RzX2lkOiB0aGlzLmdvb2RzX2lkLFxyXG4gICAgICAgICAgcXVhbnRpdHk6IHRoaXMuZ29vZHNOdW1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZihyZXMuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfmt7vliqDmiJDlip8nXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgdGhpcy5hdHRyRmxhZyA9IGZhbHNlXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMuZXJyb3IsXHJcbiAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgbmF2R29vZHNEZXRhaWxzKGdvb2RzX2lkKSB7XHJcbiAgICAgIHRoaXMuJHJlZGlyZWN0KHsgdXJsOiBgc2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCl7XHJcbiAgICBjb25zb2xlLmxvZyg5OTkpXHJcbiAgfVxyXG4gIG9uTG9hZCh0KSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgdGhpcy5nb29kc19pZCA9IHQuZ29vZHNfaWQ7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAvLyDmma7pgJrllYblk4Hor6bmg4VcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5vcmRpbmFyeUdvb2RzRHRhaWwsXHJcbiAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgZ29vZHNfaWQ6IHRoaXMuZ29vZHNfaWRcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLmdvb2RzX2NvbnRlbnQgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudFxyXG4gICAgICAgIHRoaXMuY29udHJhY3RsaXN0ID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuY29udHJhY3RsaXN0IHx8IHt9XHJcbiAgICAgICAgdGhpcy5nb29kc19pbWFnZV9tb2JpbGUgPSByZXMuZGF0YXMuZ29vZHNfaW1hZ2VfbW9iaWxlIHx8IFtdXHJcbiAgICAgICAgdGhpcy5zdG9yZV9pbmZvID0gcmVzLmRhdGFzLnN0b3JlX2luZm9cclxuICAgICAgICB0aGlzLmhvdF9zYWxlcyA9IHJlcy5kYXRhcy5ob3Rfc2FsZXNcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgdmFyIGFydGljbGUgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudC5nb29kc19ib2R5XHJcbiAgICAgICAgLy8gYXJ0aWNsZSA9IGFydGljbGUucmVwbGFjZSgvc3JjPVwiL2csIGBzcmM9XCIke3RoYXQucmVxdWVzdEltZ1VybH1gKTtcclxuICAgICAgICBXeFBhcnNlLnd4UGFyc2UoJ2FydGljbGUnLCAnaHRtbCcsIGFydGljbGUsIHRoYXQsIDUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgdmFyIHQgPSB0aGlzLmZvcm1hdERhdGUoJzE1NzMyMDYxNzUnKVxyXG4gICAgY29uc29sZS5sb2codClcclxuICB9XHJcblxyXG4gIGZvcm1hdERhdGUgKHNlY3MpeyAvLzEyMzQ1Njc4OSAtLT4g5bm0LeaciC3ml6Ug5pe277ya5YiG77ya56eSXHJcbiAgICAgdmFyIGxlbmd0aCA9IHNlY3MudG9TdHJpbmcoKS5sZW5ndGhcclxuICAgICBzZWNzID0gbGVuZ3RoID09IDEwID8gTnVtYmVyKHNlY3MgKyAnMDAwJykgOiBOdW1iZXIoc2VjcylcclxuwqDCoMKgwqDCoHZhciB0ID0gbmV3IERhdGUoc2VjcylcclxuwqDCoMKgwqDCoHZhciB5ZWFyID0gdC5nZXRGdWxsWWVhcigpXHJcbsKgwqDCoMKgwqB2YXIgbW9udGggPSB0LmdldE1vbnRoKCkgKyAxXHJcbsKgwqDCoMKgwqBpZihtb250aCA8IDEwKXttb250aCA9ICcwJyArIG1vbnRofVxyXG7CoMKgwqDCoMKgdmFyIGRhdGUgPSB0LmdldERhdGUoKVxyXG7CoMKgwqDCoMKgaWYoZGF0ZSA8IDEwKXtkYXRlID0gJzAnICsgZGF0ZX1cclxuwqDCoMKgwqDCoHZhciBob3VyID0gdC5nZXRIb3VycygpXHJcbsKgwqDCoMKgwqBpZihob3VyIDwgMTApe2hvdXIgPSAnMCcgKyBob3VyfVxyXG7CoMKgwqDCoMKgdmFyIG1pbnV0ZSA9IHQuZ2V0TWludXRlcygpXHJcbsKgwqDCoMKgwqBpZihtaW51dGUgPCAxMCl7bWludXRlID0gJzAnICsgbWludXRlfVxyXG7CoMKgwqDCoMKgdmFyIHNlY29uZCA9IHQuZ2V0U2Vjb25kcygpXHJcbsKgwqDCoMKgwqBpZihzZWNvbmQgPCAxMCl7c2Vjb25kID0gJzAnICsgc2Vjb25kfVxyXG7CoMKgwqDCoMKgcmV0dXJuIHllYXIrJy0nK21vbnRoKyctJytkYXRlKycgJytob3VyKyc6JyttaW51dGUrJzonK3NlY29uZFxyXG59XHJcbiAgXHJcbn1cclxuIl19