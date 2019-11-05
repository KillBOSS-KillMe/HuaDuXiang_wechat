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
            navigationBarTitleText: '预购'
        }, _this.components = {}, _this.mixins = [], _this.data = {
            requestImgUrl: '',
            preId: '',
            flowData: [{ id: '1', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }, { id: '2', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }, { id: '3', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }, { id: '4', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }, { id: '5', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }, { id: '6', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }],
            topImg: ''
        }, _this.computed = {}, _this.events = {}, _this.methods = {
            /**
             * 跳转商品详情
             */
            goPreDetails: function goPreDetails(shopid) {
                // console.log('preId',this.preId)
                this.$navigate('/pages/preShopDetails?shopid=' + shopid + '&preId=' + this.preId);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var _this2 = this;

            this.requestImgUrl = this.$parent.globalData.requestImgUrl;
            (0, _ajax.ajax)({
                url: api.memberYg
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/pre'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZS5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwicHJlSWQiLCJmbG93RGF0YSIsImlkIiwidGl0bGUiLCJwcmljZSIsImV4cHJpY2UiLCJpbWciLCJ0YWciLCJ0b3BJbWciLCJjb21wdXRlZCIsImV2ZW50cyIsIm1ldGhvZHMiLCJnb1ByZURldGFpbHMiLCJzaG9waWQiLCIkbmF2aWdhdGUiLCJvcHRpb25zIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1cmwiLCJtZW1iZXJZZyIsInRoZW4iLCJyZXMiLCJkYXRhcyIsImltZ19hcmVhIiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFHcUJDLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLG9DQUF3QjtBQURqQixTLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNIQywyQkFBZSxFQURaO0FBRUhDLG1CQUFPLEVBRko7QUFHSEMsc0JBQVMsQ0FDUCxFQUFDQyxJQUFHLEdBQUosRUFBUUMsT0FBTSxPQUFkLEVBQXNCQyxPQUFNLEdBQTVCLEVBQWdDQyxTQUFRLElBQXhDLEVBQTZDQyxLQUFJLGNBQWpELEVBQWdFQyxLQUFJLE1BQXBFLEVBRE8sRUFFUCxFQUFDTCxJQUFHLEdBQUosRUFBUUMsT0FBTSxPQUFkLEVBQXNCQyxPQUFNLEdBQTVCLEVBQWdDQyxTQUFRLElBQXhDLEVBQTZDQyxLQUFJLGNBQWpELEVBQWdFQyxLQUFJLE1BQXBFLEVBRk8sRUFHUCxFQUFDTCxJQUFHLEdBQUosRUFBUUMsT0FBTSxPQUFkLEVBQXNCQyxPQUFNLEdBQTVCLEVBQWdDQyxTQUFRLElBQXhDLEVBQTZDQyxLQUFJLGNBQWpELEVBQWdFQyxLQUFJLE1BQXBFLEVBSE8sRUFJUCxFQUFDTCxJQUFHLEdBQUosRUFBUUMsT0FBTSxPQUFkLEVBQXNCQyxPQUFNLEdBQTVCLEVBQWdDQyxTQUFRLElBQXhDLEVBQTZDQyxLQUFJLGNBQWpELEVBQWdFQyxLQUFJLE1BQXBFLEVBSk8sRUFLUCxFQUFDTCxJQUFHLEdBQUosRUFBUUMsT0FBTSxPQUFkLEVBQXNCQyxPQUFNLEdBQTVCLEVBQWdDQyxTQUFRLElBQXhDLEVBQTZDQyxLQUFJLGNBQWpELEVBQWdFQyxLQUFJLE1BQXBFLEVBTE8sRUFNUCxFQUFDTCxJQUFHLEdBQUosRUFBUUMsT0FBTSxPQUFkLEVBQXNCQyxPQUFNLEdBQTVCLEVBQWdDQyxTQUFRLElBQXhDLEVBQTZDQyxLQUFJLGNBQWpELEVBQWdFQyxLQUFJLE1BQXBFLEVBTk8sQ0FITjtBQVdIQyxvQkFBUTtBQVhMLFMsUUFjTEMsUSxHQUFXLEUsUUFHWEMsTSxHQUFTLEUsUUFlVEMsTyxHQUFVO0FBQ047OztBQUdBQyx3QkFKTSx3QkFJT0MsTUFKUCxFQUljO0FBQ2hCO0FBQ0EscUJBQUtDLFNBQUwsbUNBQStDRCxNQUEvQyxlQUErRCxLQUFLYixLQUFwRTtBQUNIO0FBUEssUzs7Ozs7K0JBYkhlLE8sRUFBUztBQUFBOztBQUNaLGlCQUFLaEIsYUFBTCxHQUFxQixLQUFLaUIsT0FBTCxDQUFhQyxVQUFiLENBQXdCbEIsYUFBN0M7QUFDQSw0QkFBSztBQUNEbUIscUJBQUszQixJQUFJNEI7QUFEUixhQUFMLEVBRUdDLElBRkgsQ0FFUSxlQUFPO0FBQ1gsdUJBQUtaLE1BQUwsR0FBY2EsSUFBSUMsS0FBSixDQUFVQyxRQUF4QjtBQUNBLHVCQUFLQyxNQUFMO0FBQ0gsYUFMRDtBQU1IOzs7aUNBQ1E7QUFDUDtBQUNFLGlCQUFLekIsYUFBTCxHQUFxQixLQUFLaUIsT0FBTCxDQUFhQyxVQUFiLENBQXdCbEIsYUFBN0M7QUFDSDs7OztFQXZDOEIwQixlQUFLQyxJOztrQkFBbkJqQyxLIiwiZmlsZSI6InByZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mihOi0rSdcclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgICBwcmVJZDogJycsXHJcbiAgICAgIGZsb3dEYXRhOltcclxuICAgICAgICB7aWQ6JzEnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzon5ruh5LiJ5YeP5LiAJ30sXHJcbiAgICAgICAge2lkOicyJyx0aXRsZTon6JCM5YiG6K6i5Lmm5py6JyxwcmljZTonNScsZXhwcmljZTonMjUnLGltZzonaW5kZXhpbWcucG5nJyx0YWc6J+a7oeS4ieWHj+S4gCd9LFxyXG4gICAgICAgIHtpZDonMycsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOifmu6HkuInlh4/kuIAnfSxcclxuICAgICAgICB7aWQ6JzQnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzon5ruh5LiJ5YeP5LiAJ30sXHJcbiAgICAgICAge2lkOic1Jyx0aXRsZTon6JCM5YiG6K6i5Lmm5py6JyxwcmljZTonNScsZXhwcmljZTonMjUnLGltZzonaW5kZXhpbWcucG5nJyx0YWc6J+a7oeS4ieWHj+S4gCd9LFxyXG4gICAgICAgIHtpZDonNicsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOifmu6HkuInlh4/kuIAnfVxyXG4gICAgICBdLFxyXG4gICAgICB0b3BJbWc6ICcnLFxyXG4gIH07XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7fTtcclxuXHJcblxyXG4gICAgZXZlbnRzID0ge307XHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGFwaS5tZW1iZXJZZyxcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudG9wSW1nID0gcmVzLmRhdGFzLmltZ19hcmVhXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgb25TaG93KCkge1xyXG4gICAgICAvLyB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cclxuICAgICAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOi3s+i9rOWVhuWTgeivpuaDhVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdvUHJlRGV0YWlscyhzaG9waWQpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncHJlSWQnLHRoaXMucHJlSWQpXHJcbiAgICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKGAvcGFnZXMvcHJlU2hvcERldGFpbHM/c2hvcGlkPSR7c2hvcGlkfSZwcmVJZD0ke3RoaXMucHJlSWR9YClcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbiJdfQ==