'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
      navigationBarTitleText: '更多频道'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      navArr: ['品牌', '推荐商户'],
      navIdx: 0,
      requestImgUrl: '',
      recommendList: [],
      storeRecommendList: []
    }, _this.computed = {}, _this.events = {}, _this.methods = {
      changeNav: function changeNav(idx) {
        if (this.navIdx == idx) return;
        this.navIdx = idx;
        if (idx == 0) {
          this.requestRecommendList();
        } else {
          this.requestStoreRecommendList();
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;

      this.requestRecommendList();
    }
  }, {
    key: 'requestRecommendList',
    value: function requestRecommendList() {
      var _this2 = this;

      (0, _ajax.ajax)({
        url: api.recommendList
      }).then(function (res) {
        _this2.recommendList = res.datas.brand_list || [];
        _this2.$apply();
      });
    }
  }, {
    key: 'requestStoreRecommendList',
    value: function requestStoreRecommendList() {
      var _this3 = this;

      (0, _ajax.ajax)({
        url: api.storeRecommendList
      }).then(function (res) {
        _this3.storeRecommendList = res.datas || [];
        _this3.$apply();
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/moreChannels'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vcmVDaGFubmVscy5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJuYXZBcnIiLCJuYXZJZHgiLCJyZXF1ZXN0SW1nVXJsIiwicmVjb21tZW5kTGlzdCIsInN0b3JlUmVjb21tZW5kTGlzdCIsImNvbXB1dGVkIiwiZXZlbnRzIiwibWV0aG9kcyIsImNoYW5nZU5hdiIsImlkeCIsInJlcXVlc3RSZWNvbW1lbmRMaXN0IiwicmVxdWVzdFN0b3JlUmVjb21tZW5kTGlzdCIsIm9wdGlvbnMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVybCIsInRoZW4iLCJyZXMiLCJkYXRhcyIsImJyYW5kX2xpc3QiLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUdxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGNBQVEsQ0FBRSxJQUFGLEVBQVEsTUFBUixDQURIO0FBRUxDLGNBQVEsQ0FGSDtBQUdMQyxxQkFBZSxFQUhWO0FBSUxDLHFCQUFlLEVBSlY7QUFLTEMsMEJBQW9CO0FBTGYsSyxRQVFQQyxRLEdBQVcsRSxRQUVYQyxNLEdBQVMsRSxRQXdCVEMsTyxHQUFVO0FBQ1JDLGVBRFEscUJBQ0VDLEdBREYsRUFDTztBQUNiLFlBQUcsS0FBS1IsTUFBTCxJQUFlUSxHQUFsQixFQUF1QjtBQUN2QixhQUFLUixNQUFMLEdBQWNRLEdBQWQ7QUFDQSxZQUFHQSxPQUFPLENBQVYsRUFBYTtBQUNYLGVBQUtDLG9CQUFMO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZUFBS0MseUJBQUw7QUFDRDtBQUVGO0FBVk8sSzs7Ozs7MkJBdEJIQyxPLEVBQVM7QUFDZCxXQUFLVixhQUFMLEdBQXFCLEtBQUtXLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlosYUFBN0M7O0FBRUEsV0FBS1Esb0JBQUw7QUFDRDs7OzJDQUNxQjtBQUFBOztBQUNwQixzQkFBSztBQUNISyxhQUFLdkIsSUFBSVc7QUFETixPQUFMLEVBRUdhLElBRkgsQ0FFUSxlQUFPO0FBQ2IsZUFBS2IsYUFBTCxHQUFxQmMsSUFBSUMsS0FBSixDQUFVQyxVQUFWLElBQXdCLEVBQTdDO0FBQ0EsZUFBS0MsTUFBTDtBQUNELE9BTEQ7QUFNRDs7O2dEQUMwQjtBQUFBOztBQUN6QixzQkFBSztBQUNITCxhQUFLdkIsSUFBSVk7QUFETixPQUFMLEVBRUdZLElBRkgsQ0FFUSxlQUFPO0FBQ2IsZUFBS1osa0JBQUwsR0FBMEJhLElBQUlDLEtBQUosSUFBYSxFQUF2QztBQUNBLGVBQUtFLE1BQUw7QUFDRCxPQUxEO0FBTUQ7Ozs2QkFDUSxDQUFFOzs7O0VBekNzQkMsZUFBS0MsSTs7a0JBQW5CNUIsSyIsImZpbGUiOiJtb3JlQ2hhbm5lbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmm7TlpJrpopHpgZMnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgbmF2QXJyOiBbICflk4HniYwnLCAn5o6o6I2Q5ZWG5oi3J10sXHJcbiAgICBuYXZJZHg6IDAsXHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIHJlY29tbWVuZExpc3Q6IFtdLFxyXG4gICAgc3RvcmVSZWNvbW1lbmRMaXN0OiBbXVxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuXHJcbiAgICB0aGlzLnJlcXVlc3RSZWNvbW1lbmRMaXN0KClcclxuICB9XHJcbiAgcmVxdWVzdFJlY29tbWVuZExpc3QoKXtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5yZWNvbW1lbmRMaXN0LFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnJlY29tbWVuZExpc3QgPSByZXMuZGF0YXMuYnJhbmRfbGlzdCB8fCBbXVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxuICByZXF1ZXN0U3RvcmVSZWNvbW1lbmRMaXN0KCl7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuc3RvcmVSZWNvbW1lbmRMaXN0LFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlUmVjb21tZW5kTGlzdCA9IHJlcy5kYXRhcyB8fCBbXVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBvblNob3coKSB7fVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjaGFuZ2VOYXYoaWR4KSB7XHJcbiAgICAgIGlmKHRoaXMubmF2SWR4ID09IGlkeCkgcmV0dXJuXHJcbiAgICAgIHRoaXMubmF2SWR4ID0gaWR4O1xyXG4gICAgICBpZihpZHggPT0gMCkge1xyXG4gICAgICAgIHRoaXMucmVxdWVzdFJlY29tbWVuZExpc3QoKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucmVxdWVzdFN0b3JlUmVjb21tZW5kTGlzdCgpXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iXX0=