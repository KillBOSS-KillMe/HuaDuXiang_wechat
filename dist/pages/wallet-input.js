"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_ajax=require("./../ajax.js"),api=require("./../api.js"),WalletInput=function(e){function t(){var e,n,o,r;_classCallCheck(this,t);for(var a=arguments.length,i=Array(a),s=0;s<a;s++)i[s]=arguments[s];return n=o=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),o.config={navigationBarTitleText:"提现申请"},o.components={},o.mixins=[],o.data={requestImgUrl:""},o.computed={},o.methods={submit:function(e){var t=e.detail.value,n=t.pdc_amount,o=t.pdc_bank_name,r=t.pdc_bank_no,a=t.pdc_bank_user,i=t.password;return n?o?r?a?i?void(0,_ajax.ajax)({url:api.pdCashAdd,data:{form_submit:"ok",pdc_amount:n,pdc_bank_name:o,pdc_bank_no:r,pdc_bank_user:a,password:i}}).then(function(e){400==e.code?wx.showToast({title:e.datas.error,icon:"none",duration:2e3}):wx.showToast({title:e.datas.success,icon:"none",duration:2e3});var t=setTimeout(function(){clearTimeout(t),wx.navigateBack()},2e3)}):(wx.showToast({title:"请输入支付密码",icon:"none"}),!1):(wx.showToast({title:"请输入收款人",icon:"none"}),!1):(wx.showToast({title:"请输入银行账户",icon:"none"}),!1):(wx.showToast({title:"请输入银行名",icon:"none"}),!1):(wx.showToast({title:"请输入提现金额",icon:"none"}),!1)}},o.events={},r=n,_possibleConstructorReturn(o,r)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(){}},{key:"onShow",value:function(){this.requestImgUrl=this.$parent.globalData.requestImgUrl}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(WalletInput,"pages/wallet-input"));