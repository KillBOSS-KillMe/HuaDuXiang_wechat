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
      navigationBarTitleText: '特约商户'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      storeRecommendList: []
    }, _this.computed = {}, _this.methods = {
      navigate: function navigate() {
        var id = 1;
        this.$navigate({ url: 'merchantIndex?id=' + 1 });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.requestStoreRecommendList();
    }
  }, {
    key: 'requestStoreRecommendList',
    value: function requestStoreRecommendList() {
      var _this2 = this;

      (0, _ajax.ajax)({
        url: api.storeRecommendList
      }).then(function (res) {
        _this2.storeRecommendList = res.datas || [];
        _this2.$apply();
      });
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/merchant'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lcmNoYW50LmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJTaG9wQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInN0b3JlUmVjb21tZW5kTGlzdCIsImNvbXB1dGVkIiwibWV0aG9kcyIsIm5hdmlnYXRlIiwiaWQiLCIkbmF2aWdhdGUiLCJ1cmwiLCJldmVudHMiLCJyZXF1ZXN0U3RvcmVSZWNvbW1lbmRMaXN0IiwidGhlbiIsInJlcyIsImRhdGFzIiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFHcUJDLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQywwQkFBb0I7QUFEZixLLFFBSVBDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSQyxjQURRLHNCQUNHO0FBQ1QsWUFBSUMsS0FBSyxDQUFUO0FBQ0EsYUFBS0MsU0FBTCxDQUFlLEVBQUVDLDJCQUF5QixDQUEzQixFQUFmO0FBQ0Q7QUFKTyxLLFFBT1ZDLE0sR0FBUyxFOzs7Ozs2QkFDQSxDQUFFOzs7NkJBRUY7QUFDSCxXQUFLQyx5QkFBTDtBQUNMOzs7Z0RBQzBCO0FBQUE7O0FBQ3pCLHNCQUFLO0FBQ0hGLGFBQUtkLElBQUlRO0FBRE4sT0FBTCxFQUVHUyxJQUZILENBRVEsZUFBTztBQUNiLGVBQUtULGtCQUFMLEdBQTBCVSxJQUFJQyxLQUFKLElBQWEsRUFBdkM7QUFDQSxlQUFLQyxNQUFMO0FBQ0QsT0FMRDtBQU1EOzs7O0VBbkNtQ0MsZUFBS0MsSTs7a0JBQXRCcEIsUSIsImZpbGUiOiJtZXJjaGFudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eJuee6puWVhuaItydcclxuICB9O1xyXG5cclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgc3RvcmVSZWNvbW1lbmRMaXN0OiBbXVxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBuYXZpZ2F0ZSgpIHtcclxuICAgICAgdmFyIGlkID0gMVxyXG4gICAgICB0aGlzLiRuYXZpZ2F0ZSh7IHVybDogYG1lcmNoYW50SW5kZXg/aWQ9JHsxfWAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcbiAgb25TaG93KCkge31cclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucmVxdWVzdFN0b3JlUmVjb21tZW5kTGlzdCgpXHJcbiAgfVxyXG4gIHJlcXVlc3RTdG9yZVJlY29tbWVuZExpc3QoKXtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5zdG9yZVJlY29tbWVuZExpc3QsXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmVSZWNvbW1lbmRMaXN0ID0gcmVzLmRhdGFzIHx8IFtdXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==