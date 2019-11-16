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
      navigationBarTitleText: '订单详情'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      requestImgUrl: '',
      order_info: '',
      goods_price: 0
    }, _this.computed = {}, _this.events = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var _this2 = this;

      this.order_id = options.order_id;
      (0, _ajax.ajax)({
        url: api.orderInfo,
        data: {
          order_id: options.order_id
        }
      }).then(function (res) {
        _this2.order_info = res.datas.order_info;
        var goods_price = res.datas.order_info.goods_list.reduce(function (prev, next) {
          var price = Number(next.goods_price);
          var num = Number(next.goods_num);
          return prev + price * num;
        }, 0);
        _this2.goods_price = goods_price.toFixed(2);
        _this2.$apply();
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.requestImgUrl = this.$parent.globalData.requestImgUrl;
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/orderInfo'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVySW5mby5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwib3JkZXJfaW5mbyIsImdvb2RzX3ByaWNlIiwiY29tcHV0ZWQiLCJldmVudHMiLCJtZXRob2RzIiwib3B0aW9ucyIsIm9yZGVyX2lkIiwidXJsIiwib3JkZXJJbmZvIiwidGhlbiIsInJlcyIsImRhdGFzIiwiZ29vZHNfbGlzdCIsInJlZHVjZSIsInByZXYiLCJuZXh0IiwicHJpY2UiLCJOdW1iZXIiLCJudW0iLCJnb29kc19udW0iLCJ0b0ZpeGVkIiwiJGFwcGx5IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUdxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLHFCQUFlLEVBRFY7QUFFTEMsa0JBQVksRUFGUDtBQUdMQyxtQkFBYTtBQUhSLEssUUFNUEMsUSxHQUFXLEUsUUFFWEMsTSxHQUFTLEUsUUF1QlRDLE8sR0FBVSxFOzs7OzsyQkFyQkhDLE8sRUFBUztBQUFBOztBQUNkLFdBQUtDLFFBQUwsR0FBZ0JELFFBQVFDLFFBQXhCO0FBQ0Esc0JBQUs7QUFDSEMsYUFBS2hCLElBQUlpQixTQUROO0FBRUhWLGNBQU07QUFDSlEsb0JBQVVELFFBQVFDO0FBRGQ7QUFGSCxPQUFMLEVBS0dHLElBTEgsQ0FLUSxlQUFPO0FBQ2IsZUFBS1QsVUFBTCxHQUFrQlUsSUFBSUMsS0FBSixDQUFVWCxVQUE1QjtBQUNBLFlBQUlDLGNBQWNTLElBQUlDLEtBQUosQ0FBVVgsVUFBVixDQUFxQlksVUFBckIsQ0FBZ0NDLE1BQWhDLENBQXVDLFVBQUNDLElBQUQsRUFBT0MsSUFBUCxFQUFnQjtBQUN2RSxjQUFJQyxRQUFRQyxPQUFPRixLQUFLZCxXQUFaLENBQVo7QUFDQSxjQUFJaUIsTUFBTUQsT0FBT0YsS0FBS0ksU0FBWixDQUFWO0FBQ0EsaUJBQU9MLE9BQU9FLFFBQU1FLEdBQXBCO0FBQ0QsU0FKaUIsRUFJZixDQUplLENBQWxCO0FBS0EsZUFBS2pCLFdBQUwsR0FBbUJBLFlBQVltQixPQUFaLENBQW9CLENBQXBCLENBQW5CO0FBQ0EsZUFBS0MsTUFBTDtBQUNELE9BZEQ7QUFlRDs7OzZCQUNRO0FBQ1AsV0FBS3RCLGFBQUwsR0FBcUIsS0FBS3VCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QnhCLGFBQTdDO0FBQ0Q7Ozs7RUF0Q2dDeUIsZUFBS0MsSTs7a0JBQW5CaEMsSyIsImZpbGUiOiJvcmRlckluZm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXor6bmg4UnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICBvcmRlcl9pbmZvOiAnJyxcclxuICAgIGdvb2RzX3ByaWNlOiAwLFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgdGhpcy5vcmRlcl9pZCA9IG9wdGlvbnMub3JkZXJfaWRcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5vcmRlckluZm8sXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBvcmRlcl9pZDogb3B0aW9ucy5vcmRlcl9pZFxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMub3JkZXJfaW5mbyA9IHJlcy5kYXRhcy5vcmRlcl9pbmZvXHJcbiAgICAgIHZhciBnb29kc19wcmljZSA9IHJlcy5kYXRhcy5vcmRlcl9pbmZvLmdvb2RzX2xpc3QucmVkdWNlKChwcmV2LCBuZXh0KSA9PiB7XHJcbiAgICAgICAgdmFyIHByaWNlID0gTnVtYmVyKG5leHQuZ29vZHNfcHJpY2UpXHJcbiAgICAgICAgdmFyIG51bSA9IE51bWJlcihuZXh0Lmdvb2RzX251bSlcclxuICAgICAgICByZXR1cm4gcHJldiArIHByaWNlKm51bVxyXG4gICAgICB9LCAwKVxyXG4gICAgICB0aGlzLmdvb2RzX3ByaWNlID0gZ29vZHNfcHJpY2UudG9GaXhlZCgyKVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gIH1cclxuICBtZXRob2RzID0ge307XHJcbn1cclxuIl19