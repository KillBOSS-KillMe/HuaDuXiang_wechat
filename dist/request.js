'use strict';

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  request: function request(e) {
    return new Promise(function (resolve) {
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
        return resolve(res.data);
      }).catch(function (err) {
        return console.warn(err, '&#x53EA;&#x6709;&#x548C;&#x6211;&#x4E0A;&#x5E1D;&#x80FD;&#x770B;&#x61C2;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x6DF1;&#x5751;&#x8BEF;&#x78B0;&#xFF01;1571648153670');
      });
    });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3QuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVlc3QiLCJlIiwiUHJvbWlzZSIsIndlcHkiLCJ1cmwiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwidG9rZW4iLCJoZWFkZXIiLCJtZXRob2QiLCJ0eXBlIiwiZGF0YVR5cGUiLCJyZXNwb25zZVR5cGUiLCJ0aGVuIiwicmVzb2x2ZSIsInJlcyIsImNhdGNoIiwiY29uc29sZSIsIndhcm4iLCJlcnIiXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7OztBQUVBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFNBRGUsbUJBQ1BDLENBRE8sRUFDSjtBQUNULFdBQU8sSUFBSUMsT0FBSixDQUFZLG1CQUFXO0FBQzVCQyxxQkFBS0gsT0FBTCxDQUFhO0FBQ1hJLGFBQUtILEVBQUVHLEdBREk7QUFFWEMsY0FBTUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JOLEVBQUVJLElBQXBCLEVBQTBCO0FBQzlCRyxpQkFBTztBQUR1QixTQUExQixDQUZLO0FBS1hDLGdCQUFRUixFQUFFUSxNQUFGLElBQVk7QUFDbEIsMEJBQWdCO0FBREUsU0FMVDtBQVFYQyxnQkFBUVQsRUFBRVUsSUFBRixJQUFVLE1BUlA7QUFTWEMsa0JBQVVYLEVBQUVXLFFBQUYsSUFBYyxNQVRiO0FBVVhDLHNCQUFjWixFQUFFWSxZQUFGLElBQWtCO0FBVnJCLE9BQWIsRUFZR0MsSUFaSCxDQVlRO0FBQUEsZUFBT0MsUUFBUUMsSUFBSVgsSUFBWixDQUFQO0FBQUEsT0FaUixFQWFHWSxLQWJILENBYVM7QUFBQSxlQUFPQyxRQUFRQyxJQUFSLENBQWFDLEdBQWIsRUFBa0IsdUtBQWxCLENBQVA7QUFBQSxPQWJUO0FBY0QsS0FmTSxDQUFQO0FBaUJEO0FBbkJjLENBQWpCIiwiZmlsZSI6InJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICByZXF1ZXN0KGUpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IGUudXJsLFxyXG4gICAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGUuZGF0YSwge1xyXG4gICAgICAgICAgdG9rZW46IDEyMzQ1Njc4OTEwXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgaGVhZGVyOiBlLmhlYWRlciB8fCB7XHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2Q6IGUudHlwZSB8fCBcIlBPU1RcIixcclxuICAgICAgICBkYXRhVHlwZTogZS5kYXRhVHlwZSB8fCBcImpzb25cIixcclxuICAgICAgICByZXNwb25zZVR5cGU6IGUucmVzcG9uc2VUeXBlIHx8IFwidGV4dFwiXHJcbiAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlc29sdmUocmVzLmRhdGEpKVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS53YXJuKGVyciwgJyYjeDUzRUE7JiN4NjcwOTsmI3g1NDhDOyYjeDYyMTE7JiN4NEUwQTsmI3g1RTFEOyYjeDgwRkQ7JiN4NzcwQjsmI3g2MUMyOyYjeDhGRDk7JiN4NkJCNTsmI3g0RUUzOyYjeDc4MDE7JiN4RkYwQzsmI3g2REYxOyYjeDU3NTE7JiN4OEJFRjsmI3g3OEIwOyYjeEZGMDE7MTU3MTY0ODE1MzY3MCcpKVxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG59Il19