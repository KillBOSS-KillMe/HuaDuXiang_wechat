"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _asyncToGenerator(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){function r(n,i){try{var s=e[n](i),o=s.value}catch(t){return void a(t)}if(!s.done)return Promise.resolve(o).then(function(t){r("next",t)},function(t){r("throw",t)});t(o)}return r("next")})}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t},_createClass=function(){function t(t,e){for(var a=0;a<e.length;a++){var r=e[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,a,r){return a&&t(e.prototype,a),r&&t(e,r),e}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_ajax=require("./../ajax.js"),_mask=require("./../components/mask.js"),_mask2=_interopRequireDefault(_mask),api=require("./../api.js"),ShopCart=function(t){function e(){var t,a,r,n;_classCallCheck(this,e);for(var i=arguments.length,s=Array(i),o=0;o<i;o++)s[o]=arguments[o];return a=r=_possibleConstructorReturn(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(s))),r.config={navigationBarTitleText:"订单列表"},r.$repeat={},r.$props={paymask:{"xmlns:v-bind":"","v-bind:maskFlag.sync":"payFlag"}},r.$events={},r.components={paymask:_mask2.default},r.mixins=[],r.data={navArr:[{title:"全部",id:0},{title:"待付款"},{title:"待发货"},{title:"待收货"},{title:"已完成"}],navIdx:0,orderList:[],state_arr:["","state_new","state_pay","state_send","state_noeval"],curpage:1,hasmore:!1,page_total:"",disabledSwitch:!1,allPrice:0,available_predeposit:0,payment_type:0,payFlag:!1,predepositFlag:!0,mini_wxpayFlag:!0,order_id:"",pay_sn:""},r.computed={disabledSwitch:function(){return this.available_predeposit<this.allPrice||!this.predepositFlag}},r.methods={clickSwitch:function(){var t=this;if(!this.predepositFlag)return wx.showToast({title:"余额支付暂未开启，请使用微信支付",icon:"none"}),!1;this.available_predeposit<this.allPrice&&(this.payment_type=0,wx.showModal({title:"提醒",content:"余额不足，是否前往充值？",success:function(e){e.confirm&&t.$redirect("vip")}}))},inputPassword:function(t){this.password=t.detail.value},changePayment:function(t){this.payment_type=Number(t.detail.value)},orderCancel:function(t,e){var a=this;wx.showModal({title:"确认取消订单?",success:function(r){r.confirm&&(0,_ajax.ajax)({url:api.orderCancel,data:{order_id:t}}).then(function(t){1==t.datas.state?(wx.showToast({title:t.datas.msg}),a.orderList[e].order_state=t.datas.order_state,a.$apply()):wx.showToast({title:t.datas.error,icon:"none"})})}})},orderDelete:function(t,e){var a=this;wx.showModal({title:"确认删除订单?",success:function(r){r.confirm&&(0,_ajax.ajax)({url:api.orderDelete,data:{order_id:t}}).then(function(t){1==t.datas.state?(wx.showToast({title:t.datas.msg}),a.orderList.splice(e,1),a.$apply()):wx.showToast({title:t.datas.error,icon:"none"})})}})},orderReceive:function(t,e){var a=this;wx.showModal({title:"确认收货?",success:function(r){r.confirm&&(0,_ajax.ajax)({url:api.orderReceive,data:{order_id:t}}).then(function(t){1==t.datas.state?(wx.showToast({title:t.datas.msg}),a.orderList[e].order_state=t.datas.order_state,a.$apply()):wx.showToast({title:t.datas.error,icon:"none"})})}})},getWXPayment:function(t,e,a){this.payFlag=!0,this.allPrice=Number(a),this.order_id=t,this.pay_sn=e,this.requestPayType()},pay:function(){function t(){return e.apply(this,arguments)}var e=_asyncToGenerator(regeneratorRuntime.mark(function t(){var e,a,r,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=this,1!=this.payment_type){t.next=11;break}if(this.password){t.next=5;break}return wx.showToast({title:"请输入密码",icon:"none"}),t.abrupt("return",!1);case 5:return t.next=7,(0,_ajax.ajax)({url:api.checkPassword,data:{password:this.password}});case 7:if(a=t.sent,0!=a.datas.state){t.next=11;break}return wx.showToast({title:"密码错误，请重新输入",icon:"none"}),t.abrupt("return",!1);case 11:return t.next=13,(0,_ajax.ajax)({url:api.pay,data:{pay_sn:this.pay_sn,payment_code:0==this.payment_type?"mini_wxpay":"predeposit",password:this.password,pd_pay:this.payment_type}}).then(function(t){return t.datas});case 13:r=t.sent,0==r.state&&wx.showToast({title:r.msg,icon:"none"}),1==r.state&&(0==this.payment_type?wx.requestPayment(_extends({},r.api_pay,{success:function(t){wx.showToast({title:"支付成功"})},fail:function(t){wx.showToast({title:"支付失败"})},complete:function(){var t=setTimeout(function(){e.$redirect("orderlist"),clearTimeout(t)},1e3)}})):(wx.showToast({title:"支付成功"}),n=setTimeout(function(){e.$redirect("orderlist"),clearTimeout(n)},1e3)));case 16:case"end":return t.stop()}},t,this)}));return t}(),changeNav:function(t){t!=this.navIdx&&(this.navIdx=t,this.hasmore=!1,this.curpage=1,this.orderList=[],this.requestList())}},r.events={},n=a,_possibleConstructorReturn(r,n)}return _inherits(e,t),_createClass(e,[{key:"requestPayType",value:function(){var t=this;(0,_ajax.ajax)({url:api.payInfo,data:{pay_sn:this.pay_sn}}).then(function(e){200==e.code&&(t.mini_wxpayFlag=e.datas.pay_info.mini_wxpay,t.predepositFlag=e.datas.pay_info.predeposit,t.$apply())})}},{key:"onLoad",value:function(t){var e=this;this.navIdx=t.idx||0,(0,_ajax.ajax)({url:api.memberInfo}).then(function(t){200==t.code&&(e.available_predeposit=Number(t.datas.member_data.available_predeposit),e.$apply())}),this.requestList()}},{key:"onShow",value:function(){}},{key:"requestList",value:function(){var t=this;(0,_ajax.ajax)({url:api.orderList,data:{page:10,curpage:this.curpage,state_type:this.state_arr[this.navIdx]}}).then(function(e){var a=e.datas.order_group_list||[],r=[];a.forEach(function(t){r=r.concat(t.order_list)}),t.orderList=t.orderList.concat(r),t.page_total=e.page_total,t.hasmore=e.hasmore,t.$apply()})}},{key:"onReachBottom",value:function(){this.hasmore&&(this.curpage++,this.requestList())}}]),e}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(ShopCart,"pages/orderlist"));