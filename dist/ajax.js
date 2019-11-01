'use strict';

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  ajax: function ajax(e) {
    var key = '7731b8f19c93a412ee7b84a478fa6f8d';
    return new Promise(function (resolve) {
      e.icon !== 'none' && _wepy2.default.showLoading({
        title: "加载中"
      });
      _wepy2.default.request({
        url: e.url + '&key=' + key,
        data: Object.assign({}, e.data, {
          token: '公共参数放在ajax.js里面'
        }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImFqYXgiLCJlIiwia2V5IiwiUHJvbWlzZSIsImljb24iLCJ3ZXB5Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsInJlcXVlc3QiLCJ1cmwiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwidG9rZW4iLCJoZWFkZXIiLCJtZXRob2QiLCJ0eXBlIiwiZGF0YVR5cGUiLCJyZXNwb25zZVR5cGUiLCJ0aGVuIiwicmVzb2x2ZSIsInJlcyIsImhpZGVMb2FkaW5nIiwiY2F0Y2giLCJjb25zb2xlIiwid2FybiIsImVyciJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7Ozs7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsTUFEZSxnQkFDVkMsQ0FEVSxFQUNQO0FBQ04sUUFBSUMsTUFBTSxrQ0FBVjtBQUNBLFdBQU8sSUFBSUMsT0FBSixDQUFZLG1CQUFXO0FBQzVCRixRQUFFRyxJQUFGLEtBQVcsTUFBWCxJQUFxQkMsZUFBS0MsV0FBTCxDQUFpQjtBQUNwQ0MsZUFBTztBQUQ2QixPQUFqQixDQUFyQjtBQUdBRixxQkFBS0csT0FBTCxDQUFhO0FBQ1hDLGFBQUtSLEVBQUVRLEdBQUYsR0FBUSxPQUFSLEdBQWtCUCxHQURaO0FBRVhRLGNBQU1DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCWCxFQUFFUyxJQUFwQixFQUEwQjtBQUM5QkcsaUJBQU87QUFEdUIsU0FBMUIsQ0FGSztBQUtYQyxnQkFBUWIsRUFBRWEsTUFBRixJQUFZO0FBQ2xCLDBCQUFnQjtBQURFLFNBTFQ7QUFRWEMsZ0JBQVFkLEVBQUVlLElBQUYsSUFBVSxNQVJQO0FBU1hDLGtCQUFVaEIsRUFBRWdCLFFBQUYsSUFBYyxNQVRiO0FBVVhDLHNCQUFjakIsRUFBRWlCLFlBQUYsSUFBa0I7QUFWckIsT0FBYixFQVlHQyxJQVpILENBWVEsZUFBTztBQUNYQyxnQkFBUUMsSUFBSVgsSUFBWjtBQUNBTCx1QkFBS2lCLFdBQUw7QUFDRCxPQWZILEVBZ0JHQyxLQWhCSCxDQWdCUyxlQUFPO0FBQ1pDLGdCQUFRQyxJQUFSLENBQWFDLEdBQWIsRUFBa0IsdUtBQWxCO0FBQ0FyQix1QkFBS2lCLFdBQUw7QUFDRCxPQW5CSDtBQW9CRCxLQXhCTSxDQUFQO0FBMEJEO0FBN0JjLENBQWpCIiwiZmlsZSI6ImFqYXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBhamF4KGUpIHtcclxuICAgIHZhciBrZXkgPSAnNzczMWI4ZjE5YzkzYTQxMmVlN2I4NGE0NzhmYTZmOGQnXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGUuaWNvbiAhPT0gJ25vbmUnICYmIHdlcHkuc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgIHRpdGxlOiBcIuWKoOi9veS4rVwiXHJcbiAgICAgIH0pXHJcbiAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiBlLnVybCArICcma2V5PScgKyBrZXksXHJcbiAgICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgZS5kYXRhLCB7XHJcbiAgICAgICAgICB0b2tlbjogJ+WFrOWFseWPguaVsOaUvuWcqGFqYXguanPph4zpnaInXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgaGVhZGVyOiBlLmhlYWRlciB8fCB7XHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZDogZS50eXBlIHx8IFwiUE9TVFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiBlLmRhdGFUeXBlIHx8IFwianNvblwiLFxyXG4gICAgICAgIHJlc3BvbnNlVHlwZTogZS5yZXNwb25zZVR5cGUgfHwgXCJ0ZXh0XCJcclxuICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcclxuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oZXJyLCAnJiN4NTNFQTsmI3g2NzA5OyYjeDU0OEM7JiN4NjIxMTsmI3g0RTBBOyYjeDVFMUQ7JiN4ODBGRDsmI3g3NzBCOyYjeDYxQzI7JiN4OEZEOTsmI3g2QkI1OyYjeDRFRTM7JiN4NzgwMTsmI3hGRjBDOyYjeDZERjE7JiN4NTc1MTsmI3g4QkVGOyYjeDc4QjA7JiN4RkYwMTsxNTcxNjQ4MTUzNjcwJylcclxuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICB9XHJcbn0iXX0=