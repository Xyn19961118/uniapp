(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/footprint"],{"0b06":function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return r}),e.d(n,"b",function(){return o})},"0dbe":function(t,n,e){"use strict";var r=e("ff90"),o=e.n(r);o.a},"0fe4":function(t,n,e){"use strict";e.r(n);var r=e("0b06"),o=e("a5fc");for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);e("0dbe");var a=e("2877"),u=Object(a["a"])(o["default"],r["a"],r["b"],!1,null,"2ca98c7c",null);n["default"]=u.exports},"109e":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e("2355");function o(t){return u(t)||a(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function a(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function u(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}var c=new r.UserModel,f={data:function(){return{list:[],page:2}},onLoad:function(){var t=this;c.history(function(n){t.list=n})},onReachBottom:function(t){var n=this,e=this.page,r=this.list;c.history(function(t){r.push.apply(r,o(t)),n.list=r,n.page=e++},e)},methods:{deleteFoot:function(n){var e=this,r=n.currentTarget.dataset,o=r.id,i=r.index,a=this.list;t.showModal({content:"确定删除吗？",success:function(t){t.confirm&&(c.delHistory(o),a.splice(i,1),e.list=a)}})}}};n.default=f}).call(this,e("6e42")["default"])},"8bf2":function(t,n,e){"use strict";(function(t){e("3e9c"),e("921b");r(e("66fd"));var n=r(e("0fe4"));function r(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},a5fc:function(t,n,e){"use strict";e.r(n);var r=e("109e"),o=e.n(r);for(var i in r)"default"!==i&&function(t){e.d(n,t,function(){return r[t]})}(i);n["default"]=o.a},ff90:function(t,n,e){}},[["8bf2","common/runtime","common/vendor"]]]);