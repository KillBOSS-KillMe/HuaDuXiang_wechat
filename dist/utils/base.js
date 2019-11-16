'use strict';

module.exports = {
  formatDate: function formatDate(secs) {
    var length = secs.toString().length;
    secs = length == 10 ? Number(secs + '000') : Number(secs);
    var t = new Date(secs);
    var year = t.getFullYear();
    var month = t.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    var date = t.getDate();
    if (date < 10) {
      date = '0' + date;
    }
    var hour = t.getHours();
    if (hour < 10) {
      hour = '0' + hour;
    }
    var minute = t.getMinutes();
    if (minute < 10) {
      minute = '0' + minute;
    }
    var second = t.getSeconds();
    if (second < 10) {
      second = '0' + second;
    }
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImZvcm1hdERhdGUiLCJzZWNzIiwibGVuZ3RoIiwidG9TdHJpbmciLCJOdW1iZXIiLCJ0IiwiRGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXRlIiwiZ2V0RGF0ZSIsImhvdXIiLCJnZXRIb3VycyIsIm1pbnV0ZSIsImdldE1pbnV0ZXMiLCJzZWNvbmQiLCJnZXRTZWNvbmRzIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLGNBQVksb0JBQVVDLElBQVYsRUFBZ0I7QUFDMUIsUUFBSUMsU0FBU0QsS0FBS0UsUUFBTCxHQUFnQkQsTUFBN0I7QUFDQ0QsV0FBT0MsVUFBVSxFQUFWLEdBQWVFLE9BQU9ILE9BQU8sS0FBZCxDQUFmLEdBQXNDRyxPQUFPSCxJQUFQLENBQTdDO0FBQ0EsUUFBSUksSUFBSSxJQUFJQyxJQUFKLENBQVNMLElBQVQsQ0FBUjtBQUNBLFFBQUlNLE9BQU9GLEVBQUVHLFdBQUYsRUFBWDtBQUNBLFFBQUlDLFFBQVFKLEVBQUVLLFFBQUYsS0FBZSxDQUEzQjtBQUNBLFFBQUdELFFBQVEsRUFBWCxFQUFjO0FBQUNBLGNBQVEsTUFBTUEsS0FBZDtBQUFvQjtBQUNuQyxRQUFJRSxPQUFPTixFQUFFTyxPQUFGLEVBQVg7QUFDQSxRQUFHRCxPQUFPLEVBQVYsRUFBYTtBQUFDQSxhQUFPLE1BQU1BLElBQWI7QUFBa0I7QUFDaEMsUUFBSUUsT0FBT1IsRUFBRVMsUUFBRixFQUFYO0FBQ0EsUUFBR0QsT0FBTyxFQUFWLEVBQWE7QUFBQ0EsYUFBTyxNQUFNQSxJQUFiO0FBQWtCO0FBQ2hDLFFBQUlFLFNBQVNWLEVBQUVXLFVBQUYsRUFBYjtBQUNBLFFBQUdELFNBQVMsRUFBWixFQUFlO0FBQUNBLGVBQVMsTUFBTUEsTUFBZjtBQUFzQjtBQUN0QyxRQUFJRSxTQUFTWixFQUFFYSxVQUFGLEVBQWI7QUFDQSxRQUFHRCxTQUFTLEVBQVosRUFBZTtBQUFDQSxlQUFTLE1BQU1BLE1BQWY7QUFBc0I7QUFDdEMsV0FBT1YsT0FBSyxHQUFMLEdBQVNFLEtBQVQsR0FBZSxHQUFmLEdBQW1CRSxJQUFuQixHQUF3QixHQUF4QixHQUE0QkUsSUFBNUIsR0FBaUMsR0FBakMsR0FBcUNFLE1BQXJDLEdBQTRDLEdBQTVDLEdBQWdERSxNQUF2RDtBQUNGO0FBakJjLENBQWpCIiwiZmlsZSI6ImJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICBmb3JtYXREYXRlOiBmdW5jdGlvbiAoc2Vjcykge1xyXG4gICAgdmFyIGxlbmd0aCA9IHNlY3MudG9TdHJpbmcoKS5sZW5ndGhcclxuICAgICBzZWNzID0gbGVuZ3RoID09IDEwID8gTnVtYmVyKHNlY3MgKyAnMDAwJykgOiBOdW1iZXIoc2VjcylcclxuwqDCoMKgwqDCoHZhciB0ID0gbmV3IERhdGUoc2VjcylcclxuwqDCoMKgwqDCoHZhciB5ZWFyID0gdC5nZXRGdWxsWWVhcigpXHJcbsKgwqDCoMKgwqB2YXIgbW9udGggPSB0LmdldE1vbnRoKCkgKyAxXHJcbsKgwqDCoMKgwqBpZihtb250aCA8IDEwKXttb250aCA9ICcwJyArIG1vbnRofVxyXG7CoMKgwqDCoMKgdmFyIGRhdGUgPSB0LmdldERhdGUoKVxyXG7CoMKgwqDCoMKgaWYoZGF0ZSA8IDEwKXtkYXRlID0gJzAnICsgZGF0ZX1cclxuwqDCoMKgwqDCoHZhciBob3VyID0gdC5nZXRIb3VycygpXHJcbsKgwqDCoMKgwqBpZihob3VyIDwgMTApe2hvdXIgPSAnMCcgKyBob3VyfVxyXG7CoMKgwqDCoMKgdmFyIG1pbnV0ZSA9IHQuZ2V0TWludXRlcygpXHJcbsKgwqDCoMKgwqBpZihtaW51dGUgPCAxMCl7bWludXRlID0gJzAnICsgbWludXRlfVxyXG7CoMKgwqDCoMKgdmFyIHNlY29uZCA9IHQuZ2V0U2Vjb25kcygpXHJcbsKgwqDCoMKgwqBpZihzZWNvbmQgPCAxMCl7c2Vjb25kID0gJzAnICsgc2Vjb25kfVxyXG7CoMKgwqDCoMKgcmV0dXJuIHllYXIrJy0nK21vbnRoKyctJytkYXRlKycgJytob3VyKyc6JyttaW51dGUrJzonK3NlY29uZFxyXG4gIH1cclxufSJdfQ==