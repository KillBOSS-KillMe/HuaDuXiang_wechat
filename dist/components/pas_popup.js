'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mask = require('./mask.js');

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = function (_wepy$component) {
  _inherits(Panel, _wepy$component);

  function Panel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Panel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Panel.__proto__ || Object.getPrototypeOf(Panel)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      focus: false,
      pasArr: ['', '', '', '', '', ''],
      pasvalue: ''
    }, _this.props = {
      pasFlag: {
        type: Boolean,
        default: false,
        twoWay: true
      },
      pasPrice: {
        type: String,
        default: 0
      }
    }, _this.$repeat = {}, _this.$props = { "pas": { "xmlns:v-bind": "", "v-bind:maskFlag.sync": "pasFlag" } }, _this.$events = {}, _this.components = {
      pas: _mask2.default,
      num: _mask2.default
    }, _this.watch = {
      pasFlag: function pasFlag(newValue, oldValue) {
        console.log(newValue, oldValue);
        if (newValue) {
          this.focus = true;
        } else {
          this.focus = false;
        }
        this.pasArr = ['', '', '', '', '', ''];
        this.pasvalue = '';
        this.$apply();
      }
    }, _this.methods = {
      hideMask: function hideMask() {
        this.pasFlag = false;
      },
      onFocus: function onFocus() {
        this.focus = true;
      },
      bindblur: function bindblur(e) {
        this.focus = false;
      },
      bindinput: function bindinput(e) {
        var arr = e.detail.value.split('');
        var pasArr = this.pasArr.map(function (item, index) {
          return arr[index] == undefined ? '' : '*';
        });
        var val = e.detail.value;
        this.pasvalue = val;
        this.pasArr = pasArr;
        if (val.toString().length == 6) {
          this.$emit('pasHanld', val);
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Panel, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Panel;
}(_wepy2.default.component);

exports.default = Panel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhc19wb3B1cC5qcyJdLCJuYW1lcyI6WyJQYW5lbCIsImRhdGEiLCJmb2N1cyIsInBhc0FyciIsInBhc3ZhbHVlIiwicHJvcHMiLCJwYXNGbGFnIiwidHlwZSIsIkJvb2xlYW4iLCJkZWZhdWx0IiwidHdvV2F5IiwicGFzUHJpY2UiLCJTdHJpbmciLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJwYXMiLCJtYXNrIiwibnVtIiwid2F0Y2giLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsIm1ldGhvZHMiLCJoaWRlTWFzayIsIm9uRm9jdXMiLCJiaW5kYmx1ciIsImUiLCJiaW5kaW5wdXQiLCJhcnIiLCJkZXRhaWwiLCJ2YWx1ZSIsInNwbGl0IiwibWFwIiwiaXRlbSIsImluZGV4IiwidW5kZWZpbmVkIiwidmFsIiwidG9TdHJpbmciLCJsZW5ndGgiLCIkZW1pdCIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxJLEdBQU87QUFDTEMsYUFBTyxLQURGO0FBRUxDLGNBQVEsQ0FBQyxFQUFELEVBQUksRUFBSixFQUFPLEVBQVAsRUFBVSxFQUFWLEVBQWEsRUFBYixFQUFnQixFQUFoQixDQUZIO0FBR0xDLGdCQUFVO0FBSEwsSyxRQUtQQyxLLEdBQVE7QUFDTkMsZUFBUztBQUNQQyxjQUFNQyxPQURDO0FBRVBDLGlCQUFTLEtBRkY7QUFHUEMsZ0JBQVE7QUFIRCxPQURIO0FBTU5DLGdCQUFVO0FBQ1JKLGNBQU1LLE1BREU7QUFFUkgsaUJBQVM7QUFGRDtBQU5KLEssUUFXVEksTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsT0FBTSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHdCQUF1QixTQUExQyxFQUFQLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLFdBQUtDLGNBREs7QUFFVkMsV0FBS0Q7QUFGSyxLLFFBSVpFLEssR0FBUTtBQUNOZCxhQURNLG1CQUNHZSxRQURILEVBQ2FDLFFBRGIsRUFDdUI7QUFDM0JDLGdCQUFRQyxHQUFSLENBQVlILFFBQVosRUFBc0JDLFFBQXRCO0FBQ0EsWUFBR0QsUUFBSCxFQUFhO0FBQ1gsZUFBS25CLEtBQUwsR0FBYSxJQUFiO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZUFBS0EsS0FBTCxHQUFhLEtBQWI7QUFDRDtBQUNELGFBQUtDLE1BQUwsR0FBYyxDQUFDLEVBQUQsRUFBSSxFQUFKLEVBQU8sRUFBUCxFQUFVLEVBQVYsRUFBYSxFQUFiLEVBQWdCLEVBQWhCLENBQWQ7QUFDQSxhQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsYUFBS3FCLE1BQUw7QUFDRDtBQVhLLEssUUFhUkMsTyxHQUFVO0FBQ1JDLGNBRFEsc0JBQ0c7QUFDVCxhQUFLckIsT0FBTCxHQUFlLEtBQWY7QUFDRCxPQUhPO0FBSVJzQixhQUpRLHFCQUlFO0FBQ1IsYUFBSzFCLEtBQUwsR0FBYSxJQUFiO0FBQ0QsT0FOTztBQU9SMkIsY0FQUSxvQkFPQ0MsQ0FQRCxFQU9JO0FBQ1YsYUFBSzVCLEtBQUwsR0FBYSxLQUFiO0FBQ0QsT0FUTztBQVVSNkIsZUFWUSxxQkFVRUQsQ0FWRixFQVVLO0FBQ1gsWUFBSUUsTUFBTUYsRUFBRUcsTUFBRixDQUFTQyxLQUFULENBQWVDLEtBQWYsQ0FBcUIsRUFBckIsQ0FBVjtBQUNBLFlBQUloQyxTQUFTLEtBQUtBLE1BQUwsQ0FBWWlDLEdBQVosQ0FBZ0IsVUFBQ0MsSUFBRCxFQUFPQyxLQUFQLEVBQWlCO0FBQzVDLGlCQUFPTixJQUFJTSxLQUFKLEtBQWNDLFNBQWQsR0FBMEIsRUFBMUIsR0FBK0IsR0FBdEM7QUFDRCxTQUZZLENBQWI7QUFHQSxZQUFJQyxNQUFNVixFQUFFRyxNQUFGLENBQVNDLEtBQW5CO0FBQ0EsYUFBSzlCLFFBQUwsR0FBZ0JvQyxHQUFoQjtBQUNBLGFBQUtyQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxZQUFHcUMsSUFBSUMsUUFBSixHQUFlQyxNQUFmLElBQXlCLENBQTVCLEVBQStCO0FBQzdCLGVBQUtDLEtBQUwsQ0FBVyxVQUFYLEVBQXVCSCxHQUF2QjtBQUNEO0FBQ0Y7QUFyQk8sSzs7Ozs7NkJBdUJELENBQ1I7Ozs7RUE3RGdDSSxlQUFLQyxTOztrQkFBbkI3QyxLIiwiZmlsZSI6InBhc19wb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IG1hc2sgZnJvbSAnLi4vY29tcG9uZW50cy9tYXNrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbmVsIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gIGRhdGEgPSB7XHJcbiAgICBmb2N1czogZmFsc2UsXHJcbiAgICBwYXNBcnI6IFsnJywnJywnJywnJywnJywnJ10sXHJcbiAgICBwYXN2YWx1ZTogJycsXHJcbiAgfTtcclxuICBwcm9wcyA9IHtcclxuICAgIHBhc0ZsYWc6IHtcclxuICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR3b1dheTogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHBhc1ByaWNlOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZGVmYXVsdDogMFxyXG4gICAgfVxyXG4gIH1cclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wicGFzXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDptYXNrRmxhZy5zeW5jXCI6XCJwYXNGbGFnXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIHBhczogbWFzayxcclxuICAgIG51bTogbWFza1xyXG4gIH07XHJcbiAgd2F0Y2ggPSB7XHJcbiAgICBwYXNGbGFnIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgICAgY29uc29sZS5sb2cobmV3VmFsdWUsIG9sZFZhbHVlKVxyXG4gICAgICBpZihuZXdWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZm9jdXMgPSB0cnVlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5mb2N1cyA9IGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wYXNBcnIgPSBbJycsJycsJycsJycsJycsJyddXHJcbiAgICAgIHRoaXMucGFzdmFsdWUgPSAnJ1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBoaWRlTWFzaygpIHtcclxuICAgICAgdGhpcy5wYXNGbGFnID0gZmFsc2VcclxuICAgIH0sXHJcbiAgICBvbkZvY3VzKCkge1xyXG4gICAgICB0aGlzLmZvY3VzID0gdHJ1ZVxyXG4gICAgfSxcclxuICAgIGJpbmRibHVyKGUpIHtcclxuICAgICAgdGhpcy5mb2N1cyA9IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgYmluZGlucHV0KGUpIHtcclxuICAgICAgdmFyIGFyciA9IGUuZGV0YWlsLnZhbHVlLnNwbGl0KCcnKVxyXG4gICAgICB2YXIgcGFzQXJyID0gdGhpcy5wYXNBcnIubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBhcnJbaW5kZXhdID09IHVuZGVmaW5lZCA/ICcnIDogJyonXHJcbiAgICAgIH0pXHJcbiAgICAgIHZhciB2YWwgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB0aGlzLnBhc3ZhbHVlID0gdmFsXHJcbiAgICAgIHRoaXMucGFzQXJyID0gcGFzQXJyXHJcbiAgICAgIGlmKHZhbC50b1N0cmluZygpLmxlbmd0aCA9PSA2KSB7XHJcbiAgICAgICAgdGhpcy4kZW1pdCgncGFzSGFubGQnLCB2YWwpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgb25Mb2FkKCkge1xyXG4gIH1cclxufVxyXG4iXX0=