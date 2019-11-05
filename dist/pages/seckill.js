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

var timer = require('./../utils/wxTimer.js'); // 倒计时
var api = require('./../api.js');

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
      topImg: '',
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
      var _this2 = this;

      this.seckillId = options.id;
      console.log(options.id);

      // 倒计时s
      var wxTimer = new timer({
        beginTime: '10',
        name: 'firstTimer',
        complete: function complete() {}
      });
      wxTimer.start(this);
      // setTimeout(() => {
      //   wxTimer.stop();
      // }, 5000);
      // 倒计时e

      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      (0, _ajax.ajax)({
        url: api.memberMs
      }).then(function (res) {
        _this2.topImg = res.datas.img_area;
        _this2.$apply();
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/seckill'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY2tpbGwuanMiXSwibmFtZXMiOlsidGltZXIiLCJyZXF1aXJlIiwiYXBpIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJuYXZJZHgiLCJzY3JvbGxJZHgiLCJ3eFRpbWVyTGlzdCIsInJlcXVlc3RJbWdVcmwiLCJ0b3BJbWciLCJjdXJyZW50RGF0YSIsImRvd25TaG93Iiwic2Vja2lsbElkIiwidGltZURhdGEiLCJpZCIsInRpbWUiLCJmbG93RGF0YSIsInRpdGxlIiwicHJpY2UiLCJleHByaWNlIiwiaW1nIiwidGFnIiwibnVtIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiY2hhbmdOYXYiLCJpZHgiLCJjb25zb2xlIiwibG9nIiwiYXJndW1lbnRzIiwianVtcFRpbWVEZXRhaWxzIiwic2hvcGlkIiwiJG5hdmlnYXRlIiwiZXZlbnRzIiwib3B0aW9ucyIsInd4VGltZXIiLCJiZWdpblRpbWUiLCJuYW1lIiwiY29tcGxldGUiLCJzdGFydCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidXJsIiwibWVtYmVyTXMiLCJ0aGVuIiwicmVzIiwiZGF0YXMiLCJpbWdfYXJlYSIsIiRhcHBseSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUdBOzs7Ozs7Ozs7O0FBRkEsSUFBSUEsUUFBUUMsUUFBUSxxQkFBUixDQUFaLEMsQ0FBNEM7QUFDNUMsSUFBSUMsTUFBTUQsUUFBUSxXQUFSLENBQVY7O0lBR3FCRSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsY0FBUSxDQURILEVBQ007QUFDWEMsaUJBQVcsU0FGTixFQUVpQjtBQUN0QkMsbUJBQWEsRUFIUixFQUdZO0FBQ2pCQyxxQkFBZSxFQUpWO0FBS0xDLGNBQVEsRUFMSDtBQU1MQyxtQkFBYSxDQU5SO0FBT0xDLGdCQUFVLEtBUEw7QUFRTEMsaUJBQVcsRUFSTjtBQVNMQyxnQkFBVSxDQUNSLEVBQUVDLElBQUksR0FBTixFQUFXQyxNQUFNLE9BQWpCLEVBRFEsRUFFUixFQUFFRCxJQUFJLEdBQU4sRUFBV0MsTUFBTSxPQUFqQixFQUZRLEVBR1IsRUFBRUQsSUFBSSxHQUFOLEVBQVdDLE1BQU0sT0FBakIsRUFIUSxFQUlSLEVBQUVELElBQUksR0FBTixFQUFXQyxNQUFNLE9BQWpCLEVBSlEsRUFLUixFQUFFRCxJQUFJLEdBQU4sRUFBV0MsTUFBTSxPQUFqQixFQUxRLEVBTVIsRUFBRUQsSUFBSSxHQUFOLEVBQVdDLE1BQU0sT0FBakIsRUFOUSxDQVRMO0FBaUJMQyxnQkFBVSxDQUNSO0FBQ0VGLFlBQUksR0FETjtBQUVFRyxlQUFPLE9BRlQ7QUFHRUMsZUFBTyxNQUhUO0FBSUVDLGlCQUFTLElBSlg7QUFLRUMsYUFBSyxjQUxQO0FBTUVDLGFBQUssTUFOUDtBQU9FQyxhQUFLO0FBUFAsT0FEUSxFQVVSO0FBQ0VSLFlBQUksR0FETjtBQUVFRyxlQUFPLE9BRlQ7QUFHRUMsZUFBTyxHQUhUO0FBSUVDLGlCQUFTLElBSlg7QUFLRUMsYUFBSyxjQUxQO0FBTUVDLGFBQUssTUFOUDtBQU9HQyxhQUFLO0FBUFIsT0FWUSxFQW1CUjtBQUNFUixZQUFJLEdBRE47QUFFRUcsZUFBTyxPQUZUO0FBR0VDLGVBQU8sR0FIVDtBQUlFQyxpQkFBUyxJQUpYO0FBS0VDLGFBQUssY0FMUDtBQU1FQyxhQUFLLE1BTlA7QUFPR0MsYUFBSzs7QUFQUixPQW5CUSxFQTZCUjtBQUNFUixZQUFJLEdBRE47QUFFRUcsZUFBTyxPQUZUO0FBR0VDLGVBQU8sR0FIVDtBQUlFQyxpQkFBUyxJQUpYO0FBS0VDLGFBQUssY0FMUDtBQU1FQyxhQUFLLE1BTlA7QUFPR0MsYUFBSzs7QUFQUixPQTdCUSxFQXVDUjtBQUNFUixZQUFJLEdBRE47QUFFRUcsZUFBTyxPQUZUO0FBR0VDLGVBQU8sR0FIVDtBQUlFQyxpQkFBUyxJQUpYO0FBS0VDLGFBQUssY0FMUDtBQU1FQyxhQUFLLE1BTlA7QUFPR0MsYUFBSzs7QUFQUixPQXZDUSxFQWlEUjtBQUNFUixZQUFJLEdBRE47QUFFRUcsZUFBTyxPQUZUO0FBR0VDLGVBQU8sR0FIVDtBQUlFQyxpQkFBUyxJQUpYO0FBS0VDLGFBQUssY0FMUDtBQU1FQyxhQUFLLE1BTlA7QUFPR0MsYUFBSzs7QUFQUixPQWpEUTtBQWpCTCxLLFFBK0VQQyxRLEdBQVcsRSxRQTJCWEMsTyxHQUFVO0FBQ1JDLGNBRFEsb0JBQ0NDLEdBREQsRUFDTTtBQUNWLGFBQUtyQixNQUFMLEdBQWNxQixHQUFkO0FBQ0EsYUFBS3BCLFNBQUwsZUFBMEJvQixNQUFJLENBQTlCO0FBQ0ZDLGdCQUFRQyxHQUFSLHNDQUFnQkMsU0FBaEI7QUFDRCxPQUxPOztBQU1SOzs7QUFHQUMscUJBVFEsMkJBU1FDLE1BVFIsRUFTZ0I7QUFDdEI7QUFDQSxhQUFLQyxTQUFMLHVDQUNzQ0QsTUFEdEMsbUJBQzBELEtBQUtuQixTQUQvRDtBQUdEO0FBZE8sSyxRQWlCVnFCLE0sR0FBUyxFOzs7OzsyQkEzQ0ZDLE8sRUFBUztBQUFBOztBQUNkLFdBQUt0QixTQUFMLEdBQWlCc0IsUUFBUXBCLEVBQXpCO0FBQ0FhLGNBQVFDLEdBQVIsQ0FBWU0sUUFBUXBCLEVBQXBCOztBQUVBO0FBQ0EsVUFBSXFCLFVBQVUsSUFBSXZDLEtBQUosQ0FBVTtBQUN0QndDLG1CQUFXLElBRFc7QUFFdEJDLGNBQU0sWUFGZ0I7QUFHdEJDLGdCQUhzQixzQkFHWCxDQUFFO0FBSFMsT0FBVixDQUFkO0FBS0FILGNBQVFJLEtBQVIsQ0FBYyxJQUFkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBSy9CLGFBQUwsR0FBcUIsS0FBS2dDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QmpDLGFBQTdDO0FBQ0Esc0JBQUs7QUFDRGtDLGFBQUs1QyxJQUFJNkM7QUFEUixPQUFMLEVBRUdDLElBRkgsQ0FFUSxlQUFPO0FBQ1gsZUFBS25DLE1BQUwsR0FBY29DLElBQUlDLEtBQUosQ0FBVUMsUUFBeEI7QUFDQSxlQUFLQyxNQUFMO0FBQ0gsT0FMRDtBQU1EOzs7NkJBQ1EsQ0FDUjs7OztFQWpIZ0NDLGVBQUtDLEk7O2tCQUFuQm5ELEsiLCJmaWxlIjoic2Vja2lsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIHRpbWVyID0gcmVxdWlyZSgnLi4vdXRpbHMvd3hUaW1lci5qcycpOyAvLyDlgJLorqHml7ZcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+enkuadgCdcclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBuYXZJZHg6IDAsIC8v5qiq5ZCR5a+86Iiq5rua5Yqo57Si5byVXHJcbiAgICBzY3JvbGxJZHg6ICdzY3JvbGwwJywgLy/mqKrlkJHlr7zoiKrmu5rliqhcclxuICAgIHd4VGltZXJMaXN0OiB7fSwgLy8g5YCS6K6h5pe2XHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIHRvcEltZzogJycsXHJcbiAgICBjdXJyZW50RGF0YTogMCxcclxuICAgIGRvd25TaG93OiBmYWxzZSxcclxuICAgIHNlY2tpbGxJZDogJycsXHJcbiAgICB0aW1lRGF0YTogW1xyXG4gICAgICB7IGlkOiAnMScsIHRpbWU6ICcwODowMCcgfSxcclxuICAgICAgeyBpZDogJzInLCB0aW1lOiAnMDk6MDAnIH0sXHJcbiAgICAgIHsgaWQ6ICczJywgdGltZTogJzEwOjAwJyB9LFxyXG4gICAgICB7IGlkOiAnMycsIHRpbWU6ICcxMTowMCcgfSxcclxuICAgICAgeyBpZDogJzMnLCB0aW1lOiAnMTI6MDAnIH0sXHJcbiAgICAgIHsgaWQ6ICczJywgdGltZTogJzEzOjAwJyB9XHJcbiAgICBdLFxyXG4gICAgZmxvd0RhdGE6IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnMScsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNTU1NScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICdpbmRleGltZy5wbmcnLFxyXG4gICAgICAgIHRhZzogJ+a7oeS4ieWHj+S4gCcsXHJcbiAgICAgICAgbnVtOiAxMFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICcyJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZycsXHJcbiAgICAgICAgdGFnOiAn5ruh5LiJ5YeP5LiAJyxcclxuICAgICAgICAgbnVtOiAyMFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICczJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZycsXHJcbiAgICAgICAgdGFnOiAn5ruh5LiJ5YeP5LiAJyxcclxuICAgICAgICAgbnVtOiAzMFxyXG5cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnNCcsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICdpbmRleGltZy5wbmcnLFxyXG4gICAgICAgIHRhZzogJ+a7oeS4ieWHj+S4gCcsXHJcbiAgICAgICAgIG51bTogNDBcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzUnLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnaW5kZXhpbWcucG5nJyxcclxuICAgICAgICB0YWc6ICfmu6HkuInlh4/kuIAnLFxyXG4gICAgICAgICBudW06IDUwXHJcblxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICc2JyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJ2luZGV4aW1nLnBuZycsXHJcbiAgICAgICAgdGFnOiAn5ruh5LiJ5YeP5LiAJyxcclxuICAgICAgICAgbnVtOiA2MFxyXG5cclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuc2Vja2lsbElkID0gb3B0aW9ucy5pZDtcclxuICAgIGNvbnNvbGUubG9nKG9wdGlvbnMuaWQpO1xyXG5cclxuICAgIC8vIOWAkuiuoeaXtnNcclxuICAgIHZhciB3eFRpbWVyID0gbmV3IHRpbWVyKHtcclxuICAgICAgYmVnaW5UaW1lOiAnMTAnLFxyXG4gICAgICBuYW1lOiAnZmlyc3RUaW1lcicsXHJcbiAgICAgIGNvbXBsZXRlKCkge31cclxuICAgIH0pO1xyXG4gICAgd3hUaW1lci5zdGFydCh0aGlzKTtcclxuICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgLy8gICB3eFRpbWVyLnN0b3AoKTtcclxuICAgIC8vIH0sIDUwMDApO1xyXG4gICAgLy8g5YCS6K6h5pe2ZVxyXG5cclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5tZW1iZXJNcyxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICB0aGlzLnRvcEltZyA9IHJlcy5kYXRhcy5pbWdfYXJlYVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIG9uU2hvdygpIHtcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNoYW5nTmF2KGlkeCkge1xyXG4gICAgICAgIHRoaXMubmF2SWR4ID0gaWR4XHJcbiAgICAgICAgdGhpcy5zY3JvbGxJZHggPSBgc2Nyb2xsJHtpZHgtMX1gXHJcbiAgICAgIGNvbnNvbGUubG9nKFsuLi5hcmd1bWVudHNdKVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog6Lez6L2s5ZWG5ZOB6K+m5oOFXHJcbiAgICAgKi9cclxuICAgIGp1bXBUaW1lRGV0YWlscyhzaG9waWQpIHtcclxuICAgICAgLy8gICBjb25zb2xlLmxvZyhzaG9waWQpXHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKFxyXG4gICAgICAgIGAvcGFnZXMvc2Vja2lsbFNob3BEZXRhaWxzP3Nob3BpZD0ke3Nob3BpZH0mc2Vja2lsbElkPSR7dGhpcy5zZWNraWxsSWR9YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG59XHJcbiJdfQ==