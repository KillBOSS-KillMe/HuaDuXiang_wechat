module.exports = {
  formatDate: function (secs) {
    var length = secs.toString().length
     secs = length == 10 ? Number(secs + '000') : Number(secs)
     var t = new Date(secs)
     var year = t.getFullYear()
     var month = t.getMonth() + 1
     if(month < 10){month = '0' + month}
     var date = t.getDate()
     if(date < 10){date = '0' + date}
     var hour = t.getHours()
     if(hour < 10){hour = '0' + hour}
     var minute = t.getMinutes()
     if(minute < 10){minute = '0' + minute}
     var second = t.getSeconds()
     if(second < 10){second = '0' + second}
     return year+'-'+month+'-'+date+' '+hour+':'+minute+':'+second
  },
  format: function (type, data) {
    if(type == 'phone') {
      return /^1[3456789]\d{9}$/.test(data)
    } else if(type == 'password') {
      return /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,20})$/.test(data)
    }
  }
}