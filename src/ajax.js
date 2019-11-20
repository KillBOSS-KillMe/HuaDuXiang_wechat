
import wepy from 'wepy';

module.exports = {
  ajax(e) {
    var key = wx.getStorageSync('user').token
    return new Promise(resolve => {
      e.icon !== 'none' && wepy.showLoading({
        title: "加载中"
      })
      wepy.request({
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
      })
        .then(res => {
          resolve(res.data)
          wepy.hideLoading()
        })
        .catch(err => {
          console.warn(err, '&#x53EA;&#x6709;&#x548C;&#x6211;&#x4E0A;&#x5E1D;&#x80FD;&#x770B;&#x61C2;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x6DF1;&#x5751;&#x8BEF;&#x78B0;&#xFF01;1571648153670')
          wepy.hideLoading()
        })
    })

  }
}