'use strict';

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  ajax: function ajax(e) {
    var key = wx.getStorageSync('user').token;
    return new Promise(function (resolve) {
      e.icon !== 'none' && _wepy2.default.showLoading({
        title: "加载中"
      });
      _wepy2.default.request({
        url: e.url + '&key=' + key,
        data: Object.assign({
          key: key
        }, e.data),
        header: e.header || {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: e.type || "POST",
        dataType: e.dataType || "json",
        responseType: e.responseType || "text"
      }).then(function (res) {
        resolve(res.data);
        _wepy2.default.hideLoading();
      }).catch(function (err) {
        console.warn(err, '&#x53EA;&#x6709;&#x548C;&#x6211;&#x4E0A;&#x5E1D;&#x80FD;&#x770B;&#x61C2;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x6DF1;&#x5751;&#x8BEF;&#x78B0;&#xFF01;1571648153670');
        _wepy2.default.hideLoading();
      });
    });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImFqYXgiLCJlIiwia2V5Iiwid3giLCJnZXRTdG9yYWdlU3luYyIsInRva2VuIiwiUHJvbWlzZSIsImljb24iLCJ3ZXB5Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsInJlcXVlc3QiLCJ1cmwiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwiaGVhZGVyIiwibWV0aG9kIiwidHlwZSIsImRhdGFUeXBlIiwicmVzcG9uc2VUeXBlIiwidGhlbiIsInJlc29sdmUiLCJyZXMiLCJoaWRlTG9hZGluZyIsImNhdGNoIiwiY29uc29sZSIsIndhcm4iLCJlcnIiXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7OztBQUVBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLE1BRGUsZ0JBQ1ZDLENBRFUsRUFDUDtBQUNOLFFBQUlDLE1BQU1DLEdBQUdDLGNBQUgsQ0FBa0IsTUFBbEIsRUFBMEJDLEtBQXBDO0FBQ0EsV0FBTyxJQUFJQyxPQUFKLENBQVksbUJBQVc7QUFDNUJMLFFBQUVNLElBQUYsS0FBVyxNQUFYLElBQXFCQyxlQUFLQyxXQUFMLENBQWlCO0FBQ3BDQyxlQUFPO0FBRDZCLE9BQWpCLENBQXJCO0FBR0FGLHFCQUFLRyxPQUFMLENBQWE7QUFDWEMsYUFBS1gsRUFBRVcsR0FBRixHQUFRLE9BQVIsR0FBa0JWLEdBRFo7QUFFWFcsY0FBTUMsT0FBT0MsTUFBUCxDQUFjO0FBQ2xCYixlQUFLQTtBQURhLFNBQWQsRUFFSEQsRUFBRVksSUFGQyxDQUZLO0FBS1hHLGdCQUFRZixFQUFFZSxNQUFGLElBQVk7QUFDbEIsMEJBQWdCO0FBREUsU0FMVDtBQVFYQyxnQkFBUWhCLEVBQUVpQixJQUFGLElBQVUsTUFSUDtBQVNYQyxrQkFBVWxCLEVBQUVrQixRQUFGLElBQWMsTUFUYjtBQVVYQyxzQkFBY25CLEVBQUVtQixZQUFGLElBQWtCO0FBVnJCLE9BQWIsRUFZR0MsSUFaSCxDQVlRLGVBQU87QUFDWEMsZ0JBQVFDLElBQUlWLElBQVo7QUFDQUwsdUJBQUtnQixXQUFMO0FBQ0QsT0FmSCxFQWdCR0MsS0FoQkgsQ0FnQlMsZUFBTztBQUNaQyxnQkFBUUMsSUFBUixDQUFhQyxHQUFiLEVBQWtCLHVLQUFsQjtBQUNBcEIsdUJBQUtnQixXQUFMO0FBQ0QsT0FuQkg7QUFvQkQsS0F4Qk0sQ0FBUDtBQTBCRDtBQTdCYyxDQUFqQiIsImZpbGUiOiJhamF4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgYWpheChlKSB7XHJcbiAgICB2YXIga2V5ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXInKS50b2tlblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICBlLmljb24gIT09ICdub25lJyAmJiB3ZXB5LnNob3dMb2FkaW5nKHtcclxuICAgICAgICB0aXRsZTogXCLliqDovb3kuK1cIlxyXG4gICAgICB9KVxyXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogZS51cmwgKyAnJmtleT0nICsga2V5LFxyXG4gICAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgICAga2V5OiBrZXlcclxuICAgICAgICB9LCBlLmRhdGEpLFxyXG4gICAgICAgIGhlYWRlcjogZS5oZWFkZXIgfHwge1xyXG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2Q6IGUudHlwZSB8fCBcIlBPU1RcIixcclxuICAgICAgICBkYXRhVHlwZTogZS5kYXRhVHlwZSB8fCBcImpzb25cIixcclxuICAgICAgICByZXNwb25zZVR5cGU6IGUucmVzcG9uc2VUeXBlIHx8IFwidGV4dFwiXHJcbiAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXHJcbiAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKGVyciwgJyYjeDUzRUE7JiN4NjcwOTsmI3g1NDhDOyYjeDYyMTE7JiN4NEUwQTsmI3g1RTFEOyYjeDgwRkQ7JiN4NzcwQjsmI3g2MUMyOyYjeDhGRDk7JiN4NkJCNTsmI3g0RUUzOyYjeDc4MDE7JiN4RkYwQzsmI3g2REYxOyYjeDU3NTE7JiN4OEJFRjsmI3g3OEIwOyYjeEZGMDE7MTU3MTY0ODE1MzY3MCcpXHJcbiAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG59Il19