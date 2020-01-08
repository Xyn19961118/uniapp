<template>
	<view class="coup-container" :class="curr!==0?'used':''">
		<view class="coup-item-left">
			<view class="coup-item-price">￥{{dataObj.type_money}}</view>
			<view class="coup-item-maxprice">满{{dataObj.min_goods_amount}}元使用</view>
		</view>
		<view class="coup-item-content"></view>
		<view class="coup-item-right">
			<view class="coup-item-top">
				<view class="coup-item-name">{{dataObj.type_money}}元优惠券</view>
				<view class="coup-item-shop">{{dataObj.shop_name}}</view>
			</view>
			<view class="coup-item-data">
				{{dataObj.start_time}} - {{dataObj.end_time}}
			</view>
		</view>
		<view class="coup-mask" v-if="curr!==0">
			<image v-if="curr==1" class="coup-mask-img" src="http://m.prizemart.cn/mobile/images/yh-ysy.png" lazy-load />
			<image v-if="curr==2" class="coup-mask-img" src="http://m.prizemart.cn/mobile/images/yh-gq.png" lazy-load />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			curr: Number,
			dataObj: Object
		}
	}
</script>

<style lang="scss" scoped>
	.coup-container {
		background: #fff;
		margin-bottom: 20rpx;
		position: relative;
		width: 100%;
		height: 120rpx;
		display: flex;
	}

	.coup-item-left {
		width: 176rpx;
		height: 120rpx;
		background: #d22147;
		color: #fff;
		display: flex;
		overflow: hidden;
		align-content: center;
		justify-content: center;
		flex-wrap: wrap;
	}

	.coup-item-price {
		width: 100%;
		text-align: center;
	}

	.coup-item-maxprice {
		width: 176rpx;
		font-size: 20rpx;
		text-align: center;
		margin-top: 4rpx;
	}

	.coup-item-content {
		width: 8rpx;
		height: 120rpx;
		background: url(http://m.prizemart.cn/mobile/images/coupon-ic.png) repeat-y;
	}

	.coup-item-right {
		width: calc(100% - 180rpx);
		padding: 16rpx 20rpx;
	}

	.coup-item-top {
		display: flex;
		color: #000;
		align-items: center;
	}

	.coup-item-shop {
		margin-left: auto;
		font-size: 24rpx;
		color: #f23;
	}

	.coup-item-data {
		font-size: 24rpx;
		color: #999;
		margin-top: 20rpx;
	}

	.used .coup-item-left {
		background: #999;
	}

	.used .coup-item-content {
		background: url(http://m.prizemart.cn/mobile/images/coupon-ic-gq.png) repeat-y;
	}

	.used .coup-item-shop {
		color: #999;
	}

	.used .coup-item-name {
		color: #999;
	}

	.coup-mask {
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .4);
		z-index: 2;
	}

	.coup-mask-img {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		right: 50rpx;
		top: 10rpx;
		z-index: 3;
	}
</style>
