<template>
	<!-- 首页推荐 content -->
	<view class="shop-content">
		<swiper class="" :current="curr" @change="setCurr" style="height: calc(100vh - 80rpx)">
			<swiper-item class="" item-id="">
				<scroll-view class="" scroll-y style="height: calc(100vh - 80rpx)">
					<!-- <view class="tips">拖动图片排序，默认展示前20个</view> -->
					<view class="shop-item" v-for="(goods, index) in dataObj.topGoods" :key="goods.id">
						<vItem :goods="goods" :status="goods.is_top" :index="index" @change="change"></vItem>
					</view>

					<view class="shop-list-no" v-if="dataObj.topGoods.length == 0">
						您暂未设置该类推荐
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="" item-id="">
				<scroll-view class="" scroll-y style="height: calc(100vh - 80rpx)">
					<view class="shop-item" v-for="(goods, index) in dataObj.hotsGoods" :key="goods.id">
						<vItem :goods="goods"  :index="index" :status="goods.is_hots" @change="change"></vItem>
					</view>
					<view class="shop-list-no" v-if="dataObj.hotsGoods.length == 0">
						您暂未设置该类推荐
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import vItem from "./item.vue";
	export default {
		props: {
			dataObj: Object,
			curr: Number,
		},
		components: {
			vItem
		},
		methods: {
			setCurr(e) {
				this.$emit("setCurr", e.detail.current)
			},
			change(e) {
				this.$emit('change', e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tips {
		width: 100%;
		height: 60rpx;
		padding: 0 30rpx;
		background: #f18137;
		color: #fff;
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.shop-list-no {
		text-align: center;
		padding-top: 100rpx;
	}
</style>
