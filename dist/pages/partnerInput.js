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
      navigationBarTitleText: '申请合伙人'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      address: ''
    }, _this.computed = {}, _this.methods = {
      bindsubmit: function bindsubmit(e) {
        var _e$detail$value = e.detail.value,
            member_addr = _e$detail$value.member_addr,
            member_name = _e$detail$value.member_name,
            member_tel = _e$detail$value.member_tel;

        if (!member_name) {
          wx.showToast({
            title: '请输入姓名',
            icon: 'none'
          });
          return false;
        }
        if (member_tel.length !== 11) {
          wx.showToast({
            title: '请输入正确的手机号码',
            icon: 'none'
          });
          return false;
        }
        if (!member_addr) {
          wx.showToast({
            title: '请输入地址',
            icon: 'none'
          });
          return false;
        }
        (0, _ajax.ajax)({
          url: api.addPartner,
          data: {
            member_name: member_name,
            member_tel: member_tel,
            member_addr: member_addr
          }
        }).then(function (res) {
          wx.showToast({
            title: res.datas.msg,
            icon: 'none'
          });
          var timer = setTimeout(function () {
            wx.navigateBack();
          }, 1000);
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onShow',
    value: function onShow() {
      this.address = this.$parent.globalData.address;
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/partnerInput'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnRuZXJJbnB1dC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJhZGRyZXNzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYmluZHN1Ym1pdCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIm1lbWJlcl9hZGRyIiwibWVtYmVyX25hbWUiLCJtZW1iZXJfdGVsIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJsZW5ndGgiLCJ1cmwiLCJhZGRQYXJ0bmVyIiwidGhlbiIsInJlcyIsImRhdGFzIiwibXNnIiwidGltZXIiLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiZXZlbnRzIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUlxQkMsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGVBQVM7QUFESixLLFFBSVBDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDR0MsQ0FESCxFQUNLO0FBQUEsOEJBQ2tDQSxFQUFFQyxNQUFGLENBQVNDLEtBRDNDO0FBQUEsWUFDTkMsV0FETSxtQkFDTkEsV0FETTtBQUFBLFlBQ09DLFdBRFAsbUJBQ09BLFdBRFA7QUFBQSxZQUNvQkMsVUFEcEIsbUJBQ29CQSxVQURwQjs7QUFFWCxZQUFHLENBQUNELFdBQUosRUFBaUI7QUFDZkUsYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPLE9BREk7QUFFWEMsa0JBQU07QUFGSyxXQUFiO0FBSUEsaUJBQU8sS0FBUDtBQUNEO0FBQ0QsWUFBR0osV0FBV0ssTUFBWCxLQUFzQixFQUF6QixFQUE2QjtBQUMzQkosYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPLFlBREk7QUFFWEMsa0JBQU07QUFGSyxXQUFiO0FBSUEsaUJBQU8sS0FBUDtBQUNEO0FBQ0QsWUFBRyxDQUFDTixXQUFKLEVBQWlCO0FBQ2ZHLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxPQURJO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlBLGlCQUFPLEtBQVA7QUFDRDtBQUNELHdCQUFLO0FBQ0hFLGVBQUt2QixJQUFJd0IsVUFETjtBQUVIakIsZ0JBQU07QUFDSlMsb0NBREk7QUFFSkMsa0NBRkk7QUFHSkY7QUFISTtBQUZILFNBQUwsRUFPR1UsSUFQSCxDQU9RLGVBQU87QUFDYlAsYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPTSxJQUFJQyxLQUFKLENBQVVDLEdBRE47QUFFWFAsa0JBQU07QUFGSyxXQUFiO0FBSUEsY0FBSVEsUUFBUUMsV0FBVyxZQUFNO0FBQzNCWixlQUFHYSxZQUFIO0FBQ0QsV0FGVyxFQUVULElBRlMsQ0FBWjtBQUdELFNBZkQ7QUFnQkQ7QUF4Q08sSyxRQTJDVkMsTSxHQUFTLEU7Ozs7OzZCQUNBO0FBQ1AsV0FBS3hCLE9BQUwsR0FBZ0IsS0FBS3lCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QjFCLE9BQXhDO0FBQ0Q7Ozs2QkFFUSxDQUFFOzs7O0VBL0R5QjJCLGVBQUtDLEk7O2tCQUF0QmxDLFEiLCJmaWxlIjoicGFydG5lcklucHV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eUs+ivt+WQiOS8meS6uidcclxuICB9O1xyXG5cclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgYWRkcmVzczogJycsXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGJpbmRzdWJtaXQoZSl7XHJcbiAgICAgIHZhciB7bWVtYmVyX2FkZHIsIG1lbWJlcl9uYW1lLCBtZW1iZXJfdGVsfSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIGlmKCFtZW1iZXJfbmFtZSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeWnk+WQjScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGlmKG1lbWJlcl90ZWwubGVuZ3RoICE9PSAxMSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPt+eggScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGlmKCFtZW1iZXJfYWRkcikge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeWcsOWdgCcsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLmFkZFBhcnRuZXIsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgbWVtYmVyX25hbWUsXHJcbiAgICAgICAgICBtZW1iZXJfdGVsLFxyXG4gICAgICAgICAgbWVtYmVyX2FkZHJcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5tc2csXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG4gIG9uU2hvdygpIHtcclxuICAgIHRoaXMuYWRkcmVzcyA9ICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5hZGRyZXNzXHJcbiAgfVxyXG5cclxuICBvbkxvYWQoKSB7fVxyXG59XHJcbiJdfQ==