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
            flowData: [{ id: '1', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }, { id: '2', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }, { id: '3', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }, { id: '4', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }, { id: '5', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }, { id: '6', title: '萌分订书机', price: '5', exprice: '25', img: 'indeximg.png', tag: '100+人已成团' }],
            goods_list: [],
            hasmore: false, // 是否有下一页
            curpage: 1 //当前页数
        }, _this.computed = {}, _this.methods = {
            jumpTimeDetails: function jumpTimeDetails(shopid) {
                this.$navigate('/pages/assembleShopDetails?shopid=' + shopid + '&assembleId=' + this.assembleId);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2VtYmxlLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInRvcEltZyIsInJlcXVlc3RJbWdVcmwiLCJmbG93RGF0YSIsImlkIiwidGl0bGUiLCJwcmljZSIsImV4cHJpY2UiLCJpbWciLCJ0YWciLCJnb29kc19saXN0IiwiaGFzbW9yZSIsImN1cnBhZ2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJqdW1wVGltZURldGFpbHMiLCJzaG9waWQiLCIkbmF2aWdhdGUiLCJhc3NlbWJsZUlkIiwiZXZlbnRzIiwib3B0aW9ucyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidXJsIiwibWVtYmVyUHQiLCJ0aGVuIiwicmVzIiwiZGF0YXMiLCJpbWdfYXJlYSIsIiRhcHBseSIsInJlcXVlc3RMaXN0IiwicGluZ291IiwicGFnZSIsImNvZGUiLCJsaXN0IiwiY29uY2F0Iiwid2VweSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0hDLG9CQUFPLEVBREo7QUFFSEMsMkJBQWUsRUFGWjtBQUdIQyxzQkFBUyxDQUNMLEVBQUNDLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFESyxFQUVMLEVBQUNMLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFGSyxFQUdMLEVBQUNMLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFISyxFQUlMLEVBQUNMLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFKSyxFQUtMLEVBQUNMLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFMSyxFQU1MLEVBQUNMLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFOSyxDQUhOO0FBV0hDLHdCQUFZLEVBWFQ7QUFZSEMscUJBQVMsS0FaTixFQVlhO0FBQ2hCQyxxQkFBUyxDQWJOLENBYVM7QUFiVCxTLFFBZ0JQQyxRLEdBQVcsRSxRQWNYQyxPLEdBQVU7QUFDTkMsMkJBRE0sMkJBQ1VDLE1BRFYsRUFDaUI7QUFDbkIscUJBQUtDLFNBQUwsd0NBQW9ERCxNQUFwRCxvQkFBeUUsS0FBS0UsVUFBOUU7QUFDSDtBQUhLLFMsUUE0QlpDLE0sR0FBUyxFOzs7OzsrQkF6Q0FDLE8sRUFBUztBQUFBOztBQUNaLGlCQUFLbEIsYUFBTCxHQUFxQixLQUFLbUIsT0FBTCxDQUFhQyxVQUFiLENBQXdCcEIsYUFBN0M7QUFDQSw0QkFBSztBQUNEcUIscUJBQUs5QixJQUFJK0I7QUFEUixhQUFMLEVBRUdDLElBRkgsQ0FFUSxlQUFPO0FBQ1gsdUJBQUt4QixNQUFMLEdBQWN5QixJQUFJQyxLQUFKLENBQVVDLFFBQXhCO0FBQ0EsdUJBQUtDLE1BQUw7QUFDSCxhQUxEO0FBTUEsaUJBQUtDLFdBQUw7QUFDSDs7O2lDQUNRO0FBQ0wsaUJBQUs1QixhQUFMLEdBQXFCLEtBQUttQixPQUFMLENBQWFDLFVBQWIsQ0FBd0JwQixhQUE3QztBQUNIOzs7c0NBTWE7QUFBQTs7QUFDViw0QkFBSztBQUNEcUIscUJBQUs5QixJQUFJc0MsTUFEUjtBQUVEL0Isc0JBQU07QUFDRmdDLDBCQUFNLEVBREo7QUFFRnBCLDZCQUFTLEtBQUtBO0FBRlo7QUFGTCxhQUFMLEVBTUdhLElBTkgsQ0FNUSxlQUFPO0FBQ1gsb0JBQUlDLElBQUlPLElBQUosSUFBWSxHQUFoQixFQUFxQjtBQUNqQix3QkFBSUMsT0FBT1IsSUFBSUMsS0FBSixDQUFVakIsVUFBVixJQUF3QixFQUFuQztBQUNBLDJCQUFLQSxVQUFMLEdBQWtCLE9BQUtBLFVBQUwsQ0FBZ0J5QixNQUFoQixDQUF1QkQsSUFBdkIsQ0FBbEI7QUFDQSwyQkFBS3ZCLE9BQUwsR0FBZWUsSUFBSUMsS0FBSixDQUFVaEIsT0FBekI7QUFDQSwyQkFBS2tCLE1BQUw7QUFDSDtBQUNKLGFBYkQ7QUFjSDs7O3dDQUNnQjtBQUNiLGdCQUFHLEtBQUtsQixPQUFSLEVBQWlCO0FBQ2IscUJBQUtDLE9BQUw7QUFDQSxxQkFBS2tCLFdBQUw7QUFDSDtBQUNKOzs7O0VBaEU4Qk0sZUFBS0osSTs7a0JBQW5CckMsSyIsImZpbGUiOiJhc3NlbWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ou85ZuiJ1xyXG4gICAgfTtcclxuICAgIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHRvcEltZzonJyxcclxuICAgICAgICByZXF1ZXN0SW1nVXJsOiAnJyxcclxuICAgICAgICBmbG93RGF0YTpbXHJcbiAgICAgICAgICAgIHtpZDonMScsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOicxMDAr5Lq65bey5oiQ5ZuiJ30sXHJcbiAgICAgICAgICAgIHtpZDonMicsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOicxMDAr5Lq65bey5oiQ5ZuiJ30sXHJcbiAgICAgICAgICAgIHtpZDonMycsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOicxMDAr5Lq65bey5oiQ5ZuiJ30sXHJcbiAgICAgICAgICAgIHtpZDonNCcsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOicxMDAr5Lq65bey5oiQ5ZuiJ30sXHJcbiAgICAgICAgICAgIHtpZDonNScsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOicxMDAr5Lq65bey5oiQ5ZuiJ30sXHJcbiAgICAgICAgICAgIHtpZDonNicsdGl0bGU6J+iQjOWIhuiuouS5puacuicscHJpY2U6JzUnLGV4cHJpY2U6JzI1JyxpbWc6J2luZGV4aW1nLnBuZycsdGFnOicxMDAr5Lq65bey5oiQ5ZuiJ31cclxuICAgICAgICBdLFxyXG4gICAgICAgIGdvb2RzX2xpc3Q6IFtdLFxyXG4gICAgICAgIGhhc21vcmU6IGZhbHNlLCAvLyDmmK/lkKbmnInkuIvkuIDpobVcclxuICAgICAgICBjdXJwYWdlOiAxLCAvL+W9k+WJjemhteaVsFxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wdXRlZCA9IHt9O1xyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsO1xyXG4gICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGFwaS5tZW1iZXJQdCxcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudG9wSW1nID0gcmVzLmRhdGFzLmltZ19hcmVhXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMucmVxdWVzdExpc3QoKVxyXG4gICAgfVxyXG4gICAgb25TaG93KCkge1xyXG4gICAgICAgIHRoaXMucmVxdWVzdEltZ1VybCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlcXVlc3RJbWdVcmxcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAganVtcFRpbWVEZXRhaWxzKHNob3BpZCl7XHJcbiAgICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKGAvcGFnZXMvYXNzZW1ibGVTaG9wRGV0YWlscz9zaG9waWQ9JHtzaG9waWR9JmFzc2VtYmxlSWQ9JHt0aGlzLmFzc2VtYmxlSWR9YClcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuICAgIHJlcXVlc3RMaXN0KCkge1xyXG4gICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGFwaS5waW5nb3UsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHBhZ2U6IDEwLFxyXG4gICAgICAgICAgICAgICAgY3VycGFnZTogdGhpcy5jdXJwYWdlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBsaXN0ID0gcmVzLmRhdGFzLmdvb2RzX2xpc3QgfHwgW11cclxuICAgICAgICAgICAgICAgIHRoaXMuZ29vZHNfbGlzdCA9IHRoaXMuZ29vZHNfbGlzdC5jb25jYXQobGlzdClcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFzbW9yZSA9IHJlcy5kYXRhcy5oYXNtb3JlXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgICAgICBpZih0aGlzLmhhc21vcmUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJwYWdlICsrIFxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RMaXN0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuIFxyXG59XHJcbiJdfQ==