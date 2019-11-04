
const URL = "http://www.shopdate.me"
// const URL = "http://www.mywdl.com"



module.exports = {
  // 登录
  login: URL + "/api/mobile/index.php?w=logout&t=index",
  // 首页—商品列表接口
  indexGoodsList: URL + "/api/mobile/index.php?t=goods_list&w=goods",
  // 普通商品详情
  ordinaryGoodsDtail: URL + "/api/mobile/index.php?t=goods_detail&w=goods",
  // 首页-轮播图和areaArr菜单
  indexDefaultInfo: URL + "/api/mobile/index.php?w=index&t=index",
  // 01商品购买第一步接口
  memberBuyOne: URL + "/api/mobile/index.php?w=member_buy&t=buy_step1",
  // 02商品生成订单接口
  placeOrder: URL + "/api/mobile/index.php?w=member_buy&t=buy_step2",
  // 03支付方式列表
  memberPayment: URL + "/api/mobile/index.php?w=member_payment&t=payment_list",
  // 04小程序发起支付接口
  pay: URL + "/api/mobile/index.php?w=member_payment&t=pay",
  // 店铺首页接口
  storeIndex: URL + "/api/mobile/index.php?w=store&t=store_info",
  // 店铺商品分类接口
  storeGoodsClass: URL + "/api/mobile/index.php?w=store&t=store_goods_class",
  // 用户个人中心数据接口
  memberInfo: URL + "/api/mobile/index.php?w=member_index",
  // 商品一级分类
  oneGoodsClass: URL + "/api/mobile/index.php?w=goods_class",
  // 商品二级分类接口
  twoGoodsClass: URL + "/api/mobile/index.php?w=goods_class",
  // 商品三级分类接口
  threeGoodsClass: URL + "/api/mobile/index.php?w=goods_class&t=get_child_all",
  // 用户收货地址列表
  addressList: URL + "/api/mobile/index.php?w=member_address&t=address_list",
  // 用户收货地址删除
  addressDel: URL + "/api/mobile/index.php?w=member_address&t=address_del",
  // 用户收货地址添加
  addressAdd: URL + "/api/mobile/index.php?w=member_address&t=address_add",
  // 用户收货地址详细信息
  addressInfo: URL + "/api/mobile/index.php?w=member_address&t=address_info",
  // 收货地址编辑
  addressEdit: URL + "/api/mobile/index.php?w=member_address&t=address_edit",
  // 设置为默认地址
  addressSetdefault: URL + "/api/mobile/index.php?w=member_address&t=address_setdefault",
  // 获取省份-城市—地区 地址接口
  areaList: URL + "/api/mobile/index.php?w=member_address&t=area_list",
  // 获取推荐的品牌名称列表
  recommendList: URL + "/api/mobile/index.php?w=brand&t=recommend_list",
  // 商家推荐店铺列表
  storeRecommendList: URL + "/api/mobile/index.php?w=store&t=store_recommend_list",
  // 分销商品(秒赚钱)页面
  memberFx: URL + "/api/mobile/index.php?t=fx_index&w=member_fx",
  // 用户申请分销员页面—-接口
  fxMemberApply: URL + "/api/mobile/index.php?t=fx_member_apply&w=member_index"

}
