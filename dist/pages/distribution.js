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
      navigationBarTitleText: '我的分销'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      requestImgUrl: '',
      bannerArr: ['收入明细', '我的推荐'],
      navIdx: 0,
      topHeight: null, // 吸顶距离
      scrollFlag: false, // 吸顶flag
      isDist: true, // 是否分销员
      state: null,
      txt: ''
    }, _this.computed = {}, _this.methods = {
      changeNav: function changeNav(idx) {
        if (idx == this.navIdx) return;
        this.navIdx = idx;
      },
      distHanld: function distHanld() {
        if (this.state == 1) {
          wx.showToast({
            title: '正在审核中，请勿重复',
            icon: 'none'
          });
          return false;
        }
        this.fxMemberApply();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var _this2 = this;

      var that = this;
      wx.getSystemInfo({
        success: function success(res) {
          var windowWidth = res.windowWidth;
          that.topHeight = 270 / 750 * windowWidth;
          console.log(that.topHeight);
        }
      });
      // 申请成为分销商
      (0, _ajax.ajax)({
        url: api.fxMemberApply
      }).then(function (res) {
        _this2.state = res.datas.state;
        switch (res.datas.state) {
          case 0:
            _this2.txt = '申请成为分销员';
            break;
          default:
            _this2.txt = '重新申请成为分销员';
            break;
        }
        _this2.$apply();
      });
    }
  }, {
    key: 'fxMemberApply',
    value: function fxMemberApply() {
      // 申请成为分销商
      (0, _ajax.ajax)({
        url: api.fxMemberApply,
        data: {
          apply: 1
        }
      }).then(function (res) {
        if (res.datas.state == 1) {
          wx.showToast({
            title: '申请成功'
          });
          var timer = setTimeout(function () {
            wx.navigateBack();
            clearTimeout(timer);
          }, 2000);
        } else {
          wx.showToast({
            msg: res.datas.state,
            icon: 'none'
          });
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onPageScroll',
    value: function onPageScroll(e) {
      var isSatisfy = e.scrollTop >= this.topHeight ? true : false;
      if (this.scrollFlag == isSatisfy) {
        return false;
      }
      this.scrollFlag = isSatisfy;
      this.$apply();
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/distribution'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3RyaWJ1dGlvbi5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwiYmFubmVyQXJyIiwibmF2SWR4IiwidG9wSGVpZ2h0Iiwic2Nyb2xsRmxhZyIsImlzRGlzdCIsInN0YXRlIiwidHh0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiY2hhbmdlTmF2IiwiaWR4IiwiZGlzdEhhbmxkIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJmeE1lbWJlckFwcGx5IiwiZXZlbnRzIiwib3B0aW9ucyIsInRoYXQiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsIndpbmRvd1dpZHRoIiwiY29uc29sZSIsImxvZyIsInVybCIsInRoZW4iLCJkYXRhcyIsIiRhcHBseSIsImFwcGx5IiwidGltZXIiLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiY2xlYXJUaW1lb3V0IiwibXNnIiwiZSIsImlzU2F0aXNmeSIsInNjcm9sbFRvcCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBRXFCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMscUJBQWUsRUFEVjtBQUVMQyxpQkFBVyxDQUFDLE1BQUQsRUFBUyxNQUFULENBRk47QUFHTEMsY0FBUSxDQUhIO0FBSUxDLGlCQUFXLElBSk4sRUFJWTtBQUNqQkMsa0JBQVksS0FMUCxFQUtjO0FBQ25CQyxjQUFRLElBTkgsRUFNUztBQUNkQyxhQUFPLElBUEY7QUFRTEMsV0FBSztBQVJBLEssUUFXUEMsUSxHQUFXLEUsUUFtRFhDLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNFQyxHQURGLEVBQ087QUFDYixZQUFJQSxPQUFPLEtBQUtULE1BQWhCLEVBQXdCO0FBQ3hCLGFBQUtBLE1BQUwsR0FBY1MsR0FBZDtBQUNELE9BSk87QUFLUkMsZUFMUSx1QkFLSTtBQUNWLFlBQUcsS0FBS04sS0FBTCxJQUFjLENBQWpCLEVBQW9CO0FBQ2xCTyxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sWUFESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxhQUFLQyxhQUFMO0FBQ0Q7QUFkTyxLLFFBeUJWQyxNLEdBQVMsRTs7Ozs7MkJBM0VGQyxPLEVBQVM7QUFBQTs7QUFDZCxVQUFJQyxPQUFPLElBQVg7QUFDQVAsU0FBR1EsYUFBSCxDQUFpQjtBQUNmQyxlQURlLG1CQUNQQyxHQURPLEVBQ0Y7QUFDWCxjQUFJQyxjQUFjRCxJQUFJQyxXQUF0QjtBQUNBSixlQUFLakIsU0FBTCxHQUFrQixNQUFNLEdBQVAsR0FBY3FCLFdBQS9CO0FBQ0FDLGtCQUFRQyxHQUFSLENBQVlOLEtBQUtqQixTQUFqQjtBQUNEO0FBTGMsT0FBakI7QUFPQTtBQUNBLHNCQUFLO0FBQ0h3QixhQUFLbkMsSUFBSXlCO0FBRE4sT0FBTCxFQUVHVyxJQUZILENBRVEsZUFBTztBQUNiLGVBQUt0QixLQUFMLEdBQWFpQixJQUFJTSxLQUFKLENBQVV2QixLQUF2QjtBQUNBLGdCQUFRaUIsSUFBSU0sS0FBSixDQUFVdkIsS0FBbEI7QUFDRSxlQUFLLENBQUw7QUFDRSxtQkFBS0MsR0FBTCxHQUFXLFNBQVg7QUFDQTtBQUNGO0FBQ0UsbUJBQUtBLEdBQUwsR0FBVyxXQUFYO0FBQ0E7QUFOSjtBQVFBLGVBQUt1QixNQUFMO0FBQ0QsT0FiRDtBQWNEOzs7b0NBQ2U7QUFDZDtBQUNBLHNCQUFLO0FBQ0hILGFBQUtuQyxJQUFJeUIsYUFETjtBQUVIbEIsY0FBTTtBQUNKZ0MsaUJBQU87QUFESDtBQUZILE9BQUwsRUFLR0gsSUFMSCxDQUtRLGVBQU87QUFDYixZQUFJTCxJQUFJTSxLQUFKLENBQVV2QixLQUFWLElBQW1CLENBQXZCLEVBQTBCO0FBQ3hCTyxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU87QUFESSxXQUFiO0FBR0EsY0FBSWlCLFFBQVFDLFdBQVcsWUFBTTtBQUMzQnBCLGVBQUdxQixZQUFIO0FBQ0FDLHlCQUFhSCxLQUFiO0FBQ0QsV0FIVyxFQUdULElBSFMsQ0FBWjtBQUlELFNBUkQsTUFRTztBQUNMbkIsYUFBR0MsU0FBSCxDQUFhO0FBQ1hzQixpQkFBS2IsSUFBSU0sS0FBSixDQUFVdkIsS0FESjtBQUVYVSxrQkFBTTtBQUZLLFdBQWI7QUFJRDtBQUNGLE9BcEJEO0FBcUJEOzs7NkJBQ1EsQ0FBRTs7O2lDQWlCRXFCLEMsRUFBRztBQUNkLFVBQUlDLFlBQVlELEVBQUVFLFNBQUYsSUFBZSxLQUFLcEMsU0FBcEIsR0FBZ0MsSUFBaEMsR0FBdUMsS0FBdkQ7QUFDQSxVQUFJLEtBQUtDLFVBQUwsSUFBbUJrQyxTQUF2QixFQUFrQztBQUNoQyxlQUFPLEtBQVA7QUFDRDtBQUNELFdBQUtsQyxVQUFMLEdBQWtCa0MsU0FBbEI7QUFDQSxXQUFLUixNQUFMO0FBQ0Q7Ozs7RUE3RmdDVSxlQUFLQyxJOztrQkFBbkIvQyxLIiwiZmlsZSI6ImRpc3RyaWJ1dGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE5YiG6ZSAJ1xyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgYmFubmVyQXJyOiBbJ+aUtuWFpeaYjue7hicsICfmiJHnmoTmjqjojZAnXSxcclxuICAgIG5hdklkeDogMCxcclxuICAgIHRvcEhlaWdodDogbnVsbCwgLy8g5ZC46aG26Led56a7XHJcbiAgICBzY3JvbGxGbGFnOiBmYWxzZSwgLy8g5ZC46aG2ZmxhZ1xyXG4gICAgaXNEaXN0OiB0cnVlLCAvLyDmmK/lkKbliIbplIDlkZhcclxuICAgIHN0YXRlOiBudWxsLFxyXG4gICAgdHh0OiAnJ1xyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIHd4LmdldFN5c3RlbUluZm8oe1xyXG4gICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgIHZhciB3aW5kb3dXaWR0aCA9IHJlcy53aW5kb3dXaWR0aDtcclxuICAgICAgICB0aGF0LnRvcEhlaWdodCA9ICgyNzAgLyA3NTApICogd2luZG93V2lkdGg7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhhdC50b3BIZWlnaHQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIOeUs+ivt+aIkOS4uuWIhumUgOWVhlxyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLmZ4TWVtYmVyQXBwbHlcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IHJlcy5kYXRhcy5zdGF0ZTtcclxuICAgICAgc3dpdGNoIChyZXMuZGF0YXMuc3RhdGUpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICB0aGlzLnR4dCA9ICfnlLPor7fmiJDkuLrliIbplIDlkZgnXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgdGhpcy50eHQgPSAn6YeN5paw55Sz6K+35oiQ5Li65YiG6ZSA5ZGYJ1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGZ4TWVtYmVyQXBwbHkoKSB7XHJcbiAgICAvLyDnlLPor7fmiJDkuLrliIbplIDllYZcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5meE1lbWJlckFwcGx5LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgYXBwbHk6IDFcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLmRhdGFzLnN0YXRlID09IDEpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfnlLPor7fmiJDlip8nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKTtcclxuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcclxuICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgbXNnOiByZXMuZGF0YXMuc3RhdGUsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgb25TaG93KCkge31cclxuICBtZXRob2RzID0ge1xyXG4gICAgY2hhbmdlTmF2KGlkeCkge1xyXG4gICAgICBpZiAoaWR4ID09IHRoaXMubmF2SWR4KSByZXR1cm47XHJcbiAgICAgIHRoaXMubmF2SWR4ID0gaWR4O1xyXG4gICAgfSxcclxuICAgIGRpc3RIYW5sZCgpIHtcclxuICAgICAgaWYodGhpcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn5q2j5Zyo5a6h5qC45Lit77yM6K+35Yu/6YeN5aSNJyxcclxuICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH0gXHJcbiAgICAgIHRoaXMuZnhNZW1iZXJBcHBseSgpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgb25QYWdlU2Nyb2xsKGUpIHtcclxuICAgIHZhciBpc1NhdGlzZnkgPSBlLnNjcm9sbFRvcCA+PSB0aGlzLnRvcEhlaWdodCA/IHRydWUgOiBmYWxzZTtcclxuICAgIGlmICh0aGlzLnNjcm9sbEZsYWcgPT0gaXNTYXRpc2Z5KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuc2Nyb2xsRmxhZyA9IGlzU2F0aXNmeTtcclxuICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgfVxyXG5cclxuICBldmVudHMgPSB7fTtcclxufVxyXG4iXX0=