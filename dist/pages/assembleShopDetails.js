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
      flowData: [], // 店铺
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2VtYmxlU2hvcERldGFpbHMuanMiXSwibmFtZXMiOlsidGltZXIiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsImFzc2xpc3RtYXNrIiwicGFydGljaXBhdGVtYXNrIiwibWl4aW5zIiwiZGF0YSIsImdvb2RzTnVtIiwidGFiTGlzdCIsIm5hbWUiLCJkb3ROdW0iLCJjdXJyZW50VGFiIiwiZmxvd0RhdGEiLCJ3YWl0Rm9yQXJyIiwidGltZSIsInd4VGltZXJMaXN0IiwiYXR0ckZsYWciLCJhc3NsaXN0RmxhZyIsInBhcnRpY2lwYXRlRmxhZyIsImN1cnJlbnRBc3NlbWJsZUlkeCIsImN1cnJlbnRBc3NlbWJsZURhdGEiLCJjb21wdXRlZCIsIndhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImZpbHRlciIsIml0ZW0iLCJpbmRleCIsIm1ldGhvZHMiLCJzd2l0Y2hOYXYiLCJpZHgiLCJzaG93QXR0ck1hc2siLCJoaWRlQXNzbGlzdE1hc2siLCJzaG93QXNzbGlzdE1hc2siLCJhdHRyQnRuU3VibWl0IiwiJG5hdmlnYXRlIiwidXJsIiwic2hvd1BhcnRpY2lwYXRlTWFzayIsImhpZGVQYXJ0aWNpcGF0ZU1hc2siLCJuYXZBc3NlbWJsZVNob3BEZXRhaWxzIiwiZXZlbnRzIiwidGhhdCIsImZvckVhY2giLCJiZWdpblRpbWUiLCJzdGFydCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxRQUFRQyxRQUFRLHFCQUFSLENBQVosQyxDQUE0Qzs7SUFFdkJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLGFBQVks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UkwsMEJBQWNxQjtBQUZOLFNBQVYsRUFHR2MsS0FISCxDQUdTSCxJQUhUO0FBSUQsT0FMRDtBQU1BO0FBQ0Q7Ozs7RUF2RmdDSSxlQUFLQyxJOztrQkFBbkJwRCxLIiwiZmlsZSI6ImFzc2VtYmxlU2hvcERldGFpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBtYXNrIGZyb20gJy4uL2NvbXBvbmVudHMvbWFzayc7XHJcbnZhciB0aW1lciA9IHJlcXVpcmUoJy4uL3V0aWxzL3d4VGltZXIuanMnKTsgLy8g5YCS6K6h5pe2XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeivpuaDhSdcclxuICB9O1xyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJhdHRyc21hc2tcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm1hc2tGbGFnLnN5bmNcIjpcImF0dHJGbGFnXCJ9LFwiYXNzbGlzdG1hc2tcIjp7XCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiYXNzbGlzdEZsYWdcIn0sXCJwYXJ0aWNpcGF0ZW1hc2tcIjp7XCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwicGFydGljaXBhdGVGbGFnXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIGF0dHJzbWFzazogbWFzayxcclxuICAgIGFzc2xpc3RtYXNrOiBtYXNrLFxyXG4gICAgcGFydGljaXBhdGVtYXNrOiBtYXNrXHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBnb29kc051bTogMSwgLy8g5ZWG5ZOB5pWw6YePXHJcbiAgICB0YWJMaXN0OiBbeyBuYW1lOiAn5ZWG5ZOB5LuL57uNJywgZG90TnVtOiAyIH0sIHsgbmFtZTogJ+WbvuaWh+ivpuaDhScsIGRvdE51bTogMyB9XSwgLy8g6aG26YOo6YCJ6aG55Y2hXHJcbiAgICBjdXJyZW50VGFiOiAwLCAvLyDpobbpg6jpgInpobnljaHntKLlvJVcclxuICAgIGZsb3dEYXRhOiBbXSwgLy8g5bqX6ZO6XHJcbiAgICB3YWl0Rm9yQXJyOiBbeyB0aW1lOiAxMDAgfSwgeyB0aW1lOiAyMDAgfSwgeyB0aW1lOiAzMDAgfSwgeyB0aW1lOiA0MDAgfV0sIC8vIOetieW+heaLvOWbouWIl+ihqFxyXG4gICAgd3hUaW1lckxpc3Q6IHt9LCAvLyDlgJLorqHml7ZcclxuICAgIGF0dHJGbGFnOiBmYWxzZSwgLy8g6YCJ5oup5bGe5oCn5YiX6KGo6ZSBXHJcbiAgICBhc3NsaXN0RmxhZzogZmFsc2UsIC8vIOWFqOmDqOaLvOWbouWIl+ihqOmUgVxyXG4gICAgcGFydGljaXBhdGVGbGFnOiBmYWxzZSwgLy8g5Y+C5LiO5ou85Zui5YiX6KGo6ZSBXHJcbiAgICBjdXJyZW50QXNzZW1ibGVJZHg6IG51bGwsIC8v5b2T5YmN6YCJ5oup5Y+C5Zui55qE57Si5byVXHJcbiAgICBjdXJyZW50QXNzZW1ibGVEYXRhOiBudWxsIC8vIOW9k+WJjemAieaLqeWPguWboueahOaVsOaNrlxyXG4gIH07XHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICB3YXRjaCA9IHtcclxuICAgIGN1cnJlbnRBc3NlbWJsZUlkeChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgICAgdGhpcy5jdXJyZW50QXNzZW1ibGVEYXRhID0gdGhpcy53YWl0Rm9yQXJyLmZpbHRlcihcclxuICAgICAgICAoaXRlbSwgaW5kZXgpID0+IGluZGV4ID09IG5ld1ZhbHVlXHJcbiAgICAgIClbMF07XHJcbiAgICB9XHJcbiAgfTtcclxuICBvblNob3coKSB7fVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAvLyDliIfmjaLpobbpg6jlr7zoiKpcclxuICAgIHN3aXRjaE5hdihpZHgpIHtcclxuICAgICAgdGhpcy5jdXJyZW50VGFiID0gaWR4O1xyXG4gICAgfSxcclxuICAgIC8vIOaYvuekuumAieaLqeWVhuWTgeahhlxyXG4gICAgc2hvd0F0dHJNYXNrKCkge1xyXG4gICAgICB0aGlzLmF0dHJGbGFnID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICAvLyDlhbPpl63mi7zlm6LliJfooajmoYZcclxuICAgIGhpZGVBc3NsaXN0TWFzaygpIHtcclxuICAgICAgdGhpcy5hc3NsaXN0RmxhZyA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIC8vIOaYvuekuuaLvOWbouWIl+ihqOahhlxyXG4gICAgc2hvd0Fzc2xpc3RNYXNrKCkge1xyXG4gICAgICB0aGlzLmFzc2xpc3RGbGFnID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBhdHRyQnRuU3VibWl0KCkge1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogJy9wYWdlcy9zZXR0bGVtZW50JyB9KTtcclxuICAgIH0sXHJcbiAgICAvLyDpgInmi6nljrvmi7zljZVcclxuICAgIHNob3dQYXJ0aWNpcGF0ZU1hc2soaWR4KSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEFzc2VtYmxlSWR4ID0gaWR4O1xyXG4gICAgICB0aGlzLnBhcnRpY2lwYXRlRmxhZyA9IHRydWU7XHJcbiAgICAgIHRoaXMuYXNzbGlzdEZsYWcgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICAvLyDlhbPpl63lj4LkuI7mi7zlm6LliJfooajlvLnmoYZcclxuICAgIGhpZGVQYXJ0aWNpcGF0ZU1hc2soaWR4KSB7XHJcbiAgICAgIHRoaXMucGFydGljaXBhdGVGbGFnID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgLy8g5o+Q5Lqk5ou85ZuiXHJcbiAgICBuYXZBc3NlbWJsZVNob3BEZXRhaWxzKCkge1xyXG4gICAgICB0aGlzLnBhcnRpY2lwYXRlRmxhZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogJy9wYWdlcy9zZXR0bGVtZW50JyB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgLy8g5YCS6K6h5pe2c1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgdmFyIHdhaXRGb3JBcnIgPSB0aGlzLndhaXRGb3JBcnI7XHJcbiAgICB3YWl0Rm9yQXJyLmZvckVhY2goKGl0ZW0sIGlkeCkgPT4ge1xyXG4gICAgICBuZXcgdGltZXIoe1xyXG4gICAgICAgIGJlZ2luVGltZTogaXRlbS50aW1lLFxyXG4gICAgICAgIG5hbWU6IGB0aW1lciR7aWR4fWBcclxuICAgICAgfSkuc3RhcnQodGhhdCk7XHJcbiAgICB9KTtcclxuICAgIC8vIOWAkuiuoeaXtmVcclxuICB9XHJcbn1cclxuIl19