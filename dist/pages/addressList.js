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
      navigationBarTitleText: '地址'
    }, _this.data = {
      emptyFlag: null,
      address_list: []
    }, _this.components = {}, _this.computed = {}, _this.methods = {
      // 删除地址
      deleAddress: function deleAddress(address_id) {
        var that = this;
        wx.showModal({
          title: '提示',
          content: '确定删除地址？',
          success: function success(res) {
            if (res.confirm) {
              (0, _ajax.ajax)({
                url: api.addressDel,
                data: {
                  address_id: address_id
                }
              }).then(function (res) {
                if (res.datas.state == 1) {
                  wx.showToast({
                    title: res.datas.msg
                  });
                  that.address_list = that.address_list.filter(function (item) {
                    return item.address_id != address_id;
                  });
                  that.$apply();
                } else {
                  wx.showToast({
                    title: res.datas.msg,
                    icon: 'none'
                  });
                }
              });
            }
          }
        });
      },

      // 设为默认地址
      setAddress: function setAddress(address_id) {
        // addressSetdefault
        var that = this;
        wx.showModal({
          title: '提示',
          content: '确定设置为默认地址？',
          success: function success(res) {
            if (res.confirm) {
              (0, _ajax.ajax)({
                url: api.addressSetdefault,
                data: {
                  address_id: address_id
                }
              }).then(function (res) {
                console.log(res);
                if (res.datas.state == 1) {
                  wx.showToast({
                    title: res.msg
                  });
                  that.onShow();
                }
              });
            }
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {}
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/addressList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3NMaXN0LmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZW1wdHlGbGFnIiwiYWRkcmVzc19saXN0IiwiY29tcG9uZW50cyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImRlbGVBZGRyZXNzIiwiYWRkcmVzc19pZCIsInRoYXQiLCJ3eCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwidXJsIiwiYWRkcmVzc0RlbCIsInRoZW4iLCJkYXRhcyIsInN0YXRlIiwic2hvd1RvYXN0IiwibXNnIiwiZmlsdGVyIiwiaXRlbSIsIiRhcHBseSIsImljb24iLCJzZXRBZGRyZXNzIiwiYWRkcmVzc1NldGRlZmF1bHQiLCJjb25zb2xlIiwibG9nIiwib25TaG93IiwiYWRkcmVzc0xpc3QiLCJsZW5ndGgiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUdxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGlCQUFXLElBRE47QUFFTEMsb0JBQWM7QUFGVCxLLFFBSVBDLFUsR0FBYSxFLFFBQ2JDLFEsR0FBVyxFLFFBQ1hDLE8sR0FBVTtBQUNSO0FBQ0FDLGlCQUZRLHVCQUVJQyxVQUZKLEVBRWdCO0FBQ3RCLFlBQUlDLE9BQU8sSUFBWDtBQUNBQyxXQUFHQyxTQUFILENBQWE7QUFDWEMsaUJBQU8sSUFESTtBQUVYQyxtQkFBUyxTQUZFO0FBR1hDLGlCQUhXLG1CQUdIQyxHQUhHLEVBR0U7QUFDWCxnQkFBSUEsSUFBSUMsT0FBUixFQUFpQjtBQUNmLDhCQUFLO0FBQ0hDLHFCQUFLckIsSUFBSXNCLFVBRE47QUFFSGpCLHNCQUFNO0FBQ0pPO0FBREk7QUFGSCxlQUFMLEVBS0dXLElBTEgsQ0FLUSxlQUFPO0FBQ2Isb0JBQUdKLElBQUlLLEtBQUosQ0FBVUMsS0FBVixJQUFtQixDQUF0QixFQUF5QjtBQUN2QlgscUJBQUdZLFNBQUgsQ0FBYTtBQUNYViwyQkFBT0csSUFBSUssS0FBSixDQUFVRztBQUROLG1CQUFiO0FBR0FkLHVCQUFLTixZQUFMLEdBQW9CTSxLQUFLTixZQUFMLENBQWtCcUIsTUFBbEIsQ0FBeUI7QUFBQSwyQkFBUUMsS0FBS2pCLFVBQUwsSUFBbUJBLFVBQTNCO0FBQUEsbUJBQXpCLENBQXBCO0FBQ0FDLHVCQUFLaUIsTUFBTDtBQUNELGlCQU5ELE1BTU87QUFDSmhCLHFCQUFHWSxTQUFILENBQWE7QUFDWlYsMkJBQU9HLElBQUlLLEtBQUosQ0FBVUcsR0FETDtBQUVaSSwwQkFBTTtBQUZNLG1CQUFiO0FBSUY7QUFDRixlQWxCRDtBQW1CRDtBQUNGO0FBekJVLFNBQWI7QUEyQkQsT0EvQk87O0FBZ0NSO0FBQ0FDLGdCQWpDUSxzQkFpQ0dwQixVQWpDSCxFQWlDZTtBQUNyQjtBQUNBLFlBQUlDLE9BQU8sSUFBWDtBQUNBQyxXQUFHQyxTQUFILENBQWE7QUFDWEMsaUJBQU8sSUFESTtBQUVYQyxtQkFBUyxZQUZFO0FBR1hDLGlCQUhXLG1CQUdIQyxHQUhHLEVBR0U7QUFDWCxnQkFBSUEsSUFBSUMsT0FBUixFQUFpQjtBQUNmLDhCQUFLO0FBQ0hDLHFCQUFLckIsSUFBSWlDLGlCQUROO0FBRUg1QixzQkFBTTtBQUNKTztBQURJO0FBRkgsZUFBTCxFQUtHVyxJQUxILENBS1EsZUFBTztBQUNiVyx3QkFBUUMsR0FBUixDQUFZaEIsR0FBWjtBQUNBLG9CQUFHQSxJQUFJSyxLQUFKLENBQVVDLEtBQVYsSUFBbUIsQ0FBdEIsRUFBeUI7QUFDdkJYLHFCQUFHWSxTQUFILENBQWE7QUFDWFYsMkJBQU9HLElBQUlRO0FBREEsbUJBQWI7QUFHQWQsdUJBQUt1QixNQUFMO0FBQ0Q7QUFDRixlQWJEO0FBY0Q7QUFDRjtBQXBCVSxTQUFiO0FBc0JEO0FBMURPLEs7Ozs7OzZCQTRERCxDQUFFOzs7NkJBQ0Y7QUFBQTs7QUFDUDtBQUNBLHNCQUFLO0FBQ0hmLGFBQUtyQixJQUFJcUM7QUFETixPQUFMLEVBRUdkLElBRkgsQ0FFUSxlQUFPO0FBQ2IsZUFBS2hCLFlBQUwsR0FBb0JZLElBQUlLLEtBQUosQ0FBVWpCLFlBQTlCO0FBQ0EsZUFBS0QsU0FBTCxHQUFpQmEsSUFBSUssS0FBSixDQUFVakIsWUFBVixDQUF1QitCLE1BQXZCLEdBQWdDLENBQWhDLEdBQW9DLENBQXJEO0FBQ0EsZUFBS1IsTUFBTDtBQUNELE9BTkQ7QUFRRDs7OztFQWpGZ0NTLGVBQUtDLEk7O2tCQUFuQnRDLEsiLCJmaWxlIjoiYWRkcmVzc0xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflnLDlnYAnXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgZW1wdHlGbGFnOiBudWxsLFxyXG4gICAgYWRkcmVzc19saXN0OiBbXVxyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOWIoOmZpOWcsOWdgFxyXG4gICAgZGVsZUFkZHJlc3MoYWRkcmVzc19pZCkge1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgY29udGVudDogJ+ehruWumuWIoOmZpOWcsOWdgO+8nycsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICBhamF4KHtcclxuICAgICAgICAgICAgICB1cmw6IGFwaS5hZGRyZXNzRGVsLFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGFkZHJlc3NfaWRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICBpZihyZXMuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5tc2dcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFkZHJlc3NfbGlzdCA9IHRoYXQuYWRkcmVzc19saXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uYWRkcmVzc19pZCAhPSBhZGRyZXNzX2lkIClcclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMubXNnLFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy8g6K6+5Li66buY6K6k5Zyw5Z2AXHJcbiAgICBzZXRBZGRyZXNzKGFkZHJlc3NfaWQpIHtcclxuICAgICAgLy8gYWRkcmVzc1NldGRlZmF1bHRcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICBjb250ZW50OiAn56Gu5a6a6K6+572u5Li66buY6K6k5Zyw5Z2A77yfJyxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgICAgIHVybDogYXBpLmFkZHJlc3NTZXRkZWZhdWx0LFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGFkZHJlc3NfaWRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgaWYocmVzLmRhdGFzLnN0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiByZXMubXNnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhhdC5vblNob3coKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgb25Mb2FkKCkge31cclxuICBvblNob3coKSB7XHJcbiAgICAvLyDnlKjmiLfmlLbotKflnLDlnYDliJfooahcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5hZGRyZXNzTGlzdFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLmFkZHJlc3NfbGlzdCA9IHJlcy5kYXRhcy5hZGRyZXNzX2xpc3RcclxuICAgICAgdGhpcy5lbXB0eUZsYWcgPSByZXMuZGF0YXMuYWRkcmVzc19saXN0Lmxlbmd0aCA/IDEgOiAwXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcblxyXG4gIH1cclxufVxyXG4iXX0=