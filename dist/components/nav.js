"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,o){try{var i=t[a](o),s=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(s).then(function(e){r("next",e)},function(e){r("throw",e)});e(s)}return r("next")})}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_ajax=require("./../ajax.js"),api=require("./../api.js"),Nav=function(e){function t(){var e,n,r,a;_classCallCheck(this,t);for(var o=arguments.length,i=Array(o),s=0;s<o;s++)i[s]=arguments[s];return n=r=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),r.data={navList:[{title:"首页",icon:"iconshouye-copy",url:"pages/index"},{title:"分类",icon:"iconfenlei",url:"pages/class"},{title:"入驻",icon:"iconshezhi",url:"pages/settledinone"},{title:"购物车",icon:"icongouwuche-copy",url:"pages/shopCar"},{title:"我的",icon:"iconwode",url:"pages/user"}]},r.props={},r.methods={navPage:function(){function e(e){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var n,r,a,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=this.$parent,r=this.$parent.$parent.__route__,t!=r){e.next=4;break}return e.abrupt("return",!1);case 4:if("pages/settledinone"!=t){e.next=11;break}return e.next=7,(0,_ajax.ajax)({url:api.isJoin,icon:"none"});case 7:return a=e.sent,o=a.datas.state,(0,_ajax.ajax)({url:api.getStep,icon:"none"}).then(function(e){if(200==e.code)switch(e.datas.step){case 0:n.$navigate("settledinone");break;case 1:n.$navigate("settledintwo");break;case 2:n.$navigate("settledinthree");break;case 3:n.$navigate("settledinfour?state="+o);break;case 4:n.$navigate("settledinfive")}}),e.abrupt("return",!1);case 11:wx.redirectTo({url:"/"+t});case 12:case"end":return e.stop()}},e,this)}));return e}()},a=n,_possibleConstructorReturn(r,a)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(){var e=getCurrentPages(),t=e[e.length-1].route;this.navList.forEach(function(e){e.url==t?e.active=!0:e.active=!1}),this.$apply()}}]),t}(_wepy2.default.component);exports.default=Nav;