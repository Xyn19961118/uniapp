(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0c16":function(e,n,t){"use strict";(function(e){t("3e9c"),t("921b");o(t("66fd"));var n=o(t("93bd"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},"4af8":function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return a})},"5b3a":function(e,n,t){},"93bd":function(e,n,t){"use strict";t.r(n);var o=t("4af8"),a=t("bb37");for(var i in a)"default"!==i&&function(e){t.d(n,e,function(){return a[e]})}(i);t("abbd");var r=t("2877"),c=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,"2051d5de",null);n["default"]=c.exports},abbd:function(e,n,t){"use strict";var o=t("5b3a"),a=t.n(o);a.a},bb37:function(e,n,t){"use strict";t.r(n);var o=t("be65"),a=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n["default"]=a.a},be65:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t("2075"),a=new o.IndexModel,i=function(){return Promise.all([t.e("common/vendor"),t.e("components/common/banner")]).then(t.bind(null,"c0ab"))},r=function(){return t.e("components/common/productItem").then(t.bind(null,"e8b6"))},c=function(){return Promise.all([t.e("common/vendor"),t.e("components/common/footer")]).then(t.bind(null,"ee9f"))},s={components:{Banner:i,productItem:r,vFooter:c},data:function(){return{indexData:{},navCurr:0,recommendList:[],dataCurr:0,isShopkeeper:!1,token:"",shopId:0,isLogin:!1}},onLoad:function(){var n=this;e.showLoading({title:"加载数据中...",mask:!0}),a.getHome(function(t){t&&(e.hideLoading(),n.indexData=t,n.recommendList=t.list.hot)});var t=e.getStorageSync("token"),o=parseInt(e.getStorageSync("shopId")),i=!!t,r=!!o;this.token=t,this.shopId=o,this.isLogin=i,this.isShopkeeper=r},methods:{handleNavClick:function(e){var n=e.currentTarget.dataset.index;switch(this.navCurr=n,n){case"0":this.recommendList=this.indexData.list.hot;break;case"1":this.recommendList=this.indexData.list.new;break;case"2":this.recommendList=this.indexData.list.recommend;break;case"3":this.recommendList=this.indexData.list.sale;break}}}};n.default=s}).call(this,t("6e42")["default"])}},[["0c16","common/runtime","common/vendor"]]]);