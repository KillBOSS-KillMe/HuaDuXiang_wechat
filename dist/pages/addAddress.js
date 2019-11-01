'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.data = {
      addressInfo: {}, // 地址信息
      is_default: 0, // 是否默认
      parent_id: null, // 区域上级id
      deep: 1, // 1省2市3区
      addressArr: [], // 省市区信息
      name: '', // 名字
      phone: '', // 手机
      address: '' //详细地址
    }, _this.components = {}, _this.computed = {}, _this.methods = {
      // 切换是否选中默认地址
      setAddress: function setAddress() {
        this.is_default = this.is_default == 0 ? 1 : 0;
        this.$apply();
        this.addressInfo.is_default = this.is_default;
      },

      // 保存
      submit: function submit(e) {
        var that = this;

        var _e$detail$value = _extends({}, e.detail.value),
            address = _e$detail$value.address,
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
        if (!this.addressInfo.area_info) {
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
        // address_id存在 就是编辑地址 否则是添加新地址
        if (this.addressInfo.address_id) {
          (0, _ajax.ajax)({
            url: api.addressEdit,
            data: {
              true_name: name,
              address: address,
              area_info: this.addressInfo.area_info,
              tel_phone: phone,
              area_id: this.addressInfo.area_id,
              city_id: this.addressInfo.city_id,
              is_default: this.is_default,
              address_id: this.addressInfo.address_id
            }
          }).then(function (res) {
            if (res.datas.state == 1) {
              wx.showToast({
                title: res.datas.msg
              });
              var timer = setTimeout(function () {
                wx.navigateBack();
                clearTimeout(timer);
              }, 1000);
            } else {
              wx.showToast({
                title: res.datas.msg,
                icon: 'none'
              });
            }
          });
        } else {
          (0, _ajax.ajax)({
            url: api.addressAdd,
            data: {
              true_name: name,
              address: address,
              area_info: this.addressInfo.area_info,
              tel_phone: phone,
              area_id: this.addressInfo.area_id,
              city_id: this.addressInfo.city_id,
              is_default: this.is_default
            }
          }).then(function (res) {
            if (res.datas.state == 1) {
              wx.showToast({
                title: res.datas.msg
              });
              var timer = setTimeout(function () {
                wx.navigateBack();
                clearTimeout(timer);
              }, 1000);
            } else {
              wx.showToast({
                title: res.datas.msg,
                icon: 'none'
              });
            }
          });
        }
      },
      bindMultiPickerChange: function bindMultiPickerChange(e) {
        var arr = e.detail.value;
        var province = this.addressArr[0][arr[0]].area_name;
        var city = this.addressArr[1][arr[1]].area_name;
        var area = this.addressArr[2][arr[2]].area_name;
        this.addressInfo.area_info = province + ',' + city + ',' + area;
        this.addressInfo.city_id = this.addressArr[1][arr[1]].area_id;
        this.addressInfo.area_id = this.addressArr[2][arr[2]].area_id;
      },
      bindMultiPickerColumnChange: function bindMultiPickerColumnChange(e) {
        var column = e.detail.column;
        var value = e.detail.value;
        this.parent_id = this.addressArr[column][value].area_id;
        this.deep = column + 2;
        this.$apply();
        // 2.选择'省'请求 '市','区' 2次
        // 3.选择'市'请求 '区' 1次
        // 4.选择'区'不请求
        if (column < 2) {
          this.requestAreaList();
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var _this2 = this;

      var that = this;
      console.log(options);
      // 传id进来就是改变地址 先请地址信息
      if (options.address_id) {
        wx.setNavigationBarTitle({
          title: '修改地址'
        });
        (0, _ajax.ajax)({
          url: api.addressInfo,
          data: {
            address_id: options.address_id
          }
        }).then(function (res) {
          _this2.addressInfo = res.datas.address_info;
          _this2.is_default = res.datas.address_info.is_default;
          _this2.name = res.datas.address_info.true_name;
          _this2.phone = res.datas.address_info.tel_phone;
          _this2.address = res.datas.address_info.address;
          _this2.$apply();
        });
      } else {
        wx.setNavigationBarTitle({
          title: '添加地址'
        });
      }
      // 1.默认请求 '省','市','区' 3次
      this.requestAreaList();
    }
  }, {
    key: 'requestAreaList',
    value: function requestAreaList() {
      var _this3 = this;

      (0, _ajax.ajax)({
        icon: 'none',
        url: api.areaList,
        data: {
          parent_id: this.parent_id,
          deep: this.deep
        }
      }).then(function (res) {
        _this3.parent_id = res.datas[0].area_id;
        _this3.addressArr[_this3.deep - 1] = res.datas;
        _this3.$apply();
        if (_this3.deep < 3) {
          _this3.deep++;
          _this3.requestAreaList();
        }
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/addAddress'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZEFkZHJlc3MuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIkluZGV4IiwiY29uZmlnIiwiZGF0YSIsImFkZHJlc3NJbmZvIiwiaXNfZGVmYXVsdCIsInBhcmVudF9pZCIsImRlZXAiLCJhZGRyZXNzQXJyIiwibmFtZSIsInBob25lIiwiYWRkcmVzcyIsImNvbXBvbmVudHMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJzZXRBZGRyZXNzIiwiJGFwcGx5Iiwic3VibWl0IiwiZSIsInRoYXQiLCJkZXRhaWwiLCJ2YWx1ZSIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwibGVuZ3RoIiwiYXJlYV9pbmZvIiwiYWRkcmVzc19pZCIsInVybCIsImFkZHJlc3NFZGl0IiwidHJ1ZV9uYW1lIiwidGVsX3Bob25lIiwiYXJlYV9pZCIsImNpdHlfaWQiLCJ0aGVuIiwicmVzIiwiZGF0YXMiLCJzdGF0ZSIsIm1zZyIsInRpbWVyIiwic2V0VGltZW91dCIsIm5hdmlnYXRlQmFjayIsImNsZWFyVGltZW91dCIsImFkZHJlc3NBZGQiLCJiaW5kTXVsdGlQaWNrZXJDaGFuZ2UiLCJhcnIiLCJwcm92aW5jZSIsImFyZWFfbmFtZSIsImNpdHkiLCJhcmVhIiwiYmluZE11bHRpUGlja2VyQ29sdW1uQ2hhbmdlIiwiY29sdW1uIiwicmVxdWVzdEFyZWFMaXN0Iiwib3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJhZGRyZXNzX2luZm8iLCJhcmVhTGlzdCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFJcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTLEUsUUFDVEMsSSxHQUFPO0FBQ0xDLG1CQUFhLEVBRFIsRUFDWTtBQUNqQkMsa0JBQVksQ0FGUCxFQUVVO0FBQ2ZDLGlCQUFXLElB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LGlCQUFLSSxJQUFMLEdBQVkyQixJQUFJQyxLQUFKLENBQVVxQixZQUFWLENBQXVCM0IsU0FBbkM7QUFDQSxpQkFBS3JCLEtBQUwsR0FBYTBCLElBQUlDLEtBQUosQ0FBVXFCLFlBQVYsQ0FBdUIxQixTQUFwQztBQUNBLGlCQUFLckIsT0FBTCxHQUFleUIsSUFBSUMsS0FBSixDQUFVcUIsWUFBVixDQUF1Qi9DLE9BQXRDO0FBQ0EsaUJBQUtLLE1BQUw7QUFDRCxTQVpEO0FBYUQsT0FqQkQsTUFpQk87QUFDSk0sV0FBR21DLHFCQUFILENBQXlCO0FBQ3hCakMsaUJBQU87QUFEaUIsU0FBekI7QUFHRjtBQUNEO0FBQ0EsV0FBSzZCLGVBQUw7QUFDRDs7O3NDQUVnQjtBQUFBOztBQUNmLHNCQUFLO0FBQ0g1QixjQUFNLE1BREg7QUFFSEksYUFBSzlCLElBQUk0RCxRQUZOO0FBR0h4RCxjQUFNO0FBQ0pHLHFCQUFXLEtBQUtBLFNBRFo7QUFFSkMsZ0JBQU0sS0FBS0E7QUFGUDtBQUhILE9BQUwsRUFPRzRCLElBUEgsQ0FPUSxlQUFPO0FBQ2IsZUFBSzdCLFNBQUwsR0FBaUI4QixJQUFJQyxLQUFKLENBQVUsQ0FBVixFQUFhSixPQUE5QjtBQUNBLGVBQUt6QixVQUFMLENBQWdCLE9BQUtELElBQUwsR0FBWSxDQUE1QixJQUFpQzZCLElBQUlDLEtBQXJDO0FBQ0EsZUFBS3JCLE1BQUw7QUFDQSxZQUFHLE9BQUtULElBQUwsR0FBWSxDQUFmLEVBQWtCO0FBQ2hCLGlCQUFLQSxJQUFMO0FBQ0EsaUJBQUs4QyxlQUFMO0FBQ0Q7QUFDRixPQWZEO0FBZ0JEOzs7O0VBdkxnQ08sZUFBS0MsSTs7a0JBQW5CNUQsSyIsImZpbGUiOiJhZGRBZGRyZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge307XHJcbiAgZGF0YSA9IHtcclxuICAgIGFkZHJlc3NJbmZvOiB7fSwgLy8g5Zyw5Z2A5L+h5oGvXHJcbiAgICBpc19kZWZhdWx0OiAwLCAvLyDmmK/lkKbpu5jorqRcclxuICAgIHBhcmVudF9pZDogbnVsbCwgLy8g5Yy65Z+f5LiK57qnaWRcclxuICAgIGRlZXA6IDEsIC8vIDHnnIEy5biCM+WMulxyXG4gICAgYWRkcmVzc0FycjogW10sIC8vIOecgeW4guWMuuS/oeaBr1xyXG4gICAgbmFtZTogJycsIC8vIOWQjeWtl1xyXG4gICAgcGhvbmU6ICcnLCAvLyDmiYvmnLpcclxuICAgIGFkZHJlc3M6ICcnLCAvL+ivpue7huWcsOWdgFxyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOWIh+aNouaYr+WQpumAieS4rem7mOiupOWcsOWdgFxyXG4gICAgc2V0QWRkcmVzcygpIHtcclxuICAgICAgdGhpcy5pc19kZWZhdWx0ID0gdGhpcy5pc19kZWZhdWx0ID09IDAgPyAxOiAwXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgdGhpcy5hZGRyZXNzSW5mby5pc19kZWZhdWx0ID0gdGhpcy5pc19kZWZhdWx0XHJcbiAgICB9LFxyXG4gICAgLy8g5L+d5a2YXHJcbiAgICBzdWJtaXQoZSkge1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHZhciB7IGFkZHJlc3MsIG5hbWUsIHBob25lIH0gPSB7IC4uLmUuZGV0YWlsLnZhbHVlIH07XHJcbiAgICAgIGlmICghbmFtZSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeWnk+WQjScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHBob25lLmxlbmd0aCAhPSAxMSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPt+eggScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLmFkZHJlc3NJbmZvLmFyZWFfaW5mbykge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWcsOWMuicsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFhZGRyZXNzKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5Zyw5Z2AJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICAvLyBhZGRyZXNzX2lk5a2Y5ZyoIOWwseaYr+e8lui+keWcsOWdgCDlkKbliJnmmK/mt7vliqDmlrDlnLDlnYBcclxuICAgICAgaWYgKHRoaXMuYWRkcmVzc0luZm8uYWRkcmVzc19pZCkge1xyXG4gICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgdXJsOiBhcGkuYWRkcmVzc0VkaXQsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHRydWVfbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyxcclxuICAgICAgICAgICAgYXJlYV9pbmZvOiB0aGlzLmFkZHJlc3NJbmZvLmFyZWFfaW5mbyxcclxuICAgICAgICAgICAgdGVsX3Bob25lOiBwaG9uZSxcclxuICAgICAgICAgICAgYXJlYV9pZDogdGhpcy5hZGRyZXNzSW5mby5hcmVhX2lkLFxyXG4gICAgICAgICAgICBjaXR5X2lkOiB0aGlzLmFkZHJlc3NJbmZvLmNpdHlfaWQsXHJcbiAgICAgICAgICAgIGlzX2RlZmF1bHQ6IHRoaXMuaXNfZGVmYXVsdCxcclxuICAgICAgICAgICAgYWRkcmVzc19pZDogdGhpcy5hZGRyZXNzSW5mby5hZGRyZXNzX2lkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgaWYocmVzLmRhdGFzLnN0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGFzLm1zZ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcclxuICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5tc2csXHJcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhamF4KHtcclxuICAgICAgICAgIHVybDogYXBpLmFkZHJlc3NBZGQsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHRydWVfbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyxcclxuICAgICAgICAgICAgYXJlYV9pbmZvOiB0aGlzLmFkZHJlc3NJbmZvLmFyZWFfaW5mbyxcclxuICAgICAgICAgICAgdGVsX3Bob25lOiBwaG9uZSxcclxuICAgICAgICAgICAgYXJlYV9pZDogdGhpcy5hZGRyZXNzSW5mby5hcmVhX2lkLFxyXG4gICAgICAgICAgICBjaXR5X2lkOiB0aGlzLmFkZHJlc3NJbmZvLmNpdHlfaWQsXHJcbiAgICAgICAgICAgIGlzX2RlZmF1bHQ6IHRoaXMuaXNfZGVmYXVsdFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIGlmKHJlcy5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5tc2dcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdmFyIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcclxuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXHJcbiAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMubXNnLFxyXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiaW5kTXVsdGlQaWNrZXJDaGFuZ2UoZSl7XHJcbiAgICAgIHZhciBhcnIgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB2YXIgcHJvdmluY2UgPSB0aGlzLmFkZHJlc3NBcnJbMF1bYXJyWzBdXS5hcmVhX25hbWVcclxuICAgICAgdmFyIGNpdHkgPSB0aGlzLmFkZHJlc3NBcnJbMV1bYXJyWzFdXS5hcmVhX25hbWVcclxuICAgICAgdmFyIGFyZWEgPSB0aGlzLmFkZHJlc3NBcnJbMl1bYXJyWzJdXS5hcmVhX25hbWVcclxuICAgICAgdGhpcy5hZGRyZXNzSW5mby5hcmVhX2luZm8gPSBgJHtwcm92aW5jZX0sJHtjaXR5fSwke2FyZWF9YFxyXG4gICAgICB0aGlzLmFkZHJlc3NJbmZvLmNpdHlfaWQgPSB0aGlzLmFkZHJlc3NBcnJbMV1bYXJyWzFdXS5hcmVhX2lkXHJcbiAgICAgIHRoaXMuYWRkcmVzc0luZm8uYXJlYV9pZCA9IHRoaXMuYWRkcmVzc0FyclsyXVthcnJbMl1dLmFyZWFfaWRcclxuICAgIH0sXHJcbiAgICBiaW5kTXVsdGlQaWNrZXJDb2x1bW5DaGFuZ2UoZSl7XHJcbiAgICAgIHZhciBjb2x1bW4gPSBlLmRldGFpbC5jb2x1bW5cclxuICAgICAgdmFyIHZhbHVlID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgdGhpcy5wYXJlbnRfaWQgPSB0aGlzLmFkZHJlc3NBcnJbY29sdW1uXVt2YWx1ZV0uYXJlYV9pZFxyXG4gICAgICB0aGlzLmRlZXAgPSBjb2x1bW4gKyAyXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgLy8gMi7pgInmi6kn55yBJ+ivt+axgiAn5biCJywn5Yy6JyAy5qyhXHJcbiAgICAgIC8vIDMu6YCJ5oupJ+W4gifor7fmsYIgJ+WMuicgMeasoVxyXG4gICAgICAvLyA0LumAieaLqSfljLon5LiN6K+35rGCXHJcbiAgICAgIGlmKGNvbHVtbjwyKSB7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0QXJlYUxpc3QoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgY29uc29sZS5sb2cob3B0aW9ucylcclxuICAgIC8vIOS8oGlk6L+b5p2l5bCx5piv5pS55Y+Y5Zyw5Z2AIOWFiOivt+WcsOWdgOS/oeaBr1xyXG4gICAgaWYgKG9wdGlvbnMuYWRkcmVzc19pZCkge1xyXG4gICAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xyXG4gICAgICAgIHRpdGxlOiAn5L+u5pS55Zyw5Z2AJ1xyXG4gICAgICB9KVxyXG4gICAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5hZGRyZXNzSW5mbyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBhZGRyZXNzX2lkOiBvcHRpb25zLmFkZHJlc3NfaWRcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICB0aGlzLmFkZHJlc3NJbmZvID0gcmVzLmRhdGFzLmFkZHJlc3NfaW5mb1xyXG4gICAgICAgIHRoaXMuaXNfZGVmYXVsdCA9IHJlcy5kYXRhcy5hZGRyZXNzX2luZm8uaXNfZGVmYXVsdFxyXG4gICAgICAgIHRoaXMubmFtZSA9IHJlcy5kYXRhcy5hZGRyZXNzX2luZm8udHJ1ZV9uYW1lXHJcbiAgICAgICAgdGhpcy5waG9uZSA9IHJlcy5kYXRhcy5hZGRyZXNzX2luZm8udGVsX3Bob25lXHJcbiAgICAgICAgdGhpcy5hZGRyZXNzID0gcmVzLmRhdGFzLmFkZHJlc3NfaW5mby5hZGRyZXNzXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgICAgdGl0bGU6ICfmt7vliqDlnLDlnYAnXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyAxLum7mOiupOivt+axgiAn55yBJywn5biCJywn5Yy6JyAz5qyhXHJcbiAgICB0aGlzLnJlcXVlc3RBcmVhTGlzdCgpXHJcbiAgfVxyXG5cclxuICByZXF1ZXN0QXJlYUxpc3QoKXtcclxuICAgIGFqYXgoe1xyXG4gICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgIHVybDogYXBpLmFyZWFMaXN0LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcGFyZW50X2lkOiB0aGlzLnBhcmVudF9pZCxcclxuICAgICAgICBkZWVwOiB0aGlzLmRlZXAsXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5wYXJlbnRfaWQgPSByZXMuZGF0YXNbMF0uYXJlYV9pZFxyXG4gICAgICB0aGlzLmFkZHJlc3NBcnJbdGhpcy5kZWVwIC0gMV0gPSByZXMuZGF0YXNcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICBpZih0aGlzLmRlZXAgPCAzKSB7XHJcbiAgICAgICAgdGhpcy5kZWVwICsrXHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0QXJlYUxpc3QoKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=