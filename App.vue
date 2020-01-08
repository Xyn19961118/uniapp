<script>
	import {
		LoginModel
	} from "./model/LoginModels";
	const LoginModels = new LoginModel();
	export default {
		// globalData: {
		// 	shopId: 0
		// },
		onLaunch: function() {
			// console.log('App Launch')
			// LoginModels.accountLogin({
			// 	mobile: 15019236063,
			// 	// mobile: 13265814070,
			// 	pass: 123456
			// }, res => {
			// 	// console.log(res) 
			// 	uni.setStorageSync("token", res.token)
			// })
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	html,
	body {
		background: #f8f8f8;
		font-size: 28upx;
	}

	view {
		box-sizing: border-box;
	}
</style>
