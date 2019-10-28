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
    }, _this.$repeat = {}, _this.$props = { "attrsmask": { "xmlns:v-bind": "", "v-bind:maskFlag.sync": "attrFlag" } }, _this.$events = {}, _this.components = {
      attrsmask: _mask2.default
    }, _this.mixins = [], _this.data = {
      goodsNum: 1,
      attrFlag: false,
      tabList: [{ name: '商品介绍' }, { name: '图文详情' }], // 顶部选项卡
      currentTab: 0, // 顶部选项卡索引
      // 店铺
      flowData: [{
        id: '1',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '/assets/img/image.png'
      }, {
        id: '2',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '/assets/img/image.png'
      }, {
        id: '3',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '/assets/img/image.png'
      }, {
        id: '3',
        title: '萌分订书机',
        price: '5',
        exprice: '25',
        img: '/assets/img/image.png'
      }],
      goods_id: null, //商品goods_id
      requestImgUrl: null, //图片域名
      goods_common: null, // 商品内容
      store_info: null, // 店铺信息
      hot_sales: [] //推荐商品列表
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
        this.$navigate({ url: '/pages/settlement' });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad(t) {
      var _this2 = this;

      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      this.goods_id = t.goods_id;
      var that = this;

      (0, _ajax.ajax)({
        url: api.ordinaryGoodsDtail,
        type: 'get',
        data: {
          goods_id: this.goods_id
        }
      }).then(function (res) {
        console.log(res);
        if (res.code == 200) {
          _this2.goods_common = res.datas.goods_common;
          _this2.store_info = res.datas.store_info;
          _this2.hot_sales = res.datas.hot_sales;
        }
      });

      var article = '<p>（微晶一周鲜）功能，大家有没有这种苦恼，买来的新鲜肉放在冷藏容易坏，放在冷冻冻成了石头！要拿来吃的时候又得解冻了才能切，而且解冻的过程又容易滋生细菌并且营养流失影响口感，微晶这个功能就很好解决了，区别于传统的感知冰箱内温度，微晶是感知食材本身的温度，使食材始终处于微晶状态，随时拿出来随时切并且保留了食材的营养不流失～并且可以保存七天左右哦！</p>';
      article = article.replace(/src="/g, 'src="' + that.requestImgUrl);
      WxParse.wxParse('article', 'html', article, that, 5);
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/shopDetails'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BEZXRhaWxzLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJXeFBhcnNlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYXR0cnNtYXNrIiwibWFzayIsIm1peGlucyIsImRhdGEiLCJnb29kc051bSIsImF0dHJGbGFnIiwidGFiTGlzdCIsIm5hbWUiLCJjdXJyZW50VGFiIiwiZmxvd0RhdGEiLCJpZCIsInRpdGxlIiwicHJpY2UiLCJleHByaWNlIiwiaW1nIiwiZ29vZHNfaWQiLCJyZXF1ZXN0SW1nVXJsIiwiZ29vZHNfY29tbW9uIiwic3RvcmVfaW5mbyIsImhvdF9zYWxlcyIsImNvbXB1dGVkIiwibWV0aG9kcyIsInN3aXRjaE5hdiIsImlkeCIsInNob3dBdHRyTWFzayIsImF0dHJCdG5TdWJtaXQiLCIkbmF2aWdhdGUiLCJ1cmwiLCJldmVudHMiLCJ0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ0aGF0Iiwib3JkaW5hcnlHb29kc0R0YWlsIiwidHlwZSIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVzIiwiY29kZSIsImRhdGFzIiwiYXJ0aWNsZSIsInJlcGxhY2UiLCJ3eFBhcnNlIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztBQUVBLElBQUlDLFVBQVVELFFBQVEsNkJBQVIsQ0FBZDs7SUFDcUJFLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFoQixFQUFtQix3QkFBdUIsVUFBMUMsRUFBYixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyxpQkFBV0M7QUFERCxLLFFBSVpDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxnQkFBVSxDQURMO0FBRUxDLGdCQUFVLEtBRkw7QUFHTEMsZUFBUyxDQUFDLEVBQUVDLE1BQU0sTUFBUixFQUFELEVBQWtCLEVBQUVBLE1BQU0sTUFBUixFQUFsQixDQUhKLEVBR3lDO0FBQzlDQyxrQkFBWSxDQUpQLEVBSVU7QUFDZjtBQUNBQyxnQkFBVSxDQUNSO0FBQ0VDLFlBQUksR0FETjtBQUVFQyxlQUFPLE9BRlQ7QUFHRUMsZUFBTyxHQUhUO0FBSUVDLGlCQUFTLElBSlg7QUFLRUMsYUFBSztBQUxQLE9BRFEsRUFRUjtBQUNFSixZQUFJLEdBRE47QUFFRUMsZUFBTyxPQUZUO0FBR0VDLGVBQU8sR0FIVDtBQUlFQyxpQkFBUyxJQUpYO0FBS0VDLGFBQUs7QUFMUCxPQVJRLEVBZVI7QUFDRUosWUFBSSxHQUROO0FBRUVDLGVBQU8sT0FGVDtBQUdFQyxlQUFPLEdBSFQ7QUFJRUMsaUJBQVMsSUFKWDtBQUtFQyxhQUFLO0FBTFAsT0FmUSxFQXNCUjtBQUNFSixZQUFJLEdBRE47QUFFRUMsZUFBTyxPQUZUO0FBR0VDLGVBQU8sR0FIVDtBQUlFQyxpQkFBUyxJQUpYO0FBS0VDLGFBQUs7QUFMUCxPQXRCUSxDQU5MO0FBb0NMQyxnQkFBVSxJQXBDTCxFQW9DVztBQUNoQkMscUJBQWUsSUFyQ1YsRUFxQ2dCO0FBQ3JCQyxvQkFBYyxJQXRDVCxFQXNDZTtBQUNwQkMsa0JBQVksSUF2Q1AsRUF1Q2E7QUFDbEJDLGlCQUFXLEVBeENOLENBd0NVO0FBeENWLEssUUEyQ1BDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSO0FBQ0FDLGVBRlEscUJBRUVDLEdBRkYsRUFFTztBQUNiLGFBQUtmLFVBQUwsR0FBa0JlLEdBQWxCO0FBQ0QsT0FKTzs7QUFLUjtBQUNBQyxrQkFOUSwwQkFNTztBQUNiLGFBQUtuQixRQUFMLEdBQWdCLElBQWhCO0FBQ0QsT0FSTztBQVNSb0IsbUJBVFEsMkJBU1E7QUFDZCxhQUFLQyxTQUFMLENBQWUsRUFBRUMsS0FBSyxtQkFBUCxFQUFmO0FBQ0Q7QUFYTyxLLFFBY1ZDLE0sR0FBUyxFOzs7Ozs2QkFmQSxDQUFFOzs7MkJBaUJKQyxDLEVBQUc7QUFBQTs7QUFDUixXQUFLYixhQUFMLEdBQXFCLEtBQUtjLE9BQUwsQ0FBYUMsVUFBYixDQUF3QmYsYUFBN0M7QUFDQSxXQUFLRCxRQUFMLEdBQWdCYyxFQUFFZCxRQUFsQjtBQUNBLFVBQUlpQixPQUFPLElBQVg7O0FBRUEsc0JBQUs7QUFDSEwsYUFBS3JDLElBQUkyQyxrQkFETjtBQUVIQyxjQUFNLEtBRkg7QUFHSC9CLGNBQU07QUFDSlksb0JBQVUsS0FBS0E7QUFEWDtBQUhILE9BQUwsRUFNR29CLElBTkgsQ0FNUSxlQUFPO0FBQ2JDLGdCQUFRQyxHQUFSLENBQVlDLEdBQVo7QUFDQSxZQUFHQSxJQUFJQyxJQUFKLElBQVksR0FBZixFQUFvQjtBQUNsQixpQkFBS3RCLFlBQUwsR0FBb0JxQixJQUFJRSxLQUFKLENBQVV2QixZQUE5QjtBQUNBLGlCQUFLQyxVQUFMLEdBQWtCb0IsSUFBSUUsS0FBSixDQUFVdEIsVUFBNUI7QUFDQSxpQkFBS0MsU0FBTCxHQUFpQm1CLElBQUlFLEtBQUosQ0FBVXJCLFNBQTNCO0FBQ0Q7QUFDRixPQWJEOztBQWVBLFVBQUlzQixVQUNGLG9MQURGO0FBRUFBLGdCQUFVQSxRQUFRQyxPQUFSLENBQWdCLFFBQWhCLFlBQWtDVixLQUFLaEIsYUFBdkMsQ0FBVjtBQUNBeEIsY0FBUW1ELE9BQVIsQ0FBZ0IsU0FBaEIsRUFBMkIsTUFBM0IsRUFBbUNGLE9BQW5DLEVBQTRDVCxJQUE1QyxFQUFrRCxDQUFsRDtBQUNEOzs7O0VBbEdnQ1ksZUFBS0MsSTs7a0JBQW5CcEQsSyIsImZpbGUiOiJzaG9wRGV0YWlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG1hc2sgZnJvbSAnLi4vY29tcG9uZW50cy9tYXNrJztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbnZhciBXeFBhcnNlID0gcmVxdWlyZSgnLi4vdXRpbHMvd3hQYXJzZS93eFBhcnNlLmpzJyk7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImF0dHJzbWFza1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiYXR0ckZsYWdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgYXR0cnNtYXNrOiBtYXNrXHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBnb29kc051bTogMSxcclxuICAgIGF0dHJGbGFnOiBmYWxzZSxcclxuICAgIHRhYkxpc3Q6IFt7IG5hbWU6ICfllYblk4Hku4vnu40nfSwgeyBuYW1lOiAn5Zu+5paH6K+m5oOFJyB9XSwgLy8g6aG26YOo6YCJ6aG55Y2hXHJcbiAgICBjdXJyZW50VGFiOiAwLCAvLyDpobbpg6jpgInpobnljaHntKLlvJVcclxuICAgIC8vIOW6l+mTulxyXG4gICAgZmxvd0RhdGE6IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnMScsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZS5wbmcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzInLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UucG5nJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICczJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJy9hc3NldHMvaW1nL2ltYWdlLnBuZydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnMycsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZS5wbmcnXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBnb29kc19pZDogbnVsbCwgLy/llYblk4Fnb29kc19pZFxyXG4gICAgcmVxdWVzdEltZ1VybDogbnVsbCwgLy/lm77niYfln5/lkI1cclxuICAgIGdvb2RzX2NvbW1vbjogbnVsbCwgLy8g5ZWG5ZOB5YaF5a65XHJcbiAgICBzdG9yZV9pbmZvOiBudWxsLCAvLyDlupfpk7rkv6Hmga9cclxuICAgIGhvdF9zYWxlczogW10sIC8v5o6o6I2Q5ZWG5ZOB5YiX6KGoXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBvblNob3coKSB7fVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAvLyDliIfmjaLpobbpg6jlr7zoiKpcclxuICAgIHN3aXRjaE5hdihpZHgpIHtcclxuICAgICAgdGhpcy5jdXJyZW50VGFiID0gaWR4O1xyXG4gICAgfSxcclxuICAgIC8vIOaYvuekuumAieaLqeWVhuWTgeahhlxyXG4gICAgc2hvd0F0dHJNYXNrKCkge1xyXG4gICAgICB0aGlzLmF0dHJGbGFnID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBhdHRyQnRuU3VibWl0KCkge1xyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogJy9wYWdlcy9zZXR0bGVtZW50JyB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuXHJcbiAgb25Mb2FkKHQpIHtcclxuICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICB0aGlzLmdvb2RzX2lkID0gdC5nb29kc19pZDtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICBhamF4KHtcclxuICAgICAgdXJsOiBhcGkub3JkaW5hcnlHb29kc0R0YWlsLFxyXG4gICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGdvb2RzX2lkOiB0aGlzLmdvb2RzX2lkXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgaWYocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc19jb21tb24gPSByZXMuZGF0YXMuZ29vZHNfY29tbW9uXHJcbiAgICAgICAgdGhpcy5zdG9yZV9pbmZvID0gcmVzLmRhdGFzLnN0b3JlX2luZm9cclxuICAgICAgICB0aGlzLmhvdF9zYWxlcyA9IHJlcy5kYXRhcy5ob3Rfc2FsZXNcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIGFydGljbGUgPVxyXG4gICAgICAnPHA+77yI5b6u5pm25LiA5ZGo6bKc77yJ5Yqf6IO977yM5aSn5a625pyJ5rKh5pyJ6L+Z56eN6Ium5oG877yM5Lmw5p2l55qE5paw6bKc6IKJ5pS+5Zyo5Ya36JeP5a655piT5Z2P77yM5pS+5Zyo5Ya35Ya75Ya75oiQ5LqG55+z5aS077yB6KaB5ou/5p2l5ZCD55qE5pe25YCZ5Y+I5b6X6Kej5Ya75LqG5omN6IO95YiH77yM6ICM5LiU6Kej5Ya755qE6L+H56iL5Y+I5a655piT5ruL55Sf57uG6I+M5bm25LiU6JCl5YW75rWB5aSx5b2x5ZON5Y+j5oSf77yM5b6u5pm26L+Z5Liq5Yqf6IO95bCx5b6I5aW96Kej5Yaz5LqG77yM5Yy65Yir5LqO5Lyg57uf55qE5oSf55+l5Yaw566x5YaF5rip5bqm77yM5b6u5pm25piv5oSf55+l6aOf5p2Q5pys6Lqr55qE5rip5bqm77yM5L2/6aOf5p2Q5aeL57uI5aSE5LqO5b6u5pm254q25oCB77yM6ZqP5pe25ou/5Ye65p2l6ZqP5pe25YiH5bm25LiU5L+d55WZ5LqG6aOf5p2Q55qE6JCl5YW75LiN5rWB5aSx772e5bm25LiU5Y+v5Lul5L+d5a2Y5LiD5aSp5bem5Y+z5ZOm77yBPC9wPic7XHJcbiAgICBhcnRpY2xlID0gYXJ0aWNsZS5yZXBsYWNlKC9zcmM9XCIvZywgYHNyYz1cIiR7dGhhdC5yZXF1ZXN0SW1nVXJsfWApO1xyXG4gICAgV3hQYXJzZS53eFBhcnNlKCdhcnRpY2xlJywgJ2h0bWwnLCBhcnRpY2xlLCB0aGF0LCA1KTtcclxuICB9XHJcbn1cclxuIl19