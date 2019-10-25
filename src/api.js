
const URL = "http://www.shopdate.me"

module.exports = {
  // 登录
  login: URL + "/api/mobile/index.php?w=logout&t=index",
  // 首页—商品列表接口
  indexGoodsList: URL + "/api/mobile/index.php?t=goods_list&w=goods",
  // 普通商品详情
  ordinaryGoodsDtail: URL + "/api/mobile/index.php?t=goods_detail&w=goods&=36",
}
