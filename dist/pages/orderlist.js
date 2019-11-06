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

var ShopCart = function (_wepy$page) {
  _inherits(ShopCart, _wepy$page);

  function ShopCart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ShopCart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShopCart.__proto__ || Object.getPrototypeOf(ShopCart)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '订单列表'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      navArr: [{ title: '全部', id: 0 }, { title: '待付款' }, { title: '待发货' }, { title: '待收货' }, { title: '已完成' }],
      navIdx: 0,
      orderList: []
    }, _this.computed = {}, _this.methods = {
      orderCancel: function orderCancel(order_id, index) {
        var that = this;
        wx.showModal({
          title: '确认取消订单?',
          success: function success(res) {
            if (res.confirm) {
              (0, _ajax.ajax)({
                url: api.orderCancel,
                data: {
                  order_id: order_id
                }
              }).then(function (e) {
                if (e.datas.state == 1) {
                  wx.showToast({
                    title: e.datas.msg
                  });
                  that.orderList[index].order_state = e.datas.order_state;
                  that.$apply();
                } else {
                  wx.showToast({
                    title: e.datas.error,
                    icon: 'none'
                  });
                }
              });
            }
          }
        });
      },
      orderDelete: function orderDelete(order_id, index) {
        var that = this;
        wx.showModal({
          title: '确认删除订单?',
          success: function success(res) {
            if (res.confirm) {
              (0, _ajax.ajax)({
                url: api.orderDelete,
                data: {
                  order_id: order_id
                }
              }).then(function (e) {
                if (e.datas.state == 1) {
                  wx.showToast({
                    title: e.datas.msg
                  });
                  that.orderList.splice(index, 1);
                  that.$apply();
                } else {
                  wx.showToast({
                    title: e.datas.error,
                    icon: 'none'
                  });
                }
              });
            }
          }
        });
      },
      orderReceive: function orderReceive(order_id, index) {
        var that = this;
        wx.showModal({
          title: '确认收货?',
          success: function success(res) {
            if (res.confirm) {
              (0, _ajax.ajax)({
                url: api.orderReceive,
                data: {
                  order_id: order_id
                }
              }).then(function (e) {
                if (e.datas.state == 1) {
                  wx.showToast({
                    title: e.datas.msg
                  });
                  that.orderList[index].order_state = e.datas.order_state;
                  that.$apply();
                } else {
                  wx.showToast({
                    title: e.datas.error,
                    icon: 'none'
                  });
                }
              });
            }
          }
        });
      },
      searchDeliver: function searchDeliver(order_id) {
        (0, _ajax.ajax)({
          url: api.searchDeliver,
          data: {
            order_id: order_id
          }
        }).then(function (res) {
          return console.log(res);
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopCart, [{
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'onShow',
    value: function onShow() {
      this.requestList();
    }
  }, {
    key: 'requestList',
    value: function requestList() {
      var _this2 = this;

      (0, _ajax.ajax)({
        url: api.orderList,
        data: {
          page: 3, // 
          curpage: 1 // 当前页码
        }
      }).then(function (res) {
        var order_group_list = res.datas.order_group_list || [];
        var order_list = [];
        order_group_list.forEach(function (item) {
          order_list = order_list.concat(item.order_list);
        });
        _this2.orderList = order_list;
        _this2.$apply();
      });
    }
  }]);

  return ShopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/orderlist'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVybGlzdC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJuYXZBcnIiLCJ0aXRsZSIsImlkIiwibmF2SWR4Iiwib3JkZXJMaXN0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwib3JkZXJDYW5jZWwiLCJvcmRlcl9pZCIsImluZGV4IiwidGhhdCIsInd4Iiwic2hvd01vZGFsIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJ1cmwiLCJ0aGVuIiwiZSIsImRhdGFzIiwic3RhdGUiLCJzaG93VG9hc3QiLCJtc2ciLCJvcmRlcl9zdGF0ZSIsIiRhcHBseSIsImVycm9yIiwiaWNvbiIsIm9yZGVyRGVsZXRlIiwic3BsaWNlIiwib3JkZXJSZWNlaXZlIiwic2VhcmNoRGVsaXZlciIsImNvbnNvbGUiLCJsb2ciLCJldmVudHMiLCJyZXF1ZXN0TGlzdCIsInBhZ2UiLCJjdXJwYWdlIiwib3JkZXJfZ3JvdXBfbGlzdCIsIm9yZGVyX2xpc3QiLCJmb3JFYWNoIiwiY29uY2F0IiwiaXRlbSIsIndlcHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxNQUFNQyxRQUFRLFdBQVIsQ0FBVjs7SUFJcUJDLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxjQUFRLENBQ04sRUFBRUMsT0FBTyxJQUFULEVBQWVDLElBQUksQ0FBbkIsRUFETSxFQUVOLEVBQUVELE9BQU8sS0FBVCxFQUZNLEVBR04sRUFBRUEsT0FBTyxLQUFULEVBSE0sRUFJTixFQUFFQSxPQUFPLEtBQVQsRUFKTSxFQUtOLEVBQUVBLE9BQU8sS0FBVCxFQUxNLENBREg7QUFRTEUsY0FBUSxDQVJIO0FBU0xDLGlCQUFXO0FBVE4sSyxRQVlQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDUkMsaUJBRFEsdUJBQ0lDLFFBREosRUFDY0MsS0FEZCxFQUNvQjtBQUMxQixZQUFJQyxPQUFPLElBQVg7QUFDQUMsV0FBR0MsU0FBSCxDQUFhO0FBQ1hYLGlCQUFPLFNBREk7QUFFWFksaUJBRlcsbUJBRUhDLEdBRkcsRUFFRTtBQUNYLGdCQUFHQSxJQUFJQyxPQUFQLEVBQWdCO0FBQ2QsOEJBQUs7QUFDSEMscUJBQUt4QixJQUFJZSxXQUROO0FBRUhSLHNCQUFNO0FBQ0pTO0FBREk7QUFGSCxlQUFMLEVBS0dTLElBTEgsQ0FLUSxhQUFLO0FBQ1gsb0JBQUdDLEVBQUVDLEtBQUYsQ0FBUUMsS0FBUixJQUFpQixDQUFwQixFQUF1QjtBQUNyQlQscUJBQUdVLFNBQUgsQ0FBYTtBQUNYcEIsMkJBQU9pQixFQUFFQyxLQUFGLENBQVFHO0FBREosbUJBQWI7QUFHQVosdUJBQUtOLFNBQUwsQ0FBZUssS0FBZixFQUFzQmMsV0FBdEIsR0FBb0NMLEVBQUVDLEtBQUYsQ0FBUUksV0FBNUM7QUFDQWIsdUJBQUtjLE1BQUw7QUFDRCxpQkFORCxNQU1PO0FBQ0xiLHFCQUFHVSxTQUFILENBQWE7QUFDWHBCLDJCQUFPaUIsRUFBRUMsS0FBRixDQUFRTSxLQURKO0FBRVhDLDBCQUFNO0FBRkssbUJBQWI7QUFJRDtBQUNGLGVBbEJEO0FBbUJEO0FBQ0Y7QUF4QlUsU0FBYjtBQTBCRCxPQTdCTztBQThCUkMsaUJBOUJRLHVCQThCSW5CLFFBOUJKLEVBOEJjQyxLQTlCZCxFQThCb0I7QUFDMUIsWUFBSUMsT0FBTyxJQUFYO0FBQ0FDLFdBQUdDLFNBQUgsQ0FBYTtBQUNYWCxpQkFBTyxTQURJO0FBRVhZLGlCQUZXLG1CQUVIQyxHQUZHLEVBRUU7QUFDWCxnQkFBR0EsSUFBSUMsT0FBUCxFQUFnQjtBQUNkLDhCQUFLO0FBQ0hDLHFCQUFLeEIsSUFBSW1DLFdBRE47QUFFSDVCLHNCQUFNO0FBQ0pTO0FBREk7QUFGSCxlQUFMLEVBS0dTLElBTEgsQ0FLUSxhQUFLO0FBQ1gsb0JBQUdDLEVBQUVDLEtBQUYsQ0FBUUMsS0FBUixJQUFpQixDQUFwQixFQUF1QjtBQUNyQlQscUJBQUdVLFNBQUgsQ0FBYTtBQUNYcEIsMkJBQU9pQixFQUFFQyxLQUFGLENBQVFHO0FBREosbUJBQWI7QUFHQVosdUJBQUtOLFNBQUwsQ0FBZXdCLE1BQWYsQ0FBc0JuQixLQUF0QixFQUE0QixDQUE1QjtBQUNBQyx1QkFBS2MsTUFBTDtBQUNELGlCQU5ELE1BTU87QUFDTGIscUJBQUdVLFNBQUgsQ0FBYTtBQUNYcEIsMkJBQU9pQixFQUFFQyxLQUFGLENBQVFNLEtBREo7QUFFWEMsMEJBQU07QUFGSyxtQkFBYjtBQUlEO0FBQ0YsZUFsQkQ7QUFtQkQ7QUFDRjtBQXhCVSxTQUFiO0FBMEJELE9BMURPO0FBMkRSRyxrQkEzRFEsd0JBMkRLckIsUUEzREwsRUEyRGVDLEtBM0RmLEVBMkRxQjtBQUMzQixZQUFJQyxPQUFPLElBQVg7QUFDQUMsV0FBR0MsU0FBSCxDQUFhO0FBQ1hYLGlCQUFPLE9BREk7QUFFWFksaUJBRlcsbUJBRUhDLEdBRkcsRUFFRTtBQUNYLGdCQUFHQSxJQUFJQyxPQUFQLEVBQWdCO0FBQ2QsOEJBQUs7QUFDSEMscUJBQUt4QixJQUFJcUMsWUFETjtBQUVIOUIsc0JBQU07QUFDSlM7QUFESTtBQUZILGVBQUwsRUFLR1MsSUFMSCxDQUtRLGFBQUs7QUFDWCxvQkFBR0MsRUFBRUMsS0FBRixDQUFRQyxLQUFSLElBQWlCLENBQXBCLEVBQXVCO0FBQ3JCVCxxQkFBR1UsU0FBSCxDQUFhO0FBQ1hwQiwyQkFBT2lCLEVBQUVDLEtBQUYsQ0FBUUc7QUFESixtQkFBYjtBQUdBWix1QkFBS04sU0FBTCxDQUFlSyxLQUFmLEVBQXNCYyxXQUF0QixHQUFvQ0wsRUFBRUMsS0FBRixDQUFRSSxXQUE1QztBQUNBYix1QkFBS2MsTUFBTDtBQUNELGlCQU5ELE1BTU87QUFDTGIscUJBQUdVLFNBQUgsQ0FBYTtBQUNYcEIsMkJBQU9pQixFQUFFQyxLQUFGLENBQVFNLEtBREo7QUFFWEMsMEJBQU07QUFGSyxtQkFBYjtBQUlEO0FBQ0YsZUFsQkQ7QUFtQkQ7QUFDRjtBQXhCVSxTQUFiO0FBMEJELE9BdkZPO0FBd0ZSSSxtQkF4RlEseUJBd0ZNdEIsUUF4Rk4sRUF3RmdCO0FBQ3RCLHdCQUFLO0FBQ0hRLGVBQUt4QixJQUFJc0MsYUFETjtBQUVIL0IsZ0JBQU07QUFDSlM7QUFESTtBQUZILFNBQUwsRUFLR1MsSUFMSCxDQUtRO0FBQUEsaUJBQU9jLFFBQVFDLEdBQVIsQ0FBWWxCLEdBQVosQ0FBUDtBQUFBLFNBTFI7QUFNRDtBQS9GTyxLLFFBdUhWbUIsTSxHQUFTLEU7Ozs7OzZCQXRCQSxDQUFFOzs7NkJBQ0Y7QUFDUCxXQUFLQyxXQUFMO0FBQ0Q7OztrQ0FDWTtBQUFBOztBQUNYLHNCQUFLO0FBQ0hsQixhQUFLeEIsSUFBSVksU0FETjtBQUVITCxjQUFNO0FBQ0pvQyxnQkFBTSxDQURGLEVBQ0s7QUFDVEMsbUJBQVMsQ0FGTCxDQUVRO0FBRlI7QUFGSCxPQUFMLEVBTUduQixJQU5ILENBTVEsZUFBTztBQUNiLFlBQUlvQixtQkFBbUJ2QixJQUFJSyxLQUFKLENBQVVrQixnQkFBVixJQUE4QixFQUFyRDtBQUNBLFlBQUlDLGFBQWEsRUFBakI7QUFDQUQseUJBQWlCRSxPQUFqQixDQUF5QixnQkFBUTtBQUMvQkQsdUJBQWFBLFdBQVdFLE1BQVgsQ0FBa0JDLEtBQUtILFVBQXZCLENBQWI7QUFDRCxTQUZEO0FBR0EsZUFBS2xDLFNBQUwsR0FBaUJrQyxVQUFqQjtBQUNBLGVBQUtkLE1BQUw7QUFDRCxPQWREO0FBZUQ7Ozs7RUE1SW1Da0IsZUFBS1AsSTs7a0JBQXRCekMsUSIsImZpbGUiOiJvcmRlcmxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbnZhciBhcGkgPSByZXF1aXJlKCcuLi9hcGkuanMnKTtcclxuaW1wb3J0IHsgYWpheCB9IGZyb20gJy4uL2FqYXguanMnO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K6i5Y2V5YiX6KGoJ1xyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBuYXZBcnI6IFtcclxuICAgICAgeyB0aXRsZTogJ+WFqOmDqCcsIGlkOiAwIH0sXHJcbiAgICAgIHsgdGl0bGU6ICflvoXku5jmrL4nIH0sXHJcbiAgICAgIHsgdGl0bGU6ICflvoXlj5HotKcnIH0sXHJcbiAgICAgIHsgdGl0bGU6ICflvoXmlLbotKcnIH0sXHJcbiAgICAgIHsgdGl0bGU6ICflt7LlrozmiJAnIH1cclxuICAgIF0sXHJcbiAgICBuYXZJZHg6IDAsXHJcbiAgICBvcmRlckxpc3Q6IFtdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIG9yZGVyQ2FuY2VsKG9yZGVyX2lkLCBpbmRleCl7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn56Gu6K6k5Y+W5raI6K6i5Y2VPycsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIGlmKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgICAgIHVybDogYXBpLm9yZGVyQ2FuY2VsLFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9yZGVyX2lkXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKGUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKGUuZGF0YXMuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMubXNnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhhdC5vcmRlckxpc3RbaW5kZXhdLm9yZGVyX3N0YXRlID0gZS5kYXRhcy5vcmRlcl9zdGF0ZVxyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5lcnJvcixcclxuICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgb3JkZXJEZWxldGUob3JkZXJfaWQsIGluZGV4KXtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfnoa7orqTliKDpmaTorqLljZU/JyxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgaWYocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgYWpheCh7XHJcbiAgICAgICAgICAgICAgdXJsOiBhcGkub3JkZXJEZWxldGUsXHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJfaWRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYoZS5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5tc2dcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm9yZGVyTGlzdC5zcGxpY2UoaW5kZXgsMSlcclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMuZXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIG9yZGVyUmVjZWl2ZShvcmRlcl9pZCwgaW5kZXgpe1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+ehruiupOaUtui0pz8nLFxyXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICBpZihyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICBhamF4KHtcclxuICAgICAgICAgICAgICB1cmw6IGFwaS5vcmRlclJlY2VpdmUsXHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJfaWRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYoZS5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5tc2dcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm9yZGVyTGlzdFtpbmRleF0ub3JkZXJfc3RhdGUgPSBlLmRhdGFzLm9yZGVyX3N0YXRlXHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLmRhdGFzLmVycm9yLFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBzZWFyY2hEZWxpdmVyKG9yZGVyX2lkKSB7XHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgIHVybDogYXBpLnNlYXJjaERlbGl2ZXIsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgb3JkZXJfaWRcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IGNvbnNvbGUubG9nKHJlcykpXHJcbiAgICB9XHJcbiAgfTtcclxuICBvbkxvYWQoKSB7fVxyXG4gIG9uU2hvdygpIHtcclxuICAgIHRoaXMucmVxdWVzdExpc3QoKVxyXG4gIH1cclxuICByZXF1ZXN0TGlzdCgpe1xyXG4gICAgYWpheCh7XHJcbiAgICAgIHVybDogYXBpLm9yZGVyTGlzdCxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHBhZ2U6IDMsIC8vIFxyXG4gICAgICAgIGN1cnBhZ2U6IDEgIC8vIOW9k+WJjemhteeggVxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHZhciBvcmRlcl9ncm91cF9saXN0ID0gcmVzLmRhdGFzLm9yZGVyX2dyb3VwX2xpc3QgfHwgW11cclxuICAgICAgdmFyIG9yZGVyX2xpc3QgPSBbXVxyXG4gICAgICBvcmRlcl9ncm91cF9saXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgb3JkZXJfbGlzdCA9IG9yZGVyX2xpc3QuY29uY2F0KGl0ZW0ub3JkZXJfbGlzdClcclxuICAgICAgfSlcclxuICAgICAgdGhpcy5vcmRlckxpc3QgPSBvcmRlcl9saXN0XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBldmVudHMgPSB7fTtcclxufVxyXG4iXX0=