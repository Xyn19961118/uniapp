const state = {
	money: 99
}

const mutations = {
	count(state){
		state++
	}
}

const actions = {
	count: ({commit})=>{
		commit('count')
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}