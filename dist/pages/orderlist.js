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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVybGlzdC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJyZXF1aXJlIiwiU2hvcENhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJuYXZBcnIiLCJ0aXRsZSIsImlkIiwibmF2SWR4Iiwib3JkZXJMaXN0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwib3JkZXJDYW5jZWwiLCJvcmRlcl9pZCIsImluZGV4IiwidGhhdCIsInd4Iiwic2hvd01vZGFsIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJ1cmwiLCJ0aGVuIiwiZSIsImRhdGFzIiwic3RhdGUiLCJzaG93VG9hc3QiLCJtc2ciLCJvcmRlcl9zdGF0ZSIsIiRhcHBseSIsImVycm9yIiwiaWNvbiIsIm9yZGVyRGVsZXRlIiwic3BsaWNlIiwib3JkZXJSZWNlaXZlIiwiZXZlbnRzIiwicmVxdWVzdExpc3QiLCJwYWdlIiwiY3VycGFnZSIsIm9yZGVyX2dyb3VwX2xpc3QiLCJvcmRlcl9saXN0IiwiZm9yRWFjaCIsImNvbmNhdCIsIml0ZW0iLCJ3ZXB5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBREEsSUFBSUEsTUFBTUMsUUFBUSxXQUFSLENBQVY7O0lBSXFCQyxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsY0FBUSxDQUNOLEVBQUVDLE9BQU8sSUFBVCxFQUFlQyxJQUFJLENBQW5CLEVBRE0sRUFFTixFQUFFRCxPQUFPLEtBQVQsRUFGTSxFQUdOLEVBQUVBLE9BQU8sS0FBVCxFQUhNLEVBSU4sRUFBRUEsT0FBTyxLQUFULEVBSk0sRUFLTixFQUFFQSxPQUFPLEtBQVQsRUFMTSxDQURIO0FBUUxFLGNBQVEsQ0FSSDtBQVNMQyxpQkFBVztBQVROLEssUUFZUEMs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QUFJRDtBQUNGLGVBbEJEO0FBbUJEO0FBQ0Y7QUF4QlUsU0FBYjtBQTBCRDtBQXZGTyxLLFFBK0dWSSxNLEdBQVMsRTs7Ozs7NkJBdEJBLENBQUU7Ozs2QkFDRjtBQUNQLFdBQUtDLFdBQUw7QUFDRDs7O2tDQUNZO0FBQUE7O0FBQ1gsc0JBQUs7QUFDSGYsYUFBS3hCLElBQUlZLFNBRE47QUFFSEwsY0FBTTtBQUNKaUMsZ0JBQU0sQ0FERixFQUNLO0FBQ1RDLG1CQUFTLENBRkwsQ0FFUTtBQUZSO0FBRkgsT0FBTCxFQU1HaEIsSUFOSCxDQU1RLGVBQU87QUFDYixZQUFJaUIsbUJBQW1CcEIsSUFBSUssS0FBSixDQUFVZSxnQkFBVixJQUE4QixFQUFyRDtBQUNBLFlBQUlDLGFBQWEsRUFBakI7QUFDQUQseUJBQWlCRSxPQUFqQixDQUF5QixnQkFBUTtBQUMvQkQsdUJBQWFBLFdBQVdFLE1BQVgsQ0FBa0JDLEtBQUtILFVBQXZCLENBQWI7QUFDRCxTQUZEO0FBR0EsZUFBSy9CLFNBQUwsR0FBaUIrQixVQUFqQjtBQUNBLGVBQUtYLE1BQUw7QUFDRCxPQWREO0FBZUQ7Ozs7RUFwSW1DZSxlQUFLUCxJOztrQkFBdEJ0QyxRIiwiZmlsZSI6Im9yZGVybGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxudmFyIGFwaSA9IHJlcXVpcmUoJy4uL2FwaS5qcycpO1xyXG5pbXBvcnQgeyBhamF4IH0gZnJvbSAnLi4vYWpheC5qcyc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXliJfooagnXHJcbiAgfTtcclxuXHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIG5hdkFycjogW1xyXG4gICAgICB7IHRpdGxlOiAn5YWo6YOoJywgaWQ6IDAgfSxcclxuICAgICAgeyB0aXRsZTogJ+W+heS7mOasvicgfSxcclxuICAgICAgeyB0aXRsZTogJ+W+heWPkei0pycgfSxcclxuICAgICAgeyB0aXRsZTogJ+W+heaUtui0pycgfSxcclxuICAgICAgeyB0aXRsZTogJ+W3suWujOaIkCcgfVxyXG4gICAgXSxcclxuICAgIG5hdklkeDogMCxcclxuICAgIG9yZGVyTGlzdDogW11cclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgb3JkZXJDYW5jZWwob3JkZXJfaWQsIGluZGV4KXtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfnoa7orqTlj5bmtojorqLljZU/JyxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgaWYocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgYWpheCh7XHJcbiAgICAgICAgICAgICAgdXJsOiBhcGkub3JkZXJDYW5jZWwsXHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJfaWRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYoZS5kYXRhcy5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5tc2dcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm9yZGVyTGlzdFtpbmRleF0ub3JkZXJfc3RhdGUgPSBlLmRhdGFzLm9yZGVyX3N0YXRlXHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLmRhdGFzLmVycm9yLFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBvcmRlckRlbGV0ZShvcmRlcl9pZCwgaW5kZXgpe1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+ehruiupOWIoOmZpOiuouWNlT8nLFxyXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICBpZihyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICBhamF4KHtcclxuICAgICAgICAgICAgICB1cmw6IGFwaS5vcmRlckRlbGV0ZSxcclxuICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcmRlcl9pZFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkudGhlbihlID0+IHtcclxuICAgICAgICAgICAgICBpZihlLmRhdGFzLnN0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLmRhdGFzLm1zZ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoYXQub3JkZXJMaXN0LnNwbGljZShpbmRleCwxKVxyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogZS5kYXRhcy5lcnJvcixcclxuICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgb3JkZXJSZWNlaXZlKG9yZGVyX2lkLCBpbmRleCl7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn56Gu6K6k5pS26LSnPycsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIGlmKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgICAgIHVybDogYXBpLm9yZGVyUmVjZWl2ZSxcclxuICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvcmRlcl9pZFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkudGhlbihlID0+IHtcclxuICAgICAgICAgICAgICBpZihlLmRhdGFzLnN0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBlLmRhdGFzLm1zZ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoYXQub3JkZXJMaXN0W2luZGV4XS5vcmRlcl9zdGF0ZSA9IGUuZGF0YXMub3JkZXJfc3RhdGVcclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGUuZGF0YXMuZXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH07XHJcbiAgb25Mb2FkKCkge31cclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RMaXN0KClcclxuICB9XHJcbiAgcmVxdWVzdExpc3QoKXtcclxuICAgIGFqYXgoe1xyXG4gICAgICB1cmw6IGFwaS5vcmRlckxpc3QsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBwYWdlOiAzLCAvLyBcclxuICAgICAgICBjdXJwYWdlOiAxICAvLyDlvZPliY3pobXnoIFcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB2YXIgb3JkZXJfZ3JvdXBfbGlzdCA9IHJlcy5kYXRhcy5vcmRlcl9ncm91cF9saXN0IHx8IFtdXHJcbiAgICAgIHZhciBvcmRlcl9saXN0ID0gW11cclxuICAgICAgb3JkZXJfZ3JvdXBfbGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIG9yZGVyX2xpc3QgPSBvcmRlcl9saXN0LmNvbmNhdChpdGVtLm9yZGVyX2xpc3QpXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMub3JkZXJMaXN0ID0gb3JkZXJfbGlzdFxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZXZlbnRzID0ge307XHJcbn1cclxuIl19