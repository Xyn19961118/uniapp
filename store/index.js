import Vue from 'vue'
import Vuex from 'vuex'
import shopcar from "./shopcar.js"
Vue.use(Vuex);
// const store = new Vuex.Store({
//  state : {
//   shopid : 0
//  },
//  mutations : {
//   changeShopid(state, shopid){
//    state.shopid = shopid;
//   }
//  }
// });
export default new Vuex.Store({
	modules: {
		shopcar
	}
})