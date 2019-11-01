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
      navSearch: function navSearch() {
        this.$navigate('/pages/search');
      },
      logoHanld: function logoHanld() {
        wx.previewImage({
          urls: ['/assets/img/logo.png']
        });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInRpbWVyIiwicmVxdWlyZSIsImFwaSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJjb21wb25lbnRzIiwibmF2IiwibWl4aW5zIiwiZGF0YSIsImNob29lc0lkIiwiaGFzVXNlckluZm8iLCJ1c2VySW5mbyIsInJlcXVlc3RJbWdVcmwiLCJiZWdpblRpbWUiLCJDaG9vZXNEYXRhIiwiaWQiLCJpbWciLCJ0aXRsZSIsImltZ1VybHMiLCJ3eFRpbWVyTGlzdCIsImdvb2RzX2xpc3QiLCJhcmVhQXJyIiwiYmFubmVyQXJyIiwiaGFzbW9yZSIsImN1cnBhZ2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJ0YXBOYW1lIiwidXJsIiwiJG5hdmlnYXRlIiwianVtcERldGFpbHMiLCJnb29kc19pZCIsImdvb2RzX3R5cGUiLCJjb25zb2xlIiwibG9nIiwiTnVtYmVyIiwibmF2U2VhcmNoIiwibG9nb0hhbmxkIiwid3giLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwiZXZlbnRzIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJnZXRBcHBVc2VySW5mbyIsImluZGV4RGVmYXVsdEluZm8iLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwiYXJlYSIsImJhbm5lciIsIiRhcHBseSIsInJlcXVlc3RJbmRleEdvb2RzTGlzdCIsImluZGV4R29vZHNMaXN0IiwidHlwZSIsInBhZ2UiLCJsaXN0IiwiY29uY2F0IiwiJGludGVyY2VwdG9ycyIsInAiLCJzdWNjZXNzIiwicnN0IiwiYXBwIiwid2FybiIsImNhbklVc2UiLCJ1c2VySW5mb1JlYWR5Q2FsbGJhY2siLCJnZXRVc2VySW5mbyIsImUiLCJkZXRhaWwiLCJlcnJNc2ciLCJ3ZXB5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7Ozs7Ozs7Ozs7QUFIcUM7QUFDckMsSUFBSUEsUUFBUUMsUUFBUSxxQkFBUixDQUFaLEMsQ0FBNEM7QUFDNUMsSUFBSUMsTUFBTUQsUUFBUSxXQUFSLENBQVY7O0lBRXFCRSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsSUFEakI7QUFFUDtBQUNBQywyQkFBcUI7QUFIZCxLLFFBS1RDLFUsR0FBYTtBQUNYQyxXQUFLQTtBQURNLEssUUFJYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLEVBREw7QUFFTEMsbUJBQWEsS0FGUjtBQUdMQyxnQkFBVSxFQUhMO0FBSUxDLHFCQUFlLEVBSlY7QUFLTEMsaUJBQVcsT0FMTjtBQU1MQyxrQkFBWSxDQUNWLEVBQUVDLElBQUksR0FBTixFQUFXQyxLQUFLLHlCQUFoQixFQUEyQ0MsT0FBTyxNQUFsRCxFQURVLEVBRVYsRUFBRUYsSUFBSSxHQUFOLEVBQVdDLEtBQUsseUJBQWhCLEVBQTJDQyxPQUFPLE1BQWxELEVBRlUsRUFHVixFQUFFRixJQUFJLEdBQU4sRUFBV0MsS0FBSyx5QkFBaEIsRUFBMkNDLE9BQU8sSUFBbEQsRUFIVSxFQUlWLEVBQUVGLElBQUksR0FBTixFQUFXQyxLQUFLLHlCQUFoQixFQUEyQ0MsT0FBTyxLQUFsRCxFQUpVLEVBS1YsRUFBRUYsSUFBSSxHQUFOLEVBQVdDLEtBQUsseUJBQWhCLEVBQTJDQyxPQUFPLEtBQWxELEVBTFUsRUFNVixFQUFFRixJQUFJLEdBQU4sRUFBV0MsS0FBSyx5QkFBaEIsRUFBMkNDLE9BQU8sSUFBbEQsRUFOVSxFQU9WLEVBQUVGLElBQUksR0FBTixFQUFXQyxLQUFLLHlCQUFoQixFQUEyQ0MsT0FBTyxNQUFsRCxFQVBVLEVBUVYsRUFBRUYsSUFBSSxHQUFOLEVBQVdDLEtBQUsseUJBQWhCLEVBQTJDQyxPQUFPLE1BQWxELEVBUlUsQ0FOUDtBQWdCTDtBQUNBQyxlQUFTLENBQ1AsRUFBRUgsSUFBSSxHQUFOLEVBQVdDLEtBQUssZ0JBQWhCLEVBRE8sRUFFUCxFQUFFRCxJQUFJLEdBQU4sRUFBV0MsS0FBSyxnQkFBaEIsRUFGTyxFQUdQLEVBQUVELElBQUksR0FBTixFQUFXQyxLQUFLLGdCQUFoQixFQUhPLEVBSVAsRUFBRUQsSUFBSSxHQUFOLEVBQVdDLEtBQUssZ0JBQWhCLEVBSk8sQ0FqQko7QUF1QkxHLG1CQUFhLEVBdkJSLEVBdUJZO0FBQ2pCQyxrQkFBWSxFQXhCUCxFQXdCVztBQUNoQkMsZUFBUyxFQXpCSixFQXlCUTtBQUNiQyxpQkFBVyxFQTFCTixFQTBCVTtBQUNmQyxlQUFTLEtBM0JKLEVBMkJXO0FBQ2hCQyxlQUFTLENBNUJKLENBNEJPO0FBNUJQLEssUUErQlBDLFEsR0FBVyxFLFFBd0RYQyxPLEdBQVU7QUFDUkMsYUFEUSxtQkFDQUMsR0FEQSxFQUNLYixFQURMLEVBQ1M7QUFDZixhQUFLYyxTQUFMLENBQWUsRUFBQ0QsS0FBS0EsR0FBTixFQUFmO0FBQ0EsZUFBTyxLQUFQO0FBQ0EsWUFBSWIsTUFBTSxDQUFWLEVBQWE7QUFDWCxlQUFLYyxTQUFMLENBQWUsRUFBRUQsbUJBQUYsRUFBZixFQURXLENBQzhCO0FBQzFDLFNBRkQsTUFFTyxJQUFJYixNQUFNLENBQVYsRUFBYTtBQUNsQixlQUFLYyxTQUFMLENBQWUsRUFBRUQsaUJBQWViLEVBQWpCLEVBQWY7QUFDRCxTQUZNLE1BRUEsSUFBSUEsTUFBTSxDQUFWLEVBQWE7QUFDbEIsZUFBS2MsU0FBTCxDQUFlLEVBQUVELHNCQUFvQmIsRUFBdEIsRUFBZjtBQUNELFNBRk0sTUFFQSxJQUFJQSxNQUFNLENBQVYsRUFBYTtBQUNsQixlQUFLYyxTQUFMLENBQWUsRUFBRUQsc0JBQW9CYixFQUF0QixFQUFmLEVBRGtCLENBQzRCO0FBQy9DLFNBRk0sTUFFQSxJQUFJQSxNQUFNLENBQVYsRUFBYTtBQUNsQixlQUFLYyxTQUFMLENBQWUsRUFBRUQscUJBQW1CYixFQUFyQixFQUFmO0FBQ0QsU0FGTSxNQUVBLElBQUlBLE1BQU0sQ0FBVixFQUFhO0FBQ2xCLGVBQUtjLFNBQUwsQ0FBZSxFQUFFRCxzQkFBb0JiLEVBQXRCLEVBQWYsRUFEa0IsQ0FDNEI7QUFDL0MsU0FGTSxNQUVBLElBQUlBLE1BQU0sQ0FBVixFQUFhO0FBQ2xCLGVBQUtjLFNBQUwsQ0FBZSxFQUFFRCxxQkFBbUJiLEVBQXJCLEVBQWY7QUFDRCxTQUZNLE1BRUEsSUFBSUEsTUFBTSxDQUFWLEVBQWE7QUFDbEIsZUFBS2MsU0FBTCxDQUFlLEVBQUVELDBCQUF3QmIsRUFBMUIsRUFBZjtBQUNEO0FBQ0YsT0FyQk87QUFzQlJlLGlCQXRCUSx1QkFzQklDLFFBdEJKLEVBc0JjQyxVQXRCZCxFQXNCMEI7QUFDaENDLGdCQUFRQyxHQUFSLENBQVlILFFBQVosRUFBc0JDLFVBQXRCO0FBQ0EsZ0JBQVFHLE9BQU9ILFVBQVAsQ0FBUjtBQUNFLGVBQUssQ0FBTDtBQUNFLGlCQUFLSCxTQUFMLGtDQUE4Q0UsUUFBOUM7QUFDQTtBQUNGLGVBQUssQ0FBTDtBQUNFLGlCQUFLRixTQUFMLHlDQUFxREUsUUFBckQ7QUFMSjtBQU9ELE9BL0JPO0FBZ0NSSyxlQWhDUSx1QkFnQ0k7QUFDVixhQUFLUCxTQUFMLENBQWUsZUFBZjtBQUNELE9BbENPO0FBbUNSUSxlQW5DUSx1QkFtQ0c7QUFDVEMsV0FBR0MsWUFBSCxDQUFnQjtBQUNkQyxnQkFBTSxDQUFDLHNCQUFEO0FBRFEsU0FBaEI7QUFHRDtBQXZDTyxLLFFBeUNWQyxNLEdBQVMsRTs7Ozs7NkJBaEdBO0FBQUE7O0FBQ1AsV0FBSzdCLGFBQUwsR0FBcUIsS0FBSzhCLE9BQUwsQ0FBYUMsVUFBYixDQUF3Qi9CLGFBQTdDO0FBQ0EsV0FBS2dDLGNBQUw7QUFDQTtBQUNBLHNCQUFLO0FBQ0hoQixhQUFLNUIsSUFBSTZDO0FBRE4sT0FBTCxFQUVHQyxJQUZILENBRVEsZUFBTztBQUNiLFlBQUlDLElBQUlDLElBQUosSUFBWSxHQUFoQixFQUFxQjtBQUNuQixpQkFBSzNCLE9BQUwsR0FBZTBCLElBQUlFLEtBQUosQ0FBVUMsSUFBVixJQUFrQixFQUFqQztBQUNBLGlCQUFLNUIsU0FBTCxHQUFpQnlCLElBQUlFLEtBQUosQ0FBVUUsTUFBVixJQUFvQixFQUFyQztBQUNBLGlCQUFLQyxNQUFMO0FBQ0Q7QUFDRixPQVJEOztBQVVBLFdBQUtDLHFCQUFMO0FBQ0Q7O0FBRUQ7Ozs7NENBQ3dCO0FBQUE7O0FBQ3RCLHNCQUFLO0FBQ0h6QixhQUFLNUIsSUFBSXNELGNBRE47QUFFSEMsY0FBTSxLQUZIO0FBR0gvQyxjQUFNO0FBQ0pnRCxnQkFBTSxFQURGO0FBRUpoQyxtQkFBUyxLQUFLQTtBQUZWO0FBSEgsT0FBTCxFQU9Hc0IsSUFQSCxDQU9RLGVBQU87QUFDYixZQUFJQyxJQUFJQyxJQUFKLElBQVksR0FBaEIsRUFBcUI7QUFDbkIsY0FBSVMsT0FBT1YsSUFBSUUsS0FBSixDQUFVN0IsVUFBVixJQUF3QixFQUFuQztBQUNBLGlCQUFLQSxVQUFMLEdBQWtCLE9BQUtBLFVBQUwsQ0FBZ0JzQyxNQUFoQixDQUF1QkQsSUFBdkIsQ0FBbEI7QUFDQSxpQkFBS2xDLE9BQUwsR0FBZXdCLElBQUl4QixPQUFuQjtBQUNBLGlCQUFLNkIsTUFBTDtBQUNEO0FBQ0YsT0FkRDtBQWVEOzs7NkJBRVE7QUFDUCxXQUFLTyxhQUFMLEdBQXFCO0FBQ25CLG1CQUFXO0FBQ1B6RCxnQkFETyxrQkFDQzBELENBREQsRUFDSTtBQUNUM0Isb0JBQVFDLEdBQVIsQ0FBWTBCLENBQVo7QUFDRSxtQkFBT0EsQ0FBUDtBQUNILFdBSk07QUFLUEMsaUJBTE8sbUJBS0VDLEdBTEYsRUFLTztBQUNaN0Isb0JBQVFDLEdBQVIsQ0FBWTRCLEdBQVo7QUFDQSxtQkFBT0EsR0FBUDtBQUNEO0FBUk07QUFEUSxPQUFyQjtBQWdCRDs7O3FDQTRDZ0I7QUFBQTs7QUFDZixVQUFJQyxNQUFNLEtBQUtyQixPQUFmO0FBQ0EsVUFBSXFCLElBQUlwQixVQUFKLENBQWVoQyxRQUFuQixFQUE2QjtBQUMzQnNCLGdCQUFRK0IsSUFBUixDQUFhLFlBQWI7QUFDQSxhQUFLckQsUUFBTCxHQUFnQm9ELElBQUlwQixVQUFKLENBQWVoQyxRQUEvQjtBQUNBLGFBQUtELFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxhQUFLMEMsTUFBTDtBQUNELE9BTEQsTUFLTyxJQUFJZCxHQUFHMkIsT0FBSCxDQUFXLDhCQUFYLENBQUosRUFBZ0Q7QUFDckRGLFlBQUlHLHFCQUFKLEdBQTRCLGVBQU87QUFDakNqQyxrQkFBUStCLElBQVIsQ0FBYSx1QkFBYjtBQUNBLGlCQUFLckQsUUFBTCxHQUFnQm9DLElBQUlwQyxRQUFwQjtBQUNBLGlCQUFLRCxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsaUJBQUswQyxNQUFMO0FBQ0QsU0FMRDtBQU1ELE9BUE0sTUFPQTtBQUNMZCxXQUFHNkIsV0FBSCxDQUFlO0FBQ2JOLG1CQUFTLHNCQUFPO0FBQ2Q1QixvQkFBUStCLElBQVIsQ0FBYSxhQUFiO0FBQ0FELGdCQUFJcEIsVUFBSixDQUFlaEMsUUFBZixHQUEwQm9DLElBQUlwQyxRQUE5QjtBQUNBLG1CQUFLQSxRQUFMLEdBQWdCb0QsSUFBSXBCLFVBQUosQ0FBZWhDLFFBQS9CO0FBQ0EsbUJBQUtELFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxtQkFBSzBDLE1BQUw7QUFDRDtBQVBZLFNBQWY7QUFTRDtBQUNGOzs7Z0NBQ1dnQixDLEVBQUc7QUFDYixVQUFJTCxNQUFNLEtBQUtyQixPQUFmO0FBQ0EsVUFBSTBCLEVBQUVDLE1BQUYsQ0FBU0MsTUFBVCxJQUFtQixnQkFBdkIsRUFBeUM7QUFDdkNQLFlBQUlwQixVQUFKLENBQWVoQyxRQUFmLEdBQTBCeUQsRUFBRUMsTUFBRixDQUFTMUQsUUFBbkM7QUFDQSxhQUFLQSxRQUFMLEdBQWdCb0QsSUFBSXBCLFVBQUosQ0FBZWhDLFFBQS9CO0FBQ0EsYUFBS0QsV0FBTCxHQUFtQixJQUFuQjtBQUNEO0FBQ0Y7Ozt3Q0FFbUIsQ0FBRTs7O29DQUNMO0FBQ2YsVUFBRyxLQUFLYSxPQUFSLEVBQWlCO0FBQ2YsYUFBS0MsT0FBTDtBQUNBLGFBQUs2QixxQkFBTDtBQUNEO0FBQ0Y7OztzQ0FDaUJlLEMsRUFBRyxDQUNwQjs7OztFQXhMZ0NHLGVBQUtmLEk7O2tCQUFuQnZELEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBuYXYgZnJvbSAnLi4vY29tcG9uZW50cy9uYXYnOyAvLyDlupXpg6jlr7zoiKpcclxudmFyIHRpbWVyID0gcmVxdWlyZSgnLi4vdXRpbHMvd3hUaW1lci5qcycpOyAvLyDlgJLorqHml7ZcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aaW6aG1JyxcclxuICAgIC8vIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZSxcclxuICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCdcclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7XHJcbiAgICBuYXY6IG5hdlxyXG4gIH07XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgY2hvb2VzSWQ6ICcnLFxyXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxyXG4gICAgdXNlckluZm86IHt9LFxyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBiZWdpblRpbWU6ICcxODowMCcsXHJcbiAgICBDaG9vZXNEYXRhOiBbXHJcbiAgICAgIHsgaWQ6ICc3JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxMS5wbmcnLCB0aXRsZTogJ+mZkOaXtuenkuadgCcgfSxcclxuICAgICAgeyBpZDogJzInLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTEyLnBuZycsIHRpdGxlOiAn54m55Y2W6aKE6LStJyB9LFxyXG4gICAgICB7IGlkOiAnNScsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTMucG5nJywgdGl0bGU6ICfnoI3ku7cnIH0sXHJcbiAgICAgIHsgaWQ6ICcxJywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNC5wbmcnLCB0aXRsZTogJ+WQiOS8meS6uicgfSxcclxuICAgICAgeyBpZDogJzMnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE1LnBuZycsIHRpdGxlOiAn56eS6LWa6ZKxJyB9LFxyXG4gICAgICB7IGlkOiAnNCcsIGltZzogJy9hc3NldHMvaW1nL2ltYWdlMTYucG5nJywgdGl0bGU6ICfpoobliLgnIH0sXHJcbiAgICAgIHsgaWQ6ICc2JywgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UxNy5wbmcnLCB0aXRsZTogJ+eJuee6puWVhuaItycgfSxcclxuICAgICAgeyBpZDogJzgnLCBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZTE4LnBuZycsIHRpdGxlOiAn5pu05aSa6aKR6YGTJyB9XHJcbiAgICBdLFxyXG4gICAgLy8g6L2u5pKtXHJcbiAgICBpbWdVcmxzOiBbXHJcbiAgICAgIHsgaWQ6ICcxJywgaW1nOiAnaW5kZXhsdW5iby5wbmcnIH0sXHJcbiAgICAgIHsgaWQ6ICcyJywgaW1nOiAnaW5kZXhsdW5iby5wbmcnIH0sXHJcbiAgICAgIHsgaWQ6ICczJywgaW1nOiAnaW5kZXhsdW5iby5wbmcnIH0sXHJcbiAgICAgIHsgaWQ6ICc0JywgaW1nOiAnaW5kZXhsdW5iby5wbmcnIH1cclxuICAgIF0sXHJcbiAgICB3eFRpbWVyTGlzdDoge30sIC8vIOWAkuiuoeaXtlxyXG4gICAgZ29vZHNfbGlzdDogW10sIC8vIOWVhuWTgeWIl+ihqFxyXG4gICAgYXJlYUFycjogW10sIC8vIGFyZWHljLrln59cclxuICAgIGJhbm5lckFycjogW10sIC8v6L2u5pKt5Zu+XHJcbiAgICBoYXNtb3JlOiBmYWxzZSwgLy8g5piv5ZCm5pyJ5LiL5LiA6aG1XHJcbiAgICBjdXJwYWdlOiAxLCAvL+W9k+WJjemhteaVsFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICAgIHRoaXMuZ2V0QXBwVXNlckluZm8oKTtcclxuICAgIC8vIOmmlumhtS3ova7mkq3lm77lkoxhcmVhQXJy6I+c5Y2VXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuaW5kZXhEZWZhdWx0SW5mbyxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHRoaXMuYXJlYUFyciA9IHJlcy5kYXRhcy5hcmVhIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuYmFubmVyQXJyID0gcmVzLmRhdGFzLmJhbm5lciB8fCBbXTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnJlcXVlc3RJbmRleEdvb2RzTGlzdCgpXHJcbiAgfVxyXG4gIFxyXG4gIC8vIOmmlumhteKAlOaZrumAmuWVhuWTgeWIl+ihqOaOpeWPo1xyXG4gIHJlcXVlc3RJbmRleEdvb2RzTGlzdCgpIHtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5pbmRleEdvb2RzTGlzdCxcclxuICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBwYWdlOiAxMCxcclxuICAgICAgICBjdXJwYWdlOiB0aGlzLmN1cnBhZ2VcclxuICAgICAgfSxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHZhciBsaXN0ID0gcmVzLmRhdGFzLmdvb2RzX2xpc3QgfHwgW11cclxuICAgICAgICB0aGlzLmdvb2RzX2xpc3QgPSB0aGlzLmdvb2RzX2xpc3QuY29uY2F0KGxpc3QpXHJcbiAgICAgICAgdGhpcy5oYXNtb3JlID0gcmVzLmhhc21vcmVcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uU2hvdygpIHtcclxuICAgIHRoaXMuJGludGVyY2VwdG9ycyA9IHtcclxuICAgICAgJ3JlcXVlc3QnOiB7XHJcbiAgICAgICAgICBjb25maWcgKHApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocClcclxuICAgICAgICAgICAgICByZXR1cm4gcDtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzdWNjZXNzIChyc3QpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocnN0KVxyXG4gICAgICAgICAgICByZXR1cm4gcnN0XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIFxyXG4gIH1cclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHRhcE5hbWUodXJsLCBpZCkge1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7dXJsOiB1cmx9KVxyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgaWYgKGlkID09IDEpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYGFwcGx5UGFydG5lcmAgfSk7IC8vIOeUs+ivt+WQiOS8meS6ulxyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDIpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYHByZT9pZD0ke2lkfWAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gMykge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgZGlzY291bnQ/aWQ9JHtpZH1gIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDQpIHtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYGFzc2VtYmxlP2lkPSR7aWR9YCB9KTsgLy8g5ou85ZuiXHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gNSkge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgYmFyZ2Fpbj9pZD0ke2lkfWAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPT0gNikge1xyXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiBgbWVyY2hhbnQ/aWQ9JHtpZH1gIH0pOyAvLyDnibnnuqbllYbmiLdcclxuICAgICAgfSBlbHNlIGlmIChpZCA9PSA3KSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBzZWNraWxsP2lkPSR7aWR9YCB9KTtcclxuICAgICAgfSBlbHNlIGlmIChpZCA9PSA4KSB7XHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6IGBtb3JlQ2hhbm5lbHM/aWQ9JHtpZH1gIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAganVtcERldGFpbHMoZ29vZHNfaWQsIGdvb2RzX3R5cGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZ29vZHNfaWQsIGdvb2RzX3R5cGUpXHJcbiAgICAgIHN3aXRjaCAoTnVtYmVyKGdvb2RzX3R5cGUpKSB7XHJcbiAgICAgICAgY2FzZSAwOiBcclxuICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKGAvcGFnZXMvc2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKGAvcGFnZXMvc2Vja2lsbFNob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBuYXZTZWFyY2goKSB7XHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKCcvcGFnZXMvc2VhcmNoJyk7XHJcbiAgICB9LFxyXG4gICAgbG9nb0hhbmxkKCl7XHJcbiAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgdXJsczogWycvYXNzZXRzL2ltZy9sb2dvLnBuZyddXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfTtcclxuICBldmVudHMgPSB7fTtcclxuICBnZXRBcHBVc2VySW5mbygpIHtcclxuICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICBpZiAoYXBwLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgY29uc29sZS53YXJuKCdnbG9iYWxEYXRhJyk7XHJcbiAgICAgIHRoaXMudXNlckluZm8gPSBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0gZWxzZSBpZiAod3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpKSB7XHJcbiAgICAgIGFwcC51c2VySW5mb1JlYWR5Q2FsbGJhY2sgPSByZXMgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUud2FybigndXNlckluZm9SZWFkeUNhbGxiYWNrJyk7XHJcbiAgICAgICAgdGhpcy51c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgICB0aGlzLmhhc1VzZXJJbmZvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUud2FybignZ2V0VXNlckluZm8nKTtcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICAgICAgdGhpcy51c2VySW5mbyA9IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0VXNlckluZm8oZSkge1xyXG4gICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgIGlmIChlLmRldGFpbC5lcnJNc2cgPT0gJ2dldFVzZXJJbmZvOm9rJykge1xyXG4gICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvO1xyXG4gICAgICB0aGlzLnVzZXJJbmZvID0gYXBwLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7fVxyXG4gIG9uUmVhY2hCb3R0b20gKCkge1xyXG4gICAgaWYodGhpcy5oYXNtb3JlKSB7XHJcbiAgICAgIHRoaXMuY3VycGFnZSArKyBcclxuICAgICAgdGhpcy5yZXF1ZXN0SW5kZXhHb29kc0xpc3QoKVxyXG4gICAgfVxyXG4gIH1cclxuICBvblB1bGxEb3duUmVmcmVzaChlKSB7XHJcbiAgfVxyXG59XHJcbiJdfQ==