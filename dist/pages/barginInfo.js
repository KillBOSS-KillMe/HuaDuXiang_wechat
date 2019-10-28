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
    }, _this.components = {
      // middlePopup
      // cartCount
    }, _this.mixins = [], _this.data = {
      requestImgUrl: '',
      //拼团
      assembleData: [{
        img: '/assets/img/image.png',
        name: '丽丽',
        title: '哈哈哈哈哈',
        time: '2018-01-01',
        peo: '1'
      }],
      // 砍价记录
      bargindata: [{
        img: '/assets/img/image.png',
        name: '李白1',
        tag: '0',
        barginprice: '2550.00'
      }, {
        img: '/assets/img/image.png',
        name: '李白1',
        tag: '0',
        barginprice: '2550.00'
      }],
      goSpellData: {},
      // 差价进度条
      BargainingCount: 600, //总共
      BargainingRecord: 200, //已砍
      BargainingSpreads: 400, //差价
      row1: '',
      // 数量进度条
      countall: 5, //总共
      siglenum: 1, // 单个
      surplus: 0, // 剩余%
      row2: '',
      //商品
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
        id: '4',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '/assets/img/image.png'
      }, {
        id: '5',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '/assets/img/image.png'
      }, {
        id: '6',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '/assets/img/image.png'
      }]
    }, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.shareWXshow = false;
      console.log('this.goSpellData', this.goSpellData);
      // 差价进度条ttttttttttttttttttt
      var barginlist = [this.BargainingRecord, this.BargainingSpreads, this.BargainingCount];
      var max = Math.max.apply(null, barginlist); // 找出最大值
      console.log('max', max);
      var unit = 650 / max;
      console.log(unit);
      this.row1 = barginlist[0] * unit;
      // 数量进度条
      var num = this.siglenum;
      var total = this.countall;
      if (isNaN(num) || isNaN(total)) {
        return '-';
      }
      this.row2 = Math.round(num / total * 10000) / 100.0 * 1;
      this.surplus = Math.round(num / total * 10000) / 100.0 + '%';
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/barginInfo'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhcmdpbkluZm8uanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwiYXNzZW1ibGVEYXRhIiwiaW1nIiwibmFtZSIsInRpdGxlIiwidGltZSIsInBlbyIsImJhcmdpbmRhdGEiLCJ0YWciLCJiYXJnaW5wcmljZSIsImdvU3BlbGxEYXRhIiwiQmFyZ2FpbmluZ0NvdW50IiwiQmFyZ2FpbmluZ1JlY29yZCIsIkJhcmdhaW5pbmdTcHJlYWRzIiwicm93MSIsImNvdW50YWxsIiwic2lnbGVudW0iLCJzdXJwbHVzIiwicm93MiIsImZsb3dEYXRhIiwiaWQiLCJwcmljZSIsImV4cHJpY2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJldmVudHMiLCJvcHRpb25zIiwic2hhcmVXWHNob3ciLCJjb25zb2xlIiwibG9nIiwiYmFyZ2lubGlzdCIsIm1heCIsIk1hdGgiLCJhcHBseSIsInVuaXQiLCJudW0iLCJ0b3RhbCIsImlzTmFOIiwicm91bmQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWE7QUFDWDtBQUNBO0FBRlcsSyxRQUtiQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMscUJBQWUsRUFEVjtBQUVMO0FBQ0FDLG9CQUFjLENBQ1o7QUFDRUMsYUFBSyx1QkFEUDtBQUVFQyxjQUFNLElBRlI7QUFHRUMsZUFBTyxPQUhUO0FBSUVDLGNBQU0sWUFKUjtBQUtFQyxhQUFLO0FBTFAsT0FEWSxDQUhUO0FBWUw7QUFDQUMsa0JBQVksQ0FDVjtBQUNFTCxhQUFLLHVCQURQO0FBRUVDLGNBQU0sS0FGUjtBQUdFSyxhQUFLLEdB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Z2luSW5mby5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnoI3ku7cnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge1xyXG4gICAgLy8gbWlkZGxlUG9wdXBcclxuICAgIC8vIGNhcnRDb3VudFxyXG4gIH07XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICAvL+aLvOWbolxyXG4gICAgYXNzZW1ibGVEYXRhOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZS5wbmcnLFxyXG4gICAgICAgIG5hbWU6ICfkuL3kuL0nLFxyXG4gICAgICAgIHRpdGxlOiAn5ZOI5ZOI5ZOI5ZOI5ZOIJyxcclxuICAgICAgICB0aW1lOiAnMjAxOC0wMS0wMScsXHJcbiAgICAgICAgcGVvOiAnMSdcclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIC8vIOegjeS7t+iusOW9lVxyXG4gICAgYmFyZ2luZGF0YTogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UucG5nJyxcclxuICAgICAgICBuYW1lOiAn5p2O55m9MScsXHJcbiAgICAgICAgdGFnOiAnMCcsXHJcbiAgICAgICAgYmFyZ2lucHJpY2U6ICcyNTUwLjAwJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UucG5nJyxcclxuICAgICAgICBuYW1lOiAn5p2O55m9MScsXHJcbiAgICAgICAgdGFnOiAnMCcsXHJcbiAgICAgICAgYmFyZ2lucHJpY2U6ICcyNTUwLjAwJ1xyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgZ29TcGVsbERhdGE6IHt9LFxyXG4gICAgLy8g5beu5Lu36L+b5bqm5p2hXHJcbiAgICBCYXJnYWluaW5nQ291bnQ6IDYwMCwgLy/mgLvlhbFcclxuICAgIEJhcmdhaW5pbmdSZWNvcmQ6IDIwMCwgLy/lt7LnoI1cclxuICAgIEJhcmdhaW5pbmdTcHJlYWRzOiA0MDAsIC8v5beu5Lu3XHJcbiAgICByb3cxOiAnJyxcclxuICAgIC8vIOaVsOmHj+i/m+W6puadoVxyXG4gICAgY291bnRhbGw6IDUsIC8v5oC75YWxXHJcbiAgICBzaWdsZW51bTogMSwgLy8g5Y2V5LiqXHJcbiAgICBzdXJwbHVzOiAwLCAvLyDliankvZklXHJcbiAgICByb3cyOiAnJyxcclxuICAgIC8v5ZWG5ZOBXHJcbiAgICBmbG93RGF0YTogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICcxJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJy9hc3NldHMvaW1nL2ltYWdlLnBuZydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnMicsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZS5wbmcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzMnLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UucG5nJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICc0JyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJy9hc3NldHMvaW1nL2ltYWdlLnBuZydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnNScsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZS5wbmcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzYnLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UucG5nJ1xyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgdGhpcy5zaGFyZVdYc2hvdyA9IGZhbHNlO1xyXG4gICAgY29uc29sZS5sb2coJ3RoaXMuZ29TcGVsbERhdGEnLCB0aGlzLmdvU3BlbGxEYXRhKTtcclxuICAgIC8vIOW3ruS7t+i/m+W6puadoXR0dHR0dHR0dHR0dHR0dHR0dHRcclxuICAgIHZhciBiYXJnaW5saXN0ID0gW1xyXG4gICAgICB0aGlzLkJhcmdhaW5pbmdSZWNvcmQsXHJcbiAgICAgIHRoaXMuQmFyZ2FpbmluZ1NwcmVhZHMsXHJcbiAgICAgIHRoaXMuQmFyZ2FpbmluZ0NvdW50XHJcbiAgICBdO1xyXG4gICAgdmFyIG1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGJhcmdpbmxpc3QpOyAvLyDmib7lh7rmnIDlpKflgLxcclxuICAgIGNvbnNvbGUubG9nKCdtYXgnLCBtYXgpO1xyXG4gICAgdmFyIHVuaXQgPSA2NTAgLyBtYXg7XHJcbiAgICBjb25zb2xlLmxvZyh1bml0KTtcclxuICAgIHRoaXMucm93MSA9IGJhcmdpbmxpc3RbMF0gKiB1bml0O1xyXG4gICAgLy8g5pWw6YeP6L+b5bqm5p2hXHJcbiAgICBsZXQgbnVtID0gdGhpcy5zaWdsZW51bTtcclxuICAgIGxldCB0b3RhbCA9IHRoaXMuY291bnRhbGw7XHJcbiAgICBpZiAoaXNOYU4obnVtKSB8fCBpc05hTih0b3RhbCkpIHtcclxuICAgICAgcmV0dXJuICctJztcclxuICAgIH1cclxuICAgIHRoaXMucm93MiA9IChNYXRoLnJvdW5kKChudW0gLyB0b3RhbCkgKiAxMDAwMCkgLyAxMDAuMCkgKiAxO1xyXG4gICAgdGhpcy5zdXJwbHVzID0gTWF0aC5yb3VuZCgobnVtIC8gdG90YWwpICogMTAwMDApIC8gMTAwLjAgKyAnJSc7XHJcbiAgfVxyXG4gIG9uU2hvdygpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7fTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbn1cclxuIl19