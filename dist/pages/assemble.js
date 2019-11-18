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
            navigationBarTitleText: '拼团'
        }, _this.components = {}, _this.mixins = [], _this.data = {
            topImg: '',
            requestImgUrl: '',
            goods_list: [],
            hasmore: false, // 是否有下一页
            curpage: 1 //当前页数
        }, _this.computed = {}, _this.methods = {
            jumpTimeDetails: function jumpTimeDetails(goods_id) {
                this.$navigate('/pages/shopDetails?goods_id=' + goods_id);
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var _this2 = this;

            this.requestImgUrl = this.$parent.globalData.requestImgUrl;
            (0, _ajax.ajax)({
                url: api.memberPt
            }).then(function (res) {
                _this2.topImg = res.datas.img_area;
                _this2.$apply();
            });
            this.requestList();
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            this.requestImgUrl = this.$parent.globalData.requestImgUrl;
        }
    }, {
        key: 'requestList',
        value: function requestList() {
            var _this3 = this;

            (0, _ajax.ajax)({
                url: api.pingou,
                data: {
                    page: 10,
                    curpage: this.curpage
                }
            }).then(function (res) {
                if (res.code == 200) {
                    var list = res.datas.goods_list || [];
                    _this3.goods_list = _this3.goods_list.concat(list);
                    _this3.hasmore = res.datas.hasmore;
                    _this3.$apply();
                }
            });
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/assemble'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2VtYmxlLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInRvcEltZyIsInJlcXVlc3RJbWdVcmwiLCJnb29kc19saXN0IiwiaGFzbW9yZSIsImN1cnBhZ2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJqdW1wVGltZURldGFpbHMiLCJnb29kc19pZCIsIiRuYXZpZ2F0ZSIsImV2ZW50cyIsIm9wdGlvbnMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVybCIsIm1lbWJlclB0IiwidGhlbiIsInJlcyIsImRhdGFzIiwiaW1nX2FyZWEiLCIkYXBwbHkiLCJyZXF1ZXN0TGlzdCIsInBpbmdvdSIsInBhZ2UiLCJjb2RlIiwibGlzdCIsImNvbmNhdCIsIndlcHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFFcUJDLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNIQyxvQkFBTyxFQURKO0FBRUhDLDJCQUFlLEVBRlo7QUFHSEMsd0JBQVksRUFIVDtBQUlIQyxxQkFBUyxLQUpOLEVBSWE7QUFDaEJDLHFCQUFTLENBTE4sQ0FLUztBQUxULFMsUUFRUEMsUSxHQUFXLEUsUUFjWEMsTyxHQUFVO0FBQ05DLDJCQURNLDJCQUNVQyxRQURWLEVBQ21CO0FBQ3JCLHFCQUFLQyxTQUFMLGtDQUE4Q0QsUUFBOUM7QUFDSDtBQUhLLFMsUUE0QlpFLE0sR0FBUyxFOzs7OzsrQkF6Q0FDLE8sRUFBUztBQUFBOztBQUNaLGlCQUFLVixhQUFMLEdBQXFCLEtBQUtXLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlosYUFBN0M7QUFDQSw0QkFBSztBQUNEYSxxQkFBS3RCLElBQUl1QjtBQURSLGFBQUwsRUFFR0MsSUFGSCxDQUVRLGVBQU87QUFDWCx1QkFBS2hCLE1BQUwsR0FBY2lCLElBQUlDLEtBQUosQ0FBVUMsUUFBeEI7QUFDQSx1QkFBS0MsTUFBTDtBQUNILGFBTEQ7QUFNQSxpQkFBS0MsV0FBTDtBQUNIOzs7aUNBQ1E7QUFDTCxpQkFBS3BCLGFBQUwsR0FBcUIsS0FBS1csT0FBTCxDQUFhQyxVQUFiLENBQXdCWixhQUE3QztBQUNIOzs7c0NBTWE7QUFBQTs7QUFDViw0QkFBSztBQUNEYSxxQkFBS3RCLElBQUk4QixNQURSO0FBRUR2QixzQkFBTTtBQUNGd0IsMEJBQU0sRUFESjtBQUVGbkIsNkJBQVMsS0FBS0E7QUFGWjtBQUZMLGFBQUwsRUFNR1ksSUFOSCxDQU1RLGVBQU87QUFDWCxvQkFBSUMsSUFBSU8sSUFBSixJQUFZLEdBQWhCLEVBQXFCO0FBQ2pCLHdCQUFJQyxPQUFPUixJQUFJQyxLQUFKLENBQVVoQixVQUFWLElBQXdCLEVBQW5DO0FBQ0EsMkJBQUtBLFVBQUwsR0FBa0IsT0FBS0EsVUFBTCxDQUFnQndCLE1BQWhCLENBQXVCRCxJQUF2QixDQUFsQjtBQUNBLDJCQUFLdEIsT0FBTCxHQUFlYyxJQUFJQyxLQUFKLENBQVVmLE9BQXpCO0FBQ0EsMkJBQUtpQixNQUFMO0FBQ0g7QUFDSixhQWJEO0FBY0g7Ozt3Q0FDZ0I7QUFDYixnQkFBRyxLQUFLakIsT0FBUixFQUFpQjtBQUNiLHFCQUFLQyxPQUFMO0FBQ0EscUJBQUtpQixXQUFMO0FBQ0g7QUFDSjs7OztFQXhEOEJNLGVBQUtKLEk7O2tCQUFuQjdCLEsiLCJmaWxlIjoiYXNzZW1ibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aLvOWboidcclxuICAgIH07XHJcbiAgICBjb21wb25lbnRzID0ge307XHJcblxyXG4gICAgbWl4aW5zID0gW107XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICB0b3BJbWc6JycsXHJcbiAgICAgICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICAgICAgZ29vZHNfbGlzdDogW10sXHJcbiAgICAgICAgaGFzbW9yZTogZmFsc2UsIC8vIOaYr+WQpuacieS4i+S4gOmhtVxyXG4gICAgICAgIGN1cnBhZ2U6IDEsIC8v5b2T5YmN6aG15pWwXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXB1dGVkID0ge307XHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmw7XHJcbiAgICAgICAgYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYXBpLm1lbWJlclB0LFxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy50b3BJbWcgPSByZXMuZGF0YXMuaW1nX2FyZWFcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0TGlzdCgpXHJcbiAgICB9XHJcbiAgICBvblNob3coKSB7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybFxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBqdW1wVGltZURldGFpbHMoZ29vZHNfaWQpe1xyXG4gICAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZShgL3BhZ2VzL3Nob3BEZXRhaWxzP2dvb2RzX2lkPSR7Z29vZHNfaWR9YClcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuICAgIHJlcXVlc3RMaXN0KCkge1xyXG4gICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGFwaS5waW5nb3UsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHBhZ2U6IDEwLFxyXG4gICAgICAgICAgICAgICAgY3VycGFnZTogdGhpcy5jdXJwYWdlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBsaXN0ID0gcmVzLmRhdGFzLmdvb2RzX2xpc3QgfHwgW11cclxuICAgICAgICAgICAgICAgIHRoaXMuZ29vZHNfbGlzdCA9IHRoaXMuZ29vZHNfbGlzdC5jb25jYXQobGlzdClcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFzbW9yZSA9IHJlcy5kYXRhcy5oYXNtb3JlXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgICAgICBpZih0aGlzLmhhc21vcmUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJwYWdlICsrIFxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RMaXN0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuIFxyXG59XHJcbiJdfQ==