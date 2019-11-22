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
        var _this2 = this;

        var app = this.$parent;
        var cart_id = app.globalData.orderInfo.cart_id;
        (0, _ajax.ajax)({
          url: api.memberBuyOne,
          data: {
            cart_id: cart_id,
            address_id: item.address_id
          }
        }).then(function (res) {
          if (res.code == 200) {
            res.datas.cart_id = cart_id;
            app.globalData.orderInfo = res.datas;
            var page = _this2.getCurrentPages();
            var route = page[page.length - 2].route;
            if (route == 'pages/settlement') {
              wx.navigateBack();
            } else {
              wx.redirectTo({
                url: '/pages/settlement'
              });
            }
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {}
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this3 = this;

      // 用户收货地址列表
      (0, _ajax.ajax)({
        url: api.addressList
      }).then(function (res) {
        _this3.address_list = res.datas.address_list;
        _this3.emptyFlag = res.datas.address_list.length ? 1 : 0;
        _this3.$apply();
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/consignee'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnNpZ25lZS5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImVtcHR5RmxhZyIsImFkZHJlc3NfbGlzdCIsImNvbXBvbmVudHMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJjaGFuZ2VBZGRyZXNzIiwiaXRlbSIsImFwcCIsIiRwYXJlbnQiLCJjYXJ0X2lkIiwiZ2xvYmFsRGF0YSIsIm9yZGVySW5mbyIsInVybCIsIm1lbWJlckJ1eU9uZSIsImFkZHJlc3NfaWQiLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwicGFnZSIsImdldEN1cnJlbnRQYWdlcyIsInJvdXRlIiwibGVuZ3RoIiwid3giLCJuYXZpZ2F0ZUJhY2siLCJyZWRpcmVjdFRvIiwib3B0aW9ucyIsImFkZHJlc3NMaXN0IiwiJGFwcGx5Iiwid2VweSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUdxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGlCQUFXLEVBRE47QUFFTEMsb0JBQWM7QUFGVCxLLFFBSVBDLFUsR0FBYSxFLFFBQ2JDLFEsR0FBVyxFLFFBQ1hDLE8sR0FBVTtBQUNSQyxtQkFEUSx5QkFDTUMsSUFETixFQUNZO0FBQUE7O0FBQ2xCLFlBQUlDLE1BQU0sS0FBS0MsT0FBZjtBQUNBLFlBQUlDLFVBQVVGLElBQUlHLFVBQUosQ0FBZUMsU0FBZixDQUF5QkYsT0FBdkM7QUFDQSx3QkFBSztBQUNIRyxlQUFLbEIsSUFBSW1CLFlBRE47QUFFSGQsZ0JBQU07QUFDSlUsNEJBREk7QUFFSkssd0JBQVlSLEtBQUtRO0FBRmI7QUFGSCxTQUFMLEVBTUdDLElBTkgsQ0FNUSxlQUFPO0FBQ2IsY0FBR0MsSUFBSUMsSUFBSixJQUFZLEdBQWYsRUFBb0I7QUFDbEJELGdCQUFJRSxLQUFKLENBQVVULE9BQVYsR0FBb0JBLE9BQXBCO0FBQ0FGLGdCQUFJRyxVQUFKLENBQWVDLFNBQWYsR0FBMkJLLElBQUlFLEtBQS9CO0FBQ0EsZ0JBQUlDLE9BQU8sT0FBS0MsZUFBTCxFQUFYO0FBQ0EsZ0JBQUlDLFFBQVFGLEtBQUtBLEtBQUtHLE1BQUwsR0FBYyxDQUFuQixFQUFzQkQsS0FBbEM7QUFDQSxnQkFBR0EsU0FBUyxrQkFBWixFQUFnQztBQUM5QkUsaUJBQUdDLFlBQUg7QUFDRCxhQUZELE1BRU87QUFDTEQsaUJBQUdFLFVBQUgsQ0FBYztBQUNaYixxQkFBSztBQURPLGVBQWQ7QUFHRDtBQUNGO0FBQ0YsU0FwQkQ7QUFxQkQ7QUF6Qk8sSzs7Ozs7MkJBMkJIYyxPLEVBQVMsQ0FBRTs7OzZCQUNSO0FBQUE7O0FBRVI7QUFDQSxzQkFBSztBQUNIZCxhQUFLbEIsSUFBSWlDO0FBRE4sT0FBTCxFQUVHWixJQUZILENBRVEsZUFBTztBQUNiLGVBQUtkLFlBQUwsR0FBb0JlLElBQUlFLEtBQUosQ0FBVWpCLFlBQTlCO0FBQ0EsZUFBS0QsU0FBTCxHQUFpQmdCLElBQUlFLEtBQUosQ0FBVWpCLFlBQVYsQ0FBdUJxQixNQUF2QixHQUFnQyxDQUFoQyxHQUFvQyxDQUFyRDtBQUNBLGVBQUtNLE1BQUw7QUFDRCxPQU5EO0FBT0Q7Ozs7RUFoRGdDQyxlQUFLVixJOztrQkFBbkJ2QixLIiwiZmlsZSI6ImNvbnNpZ25lZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mAieaLqeaUtui0p+S6uidcclxuICB9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICBlbXB0eUZsYWc6ICcnLFxyXG4gICAgYWRkcmVzc19saXN0OiBbXVxyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNoYW5nZUFkZHJlc3MoaXRlbSkge1xyXG4gICAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgICB2YXIgY2FydF9pZCA9IGFwcC5nbG9iYWxEYXRhLm9yZGVySW5mby5jYXJ0X2lkXHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLm1lbWJlckJ1eU9uZSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBjYXJ0X2lkLFxyXG4gICAgICAgICAgYWRkcmVzc19pZDogaXRlbS5hZGRyZXNzX2lkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICByZXMuZGF0YXMuY2FydF9pZCA9IGNhcnRfaWRcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLm9yZGVySW5mbyA9IHJlcy5kYXRhc1xyXG4gICAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLmdldEN1cnJlbnRQYWdlcygpXHJcbiAgICAgICAgICB2YXIgcm91dGUgPSBwYWdlW3BhZ2UubGVuZ3RoIC0gMl0ucm91dGVcclxuICAgICAgICAgIGlmKHJvdXRlID09ICdwYWdlcy9zZXR0bGVtZW50Jykge1xyXG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3NldHRsZW1lbnQnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH07XHJcbiAgb25Mb2FkKG9wdGlvbnMpIHt9XHJcbiAgb25TaG93ICgpIHtcclxuICAgIFxyXG4gICAgLy8g55So5oi35pS26LSn5Zyw5Z2A5YiX6KGoXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuYWRkcmVzc0xpc3RcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5hZGRyZXNzX2xpc3QgPSByZXMuZGF0YXMuYWRkcmVzc19saXN0XHJcbiAgICAgIHRoaXMuZW1wdHlGbGFnID0gcmVzLmRhdGFzLmFkZHJlc3NfbGlzdC5sZW5ndGggPyAxIDogMFxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=