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
            topImg: '',
            hasmore: false, // 是否有下一页
            curpage: 1, //当前页数
            goods_list: []
        }, _this.computed = {}, _this.events = {}, _this.methods = {
            /**
             * 跳转商品详情
             */
            goPreDetails: function goPreDetails(goods_id) {
                console.log(goods_id);
                this.$navigate('/pages/preShopDetails?goods_id=' + goods_id);
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

            this.requestList();
        }
    }, {
        key: 'requestList',
        value: function requestList() {
            var _this3 = this;

            (0, _ajax.ajax)({
                url: api.ysGoodsList,
                data: {
                    page: 10,
                    curpage: this.curpage
                }
            }).then(function (res) {
                if (res.code == 200) {
                    var list = res.datas.list || [];
                    _this3.goods_list = _this3.goods_list.concat(list);
                    _this3.hasmore = res.datas.hasmore;
                    _this3.$apply();
                }
            });
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            // this.userInfo = this.$parent.globalData.userInfo
            this.requestImgUrl = this.$parent.globalData.requestImgUrl;
        }
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            if (this.hasmore) {
                this.curpage++;
                this.requestList();
            }
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/pre'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZS5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwicHJlSWQiLCJ0b3BJbWciLCJoYXNtb3JlIiwiY3VycGFnZSIsImdvb2RzX2xpc3QiLCJjb21wdXRlZCIsImV2ZW50cyIsIm1ldGhvZHMiLCJnb1ByZURldGFpbHMiLCJnb29kc19pZCIsImNvbnNvbGUiLCJsb2ciLCIkbmF2aWdhdGUiLCJvcHRpb25zIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1cmwiLCJtZW1iZXJZZyIsInRoZW4iLCJyZXMiLCJkYXRhcyIsImltZ19hcmVhIiwiJGFwcGx5IiwicmVxdWVzdExpc3QiLCJ5c0dvb2RzTGlzdCIsInBhZ2UiLCJjb2RlIiwibGlzdCIsImNvbmNhdCIsIndlcHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFHcUJDLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLG9DQUF3QjtBQURqQixTLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNIQywyQkFBZSxFQURaO0FBRUhDLG1CQUFPLEVBRko7QUFHSEMsb0JBQVEsRUFITDtBQUlIQyxxQkFBUyxLQUpOLEVBSWE7QUFDaEJDLHFCQUFTLENBTE4sRUFLUztBQUNaQyx3QkFBWTtBQU5ULFMsUUFTTEMsUSxHQUFXLEUsUUFHWEMsTSxHQUFTLEUsUUF1Q1RDLE8sR0FBVTtBQUNOOzs7QUFHQUMsd0JBSk0sd0JBSU9DLFFBSlAsRUFJZ0I7QUFDbEJDLHdCQUFRQyxHQUFSLENBQVlGLFFBQVo7QUFDQSxxQkFBS0csU0FBTCxxQ0FBaURILFFBQWpEO0FBQ0g7QUFQSyxTOzs7OzsrQkFyQ0hJLE8sRUFBUztBQUFBOztBQUNaLGlCQUFLZCxhQUFMLEdBQXFCLEtBQUtlLE9BQUwsQ0FBYUMsVUFBYixDQUF3QmhCLGFBQTdDO0FBQ0EsNEJBQUs7QUFDRGlCLHFCQUFLekIsSUFBSTBCO0FBRFIsYUFBTCxFQUVHQyxJQUZILENBRVEsZUFBTztBQUNYLHVCQUFLakIsTUFBTCxHQUFja0IsSUFBSUMsS0FBSixDQUFVQyxRQUF4QjtBQUNBLHVCQUFLQyxNQUFMO0FBQ0gsYUFMRDs7QUFPQSxpQkFBS0MsV0FBTDtBQUNIOzs7c0NBQ2E7QUFBQTs7QUFDViw0QkFBSztBQUNEUCxxQkFBS3pCLElBQUlpQyxXQURSO0FBRUQxQixzQkFBTTtBQUNGMkIsMEJBQU0sRUFESjtBQUVGdEIsNkJBQVMsS0FBS0E7QUFGWjtBQUZMLGFBQUwsRUFNT2UsSUFOUCxDQU1ZLGVBQU87QUFDZixvQkFBSUMsSUFBSU8sSUFBSixJQUFZLEdBQWhCLEVBQXFCO0FBQ2pCLHdCQUFJQyxPQUFPUixJQUFJQyxLQUFKLENBQVVPLElBQVYsSUFBa0IsRUFBN0I7QUFDQSwyQkFBS3ZCLFVBQUwsR0FBa0IsT0FBS0EsVUFBTCxDQUFnQndCLE1BQWhCLENBQXVCRCxJQUF2QixDQUFsQjtBQUNBLDJCQUFLekIsT0FBTCxHQUFlaUIsSUFBSUMsS0FBSixDQUFVbEIsT0FBekI7QUFDQSwyQkFBS29CLE1BQUw7QUFDSDtBQUNKLGFBYkQ7QUFjSDs7O2lDQUNRO0FBQ1A7QUFDRSxpQkFBS3ZCLGFBQUwsR0FBcUIsS0FBS2UsT0FBTCxDQUFhQyxVQUFiLENBQXdCaEIsYUFBN0M7QUFDSDs7O3dDQUNnQjtBQUNiLGdCQUFHLEtBQUtHLE9BQVIsRUFBaUI7QUFDYixxQkFBS0MsT0FBTDtBQUNBLHFCQUFLb0IsV0FBTDtBQUNIO0FBQ0o7Ozs7RUExRDhCTSxlQUFLSixJOztrQkFBbkJoQyxLIiwiZmlsZSI6InByZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mihOi0rSdcclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICAgIHJlcXVlc3RJbWdVcmw6ICcnLFxyXG4gICAgICBwcmVJZDogJycsXHJcbiAgICAgIHRvcEltZzogJycsXHJcbiAgICAgIGhhc21vcmU6IGZhbHNlLCAvLyDmmK/lkKbmnInkuIvkuIDpobVcclxuICAgICAgY3VycGFnZTogMSwgLy/lvZPliY3pobXmlbBcclxuICAgICAgZ29vZHNfbGlzdDogW10gIFxyXG4gIH07XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7fTtcclxuXHJcblxyXG4gICAgZXZlbnRzID0ge307XHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGFwaS5tZW1iZXJZZyxcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudG9wSW1nID0gcmVzLmRhdGFzLmltZ19hcmVhXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLnJlcXVlc3RMaXN0KClcclxuICAgIH1cclxuICAgIHJlcXVlc3RMaXN0KCkge1xyXG4gICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGFwaS55c0dvb2RzTGlzdCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgcGFnZTogMTAsXHJcbiAgICAgICAgICAgICAgICBjdXJwYWdlOiB0aGlzLmN1cnBhZ2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBsaXN0ID0gcmVzLmRhdGFzLmxpc3QgfHwgW11cclxuICAgICAgICAgICAgICAgIHRoaXMuZ29vZHNfbGlzdCA9IHRoaXMuZ29vZHNfbGlzdC5jb25jYXQobGlzdClcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFzbW9yZSA9IHJlcy5kYXRhcy5oYXNtb3JlXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvblNob3coKSB7XHJcbiAgICAgIC8vIHRoaXMudXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mb1xyXG4gICAgICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmxcclxuICAgIH1cclxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xyXG4gICAgICAgIGlmKHRoaXMuaGFzbW9yZSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnBhZ2UgKysgXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdExpc3QoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6Lez6L2s5ZWG5ZOB6K+m5oOFXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ29QcmVEZXRhaWxzKGdvb2RzX2lkKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZ29vZHNfaWQpXHJcbiAgICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKGAvcGFnZXMvcHJlU2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gKVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuIl19