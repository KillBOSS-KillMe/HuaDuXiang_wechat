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
      bondPrice: 0, // 商家保证金
      storeClass: [], // 店铺分类
      storeClassIndex: 0 //店铺分类索引
    }, _this.computed = {
      useCostPrice: function useCostPrice() {
        var num = this.timeArr[this.timeIndex].num;
        var price = this.storeGrade[this.storeGradeIndex] && this.storeGrade[this.storeGradeIndex].sg_price;
        return (Number(num) * Number(price)).toFixed(2);
      },
      bondPrice: function bondPrice() {
        var price = this.storeClass[this.storeClassIndex] && this.storeClass[this.storeClassIndex].sc_bail;
        return Number(price).toFixed(2);
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
        (0, _ajax.ajax)({
          url: api.addStore,
          data: {
            store_name: name, //'店铺名',
            store_code: code, //'商家自定编码',
            contacts_name: contacts, //'商家联系人',
            contacts_phone: phone, //'商家联系电话',
            company_address_detail: address, //'商家地址',
            remark: remarks, //'入驻申请备注',
            joinin_year: this.timeArr[this.timeIndex].num, //'入驻时长',
            sc_id: this.storeClass[this.storeClassIndex].sc_id, //'店铺分类编号',
            sc_name: this.storeClass[this.storeClassIndex].sc_name, //'店铺分类名称',
            sc_bail: this.storeClass[this.storeClassIndex].sc_bail, //'店铺分类保证金',
            sg_id: this.storeGrade[this.storeGradeIndex].sg_id, //'店铺等级编号',
            sg_name: this.storeGrade[this.storeGradeIndex].sg_name, //'店铺等级名称',
            sg_info: this.storeGrade[this.storeGradeIndex].sg_price, //'店铺等级价格',
            seller_name: admin, //'卖家账号'
            seller_psw: password // 密码
          }
        }).then(function (res) {
          wx.showToast({
            title: res.datas.msg,
            icon: 'none'
          });
        });
        // this.$navigate({ url: 'settledInPay' });
      },
      storeGradeChange: function storeGradeChange(e) {
        var value = e.detail.value;
        this.storeGradeIndex = value;
      },
      timeChange: function timeChange(e) {
        this.timeIndex = e.detail.value;
      },
      storeClassChange: function storeClassChange(e) {
        this.storeClassIndex = e.detail.value;
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
      // 店铺等级
      (0, _ajax.ajax)({
        url: api.getStoreGrade
      }).then(function (res) {
        _this2.storeGrade = res.datas.data;
        _this2.$apply();
      });
      // 店铺分类
      (0, _ajax.ajax)({
        url: api.getStoreClass
      }).then(function (res) {
        _this2.storeClass = res.datas.data || [];
        _this2.$apply();
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/settledIn'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZWRJbi5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJzdGF0dXMiLCJzdG9yZUdyYWRlIiwidGltZUFyciIsIm51bSIsInN0b3JlR3JhZGVJbmRleCIsInRpbWVJbmRleCIsInVzZUNvc3RQcmljZSIsImJvbmRQcmljZSIsInN0b3JlQ2xhc3MiLCJzdG9yZUNsYXNzSW5kZXgiLCJjb21wdXRlZCIsInByaWNlIiwic2dfcHJpY2UiLCJOdW1iZXIiLCJ0b0ZpeGVkIiwic2NfYmFpbCIsIndhdGNoIiwibWV0aG9kcyIsInN1Ym1pdCIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwidmFsdWUiLCJhZG1pbiIsInBhc3N3b3JkIiwibmFtZSIsImNvZGUiLCJjb250YWN0cyIsInBob25lIiwiYWRkcmVzcyIsInJlbWFya3MiLCJ0ZXN0Iiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJsZW5ndGgiLCJ1cmwiLCJhZGRTdG9yZSIsInN0b3JlX25hbWUiLCJzdG9yZV9jb2RlIiwiY29udGFjdHNfbmFtZSIsImNvbnRhY3RzX3Bob25lIiwiY29tcGFueV9hZGRyZXNzX2RldGFpbCIsInJlbWFyayIsImpvaW5pbl95ZWFyIiwic2NfaWQiLCJzY19uYW1lIiwic2dfaWQiLCJzZ19uYW1lIiwic2dfaW5mbyIsInNlbGxlcl9uYW1lIiwic2VsbGVyX3BzdyIsInRoZW4iLCJyZXMiLCJkYXRhcyIsIm1zZyIsInN0b3JlR3JhZGVDaGFuZ2UiLCJ0aW1lQ2hhbmdlIiwic3RvcmVDbGFzc0NoYW5nZSIsImV2ZW50cyIsImlzSm9pbiIsInR5cGUiLCJzdGF0ZSIsIiRhcHBseSIsImdldFN0b3JlR3JhZGUiLCJnZXRTdG9yZUNsYXNzIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFJcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxjQUFRLENBREgsRUFDTTtBQUNYQyxrQkFBWSxFQUZQLEVBRVk7QUFDakJDLGVBQVMsQ0FBQyxFQUFDQyxLQUFLLENBQU4sRUFBRCxFQUFVLEVBQUNBLEtBQUssQ0FBTixFQUFWLEVBQW1CLEVBQUNBLEtBQUssQ0FBTixFQUFuQixDQUhKO0FBSUxDLHVCQUFpQixDQUpaO0FBS0xDLGlCQUFXLENBTE47QUFNTEMsb0JBQWMsQ0FOVCxFQU1ZO0FBQ2pCQyxpQkFBVyxDQVBOLEVBT1M7QUFDZEMsa0JBQVksRUFSUCxFQVFXO0FBQ2hCQyx1QkFBaUIsQ0FUWixDQVNlO0FBVGYsSyxRQVlQQyxRLEdBQVc7QUFDVEosa0JBRFMsMEJBQ007QUFDYixZQUFJSCxNQUFNLEtBQUtELE9BQUwsQ0FBYSxLQUFLRyxTQUFsQixFQUE2QkYsR0FBdkM7QUFDQSxZQUFJUSxRQUFRLEtBQUtWLFVBQUwsQ0FBZ0IsS0FBS0csZUFBckIsS0FBeUMsS0FBS0gsVUFBTCxDQUFnQixLQUFLRyxlQUFyQixFQUFzQ1EsUUFBM0Y7QUFDQSxlQUFPLENBQUNDLE9BQU9WLEdBQVAsSUFBY1UsT0FBT0YsS0FBUCxDQUFmLEVBQThCRyxPQUE5QixDQUFzQyxDQUF0QyxDQUFQO0FBQ0QsT0FMUTtBQU1UUCxlQU5TLHVCQU1HO0FBQ1YsWUFBSUksUUFBUSxLQUFLSCxVQUFMLENBQWdCLEtBQUtDLGVBQXJCLEtBQXlDLEtBQUtELFVBQUwsQ0FBZ0IsS0FBS0MsZUFBckIsRUFBc0NNLE9BQTNGO0FBQ0EsZUFBT0YsT0FBT0YsS0FBUCxFQUFjRyxPQUFkLENBQXNCLENBQXRCLENBQVA7QUFDRDtBQVRRLEssUUFZWEUsSyxHQUFRLEUsUUFDUkMsTyxHQUFVO0FBQ1JDLFlBRFEsa0JBQ0RDLENBREMsRUFDRTtBQUNSQyxnQkFBUUMsR0FBUixDQUFZRixFQUFFRyxNQUFGLENBQVNDLEtBQXJCO0FBRFEsOEJBRStESixFQUFFRyxNQUFGLENBQVNDLEtBRnhFO0FBQUEsWUFFSEMsS0FGRyxtQkFFSEEsS0FGRztBQUFBLFlBRUlDLFFBRkosbUJBRUlBLFFBRko7QUFBQSxZQUVjQyxJQUZkLG1CQUVjQSxJQUZkO0FBQUEsWUFFb0JDLElBRnBCLG1CQUVvQkEsSUFGcEI7QUFBQSxZQUUwQkMsUUFGMUIsbUJBRTBCQSxRQUYxQjtBQUFBLFlBRW9DQyxLQUZwQyxtQkFFb0NBLEtBRnBDO0FBQUEsWUFFMkNDLE9BRjNDLG1CQUUyQ0EsT0FGM0M7QUFBQSxZQUVvREMsT0FGcEQsbUJBRW9EQSxPQUZwRDs7QUFHUixZQUFHLENBQUMsZUFBZUMsSUFBZixDQUFvQlIsS0FBcEIsQ0FBSixFQUFnQztBQUM5QlMsYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPLGNBREk7QUFFWEMsa0JBQU07QUFGSyxXQUFiO0FBSUEsaUJBQU8sS0FBUDtBQUNEO0FBQ0QsWUFBRyxDQUFDLGVBQWVKLElBQWYsQ0FBb0JQLFFBQXBCLENBQUosRUFBbUM7QUFDakNRLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxZQURJO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlBLGlCQUFPLEtBQVA7QUFDRDtBQUNELFlBQUcsQ0FBQ1YsSUFBSixFQUFVO0FBQ1JPLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxTQURJO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlBLGlCQUFPLEtBQVA7QUFDRDtBQUNELFlBQUcsQ0FBQyxlQUFlSixJQUFmLENBQW9CTCxJQUFwQixDQUFKLEVBQStCO0FBQzdCTSxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sY0FESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFHLENBQUNSLFFBQUosRUFBYztBQUNaSyxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sVUFESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFHUCxNQUFNUSxNQUFOLElBQWdCLEVBQW5CLEVBQXVCO0FBQ3JCSixhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sWUFESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFHLENBQUNOLE9BQUosRUFBYTtBQUNYRyxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sU0FESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFHLENBQUNMLE9BQUosRUFBYTtBQUNYRSxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sT0FESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCx3QkFBSztBQUNIRSxlQUFLOUMsSUFBSStDLFFBRE47QUFFSHhDLGdCQUFNO0FBQ0p5Qyx3QkFBWWQsSUFEUixFQUNjO0FBQ2xCZSx3QkFBWWQsSUFGUixFQUVjO0FBQ2xCZSwyQkFBZWQsUUFIWCxFQUdxQjtBQUN6QmUsNEJBQWdCZCxLQUpaLEVBSW1CO0FBQ3ZCZSxvQ0FBd0JkLE9BTHBCLEVBSzZCO0FBQ2pDZSxvQkFBUWQsT0FOSixFQU1hO0FBQ2pCZSx5QkFBYSxLQUFLNUMsT0FBTCxDQUFhLEtBQUtHLFNBQWxCLEVBQTZCRixHQVB0QyxFQU8yQztBQUMvQzRDLG1CQUFRLEtBQUt2QyxVQUFMLENBQWdCLEtBQUtDLGVBQXJCLEVBQXNDc0MsS0FSMUMsRUFRaUQ7QUFDckRDLHFCQUFTLEtBQUt4QyxVQUFMLENBQWdCLEtBQUtDLGVBQXJCLEVBQXNDdUMsT0FUM0MsRUFTb0Q7QUFDeERqQyxxQkFBUyxLQUFLUCxVQUFMLENBQWdCLEtBQUtDLGVBQXJCLEVBQXNDTSxPQVYzQyxFQVVvRDtBQUN4RGtDLG1CQUFPLEtBQUtoRCxVQUFMLENBQWdCLEtBQUtHLGVBQXJCLEVBQXNDNkMsS0FYekMsRUFXZ0Q7QUFDcERDLHFCQUFTLEtBQUtqRCxVQUFMLENBQWdCLEtBQUtHLGVBQXJCLEVBQXNDOEMsT0FaM0MsRUFZb0Q7QUFDeERDLHFCQUFTLEtBQUtsRCxVQUFMLENBQWdCLEtBQUtHLGVBQXJCLEVBQXNDUSxRQWIzQyxFQWFxRDtBQUN6RHdDLHlCQUFhNUIsS0FkVCxFQWNnQjtBQUNwQjZCLHdCQUFZNUIsUUFmUixDQWVrQjtBQWZsQjtBQUZILFNBQUwsRUFtQkc2QixJQW5CSCxDQW1CUSxlQUFPO0FBQ2JyQixhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU9vQixJQUFJQyxLQUFKLENBQVVDLEdBRE47QUFFWHJCLGtCQUFNO0FBRkssV0FBYjtBQUlELFNBeEJEO0FBeUJBO0FBQ0QsT0F0Rk87QUF1RlJzQixzQkF2RlEsNEJBdUZTdkMsQ0F2RlQsRUF1Rlk7QUFDbEIsWUFBSUksUUFBUUosRUFBRUcsTUFBRixDQUFTQyxLQUFyQjtBQUNBLGFBQUtuQixlQUFMLEdBQXVCbUIsS0FBdkI7QUFDRCxPQTFGTztBQTJGUm9DLGdCQTNGUSxzQkEyRkd4QyxDQTNGSCxFQTJGSztBQUNYLGFBQUtkLFNBQUwsR0FBaUJjLEVBQUVHLE1BQUYsQ0FBU0MsS0FBMUI7QUFDRCxPQTdGTztBQThGUnFDLHNCQTlGUSw0QkE4RlN6QyxDQTlGVCxFQThGWTtBQUNsQixhQUFLVixlQUFMLEdBQXVCVSxFQUFFRyxNQUFGLENBQVNDLEtBQWhDO0FBRUQ7QUFqR08sSyxRQW9HVnNDLE0sR0FBUyxFOzs7Ozs2QkF0R0EsQ0FBRTs7OzZCQXdHRjtBQUFBOztBQUVMO0FBQ0Ysc0JBQUs7QUFDSHZCLGFBQUs5QyxJQUFJc0UsTUFETjtBQUVIQyxjQUFNO0FBRkgsT0FBTCxFQUdHVCxJQUhILENBR1EsZUFBTztBQUNiLGVBQUt0RCxNQUFMLEdBQWN1RCxJQUFJQyxLQUFKLENBQVVRLEtBQXhCO0FBQ0EsZUFBS0MsTUFBTDtBQUNELE9BTkQ7QUFPQTtBQUNBLHNCQUFLO0FBQ0gzQixhQUFLOUMsSUFBSTBFO0FBRE4sT0FBTCxFQUVHWixJQUZILENBRVEsZUFBTztBQUNiLGVBQUtyRCxVQUFMLEdBQWtCc0QsSUFBSUMsS0FBSixDQUFVekQsSUFBNUI7QUFDQSxlQUFLa0UsTUFBTDtBQUNELE9BTEQ7QUFNQTtBQUNBLHNCQUFLO0FBQ0gzQixhQUFLOUMsSUFBSTJFO0FBRE4sT0FBTCxFQUVHYixJQUZILENBRVEsZUFBTztBQUNiLGVBQUs5QyxVQUFMLEdBQWtCK0MsSUFBSUMsS0FBSixDQUFVekQsSUFBVixJQUFrQixFQUFwQztBQUNBLGVBQUtrRSxNQUFMO0FBQ0QsT0FMRDtBQVNEOzs7O0VBbEtnQ0csZUFBS0MsSTs7a0JBQW5CM0UsSyIsImZpbGUiOiJzZXR0bGVkSW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5a625YWl6am7J1xyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHN0YXR1czogMCwgLy8gLTEwIOayoeWFpempuyAxMOWFpempu+WuoeaguOS4rSAzMOmps+WbnueUs+ivtyAgNDDlhaXpqbvmiJDlip9cclxuICAgIHN0b3JlR3JhZGU6IFtdLCAgLy8g5YWl6am75bqX6ZO6562J57qnXHJcbiAgICB0aW1lQXJyOiBbe251bTogMX0se251bTogMn0se251bTogM31dLFxyXG4gICAgc3RvcmVHcmFkZUluZGV4OiAwLFxyXG4gICAgdGltZUluZGV4OiAwLFxyXG4gICAgdXNlQ29zdFByaWNlOiAwLCAvLyDlubPlj7Dkvb/nlKjotLnnlKhcclxuICAgIGJvbmRQcmljZTogMCwgLy8g5ZWG5a625L+d6K+B6YeRXHJcbiAgICBzdG9yZUNsYXNzOiBbXSwgLy8g5bqX6ZO65YiG57G7XHJcbiAgICBzdG9yZUNsYXNzSW5kZXg6IDAsIC8v5bqX6ZO65YiG57G757Si5byVXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7XHJcbiAgICB1c2VDb3N0UHJpY2UoKSB7XHJcbiAgICAgIHZhciBudW0gPSB0aGlzLnRpbWVBcnJbdGhpcy50aW1lSW5kZXhdLm51bVxyXG4gICAgICB2YXIgcHJpY2UgPSB0aGlzLnN0b3JlR3JhZGVbdGhpcy5zdG9yZUdyYWRlSW5kZXhdICYmIHRoaXMuc3RvcmVHcmFkZVt0aGlzLnN0b3JlR3JhZGVJbmRleF0uc2dfcHJpY2VcclxuICAgICAgcmV0dXJuIChOdW1iZXIobnVtKSAqIE51bWJlcihwcmljZSkpLnRvRml4ZWQoMilcclxuICAgIH0sXHJcbiAgICBib25kUHJpY2UoKSB7XHJcbiAgICAgIHZhciBwcmljZSA9IHRoaXMuc3RvcmVDbGFzc1t0aGlzLnN0b3JlQ2xhc3NJbmRleF0gJiYgdGhpcy5zdG9yZUNsYXNzW3RoaXMuc3RvcmVDbGFzc0luZGV4XS5zY19iYWlsXHJcbiAgICAgIHJldHVybiBOdW1iZXIocHJpY2UpLnRvRml4ZWQoMilcclxuICAgIH1cclxuICB9O1xyXG4gIG9uU2hvdygpIHt9XHJcbiAgd2F0Y2ggPSB7fVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBzdWJtaXQoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC52YWx1ZSlcclxuICAgICAgdmFyIHthZG1pbiwgcGFzc3dvcmQsIG5hbWUsIGNvZGUsIGNvbnRhY3RzLCBwaG9uZSwgYWRkcmVzcywgcmVtYXJrc30gPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICBpZighL14oXFx3KXs2LDIwfSQvLnRlc3QoYWRtaW4pKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWlNuiHszIw5L2N5ZWG6ZO66LSm5Y+3JyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIS9eKFxcdyl7NiwyMH0kLy50ZXN0KHBhc3N3b3JkKSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpTboh7MyMOS9jeWvhueggScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGlmKCFuYW1lKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5ZWG6ZO65ZCN56ewJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIS9eKFxcdyl7NiwyMH0kLy50ZXN0KGNvZGUpKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWlNuiHszIw5L2N5ZWG6ZO657yW5Y+3JyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIWNvbnRhY3RzKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl6IGU57O75Lq65aeT5ZCNJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYocGhvbmUubGVuZ3RoICE9IDExKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5q2j56Gu55qE6IGU57O755S16K+dJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIWFkZHJlc3MpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXllYbpk7rlnLDlnYAnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighcmVtYXJrcykge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeWkh+azqCcsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLmFkZFN0b3JlLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHN0b3JlX25hbWU6IG5hbWUsIC8vJ+W6l+mTuuWQjScsXHJcbiAgICAgICAgICBzdG9yZV9jb2RlOiBjb2RlLCAvLyfllYblrrboh6rlrprnvJbnoIEnLFxyXG4gICAgICAgICAgY29udGFjdHNfbmFtZTogY29udGFjdHMsIC8vJ+WVhuWutuiBlOezu+S6uicsXHJcbiAgICAgICAgICBjb250YWN0c19waG9uZTogcGhvbmUsIC8vJ+WVhuWutuiBlOezu+eUteivnScsXHJcbiAgICAgICAgICBjb21wYW55X2FkZHJlc3NfZGV0YWlsOiBhZGRyZXNzLCAvLyfllYblrrblnLDlnYAnLFxyXG4gICAgICAgICAgcmVtYXJrOiByZW1hcmtzLCAvLyflhaXpqbvnlLPor7flpIfms6gnLFxyXG4gICAgICAgICAgam9pbmluX3llYXI6IHRoaXMudGltZUFyclt0aGlzLnRpbWVJbmRleF0ubnVtLCAvLyflhaXpqbvml7bplb8nLFxyXG4gICAgICAgICAgc2NfaWQ6ICB0aGlzLnN0b3JlQ2xhc3NbdGhpcy5zdG9yZUNsYXNzSW5kZXhdLnNjX2lkLCAvLyflupfpk7rliIbnsbvnvJblj7cnLFxyXG4gICAgICAgICAgc2NfbmFtZTogdGhpcy5zdG9yZUNsYXNzW3RoaXMuc3RvcmVDbGFzc0luZGV4XS5zY19uYW1lLCAvLyflupfpk7rliIbnsbvlkI3np7AnLFxyXG4gICAgICAgICAgc2NfYmFpbDogdGhpcy5zdG9yZUNsYXNzW3RoaXMuc3RvcmVDbGFzc0luZGV4XS5zY19iYWlsLCAvLyflupfpk7rliIbnsbvkv53or4Hph5EnLFxyXG4gICAgICAgICAgc2dfaWQ6IHRoaXMuc3RvcmVHcmFkZVt0aGlzLnN0b3JlR3JhZGVJbmRleF0uc2dfaWQsIC8vJ+W6l+mTuuetiee6p+e8luWPtycsXHJcbiAgICAgICAgICBzZ19uYW1lOiB0aGlzLnN0b3JlR3JhZGVbdGhpcy5zdG9yZUdyYWRlSW5kZXhdLnNnX25hbWUsIC8vJ+W6l+mTuuetiee6p+WQjeensCcsXHJcbiAgICAgICAgICBzZ19pbmZvOiB0aGlzLnN0b3JlR3JhZGVbdGhpcy5zdG9yZUdyYWRlSW5kZXhdLnNnX3ByaWNlLCAvLyflupfpk7rnrYnnuqfku7fmoLwnLFxyXG4gICAgICAgICAgc2VsbGVyX25hbWU6IGFkbWluLCAvLyfljZblrrbotKblj7cnXHJcbiAgICAgICAgICBzZWxsZXJfcHN3OiBwYXNzd29yZCwgLy8g5a+G56CBXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMubXNnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgICAgLy8gdGhpcy4kbmF2aWdhdGUoeyB1cmw6ICdzZXR0bGVkSW5QYXknIH0pO1xyXG4gICAgfSxcclxuICAgIHN0b3JlR3JhZGVDaGFuZ2UoZSkge1xyXG4gICAgICB2YXIgdmFsdWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB0aGlzLnN0b3JlR3JhZGVJbmRleCA9IHZhbHVlXHJcbiAgICB9LFxyXG4gICAgdGltZUNoYW5nZShlKXtcclxuICAgICAgdGhpcy50aW1lSW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSxcclxuICAgIHN0b3JlQ2xhc3NDaGFuZ2UoZSkge1xyXG4gICAgICB0aGlzLnN0b3JlQ2xhc3NJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcblxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvbkxvYWQoKSB7XHJcblxyXG4gICAgICAvLyDliKTmlq3mmK/lkKbmj5DkuqTlhaXpqbvnlLPor7dcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5pc0pvaW4sXHJcbiAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnN0YXR1cyA9IHJlcy5kYXRhcy5zdGF0ZVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gICAgLy8g5bqX6ZO6562J57qnXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuZ2V0U3RvcmVHcmFkZVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlR3JhZGUgPSByZXMuZGF0YXMuZGF0YVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gICAgLy8g5bqX6ZO65YiG57G7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuZ2V0U3RvcmVDbGFzc1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlQ2xhc3MgPSByZXMuZGF0YXMuZGF0YSB8fCBbXVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG5cclxuXHJcbiAgICBcclxuICB9XHJcbn1cclxuIl19