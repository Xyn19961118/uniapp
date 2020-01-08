<template>
	<view class="container">
		<image class="product-img" lazy-load :src="img" mode="widthFix"></image>
		<image v-if="activityImg" class="activity-img" lazy-load :src="activityImg.logo" mode="widthFix"></image>
		<image v-if="cityImg" class="city-img" lazy-load :src="cityImg" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		props: {
			img: String,
			activityImg: Object,
			cityImg: String
		},
		// created	() {
		// 	// console.log(this.img)
		// }
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		position: relative;
		height: 100%;
		image {
			display: block;
		}
		.product-img {
			width: 100%;
			height: 100%;
		}

		.activity-img {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 2;
		}

		.city-img {
			width: 50upx;
			height: auto;
			position: absolute;
			left: 20upx;
			top: 10upx;
			z-index: 3;
		}

	}
</style>
