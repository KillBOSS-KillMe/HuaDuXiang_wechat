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
        app.globalData.address = item;
        if (app.globalData.orderInfo) {
          app.globalData.orderInfo.address_info = item;
        }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnNpZ25lZS5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImVtcHR5RmxhZyIsImFkZHJlc3NfbGlzdCIsImNvbXBvbmVudHMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJjaGFuZ2VBZGRyZXNzIiwiaXRlbSIsImFwcCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiYWRkcmVzcyIsIm9yZGVySW5mbyIsImFkZHJlc3NfaW5mbyIsInd4IiwibmF2aWdhdGVCYWNrIiwib3B0aW9ucyIsInVybCIsImFkZHJlc3NMaXN0IiwidGhlbiIsInJlcyIsImRhdGFzIiwibGVuZ3RoIiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFHcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxpQkFBVyxFQUROO0FBRUxDLG9CQUFjO0FBRlQsSyxRQUlQQyxVLEdBQWEsRSxRQUNiQyxRLEdBQVcsRSxRQUNYQyxPLEdBQVU7QUFDUkMsbUJBRFEseUJBQ01DLElBRE4sRUFDWTtBQUNsQixZQUFJQyxNQUFNLEtBQUtDLE9BQWY7QUFDQUQsWUFBSUUsVUFBSixDQUFlQyxPQUFmLEdBQXlCSixJQUF6QjtBQUNBLFlBQUdDLElBQUlFLFVBQUosQ0FBZUUsU0FBbEIsRUFBNkI7QUFDM0JKLGNBQUlFLFVBQUosQ0FBZUUsU0FBZixDQUF5QkMsWUFBekIsR0FBd0NOLElBQXhDO0FBQ0Q7QUFDRE8sV0FBR0MsWUFBSDtBQUNEO0FBUk8sSzs7Ozs7MkJBVUhDLE8sRUFBUyxDQUFFOzs7NkJBQ1I7QUFBQTs7QUFDUjtBQUNBLHNCQUFLO0FBQ0hDLGFBQUt0QixJQUFJdUI7QUFETixPQUFMLEVBRUdDLElBRkgsQ0FFUSxlQUFPO0FBQ2IsZUFBS2pCLFlBQUwsR0FBb0JrQixJQUFJQyxLQUFKLENBQVVuQixZQUE5QjtBQUNBLGVBQUtELFNBQUwsR0FBaUJtQixJQUFJQyxLQUFKLENBQVVuQixZQUFWLENBQXVCb0IsTUFBdkIsR0FBZ0MsQ0FBaEMsR0FBb0MsQ0FBckQ7QUFDQSxlQUFLQyxNQUFMO0FBQ0QsT0FORDtBQU9EOzs7O0VBOUJnQ0MsZUFBS0MsSTs7a0JBQW5CNUIsSyIsImZpbGUiOiJjb25zaWduZWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpgInmi6nmlLbotKfkuronXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgZW1wdHlGbGFnOiAnJyxcclxuICAgIGFkZHJlc3NfbGlzdDogW11cclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjaGFuZ2VBZGRyZXNzKGl0ZW0pIHtcclxuICAgICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgICAgYXBwLmdsb2JhbERhdGEuYWRkcmVzcyA9IGl0ZW1cclxuICAgICAgaWYoYXBwLmdsb2JhbERhdGEub3JkZXJJbmZvKSB7XHJcbiAgICAgICAgYXBwLmdsb2JhbERhdGEub3JkZXJJbmZvLmFkZHJlc3NfaW5mbyA9IGl0ZW1cclxuICAgICAgfVxyXG4gICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgfVxyXG4gIH07XHJcbiAgb25Mb2FkKG9wdGlvbnMpIHt9XHJcbiAgb25TaG93ICgpIHtcclxuICAgIC8vIOeUqOaIt+aUtui0p+WcsOWdgOWIl+ihqFxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmFkZHJlc3NMaXN0XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMuYWRkcmVzc19saXN0ID0gcmVzLmRhdGFzLmFkZHJlc3NfbGlzdFxyXG4gICAgICB0aGlzLmVtcHR5RmxhZyA9IHJlcy5kYXRhcy5hZGRyZXNzX2xpc3QubGVuZ3RoID8gMSA6IDBcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19