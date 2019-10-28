'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      requestImgUrl: '',
      assembleId: '',
      flowData: [{ id: '1', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }, { id: '2', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }, { id: '3', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }, { id: '4', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }, { id: '5', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }, { id: '6', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }]
    }, _this.computed = {}, _this.methods = {
      /**
      * 跳转商品详情
      */
      jumpTimeDetails: function jumpTimeDetails(shopid) {
        //   console.log(shopid)
        console.log('拼团', this.assembleId);
        this.$navigate('/pages/assembleShopDetails?shopid=' + shopid + '&assembleId=' + this.assembleId);
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.assembleId = options.id;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2VtYmxlLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwicmVxdWVzdEltZ1VybCIsImFzc2VtYmxlSWQiLCJmbG93RGF0YSIsImlkIiwidGl0bGUiLCJwcmljZSIsImV4cHJpY2UiLCJpbWciLCJ0YWciLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJqdW1wVGltZURldGFpbHMiLCJzaG9waWQiLCJjb25zb2xlIiwibG9nIiwiJG5hdmlnYXRlIiwiZXZlbnRzIiwib3B0aW9ucyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNIQyxxQkFBZSxFQURaO0FBRUhDLGtCQUFZLEVBRlQ7QUFHSEMsZ0JBQVMsQ0FDUCxFQUFDQyxJQUFHLEdBQUosRUFBUUMsT0FBTSxPQUFkLEVBQXNCQyxPQUFNLEdBQTVCLEVBQWdDQyxTQUFRLElBQXhDLEVBQTZDQyxLQUFJLGNBQWpELEVBQWdFQyxLQUFJLFVBQXBFLEVBRE8sRUFFUCxFQUFDTCxJQUFHLEdBQUosRUFBUUMsT0FBTSxPQUFkLEVBQXNCQyxPQUFNLEdBQTVCLEVBQWdDQyxTQUFRLElBQXhDLEVBQTZDQyxLQUFJLGNBQWpELEVBQWdFQyxLQUFJLFVBQXBFLEVBRk8sRUFHUCxFQUFDTCxJQUFHLEdBQUosRUFBUUMsT0FBTSxPQUFkLEVBQXNCQyxPQUFNLEdBQTVCLEVBQWdDQyxTQUFRLElBQXhDLEVBQTZDQyxLQUFJLGNBQWpELEVBQWdFQyxLQUFJLFVBQXBFLEVBSE8sRUFJUCxFQUFDTCxJQUFHLEdBQUosRUFBUUMsT0FBTSxPQUFkLEVBQXNCQyxPQUFNLEdBQTVCLEVBQWdDQyxTQUFRLElBQXhDLEVBQTZDQyxLQUFJLGNBQWpELEVBQWdFQyxLQUFJLFVBQXBFLEVBSk8sRUFLUCxFQUFDTCxJQUFHLEdBQUosRUFBUUMsT0FBTSxPQUFkLEVBQXNCQyxPQUFNLEdBQTVCLEVBQWdDQyxTQUFRLElBQXhDLEVBQTZDQyxLQUFJLGNBQWpELEVBQWdFQyxLQUFJLFVBQXBFLEVBTE8sRUFNUCxFQUFDTCxJQUFHLEdBQUosRUFBUUMsT0FBTSxPQUFkLEVBQXNCQyxPQUFNLEdBQTVCLEVBQWdDQyxTQUFRLElBQXhDLEVBQTZDQyxLQUFJLGNBQWpELEVBQWdFQyxLQUFJLFVBQXBFLEVBTk87QUFITixLLFFBYUxDLFEsR0FBVyxFLFFBUWJDLE8sR0FBVTtBQUNSOzs7QUFHQUMscUJBSlEsMkJBSVFDLE1BSlIsRUFJZTtBQUN2QjtBQUNBQyxnQkFBUUMsR0FBUixDQUFZLElBQVosRUFBaUIsS0FBS2IsVUFBdEI7QUFDQSxhQUFLYyxTQUFMLHdDQUFvREgsTUFBcEQsb0JBQXlFLEtBQUtYLFVBQTlFO0FBQ0M7QUFSTyxLLFFBV1ZlLE0sR0FBUyxFOzs7OzsyQkFsQkFDLE8sRUFBUztBQUNaLFdBQUtoQixVQUFMLEdBQWtCZ0IsUUFBUWQsRUFBMUI7QUFDSDs7OzZCQUNRO0FBQ0w7QUFDQSxXQUFLSCxhQUFMLEdBQXFCLEtBQUtrQixPQUFMLENBQWFDLFVBQWIsQ0FBd0JuQixhQUE3QztBQUNIOzs7O0VBNUI4Qm9CLGVBQUtDLEk7O2tCQUFuQjNCLEsiLCJmaWxlIjoiYXNzZW1ibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aLvOWboidcclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgICBhc3NlbWJsZUlkOiAnJyxcclxuICAgICAgZmxvd0RhdGE6W1xyXG4gICAgICAgIHtpZDonMScsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOicxMDAr5Lq65bey5oiQ5ZuiJ30sXHJcbiAgICAgICAge2lkOicyJyx0aXRsZTon6JCM5YiG6K6i5Lmm5py6JyxwcmljZTonNScsZXhwcmljZTonMjUnLGltZzonaW5kZXhpbWcucG5nJyx0YWc6JzEwMCvkurrlt7LmiJDlm6InfSxcclxuICAgICAgICB7aWQ6JzMnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzonMTAwK+S6uuW3suaIkOWboid9LFxyXG4gICAgICAgIHtpZDonNCcsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOicxMDAr5Lq65bey5oiQ5ZuiJ30sXHJcbiAgICAgICAge2lkOic1Jyx0aXRsZTon6JCM5YiG6K6i5Lmm5py6JyxwcmljZTonNScsZXhwcmljZTonMjUnLGltZzonaW5kZXhpbWcucG5nJyx0YWc6JzEwMCvkurrlt7LmiJDlm6InfSxcclxuICAgICAgICB7aWQ6JzYnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzonMTAwK+S6uuW3suaIkOWboid9XHJcbiAgICAgIF0sXHJcbiAgfTtcclxuXHJcbiAgICBjb21wdXRlZCA9IHt9O1xyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmFzc2VtYmxlSWQgPSBvcHRpb25zLmlkXHJcbiAgICB9XHJcbiAgICBvblNob3coKSB7XHJcbiAgICAgICAgLy8gdGhpcy51c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvXHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybFxyXG4gICAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAvKipcclxuICAgICog6Lez6L2s5ZWG5ZOB6K+m5oOFXHJcbiAgICAqL1xyXG4gICAganVtcFRpbWVEZXRhaWxzKHNob3BpZCl7XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKHNob3BpZClcclxuICAgIGNvbnNvbGUubG9nKCfmi7zlm6InLHRoaXMuYXNzZW1ibGVJZCk7XHJcbiAgICB0aGlzLiRuYXZpZ2F0ZShgL3BhZ2VzL2Fzc2VtYmxlU2hvcERldGFpbHM/c2hvcGlkPSR7c2hvcGlkfSZhc3NlbWJsZUlkPSR7dGhpcy5hc3NlbWJsZUlkfWApXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuIFxyXG59XHJcbiJdfQ==