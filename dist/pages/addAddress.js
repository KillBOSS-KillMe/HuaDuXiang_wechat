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
        console.log(e);
        var arr = e.detail.value;
        arr = arr.map(function (item) {
          return item ? item : 0;
        });
        var province = this.addressArr[0][arr[0]].area_name;
        var city = this.addressArr[1][arr[1]].area_name;
        var area = this.addressArr[2][arr[2]].area_name;
        this.addressInfo.area_info = province + ',' + city + ',' + area;
        this.addressInfo.city_id = this.addressArr[1][arr[1]].area_id;
        this.addressInfo.area_id = this.addressArr[2][arr[2]].area_id;
        this.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZEFkZHJlc3MuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsIkluZGV4IiwiY29uZmlnIiwiZGF0YSIsImFkZHJlc3NJbmZvIiwiaXNfZGVmYXVsdCIsInBhcmVudF9pZCIsImRlZXAiLCJhZGRyZXNzQXJyIiwibmFtZSIsInBob25lIiwiYWRkcmVzcyIsImNvbXBvbmVudHMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJzZXRBZGRyZXNzIiwiJGFwcGx5Iiwic3VibWl0IiwiZSIsInRoYXQiLCJkZXRhaWwiLCJ2YWx1ZSIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwibGVuZ3RoIiwiYXJlYV9pbmZvIiwiYWRkcmVzc19pZCIsInVybCIsImFkZHJlc3NFZGl0IiwidHJ1ZV9uYW1lIiwidGVsX3Bob25lIiwiYXJlYV9pZCIsImNpdHlfaWQiLCJ0aGVuIiwicmVzIiwiZGF0YXMiLCJzdGF0ZSIsIm1zZyIsInRpbWVyIiwic2V0VGltZW91dCIsIm5hdmlnYXRlQmFjayIsImNsZWFyVGltZW91dCIsImFkZHJlc3NBZGQiLCJiaW5kTXVsdGlQaWNrZXJDaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwiYXJyIiwibWFwIiwiaXRlbSIsInByb3ZpbmNlIiwiYXJlYV9uYW1lIiwiY2l0eSIsImFyZWEiLCJiaW5kTXVsdGlQaWNrZXJDb2x1bW5DaGFuZ2UiLCJjb2x1bW4iLCJyZXF1ZXN0QXJlYUxpc3QiLCJvcHRpb25zIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiYWRkcmVzc19pbmZvIiwiYXJlYUxpc3QiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBSXFCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUyxFLFFBQ1RDLEksR0FBTztBQUNMQyxtQkFBYSxFQURSLEVBQ1k7QUFDakJDLGtCQUFZLENBRlAsRUFFVTtB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c0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge307XHJcbiAgZGF0YSA9IHtcclxuICAgIGFkZHJlc3NJbmZvOiB7fSwgLy8g5Zyw5Z2A5L+h5oGvXHJcbiAgICBpc19kZWZhdWx0OiAwLCAvLyDmmK/lkKbpu5jorqRcclxuICAgIHBhcmVudF9pZDogbnVsbCwgLy8g5Yy65Z+f5LiK57qnaWRcclxuICAgIGRlZXA6IDEsIC8vIDHnnIEy5biCM+WMulxyXG4gICAgYWRkcmVzc0FycjogW10sIC8vIOecgeW4guWMuuS/oeaBr1xyXG4gICAgbmFtZTogJycsIC8vIOWQjeWtl1xyXG4gICAgcGhvbmU6ICcnLCAvLyDmiYvmnLpcclxuICAgIGFkZHJlc3M6ICcnLCAvL+ivpue7huWcsOWdgFxyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOWIh+aNouaYr+WQpumAieS4rem7mOiupOWcsOWdgFxyXG4gICAgc2V0QWRkcmVzcygpIHtcclxuICAgICAgdGhpcy5pc19kZWZhdWx0ID0gdGhpcy5pc19kZWZhdWx0ID09IDAgPyAxOiAwXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgdGhpcy5hZGRyZXNzSW5mby5pc19kZWZhdWx0ID0gdGhpcy5pc19kZWZhdWx0XHJcbiAgICB9LFxyXG4gICAgLy8g5L+d5a2YXHJcbiAgICBzdWJtaXQoZSkge1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHZhciB7IGFkZHJlc3MsIG5hbWUsIHBob25lIH0gPSB7IC4uLmUuZGV0YWlsLnZhbHVlIH07XHJcbiAgICAgIGlmICghbmFtZSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeWnk+WQjScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHBob25lLmxlbmd0aCAhPSAxMSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPt+eggScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLmFkZHJlc3NJbmZvLmFyZWFfaW5mbykge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWcsOWMuicsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFhZGRyZXNzKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5Zyw5Z2AJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICAvLyBhZGRyZXNzX2lk5a2Y5ZyoIOWwseaYr+e8lui+keWcsOWdgCDlkKbliJnmmK/mt7vliqDmlrDlnLDlnYBcclxuICAgICAgaWYgKHRoaXMuYWRkcmVzc0luZm8uYWRkcmVzc19pZCkge1xyXG4gICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgdXJsOiBhcGkuYWRkcmVzc0VkaXQsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHRydWVfbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyxcclxuICAgICAgICAgICAgYXJlYV9pbmZvOiB0aGlzLmFkZHJlc3NJbmZvLmFyZWFfaW5mbyxcclxuICAgICAgICAgICAgdGVsX3Bob25lOiBwaG9uZSxcclxuICAgICAgICAgICAgYXJlYV9pZDogdGhpcy5hZGRyZXNzSW5mby5hcmVhX2lkLFxyXG4gICAgICAgICAgICBjaXR5X2lkOiB0aGlzLmFkZHJlc3NJbmZvLmNpdHlfaWQsXHJcbiAgICAgICAgICAgIGlzX2RlZmF1bHQ6IHRoaXMuaXNfZGVmYXVsdCxcclxuICAgICAgICAgICAgYWRkcmVzc19pZDogdGhpcy5hZGRyZXNzSW5mby5hZGRyZXNzX2lkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgaWYocmVzLmRhdGFzLnN0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGFzLm1zZ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcclxuICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5tc2csXHJcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhamF4KHtcclxuICAgICAgICAgIHVybDogYXBpLmFkZHJlc3NBZGQsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHRydWVfbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyxcclxuICAgICAgICAgICAgYXJlYV9pbmZvOiB0aGlzLmFkZHJlc3NJbmZvLmFyZWFfaW5mbyxcclxuICAgICAgICAgICAgdGVsX3Bob25lOiBwaG9uZSxcclxuICAgICAgICAgICAgYXJlYV9pZDogdGhpcy5hZGRyZXNzSW5mby5hcmVhX2lkLFxyXG4gICAgICAgICAgICBjaXR5X2lkOiB0aGlzLmFkZHJlc3NJbmZvLmNpdHlfaWQsXHJcbiAgICAgICAgICAgIGlzX2RlZmF1bHQ6IHRoaXMuaXNfZGVmYXVsdFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIGlmKHJlcy5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5tc2dcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdmFyIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcclxuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXHJcbiAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMubXNnLFxyXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiaW5kTXVsdGlQaWNrZXJDaGFuZ2UoZSl7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICAgIHZhciBhcnIgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICBhcnIgPSBhcnIubWFwKGl0ZW0gPT4gaXRlbSA/IGl0ZW0gOiAwKVxyXG4gICAgICB2YXIgcHJvdmluY2UgPSB0aGlzLmFkZHJlc3NBcnJbMF1bYXJyWzBdXS5hcmVhX25hbWVcclxuICAgICAgdmFyIGNpdHkgPSB0aGlzLmFkZHJlc3NBcnJbMV1bYXJyWzFdXS5hcmVhX25hbWVcclxuICAgICAgdmFyIGFyZWEgPSB0aGlzLmFkZHJlc3NBcnJbMl1bYXJyWzJdXS5hcmVhX25hbWVcclxuICAgICAgdGhpcy5hZGRyZXNzSW5mby5hcmVhX2luZm8gPSBgJHtwcm92aW5jZX0sJHtjaXR5fSwke2FyZWF9YFxyXG4gICAgICB0aGlzLmFkZHJlc3NJbmZvLmNpdHlfaWQgPSB0aGlzLmFkZHJlc3NBcnJbMV1bYXJyWzFdXS5hcmVhX2lkXHJcbiAgICAgIHRoaXMuYWRkcmVzc0luZm8uYXJlYV9pZCA9IHRoaXMuYWRkcmVzc0FyclsyXVthcnJbMl1dLmFyZWFfaWRcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGJpbmRNdWx0aVBpY2tlckNvbHVtbkNoYW5nZShlKXtcclxuICAgICAgdmFyIGNvbHVtbiA9IGUuZGV0YWlsLmNvbHVtblxyXG4gICAgICB2YXIgdmFsdWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB0aGlzLnBhcmVudF9pZCA9IHRoaXMuYWRkcmVzc0Fycltjb2x1bW5dW3ZhbHVlXS5hcmVhX2lkXHJcbiAgICAgIHRoaXMuZGVlcCA9IGNvbHVtbiArIDJcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAvLyAyLumAieaLqSfnnIEn6K+35rGCICfluIInLCfljLonIDLmrKFcclxuICAgICAgLy8gMy7pgInmi6kn5biCJ+ivt+axgiAn5Yy6JyAx5qyhXHJcbiAgICAgIC8vIDQu6YCJ5oupJ+WMuifkuI3or7fmsYJcclxuICAgICAgaWYoY29sdW1uPDIpIHtcclxuICAgICAgICB0aGlzLnJlcXVlc3RBcmVhTGlzdCgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICBjb25zb2xlLmxvZyhvcHRpb25zKVxyXG4gICAgLy8g5LygaWTov5vmnaXlsLHmmK/mlLnlj5jlnLDlnYAg5YWI6K+35Zyw5Z2A5L+h5oGvXHJcbiAgICBpZiAob3B0aW9ucy5hZGRyZXNzX2lkKSB7XHJcbiAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgICAgdGl0bGU6ICfkv67mlLnlnLDlnYAnXHJcbiAgICAgIH0pXHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLmFkZHJlc3NJbmZvLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGFkZHJlc3NfaWQ6IG9wdGlvbnMuYWRkcmVzc19pZFxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuYWRkcmVzc0luZm8gPSByZXMuZGF0YXMuYWRkcmVzc19pbmZvXHJcbiAgICAgICAgdGhpcy5pc19kZWZhdWx0ID0gcmVzLmRhdGFzLmFkZHJlc3NfaW5mby5pc19kZWZhdWx0XHJcbiAgICAgICAgdGhpcy5uYW1lID0gcmVzLmRhdGFzLmFkZHJlc3NfaW5mby50cnVlX25hbWVcclxuICAgICAgICB0aGlzLnBob25lID0gcmVzLmRhdGFzLmFkZHJlc3NfaW5mby50ZWxfcGhvbmVcclxuICAgICAgICB0aGlzLmFkZHJlc3MgPSByZXMuZGF0YXMuYWRkcmVzc19pbmZvLmFkZHJlc3NcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgICB0aXRsZTogJ+a3u+WKoOWcsOWdgCdcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIDEu6buY6K6k6K+35rGCICfnnIEnLCfluIInLCfljLonIDPmrKFcclxuICAgIHRoaXMucmVxdWVzdEFyZWFMaXN0KClcclxuICB9XHJcblxyXG4gIHJlcXVlc3RBcmVhTGlzdCgpe1xyXG4gICAgYWpheCh7XHJcbiAgICAgIGljb246ICdub25lJyxcclxuICAgICAgdXJsOiBhcGkuYXJlYUxpc3QsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBwYXJlbnRfaWQ6IHRoaXMucGFyZW50X2lkLFxyXG4gICAgICAgIGRlZXA6IHRoaXMuZGVlcCxcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnBhcmVudF9pZCA9IHJlcy5kYXRhc1swXS5hcmVhX2lkXHJcbiAgICAgIHRoaXMuYWRkcmVzc0Fyclt0aGlzLmRlZXAgLSAxXSA9IHJlcy5kYXRhc1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIGlmKHRoaXMuZGVlcCA8IDMpIHtcclxuICAgICAgICB0aGlzLmRlZXAgKytcclxuICAgICAgICB0aGlzLnJlcXVlc3RBcmVhTGlzdCgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==