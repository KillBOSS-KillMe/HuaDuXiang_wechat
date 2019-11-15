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
      status: 20, // -10没入驻  10填完信息待审核   11交完钱审核中   20填完信息审核成功  30填完信息审核失败  31交钱审核失败    40入驻成功
      storeGrade: [], // 入驻店铺等级
      timeArr: [{ num: 1 }, { num: 2 }, { num: 3 }],
      storeGradeIndex: 0,
      timeIndex: 0,
      useCostPrice: 0, // 平台使用费用
      bondPrice: 0, // 商家保证金
      storeClass: [], // 店铺分类
      storeClassIndex: 0, //店铺分类索引
      storeClassList: [],
      store_id: '', // 店铺id
      joinInfo: {},
      entryIndex: [0, 0, 0],
      entryName: '', // 店铺分类名称
      entryId: null, // 店铺分类id
      entryArr: [], // 带三级分类的条目
      type: 1 // 第一次1 编辑2
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
        if (!this.entryName) {
          wx.showToast({
            title: '请输入店铺条目',
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
            seller_psw: password, // 密码,
            store_class_ids: this.entryId,
            store_class_names: this.entryName,
            type: this.type
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
      bindMultiPickerChange: function bindMultiPickerChange(e) {
        var idxArr = e.detail.value;
        this.entryIndex = idxArr;
        var entryArr = this.entryArr;
        this.entryName = entryArr[0][idxArr[0]].gc_name + ',' + entryArr[1][idxArr[1]].gc_name + ',' + entryArr[2][idxArr[2]].gc_name;
        this.entryId = entryArr[0][idxArr[0]].gc_id + ',' + entryArr[1][idxArr[1]].gc_id + ',' + entryArr[2][idxArr[2]].gc_id;
      },
      bindMultiPickerColumnChange: function bindMultiPickerColumnChange(e) {
        this.setList(e.detail.column, e.detail.value);
      },

      // 重新填写信息按钮
      againInfo: function againInfo(e) {
        this.status = -10;
      },

      // 入驻付钱
      settledIn: function settledIn() {}
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'setList',
    value: function setList(idx, val) {
      var allArr = this.entryArr[0];
      if (idx == 0) {
        this.entryArr[1] = allArr[val].two;
        this.entryArr[2] = allArr[val].two[0].three;
      } else if (idx == 1) {
        this.entryArr[2] = this.entryArr[1][val].three;
      } else if (idx == 3) {
        return false;
      }
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
                  if (res.datas.state != -10) {
                    _this2.type = 2;
                    _this2.joinInfo = res.datas.data;
                    var joinin_year = _this2.joinInfo.joinin_year;
                    _this2.entryId = _this2.joinInfo.store_class_ids;
                    _this2.entryName = _this2.joinInfo.store_class_names;
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
                // 店铺分类(一)
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
                // 店铺分类(二)
                (0, _ajax.ajax)({
                  url: api.oneGoodsClass
                }).then(function (res) {
                  var oneList = res.datas;
                  var twoList = oneList[0].two;
                  var threeList = twoList[0].three;
                  var arr = [];
                  arr.push(oneList);
                  arr.push(twoList);
                  arr.push(threeList);
                  _this2.entryArr = arr;
                  _this2.$apply();
                });

              case 6:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZWRJbi5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJzdGF0dXMiLCJzdG9yZUdyYWRlIiwidGltZUFyciIsIm51bSIsInN0b3JlR3JhZGVJbmRleCIsInRpbWVJbmRleCIsInVzZUNvc3RQcmljZSIsImJvbmRQcmljZSIsInN0b3JlQ2xhc3MiLCJzdG9yZUNsYXNzSW5kZXgiLCJzdG9yZUNsYXNzTGlzdCIsInN0b3JlX2lkIiwiam9pbkluZm8iLCJlbnRyeUluZGV4IiwiZW50cnlOYW1lIiwiZW50cnlJZCIsImVudHJ5QXJyIiwidHlwZSIsImNvbXB1dGVkIiwicHJpY2UiLCJzZ19wcmljZSIsIk51bWJlciIsInRvRml4ZWQiLCJzY19iYWlsIiwid2F0Y2giLCJtZXRob2RzIiwic3VibWl0IiwiZSIsImRldGFpbCIsInZhbHVlIiwiYWRtaW4iLCJwYXNzd29yZCIsIm5hbWUiLCJjb2RlIiwiY29udGFjdHMiLCJwaG9uZSIsImFkZHJlc3MiLCJyZW1hcmtzIiwidGVzdCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwibGVuZ3RoIiwidXJsIiwiYWRkU3RvcmUiLCJzdG9yZV9uYW1lIiwic3RvcmVfY29kZSIsImNvbnRhY3RzX25hbWUiLCJjb250YWN0c19waG9uZSIsImNvbXBhbnlfYWRkcmVzc19kZXRhaWwiLCJyZW1hcmsiLCJqb2luaW5feWVhciIsInNjX2lkIiwic2NfbmFtZSIsInNnX2lkIiwic2dfbmFtZSIsInNnX2luZm8iLCJzZWxsZXJfbmFtZSIsInNlbGxlcl9wc3ciLCJzdG9yZV9jbGFzc19pZHMiLCJzdG9yZV9jbGFzc19uYW1lcyIsInRoZW4iLCJyZXMiLCJkYXRhcyIsIm1zZyIsInN0b3JlR3JhZGVDaGFuZ2UiLCJ0aW1lQ2hhbmdlIiwic3RvcmVDbGFzc0NoYW5nZSIsImJpbmRNdWx0aVBpY2tlckNoYW5nZSIsImlkeEFyciIsImdjX25hbWUiLCJnY19pZCIsImJpbmRNdWx0aVBpY2tlckNvbHVtbkNoYW5nZSIsInNldExpc3QiLCJjb2x1bW4iLCJhZ2FpbkluZm8iLCJzZXR0bGVkSW4iLCJldmVudHMiLCJpZHgiLCJ2YWwiLCJhbGxBcnIiLCJ0d28iLCJ0aHJlZSIsInRoYXQiLCJpc0pvaW4iLCJzdGF0ZSIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCIkYXBwbHkiLCJnZXRTdG9yZUdyYWRlIiwiZ2V0U3RvcmVDbGFzcyIsIm9uZUdvb2RzQ2xhc3MiLCJvbmVMaXN0IiwidHdvTGlzdCIsInRocmVlTGlzdCIsImFyciIsInB1c2giLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBSXFCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsY0FBUSxFQURILEVBQ087QUFDWkMsa0JBQVksRUFGUCxFQUVZO0FBQ2pCQyxlQUFTLENBQUMsRUFBQ0MsS0FBSyxDQUFOLEVBQUQsRUFBVSxFQUFDQSxLQUFLLENBQU4sRUFBVixFQUFtQixFQUFDQSxLQUFLLENBQU4sRUFBbkIsQ0FISjtBQUlMQyx1QkFBaUIsQ0FKWjtBQUtMQyxpQkFBVyxDQUxOO0FBTUxDLG9CQUFjLENBTlQsRUFNWTtBQUNqQkMsaUJBQVcsQ0FQTixFQU9TO0FBQ2RDLGtCQUFZLEVBUlAsRUFRVztBQUNoQkMsdUJBQWlCLENBVFosRUFTZTtBQUNwQkMsc0JBQWdCLEVBVlg7QUFXTEMsZ0JBQVUsRUFYTCxFQVdTO0FBQ2RDLGdCQUFVLEVBWkw7QUFhTEMsa0JBQVksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FiUDtBQWNMQyxpQkFBVyxFQWROLEVBY1U7QUFDZkMsZUFBUyxJQWZKLEVBZVU7QUFDZkMsZ0JBQVUsRUFoQkwsRUFnQlM7QUFDZEMsWUFBTSxDQWpCRCxDQWlCSTtBQWpCSixLLFFBb0JQQyxRLEdBQVc7QUFDVFosa0JBRFMsMEJBQ007QUFDYixZQUFJSCxNQUFNLEtBQUtELE9BQUwsQ0FBYSxLQUFLRyxTQUFsQixFQUE2QkYsR0FBdkM7QUFDQSxZQUFJZ0IsUUFBUSxLQUFLbEIsVUFBTCxDQUFnQixLQUFLRyxlQUFyQixLQUF5QyxLQUFLSCxVQUFMLENBQWdCLEtBQUtHLGVBQXJCLEVBQXNDZ0IsUUFBM0Y7QUFDQSxlQUFPLENBQUNDLE9BQU9sQixHQUFQLElBQWNrQixPQUFPRixLQUFQLENBQWYsRUFBOEJHLE9BQTlCLENBQXNDLENBQXRDLENBQVA7QUFDRCxPQUxRO0FBTVRmLGVBTlMsdUJBTUc7QUFDVixZQUFJWSxRQUFRLEtBQUtYLFVBQUwsQ0FBZ0IsS0FBS0MsZUFBckIsS0FBeUMsS0FBS0QsVUFBTCxDQUFnQixLQUFLQyxlQUFyQixFQUFzQ2MsT0FBM0Y7QUFDQSxlQUFPRixPQUFPRixLQUFQLEVBQWNHLE9BQWQsQ0FBc0IsQ0FBdEIsQ0FBUDtBQUNEO0FBVFEsSyxRQVlYRSxLLEdBQVEsRSxRQUNSQyxPLEdBQVU7QUFDUkMsWUFEUSxrQkFDREMsQ0FEQyxFQUNFO0FBQUEsOEJBQytEQSxFQUFFQyxNQUFGLENBQVNDLEtBRHhFO0FBQUEsWUFDSEMsS0FERyxtQkFDSEEsS0FERztBQUFBLFlBQ0lDLFFBREosbUJBQ0lBLFFBREo7QUFBQSxZQUNjQyxJQURkLG1CQUNjQSxJQURkO0FBQUEsWUFDb0JDLElBRHBCLG1CQUNvQkEsSUFEcEI7QUFBQSxZQUMwQkMsUUFEMUIsbUJBQzBCQSxRQUQxQjtBQUFBLFlBQ29DQyxLQURwQyxtQkFDb0NBLEtBRHBDO0FBQUEsWUFDMkNDLE9BRDNDLG1CQUMyQ0EsT0FEM0M7QUFBQSxZQUNvREMsT0FEcEQsbUJBQ29EQSxPQURwRDs7QUFFUixZQUFHLENBQUMsZUFBZUMsSUFBZixDQUFvQlIsS0FBcEIsQ0FBSixFQUFnQztBQUM5QlMsYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPLGNBREk7QUFFWEMsa0JBQU07QUFGSyxXQUFiO0FBSUEsaUJBQU8sS0FBUDtBQUNEO0FBQ0QsWUFBRyxDQUFDLGVBQWVKLElBQWYsQ0FBb0JQLFFBQXBCLENBQUosRUFBbUM7QUFDakNRLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxZQURJO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlBLGlCQUFPLEtBQVA7QUFDRDtBQUNELFlBQUcsQ0FBQ1YsSUFBSixFQUFVO0FBQ1JPLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxTQURJO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlBLGlCQUFPLEtBQVA7QUFDRDtBQUNELFlBQUcsQ0FBQyxlQUFlSixJQUFmLENBQW9CTCxJQUFwQixDQUFKLEVBQStCO0FBQzdCTSxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sY0FESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFHLENBQUNSLFFBQUosRUFBYztBQUNaSyxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sVUFESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFHUCxNQUFNUSxNQUFOLElBQWdCLEVBQW5CLEVBQXVCO0FBQ3JCSixhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sWUFESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFHLENBQUNOLE9BQUosRUFBYTtBQUNYRyxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sU0FESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFHLENBQUMsS0FBSzVCLFNBQVQsRUFBb0I7QUFDbEJ5QixhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sU0FESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFHLENBQUNMLE9BQUosRUFBYTtBQUNYRSxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sT0FESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCx3QkFBSztBQUNIRSxlQUFLcEQsSUFBSXFELFFBRE47QUFFSDlDLGdCQUFNO0FBQ0orQyx3QkFBWWQsSUFEUixFQUNjO0FBQ2xCZSx3QkFBWWQsSUFGUixFQUVjO0FBQ2xCZSwyQkFBZWQsUUFIWCxFQUdxQjtBQUN6QmUsNEJBQWdCZCxLQUpaLEVBSW1CO0FBQ3ZCZSxvQ0FBd0JkLE9BTHBCLEVBSzZCO0FBQ2pDZSxvQkFBUWQsT0FOSixFQU1hO0FBQ2pCZSx5QkFBYSxLQUFLbEQsT0FBTCxDQUFhLEtBQUtHLFNBQWxCLEVBQTZCRixHQVB0QyxFQU8yQztBQUMvQ2tELG1CQUFRLEtBQUs3QyxVQUFMLENBQWdCLEtBQUtDLGVBQXJCLEVBQXNDNEMsS0FSMUMsRUFRaUQ7QUFDckRDLHFCQUFTLEtBQUs5QyxVQUFMLENBQWdCLEtBQUtDLGVBQXJCLEVBQXNDNkMsT0FUM0MsRUFTb0Q7QUFDeEQvQixxQkFBUyxLQUFLZixVQUFMLENBQWdCLEtBQUtDLGVBQXJCLEVBQXNDYyxPQVYzQyxFQVVvRDtBQUN4RGdDLG1CQUFPLEtBQUt0RCxVQUFMLENBQWdCLEtBQUtHLGVBQXJCLEVBQXNDbUQsS0FYekMsRUFXZ0Q7QUFDcERDLHFCQUFTLEtBQUt2RCxVQUFMLENBQWdCLEtBQUtHLGVBQXJCLEVBQXNDb0QsT0FaM0MsRUFZb0Q7QUFDeERDLHFCQUFTLEtBQUt4RCxVQUFMLENBQWdCLEtBQUtHLGVBQXJCLEVBQXNDZ0IsUUFiM0MsRUFhcUQ7QUFDekRzQyx5QkFBYTVCLEtBZFQsRUFjZ0I7QUFDcEI2Qix3QkFBWTVCLFFBZlIsRUFla0I7QUFDdEI2Qiw2QkFBaUIsS0FBSzdDLE9BaEJsQjtBQWlCSjhDLCtCQUFtQixLQUFLL0MsU0FqQnBCO0FBa0JKRyxrQkFBTSxLQUFLQTtBQWxCUDtBQUZILFNBQUwsRUFzQkc2QyxJQXRCSCxDQXNCUSxlQUFPO0FBQ2J2QixhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU9zQixJQUFJQyxLQUFKLENBQVVDLEdBRE47QUFFWHZCLGtCQUFNO0FBRkssV0FBYjtBQUlELFNBM0JEO0FBNEJBO0FBQ0QsT0EvRk87QUFnR1J3QixzQkFoR1EsNEJBZ0dTdkMsQ0FoR1QsRUFnR1k7QUFDbEIsWUFBSUUsUUFBUUYsRUFBRUMsTUFBRixDQUFTQyxLQUFyQjtBQUNBLGFBQUt6QixlQUFMLEdBQXVCeUIsS0FBdkI7QUFFRCxPQXBHTztBQXFHUnNDLGdCQXJHUSxzQkFxR0d4QyxDQXJHSCxFQXFHSztBQUNYLGFBQUt0QixTQUFMLEdBQWlCc0IsRUFBRUMsTUFBRixDQUFTQyxLQUExQjtBQUNELE9BdkdPO0FBd0dSdUMsc0JBeEdRLDRCQXdHU3pDLENBeEdULEVBd0dZO0FBQ2xCLGFBQUtsQixlQUFMLEdBQXVCa0IsRUFBRUMsTUFBRixDQUFTQyxLQUFoQztBQUNELE9BMUdPO0FBMkdSd0MsMkJBM0dRLGlDQTJHYzFDLENBM0dkLEVBMkdpQjtBQUN2QixZQUFJMkMsU0FBUzNDLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdEI7QUFDQSxhQUFLaEIsVUFBTCxHQUFrQnlELE1BQWxCO0FBQ0EsWUFBSXRELFdBQVcsS0FBS0EsUUFBcEI7QUFDQSxhQUFLRixTQUFMLEdBQW9CRSxTQUFTLENBQVQsRUFBWXNELE9BQU8sQ0FBUCxDQUFaLEVBQXVCQyxPQUEzQyxTQUFzRHZELFNBQVMsQ0FBVCxFQUFZc0QsT0FBTyxDQUFQLENBQVosRUFBdUJDLE9BQTdFLFNBQXdGdkQsU0FBUyxDQUFULEVBQVlzRCxPQUFPLENBQVAsQ0FBWixFQUF1QkMsT0FBL0c7QUFDQSxhQUFLeEQsT0FBTCxHQUFrQkMsU0FBUyxDQUFULEVBQVlzRCxPQUFPLENBQVAsQ0FBWixFQUF1QkUsS0FBekMsU0FBa0R4RCxTQUFTLENBQVQsRUFBWXNELE9BQU8sQ0FBUCxDQUFaLEVBQXVCRSxLQUF6RSxTQUFrRnhELFNBQVMsQ0FBVCxFQUFZc0QsT0FBTyxDQUFQLENBQVosRUFBdUJFLEtBQXpHO0FBRUQsT0FsSE87QUFtSFJDLGlDQW5IUSx1Q0FtSG9COUMsQ0FuSHBCLEVBbUhzQjtBQUMzQixhQUFLK0MsT0FBTCxDQUFhL0MsRUFBRUMsTUFBRixDQUFTK0MsTUFBdEIsRUFBOEJoRCxFQUFFQyxNQUFGLENBQVNDLEtBQXZDO0FBQ0YsT0FySE87O0FBc0hSO0FBQ0ErQyxlQXZIUSxxQkF1SEVqRCxDQXZIRixFQXVISTtBQUNWLGFBQUszQixNQUFMLEdBQWMsQ0FBQyxFQUFmO0FBQ0QsT0F6SE87O0FBMEhSO0FBQ0E2RSxlQTNIUSx1QkEySEksQ0FFWDtBQTdITyxLLFFBNElWQyxNLEdBQVMsRTs7Ozs7NkJBOUlBLENBQUU7Ozs0QkFrSUhDLEcsRUFBS0MsRyxFQUFLO0FBQ2hCLFVBQUlDLFNBQVMsS0FBS2pFLFFBQUwsQ0FBYyxDQUFkLENBQWI7QUFDQSxVQUFHK0QsT0FBTyxDQUFWLEVBQWE7QUFDWCxhQUFLL0QsUUFBTCxDQUFjLENBQWQsSUFBbUJpRSxPQUFPRCxHQUFQLEVBQVlFLEdBQS9CO0FBQ0EsYUFBS2xFLFFBQUwsQ0FBYyxDQUFkLElBQW1CaUUsT0FBT0QsR0FBUCxFQUFZRSxHQUFaLENBQWdCLENBQWhCLEVBQW1CQyxLQUF0QztBQUNELE9BSEQsTUFHTyxJQUFJSixPQUFPLENBQVgsRUFBYztBQUNuQixhQUFLL0QsUUFBTCxDQUFjLENBQWQsSUFBbUIsS0FBS0EsUUFBTCxDQUFjLENBQWQsRUFBaUJnRSxHQUFqQixFQUFzQkcsS0FBekM7QUFDRCxPQUZNLE1BRUEsSUFBSUosT0FBTyxDQUFYLEVBQWM7QUFDbkIsZUFBTyxLQUFQO0FBQ0Q7QUFDRjs7Ozs7Ozs7Ozs7O0FBS0tLLG9CLEdBQU8sSTtBQUNUOzs7dUJBQ0ksZ0JBQUs7QUFDVHhDLHVCQUFLcEQsSUFBSTZGLE1BREE7QUFFVHBFLHdCQUFNO0FBRkcsaUJBQUwsRUFHSDZDLElBSEcsQ0FHRSxlQUFPO0FBQ2IseUJBQUs5RCxNQUFMLEdBQWMrRCxJQUFJQyxLQUFKLENBQVVzQixLQUF4QjtBQUNBLHNCQUFHdkIsSUFBSUMsS0FBSixDQUFVc0IsS0FBVixJQUFtQixDQUFDLEVBQXZCLEVBQTJCO0FBQ3pCLDJCQUFLckUsSUFBTCxHQUFZLENBQVo7QUFDQSwyQkFBS0wsUUFBTCxHQUFnQm1ELElBQUlDLEtBQUosQ0FBVWpFLElBQTFCO0FBQ0Esd0JBQUlxRCxjQUFjLE9BQUt4QyxRQUFMLENBQWN3QyxXQUFoQztBQUNBLDJCQUFLckMsT0FBTCxHQUFlLE9BQUtILFFBQUwsQ0FBY2dELGVBQTdCO0FBQ0EsMkJBQUs5QyxTQUFMLEdBQWlCLE9BQUtGLFFBQUwsQ0FBY2lELGlCQUEvQjtBQUNBLDJCQUFLM0QsT0FBTCxDQUFhcUYsT0FBYixDQUFxQixVQUFDQyxJQUFELEVBQU9DLEtBQVAsRUFBaUI7QUFDcEMsMEJBQUdELEtBQUtyRixHQUFMLElBQVlpRCxXQUFmLEVBQTRCO0FBQzFCLCtCQUFLL0MsU0FBTCxHQUFpQm9GLEtBQWpCO0FBQ0Q7QUFDRixxQkFKRDtBQUtEO0FBQ0QseUJBQUs5RSxRQUFMLEdBQWdCb0QsSUFBSUMsS0FBSixDQUFVckQsUUFBMUI7QUFDQSx5QkFBSytFLE1BQUw7QUFDRCxpQkFuQkssQzs7O0FBb0JOO0FBQ0EsZ0NBQUs7QUFDSDlDLHVCQUFLcEQsSUFBSW1HO0FBRE4saUJBQUwsRUFFRzdCLElBRkgsQ0FFUSxlQUFPO0FBQ2IseUJBQUs3RCxVQUFMLEdBQWtCOEQsSUFBSUMsS0FBSixDQUFVakUsSUFBNUI7QUFDQSxzQkFBSXdELFFBQVEsT0FBSzNDLFFBQUwsQ0FBYzJDLEtBQTFCO0FBQ0FRLHNCQUFJQyxLQUFKLENBQVVqRSxJQUFWLENBQWV3RixPQUFmLENBQXVCLFVBQUNDLElBQUQsRUFBT0MsS0FBUCxFQUFpQjtBQUN0Qyx3QkFBR0QsS0FBS2pDLEtBQUwsSUFBY0EsS0FBakIsRUFBd0I7QUFDdEIsNkJBQUtuRCxlQUFMLEdBQXVCcUYsS0FBdkI7QUFDRDtBQUNGLG1CQUpEO0FBS0EseUJBQUtDLE1BQUw7QUFDRCxpQkFYRDtBQVlBO0FBQ0EsZ0NBQUs7QUFDSDlDLHVCQUFLcEQsSUFBSW9HO0FBRE4saUJBQUwsRUFFRzlCLElBRkgsQ0FFUSxlQUFPO0FBQ2IseUJBQUt0RCxVQUFMLEdBQWtCdUQsSUFBSUMsS0FBSixDQUFVakUsSUFBVixJQUFrQixFQUFwQztBQUNBLHNCQUFJc0QsUUFBUSxPQUFLekMsUUFBTCxDQUFjeUMsS0FBMUI7QUFDQVUsc0JBQUlDLEtBQUosQ0FBVWpFLElBQVYsQ0FBZXdGLE9BQWYsQ0FBdUIsVUFBQ0MsSUFBRCxFQUFPQyxLQUFQLEVBQWlCO0FBQ3RDLHdCQUFHRCxLQUFLbkMsS0FBTCxJQUFjQSxLQUFqQixFQUF3QjtBQUN0Qiw2QkFBSzVDLGVBQUwsR0FBdUJnRixLQUF2QjtBQUNEO0FBQ0YsbUJBSkQ7QUFLQSx5QkFBS0MsTUFBTDtBQUNELGlCQVhEO0FBWUk7QUFDSixnQ0FBSztBQUNIOUMsdUJBQUtwRCxJQUFJcUc7QUFETixpQkFBTCxFQUVHL0IsSUFGSCxDQUVRLGVBQU87QUFDYixzQkFBSWdDLFVBQVUvQixJQUFJQyxLQUFsQjtBQUNBLHNCQUFJK0IsVUFBVUQsUUFBUSxDQUFSLEVBQVdaLEdBQXpCO0FBQ0Esc0JBQUljLFlBQVlELFFBQVEsQ0FBUixFQUFXWixLQUEzQjtBQUNBLHNCQUFJYyxNQUFNLEVBQVY7QUFDQUEsc0JBQUlDLElBQUosQ0FBU0osT0FBVDtBQUNBRyxzQkFBSUMsSUFBSixDQUFTSCxPQUFUO0FBQ0FFLHNCQUFJQyxJQUFKLENBQVNGLFNBQVQ7QUFDQSx5QkFBS2hGLFFBQUwsR0FBZ0JpRixHQUFoQjtBQUNBLHlCQUFLUCxNQUFMO0FBQ0QsaUJBWkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF6TytCUyxlQUFLQyxJOztrQkFBbkIxRyxLIiwiZmlsZSI6InNldHRsZWRJbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblrrblhaXpqbsnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgc3RhdHVzOiAyMCwgLy8gLTEw5rKh5YWl6am7ICAxMOWhq+WujOS/oeaBr+W+heWuoeaguCAgIDEx5Lqk5a6M6ZKx5a6h5qC45LitICAgMjDloavlrozkv6Hmga/lrqHmoLjmiJDlip8gIDMw5aGr5a6M5L+h5oGv5a6h5qC45aSx6LSlICAzMeS6pOmSseWuoeaguOWksei0pSAgICA0MOWFpempu+aIkOWKn1xyXG4gICAgc3RvcmVHcmFkZTogW10sICAvLyDlhaXpqbvlupfpk7rnrYnnuqdcclxuICAgIHRpbWVBcnI6IFt7bnVtOiAxfSx7bnVtOiAyfSx7bnVtOiAzfV0sXHJcbiAgICBzdG9yZUdyYWRlSW5kZXg6IDAsXHJcbiAgICB0aW1lSW5kZXg6IDAsXHJcbiAgICB1c2VDb3N0UHJpY2U6IDAsIC8vIOW5s+WPsOS9v+eUqOi0ueeUqFxyXG4gICAgYm9uZFByaWNlOiAwLCAvLyDllYblrrbkv53or4Hph5FcclxuICAgIHN0b3JlQ2xhc3M6IFtdLCAvLyDlupfpk7rliIbnsbtcclxuICAgIHN0b3JlQ2xhc3NJbmRleDogMCwgLy/lupfpk7rliIbnsbvntKLlvJVcclxuICAgIHN0b3JlQ2xhc3NMaXN0OiBbXSxcclxuICAgIHN0b3JlX2lkOiAnJywgLy8g5bqX6ZO6aWRcclxuICAgIGpvaW5JbmZvOiB7fSxcclxuICAgIGVudHJ5SW5kZXg6IFswLCAwLCAwXSxcclxuICAgIGVudHJ5TmFtZTogJycsIC8vIOW6l+mTuuWIhuexu+WQjeensFxyXG4gICAgZW50cnlJZDogbnVsbCwgLy8g5bqX6ZO65YiG57G7aWRcclxuICAgIGVudHJ5QXJyOiBbXSwgLy8g5bim5LiJ57qn5YiG57G755qE5p2h55uuXHJcbiAgICB0eXBlOiAxLCAvLyDnrKzkuIDmrKExIOe8lui+kTJcclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHtcclxuICAgIHVzZUNvc3RQcmljZSgpIHtcclxuICAgICAgdmFyIG51bSA9IHRoaXMudGltZUFyclt0aGlzLnRpbWVJbmRleF0ubnVtXHJcbiAgICAgIHZhciBwcmljZSA9IHRoaXMuc3RvcmVHcmFkZVt0aGlzLnN0b3JlR3JhZGVJbmRleF0gJiYgdGhpcy5zdG9yZUdyYWRlW3RoaXMuc3RvcmVHcmFkZUluZGV4XS5zZ19wcmljZVxyXG4gICAgICByZXR1cm4gKE51bWJlcihudW0pICogTnVtYmVyKHByaWNlKSkudG9GaXhlZCgyKVxyXG4gICAgfSxcclxuICAgIGJvbmRQcmljZSgpIHtcclxuICAgICAgdmFyIHByaWNlID0gdGhpcy5zdG9yZUNsYXNzW3RoaXMuc3RvcmVDbGFzc0luZGV4XSAmJiB0aGlzLnN0b3JlQ2xhc3NbdGhpcy5zdG9yZUNsYXNzSW5kZXhdLnNjX2JhaWxcclxuICAgICAgcmV0dXJuIE51bWJlcihwcmljZSkudG9GaXhlZCgyKVxyXG4gICAgfVxyXG4gIH07XHJcbiAgb25TaG93KCkge31cclxuICB3YXRjaCA9IHsgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBzdWJtaXQoZSkge1xyXG4gICAgICB2YXIge2FkbWluLCBwYXNzd29yZCwgbmFtZSwgY29kZSwgY29udGFjdHMsIHBob25lLCBhZGRyZXNzLCByZW1hcmtzfSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIGlmKCEvXihcXHcpezYsMjB9JC8udGVzdChhZG1pbikpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaU26IezMjDkvY3llYbpk7rotKblj7cnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighL14oXFx3KXs2LDIwfSQvLnRlc3QocGFzc3dvcmQpKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWlNuiHszIw5L2N5a+G56CBJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIW5hbWUpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXllYbpk7rlkI3np7AnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighL14oXFx3KXs2LDIwfSQvLnRlc3QoY29kZSkpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaU26IezMjDkvY3llYbpk7rnvJblj7cnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighY29udGFjdHMpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXogZTns7vkurrlp5PlkI0nLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZihwaG9uZS5sZW5ndGggIT0gMTEpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXmraPnoa7nmoTogZTns7vnlLXor50nLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighYWRkcmVzcykge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeWVhumTuuWcsOWdgCcsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGlmKCF0aGlzLmVudHJ5TmFtZSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeW6l+mTuuadoeebricsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGlmKCFyZW1hcmtzKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5aSH5rOoJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkuYWRkU3RvcmUsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgc3RvcmVfbmFtZTogbmFtZSwgLy8n5bqX6ZO65ZCNJyxcclxuICAgICAgICAgIHN0b3JlX2NvZGU6IGNvZGUsIC8vJ+WVhuWutuiHquWumue8lueggScsXHJcbiAgICAgICAgICBjb250YWN0c19uYW1lOiBjb250YWN0cywgLy8n5ZWG5a626IGU57O75Lq6JyxcclxuICAgICAgICAgIGNvbnRhY3RzX3Bob25lOiBwaG9uZSwgLy8n5ZWG5a626IGU57O755S16K+dJyxcclxuICAgICAgICAgIGNvbXBhbnlfYWRkcmVzc19kZXRhaWw6IGFkZHJlc3MsIC8vJ+WVhuWutuWcsOWdgCcsXHJcbiAgICAgICAgICByZW1hcms6IHJlbWFya3MsIC8vJ+WFpempu+eUs+ivt+Wkh+azqCcsXHJcbiAgICAgICAgICBqb2luaW5feWVhcjogdGhpcy50aW1lQXJyW3RoaXMudGltZUluZGV4XS5udW0sIC8vJ+WFpempu+aXtumVvycsXHJcbiAgICAgICAgICBzY19pZDogIHRoaXMuc3RvcmVDbGFzc1t0aGlzLnN0b3JlQ2xhc3NJbmRleF0uc2NfaWQsIC8vJ+W6l+mTuuWIhuexu+e8luWPtycsXHJcbiAgICAgICAgICBzY19uYW1lOiB0aGlzLnN0b3JlQ2xhc3NbdGhpcy5zdG9yZUNsYXNzSW5kZXhdLnNjX25hbWUsIC8vJ+W6l+mTuuWIhuexu+WQjeensCcsXHJcbiAgICAgICAgICBzY19iYWlsOiB0aGlzLnN0b3JlQ2xhc3NbdGhpcy5zdG9yZUNsYXNzSW5kZXhdLnNjX2JhaWwsIC8vJ+W6l+mTuuWIhuexu+S/neivgemHkScsXHJcbiAgICAgICAgICBzZ19pZDogdGhpcy5zdG9yZUdyYWRlW3RoaXMuc3RvcmVHcmFkZUluZGV4XS5zZ19pZCwgLy8n5bqX6ZO6562J57qn57yW5Y+3JyxcclxuICAgICAgICAgIHNnX25hbWU6IHRoaXMuc3RvcmVHcmFkZVt0aGlzLnN0b3JlR3JhZGVJbmRleF0uc2dfbmFtZSwgLy8n5bqX6ZO6562J57qn5ZCN56ewJyxcclxuICAgICAgICAgIHNnX2luZm86IHRoaXMuc3RvcmVHcmFkZVt0aGlzLnN0b3JlR3JhZGVJbmRleF0uc2dfcHJpY2UsIC8vJ+W6l+mTuuetiee6p+S7t+agvCcsXHJcbiAgICAgICAgICBzZWxsZXJfbmFtZTogYWRtaW4sIC8vJ+WNluWutui0puWPtydcclxuICAgICAgICAgIHNlbGxlcl9wc3c6IHBhc3N3b3JkLCAvLyDlr4bnoIEsXHJcbiAgICAgICAgICBzdG9yZV9jbGFzc19pZHM6IHRoaXMuZW50cnlJZCxcclxuICAgICAgICAgIHN0b3JlX2NsYXNzX25hbWVzOiB0aGlzLmVudHJ5TmFtZSxcclxuICAgICAgICAgIHR5cGU6IHRoaXMudHlwZVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogcmVzLmRhdGFzLm1zZyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICAgIC8vIHRoaXMuJG5hdmlnYXRlKHsgdXJsOiAnc2V0dGxlZEluUGF5JyB9KTtcclxuICAgIH0sXHJcbiAgICBzdG9yZUdyYWRlQ2hhbmdlKGUpIHtcclxuICAgICAgdmFyIHZhbHVlID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgdGhpcy5zdG9yZUdyYWRlSW5kZXggPSB2YWx1ZVxyXG5cclxuICAgIH0sXHJcbiAgICB0aW1lQ2hhbmdlKGUpe1xyXG4gICAgICB0aGlzLnRpbWVJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9LFxyXG4gICAgc3RvcmVDbGFzc0NoYW5nZShlKSB7XHJcbiAgICAgIHRoaXMuc3RvcmVDbGFzc0luZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgIH0sXHJcbiAgICBiaW5kTXVsdGlQaWNrZXJDaGFuZ2UoZSkge1xyXG4gICAgICB2YXIgaWR4QXJyID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgdGhpcy5lbnRyeUluZGV4ID0gaWR4QXJyXHJcbiAgICAgIHZhciBlbnRyeUFyciA9IHRoaXMuZW50cnlBcnJcclxuICAgICAgdGhpcy5lbnRyeU5hbWUgPSBgJHtlbnRyeUFyclswXVtpZHhBcnJbMF1dLmdjX25hbWV9LCR7ZW50cnlBcnJbMV1baWR4QXJyWzFdXS5nY19uYW1lfSwke2VudHJ5QXJyWzJdW2lkeEFyclsyXV0uZ2NfbmFtZX1gXHJcbiAgICAgIHRoaXMuZW50cnlJZCA9IGAke2VudHJ5QXJyWzBdW2lkeEFyclswXV0uZ2NfaWR9LCR7ZW50cnlBcnJbMV1baWR4QXJyWzFdXS5nY19pZH0sJHtlbnRyeUFyclsyXVtpZHhBcnJbMl1dLmdjX2lkfWBcclxuXHJcbiAgICB9LFxyXG4gICAgYmluZE11bHRpUGlja2VyQ29sdW1uQ2hhbmdlKGUpe1xyXG4gICAgICAgdGhpcy5zZXRMaXN0KGUuZGV0YWlsLmNvbHVtbiwgZS5kZXRhaWwudmFsdWUpXHJcbiAgICB9LFxyXG4gICAgLy8g6YeN5paw5aGr5YaZ5L+h5oGv5oyJ6ZKuXHJcbiAgICBhZ2FpbkluZm8oZSl7XHJcbiAgICAgIHRoaXMuc3RhdHVzID0gLTEwXHJcbiAgICB9LFxyXG4gICAgLy8g5YWl6am75LuY6ZKxXHJcbiAgICBzZXR0bGVkSW4oKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICB9O1xyXG4gIHNldExpc3QoaWR4LCB2YWwpIHtcclxuICAgIHZhciBhbGxBcnIgPSB0aGlzLmVudHJ5QXJyWzBdXHJcbiAgICBpZihpZHggPT0gMCkge1xyXG4gICAgICB0aGlzLmVudHJ5QXJyWzFdID0gYWxsQXJyW3ZhbF0udHdvXHJcbiAgICAgIHRoaXMuZW50cnlBcnJbMl0gPSBhbGxBcnJbdmFsXS50d29bMF0udGhyZWVcclxuICAgIH0gZWxzZSBpZiAoaWR4ID09IDEpIHtcclxuICAgICAgdGhpcy5lbnRyeUFyclsyXSA9IHRoaXMuZW50cnlBcnJbMV1bdmFsXS50aHJlZVxyXG4gICAgfSBlbHNlIGlmIChpZHggPT0gMykge1xyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBhc3luYyBvbkxvYWQoKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgLy8g5Yik5pat5piv5ZCm5o+Q5Lqk5YWl6am755Sz6K+3XHJcbiAgICBhd2FpdCBhamF4KHtcclxuICAgICAgdXJsOiBhcGkuaXNKb2luLFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5zdGF0dXMgPSByZXMuZGF0YXMuc3RhdGVcclxuICAgICAgaWYocmVzLmRhdGFzLnN0YXRlICE9IC0xMCkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IDJcclxuICAgICAgICB0aGlzLmpvaW5JbmZvID0gcmVzLmRhdGFzLmRhdGFcclxuICAgICAgICB2YXIgam9pbmluX3llYXIgPSB0aGlzLmpvaW5JbmZvLmpvaW5pbl95ZWFyXHJcbiAgICAgICAgdGhpcy5lbnRyeUlkID0gdGhpcy5qb2luSW5mby5zdG9yZV9jbGFzc19pZHNcclxuICAgICAgICB0aGlzLmVudHJ5TmFtZSA9IHRoaXMuam9pbkluZm8uc3RvcmVfY2xhc3NfbmFtZXNcclxuICAgICAgICB0aGlzLnRpbWVBcnIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGlmKGl0ZW0ubnVtID09IGpvaW5pbl95ZWFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZUluZGV4ID0gaW5kZXhcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3RvcmVfaWQgPSByZXMuZGF0YXMuc3RvcmVfaWRcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICAgIC8vIOW6l+mTuuetiee6p1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmdldFN0b3JlR3JhZGVcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5zdG9yZUdyYWRlID0gcmVzLmRhdGFzLmRhdGFcclxuICAgICAgdmFyIHNnX2lkID0gdGhpcy5qb2luSW5mby5zZ19pZCBcclxuICAgICAgcmVzLmRhdGFzLmRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBpZihpdGVtLnNnX2lkID09IHNnX2lkKSB7XHJcbiAgICAgICAgICB0aGlzLnN0b3JlR3JhZGVJbmRleCA9IGluZGV4XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gICAgLy8g5bqX6ZO65YiG57G7KOS4gClcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5nZXRTdG9yZUNsYXNzXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmVDbGFzcyA9IHJlcy5kYXRhcy5kYXRhIHx8IFtdXHJcbiAgICAgIHZhciBzY19pZCA9IHRoaXMuam9pbkluZm8uc2NfaWQgXHJcbiAgICAgIHJlcy5kYXRhcy5kYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoaXRlbS5zY19pZCA9PSBzY19pZCkge1xyXG4gICAgICAgICAgdGhpcy5zdG9yZUNsYXNzSW5kZXggPSBpbmRleFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICAgICAgICAvLyDlupfpk7rliIbnsbso5LqMKVxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm9uZUdvb2RzQ2xhc3NcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdmFyIG9uZUxpc3QgPSByZXMuZGF0YXNcclxuICAgICAgdmFyIHR3b0xpc3QgPSBvbmVMaXN0WzBdLnR3b1xyXG4gICAgICB2YXIgdGhyZWVMaXN0ID0gdHdvTGlzdFswXS50aHJlZVxyXG4gICAgICB2YXIgYXJyID0gW11cclxuICAgICAgYXJyLnB1c2gob25lTGlzdClcclxuICAgICAgYXJyLnB1c2godHdvTGlzdClcclxuICAgICAgYXJyLnB1c2godGhyZWVMaXN0KVxyXG4gICAgICB0aGlzLmVudHJ5QXJyID0gYXJyXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==