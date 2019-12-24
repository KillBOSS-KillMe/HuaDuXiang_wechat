"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,s,n){return s&&e(t.prototype,s),n&&e(t,n),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_ajax=require("./../ajax.js"),api=require("./../api.js"),Index=function(e){function t(){var e,s,n,a;_classCallCheck(this,t);for(var r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];return s=n=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),n.config={navigationBarTitleText:"地址",enablePullDownRefresh:!0},n.data={emptyFlag:null,address_list:[]},n.components={},n.computed={},n.methods={deleAddress:function(e){var t=this;wx.showModal({title:"提示",content:"确定删除地址？",success:function(s){s.confirm&&(0,_ajax.ajax)({url:api.addressDel,data:{address_id:e}}).then(function(s){1==s.datas.state?(wx.showToast({title:s.datas.msg}),t.address_list=t.address_list.filter(function(t){return t.address_id!=e}),t.$apply()):wx.showToast({title:s.datas.msg,icon:"none"})})}})},setAddress:function(e){var t=this;wx.showModal({title:"提示",content:"确定设置为默认地址？",success:function(s){s.confirm&&(0,_ajax.ajax)({url:api.addressSetdefault,data:{address_id:e}}).then(function(e){console.log(e),1==e.datas.state&&(wx.showToast({title:e.msg}),t.onShow())})}})}},a=s,_possibleConstructorReturn(n,a)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(){}},{key:"onShow",value:function(){this.requestList()}},{key:"requestList",value:function(){var e=this;(0,_ajax.ajax)({url:api.addressList}).then(function(t){e.address_list=t.datas.address_list,e.emptyFlag=t.datas.address_list.length?1:0,e.$apply(),wx.stopPullDownRefresh()})}},{key:"onPullDownRefresh",value:function(e){this.address_list=[],this.requestList()}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Index,"pages/addressList"));