
import wepy from 'wepy';
var api = require('./api.js');
class AJAX {
  constructor() {
    this.ajax = this.ajax.bind(this)
  }
  async ajax(e) {
    var key = wx.getStorageSync('user').token
    e.icon !== 'none' && wepy.showLoading({
      title: "加载中"
    })
    var res = await wepy.request({
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
    }).catch(err => {
      console.warn(err, '&#x53EA;&#x6709;&#x548C;&#x6211;&#x4E0A;&#x5E1D;&#x80FD;&#x770B;&#x61C2;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x6DF1;&#x5751;&#x8BEF;&#x78B0;&#xFF01;1571648153670')
      wepy.hideLoading()
    })
    wepy.hideLoading()
    return (res.data.code == 400 && res.data.login == 0) ? this.login(e) : res.data
  }
  async login(data) {
    var e = await wepy.login();
    var res = await this.ajax({
      url: api.getToken,
      data: {
        code: e.code,
        icon: 'none'
      }
    })
    if (res.code == 200 && res.datas.state == 1) {
      wx.setStorageSync('user', res.datas)
      return await this.ajax(data)
    }
  }
}


module.exports = new AJAX()