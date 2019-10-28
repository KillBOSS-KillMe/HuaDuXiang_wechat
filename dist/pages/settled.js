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
            navigationBarTitleText: '促销'
        }, _this.components = {}, _this.mixins = [], _this.data = {
            requestImgUrl: '',

            currentData: 0,
            currentDataTwo: 0,
            currentDataThree: 0,
            heightShow: true,

            tagOne: true,
            tagTwo: false,
            tagthree: true,
            tagFour: false,

            flowData: [{ id: '1', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }, { id: '2', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }, { id: '3', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }, { id: '4', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }, { id: '5', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }, { id: '6', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '满三减一' }]
        }, _this.computed = {}, _this.methods = {
            /**
            * 跳转商品详情
            */

            jumpTimeDetails: function jumpTimeDetails(shopid) {
                //   console.log(shopid)
                this.$navigate('/pages/shopDetails?shopid=' + shopid + '&combination=' + this.currentData);
            },

            /**
            * 选项卡
            */
            // 获取当前滑块的index
            checkCurrent: function checkCurrent(e) {
                this.currentData = e.currentTarget.dataset.current;
                console.log('e.currentTarget.dataset.current', this.currentData);
                if (this.currentData == 2 || this.currentData == 3) {
                    this.heightShow = false;
                } else {
                    this.heightShow = true;
                }

                if (this.currentData == 0) {
                    this.tagOne = true;
                    this.tagTwo = false;
                    this.tagthree = true;
                    this.tagFour = false;
                    //    this.tagthree = false
                } else if (this.currentData == 1) {
                    this.tagOne = false;
                    this.tagTwo = true;
                    //    this.tagthree = false
                } else if (this.currentData == 2) {
                    this.tagOne = false;
                    this.tagTwo = false;
                    this.tagFour = false;
                    this.tagthree = false;
                } else if (this.currentData == 3) {
                    this.tagOne = false;
                    this.tagTwo = false;
                    this.tagthree = false;
                    this.tagFour = true;
                }
            },

            // 获取当前滑块的index
            checkCurrentTwo: function checkCurrentTwo(e) {
                this.currentDataTwo = e.currentTarget.dataset.current;
                console.log('e.currentTarget.dataset.current', e.currentTarget.dataset.current);
            },

            // 获取当前滑块的index
            checkCurrentThree: function checkCurrentThree(e) {
                this.currentDataThree = e.currentTarget.dataset.current;
                console.log(e.currentTarget.dataset.current);
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onShow',
        value: function onShow() {
            // this.userInfo = this.$parent.globalData.userInfo
            this.requestImgUrl = this.$parent.globalData.requestImgUrl;
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/settled'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRsZWQuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwiY3VycmVudERhdGEiLCJjdXJyZW50RGF0YVR3byIsImN1cnJlbnREYXRhVGhyZWUiLCJoZWlnaHRTaG93IiwidGFnT25lIiwidGFnVHdvIiwidGFndGhyZWUiLCJ0YWdGb3VyIiwiZmxvd0RhdGEiLCJpZCIsInRpdGxlIiwicHJpY2UiLCJleHByaWNlIiwiaW1nIiwidGFnIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwianVtcFRpbWVEZXRhaWxzIiwic2hvcGlkIiwiJG5hdmlnYXRlIiwiY2hlY2tDdXJyZW50IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiY3VycmVudCIsImNvbnNvbGUiLCJsb2ciLCJjaGVja0N1cnJlbnRUd28iLCJjaGVja0N1cnJlbnRUaHJlZSIsImV2ZW50cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLG9DQUF3QjtBQURqQixTLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNIQywyQkFBZSxFQURaOztBQUdIQyx5QkFBYSxDQUhWO0FBSUhDLDRCQUFnQixDQUpiO0FBS0hDLDhCQUFrQixDQUxmO0FBTUhDLHdCQUFXLElBTlI7O0FBUUhDLG9CQUFPLElBUko7QUFTSEMsb0JBQU8sS0FUSjtBQVVIQyxzQkFBUyxJQVZOO0FBV0hDLHFCQUFTLEtBWE47O0FBYUhDLHNCQUFTLENBQ1AsRUFBQ0MsSUFBRyxHQUFKLEVBQVFDLE9BQU0sT0FBZCxFQUFzQkMsT0FBTSxHQUE1QixFQUFnQ0MsU0FBUSxJQUF4QyxFQUE2Q0MsS0FBSSxj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Z0JDLE9BQWhCLENBQXdCQyxPQUF0RTtBQUNILGFBaERPOztBQWlEUjtBQUNBSSw2QkFsRFEsNkJBa0RVUCxDQWxEVixFQWtEYTtBQUNqQixxQkFBS25CLGdCQUFMLEdBQXdCbUIsRUFBRUMsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLE9BQWhEO0FBQ0FDLHdCQUFRQyxHQUFSLENBQVlMLEVBQUVDLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQyxPQUFwQztBQUNIO0FBckRPLFMsUUF5RFZLLE0sR0FBUyxFOzs7OztpQ0E3REU7QUFDTDtBQUNGLGlCQUFLOUIsYUFBTCxHQUFxQixLQUFLK0IsT0FBTCxDQUFhQyxVQUFiLENBQXdCaEMsYUFBN0M7QUFDRDs7O2lDQTRETSxDQUFFOzs7O0VBL0ZzQmlDLGVBQUtDLEk7O2tCQUFuQnhDLEsiLCJmaWxlIjoic2V0dGxlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5L+D6ZSAJ1xyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgICAgcmVxdWVzdEltZ1VybDogJycsXHJcblxyXG4gICAgICBjdXJyZW50RGF0YTogMCxcclxuICAgICAgY3VycmVudERhdGFUd286IDAsXHJcbiAgICAgIGN1cnJlbnREYXRhVGhyZWU6IDAsXHJcbiAgICAgIGhlaWdodFNob3c6dHJ1ZSxcclxuXHJcbiAgICAgIHRhZ09uZTp0cnVlLFxyXG4gICAgICB0YWdUd286ZmFsc2UsXHJcbiAgICAgIHRhZ3RocmVlOnRydWUsXHJcbiAgICAgIHRhZ0ZvdXI6IGZhbHNlLFxyXG5cclxuICAgICAgZmxvd0RhdGE6W1xyXG4gICAgICAgIHtpZDonMScsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOifmu6HkuInlh4/kuIAnfSxcclxuICAgICAgICB7aWQ6JzInLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzon5ruh5LiJ5YeP5LiAJ30sXHJcbiAgICAgICAge2lkOiczJyx0aXRsZTon6JCM5YiG6K6i5Lmm5py6JyxwcmljZTonNScsZXhwcmljZTonMjUnLGltZzonaW5kZXhpbWcucG5nJyx0YWc6J+a7oeS4ieWHj+S4gCd9LFxyXG4gICAgICAgIHtpZDonNCcsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOifmu6HkuInlh4/kuIAnfSxcclxuICAgICAgICB7aWQ6JzUnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzon5ruh5LiJ5YeP5LiAJ30sXHJcbiAgICAgICAge2lkOic2Jyx0aXRsZTon6JCM5YiG6K6i5Lmm5py6JyxwcmljZTonNScsZXhwcmljZTonMjUnLGltZzonaW5kZXhpbWcucG5nJyx0YWc6J+a7oeS4ieWHj+S4gCd9XHJcbiAgICAgIF0sXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICAgIG9uU2hvdygpIHtcclxuICAgICAgICAvLyB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cclxuICAgICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybFxyXG4gICAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAvKipcclxuICAgICog6Lez6L2s5ZWG5ZOB6K+m5oOFXHJcbiAgICAqL1xyXG5cclxuICAgIGp1bXBUaW1lRGV0YWlscyhzaG9waWQpe1xyXG4gICAgLy8gICBjb25zb2xlLmxvZyhzaG9waWQpXHJcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoYC9wYWdlcy9zaG9wRGV0YWlscz9zaG9waWQ9JHtzaG9waWR9JmNvbWJpbmF0aW9uPSR7dGhpcy5jdXJyZW50RGF0YX1gKVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiDpgInpobnljaFcclxuICAgICovXHJcbiAgICAvLyDojrflj5blvZPliY3mu5HlnZfnmoRpbmRleFxyXG4gICAgY2hlY2tDdXJyZW50KGUpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnREYXRhID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VycmVudFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jdXJyZW50Jyx0aGlzLmN1cnJlbnREYXRhKVxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnREYXRhID09IDIgfHwgdGhpcy5jdXJyZW50RGF0YSA9PSAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0U2hvdyA9IGZhbHNlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHRTaG93ID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5jdXJyZW50RGF0YSA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy50YWdPbmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMudGFnVHdvID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy50YWd0aHJlZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy50YWdGb3VyID0gZmFsc2VcclxuICAgICAgICAgICAgLy8gICAgdGhpcy50YWd0aHJlZSA9IGZhbHNlXHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5jdXJyZW50RGF0YSA9PSAxKXtcclxuICAgICAgICAgICAgdGhpcy50YWdPbmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnRhZ1R3byA9IHRydWVcclxuICAgICAgICAgICAgLy8gICAgdGhpcy50YWd0aHJlZSA9IGZhbHNlXHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5jdXJyZW50RGF0YSA9PSAyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnT25lID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnVHdvID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnRm91ciA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ3RocmVlID0gZmFsc2VcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLmN1cnJlbnREYXRhID09IDMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdPbmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnRhZ1R3byA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMudGFndGhyZWUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnRhZ0ZvdXIgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIOiOt+WPluW9k+WJjea7keWdl+eahGluZGV4XHJcbiAgICBjaGVja0N1cnJlbnRUd28oZSkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudERhdGFUd28gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jdXJyZW50XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnQnLGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnQpXHJcbiAgICB9LFxyXG4gICAgLy8g6I635Y+W5b2T5YmN5ruR5Z2X55qEaW5kZXhcclxuICAgIGNoZWNrQ3VycmVudFRocmVlKGUpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnREYXRhVGhyZWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jdXJyZW50XHJcbiAgICAgICAgY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VycmVudClcclxuICAgIH0sXHJcbiAgIFxyXG4gIH07XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvbkxvYWQoKSB7fVxyXG59XHJcbiJdfQ==