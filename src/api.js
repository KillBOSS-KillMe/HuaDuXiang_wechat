
// D
var URL = "http://www.shopdate.me"
// L
// var URL = "http://www.hdx.cc"  
// 线上
// var URL = "https://www.hdxsy.cn"

module.exports = {
  // 小程序授权微信-返回用户 user_id—接口，用户信息接口。
  getToken: URL +  '/api/mobile/index.php?w=connect&t=wechat',
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
  fxMemberApply: URL + "/api/mobile/index.php?t=fx_member_apply&w=member_index",
  // 砍价背景图接口
  memberKj: URL + "/api/mobile/index.php?w=member_kj",
  // 预购背景图
  memberYg: URL + "/api/mobile/index.php?w=member_yg",
  // 秒杀背景图
  memberMs: URL + "/api/mobile/index.php?w=member_ms",
  // 拼团背景图接口
  memberPt: URL + "/api/mobile/index.php?w=member_pt",
  // 购物车添加商品接口
  cartAdd: URL + "/api/mobile/index.php?w=member_cart&t=cart_add",
  // 购物车查询列表
  cartList: URL + "/api/mobile/index.php?w=member_cart&t=cart_list",
  // 用户购物车商品删除
  cartDel: URL + "/api/mobile/index.php?t=cart_del&w=member_cart",
  // 购物车修改数量接口
  cartEditQuantity: URL + "/api/mobile/index.php?w=member_cart&t=cart_edit_quantity",
  // 查询是否是合伙人
  isPartner: URL + "/api/mobile/index.php?w=partner&t=is_partner",
  // 申请成为合伙人
  addPartner: URL + "/api/mobile/index.php?w=partner&t=add_partner",
  // 用户订单列表接口
  orderList: URL + "/api/mobile/index.php?w=member_order&t=order_list",
  // 取消订单接口
  orderCancel: URL + "/api/mobile/index.php?w=member_order&t=order_cancel",
  // 订单删除接口
  orderDelete: URL + "/api/mobile/index.php?w=member_order&t=order_delete",
  // 订单确认收货接口
  orderReceive: URL + "/api/mobile/index.php?w=member_order&t=order_receive",
  // 订单物流信息接口
  searchDeliver: URL + "/api/mobile/index.php?w=member_order&t=search_deliver",
  // 判断是否提交入驻申请
  isJoin: URL + "/api/mobile/index.php?w=store_joinin&t=is_join",
  // 商家入驻申请
  addStore: URL + "/api/mobile/index.php?w=store_joinin&t=addStore",
  // 获取店铺等级
  getStoreGrade: URL + "/api/mobile/index.php?w=store_joinin&t=getStoreGrade",
  // 用户个人信息设置接口（获取微信用户头像，性别，昵称）
  setUserinfo: URL + "/api/mobile/index.php?w=member_index&t=set_userinfo",
  // 店铺分类列表接口
  getStoreClass: URL + "/api/mobile/index.php?w=store_joinin&t=getStoreClass",
  // 平台首页秒杀商品4-8条数据
  goodsGblist: URL + "/api/mobile/index.php?t=goods_gblist&w=goods",
  // 用户个人输入手机号后接收短信的接口
  sendModifyMobile: URL + "/api/mobile/index.php?w=member_index&t=send_modify_mobile",
  // 用户设置二级密码接口
  setPassword: URL + "/api/mobile/index.php?w=member_index&t=set_password",
  // 砍价列表接口
  bargainGoodsList: URL + "/api/mobile/index.php?w=bargain&t=bargainGoodsList",
  // 秒杀商品列表页面（带分页）
  msGoodsList: URL + "/api/mobile/index.php?w=goods&t=msGoodsList",
  // 获取预售商品列表
  ysGoodsList: URL + "/api/mobile/index.php?w=goods&t=ysGoodsList",
  // 拼团商品列表数据展示。
  pingou: URL + "/api/mobile/index.php?w=pingou&t=index",
  // 获取订单详情页面
  orderInfo: URL + "/api/mobile/index.php?w=member_order&t=order_info",
  // 用户充值吊起支付信息
  memberPaymentRecharge: URL + "/api/mobile/index.php?w=member_payment_recharge&t=pd_pay",
  // 用户发起充值接口。
  recharge: URL + "/api/mobile/index.php?w=recharge&t=index",
  // 优惠券--获取用户优惠券列表
  voucherList: URL + "/api/mobile/index.php?w=member_voucher&t=voucher_list",
  // 获取店铺优惠券列表
  voucherTplList: URL + "/api/mobile/index.php?w=voucher&t=voucher_tpl_list",
  // 领取添加优惠卷
  voucherFreeex: URL + "/api/mobile/index.php?w=member_voucher&t=voucher_freeex",
  // 用户选择支付方式—
  payInfo: URL + "/api/mobile/index.php?w=member_buy&t=pay",
  // 用户选择支付方式—
  payInfo: URL + "/api/mobile/index.php?w=member_buy&t=pay",
  // 检测用户二级密码是否输入正确
  checkPassword: URL + "/api/mobile/index.php?w=member_index&t=check_password"

}
