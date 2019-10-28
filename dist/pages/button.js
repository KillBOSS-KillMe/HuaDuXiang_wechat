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
      navigationBarTitleText: '弹窗'
    }, _this.components = {
      // middlePopup
      // cartCount
    }, _this.mixins = [], _this.data = {
      showPopup: false, // 选择地址弹窗
      sharePopup: false, // 分享弹窗
      spellList: false, //查看拼团
      puzzleIng: false, //参加拼单
      bargainShow: true, // 砍价
      inpNum: 1,
      shareWXshow: true, //微信
      // 商品
      shopData: {
        id: 1,
        img: '',
        title: '儿童滑行车两轮平衡车小孩踏步车',
        color: '白色',
        color2: '粉色',
        age: '5-6岁',
        size: 'S',
        order: '11977240',
        num: 1,
        price: 100,
        exprice: 180,
        selected: false,
        type: 1,
        store: '好好好'
      },
      // 商品规格 颜色
      shopNorms: [{ color: '粉色' }, { color: '白色' }, { color: '粉 + 白' }],
      //拼团
      assembleData: [{
        img: '',
        name: '丽丽',
        title: '哈哈哈哈哈',
        time: '2018-01-01',
        peo: '1'
      }],
      // 砍价记录
      bargindata: [{
        img: '',
        name: '李白1',
        tag: '0',
        barginprice: '2550.00'
      }, {
        img: '',
        name: '李白1',
        tag: '0',
        barginprice: '2550.00'
      }],
      goSpellData: {},
      // 差价进度条
      BargainingCount: 600, //总共
      BargainingRecord: 200, //已砍
      BargainingSpreads: 400, //差价
      row1: "",
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
        img: '../assets/images/indeximg.png'
      }, {
        id: '2',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '../assets/images/indeximg.png'
      }, {
        id: '3',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '../assets/images/indeximg.png'
      }, {
        id: '4',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '../assets/images/indeximg.png'
      }, {
        id: '5',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '../assets/images/indeximg.png'
      }, {
        id: '6',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '../assets/images/indeximg.png'
      }]
    }, _this.computed = {}, _this.methods = {
      GetPercent: function GetPercent(num, total) {
        /// <summary>
        /// 求百分比
        /// </summary>
        /// <param name="num">当前数</param>
        /// <param name="total">总数</param>
        num = parseFloat(num);
        total = parseFloat(total);
        if (isNaN(num) || isNaN(total)) {
          return "-";
        }
        return total <= 0 ? "0%" : Math.round(num / total * 10000) / 100.00 + "%";
      },

      // 弹框数量 ++
      getAdd: function getAdd() {
        this.inpNum++;
      },

      // 弹框数量 --
      getCutDdown: function getCutDdown() {
        if (this.inpNum === 1) {
          return false;
        }
        this.inpNum--;
      },

      /**
       * *****************
       */
      // 地址 弹窗
      getProup: function getProup(item) {
        this.showPopup = true;
      },

      // 关闭弹窗
      hideProup: function hideProup(e) {
        this.showPopup = false;
      },

      /********************* */
      // 分享 弹窗
      getShareProup: function getShareProup(item) {
        this.sharePopup = true;
      },
      hiddShare: function hiddShare(e) {
        //   this.sharePopup = false;
      },

      // 分享
      onShareAppMessage: function onShareAppMessage(ops) {
        var _this2 = this;

        if (ops.from === 'button') {
          // 来自页面内转发按钮
          // console.log(ops.target)
        }
        return {
          title: '', // 转发后 所显示的title
          path: '', // 相对的路径
          success: function success(res) {
            // 成功后要做的事情
            _this2.sharePopup = false;
            console.log(res);
            console.log(res.shareTickets[0]);
            wx.getShareInfo({
              // shareTicket: res.shareTickets[0],
              success: function success(res) {
                console.log(res);
              },
              fail: function fail(res) {
                console.log(res);
              },
              complete: function complete(res) {
                console.log(res);
              }
            });
          },
          fail: function fail(res) {
            // 分享失败
            console.log(res);
          }
        };
      },

      /********************* */
      //查看拼团
      getLookSpellList: function getLookSpellList() {
        this.spellList = true;
      },

      //关闭拼团
      hideSpell: function hideSpell() {
        this.spellList = false;
      },

      // 参加拼团
      goToPuzzle: function goToPuzzle(item) {
        var peoItem = item;
        var spellobj = {};
        spellobj = {
          name: peoItem.name,
          img: peoItem.img,
          peonum: peoItem.peo
        };
        this.goSpellData = spellobj;
        console.log(this.goSpellData);
        this.puzzleIng = true; //个人拼单出现
        //   this.spellList = false; // 关闭
      },

      /********************************** */
      //关闭拼单
      hiddSpell: function hiddSpell() {
        this.puzzleIng = false;
      },
      goToPinDan: function goToPinDan() {
        console.log(123);
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
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
        return "-";
      }
      this.row2 = Math.round(num / total * 10000) / 100.00 * 1;
      this.surplus = Math.round(num / total * 10000) / 100.00 + "%";
      // var unit = 380/max;
      // 
      // this.row2 = barginlist[0] * unit


      // this.GetPercent(this.countall,this.siglenum)
      // console.log(this.GetPercent(this.countall,this.siglenum))
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/button'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1dHRvbi5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInNob3dQb3B1cCIsInNoYXJlUG9wdXAiLCJzcGVsbExpc3QiLCJwdXp6bGVJbmciLCJiYXJnYWluU2hvdyIsImlucE51bSIsInNoYXJlV1hzaG93Iiwic2hvcERhdGEiLCJpZCIsImltZyIsInRpdGxlIiwiY29sb3IiLCJjb2xvcjIiLCJhZ2UiLCJzaXplIiwib3JkZXIiLCJudW0iLCJwcmljZSIsImV4cHJpY2UiLCJzZWxlY3RlZCIsInR5cGUiLCJzdG9yZSIsInNob3BOb3JtcyIsImFzc2VtYmxlRGF0YSIsIm5hbWUiLCJ0aW1lIiwicGVvIiwiYmFyZ2luZGF0YSIsInRhZyIsImJhcmdpbnByaWNlIiwiZ29TcGVsbERhdGEiLCJCYXJnYWluaW5nQ291bnQiLCJCYXJnYWluaW5nUmVjb3JkIiwiQmFyZ2FpbmluZ1NwcmVhZHMiLCJyb3cxIiwiY291bnRhbGwiLCJzaWdsZW51bSIsInN1cnBsdXMiLCJyb3cyIiwiZmxvd0RhdGEiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJHZXRQZXJjZW50IiwidG90YWwiLCJwYXJzZUZsb2F0IiwiaXNOYU4iLCJNYXRoIiwicm91bmQiLCJnZXRBZGQiLCJnZXRDdXREZG93biIsImdldFByb3VwIiwiaXRlbSIsImhpZGVQcm91cCIsImUiLCJnZXRTaGFyZVByb3VwIiwiaGlkZFNoYXJlIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJvcHMiLCJmcm9tIiwicGF0aCIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwicmVzIiwic2hhcmVUaWNrZXRzIiwid3giLCJnZXRTaGFyZUluZm8iLCJmYWlsIiwiY29tcGxldGUiLCJnZXRMb29rU3BlbGxMaXN0IiwiaGlkZVNwZWxsIiwiZ29Ub1B1enpsZSIsInBlb0l0ZW0iLCJzcGVsbG9iaiIsInBlb251bSIsImhpZGRTcGVsbCIsImdvVG9QaW5EYW4iLCJldmVudHMiLCJvcHRpb25zIiwiYmFyZ2lubGlzdCIsIm1heCIsImFwcGx5IiwidW5pdCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWE7QUFDWDtBQUNBO0FBRlcsSyxRQUtiQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsaUJBQVcsS0FETixFQUNhO0FBQ2xCQyxrQkFBWSxLQUZQLEVBRWM7QUFDbkJDLGlCQUFXLEtBSE4sRUFHYTtBQUNsQkMsaUJBQVcsS0FKTixFQUlhO0FBQ2xCQyxtQkFBYSxJQUxSLEVBS2M7QUFDbkJDLGNBQVEsQ0FOSDtBQU9MQyxtQkFBYSxJQVBSLEVBT2M7QUFDbkI7QUFDQUMsZ0JBQVU7QUFDUkMsWUFBSSxDQURJO0FBRVJDLGFBQUssRUFGRztBQUdSQyxlQUFPLGlCQUhDO0FBSVJDLGVBQU8sSUFKQztBQUtSQyxnQkFBUSxJQUxBO0FBTVJDLGFBQUssTUFORztBQU9SQyxjQUFNLEdBUEU7QUFRUkMsZUFBTyxVQVJDO0FBU1JDLGFBQUssQ0FURztBQVVSQyxlQUFPLEdBVkM7QUFXUkMsaUJBQVMsR0FYRDtBQVlSQyxrQkFBVSxLQVpGO0FBYVJDLGNBQU0sQ0FiRTtBQWNSQyxlQUFPO0FBZEMsT0FUTDtBQXlCTDtBQUNBQyxpQkFBVyxDQUFDLEVBQUVYLE9BQU8sSUFBVCxFQUFELEVBQWtCLEVBQUVBLE9BQU8sSUFBVCxFQUFsQixFQUFtQyxFQUFFQSxPQUFPLE9BQVQsRUFBbkMsQ0ExQk47QUEyQkw7QUFDQVksb0JBQWMsQ0FDWjtBQUNFZCxhQUFLLEVBRFA7QUFFRWUsY0FBTSxJQUZSO0FBR0VkLGVBQU8sT0FIVDtBQUlFZSxjQUFNLFlBSlI7QUFLRUMsYUFBSztBQUxQLE9BRFksQ0E1QlQ7QUFxQ0w7QUFDQUMsa0JBQVcsQ0FDUDtBQUNJbEIsYUFBSyxFQURU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LENBQXpEO0FBQ0EsV0FBS04sT0FBTCxHQUFnQlMsS0FBS0MsS0FBTCxDQUFXL0IsTUFBTTJCLEtBQU4sR0FBYyxLQUF6QixJQUFrQyxNQUFuQyxHQUEyQyxHQUExRDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNEOzs7NkJBQ08sQ0FDUDs7OztFQXJKZ0N3QyxlQUFLQyxJOztrQkFBbkIxRixLIiwiZmlsZSI6ImJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflvLnnqpcnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge1xyXG4gICAgLy8gbWlkZGxlUG9wdXBcclxuICAgIC8vIGNhcnRDb3VudFxyXG4gIH07XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgc2hvd1BvcHVwOiBmYWxzZSwgLy8g6YCJ5oup5Zyw5Z2A5by556qXXHJcbiAgICBzaGFyZVBvcHVwOiBmYWxzZSwgLy8g5YiG5Lqr5by556qXXHJcbiAgICBzcGVsbExpc3Q6IGZhbHNlLCAvL+afpeeci+aLvOWbolxyXG4gICAgcHV6emxlSW5nOiBmYWxzZSwgLy/lj4LliqDmi7zljZVcclxuICAgIGJhcmdhaW5TaG93OiB0cnVlLCAvLyDnoI3ku7dcclxuICAgIGlucE51bTogMSxcclxuICAgIHNoYXJlV1hzaG93OiB0cnVlLCAvL+W+ruS/oVxyXG4gICAgLy8g5ZWG5ZOBXHJcbiAgICBzaG9wRGF0YToge1xyXG4gICAgICBpZDogMSxcclxuICAgICAgaW1nOiAnJyxcclxuICAgICAgdGl0bGU6ICflhL/nq6Xmu5HooYzovabkuKTova7lubPooaHovablsI/lranouI/mraXovaYnLFxyXG4gICAgICBjb2xvcjogJ+eZveiJsicsXHJcbiAgICAgIGNvbG9yMjogJ+eyieiJsicsXHJcbiAgICAgIGFnZTogJzUtNuWygScsXHJcbiAgICAgIHNpemU6ICdTJyxcclxuICAgICAgb3JkZXI6ICcxMTk3NzI0MCcsXHJcbiAgICAgIG51bTogMSxcclxuICAgICAgcHJpY2U6IDEwMCxcclxuICAgICAgZXhwcmljZTogMTgwLFxyXG4gICAgICBzZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IDEsXHJcbiAgICAgIHN0b3JlOiAn5aW95aW95aW9J1xyXG4gICAgfSxcclxuICAgIC8vIOWVhuWTgeinhOagvCDpopzoibJcclxuICAgIHNob3BOb3JtczogW3sgY29sb3I6ICfnsonoibInIH0sIHsgY29sb3I6ICfnmb3oibInIH0sIHsgY29sb3I6ICfnsokgKyDnmb0nIH1dLFxyXG4gICAgLy/mi7zlm6JcclxuICAgIGFzc2VtYmxlRGF0YTogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaW1nOiAnJyxcclxuICAgICAgICBuYW1lOiAn5Li95Li9JyxcclxuICAgICAgICB0aXRsZTogJ+WTiOWTiOWTiOWTiOWTiCcsXHJcbiAgICAgICAgdGltZTogJzIwMTgtMDEtMDEnLFxyXG4gICAgICAgIHBlbzogJzEnXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICAvLyDnoI3ku7forrDlvZVcclxuICAgIGJhcmdpbmRhdGE6W1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW1nOiAnJyxcclxuICAgICAgICAgICAgbmFtZTogJ+adjueZvTEnLFxyXG4gICAgICAgICAgICB0YWc6ICcwJyxcclxuICAgICAgICAgICAgYmFyZ2lucHJpY2U6ICcyNTUwLjAwJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW1nOiAnJyxcclxuICAgICAgICAgICAgbmFtZTogJ+adjueZvTEnLFxyXG4gICAgICAgICAgICB0YWc6ICcwJyxcclxuICAgICAgICAgICAgYmFyZ2lucHJpY2U6ICcyNTUwLjAwJyxcclxuICAgICAgICB9LFxyXG4gICAgXSxcclxuICAgIGdvU3BlbGxEYXRhOiB7fSxcclxuICAgIC8vIOW3ruS7t+i/m+W6puadoVxyXG4gICAgQmFyZ2FpbmluZ0NvdW50OiA2MDAsIC8v5oC75YWxXHJcbiAgICBCYXJnYWluaW5nUmVjb3JkOiAyMDAsIC8v5bey56CNXHJcbiAgICBCYXJnYWluaW5nU3ByZWFkczogNDAwLCAvL+W3ruS7t1xyXG4gICAgcm93MTogXCJcIixcclxuICAgIC8vIOaVsOmHj+i/m+W6puadoVxyXG4gICAgY291bnRhbGw6IDUsIC8v5oC75YWxXHJcbiAgICBzaWdsZW51bTogMSwgLy8g5Y2V5LiqXHJcbiAgICBzdXJwbHVzOiAwLCAvLyDliankvZklXHJcbiAgICByb3cyOiAnJyxcclxuICAgIC8v5ZWG5ZOBXHJcbiAgICBmbG93RGF0YTogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICcxJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJy4uL2Fzc2V0cy9pbWFnZXMvaW5kZXhpbWcucG5nJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICcyJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJy4uL2Fzc2V0cy9pbWFnZXMvaW5kZXhpbWcucG5nJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICczJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJy4uL2Fzc2V0cy9pbWFnZXMvaW5kZXhpbWcucG5nJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICc0JyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJy4uL2Fzc2V0cy9pbWFnZXMvaW5kZXhpbWcucG5nJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICc1JyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJy4uL2Fzc2V0cy9pbWFnZXMvaW5kZXhpbWcucG5nJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICc2JyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJy4uL2Fzc2V0cy9pbWFnZXMvaW5kZXhpbWcucG5nJ1xyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgdGhpcy5zaGFyZVdYc2hvdyA9IGZhbHNlO1xyXG4gICAgY29uc29sZS5sb2coJ3RoaXMuZ29TcGVsbERhdGEnLHRoaXMuZ29TcGVsbERhdGEpO1xyXG4gICAgLy8g5beu5Lu36L+b5bqm5p2hdHR0dHR0dHR0dHR0dHR0dHR0dFxyXG4gICAgdmFyIGJhcmdpbmxpc3QgPSBbdGhpcy5CYXJnYWluaW5nUmVjb3JkLCB0aGlzLkJhcmdhaW5pbmdTcHJlYWRzLHRoaXMuQmFyZ2FpbmluZ0NvdW50XTtcclxuICAgIHZhciBtYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBiYXJnaW5saXN0ICk7ICAvLyDmib7lh7rmnIDlpKflgLxcclxuICAgIGNvbnNvbGUubG9nKCdtYXgnLG1heClcclxuICAgIHZhciB1bml0ID0gNjUwL21heDtcclxuICAgIGNvbnNvbGUubG9nKHVuaXQpXHJcbiAgICB0aGlzLnJvdzEgPSBiYXJnaW5saXN0WzBdICogdW5pdFxyXG4gICAgLy8g5pWw6YeP6L+b5bqm5p2hXHJcbiAgICBsZXQgbnVtID0gIHRoaXMuc2lnbGVudW0gXHJcbiAgICBsZXQgdG90YWwgPSB0aGlzLmNvdW50YWxsIFxyXG4gICAgaWYgKGlzTmFOKG51bSkgfHwgaXNOYU4odG90YWwpKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yb3cyID0gKE1hdGgucm91bmQobnVtIC8gdG90YWwgKiAxMDAwMCkgLyAxMDAuMDApICogMVxyXG4gICAgdGhpcy5zdXJwbHVzID0gKE1hdGgucm91bmQobnVtIC8gdG90YWwgKiAxMDAwMCkgLyAxMDAuMDApK1wiJVwiO1xyXG4gICAgLy8gdmFyIHVuaXQgPSAzODAvbWF4O1xyXG4gICAgLy8gXHJcbiAgICAvLyB0aGlzLnJvdzIgPSBiYXJnaW5saXN0WzBdICogdW5pdFxyXG5cclxuXHJcbiAgICAvLyB0aGlzLkdldFBlcmNlbnQodGhpcy5jb3VudGFsbCx0aGlzLnNpZ2xlbnVtKVxyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5HZXRQZXJjZW50KHRoaXMuY291bnRhbGwsdGhpcy5zaWdsZW51bSkpXHJcbiAgfVxyXG4gIG9uU2hvdygpe1xyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgICBHZXRQZXJjZW50KG51bSwgdG90YWwpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIOaxgueZvuWIhuavlFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibnVtXCI+5b2T5YmN5pWwPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ0b3RhbFwiPuaAu+aVsDwvcGFyYW0+XHJcbiAgICAgICAgbnVtID0gcGFyc2VGbG9hdChudW0pO1xyXG4gICAgICAgIHRvdGFsID0gcGFyc2VGbG9hdCh0b3RhbCk7XHJcbiAgICAgICAgaWYgKGlzTmFOKG51bSkgfHwgaXNOYU4odG90YWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIi1cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRvdGFsIDw9IDAgPyBcIjAlXCIgOiAoTWF0aC5yb3VuZChudW0gLyB0b3RhbCAqIDEwMDAwKSAvIDEwMC4wMCkrXCIlXCI7XHJcbiAgICB9LFxyXG4gICAgLy8g5by55qGG5pWw6YePICsrXHJcbiAgICBnZXRBZGQoKSB7XHJcbiAgICAgIHRoaXMuaW5wTnVtKys7XHJcbiAgICB9LFxyXG4gICAgLy8g5by55qGG5pWw6YePIC0tXHJcbiAgICBnZXRDdXREZG93bigpIHtcclxuICAgICAgaWYgKHRoaXMuaW5wTnVtID09PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaW5wTnVtLS07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiAqKioqKioqKioqKioqKioqKlxyXG4gICAgICovXHJcbiAgICAvLyDlnLDlnYAg5by556qXXHJcbiAgICBnZXRQcm91cChpdGVtKSB7XHJcbiAgICAgIHRoaXMuc2hvd1BvcHVwID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICAvLyDlhbPpl63lvLnnqpdcclxuICAgIGhpZGVQcm91cChlKSB7XHJcbiAgICAgIHRoaXMuc2hvd1BvcHVwID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gICAgLy8g5YiG5LqrIOW8ueeql1xyXG4gICAgZ2V0U2hhcmVQcm91cChpdGVtKSB7XHJcbiAgICAgIHRoaXMuc2hhcmVQb3B1cCA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgaGlkZFNoYXJlKGUpIHtcclxuICAgICAgLy8gICB0aGlzLnNoYXJlUG9wdXAgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICAgICAgLy8g5YiG5LqrXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZShvcHMpIHtcclxuICAgICAgaWYgKG9wcy5mcm9tID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgIC8vIOadpeiHqumhtemdouWGhei9rOWPkeaMiemSrlxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG9wcy50YXJnZXQpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0aXRsZTogJycsIC8vIOi9rOWPkeWQjiDmiYDmmL7npLrnmoR0aXRsZVxyXG4gICAgICAgIHBhdGg6ICcnLCAvLyDnm7jlr7nnmoTot6/lvoRcclxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgLy8g5oiQ5Yqf5ZCO6KaB5YGa55qE5LqL5oOFXHJcbiAgICAgICAgICB0aGlzLnNoYXJlUG9wdXAgPSBmYWxzZTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuc2hhcmVUaWNrZXRzWzBdKTtcclxuICAgICAgICAgIHd4LmdldFNoYXJlSW5mbyh7XHJcbiAgICAgICAgICAgIC8vIHNoYXJlVGlja2V0OiByZXMuc2hhcmVUaWNrZXRzWzBdLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgLy8g5YiG5Lqr5aSx6LSlXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgICAvL+afpeeci+aLvOWbolxyXG4gICAgZ2V0TG9va1NwZWxsTGlzdCgpIHtcclxuICAgICAgdGhpcy5zcGVsbExpc3QgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIC8v5YWz6Zet5ou85ZuiXHJcbiAgICBoaWRlU3BlbGwoKSB7XHJcbiAgICAgIHRoaXMuc3BlbGxMaXN0ID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgLy8g5Y+C5Yqg5ou85ZuiXHJcbiAgICBnb1RvUHV6emxlKGl0ZW0pIHtcclxuICAgICAgICBsZXQgcGVvSXRlbSA9IGl0ZW07XHJcbiAgICAgICAgbGV0IHNwZWxsb2JqID0ge307XHJcbiAgICAgICAgc3BlbGxvYmogPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IHBlb0l0ZW0ubmFtZSxcclxuICAgICAgICAgICAgaW1nOiBwZW9JdGVtLmltZyxcclxuICAgICAgICAgICAgcGVvbnVtOiBwZW9JdGVtLnBlb1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nb1NwZWxsRGF0YSA9IHNwZWxsb2JqO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ29TcGVsbERhdGEpO1xyXG4gICAgICAgIHRoaXMucHV6emxlSW5nID0gdHJ1ZTsgLy/kuKrkurrmi7zljZXlh7rnjrBcclxuICAgICAgICAvLyAgIHRoaXMuc3BlbGxMaXN0ID0gZmFsc2U7IC8vIOWFs+mXrVxyXG4gICAgfSxcclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgICAvL+WFs+mXreaLvOWNlVxyXG4gICAgaGlkZFNwZWxsKCkge1xyXG4gICAgICB0aGlzLnB1enpsZUluZyA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIGdvVG9QaW5EYW4oKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKDEyMyk7XHJcbiAgICAgIFxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogKioqKioqKioqKioqKioqKipcclxuICAgICAqL1xyXG5cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxufVxyXG4iXX0=