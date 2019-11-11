'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
      status: 0, // -10 没入驻   11交完钱审核中   20提交信息成功  31 交钱审核失败    40入驻成功
      storeGrade: [], // 入驻店铺等级
      timeArr: [{ num: 1 }, { num: 2 }, { num: 3 }],
      storeGradeIndex: 0,
      timeIndex: 0,
      useCostPrice: 0, // 平台使用费用
      bondPrice: 0, // 商家保证金
      storeClass: [], // 店铺分类
      storeClassIndex: 0, //店铺分类索引
      store_id: '', // 店铺id
      joinInfo: {}
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
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var that;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;
                // 判断是否提交入驻申请

                _context.next = 3;
                return (0, _ajax.ajax)({
                  url: api.isJoin,
                  type: 'get'
                }).then(function (res) {
                  _this2.status = res.datas.state;
                  if (res.datas.state == 10 || res.datas.state == 40) {
                    _this2.joinInfo = res.datas.data;
                    var joinin_year = _this2.joinInfo.joinin_year;
                    _this2.timeArr.forEach(function (item, index) {
                      if (item.num == joinin_year) {
                        _this2.timeIndex = index;
                      }
                    });
                  }
                  _this2.store_id = res.datas.store_id;
                  _this2.$apply();
                });

              case 3:
                // 店铺等级
                (0, _ajax.ajax)({
                  url: api.getStoreGrade
                }).then(function (res) {
                  _this2.storeGrade = res.datas.data;
                  var sg_id = _this2.joinInfo.sg_id;
                  res.datas.data.forEach(function (item, index) {
                    if (item.sg_id == sg_id) {
                      _this2.storeGradeIndex = index;
                    }
                  });
                  _this2.$apply();
                });
                // 店铺分类
                (0, _ajax.ajax)({
                  url: api.getStoreClass
                }).then(function (res) {
                  _this2.storeClass = res.datas.data || [];
                  var sc_id = _this2.joinInfo.sc_id;
                  res.datas.data.forEach(function (item, index) {
                    if (item.sc_id == sc_id) {
                      _this2.storeClassIndex = index;
                    }
                  });
                  _this2.$apply();
                });

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLoad() {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/settledIn'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZWRJbi5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJzdGF0dXMiLCJzdG9yZUdyYWRlIiwidGltZUFyciIsIm51bSIsInN0b3JlR3JhZGVJbmRleCIsInRpbWVJbmRleCIsInVzZUNvc3RQcmljZSIsImJvbmRQcmljZSIsInN0b3JlQ2xhc3MiLCJzdG9yZUNsYXNzSW5kZXgiLCJzdG9yZV9pZCIsImpvaW5JbmZvIiwiY29tcHV0ZWQiLCJwcmljZSIsInNnX3ByaWNlIiwiTnVtYmVyIiwidG9GaXhlZCIsInNjX2JhaWwiLCJ3YXRjaCIsIm1ldGhvZHMiLCJzdWJtaXQiLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsInZhbHVlIiwiYWRtaW4iLCJwYXNzd29yZCIsIm5hbWUiLCJjb2RlIiwiY29udGFjdHMiLCJwaG9uZSIsImFkZHJlc3MiLCJyZW1hcmtzIiwidGVzdCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwibGVuZ3RoIiwidXJsIiwiYWRkU3RvcmUiLCJzdG9yZV9uYW1lIiwic3RvcmVfY29kZSIsImNvbnRhY3RzX25hbWUiLCJjb250YWN0c19waG9uZSIsImNvbXBhbnlfYWRkcmVzc19kZXRhaWwiLCJyZW1hcmsiLCJqb2luaW5feWVhciIsInNjX2lkIiwic2NfbmFtZSIsInNnX2lkIiwic2dfbmFtZSIsInNnX2luZm8iLCJzZWxsZXJfbmFtZSIsInNlbGxlcl9wc3ciLCJ0aGVuIiwicmVzIiwiZGF0YXMiLCJtc2ciLCJzdG9yZUdyYWRlQ2hhbmdlIiwidGltZUNoYW5nZSIsInN0b3JlQ2xhc3NDaGFuZ2UiLCJldmVudHMiLCJ0aGF0IiwiaXNKb2luIiwidHlwZSIsInN0YXRlIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsIiRhcHBseSIsImdldFN0b3JlR3JhZGUiLCJnZXRTdG9y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LGVBQU87QUFDYix5QkFBS2hELFVBQUwsR0FBa0JpRCxJQUFJQyxLQUFKLENBQVUzRCxJQUFWLElBQWtCLEVBQXBDO0FBQ0Esc0JBQUlrRCxRQUFRLE9BQUt0QyxRQUFMLENBQWNzQyxLQUExQjtBQUNBUSxzQkFBSUMsS0FBSixDQUFVM0QsSUFBVixDQUFlcUUsT0FBZixDQUF1QixVQUFDQyxJQUFELEVBQU9DLEtBQVAsRUFBaUI7QUFDdEMsd0JBQUdELEtBQUtwQixLQUFMLElBQWNBLEtBQWpCLEVBQXdCO0FBQ3RCLDZCQUFLeEMsZUFBTCxHQUF1QjZELEtBQXZCO0FBQ0Q7QUFDRixtQkFKRDtBQUtBLHlCQUFLQyxNQUFMO0FBQ0QsaUJBWEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE3SytCRyxlQUFLQyxJOztrQkFBbkJqRixLIiwiZmlsZSI6InNldHRsZWRJbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblrrblhaXpqbsnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgc3RhdHVzOiAwLCAvLyAtMTAg5rKh5YWl6am7ICAgMTHkuqTlrozpkrHlrqHmoLjkuK0gICAyMOaPkOS6pOS/oeaBr+aIkOWKnyAgMzEg5Lqk6ZKx5a6h5qC45aSx6LSlICAgIDQw5YWl6am75oiQ5YqfXHJcbiAgICBzdG9yZUdyYWRlOiBbXSwgIC8vIOWFpempu+W6l+mTuuetiee6p1xyXG4gICAgdGltZUFycjogW3tudW06IDF9LHtudW06IDJ9LHtudW06IDN9XSxcclxuICAgIHN0b3JlR3JhZGVJbmRleDogMCxcclxuICAgIHRpbWVJbmRleDogMCxcclxuICAgIHVzZUNvc3RQcmljZTogMCwgLy8g5bmz5Y+w5L2/55So6LS555SoXHJcbiAgICBib25kUHJpY2U6IDAsIC8vIOWVhuWutuS/neivgemHkVxyXG4gICAgc3RvcmVDbGFzczogW10sIC8vIOW6l+mTuuWIhuexu1xyXG4gICAgc3RvcmVDbGFzc0luZGV4OiAwLCAvL+W6l+mTuuWIhuexu+e0ouW8lVxyXG4gICAgc3RvcmVfaWQ6ICcnLCAvLyDlupfpk7ppZFxyXG4gICAgam9pbkluZm86IHt9XHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7XHJcbiAgICB1c2VDb3N0UHJpY2UoKSB7XHJcbiAgICAgIHZhciBudW0gPSB0aGlzLnRpbWVBcnJbdGhpcy50aW1lSW5kZXhdLm51bVxyXG4gICAgICB2YXIgcHJpY2UgPSB0aGlzLnN0b3JlR3JhZGVbdGhpcy5zdG9yZUdyYWRlSW5kZXhdICYmIHRoaXMuc3RvcmVHcmFkZVt0aGlzLnN0b3JlR3JhZGVJbmRleF0uc2dfcHJpY2VcclxuICAgICAgcmV0dXJuIChOdW1iZXIobnVtKSAqIE51bWJlcihwcmljZSkpLnRvRml4ZWQoMilcclxuICAgIH0sXHJcbiAgICBib25kUHJpY2UoKSB7XHJcbiAgICAgIHZhciBwcmljZSA9IHRoaXMuc3RvcmVDbGFzc1t0aGlzLnN0b3JlQ2xhc3NJbmRleF0gJiYgdGhpcy5zdG9yZUNsYXNzW3RoaXMuc3RvcmVDbGFzc0luZGV4XS5zY19iYWlsXHJcbiAgICAgIHJldHVybiBOdW1iZXIocHJpY2UpLnRvRml4ZWQoMilcclxuICAgIH1cclxuICB9O1xyXG4gIG9uU2hvdygpIHt9XHJcbiAgd2F0Y2ggPSB7fVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBzdWJtaXQoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC52YWx1ZSlcclxuICAgICAgdmFyIHthZG1pbiwgcGFzc3dvcmQsIG5hbWUsIGNvZGUsIGNvbnRhY3RzLCBwaG9uZSwgYWRkcmVzcywgcmVtYXJrc30gPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICBpZighL14oXFx3KXs2LDIwfSQvLnRlc3QoYWRtaW4pKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWlNuiHszIw5L2N5ZWG6ZO66LSm5Y+3JyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIS9eKFxcdyl7NiwyMH0kLy50ZXN0KHBhc3N3b3JkKSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpTboh7MyMOS9jeWvhueggScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGlmKCFuYW1lKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5ZWG6ZO65ZCN56ewJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIS9eKFxcdyl7NiwyMH0kLy50ZXN0KGNvZGUpKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWlNuiHszIw5L2N5ZWG6ZO657yW5Y+3JyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIWNvbnRhY3RzKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl6IGU57O75Lq65aeT5ZCNJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYocGhvbmUubGVuZ3RoICE9IDExKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5q2j56Gu55qE6IGU57O755S16K+dJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIWFkZHJlc3MpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXllYbpk7rlnLDlnYAnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighcmVtYXJrcykge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeWkh+azqCcsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLmFkZFN0b3JlLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHN0b3JlX25hbWU6IG5hbWUsIC8vJ+W6l+mTuuWQjScsXHJcbiAgICAgICAgICBzdG9yZV9jb2RlOiBjb2RlLCAvLyfllYblrrboh6rlrprnvJbnoIEnLFxyXG4gICAgICAgICAgY29udGFjdHNfbmFtZTogY29udGFjdHMsIC8vJ+WVhuWutuiBlOezu+S6uicsXHJcbiAgICAgICAgICBjb250YWN0c19waG9uZTogcGhvbmUsIC8vJ+WVhuWutuiBlOezu+eUteivnScsXHJcbiAgICAgICAgICBjb21wYW55X2FkZHJlc3NfZGV0YWlsOiBhZGRyZXNzLCAvLyfllYblrrblnLDlnYAnLFxyXG4gICAgICAgICAgcmVtYXJrOiByZW1hcmtzLCAvLyflhaXpqbvnlLPor7flpIfms6gnLFxyXG4gICAgICAgICAgam9pbmluX3llYXI6IHRoaXMudGltZUFyclt0aGlzLnRpbWVJbmRleF0ubnVtLCAvLyflhaXpqbvml7bplb8nLFxyXG4gICAgICAgICAgc2NfaWQ6ICB0aGlzLnN0b3JlQ2xhc3NbdGhpcy5zdG9yZUNsYXNzSW5kZXhdLnNjX2lkLCAvLyflupfpk7rliIbnsbvnvJblj7cnLFxyXG4gICAgICAgICAgc2NfbmFtZTogdGhpcy5zdG9yZUNsYXNzW3RoaXMuc3RvcmVDbGFzc0luZGV4XS5zY19uYW1lLCAvLyflupfpk7rliIbnsbvlkI3np7AnLFxyXG4gICAgICAgICAgc2NfYmFpbDogdGhpcy5zdG9yZUNsYXNzW3RoaXMuc3RvcmVDbGFzc0luZGV4XS5zY19iYWlsLCAvLyflupfpk7rliIbnsbvkv53or4Hph5EnLFxyXG4gICAgICAgICAgc2dfaWQ6IHRoaXMuc3RvcmVHcmFkZVt0aGlzLnN0b3JlR3JhZGVJbmRleF0uc2dfaWQsIC8vJ+W6l+mTuuetiee6p+e8luWPtycsXHJcbiAgICAgICAgICBzZ19uYW1lOiB0aGlzLnN0b3JlR3JhZGVbdGhpcy5zdG9yZUdyYWRlSW5kZXhdLnNnX25hbWUsIC8vJ+W6l+mTuuetiee6p+WQjeensCcsXHJcbiAgICAgICAgICBzZ19pbmZvOiB0aGlzLnN0b3JlR3JhZGVbdGhpcy5zdG9yZUdyYWRlSW5kZXhdLnNnX3ByaWNlLCAvLyflupfpk7rnrYnnuqfku7fmoLwnLFxyXG4gICAgICAgICAgc2VsbGVyX25hbWU6IGFkbWluLCAvLyfljZblrrbotKblj7cnXHJcbiAgICAgICAgICBzZWxsZXJfcHN3OiBwYXNzd29yZCwgLy8g5a+G56CBXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMubXNnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgICAgLy8gdGhpcy4kbmF2aWdhdGUoeyB1cmw6ICdzZXR0bGVkSW5QYXknIH0pO1xyXG4gICAgfSxcclxuICAgIHN0b3JlR3JhZGVDaGFuZ2UoZSkge1xyXG4gICAgICB2YXIgdmFsdWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB0aGlzLnN0b3JlR3JhZGVJbmRleCA9IHZhbHVlXHJcblxyXG4gICAgfSxcclxuICAgIHRpbWVDaGFuZ2UoZSl7XHJcbiAgICAgIHRoaXMudGltZUluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgIH0sXHJcbiAgICBzdG9yZUNsYXNzQ2hhbmdlKGUpIHtcclxuICAgICAgdGhpcy5zdG9yZUNsYXNzSW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG5cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuXHJcbiAgYXN5bmMgb25Mb2FkKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIC8vIOWIpOaWreaYr+WQpuaPkOS6pOWFpempu+eUs+ivt1xyXG4gICAgYXdhaXQgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmlzSm9pbixcclxuICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMuc3RhdHVzID0gcmVzLmRhdGFzLnN0YXRlXHJcbiAgICAgIGlmKHJlcy5kYXRhcy5zdGF0ZSA9PSAxMCB8fCByZXMuZGF0YXMuc3RhdGUgPT0gNDApIHtcclxuICAgICAgICB0aGlzLmpvaW5JbmZvID0gcmVzLmRhdGFzLmRhdGFcclxuICAgICAgICB2YXIgam9pbmluX3llYXIgPSB0aGlzLmpvaW5JbmZvLmpvaW5pbl95ZWFyXHJcbiAgICAgICAgdGhpcy50aW1lQXJyLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICBpZihpdGVtLm51bSA9PSBqb2luaW5feWVhcikge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVJbmRleCA9IGluZGV4XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdG9yZV9pZCA9IHJlcy5kYXRhcy5zdG9yZV9pZFxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gICAgLy8g5bqX6ZO6562J57qnXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuZ2V0U3RvcmVHcmFkZVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlR3JhZGUgPSByZXMuZGF0YXMuZGF0YVxyXG4gICAgICB2YXIgc2dfaWQgPSB0aGlzLmpvaW5JbmZvLnNnX2lkIFxyXG4gICAgICByZXMuZGF0YXMuZGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmKGl0ZW0uc2dfaWQgPT0gc2dfaWQpIHtcclxuICAgICAgICAgIHRoaXMuc3RvcmVHcmFkZUluZGV4ID0gaW5kZXhcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgICAvLyDlupfpk7rliIbnsbtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5nZXRTdG9yZUNsYXNzXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmVDbGFzcyA9IHJlcy5kYXRhcy5kYXRhIHx8IFtdXHJcbiAgICAgIHZhciBzY19pZCA9IHRoaXMuam9pbkluZm8uc2NfaWQgXHJcbiAgICAgIHJlcy5kYXRhcy5kYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoaXRlbS5zY19pZCA9PSBzY19pZCkge1xyXG4gICAgICAgICAgdGhpcy5zdG9yZUNsYXNzSW5kZXggPSBpbmRleFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuXHJcblxyXG4gICAgXHJcbiAgfVxyXG59XHJcbiJdfQ==