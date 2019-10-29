'use strict';

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  ajax: function ajax(e) {
    return new Promise(function (resolve) {
      _wepy2.default.showLoading({
        title: "加载中"
      });
      _wepy2.default.request({
        url: e.url,
        data: Object.assign({}, e.data, {
          token: 12345678910
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImFqYXgiLCJlIiwiUHJvbWlzZSIsIndlcHkiLCJzaG93TG9hZGluZyIsInRpdGxlIiwicmVxdWVzdCIsInVybCIsImRhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJ0b2tlbiIsImhlYWRlciIsIm1ldGhvZCIsInR5cGUiLCJkYXRhVHlwZSIsInJlc3BvbnNlVHlwZSIsInRoZW4iLCJyZXNvbHZlIiwicmVzIiwiaGlkZUxvYWRpbmciLCJjYXRjaCIsImNvbnNvbGUiLCJ3YXJuIiwiZXJyIl0sIm1hcHBpbmdzIjoiOztBQUNBOzs7Ozs7QUFFQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxNQURlLGdCQUNWQyxDQURVLEVBQ1A7QUFDTixXQUFPLElBQUlDLE9BQUosQ0FBWSxtQkFBVztBQUM1QkMscUJBQUtDLFdBQUwsQ0FBaUI7QUFDZkMsZUFBTztBQURRLE9BQWpCO0FBR0FGLHFCQUFLRyxPQUFMLENBQWE7QUFDWEMsYUFBS04sRUFBRU0sR0FESTtBQUVYQyxjQUFNQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQlQsRUFBRU8sSUFBcEIsRUFBMEI7QUFDOUJHLGlCQUFPO0FBRHVCLFNBQTFCLENBRks7QUFLWEMsZ0JBQVFYLEVBQUVXLE1BQUYsSUFBWTtBQUNsQiwwQkFBZ0I7QUFERSxTQUxUO0FBUVhDLGdCQUFRWixFQUFFYSxJQUFGLElBQVUsTUFSUDtBQVNYQyxrQkFBVWQsRUFBRWMsUUFBRixJQUFjLE1BVGI7QUFVWEMsc0JBQWNmLEVBQUVlLFlBQUYsSUFBa0I7QUFWckIsT0FBYixFQVlHQyxJQVpILENBWVEsZUFBTztBQUNYQyxnQkFBUUMsSUFBSVgsSUFBWjtBQUNBTCx1QkFBS2lCLFdBQUw7QUFDRCxPQWZILEVBZ0JHQyxLQWhCSCxDQWdCUyxlQUFPO0FBQ1pDLGdCQUFRQyxJQUFSLENBQWFDLEdBQWIsRUFBa0IsdUtBQWxCO0FBQ0FyQix1QkFBS2lCLFdBQUw7QUFDRCxPQW5CSDtBQW9CRCxLQXhCTSxDQUFQO0FBMEJEO0FBNUJjLENBQWpCIiwiZmlsZSI6ImFqYXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBhamF4KGUpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgdGl0bGU6IFwi5Yqg6L295LitXCJcclxuICAgICAgfSlcclxuICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IGUudXJsLFxyXG4gICAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGUuZGF0YSwge1xyXG4gICAgICAgICAgdG9rZW46IDEyMzQ1Njc4OTEwXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgaGVhZGVyOiBlLmhlYWRlciB8fCB7XHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZDogZS50eXBlIHx8IFwiUE9TVFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiBlLmRhdGFUeXBlIHx8IFwianNvblwiLFxyXG4gICAgICAgIHJlc3BvbnNlVHlwZTogZS5yZXNwb25zZVR5cGUgfHwgXCJ0ZXh0XCJcclxuICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcclxuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oZXJyLCAnJiN4NTNFQTsmI3g2NzA5OyYjeDU0OEM7JiN4NjIxMTsmI3g0RTBBOyYjeDVFMUQ7JiN4ODBGRDsmI3g3NzBCOyYjeDYxQzI7JiN4OEZEOTsmI3g2QkI1OyYjeDRFRTM7JiN4NzgwMTsmI3hGRjBDOyYjeDZERjE7JiN4NTc1MTsmI3g4QkVGOyYjeDc4QjA7JiN4RkYwMTsxNTcxNjQ4MTUzNjcwJylcclxuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICB9XHJcbn0iXX0=