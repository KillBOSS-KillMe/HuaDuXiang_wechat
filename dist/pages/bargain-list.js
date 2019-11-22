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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var api = require('./../api.js');

var timer = require('./../utils/wxTimer.js'); // 倒计时


var BargainList = function (_wepy$page) {
  _inherits(BargainList, _wepy$page);

  function BargainList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BargainList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BargainList.__proto__ || Object.getPrototypeOf(BargainList)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的砍价'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      requestImgUrl: '',
      barginData: [],
      goods_id: '', //当前商品id
      curpage: 1, //当前页数
      hasmore: false, //是否有下一页
      allpage: null, // 没有数据
      waitForArr: [{ time: 10 }, { time: 20 }, { time: 300 }, { time: 400 }], // 等待拼团列表
      wxTimerList: {} // 倒计时
    }, _this.computed = {}, _this.methods = {
      addressBtnSubmit: function addressBtnSubmit() {
        this.addressFlag = false;
        this.shareFlag = true;
      },
      attrBtnSubmit: function attrBtnSubmit() {
        this.attrFlag = false;
        this.addressFlag = true;
      },
      reduNum: function reduNum() {
        if (this.goodsNum == 1) return;
        this.goodsNum--;
      },
      addNum: function addNum() {
        this.goodsNum++;
      },

      /**
       * 跳转商品详情
       */
      jumpTimeDetails: function jumpTimeDetails(goods_id, join) {
        // if(join == 0) {
        this.attrFlag = true;
        this.goods_id = goods_id;
        this.$apply();
        this.getShopDetails();
        // }
      },
      hideMask: function hideMask() {},
      changeAttr: function changeAttr(index, idx, ele) {
        this.activeAttr[index] = idx;
        this.goods_spec[index] = ele;
        var goods_id = this.spec_list[this.activeAttr.join('|')];
        this.goods_id = goods_id;
        this.$apply();
        this.getShopDetails();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BargainList, [{
    key: 'onShow',
    value: function onShow() {
      var app = this.$parent;
      var address = app.globalData.address;
      this.address = address;
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      this.bargainGoodsList();

      // 倒计时s
      var that = this;
      var waitForArr = this.waitForArr;
      waitForArr.forEach(function (item, idx) {
        item.timer = new timer({
          beginTime: item.time,
          name: 'timer' + idx
        });
        item.timer.start(that);
      });

      // 倒计时e
    }
  }, {
    key: 'bargainGoodsList',
    value: function bargainGoodsList() {
      var _this2 = this;

      (0, _ajax.ajax)({
        url: api.bargainGoodsList,
        data: {
          page: 10,
          curpage: this.curpage
        }
      }).then(function (res) {
        _this2.barginData = res.datas.list;

        _this2.hasmore = res.datas.hasmore;
        _this2.allpage = res.datas.allpage || 0;
        _this2.$apply();
      });
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.hasmore) {
        this.curpage++;
        this.requestIndexGoodsList();
      }
    }
  }, {
    key: 'onUnload',
    value: function onUnload() {
      this.waitForArr.forEach(function (item) {
        return item.timer.stop();
      });
    }
  }]);

  return BargainList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(BargainList , 'pages/bargain-list'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhcmdhaW4tbGlzdC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwidGltZXIiLCJCYXJnYWluTGlzdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInJlcXVlc3RJbWdVcmwiLCJiYXJnaW5EYXRhIiwiZ29vZHNfaWQiLCJjdXJwYWdlIiwiaGFzbW9yZSIsImFsbHBhZ2UiLCJ3YWl0Rm9yQXJyIiwidGltZSIsInd4VGltZXJMaXN0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYWRkcmVzc0J0blN1Ym1pdCIsImFkZHJlc3NGbGFnIiwic2hhcmVGbGFnIiwiYXR0ckJ0blN1Ym1pdCIsImF0dHJGbGFnIiwicmVkdU51bSIsImdvb2RzTnVtIiwiYWRkTnVtIiwianVtcFRpbWVEZXRhaWxzIiwiam9pbiIsIiRhcHBseSIsImdldFNob3BEZXRhaWxzIiwiaGlkZU1hc2siLCJjaGFuZ2VBdHRyIiwiaW5kZXgiLCJpZHgiLCJlbGUiLCJhY3RpdmVBdHRyIiwiZ29vZHNfc3BlYyIsInNwZWNfbGlzdCIsImV2ZW50cyIsImFwcCIsIiRwYXJlbnQiLCJhZGRyZXNzIiwiZ2xvYmFsRGF0YSIsImJhcmdhaW5Hb29kc0xpc3QiLCJ0aGF0IiwiZm9yRWFjaCIsIml0ZW0iLCJiZWdpblRpbWUiLCJuYW1lIiwic3RhcnQiLCJ1cmwiLCJwYWdlIiwidGhlbiIsInJlcyIsImRhdGFzIiwibGlzdCIsInJlcXVlc3RJbmRleEdvb2RzTGlzdCIsInN0b3AiLCJ3ZXB5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7QUFFQSxJQUFJQyxRQUFRRCxRQUFRLHFCQUFSLENBQVosQyxDQUE0Qzs7O0lBR3ZCRSxXOzs7Ozs7Ozs7Ozs7OztnTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdU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S0FBSixDQUFVQyxJQUE1Qjs7QUFFQSxlQUFLNUMsT0FBTCxHQUFlMEMsSUFBSUMsS0FBSixDQUFVM0MsT0FBekI7QUFDQSxlQUFLQyxPQUFMLEdBQWV5QyxJQUFJQyxLQUFKLENBQVUxQyxPQUFWLElBQXFCLENBQXBDO0FBQ0EsZUFBS2dCLE1BQUw7QUFDRCxPQVpEO0FBYUQ7OztvQ0FDZ0I7QUFDZixVQUFHLEtBQUtqQixPQUFSLEVBQWlCO0FBQ2YsYUFBS0QsT0FBTDtBQUNBLGFBQUs4QyxxQkFBTDtBQUNEO0FBQ0Y7OzsrQkFDVTtBQUNULFdBQUszQyxVQUFMLENBQWdCZ0MsT0FBaEIsQ0FBd0I7QUFBQSxlQUFRQyxLQUFLOUMsS0FBTCxDQUFXeUQsSUFBWCxFQUFSO0FBQUEsT0FBeEI7QUFDRDs7OztFQXpHc0NDLGVBQUtQLEk7O2tCQUF6QmxELFciLCJmaWxlIjoiYmFyZ2Fpbi1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgbWFzayBmcm9tICcuLi9jb21wb25lbnRzL21hc2snO1xyXG52YXIgYXBpID0gcmVxdWlyZSgnLi4vYXBpLmpzJyk7XHJcbmltcG9ydCB7IGFqYXggfSBmcm9tICcuLi9hamF4LmpzJztcclxudmFyIHRpbWVyID0gcmVxdWlyZSgnLi4vdXRpbHMvd3hUaW1lci5qcycpOyAvLyDlgJLorqHml7ZcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXJnYWluTGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOegjeS7tydcclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgIGJhcmdpbkRhdGE6IFtdLFxyXG4gICAgZ29vZHNfaWQ6ICcnLCAvL+W9k+WJjeWVhuWTgWlkXHJcbiAgICBjdXJwYWdlOiAxLCAvL+W9k+WJjemhteaVsFxyXG4gICAgaGFzbW9yZTogZmFsc2UsIC8v5piv5ZCm5pyJ5LiL5LiA6aG1XHJcbiAgICBhbGxwYWdlOiBudWxsLCAvLyDmsqHmnInmlbDmja5cclxuICAgIHdhaXRGb3JBcnI6IFt7IHRpbWU6IDEwIH0sIHsgdGltZTogMjAgfSwgeyB0aW1lOiAzMDAgfSwgeyB0aW1lOiA0MDAgfV0sIC8vIOetieW+heaLvOWbouWIl+ihqFxyXG4gICAgd3hUaW1lckxpc3Q6IHt9LCAvLyDlgJLorqHml7ZcclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG9uU2hvdygpIHtcclxuICAgIHZhciBhcHAgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICB2YXIgYWRkcmVzcyA9IGFwcC5nbG9iYWxEYXRhLmFkZHJlc3NcclxuICAgIHRoaXMuYWRkcmVzcyA9IGFkZHJlc3NcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGFkZHJlc3NCdG5TdWJtaXQoKSB7XHJcbiAgICAgIHRoaXMuYWRkcmVzc0ZsYWcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zaGFyZUZsYWcgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGF0dHJCdG5TdWJtaXQoKSB7XHJcbiAgICAgIHRoaXMuYXR0ckZsYWcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5hZGRyZXNzRmxhZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgcmVkdU51bSgpIHtcclxuICAgICAgaWYgKHRoaXMuZ29vZHNOdW0gPT0gMSkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmdvb2RzTnVtLS07XHJcbiAgICB9LFxyXG4gICAgYWRkTnVtKCkge1xyXG4gICAgICB0aGlzLmdvb2RzTnVtKys7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDot7PovazllYblk4Hor6bmg4VcclxuICAgICAqL1xyXG4gICAganVtcFRpbWVEZXRhaWxzKGdvb2RzX2lkLCBqb2luKSB7XHJcbiAgICAgIC8vIGlmKGpvaW4gPT0gMCkge1xyXG4gICAgICAgIHRoaXMuYXR0ckZsYWcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ29vZHNfaWQgPSBnb29kc19pZFxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB0aGlzLmdldFNob3BEZXRhaWxzKClcclxuICAgICAgLy8gfVxyXG4gICAgfSxcclxuICAgIGhpZGVNYXNrKCkge30sXHJcbiAgICBjaGFuZ2VBdHRyKGluZGV4LCBpZHgsIGVsZSl7XHJcbiAgICAgIHRoaXMuYWN0aXZlQXR0cltpbmRleF0gPSBpZHhcclxuICAgICAgdGhpcy5nb29kc19zcGVjW2luZGV4XSA9IGVsZVxyXG4gICAgICB2YXIgZ29vZHNfaWQgPSB0aGlzLnNwZWNfbGlzdFt0aGlzLmFjdGl2ZUF0dHIuam9pbignfCcpXVxyXG4gICAgICB0aGlzLmdvb2RzX2lkID0gZ29vZHNfaWQ7XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgdGhpcy5nZXRTaG9wRGV0YWlscygpXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgdGhpcy5iYXJnYWluR29vZHNMaXN0KClcclxuXHJcbiAgICAvLyDlgJLorqHml7ZzXHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICB2YXIgd2FpdEZvckFyciA9IHRoaXMud2FpdEZvckFycjtcclxuICAgIHdhaXRGb3JBcnIuZm9yRWFjaCgoaXRlbSwgaWR4KSA9PiB7XHJcbiAgICAgIGl0ZW0udGltZXIgPSBuZXcgdGltZXIoe1xyXG4gICAgICAgIGJlZ2luVGltZTogaXRlbS50aW1lLFxyXG4gICAgICAgIG5hbWU6IGB0aW1lciR7aWR4fWBcclxuICAgICAgfSlcclxuICAgICAgaXRlbS50aW1lci5zdGFydCh0aGF0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIOWAkuiuoeaXtmVcclxuICB9XHJcbiAgYmFyZ2Fpbkdvb2RzTGlzdCgpIHtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5iYXJnYWluR29vZHNMaXN0LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcGFnZTogMTAsXHJcbiAgICAgICAgY3VycGFnZTogdGhpcy5jdXJwYWdlXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5iYXJnaW5EYXRhID0gcmVzLmRhdGFzLmxpc3RcclxuXHJcbiAgICAgIHRoaXMuaGFzbW9yZSA9IHJlcy5kYXRhcy5oYXNtb3JlXHJcbiAgICAgIHRoaXMuYWxscGFnZSA9IHJlcy5kYXRhcy5hbGxwYWdlIHx8IDBcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgb25SZWFjaEJvdHRvbSAoKSB7XHJcbiAgICBpZih0aGlzLmhhc21vcmUpIHtcclxuICAgICAgdGhpcy5jdXJwYWdlICsrIFxyXG4gICAgICB0aGlzLnJlcXVlc3RJbmRleEdvb2RzTGlzdCgpXHJcbiAgICB9XHJcbiAgfSAgXHJcbiAgb25VbmxvYWQoKSB7XHJcbiAgICB0aGlzLndhaXRGb3JBcnIuZm9yRWFjaChpdGVtID0+IGl0ZW0udGltZXIuc3RvcCgpKVxyXG4gIH1cclxufVxyXG4iXX0=