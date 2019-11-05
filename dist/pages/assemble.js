'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      navigationBarTitleText: '拼团'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      topImg: '',
      requestImgUrl: '',
      assembleId: '',
      flowData: [{ id: '1', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }, { id: '2', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }, { id: '3', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }, { id: '4', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }, { id: '5', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }, { id: '6', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }]
    }, _this.computed = {}, _this.methods = {
      /**
      * 跳转商品详情
      */
      jumpTimeDetails: function jumpTimeDetails(shopid) {
        this.$navigate('/pages/assembleShopDetails?shopid=' + shopid + '&assembleId=' + this.assembleId);
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var _this2 = this;

      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
      (0, _ajax.ajax)({
        url: api.memberPt
      }).then(function (res) {
        _this2.topImg = res.datas.img_area;
        _this2.$apply();
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      // this.userInfo = this.$parent.globalData.userInfo
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/assemble'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2VtYmxlLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInRvcEltZyIsInJlcXVlc3RJbWdVcmwiLCJhc3NlbWJsZUlkIiwiZmxvd0RhdGEiLCJpZCIsInRpdGxlIiwicHJpY2UiLCJleHByaWNlIiwiaW1nIiwidGFnIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwianVtcFRpbWVEZXRhaWxzIiwic2hvcGlkIiwiJG5hdmlnYXRlIiwiZXZlbnRzIiwib3B0aW9ucyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidXJsIiwibWVtYmVyUHQiLCJ0aGVuIiwicmVzIiwiZGF0YXMiLCJpbWdfYXJlYSIsIiRhcHBseSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBRXFCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDSEMsY0FBTyxFQURKO0FBRUhDLHFCQUFlLEVBRlo7QUFHSEMsa0JBQVksRUFIVDtBQUlIQyxnQkFBUyxDQUNQLEVBQUNDLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFETyxFQUVQLEVBQUNMLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFGTyxFQUdQLEVBQUNMLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFITyxFQUlQLEVBQUNMLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFKTyxFQUtQLEVBQUNMLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFMTyxFQU1QLEVBQUNMLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFOTztBQUpOLEssUUFjTEMsUSxHQUFXLEUsUUFjYkMsTyxHQUFVO0FBQ1I7OztBQUdBQyxxQkFKUSwyQkFJUUMsTUFKUixFQUllO0FBQ25CLGFBQUtDLFNBQUwsd0NBQW9ERCxNQUFwRCxvQkFBeUUsS0FBS1gsVUFBOUU7QUFDSDtBQU5PLEssUUFTVmEsTSxHQUFTLEU7Ozs7OzJCQXRCQUMsTyxFQUFTO0FBQUE7O0FBQ1osV0FBS2YsYUFBTCxHQUFxQixLQUFLZ0IsT0FBTCxDQUFhQyxVQUFiLENBQXdCakIsYUFBN0M7QUFDQSxzQkFBSztBQUNEa0IsYUFBSzNCLElBQUk0QjtBQURSLE9BQUwsRUFFR0MsSUFGSCxDQUVRLGVBQU87QUFDWCxlQUFLckIsTUFBTCxHQUFjc0IsSUFBSUMsS0FBSixDQUFVQyxRQUF4QjtBQUNBLGVBQUtDLE1BQUw7QUFDSCxPQUxEO0FBTUg7Ozs2QkFDUTtBQUNMO0FBQ0EsV0FBS3hCLGFBQUwsR0FBcUIsS0FBS2dCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QmpCLGFBQTdDO0FBQ0g7Ozs7RUFuQzhCeUIsZUFBS0MsSTs7a0JBQW5CakMsSyIsImZpbGUiOiJhc3NlbWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ou85ZuiJ1xyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgICAgdG9wSW1nOicnLFxyXG4gICAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgICAgYXNzZW1ibGVJZDogJycsXHJcbiAgICAgIGZsb3dEYXRhOltcclxuICAgICAgICB7aWQ6JzEnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzonMTAwK+S6uuW3suaIkOWboid9LFxyXG4gICAgICAgIHtpZDonMicsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOicxMDAr5Lq65bey5oiQ5ZuiJ30sXHJcbiAgICAgICAge2lkOiczJyx0aXRsZTon6JCM5YiG6K6i5Lmm5py6JyxwcmljZTonNScsZXhwcmljZTonMjUnLGltZzonaW5kZXhpbWcucG5nJyx0YWc6JzEwMCvkurrlt7LmiJDlm6InfSxcclxuICAgICAgICB7aWQ6JzQnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzonMTAwK+S6uuW3suaIkOWboid9LFxyXG4gICAgICAgIHtpZDonNScsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOicxMDAr5Lq65bey5oiQ5ZuiJ30sXHJcbiAgICAgICAge2lkOic2Jyx0aXRsZTon6JCM5YiG6K6i5Lmm5py6JyxwcmljZTonNScsZXhwcmljZTonMjUnLGltZzonaW5kZXhpbWcucG5nJyx0YWc6JzEwMCvkurrlt7LmiJDlm6InfVxyXG4gICAgICBdLFxyXG4gIH07XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7fTtcclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICAgICAgICBhamF4KHtcclxuICAgICAgICAgICAgdXJsOiBhcGkubWVtYmVyUHQsXHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRvcEltZyA9IHJlcy5kYXRhcy5pbWdfYXJlYVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIG9uU2hvdygpIHtcclxuICAgICAgICAvLyB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cclxuICAgICAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsXHJcbiAgICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8qKlxyXG4gICAgKiDot7PovazllYblk4Hor6bmg4VcclxuICAgICovXHJcbiAgICBqdW1wVGltZURldGFpbHMoc2hvcGlkKXtcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZShgL3BhZ2VzL2Fzc2VtYmxlU2hvcERldGFpbHM/c2hvcGlkPSR7c2hvcGlkfSZhc3NlbWJsZUlkPSR7dGhpcy5hc3NlbWJsZUlkfWApXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuIFxyXG59XHJcbiJdfQ==