(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/login"],{"018a":function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return a})},"09fd":function(e,n,t){"use strict";t.r(n);var o=t("85e0"),a=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n["default"]=a.a},"18e4":function(e,n,t){"use strict";t.r(n);var o=t("018a"),a=t("09fd");for(var i in a)"default"!==i&&function(e){t.d(n,e,function(){return a[e]})}(i);t("3937");var r=t("2877"),u=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,null,null);n["default"]=u.exports},"1d2e":function(e,n,t){"use strict";(function(e){t("3e9c"),t("921b");o(t("66fd"));var n=o(t("18e4"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},3847:function(e,n,t){},3937:function(e,n,t){"use strict";var o=t("3847"),a=t.n(o);a.a},"85e0":function(e,n,t){"use strict";(function(e,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=t("e5ba"),i=new a.LoginModel,r={data:function(){return{mobile:"",pwd:"",showBindPhone:!1,code:null}},onLoad:function(e){},methods:{changeAcc:function(e){this.mobile=e.detail.value},changePwd:function(e){this.pwd=e.detail.value},submitForm:function(){var n=this.mobile,t=this.pwd,o={mobile:n,pass:t};i.accountLogin(o,function(n){if(0!=n.error)e.showToast({title:n.errmsg,icon:"none"});else{e.setStorageSync("token",n.token);var t=getCurrentPages();1==t.length?e.redirectTo({url:"/pages/user/index"}):e.navigateBack({delta:1})}})},bindGetUserInfo:function(n){e.login({provider:"weixin",success:function(e){console.log(o(e," at pages\\user\\login.vue:132"))}})},getPhoneNumber:function(n){var t=this,o=this.userInfo;e.login({success:function(a){var r={code:a.code,encryptedData:n.detail.encryptedData,iv:n.detail.iv};i.getPhone(r,function(n){var a=JSON.parse(n.data);if(0==n.error){var r={mobile:a.phoneNumber,openid:t.data.openid,user_name:o.nickName,headimg:o.avatarUrl,share_id:e.getStorageSync("shareID")||0};i.uniLogin(r,function(n){if(0!=n.error)e.showToast({title:n.errmsg,icon:"none"});else{e.setStorageSync("token",n.token);var t=getCurrentPages();1==t.length?e.redirectTo({url:"/pages/user/index/index"}):e.navigateBack({delta:1})}})}})}})},getUser:function(n){var t=this;e.login({success:function(o){var a={code:o.code};i.getCode(a,function(o){if(0!=o.error)e.showToast({title:o.errmsg,icon:"none"});else if(o.data)t.showBindPhone=!0,t.session_key=o.data.session_key,t.openid=o.data.openid,t.userInfo=n;else{e.setStorageSync("token",o.token);var a=getCurrentPages();1==a.length?e.redirectTo({url:"/pages/user/index/index"}):e.navigateBack({delta:2})}})},fail:function(e){console.log(o(e," at pages\\user\\login.vue:227"))}})}}};n.default=r}).call(this,t("6e42")["default"],t("0de9")["default"])}},[["1d2e","common/runtime","common/vendor"]]]);