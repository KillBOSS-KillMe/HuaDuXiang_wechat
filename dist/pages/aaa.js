'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
      navigationBarTitleText: '添加地址'
    }, _this.data = {
      flag: true,
      region: []
    }, _this.components = {}, _this.computed = {}, _this.methods = {
      // 切换是否选中默认地址
      setAddress: function setAddress() {
        this.setData({
          flag: !this.data.flag
        });
      },

      // 改变地区
      bindRegionChange: function bindRegionChange(e) {
        this.setData({
          region: e.detail.value
        });
      },
      // 保存
      submit: function submit(e) {
        var that = this;

        var _e$detail$value = _extends({}, e.detail.value),
            address = _e$detail$value.address,
            code = _e$detail$value.code,
            name = _e$detail$value.name,
            phone = _e$detail$value.phone;

        if (!name) {
          wx.showToast({
            title: '请输入姓名',
            icon: 'none'
          });
          return false;
        }
        if (phone.length != 11) {
          wx.showToast({
            title: '请输入正确的手机号码',
            icon: 'none'
          });
          return false;
        }
        if (!code) {
          wx.showToast({
            title: '请输入邮政编码',
            icon: 'none'
          });
          return false;
        }
        if (!this.data.region.length) {
          wx.showToast({
            title: '请选择地区',
            icon: 'none'
          });
          return false;
        }
        if (!address) {
          wx.showToast({
            title: '请输入地址',
            icon: 'none'
          });
          return false;
        }
        // id存在 就是编辑地址 否则是添加新地址
        if (that.data.id) {
          app.ajax({
            url: api.addressUpdate,
            data: {
              id: that.data.id,
              name: name,
              phone: phone,
              zipcode: code,
              province: that.data.region[0],
              city: that.data.region[1],
              area: that.data.region[2],
              address: address,
              is_default: that.data.flag ? '2' : '1'
            },
            success: function success(res) {
              if (res.code == 200) {
                app.showToast1(res.msg, 1500, function () {
                  wx.navigateBack(1);
                }, 'success');
              } else {
                app.showToast1(res.msg);
              }
            }
          });
        } else {
          app.ajax({
            url: api.addressAdd,
            data: {
              name: name,
              phone: phone,
              zipcode: code,
              province: that.data.region[0],
              city: that.data.region[1],
              area: that.data.region[2],
              address: address,
              is_default: that.data.flag ? '2' : '1'
            },
            success: function success(res) {
              if (res.code == 200) {
                app.showToast1(res.msg, 1500, function () {
                  wx.navigateBack(1);
                }, 'success');
              } else {
                app.showToast1(res.msg);
              }
            }
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var that = this;
      // 传id进来就是改变地址 先请地址信息
      if (options.id) {
        app.ajax({
          url: api.addressOne,
          data: {
            id: options.id
          },
          success: function success(res) {
            if (res.code == 200) {
              that.setData(res.data);
              that.setData({
                region: [res.data.province, res.data.city, res.data.area]
              });
            }
          }
        });
      }
    }
  }]);

  return Index;
}(_wepy2.default.page);

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFhYS5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZmxhZyIsInJlZ2lvbiIsImNvbXBvbmVudHMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJzZXRBZGRyZXNzIiwic2V0RGF0YSIsImJpbmRSZWdpb25DaGFuZ2UiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJzdWJtaXQiLCJ0aGF0IiwiYWRkcmVzcyIsImNvZGUiLCJuYW1lIiwicGhvbmUiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImxlbmd0aCIsImlkIiwiYXBwIiwiYWpheCIsInVybCIsImFwaSIsImFkZHJlc3NVcGRhdGUiLCJ6aXBjb2RlIiwicHJvdmluY2UiLCJjaXR5IiwiYXJlYSIsImlzX2RlZmF1bHQiLCJzdWNjZXNzIiwicmVzIiwic2hvd1RvYXN0MSIsIm1zZyIsIm5hdmlnYXRlQmFjayIsImFkZHJlc3NBZGQiLCJvcHRpb25zIiwiYWRkcmVzc09uZSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxZQUFNLElBREQ7QUFFTEMsY0FBUTtBQUZILEssUUFJUEMsVSxHQUFhLEUsUUFDYkMsUSxHQUFXLEUsUUFDWEMsTyxHQUFVO0FBQ1I7QUFDQUMsZ0JBRlEsd0JBRUs7QUFDWCxhQUFLQyxPQUFMLENBQWE7QUFDWE4sZ0JBQU0sQ0FBQyxLQUFLRCxJQUFMLENBQVVDO0FBRE4sU0FBYjtBQUdELE9BTk87O0FBT1I7QUFDQU8sd0JBQWtCLDBCQUFTQyxDQUFULEVBQVk7QUFDNUIsYUFBS0YsT0FBTCxDQUFhO0FBQ1hMLGtCQUFRTyxFQUFFQyxNQUFGLENBQVNDO0FBRE4sU0FBYjtBQUdELE9BWk87QUFhUjtBQUNBQyxZQWRRLGtC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O0FBUi9CLGFBRkM7QUFZUGlDLG1CQVpPLG1CQVlDQyxHQVpELEVBWU07QUFDWCxrQkFBSUEsSUFBSXBCLElBQUosSUFBWSxHQUFoQixFQUFxQjtBQUNuQlMsb0JBQUlZLFVBQUosQ0FDRUQsSUFBSUUsR0FETixFQUVFLElBRkYsRUFHRSxZQUFXO0FBQ1RuQixxQkFBR29CLFlBQUgsQ0FBZ0IsQ0FBaEI7QUFDRCxpQkFMSCxFQU1FLFNBTkY7QUFRRCxlQVRELE1BU087QUFDTGQsb0JBQUlZLFVBQUosQ0FBZUQsSUFBSUUsR0FBbkI7QUFDRDtBQUNGO0FBekJNLFdBQVQ7QUEyQkQ7QUFDRjtBQS9HTyxLOzs7OzsyQkFpSEhHLE8sRUFBUztBQUNkLFVBQUkzQixPQUFPLElBQVg7QUFDQTtBQUNBLFVBQUkyQixRQUFRakIsRUFBWixFQUFnQjtBQUNkQyxZQUFJQyxJQUFKLENBQVM7QUFDUEMsZUFBS0MsSUFBSWMsVUFERjtBQUVQekMsZ0JBQU07QUFDSnVCLGdCQUFJaUIsUUFBUWpCO0FBRFIsV0FGQztBQUtQVyxpQkFMTyxtQkFLQ0MsR0FMRCxFQUtNO0FBQ1gsZ0JBQUlBLElBQUlwQixJQUFKLElBQVksR0FBaEIsRUFBcUI7QUFDbkJGLG1CQUFLTixPQUFMLENBQWE0QixJQUFJbkMsSUFBakI7QUFDQWEsbUJBQUtOLE9BQUwsQ0FBYTtBQUNYTCx3QkFBUSxDQUFDaUMsSUFBSW5DLElBQUosQ0FBUzhCLFFBQVYsRUFBb0JLLElBQUluQyxJQUFKLENBQVMrQixJQUE3QixFQUFtQ0ksSUFBSW5DLElBQUosQ0FBU2dDLElBQTVDO0FBREcsZUFBYjtBQUdEO0FBQ0Y7QUFaTSxTQUFUO0FBY0Q7QUFDRjs7OztFQTlJZ0NVLGVBQUtDLEk7O2tCQUFuQjlDLEsiLCJmaWxlIjoiYWFhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmt7vliqDlnLDlnYAnXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgZmxhZzogdHJ1ZSxcclxuICAgIHJlZ2lvbjogW11cclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAvLyDliIfmjaLmmK/lkKbpgInkuK3pu5jorqTlnLDlnYBcclxuICAgIHNldEFkZHJlc3MoKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgZmxhZzogIXRoaXMuZGF0YS5mbGFnXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vIOaUueWPmOWcsOWMulxyXG4gICAgYmluZFJlZ2lvbkNoYW5nZTogZnVuY3Rpb24oZSkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIHJlZ2lvbjogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy8g5L+d5a2YXHJcbiAgICBzdWJtaXQoZSkge1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHZhciB7IGFkZHJlc3MsIGNvZGUsIG5hbWUsIHBob25lIH0gPSB7IC4uLmUuZGV0YWlsLnZhbHVlIH07XHJcbiAgICAgIGlmICghbmFtZSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeWnk+WQjScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHBob25lLmxlbmd0aCAhPSAxMSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPt+eggScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl6YKu5pS/57yW56CBJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXRoaXMuZGF0YS5yZWdpb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5Zyw5Yy6JyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWFkZHJlc3MpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXlnLDlnYAnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGlk5a2Y5ZyoIOWwseaYr+e8lui+keWcsOWdgCDlkKbliJnmmK/mt7vliqDmlrDlnLDlnYBcclxuICAgICAgaWYgKHRoYXQuZGF0YS5pZCkge1xyXG4gICAgICAgIGFwcC5hamF4KHtcclxuICAgICAgICAgIHVybDogYXBpLmFkZHJlc3NVcGRhdGUsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGlkOiB0aGF0LmRhdGEuaWQsXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIHBob25lLFxyXG4gICAgICAgICAgICB6aXBjb2RlOiBjb2RlLFxyXG4gICAgICAgICAgICBwcm92aW5jZTogdGhhdC5kYXRhLnJlZ2lvblswXSxcclxuICAgICAgICAgICAgY2l0eTogdGhhdC5kYXRhLnJlZ2lvblsxXSxcclxuICAgICAgICAgICAgYXJlYTogdGhhdC5kYXRhLnJlZ2lvblsyXSxcclxuICAgICAgICAgICAgYWRkcmVzcyxcclxuICAgICAgICAgICAgaXNfZGVmYXVsdDogdGhhdC5kYXRhLmZsYWcgPyAnMicgOiAnMSdcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgYXBwLnNob3dUb2FzdDEoXHJcbiAgICAgICAgICAgICAgICByZXMubXNnLFxyXG4gICAgICAgICAgICAgICAgMTUwMCxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soMSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhcHAuc2hvd1RvYXN0MShyZXMubXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFwcC5hamF4KHtcclxuICAgICAgICAgIHVybDogYXBpLmFkZHJlc3NBZGQsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIHBob25lLFxyXG4gICAgICAgICAgICB6aXBjb2RlOiBjb2RlLFxyXG4gICAgICAgICAgICBwcm92aW5jZTogdGhhdC5kYXRhLnJlZ2lvblswXSxcclxuICAgICAgICAgICAgY2l0eTogdGhhdC5kYXRhLnJlZ2lvblsxXSxcclxuICAgICAgICAgICAgYXJlYTogdGhhdC5kYXRhLnJlZ2lvblsyXSxcclxuICAgICAgICAgICAgYWRkcmVzcyxcclxuICAgICAgICAgICAgaXNfZGVmYXVsdDogdGhhdC5kYXRhLmZsYWcgPyAnMicgOiAnMSdcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgYXBwLnNob3dUb2FzdDEoXHJcbiAgICAgICAgICAgICAgICByZXMubXNnLFxyXG4gICAgICAgICAgICAgICAgMTUwMCxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soMSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhcHAuc2hvd1RvYXN0MShyZXMubXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgLy8g5LygaWTov5vmnaXlsLHmmK/mlLnlj5jlnLDlnYAg5YWI6K+35Zyw5Z2A5L+h5oGvXHJcbiAgICBpZiAob3B0aW9ucy5pZCkge1xyXG4gICAgICBhcHAuYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkuYWRkcmVzc09uZSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBpZDogb3B0aW9ucy5pZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgdGhhdC5zZXREYXRhKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcclxuICAgICAgICAgICAgICByZWdpb246IFtyZXMuZGF0YS5wcm92aW5jZSwgcmVzLmRhdGEuY2l0eSwgcmVzLmRhdGEuYXJlYV1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19