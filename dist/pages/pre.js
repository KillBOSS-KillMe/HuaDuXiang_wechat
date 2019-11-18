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
                this.$navigate('/pages/shopDetails?goods_id=' + goods_id);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZS5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJyZXF1ZXN0SW1nVXJsIiwicHJlSWQiLCJ0b3BJbWciLCJoYXNtb3JlIiwiY3VycGFnZSIsImdvb2RzX2xpc3QiLCJjb21wdXRlZCIsImV2ZW50cyIsIm1ldGhvZHMiLCJnb1ByZURldGFpbHMiLCJnb29kc19pZCIsIiRuYXZpZ2F0ZSIsIm9wdGlvbnMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVybCIsIm1lbWJlcllnIiwidGhlbiIsInJlcyIsImRhdGFzIiwiaW1nX2FyZWEiLCIkYXBwbHkiLCJyZXF1ZXN0TGlzdCIsInlzR29vZHNMaXN0IiwicGFnZSIsImNvZGUiLCJsaXN0IiwiY29uY2F0Iiwid2VweSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUdxQkMsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDUEMsb0NBQXdCO0FBRGpCLFMsUUFHVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0hDLDJCQUFlLEVBRFo7QUFFSEMsbUJBQU8sRUFGSjtBQUdIQyxvQkFBUSxFQUhMO0FBSUhDLHFCQUFTLEtBSk4sRUFJYTtBQUNoQkMscUJBQVMsQ0FMTixFQUtTO0FBQ1pDLHdCQUFZO0FBTlQsUyxRQVNMQyxRLEdBQVcsRSxRQUdYQyxNLEdBQVMsRSxRQXVDVEMsTyxHQUFVO0FBQ047OztBQUdBQyx3QkFKTSx3QkFJT0MsUUFKUCxFQUlnQjtBQUNsQixxQkFBS0MsU0FBTCxrQ0FBOENELFFBQTlDO0FBQ0g7QUFOSyxTOzs7OzsrQkFyQ0hFLE8sRUFBUztBQUFBOztBQUNaLGlCQUFLWixhQUFMLEdBQXFCLEtBQUthLE9BQUwsQ0FBYUMsVUFBYixDQUF3QmQsYUFBN0M7QUFDQSw0QkFBSztBQUNEZSxxQkFBS3ZCLElBQUl3QjtBQURSLGFBQUwsRUFFR0MsSUFGSCxDQUVRLGVBQU87QUFDWCx1QkFBS2YsTUFBTCxHQUFjZ0IsSUFBSUMsS0FBSixDQUFVQyxRQUF4QjtBQUNBLHVCQUFLQyxNQUFMO0FBQ0gsYUFMRDs7QUFPQSxpQkFBS0MsV0FBTDtBQUNIOzs7c0NBQ2E7QUFBQTs7QUFDViw0QkFBSztBQUNEUCxxQkFBS3ZCLElBQUkrQixXQURSO0FBRUR4QixzQkFBTTtBQUNGeUIsMEJBQU0sRUFESjtBQUVGcEIsNkJBQVMsS0FBS0E7QUFGWjtBQUZMLGFBQUwsRUFNT2EsSUFOUCxDQU1ZLGVBQU87QUFDZixvQkFBSUMsSUFBSU8sSUFBSixJQUFZLEdBQWhCLEVBQXFCO0FBQ2pCLHdCQUFJQyxPQUFPUixJQUFJQyxLQUFKLENBQVVPLElBQVYsSUFBa0IsRUFBN0I7QUFDQSwyQkFBS3JCLFVBQUwsR0FBa0IsT0FBS0EsVUFBTCxDQUFnQnNCLE1BQWhCLENBQXVCRCxJQUF2QixDQUFsQjtBQUNBLDJCQUFLdkIsT0FBTCxHQUFlZSxJQUFJQyxLQUFKLENBQVVoQixPQUF6QjtBQUNBLDJCQUFLa0IsTUFBTDtBQUNIO0FBQ0osYUFiRDtBQWNIOzs7aUNBQ1E7QUFDUDtBQUNFLGlCQUFLckIsYUFBTCxHQUFxQixLQUFLYSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JkLGFBQTdDO0FBQ0g7Ozt3Q0FDZ0I7QUFDYixnQkFBRyxLQUFLRyxPQUFSLEVBQWlCO0FBQ2IscUJBQUtDLE9BQUw7QUFDQSxxQkFBS2tCLFdBQUw7QUFDSDtBQUNKOzs7O0VBMUQ4Qk0sZUFBS0osSTs7a0JBQW5COUIsSyIsImZpbGUiOiJwcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpooTotK0nXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgICAgcHJlSWQ6ICcnLFxyXG4gICAgICB0b3BJbWc6ICcnLFxyXG4gICAgICBoYXNtb3JlOiBmYWxzZSwgLy8g5piv5ZCm5pyJ5LiL5LiA6aG1XHJcbiAgICAgIGN1cnBhZ2U6IDEsIC8v5b2T5YmN6aG15pWwXHJcbiAgICAgIGdvb2RzX2xpc3Q6IFtdICBcclxuICB9O1xyXG5cclxuICAgIGNvbXB1dGVkID0ge307XHJcblxyXG5cclxuICAgIGV2ZW50cyA9IHt9O1xyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICAgICAgICBhamF4KHtcclxuICAgICAgICAgICAgdXJsOiBhcGkubWVtYmVyWWcsXHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRvcEltZyA9IHJlcy5kYXRhcy5pbWdfYXJlYVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0TGlzdCgpXHJcbiAgICB9XHJcbiAgICByZXF1ZXN0TGlzdCgpIHtcclxuICAgICAgICBhamF4KHtcclxuICAgICAgICAgICAgdXJsOiBhcGkueXNHb29kc0xpc3QsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHBhZ2U6IDEwLFxyXG4gICAgICAgICAgICAgICAgY3VycGFnZTogdGhpcy5jdXJwYWdlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGlzdCA9IHJlcy5kYXRhcy5saXN0IHx8IFtdXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvb2RzX2xpc3QgPSB0aGlzLmdvb2RzX2xpc3QuY29uY2F0KGxpc3QpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhc21vcmUgPSByZXMuZGF0YXMuaGFzbW9yZVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgb25TaG93KCkge1xyXG4gICAgICAvLyB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cclxuICAgICAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsXHJcbiAgICB9XHJcbiAgICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgICAgICBpZih0aGlzLmhhc21vcmUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJwYWdlICsrIFxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RMaXN0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOi3s+i9rOWVhuWTgeivpuaDhVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdvUHJlRGV0YWlscyhnb29kc19pZCl7XHJcbiAgICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKGAvcGFnZXMvc2hvcERldGFpbHM/Z29vZHNfaWQ9JHtnb29kc19pZH1gKVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuIl19