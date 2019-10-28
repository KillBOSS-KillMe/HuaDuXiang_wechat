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
        key: 'onLoad',
        value: function onLoad() {}
    }, {
        key: 'onShow',
        value: function onShow() {
            // this.userInfo = this.$parent.globalData.userInfo
            this.requestImgUrl = this.$parent.globalData.requestImgUrl;
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/sale'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbGUuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwiY3VycmVudERhdGEiLCJjdXJyZW50RGF0YVR3byIsImN1cnJlbnREYXRhVGhyZWUiLCJoZWlnaHRTaG93IiwidGFnT25lIiwidGFnVHdvIiwidGFndGhyZWUiLCJ0YWdGb3VyIiwiZmxvd0RhdGEiLCJpZCIsInRpdGxlIiwicHJpY2UiLCJleHByaWNlIiwiaW1nIiwidGFnIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwianVtcFRpbWVEZXRhaWxzIiwic2hvcGlkIiwiJG5hdmlnYXRlIiwiY2hlY2tDdXJyZW50IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiY3VycmVudCIsImNvbnNvbGUiLCJsb2ciLCJjaGVja0N1cnJlbnRUd28iLCJjaGVja0N1cnJlbnRUaHJlZSIsImV2ZW50cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLG9DQUF3QjtBQURqQixTLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNIQywyQkFBZSxFQURaO0FBRUhDLHlCQUFhLENBRlY7QUFHSEMsNEJBQWdCLENBSGI7QUFJSEMsOEJBQWtCLENBSmY7QUFLSEMsd0JBQVcsSUFMUjs7QUFPSEMsb0JBQU8sSUFQSjtBQVFIQyxvQkFBTyxLQVJKO0FBU0hDLHNCQUFTLElBVE47QUFVSEMscUJBQVMsS0FWTjs7QUFZSEMsc0JBQVMsQ0FDUCxFQUFDQyxJQUFHLEdBQUosRUFBUUMsT0FBTSxPQUFkLEVBQXNCQyxPQUFNLEdBQTVCLEVBQWdDQyxTQUFRLElBQXhDLEVBQTZDQyxLQUFJLGNBQWpE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QUFoQixDQUF3QkMsT0FBdEU7QUFDSCxhQS9DTzs7QUFnRFI7QUFDQUksNkJBakRRLDZCQWlEVVAsQ0FqRFYsRUFpRGE7QUFDakIscUJBQUtuQixnQkFBTCxHQUF3Qm1CLEVBQUVDLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQyxPQUFoRDtBQUNBQyx3QkFBUUMsR0FBUixDQUFZTCxFQUFFQyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkMsT0FBcEM7QUFDSDtBQXBETyxTLFFBd0RSSyxNLEdBQVMsRTs7Ozs7aUNBRUEsQ0FBRTs7O2lDQUNGO0FBQ1A7QUFDRSxpQkFBSzlCLGFBQUwsR0FBcUIsS0FBSytCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QmhDLGFBQTdDO0FBQ0g7Ozs7RUE5RjhCaUMsZUFBS0MsSTs7a0JBQW5CeEMsSyIsImZpbGUiOiJzYWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkv4PplIAnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgICAgY3VycmVudERhdGE6IDAsXHJcbiAgICAgIGN1cnJlbnREYXRhVHdvOiAwLFxyXG4gICAgICBjdXJyZW50RGF0YVRocmVlOiAwLFxyXG4gICAgICBoZWlnaHRTaG93OnRydWUsXHJcblxyXG4gICAgICB0YWdPbmU6dHJ1ZSxcclxuICAgICAgdGFnVHdvOmZhbHNlLFxyXG4gICAgICB0YWd0aHJlZTp0cnVlLFxyXG4gICAgICB0YWdGb3VyOiBmYWxzZSxcclxuXHJcbiAgICAgIGZsb3dEYXRhOltcclxuICAgICAgICB7aWQ6JzEnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzon5ruh5LiJ5YeP5LiAJ30sXHJcbiAgICAgICAge2lkOicyJyx0aXRsZTon6JCM5YiG6K6i5Lmm5py6JyxwcmljZTonNScsZXhwcmljZTonMjUnLGltZzonaW5kZXhpbWcucG5nJyx0YWc6J+a7oeS4ieWHj+S4gCd9LFxyXG4gICAgICAgIHtpZDonMycsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOifmu6HkuInlh4/kuIAnfSxcclxuICAgICAgICB7aWQ6JzQnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzon5ruh5LiJ5YeP5LiAJ30sXHJcbiAgICAgICAge2lkOic1Jyx0aXRsZTon6JCM5YiG6K6i5Lmm5py6JyxwcmljZTonNScsZXhwcmljZTonMjUnLGltZzonaW5kZXhpbWcucG5nJyx0YWc6J+a7oeS4ieWHj+S4gCd9LFxyXG4gICAgICAgIHtpZDonNicsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOifmu6HkuInlh4/kuIAnfVxyXG4gICAgICBdLFxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAvKipcclxuICAgICog6Lez6L2s5ZWG5ZOB6K+m5oOFXHJcbiAgICAqL1xyXG4gICAganVtcFRpbWVEZXRhaWxzKHNob3BpZCl7XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKHNob3BpZClcclxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZShgL3BhZ2VzL3Nob3BEZXRhaWxzP3Nob3BpZD0ke3Nob3BpZH0mY29tYmluYXRpb249JHt0aGlzLmN1cnJlbnREYXRhfWApXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIOmAiemhueWNoVxyXG4gICAgKi9cclxuICAgIC8vIOiOt+WPluW9k+WJjea7keWdl+eahGluZGV4XHJcbiAgICBjaGVja0N1cnJlbnQoZSkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudERhdGEgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jdXJyZW50XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnQnLHRoaXMuY3VycmVudERhdGEpXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudERhdGEgPT0gMiB8fCB0aGlzLmN1cnJlbnREYXRhID09IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHRTaG93ID0gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodFNob3cgPSB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmN1cnJlbnREYXRhID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLnRhZ09uZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy50YWdUd28gPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnRhZ3RocmVlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnRhZ0ZvdXIgPSBmYWxzZVxyXG4gICAgICAgICAgICAvLyAgICB0aGlzLnRhZ3RocmVlID0gZmFsc2VcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLmN1cnJlbnREYXRhID09IDEpe1xyXG4gICAgICAgICAgICB0aGlzLnRhZ09uZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMudGFnVHdvID0gdHJ1ZVxyXG4gICAgICAgICAgICAvLyAgICB0aGlzLnRhZ3RocmVlID0gZmFsc2VcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLmN1cnJlbnREYXRhID09IDIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdPbmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdUd28gPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdGb3VyID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMudGFndGhyZWUgPSBmYWxzZVxyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuY3VycmVudERhdGEgPT0gMyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ09uZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMudGFnVHdvID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy50YWd0aHJlZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMudGFnRm91ciA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8g6I635Y+W5b2T5YmN5ruR5Z2X55qEaW5kZXhcclxuICAgIGNoZWNrQ3VycmVudFR3byhlKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0YVR3byA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnRcclxuICAgICAgICBjb25zb2xlLmxvZygnZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VycmVudCcsZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VycmVudClcclxuICAgIH0sXHJcbiAgICAvLyDojrflj5blvZPliY3mu5HlnZfnmoRpbmRleFxyXG4gICAgY2hlY2tDdXJyZW50VGhyZWUoZSkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudERhdGFUaHJlZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnRcclxuICAgICAgICBjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jdXJyZW50KVxyXG4gICAgfSxcclxuICAgXHJcbiAgfTtcclxuXHJcbiAgICBldmVudHMgPSB7fTtcclxuXHJcbiAgICBvbkxvYWQoKSB7fVxyXG4gICAgb25TaG93KCkge1xyXG4gICAgICAvLyB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cclxuICAgICAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsXHJcbiAgICB9XHJcbn1cclxuIl19