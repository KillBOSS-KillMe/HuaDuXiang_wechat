'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/addAddress'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZEFkZHJlc3MuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImZsYWciLCJyZWdpb24iLCJjb21wb25lbnRzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic2V0QWRkcmVzcyIsInNldERhdGEiLCJiaW5kUmVnaW9uQ2hhbmdlIiwiZSIsImRldGFpbCIsInZhbHVlIiwic3VibWl0IiwidGhhdCIsImFkZHJlc3MiLCJjb2RlIiwibmFtZSIsInBob25lIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJsZW5ndGgiLCJpZCIsImFwcCIsImFqYXgiLCJ1cmwiLCJhcGkiLCJhZGRyZXNzVXBkYXRlIiwiemlwY29kZSIsInByb3ZpbmNlIiwiY2l0eSIsImFyZWEiLCJpc19kZWZhdWx0Iiwic3VjY2VzcyIsInJlcyIsInNob3dUb2FzdDEiLCJtc2ciLCJuYXZpZ2F0ZUJhY2siLCJhZGRyZXNzQWRkIiwib3B0aW9ucyIsImFkZHJlc3NPbmUiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsWUFBTSxJQUREO0FBRUxDLGNBQVE7QUFGSCxLLFFBSVBDLFUsR0FBYSxFLFFBQ2JDLFEsR0FBVyxFLFFBQ1hDLE8sR0FBVTtBQUNSO0FBQ0FDLGdCQUZRLHdCQUVLO0FBQ1gsYUFBS0MsT0FBTCxDQUFhO0FBQ1hOLGdCQUFNLENBQUMsS0FBS0QsSUFBTCxDQUFVQztBQUROLFNBQWI7QUFHRCxPQU5POztBQU9SO0FBQ0FPLHdCQUFrQiwwQkFBU0MsQ0FBVCxFQUFZO0FBQzVCLGFBQUtGLE9BQUwsQ0FBYTtBQUNYTCxrQkFBUU8sRUFBRUMsTUFBRixDQUFTQztBQUROLFNBQWI7QUFHRCxPQVpPO0FBYVI7QUFDQUMsWUFkUSxrQkFjREgsQ0FkQyxFQWNFO0FBQ1IsWUFBSUksT0FBTyxJQUFYOztBQURRLDJDQUVrQ0osRUFBRUMsTUFBRixDQUFTQyxLQUYzQztBQUFBLFlBRUZHLE9BRkUsbUJBRUZBLE9BRkU7QUFBQSxZQUVPQyxJQUZQLG1CQUVPQSxJQUZQO0FBQUEsWUFFYUMsSUFGYixtQkFFYUEsSUFGYjtBQUFBLFlBRW1CQyxLQUZuQixtQkFFbUJBLEtBRm5COztBQUdSLFlBQUksQ0FBQ0QsSUFBTCxFQUFXO0FBQ1RFLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxPQURJO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlBLGlCQUFPLEtBQVA7QUFDRDtBQUNELFlBQUlKLE1BQU1LLE1BQU4sSUFBZ0IsRUFBcEIsRUFBd0I7QUFDdEJKLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxZQURJO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlBLGlCQUFPLEtBQVA7QUFDRDtBQUNELFlBQUksQ0FBQ04sSUFBTCxFQUFXO0FBQ1RHLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxTQURJO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlBLGlCQUFPLEtBQVA7QUFDRDtBQUNELFlBQUksQ0FBQyxLQUFLckIsSUFBTCxDQUFVRSxNQUFWLENBQWlCb0IsTUFBdEIsRUFBOEI7QUFDNUJKLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxPQURJO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlBLGlCQUFPLEtBQVA7QUFDRDtBQUNELFlBQUksQ0FBQ1AsT0FBTCxFQUFjO0FBQ1pJLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxPQURJO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlBLGlCQUFPLEtBQVA7QUFDRDtBQUNEO0FBQ0EsWUFBSVIsS0FBS2IsSUFBTCxDQUFVdUIsRUFBZCxFQUFrQjtBQUNoQkMsY0FBSUMsSUFBSixDQUFTO0FBQ1BDLGlCQUFLQyxJQUFJQyxhQURGO0FBRVA1QixrQkFBTTtBQUNKdUIsa0JBQUlWLEtBQUtiLElBQUwsQ0FBVXVCLEVBRFY7QUFFSlAsd0JBRkk7QUFHSkMsMEJBSEk7QUFJSlksdUJBQVNkLElBSkw7QUFLSmUsd0JBQVVqQixLQUFLYixJQUFMLENBQVVFLE1BQVYsQ0FBaUIsQ0FBakIsQ0FMTjtBQU1KNkIsb0JBQU1sQixLQUFLYixJQUFMLENBQVVFLE1BQVYsQ0FBaUIsQ0FBakIsQ0FORjtBQU9KOEIsb0JBQU1uQixLQUFLYixJQUFMLENBQVVFLE1BQVYsQ0FBaUIsQ0FBakIsQ0FQRjtBQVFKWSw4QkFSSTtBQVNKbUIsMEJBQVlwQixLQUFLYixJQUFMLENBQVVDLElBQVYsR0FBaUIsR0FBakIsR0FBdUI7QUFUL0IsYUFGQztBQWFQaUMsbUJBYk8sbUJBYUNDLEdBYkQsRUFhTTtBQUNYLGtCQUFJQSxJQUFJcEIsSUFBSixJQUFZLEdBQWhCLEVBQXFCO0FBQ25CUyxvQkFBSVksVUFBSixDQUNFRCxJQUFJRSxHQUROLEVBRUUsSUFGRixFQUdFLFlBQVc7QUFDVG5CLHFCQUFHb0IsWUFBSCxDQUFnQixDQUFoQjtBQUNELGlCQUxILEVBTUUsU0FORjtBQVFELGVBVEQsTUFTTztBQUNMZCxvQkFBSVksVUFBSixDQUFlRCxJQUFJRSxHQUFuQjtBQUNEO0FBQ0Y7QUExQk0sV0FBVDtBQTRCRCxTQTdCRCxNQTZCTztBQUNMYixjQUFJQyxJQUFKLENBQVM7QUFDUEMsaUJBQUtDLElBQUlZLFVBREY7QUFFUHZDLGtCQUFNO0FBQ0pnQix3QkFESTtBQUVKQywwQkFGSTtBQUdKWSx1QkFBU2QsSUFITDtBQUlKZSx3QkFBVWpCLEtBQUtiLElBQUwsQ0FBVUUsTUFBVixDQUFpQixDQUFqQixDQUpOO0FBS0o2QixvQkFBTWxCLEtBQUtiLElBQUwsQ0FBVUUsTUFBVixDQUFpQixDQUFqQixDQUxGO0FBTUo4QixvQkFBTW5CLEtBQUtiLElBQUwsQ0FBVUUsTUFBVixDQUFpQixDQUFqQixDQU5GO0FBT0pZLDhCQVBJO0FBUUptQiwwQkFBWXBCLEtBQUtiLElBQUwsQ0FBVUMsSUFBVixHQUFpQixHQUFqQixHQUF1QjtBQVIvQixhQUZDO0FBWVBpQyxtQkFaTyxtQkFZQ0MsR0FaRCxFQVlNO0FBQ1gsa0JBQUlBLElBQUlwQixJQUFKLElBQVksR0FBaEIsRUFBcUI7QUFDbkJTLG9CQUFJWSxVQUFKLENBQ0VELElBQUlFLEdBRE4sRUFFRSxJQUZGLEVBR0UsWUFBVztBQUNUbkIscUJBQUdvQixZQUFILENBQWdCLENBQWhCO0FBQ0QsaUJBTEgsRUFNRSxTQU5GO0FBUUQsZUFURCxNQVNPO0FBQ0xkLG9CQUFJWSxVQUFKLENBQWVELElBQUlFLEdBQW5CO0FBQ0Q7QUFDRjtBQXpCTSxXQUFUO0FBMkJEO0FBQ0Y7QUEvR08sSzs7Ozs7MkJBaUhIRyxPLEVBQVM7QUFDZCxVQUFJM0IsT0FBTyxJQUFYO0FBQ0E7QUFDQSxVQUFJMkIsUUFBUWpCLEVBQVosRUFBZ0I7QUFDZEMsWUFBSUMsSUFBSixDQUFTO0FBQ1BDLGVBQUtDLElBQUljLFVBREY7QUFFUHpDLGdCQUFNO0FBQ0p1QixnQkFBSWlCLFFBQVFqQjtBQURSLFdBRkM7QUFLUFcsaUJBTE8sbUJBS0NDLEdBTEQsRUFLTTtBQUNYLGdCQUFJQSxJQUFJcEIsSUFBSixJQUFZLEdBQWhCLEVBQXFCO0FBQ25CRixtQkFBS04sT0FBTCxDQUFhNEIsSUFBSW5DLElBQWpCO0FBQ0FhLG1CQUFLTixPQUFMLENBQWE7QUFDWEwsd0JBQVEsQ0FBQ2lDLElBQUluQyxJQUFKLENBQVM4QixRQUFWLEVBQW9CSyxJQUFJbkMsSUFBSixDQUFTK0IsSUFBN0IsRUFBbUNJLElBQUluQyxJQUFKLENBQVNnQyxJQUE1QztBQURHLGVBQWI7QUFHRDtBQUNGO0FBWk0sU0FBVDtBQWNEO0FBQ0Y7Ozs7RUE5SWdDVSxlQUFLQyxJOztrQkFBbkI5QyxLIiwiZmlsZSI6ImFkZEFkZHJlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+a3u+WKoOWcsOWdgCdcclxuICB9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICBmbGFnOiB0cnVlLFxyXG4gICAgcmVnaW9uOiBbXVxyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOWIh+aNouaYr+WQpumAieS4rem7mOiupOWcsOWdgFxyXG4gICAgc2V0QWRkcmVzcygpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBmbGFnOiAhdGhpcy5kYXRhLmZsYWdcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy8g5pS55Y+Y5Zyw5Yy6XHJcbiAgICBiaW5kUmVnaW9uQ2hhbmdlOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgcmVnaW9uOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvLyDkv53lrZhcclxuICAgIHN1Ym1pdChlKSB7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgdmFyIHsgYWRkcmVzcywgY29kZSwgbmFtZSwgcGhvbmUgfSA9IHsgLi4uZS5kZXRhaWwudmFsdWUgfTtcclxuICAgICAgaWYgKCFuYW1lKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5aeT5ZCNJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocGhvbmUubGVuZ3RoICE9IDExKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5q2j56Gu55qE5omL5py65Y+356CBJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXpgq7mlL/nvJbnoIEnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5kYXRhLnJlZ2lvbi5sZW5ndGgpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nlnLDljLonLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghYWRkcmVzcykge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeWcsOWdgCcsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgLy8gaWTlrZjlnKgg5bCx5piv57yW6L6R5Zyw5Z2AIOWQpuWImeaYr+a3u+WKoOaWsOWcsOWdgFxyXG4gICAgICBpZiAodGhhdC5kYXRhLmlkKSB7XHJcbiAgICAgICAgYXBwLmFqYXgoe1xyXG4gICAgICAgICAgdXJsOiBhcGkuYWRkcmVzc1VwZGF0ZSxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgaWQ6IHRoYXQuZGF0YS5pZCxcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgcGhvbmUsXHJcbiAgICAgICAgICAgIHppcGNvZGU6IGNvZGUsXHJcbiAgICAgICAgICAgIHByb3ZpbmNlOiB0aGF0LmRhdGEucmVnaW9uWzBdLFxyXG4gICAgICAgICAgICBjaXR5OiB0aGF0LmRhdGEucmVnaW9uWzFdLFxyXG4gICAgICAgICAgICBhcmVhOiB0aGF0LmRhdGEucmVnaW9uWzJdLFxyXG4gICAgICAgICAgICBhZGRyZXNzLFxyXG4gICAgICAgICAgICBpc19kZWZhdWx0OiB0aGF0LmRhdGEuZmxhZyA/ICcyJyA6ICcxJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICBhcHAuc2hvd1RvYXN0MShcclxuICAgICAgICAgICAgICAgIHJlcy5tc2csXHJcbiAgICAgICAgICAgICAgICAxNTAwLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjaygxKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFwcC5zaG93VG9hc3QxKHJlcy5tc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXBwLmFqYXgoe1xyXG4gICAgICAgICAgdXJsOiBhcGkuYWRkcmVzc0FkZCxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgcGhvbmUsXHJcbiAgICAgICAgICAgIHppcGNvZGU6IGNvZGUsXHJcbiAgICAgICAgICAgIHByb3ZpbmNlOiB0aGF0LmRhdGEucmVnaW9uWzBdLFxyXG4gICAgICAgICAgICBjaXR5OiB0aGF0LmRhdGEucmVnaW9uWzFdLFxyXG4gICAgICAgICAgICBhcmVhOiB0aGF0LmRhdGEucmVnaW9uWzJdLFxyXG4gICAgICAgICAgICBhZGRyZXNzLFxyXG4gICAgICAgICAgICBpc19kZWZhdWx0OiB0aGF0LmRhdGEuZmxhZyA/ICcyJyA6ICcxJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICBhcHAuc2hvd1RvYXN0MShcclxuICAgICAgICAgICAgICAgIHJlcy5tc2csXHJcbiAgICAgICAgICAgICAgICAxNTAwLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjaygxKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFwcC5zaG93VG9hc3QxKHJlcy5tc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAvLyDkvKBpZOi/m+adpeWwseaYr+aUueWPmOWcsOWdgCDlhYjor7flnLDlnYDkv6Hmga9cclxuICAgIGlmIChvcHRpb25zLmlkKSB7XHJcbiAgICAgIGFwcC5hamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5hZGRyZXNzT25lLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGlkOiBvcHRpb25zLmlkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgaWYgKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICB0aGF0LnNldERhdGEocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGF0LnNldERhdGEoe1xyXG4gICAgICAgICAgICAgIHJlZ2lvbjogW3Jlcy5kYXRhLnByb3ZpbmNlLCByZXMuZGF0YS5jaXR5LCByZXMuZGF0YS5hcmVhXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=