<template>
	<view>
		<swiper style="height: calc(100vh - 80rpx);" @change="setCurr">
			<swiper-item>
				<scroll-view scroll-y class="swiper-item" style="height: calc(100vh - 80rpx);">
					<view class="coupon-item" v-for="item in dataObj.have" :key="item.ordr_id">
						<Item :dataObj="item" :curr="curr"></Item>
					</view>
					<view class="none" v-if="dataObj.have.length == 0">
						暂无可用优惠券
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y class="swiper-item" style="height: calc(100vh - 80rpx);">
					<view class="coupon-item" v-for="item in dataObj.used" :key="item.ordr_id">
						<Item :dataObj="item" :curr="curr"></Item>
					</view>
					<view class="none" v-if="dataObj.used.length == 0">
						该分类暂无优惠券
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y class="swiper-item" style="height: calc(100vh - 80rpx);">
					<view class="coupon-item" v-for="item in dataObj.expired" :key="item.ordr_id">
						<Item :dataObj="item" :curr="curr"></Item>
					</view>
					<view class="none" v-if="dataObj.expired.length == 0">
						该分类暂无优惠券
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import Item from "./item.vue";
	export default {
		props:{
			curr: Number,
			dataObj: Object
		},
		components:{
			Item
		},
		methods:{
			setCurr(e){
				this.$emit("setCurr",e.detail.current);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.coupon-item {
			width: 90%;
			margin: auto;
	}
	.none {
		text-align: center;
		margin-top: 80rpx;
	}
</style>
