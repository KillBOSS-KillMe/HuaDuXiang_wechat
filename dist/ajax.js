'use strict';

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  ajax: function ajax(e) {
    var key = '7731b8f19c93a412ee7b84a478fa6f8d';
    // key = wx.getStorageSync('user').token
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImFqYXgiLCJlIiwia2V5IiwiUHJvbWlzZSIsImljb24iLCJ3ZXB5Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsInJlcXVlc3QiLCJ1cmwiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwiaGVhZGVyIiwibWV0aG9kIiwidHlwZSIsImRhdGFUeXBlIiwicmVzcG9uc2VUeXBlIiwidGhlbiIsInJlc29sdmUiLCJyZXMiLCJoaWRlTG9hZGluZyIsImNhdGNoIiwiY29uc29sZSIsIndhcm4iLCJlcnIiXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7OztBQUVBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLE1BRGUsZ0JBQ1ZDLENBRFUsRUFDUDtBQUNOLFFBQUlDLE1BQU0sa0NBQVY7QUFDQTtBQUNBLFdBQU8sSUFBSUMsT0FBSixDQUFZLG1CQUFXO0FBQzVCRixRQUFFRyxJQUFGLEtBQVcsTUFBWCxJQUFxQkMsZUFBS0MsV0FBTCxDQUFpQjtBQUNwQ0MsZUFBTztBQUQ2QixPQUFqQixDQUFyQjtBQUdBRixxQkFBS0csT0FBTCxDQUFhO0FBQ1hDLGFBQUtSLEVBQUVRLEdBQUYsR0FBUSxPQUFSLEdBQWtCUCxHQURaO0FBRVhRLGNBQU1DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCWCxFQUFFUyxJQUFwQixDQUZLO0FBR1hHLGdCQUFRWixFQUFFWSxNQUFGLElBQVk7QUFDbEIsMEJBQWdCO0FBREUsU0FIVDtBQU1YQyxnQkFBUWIsRUFBRWMsSUFBRixJQUFVLE1BTlA7QUFPWEMsa0JBQVVmLEVBQUVlLFFBQUYsSUFBYyxNQVBiO0FBUVhDLHNCQUFjaEIsRUFBRWdCLFlBQUYsSUFBa0I7QUFSckIsT0FBYixFQVVHQyxJQVZILENBVVEsZUFBTztBQUNYQyxnQkFBUUMsSUFBSVYsSUFBWjtBQUNBTCx1QkFBS2dCLFdBQUw7QUFDRCxPQWJILEVBY0dDLEtBZEgsQ0FjUyxlQUFPO0FBQ1pDLGdCQUFRQyxJQUFSLENBQWFDLEdBQWIsRUFBa0IsdUtBQWxCO0FBQ0FwQix1QkFBS2dCLFdBQUw7QUFDRCxPQWpCSDtBQWtCRCxLQXRCTSxDQUFQO0FBd0JEO0FBNUJjLENBQWpCIiwiZmlsZSI6ImFqYXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBhamF4KGUpIHtcclxuICAgIHZhciBrZXkgPSAnNzczMWI4ZjE5YzkzYTQxMmVlN2I4NGE0NzhmYTZmOGQnXHJcbiAgICAvLyBrZXkgPSB3eC5nZXRTdG9yYWdlU3luYygndXNlcicpLnRva2VuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGUuaWNvbiAhPT0gJ25vbmUnICYmIHdlcHkuc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgIHRpdGxlOiBcIuWKoOi9veS4rVwiXHJcbiAgICAgIH0pXHJcbiAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiBlLnVybCArICcma2V5PScgKyBrZXksXHJcbiAgICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgZS5kYXRhKSxcclxuICAgICAgICBoZWFkZXI6IGUuaGVhZGVyIHx8IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kOiBlLnR5cGUgfHwgXCJQT1NUXCIsXHJcbiAgICAgICAgZGF0YVR5cGU6IGUuZGF0YVR5cGUgfHwgXCJqc29uXCIsXHJcbiAgICAgICAgcmVzcG9uc2VUeXBlOiBlLnJlc3BvbnNlVHlwZSB8fCBcInRleHRcIlxyXG4gICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxyXG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUud2FybihlcnIsICcmI3g1M0VBOyYjeDY3MDk7JiN4NTQ4QzsmI3g2MjExOyYjeDRFMEE7JiN4NUUxRDsmI3g4MEZEOyYjeDc3MEI7JiN4NjFDMjsmI3g4RkQ5OyYjeDZCQjU7JiN4NEVFMzsmI3g3ODAxOyYjeEZGMEM7JiN4NkRGMTsmI3g1NzUxOyYjeDhCRUY7JiN4NzhCMDsmI3hGRjAxOzE1NzE2NDgxNTM2NzAnKVxyXG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gIH1cclxufSJdfQ==