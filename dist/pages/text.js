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

var ShopCart = function (_wepy$page) {
  _inherits(ShopCart, _wepy$page);

  function ShopCart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ShopCart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShopCart.__proto__ || Object.getPrototypeOf(ShopCart)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '会员'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      requestImgUrl: '',

      num: 8, //这是当前有几个人
      p: 0,
      jindutiao: [//这个是进度条的标准，刻度
      {
        num: 3,
        price: '999'
      }, {
        num: 5,
        price: '799'
      }, {
        num: 10,
        price: '599'
      }]
    }, _this.computed = {}, _this.methods = {
      jindutiao: function jindutiao() {
        var jindutiao = this.data.jindutiao;
        var num = this.datanum;
        var p = this.data.p;
        for (var i = 0; i < jindutiao.length; i++) {
          if (jindutiao[i].num > num) {
            p = i;
            break;
          }
        }
        if (i == jindutiao.length) {
          p = i;
        }
        for (var j = 0; j < p; j++) {
          jindutiao[j].statu = true;
        }
        if (p == 0) {
          num = 0.5 / jindutiao.length * 100;
        } else if (jindutiao[p - 1].num < num) {
          num = (p + 0.5) / jindutiao.length * 100;
          //毕竟不是当前进度等分，所以让他在等于8，7，6的时候也能在中间。就加0.5
        } else {
          num = p / jindutiao.length * 100;
          //当前黄色进度长度就是当前人数除以总人数乘以100，就是进度条宽度的百分比。
        }
        this.data.width = num;
        this.data.p = p;
        this.data.jindutiao = jindutiao;
        // this.setData({
        // width: num,
        // p: p,
        // jindutiao: jindutiao
        // })
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onLoad',
    value: function onLoad() {
      this.jindutiao();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      // this.userInfo = this.$parent.globalData.userInfo
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);

exports.default = ShopCart;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHQuanMiXSwibmFtZXMiOlsiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwibnVtIiwicCIsImppbmR1dGlhbyIsInByaWNlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZGF0YW51bSIsImkiLCJsZW5ndGgiLCJqIiwic3RhdHUiLCJ3aWR0aCIsImV2ZW50cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLFUsR0FBYSxFLFFBR2JDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxxQkFBZSxFQURWOztBQUdMQyxXQUFLLENBSEEsRUFHRTtBQUNQQyxTQUFHLENBSkU7QUFLTEMsaUJBQVcsQ0FBRztBQUNaO0FBQ0NGLGFBQUksQ0FETDtBQUVDRyxlQUFNO0FBRlAsT0FEUyxFQUtUO0FBQ0VILGFBQUssQ0FEUDtBQUVFRyxlQUFPO0FBRlQsT0FMUyxFQVNUO0FBQ0VILGFBQUssRUFEUDtBQUVFRyxlQUFPO0FBRlQsT0FUUztBQUxOLEssUUFxQlBDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSSCxlQURRLHVCQUNJO0FBQ1IsWUFBSUEsWUFBWSxLQUFLSixJQUFMLENBQVVJLFNBQTFCO0FBQ0EsWUFBSUYsTUFBTSxLQUFLTSxPQUFmO0FBQ0EsWUFBSUwsSUFBSSxLQUFLSCxJQUFMLENBQVVHLENBQWxCO0FBQ0EsYUFBSyxJQUFJTSxJQUFJLENBQWIsRUFBZ0JBLElBQUlMLFVBQVVNLE1BQTlCLEVBQXNDRCxHQUF0QyxFQUEyQztBQUN2QyxjQUFJTCxVQUFVSyxDQUFWLEVBQWFQLEdBQWIsR0FBbUJBLEdBQXZCLEVBQTRCO0FBQ3hCQyxnQkFBSU0sQ0FBSjtBQUNBO0FBQ0g7QUFDSjtBQUNELFlBQUlBLEtBQUtMLFVBQVVNLE1BQW5CLEVBQTJCO0FBQUVQLGNBQUlNLENBQUo7QUFBUTtBQUNyQyxhQUFLLElBQUlFLElBQUksQ0FBYixFQUFnQkEsSUFBSVIsQ0FBcEIsRUFBdUJRLEdBQXZCLEVBQTRCO0FBQ3hCUCxvQkFBVU8sQ0FBVixFQUFhQyxLQUFiLEdBQXFCLElBQXJCO0FBQ0g7QUFDRCxZQUFJVCxLQUFLLENBQVQsRUFBWTtBQUNSRCxnQkFBTSxNQUFNRSxVQUFVTSxNQUFoQixHQUF5QixHQUEvQjtBQUVILFNBSEQsTUFHTyxJQUFJTixVQUFVRCxJQUFJLENBQWQsRUFBaUJELEdBQWpCLEdBQXVCQSxHQUEzQixFQUFnQztBQUNuQ0EsZ0JBQU0sQ0FBQ0MsSUFBSSxHQUFMLElBQVlDLFVBQVVNLE1BQXRCLEdBQStCLEdBQXJDO0FBQ0o7QUFDQyxTQUhNLE1BR0E7QUFDSFIsZ0JBQU1DLElBQUlDLFVBQVVNLE1BQWQsR0FBdUIsR0FBN0I7QUFDSjtBQUNDO0FBQ0QsYUFBS1YsSUFBTCxDQUFVYSxLQUFWLEdBQWtCWCxHQUFsQjtBQUNBLGFBQUtGLElBQUwsQ0FBVUcsQ0FBVixHQUFjQSxDQUFkO0FBQ0EsYUFBS0gsSUFBTCxDQUFVSSxTQUFWLEdBQXNCQSxTQUF0QjtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUDtBQWpDTyxLLFFBNENWVSxNLEdBQVMsRTs7Ozs7NkJBUkQ7QUFDSixXQUFLVixTQUFMO0FBQ0g7Ozs2QkFDUTtBQUNEO0FBQ0osV0FBS0gsYUFBTCxHQUFxQixLQUFLYyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JmLGFBQTdDO0FBQ0g7Ozs7RUEzRW1DZ0IsZUFBS0MsSTs7a0JBQXRCdkIsUSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvJrlkZgnXHJcbiAgfTtcclxuXHJcbiAgY29tcG9uZW50cyA9IHtcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG5cclxuICAgIG51bTogOCwvL+i/meaYr+W9k+WJjeacieWHoOS4quS6ulxyXG4gICAgcDogMCxcclxuICAgIGppbmR1dGlhbzogWyAgLy/ov5nkuKrmmK/ov5vluqbmnaHnmoTmoIflh4bvvIzliLvluqZcclxuICAgICAge1xyXG4gICAgICAgbnVtOjMsXHJcbiAgICAgICBwcmljZTonOTk5J1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgbnVtOiA1LFxyXG4gICAgICAgIHByaWNlOiAnNzk5J1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgbnVtOiAxMCxcclxuICAgICAgICBwcmljZTogJzU5OSdcclxuICAgICAgfVxyXG4gICAgICBdLFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBqaW5kdXRpYW8oKSB7XHJcbiAgICAgICAgdmFyIGppbmR1dGlhbyA9IHRoaXMuZGF0YS5qaW5kdXRpYW87XHJcbiAgICAgICAgdmFyIG51bSA9IHRoaXMuZGF0YW51bTtcclxuICAgICAgICB2YXIgcCA9IHRoaXMuZGF0YS5wO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgamluZHV0aWFvLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChqaW5kdXRpYW9baV0ubnVtID4gbnVtKSB7XHJcbiAgICAgICAgICAgICAgICBwID0gaTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpID09IGppbmR1dGlhby5sZW5ndGgpIHsgcCA9IGk7IH1cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHA7IGorKykge1xyXG4gICAgICAgICAgICBqaW5kdXRpYW9bal0uc3RhdHUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocCA9PSAwKSB7IFxyXG4gICAgICAgICAgICBudW0gPSAwLjUgLyBqaW5kdXRpYW8ubGVuZ3RoICogMTAwOyBcclxuICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKGppbmR1dGlhb1twIC0gMV0ubnVtIDwgbnVtKSB7XHJcbiAgICAgICAgICAgIG51bSA9IChwICsgMC41KSAvIGppbmR1dGlhby5sZW5ndGggKiAxMDA7XHJcbiAgICAgICAgLy/mr5Xnq5/kuI3mmK/lvZPliY3ov5vluqbnrYnliIbvvIzmiYDku6Xorqnku5blnKjnrYnkuo4477yMN++8jDbnmoTml7blgJnkuZ/og73lnKjkuK3pl7TjgILlsLHliqAwLjVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBudW0gPSBwIC8gamluZHV0aWFvLmxlbmd0aCAqIDEwMDtcclxuICAgICAgICAvL+W9k+WJjem7hOiJsui/m+W6pumVv+W6puWwseaYr+W9k+WJjeS6uuaVsOmZpOS7peaAu+S6uuaVsOS5mOS7pTEwMO+8jOWwseaYr+i/m+W6puadoeWuveW6pueahOeZvuWIhuavlOOAglxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRhdGEud2lkdGggPSBudW1cclxuICAgICAgICB0aGlzLmRhdGEucCA9IHBcclxuICAgICAgICB0aGlzLmRhdGEuamluZHV0aWFvID0gamluZHV0aWFvXHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIC8vIHdpZHRoOiBudW0sXHJcbiAgICAgICAgICAgIC8vIHA6IHAsXHJcbiAgICAgICAgICAgIC8vIGppbmR1dGlhbzogamluZHV0aWFvXHJcbiAgICAgICAgICAgIC8vIH0pXHJcbiAgICB9XHJcblxyXG4gIH07XHJcbiAgb25Mb2FkKCl7XHJcbiAgICAgIHRoaXMuamluZHV0aWFvKCk7XHJcbiAgfVxyXG4gIG9uU2hvdygpIHtcclxuICAgICAgICAgIC8vIHRoaXMudXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mb1xyXG4gICAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsXHJcbiAgfVxyXG5cclxuICBldmVudHMgPSB7fTtcclxufVxyXG4iXX0=