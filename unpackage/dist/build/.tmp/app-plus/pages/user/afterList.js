(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/afterList"],{"0675":function(t,e,n){},1478:function(t,e,n){"use strict";var a=n("0675"),i=n.n(a);i.a},"24aa":function(t,e,n){"use strict";(function(t){n("3e9c"),n("921b");a(n("66fd"));var e=a(n("7b38"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"271e":function(t,e,n){"use strict";n.r(e);var a=n("d689"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a},"2f4d":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},"7b38":function(t,e,n){"use strict";n.r(e);var a=n("2f4d"),i=n("271e");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("1478");var u=n("2877"),r=Object(u["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},d689:function(t,e,n){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("2355"),o=new i.UserModel,u=function(){return n.e("components/user/common/item").then(n.bind(null,"d890"))},r={components:{vItem:u},data:function(){return{list:[],page:1}},onLoad:function(e){var n=this;t.showLoading({title:"数据加载中...",mask:!0});var i=this.page;o.afterList(i,function(e){e&&(console.log(a(e," at pages\\user\\afterList.vue:57")),n.list=e,i++,t.hideLoading())})},methods:{cancel:function(e){var n=this,a=e.currentTarget.dataset.id,i=this.list;t.showModal({title:"提示",content:"确认取消退款吗？",showCancel:!0,success:function(e){e.confirm&&i.forEach(function(e,u){e.back_id==a&&i.splice(u,1),o.cancelAfter(a),n.list=i,0==i.length&&t.redirectTo({url:"/pages/user/index/index"})})}})}},onReachBottom:function(){var e=this;t.showLoading({title:"数据加载中...",mask:!0});var n=this.page;o.afterList(n,function(a){a&&(e.list=a,n++,t.hideLoading())})}};e.default=r}).call(this,n("6e42")["default"],n("0de9")["default"])}},[["24aa","common/runtime","common/vendor"]]]);