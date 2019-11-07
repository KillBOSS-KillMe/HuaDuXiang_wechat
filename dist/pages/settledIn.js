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
      navigationBarTitleText: '商家入驻'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      status: 0, // -10 没入驻 10入驻审核中 30驳回申请  40入驻成功
      storeGrade: [], // 入驻店铺等级
      timeArr: [{ num: 1 }, { num: 2 }, { num: 3 }],
      storeGradeIndex: 0,
      timeIndex: 0,
      useCostPrice: 0, // 平台使用费用
      bondPrice: 0 // 商家保证金
    }, _this.computed = {
      useCostPrice: function useCostPrice() {
        var num = this.timeArr[this.timeIndex].num;
        var price = this.storeGrade[this.storeGradeIndex] && this.storeGrade[this.storeGradeIndex].sg_price;
        return (Number(num) * Number(price)).toFixed(2);
      }
    }, _this.watch = {}, _this.methods = {
      submit: function submit(e) {
        console.log(e.detail.value);
        var _e$detail$value = e.detail.value,
            admin = _e$detail$value.admin,
            password = _e$detail$value.password,
            name = _e$detail$value.name,
            code = _e$detail$value.code,
            contacts = _e$detail$value.contacts,
            phone = _e$detail$value.phone,
            address = _e$detail$value.address,
            remarks = _e$detail$value.remarks;

        if (!/^(\w){6,20}$/.test(admin)) {
          wx.showToast({
            title: '请输入6至20位商铺账号',
            icon: 'none'
          });
          return false;
        }
        if (!/^(\w){6,20}$/.test(password)) {
          wx.showToast({
            title: '请输入6至20位密码',
            icon: 'none'
          });
          return false;
        }
        if (!name) {
          wx.showToast({
            title: '请输入商铺名称',
            icon: 'none'
          });
          return false;
        }
        if (!/^(\w){6,20}$/.test(code)) {
          wx.showToast({
            title: '请输入6至20位商铺编号',
            icon: 'none'
          });
          return false;
        }
        if (!contacts) {
          wx.showToast({
            title: '请输入联系人姓名',
            icon: 'none'
          });
          return false;
        }
        if (phone.length != 11) {
          wx.showToast({
            title: '请输入正确的联系电话',
            icon: 'none'
          });
          return false;
        }
        if (!address) {
          wx.showToast({
            title: '请输入商铺地址',
            icon: 'none'
          });
          return false;
        }
        if (!remarks) {
          wx.showToast({
            title: '请输入备注',
            icon: 'none'
          });
          return false;
        }

        this.$navigate({ url: 'settledInPay' });
      },
      storeGradeChange: function storeGradeChange(e) {
        var value = e.detail.value;
        this.storeGradeIndex = value;
      },
      timeChange: function timeChange(e) {
        this.timeIndex = e.detail.value;
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this2 = this;

      // 判断是否提交入驻申请
      (0, _ajax.ajax)({
        url: api.isJoin,
        type: 'get'
      }).then(function (res) {
        _this2.status = res.datas.state;
        _this2.$apply();
      });

      (0, _ajax.ajax)({
        url: api.getStoreGrade
      }).then(function (res) {
        _this2.storeGrade = res.datas.data;
        _this2.$apply();
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/settledIn'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZWRJbi5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJzdGF0dXMiLCJzdG9yZUdyYWRlIiwidGltZUFyciIsIm51bSIsInN0b3JlR3JhZGVJbmRleCIsInRpbWVJbmRleCIsInVzZUNvc3RQcmljZSIsImJvbmRQcmljZSIsImNvbXB1dGVkIiwicHJpY2UiLCJzZ19wcmljZSIsIk51bWJlciIsInRvRml4ZWQiLCJ3YXRjaCIsIm1ldGhvZHMiLCJzdWJtaXQiLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsInZhbHVlIiwiYWRtaW4iLCJwYXNzd29yZCIsIm5hbWUiLCJjb2RlIiwiY29udGFjdHMiLCJwaG9uZSIsImFkZHJlc3MiLCJyZW1hcmtzIiwidGVzdCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwibGVuZ3RoIiwiJG5hdmlnYXRlIiwidXJsIiwic3RvcmVHcmFkZUNoYW5nZSIsInRpbWVDaGFuZ2UiLCJldmVudHMiLCJpc0pvaW4iLCJ0eXBlIiwidGhlbiIsInJlcyIsImRhdGFzIiwic3RhdGUiLCIkYXBwbHkiLCJnZXRTdG9yZUdyYWRlIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFJcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxjQUFRLENBREgsRUFDTTtBQUNYQyxrQkFBWSxFQUZQLEVBRVk7QUFDakJDLGVBQVMsQ0FBQyxFQUFDQyxLQUFLLENBQU4sRUFBRCxFQUFVLEVBQUNBLEtBQUssQ0FBTixFQUFWLEVBQW1CLEVB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QS9EVCxFQStEWTtBQUNsQixZQUFJSSxRQUFRSixFQUFFRyxNQUFGLENBQVNDLEtBQXJCO0FBQ0EsYUFBS2hCLGVBQUwsR0FBdUJnQixLQUF2QjtBQUNELE9BbEVPO0FBbUVSa0IsZ0JBbkVRLHNCQW1FR3RCLENBbkVILEVBbUVLO0FBQ1gsYUFBS1gsU0FBTCxHQUFpQlcsRUFBRUcsTUFBRixDQUFTQyxLQUExQjtBQUNEO0FBckVPLEssUUF3RVZtQixNLEdBQVMsRTs7Ozs7NkJBMUVBLENBQUU7Ozs2QkE0RUY7QUFBQTs7QUFFTDtBQUNGLHNCQUFLO0FBQ0hILGFBQUs1QyxJQUFJZ0QsTUFETjtBQUVIQyxjQUFNO0FBRkgsT0FBTCxFQUdHQyxJQUhILENBR1EsZUFBTztBQUNiLGVBQUsxQyxNQUFMLEdBQWMyQyxJQUFJQyxLQUFKLENBQVVDLEtBQXhCO0FBQ0EsZUFBS0MsTUFBTDtBQUNELE9BTkQ7O0FBUUEsc0JBQUs7QUFDSFYsYUFBSzVDLElBQUl1RDtBQUROLE9BQUwsRUFFR0wsSUFGSCxDQUVRLGVBQU87QUFDYixlQUFLekMsVUFBTCxHQUFrQjBDLElBQUlDLEtBQUosQ0FBVTdDLElBQTVCO0FBQ0EsZUFBSytDLE1BQUw7QUFDRCxPQUxEO0FBT0Q7Ozs7RUF2SGdDRSxlQUFLQyxJOztrQkFBbkJ2RCxLIiwiZmlsZSI6InNldHRsZWRJbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblrrblhaXpqbsnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgc3RhdHVzOiAwLCAvLyAtMTAg5rKh5YWl6am7IDEw5YWl6am75a6h5qC45LitIDMw6amz5Zue55Sz6K+3ICA0MOWFpempu+aIkOWKn1xyXG4gICAgc3RvcmVHcmFkZTogW10sICAvLyDlhaXpqbvlupfpk7rnrYnnuqdcclxuICAgIHRpbWVBcnI6IFt7bnVtOiAxfSx7bnVtOiAyfSx7bnVtOiAzfV0sXHJcbiAgICBzdG9yZUdyYWRlSW5kZXg6IDAsXHJcbiAgICB0aW1lSW5kZXg6IDAsXHJcbiAgICB1c2VDb3N0UHJpY2U6IDAsIC8vIOW5s+WPsOS9v+eUqOi0ueeUqFxyXG4gICAgYm9uZFByaWNlOiAwLCAvLyDllYblrrbkv53or4Hph5FcclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHtcclxuICAgIHVzZUNvc3RQcmljZSgpIHtcclxuICAgICAgdmFyIG51bSA9IHRoaXMudGltZUFyclt0aGlzLnRpbWVJbmRleF0ubnVtXHJcbiAgICAgIHZhciBwcmljZSA9IHRoaXMuc3RvcmVHcmFkZVt0aGlzLnN0b3JlR3JhZGVJbmRleF0gJiYgdGhpcy5zdG9yZUdyYWRlW3RoaXMuc3RvcmVHcmFkZUluZGV4XS5zZ19wcmljZVxyXG4gICAgICByZXR1cm4gKE51bWJlcihudW0pICogTnVtYmVyKHByaWNlKSkudG9GaXhlZCgyKVxyXG4gICAgfVxyXG4gIH07XHJcbiAgb25TaG93KCkge31cclxuICB3YXRjaCA9IHt9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHN1Ym1pdChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgICB2YXIge2FkbWluLCBwYXNzd29yZCwgbmFtZSwgY29kZSwgY29udGFjdHMsIHBob25lLCBhZGRyZXNzLCByZW1hcmtzfSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIGlmKCEvXihcXHcpezYsMjB9JC8udGVzdChhZG1pbikpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaU26IezMjDkvY3llYbpk7rotKblj7cnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighL14oXFx3KXs2LDIwfSQvLnRlc3QocGFzc3dvcmQpKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWlNuiHszIw5L2N5a+G56CBJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIW5hbWUpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXllYbpk7rlkI3np7AnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighL14oXFx3KXs2LDIwfSQvLnRlc3QoY29kZSkpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaU26IezMjDkvY3llYbpk7rnvJblj7cnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighY29udGFjdHMpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXogZTns7vkurrlp5PlkI0nLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZihwaG9uZS5sZW5ndGggIT0gMTEpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXmraPnoa7nmoTogZTns7vnlLXor50nLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighYWRkcmVzcykge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeWVhumTuuWcsOWdgCcsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGlmKCFyZW1hcmtzKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5aSH5rOoJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiAnc2V0dGxlZEluUGF5JyB9KTtcclxuICAgIH0sXHJcbiAgICBzdG9yZUdyYWRlQ2hhbmdlKGUpIHtcclxuICAgICAgdmFyIHZhbHVlID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgdGhpcy5zdG9yZUdyYWRlSW5kZXggPSB2YWx1ZVxyXG4gICAgfSxcclxuICAgIHRpbWVDaGFuZ2UoZSl7XHJcbiAgICAgIHRoaXMudGltZUluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuXHJcbiAgb25Mb2FkKCkge1xyXG5cclxuICAgICAgLy8g5Yik5pat5piv5ZCm5o+Q5Lqk5YWl6am755Sz6K+3XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuaXNKb2luLFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5zdGF0dXMgPSByZXMuZGF0YXMuc3RhdGVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuZ2V0U3RvcmVHcmFkZVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlR3JhZGUgPSByZXMuZGF0YXMuZGF0YVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gICAgXHJcbiAgfVxyXG59XHJcbiJdfQ==