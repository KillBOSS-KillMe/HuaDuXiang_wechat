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
            partner_name: member_name,
            partner_tel: member_tel,
            partner_addr: member_addr
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnRuZXJJbnB1dC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJhZGRyZXNzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYmluZHN1Ym1pdCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIm1lbWJlcl9hZGRyIiwibWVtYmVyX25hbWUiLCJtZW1iZXJfdGVsIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJsZW5ndGgiLCJ1cmwiLCJhZGRQYXJ0bmVyIiwicGFydG5lcl9uYW1lIiwicGFydG5lcl90ZWwiLCJwYXJ0bmVyX2FkZHIiLCJ0aGVuIiwicmVzIiwiZGF0YXMiLCJtc2ciLCJ0aW1lciIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZUJhY2siLCJldmVudHMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBSXFCQyxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsZUFBUztBQURKLEssUUFJUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxDQURILEVBQ0s7QUFBQSw4QkFDa0NBLEVBQUVDLE1BQUYsQ0FBU0MsS0FEM0M7QUFBQSxZQUNOQyxXQURNLG1CQUNOQSxXQURNO0FBQUEsWUFDT0MsV0FEUCxtQkFDT0EsV0FEUDtBQUFBLFlBQ29CQyxVQURwQixtQkFDb0JBLFVBRHBCOztBQUVYLFlBQUcsQ0FBQ0QsV0FBSixFQUFpQjtBQUNmRSxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sT0FESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFHSixXQUFXSyxNQUFYLEtBQXNCLEVBQXpCLEVBQTZCO0FBQzNCSixhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sWUFESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFHLENBQUNOLFdBQUosRUFBaUI7QUFDZkcsYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPLE9BREk7QUFFWEMsa0JBQU07QUFGSyxXQUFiO0FBSUEsaUJBQU8sS0FBUDtBQUNEO0FBQ0Qsd0JBQUs7QUFDSEUsZUFBS3ZCLElBQUl3QixVQUROO0FBRUhqQixnQkFBTTtBQUNKa0IsMEJBQWNULFdBRFY7QUFFSlUseUJBQWFULFVBRlQ7QUFHSlUsMEJBQWNaO0FBSFY7QUFGSCxTQUFMLEVBT0dhLElBUEgsQ0FPUSxlQUFPO0FBQ2JWLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBT1MsSUFBSUMsS0FBSixDQUFVQyxHQUROO0FBRVhWLGtCQUFNO0FBRkssV0FBYjtBQUlBLGNBQUlXLFFBQVFDLFdBQVcsWUFBTTtBQUMzQmYsZUFBR2dCLFlBQUg7QUFDRCxXQUZXLEVBRVQsSUFGUyxDQUFaO0FBR0QsU0FmRDtBQWdCRDtBQXhDTyxLLFFBMkNWQyxNLEdBQVMsRTs7Ozs7NkJBQ0E7QUFDUCxXQUFLM0IsT0FBTCxHQUFnQixLQUFLNEIsT0FBTCxDQUFhQyxVQUFiLENBQXdCN0IsT0FBeEM7QUFDRDs7OzZCQUVRLENBQUU7Ozs7RUEvRHlCOEIsZUFBS0MsSTs7a0JBQXRCckMsUSIsImZpbGUiOiJwYXJ0bmVySW5wdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55Sz6K+35ZCI5LyZ5Lq6J1xyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBhZGRyZXNzOiAnJyxcclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgYmluZHN1Ym1pdChlKXtcclxuICAgICAgdmFyIHttZW1iZXJfYWRkciwgbWVtYmVyX25hbWUsIG1lbWJlcl90ZWx9ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgaWYoIW1lbWJlcl9uYW1lKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5aeT5ZCNJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYobWVtYmVyX3RlbC5sZW5ndGggIT09IDExKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5q2j56Gu55qE5omL5py65Y+356CBJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIW1lbWJlcl9hZGRyKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5Zyw5Z2AJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkuYWRkUGFydG5lcixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBwYXJ0bmVyX25hbWU6IG1lbWJlcl9uYW1lLFxyXG4gICAgICAgICAgcGFydG5lcl90ZWw6IG1lbWJlcl90ZWwsXHJcbiAgICAgICAgICBwYXJ0bmVyX2FkZHI6IG1lbWJlcl9hZGRyXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMubXNnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgfSwgMTAwMClcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLmFkZHJlc3MgPSAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuYWRkcmVzc1xyXG4gIH1cclxuXHJcbiAgb25Mb2FkKCkge31cclxufVxyXG4iXX0=