<template>
	<!-- 登陆 -->
	<view class="container" style="height: 100vh">
		<image class="logo" src="http://m.prizemart.cn/mobile/images/header-logo3.png" />
		<view class="login">
			<view class="item">
				<view class="item-cont">
					<input class="item-input" type="number" :value="mobile" placeholder="请输入您的手机号" placeholder-style="color: #999"
					 @input="changeAcc" />
				</view>
			</view>
			<view class="item">
				<view class="item-cont">
					<input class="item-input" type="password" :value="pwd" placeholder="请输入密码" placeholder-style="color: #999" @input="changePwd" />
				</view>
			</view>
			<button type="button" class="submit" @tap="submitForm">登录</button>
			<view class="features">
				<navigator url="/pages/user/forgetPassword" animation-type="slide-in-right" class="forget-pwd">忘记密码</navigator>
				<navigator url="/pages/user/registered" animation-type="slide-in-right" class="registered">注册账号</navigator>
			</view>

			<view class="mode-title">
				<view class="line"></view>
				<view class="mode-tit">其他登录方式</view>
				<view class="line"></view>
			</view>
			
			<view class="mode-content">
				<view class="mode-item" >
					<view class="mode-img" @tap="bindGetUserInfo" >
						<image src="http://m.prizemart.cn/mobile/images/custom-icon02.png" mode=""></image>
					</view>
					<view class="mode-name">微信</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		LoginModel
	} from '@/model/LoginModels'
	const LoginModels = new LoginModel()
	export default {
		data() {
			return {
				mobile: '',
				pwd: '',
				showBindPhone: false, //是否显示绑定手机号
				code: null
			};
		},
		onLoad(e) {
			
		},
		methods: {
			changeAcc(e) {
				this.mobile = e.detail.value;
				// this.setData({
				// 	mobile: e.detail.value
				// })
			},

			changePwd(e) {
				this.pwd = e.detail.value;
				// this.setData({
				// 	pwd: e.detail.value
				// })
			},

			submitForm() {
				let {
					mobile,
					pwd
				} = this
				let param = {
					mobile: mobile,
					pass: pwd
				}
				LoginModels.accountLogin(param, res => {
					if (res.error != 0) {
						uni.showToast({
							title: res.errmsg,
							icon: 'none'
						})
					} else {
						uni.setStorageSync('token', res.token)
						let page = getCurrentPages();
						if (page.length == 1) {
							uni.redirectTo({
								url: '/pages/user/index'
							})
						} else {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
			},

			//微信授权登录
			bindGetUserInfo(e) {
				// let _this = this

				// let userInfo = e.detail.userInfo;
				// uni.getUserInfo({
				// 	success(res) {
				// 		// console.log(res)
				// 		_this.getUser(userInfo)
				// 	},
				// 	fail(error) {
				// 		uni.showToast({
				// 			title: "授权失败,请重新授权",
				// 			icon: "none",
				// 			success(res) {
				// 				uni.redirectTo({
				// 					url: '/pages/index'
				// 				})
				// 			}
				// 		})

				// 	}
				// })


				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes);
					}
				});


			},

			//获取手机号
			getPhoneNumber(e) {
				let userInfo = this.userInfo;
				uni.login({
					success: res => {
						let param = {
							code: res.code,
							encryptedData: e.detail.encryptedData,
							iv: e.detail.iv
						}
						LoginModels.getPhone(param, res => {
							let data = JSON.parse(res.data)
							if (res.error == 0) {
								let param = {
									mobile: data.phoneNumber,
									openid: this.data.openid,
									user_name: userInfo.nickName,
									headimg: userInfo.avatarUrl,
									share_id: uni.getStorageSync('shareID') || 0
								}
								LoginModels.uniLogin(param, res => {
									if (res.error != 0) {
										uni.showToast({
											title: res.errmsg,
											icon: 'none'
										})
									} else {
										uni.setStorageSync('token', res.token)
										let page = getCurrentPages()
										if (page.length == 1) {
											uni.redirectTo({
												url: '/pages/user/index/index'
											})
										} else {
											uni.navigateBack({
												delta: 1
											})
										}
									}
								})
							}
						})
					}
				})
			},

			getUser(userInfo) {
				let _this = this
				uni.login({
					success: data => {
						let param = {
							code: data.code
						}
						LoginModels.getCode(param, res => {
							if (res.error != 0) {
								uni.showToast({
									title: res.errmsg,
									icon: 'none'
								})
							} else {
								if (!res.data) {
									uni.setStorageSync('token', res.token)
									let page = getCurrentPages()
									if (page.length == 1) {
										uni.redirectTo({
											url: '/pages/user/index/index'
										})
									} else {
										uni.navigateBack({
											delta: 2
										})
									}
								} else {
									_this.showBindPhone = true;
									_this.session_key = res.data.session_key;
									_this.openid = res.data.openid;
									_this.userInfo = userInfo;
									// _this.setData({
									// 	showBindPhone : true,
									// 	session_key: res.data.session_key,
									// 	openid: res.data.openid,
									// 	userInfo: userInfo
									// })
								}
							}
						})
					},
					fail: error => {
						console.log(error)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/* pages/user/login/login.uniss */
	page {
		background: #fff;
	}

	.container {
		background: url(http://image.prizemart.cn/mobile/images/login-bgg.jpg) no-repeat;
		background-size: 100% 100vh;
		overflow: hidden;
	}

	.logo {
		width: 462rpx;
		height: 48rpx;
		display: block;
		margin: 120rpx auto 0;
	}

	.login {
		width: 500rpx;
		margin: 100rpx auto 0;
	}

	.item {
		width: 500rpx;
		height: 66rpx;
		display: flex;
		align-items: center;
		margin-bottom: 24rpx;
	}

	.item-cont {
		width: 100%;
	}

	.features {
		width: 500rpx;
		margin: 20rpx auto;
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #666;

		.registered {
			margin-left: auto;
		}
	}
	
	.mode-content {
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
		.mode-img {
			width: 80rpx;
			height: 80rpx;
			border: #ddd 2rpx solid;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			
			image{
				width: 44rpx;
				height: 44rpx;
			}
		}
		
		.mode-name {
			font-size: 24rpx;
			text-align: center;
			margin-top: 10rpx;
		}
	}

	.item-cont .item-input {
		width: 100%;
		height: 66rpx;
		background: rgba(255, 255, 255, .4);
		box-sizing: border-box;
		padding: 0 20rpx;
		font-size: 24rpx;
		border: #eee 2rpx solid;
	}

	.item-cont01 {
		width: 250rpx;
	}

	.captcha {
		width: 218rpx;
		height: 66rpx;
		background: #f23;
		margin-left: auto;
	}

	.phone-code {
		width: 212rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		text-align: center;
		border-radius: 30rpx;
		background: #d44747;
		color: #fff;
		margin-left: auto;
	}

	.submit {
		margin-top: 60rpx;
		background: rgb(245, 91, 104);
		color: #fff;
		border: rgb(245, 91, 104) 2rpx solid;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
	}

	.oth {
		text-align: center;
		padding: 20rpx 0;
	}

	.submitFast {
		background: #07ad31;
		color: #fff;
		border: #07ad31 2rpx solid;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
	}

	.bg {
		background: rgba(0, 0, 0, .6);
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 9;
	}

	.bind-phone {
		width: 100%;
		height: 300rpx;
		position: fixed;
		left: 0;
		bottom: -300rpx;
		z-index: 10;
		background: #fff;
		transition: .3s;
	}

	.show {
		bottom: 0;
	}

	.bind-tip {
		text-align: center;
		font-size: 24rpx;
		color: #999;
		margin-top: 28rpx;
	}

	.bind-btn {
		width: 660rpx;
		height: 80rpx;
		margin: 60rpx auto 0;
		background: #07ad31;
		color: #fff;
		line-height: 80rpx;
		font-size: 28rpx;
	}
	
	.mode-title {
		width: 500rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 100rpx auto 0;
		.line {
			width: 120rpx;
			height: 2rpx;
			background: #ccc;
		}
		.mode-tit {
			margin: 0 24rpx;
			font-size: 24rpx;
			color: #666;
		}
	}
</style>
