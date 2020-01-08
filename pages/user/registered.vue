//注册
<template>
	<view>
		<view class="logo">
			<image class="logo-img" src="http://image.prizemart.cn/mobile/images/header-logo.png" mode=""></image>
		</view>
		<view class="items">
			<view class="item">
				<view class="item-left">
					<image class="icon" src="http://m.prizemart.cn/mobile/images/login-user.png"></image>
					<input class="input" type="number" maxlength="11" @blur="blurPhone" :value="phoneVal" placeholder="请输入您的手机号码"
					 placeholder-class="place" />
				</view>
			</view>
			<view class="item">
				<view class="item-left">
					<image class="icon" src="http://m.prizemart.cn/mobile/images/login-password.png"></image>
					<input class="input" type="password" :value="firstPassword" @blur="veFirstPassword" placeholder="请输入您的密码"
					 placeholder-class="place" />
				</view>
			</view>
			<view class="item">
				<view class="item-left">
					<image class="icon" src="http://m.prizemart.cn/mobile/images/login-password.png"></image>
					<input class="input" type="password" :value="secondPassword" @blur="veSecondPassword" placeholder="请再次输入您的密码"
					 placeholder-class="place" />
				</view>
			</view>
			<!-- <view class="item">
				<view class="item-left">
					<input class="input" type="text" :value="imgCode" placeholder="请输入图片验证码" placeholder-class="place" />
				</view>
				<view class="item-right">
					<image class="yz-img" src="http://m.prizemart.cn/index.php/captcha.html"></image>
				</view>
			</view> -->
			<view class="item">
				<view class="item-left">
					<input class="input" type="number" maxlength="6" :value="numberCode" placeholder="请输入手机验证码" placeholder-class="place" @blur="setPhoneNum" />
				</view>
				<view class="item-right">
					<button class="get-code" :disabled="isButton" @tap="getPhoneCode">{{getCodeText}}</button>
				</view>
			</view>
			<button class="btn registered" @tap="goRegist" type="button">注册</button>

			<view class="goto-login">我已有账号，<navigator class="link" url="/pages/user/login" animation-type="slide-in-right" hover-class="none">去登录</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneVal: "", //手机号
				firstPassword: "", //首次密码
				secondPassword: "", //二次密码
				imgCode: "", //图片验证码
				numberCode: "", //手机验证码
				isIdentical: false,
				isButton: true,
				getCodeText: "获取验证码"
			};
		},
		methods: {
			//手机号
			blurPhone(e) {
				let phone = e.detail.value;
				let reg = /^1[3456789]\d{9}$/;
				if (reg.test(phone)) {
					this.phoneVal = phone;
					this.isButton = false;
				} else {
					uni.showToast({
						title: "请输入正确的手机号",
						icon: "none"
					})
					this.phoneVal = '';
					this.isButton = true;
				}
			},
			//输入密码
			veFirstPassword(e) {
				let val = e.detail.value;
				if (val.length < 6) {
					uni.showToast({
						title: "密码不能少于6位",
						icon: "none"
					})
					this.firstPassword = "";
				} else {
					this.firstPassword = val;
				}

				this.verificationPassword(val);
			},
			veSecondPassword(e) {
				let val = e.detail.value;
				this.secondPassword = val;
				this.verificationPassword(val);
			},

			//验证密码
			verificationPassword(value) {
				let {
					firstPassword,
					secondPassword
				} = this;
				if (firstPassword !== "" && secondPassword !== "" && firstPassword !== secondPassword) {
					// console.log("aa")
					uni.showToast({
						title: "两次密码输入不一致",
						icon: "none"
					})
					this.isIdentical = false
					return false;
				} else {
					this.isIdentical = true
				}
			},

			//获取验证码
			getPhoneCode(e) {
				// console.log("aa")
				let {
					phoneVal,
					getCodeText,
					isButton
				} = this;
				let timeNum = 60;
				let timer = setInterval(() => {
					timeNum--;
					// console.log(timeNum)
					if (timeNum == 0) {
						clearInterval(timer);
						this.getCodeText = "重新发送";
						this.isButton = false
					} else {
						this.isButton = true;
						this.getCodeText = `${timeNum}s`;
					}
				}, 1000)
			},
			setPhoneNum(e){
				let val = e.detail.value;
				this.numberCode=val;
			},
			//注册
			goRegist(e) {
				let {
					phoneVal,
					firstPassword,
					secondPassword,
					numberCode,
					isIdentical
				} = this;
				if(phoneVal == ""){
					uni.showToast({
						title: "请输入手机号",
						icon: "none"
					})
					return false
				}
				if(firstPassword == ""){
					uni.showToast({
						title: "请输入密码",
						icon: "none"
					})
					return false
				}
				if(secondPassword == ""){
					uni.showToast({
						title: "请输入密码",
						icon: "none"
					})
					return false
				}
				
				if(!isIdentical){
					uni.showToast({
						title: "两次密码输入不一致",
						icon: "none"
					})
					return false
				}
				if(numberCode == ""){
					uni.showToast({
						title: "请输入手机验证码",
						icon: "none"
					})
					return false
				}
				
				uni.showToast({
					title: "去注册",
					icon: "none"
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #fff;
	}

	.logo-img {
		width: 494rpx;
		height: 70rpx;
		margin: 60rpx auto 40rpx;
		display: block;
	}

	.items {
		padding: 0 60rpx;
		margin-top: 20rpx;

		.item {
			display: flex;
			padding: 30rpx 0;
			border-bottom: #eee 2rpx solid;

			.item-left {
				display: flex;
				align-items: center;

				.icon {
					width: 32rpx;
					height: 32rpx;
				}

				.input {
					padding: 0 20rpx;
					font-size: 26rpx;
				}
			}

			.item-right {
				margin-left: auto;
				position: relative;

				.yz-img {
					width: 272rpx;
					height: 84rpx;
					position: absolute;
					right: 0;
					top: -20rpx;
				}

				.get-code {
					height: 60rpx;
					padding: 0 20rpx;
					display: flex;
					align-items: center;
					font-size: 26rpx;
					justify-content: center;
					border: none;
					background: #f23;
					color: #fff;

					&[disabled] {
						background: #eee;
						color: #666;
					}
				}
			}
		}
	}

	.goto-login {
		margin-top: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.link {
			color: #007AFF;
		}
	}

	.registered {
		margin-top: 40rpx;
		background: #f23;
		color: #fff;
		font-size: 32rpx;

	}

	.place {
		color: #999;
	}
</style>
