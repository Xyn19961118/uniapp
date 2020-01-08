<template>
	<!-- 客户订单内容 -->
	<view class="o-container">
		<swiper class="" :current="curr" @change="setCurr" style="height: calc(100vh - 160rpx)">
			<swiper-item class="swiper-item" item-id="">
				<scroll-view class="" scroll-y style="height: calc(100vh - 160rpx)" @scrolltolower="loadOrder">
					<view class="item" v-for="(item, index) in dataObj.all" :key="index">
						<vItem :item="item"></vItem>
					</view>
					<view class="no-list" v-if="dataObj.all.length == 0">您还没有相关订单</view>
				</scroll-view>
			</swiper-item>

			<swiper-item class="swiper-item" item-id="">
				<scroll-view class="" scroll-y style="height: calc(100vh - 160rpx)" @scrolltolower="loadOrder">
					<view class="item" v-for="(item, index) in dataObj.waitPay" :key="index">
						<vItem :item="item"></vItem>
					</view>
					<view class="no-list" v-if="dataObj.waitPay.length == 0">您还没有相关订单</view>
				</scroll-view>
			</swiper-item>

			<swiper-item class="swiper-item" item-id="">
				<scroll-view class="" scroll-y style="height: calc(100vh - 160rpx)" @scrolltolower="loadOrder">
					<view class="item" v-for="(item, index) in dataObj.waitSend" :key="index">
						<vItem :item="item"></vItem>
					</view>
					<view class="no-list" v-if="dataObj.waitSend.length == 0">您还没有相关订单</view>
				</scroll-view>
			</swiper-item>

			<swiper-item class="swiper-item" item-id="">
				<scroll-view class="" scroll-y style="height: calc(100vh - 160rpx)" @scrolltolower="loadOrder">
					<view class="item" v-for="(item, index) in dataObj.success" :key="index">
						<vItem :item="item"></vItem>
					</view>
					<view class="no-list" v-if="dataObj.success.length == 0">您还没有相关订单</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import vItem from "./item";
	export default {
		components: {
			vItem
		},
		props: {
			dataObj: Object,
			curr: Number,
		},
		methods: {
			setCurr(e) {
				this.$emit("setCurr", e.detail.current)
				// console.log(e.detail.current)
			},
			loadOrder(e) {
				this.$emit("loadOrder")
			},
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-item {
		padding-top: 20rpx;
	}

	.item {
		width: 100%;
		background: #fff;
		margin-bottom: 20rpx;
	}

	.no-list {
		text-align: center;
		margin-top: 100rpx;
	}
</style>
