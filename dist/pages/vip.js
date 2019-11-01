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
      navigationBarTitleText: '会员中心'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      gradeArr: [{ title: '普通会员' }, { title: '银卡会员' }, { title: '金卡会员' }, { title: '钻石会员' }],
      active: 3,
      bgImg: 'image37.png',
      menberExplain: [{
        membername: '普通会员',
        menberintroduce: '只参与积分和充值, 只要关注公众号即可成为普通会员'
      }, {
        membername: '银卡会员',
        menberintroduce: '普通会员累计消费满1000元或者一次性充值满500元即可成为银卡会员,全场商品享受98折优惠'
      }, {
        membername: '金卡会员',
        menberintroduce: '普通会员累计消费满500元或者一次性充值满3000元; \n 银卡会员一次性充值2500元挥着累计充值5000元即可成为金卡会员,全场商品享受9,5折优惠'
      }, {
        membername: '钻石会员',
        menberintroduce: '普通会员累计消费20000元或者一次性充值满10000元; \n 金卡会员补充7500元, 普通会员累计充值20000元即可成为钻石会员, 全场商品享受9折优惠; \n 同时不定期推出针对钻石会员的劲爆活动.'
      }],
      member_info: null,
      member_data: null
    }, _this.computed = {}, _this.events = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {}
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      // 用户个人中心数据接口
      (0, _ajax.ajax)({
        url: api.memberInfo
      }).then(function (res) {
        if (res.code == 200) {
          _this2.member_info = res.datas.member_info;
          _this2.member_data = res.datas.member_data;
          switch (res.datas.member_info.level) {
            case 0:
              _this2.bgImg = 'image37.png';
              break;
            case 1:
              _this2.bgImg = 'image38.png';
              break;
            case 2:
              _this2.bgImg = 'image39.png';
              break;
            case 3:
              _this2.bgImg = 'image34.png';
              break;
          }
          _this2.$apply();
        }
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/vip'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpcC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJncmFkZUFyciIsInRpdGxlIiwiYWN0aXZlIiwiYmdJbWciLCJtZW5iZXJFeHBsYWluIiwibWVtYmVybmFtZSIsIm1lbmJlcmludHJvZHVjZSIsIm1lbWJlcl9pbmZvIiwibWVtYmVyX2RhdGEiLCJjb21wdXRlZCIsImV2ZW50cyIsIm1ldGhvZHMiLCJvcHRpb25zIiwidXJsIiwibWVtYmVySW5mbyIsInRoZW4iLCJyZXMiLCJjb2RlIiwiZGF0YXMiLCJsZXZlbCIsIiRhcHBseSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBR3FCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FDUixFQUFFQyxPQUFPLE1BQVQsRUFEUSxFQUVSLEVBQUVBLE9BQU8sTUFBVCxFQUZRLEVBR1IsRUFBRUEsT0FBTyxNQUFULEVBSFEsRUFJUixFQUFFQSxPQUFPLE1BQVQsRUFKUSxDQURMO0FBT0xDLGNBQVEsQ0FQSDtBQVFMQyxhQUFPLGFBUkY7QUFTTEMscUJBQWUsQ0FDYjtBQUNFQyxvQkFBWSxNQURkO0FBRUVDLHlCQUFpQjtBQUZuQixPQURhLEVBS2I7QUFDRUQsb0JBQVksTUFEZDtBQUVFQyx5QkFDRTtBQUhKLE9BTGEsRUFVYjtBQUNFRCxvQkFBWSxNQURkO0FBRUVDLHlCQUNFO0FBSEosT0FWYSxFQWViO0FBQ0VELG9CQUFZLE1BRGQ7QUFFRUMseUJBQ0U7QUFISixPQWZhLENBVFY7QUE4QkxDLG1CQUFhLElBOUJSO0FBK0JMQyxtQkFBYTtBQS9CUixLLFFBa0NQQyxRLEdBQVcsRSxRQUVYQyxNLEdBQVMsRSxRQWlDVEMsTyxHQUFVLEU7Ozs7OzJCQS9CSEMsTyxFQUFTLENBRWY7Ozs2QkFFTztBQUFBOztBQUNMO0FBQ0Qsc0JBQUs7QUFDSEMsYUFBS3JCLElBQUlzQjtBQUROLE9BQUwsRUFFR0MsSUFGSCxDQUVRLGVBQU87QUFDYixZQUFHQyxJQUFJQyxJQUFKLElBQVksR0FBZixFQUFvQjtBQUNsQixpQkFBS1YsV0FBTCxHQUFtQlMsSUFBSUUsS0FBSixDQUFVWCxXQUE3QjtBQUNBLGlCQUFLQyxXQUFMLEdBQW1CUSxJQUFJRSxLQUFKLENBQVVWLFdBQTdCO0FBQ0Esa0JBQVFRLElBQUlFLEtBQUosQ0FBVVgsV0FBVixDQUFzQlksS0FBOUI7QUFDRSxpQkFBSyxDQUFMO0FBQ0UscUJBQUtoQixLQUFMLEdBQWEsYUFBYjtBQUNBO0FBQ0YsaUJBQUssQ0FBTDtBQUNFLHFCQUFLQSxLQUFMLEdBQWEsYUFBYjtBQUNBO0FBQ0YsaUJBQUssQ0FBTDtBQUNFLHFCQUFLQSxLQUFMLEdBQWEsYUFBYjtBQUNBO0FBQ0YsaUJBQUssQ0FBTDtBQUNFLHFCQUFLQSxLQUFMLEdBQWEsYUFBYjtBQUNBO0FBWko7QUFjQSxpQkFBS2lCLE1BQUw7QUFDRDtBQUNGLE9BdEJEO0FBdUJEOzs7O0VBM0VnQ0MsZUFBS0MsSTs7a0JBQW5CNUIsSyIsImZpbGUiOiJ2aXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvJrlkZjkuK3lv4MnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgZ3JhZGVBcnI6IFtcclxuICAgICAgeyB0aXRsZTogJ+aZrumAmuS8muWRmCcgfSxcclxuICAgICAgeyB0aXRsZTogJ+mTtuWNoeS8muWRmCcgfSxcclxuICAgICAgeyB0aXRsZTogJ+mHkeWNoeS8muWRmCcgfSxcclxuICAgICAgeyB0aXRsZTogJ+mSu+efs+S8muWRmCcgfVxyXG4gICAgXSxcclxuICAgIGFjdGl2ZTogMyxcclxuICAgIGJnSW1nOiAnaW1hZ2UzNy5wbmcnLFxyXG4gICAgbWVuYmVyRXhwbGFpbjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgbWVtYmVybmFtZTogJ+aZrumAmuS8muWRmCcsXHJcbiAgICAgICAgbWVuYmVyaW50cm9kdWNlOiAn5Y+q5Y+C5LiO56ev5YiG5ZKM5YWF5YC8LCDlj6ropoHlhbPms6jlhazkvJflj7fljbPlj6/miJDkuLrmma7pgJrkvJrlkZgnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBtZW1iZXJuYW1lOiAn6ZO25Y2h5Lya5ZGYJyxcclxuICAgICAgICBtZW5iZXJpbnRyb2R1Y2U6XHJcbiAgICAgICAgICAn5pmu6YCa5Lya5ZGY57Sv6K6h5raI6LS55ruhMTAwMOWFg+aIluiAheS4gOasoeaAp+WFheWAvOa7oTUwMOWFg+WNs+WPr+aIkOS4uumTtuWNoeS8muWRmCzlhajlnLrllYblk4Hkuqvlj5c5OOaKmOS8mOaDoCdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG1lbWJlcm5hbWU6ICfph5HljaHkvJrlkZgnLFxyXG4gICAgICAgIG1lbmJlcmludHJvZHVjZTpcclxuICAgICAgICAgICfmma7pgJrkvJrlkZjntK/orqHmtojotLnmu6E1MDDlhYPmiJbogIXkuIDmrKHmgKflhYXlgLzmu6EzMDAw5YWDOyBcXG4g6ZO25Y2h5Lya5ZGY5LiA5qyh5oCn5YWF5YC8MjUwMOWFg+aMpeedgOe0r+iuoeWFheWAvDUwMDDlhYPljbPlj6/miJDkuLrph5HljaHkvJrlkZgs5YWo5Zy65ZWG5ZOB5Lqr5Y+XOSw15oqY5LyY5oOgJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgbWVtYmVybmFtZTogJ+mSu+efs+S8muWRmCcsXHJcbiAgICAgICAgbWVuYmVyaW50cm9kdWNlOlxyXG4gICAgICAgICAgJ+aZrumAmuS8muWRmOe0r+iuoea2iOi0uTIwMDAw5YWD5oiW6ICF5LiA5qyh5oCn5YWF5YC85ruhMTAwMDDlhYM7IFxcbiDph5HljaHkvJrlkZjooaXlhYU3NTAw5YWDLCDmma7pgJrkvJrlkZjntK/orqHlhYXlgLwyMDAwMOWFg+WNs+WPr+aIkOS4uumSu+efs+S8muWRmCwg5YWo5Zy65ZWG5ZOB5Lqr5Y+XOeaKmOS8mOaDoDsgXFxuIOWQjOaXtuS4jeWumuacn+aOqOWHuumSiOWvuemSu+efs+S8muWRmOeahOWKsueIhua0u+WKqC4nXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBtZW1iZXJfaW5mbzogbnVsbCxcclxuICAgIG1lbWJlcl9kYXRhOiBudWxsLFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBvblNob3coKXtcclxuICAgICAvLyDnlKjmiLfkuKrkurrkuK3lv4PmlbDmja7mjqXlj6NcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5tZW1iZXJJbmZvLFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICB0aGlzLm1lbWJlcl9pbmZvID0gcmVzLmRhdGFzLm1lbWJlcl9pbmZvXHJcbiAgICAgICAgdGhpcy5tZW1iZXJfZGF0YSA9IHJlcy5kYXRhcy5tZW1iZXJfZGF0YVxyXG4gICAgICAgIHN3aXRjaCAocmVzLmRhdGFzLm1lbWJlcl9pbmZvLmxldmVsKSB7XHJcbiAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIHRoaXMuYmdJbWcgPSAnaW1hZ2UzNy5wbmcnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgdGhpcy5iZ0ltZyA9ICdpbWFnZTM4LnBuZyc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICB0aGlzLmJnSW1nID0gJ2ltYWdlMzkucG5nJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIHRoaXMuYmdJbWcgPSAnaW1hZ2UzNC5wbmcnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgbWV0aG9kcyA9IHt9O1xyXG59XHJcbiJdfQ==