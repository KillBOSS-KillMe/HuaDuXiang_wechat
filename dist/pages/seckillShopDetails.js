'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mask = require('./../components/mask.js');

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var timer = require('./../utils/wxTimer.js'); // 倒计时

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
      tabList: [{ name: '商品介绍', dotNum: 2 }, { name: '图文详情', dotNum: 3 }], // 顶部选项卡
      currentTab: 0, // 顶部选项卡索引
      wxTimerList: {}, // 倒计时
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
      }]
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
      console.log(t);
      // 倒计时s
      var wxTimer = new timer({
        beginTime: '10',
        name: 'firstTimer',
        complete: function complete() {}
      });
      wxTimer.start(this);
      // setTimeout(() => {
      //   wxTimer.stop();
      // }, 5000);
      // 倒计时e
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/seckillShopDetails'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY2tpbGxTaG9wRGV0YWlscy5qcyJdLCJuYW1lcyI6WyJ0aW1lciIsInJlcXVpcmUiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJhdHRyc21hc2siLCJtYXNrIiwibWl4aW5zIiwiZGF0YSIsImdvb2RzTnVtIiwiYXR0ckZsYWciLCJ0YWJMaXN0IiwibmFtZSIsImRvdE51bSIsImN1cnJlbnRUYWIiLCJ3eFRpbWVyTGlzdCIsImZsb3dEYXRhIiwiaWQiLCJ0aXRsZSIsInByaWNlIiwiZXhwcmljZSIsImltZyIsImNvbXB1dGVkIiwibWV0aG9kcyIsInN3aXRjaE5hdiIsImlkeCIsInNob3dBdHRyTWFzayIsImF0dHJCdG5TdWJtaXQiLCIkbmF2aWdhdGUiLCJ1cmwiLCJldmVudHMiLCJ0IiwiY29uc29sZSIsImxvZyIsInd4VGltZXIiLCJiZWdpblRpbWUiLCJjb21wbGV0ZSIsInN0YXJ0Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUNBLElBQUlBLFFBQVFDLFFBQVEscUJBQVIsQ0FBWixDLENBQTRDOztJQUV2QkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHdCQUF1QixVQUExQyxFQUFiLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLGlCQUFXQztBQURELEssUUFJWkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLENBREw7QUFFTEMsZ0JBQVUsS0FGTDtBQUdMQyxlQUFTLENBQUMsRUFBRUMsTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQXhCLEVBQUQsRUFBOEIsRUFBRUQsTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQXhCLEVBQTlCLENBSEosRUFHZ0U7QUFDckVDLGtCQUFZLENBSlAsRUFJVTtBQUNmQyxtQkFBYSxFQUxSLEVBS1k7QUFDakI7QUFDQUMsZ0JBQVUsQ0FDUjtBQUNFQyxZQUFJLEdBRE47QUFFRUMsZUFBTyxPQUZUO0FBR0VDLGVBQU8sR0FIVDtBQUlFQyxpQkFBUyxJQUpYO0FBS0VDLGFBQUs7QUFMUCxPQURRLEVBUVI7QUFDRUosWUFBSSxHQUROO0FBRUVDLGVBQU8sT0FGVDtBQUdFQyxlQUFPLEdBSFQ7QUFJRUMsaUJBQVMsSUFKWDtBQUtFQyxhQUFLO0FBTFAsT0FSUSxFQWVSO0FBQ0VKLFlBQUksR0FETjtBQUVFQyxlQUFPLE9BRlQ7QUFHRUMsZUFBTyxHQUhUO0FBSUVDLGlCQUFTLElBSlg7QUFLRUMsYUFBSztBQUxQLE9BZlEsRUFzQlI7QUFDRUosWUFBSSxHQUROO0FBRUVDLGVBQU8sT0FGVDtBQUdFQyxlQUFPLEdBSFQ7QUFJRUMsaUJBQVMsSUFKWDtBQUtFQyxhQUFLO0FBTFAsT0F0QlE7QUFQTCxLLFFBdUNQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDUjtBQUNBQyxlQUZRLHFCQUVFQyxHQUZGLEVBRU87QUFDYixhQUFLWCxVQUFMLEdBQWtCVyxHQUFsQjtBQUNELE9BSk87O0FBS1I7QUFDQUMsa0JBTlEsMEJBTVE7QUFDZCxhQUFLaEIsUUFBTCxHQUFnQixJQUFoQjtBQUNELE9BUk87QUFTUmlCLG1CQVRRLDJCQVNPO0FBQ2IsYUFBS0MsU0FBTCxDQUFlLEVBQUNDLEtBQUssbUJBQU4sRUFBZjtBQUNEO0FBWE8sSyxRQWNWQyxNLEdBQVMsRTs7Ozs7NkJBZkEsQ0FBRTs7OzJCQWlCSkMsQyxFQUFHO0FBQ1JDLGNBQVFDLEdBQVIsQ0FBWUYsQ0FBWjtBQUNBO0FBQ0EsVUFBSUcsVUFBVSxJQUFJdEMsS0FBSixDQUFVO0FBQ3RCdUMsbUJBQVcsSUFEVztBQUV0QnZCLGNBQU0sWUFGZ0I7QUFHdEJ3QixnQkFIc0Isc0JBR1gsQ0FBRTtBQUhTLE9BQVYsQ0FBZDtBQUtBRixjQUFRRyxLQUFSLENBQWMsSUFBZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7Ozs7RUFuRmdDQyxlQUFLQyxJOztrQkFBbkJ6QyxLIiwiZmlsZSI6InNlY2tpbGxTaG9wRGV0YWlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG1hc2sgZnJvbSAnLi4vY29tcG9uZW50cy9tYXNrJztcclxudmFyIHRpbWVyID0gcmVxdWlyZSgnLi4vdXRpbHMvd3hUaW1lci5qcycpOyAvLyDlgJLorqHml7ZcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImF0dHJzbWFza1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwiYXR0ckZsYWdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgYXR0cnNtYXNrOiBtYXNrXHJcbiAgfTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBnb29kc051bTogMSxcclxuICAgIGF0dHJGbGFnOiBmYWxzZSxcclxuICAgIHRhYkxpc3Q6IFt7IG5hbWU6ICfllYblk4Hku4vnu40nLCBkb3ROdW06IDIgfSwgeyBuYW1lOiAn5Zu+5paH6K+m5oOFJywgZG90TnVtOiAzIH1dLCAvLyDpobbpg6jpgInpobnljaFcclxuICAgIGN1cnJlbnRUYWI6IDAsIC8vIOmhtumDqOmAiemhueWNoee0ouW8lVxyXG4gICAgd3hUaW1lckxpc3Q6IHt9LCAvLyDlgJLorqHml7ZcclxuICAgIC8vIOW6l+mTulxyXG4gICAgZmxvd0RhdGE6IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnMScsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZS5wbmcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzInLFxyXG4gICAgICAgIHRpdGxlOiAn6JCM5YiG6K6i5Lmm5py6JyxcclxuICAgICAgICBwcmljZTogJzUnLFxyXG4gICAgICAgIGV4cHJpY2U6ICcyNScsXHJcbiAgICAgICAgaW1nOiAnL2Fzc2V0cy9pbWcvaW1hZ2UucG5nJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICczJyxcclxuICAgICAgICB0aXRsZTogJ+iQjOWIhuiuouS5puacuicsXHJcbiAgICAgICAgcHJpY2U6ICc1JyxcclxuICAgICAgICBleHByaWNlOiAnMjUnLFxyXG4gICAgICAgIGltZzogJy9hc3NldHMvaW1nL2ltYWdlLnBuZydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnMycsXHJcbiAgICAgICAgdGl0bGU6ICfokIzliIborqLkuabmnLonLFxyXG4gICAgICAgIHByaWNlOiAnNScsXHJcbiAgICAgICAgZXhwcmljZTogJzI1JyxcclxuICAgICAgICBpbWc6ICcvYXNzZXRzL2ltZy9pbWFnZS5wbmcnXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG9uU2hvdygpIHt9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOWIh+aNoumhtumDqOWvvOiIqlxyXG4gICAgc3dpdGNoTmF2KGlkeCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRUYWIgPSBpZHg7XHJcbiAgICB9LFxyXG4gICAgLy8g5pi+56S66YCJ5oup5ZWG5ZOB5qGGXHJcbiAgICBzaG93QXR0ck1hc2sgKCkge1xyXG4gICAgICB0aGlzLmF0dHJGbGFnID0gdHJ1ZVxyXG4gICAgfSxcclxuICAgIGF0dHJCdG5TdWJtaXQoKXtcclxuICAgICAgdGhpcy4kbmF2aWdhdGUoe3VybDogJy9wYWdlcy9zZXR0bGVtZW50J30pXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG9uTG9hZCh0KSB7XHJcbiAgICBjb25zb2xlLmxvZyh0KVxyXG4gICAgLy8g5YCS6K6h5pe2c1xyXG4gICAgdmFyIHd4VGltZXIgPSBuZXcgdGltZXIoe1xyXG4gICAgICBiZWdpblRpbWU6ICcxMCcsXHJcbiAgICAgIG5hbWU6ICdmaXJzdFRpbWVyJyxcclxuICAgICAgY29tcGxldGUoKSB7fVxyXG4gICAgfSk7XHJcbiAgICB3eFRpbWVyLnN0YXJ0KHRoaXMpO1xyXG4gICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAvLyAgIHd4VGltZXIuc3RvcCgpO1xyXG4gICAgLy8gfSwgNTAwMCk7XHJcbiAgICAvLyDlgJLorqHml7ZlXHJcbiAgfVxyXG59XHJcbiJdfQ==