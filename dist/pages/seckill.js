'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, Index);

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '秒杀'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      navIdx: 0, //横向导航滚动索引
      scrollIdx: 'scroll0', //横向导航滚动
      wxTimerList: {}, // 倒计时
      requestImgUrl: '',
      currentData: 0,
      downShow: false,
      seckillId: '',
      timeData: [{ id: '1', time: '08:00' }, { id: '2', time: '09:00' }, { id: '3', time: '10:00' }, { id: '3', time: '11:00' }, { id: '3', time: '12:00' }, { id: '3', time: '13:00' }],
      flowData: [{
        id: '1',
        title: '萌分订书机',
        price: '5555',
        exprice: '25',
        img: 'indeximg.png',
        tag: '满三减一',
        num: 10
      }, {
        id: '2',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: 'indeximg.png',
        tag: '满三减一',
        num: 20
      }, {
        id: '3',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: 'indeximg.png',
        tag: '满三减一',
        num: 30

      }, {
        id: '4',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: 'indeximg.png',
        tag: '满三减一',
        num: 40

      }, {
        id: '5',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: 'indeximg.png',
        tag: '满三减一',
        num: 50

      }, {
        id: '6',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: 'indeximg.png',
        tag: '满三减一',
        num: 60

      }]
    }, _this.computed = {}, _this.methods = {
      changNav: function changNav(idx) {
        this.navIdx = idx;
        this.scrollIdx = 'scroll' + (idx - 1);
        console.log([].concat(Array.prototype.slice.call(arguments)));
      },

      /**
       * 跳转商品详情
       */
      jumpTimeDetails: function jumpTimeDetails(shopid) {
        //   console.log(shopid)
        this.$navigate('/pages/seckillShopDetails?shopid=' + shopid + '&seckillId=' + this.seckillId);
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.seckillId = options.id;
      console.log(options.id);

      // 倒计时s
      var wxTimer = new timer({
        beginTime: '0:0:10',
        name: 'firstTimer',
        complete: function complete() {}
      });
      wxTimer.start(this);
      // setTimeout(() => {
      //   wxTimer.stop();
      // }, 5000);
      // 倒计时e
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      // this.userInfo = this.$parent.globalData.userInfo
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/seckill'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY2tpbGwuanMiXSwibmFtZXMiOlsidGltZXIiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJuYXZJZHgiLCJzY3JvbGxJZHgiLCJ3eFRpbWVyTGlzdCIsInJlcXVlc3RJbWdVcmwiLCJjdXJyZW50RGF0YSIsImRvd25TaG93Iiwic2Vja2lsbElkIiwidGltZURhdGEiLCJpZCIsInRpbWUiLCJmbG93RGF0YSIsInRpdGxlIiwicHJpY2UiLCJleHByaWNlIiwiaW1nIiwidGFnIiwibnVtIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiY2hhbmdOYXYiLCJpZHgiLCJjb25zb2xlIiwibG9nIiwiYXJndW1lbnRzIiwianVtcFRpbWVEZXRhaWxzIiwic2hvcGlkIiwiJG5hdmlnYXRlIiwiZXZlbnRzIiwib3B0aW9ucyIsInd4VGltZXIiLCJiZWdpblRpbWUiLCJuYW1lIiwiY29tcGxldGUiLCJzdGFydCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxRQUFRQyxRQUFRLHFCQUFSLENBQVosQyxDQUE0Qzs7SUFFdkJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxjQUFRLENBREgsRUFDTTtBQUNYQyxpQkFBVyxTQUZOLEVBRWlCO0FBQ3RCQyxtQkFBYSxFQUhSLEVBR1k7QUFDakJDLHFCQUFlLEVBSlY7QUFLTEMsbUJBQWEsQ0FMUjtBQU1MQyxnQkFBVSxLQU5MO0FBT0xDLGlCQUFXLEVBUE47QUFRTEMsZ0JBQVUsQ0FDUixFQUFFQyxJQUFJLEdBQU4sRUFBV0MsTUFBTSxPQUFqQixFQURRLEVBRVIsRUFBRUQsSUFBSSxHQUFOLEVBQVdDLE1BQU0sT0FBakIsRUFGUSxFQUdSLEVBQUVELElBQUksR0FBTixFQUFXQyxNQUFNLE9BQWpCLEVBSFEsRUFJUixFQUFFRCxJQUFJLEdBQU4sRUFBV0MsTUFBTSxPQUFqQixFQUpRLEVBS1IsRUFBRUQsSUFBSSxHQUFOLEVBQVdDLE1BQU0sT0FBakIsRUFMUSxFQU1SLEVBQUVELElBQUksR0FBTixFQUFXQyxNQUFNLE9BQWpCLEVBTlEsQ0FSTDtBQWdCTEMsZ0JBQVUsQ0FDUjtBQUNFRixZQUFJLEdBRE47QUFFRUcsZUFBTyxPQUZUO0FBR0VDLGVBQU8sTUFIVDtBQUlFQyxpQkFBUyxJQUpYO0FBS0VDLGFBQUssY0FMUDtBQU1FQyxhQUFLLE1BTlA7QUFPRUMsYUFBSztBQVBQLE9BRFEsRUFVUjtBQUNFUixZQUFJLEdBRE47QUFFRUcsZUFBTyxPQUZUO0FBR0VDLGVBQU8sR0FIVDtBQUlFQyxpQkFBUyxJQUpYO0FBS0VDLGFBQUssY0FMUDtBQU1FQyxhQUFLLE1BTlA7QUFPR0MsYUFBSztBQVBSLE9BVlEsRUFtQlI7QUFDRVIsWUFBSSxHQUROO0FBRUVHLGVBQU8sT0FGVDtBQUdFQyxlQUFPLEdBSFQ7QUFJRUMsaUJBQVMsSUFKWDtBQUtFQyxhQUFLLGNBTFA7QUFNRUMsYUFBSyxNQU5QO0FBT0dDLGFBQUs7O0FBUFIsT0FuQlEsRUE2QlI7QUFDRVIsWUFBSSxHQUROO0FBRUVHLGVBQU8sT0FGVDtBQUdFQyxlQUFPLEdBSFQ7QUFJRUMsaUJBQVMsSUFKWDtBQUtFQyxhQUFLLGNBTFA7QUFNRUMsYUFBSyxNQU5QO0FBT0dDLGFBQUs7O0FBUFIsT0E3QlEsRUF1Q1I7QUFDRVIsWUFBSSxHQUROO0FBRUVHLGVBQU8sT0FGVDtBQUdFQyxlQUFPLEdBSFQ7QUFJRUMsaUJBQVMsSUFKWDtBQUtFQyxhQUFLLGNBTFA7QUFNRUMsYUFBSyxNQU5QO0FBT0dDLGFBQUs7O0FBUFIsT0F2Q1EsRUFpRFI7QUFDRVIsWUFBSSxHQUROO0FBRUVHLGVBQU8sT0FGVDtBQUdFQyxlQUFPLEdBSFQ7QUFJRUMsaUJBQVMsSUFKWDtBQUtFQyxhQUFLLGNBTFA7QUFNRUMsYUFBSyxNQU5QO0FBT0dDLGFBQUs7O0FBUFIsT0FqRFE7QUFoQkwsSyxRQThFUEMsUSxHQUFXLEUsUUFxQlhDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNDQyxHQURELEVBQ007QUFDVixhQUFLcEIsTUFBTCxHQUFjb0IsR0FBZDtBQUNBLGFBQUtuQixTQUFMLGVBQTBCbUIsTUFBSSxDQUE5QjtBQUNGQyxnQkFBUUMsR0FBUixzQ0FBZ0JDLFNBQWhCO0FBQ0QsT0FMTzs7QUFNUjs7O0FBR0FDLHFCQVRRLDJCQVNRQyxNQVRSLEVBU2dCO0FBQ3RCO0FBQ0EsYUFBS0MsU0FBTCx1Q0FDc0NELE1BRHRDLG1CQUMwRCxLQUFLbkIsU0FEL0Q7QUFHRDtBQWRPLEssUUFpQlZxQixNLEdBQVMsRTs7Ozs7MkJBckNGQyxPLEVBQVM7QUFDZCxXQUFLdEIsU0FBTCxHQUFpQnNCLFFBQVFwQixFQUF6QjtBQUNBYSxjQUFRQyxHQUFSLENBQVlNLFFBQVFwQixFQUFwQjs7QUFFQTtBQUNBLFVBQUlxQixVQUFVLElBQUlyQyxLQUFKLENBQVU7QUFDdEJzQyxtQkFBVyxRQURXO0FBRXRCQyxjQUFNLFlBRmdCO0FBR3RCQyxnQkFIc0Isc0JBR1gsQ0FBRTtBQUhTLE9BQVYsQ0FBZDtBQUtBSCxjQUFRSSxLQUFSLENBQWMsSUFBZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7Ozs2QkFDUTtBQUNQO0FBQ0EsV0FBSzlCLGFBQUwsR0FBcUIsS0FBSytCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QmhDLGFBQTdDO0FBQ0Q7Ozs7RUExR2dDaUMsZUFBS0MsSTs7a0JBQW5CM0MsSyIsImZpbGUiOiJzZWNraWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG52YXIgdGltZXIgPSByZXF1aXJlKCcuLi91dGlscy93eFRpbWVyLmpzJyk7IC8vIOWAkuiuoeaXtlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnp5LmnYAnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgbmF2SWR4OiAwLCAvL+aoquWQkeWvvOiIqua7muWKqOe0ouW8lVxyXG4gICAgc2Nyb2xsSWR4OiAnc2Nyb2xsMCcsIC8v5qiq5ZCR5a+86Iiq5rua5YqoXHJcbiAgICB3eFRpbWVyTGlzdDoge30sIC8vIOWAkuiuoeaXtlxyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBjdXJyZW50RGF0YTogMCxcclxuICAgIGRvd25TaG93OiBmYWxzZSxcclxuICAgIHNlY2tpbGxJZDogJycsXHJcbiAgICB0aW1lRGF0YTogW1xyXG4gICAgICB7IGlkOiAnMScsIHRpbWU6ICcwODowMCcgfSxcclxuICAgICAgeyBpZDogJzInLCB0aW1lOiAnMDk6MDAnIH0sXHJcbiAgICAgIHsgaWQ6ICczJywgdGltZTogJzEwOjAwJyB9LFxyXG4gICAgICB7IGlkOiAnMycsIHRpbWU6ICcxMTowMCcgfSxcclxuICAgICAgeyBpZDogJzMnLCB0aW1lOiAnMTI6MDAnIH0sXHJcbiAgICAgIHsgaWQ6ICczJywgdGltZTogJzEzOjAwJyB9XHJcbiAgICBdLFxyXG4gICAgZmxvd0RhdGE6IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnMScsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNTU1NScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICdpbmRleGltZy5wbmcnLFxyXG4gICAgICAgIHRhZzogJ+a7oeS4ieWHj+S4gCcsXHJcbiAgICAgICAgbnVtOiAxMFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICcyJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZycsXHJcbiAgICAgICAgdGFnOiAn5ruh5LiJ5YeP5LiAJyxcclxuICAgICAgICAgbnVtOiAyMFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICczJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZycsXHJcbiAgICAgICAgdGFnOiAn5ruh5LiJ5YeP5LiAJyxcclxuICAgICAgICAgbnVtOiAzMFxyXG5cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnNCcsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICdpbmRleGltZy5wbmcnLFxyXG4gICAgICAgIHRhZzogJ+a7oeS4ieWHj+S4gCcsXHJcbiAgICAgICAgIG51bTogNDBcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzUnLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnaW5kZXhpbWcucG5nJyxcclxuICAgICAgICB0YWc6ICfmu6HkuInlh4/kuIAnLFxyXG4gICAgICAgICBudW06IDUwXHJcblxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICc2JyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZycsXHJcbiAgICAgICAgdGFnOiAn5ruh5LiJ5YeP5LiAJyxcclxuICAgICAgICAgbnVtOiA2MFxyXG5cclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuc2Vja2lsbElkID0gb3B0aW9ucy5pZDtcclxuICAgIGNvbnNvbGUubG9nKG9wdGlvbnMuaWQpO1xyXG5cclxuICAgIC8vIOWAkuiuoeaXtnNcclxuICAgIHZhciB3eFRpbWVyID0gbmV3IHRpbWVyKHtcclxuICAgICAgYmVnaW5UaW1lOiAnMDowOjEwJyxcclxuICAgICAgbmFtZTogJ2ZpcnN0VGltZXInLFxyXG4gICAgICBjb21wbGV0ZSgpIHt9XHJcbiAgICB9KTtcclxuICAgIHd4VGltZXIuc3RhcnQodGhpcyk7XHJcbiAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIC8vICAgd3hUaW1lci5zdG9wKCk7XHJcbiAgICAvLyB9LCA1MDAwKTtcclxuICAgIC8vIOWAkuiuoeaXtmVcclxuICB9XHJcbiAgb25TaG93KCkge1xyXG4gICAgLy8gdGhpcy51c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvXHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgY2hhbmdOYXYoaWR4KSB7XHJcbiAgICAgICAgdGhpcy5uYXZJZHggPSBpZHhcclxuICAgICAgICB0aGlzLnNjcm9sbElkeCA9IGBzY3JvbGwke2lkeC0xfWBcclxuICAgICAgY29uc29sZS5sb2coWy4uLmFyZ3VtZW50c10pXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDot7PovazllYblk4Hor6bmg4VcclxuICAgICAqL1xyXG4gICAganVtcFRpbWVEZXRhaWxzKHNob3BpZCkge1xyXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHNob3BpZClcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoXHJcbiAgICAgICAgYC9wYWdlcy9zZWNraWxsU2hvcERldGFpbHM/c2hvcGlkPSR7c2hvcGlkfSZzZWNraWxsSWQ9JHt0aGlzLnNlY2tpbGxJZH1gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbn1cclxuIl19