"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_step=require("./../components/step.js"),_step2=_interopRequireDefault(_step),_ajax=require("./../ajax.js"),api=require("./../api.js"),WxParse=require("./../utils/wxParse/wxParse.js"),Settledinone=function(e){function t(){var e,r,n,o;_classCallCheck(this,t);for(var a=arguments.length,s=Array(a),i=0;i<a;i++)s[i]=arguments[i];return r=n=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),n.config={navigationBarTitleText:"入驻审核"},n.$repeat={},n.$props={step:{"xmlns:v-bind":"","v-bind:state.sync":"state"}},n.$events={},n.components={step:_step2.default},n.mixins=[],n.data={state:1},n.computed={},n.methods={},n.events={},o=r,_possibleConstructorReturn(n,o)}return _inherits(t,e),_createClass(t,[{key:"onShow",value:function(){}},{key:"onLoad",value:function(){var e=this;(0,_ajax.ajax)({url:api.join_step0}).then(function(t){if(200==t.code&&1==t.datas.state){var r=t.datas.content;WxParse.wxParse("article","html",r,e,5)}})}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Settledinone,"pages/settledinone"));