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
      barginData: [{
        id: '1',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        num: 5,
        totalNum: 20,
        img: 'indeximg.png',
        tag: '满三减一'
      }, {
        id: '2',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        num: 5,
        totalNum: 20,
        img: 'indeximg.png',
        tag: '满三减一'
      }, {
        id: '3',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        num: 5,
        totalNum: 20,
        img: 'indeximg.png',
        tag: '满三减一'
      }, {
        id: '4',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        num: 5,
        totalNum: 20,
        img: 'indeximg.png',
        tag: '满三减一'
      }],
      topImg: ''
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
      jumpTimeDetails: function jumpTimeDetails(shopid) {
        this.attrFlag = true;
        //   console.log(shopid)
        // this.$navigate(`/pages/shopDetails?shopid=${shopid}`);
      },
      hideMask: function hideMask() {}
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {
      // this.userInfo = this.$parent.globalData.userInfo
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this2 = this;

      this.requestImgUrl = this.$parent.globalData.requestImgUrl;

      (0, _ajax.ajax)({
        url: api.memberKj
      }).then(function (res) {
        _this2.topImg = res.datas.img_area;
        _this2.$apply();
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/bargain'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhcmdhaW4uanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImF0dHJzbWFzayIsIm1hc2siLCJhZGRyZXNzbWFzayIsInNoYXJlc21hc2siLCJtaXhpbnMiLCJkYXRhIiwiZ29vZHNOdW0iLCJwcm9wQXJyIiwiYXR0ckZsYWciLCJhZGRyZXNzRmxhZyIsInNoYXJlRmxhZyIsInJlcXVlc3RJbWdVcmwiLCJiYXJnaW5EYXRhIiwiaWQiLCJ0aXRsZSIsInByaWNlIiwiZXhwcmljZSIsIm51bSIsInRvdGFsTnVtIiwiaW1nIiwidGFnIiwidG9wSW1nIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYWRkcmVzc0J0blN1Ym1pdCIsImF0dHJCdG5TdWJtaXQiLCJyZWR1TnVtIiwiYWRkTnVtIiwianVtcFRpbWVEZXRhaWxzIiwic2hvcGlkIiwiaGlkZU1hc2siLCJldmVudHMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVybCIsIm1lbWJlcktqIiwidGhlbiIsInJlcyIsImRhdGFzIiwiaW1nX2FyZWEiLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBR3FCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQWIsRUFBbUUsZUFBYyxFQUFDLHdCQUF1QixhQUF4QixFQUFqRixFQUF3SCxjQUFhLEVBQUMsd0JBQXVCLFdBQXhCLEVBQXJJLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLGlCQUFXQyxjQUREO0FBRVZDLG1CQUFhRCxjQUZIO0FBR1ZFLGtCQUFZRjtBQUhGLEssUUFNWkcsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLENBREw7QUFFTEMsZUFBUyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUZKO0FBR0xDLGdCQUFVLEtBSEwsRUFHWTtBQUNqQkMsbUJBQWEsS0FKUixFQUllO0FBQ3BCQyxpQkFBVyxLQUxOLEVBS2E7QUFDbEJDLHFCQUFlLEVBTlY7QUFPTEMsa0JBQVksQ0FDVjtBQUNFQyxZQUFJLEdBRE47QUFFRUMsZUFBTyxPQUZUO0FBR0VDLGVBQU8sR0FIVDtBQUlFQyxpQkFBUyxJQUpYO0FBS0VDLGFBQUssQ0FMUDtBQU1FQyxrQkFBVSxFQU5aO0FBT0VDLGFBQUssY0FQUDtBQVFFQyxhQUFLO0FBUlAsT0FEVSxFQVdWO0FBQ0VQLFlBQUksR0FETjtBQUVFQyxlQUFPLE9BRlQ7QUFHRUMsZUFBTyxHQUhUO0FBSUVDLGlCQUFTLElBSlg7QUFLRUMsYUFBSyxDQUxQO0FBTUVDLGtCQUFVLEVBTlo7QUFPRUMsYUFBSyxjQVBQO0FBUUVDLGFBQUs7QUFSUCxPQVhVLEVBcUJWO0FBQ0VQLFlBQUksR0FETjtBQUVFQyxlQUFPLE9BRlQ7QUFHRUMsZUFBTyxHQUhUO0FBSUVDLGlCQUFTLElBSlg7QUFLRUMsYUFBSyxDQUxQO0FBTUVDLGtCQUFVLEVBTlo7QUFPRUMsYUFBSyxjQVBQO0FBUUVDLGFBQUs7QUFSUCxPQXJCVSxFQStCVjtBQUNFUCxZQUFJLEdBRE47QUFFRUMsZUFBTyxPQUZUO0FBR0VDLGVBQU8sR0FIVDtBQUlFQyxpQkFBUyxJQUpYO0FBS0VDLGFBQUssQ0FMUDtBQU1FQyxrQkFBVSxFQU5aO0FBT0VDLGFBQUssY0FQUDtBQVFFQyxhQUFLO0FBUlAsT0EvQlUsQ0FQUDtBQWlETEMsY0FBUTtBQWpESCxLLFFBb0RQQyxRLEdBQVcsRSxRQUtYQyxPLEdBQVU7QUFDUkMsc0JBRFEsOEJBQ1c7QUFDakIsYUFBS2YsV0FBTCxHQUFtQixLQUFuQjtBQUNBLGFBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDRCxPQUpPO0FBS1JlLG1CQUxRLDJCQUtRO0FBQ2QsYUFBS2pCLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0QsT0FSTztBQVNSaUIsYUFUUSxxQkFTRTtBQUNSLFlBQUksS0FBS3BCLFFBQUwsSUFBaUIsQ0FBckIsRUFBd0I7QUFDeEIsYUFBS0EsUUFBTDtBQUNELE9BWk87QUFhUnFCLFlBYlEsb0JBYUM7QUFDUCxhQUFLckIsUUFBTDtBQUNELE9BZk87O0FBZ0JSOzs7QUFHQXNCLHFCQW5CUSwyQkFtQlFDLE1BbkJSLEVBbUJnQjtBQUN0QixhQUFLckIsUUFBTCxHQUFnQixJQUFoQjtBQUNBO0FBQ0E7QUFDRCxPQXZCTztBQXdCUnNCLGNBeEJRLHNCQXdCRyxDQUFFO0FBeEJMLEssUUEyQlZDLE0sR0FBUyxFOzs7Ozs2QkEvQkE7QUFDUDtBQUNBLFdBQUtwQixhQUFMLEdBQXFCLEtBQUtxQixPQUFMLENBQWFDLFVBQWIsQ0FBd0J0QixhQUE3QztBQUNEOzs7NkJBOEJRO0FBQUE7O0FBQ1AsV0FBS0EsYUFBTCxHQUFxQixLQUFLcUIsT0FBTCxDQUFhQyxVQUFiLENBQXdCdEIsYUFBN0M7O0FBRUEsc0JBQUs7QUFDSHVCLGFBQUszQyxJQUFJNEM7QUFETixPQUFMLEVBRUdDLElBRkgsQ0FFUSxlQUFPO0FBQ2IsZUFBS2YsTUFBTCxHQUFjZ0IsSUFBSUMsS0FBSixDQUFVQyxRQUF4QjtBQUNBLGVBQUtDLE1BQUw7QUFDRCxPQUxEO0FBTUQ7Ozs7RUE5R2dDQyxlQUFLQyxJOztrQkFBbkJqRCxLIiwiZmlsZSI6ImJhcmdhaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBtYXNrIGZyb20gJy4uL2NvbXBvbmVudHMvbWFzayc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnoI3ku7cnXHJcbiAgfTtcclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYXR0cnNtYXNrXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDptYXNrRmxhZy5zeW5jXCI6XCJhdHRyRmxhZ1wifSxcImFkZHJlc3NtYXNrXCI6e1widi1iaW5kOm1hc2tGbGFnLnN5bmNcIjpcImFkZHJlc3NGbGFnXCJ9LFwic2hhcmVzbWFza1wiOntcInYtYmluZDptYXNrRmxhZy5zeW5jXCI6XCJzaGFyZUZsYWdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgYXR0cnNtYXNrOiBtYXNrLFxyXG4gICAgYWRkcmVzc21hc2s6IG1hc2ssXHJcbiAgICBzaGFyZXNtYXNrOiBtYXNrXHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBnb29kc051bTogMSxcclxuICAgIHByb3BBcnI6IFsxLCAyLCAzXSxcclxuICAgIGF0dHJGbGFnOiBmYWxzZSwgLy/lsZ7mgKflvLnmoYZcclxuICAgIGFkZHJlc3NGbGFnOiBmYWxzZSwgLy/lnLDlnYDlvLnmoYZcclxuICAgIHNoYXJlRmxhZzogZmFsc2UsIC8v5YiG5Lqr5by55qGGXHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGJhcmdpbkRhdGE6IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnMScsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBudW06IDUsXHJcbiAgICAgICAgdG90YWxOdW06IDIwLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZycsXHJcbiAgICAgICAgdGFnOiAn5ruh5LiJ5YeP5LiAJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICcyJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIG51bTogNSxcclxuICAgICAgICB0b3RhbE51bTogMjAsXHJcbiAgICAgICAgaW1nOiAnaW5kZXhpbWcucG5nJyxcclxuICAgICAgICB0YWc6ICfmu6HkuInlh4/kuIAnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzMnLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgbnVtOiA1LFxyXG4gICAgICAgIHRvdGFsTnVtOiAyMCxcclxuICAgICAgICBpbWc6ICdpbmRleGltZy5wbmcnLFxyXG4gICAgICAgIHRhZzogJ+a7oeS4ieWHj+S4gCdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnNCcsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBudW06IDUsXHJcbiAgICAgICAgdG90YWxOdW06IDIwLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZycsXHJcbiAgICAgICAgdGFnOiAn5ruh5LiJ5YeP5LiAJ1xyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgdG9wSW1nOiAnJyxcclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG9uU2hvdygpIHtcclxuICAgIC8vIHRoaXMudXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mb1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGFkZHJlc3NCdG5TdWJtaXQoKSB7XHJcbiAgICAgIHRoaXMuYWRkcmVzc0ZsYWcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zaGFyZUZsYWcgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGF0dHJCdG5TdWJtaXQoKSB7XHJcbiAgICAgIHRoaXMuYXR0ckZsYWcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5hZGRyZXNzRmxhZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgcmVkdU51bSgpIHtcclxuICAgICAgaWYgKHRoaXMuZ29vZHNOdW0gPT0gMSkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmdvb2RzTnVtLS07XHJcbiAgICB9LFxyXG4gICAgYWRkTnVtKCkge1xyXG4gICAgICB0aGlzLmdvb2RzTnVtKys7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDot7PovazllYblk4Hor6bmg4VcclxuICAgICAqL1xyXG4gICAganVtcFRpbWVEZXRhaWxzKHNob3BpZCkge1xyXG4gICAgICB0aGlzLmF0dHJGbGFnID0gdHJ1ZTtcclxuICAgICAgLy8gICBjb25zb2xlLmxvZyhzaG9waWQpXHJcbiAgICAgIC8vIHRoaXMuJG5hdmlnYXRlKGAvcGFnZXMvc2hvcERldGFpbHM/c2hvcGlkPSR7c2hvcGlkfWApO1xyXG4gICAgfSxcclxuICAgIGhpZGVNYXNrKCkge31cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkubWVtYmVyS2osXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMudG9wSW1nID0gcmVzLmRhdGFzLmltZ19hcmVhXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==