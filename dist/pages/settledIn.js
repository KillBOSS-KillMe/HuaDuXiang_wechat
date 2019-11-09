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
      status: 0, // -10 没入驻 10入驻审核中 20审核成功 30驳回申请  40入驻成功
      storeGrade: [], // 入驻店铺等级
      timeArr: [{ num: 1 }, { num: 2 }, { num: 3 }],
      storeGradeIndex: 0,
      timeIndex: 0,
      useCostPrice: 0, // 平台使用费用
      bondPrice: 0, // 商家保证金
      storeClass: [], // 店铺分类
      storeClassIndex: 0, //店铺分类索引
      store_id: '' // 店铺id
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
        _this2.store_id = res.datas.store_id;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZWRJbi5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJzdGF0dXMiLCJzdG9yZUdyYWRlIiwidGltZUFyciIsIm51bSIsInN0b3JlR3JhZGVJbmRleCIsInRpbWVJbmRleCIsInVzZUNvc3RQcmljZSIsImJvbmRQcmljZSIsInN0b3JlQ2xhc3MiLCJzdG9yZUNsYXNzSW5kZXgiLCJzdG9yZV9pZCIsImNvbXB1dGVkIiwicHJpY2UiLCJzZ19wcmljZSIsIk51bWJlciIsInRvRml4ZWQiLCJzY19iYWlsIiwid2F0Y2giLCJtZXRob2RzIiwic3VibWl0IiwiZSIsImNvbnNvbGUiLCJsb2ciLCJkZXRhaWwiLCJ2YWx1ZSIsImFkbWluIiwicGFzc3dvcmQiLCJuYW1lIiwiY29kZSIsImNvbnRhY3RzIiwicGhvbmUiLCJhZGRyZXNzIiwicmVtYXJrcyIsInRlc3QiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImxlbmd0aCIsInVybCIsImFkZFN0b3JlIiwic3RvcmVfbmFtZSIsInN0b3JlX2NvZGUiLCJjb250YWN0c19uYW1lIiwiY29udGFjdHNfcGhvbmUiLCJjb21wYW55X2FkZHJlc3NfZGV0YWlsIiwicmVtYXJrIiwiam9pbmluX3llYXIiLCJzY19pZCIsInNjX25hbWUiLCJzZ19pZCIsInNnX25hbWUiLCJzZ19pbmZvIiwic2VsbGVyX25hbWUiLCJzZWxsZXJfcHN3IiwidGhlbiIsInJlcyIsImRhdGFzIiwibXNnIiwic3RvcmVHcmFkZUNoYW5nZSIsInRpbWVDaGFuZ2UiLCJzdG9yZUNsYXNzQ2hhbmdlIiwiZXZlbnRzIiwiaXNKb2luIiwidHlwZSIsInN0YXRlIiwiJGFwcGx5IiwiZ2V0U3RvcmVHcmFkZSIsImdldFN0b3JlQ2xhc3MiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7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QUFVL0MsUUFBMUI7QUFDQSxlQUFLd0QsTUFBTDtBQUNELE9BUEQ7QUFRQTtBQUNBLHNCQUFLO0FBQ0gzQixhQUFLL0MsSUFBSTJFO0FBRE4sT0FBTCxFQUVHWixJQUZILENBRVEsZUFBTztBQUNiLGVBQUt0RCxVQUFMLEdBQWtCdUQsSUFBSUMsS0FBSixDQUFVMUQsSUFBNUI7QUFDQSxlQUFLbUUsTUFBTDtBQUNELE9BTEQ7QUFNQTtBQUNBLHNCQUFLO0FBQ0gzQixhQUFLL0MsSUFBSTRFO0FBRE4sT0FBTCxFQUVHYixJQUZILENBRVEsZUFBTztBQUNiLGVBQUsvQyxVQUFMLEdBQWtCZ0QsSUFBSUMsS0FBSixDQUFVMUQsSUFBVixJQUFrQixFQUFwQztBQUNBLGVBQUttRSxNQUFMO0FBQ0QsT0FMRDtBQVNEOzs7O0VBcEtnQ0csZUFBS0MsSTs7a0JBQW5CNUUsSyIsImZpbGUiOiJzZXR0bGVkSW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5a625YWl6am7J1xyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHN0YXR1czogMCwgLy8gLTEwIOayoeWFpempuyAxMOWFpempu+WuoeaguOS4rSAyMOWuoeaguOaIkOWKnyAzMOmps+WbnueUs+ivtyAgNDDlhaXpqbvmiJDlip9cclxuICAgIHN0b3JlR3JhZGU6IFtdLCAgLy8g5YWl6am75bqX6ZO6562J57qnXHJcbiAgICB0aW1lQXJyOiBbe251bTogMX0se251bTogMn0se251bTogM31dLFxyXG4gICAgc3RvcmVHcmFkZUluZGV4OiAwLFxyXG4gICAgdGltZUluZGV4OiAwLFxyXG4gICAgdXNlQ29zdFByaWNlOiAwLCAvLyDlubPlj7Dkvb/nlKjotLnnlKhcclxuICAgIGJvbmRQcmljZTogMCwgLy8g5ZWG5a625L+d6K+B6YeRXHJcbiAgICBzdG9yZUNsYXNzOiBbXSwgLy8g5bqX6ZO65YiG57G7XHJcbiAgICBzdG9yZUNsYXNzSW5kZXg6IDAsIC8v5bqX6ZO65YiG57G757Si5byVXHJcbiAgICBzdG9yZV9pZDogJycsIC8vIOW6l+mTumlkXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7XHJcbiAgICB1c2VDb3N0UHJpY2UoKSB7XHJcbiAgICAgIHZhciBudW0gPSB0aGlzLnRpbWVBcnJbdGhpcy50aW1lSW5kZXhdLm51bVxyXG4gICAgICB2YXIgcHJpY2UgPSB0aGlzLnN0b3JlR3JhZGVbdGhpcy5zdG9yZUdyYWRlSW5kZXhdICYmIHRoaXMuc3RvcmVHcmFkZVt0aGlzLnN0b3JlR3JhZGVJbmRleF0uc2dfcHJpY2VcclxuICAgICAgcmV0dXJuIChOdW1iZXIobnVtKSAqIE51bWJlcihwcmljZSkpLnRvRml4ZWQoMilcclxuICAgIH0sXHJcbiAgICBib25kUHJpY2UoKSB7XHJcbiAgICAgIHZhciBwcmljZSA9IHRoaXMuc3RvcmVDbGFzc1t0aGlzLnN0b3JlQ2xhc3NJbmRleF0gJiYgdGhpcy5zdG9yZUNsYXNzW3RoaXMuc3RvcmVDbGFzc0luZGV4XS5zY19iYWlsXHJcbiAgICAgIHJldHVybiBOdW1iZXIocHJpY2UpLnRvRml4ZWQoMilcclxuICAgIH1cclxuICB9O1xyXG4gIG9uU2hvdygpIHt9XHJcbiAgd2F0Y2ggPSB7fVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBzdWJtaXQoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC52YWx1ZSlcclxuICAgICAgdmFyIHthZG1pbiwgcGFzc3dvcmQsIG5hbWUsIGNvZGUsIGNvbnRhY3RzLCBwaG9uZSwgYWRkcmVzcywgcmVtYXJrc30gPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICBpZighL14oXFx3KXs2LDIwfSQvLnRlc3QoYWRtaW4pKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWlNuiHszIw5L2N5ZWG6ZO66LSm5Y+3JyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIS9eKFxcdyl7NiwyMH0kLy50ZXN0KHBhc3N3b3JkKSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpTboh7MyMOS9jeWvhueggScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGlmKCFuYW1lKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5ZWG6ZO65ZCN56ewJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIS9eKFxcdyl7NiwyMH0kLy50ZXN0KGNvZGUpKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWlNuiHszIw5L2N5ZWG6ZO657yW5Y+3JyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIWNvbnRhY3RzKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl6IGU57O75Lq65aeT5ZCNJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYocGhvbmUubGVuZ3RoICE9IDExKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5q2j56Gu55qE6IGU57O755S16K+dJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIWFkZHJlc3MpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXllYbpk7rlnLDlnYAnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighcmVtYXJrcykge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeWkh+azqCcsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLmFkZFN0b3JlLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHN0b3JlX25hbWU6IG5hbWUsIC8vJ+W6l+mTuuWQjScsXHJcbiAgICAgICAgICBzdG9yZV9jb2RlOiBjb2RlLCAvLyfllYblrrboh6rlrprnvJbnoIEnLFxyXG4gICAgICAgICAgY29udGFjdHNfbmFtZTogY29udGFjdHMsIC8vJ+WVhuWutuiBlOezu+S6uicsXHJcbiAgICAgICAgICBjb250YWN0c19waG9uZTogcGhvbmUsIC8vJ+WVhuWutuiBlOezu+eUteivnScsXHJcbiAgICAgICAgICBjb21wYW55X2FkZHJlc3NfZGV0YWlsOiBhZGRyZXNzLCAvLyfllYblrrblnLDlnYAnLFxyXG4gICAgICAgICAgcmVtYXJrOiByZW1hcmtzLCAvLyflhaXpqbvnlLPor7flpIfms6gnLFxyXG4gICAgICAgICAgam9pbmluX3llYXI6IHRoaXMudGltZUFyclt0aGlzLnRpbWVJbmRleF0ubnVtLCAvLyflhaXpqbvml7bplb8nLFxyXG4gICAgICAgICAgc2NfaWQ6ICB0aGlzLnN0b3JlQ2xhc3NbdGhpcy5zdG9yZUNsYXNzSW5kZXhdLnNjX2lkLCAvLyflupfpk7rliIbnsbvnvJblj7cnLFxyXG4gICAgICAgICAgc2NfbmFtZTogdGhpcy5zdG9yZUNsYXNzW3RoaXMuc3RvcmVDbGFzc0luZGV4XS5zY19uYW1lLCAvLyflupfpk7rliIbnsbvlkI3np7AnLFxyXG4gICAgICAgICAgc2NfYmFpbDogdGhpcy5zdG9yZUNsYXNzW3RoaXMuc3RvcmVDbGFzc0luZGV4XS5zY19iYWlsLCAvLyflupfpk7rliIbnsbvkv53or4Hph5EnLFxyXG4gICAgICAgICAgc2dfaWQ6IHRoaXMuc3RvcmVHcmFkZVt0aGlzLnN0b3JlR3JhZGVJbmRleF0uc2dfaWQsIC8vJ+W6l+mTuuetiee6p+e8luWPtycsXHJcbiAgICAgICAgICBzZ19uYW1lOiB0aGlzLnN0b3JlR3JhZGVbdGhpcy5zdG9yZUdyYWRlSW5kZXhdLnNnX25hbWUsIC8vJ+W6l+mTuuetiee6p+WQjeensCcsXHJcbiAgICAgICAgICBzZ19pbmZvOiB0aGlzLnN0b3JlR3JhZGVbdGhpcy5zdG9yZUdyYWRlSW5kZXhdLnNnX3ByaWNlLCAvLyflupfpk7rnrYnnuqfku7fmoLwnLFxyXG4gICAgICAgICAgc2VsbGVyX25hbWU6IGFkbWluLCAvLyfljZblrrbotKblj7cnXHJcbiAgICAgICAgICBzZWxsZXJfcHN3OiBwYXNzd29yZCwgLy8g5a+G56CBXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMubXNnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgICAgLy8gdGhpcy4kbmF2aWdhdGUoeyB1cmw6ICdzZXR0bGVkSW5QYXknIH0pO1xyXG4gICAgfSxcclxuICAgIHN0b3JlR3JhZGVDaGFuZ2UoZSkge1xyXG4gICAgICB2YXIgdmFsdWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB0aGlzLnN0b3JlR3JhZGVJbmRleCA9IHZhbHVlXHJcbiAgICB9LFxyXG4gICAgdGltZUNoYW5nZShlKXtcclxuICAgICAgdGhpcy50aW1lSW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSxcclxuICAgIHN0b3JlQ2xhc3NDaGFuZ2UoZSkge1xyXG4gICAgICB0aGlzLnN0b3JlQ2xhc3NJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcblxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvbkxvYWQoKSB7XHJcblxyXG4gICAgICAvLyDliKTmlq3mmK/lkKbmj5DkuqTlhaXpqbvnlLPor7dcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5pc0pvaW4sXHJcbiAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnN0YXR1cyA9IHJlcy5kYXRhcy5zdGF0ZVxyXG4gICAgICB0aGlzLnN0b3JlX2lkID0gcmVzLmRhdGFzLnN0b3JlX2lkXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgICAvLyDlupfpk7rnrYnnuqdcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5nZXRTdG9yZUdyYWRlXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmVHcmFkZSA9IHJlcy5kYXRhcy5kYXRhXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgICAvLyDlupfpk7rliIbnsbtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5nZXRTdG9yZUNsYXNzXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmVDbGFzcyA9IHJlcy5kYXRhcy5kYXRhIHx8IFtdXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcblxyXG5cclxuICAgIFxyXG4gIH1cclxufVxyXG4iXX0=