'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../ajax.js');

var _mask = require('./../components/mask.js');

var _mask2 = _interopRequireDefault(_mask);

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
      navigationBarTitleText: '会员中心'
    }, _this.$repeat = {}, _this.$props = { "vipmask": { "xmlns:v-bind": "", "v-bind:maskFlag.sync": "vipFlag" } }, _this.$events = {}, _this.components = {
      vipmask: _mask2.default
    }, _this.mixins = [], _this.data = {
      gradeArr: [{ title: '普通会员' }, { title: '银卡会员' }, { title: '金卡会员' }, { title: '钻石会员' }],
      active: 3,
      bgImg: 'image37.png',
      menberExplain: [{
        membername: '普通会员',
        menberintroduce: '只参与积分和充值, 只要关注公众号即可成为普通会员'
      }, {
        membername: '银卡会员',
        menberintroduce: '普通会员累计消费满1000元或者一次性充值满500元即可成为银卡会员,全场商品享受98折优惠'
      }, {
        membername: '金卡会员',
        menberintroduce: '普通会员累计消费满500元或者一次性充值满3000元; \n 银卡会员一次性充值2500元挥着累计充值5000元即可成为金卡会员,全场商品享受9,5折优惠'
      }, {
        membername: '钻石会员',
        menberintroduce: '普通会员累计消费20000元或者一次性充值满10000元; \n 金卡会员补充7500元, 普通会员累计充值20000元即可成为钻石会员, 全场商品享受9折优惠; \n 同时不定期推出针对钻石会员的劲爆活动.'
      }],
      member_info: null,
      member_data: null,
      vipFlag: false,
      priceArr: [],
      price: '',
      priceActive: null
    }, _this.computed = {}, _this.events = {}, _this.methods = {
      changePrice: function changePrice(price, idx) {
        this.price = price;
        this.priceActive = idx;
      },
      bindfocus: function bindfocus() {
        this.price = '';
        this.priceActive = null;
      },
      bindinput: function bindinput(e) {
        this.price = e.detail.value;
      },
      showVipFlag: function showVipFlag(e) {
        this.vipFlag = true;
      },
      recharge: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var resData, payData;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (this.price) {
                    _context.next = 3;
                    break;
                  }

                  wx.showToast({
                    title: '请输入充值金额',
                    icon: 'none'
                  });
                  return _context.abrupt('return', false);

                case 3:
                  _context.next = 5;
                  return (0, _ajax.ajax)({
                    url: api.recharge,
                    data: {
                      pdr_amount: this.price
                    }
                  }).then(function (res) {
                    if (res.code == 200) {
                      return res.datas;
                    } else if (res.code == 400) {
                      wx.showToast({
                        title: res.datas.error,
                        icon: 'none'
                      });
                    }
                  });

                case 5:
                  resData = _context.sent;

                  if (resData) {
                    _context.next = 8;
                    break;
                  }

                  return _context.abrupt('return');

                case 8:
                  _context.next = 10;
                  return (0, _ajax.ajax)({
                    url: api.memberPaymentRecharge,
                    data: {
                      payment_code: 'mini_wxpay',
                      pay_sn: resData.pdinfo.pdr_sn
                    }
                  }).then(function (res) {
                    if (res.datas.state == 1) {
                      return res.datas;
                    } else if (res.code == 400) {
                      wx.showToast({
                        title: res.datas.error,
                        icon: 'none'
                      });
                    }
                  });

                case 10:
                  payData = _context.sent;

                  if (payData) {
                    wx.requestPayment(_extends({}, payData.api_pay, {
                      success: function success(res) {
                        console.log(res);
                      },
                      complete: function complete(d) {
                        console.log(d);
                      }
                    }));
                  }

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function recharge() {
          return _ref2.apply(this, arguments);
        }

        return recharge;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {}
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      // 用户个人中心数据接口
      (0, _ajax.ajax)({
        url: api.memberInfo
      }).then(function (res) {
        if (res.code == 200) {
          _this2.member_info = res.datas.member_info;
          _this2.member_data = res.datas.member_data;
          switch (res.datas.member_info.level) {
            case 0:
              _this2.bgImg = 'image37.png';
              break;
            case 1:
              _this2.bgImg = 'image38.png';
              break;
            case 2:
              _this2.bgImg = 'image39.png';
              break;
            case 3:
              _this2.bgImg = 'image34.png';
              break;
          }
          _this2.priceArr = res.datas.pay_amount;
          _this2.$apply();
        }
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/vip'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpcC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwidmlwbWFzayIsIm1hc2siLCJtaXhpbnMiLCJkYXRhIiwiZ3JhZGVBcnIiLCJ0aXRsZSIsImFjdGl2ZSIsImJnSW1nIiwibWVuYmVyRXhwbGFpbiIsIm1lbWJlcm5hbWUiLCJtZW5iZXJpbnRyb2R1Y2UiLCJtZW1iZXJfaW5mbyIsIm1lbWJlcl9kYXRhIiwidmlwRmxhZyIsInByaWNlQXJyIiwicHJpY2UiLCJwcmljZUFjdGl2ZSIsImNvbXB1dGVkIiwiZXZlbnRzIiwibWV0aG9kcyIsImNoYW5nZVByaWNlIiwiaWR4IiwiYmluZGZvY3VzIiwiYmluZGlucHV0IiwiZSIsImRldGFpbCIsInZhbHVlIiwic2hvd1ZpcEZsYWciLCJyZWNoYXJnZSIsInd4Iiwic2hvd1RvYXN0IiwiaWNvbiIsInVybCIsInBkcl9hbW91bnQiLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwiZXJyb3IiLCJyZXNEYXRhIiwibWVtYmVyUGF5bWVudFJlY2hhcmdlIiwicGF5bWVudF9jb2RlIiwicGF5X3NuIiwicGRpbmZvIiwicGRyX3NuIiwic3RhdGUiLCJwYXlEYXRhIiwicmVxdWVzdFBheW1lbnQiLCJhcGlfcGF5Iiwic3VjY2VzcyIsImNvbnNvbGUiLCJsb2ciLCJjb21wbGV0ZSIsImQiLCJvcHRpb25zIiwibWVtYmVySW5mbyIsImxldmVsIiwicGF5X2Ftb3VudCIsIiRhcHBseSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRkEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBTXFCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxXQUFVLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFNBQTFDLEVBQVgsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkMsZUFBU0M7QUFEQyxLLFFBSVpDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxnQkFBVSxDQUNSLEVBQUVDLE9BQU8sTUFBVCxFQURRLEVBRVIsRUFBRUEsT0FBTyxNQUFULEVBRlEsRUFHUixFQUFFQSxPQUFPLE1BQVQsRUFIUSxFQUlSLEVBQUVBLE9BQU8sTUFBVCxFQUpRLENBREw7QUFPTEMsY0FBUSxDQVBIO0FBUUxDLGFBQU8sYUFSRjtBQVNMQyxxQkFBZSxDQUNiO0FBQ0VDLG9CQUFZLE1BRGQ7QUFFRUMseUJBQWlCO0FBRm5CLE9BRGEsRUFLYjtBQUNFRCxvQkFBWSxNQURkO0FBRUVDLHlCQUNFO0FBSEosT0FMYSxFQVViO0FBQ0VELG9CQUFZLE1BRGQ7QUFFRUMseUJBQ0U7QUFISixPQVZhLEVBZWI7QUFDRUQsb0JBQVksTUFEZDtBQUVFQyx5QkFDRTtBQUhKLE9BZmEsQ0FUVjtBQThCTEMsbUJBQWEsSUE5QlI7QUErQkxDLG1CQUFhLElBL0JSO0FBZ0NMQyxlQUFTLEtBaENKO0FBaUNMQyxnQkFBVSxFQWpDTDtBQWtDTEMsYUFBTyxFQWxDRjtBQW1DTEMsbUJBQWE7QUFuQ1IsSyxRQXNDUEMsUSxHQUFXLEUsUUFFWEMsTSxHQUFTLEUsUUFrQ1RDLE8sR0FBVTtBQUNSQyxpQkFEUSx1QkFDSUwsS0FESixFQUNXTSxHQURYLEVBQ2U7QUFDckIsYUFBS04sS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBS0MsV0FBTCxHQUFtQkssR0FBbkI7QUFDRCxPQUpPO0FBS1JDLGVBTFEsdUJBS0k7QUFDVixhQUFLUCxLQUFMLEdBQWEsRUFBYjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDRCxPQVJPO0FBU1JPLGVBVFEscUJBU0VDLENBVEYsRUFTSztBQUNYLGFBQUtULEtBQUwsR0FBYVMsRUFBRUMsTUFBRixDQUFTQyxLQUF0QjtBQUNELE9BWE87QUFZUkMsaUJBWlEsdUJBWUlILENBWkosRUFZTztBQUNiLGFBQUtYLE9BQUwsR0FBZSxJQUFmO0FBQ0QsT0FkTztBQWVGZSxjQWZFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBZ0JGLEtBQUtiLEtBaEJIO0FBQUE7QUFBQTtBQUFBOztBQWlCSmMscUJBQUdDLFNBQUgsQ0FBYTtBQUNYekIsMkJBQU8sU0FESTtBQUVYMEIsMEJBQU07QUFGSyxtQkFBYjtBQWpCSSxtREFxQkcsS0FyQkg7O0FBQUE7QUFBQTtBQUFBLHlCQXVCZSxnQkFBSztBQUN4QkMseUJBQUt6QyxJQUFJcUMsUUFEZTtBQUV4QnpCLDBCQUFNO0FBQ0o4QixrQ0FBWSxLQUFLbEI7QUFEYjtBQUZrQixtQkFBTCxFQUtsQm1CLElBTGtCLENBS2IsZUFBTTtBQUNaLHdCQUFHQyxJQUFJQyxJQUFKLElBQVksR0FBZixFQUFvQjtBQUNsQiw2QkFBT0QsSUFBSUUsS0FBWDtBQUNELHFCQUZELE1BRU8sSUFBR0YsSUFBSUMsSUFBSixJQUFZLEdBQWYsRUFBb0I7QUFDekJQLHlCQUFHQyxTQUFILENBQWE7QUFDWHpCLCtCQUFPOEIsSUFBSUUsS0FBSixDQUFVQyxLQUROO0FBRVhQLDhCQUFNO0FBRkssdUJBQWI7QUFJRDtBQUNGLG1CQWRvQixDQXZCZjs7QUFBQTtBQXVCRlEseUJBdkJFOztBQUFBLHNCQXNDRkEsT0F0Q0U7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBLHlCQXVDYyxnQkFBSztBQUN2QlAseUJBQUt6QyxJQUFJaUQscUJBRGM7QUFFdkJyQywwQkFBTTtBQUNKc0Msb0NBQWMsWUFEVjtBQUVKQyw4QkFBUUgsUUFBUUksTUFBUixDQUFlQztBQUZuQjtBQUZpQixtQkFBTCxFQU1qQlYsSUFOaUIsQ0FNWixlQUFPO0FBQ2Isd0JBQUdDLElBQUlFLEtBQUosQ0FBVVEsS0FBVixJQUFtQixDQUF0QixFQUF5QjtBQUN2Qiw2QkFBT1YsSUFBSUUsS0FBWDtBQUNELHFCQUZELE1BRU0sSUFBR0YsSUFBSUMsSUFBSixJQUFZLEdBQWYsRUFBb0I7QUFDeEJQLHlCQUFHQyxTQUFILENBQWE7QUFDWHpCLCtCQUFPOEIsSUFBSUUsS0FBSixDQUFVQyxLQUROO0FBRVhQLDhCQUFNO0FBRkssdUJBQWI7QUFJRDtBQUNGLG1CQWZtQixDQXZDZDs7QUFBQTtBQXVDRmUseUJBdkNFOztBQXVETixzQkFBR0EsT0FBSCxFQUFZO0FBQ1ZqQix1QkFBR2tCLGNBQUgsY0FDS0QsUUFBUUUsT0FEYjtBQUVFQyw2QkFGRixtQkFFVWQsR0FGVixFQUVlO0FBQ1hlLGdDQUFRQyxHQUFSLENBQVloQixHQUFaO0FBQ0QsdUJBSkg7QUFLRWlCLDhCQUxGLG9CQUtXQyxDQUxYLEVBS2M7QUFBQ0gsZ0NBQVFDLEdBQVIsQ0FBWUUsQ0FBWjtBQUFlO0FBTDlCO0FBT0Q7O0FBL0RLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsSzs7Ozs7MkJBaENIQyxPLEVBQVMsQ0FFZjs7OzZCQUVPO0FBQUE7O0FBQ0w7QUFDRCxzQkFBSztBQUNIdEIsYUFBS3pDLElBQUlnRTtBQUROLE9BQUwsRUFFR3JCLElBRkgsQ0FFUSxlQUFPO0FBQ2IsWUFBR0MsSUFBSUMsSUFBSixJQUFZLEdBQWYsRUFBb0I7QUFDbEIsaUJBQUt6QixXQUFMLEdBQW1Cd0IsSUFBSUUsS0FBSixDQUFVMUIsV0FBN0I7QUFDQSxpQkFBS0MsV0FBTCxHQUFtQnVCLElBQUlFLEtBQUosQ0FBVXpCLFdBQTdCO0FBQ0Esa0JBQVF1QixJQUFJRSxLQUFKLENBQVUxQixXQUFWLENBQXNCNkMsS0FBOUI7QUFDRSxpQkFBSyxDQUFMO0FBQ0UscUJBQUtqRCxLQUFMLEdBQWEsYUFBYjtBQUNBO0FBQ0YsaUJBQUssQ0FBTDtBQUNFLHFCQUFLQSxLQUFMLEdBQWEsYUFBYjtBQUNBO0FBQ0YsaUJBQUssQ0FBTDtBQUNFLHFCQUFLQSxLQUFMLEdBQWEsYUFBYjtBQUNBO0FBQ0YsaUJBQUssQ0FBTDtBQUNFLHFCQUFLQSxLQUFMLEdBQWEsYUFBYjtBQUNBO0FBWko7QUFjQSxpQkFBS08sUUFBTCxHQUFnQnFCLElBQUlFLEtBQUosQ0FBVW9CLFVBQTFCO0FBQ0EsaUJBQUtDLE1BQUw7QUFDRDtBQUNGLE9BdkJEO0FBd0JEOzs7O0VBckZnQ0MsZUFBS0MsSTs7a0JBQW5CbkUsSyIsImZpbGUiOiJ2aXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5pbXBvcnQgbWFzayBmcm9tICcuLi9jb21wb25lbnRzL21hc2snO1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S8muWRmOS4reW/gydcclxuICB9O1xyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ2aXBtYXNrXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDptYXNrRmxhZy5zeW5jXCI6XCJ2aXBGbGFnXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIHZpcG1hc2s6IG1hc2tcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGdyYWRlQXJyOiBbXHJcbiAgICAgIHsgdGl0bGU6ICfmma7pgJrkvJrlkZgnIH0sXHJcbiAgICAgIHsgdGl0bGU6ICfpk7bljaHkvJrlkZgnIH0sXHJcbiAgICAgIHsgdGl0bGU6ICfph5HljaHkvJrlkZgnIH0sXHJcbiAgICAgIHsgdGl0bGU6ICfpkrvnn7PkvJrlkZgnIH1cclxuICAgIF0sXHJcbiAgICBhY3RpdmU6IDMsXHJcbiAgICBiZ0ltZzogJ2ltYWdlMzcucG5nJyxcclxuICAgIG1lbmJlckV4cGxhaW46IFtcclxuICAgICAge1xyXG4gICAgICAgIG1lbWJlcm5hbWU6ICfmma7pgJrkvJrlkZgnLFxyXG4gICAgICAgIG1lbmJlcmludHJvZHVjZTogJ+WPquWPguS4juenr+WIhuWSjOWFheWAvCwg5Y+q6KaB5YWz5rOo5YWs5LyX5Y+35Y2z5Y+v5oiQ5Li65pmu6YCa5Lya5ZGYJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgbWVtYmVybmFtZTogJ+mTtuWNoeS8muWRmCcsXHJcbiAgICAgICAgbWVuYmVyaW50cm9kdWNlOlxyXG4gICAgICAgICAgJ+aZrumAmuS8muWRmOe0r+iuoea2iOi0uea7oTEwMDDlhYPmiJbogIXkuIDmrKHmgKflhYXlgLzmu6E1MDDlhYPljbPlj6/miJDkuLrpk7bljaHkvJrlkZgs5YWo5Zy65ZWG5ZOB5Lqr5Y+XOTjmipjkvJjmg6AnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBtZW1iZXJuYW1lOiAn6YeR5Y2h5Lya5ZGYJyxcclxuICAgICAgICBtZW5iZXJpbnRyb2R1Y2U6XHJcbiAgICAgICAgICAn5pmu6YCa5Lya5ZGY57Sv6K6h5raI6LS55ruhNTAw5YWD5oiW6ICF5LiA5qyh5oCn5YWF5YC85ruhMzAwMOWFgzsgXFxuIOmTtuWNoeS8muWRmOS4gOasoeaAp+WFheWAvDI1MDDlhYPmjKXnnYDntK/orqHlhYXlgLw1MDAw5YWD5Y2z5Y+v5oiQ5Li66YeR5Y2h5Lya5ZGYLOWFqOWcuuWVhuWTgeS6q+WPlzksNeaKmOS8mOaDoCdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG1lbWJlcm5hbWU6ICfpkrvnn7PkvJrlkZgnLFxyXG4gICAgICAgIG1lbmJlcmludHJvZHVjZTpcclxuICAgICAgICAgICfmma7pgJrkvJrlkZjntK/orqHmtojotLkyMDAwMOWFg+aIluiAheS4gOasoeaAp+WFheWAvOa7oTEwMDAw5YWDOyBcXG4g6YeR5Y2h5Lya5ZGY6KGl5YWFNzUwMOWFgywg5pmu6YCa5Lya5ZGY57Sv6K6h5YWF5YC8MjAwMDDlhYPljbPlj6/miJDkuLrpkrvnn7PkvJrlkZgsIOWFqOWcuuWVhuWTgeS6q+WPlznmipjkvJjmg6A7IFxcbiDlkIzml7bkuI3lrprmnJ/mjqjlh7rpkojlr7npkrvnn7PkvJrlkZjnmoTlirLniIbmtLvliqguJ1xyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgbWVtYmVyX2luZm86IG51bGwsXHJcbiAgICBtZW1iZXJfZGF0YTogbnVsbCxcclxuICAgIHZpcEZsYWc6IGZhbHNlLFxyXG4gICAgcHJpY2VBcnI6IFtdLFxyXG4gICAgcHJpY2U6ICcnLFxyXG4gICAgcHJpY2VBY3RpdmU6IG51bGwsXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIG9uU2hvdygpe1xyXG4gICAgIC8vIOeUqOaIt+S4quS6uuS4reW/g+aVsOaNruaOpeWPo1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm1lbWJlckluZm8sXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHRoaXMubWVtYmVyX2luZm8gPSByZXMuZGF0YXMubWVtYmVyX2luZm9cclxuICAgICAgICB0aGlzLm1lbWJlcl9kYXRhID0gcmVzLmRhdGFzLm1lbWJlcl9kYXRhXHJcbiAgICAgICAgc3dpdGNoIChyZXMuZGF0YXMubWVtYmVyX2luZm8ubGV2ZWwpIHtcclxuICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgdGhpcy5iZ0ltZyA9ICdpbWFnZTM3LnBuZyc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICB0aGlzLmJnSW1nID0gJ2ltYWdlMzgucG5nJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHRoaXMuYmdJbWcgPSAnaW1hZ2UzOS5wbmcnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgdGhpcy5iZ0ltZyA9ICdpbWFnZTM0LnBuZyc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByaWNlQXJyID0gcmVzLmRhdGFzLnBheV9hbW91bnRcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgY2hhbmdlUHJpY2UocHJpY2UsIGlkeCl7XHJcbiAgICAgIHRoaXMucHJpY2UgPSBwcmljZVxyXG4gICAgICB0aGlzLnByaWNlQWN0aXZlID0gaWR4XHJcbiAgICB9LFxyXG4gICAgYmluZGZvY3VzKCkge1xyXG4gICAgICB0aGlzLnByaWNlID0gJyc7XHJcbiAgICAgIHRoaXMucHJpY2VBY3RpdmUgPSBudWxsXHJcbiAgICB9LFxyXG4gICAgYmluZGlucHV0KGUpIHtcclxuICAgICAgdGhpcy5wcmljZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9LFxyXG4gICAgc2hvd1ZpcEZsYWcoZSkge1xyXG4gICAgICB0aGlzLnZpcEZsYWcgPSB0cnVlXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgcmVjaGFyZ2UoKSB7XHJcbiAgICAgIGlmKCF0aGlzLnByaWNlKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5YWF5YC86YeR6aKdJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgdmFyIHJlc0RhdGEgPSAgYXdhaXQgYWpheCh7XHJcbiAgICAgICAgdXJsOiBhcGkucmVjaGFyZ2UsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGRyX2Ftb3VudDogdGhpcy5wcmljZVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXM9PiB7XHJcbiAgICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gcmVzLmRhdGFzXHJcbiAgICAgICAgfSBlbHNlIGlmKHJlcy5jb2RlID09IDQwMCkge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5lcnJvcixcclxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgaWYoIXJlc0RhdGEpIHJldHVyblxyXG4gICAgICB2YXIgcGF5RGF0YSA9IGF3YWl0IGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLm1lbWJlclBheW1lbnRSZWNoYXJnZSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBwYXltZW50X2NvZGU6ICdtaW5pX3d4cGF5JyxcclxuICAgICAgICAgIHBheV9zbjogcmVzRGF0YS5wZGluZm8ucGRyX3NuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYocmVzLmRhdGFzLnN0YXRlID09IDEpIHtcclxuICAgICAgICAgIHJldHVybiByZXMuZGF0YXNcclxuICAgICAgICB9ZWxzZSBpZihyZXMuY29kZSA9PSA0MDApIHtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMuZXJyb3IsXHJcbiAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIGlmKHBheURhdGEpIHtcclxuICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XHJcbiAgICAgICAgICAuLi5wYXlEYXRhLmFwaV9wYXksXHJcbiAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY29tcGxldGUoZCkge2NvbnNvbGUubG9nKGQpfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG59XHJcbiJdfQ==