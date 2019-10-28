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
          'content-type': 'application/json'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImFqYXgiLCJlIiwiUHJvbWlzZSIsIndlcHkiLCJzaG93TG9hZGluZyIsInRpdGxlIiwicmVxdWVzdCIsInVybCIsImRhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJ0b2tlbiIsImhlYWRlciIsIm1ldGhvZCIsInR5cGUiLCJkYXRhVHlwZSIsInJlc3BvbnNlVHlwZSIsInRoZW4iLCJyZXNvbHZlIiwicmVzIiwiaGlkZUxvYWRpbmciLCJjYXRjaCIsImNvbnNvbGUiLCJ3YXJuIiwiZXJyIl0sIm1hcHBpbmdzIjoiOztBQUNBOzs7Ozs7QUFFQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxNQURlLGdCQUNWQyxDQURVLEVBQ1A7QUFDTixXQUFPLElBQUlDLE9BQUosQ0FBWSxtQkFBVztBQUM1QkMscUJBQUtDLFdBQUwsQ0FBaUI7QUFDZkMsZUFBTztBQURRLE9BQWpCO0FBR0FGLHFCQUFLRyxPQUFMLENBQWE7QUFDWEMsYUFBS04sRUFBRU0sR0FESTtBQUVYQyxjQUFNQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQlQsRUFBRU8sSUFBcEIsRUFBMEI7QUFDOUJHLGlCQUFPO0FBRHVCLFNBQTFCLENBRks7QUFLWEMsZ0JBQVFYLEVBQUVXLE1BQUYsSUFBWTtBQUNsQiwwQkFBZ0I7QUFERSxTQUxUO0FBUVhDLGdCQUFRWixFQUFFYSxJQUFGLElBQVUsTUFSUDtBQVNYQyxrQkFBVWQsRUFBRWMsUUFBRixJQUFjLE1BVGI7QUFVWEMsc0JBQWNmLEVBQUVlLFlBQUYsSUFBa0I7QUFWckIsT0FBYixFQVlHQyxJQVpILENBWVEsZUFBTztBQUNYQyxnQkFBUUMsSUFBSVgsSUFBWjtBQUNBTCx1QkFBS2lCLFdBQUw7QUFDRCxPQWZILEVBZ0JHQyxLQWhCSCxDQWdCUyxlQUFPO0FBQ1pDLGdCQUFRQyxJQUFSLENBQWFDLEdBQWIsRUFBa0IsdUtBQWxCO0FBQ0FyQix1QkFBS2lCLFdBQUw7QUFDRCxPQW5CSDtBQW9CRCxLQXhCTSxDQUFQO0FBMEJEO0FBNUJjLENBQWpCIiwiZmlsZSI6ImFqYXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBhamF4KGUpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgdGl0bGU6IFwi5Yqg6L295LitXCJcclxuICAgICAgfSlcclxuICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IGUudXJsLFxyXG4gICAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGUuZGF0YSwge1xyXG4gICAgICAgICAgdG9rZW46IDEyMzQ1Njc4OTEwXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgaGVhZGVyOiBlLmhlYWRlciB8fCB7XHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2Q6IGUudHlwZSB8fCBcIlBPU1RcIixcclxuICAgICAgICBkYXRhVHlwZTogZS5kYXRhVHlwZSB8fCBcImpzb25cIixcclxuICAgICAgICByZXNwb25zZVR5cGU6IGUucmVzcG9uc2VUeXBlIHx8IFwidGV4dFwiXHJcbiAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXHJcbiAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKGVyciwgJyYjeDUzRUE7JiN4NjcwOTsmI3g1NDhDOyYjeDYyMTE7JiN4NEUwQTsmI3g1RTFEOyYjeDgwRkQ7JiN4NzcwQjsmI3g2MUMyOyYjeDhGRDk7JiN4NkJCNTsmI3g0RUUzOyYjeDc4MDE7JiN4RkYwQzsmI3g2REYxOyYjeDU3NTE7JiN4OEJFRjsmI3g3OEIwOyYjeEZGMDE7MTU3MTY0ODE1MzY3MCcpXHJcbiAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG59Il19