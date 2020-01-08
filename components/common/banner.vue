<template>
	<view class="container">
		<swiper class="swiper" autoplay previous-margin="55upx" next-margin="55upx" circular="true">
			<swiper-item class="swiper-item" v-for="item in bannerData" :key="item.ad_id">
				<navigator url="" hover-class="none">
					<image class="swiper-image" :src="item.ad_code || item.banner_img" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			bannerData: Array
		},
		data() {
			return {
				
			};
		},
		created() {
			console.log(this.bannerData)
		}
	}
</script>

<style lang="scss" >
	.container {
		padding: 20upx 0 0 0;
		background: #fff;

		.swiper {
			.swiper-image{
				width:600upx;
				height:270upx;
				border-radius:16upx;
				margin:0 20upx;
			}
		}
	}
</style>
