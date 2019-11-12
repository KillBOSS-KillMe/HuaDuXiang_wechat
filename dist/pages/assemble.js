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
                    page: 1,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2VtYmxlLmpzIl0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInRvcEltZyIsInJlcXVlc3RJbWdVcmwiLCJmbG93RGF0YSIsImlkIiwidGl0bGUiLCJwcmljZSIsImV4cHJpY2UiLCJpbWciLCJ0YWciLCJnb29kc19saXN0IiwiaGFzbW9yZSIsImN1cnBhZ2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJqdW1wVGltZURldGFpbHMiLCJzaG9waWQiLCIkbmF2aWdhdGUiLCJhc3NlbWJsZUlkIiwiZXZlbnRzIiwib3B0aW9ucyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidXJsIiwibWVtYmVyUHQiLCJ0aGVuIiwicmVzIiwiZGF0YXMiLCJpbWdfYXJlYSIsIiRhcHBseSIsInJlcXVlc3RMaXN0IiwicGluZ291IiwicGFnZSIsImNvZGUiLCJsaXN0IiwiY29uY2F0Iiwid2VweSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQURBLElBQUlBLE1BQU1DLFFBQVEsV0FBUixDQUFWOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0hDLG9CQUFPLEVBREo7QUFFSEMsMkJBQWUsRUFGWjtBQUdIQyxzQkFBUyxDQUNMLEVBQUNDLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFESyxFQUVMLEVBQUNMLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFGSyxFQUdMLEVBQUNMLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFISyxFQUlMLEVBQUNMLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFKSyxFQUtMLEVBQUNMLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFMSyxFQU1MLEVBQUNMLElBQUcsR0FBSixFQUFRQyxPQUFNLE9BQWQsRUFBc0JDLE9BQU0sR0FBNUIsRUFBZ0NDLFNBQVEsSUFBeEMsRUFBNkNDLEtBQUksY0FBakQsRUFBZ0VDLEtBQUksVUFBcEUsRUFOSyxDQUhOO0FBV0hDLHdCQUFZLEVBWFQ7QUFZSEMscUJBQVMsS0FaTixFQVlhO0FBQ2hCQyxxQkFBUyxDQWJOLENBYVM7QUFiVCxTLFFBZ0JQQyxRLEdBQVcsRSxRQWNYQyxPLEdBQVU7QUFDTkMsMkJBRE0sMkJBQ1VDLE1BRFYsRUFDaUI7QUFDbkIscUJBQUtDLFNBQUwsd0NBQW9ERCxNQUFwRCxvQkFBeUUsS0FBS0UsVUFBOUU7QUFDSDtBQUhLLFMsUUE0QlpDLE0sR0FBUyxFOzs7OzsrQkF6Q0FDLE8sRUFBUztBQUFBOztBQUNaLGlCQUFLbEIsYUFBTCxHQUFxQixLQUFLbUIsT0FBTCxDQUFhQyxVQUFiLENBQXdCcEIsYUFBN0M7QUFDQSw0QkFBSztBQUNEcUIscUJBQUs5QixJQUFJK0I7QUFEUixhQUFMLEVBRUdDLElBRkgsQ0FFUSxlQUFPO0FBQ1gsdUJBQUt4QixNQUFMLEdBQWN5QixJQUFJQyxLQUFKLENBQVVDLFFBQXhCO0FBQ0EsdUJBQUtDLE1BQUw7QUFDSCxhQUxEO0FBTUEsaUJBQUtDLFdBQUw7QUFDSDs7O2lDQUNRO0FBQ0wsaUJBQUs1QixhQUFMLEdBQXFCLEtBQUttQixPQUFMLENBQWFDLFVBQWIsQ0FBd0JwQixhQUE3QztBQUNIOzs7c0NBTWE7QUFBQTs7QUFDViw0QkFBSztBQUNEcUIscUJBQUs5QixJQUFJc0MsTUFEUjtBQUVEL0Isc0JBQU07QUFDRmdDLDBCQUFNLENBREo7QUFFRnBCLDZCQUFTLEtBQUtBO0FBRlo7QUFGTCxhQUFMLEVBTUdhLElBTkgsQ0FNUSxlQUFPO0FBQ1gsb0JBQUlDLElBQUlPLElBQUosSUFBWSxHQUFoQixFQUFxQjtBQUNqQix3QkFBSUMsT0FBT1IsSUFBSUMsS0FBSixDQUFVTyxJQUFWLElBQWtCLEVBQTdCO0FBQ0EsMkJBQUt4QixVQUFMLEdBQWtCLE9BQUtBLFVBQUwsQ0FBZ0J5QixNQUFoQixDQUF1QkQsSUFBdkIsQ0FBbEI7QUFDQSwyQkFBS3ZCLE9BQUwsR0FBZWUsSUFBSUMsS0FBSixDQUFVaEIsT0FBekI7QUFDQSwyQkFBS2tCLE1BQUw7QUFDSDtBQUNKLGFBYkQ7QUFjSDs7O3dDQUNnQjtBQUNiLGdCQUFHLEtBQUtsQixPQUFSLEVBQWlCO0FBQ2pCLHFCQUFLQyxPQUFMO0FBQ0EscUJBQUtrQixXQUFMO0FBQ0M7QUFDSjs7OztFQWhFOEJNLGVBQUtKLEk7O2tCQUFuQnJDLEsiLCJmaWxlIjoiYXNzZW1ibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aLvOWboidcclxuICAgIH07XHJcbiAgICBjb21wb25lbnRzID0ge307XHJcblxyXG4gICAgbWl4aW5zID0gW107XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICB0b3BJbWc6JycsXHJcbiAgICAgICAgcmVxdWVzdEltZ1VybDogJycsXHJcbiAgICAgICAgZmxvd0RhdGE6W1xyXG4gICAgICAgICAgICB7aWQ6JzEnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzonMTAwK+S6uuW3suaIkOWboid9LFxyXG4gICAgICAgICAgICB7aWQ6JzInLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzonMTAwK+S6uuW3suaIkOWboid9LFxyXG4gICAgICAgICAgICB7aWQ6JzMnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzonMTAwK+S6uuW3suaIkOWboid9LFxyXG4gICAgICAgICAgICB7aWQ6JzQnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzonMTAwK+S6uuW3suaIkOWboid9LFxyXG4gICAgICAgICAgICB7aWQ6JzUnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzonMTAwK+S6uuW3suaIkOWboid9LFxyXG4gICAgICAgICAgICB7aWQ6JzYnLHRpdGxlOifokIzliIborqLkuabmnLonLHByaWNlOic1JyxleHByaWNlOicyNScsaW1nOidpbmRleGltZy5wbmcnLHRhZzonMTAwK+S6uuW3suaIkOWboid9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBnb29kc19saXN0OiBbXSxcclxuICAgICAgICBoYXNtb3JlOiBmYWxzZSwgLy8g5piv5ZCm5pyJ5LiL5LiA6aG1XHJcbiAgICAgICAgY3VycGFnZTogMSwgLy/lvZPliY3pobXmlbBcclxuICAgIH07XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7fTtcclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0SW1nVXJsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVxdWVzdEltZ1VybDtcclxuICAgICAgICBhamF4KHtcclxuICAgICAgICAgICAgdXJsOiBhcGkubWVtYmVyUHQsXHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRvcEltZyA9IHJlcy5kYXRhcy5pbWdfYXJlYVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnJlcXVlc3RMaXN0KClcclxuICAgIH1cclxuICAgIG9uU2hvdygpIHtcclxuICAgICAgICB0aGlzLnJlcXVlc3RJbWdVcmwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZXF1ZXN0SW1nVXJsXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGp1bXBUaW1lRGV0YWlscyhzaG9waWQpe1xyXG4gICAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZShgL3BhZ2VzL2Fzc2VtYmxlU2hvcERldGFpbHM/c2hvcGlkPSR7c2hvcGlkfSZhc3NlbWJsZUlkPSR7dGhpcy5hc3NlbWJsZUlkfWApXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICByZXF1ZXN0TGlzdCgpIHtcclxuICAgICAgICBhamF4KHtcclxuICAgICAgICAgICAgdXJsOiBhcGkucGluZ291LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBwYWdlOiAxLFxyXG4gICAgICAgICAgICAgICAgY3VycGFnZTogdGhpcy5jdXJwYWdlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBsaXN0ID0gcmVzLmRhdGFzLmxpc3QgfHwgW11cclxuICAgICAgICAgICAgICAgIHRoaXMuZ29vZHNfbGlzdCA9IHRoaXMuZ29vZHNfbGlzdC5jb25jYXQobGlzdClcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFzbW9yZSA9IHJlcy5kYXRhcy5oYXNtb3JlXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgICAgICBpZih0aGlzLmhhc21vcmUpIHtcclxuICAgICAgICB0aGlzLmN1cnBhZ2UgKysgXHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0TGlzdCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICBldmVudHMgPSB7fTtcclxuXHJcbiBcclxufVxyXG4iXX0=