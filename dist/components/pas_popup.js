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
        if (newValue) {
          this.focus = true;
        } else {
          this.focus = false;
        }
        this.pasArr = ['', '', '', '', '', ''];
        this.pasvalue = '';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhc19wb3B1cC5qcyJdLCJuYW1lcyI6WyJQYW5lbCIsImRhdGEiLCJmb2N1cyIsInBhc0FyciIsInBhc3ZhbHVlIiwicHJvcHMiLCJwYXNGbGFnIiwidHlwZSIsIkJvb2xlYW4iLCJkZWZhdWx0IiwidHdvV2F5IiwicGFzUHJpY2UiLCJTdHJpbmciLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJwYXMiLCJtYXNrIiwibnVtIiwid2F0Y2giLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwibWV0aG9kcyIsImhpZGVNYXNrIiwib25Gb2N1cyIsImJpbmRibHVyIiwiZSIsImJpbmRpbnB1dCIsImFyciIsImRldGFpbCIsInZhbHVlIiwic3BsaXQiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJ1bmRlZmluZWQiLCJ2YWwiLCJ0b1N0cmluZyIsImxlbmd0aCIsIiRlbWl0Iiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLEksR0FBTztBQUNMQyxhQUFPLEtBREY7QUFFTEMsY0FBUSxDQUFDLEVBQUQsRUFBSSxFQUFKLEVBQU8sRUFBUCxFQUFVLEVBQVYsRUFBYSxFQUFiLEVBQWdCLEVBQWhCLENBRkg7QUFHTEMsZ0JBQVU7QUFITCxLLFFBS1BDLEssR0FBUTtBQUNOQyxlQUFTO0FBQ1BDLGNBQU1DLE9BREM7QUFFUEMsaUJBQVMsS0FGRjtBQUdQQyxnQkFBUTtBQUhELE9BREg7QUFNTkMsZ0JBQVU7QUFDUkosY0FBTUssTUFERTtBQUVSSCxpQkFBUztBQUZEO0FBTkosSyxRQVdUSSxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxPQUFNLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFNBQTFDLEVBQVAsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkMsV0FBS0MsY0FESztBQUVWQyxXQUFLRDtBQUZLLEssUUFJWkUsSyxHQUFRO0FBQ05kLGFBRE0sbUJBQ0dlLFFBREgsRUFDYUMsUUFEYixFQUN1QjtBQUMzQixZQUFHRCxRQUFILEVBQWE7QUFDWCxlQUFLbkIsS0FBTCxHQUFhLElBQWI7QUFDRCxTQUZELE1BRU87QUFDTCxlQUFLQSxLQUFMLEdBQWEsS0FBYjtBQUNEO0FBQ0QsYUFBS0MsTUFBTCxHQUFjLENBQUMsRUFBRCxFQUFJLEVBQUosRUFBTyxFQUFQLEVBQVUsRUFBVixFQUFhLEVBQWIsRUFBZ0IsRUFBaEIsQ0FBZDtBQUNBLGFBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDRDtBQVRLLEssUUFXUm1CLE8sR0FBVTtBQUNSQyxjQURRLHNCQUNHO0FBQ1QsYUFBS2xCLE9BQUwsR0FBZSxLQUFmO0FBQ0QsT0FITztBQUlSbUIsYUFKUSxxQkFJRTtBQUNSLGFBQUt2QixLQUFMLEdBQWEsSUFBYjtBQUNELE9BTk87QUFPUndCLGNBUFEsb0JBT0NDLENBUEQsRUFPSTtBQUNWLGFBQUt6QixLQUFMLEdBQWEsS0FBYjtBQUNELE9BVE87QUFVUjBCLGVBVlEscUJBVUVELENBVkYsRUFVSztBQUNYLFlBQUlFLE1BQU1GLEVBQUVHLE1BQUYsQ0FBU0MsS0FBVCxDQUFlQyxLQUFmLENBQXFCLEVBQXJCLENBQVY7QUFDQSxZQUFJN0IsU0FBUyxLQUFLQSxNQUFMLENBQVk4QixHQUFaLENBQWdCLFVBQUNDLElBQUQsRUFBT0MsS0FBUCxFQUFpQjtBQUM1QyxpQkFBT04sSUFBSU0sS0FBSixLQUFjQyxTQUFkLEdBQTBCLEVBQTFCLEdBQStCLEdBQXRDO0FBQ0QsU0FGWSxDQUFiO0FBR0EsWUFBSUMsTUFBTVYsRUFBRUcsTUFBRixDQUFTQyxLQUFuQjtBQUNBLGFBQUszQixRQUFMLEdBQWdCaUMsR0FBaEI7QUFDQSxhQUFLbEMsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsWUFBR2tDLElBQUlDLFFBQUosR0FBZUMsTUFBZixJQUF5QixDQUE1QixFQUErQjtBQUM3QixlQUFLQyxLQUFMLENBQVcsVUFBWCxFQUF1QkgsR0FBdkI7QUFDRDtBQUNGO0FBckJPLEs7Ozs7OzZCQXVCRCxDQUNSOzs7O0VBM0RnQ0ksZUFBS0MsUzs7a0JBQW5CMUMsSyIsImZpbGUiOiJwYXNfcG9wdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBtYXNrIGZyb20gJy4uL2NvbXBvbmVudHMvbWFzayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYW5lbCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICBkYXRhID0ge1xyXG4gICAgZm9jdXM6IGZhbHNlLFxyXG4gICAgcGFzQXJyOiBbJycsJycsJycsJycsJycsJyddLFxyXG4gICAgcGFzdmFsdWU6ICcnLFxyXG4gIH07XHJcbiAgcHJvcHMgPSB7XHJcbiAgICBwYXNGbGFnOiB7XHJcbiAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0d29XYXk6IHRydWVcclxuICAgIH0sXHJcbiAgICBwYXNQcmljZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGRlZmF1bHQ6IDBcclxuICAgIH1cclxuICB9XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInBhc1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bWFza0ZsYWcuc3luY1wiOlwicGFzRmxhZ1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBwYXM6IG1hc2ssXHJcbiAgICBudW06IG1hc2tcclxuICB9O1xyXG4gIHdhdGNoID0ge1xyXG4gICAgcGFzRmxhZyAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XHJcbiAgICAgIGlmKG5ld1ZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5mb2N1cyA9IHRydWVcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnBhc0FyciA9IFsnJywnJywnJywnJywnJywnJ11cclxuICAgICAgdGhpcy5wYXN2YWx1ZSA9ICcnXHJcbiAgICB9XHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBoaWRlTWFzaygpIHtcclxuICAgICAgdGhpcy5wYXNGbGFnID0gZmFsc2VcclxuICAgIH0sXHJcbiAgICBvbkZvY3VzKCkge1xyXG4gICAgICB0aGlzLmZvY3VzID0gdHJ1ZVxyXG4gICAgfSxcclxuICAgIGJpbmRibHVyKGUpIHtcclxuICAgICAgdGhpcy5mb2N1cyA9IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgYmluZGlucHV0KGUpIHtcclxuICAgICAgdmFyIGFyciA9IGUuZGV0YWlsLnZhbHVlLnNwbGl0KCcnKVxyXG4gICAgICB2YXIgcGFzQXJyID0gdGhpcy5wYXNBcnIubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBhcnJbaW5kZXhdID09IHVuZGVmaW5lZCA/ICcnIDogJyonXHJcbiAgICAgIH0pXHJcbiAgICAgIHZhciB2YWwgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB0aGlzLnBhc3ZhbHVlID0gdmFsXHJcbiAgICAgIHRoaXMucGFzQXJyID0gcGFzQXJyXHJcbiAgICAgIGlmKHZhbC50b1N0cmluZygpLmxlbmd0aCA9PSA2KSB7XHJcbiAgICAgICAgdGhpcy4kZW1pdCgncGFzSGFubGQnLCB2YWwpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgb25Mb2FkKCkge1xyXG4gIH1cclxufVxyXG4iXX0=