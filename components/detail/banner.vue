<template>
	<div class="swiper-wrap">
		<swiper :indicator-dots="true" style="height: 800upx">
			<swiper-item class="banner-item" v-for="item in bannerList" :key="item.img_id">
				<view class="swiper-pic">
					<Pic :img="item.img_url" :activityImg="bannerActivity"></Pic>
				</view>
			</swiper-item>
		</swiper>
	</div>

</template>

<script>
	import Pic from "../common/productPic.vue";
	export default {
		props: {
			bannerList: Array,
			bannerActivity:Object
		},
		components: {
			Pic
		},
		created() {
			// console.log(this.bannerList)
		}
	}
</script>

<style lang="scss">
	.swiper-wrap {
		height: 800upx;
	}
	.swiper-pic {
		width: 676upx;
		height: 676upx;
		margin: 30upx auto;
		box-shadow: 0 0 40upx rgba(0, 0, 0, .15);
		border-radius: 8upx;
		overflow: hidden;
	}

	.banner-item {
		width: 676upx;
		height: 676upx;
	}
</style>
