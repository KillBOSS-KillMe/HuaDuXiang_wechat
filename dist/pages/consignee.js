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
      navigationBarTitleText: '选择收货人'
    }, _this.data = {
      emptyFlag: '',
      address_list: []
    }, _this.components = {}, _this.computed = {}, _this.methods = {
      changeAddress: function changeAddress(item) {
        var app = this.$parent;
        app.globalData.orderInfo.address_info = item;
        wx.navigateBack();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {}
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      // 用户收货地址列表
      (0, _ajax.ajax)({
        url: api.addressList
      }).then(function (res) {
        _this2.address_list = res.datas.address_list;
        _this2.emptyFlag = res.datas.address_list.length ? 1 : 0;
        _this2.$apply();
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/consignee'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnNpZ25lZS5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImVtcHR5RmxhZyIsImFkZHJlc3NfbGlzdCIsImNvbXBvbmVudHMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJjaGFuZ2VBZGRyZXNzIiwiaXRlbSIsImFwcCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwib3JkZXJJbmZvIiwiYWRkcmVzc19pbmZvIiwid3giLCJuYXZpZ2F0ZUJhY2siLCJvcHRpb25zIiwidXJsIiwiYWRkcmVzc0xpc3QiLCJ0aGVuIiwicmVzIiwiZGF0YXMiLCJsZW5ndGgiLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUdxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGlCQUFXLEVBRE47QUFFTEMsb0JBQWM7QUFGVCxLLFFBSVBDLFUsR0FBYSxFLFFBQ2JDLFEsR0FBVyxFLFFBQ1hDLE8sR0FBVTtBQUNSQyxtQkFEUSx5QkFDTUMsSUFETixFQUNZO0FBQ2xCLFlBQUlDLE1BQU0sS0FBS0MsT0FBZjtBQUNBRCxZQUFJRSxVQUFKLENBQWVDLFNBQWYsQ0FBeUJDLFlBQXpCLEdBQXdDTCxJQUF4QztBQUNBTSxXQUFHQyxZQUFIO0FBQ0Q7QUFMTyxLOzs7OzsyQkFPSEMsTyxFQUFTLENBQUU7Ozs2QkFDUjtBQUFBOztBQUNSO0FBQ0Esc0JBQUs7QUFDSEMsYUFBS3JCLElBQUlzQjtBQUROLE9BQUwsRUFFR0MsSUFGSCxDQUVRLGVBQU87QUFDYixlQUFLaEIsWUFBTCxHQUFvQmlCLElBQUlDLEtBQUosQ0FBVWxCLFlBQTlCO0FBQ0EsZUFBS0QsU0FBTCxHQUFpQmtCLElBQUlDLEtBQUosQ0FBVWxCLFlBQVYsQ0FBdUJtQixNQUF2QixHQUFnQyxDQUFoQyxHQUFvQyxDQUFyRDtBQUNBLGVBQUtDLE1BQUw7QUFDRCxPQU5EO0FBT0Q7Ozs7RUEzQmdDQyxlQUFLQyxJOztrQkFBbkIzQixLIiwiZmlsZSI6ImNvbnNpZ25lZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mAieaLqeaUtui0p+S6uidcclxuICB9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICBlbXB0eUZsYWc6ICcnLFxyXG4gICAgYWRkcmVzc19saXN0OiBbXVxyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNoYW5nZUFkZHJlc3MoaXRlbSkge1xyXG4gICAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgICBhcHAuZ2xvYmFsRGF0YS5vcmRlckluZm8uYWRkcmVzc19pbmZvID0gaXRlbVxyXG4gICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgfVxyXG4gIH07XHJcbiAgb25Mb2FkKG9wdGlvbnMpIHt9XHJcbiAgb25TaG93ICgpIHtcclxuICAgIC8vIOeUqOaIt+aUtui0p+WcsOWdgOWIl+ihqFxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmFkZHJlc3NMaXN0XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMuYWRkcmVzc19saXN0ID0gcmVzLmRhdGFzLmFkZHJlc3NfbGlzdFxyXG4gICAgICB0aGlzLmVtcHR5RmxhZyA9IHJlcy5kYXRhcy5hZGRyZXNzX2xpc3QubGVuZ3RoID8gMSA6IDBcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19