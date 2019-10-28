'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


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
      navigationBarTitleText: '新增地址'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      userName: '',
      userPhone: '',
      userRegion: [],
      detailedAddress: '',
      community_id: '',

      inputDisabled: false
    }, _this.computed = {}, _this.events = {}, _this.methods = {
      // 选择省市区函数

      userNameInput: function userNameInput(e) {
        this.userName = e.detail.value;
      },
      userPhoneInput: function userPhoneInput(e) {
        this.userPhone = e.detail.value;
      },
      userChangeRegin: function userChangeRegin(e) {
        this.userRegion = e.detail.value;
      },

      detailedAddressInput: function detailedAddressInput(e) {
        this.detailedAddress = e.detail.value;
      },
      orderMeeting: function orderMeeting() {
        //提交input信息到后台
        var userName = this.userName;
        var userPhone = this.userPhone;
        var userRegion = this.userRegion;
        var detailedAddress = this.detailedAddress;

        if (userName == '' || userPhone == '' || userRegion == '' || detailedAddress == '') {
          // app.showModal('请完善信息');
          return;
        }
        // 检测手机号是否填写
        // if (app.validate(userPhone, 'emoji')) {
        // app.showModal('手机号不能包含特殊字符');
        // return;
        // }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      // let userInfo = app.globalData.userInfo
      // this.setData({
      //     inputDisabled:true,
      //     userName: userInfo.name,
      //     userPhone: app.globalData.userInfo.mobile,
      //     password: '******',
      //     userDoorNumber: userInfo.address,
      //     btnShow: false,
      //     addressShow:false
      // })
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/newdeliveryAddress'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld2RlbGl2ZXJ5QWRkcmVzcy5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInVzZXJOYW1lIiwidXNlclBob25lIiwidXNlclJlZ2lvbiIsImRldGFpbGVkQWRkcmVzcyIsImNvbW11bml0eV9pZCIsImlucHV0RGlzYWJsZWQiLCJjb21wdXRlZCIsImV2ZW50cyIsIm1ldGhvZHMiLCJ1c2VyTmFtZUlucHV0IiwiZSIsImRldGFpbCIsInZhbHVlIiwidXNlclBob25lSW5wdXQiLCJ1c2VyQ2hhbmdlUmVnaW4iLCJkZXRhaWxlZEFkZHJlc3NJbnB1dCIsIm9yZGVyTWVldGluZyIsIm9wdGlvbnMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLEVBREw7QUFFTEMsaUJBQVcsRUFGTjtBQUdMQyxrQkFBWSxFQUhQO0FBSUxDLHVCQUFpQixFQUpaO0FBS0xDLG9CQUFjLEVBTFQ7O0FBT0xDLHFCQUFlO0FBUFYsSyxRQVVQQyxRLEdBQVcsRSxRQUVYQyxNLEdBQVMsRSxRQWVUQyxPLEdBQVU7QUFDUjs7QUFFQUMscUJBQWUsdUJBQVNDLENBQVQsRUFBWTtBQUN6QixhQUFLVixRQUFMLEdBQWdCVSxFQUFFQyxNQUFGLENBQVNDLEtBQXpCO0FBQ0QsT0FMTztBQU1SQyxzQkFBZ0Isd0JBQVNILENBQVQsRUFBWTtBQUMxQixhQUFLVCxTQUFMLEdBQWlCUyxFQUFFQyxNQUFGLENBQVNDLEtBQTFCO0FBQ0QsT0FSTztBQVNSRSxxQkFUUSwyQkFTUUosQ0FUUixFQVNXO0FBQ2pCLGFBQUtSLFVBQUwsR0FBa0JRLEVBQUVDLE1BQUYsQ0FBU0MsS0FBM0I7QUFDRCxPQVhPOztBQVlSRyw0QkFBc0IsOEJBQVNMLENBQVQsRUFBWTtBQUNoQyxhQUFLUCxlQUFMLEdBQXVCTyxFQUFFQyxNQUFGLENBQVNDLEtBQWhDO0FBQ0QsT0FkTztBQWVSSSxvQkFBYyx3QkFBVztBQUN2QjtBQUNBLFlBQUloQixXQUFXLEtBQUtBLFFBQXBCO0FBQ0EsWUFBSUMsWUFBWSxLQUFLQSxTQUFyQjtBQUNBLFlBQUlDLGFBQWEsS0FBS0EsVUFBdEI7QUFDQSxZQUFJQyxrQkFBa0IsS0FBS0EsZUFBM0I7O0FBRUEsWUFDRUgsWUFBWSxFQUFaLElBQ0FDLGFBQWEsRUFEYixJQUVBQyxjQUFjLEVBRmQsSUFHQUMsbUJBQW1CLEVBSnJCLEVBS0U7QUFDQTtBQUNBO0FBQ0Q7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7QUFwQ08sSzs7Ozs7MkJBYkhjLE8sRUFBUztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7Ozs7RUFqQ2dDQyxlQUFLQyxJOztrQkFBbkJ6QixLIiwiZmlsZSI6Im5ld2RlbGl2ZXJ5QWRkcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5paw5aKe5Zyw5Z2AJ1xyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHVzZXJOYW1lOiAnJyxcclxuICAgIHVzZXJQaG9uZTogJycsXHJcbiAgICB1c2VyUmVnaW9uOiBbXSxcclxuICAgIGRldGFpbGVkQWRkcmVzczogJycsXHJcbiAgICBjb21tdW5pdHlfaWQ6ICcnLFxyXG5cclxuICAgIGlucHV0RGlzYWJsZWQ6IGZhbHNlXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAvLyBsZXQgdXNlckluZm8gPSBhcHAuZ2xvYmFsRGF0YS51c2VySW5mb1xyXG4gICAgLy8gdGhpcy5zZXREYXRhKHtcclxuICAgIC8vICAgICBpbnB1dERpc2FibGVkOnRydWUsXHJcbiAgICAvLyAgICAgdXNlck5hbWU6IHVzZXJJbmZvLm5hbWUsXHJcbiAgICAvLyAgICAgdXNlclBob25lOiBhcHAuZ2xvYmFsRGF0YS51c2VySW5mby5tb2JpbGUsXHJcbiAgICAvLyAgICAgcGFzc3dvcmQ6ICcqKioqKionLFxyXG4gICAgLy8gICAgIHVzZXJEb29yTnVtYmVyOiB1c2VySW5mby5hZGRyZXNzLFxyXG4gICAgLy8gICAgIGJ0blNob3c6IGZhbHNlLFxyXG4gICAgLy8gICAgIGFkZHJlc3NTaG93OmZhbHNlXHJcbiAgICAvLyB9KVxyXG4gIH1cclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOmAieaLqeecgeW4guWMuuWHveaVsFxyXG5cclxuICAgIHVzZXJOYW1lSW5wdXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgdGhpcy51c2VyTmFtZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgfSxcclxuICAgIHVzZXJQaG9uZUlucHV0OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgIHRoaXMudXNlclBob25lID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICB9LFxyXG4gICAgdXNlckNoYW5nZVJlZ2luKGUpIHtcclxuICAgICAgdGhpcy51c2VyUmVnaW9uID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICB9LFxyXG4gICAgZGV0YWlsZWRBZGRyZXNzSW5wdXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgdGhpcy5kZXRhaWxlZEFkZHJlc3MgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgIH0sXHJcbiAgICBvcmRlck1lZXRpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAvL+aPkOS6pGlucHV05L+h5oGv5Yiw5ZCO5Y+wXHJcbiAgICAgIHZhciB1c2VyTmFtZSA9IHRoaXMudXNlck5hbWU7XHJcbiAgICAgIHZhciB1c2VyUGhvbmUgPSB0aGlzLnVzZXJQaG9uZTtcclxuICAgICAgdmFyIHVzZXJSZWdpb24gPSB0aGlzLnVzZXJSZWdpb247XHJcbiAgICAgIHZhciBkZXRhaWxlZEFkZHJlc3MgPSB0aGlzLmRldGFpbGVkQWRkcmVzcztcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICB1c2VyTmFtZSA9PSAnJyB8fFxyXG4gICAgICAgIHVzZXJQaG9uZSA9PSAnJyB8fFxyXG4gICAgICAgIHVzZXJSZWdpb24gPT0gJycgfHxcclxuICAgICAgICBkZXRhaWxlZEFkZHJlc3MgPT0gJydcclxuICAgICAgKSB7XHJcbiAgICAgICAgLy8gYXBwLnNob3dNb2RhbCgn6K+35a6M5ZaE5L+h5oGvJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIOajgOa1i+aJi+acuuWPt+aYr+WQpuWhq+WGmVxyXG4gICAgICAvLyBpZiAoYXBwLnZhbGlkYXRlKHVzZXJQaG9uZSwgJ2Vtb2ppJykpIHtcclxuICAgICAgLy8gYXBwLnNob3dNb2RhbCgn5omL5py65Y+35LiN6IO95YyF5ZCr54m55q6K5a2X56ymJyk7XHJcbiAgICAgIC8vIHJldHVybjtcclxuICAgICAgLy8gfVxyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIl19