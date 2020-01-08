<!-- 开店服务 -->
<template>
	<view class="container">
		<image class="img" src="http://image.prizemart.cn/mobile/images/openinfo03-01.jpg" mode="widthFix" lazy-load />
		<image class="img" src="http://image.prizemart.cn/mobile/images/openinfo03-02.jpg" mode="widthFix" lazy-load />
		<view class="btn" v-if="!isShop" @click="onTap">立即开店</view>
		<view class="btn" v-else @click="onTap">前往店铺</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShop: true
			}
		},
		methods: {
			onTap() {
				if(isShop){
					//去店铺
				}else {
					//去开店
				}
			}
		},
		created() {
			const shopId = uni.getStorageSync("shopId");
			if (!shopId) {
				this.isShop = false
			} else {
				this.isShop = true
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding-bottom: 100upx;
	}

	.img {
		display: block;
		width: 100%;
	}

	.btn {
		width: 100%;
		height: 100upx;
		background: $prizemart-bg-color-oldred;
		color: $uni-text-color-inverse;
		text-align: center;
		line-height: 100upx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2;
	}
</style>
