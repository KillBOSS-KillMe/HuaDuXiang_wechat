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
      navigationBarTitleText: '地址'
    }, _this.data = {
      emptyFlag: true
    }, _this.components = {}, _this.computed = {}, _this.methods = {
      // 删除地址
      deleAddress: function deleAddress(e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        wx.showModal({
          title: '提示',
          content: '确定删除地址？',
          success: function success(res) {
            if (res.confirm) {
              app.ajax({
                url: api.addressDel,
                data: {
                  id: id
                },
                success: function success(res) {
                  if (res.code == 200) {
                    var list = that.data.list || [];
                    that.setData({
                      list: list.filter(function (item) {
                        return item.id != id;
                      })
                    });
                    wx.showToast({
                      title: '删除成功'
                    });
                  } else {
                    app.showToast1(res.msg);
                  }
                }
              });
            }
          }
        });
      },

      // 设为默认地址
      setAddress: function setAddress(e) {
        var that = this;
        wx.showModal({
          title: '提示',
          content: '确定设置为默认地址？',
          success: function success(res) {
            if (res.confirm) {
              app.ajax({
                url: api.addressAddUpdate,
                data: {
                  id: e.currentTarget.dataset.id
                },
                success: function success(res) {
                  if (res.code == 200) {
                    var list = that.data.list;
                    that.onShow();
                    wx.showToast({
                      title: '设置成功'
                    });
                  } else {
                    app.showToast1(res.msg);
                  }
                }
              });
            }
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/addressList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3NMaXN0LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJlbXB0eUZsYWciLCJjb21wb25lbnRzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZGVsZUFkZHJlc3MiLCJlIiwidGhhdCIsImlkIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJ3eCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiYXBwIiwiYWpheCIsInVybCIsImFwaSIsImFkZHJlc3NEZWwiLCJjb2RlIiwibGlzdCIsInNldERhdGEiLCJmaWx0ZXIiLCJpdGVtIiwic2hvd1RvYXN0Iiwic2hvd1RvYXN0MSIsIm1zZyIsInNldEFkZHJlc3MiLCJhZGRyZXNzQWRkVXBkYXRlIiwib25TaG93Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxpQkFBVztBQUROLEssUUFHUEMsVSxHQUFhLEUsUUFDYkMsUSxHQUFXLEUsUUFDWEMsTyxHQUFVO0FBQ1I7QUFDQUMsaUJBRlEsdUJBRUlDLENBRkosRUFFTztBQUNiLFlBQUlDLE9BQU8sSUFBWDtBQUNBLFlBQUlDLEtBQUtGLEVBQUVHLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCRixFQUFqQztBQUNBRyxXQUFHQyxTQUFILENBQWE7QUFDWEMsaUJBQU8sSUFESTtBQUVYQyxtQkFBUyxTQUZFO0FBR1hDLGlCQUhXLG1CQUdIQyxHQUhHLEVBR0U7QUFDWCxnQkFBSUEsSUFBSUMsT0FBUixFQUFpQjtBQUNmQyxrQkFBSUMsSUFBSixDQUFTO0FBQ1BDLHFCQUFLQyxJQUFJQyxVQURGO0FBRVB0QixzQkFBTTtBQUNKUTtBQURJLGlCQUZDO0FBS1BPLHVCQUxPLG1CQUtDQyxHQUxELEVBS007QUFDWCxzQkFBSUEsSUFBSU8sSUFBSixJQUFZLEdBQWhCLEVBQXFCO0FBQ25CLHdCQUFJQyxPQUFPakIsS0FBS1AsSUFBTCxDQUFVd0IsSUFBVixJQUFrQixFQUE3QjtBQUNBakIseUJBQUtrQixPQUFMLENBQWE7QUFDWEQsNEJBQU1BLEtBQUtFLE1BQUwsQ0FBWTtBQUFBLCtCQUFRQyxLQUFLbkIsRUFBTCxJQUFXQSxFQUFuQjtBQUFBLHVCQUFaO0FBREsscUJBQWI7QUFHQUcsdUJBQUdpQixTQUFILENBQWE7QUFDWGYsNkJBQU87QUFESSxxQkFBYjtBQUdELG1CQVJELE1BUU87QUFDTEssd0JBQUlXLFVBQUosQ0FBZWIsSUFBSWMsR0FBbkI7QUFDRDtBQUNGO0FBakJNLGVBQVQ7QUFtQkQ7QUFDRjtBQXpCVSxTQUFiO0FBMkJELE9BaENPOztBQWlDUjtBQUNBQyxnQkFsQ1Esc0JBa0NHekIsQ0FsQ0gsRUFrQ007QUFDWixZQUFJQyxPQUFPLElBQVg7QUFDQUksV0FBR0MsU0FBSCxDQUFhO0FBQ1hDLGlCQUFPLElBREk7QUFFWEMsbUJBQVMsWUFGRTtBQUdYQyxpQkFIVyxtQkFHSEMsR0FIRyxFQUdFO0FBQ1gsZ0JBQUlBLElBQUlDLE9BQVIsRUFBaUI7QUFDZkMsa0JBQUlDLElBQUosQ0FBUztBQUNQQyxxQkFBS0MsSUFBSVcsZ0JBREY7QUFFUGhDLHNCQUFNO0FBQ0pRLHNCQUFJRixFQUFFRyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkY7QUFEeEIsaUJBRkM7QUFLUE8sdUJBTE8sbUJBS0NDLEdBTEQsRUFLTTtBQUNYLHNCQUFJQSxJQUFJTyxJQUFKLElBQVksR0FBaEIsRUFBcUI7QUFDbkIsd0JBQUlDLE9BQU9qQixLQUFLUCxJQUFMLENBQVV3QixJQUFyQjtBQUNBakIseUJBQUswQixNQUFMO0FBQ0F0Qix1QkFBR2lCLFNBQUgsQ0FBYTtBQUNYZiw2QkFBTztBQURJLHFCQUFiO0FBR0QsbUJBTkQsTUFNTztBQUNMSyx3QkFBSVcsVUFBSixDQUFlYixJQUFJYyxHQUFuQjtBQUNEO0FBQ0Y7QUFmTSxlQUFUO0FBaUJEO0FBQ0Y7QUF2QlUsU0FBYjtBQXlCRDtBQTdETyxLOzs7Ozs2QkErREQsQ0FBRTs7OztFQXhFc0JJLGVBQUtDLEk7O2tCQUFuQnRDLEsiLCJmaWxlIjoiYWRkcmVzc0xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WcsOWdgCdcclxuICB9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICBlbXB0eUZsYWc6IHRydWVcclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAvLyDliKDpmaTlnLDlnYBcclxuICAgIGRlbGVBZGRyZXNzKGUpIHtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICB2YXIgaWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZDtcclxuICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgY29udGVudDogJ+ehruWumuWIoOmZpOWcsOWdgO+8nycsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICBhcHAuYWpheCh7XHJcbiAgICAgICAgICAgICAgdXJsOiBhcGkuYWRkcmVzc0RlbCxcclxuICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBpZFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGxpc3QgPSB0aGF0LmRhdGEubGlzdCB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0OiBsaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uaWQgIT0gaWQpXHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yig6Zmk5oiQ5YqfJ1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGFwcC5zaG93VG9hc3QxKHJlcy5tc2cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvLyDorr7kuLrpu5jorqTlnLDlnYBcclxuICAgIHNldEFkZHJlc3MoZSkge1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfnoa7lrprorr7nva7kuLrpu5jorqTlnLDlnYDvvJ8nLFxyXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgYXBwLmFqYXgoe1xyXG4gICAgICAgICAgICAgIHVybDogYXBpLmFkZHJlc3NBZGRVcGRhdGUsXHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgaWQ6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbGlzdCA9IHRoYXQuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICAgICAgICB0aGF0Lm9uU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6K6+572u5oiQ5YqfJ1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGFwcC5zaG93VG9hc3QxKHJlcy5tc2cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG4gIG9uTG9hZCgpIHt9XHJcbn1cclxuIl19