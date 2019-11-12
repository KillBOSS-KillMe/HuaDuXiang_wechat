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
      joinInfo: {},
      storeClassList: []
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
      },
      bindMultiPickerChange: function bindMultiPickerChange(e) {},
      bindMultiPickerColumnChange: function bindMultiPickerColumnChange(e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        this.setList(e.detail.column, e.detail.value);
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'setList',
    value: function setList(idx, val) {
      if (val == 2) return;
      var storeClass = this.storeClass;
      if (idx == 0) {
        this.storeClass[idx + 1] = storeClass[idx][val].two;
      }
      if (idx == 1) {
        this.storeClass[idx + 1] = storeClass[idx][val].three || [];
      }

      this.$apply();
    }
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
                  url: api.oneGoodsClass
                }).then(function (res) {
                  // this.storeClassList = res.datas || []
                  // var sc_id = this.joinInfo.sc_id 
                  // res.datas.data.forEach((item, index) => {
                  //   if(item.sc_id == sc_id) {
                  //     this.storeClassIndex = index
                  //   }
                  // })
                  var oneList = res.datas;
                  var twoList = oneList[0].two;
                  var threeList = twoList[0].three;
                  var arr = [];
                  arr.push(oneList);
                  arr.push(twoList);
                  arr.push(threeList);
                  _this2.storeClass = arr;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZWRJbi5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJzdGF0dXMiLCJzdG9yZUdyYWRlIiwidGltZUFyciIsIm51bSIsInN0b3JlR3JhZGVJbmRleCIsInRpbWVJbmRleCIsInVzZUNvc3RQcmljZSIsImJvbmRQcmljZSIsInN0b3JlQ2xhc3MiLCJzdG9yZUNsYXNzSW5kZXgiLCJzdG9yZV9pZCIsImpvaW5JbmZvIiwic3RvcmVDbGFzc0xpc3QiLCJjb21wdXRlZCIsInByaWNlIiwic2dfcHJpY2UiLCJOdW1iZXIiLCJ0b0ZpeGVkIiwic2NfYmFpbCIsIndhdGNoIiwibWV0aG9kcyIsInN1Ym1pdCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImFkbWluIiwicGFzc3dvcmQiLCJuYW1lIiwiY29kZSIsImNvbnRhY3RzIiwicGhvbmUiLCJhZGRyZXNzIiwicmVtYXJrcyIsInRlc3QiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImxlbmd0aCIsInVybCIsImFkZFN0b3JlIiwic3RvcmVfbmFtZSIsInN0b3JlX2NvZGUiLCJjb250YWN0c19uYW1lIiwiY29udGFjdHNfcGhvbmUiLCJjb21wYW55X2FkZHJlc3NfZGV0YWlsIiwicmVtYXJrIiwiam9pbmluX3llYXIiLCJzY19pZCIsInNjX25hbWUiLCJzZ19pZCIsInNnX25hbWUiLCJzZ19pbmZvIiwic2VsbGVyX25hbWUiLCJzZWxsZXJfcHN3IiwidGhlbiIsInJlcyIsImRhdGFzIiwibXNnIiwic3RvcmVHcmFkZUNoYW5nZSIsInRpbWVDaGFuZ2UiLCJzdG9yZUNsYXNzQ2hhbmdlIiwiYmluZE11bHRpUGlja2VyQ2hhbmdlIiwiYmluZE11bHRpUGlja2VyQ29sdW1uQ2hhbmdlIiwiY29uc29sZSIsImxvZyIsImNvbHVtbiIsInNldExpc3QiLCJldmVudHMiLCJpZHgiLCJ2YWwiLCJ0d28iLCJ0aHJlZSIsIiRhcHBseSIsInRoYXQiLCJpc0pvaW4iLCJ0eXBlIiwic3RhdGUiLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4IiwiZ2V0U3RvcmVHcmFkZSIsIm9uZUdvb2RzQ2xhc3MiLCJvbmVMaXN0IiwidHdvTGlzdCIsInRocmVlTGlzdCIsImFyciIsInB1c2giLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBSXFCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsY0FBUSxDQURILEVBQ007QUFDWEMsa0JBQVksRUFGUCxFQUVZO0FBQ2pCQyxlQUFTLENBQUMsRUFBQ0MsS0FBSyxDQUFOLEVBQUQsRUFBVSxFQUFDQSxLQUFLLENBQU4sRUFBVixFQUFtQixFQUFDQSxLQUFLLENBQU4sRUFBbkIsQ0FISjtBQUlMQyx1QkFBaUIsQ0FKWjtBQUtMQyxpQkFBVyxDQUxOO0FBTUxDLG9CQUFjLENBTlQsRUFNWTtBQUNqQkMsaUJBQVcsQ0FQTixFQU9TO0FBQ2RDLGtCQUFZLEVBUlAsRUFRVztBQUNoQkMsdUJBQWlCLENBVFosRUFTZTtBQUNwQkMsZ0JBQVUsRUFWTCxFQVVTO0FBQ2RDLGdCQUFVLEVBWEw7QUFZTEMsc0JBQWdCO0FBWlgsSyxRQWVQQyxRLEdBQVc7QUFDVFAsa0JBRFMsMEJBQ007QUFDYixZQUFJSCxNQUFNLEtBQUtELE9BQUwsQ0FBYSxLQUFLRyxTQUFsQixFQUE2QkYsR0FBdkM7QUFDQSxZQUFJVyxRQUFRLEtBQUtiLFVBQUwsQ0FBZ0IsS0FBS0csZUFBckIsS0FBeUMsS0FBS0gsVUFBTCxDQUFnQixLQUFLRyxlQUFyQixFQUFzQ1csUUFBM0Y7QUFDQSxlQUFPLENBQUNDLE9BQU9iLEdBQVAsSUFBY2EsT0FBT0YsS0FBUCxDQUFmLEVBQThCRyxPQUE5QixDQUFzQyxDQUF0QyxDQUFQO0FBQ0QsT0FMUTtBQU1UVixlQU5TLHVCQU1HO0FBQ1YsWUFBSU8sUUFBUSxLQUFLTixVQUFMLENBQWdCLEtBQUtDLGVBQXJCLEtBQXlDLEtBQUtELFVBQUwsQ0FBZ0IsS0FBS0MsZUFBckIsRUFBc0NTLE9BQTNGO0FBQ0EsZUFBT0YsT0FBT0YsS0FBUCxFQUFjRyxPQUFkLENBQXNCLENBQXRCLENBQVA7QUFDRDtBQVRRLEssUUFZWEUsSyxHQUFRLEUsUUFDUkMsTyxHQUFVO0FBQ1JDLFlBRFEsa0JBQ0RDLENBREMsRUFDRTtBQUFBLDhCQUMrREEsRUFBRUMsTUFBRixDQUFTQyxLQUR4RTtBQUFBLFlBQ0hDLEtBREcsbUJBQ0hBLEtBREc7QUFBQSxZQUNJQyxRQURKLG1CQUNJQSxRQURKO0FBQUEsWUFDY0MsSUFEZCxtQkFDY0EsSUFEZDtBQUFBLFlBQ29CQyxJQURwQixtQkFDb0JBLElBRHBCO0FBQUEsWUFDMEJDLFFBRDFCLG1CQUMwQkEsUUFEMUI7QUFBQSxZQUNvQ0MsS0FEcEMsbUJBQ29DQSxLQURwQztBQUFBLFlBQzJDQyxPQUQzQyxtQkFDMkNBLE9BRDNDO0FBQUEsWUFDb0RDLE9BRHBELG1CQUNvREEsT0FEcEQ7O0FBRVIsWUFBRyxDQUFDLGVBQWVDLElBQWYsQ0FBb0JSLEtBQXBCLENBQUosRUFBZ0M7QUFDOUJTLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxjQURJO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlBLGlCQUFPLEtBQVA7QUFDRDtBQUNELFlBQUcsQ0FBQyxlQUFlSixJQUFmLENBQW9CUCxRQUFwQixDQUFKLEVBQW1DO0FBQ2pDUSxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sWUFESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFHLENBQUNWLElBQUosRUFBVTtBQUNSTyxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sU0FESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFHLENBQUMsZUFBZUosSUFBZixDQUFvQkwsSUFBcEIsQ0FBSixFQUErQjtBQUM3Qk0sYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPLGNBREk7QUFFWEMsa0JBQU07QUFGSyxXQUFiO0FBSUEsaUJBQU8sS0FBUDtBQUNEO0FBQ0QsWUFBRyxDQUFDUixRQUFKLEVBQWM7QUFDWkssYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPLFVBREk7QUFFWEMsa0JBQU07QUFGSyxXQUFiO0FBSUEsaUJBQU8sS0FBUDtBQUNEO0FBQ0QsWUFBR1AsTUFBTVEsTUFBTixJQUFnQixFQUFuQixFQUF1QjtBQUNyQkosYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPLFlBREk7QUFFWEMsa0JBQU07QUFGSyxXQUFiO0FBSUEsaUJBQU8sS0FBUDtBQUNEO0FBQ0QsWUFBRyxDQUFDTixPQUFKLEVBQWE7QUFDWEcsYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPLFNBREk7QUFFWEMsa0JBQU07QUFGSyxXQUFiO0FBSUEsaUJBQU8sS0FBUDtBQUNEO0FBQ0QsWUFBRyxDQUFDTCxPQUFKLEVBQWE7QUFDWEUsYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPLE9BREk7QUFFWEMsa0JBQU07QUFGSyxXQUFiO0FBSUEsaUJBQU8sS0FBUDtBQUNEO0FBQ0Qsd0JBQUs7QUFDSEUsZUFBSy9DLElBQUlnRCxRQUROO0FBRUh6QyxnQkFBTTtBQUNKMEMsd0JBQVlkLElBRFIsRUFDYztBQUNsQmUsd0JBQVlkLElBRlIsRUFFYztBQUNsQmUsMkJBQWVkLFFBSFgsRUFHcUI7QUFDekJlLDRCQUFnQmQsS0FKWixFQUltQjtBQUN2QmUsb0NBQXdCZCxPQUxwQixFQUs2QjtBQUNqQ2Usb0JBQVFkLE9BTkosRUFNYTtBQUNqQmUseUJBQWEsS0FBSzdDLE9BQUwsQ0FBYSxLQUFLRyxTQUFsQixFQUE2QkYsR0FQdEMsRUFPMkM7QUFDL0M2QyxtQkFBUSxLQUFLeEMsVUFBTCxDQUFnQixLQUFLQyxlQUFyQixFQUFzQ3VDLEtBUjFDLEVBUWlEO0FBQ3JEQyxxQkFBUyxLQUFLekMsVUFBTCxDQUFnQixLQUFLQyxlQUFyQixFQUFzQ3dDLE9BVDNDLEVBU29EO0FBQ3hEL0IscUJBQVMsS0FBS1YsVUFBTCxDQUFnQixLQUFLQyxlQUFyQixFQUFzQ1MsT0FWM0MsRUFVb0Q7QUFDeERnQyxtQkFBTyxLQUFLakQsVUFBTCxDQUFnQixLQUFLRyxlQUFyQixFQUFzQzhDLEtBWHpDLEVBV2dEO0FBQ3BEQyxxQkFBUyxLQUFLbEQsVUFBTCxDQUFnQixLQUFLRyxlQUFyQixFQUFzQytDLE9BWjNDLEVBWW9EO0FBQ3hEQyxxQkFBUyxLQUFLbkQsVUFBTCxDQUFnQixLQUFLRyxlQUFyQixFQUFzQ1csUUFiM0MsRUFhcUQ7QUFDekRzQyx5QkFBYTVCLEtBZFQsRUFjZ0I7QUFDcEI2Qix3QkFBWTVCLFFBZlIsQ0Fla0I7QUFmbEI7QUFGSCxTQUFMLEVBbUJHNkIsSUFuQkgsQ0FtQlEsZUFBTztBQUNickIsYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPb0IsSUFBSUMsS0FBSixDQUFVQyxHQUROO0FBRVhyQixrQkFBTTtBQUZLLFdBQWI7QUFJRCxTQXhCRDtBQXlCQTtBQUNELE9BckZPO0FBc0ZSc0Isc0JBdEZRLDRCQXNGU3JDLENBdEZULEVBc0ZZO0FBQ2xCLFlBQUlFLFFBQVFGLEVBQUVDLE1BQUYsQ0FBU0MsS0FBckI7QUFDQSxhQUFLcEIsZUFBTCxHQUF1Qm9CLEtBQXZCO0FBRUQsT0ExRk87QUEyRlJvQyxnQkEzRlEsc0JBMkZHdEMsQ0EzRkgsRUEyRks7QUFDWCxhQUFLakIsU0FBTCxHQUFpQmlCLEVBQUVDLE1BQUYsQ0FBU0MsS0FBMUI7QUFDRCxPQTdGTztBQThGUnFDLHNCQTlGUSw0QkE4RlN2QyxDQTlGVCxFQThGWTtBQUNsQixhQUFLYixlQUFMLEdBQXVCYSxFQUFFQyxNQUFGLENBQVNDLEtBQWhDO0FBRUQsT0FqR087QUFrR1JzQywyQkFsR1EsaUNBa0djeEMsQ0FsR2QsRUFrR2lCLENBRXhCLENBcEdPO0FBcUdSeUMsaUNBckdRLHVDQXFHb0J6QyxDQXJHcEIsRUFxR3NCO0FBQzNCMEMsZ0JBQVFDLEdBQVIsQ0FBWSxPQUFaLEVBQXFCM0MsRUFBRUMsTUFBRixDQUFTMkMsTUFBOUIsRUFBc0MsS0FBdEMsRUFBNkM1QyxFQUFFQyxNQUFGLENBQVNDLEtBQXREO0FBQ0EsYUFBSzJDLE9BQUwsQ0FBYTdDLEVBQUVDLE1BQUYsQ0FBUzJDLE1BQXRCLEVBQThCNUMsRUFBRUMsTUFBRixDQUFTQyxLQUF2QztBQUNGO0FBeEdPLEssUUF3SFY0QyxNLEdBQVMsRTs7Ozs7NkJBMUhBLENBQUU7Ozs0QkE2R0hDLEcsRUFBS0MsRyxFQUFLO0FBQ2hCLFVBQUdBLE9BQU8sQ0FBVixFQUFhO0FBQ2IsVUFBSTlELGFBQWEsS0FBS0EsVUFBdEI7QUFDQSxVQUFHNkQsT0FBTyxDQUFWLEVBQWE7QUFDWCxhQUFLN0QsVUFBTCxDQUFnQjZELE1BQU0sQ0FBdEIsSUFBMkI3RCxXQUFXNkQsR0FBWCxFQUFnQkMsR0FBaEIsRUFBcUJDLEdBQWhEO0FBQ0Q7QUFDRCxVQUFHRixPQUFPLENBQVYsRUFBYTtBQUNYLGFBQUs3RCxVQUFMLENBQWdCNkQsTUFBTSxDQUF0QixJQUEyQjdELFdBQVc2RCxHQUFYLEVBQWdCQyxHQUFoQixFQUFxQkUsS0FBckIsSUFBOEIsRUFBekQ7QUFDRDs7QUFFRCxXQUFLQyxNQUFMO0FBQ0Q7Ozs7Ozs7Ozs7OztBQUtLQyxvQixHQUFPLEk7QUFDVDs7O3VCQUNJLGdCQUFLO0FBQ1RuQyx1QkFBSy9DLElBQUltRixNQURBO0FBRVRDLHdCQUFNO0FBRkcsaUJBQUwsRUFHSHJCLElBSEcsQ0FHRSxlQUFPO0FBQ2IseUJBQUt2RCxNQUFMLEdBQWN3RCxJQUFJQyxLQUFKLENBQVVvQixLQUF4QjtBQUNBLHNCQUFHckIsSUFBSUMsS0FBSixDQUFVb0IsS0FBVixJQUFtQixFQUFuQixJQUF5QnJCLElBQUlDLEtBQUosQ0FBVW9CLEtBQVYsSUFBbUIsRUFBL0MsRUFBbUQ7QUFDakQsMkJBQUtsRSxRQUFMLEdBQWdCNkMsSUFBSUMsS0FBSixDQUFVMUQsSUFBMUI7QUFDQSx3QkFBSWdELGNBQWMsT0FBS3BDLFFBQUwsQ0FBY29DLFdBQWhDO0FBQ0EsMkJBQUs3QyxPQUFMLENBQWE0RSxPQUFiLENBQXFCLFVBQUNDLElBQUQsRUFBT0MsS0FBUCxFQUFpQjtBQUNwQywwQkFBR0QsS0FBSzVFLEdBQUwsSUFBWTRDLFdBQWYsRUFBNEI7QUFDMUIsK0JBQUsxQyxTQUFMLEdBQWlCMkUsS0FBakI7QUFDRDtBQUNGLHFCQUpEO0FBTUQ7QUFDRCx5QkFBS3RFLFFBQUwsR0FBZ0I4QyxJQUFJQyxLQUFKLENBQVUvQyxRQUExQjtBQUNBLHlCQUFLK0QsTUFBTDtBQUNELGlCQWpCSyxDOzs7QUFrQk47QUFDQSxnQ0FBSztBQUNIbEMsdUJBQUsvQyxJQUFJeUY7QUFETixpQkFBTCxFQUVHMUIsSUFGSCxDQUVRLGVBQU87QUFDYix5QkFBS3RELFVBQUwsR0FBa0J1RCxJQUFJQyxLQUFKLENBQVUxRCxJQUE1QjtBQUNBLHNCQUFJbUQsUUFBUSxPQUFLdkMsUUFBTCxDQUFjdUMsS0FBMUI7QUFDQU0sc0JBQUlDLEtBQUosQ0FBVTFELElBQVYsQ0FBZStFLE9BQWYsQ0FBdUIsVUFBQ0MsSUFBRCxFQUFPQyxLQUFQLEVBQWlCO0FBQ3RDLHdCQUFHRCxLQUFLN0IsS0FBTCxJQUFjQSxLQUFqQixFQUF3QjtBQUN0Qiw2QkFBSzlDLGVBQUwsR0FBdUI0RSxLQUF2QjtBQUNEO0FBQ0YsbUJBSkQ7QUFLQSx5QkFBS1AsTUFBTDtBQUNELGlCQVhEO0FBWUE7QUFDQSxnQ0FBSztBQUNIbEMsdUJBQUsvQyxJQUFJMEY7QUFETixpQkFBTCxFQUVHM0IsSUFGSCxDQUVRLGVBQU87QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFJNEIsVUFBVTNCLElBQUlDLEtBQWxCO0FBQ0Esc0JBQUkyQixVQUFVRCxRQUFRLENBQVIsRUFBV1osR0FBekI7QUFDQSxzQkFBSWMsWUFBWUQsUUFBUSxDQUFSLEVBQVdaLEtBQTNCO0FBQ0Esc0JBQUljLE1BQU0sRUFBVjtBQUNBQSxzQkFBSUMsSUFBSixDQUFTSixPQUFUO0FBQ0FHLHNCQUFJQyxJQUFKLENBQVNILE9BQVQ7QUFDQUUsc0JBQUlDLElBQUosQ0FBU0YsU0FBVDtBQUNBLHlCQUFLN0UsVUFBTCxHQUFrQjhFLEdBQWxCO0FBQ0EseUJBQUtiLE1BQUw7QUFDRCxpQkFuQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFqTStCZSxlQUFLQyxJOztrQkFBbkIvRixLIiwiZmlsZSI6InNldHRsZWRJbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblrrblhaXpqbsnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgc3RhdHVzOiAwLCAvLyAtMTAg5rKh5YWl6am7ICAgMTHkuqTlrozpkrHlrqHmoLjkuK0gICAyMOaPkOS6pOS/oeaBr+aIkOWKnyAgMzEg5Lqk6ZKx5a6h5qC45aSx6LSlICAgIDQw5YWl6am75oiQ5YqfXHJcbiAgICBzdG9yZUdyYWRlOiBbXSwgIC8vIOWFpempu+W6l+mTuuetiee6p1xyXG4gICAgdGltZUFycjogW3tudW06IDF9LHtudW06IDJ9LHtudW06IDN9XSxcclxuICAgIHN0b3JlR3JhZGVJbmRleDogMCxcclxuICAgIHRpbWVJbmRleDogMCxcclxuICAgIHVzZUNvc3RQcmljZTogMCwgLy8g5bmz5Y+w5L2/55So6LS555SoXHJcbiAgICBib25kUHJpY2U6IDAsIC8vIOWVhuWutuS/neivgemHkVxyXG4gICAgc3RvcmVDbGFzczogW10sIC8vIOW6l+mTuuWIhuexu1xyXG4gICAgc3RvcmVDbGFzc0luZGV4OiAwLCAvL+W6l+mTuuWIhuexu+e0ouW8lVxyXG4gICAgc3RvcmVfaWQ6ICcnLCAvLyDlupfpk7ppZFxyXG4gICAgam9pbkluZm86IHt9LFxyXG4gICAgc3RvcmVDbGFzc0xpc3Q6IFtdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7XHJcbiAgICB1c2VDb3N0UHJpY2UoKSB7XHJcbiAgICAgIHZhciBudW0gPSB0aGlzLnRpbWVBcnJbdGhpcy50aW1lSW5kZXhdLm51bVxyXG4gICAgICB2YXIgcHJpY2UgPSB0aGlzLnN0b3JlR3JhZGVbdGhpcy5zdG9yZUdyYWRlSW5kZXhdICYmIHRoaXMuc3RvcmVHcmFkZVt0aGlzLnN0b3JlR3JhZGVJbmRleF0uc2dfcHJpY2VcclxuICAgICAgcmV0dXJuIChOdW1iZXIobnVtKSAqIE51bWJlcihwcmljZSkpLnRvRml4ZWQoMilcclxuICAgIH0sXHJcbiAgICBib25kUHJpY2UoKSB7XHJcbiAgICAgIHZhciBwcmljZSA9IHRoaXMuc3RvcmVDbGFzc1t0aGlzLnN0b3JlQ2xhc3NJbmRleF0gJiYgdGhpcy5zdG9yZUNsYXNzW3RoaXMuc3RvcmVDbGFzc0luZGV4XS5zY19iYWlsXHJcbiAgICAgIHJldHVybiBOdW1iZXIocHJpY2UpLnRvRml4ZWQoMilcclxuICAgIH1cclxuICB9O1xyXG4gIG9uU2hvdygpIHt9XHJcbiAgd2F0Y2ggPSB7fVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBzdWJtaXQoZSkge1xyXG4gICAgICB2YXIge2FkbWluLCBwYXNzd29yZCwgbmFtZSwgY29kZSwgY29udGFjdHMsIHBob25lLCBhZGRyZXNzLCByZW1hcmtzfSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIGlmKCEvXihcXHcpezYsMjB9JC8udGVzdChhZG1pbikpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaU26IezMjDkvY3llYbpk7rotKblj7cnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighL14oXFx3KXs2LDIwfSQvLnRlc3QocGFzc3dvcmQpKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWlNuiHszIw5L2N5a+G56CBJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIW5hbWUpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXllYbpk7rlkI3np7AnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighL14oXFx3KXs2LDIwfSQvLnRlc3QoY29kZSkpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaU26IezMjDkvY3llYbpk7rnvJblj7cnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighY29udGFjdHMpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXogZTns7vkurrlp5PlkI0nLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZihwaG9uZS5sZW5ndGggIT0gMTEpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXmraPnoa7nmoTogZTns7vnlLXor50nLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighYWRkcmVzcykge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeWVhumTuuWcsOWdgCcsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGlmKCFyZW1hcmtzKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5aSH5rOoJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkuYWRkU3RvcmUsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgc3RvcmVfbmFtZTogbmFtZSwgLy8n5bqX6ZO65ZCNJyxcclxuICAgICAgICAgIHN0b3JlX2NvZGU6IGNvZGUsIC8vJ+WVhuWutuiHquWumue8lueggScsXHJcbiAgICAgICAgICBjb250YWN0c19uYW1lOiBjb250YWN0cywgLy8n5ZWG5a626IGU57O75Lq6JyxcclxuICAgICAgICAgIGNvbnRhY3RzX3Bob25lOiBwaG9uZSwgLy8n5ZWG5a626IGU57O755S16K+dJyxcclxuICAgICAgICAgIGNvbXBhbnlfYWRkcmVzc19kZXRhaWw6IGFkZHJlc3MsIC8vJ+WVhuWutuWcsOWdgCcsXHJcbiAgICAgICAgICByZW1hcms6IHJlbWFya3MsIC8vJ+WFpempu+eUs+ivt+Wkh+azqCcsXHJcbiAgICAgICAgICBqb2luaW5feWVhcjogdGhpcy50aW1lQXJyW3RoaXMudGltZUluZGV4XS5udW0sIC8vJ+WFpempu+aXtumVvycsXHJcbiAgICAgICAgICBzY19pZDogIHRoaXMuc3RvcmVDbGFzc1t0aGlzLnN0b3JlQ2xhc3NJbmRleF0uc2NfaWQsIC8vJ+W6l+mTuuWIhuexu+e8luWPtycsXHJcbiAgICAgICAgICBzY19uYW1lOiB0aGlzLnN0b3JlQ2xhc3NbdGhpcy5zdG9yZUNsYXNzSW5kZXhdLnNjX25hbWUsIC8vJ+W6l+mTuuWIhuexu+WQjeensCcsXHJcbiAgICAgICAgICBzY19iYWlsOiB0aGlzLnN0b3JlQ2xhc3NbdGhpcy5zdG9yZUNsYXNzSW5kZXhdLnNjX2JhaWwsIC8vJ+W6l+mTuuWIhuexu+S/neivgemHkScsXHJcbiAgICAgICAgICBzZ19pZDogdGhpcy5zdG9yZUdyYWRlW3RoaXMuc3RvcmVHcmFkZUluZGV4XS5zZ19pZCwgLy8n5bqX6ZO6562J57qn57yW5Y+3JyxcclxuICAgICAgICAgIHNnX25hbWU6IHRoaXMuc3RvcmVHcmFkZVt0aGlzLnN0b3JlR3JhZGVJbmRleF0uc2dfbmFtZSwgLy8n5bqX6ZO6562J57qn5ZCN56ewJyxcclxuICAgICAgICAgIHNnX2luZm86IHRoaXMuc3RvcmVHcmFkZVt0aGlzLnN0b3JlR3JhZGVJbmRleF0uc2dfcHJpY2UsIC8vJ+W6l+mTuuetiee6p+S7t+agvCcsXHJcbiAgICAgICAgICBzZWxsZXJfbmFtZTogYWRtaW4sIC8vJ+WNluWutui0puWPtydcclxuICAgICAgICAgIHNlbGxlcl9wc3c6IHBhc3N3b3JkLCAvLyDlr4bnoIFcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5tc2csXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgICAvLyB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogJ3NldHRsZWRJblBheScgfSk7XHJcbiAgICB9LFxyXG4gICAgc3RvcmVHcmFkZUNoYW5nZShlKSB7XHJcbiAgICAgIHZhciB2YWx1ZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIHRoaXMuc3RvcmVHcmFkZUluZGV4ID0gdmFsdWVcclxuXHJcbiAgICB9LFxyXG4gICAgdGltZUNoYW5nZShlKXtcclxuICAgICAgdGhpcy50aW1lSW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSxcclxuICAgIHN0b3JlQ2xhc3NDaGFuZ2UoZSkge1xyXG4gICAgICB0aGlzLnN0b3JlQ2xhc3NJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcblxyXG4gICAgfSxcclxuICAgIGJpbmRNdWx0aVBpY2tlckNoYW5nZShlKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGJpbmRNdWx0aVBpY2tlckNvbHVtbkNoYW5nZShlKXtcclxuICAgICAgIGNvbnNvbGUubG9nKCfkv67mlLnnmoTliJfkuLonLCBlLmRldGFpbC5jb2x1bW4sICfvvIzlgLzkuLonLCBlLmRldGFpbC52YWx1ZSk7XHJcbiAgICAgICB0aGlzLnNldExpc3QoZS5kZXRhaWwuY29sdW1uLCBlLmRldGFpbC52YWx1ZSlcclxuICAgIH0sXHJcblxyXG4gIH07XHJcbiAgc2V0TGlzdChpZHgsIHZhbCkge1xyXG4gICAgaWYodmFsID09IDIpIHJldHVyblxyXG4gICAgdmFyIHN0b3JlQ2xhc3MgPSB0aGlzLnN0b3JlQ2xhc3NcclxuICAgIGlmKGlkeCA9PSAwKSB7XHJcbiAgICAgIHRoaXMuc3RvcmVDbGFzc1tpZHggKyAxXSA9IHN0b3JlQ2xhc3NbaWR4XVt2YWxdLnR3b1xyXG4gICAgfVxyXG4gICAgaWYoaWR4ID09IDEpIHtcclxuICAgICAgdGhpcy5zdG9yZUNsYXNzW2lkeCArIDFdID0gc3RvcmVDbGFzc1tpZHhdW3ZhbF0udGhyZWUgfHwgW11cclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICAvLyDliKTmlq3mmK/lkKbmj5DkuqTlhaXpqbvnlLPor7dcclxuICAgIGF3YWl0IGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5pc0pvaW4sXHJcbiAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnN0YXR1cyA9IHJlcy5kYXRhcy5zdGF0ZVxyXG4gICAgICBpZihyZXMuZGF0YXMuc3RhdGUgPT0gMTAgfHwgcmVzLmRhdGFzLnN0YXRlID09IDQwKSB7XHJcbiAgICAgICAgdGhpcy5qb2luSW5mbyA9IHJlcy5kYXRhcy5kYXRhXHJcbiAgICAgICAgdmFyIGpvaW5pbl95ZWFyID0gdGhpcy5qb2luSW5mby5qb2luaW5feWVhclxyXG4gICAgICAgIHRoaXMudGltZUFyci5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgaWYoaXRlbS5udW0gPT0gam9pbmluX3llYXIpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lSW5kZXggPSBpbmRleFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3RvcmVfaWQgPSByZXMuZGF0YXMuc3RvcmVfaWRcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICAgIC8vIOW6l+mTuuetiee6p1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmdldFN0b3JlR3JhZGVcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5zdG9yZUdyYWRlID0gcmVzLmRhdGFzLmRhdGFcclxuICAgICAgdmFyIHNnX2lkID0gdGhpcy5qb2luSW5mby5zZ19pZCBcclxuICAgICAgcmVzLmRhdGFzLmRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBpZihpdGVtLnNnX2lkID09IHNnX2lkKSB7XHJcbiAgICAgICAgICB0aGlzLnN0b3JlR3JhZGVJbmRleCA9IGluZGV4XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gICAgLy8g5bqX6ZO65YiG57G7XHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkub25lR29vZHNDbGFzc1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAvLyB0aGlzLnN0b3JlQ2xhc3NMaXN0ID0gcmVzLmRhdGFzIHx8IFtdXHJcbiAgICAgIC8vIHZhciBzY19pZCA9IHRoaXMuam9pbkluZm8uc2NfaWQgXHJcbiAgICAgIC8vIHJlcy5kYXRhcy5kYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgIC8vICAgaWYoaXRlbS5zY19pZCA9PSBzY19pZCkge1xyXG4gICAgICAvLyAgICAgdGhpcy5zdG9yZUNsYXNzSW5kZXggPSBpbmRleFxyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfSlcclxuICAgICAgdmFyIG9uZUxpc3QgPSByZXMuZGF0YXNcclxuICAgICAgdmFyIHR3b0xpc3QgPSBvbmVMaXN0WzBdLnR3b1xyXG4gICAgICB2YXIgdGhyZWVMaXN0ID0gdHdvTGlzdFswXS50aHJlZVxyXG4gICAgICB2YXIgYXJyID0gW11cclxuICAgICAgYXJyLnB1c2gob25lTGlzdClcclxuICAgICAgYXJyLnB1c2godHdvTGlzdClcclxuICAgICAgYXJyLnB1c2godGhyZWVMaXN0KVxyXG4gICAgICB0aGlzLnN0b3JlQ2xhc3MgPSBhcnJcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuXHJcblxyXG5cclxuICAgIFxyXG4gIH1cclxufVxyXG4iXX0=