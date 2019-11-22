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
      voucher_list: [], //优惠券列表
      address_list: []
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

        var that = this;
        var app = this.$parent;
        var goods_id = this.goods_id;
        var goodsNum = this.goodsNum;
        var cart_id = goods_id + '|' + goodsNum;
        (0, _ajax.ajax)({
          url: api.memberBuyOne,
          data: {
            cart_id: cart_id,
            address_id: ''
          }
        }).then(function (res) {
          if (res.code == 200) {
            res.datas.cart_id = cart_id;
            app.globalData.orderInfo = res.datas;
            if (that.address_list.length) {
              _this2.$navigate({ url: '/pages/settlement' });
            } else {
              wx.showModal({
                title: '提醒',
                content: '暂无地址，添加新地址',
                success: function success(e) {
                  if (e.confirm) {
                    that.$navigate({ url: 'consignee' });
                  }
                }
              });
            }
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
        if (this.voucher_list.length == 0) {
          wx.showToast({
            title: '暂无优惠券发送',
            icon: 'none'
          });
          return false;
        }
        this.couponFlag = true;
      },
      choiceCoupon: function choiceCoupon(exists, tid, idx) {
        var _this4 = this;

        if (exists == 0) {
          (0, _ajax.ajax)({
            url: api.voucherFreeex,
            data: {
              tid: tid
            }
          }).then(function (res) {
            if (res.datas == 1) {
              wx.showToast({
                title: '领取成功'
              });
              _this4.voucher_list[idx].exists = 1;
              _this4.$apply();
            } else {
              wx.showToast({
                title: res.datas.error,
                icon: 'none'
              });
            }
          });
        }
      },
      hideCoupon: function hideCoupon() {
        this.couponFlag = false;
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {
      var _this5 = this;

      // 用户收货地址列表
      (0, _ajax.ajax)({
        url: api.addressList
      }).then(function (res) {
        _this5.address_list = res.datas.address_list || [];
        _this5.$apply();
      });
    }
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
        var _this6 = this;

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
                    item.couponTime = (0, _base.formatDate)(item.voucher_t_start_date) + ' \u81F3 ' + (0, _base.formatDate)(item.voucher_t_end_date);
                  });
                  _this6.voucher_list = list;
                  _this6.$apply();
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
        var _this7 = this;

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
                    _this7.goods_content = res.datas.goods_content;
                    _this7.sale_type = res.datas.goods_content.sale_type;
                    _this7.contractlist = res.datas.goods_content.contractlist || {};
                    _this7.image_list = res.datas.image_list || [];
                    _this7.store_info = res.datas.store_info;
                    _this7.goods_commend_list = res.datas.goods_commend_list;
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
                    _this7.attr = attr;
                    _this7.goods_spec = Object.values(res.datas.goods_content.goods_spec || {});
                    _this7.activeAttr = Object.keys(res.datas.goods_content.goods_spec || {});
                    _this7.spec_list = res.datas.spec_list;
                    _this7.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BEZXRhaWxzLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsImNvdXBvbm1hc2siLCJtaXhpbnMiLCJkYXRhIiwiY291cG9uRmxhZyIsImdvb2RzTnVtIiwiYXR0ckZsYWciLCJ0YWJMaXN0IiwibmFtZSIsImN1cnJlbnRUYWIiLCJnb29kc19pZCIsInJlcXVlc3RJbWdVcmwiLCJnb29kc19jb250ZW50Iiwic3RvcmVfaW5mbyIsImdvb2RzX2NvbW1lbmRfbGlzdCIsImltYWdlX2xpc3QiLCJjb250cmFjdGxpc3QiLCJhdHRyIiwiYWN0aXZlQXR0ciIsImdvb2RzX3NwZWMiLCJzcGVjX2xpc3QiLCJ0eXBlIiwic2FsZV90eXBlIiwidm91Y2hlcl9saXN0IiwiYWRkcmVzc19saXN0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic3dpdGNoTmF2IiwiaWR4Iiwic2hvd0F0dHJNYXNrIiwiYXR0ckJ0blN1Ym1pdCIsInRoYXQiLCJhcHAiLCIkcGFyZW50IiwiY2FydF9pZCIsInVybCIsIm1lbWJlckJ1eU9uZSIsImFkZHJlc3NfaWQiLCJ0aGVuIiwicmVzIiwiY29kZSIsImRhdGFzIiwiZ2xvYmFsRGF0YSIsIm9yZGVySW5mbyIsImxlbmd0aCIsIiRuYXZpZ2F0ZSIsInd4Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsImUiLCJjb25maXJtIiwiYWRkTnVtIiwicmVkdU51bSIsImNoYW5nZUF0dHIiLCJpbmRleCIsImVsZSIsImpvaW4iLCIkYXBwbHkiLCJnZXRTaG9wRGV0YWlscyIsImFkZENhcnQiLCJjYXJ0QWRkIiwicXVhbnRpdHkiLCJzdGF0ZSIsInNob3dUb2FzdCIsImVycm9yIiwiaWNvbiIsIm5hdkdvb2RzRGV0YWlscyIsIiRyZWRpcmVjdCIsInNob3dDb3Vwb25NYXNrIiwiY2hvaWNlQ291cG9uIiwiZXhpc3RzIiwidGlkIiwidm91Y2hlckZyZWVleCIsImhpZGVDb3Vwb24iLCJldmVudHMiLCJhZGRyZXNzTGlzdCIsInVzZXIiLCJnZXRTdG9yYWdlU3luYyIsImNvbnNvbGUiLCJsb2ciLCJwYXRoIiwidXNlcmlkIiwidCIsInZvdWNoZXJUcGxMaXN0Iiwic3RvcmVfaWQiLCJnZXR0eXBlIiwibGlzdCIsImZvckVhY2giLCJpdGVtIiwiY291cG9uVGltZSIsInZvdWNoZXJfdF9zdGFydF9kYXRlIiwidm91Y2hlcl90X2VuZF9kYXRlIiwib3JkaW5hcnlHb29kc0R0YWlsIiwic3BlY19uYW1lIiwiT2JqZWN0IiwidmFsdWVzIiwic3BlY192YWx1ZSIsInByb3AiLCJrZXlzIiwiYXJ0aWNsZSIsImdvb2RzX2JvZHkiLCJ3eFBhcnNlIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRkEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0FBR0EsSUFBSUMsVUFBVUQsUUFBUSw2QkFBUixDQUFkOztJQUNxQkUsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHdCQUF1QixVQUExQyxFQUFiLEVBQW1FLGNBQWEsRUFBQyx3QkFBdUIsWUFBeEIsRUFBaEYsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkMsaUJBQVdDLGNBREQ7QUFFVkMsa0JBQVlEO0FBRkYsSyxRQUtaRSxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsa0JBQVksS0FEUDtBQUVMQyxnQkFBVSxDQUZMO0FBR0xDLGdCQUFVLEtBSEw7QUFJTEMsZUFBUyxDQUFDLEVBQUVDLE1BQU0sTUFBUixF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SUFBdUMsRUFBbkQsQ0FBbEI7QUFDQSwyQkFBS0MsU0FBTCxHQUFpQm1CLElBQUlFLEtBQUosQ0FBVXJCLFNBQTNCO0FBQ0EsMkJBQUt1QyxNQUFMO0FBQ0Esd0JBQUkwQyxVQUFVOUQsSUFBSUUsS0FBSixDQUFVN0IsYUFBVixDQUF3QjBGLFVBQXRDO0FBQ0E7QUFDQS9HLDRCQUFRZ0gsT0FBUixDQUFnQixTQUFoQixFQUEyQixNQUEzQixFQUFtQ0YsT0FBbkMsRUFBNEN0RSxJQUE1QyxFQUFrRCxDQUFsRDtBQUNEO0FBQ0YsaUJBbENLLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFvQ0M7QUFDUCxXQUFLekIsUUFBTCxHQUFnQixLQUFoQjtBQUNEOzs7O0VBelBnQ2tHLGVBQUtDLEk7O2tCQUFuQmpILEsiLCJmaWxlIjoic2hvcERldGFpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBtYXNrIGZyb20gJy4uL2NvbXBvbmVudHMvbWFzayc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5pbXBvcnQge2Zvcm1hdERhdGV9IGZyb20gJy4uL3V0aWxzL2Jhc2UuanMnXHJcbnZhciBXeFBhcnNlID0gcmVxdWlyZSgnLi4vdXRpbHMvd3hQYXJzZS93eFBhcnNlLmpzJyk7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImF0dHJzbWFza1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiYXR0ckZsYWdcIn0sXCJjb3Vwb25tYXNrXCI6e1widi1iaW5kOm1hc2tGbGFnLnN5bmNcIjpcImNvdXBvbkZsYWdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgYXR0cnNtYXNrOiBtYXNrLFxyXG4gICAgY291cG9ubWFzazogbWFzayxcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGNvdXBvbkZsYWc6IGZhbHNlLFxyXG4gICAgZ29vZHNOdW06IDEsXHJcbiAgICBhdHRyRmxhZzogZmFsc2UsXHJcbiAgICB0YWJMaXN0OiBbeyBuYW1lOiAn5ZWG5ZOB5LuL57uNJ30sIHsgbmFtZTogJ+WbvuaWh+ivpuaDhScgfV0sIC8vIOmhtumDqOmAiemhueWNoVxyXG4gICAgY3VycmVudFRhYjogMCwgLy8g6aG26YOo6YCJ6aG55Y2h57Si5byVXHJcbiAgICBnb29kc19pZDogbnVsbCwgLy/llYblk4Fnb29kc19pZFxyXG4gICAgcmVxdWVzdEltZ1VybDogbnVsbCwgLy/lm77niYfln5/lkI1cclxuICAgIGdvb2RzX2NvbnRlbnQ6IG51bGwsIC8vIOWVhuWTgeWGheWuuVxyXG4gICAgc3RvcmVfaW5mbzogbnVsbCwgLy8g5bqX6ZO65L+h5oGvXHJcbiAgICBnb29kc19jb21tZW5kX2xpc3Q6IFtdLCAvL+aOqOiNkOWVhuWTgeWIl+ihqFxyXG4gICAgaW1hZ2VfbGlzdDogW10sIC8vIOWVhuWTgei9ruaSreWbvlxyXG4gICAgY29udHJhY3RsaXN0OiB7fSwgLy8g5ZWG5ZOB5pyN5Yqh6K+05piOXHJcbiAgICBhdHRyOiBbXSwgIC8vIOWVhuWTgeaAu+WxnuaAp+aVsOe7hFxyXG4gICAgYWN0aXZlQXR0cjogW10sIC8vIOW9k+WJjeeCueWHu+WxnuaAp+aVsOe7hFxyXG4gICAgZ29vZHNfc3BlYzogW10sIC8vIOm7mOiupOWxnuaAp+aVsOe7hFxyXG4gICAgc3BlY19saXN0OiB7fSwgLy8g5omA5pyJ5bGe5oCn5a+55bqU55qE5ZWG5ZOBZ29vZHNfaWRcclxuICAgIHR5cGU6IG51bGwsXHJcbiAgICBzYWxlX3R5cGU6ICcnLCAvLyDllYblk4HnsbvlnotcclxuICAgIHZvdWNoZXJfbGlzdDogW10sIC8v5LyY5oOg5Yi45YiX6KGoXHJcbiAgICBhZGRyZXNzX2xpc3Q6IFtdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBvblNob3coKSB7XHJcbiAgICAvLyDnlKjmiLfmlLbotKflnLDlnYDliJfooahcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5hZGRyZXNzTGlzdFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLmFkZHJlc3NfbGlzdCA9IHJlcy5kYXRhcy5hZGRyZXNzX2xpc3QgfHwgW11cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOWIh+aNoumhtumDqOWvvOiIqlxyXG4gICAgc3dpdGNoTmF2KGlkeCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRUYWIgPSBpZHg7XHJcbiAgICB9LFxyXG4gICAgLy8g5pi+56S66YCJ5oup5ZWG5ZOB5qGGXHJcbiAgICBzaG93QXR0ck1hc2soKSB7XHJcbiAgICAgIHRoaXMuYXR0ckZsYWcgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGF0dHJCdG5TdWJtaXQoKSB7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICB2YXIgYXBwID0gdGhpcy4kcGFyZW50O1xyXG4gICAgICB2YXIgZ29vZHNfaWQgPSB0aGlzLmdvb2RzX2lkXHJcbiAgICAgIHZhciBnb29kc051bSA9IHRoaXMuZ29vZHNOdW1cclxuICAgICAgdmFyIGNhcnRfaWQgPSBgJHtnb29kc19pZH18JHtnb29kc051bX1gXHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLm1lbWJlckJ1eU9uZSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBjYXJ0X2lkLFxyXG4gICAgICAgICAgYWRkcmVzc19pZDogJydcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgIHJlcy5kYXRhcy5jYXJ0X2lkID0gY2FydF9pZFxyXG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEub3JkZXJJbmZvID0gcmVzLmRhdGFzXHJcbiAgICAgICAgICBpZih0aGF0LmFkZHJlc3NfbGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy4kbmF2aWdhdGUoeyB1cmw6ICcvcGFnZXMvc2V0dGxlbWVudCcgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAn5o+Q6YaSJyxcclxuICAgICAgICAgICAgICBjb250ZW50OiAn5pqC5peg5Zyw5Z2A77yM5re75Yqg5paw5Zyw5Z2AJyxcclxuICAgICAgICAgICAgICBzdWNjZXNzKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmKGUuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGF0LiRuYXZpZ2F0ZSh7IHVybDogJ2NvbnNpZ25lZScgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhZGROdW0oKSB7XHJcbiAgICAgIHRoaXMuZ29vZHNOdW0gKytcclxuICAgIH0sXHJcbiAgICByZWR1TnVtKCl7XHJcbiAgICAgIGlmKHRoaXMuZ29vZHNOdW0gPD0gMSkge1xyXG4gICAgICAgIHRoaXMuZ29vZHNOdW0gPSAxXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5nb29kc051bS0tXHJcbiAgICB9LFxyXG4gICAgY2hhbmdlQXR0cihpbmRleCwgaWR4LCBlbGUpe1xyXG4gICAgICB0aGlzLmFjdGl2ZUF0dHJbaW5kZXhdID0gaWR4XHJcbiAgICAgIHRoaXMuZ29vZHNfc3BlY1tpbmRleF0gPSBlbGVcclxuICAgICAgdmFyIGdvb2RzX2lkID0gdGhpcy5zcGVjX2xpc3RbdGhpcy5hY3RpdmVBdHRyLmpvaW4oJ3wnKV1cclxuICAgICAgdGhpcy5nb29kc19pZCA9IGdvb2RzX2lkO1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIHRoaXMuZ2V0U2hvcERldGFpbHMoKVxyXG4gICAgfSxcclxuICAgIGFkZENhcnQoKXtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLmNhcnRBZGQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgZ29vZHNfaWQ6IHRoaXMuZ29vZHNfaWQsXHJcbiAgICAgICAgICBxdWFudGl0eTogdGhpcy5nb29kc051bVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmKHJlcy5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+a3u+WKoOaIkOWKnydcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICB0aGlzLmF0dHJGbGFnID0gZmFsc2VcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5lcnJvcixcclxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBuYXZHb29kc0RldGFpbHMoZ29vZHNfaWQsIHNhbGVfdHlwZSkge1xyXG4gICAgICAvLyBuYXZpZ2F0ZVxyXG4gICAgICBpZihzYWxlX3R5cGUgPT0gJ3J1c2hzYWxlcycpIHtcclxuICAgICAgICB0aGlzLiRyZWRpcmVjdChgL3BhZ2VzL3NlY2tpbGxTaG9wRGV0YWlscz9nb29kc19pZD0ke2dvb2RzX2lkfWApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuJHJlZGlyZWN0KGAvcGFnZXMvc2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNob3dDb3Vwb25NYXNrKCkge1xyXG4gICAgICBpZih0aGlzLnZvdWNoZXJfbGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+aaguaXoOS8mOaDoOWIuOWPkemAgScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY291cG9uRmxhZyA9IHRydWVcclxuICAgIH0sXHJcbiAgICBjaG9pY2VDb3Vwb24oZXhpc3RzLCB0aWQsIGlkeCkge1xyXG4gICAgICBpZihleGlzdHMgPT0gMCkge1xyXG4gICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgdXJsOiBhcGkudm91Y2hlckZyZWVleCxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgdGlkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgaWYocmVzLmRhdGFzID09IDEpIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+mihuWPluaIkOWKnydcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy52b3VjaGVyX2xpc3RbaWR4XS5leGlzdHMgID0gIDFcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGFzLmVycm9yLFxyXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBoaWRlQ291cG9uKCkge1xyXG4gICAgICB0aGlzLmNvdXBvbkZsYWcgPSBmYWxzZVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKGUpIHtcclxuICAgIGlmKHRoaXMudHlwZSA9PSBcInNoYXJlXCIpIHtcclxuICAgICAgdmFyIHVzZXIgPSB3eC5nZXRTdG9yYWdlU3luYygndXNlcicpXHJcbiAgICAgIGNvbnNvbGUubG9nKHVzZXIpXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcGF0aDogYC9wYWdlcy9zaG9wRGV0YWlscz9nb29kc19pZD0ke3RoaXMuZ29vZHNfaWR9JnVzZXJpZD0ke3VzZXIudXNlcmlkfWBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBhc3luYyBvbkxvYWQodCkge1xyXG4gICAgY29uc29sZS5sb2codClcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICB0aGlzLmdvb2RzX2lkID0gdC5nb29kc19pZDtcclxuICAgIHRoaXMudHlwZSA9IHQudHlwZVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgYXdhaXQgdGhpcy5nZXRTaG9wRGV0YWlscygpXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkudm91Y2hlclRwbExpc3QsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBzdG9yZV9pZDogdGhpcy5zdG9yZV9pbmZvLnN0b3JlX2lkLFxyXG4gICAgICAgIGdldHR5cGU6ICdmcmVlJ1xyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHZhciBsaXN0ID0gcmVzLmRhdGFzLnZvdWNoZXJfbGlzdCB8fCBbXVxyXG4gICAgICBsaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbS5jb3Vwb25UaW1lID0gYCR7Zm9ybWF0RGF0ZShpdGVtLnZvdWNoZXJfdF9zdGFydF9kYXRlKX0g6IezICR7Zm9ybWF0RGF0ZShpdGVtLnZvdWNoZXJfdF9lbmRfZGF0ZSl9YFxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLnZvdWNoZXJfbGlzdCA9IGxpc3RcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFNob3BEZXRhaWxzKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgLy8g5pmu6YCa5ZWG5ZOB6K+m5oOFXHJcbiAgICBhd2FpdCBhamF4KHtcclxuICAgICAgdXJsOiBhcGkub3JkaW5hcnlHb29kc0R0YWlsLFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGdvb2RzX2lkOiB0aGlzLmdvb2RzX2lkXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc19jb250ZW50ID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnRcclxuICAgICAgICB0aGlzLnNhbGVfdHlwZSA9IHJlcy5kYXRhcy5nb29kc19jb250ZW50LnNhbGVfdHlwZVxyXG4gICAgICAgIHRoaXMuY29udHJhY3RsaXN0ID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuY29udHJhY3RsaXN0IHx8IHt9XHJcbiAgICAgICAgdGhpcy5pbWFnZV9saXN0ID0gcmVzLmRhdGFzLmltYWdlX2xpc3QgfHwgW11cclxuICAgICAgICB0aGlzLnN0b3JlX2luZm8gPSByZXMuZGF0YXMuc3RvcmVfaW5mb1xyXG4gICAgICAgIHRoaXMuZ29vZHNfY29tbWVuZF9saXN0ID0gcmVzLmRhdGFzLmdvb2RzX2NvbW1lbmRfbGlzdFxyXG4gICAgICAgIC8vIOWVhuWTgeWxnuaAp1xyXG4gICAgICAgIHZhciBzcGVjX25hbWUgPSBPYmplY3QudmFsdWVzKHJlcy5kYXRhcy5nb29kc19jb250ZW50LnNwZWNfbmFtZSB8fCB7fSlcclxuICAgICAgICB2YXIgc3BlY192YWx1ZSA9IE9iamVjdC52YWx1ZXMocmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuc3BlY192YWx1ZSAgfHwge30pXHJcbiAgICAgICAgdmFyIGF0dHIgPSBbXVxyXG4gICAgICAgIHNwZWNfdmFsdWUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGlmKCFhdHRyW2luZGV4XSkge1xyXG4gICAgICAgICAgICBhdHRyW2luZGV4XSA9IHt9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBhdHRyW2luZGV4XS50aXRsZSA9IHNwZWNfbmFtZVtpbmRleF0gXHJcbiAgICAgICAgICBhdHRyW2luZGV4XS5wcm9wID0gaXRlbVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5hdHRyID0gYXR0clxyXG4gICAgICAgIHRoaXMuZ29vZHNfc3BlYyA9IE9iamVjdC52YWx1ZXMocmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuZ29vZHNfc3BlYyAgfHwge30pXHJcbiAgICAgICAgdGhpcy5hY3RpdmVBdHRyID0gT2JqZWN0LmtleXMocmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuZ29vZHNfc3BlYyAgfHwge30pXHJcbiAgICAgICAgdGhpcy5zcGVjX2xpc3QgPSByZXMuZGF0YXMuc3BlY19saXN0XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIHZhciBhcnRpY2xlID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuZ29vZHNfYm9keVxyXG4gICAgICAgIC8vIGFydGljbGUgPSBhcnRpY2xlLnJlcGxhY2UoL3NyYz1cIi9nLCBgc3JjPVwiJHt0aGF0LnJlcXVlc3RJbWdVcmx9YCk7XHJcbiAgICAgICAgV3hQYXJzZS53eFBhcnNlKCdhcnRpY2xlJywgJ2h0bWwnLCBhcnRpY2xlLCB0aGF0LCA1KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIG9uSGlkZSgpIHtcclxuICAgIHRoaXMuYXR0ckZsYWcgPSBmYWxzZVxyXG4gIH1cclxufVxyXG4iXX0=