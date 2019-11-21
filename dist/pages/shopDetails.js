'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mask = require('./../components/mask.js');

var _mask2 = _interopRequireDefault(_mask);

var _ajax = require('./../ajax.js');

var _base = require('./../utils/base.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var api = require('./../api.js');

var WxParse = require('./../utils/wxParse/wxParse.js');

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
      navigationBarTitleText: '商品详情'
    }, _this.$repeat = {}, _this.$props = { "attrsmask": { "xmlns:v-bind": "", "v-bind:maskFlag.sync": "attrFlag" }, "couponmask": { "v-bind:maskFlag.sync": "couponFlag" } }, _this.$events = {}, _this.components = {
      attrsmask: _mask2.default,
      couponmask: _mask2.default
    }, _this.mixins = [], _this.data = {
      couponFlag: false,
      goodsNum: 1,
      attrFlag: false,
      tabList: [{ name: '商品介绍' }, { name: '图文详情' }], // 顶部选项卡
      currentTab: 0, // 顶部选项卡索引
      goods_id: null, //商品goods_id
      requestImgUrl: null, //图片域名
      goods_content: null, // 商品内容
      store_info: null, // 店铺信息
      goods_commend_list: [], //推荐商品列表
      image_list: [], // 商品轮播图
      contractlist: {}, // 商品服务说明
      attr: [], // 商品总属性数组
      activeAttr: [], // 当前点击属性数组
      goods_spec: [], // 默认属性数组
      spec_list: {}, // 所有属性对应的商品goods_id
      type: null,
      sale_type: '', // 商品类型
      voucher_list: [] //优惠券列表
    }, _this.computed = {}, _this.methods = {
      // 切换顶部导航
      switchNav: function switchNav(idx) {
        this.currentTab = idx;
      },

      // 显示选择商品框
      showAttrMask: function showAttrMask() {
        this.attrFlag = true;
      },
      attrBtnSubmit: function attrBtnSubmit() {
        var _this2 = this;

        var app = this.$parent;
        var goods_id = this.goods_id;
        var goodsNum = this.goodsNum;
        var cart_id = goods_id + '|' + goodsNum;
        (0, _ajax.ajax)({
          url: api.memberBuyOne,
          data: {
            cart_id: cart_id
          }
        }).then(function (res) {
          if (res.code == 200) {
            res.datas.cart_id = cart_id;
            app.globalData.orderInfo = res.datas;
            _this2.$navigate({ url: '/pages/settlement' });
          }
        });
      },
      addNum: function addNum() {
        this.goodsNum++;
      },
      reduNum: function reduNum() {
        if (this.goodsNum <= 1) {
          this.goodsNum = 1;
          return false;
        }
        this.goodsNum--;
      },
      changeAttr: function changeAttr(index, idx, ele) {
        this.activeAttr[index] = idx;
        this.goods_spec[index] = ele;
        var goods_id = this.spec_list[this.activeAttr.join('|')];
        this.goods_id = goods_id;
        this.$apply();
        this.getShopDetails();
      },
      addCart: function addCart() {
        var _this3 = this;

        var that = this;
        (0, _ajax.ajax)({
          url: api.cartAdd,
          data: {
            goods_id: this.goods_id,
            quantity: this.goodsNum
          }
        }).then(function (res) {
          if (res.datas.state == 1) {
            wx.showToast({
              title: '添加成功'
            });
            _this3.attrFlag = false;
            _this3.$apply();
          } else {
            wx.showToast({
              title: res.datas.error,
              icon: 'none'
            });
          }
        });
      },
      navGoodsDetails: function navGoodsDetails(goods_id, sale_type) {
        // navigate
        if (sale_type == 'rushsales') {
          this.$redirect('/pages/seckillShopDetails?goods_id=' + goods_id);
        } else {
          this.$redirect('/pages/shopDetails?goods_id=' + goods_id);
        }
      },
      showCouponMask: function showCouponMask() {
        this.couponFlag = true;
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(e) {
      if (this.type == "share") {
        var user = wx.getStorageSync('user');
        console.log(user);
        return {
          path: '/pages/shopDetails?goods_id=' + this.goods_id + '&userid=' + user.userid
        };
      }
    }
  }, {
    key: 'onLoad',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t) {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(t);
                this.requestImgUrl = this.$parent.globalData.requestImgUrl;
                this.goods_id = t.goods_id;
                this.type = t.type;
                this.$apply();
                _context.next = 7;
                return this.getShopDetails();

              case 7:
                (0, _ajax.ajax)({
                  url: api.voucherTplList,
                  data: {
                    store_id: this.store_info.store_id,
                    gettype: 'free'
                  }
                }).then(function (res) {
                  var list = res.datas.voucher_list || [];
                  list.forEach(function (item) {
                    item.couponTime = '' + (0, _base.formatDate)(10000000000);
                  });
                  _this4.voucher_list = list;
                  _this4.$apply();
                });

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLoad(_x) {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
  }, {
    key: 'getShopDetails',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this5 = this;

        var that;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = this;
                // 普通商品详情

                _context2.next = 3;
                return (0, _ajax.ajax)({
                  url: api.ordinaryGoodsDtail,
                  type: 'get',
                  data: {
                    goods_id: this.goods_id
                  }
                }).then(function (res) {
                  if (res.code == 200) {
                    _this5.goods_content = res.datas.goods_content;
                    _this5.sale_type = res.datas.goods_content.sale_type;
                    _this5.contractlist = res.datas.goods_content.contractlist || {};
                    _this5.image_list = res.datas.image_list || [];
                    _this5.store_info = res.datas.store_info;
                    _this5.goods_commend_list = res.datas.goods_commend_list;
                    // 商品属性
                    var spec_name = Object.values(res.datas.goods_content.spec_name || {});
                    var spec_value = Object.values(res.datas.goods_content.spec_value || {});
                    var attr = [];
                    spec_value.forEach(function (item, index) {
                      if (!attr[index]) {
                        attr[index] = {};
                      }
                      attr[index].title = spec_name[index];
                      attr[index].prop = item;
                    });
                    _this5.attr = attr;
                    _this5.goods_spec = Object.values(res.datas.goods_content.goods_spec || {});
                    _this5.activeAttr = Object.keys(res.datas.goods_content.goods_spec || {});
                    _this5.spec_list = res.datas.spec_list;
                    _this5.$apply();
                    var article = res.datas.goods_content.goods_body;
                    // article = article.replace(/src="/g, `src="${that.requestImgUrl}`);
                    WxParse.wxParse('article', 'html', article, that, 5);
                  }
                });

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getShopDetails() {
        return _ref3.apply(this, arguments);
      }

      return getShopDetails;
    }()
  }, {
    key: 'onHide',
    value: function onHide() {
      this.attrFlag = false;
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/shopDetails'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BEZXRhaWxzLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsImNvdXBvbm1hc2siLCJtaXhpbnMiLCJkYXRhIiwiY291cG9uRmxhZyIsImdvb2RzTnVtIiwiYXR0ckZsYWciLCJ0YWJMaXN0IiwibmFtZSIsImN1cnJlbnRUYWIiLCJnb29kc19pZCIsInJlcXVlc3RJbWdVcmwiLCJnb29kc19jb250ZW50Iiwic3RvcmVfaW5mbyIsImdvb2RzX2NvbW1lbmRfbGlzdCIsImltYWdlX2xpc3QiLCJjb250cmFjdGxpc3QiLCJhdHRyIiwiYWN0aXZlQXR0ciIsImdvb2RzX3NwZWMiLCJzcGVjX2xpc3QiLCJ0eXBlIiwic2FsZV90eXBlIiwidm91Y2hlcl9saXN0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic3dpdGNoTmF2IiwiaWR4Iiwic2hvd0F0dHJNYXNrIiwiYXR0ckJ0blN1Ym1pdCIsImFwcCIsIiRwYXJlbnQiLCJjYXJ0X2lkIiwidXJsIiwibWVtYmVyQnV5T25lIiwidGhlbiIsInJlcyIsImNvZGUiLCJkYXRhcyIsImdsb2JhbERhdGEiLCJvcmRlckluZm8iLCIkbmF2aWdhdGUiLCJhZGROdW0iLCJyZWR1TnVtIiwiY2hhbmdlQXR0ciIsImluZGV4IiwiZWxlIiwiam9pbiIsIiRhcHBseSIsImdldFNob3BEZXRhaWxzIiwiYWRkQ2FydCIsInRoYXQiLCJjYXJ0QWRkIiwicXVhbnRpdHkiLCJzdGF0ZSIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJlcnJvciIsImljb24iLCJuYXZHb29kc0RldGFpbHMiLCIkcmVkaXJlY3QiLCJzaG93Q291cG9uTWFzayIsImV2ZW50cyIsImUiLCJ1c2VyIiwiZ2V0U3RvcmFnZVN5bmMiLCJjb25zb2xlIiwibG9nIiwicGF0aCIsInVzZXJpZCIsInQiLCJ2b3VjaGVyVHBsTGlzdCIsInN0b3JlX2lkIiwiZ2V0dHlwZSIsImxpc3QiLCJmb3JFYWNoIiwiaXRlbSIsImNvdXBvblRpbWUiLCJvcmRpbmFyeUdvb2RzRHRhaWwiLCJzcGVjX25hbWUiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzcGVjX3ZhbHVlIiwicHJvcCIsImtleXMiLCJhcnRpY2xlIiwiZ29vZHNfYm9keSIsInd4UGFyc2UiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFGQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7QUFHQSxJQUFJQyxVQUFVRCxRQUFRLDZCQUFSLENBQWQ7O0lBQ3FCRSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQWIsRUFBbUUsY0FBYSxFQUFDLHdCQUF1QixZQUF4QixFQUFoRixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyxpQkFBV0MsY0FERDtBQUVWQyxrQkFBWUQ7QUFGRixLLFFBS1pFLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxrQkFBWSxLQURQO0FBRUxDLGdCQUFVLENBRkw7QUFHTEMsZ0JBQVUsS0FITDtBQUlMQyxlQUFTLENBQUMsRUFBRUMsTUFBTSxNQUFSLEVBQUQsRUFBa0IsRUFBRUEsTUFBTSxNQUFSLEVBQWxCLENBSkosRUFJeUM7QUFDOUNDLGtCQUFZLENBTFAsRUFLVTtBQUNmQyxnQkFBVSxJQU5MLEVBTVc7QUFDaEJDLHFCQUFlLElBUFYsRUFPZ0I7QUFDckJDLHFCQUFlLElBUlYsRUFRZ0I7QUFDckJDLGtCQUFZLElBVFAsRUFTYTtBQUNsQkMsMEJBQW9CLEVBVmYsRUFVbUI7QUFDeEJDLGtCQUFZ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S0FBUCxFQUFpQjtBQUNsQywwQkFBRyxDQUFDNUIsS0FBSzRCLEtBQUwsQ0FBSixFQUFpQjtBQUNmNUIsNkJBQUs0QixLQUFMLElBQWMsRUFBZDtBQUNEO0FBQ0Q1QiwyQkFBSzRCLEtBQUwsRUFBWVksS0FBWixHQUFvQnVCLFVBQVVuQyxLQUFWLENBQXBCO0FBQ0E1QiwyQkFBSzRCLEtBQUwsRUFBWXVDLElBQVosR0FBbUJQLElBQW5CO0FBQ0QscUJBTkQ7QUFPQSwyQkFBSzVELElBQUwsR0FBWUEsSUFBWjtBQUNBLDJCQUFLRSxVQUFMLEdBQWtCOEQsT0FBT0MsTUFBUCxDQUFjOUMsSUFBSUUsS0FBSixDQUFVMUIsYUFBVixDQUF3Qk8sVUFBeEIsSUFBdUMsRUFBckQsQ0FBbEI7QUFDQSwyQkFBS0QsVUFBTCxHQUFrQitELE9BQU9JLElBQVAsQ0FBWWpELElBQUlFLEtBQUosQ0FBVTFCLGFBQVYsQ0FBd0JPLFVBQXhCLElBQXVDLEVBQW5ELENBQWxCO0FBQ0EsMkJBQUtDLFNBQUwsR0FBaUJnQixJQUFJRSxLQUFKLENBQVVsQixTQUEzQjtBQUNBLDJCQUFLNEIsTUFBTDtBQUNBLHdCQUFJc0MsVUFBVWxELElBQUlFLEtBQUosQ0FBVTFCLGFBQVYsQ0FBd0IyRSxVQUF0QztBQUNBO0FBQ0FoRyw0QkFBUWlHLE9BQVIsQ0FBZ0IsU0FBaEIsRUFBMkIsTUFBM0IsRUFBbUNGLE9BQW5DLEVBQTRDbkMsSUFBNUMsRUFBa0QsQ0FBbEQ7QUFDRDtBQUNGLGlCQWxDSyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBb0NDO0FBQ1AsV0FBSzdDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDRDs7OztFQWpNZ0NtRixlQUFLQyxJOztrQkFBbkJsRyxLIiwiZmlsZSI6InNob3BEZXRhaWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgbWFzayBmcm9tICcuLi9jb21wb25lbnRzL21hc2snO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxuaW1wb3J0IHtmb3JtYXREYXRlfSBmcm9tICcuLi91dGlscy9iYXNlLmpzJ1xyXG52YXIgV3hQYXJzZSA9IHJlcXVpcmUoJy4uL3V0aWxzL3d4UGFyc2Uvd3hQYXJzZS5qcycpO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeivpuaDhSdcclxuICB9O1xyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJhdHRyc21hc2tcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm1hc2tGbGFnLnN5bmNcIjpcImF0dHJGbGFnXCJ9LFwiY291cG9ubWFza1wiOntcInYtYmluZDptYXNrRmxhZy5zeW5jXCI6XCJjb3Vwb25GbGFnXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIGF0dHJzbWFzazogbWFzayxcclxuICAgIGNvdXBvbm1hc2s6IG1hc2ssXHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBjb3Vwb25GbGFnOiBmYWxzZSxcclxuICAgIGdvb2RzTnVtOiAxLFxyXG4gICAgYXR0ckZsYWc6IGZhbHNlLFxyXG4gICAgdGFiTGlzdDogW3sgbmFtZTogJ+WVhuWTgeS7i+e7jSd9LCB7IG5hbWU6ICflm77mlofor6bmg4UnIH1dLCAvLyDpobbpg6jpgInpobnljaFcclxuICAgIGN1cnJlbnRUYWI6IDAsIC8vIOmhtumDqOmAiemhueWNoee0ouW8lVxyXG4gICAgZ29vZHNfaWQ6IG51bGwsIC8v5ZWG5ZOBZ29vZHNfaWRcclxuICAgIHJlcXVlc3RJbWdVcmw6IG51bGwsIC8v5Zu+54mH5Z+f5ZCNXHJcbiAgICBnb29kc19jb250ZW50OiBudWxsLCAvLyDllYblk4HlhoXlrrlcclxuICAgIHN0b3JlX2luZm86IG51bGwsIC8vIOW6l+mTuuS/oeaBr1xyXG4gICAgZ29vZHNfY29tbWVuZF9saXN0OiBbXSwgLy/mjqjojZDllYblk4HliJfooahcclxuICAgIGltYWdlX2xpc3Q6IFtdLCAvLyDllYblk4Hova7mkq3lm75cclxuICAgIGNvbnRyYWN0bGlzdDoge30sIC8vIOWVhuWTgeacjeWKoeivtOaYjlxyXG4gICAgYXR0cjogW10sICAvLyDllYblk4HmgLvlsZ7mgKfmlbDnu4RcclxuICAgIGFjdGl2ZUF0dHI6IFtdLCAvLyDlvZPliY3ngrnlh7vlsZ7mgKfmlbDnu4RcclxuICAgIGdvb2RzX3NwZWM6IFtdLCAvLyDpu5jorqTlsZ7mgKfmlbDnu4RcclxuICAgIHNwZWNfbGlzdDoge30sIC8vIOaJgOacieWxnuaAp+WvueW6lOeahOWVhuWTgWdvb2RzX2lkXHJcbiAgICB0eXBlOiBudWxsLFxyXG4gICAgc2FsZV90eXBlOiAnJywgLy8g5ZWG5ZOB57G75Z6LXHJcbiAgICB2b3VjaGVyX2xpc3Q6IFtdLCAvL+S8mOaDoOWIuOWIl+ihqFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25TaG93KCkge31cclxuICBtZXRob2RzID0ge1xyXG4gICAgLy8g5YiH5o2i6aG26YOo5a+86IiqXHJcbiAgICBzd2l0Y2hOYXYoaWR4KSB7XHJcbiAgICAgIHRoaXMuY3VycmVudFRhYiA9IGlkeDtcclxuICAgIH0sXHJcbiAgICAvLyDmmL7npLrpgInmi6nllYblk4HmoYZcclxuICAgIHNob3dBdHRyTWFzaygpIHtcclxuICAgICAgdGhpcy5hdHRyRmxhZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgYXR0ckJ0blN1Ym1pdCgpIHtcclxuICAgICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgICAgdmFyIGdvb2RzX2lkID0gdGhpcy5nb29kc19pZFxyXG4gICAgICB2YXIgZ29vZHNOdW0gPSB0aGlzLmdvb2RzTnVtXHJcbiAgICAgIHZhciBjYXJ0X2lkID0gYCR7Z29vZHNfaWR9fCR7Z29vZHNOdW19YFxyXG4gICAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5tZW1iZXJCdXlPbmUsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgY2FydF9pZCxcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgIHJlcy5kYXRhcy5jYXJ0X2lkID0gY2FydF9pZFxyXG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEub3JkZXJJbmZvID0gcmVzLmRhdGFzXHJcbiAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogJy9wYWdlcy9zZXR0bGVtZW50JyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYWRkTnVtKCkge1xyXG4gICAgICB0aGlzLmdvb2RzTnVtICsrXHJcbiAgICB9LFxyXG4gICAgcmVkdU51bSgpe1xyXG4gICAgICBpZih0aGlzLmdvb2RzTnVtIDw9IDEpIHtcclxuICAgICAgICB0aGlzLmdvb2RzTnVtID0gMVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZ29vZHNOdW0tLVxyXG4gICAgfSxcclxuICAgIGNoYW5nZUF0dHIoaW5kZXgsIGlkeCwgZWxlKXtcclxuICAgICAgdGhpcy5hY3RpdmVBdHRyW2luZGV4XSA9IGlkeFxyXG4gICAgICB0aGlzLmdvb2RzX3NwZWNbaW5kZXhdID0gZWxlXHJcbiAgICAgIHZhciBnb29kc19pZCA9IHRoaXMuc3BlY19saXN0W3RoaXMuYWN0aXZlQXR0ci5qb2luKCd8JyldXHJcbiAgICAgIHRoaXMuZ29vZHNfaWQgPSBnb29kc19pZDtcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB0aGlzLmdldFNob3BEZXRhaWxzKClcclxuICAgIH0sXHJcbiAgICBhZGRDYXJ0KCl7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5jYXJ0QWRkLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGdvb2RzX2lkOiB0aGlzLmdvb2RzX2lkLFxyXG4gICAgICAgICAgcXVhbnRpdHk6IHRoaXMuZ29vZHNOdW1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZihyZXMuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfmt7vliqDmiJDlip8nXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgdGhpcy5hdHRyRmxhZyA9IGZhbHNlXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YXMuZXJyb3IsXHJcbiAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgbmF2R29vZHNEZXRhaWxzKGdvb2RzX2lkLCBzYWxlX3R5cGUpIHtcclxuICAgICAgLy8gbmF2aWdhdGVcclxuICAgICAgaWYoc2FsZV90eXBlID09ICdydXNoc2FsZXMnKSB7XHJcbiAgICAgICAgdGhpcy4kcmVkaXJlY3QoYC9wYWdlcy9zZWNraWxsU2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLiRyZWRpcmVjdChgL3BhZ2VzL3Nob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzaG93Q291cG9uTWFzaygpIHtcclxuICAgICAgdGhpcy5jb3Vwb25GbGFnID0gdHJ1ZVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKGUpIHtcclxuICAgIGlmKHRoaXMudHlwZSA9PSBcInNoYXJlXCIpIHtcclxuICAgICAgdmFyIHVzZXIgPSB3eC5nZXRTdG9yYWdlU3luYygndXNlcicpXHJcbiAgICAgIGNvbnNvbGUubG9nKHVzZXIpXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcGF0aDogYC9wYWdlcy9zaG9wRGV0YWlscz9nb29kc19pZD0ke3RoaXMuZ29vZHNfaWR9JnVzZXJpZD0ke3VzZXIudXNlcmlkfWBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBhc3luYyBvbkxvYWQodCkge1xyXG4gICAgY29uc29sZS5sb2codClcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICB0aGlzLmdvb2RzX2lkID0gdC5nb29kc19pZDtcclxuICAgIHRoaXMudHlwZSA9IHQudHlwZVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgYXdhaXQgdGhpcy5nZXRTaG9wRGV0YWlscygpXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkudm91Y2hlclRwbExpc3QsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBzdG9yZV9pZDogdGhpcy5zdG9yZV9pbmZvLnN0b3JlX2lkLFxyXG4gICAgICAgIGdldHR5cGU6ICdmcmVlJ1xyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHZhciBsaXN0ID0gcmVzLmRhdGFzLnZvdWNoZXJfbGlzdCB8fCBbXVxyXG4gICAgICBsaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbS5jb3Vwb25UaW1lID0gYCR7IGZvcm1hdERhdGUoMTAwMDAwMDAwMDApfWBcclxuICAgICAgfSlcclxuICAgICAgdGhpcy52b3VjaGVyX2xpc3QgPSBsaXN0XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRTaG9wRGV0YWlscygpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIC8vIOaZrumAmuWVhuWTgeivpuaDhVxyXG4gICAgYXdhaXQgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm9yZGluYXJ5R29vZHNEdGFpbCxcclxuICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBnb29kc19pZDogdGhpcy5nb29kc19pZFxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgIHRoaXMuZ29vZHNfY29udGVudCA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50XHJcbiAgICAgICAgdGhpcy5zYWxlX3R5cGUgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudC5zYWxlX3R5cGVcclxuICAgICAgICB0aGlzLmNvbnRyYWN0bGlzdCA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50LmNvbnRyYWN0bGlzdCB8fCB7fVxyXG4gICAgICAgIHRoaXMuaW1hZ2VfbGlzdCA9IHJlcy5kYXRhcy5pbWFnZV9saXN0IHx8IFtdXHJcbiAgICAgICAgdGhpcy5zdG9yZV9pbmZvID0gcmVzLmRhdGFzLnN0b3JlX2luZm9cclxuICAgICAgICB0aGlzLmdvb2RzX2NvbW1lbmRfbGlzdCA9IHJlcy5kYXRhcy5nb29kc19jb21tZW5kX2xpc3RcclxuICAgICAgICAvLyDllYblk4HlsZ7mgKdcclxuICAgICAgICB2YXIgc3BlY19uYW1lID0gT2JqZWN0LnZhbHVlcyhyZXMuZGF0YXMuZ29vZHNfY29udGVudC5zcGVjX25hbWUgfHwge30pXHJcbiAgICAgICAgdmFyIHNwZWNfdmFsdWUgPSBPYmplY3QudmFsdWVzKHJlcy5kYXRhcy5nb29kc19jb250ZW50LnNwZWNfdmFsdWUgIHx8IHt9KVxyXG4gICAgICAgIHZhciBhdHRyID0gW11cclxuICAgICAgICBzcGVjX3ZhbHVlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICBpZighYXR0cltpbmRleF0pIHtcclxuICAgICAgICAgICAgYXR0cltpbmRleF0gPSB7fVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYXR0cltpbmRleF0udGl0bGUgPSBzcGVjX25hbWVbaW5kZXhdIFxyXG4gICAgICAgICAgYXR0cltpbmRleF0ucHJvcCA9IGl0ZW1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuYXR0ciA9IGF0dHJcclxuICAgICAgICB0aGlzLmdvb2RzX3NwZWMgPSBPYmplY3QudmFsdWVzKHJlcy5kYXRhcy5nb29kc19jb250ZW50Lmdvb2RzX3NwZWMgIHx8IHt9KVxyXG4gICAgICAgIHRoaXMuYWN0aXZlQXR0ciA9IE9iamVjdC5rZXlzKHJlcy5kYXRhcy5nb29kc19jb250ZW50Lmdvb2RzX3NwZWMgIHx8IHt9KVxyXG4gICAgICAgIHRoaXMuc3BlY19saXN0ID0gcmVzLmRhdGFzLnNwZWNfbGlzdFxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB2YXIgYXJ0aWNsZSA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50Lmdvb2RzX2JvZHlcclxuICAgICAgICAvLyBhcnRpY2xlID0gYXJ0aWNsZS5yZXBsYWNlKC9zcmM9XCIvZywgYHNyYz1cIiR7dGhhdC5yZXF1ZXN0SW1nVXJsfWApO1xyXG4gICAgICAgIFd4UGFyc2Uud3hQYXJzZSgnYXJ0aWNsZScsICdodG1sJywgYXJ0aWNsZSwgdGhhdCwgNSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBvbkhpZGUoKSB7XHJcbiAgICB0aGlzLmF0dHJGbGFnID0gZmFsc2VcclxuICB9XHJcbn1cclxuIl19