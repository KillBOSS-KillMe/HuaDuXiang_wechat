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

var timer = require('./../utils/wxTimer.js'); // 倒计时
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
    }, _this.$repeat = {}, _this.$props = { "couponmask": { "v-bind:maskFlag.sync": "couponFlag" }, "attrsmask": { "xmlns:v-bind": "", "v-bind:maskFlag.sync": "attrFlag" } }, _this.$events = {}, _this.components = {
      couponmask: _mask2.default,
      attrsmask: _mask2.default

    }, _this.mixins = [], _this.data = {
      couponFlag: false,
      voucher_list: [], //优惠券列表
      goodsNum: 1,
      attrFlag: false,
      tabList: [{ name: '商品介绍', dotNum: 2 }, { name: '图文详情', dotNum: 3 }], // 顶部选项卡
      currentTab: 0, // 顶部选项卡索引
      wxTimerList: {}, // 倒计时
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
      end_time: 0 // 倒计时

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

        if (this.wxTimerList.firstTimer.wxTimerSecond <= 0) {
          wx.showToast({
            title: '本场已结束，请等待下场活动',
            icon: 'none'
          });
          return false;
        }
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
      navGoodsDetails: function navGoodsDetails(goods_id, sale_type) {
        // navigate
        if (sale_type == 'rushsales') {
          this.$redirect('/pages/seckillShopDetails?goods_id=' + goods_id);
        } else {
          this.$redirect('/pages/shopDetails?goods_id=' + goods_id);
        }
      },
      changeAttr: function changeAttr(index, idx, ele) {
        this.activeAttr[index] = idx;
        this.goods_spec[index] = ele;
        var goods_id = this.spec_list[this.activeAttr.join('|')];
        this.goods_id = goods_id;
        this.$apply();
        this.getShopDetails();
      },
      addNum: function addNum() {
        // 0不限购   n 限购n件
        var upper_limit = this.goods_content.upper_limit;
        if (upper_limit != 0 && Number(upper_limit) <= Number(this.goodsNum)) {
          wx.showToast({
            title: '\u5355\u6B21\u6700\u591A\u9009\u62E9' + upper_limit + '\u4EF6\u5546\u54C1',
            icon: 'none'
          });
          this.goodsNum = upper_limit;
          return false;
        } else {
          this.goodsNum++;
        }
      },
      reduNum: function reduNum() {
        if (this.goodsNum <= 1) {
          this.goodsNum = 1;
          return false;
        }
        this.goodsNum--;
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
        var _this3 = this;

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
              _this3.voucher_list[idx].exists = 1;
              _this3.$apply();
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
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t) {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.goods_id = t.goods_id;
                this.requestImgUrl = this.$parent.globalData.requestImgUrl;
                this.$apply();
                _context.next = 5;
                return this.getShopDetails();

              case 5:
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
                  _this4.voucher_list = list;
                  _this4.$apply();
                });

              case 6:
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
                // 秒杀商品详情

                _context2.next = 3;
                return (0, _ajax.ajax)({
                  url: api.ordinaryGoodsDtail,
                  type: 'get',
                  data: {
                    goods_id: this.goods_id,
                    sale_type: 'rushsales'
                  }
                }).then(function (res) {
                  if (res.code == 200) {
                    _this5.goodsNum = 1;
                    _this5.goods_content = res.datas.goods_content;
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
                    // 倒计时
                    var end_time = res.datas.goods_content.end_time || 0;
                    var wxTimer = new timer({
                      beginTime: end_time,
                      name: 'firstTimer',
                      complete: function complete() {}
                    });
                    wxTimer.start(_this5);
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
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/seckillShopDetails'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY2tpbGxTaG9wRGV0YWlscy5qcyJdLCJuYW1lcyI6WyJ0aW1lciIsInJlcXVpcmUiLCJhcGkiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiY291cG9ubWFzayIsIm1hc2siLCJhdHRyc21hc2siLCJtaXhpbnMiLCJkYXRhIiwiY291cG9uRmxhZyIsInZvdWNoZXJfbGlzdCIsImdvb2RzTnVtIiwiYXR0ckZsYWciLCJ0YWJMaXN0IiwibmFtZSIsImRvdE51bSIsImN1cnJlbnRUYWIiLCJ3eFRpbWVyTGlzdCIsImdvb2RzX2lkIiwicmVxdWVzdEltZ1VybCIsImdvb2RzX2NvbnRlbnQiLCJzdG9yZV9pbmZvIiwiZ29vZHNfY29tbWVuZF9saXN0IiwiaW1hZ2VfbGlzdCIsImNvbnRyYWN0bGlzdCIsImF0dHIiLCJhY3RpdmVBdHRyIiwiZ29vZHNfc3BlYyIsInNwZWNfbGlzdCIsImVuZF90aW1lIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic3dpdGNoTmF2IiwiaWR4Iiwic2hvd0F0dHJNYXNrIiwiYXR0ckJ0blN1Ym1pdCIsImZpcnN0VGltZXIiLCJ3eFRpbWVyU2Vjb25kIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJhcHAiLCIkcGFyZW50IiwiY2FydF9pZCIsInVybCIsIm1lbWJlckJ1eU9uZSIsInRoZW4iLCJyZXMiLCJjb2RlIiwiZGF0YXMiLCJnbG9iYWxEYXRhIiwib3JkZXJJbmZvIiwiJG5hdmlnYXRlIiwibmF2R29vZHNEZXRhaWxzIiwic2FsZV90eXBlIiwiJHJlZGlyZWN0IiwiY2hhbmdlQXR0ciIsImluZGV4IiwiZWxlIiwiam9pbiIsIiRhcHBseSIsImdldFNob3BEZXRhaWxzIiwiYWRkTnVtIiwidXBwZXJfbGltaXQiLCJOdW1iZXIiLCJyZWR1TnVtIiwic2hvd0NvdXBvbk1hc2siLCJsZW5ndGgiLCJjaG9pY2VDb3Vwb24iLCJleGlzdHMiLCJ0aWQiLCJ2b3VjaGVyRnJlZWV4IiwiZXJyb3IiLCJoaWRlQ291cG9uIiwiZXZlbnRzIiwidCIsInZvdWNoZXJUcGxMaXN0Iiwic3RvcmVfaWQiLCJnZXR0eXBlIiwibGlzdCIsImZvckVhY2giLCJpdGVtIiwiY291cG9uVGltZSIsInZvdWNoZXJfdF9zdGFydF9kYXRlIiwidm91Y2hlcl90X2VuZF9kYXRlIiwidGhhdCIsIm9yZGluYXJ5R29vZHNEdGFpbCIsInR5cGUiLCJzcGVjX25hbWUiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzcGVjX3ZhbHVlIiwicHJvcCIsImtleXMiLCJ3eFRpbWVyIiwiYmVnaW5UaW1lIiwiY29tcGxldGUiLCJzdGFydCIsImFydGljbGUiLCJnb29kc19ib2R5Iiwid3hQYXJzZSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUhBLElBQUlBLFFBQVFDLFFBQVEscUJBQVIsQ0FBWixDLENBQTRDO0FBQzVDLElBQUlDLE1BQU1ELFFBQVEsV0FBUixDQUFWOztBQUdBLElBQUlFLFVBQVVGLFFBQVEsNkJBQVIsQ0FBZDs7SUFFcUJHLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLGNBQWEsRUFBQyx3QkFBdUIsWUFBeEIsRUFBZCxFQUFvRCxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQWhFLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLGtCQUFZQyxjQURGO0FBRVZDLGlCQUFXRDs7QUFGRCxLLFFBTVpFLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxrQkFBWSxLQURQO0FBRUxDLG9CQUFjLEVBRlQsRUFFYTtBQUNsQkMsZ0JBQVUsQ0FITDtBQUlMQyxnQkFBVSxLQUpMO0FBS0xDLGVB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VUFBTCxHQUFrQitELE9BQU9DLE1BQVAsQ0FBYzNDLElBQUlFLEtBQUosQ0FBVTlCLGFBQVYsQ0FBd0JPLFVBQXhCLElBQXNDLEVBQXBELENBQWxCO0FBQ0EsMkJBQUtELFVBQUwsR0FBa0JnRSxPQUFPSSxJQUFQLENBQVk5QyxJQUFJRSxLQUFKLENBQVU5QixhQUFWLENBQXdCTyxVQUF4QixJQUFzQyxFQUFsRCxDQUFsQjtBQUNBLDJCQUFLQyxTQUFMLEdBQWlCb0IsSUFBSUUsS0FBSixDQUFVdEIsU0FBM0I7QUFDQTtBQUNBLHdCQUFJQyxXQUFXbUIsSUFBSUUsS0FBSixDQUFVOUIsYUFBVixDQUF3QlMsUUFBeEIsSUFBb0MsQ0FBbkQ7QUFDQSx3QkFBSWtFLFVBQVUsSUFBSXRHLEtBQUosQ0FBVTtBQUN0QnVHLGlDQUFXbkUsUUFEVztBQUV0QmYsNEJBQU0sWUFGZ0I7QUFHdEJtRiw4QkFIc0Isc0JBR1gsQ0FBRTtBQUhTLHFCQUFWLENBQWQ7QUFLQUYsNEJBQVFHLEtBQVIsQ0FBYyxNQUFkO0FBQ0EsMkJBQUtyQyxNQUFMO0FBQ0Esd0JBQUlzQyxVQUFVbkQsSUFBSUUsS0FBSixDQUFVOUIsYUFBVixDQUF3QmdGLFVBQXRDO0FBQ0E7QUFDQXhHLDRCQUFReUcsT0FBUixDQUFnQixTQUFoQixFQUEyQixNQUEzQixFQUFtQ0YsT0FBbkMsRUFBNENiLElBQTVDLEVBQWtELENBQWxEO0FBQ0Q7QUFDRixpQkEzQ0ssQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWhMeUJnQixlQUFLQyxJOztrQkFBbkIxRyxLIiwiZmlsZSI6InNlY2tpbGxTaG9wRGV0YWlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG1hc2sgZnJvbSAnLi4vY29tcG9uZW50cy9tYXNrJztcclxudmFyIHRpbWVyID0gcmVxdWlyZSgnLi4vdXRpbHMvd3hUaW1lci5qcycpOyAvLyDlgJLorqHml7ZcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICcuLi91dGlscy9iYXNlLmpzJztcclxudmFyIFd4UGFyc2UgPSByZXF1aXJlKCcuLi91dGlscy93eFBhcnNlL3d4UGFyc2UuanMnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImNvdXBvbm1hc2tcIjp7XCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiY291cG9uRmxhZ1wifSxcImF0dHJzbWFza1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiYXR0ckZsYWdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgY291cG9ubWFzazogbWFzayxcclxuICAgIGF0dHJzbWFzazogbWFza1xyXG5cclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGNvdXBvbkZsYWc6IGZhbHNlLFxyXG4gICAgdm91Y2hlcl9saXN0OiBbXSwgLy/kvJjmg6DliLjliJfooahcclxuICAgIGdvb2RzTnVtOiAxLFxyXG4gICAgYXR0ckZsYWc6IGZhbHNlLFxyXG4gICAgdGFiTGlzdDogW3sgbmFtZTogJ+WVhuWTgeS7i+e7jScsIGRvdE51bTogMiB9LCB7IG5hbWU6ICflm77mlofor6bmg4UnLCBkb3ROdW06IDMgfV0sIC8vIOmhtumDqOmAiemhueWNoVxyXG4gICAgY3VycmVudFRhYjogMCwgLy8g6aG26YOo6YCJ6aG55Y2h57Si5byVXHJcbiAgICB3eFRpbWVyTGlzdDoge30sIC8vIOWAkuiuoeaXtlxyXG4gICAgZ29vZHNfaWQ6IG51bGwsIC8v5ZWG5ZOBZ29vZHNfaWRcclxuICAgIHJlcXVlc3RJbWdVcmw6IG51bGwsIC8v5Zu+54mH5Z+f5ZCNXHJcbiAgICBnb29kc19jb250ZW50OiBudWxsLCAvLyDllYblk4HlhoXlrrlcclxuICAgIHN0b3JlX2luZm86IG51bGwsIC8vIOW6l+mTuuS/oeaBr1xyXG4gICAgZ29vZHNfY29tbWVuZF9saXN0OiBbXSwgLy/mjqjojZDllYblk4HliJfooahcclxuICAgIGltYWdlX2xpc3Q6IFtdLCAvLyDllYblk4Hova7mkq3lm75cclxuICAgIGNvbnRyYWN0bGlzdDoge30sIC8vIOWVhuWTgeacjeWKoeivtOaYjlxyXG4gICAgYXR0cjogW10sICAvLyDllYblk4HmgLvlsZ7mgKfmlbDnu4RcclxuICAgIGFjdGl2ZUF0dHI6IFtdLCAvLyDlvZPliY3ngrnlh7vlsZ7mgKfmlbDnu4RcclxuICAgIGdvb2RzX3NwZWM6IFtdLCAvLyDpu5jorqTlsZ7mgKfmlbDnu4RcclxuICAgIHNwZWNfbGlzdDoge30sIC8vIOaJgOacieWxnuaAp+WvueW6lOeahOWVhuWTgWdvb2RzX2lkXHJcbiAgICBlbmRfdGltZTogMCwgLy8g5YCS6K6h5pe2XHJcblxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25TaG93KCkge31cclxuICBtZXRob2RzID0ge1xyXG4gICAgLy8g5YiH5o2i6aG26YOo5a+86IiqXHJcbiAgICBzd2l0Y2hOYXYoaWR4KSB7XHJcbiAgICAgIHRoaXMuY3VycmVudFRhYiA9IGlkeDtcclxuICAgIH0sXHJcbiAgICAvLyDmmL7npLrpgInmi6nllYblk4HmoYZcclxuICAgIHNob3dBdHRyTWFzayAoKSB7XHJcbiAgICAgIHRoaXMuYXR0ckZsYWcgPSB0cnVlXHJcbiAgICB9LFxyXG4gICAgYXR0ckJ0blN1Ym1pdCgpe1xyXG4gICAgICBpZih0aGlzLnd4VGltZXJMaXN0LmZpcnN0VGltZXIud3hUaW1lclNlY29uZCA8PSAwKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn5pys5Zy65bey57uT5p2f77yM6K+3562J5b6F5LiL5Zy65rS75YqoJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgdmFyIGFwcCA9IHRoaXMuJHBhcmVudDtcclxuICAgICAgdmFyIGdvb2RzX2lkID0gdGhpcy5nb29kc19pZFxyXG4gICAgICB2YXIgZ29vZHNOdW0gPSB0aGlzLmdvb2RzTnVtXHJcbiAgICAgIHZhciBjYXJ0X2lkID0gYCR7Z29vZHNfaWR9fCR7Z29vZHNOdW19YFxyXG4gICAgICBhamF4KHtcclxuICAgICAgICB1cmw6IGFwaS5tZW1iZXJCdXlPbmUsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgY2FydF9pZCxcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZihyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgIHJlcy5kYXRhcy5jYXJ0X2lkID0gY2FydF9pZFxyXG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEub3JkZXJJbmZvID0gcmVzLmRhdGFzXHJcbiAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogJy9wYWdlcy9zZXR0bGVtZW50JyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgbmF2R29vZHNEZXRhaWxzKGdvb2RzX2lkLCBzYWxlX3R5cGUpIHtcclxuICAgICAgLy8gbmF2aWdhdGVcclxuICAgICAgaWYoc2FsZV90eXBlID09ICdydXNoc2FsZXMnKSB7XHJcbiAgICAgICAgdGhpcy4kcmVkaXJlY3QoYC9wYWdlcy9zZWNraWxsU2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLiRyZWRpcmVjdChgL3BhZ2VzL3Nob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjaGFuZ2VBdHRyKGluZGV4LCBpZHgsIGVsZSl7XHJcbiAgICAgIHRoaXMuYWN0aXZlQXR0cltpbmRleF0gPSBpZHhcclxuICAgICAgdGhpcy5nb29kc19zcGVjW2luZGV4XSA9IGVsZVxyXG4gICAgICB2YXIgZ29vZHNfaWQgPSB0aGlzLnNwZWNfbGlzdFt0aGlzLmFjdGl2ZUF0dHIuam9pbignfCcpXVxyXG4gICAgICB0aGlzLmdvb2RzX2lkID0gZ29vZHNfaWQ7XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgdGhpcy5nZXRTaG9wRGV0YWlscygpXHJcbiAgICB9LFxyXG4gICAgYWRkTnVtKCkge1xyXG4gICAgICAvLyAw5LiN6ZmQ6LStICAgbiDpmZDotK1u5Lu2XHJcbiAgICAgIHZhciB1cHBlcl9saW1pdCA9IHRoaXMuZ29vZHNfY29udGVudC51cHBlcl9saW1pdCAgXHJcbiAgICAgIGlmKHVwcGVyX2xpbWl0ICE9IDAgJiYgTnVtYmVyKHVwcGVyX2xpbWl0KSA8PSBOdW1iZXIodGhpcy5nb29kc051bSkpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6IGDljZXmrKHmnIDlpJrpgInmi6kke3VwcGVyX2xpbWl0feS7tuWVhuWTgWAsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuZ29vZHNOdW0gPSB1cHBlcl9saW1pdFxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZ29vZHNOdW0gKytcclxuICAgICAgfVxyXG4gICAgIFxyXG4gICAgfSxcclxuICAgIHJlZHVOdW0oKXtcclxuICAgICAgaWYodGhpcy5nb29kc051bSA8PSAxKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc051bSA9IDFcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmdvb2RzTnVtLS1cclxuICAgIH0sXHJcbiAgICBzaG93Q291cG9uTWFzaygpIHtcclxuICAgICAgaWYodGhpcy52b3VjaGVyX2xpc3QubGVuZ3RoID09IDApIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfmmoLml6DkvJjmg6DliLjlj5HpgIEnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNvdXBvbkZsYWcgPSB0cnVlXHJcbiAgICB9LFxyXG4gICAgY2hvaWNlQ291cG9uKGV4aXN0cywgdGlkLCBpZHgpIHtcclxuICAgICAgaWYoZXhpc3RzID09IDApIHtcclxuICAgICAgICBhamF4KHtcclxuICAgICAgICAgIHVybDogYXBpLnZvdWNoZXJGcmVlZXgsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHRpZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIGlmKHJlcy5kYXRhcyA9PSAxKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfpooblj5bmiJDlip8nXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMudm91Y2hlcl9saXN0W2lkeF0uZXhpc3RzICA9ICAxXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhcy5lcnJvcixcclxuICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgaGlkZUNvdXBvbigpIHtcclxuICAgICAgdGhpcy5jb3Vwb25GbGFnID0gZmFsc2VcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuXHJcbiAgYXN5bmMgb25Mb2FkKHQpIHtcclxuICAgIHRoaXMuZ29vZHNfaWQgPSB0Lmdvb2RzX2lkO1xyXG4gICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICAgIHRoaXMuJGFwcGx5KClcclxuICAgIGF3YWl0IHRoaXMuZ2V0U2hvcERldGFpbHMoKVxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLnZvdWNoZXJUcGxMaXN0LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc3RvcmVfaWQ6IHRoaXMuc3RvcmVfaW5mby5zdG9yZV9pZCxcclxuICAgICAgICBnZXR0eXBlOiAnZnJlZSdcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB2YXIgbGlzdCA9IHJlcy5kYXRhcy52b3VjaGVyX2xpc3QgfHwgW11cclxuICAgICAgbGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGl0ZW0uY291cG9uVGltZSA9IGAke2Zvcm1hdERhdGUoaXRlbS52b3VjaGVyX3Rfc3RhcnRfZGF0ZSl9IOiHsyAke2Zvcm1hdERhdGUoaXRlbS52b3VjaGVyX3RfZW5kX2RhdGUpfWBcclxuICAgICAgfSlcclxuICAgICAgdGhpcy52b3VjaGVyX2xpc3QgPSBsaXN0XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRTaG9wRGV0YWlscygpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIC8vIOenkuadgOWVhuWTgeivpuaDhVxyXG4gICAgYXdhaXQgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm9yZGluYXJ5R29vZHNEdGFpbCxcclxuICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBnb29kc19pZDogdGhpcy5nb29kc19pZCxcclxuICAgICAgICBzYWxlX3R5cGU6ICdydXNoc2FsZXMnXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc051bSA9IDFcclxuICAgICAgICB0aGlzLmdvb2RzX2NvbnRlbnQgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudFxyXG4gICAgICAgIHRoaXMuY29udHJhY3RsaXN0ID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuY29udHJhY3RsaXN0IHx8IHt9XHJcbiAgICAgICAgdGhpcy5pbWFnZV9saXN0ID0gcmVzLmRhdGFzLmltYWdlX2xpc3QgfHwgW11cclxuICAgICAgICB0aGlzLnN0b3JlX2luZm8gPSByZXMuZGF0YXMuc3RvcmVfaW5mb1xyXG4gICAgICAgIHRoaXMuZ29vZHNfY29tbWVuZF9saXN0ID0gcmVzLmRhdGFzLmdvb2RzX2NvbW1lbmRfbGlzdFxyXG4gICAgICAgIC8vIOWVhuWTgeWxnuaAp1xyXG4gICAgICAgIHZhciBzcGVjX25hbWUgPSBPYmplY3QudmFsdWVzKHJlcy5kYXRhcy5nb29kc19jb250ZW50LnNwZWNfbmFtZSB8fCB7fSlcclxuICAgICAgICB2YXIgc3BlY192YWx1ZSA9IE9iamVjdC52YWx1ZXMocmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuc3BlY192YWx1ZSB8fCB7fSlcclxuICAgICAgICB2YXIgYXR0ciA9IFtdXHJcbiAgICAgICAgc3BlY192YWx1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgaWYoIWF0dHJbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgIGF0dHJbaW5kZXhdID0ge31cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGF0dHJbaW5kZXhdLnRpdGxlID0gc3BlY19uYW1lW2luZGV4XSBcclxuICAgICAgICAgIGF0dHJbaW5kZXhdLnByb3AgPSBpdGVtXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmF0dHIgPSBhdHRyXHJcbiAgICAgICAgdGhpcy5nb29kc19zcGVjID0gT2JqZWN0LnZhbHVlcyhyZXMuZGF0YXMuZ29vZHNfY29udGVudC5nb29kc19zcGVjIHx8IHt9KVxyXG4gICAgICAgIHRoaXMuYWN0aXZlQXR0ciA9IE9iamVjdC5rZXlzKHJlcy5kYXRhcy5nb29kc19jb250ZW50Lmdvb2RzX3NwZWMgfHwge30pXHJcbiAgICAgICAgdGhpcy5zcGVjX2xpc3QgPSByZXMuZGF0YXMuc3BlY19saXN0XHJcbiAgICAgICAgLy8g5YCS6K6h5pe2XHJcbiAgICAgICAgdmFyIGVuZF90aW1lID0gcmVzLmRhdGFzLmdvb2RzX2NvbnRlbnQuZW5kX3RpbWUgfHwgMFxyXG4gICAgICAgIHZhciB3eFRpbWVyID0gbmV3IHRpbWVyKHtcclxuICAgICAgICAgIGJlZ2luVGltZTogZW5kX3RpbWUsXHJcbiAgICAgICAgICBuYW1lOiAnZmlyc3RUaW1lcicsXHJcbiAgICAgICAgICBjb21wbGV0ZSgpIHt9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd3hUaW1lci5zdGFydCh0aGlzKTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgdmFyIGFydGljbGUgPSByZXMuZGF0YXMuZ29vZHNfY29udGVudC5nb29kc19ib2R5XHJcbiAgICAgICAgLy8gYXJ0aWNsZSA9IGFydGljbGUucmVwbGFjZSgvc3JjPVwiL2csIGBzcmM9XCIke3RoYXQucmVxdWVzdEltZ1VybH1gKTtcclxuICAgICAgICBXeFBhcnNlLnd4UGFyc2UoJ2FydGljbGUnLCAnaHRtbCcsIGFydGljbGUsIHRoYXQsIDUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19