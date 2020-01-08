<template>
	<!--系统设置-->
	<view class="container">
		<view class="blank"></view>
		<view class="items">
			<navigator url="/pages/user/aboutUs" animation-type="slide-in-right" hover-class="none" class="item">
				<view class="text">关于我们</view>
				<view class="right">
					<image class="point" src="http://m.prizemart.cn/mobile/images/next.png" />
				</view>
			</navigator>

			<navigator url="/pages/user/forgetPassword" animation-type="slide-in-right" hover-class="none" class="item">
				<view class="text">修改密码</view>
				<view class="right">
					<image class="point" src="http://m.prizemart.cn/mobile/images/next.png" />
				</view>
			</navigator>

			<!-- <view url="" hover-class="none" class="item">
	      <view class="text">修改密码</view>
	      <view class="right">
	        <image class="point" src="http://m.prizemart.cn/mobile/images/next.png" />
	      </view>
	    </view> -->

			<button class="button" @tap="logout">安全退出</button>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			logout() {
				uni.clearStorageSync();
				uni.reLaunch({
					url: '/pages/user/login'
				})
			}
		}
	}
</script>

<style lang="scss">
	/* pages/user/setting/setting.wxss */
	page {
		background: #fff;
	}

	.blank {
		width: 100%;
		height: 20rpx;
		background: #f8f8f8;
	}

	.items {
		padding-left: 30rpx;
	}

	.item {
		line-height: 40rpx;
		padding: 20rpx 30rpx 20rpx 0;
		border-bottom: #eee 2rpx solid;
		font-size: 24rpx;
		display: flex;
		align-items: center;
	}

	.right {
		margin-left: auto;
	}

	.point {
		width: 10rpx;
		height: 20rpx;
	}

	.button {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		border: none;
		background: #f23;
		color: #fff;
		border-radius: 0;
		font-size: 32rpx;
	}
</style>
