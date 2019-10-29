'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _nav = require('./../components/nav.js');

var _nav2 = _interopRequireDefault(_nav);

var _ajax = require('./../ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 底部导航
var timer = require('./../utils/wxTimer.js'); // 倒计时
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
      navigationBarTitleText: '首页',
      // enablePullDownRefresh: true,
      backgroundTextStyle: 'light'
    }, _this.components = {
      nav: _nav2.default
    }, _this.mixins = [], _this.data = {
      chooesId: '',
      hasUserInfo: false,
      userInfo: {},
      requestImgUrl: '',
      beginTime: '18:00',
      ChooesData: [{ id: '7', img: '/assets/img/image11.png', title: '限时秒杀' }, { id: '2', img: '/assets/img/image12.png', title: '特卖预购' }, { id: '5', img: '/assets/img/image13.png', title: '砍价' }, { id: '1', img: '/assets/img/image14.png', title: '合伙人' }, { id: '3', img: '/assets/img/image15.png', title: '秒赚钱' }, { id: '4', img: '/assets/img/image16.png', title: '领券' }, { id: '6', img: '/assets/img/image17.png', title: '特约商户' }, { id: '8', img: '/assets/img/image18.png', title: '更多频道' }],
      // 轮播
      imgUrls: [{ id: '1', img: 'indexlunbo.png' }, { id: '2', img: 'indexlunbo.png' }, { id: '3', img: 'indexlunbo.png' }, { id: '4', img: 'indexlunbo.png' }],
      wxTimerList: {}, // 倒计时
      goods_list: [], // 商品列表
      areaArr: [], // area区域
      bannerArr: [], //轮播图
      hasmore: false, // 是否有下一页
      curpage: 1 //当前页数
    }, _this.computed = {}, _this.methods = {
      tapName: function tapName(url, id) {
        this.$navigate({ url: url });
        return false;
        if (id == 1) {
          this.$navigate({ url: 'applyPartner' }); // 申请合伙人
        } else if (id == 2) {
          this.$navigate({ url: 'pre?id=' + id });
        } else if (id == 3) {
          this.$navigate({ url: 'discount?id=' + id });
        } else if (id == 4) {
          this.$navigate({ url: 'assemble?id=' + id }); // 拼团
        } else if (id == 5) {
          this.$navigate({ url: 'bargain?id=' + id });
        } else if (id == 6) {
          this.$navigate({ url: 'merchant?id=' + id }); // 特约商户
        } else if (id == 7) {
          this.$navigate({ url: 'seckill?id=' + id });
        } else if (id == 8) {
          this.$navigate({ url: 'moreChannels?id=' + id });
        }
      },

      /**
       * 跳转商品详情
       */
      jumpDetails: function jumpDetails(goods_id, goods_type) {
        console.log(goods_id, goods_type);
        switch (Number(goods_type)) {
          case 0:
            this.$navigate('/pages/shopDetails?goods_id=' + goods_id);
            break;
          case 1:
            this.$navigate('/pages/seckillShopDetails?goods_id=' + goods_id);
        }
      },

      /**
       * 底部导航跳转
       */
      navSearch: function navSearch() {
        this.$navigate('/pages/search');
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      var _this2 = this;

      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      this.getAppUserInfo();
      // 首页-轮播图和areaArr菜单
      (0, _ajax.ajax)({
        url: api.indexDefaultInfo
      }).then(function (res) {
        if (res.code == 200) {
          _this2.areaArr = res.datas.area || [];
          _this2.bannerArr = res.datas.banner || [];
          _this2.$apply();
        }
      });

      this.requestIndexGoodsList();
    }

    // 首页—普通商品列表接口

  }, {
    key: 'requestIndexGoodsList',
    value: function requestIndexGoodsList() {
      var _this3 = this;

      (0, _ajax.ajax)({
        url: api.indexGoodsList,
        type: 'get',
        data: {
          page: 10,
          curpage: this.curpage
        }
      }).then(function (res) {
        if (res.code == 200) {
          var list = res.datas.goods_list || [];
          _this3.goods_list = _this3.goods_list.concat(list);
          _this3.hasmore = res.hasmore;
          _this3.$apply();
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.$interceptors = {
        'request': {
          config: function config(p) {
            console.log(p);
            return p;
          },
          success: function success(rst) {
            console.log(rst);
            return rst;
          }
        }
      };
    }
  }, {
    key: 'getAppUserInfo',
    value: function getAppUserInfo() {
      var _this4 = this;

      var app = this.$parent;
      if (app.globalData.userInfo) {
        console.warn('globalData');
        this.userInfo = app.globalData.userInfo;
        this.hasUserInfo = true;
        this.$apply();
      } else if (wx.canIUse('button.open-type.getUserInfo')) {
        app.userInfoReadyCallback = function (res) {
          console.warn('userInfoReadyCallback');
          _this4.userInfo = res.userInfo;
          _this4.hasUserInfo = true;
          _this4.$apply();
        };
      } else {
        wx.getUserInfo({
          success: function success(res) {
            console.warn('getUserInfo');
            app.globalData.userInfo = res.userInfo;
            _this4.userInfo = app.globalData.userInfo;
            _this4.hasUserInfo = true;
            _this4.$apply();
          }
        });
      }
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(e) {
      var app = this.$parent;
      if (e.detail.errMsg == 'getUserInfo:ok') {
        app.globalData.userInfo = e.detail.userInfo;
        this.userInfo = app.globalData.userInfo;
        this.hasUserInfo = true;
      }
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {}
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.hasmore) {
        this.curpage++;
        this.requestIndexGoodsList();
      }
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh(e) {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInRpbWVyIiwicmVxdWlyZSIsImFwaSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJjb21wb25lbnRzIiwibmF2IiwibWl4aW5zIiwiZGF0YSIsImNob29lc0lkIiwiaGFzVXNlckluZm8iLCJ1c2VySW5mbyIsInJlcXVlc3RJbWdVcmwiLCJiZWdpblRpbWUiLCJDaG9vZXNEYXRhIiwiaWQiLCJpbWciLCJ0aXRsZSIsImltZ1VybHMiLCJ3eFRpbWVyTGlzdCIsImdvb2RzX2xpc3QiLCJhcmVhQXJyIiwiYmFubmVyQXJyIiwiaGFzbW9yZSIsImN1cnBhZ2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJ0YXBOYW1lIiwidXJsIiwiJG5hdmlnYXRlIiwianVtcERldGFpbHMiLCJnb29kc19pZCIsImdvb2RzX3R5cGUiLCJjb25zb2xlIiwibG9nIiwiTnVtYmVyIiwibmF2U2VhcmNoIiwiZXZlbnRzIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJnZXRBcHBVc2VySW5mbyIsImluZGV4RGVmYXVsdEluZm8iLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwiYXJlYSIsImJhbm5lciIsIiRhcHBseSIsInJlcXVlc3RJbmRleEdvb2RzTGlzdCIsImluZGV4R29vZHNMaXN0IiwidHlwZSIsInBhZ2UiLCJsaXN0IiwiY29uY2F0IiwiJGludGVyY2VwdG9ycyIsInAiLCJzdWNjZXNzIiwicnN0IiwiYXBwIiwid2FybiIsInd4IiwiY2FuSVVzZSIsInVzZXJJbmZvUmVhZHlDYWxsYmFjayIsImdldFVzZXJJbmZvIiwiZSIsImRldGFpbCIsImVyck1zZyIsIndlcHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7Ozs7Ozs7OztBQUhxQztBQUNyQyxJQUFJQSxRQUFRQyxRQUFRLHFCQUFSLENBQVosQyxDQUE0QztBQUM1QyxJQUFJQyxNQUFNRCxRQUFRLFdBQVIsQ0FBVjs7SUFFcUJFLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQO0FBQ0FDLDJCQUFxQjtBQUhkLEssUUFLVEMsVSxHQUFhO0FBQ1hDLFdBQUtBO0FBRE0sSyxRQUliQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsZ0JBQVUsRUFETDtBQUVMQyxtQkFBYSxLQUZSO0FBR0xDLGdCQUFVLEVBSEw7QUFJTEMscUJBQWUsRUFKVjtBQUtMQyxpQkFBVyxPQUxOO0FBTUxDLGtCQUFZLENBQ1YsRUFBRUMsSUFBSSxHQUFOLEVBQVdDLEtBQUsseUJBQWhCLEVBQTJDQyxPQUFPLE1BQWxELEVBRFUsRUFFVixFQUFFRixJQUFJLEdBQU4sRUFBV0MsS0FBSyx5QkFBaEIsRUFBMkNDLE9BQU8sTUFBbEQsRUFGVSxFQUdWLEVBQUVGLElBQUksR0FBTixFQUFXQyxLQUFLLHlCQUFoQixFQUEyQ0MsT0FBTyxJQUFsRCxFQUhVLEVBSVYsRUFBRUYsSUFBSSxHQUFOLEVBQVdDLEtBQUsseUJBQWhCLEVBQTJDQyxPQUFPLEtBQWxELEVBSlUsRUFLVixFQUFFRixJQUFJLEdBQU4sRUFBV0MsS0FBSyx5QkFBaEIsRUFBMkNDLE9BQU8sS0FBbEQsRUFMVSxFQU1WLEVBQUVGLElBQUksR0FBTixFQUFXQyxLQUFLLHlCQUFoQixFQUEyQ0MsT0FBTyxJQUFsRCxFQU5VLEVBT1YsRUFBRUYsSUFBSSxHQUFOLEVBQVdDLEtBQUsseUJBQWhCLEVBQTJDQyxPQUFPLE1BQWxELEVBUFUsRUFRVixFQUFFRixJQUFJLEdBQU4sRUFBV0MsS0FBSyx5QkFBaEIsRUFBMkNDLE9BQU8sTUFBbEQsRUFSVSxDQU5QO0FBZ0JMO0FBQ0FDLGVBQVMsQ0FDUCxFQUFFSCxJQUFJLEdBQU4sRUFBV0MsS0FBSyxnQkFBaEIsRUFETyxFQUVQLEVBQUVELElBQUksR0FBTixFQUFXQyxLQUFLLGdCQUFoQixFQUZPLEVBR1AsRUFBRUQsSUFBSSxHQUFOLEVBQVdDLEtBQUssZ0JBQWhCLEVBSE8sRUFJUCxFQUFFRCxJQUFJLEdBQU4sRUFBV0MsS0FBSyxnQkFBaEIsRUFKTyxDQWpCSjtBQXVCTEcsbUJBQWEsRUF2QlIsRUF1Qlk7QUFDakJDLGtCQUFZLEVBeEJQLEVBd0JXO0FBQ2hCQyxlQUFTLEVBekJKLEVBeUJRO0FBQ2JDLGlCQUFXLEVBMUJOLEVBMEJVO0FBQ2ZDLGVBQVMsS0EzQkosRUEyQlc7QUFDaEJDLGVBQVMsQ0E1QkosQ0E0Qk87QUE1QlAsSyxRQStCUEMsUSxHQUFXLEUsUUF3RFhDLE8sR0FBVTtBQUNSQyxhQURRLG1CQUNBQyxHQURBLEVBQ0tiLEVBREwsRUFDUztBQUNmLGFBQUtjLFNBQUwsQ0FBZSxFQUFDRCxLQUFLQSxHQUFOLEVBQWY7QUFDQSxlQUFPLEtBQVA7QUFDQSxZQUFJYixNQUFNLENBQVYsRUFBYTtBQUNYLGVBQUtjLFNBQUwsQ0FBZSxFQUFFRCxtQkFBRixFQUFmLEVBRFcsQ0FDOEI7QUFDMUMsU0FGRCxNQUVPLElBQUliLE1BQU0sQ0FBVixFQUFhO0FBQ2xCLGVBQUtjLFNBQUwsQ0FBZSxFQUFFRCxpQkFBZWIsRUFBakIsRUFBZjtBQUNELFNBRk0sTUFFQSxJQUFJQSxNQUFNLENBQVYsRUFBYTtBQUNsQixlQUFLYyxTQUFMLENBQWUsRUFBRUQsc0JBQW9CYixFQUF0QixFQUFmO0FBQ0QsU0FGTSxNQUVBLElBQUlBLE1BQU0sQ0FBVixFQUFhO0FBQ2xCLGVBQUtjLFNBQUwsQ0FBZSxFQUFFRCxzQkFBb0JiLEVBQXRCLEVBQWYsRUFEa0IsQ0FDNEI7QUFDL0MsU0FGTSxNQUVBLElBQUlBLE1BQU0sQ0FBVixFQUFhO0FBQ2xCLGVBQUtjLFNBQUwsQ0FBZSxFQUFFRCxxQkFBbUJiLEVBQXJCLEVBQWY7QUFDRCxTQUZNLE1BRUEsSUFBSUEsTUFBTSxDQUFWLEVBQWE7QUFDbEIsZUFBS2MsU0FBTCxDQUFlLEVBQUVELHNCQUFvQmIsRUFBdEIsRUFBZixFQURrQixDQUM0QjtBQUMvQyxTQUZNLE1BRUEsSUFBSUEsTUFBTSxDQUFWLEVBQWE7QUFDbEIsZUFBS2MsU0FBTCxDQUFlLEVBQUVELHFCQUFtQmIsRUFBckIsRUFBZjtBQUNELFNBRk0sTUFFQSxJQUFJQSxNQUFNLENBQVYsRUFBYTtBQUNsQixlQUFLYyxTQUFMLENBQWUsRUFBRUQsMEJBQXdCYixFQUExQixFQUFmO0FBQ0Q7QUFDRixPQXJCTzs7QUFzQlI7OztBQUdBZSxpQkF6QlEsdUJBeUJJQyxRQXpCSixFQXlCY0MsVUF6QmQsRUF5QjBCO0FBQ2hDQyxnQkFBUUMsR0FBUixDQUFZSCxRQUFaLEVBQXNCQyxVQUF0QjtBQUNBLGdCQUFRRyxPQUFPSCxVQUFQLENBQVI7QUFDRSxlQUFLLENBQUw7QUFDRSxpQkFBS0gsU0FBTCxrQ0FBOENFLFFBQTlDO0FBQ0E7QUFDRixlQUFLLENBQUw7QUFDRSxpQkFBS0YsU0FBTCx5Q0FBcURFLFFBQXJEO0FBTEo7QUFPRCxPQWxDTzs7QUFtQ1I7OztBQUdBSyxlQXRDUSx1QkFzQ0k7QUFDVixhQUFLUCxTQUFMLENBQWUsZUFBZjtBQUNEO0FBeENPLEssUUEwQ1ZRLE0sR0FBUyxFOzs7Ozs2QkFqR0E7QUFBQTs7QUFDUCxXQUFLekIsYUFBTCxHQUFxQixLQUFLMEIsT0FBTCxDQUFhQyxVQUFiLENBQXdCM0IsYUFBN0M7QUFDQSxXQUFLNEIsY0FBTDtBQUNBO0FBQ0Esc0JBQUs7QUFDSFosYUFBSzVCLElBQUl5QztBQUROLE9BQUwsRUFFR0MsSUFGSCxDQUVRLGVBQU87QUFDYixZQUFJQyxJQUFJQyxJQUFKLElBQVksR0FBaEIsRUFBcUI7QUFDbkIsaUJBQUt2QixPQUFMLEdBQWVzQixJQUFJRSxLQUFKLENBQVVDLElBQVYsSUFBa0IsRUFBakM7QUFDQSxpQkFBS3hCLFNBQUwsR0FBaUJxQixJQUFJRSxLQUFKLENBQVVFLE1BQVYsSUFBb0IsRUFBckM7QUFDQSxpQkFBS0MsTUFBTDtBQUNEO0FBQ0YsT0FSRDs7QUFVQSxXQUFLQyxxQkFBTDtBQUNEOztBQUVEOzs7OzRDQUN3QjtBQUFBOztBQUN0QixzQkFBSztBQUNIckIsYUFBSzVCLElBQUlrRCxjQUROO0FBRUhDLGNBQU0sS0FGSDtBQUdIM0MsY0FBTTtBQUNKNEMsZ0JBQU0sRUFERjtBQUVKNUIsbUJBQVMsS0FBS0E7QUFGVjtBQUhILE9BQUwsRUFPR2tCLElBUEgsQ0FPUSxlQUFPO0FBQ2IsWUFBSUMsSUFBSUMsSUFBSixJQUFZLEdBQWhCLEVBQXFCO0FBQ25CLGNBQUlTLE9BQU9WLElBQUlFLEtBQUosQ0FBVXpCLFVBQVYsSUFBd0IsRUFBbkM7QUFDQSxpQkFBS0EsVUFBTCxHQUFrQixPQUFLQSxVQUFMLENBQWdCa0MsTUFBaEIsQ0FBdUJELElBQXZCLENBQWxCO0FBQ0EsaUJBQUs5QixPQUFMLEdBQWVvQixJQUFJcEIsT0FBbkI7QUFDQSxpQkFBS3lCLE1BQUw7QUFDRDtBQUNGLE9BZEQ7QUFlRDs7OzZCQUVRO0FBQ1AsV0FBS08sYUFBTCxHQUFxQjtBQUNuQixtQkFBVztBQUNQckQsZ0JBRE8sa0JBQ0NzRCxDQURELEVBQ0k7QUFDVHZCLG9CQUFRQyxHQUFSLENBQVlzQixDQUFaO0FBQ0UsbUJBQU9BLENBQVA7QUFDSCxXQUpNO0FBS1BDLGlCQUxPLG1CQUtFQyxHQUxGLEVBS087QUFDWnpCLG9CQUFRQyxHQUFSLENBQVl3QixHQUFaO0FBQ0EsbUJBQU9BLEdBQVA7QUFDRDtBQVJNO0FBRFEsT0FBckI7QUFnQkQ7OztxQ0E2Q2dCO0FBQUE7O0FBQ2YsVUFBSUMsTUFBTSxLQUFLckIsT0FBZjtBQUNBLFVBQUlxQixJQUFJcEIsVUFBSixDQUFlNUIsUUFBbkIsRUFBNkI7QUFDM0JzQixnQkFBUTJCLElBQVIsQ0FBYSxZQUFiO0FBQ0EsYUFBS2pELFFBQUwsR0FBZ0JnRCxJQUFJcEIsVUFBSixDQUFlNUIsUUFBL0I7QUFDQSxhQUFLRCxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsYUFBS3NDLE1BQUw7QUFDRCxPQUxELE1BS08sSUFBSWEsR0FBR0MsT0FBSCxDQUFXLDhCQUFYLENBQUosRUFBZ0Q7QUFDckRILFlBQUlJLHFCQUFKLEdBQTRCLGVBQU87QUFDakM5QixrQkFBUTJCLElBQVIsQ0FBYSx1QkFBYjtBQUNBLGlCQUFLakQsUUFBTCxHQUFnQmdDLElBQUloQyxRQUFwQjtBQUNBLGlCQUFLRCxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsaUJBQUtzQyxNQUFMO0FBQ0QsU0FMRDtBQU1ELE9BUE0sTUFPQTtBQUNMYSxXQUFHRyxXQUFILENBQWU7QUFDYlAsbUJBQVMsc0JBQU87QUFDZHhCLG9CQUFRMkIsSUFBUixDQUFhLGFBQWI7QUFDQUQsZ0JBQUlwQixVQUFKLENBQWU1QixRQUFmLEdBQTBCZ0MsSUFBSWhDLFFBQTlCO0FBQ0EsbUJBQUtBLFFBQUwsR0FBZ0JnRCxJQUFJcEIsVUFBSixDQUFlNUIsUUFBL0I7QUFDQSxtQkFBS0QsV0FBTCxHQUFtQixJQUFuQjtBQUNBLG1CQUFLc0MsTUFBTDtBQUNEO0FBUFksU0FBZjtBQVNEO0FBQ0Y7OztnQ0FDV2lCLEMsRUFBRztBQUNiLFVBQUlOLE1BQU0sS0FBS3JCLE9BQWY7QUFDQSxVQUFJMkIsRUFBRUMsTUFBRixDQUFTQyxNQUFULElBQW1CLGdCQUF2QixFQUF5QztBQUN2Q1IsWUFBSXBCLFVBQUosQ0FBZTVCLFFBQWYsR0FBMEJzRCxFQUFFQyxNQUFGLENBQVN2RCxRQUFuQztBQUNBLGFBQUtBLFFBQUwsR0FBZ0JnRCxJQUFJcEIsVUFBSixDQUFlNUIsUUFBL0I7QUFDQSxhQUFLRCxXQUFMLEdBQW1CLElBQW5CO0FBQ0Q7QUFDRjs7O3dDQUVtQixDQUFFOzs7b0NBQ0w7QUFDZixVQUFHLEtBQUthLE9BQVIsRUFBaUI7QUFDZixhQUFLQyxPQUFMO0FBQ0EsYUFBS3lCLHFCQUFMO0FBQ0Q7QUFDRjs7O3NDQUNpQmdCLEMsRUFBRyxDQUNwQjs7OztFQXpMZ0NHLGVBQUtoQixJOztrQkFBbkJuRCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgbmF2IGZyb20gJy4uL2NvbXBvbmVudHMvbmF2JzsgLy8g5bqV6YOo5a+86IiqXHJcbnZhciB0aW1lciA9IHJlcXVpcmUoJy4uL3V0aWxzL3d4VGltZXIuanMnKTsgLy8g5YCS6K6h5pe2XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mmlumhtScsXHJcbiAgICAvLyBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWUsXHJcbiAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge1xyXG4gICAgbmF2OiBuYXZcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGNob29lc0lkOiAnJyxcclxuICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcclxuICAgIHVzZXJJbmZvOiB7fSxcclxuICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgYmVnaW5UaW1lOiAnMTg6MDAnLFxyXG4gICAgQ2hvb2VzRGF0YTogW1xyXG4gICAgICB7IGlkOiAnNycsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTEucG5nJywgdGl0bGU6ICfpmZDml7bnp5LmnYAnIH0sXHJcbiAgICAgIHsgaWQ6ICcyJywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxMi5wbmcnLCB0aXRsZTogJ+eJueWNlumihOi0rScgfSxcclxuICAgICAgeyBpZDogJzUnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTEzLnBuZycsIHRpdGxlOiAn56CN5Lu3JyB9LFxyXG4gICAgICB7IGlkOiAnMScsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTQucG5nJywgdGl0bGU6ICflkIjkvJnkuronIH0sXHJcbiAgICAgIHsgaWQ6ICczJywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNS5wbmcnLCB0aXRsZTogJ+enkui1mumSsScgfSxcclxuICAgICAgeyBpZDogJzQnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE2LnBuZycsIHRpdGxlOiAn6aKG5Yi4JyB9LFxyXG4gICAgICB7IGlkOiAnNicsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTcucG5nJywgdGl0bGU6ICfnibnnuqbllYbmiLcnIH0sXHJcbiAgICAgIHsgaWQ6ICc4JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxOC5wbmcnLCB0aXRsZTogJ+abtOWkmumikemBkycgfVxyXG4gICAgXSxcclxuICAgIC8vIOi9ruaSrVxyXG4gICAgaW1nVXJsczogW1xyXG4gICAgICB7IGlkOiAnMScsIGltZzogJ2luZGV4bHVuYm8ucG5nJyB9LFxyXG4gICAgICB7IGlkOiAnMicsIGltZzogJ2luZGV4bHVuYm8ucG5nJyB9LFxyXG4gICAgICB7IGlkOiAnMycsIGltZzogJ2luZGV4bHVuYm8ucG5nJyB9LFxyXG4gICAgICB7IGlkOiAnNCcsIGltZzogJ2luZGV4bHVuYm8ucG5nJyB9XHJcbiAgICBdLFxyXG4gICAgd3hUaW1lckxpc3Q6IHt9LCAvLyDlgJLorqHml7ZcclxuICAgIGdvb2RzX2xpc3Q6IFtdLCAvLyDllYblk4HliJfooahcclxuICAgIGFyZWFBcnI6IFtdLCAvLyBhcmVh5Yy65Z+fXHJcbiAgICBiYW5uZXJBcnI6IFtdLCAvL+i9ruaSreWbvlxyXG4gICAgaGFzbW9yZTogZmFsc2UsIC8vIOaYr+WQpuacieS4i+S4gOmhtVxyXG4gICAgY3VycGFnZTogMSwgLy/lvZPliY3pobXmlbBcclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICB0aGlzLmdldEFwcFVzZXJJbmZvKCk7XHJcbiAgICAvLyDpppbpobUt6L2u5pKt5Zu+5ZKMYXJlYUFycuiPnOWNlVxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmluZGV4RGVmYXVsdEluZm8sXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLmFyZWFBcnIgPSByZXMuZGF0YXMuYXJlYSB8fCBbXTtcclxuICAgICAgICB0aGlzLmJhbm5lckFyciA9IHJlcy5kYXRhcy5iYW5uZXIgfHwgW107XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZXF1ZXN0SW5kZXhHb29kc0xpc3QoKVxyXG4gIH1cclxuICBcclxuICAvLyDpppbpobXigJTmma7pgJrllYblk4HliJfooajmjqXlj6NcclxuICByZXF1ZXN0SW5kZXhHb29kc0xpc3QoKSB7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuaW5kZXhHb29kc0xpc3QsXHJcbiAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcGFnZTogMTAsXHJcbiAgICAgICAgY3VycGFnZTogdGhpcy5jdXJwYWdlXHJcbiAgICAgIH0sXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB2YXIgbGlzdCA9IHJlcy5kYXRhcy5nb29kc19saXN0IHx8IFtdXHJcbiAgICAgICAgdGhpcy5nb29kc19saXN0ID0gdGhpcy5nb29kc19saXN0LmNvbmNhdChsaXN0KVxyXG4gICAgICAgIHRoaXMuaGFzbW9yZSA9IHJlcy5oYXNtb3JlXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLiRpbnRlcmNlcHRvcnMgPSB7XHJcbiAgICAgICdyZXF1ZXN0Jzoge1xyXG4gICAgICAgICAgY29uZmlnIChwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHApXHJcbiAgICAgICAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc3VjY2VzcyAocnN0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJzdClcclxuICAgICAgICAgICAgcmV0dXJuIHJzdFxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBcclxuICB9XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICB0YXBOYW1lKHVybCwgaWQpIHtcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoe3VybDogdXJsfSlcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIGlmIChpZCA9PSAxKSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBhcHBseVBhcnRuZXJgIH0pOyAvLyDnlLPor7flkIjkvJnkurpcclxuICAgICAgfSBlbHNlIGlmIChpZCA9PSAyKSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBwcmU/aWQ9JHtpZH1gIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDMpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYGRpc2NvdW50P2lkPSR7aWR9YCB9KTtcclxuICAgICAgfSBlbHNlIGlmIChpZCA9PSA0KSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBhc3NlbWJsZT9pZD0ke2lkfWAgfSk7IC8vIOaLvOWbolxyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDUpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYGJhcmdhaW4/aWQ9JHtpZH1gIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDYpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYG1lcmNoYW50P2lkPSR7aWR9YCB9KTsgLy8g54m557qm5ZWG5oi3XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gNykge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgc2Vja2lsbD9pZD0ke2lkfWAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gOCkge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgbW9yZUNoYW5uZWxzP2lkPSR7aWR9YCB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog6Lez6L2s5ZWG5ZOB6K+m5oOFXHJcbiAgICAgKi9cclxuICAgIGp1bXBEZXRhaWxzKGdvb2RzX2lkLCBnb29kc190eXBlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGdvb2RzX2lkLCBnb29kc190eXBlKVxyXG4gICAgICBzd2l0Y2ggKE51bWJlcihnb29kc190eXBlKSkge1xyXG4gICAgICAgIGNhc2UgMDogXHJcbiAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZShgL3BhZ2VzL3Nob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZShgL3BhZ2VzL3NlY2tpbGxTaG9wRGV0YWlscz9nb29kc19pZD0ke2dvb2RzX2lkfWApO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDlupXpg6jlr7zoiKrot7PovaxcclxuICAgICAqL1xyXG4gICAgbmF2U2VhcmNoKCkge1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL3NlYXJjaCcpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgZXZlbnRzID0ge307XHJcbiAgZ2V0QXBwVXNlckluZm8oKSB7XHJcbiAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignZ2xvYmFsRGF0YScpO1xyXG4gICAgICB0aGlzLnVzZXJJbmZvID0gYXBwLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9IGVsc2UgaWYgKHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSkge1xyXG4gICAgICBhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrID0gcmVzID0+IHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ3VzZXJJbmZvUmVhZHlDYWxsYmFjaycpO1xyXG4gICAgICAgIHRoaXMudXNlckluZm8gPSByZXMudXNlckluZm87XHJcbiAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ2dldFVzZXJJbmZvJyk7XHJcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgICAgIHRoaXMudXNlckluZm8gPSBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgICAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFVzZXJJbmZvKGUpIHtcclxuICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICBpZiAoZS5kZXRhaWwuZXJyTXNnID09ICdnZXRVc2VySW5mbzpvaycpIHtcclxuICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mbztcclxuICAgICAgdGhpcy51c2VySW5mbyA9IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgICB0aGlzLmhhc1VzZXJJbmZvID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge31cclxuICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgIGlmKHRoaXMuaGFzbW9yZSkge1xyXG4gICAgICB0aGlzLmN1cnBhZ2UgKysgXHJcbiAgICAgIHRoaXMucmVxdWVzdEluZGV4R29vZHNMaXN0KClcclxuICAgIH1cclxuICB9XHJcbiAgb25QdWxsRG93blJlZnJlc2goZSkge1xyXG4gIH1cclxufVxyXG4iXX0=