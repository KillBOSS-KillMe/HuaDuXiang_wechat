"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_ajax=require("./../ajax.js"),_base=require("./../utils/base.js"),api=require("./../api.js"),Index=function(e){function t(){var e,o,r,a;_classCallCheck(this,t);for(var n=arguments.length,u=Array(n),i=0;i<n;i++)u[i]=arguments[i];return o=r=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),r.config={navigationBarTitleText:"优惠券列表",enablePullDownRefresh:!0},r.data={hasmore:!1,curpage:1,page_total:"",voucher_list:[]},r.components={},r.computed={},r.methods={},a=o,_possibleConstructorReturn(r,a)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(e){this.requestCouponList()}},{key:"onShow",value:function(){}},{key:"requestCouponList",value:function(){var e=this;(0,_ajax.ajax)({url:api.voucherList,data:{page:10,curpage:this.curpage}}).then(function(t){if(200==t.code){var o=t.datas.voucher_list||[];o.forEach(function(e){e.couponTime=(0,_base.formatDate)(e.voucher_start_date)+" 至 "+(0,_base.formatDate)(e.voucher_end_date)}),e.voucher_list=e.voucher_list.concat(o),e.hasmore=t.hasmore,e.page_total=t.page_total,e.$apply(),wx.stopPullDownRefresh()}})}},{key:"onReachBottom",value:function(){this.hasmore&&(this.curpage++,this.requestCouponList())}},{key:"onPullDownRefresh",value:function(e){this.curpage=1,this.voucher_list=[],this.hasmore=!1,this.requestCouponList()}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Index,"pages/coupon-list"));