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

var timer = require('./../utils/wxTimer.js'); // 倒计时

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
    }, _this.$repeat = {}, _this.$props = { "attrsmask": { "xmlns:v-bind": "", "v-bind:maskFlag.sync": "attrFlag" }, "asslistmask": { "v-bind:maskFlag.sync": "asslistFlag" }, "participatemask": { "v-bind:maskFlag.sync": "participateFlag" } }, _this.$events = {}, _this.components = {
      attrsmask: _mask2.default,
      asslistmask: _mask2.default,
      participatemask: _mask2.default
    }, _this.mixins = [], _this.data = {
      goodsNum: 1, // 商品数量
      tabList: [{ name: '商品介绍', dotNum: 2 }, { name: '图文详情', dotNum: 3 }], // 顶部选项卡
      currentTab: 0, // 顶部选项卡索引
      flowData: [{
        id: '1',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '/assets/img/image.png'
      }, {
        id: '2',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '/assets/img/image.png'
      }, {
        id: '3',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '/assets/img/image.png'
      }, {
        id: '3',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '/assets/img/image.png'
      }], // 店铺
      waitForArr: [{ time: 100 }, { time: 200 }, { time: 300 }, { time: 400 }], // 等待拼团列表
      wxTimerList: {}, // 倒计时
      attrFlag: false, // 选择属性列表锁
      asslistFlag: false, // 全部拼团列表锁
      participateFlag: false, // 参与拼团列表锁
      currentAssembleIdx: null, //当前选择参团的索引
      currentAssembleData: null // 当前选择参团的数据
    }, _this.computed = {}, _this.watch = {
      currentAssembleIdx: function currentAssembleIdx(newValue, oldValue) {
        this.currentAssembleData = this.waitForArr.filter(function (item, index) {
          return index == newValue;
        })[0];
      }
    }, _this.methods = {
      // 切换顶部导航
      switchNav: function switchNav(idx) {
        this.currentTab = idx;
      },

      // 显示选择商品框
      showAttrMask: function showAttrMask() {
        this.attrFlag = true;
      },

      // 关闭拼团列表框
      hideAsslistMask: function hideAsslistMask() {
        this.asslistFlag = false;
      },

      // 显示拼团列表框
      showAsslistMask: function showAsslistMask() {
        this.asslistFlag = true;
      },
      attrBtnSubmit: function attrBtnSubmit() {
        this.$navigate({ url: '/pages/settlement' });
      },

      // 选择去拼单
      showParticipateMask: function showParticipateMask(idx) {
        this.currentAssembleIdx = idx;
        this.participateFlag = true;
        this.asslistFlag = false;
      },

      // 关闭参与拼团列表弹框
      hideParticipateMask: function hideParticipateMask(idx) {
        this.participateFlag = false;
      },

      // 提交拼团
      navAssembleShopDetails: function navAssembleShopDetails() {
        this.participateFlag = false;
        this.$navigate({ url: '/pages/settlement' });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad() {
      // 倒计时s
      var that = this;
      var waitForArr = this.waitForArr;
      waitForArr.forEach(function (item, idx) {
        new timer({
          beginTime: item.time,
          name: 'timer' + idx
        }).start(that);
      });
      // 倒计时e
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/assembleShopDetails'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2VtYmxlU2hvcERldGFpbHMuanMiXSwibmFtZXMiOlsidGltZXIiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsImFzc2xpc3RtYXNrIiwicGFydGljaXBhdGVtYXNrIiwibWl4aW5zIiwiZGF0YSIsImdvb2RzTnVtIiwidGFiTGlzdCIsIm5hbWUiLCJkb3ROdW0iLCJjdXJyZW50VGFiIiwiZmxvd0RhdGEiLCJpZCIsInRpdGxlIiwicHJpY2UiLCJleHByaWNlIiwiaW1nIiwid2FpdEZvckFyciIsInRpbWUiLCJ3eFRpbWVyTGlzdCIsImF0dHJGbGFnIiwiYXNzbGlzdEZsYWciLCJwYXJ0aWNpcGF0ZUZsYWciLCJjdXJyZW50QXNzZW1ibGVJZHgiLCJjdXJyZW50QXNzZW1ibGVEYXRhIiwiY29tcHV0ZWQiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJmaWx0ZXIiLCJpdGVtIiwiaW5kZXgiLCJtZXRob2RzIiwic3dpdGNoTmF2IiwiaWR4Iiwic2hvd0F0dHJNYXNrIiwiaGlkZUFzc2xpc3RNYXNrIiwic2hvd0Fzc2xpc3RNYXNrIiwiYXR0ckJ0blN1Ym1pdCIsIiRuYXZpZ2F0ZSIsInVybCIsInNob3dQYXJ0aWNpcGF0ZU1hc2siLCJoaWRlUGFydGljaXBhdGVNYXNrIiwibmF2QXNzZW1ibGVTaG9wRGV0YWlscyIsImV2ZW50cyIsInRoYXQiLCJmb3JFYWNoIiwiYmVnaW5UaW1lIiwic3RhcnQiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsUUFBUUMsUUFBUSxxQkFBUixDQUFaLEMsQ0FBNEM7O0lBRXZCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxR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QW1CLEtBQW5CO0FBQ0QsT0F6Qk87O0FBMEJSO0FBQ0FxQix5QkEzQlEsK0JBMkJZUixHQTNCWixFQTJCaUI7QUFDdkIsYUFBS1osZUFBTCxHQUF1QixLQUF2QjtBQUNELE9BN0JPOztBQThCUjtBQUNBcUIsNEJBL0JRLG9DQStCaUI7QUFDdkIsYUFBS3JCLGVBQUwsR0FBdUIsS0FBdkI7QUFDQSxhQUFLaUIsU0FBTCxDQUFlLEVBQUVDLEtBQUssbUJBQVAsRUFBZjtBQUNEO0FBbENPLEssUUFxQ1ZJLE0sR0FBUyxFOzs7Ozs2QkF0Q0EsQ0FBRTs7OzZCQXdDRjtBQUNQO0FBQ0EsVUFBSUMsT0FBTyxJQUFYO0FBQ0EsVUFBSTVCLGFBQWEsS0FBS0EsVUFBdEI7QUFDQUEsaUJBQVc2QixPQUFYLENBQW1CLFVBQUNoQixJQUFELEVBQU9JLEdBQVAsRUFBZTtBQUNoQyxZQUFJM0MsS0FBSixDQUFVO0FBQ1J3RCxxQkFBV2pCLEtBQUtaLElBRFI7QUFFUlYsMEJBQWMwQjtBQUZOLFNBQVYsRUFHR2MsS0FISCxDQUdTSCxJQUhUO0FBSUQsT0FMRDtBQU1BO0FBQ0Q7Ozs7RUFwSGdDSSxlQUFLQyxJOztrQkFBbkJ6RCxLIiwiZmlsZSI6ImFzc2VtYmxlU2hvcERldGFpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBtYXNrIGZyb20gJy4uL2NvbXBvbmVudHMvbWFzayc7XHJcbnZhciB0aW1lciA9IHJlcXVpcmUoJy4uL3V0aWxzL3d4VGltZXIuanMnKTsgLy8g5YCS6K6h5pe2XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeivpuaDhSdcclxuICB9O1xyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJhdHRyc21hc2tcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm1hc2tGbGFnLnN5bmNcIjpcImF0dHJGbGFnXCJ9LFwiYXNzbGlzdG1hc2tcIjp7XCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiYXNzbGlzdEZsYWdcIn0sXCJwYXJ0aWNpcGF0ZW1hc2tcIjp7XCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwicGFydGljaXBhdGVGbGFnXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIGF0dHJzbWFzazogbWFzayxcclxuICAgIGFzc2xpc3RtYXNrOiBtYXNrLFxyXG4gICAgcGFydGljaXBhdGVtYXNrOiBtYXNrXHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBnb29kc051bTogMSwgLy8g5ZWG5ZOB5pWw6YePXHJcbiAgICB0YWJMaXN0OiBbeyBuYW1lOiAn5ZWG5ZOB5LuL57uNJywgZG90TnVtOiAyIH0sIHsgbmFtZTogJ+WbvuaWh+ivpuaDhScsIGRvdE51bTogMyB9XSwgLy8g6aG26YOo6YCJ6aG55Y2hXHJcbiAgICBjdXJyZW50VGFiOiAwLCAvLyDpobbpg6jpgInpobnljaHntKLlvJVcclxuICAgIGZsb3dEYXRhOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzEnLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UucG5nJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICcyJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJy9hc3NldHMvaW1nL2ltYWdlLnBuZydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnMycsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZS5wbmcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzMnLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UucG5nJ1xyXG4gICAgICB9XHJcbiAgICBdLCAvLyDlupfpk7pcclxuICAgIHdhaXRGb3JBcnI6IFt7IHRpbWU6IDEwMCB9LCB7IHRpbWU6IDIwMCB9LCB7IHRpbWU6IDMwMCB9LCB7IHRpbWU6IDQwMCB9XSwgLy8g562J5b6F5ou85Zui5YiX6KGoXHJcbiAgICB3eFRpbWVyTGlzdDoge30sIC8vIOWAkuiuoeaXtlxyXG4gICAgYXR0ckZsYWc6IGZhbHNlLCAvLyDpgInmi6nlsZ7mgKfliJfooajplIFcclxuICAgIGFzc2xpc3RGbGFnOiBmYWxzZSwgLy8g5YWo6YOo5ou85Zui5YiX6KGo6ZSBXHJcbiAgICBwYXJ0aWNpcGF0ZUZsYWc6IGZhbHNlLCAvLyDlj4LkuI7mi7zlm6LliJfooajplIFcclxuICAgIGN1cnJlbnRBc3NlbWJsZUlkeDogbnVsbCwgLy/lvZPliY3pgInmi6nlj4Llm6LnmoTntKLlvJVcclxuICAgIGN1cnJlbnRBc3NlbWJsZURhdGE6IG51bGwgLy8g5b2T5YmN6YCJ5oup5Y+C5Zui55qE5pWw5o2uXHJcbiAgfTtcclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIHdhdGNoID0ge1xyXG4gICAgY3VycmVudEFzc2VtYmxlSWR4KG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRBc3NlbWJsZURhdGEgPSB0aGlzLndhaXRGb3JBcnIuZmlsdGVyKFxyXG4gICAgICAgIChpdGVtLCBpbmRleCkgPT4gaW5kZXggPT0gbmV3VmFsdWVcclxuICAgICAgKVswXTtcclxuICAgIH1cclxuICB9O1xyXG4gIG9uU2hvdygpIHt9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOWIh+aNoumhtumDqOWvvOiIqlxyXG4gICAgc3dpdGNoTmF2KGlkeCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRUYWIgPSBpZHg7XHJcbiAgICB9LFxyXG4gICAgLy8g5pi+56S66YCJ5oup5ZWG5ZOB5qGGXHJcbiAgICBzaG93QXR0ck1hc2soKSB7XHJcbiAgICAgIHRoaXMuYXR0ckZsYWcgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIC8vIOWFs+mXreaLvOWbouWIl+ihqOahhlxyXG4gICAgaGlkZUFzc2xpc3RNYXNrKCkge1xyXG4gICAgICB0aGlzLmFzc2xpc3RGbGFnID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgLy8g5pi+56S65ou85Zui5YiX6KGo5qGGXHJcbiAgICBzaG93QXNzbGlzdE1hc2soKSB7XHJcbiAgICAgIHRoaXMuYXNzbGlzdEZsYWcgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGF0dHJCdG5TdWJtaXQoKSB7XHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiAnL3BhZ2VzL3NldHRsZW1lbnQnIH0pO1xyXG4gICAgfSxcclxuICAgIC8vIOmAieaLqeWOu+aLvOWNlVxyXG4gICAgc2hvd1BhcnRpY2lwYXRlTWFzayhpZHgpIHtcclxuICAgICAgdGhpcy5jdXJyZW50QXNzZW1ibGVJZHggPSBpZHg7XHJcbiAgICAgIHRoaXMucGFydGljaXBhdGVGbGFnID0gdHJ1ZTtcclxuICAgICAgdGhpcy5hc3NsaXN0RmxhZyA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIC8vIOWFs+mXreWPguS4juaLvOWbouWIl+ihqOW8ueahhlxyXG4gICAgaGlkZVBhcnRpY2lwYXRlTWFzayhpZHgpIHtcclxuICAgICAgdGhpcy5wYXJ0aWNpcGF0ZUZsYWcgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICAvLyDmj5DkuqTmi7zlm6JcclxuICAgIG5hdkFzc2VtYmxlU2hvcERldGFpbHMoKSB7XHJcbiAgICAgIHRoaXMucGFydGljaXBhdGVGbGFnID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiAnL3BhZ2VzL3NldHRsZW1lbnQnIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICAvLyDlgJLorqHml7ZzXHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICB2YXIgd2FpdEZvckFyciA9IHRoaXMud2FpdEZvckFycjtcclxuICAgIHdhaXRGb3JBcnIuZm9yRWFjaCgoaXRlbSwgaWR4KSA9PiB7XHJcbiAgICAgIG5ldyB0aW1lcih7XHJcbiAgICAgICAgYmVnaW5UaW1lOiBpdGVtLnRpbWUsXHJcbiAgICAgICAgbmFtZTogYHRpbWVyJHtpZHh9YFxyXG4gICAgICB9KS5zdGFydCh0aGF0KTtcclxuICAgIH0pO1xyXG4gICAgLy8g5YCS6K6h5pe2ZVxyXG4gIH1cclxufVxyXG4iXX0=