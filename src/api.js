
const URL = "http://www.shopdate.me"

module.exports = {
  // 登录
  login: URL + "/api/mobile/index.php?w=logout&t=index",
  // 首页—商品列表接口
  indexGoodsList: URL + "/api/mobile/index.php?t=goods_list&w=goods",
  // 首页—获取默认数据接口
  indexDefaultInfo: URL + "/api/mobile/index.php?w=index&t=index",
}
