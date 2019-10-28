'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SwiperDelete = function (_wepy$component) {
  _inherits(SwiperDelete, _wepy$component);

  function SwiperDelete() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SwiperDelete);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SwiperDelete.__proto__ || Object.getPrototypeOf(SwiperDelete)).call.apply(_ref, [this].concat(args))), _this), _this.components = {}, _this.props = {
      swiperData: { //父组件传过来的数据
        type: Object,
        default: []
      }
    }, _this.mixins = [], _this.data = {
      delBtnWidth: 180, //单位rpx
      startX: 0
    }, _this.computed = {}, _this.methods = {
      ts: function ts(e) {
        // 触摸开始
        var that = this;
        if (e.touches.length === 1) {
          that.startX = e.touches[0].clientX;
        }
      },
      tm: function tm(e) {
        // 触摸过程
        var that = this;

        if (e.touches.length === 1) {
          //手指移动方向水平
          var moveX = e.touches[0].clientX; // 这里的clientX获取的是屏幕可视区的坐标，其实是逻辑像素px,所以要用getEleWidth方法进行换算

          //手指起始点位置与移动期间的产值
          var disX = that.startX - moveX;
          var txtStyle = '';
          if (disX === 0 || disX < 0) {
            // 往右移动或者没移动
            txtStyle = 'left: 0px';
          } else if (disX > 0) {
            // 移动距离大于0
            txtStyle = 'left:-' + disX + 'px';
            if (disX >= that.delBtnWidth) {
              // 移动超过删除按钮的宽度
              txtStyle = 'left:-' + that.delBtnWidth + 'px';
            }
          }

          //获取手指触摸的是哪一项
          that.swiperData.txtStyle = txtStyle;
        }
      },
      te: function te(e) {
        // 触摸结束
        var that = this;
        if (e.changedTouches.length === 1) {
          //手指移动结束后水平位置
          var endX = e.changedTouches[0].clientX;

          //触摸开始与结束，是指移动的距离
          var disX = that.startX - endX;
          var delBtnWidth = that.delBtnWidth;

          //如果距离小于删除按钮的1/2，不显示删除按钮
          var txtStyle = disX > delBtnWidth / 2 ? 'left:-' + delBtnWidth + 'px' : 'left:0px';
          //手指触摸的是哪一项
          that.swiperData.txtStyle = txtStyle;
        }
      },

      // 删除
      del: function del() {
        this.$emit('getDel', this.swiperData);
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SwiperDelete, [{
    key: 'initEleWidth',
    value: function initEleWidth() {
      var that = this;
      that.delBtnWidth = that.getEleWidth(that.delBtnWidth);
    }
  }, {
    key: 'getEleWidth',
    value: function getEleWidth(w) {
      //获取元素自适应后的实际宽度（也就是根据设计稿宽度换算成px像素）
      var real = 0;
      try {
        var resWidth = wx.getSystemInfoSync().windowWidth;
        var scale = 750 / w;
        real = Math.floor(resWidth / scale);
        return real;
      } catch (e) {
        return false;
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {

      this.initEleWidth();
    }
  }]);

  return SwiperDelete;
}(_wepy2.default.component);

exports.default = SwiperDelete;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlcl9kZWxldGUuanMiXSwibmFtZXMiOlsiU3dpcGVyRGVsZXRlIiwiY29tcG9uZW50cyIsInByb3BzIiwic3dpcGVyRGF0YSIsInR5cGUiLCJPYmplY3QiLCJkZWZhdWx0IiwibWl4aW5zIiwiZGF0YSIsImRlbEJ0bldpZHRoIiwic3RhcnRYIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwidHMiLCJlIiwidGhhdCIsInRvdWNoZXMiLCJsZW5ndGgiLCJjbGllbnRYIiwidG0iLCJtb3ZlWCIsImRpc1giLCJ0eHRTdHlsZSIsInRlIiwiY2hhbmdlZFRvdWNoZXMiLCJlbmRYIiwiZGVsIiwiJGVtaXQiLCJldmVudHMiLCJnZXRFbGVXaWR0aCIsInciLCJyZWFsIiwicmVzV2lkdGgiLCJ3eCIsImdldFN5c3RlbUluZm9TeW5jIiwid2luZG93V2lkdGgiLCJzY2FsZSIsIk1hdGgiLCJmbG9vciIsImluaXRFbGVXaWR0aCIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsVSxHQUFhLEUsUUFFYkMsSyxHQUFRO0FBQ05DLGtCQUFZLEVBQUU7QUFDWkMsY0FBTUMsTUFESTtBQUVWQyxpQkFBUztBQUZDO0FBRE4sSyxRQU9SQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsbUJBQWEsR0FEUixFQUNhO0FBQ2xCQyxjQUFRO0FBRkgsSyxRQUtQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDUkMsUUFEUSxjQUNMQyxDQURLLEVBQ0Y7QUFDSjtBQUNBLFlBQUlDLE9BQU8sSUFBWDtBQUNBLFlBQUlELEVBQUVFLE9BQUYsQ0FBVUMsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUMxQkYsZUFBS0wsTUFBTCxHQUFjSSxFQUFFRSxPQUFGLENBQVUsQ0FBVixFQUFhRSxPQUEzQjtBQUNEO0FBQ0YsT0FQTztBQVFSQyxRQVJRLGNBUUxMLENBUkssRUFRRjtBQUNKO0FBQ0EsWUFBSUMsT0FBTyxJQUFYOztBQUVBLFlBQUlELEVBQUVFLE9BQUYsQ0FBVUMsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBLGNBQUlHLFFBQVFOLEVBQUVFLE9BQUYsQ0FBVSxDQUFWLEVBQWFFLE9BQXpCLENBRjBCLENBRVE7O0FBRWxDO0FBQ0EsY0FBSUcsT0FBT04sS0FBS0wsTUFBTCxHQUFjVSxLQUF6QjtBQUNBLGNBQUlFLFdBQVcsRUFBZjtBQUNBLGNBQUlELFNBQVMsQ0FBVCxJQUFjQSxPQUFPLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0FDLHVCQUFXLFdBQVg7QUFDRCxXQUhELE1BR08sSUFBSUQsT0FBTyxDQUFYLEVBQWM7QUFDbkI7QUFDQUMsdUJBQVcsV0FBV0QsSUFBWCxHQUFrQixJQUE3QjtBQUNBLGdCQUFJQSxRQUFRTixLQUFLTixXQUFqQixFQUE4QjtBQUM1QjtBQUNBYSx5QkFBVyxXQUFXUCxLQUFLTixXQUFoQixHQUE4QixJQUF6QztBQUNEO0FBQ0Y7O0FBRUQ7QUFDQU0sZUFBS1osVUFBTCxDQUFnQm1CLFFBQWhCLEdBQTJCQSxRQUEzQjtBQUNEO0FBQ0YsT0FsQ087QUFtQ1JDLFFBbkNRLGNBbUNMVCxDQW5DSyxFQW1DRjtBQUNKO0FBQ0EsWUFBSUMsT0FBTyxJQUFYO0FBQ0EsWUFBSUQsRUFBRVUsY0FBRixDQUFpQlAsTUFBakIsS0FBNEIsQ0FBaEMsRUFBbUM7QUFDakM7QUFDQSxjQUFJUSxPQUFPWCxFQUFFVSxjQUFGLENBQWlCLENBQWpCLEVBQW9CTixPQUEvQjs7QUFFQTtBQUNBLGNBQUlHLE9BQU9OLEtBQUtMLE1BQUwsR0FBY2UsSUFBekI7QUFDQSxjQUFJaEIsY0FBY00sS0FBS04sV0FBdkI7O0FBRUE7QUFDQSxjQUFJYSxXQUNGRCxPQUFPWixjQUFjLENBQXJCLEdBQXlCLFdBQVdBLFdBQVgsR0FBeUIsSUFBbEQsR0FBeUQsVUFEM0Q7QUFFQTtBQUNBTSxlQUFLWixVQUFMLENBQWdCbUIsUUFBaEIsR0FBMkJBLFFBQTNCO0FBQ0Q7QUFDRixPQXBETzs7QUFxRFI7QUFDQUksU0F0RFEsaUJBc0RGO0FBQ0osYUFBS0MsS0FBTCxDQUFXLFFBQVgsRUFBcUIsS0FBS3hCLFVBQTFCO0FBQ0Q7QUF4RE8sSyxRQTJEVnlCLE0sR0FBUyxFOzs7OzttQ0FDTTtBQUNiLFVBQUliLE9BQU8sSUFBWDtBQUNBQSxXQUFLTixXQUFMLEdBQW1CTSxLQUFLYyxXQUFMLENBQWlCZCxLQUFLTixXQUF0QixDQUFuQjtBQUNEOzs7Z0NBRVdxQixDLEVBQUc7QUFDYjtBQUNBLFVBQUlDLE9BQU8sQ0FBWDtBQUNBLFVBQUk7QUFDRixZQUFJQyxXQUFXQyxHQUFHQyxpQkFBSCxHQUF1QkMsV0FBdEM7QUFDQSxZQUFJQyxRQUFRLE1BQU1OLENBQWxCO0FBQ0FDLGVBQU9NLEtBQUtDLEtBQUwsQ0FBV04sV0FBV0ksS0FBdEIsQ0FBUDtBQUNBLGVBQU9MLElBQVA7QUFDRCxPQUxELENBS0UsT0FBT2pCLENBQVAsRUFBVTtBQUNWLGVBQU8sS0FBUDtBQUNEO0FBQ0Y7Ozs2QkFDUTs7QUFFUCxXQUFLeUIsWUFBTDtBQUNEOzs7O0VBbkd1Q0MsZUFBS0MsUzs7a0JBQTFCekMsWSIsImZpbGUiOiJzd2lwZXJfZGVsZXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3dpcGVyRGVsZXRlIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgcHJvcHMgPSB7XHJcbiAgICBzd2lwZXJEYXRhOiB7IC8v54i257uE5Lu25Lyg6L+H5p2l55qE5pWw5o2uXHJcbiAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgZGVmYXVsdDogW11cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGRlbEJ0bldpZHRoOiAxODAsIC8v5Y2V5L2NcnB4XHJcbiAgICBzdGFydFg6IDAsXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHRzKGUpIHtcclxuICAgICAgLy8g6Kem5pG45byA5aeLXHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICB0aGF0LnN0YXJ0WCA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgdG0oZSkge1xyXG4gICAgICAvLyDop6bmkbjov4fnqItcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAvL+aJi+aMh+enu+WKqOaWueWQkeawtOW5s1xyXG4gICAgICAgIGxldCBtb3ZlWCA9IGUudG91Y2hlc1swXS5jbGllbnRYOyAvLyDov5nph4znmoRjbGllbnRY6I635Y+W55qE5piv5bGP5bmV5Y+v6KeG5Yy655qE5Z2Q5qCH77yM5YW25a6e5piv6YC76L6R5YOP57SgcHgs5omA5Lul6KaB55SoZ2V0RWxlV2lkdGjmlrnms5Xov5vooYzmjaLnrpdcclxuXHJcbiAgICAgICAgLy/miYvmjIfotbflp4vngrnkvY3nva7kuI7np7vliqjmnJ/pl7TnmoTkuqflgLxcclxuICAgICAgICBsZXQgZGlzWCA9IHRoYXQuc3RhcnRYIC0gbW92ZVg7XHJcbiAgICAgICAgbGV0IHR4dFN0eWxlID0gJyc7XHJcbiAgICAgICAgaWYgKGRpc1ggPT09IDAgfHwgZGlzWCA8IDApIHtcclxuICAgICAgICAgIC8vIOW+gOWPs+enu+WKqOaIluiAheayoeenu+WKqFxyXG4gICAgICAgICAgdHh0U3R5bGUgPSAnbGVmdDogMHB4JztcclxuICAgICAgICB9IGVsc2UgaWYgKGRpc1ggPiAwKSB7XHJcbiAgICAgICAgICAvLyDnp7vliqjot53nprvlpKfkuo4wXHJcbiAgICAgICAgICB0eHRTdHlsZSA9ICdsZWZ0Oi0nICsgZGlzWCArICdweCc7XHJcbiAgICAgICAgICBpZiAoZGlzWCA+PSB0aGF0LmRlbEJ0bldpZHRoKSB7XHJcbiAgICAgICAgICAgIC8vIOenu+WKqOi2hei/h+WIoOmZpOaMiemSrueahOWuveW6plxyXG4gICAgICAgICAgICB0eHRTdHlsZSA9ICdsZWZ0Oi0nICsgdGhhdC5kZWxCdG5XaWR0aCArICdweCc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+iOt+WPluaJi+aMh+inpuaRuOeahOaYr+WTquS4gOmhuVxyXG4gICAgICAgIHRoYXQuc3dpcGVyRGF0YS50eHRTdHlsZSA9IHR4dFN0eWxlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGUoZSkge1xyXG4gICAgICAvLyDop6bmkbjnu5PmnZ9cclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBpZiAoZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAvL+aJi+aMh+enu+WKqOe7k+adn+WQjuawtOW5s+S9jee9rlxyXG4gICAgICAgIGxldCBlbmRYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYO1xyXG5cclxuICAgICAgICAvL+inpuaRuOW8gOWni+S4jue7k+adn++8jOaYr+aMh+enu+WKqOeahOi3neemu1xyXG4gICAgICAgIGxldCBkaXNYID0gdGhhdC5zdGFydFggLSBlbmRYO1xyXG4gICAgICAgIGxldCBkZWxCdG5XaWR0aCA9IHRoYXQuZGVsQnRuV2lkdGg7XHJcblxyXG4gICAgICAgIC8v5aaC5p6c6Led56a75bCP5LqO5Yig6Zmk5oyJ6ZKu55qEMS8y77yM5LiN5pi+56S65Yig6Zmk5oyJ6ZKuXHJcbiAgICAgICAgbGV0IHR4dFN0eWxlID1cclxuICAgICAgICAgIGRpc1ggPiBkZWxCdG5XaWR0aCAvIDIgPyAnbGVmdDotJyArIGRlbEJ0bldpZHRoICsgJ3B4JyA6ICdsZWZ0OjBweCc7XHJcbiAgICAgICAgLy/miYvmjIfop6bmkbjnmoTmmK/lk6rkuIDpoblcclxuICAgICAgICB0aGF0LnN3aXBlckRhdGEudHh0U3R5bGUgPSB0eHRTdHlsZTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIOWIoOmZpFxyXG4gICAgZGVsKCkge1xyXG4gICAgICB0aGlzLiRlbWl0KCdnZXREZWwnLCB0aGlzLnN3aXBlckRhdGEpXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbiAgaW5pdEVsZVdpZHRoKCkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgdGhhdC5kZWxCdG5XaWR0aCA9IHRoYXQuZ2V0RWxlV2lkdGgodGhhdC5kZWxCdG5XaWR0aCk7XHJcbiAgfVxyXG5cclxuICBnZXRFbGVXaWR0aCh3KSB7XHJcbiAgICAvL+iOt+WPluWFg+e0oOiHqumAguW6lOWQjueahOWunumZheWuveW6pu+8iOS5n+WwseaYr+agueaNruiuvuiuoeeov+WuveW6puaNoueul+aIkHB45YOP57Sg77yJXHJcbiAgICBsZXQgcmVhbCA9IDA7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgcmVzV2lkdGggPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpLndpbmRvd1dpZHRoO1xyXG4gICAgICBsZXQgc2NhbGUgPSA3NTAgLyB3O1xyXG4gICAgICByZWFsID0gTWF0aC5mbG9vcihyZXNXaWR0aCAvIHNjYWxlKTtcclxuICAgICAgcmV0dXJuIHJlYWw7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgb25Mb2FkKCkge1xyXG4gICAgXHJcbiAgICB0aGlzLmluaXRFbGVXaWR0aCgpO1xyXG4gIH1cclxufVxyXG4iXX0=