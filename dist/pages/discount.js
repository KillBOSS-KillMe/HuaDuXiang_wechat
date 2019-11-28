"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_ajax=require("./../ajax.js"),api=require("./../api.js"),Index=function(e){function t(){var e,o,r,a;_classCallCheck(this,t);for(var n=arguments.length,s=Array(n),i=0;i<n;i++)s[i]=arguments[i];return o=r=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),r.config={navigationBarTitleText:"秒赚钱"},r.components={},r.mixins=[],r.data={requestImgUrl:"",topImg:"",goods_list:[],hasmore:!1,curpage:1},r.computed={},r.methods={navGoodsDetails:function(e,t){"rushsales"==t?this.$navigate("/pages/seckillShopDetails?goods_id="+e):this.$navigate("/pages/shopDetails?goods_id="+e)}},r.events={},a=o,_possibleConstructorReturn(r,a)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(e){var t=this;this.requestImgUrl=this.$parent.globalData.requestImgUrl,(0,_ajax.ajax)({url:api.memberFx}).then(function(e){t.topImg=e.datas.img_area}),this.requestIndexGoodsList()}},{key:"requestIndexGoodsList",value:function(){var e=this;(0,_ajax.ajax)({url:api.indexGoodsList,type:"get",data:{page:10,curpage:this.curpage,is_fx:1}}).then(function(t){if(200==t.code){var o=t.datas.goods_list||[];e.goods_list=e.goods_list.concat(o),e.hasmore=t.hasmore,e.$apply()}})}},{key:"onReachBottom",value:function(){this.hasmore&&(this.curpage++,this.requestIndexGoodsList())}},{key:"onShow",value:function(){}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Index,"pages/discount"));