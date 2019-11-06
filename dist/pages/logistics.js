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

var ShopCart = function (_wepy$page) {
  _inherits(ShopCart, _wepy$page);

  function ShopCart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ShopCart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShopCart.__proto__ || Object.getPrototypeOf(ShopCart)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '物流信息'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      logistics: [{
        title: '您的服务单财务已退款，请您注意查收',
        time: '2017-04-01 12:00:00  ',
        flag: 0
      }, {
        title: '您的服务单退款申请业务主管已审核，等待财务确认  经办人：laijiarong',
        time: '2017-04-01 12:00:00  ',
        flag: 1
      }, {
        title: '您的服务单已提交退款申请',
        time: '2017-04-01 12:00:00  ',
        flag: 1
      }, {
        title: '您的服务单198014266的商品已收到',
        time: '2017-04-01 12:00:00  ',
        flag: 1
      }, {
        title: '您的服务单已审核通过，请将商品寄往售后部 经办人：李颖',
        time: '2017-04-01 12:00:00  ',
        flag: 1
      }]
    }, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onLoad',
    value: function onLoad(t) {
      (0, _ajax.ajax)({
        url: api.searchDeliver,
        data: {
          order_id: t.order_id
        }
      }).then(function (res) {
        return console.log(res);
      });
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/logistics'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2lzdGljcy5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJsb2dpc3RpY3MiLCJ0aXRsZSIsInRpbWUiLCJmbGFnIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZXZlbnRzIiwidCIsInVybCIsInNlYXJjaERlbGl2ZXIiLCJvcmRlcl9pZCIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVzIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFHcUJDLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxpQkFBVyxDQUNUO0FBQ0VDLGVBQU8sbUJBRFQ7QUFFRUMsY0FBTSx1QkFGUjtBQUdFQyxjQUFNO0FBSFIsT0FEUyxFQU1UO0FBQ0VGLGVBQ0UseUNBRko7QUFHRUMsY0FBTSx1QkFIUjtBQUlFQyxjQUFNO0FBSlIsT0FOUyxFQVlUO0FBQ0VGLGVBQU8sY0FEVDtBQUVFQyxjQUFNLHVCQUZSO0FBR0VDLGNBQU07QUFIUixPQVpTLEVBaUJUO0FBQ0VGLGVBQU8sc0JBRFQ7QUFFRUMsY0FBTSx1QkFGUjtBQUdFQyxjQUFNO0FBSFIsT0FqQlMsRUFzQlQ7QUFDRUYsZUFBTyw2QkFEVDtBQUVFQyxjQUFNLHVCQUZSO0FBR0VDLGNBQU07QUFIUixPQXRCUztBQUROLEssUUErQlBDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVSxFLFFBRVZDLE0sR0FBUyxFOzs7OzsyQkFDRkMsQyxFQUFHO0FBQ1Isc0JBQUs7QUFDSEMsYUFBS2hCLElBQUlpQixhQUROO0FBRUhWLGNBQU07QUFDSlcsb0JBQVVILEVBQUVHO0FBRFI7QUFGSCxPQUFMLEVBS0dDLElBTEgsQ0FLUTtBQUFBLGVBQU9DLFFBQVFDLEdBQVIsQ0FBWUMsR0FBWixDQUFQO0FBQUEsT0FMUjtBQU1EOzs7O0VBcERtQ0MsZUFBS0MsSTs7a0JBQXRCdEIsUSIsImZpbGUiOiJsb2dpc3RpY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnianmtYHkv6Hmga8nXHJcbiAgfTtcclxuXHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGxvZ2lzdGljczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICfmgqjnmoTmnI3liqHljZXotKLliqHlt7LpgIDmrL7vvIzor7fmgqjms6jmhI/mn6XmlLYnLFxyXG4gICAgICAgIHRpbWU6ICcyMDE3LTA0LTAxIDEyOjAwOjAwICAnLFxyXG4gICAgICAgIGZsYWc6IDBcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOlxyXG4gICAgICAgICAgJ+aCqOeahOacjeWKoeWNlemAgOasvueUs+ivt+S4muWKoeS4u+euoeW3suWuoeaguO+8jOetieW+hei0ouWKoeehruiupCAg57uP5Yqe5Lq677yabGFpamlhcm9uZycsXHJcbiAgICAgICAgdGltZTogJzIwMTctMDQtMDEgMTI6MDA6MDAgICcsXHJcbiAgICAgICAgZmxhZzogMVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICfmgqjnmoTmnI3liqHljZXlt7Lmj5DkuqTpgIDmrL7nlLPor7cnLFxyXG4gICAgICAgIHRpbWU6ICcyMDE3LTA0LTAxIDEyOjAwOjAwICAnLFxyXG4gICAgICAgIGZsYWc6IDFcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAn5oKo55qE5pyN5Yqh5Y2VMTk4MDE0MjY255qE5ZWG5ZOB5bey5pS25YiwJyxcclxuICAgICAgICB0aW1lOiAnMjAxNy0wNC0wMSAxMjowMDowMCAgJyxcclxuICAgICAgICBmbGFnOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ+aCqOeahOacjeWKoeWNleW3suWuoeaguOmAmui/h++8jOivt+WwhuWVhuWTgeWvhOW+gOWUruWQjumDqCDnu4/lip7kurrvvJrmnY7popYnLFxyXG4gICAgICAgIHRpbWU6ICcyMDE3LTA0LTAxIDEyOjAwOjAwICAnLFxyXG4gICAgICAgIGZsYWc6IDFcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7fTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbiAgb25Mb2FkKHQpIHtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5zZWFyY2hEZWxpdmVyLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgb3JkZXJfaWQ6IHQub3JkZXJfaWRcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4gY29uc29sZS5sb2cocmVzKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==