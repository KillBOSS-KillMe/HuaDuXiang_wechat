'use strict';

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  ajax: function ajax(e) {
    // var key = '7731b8f19c93a412ee7b84a478fa6f8d'
    // var key = 'e2aaa7a05d469eda23baaf42fb6f3baa'

    var key = wx.getStorageSync('user').token;
    return new Promise(function (resolve) {
      e.icon !== 'none' && _wepy2.default.showLoading({
        title: "加载中"
      });
      _wepy2.default.request({
        url: e.url + '&key=' + key,
        data: Object.assign({}, e.data),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImFqYXgiLCJlIiwia2V5Iiwid3giLCJnZXRTdG9yYWdlU3luYyIsInRva2VuIiwiUHJvbWlzZSIsImljb24iLCJ3ZXB5Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsInJlcXVlc3QiLCJ1cmwiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwiaGVhZGVyIiwibWV0aG9kIiwidHlwZSIsImRhdGFUeXBlIiwicmVzcG9uc2VUeXBlIiwidGhlbiIsInJlc29sdmUiLCJyZXMiLCJoaWRlTG9hZGluZyIsImNhdGNoIiwiY29uc29sZSIsIndhcm4iLCJlcnIiXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7OztBQUVBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLE1BRGUsZ0JBQ1ZDLENBRFUsRUFDUDtBQUNOO0FBQ0E7O0FBRUEsUUFBSUMsTUFBTUMsR0FBR0MsY0FBSCxDQUFrQixNQUFsQixFQUEwQkMsS0FBcEM7QUFDQSxXQUFPLElBQUlDLE9BQUosQ0FBWSxtQkFBVztBQUM1QkwsUUFBRU0sSUFBRixLQUFXLE1BQVgsSUFBcUJDLGVBQUtDLFdBQUwsQ0FBaUI7QUFDcENDLGVBQU87QUFENkIsT0FBakIsQ0FBckI7QUFHQUYscUJBQUtHLE9BQUwsQ0FBYTtBQUNYQyxhQUFLWCxFQUFFVyxHQUFGLEdBQVEsT0FBUixHQUFrQlYsR0FEWjtBQUVYVyxjQUFNQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQmQsRUFBRVksSUFBcEIsQ0FGSztBQUdYRyxnQkFBUWYsRUFBRWUsTUFBRixJQUFZO0FBQ2xCLDBCQUFnQjtBQURFLFNBSFQ7QUFNWEMsZ0JBQVFoQixFQUFFaUIsSUFBRixJQUFVLE1BTlA7QUFPWEMsa0JBQVVsQixFQUFFa0IsUUFBRixJQUFjLE1BUGI7QUFRWEMsc0JBQWNuQixFQUFFbUIsWUFBRixJQUFrQjtBQVJyQixPQUFiLEVBVUdDLElBVkgsQ0FVUSxlQUFPO0FBQ1hDLGdCQUFRQyxJQUFJVixJQUFaO0FBQ0FMLHVCQUFLZ0IsV0FBTDtBQUNELE9BYkgsRUFjR0MsS0FkSCxDQWNTLGVBQU87QUFDWkMsZ0JBQVFDLElBQVIsQ0FBYUMsR0FBYixFQUFrQix1S0FBbEI7QUFDQXBCLHVCQUFLZ0IsV0FBTDtBQUNELE9BakJIO0FBa0JELEtBdEJNLENBQVA7QUF3QkQ7QUE5QmMsQ0FBakIiLCJmaWxlIjoiYWpheC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGFqYXgoZSkge1xyXG4gICAgLy8gdmFyIGtleSA9ICc3NzMxYjhmMTljOTNhNDEyZWU3Yjg0YTQ3OGZhNmY4ZCdcclxuICAgIC8vIHZhciBrZXkgPSAnZTJhYWE3YTA1ZDQ2OWVkYTIzYmFhZjQyZmI2ZjNiYWEnXHJcbiAgICBcclxuICAgIHZhciBrZXkgPSB3eC5nZXRTdG9yYWdlU3luYygndXNlcicpLnRva2VuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGUuaWNvbiAhPT0gJ25vbmUnICYmIHdlcHkuc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgIHRpdGxlOiBcIuWKoOi9veS4rVwiXHJcbiAgICAgIH0pXHJcbiAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiBlLnVybCArICcma2V5PScgKyBrZXksXHJcbiAgICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgZS5kYXRhKSxcclxuICAgICAgICBoZWFkZXI6IGUuaGVhZGVyIHx8IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kOiBlLnR5cGUgfHwgXCJQT1NUXCIsXHJcbiAgICAgICAgZGF0YVR5cGU6IGUuZGF0YVR5cGUgfHwgXCJqc29uXCIsXHJcbiAgICAgICAgcmVzcG9uc2VUeXBlOiBlLnJlc3BvbnNlVHlwZSB8fCBcInRleHRcIlxyXG4gICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxyXG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUud2FybihlcnIsICcmI3g1M0VBOyYjeDY3MDk7JiN4NTQ4QzsmI3g2MjExOyYjeDRFMEE7JiN4NUUxRDsmI3g4MEZEOyYjeDc3MEI7JiN4NjFDMjsmI3g4RkQ5OyYjeDZCQjU7JiN4NEVFMzsmI3g3ODAxOyYjeEZGMEM7JiN4NkRGMTsmI3g1NzUxOyYjeDhCRUY7JiN4NzhCMDsmI3hGRjAxOzE1NzE2NDgxNTM2NzAnKVxyXG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gIH1cclxufSJdfQ==