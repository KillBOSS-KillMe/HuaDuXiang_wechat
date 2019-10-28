'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mask = require('./../components/mask.js');

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      }, {
        id: '5',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        num: 5,
        totalNum: 20,
        img: 'indeximg.png',
        tag: '满三减一'
      }, {
        id: '6',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        num: 5,
        totalNum: 20,
        img: 'indeximg.png',
        tag: '满三减一'
      }]
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
    value: function onLoad() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/bargain'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhcmdhaW4uanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsImFkZHJlc3NtYXNrIiwic2hhcmVzbWFzayIsIm1peGlucyIsImRhdGEiLCJnb29kc051bSIsInByb3BBcnIiLCJhdHRyRmxhZyIsImFkZHJlc3NGbGFnIiwic2hhcmVGbGFnIiwicmVxdWVzdEltZ1VybCIsImJhcmdpbkRhdGEiLCJpZCIsInRpdGxlIiwicHJpY2UiLCJleHByaWNlIiwibnVtIiwidG90YWxOdW0iLCJpbWciLCJ0YWciLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJhZGRyZXNzQnRuU3VibWl0IiwiYXR0ckJ0blN1Ym1pdCIsInJlZHVOdW0iLCJhZGROdW0iLCJqdW1wVGltZURldGFpbHMiLCJzaG9waWQiLCJoaWRlTWFzayIsImV2ZW50cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHdCQUF1QixVQUExQyxFQUFiLEVBQW1FLGVBQWMsRUFBQyx3QkFBdUIsYUFBeEIsRUFBakYsRUFBd0gsY0FBYSxFQUFDLHdCQUF1QixXQUF4QixFQUFySSxFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyxpQkFBV0MsY0FERDtBQUVWQyxtQkFBYUQsY0FGSDtBQUdWRSxrQkFBWUY7QUFIRixLLFFBTVpHLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxnQkFBVSxDQURMO0FBRUxDLGVBQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FGSjtBQUdMQyxnQkFBVSxLQUhMLEVBR1k7QUFDakJDLG1CQUFhLEtBSlIsRUFJZTtBQUNwQkMsaUJBQVcsS0FMTixFQUthO0FBQ2xCQyxxQkFBZSxFQU5WO0FBT0xDLGtCQUFZLENBQ1Y7QUFDRUMsWUFBSSxHQUROO0FBRUVDLGVBQU8sT0FGVDtBQUdFQyxlQUFPLEdBSFQ7QUFJRUMsaUJBQVMsSUFKWDtBQUtFQyxhQUFLLENBTFA7QUFNRUMsa0JBQVUsRUFOWjtBQU9FQyxhQUFLLGNBUFA7QUFRRUMsYUFBSztBQVJQLE9BRFUsRUFXVjtBQUNFUCxZQUFJLEdBRE47QUFFRUMsZUFBTyxPQUZUO0FBR0VDLGVBQU8sR0FIVDtBQUlFQyxpQkFBUyxJQUpYO0FBS0VDLGFBQUssQ0FMUDtBQU1FQyxrQkFBVSxFQU5aO0FBT0VDLGFBQUssY0FQUDtBQVFFQyxhQUFLO0FBUlAsT0FYVSxFQXFCVjtBQUNFUCxZQUFJLEdBRE47QUFFRUMsZUFBTyxPQUZUO0FBR0VDLGVBQU8sR0FIVDtBQUlFQyxpQkFBUyxJQUpYO0FBS0VDLGFBQUssQ0FMUDtBQU1FQyxrQkFBVSxFQU5aO0FBT0VDLGFBQUssY0FQUDtBQVFFQyxhQUFLO0FBUlAsT0FyQlUsRUErQlY7QUFDRVAsWUFBSSxHQUROO0FBRUVDLGVBQU8sT0FGVDtBQUdFQyxlQUFPLEdBSFQ7QUFJRUMsaUJBQVMsSUFKWDtBQUtFQyxhQUFLLENBTFA7QUFNRUMsa0JBQVUsRUFOWjtBQU9FQyxhQUFLLGNBUFA7QUFRRUMsYUFBSztBQVJQLE9BL0JVLEVBeUNWO0FBQ0VQLFlBQUksR0FETjtBQUVFQyxlQUFPLE9BRlQ7QUFHRUMsZUFBTyxHQUhUO0FBSUVDLGlCQUFTLElBSlg7QUFLRUMsYUFBSyxDQUxQO0FBTUVDLGtCQUFVLEVBTlo7QUFPRUMsYUFBSyxjQVBQO0FBUUVDLGFBQUs7QUFSUCxPQXpDVSxFQW1EVjtBQUNFUCxZQUFJLEdBRE47QUFFRUMsZUFBTyxPQUZUO0FBR0VDLGVBQU8sR0FIVDtBQUlFQyxpQkFBUyxJQUpYO0FBS0VDLGFBQUssQ0FMUDtBQU1FQyxrQkFBVSxFQU5aO0FBT0VDLGFBQUssY0FQUDtBQVFFQyxhQUFLO0FBUlAsT0FuRFU7QUFQUCxLLFFBdUVQQyxRLEdBQVcsRSxRQUtYQyxPLEdBQVU7QUFDUkMsc0JBRFEsOEJBQ1c7QUFDakIsYUFBS2QsV0FBTCxHQUFtQixLQUFuQjtBQUNBLGFBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDRCxPQUpPO0FBS1JjLG1CQUxRLDJCQUtRO0FBQ2QsYUFBS2hCLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0QsT0FSTztBQVNSZ0IsYUFUUSxxQkFTRTtBQUNSLFlBQUksS0FBS25CLFFBQUwsSUFBaUIsQ0FBckIsRUFBd0I7QUFDeEIsYUFBS0EsUUFBTDtBQUNELE9BWk87QUFhUm9CLFlBYlEsb0JBYUM7QUFDUCxhQUFLcEIsUUFBTDtBQUNELE9BZk87O0FBZ0JSOzs7QUFHQXFCLHFCQW5CUSwyQkFtQlFDLE1BbkJSLEVBbUJnQjtBQUN0QixhQUFLcEIsUUFBTCxHQUFnQixJQUFoQjtBQUNBO0FBQ0E7QUFDRCxPQXZCTztBQXdCUnFCLGNBeEJRLHNCQXdCRyxDQUFFO0FBeEJMLEssUUEyQlZDLE0sR0FBUyxFOzs7Ozs2QkEvQkE7QUFDUDtBQUNBLFdBQUtuQixhQUFMLEdBQXFCLEtBQUtvQixPQUFMLENBQWFDLFVBQWIsQ0FBd0JyQixhQUE3QztBQUNEOzs7NkJBOEJRLENBQUU7Ozs7RUF4SHNCc0IsZUFBS0MsSTs7a0JBQW5CekMsSyIsImZpbGUiOiJiYXJnYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgbWFzayBmcm9tICcuLi9jb21wb25lbnRzL21hc2snO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+egjeS7tydcclxuICB9O1xyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJhdHRyc21hc2tcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm1hc2tGbGFnLnN5bmNcIjpcImF0dHJGbGFnXCJ9LFwiYWRkcmVzc21hc2tcIjp7XCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiYWRkcmVzc0ZsYWdcIn0sXCJzaGFyZXNtYXNrXCI6e1widi1iaW5kOm1hc2tGbGFnLnN5bmNcIjpcInNoYXJlRmxhZ1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBhdHRyc21hc2s6IG1hc2ssXHJcbiAgICBhZGRyZXNzbWFzazogbWFzayxcclxuICAgIHNoYXJlc21hc2s6IG1hc2tcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGdvb2RzTnVtOiAxLFxyXG4gICAgcHJvcEFycjogWzEsIDIsIDNdLFxyXG4gICAgYXR0ckZsYWc6IGZhbHNlLCAvL+WxnuaAp+W8ueahhlxyXG4gICAgYWRkcmVzc0ZsYWc6IGZhbHNlLCAvL+WcsOWdgOW8ueahhlxyXG4gICAgc2hhcmVGbGFnOiBmYWxzZSwgLy/liIbkuqvlvLnmoYZcclxuICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgYmFyZ2luRGF0YTogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICcxJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIG51bTogNSxcclxuICAgICAgICB0b3RhbE51bTogMjAsXHJcbiAgICAgICAgaW1nOiAnaW5kZXhpbWcucG5nJyxcclxuICAgICAgICB0YWc6ICfmu6HkuInlh4/kuIAnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzInLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgbnVtOiA1LFxyXG4gICAgICAgIHRvdGFsTnVtOiAyMCxcclxuICAgICAgICBpbWc6ICdpbmRleGltZy5wbmcnLFxyXG4gICAgICAgIHRhZzogJ+a7oeS4ieWHj+S4gCdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnMycsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBudW06IDUsXHJcbiAgICAgICAgdG90YWxOdW06IDIwLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZycsXHJcbiAgICAgICAgdGFnOiAn5ruh5LiJ5YeP5LiAJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICc0JyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIG51bTogNSxcclxuICAgICAgICB0b3RhbE51bTogMjAsXHJcbiAgICAgICAgaW1nOiAnaW5kZXhpbWcucG5nJyxcclxuICAgICAgICB0YWc6ICfmu6HkuInlh4/kuIAnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzUnLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgbnVtOiA1LFxyXG4gICAgICAgIHRvdGFsTnVtOiAyMCxcclxuICAgICAgICBpbWc6ICdpbmRleGltZy5wbmcnLFxyXG4gICAgICAgIHRhZzogJ+a7oeS4ieWHj+S4gCdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnNicsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBudW06IDUsXHJcbiAgICAgICAgdG90YWxOdW06IDIwLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZycsXHJcbiAgICAgICAgdGFnOiAn5ruh5LiJ5YeP5LiAJ1xyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBvblNob3coKSB7XHJcbiAgICAvLyB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBhZGRyZXNzQnRuU3VibWl0KCkge1xyXG4gICAgICB0aGlzLmFkZHJlc3NGbGFnID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2hhcmVGbGFnID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBhdHRyQnRuU3VibWl0KCkge1xyXG4gICAgICB0aGlzLmF0dHJGbGFnID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYWRkcmVzc0ZsYWcgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIHJlZHVOdW0oKSB7XHJcbiAgICAgIGlmICh0aGlzLmdvb2RzTnVtID09IDEpIHJldHVybjtcclxuICAgICAgdGhpcy5nb29kc051bS0tO1xyXG4gICAgfSxcclxuICAgIGFkZE51bSgpIHtcclxuICAgICAgdGhpcy5nb29kc051bSsrO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog6Lez6L2s5ZWG5ZOB6K+m5oOFXHJcbiAgICAgKi9cclxuICAgIGp1bXBUaW1lRGV0YWlscyhzaG9waWQpIHtcclxuICAgICAgdGhpcy5hdHRyRmxhZyA9IHRydWU7XHJcbiAgICAgIC8vICAgY29uc29sZS5sb2coc2hvcGlkKVxyXG4gICAgICAvLyB0aGlzLiRuYXZpZ2F0ZShgL3BhZ2VzL3Nob3BEZXRhaWxzP3Nob3BpZD0ke3Nob3BpZH1gKTtcclxuICAgIH0sXHJcbiAgICBoaWRlTWFzaygpIHt9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG9uTG9hZCgpIHt9XHJcbn1cclxuIl19