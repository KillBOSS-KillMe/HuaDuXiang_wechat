"use strict";

var URL = "http://www.shopdate.me";
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

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJVUkwiLCJtb2R1bGUiLCJleHBvcnRzIiwibG9naW4iLCJpbmRleEdvb2RzTGlzdCIsIm9yZGluYXJ5R29vZHNEdGFpbCIsImluZGV4RGVmYXVsdEluZm8iLCJtZW1iZXJCdXlPbmUiLCJwbGFjZU9yZGVyIiwibWVtYmVyUGF5bWVudCIsInBheSIsInN0b3JlSW5kZXgiLCJzdG9yZUdvb2RzQ2xhc3MiLCJtZW1iZXJJbmZvIiwib25lR29vZHNDbGFzcyIsInR3b0dvb2RzQ2xhc3MiLCJ0aHJlZUdvb2RzQ2xhc3MiLCJhZGRyZXNzTGlzdCIsImFkZHJlc3NEZWwiLCJhZGRyZXNzQWRkIiwiYWRkcmVzc0luZm8iLCJhZGRyZXNzRWRpdCIsImFkZHJlc3NTZXRkZWZhdWx0IiwiYXJlYUxpc3QiLCJyZWNvbW1lbmRMaXN0Iiwic3RvcmVSZWNvbW1lbmRMaXN0IiwibWVtYmVyRngiLCJmeE1lbWJlckFwcGx5Il0sIm1hcHBpbmdzIjoiOztBQUNBLElBQU1BLE1BQU0sd0JBQVo7QUFDQTs7O0FBSUFDLE9BQU9DLE9BQVAsR0FBaUI7QUFDZjtBQUNBQyxTQUFPSCxNQUFNLHdDQUZFO0FBR2Y7QUFDQUksa0JBQWdCSixNQUFNLDRDQUpQO0FBS2Y7QUFDQUssc0JBQW9CTCxNQUFNLDhDQU5YO0FBT2Y7QUFDQU0sb0JBQWtCTixNQUFNLHVDQVJUO0FBU2Y7QUFDQU8sZ0JBQWNQLE1BQU0sZ0RBVkw7QUFXZjtBQUNBUSxjQUFZUixNQUFNLGdEQVpIO0FBYWY7QUFDQVMsaUJBQWVULE1BQU0sdURBZE47QUFlZjtBQUNBVSxPQUFLVixNQUFNLDhDQWhCSTtBQWlCZjtBQUNBVyxjQUFZWCxNQUFNLDRDQWxCSDtBQW1CZjtBQUNBWSxtQkFBaUJaLE1BQU0sbURBcEJSO0FBcUJmO0FBQ0FhLGNBQVliLE1BQU0sc0NBdEJIO0FBdUJmO0FBQ0FjLGlCQUFlZCxNQUFNLHFDQXhCTjtBQXlCZjtBQUNBZSxpQkFBZWYsTUFBTSxxQ0ExQk47QUEyQmY7QUFDQWdCLG1CQUFpQmhCLE1BQU0scURBNUJSO0FBNkJmO0FBQ0FpQixlQUFhakIsTUFBTSx1REE5Qko7QUErQmY7QUFDQWtCLGNBQVlsQixNQUFNLHNEQWhDSDtBQWlDZjtBQUNBbUIsY0FBWW5CLE1BQU0sc0RBbENIO0FBbUNmO0FBQ0FvQixlQUFhcEIsTUFBTSx1REFwQ0o7QUFxQ2Y7QUFDQXFCLGVBQWFyQixNQUFNLHVEQXRDSjtBQXVDZjtBQUNBc0IscUJBQW1CdEIsTUFBTSw2REF4Q1Y7QUF5Q2Y7QUFDQXVCLFlBQVV2QixNQUFNLG9EQTFDRDtBQTJDZjtBQUNBd0IsaUJBQWV4QixNQUFNLGdEQTVDTjtBQTZDZjtBQUNBeUIsc0JBQW9CekIsTUFBTSxzREE5Q1g7QUErQ2Y7QUFDQTBCLFlBQVUxQixNQUFNLDhDQWhERDtBQWlEZjtBQUNBMkIsaUJBQWUzQixNQUFNOztBQWxETixDQUFqQiIsImZpbGUiOiJhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgVVJMID0gXCJodHRwOi8vd3d3LnNob3BkYXRlLm1lXCJcclxuLy8gY29uc3QgVVJMID0gXCJodHRwOi8vd3d3Lm15d2RsLmNvbVwiXHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIC8vIOeZu+W9lVxyXG4gIGxvZ2luOiBVUkwgKyBcIi9hcGkvbW9iaWxlL2luZGV4LnBocD93PWxvZ291dCZ0PWluZGV4XCIsXHJcbiAgLy8g6aaW6aG14oCU5ZWG5ZOB5YiX6KGo5o6l5Y+jXHJcbiAgaW5kZXhHb29kc0xpc3Q6IFVSTCArIFwiL2FwaS9tb2JpbGUvaW5kZXgucGhwP3Q9Z29vZHNfbGlzdCZ3PWdvb2RzXCIsXHJcbiAgLy8g5pmu6YCa5ZWG5ZOB6K+m5oOFXHJcbiAgb3JkaW5hcnlHb29kc0R0YWlsOiBVUkwgKyBcIi9hcGkvbW9iaWxlL2luZGV4LnBocD90PWdvb2RzX2RldGFpbCZ3PWdvb2RzXCIsXHJcbiAgLy8g6aaW6aG1Lei9ruaSreWbvuWSjGFyZWFBcnLoj5zljZVcclxuICBpbmRleERlZmF1bHRJbmZvOiBVUkwgKyBcIi9hcGkvbW9iaWxlL2luZGV4LnBocD93PWluZGV4JnQ9aW5kZXhcIixcclxuICAvLyAwMeWVhuWTgei0reS5sOesrOS4gOatpeaOpeWPo1xyXG4gIG1lbWJlckJ1eU9uZTogVVJMICsgXCIvYXBpL21vYmlsZS9pbmRleC5waHA/dz1tZW1iZXJfYnV5JnQ9YnV5X3N0ZXAxXCIsXHJcbiAgLy8gMDLllYblk4HnlJ/miJDorqLljZXmjqXlj6NcclxuICBwbGFjZU9yZGVyOiBVUkwgKyBcIi9hcGkvbW9iaWxlL2luZGV4LnBocD93PW1lbWJlcl9idXkmdD1idXlfc3RlcDJcIixcclxuICAvLyAwM+aUr+S7mOaWueW8j+WIl+ihqFxyXG4gIG1lbWJlclBheW1lbnQ6IFVSTCArIFwiL2FwaS9tb2JpbGUvaW5kZXgucGhwP3c9bWVtYmVyX3BheW1lbnQmdD1wYXltZW50X2xpc3RcIixcclxuICAvLyAwNOWwj+eoi+W6j+WPkei1t+aUr+S7mOaOpeWPo1xyXG4gIHBheTogVVJMICsgXCIvYXBpL21vYmlsZS9pbmRleC5waHA/dz1tZW1iZXJfcGF5bWVudCZ0PXBheVwiLFxyXG4gIC8vIOW6l+mTuummlumhteaOpeWPo1xyXG4gIHN0b3JlSW5kZXg6IFVSTCArIFwiL2FwaS9tb2JpbGUvaW5kZXgucGhwP3c9c3RvcmUmdD1zdG9yZV9pbmZvXCIsXHJcbiAgLy8g5bqX6ZO65ZWG5ZOB5YiG57G75o6l5Y+jXHJcbiAgc3RvcmVHb29kc0NsYXNzOiBVUkwgKyBcIi9hcGkvbW9iaWxlL2luZGV4LnBocD93PXN0b3JlJnQ9c3RvcmVfZ29vZHNfY2xhc3NcIixcclxuICAvLyDnlKjmiLfkuKrkurrkuK3lv4PmlbDmja7mjqXlj6NcclxuICBtZW1iZXJJbmZvOiBVUkwgKyBcIi9hcGkvbW9iaWxlL2luZGV4LnBocD93PW1lbWJlcl9pbmRleFwiLFxyXG4gIC8vIOWVhuWTgeS4gOe6p+WIhuexu1xyXG4gIG9uZUdvb2RzQ2xhc3M6IFVSTCArIFwiL2FwaS9tb2JpbGUvaW5kZXgucGhwP3c9Z29vZHNfY2xhc3NcIixcclxuICAvLyDllYblk4HkuoznuqfliIbnsbvmjqXlj6NcclxuICB0d29Hb29kc0NsYXNzOiBVUkwgKyBcIi9hcGkvbW9iaWxlL2luZGV4LnBocD93PWdvb2RzX2NsYXNzXCIsXHJcbiAgLy8g5ZWG5ZOB5LiJ57qn5YiG57G75o6l5Y+jXHJcbiAgdGhyZWVHb29kc0NsYXNzOiBVUkwgKyBcIi9hcGkvbW9iaWxlL2luZGV4LnBocD93PWdvb2RzX2NsYXNzJnQ9Z2V0X2NoaWxkX2FsbFwiLFxyXG4gIC8vIOeUqOaIt+aUtui0p+WcsOWdgOWIl+ihqFxyXG4gIGFkZHJlc3NMaXN0OiBVUkwgKyBcIi9hcGkvbW9iaWxlL2luZGV4LnBocD93PW1lbWJlcl9hZGRyZXNzJnQ9YWRkcmVzc19saXN0XCIsXHJcbiAgLy8g55So5oi35pS26LSn5Zyw5Z2A5Yig6ZmkXHJcbiAgYWRkcmVzc0RlbDogVVJMICsgXCIvYXBpL21vYmlsZS9pbmRleC5waHA/dz1tZW1iZXJfYWRkcmVzcyZ0PWFkZHJlc3NfZGVsXCIsXHJcbiAgLy8g55So5oi35pS26LSn5Zyw5Z2A5re75YqgXHJcbiAgYWRkcmVzc0FkZDogVVJMICsgXCIvYXBpL21vYmlsZS9pbmRleC5waHA/dz1tZW1iZXJfYWRkcmVzcyZ0PWFkZHJlc3NfYWRkXCIsXHJcbiAgLy8g55So5oi35pS26LSn5Zyw5Z2A6K+m57uG5L+h5oGvXHJcbiAgYWRkcmVzc0luZm86IFVSTCArIFwiL2FwaS9tb2JpbGUvaW5kZXgucGhwP3c9bWVtYmVyX2FkZHJlc3MmdD1hZGRyZXNzX2luZm9cIixcclxuICAvLyDmlLbotKflnLDlnYDnvJbovpFcclxuICBhZGRyZXNzRWRpdDogVVJMICsgXCIvYXBpL21vYmlsZS9pbmRleC5waHA/dz1tZW1iZXJfYWRkcmVzcyZ0PWFkZHJlc3NfZWRpdFwiLFxyXG4gIC8vIOiuvue9ruS4uum7mOiupOWcsOWdgFxyXG4gIGFkZHJlc3NTZXRkZWZhdWx0OiBVUkwgKyBcIi9hcGkvbW9iaWxlL2luZGV4LnBocD93PW1lbWJlcl9hZGRyZXNzJnQ9YWRkcmVzc19zZXRkZWZhdWx0XCIsXHJcbiAgLy8g6I635Y+W55yB5Lu9LeWfjuW4guKAlOWcsOWMuiDlnLDlnYDmjqXlj6NcclxuICBhcmVhTGlzdDogVVJMICsgXCIvYXBpL21vYmlsZS9pbmRleC5waHA/dz1tZW1iZXJfYWRkcmVzcyZ0PWFyZWFfbGlzdFwiLFxyXG4gIC8vIOiOt+WPluaOqOiNkOeahOWTgeeJjOWQjeensOWIl+ihqFxyXG4gIHJlY29tbWVuZExpc3Q6IFVSTCArIFwiL2FwaS9tb2JpbGUvaW5kZXgucGhwP3c9YnJhbmQmdD1yZWNvbW1lbmRfbGlzdFwiLFxyXG4gIC8vIOWVhuWutuaOqOiNkOW6l+mTuuWIl+ihqFxyXG4gIHN0b3JlUmVjb21tZW5kTGlzdDogVVJMICsgXCIvYXBpL21vYmlsZS9pbmRleC5waHA/dz1zdG9yZSZ0PXN0b3JlX3JlY29tbWVuZF9saXN0XCIsXHJcbiAgLy8g5YiG6ZSA5ZWG5ZOBKOenkui1mumSsSnpobXpnaJcclxuICBtZW1iZXJGeDogVVJMICsgXCIvYXBpL21vYmlsZS9pbmRleC5waHA/dD1meF9pbmRleCZ3PW1lbWJlcl9meFwiLFxyXG4gIC8vIOeUqOaIt+eUs+ivt+WIhumUgOWRmOmhtemdouKAlC3mjqXlj6NcclxuICBmeE1lbWJlckFwcGx5OiBVUkwgKyBcIi9hcGkvbW9iaWxlL2luZGV4LnBocD90PWZ4X21lbWJlcl9hcHBseSZ3PW1lbWJlcl9pbmRleFwiXHJcblxyXG59XHJcbiJdfQ==