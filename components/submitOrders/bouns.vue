<template>
	<!-- 优惠券 -->
	<view class="bou-container">
		<view class="bou-cont-left">
			<view class="bou-money">￥{{bonus.type_money}}</view>
			<view class="bou-term">满{{bonus.min_goods_amount}}使用</view>
		</view>
		<view class="bou-sawtooth"></view>
		<view class="bou-cont-info">
			<view class="bou-cont-name">{{bonus.type_name}}</view>
			<view class="bou-cont-time">截止时间: {{bonus.use_end_date}}</view>
		</view>
		<view class="bou-select" @tap="changStatus" :data-id="bonus.user_sel_id" :data-type="bonus.bonus_type" :data-shop="bonus.shop_id"
		 :data-name="bonus.type_name">
			<vSelect :isSelect="bonus.is_select"></vSelect>
		</view>
	</view>

</template>

<script>
	import vSelect from "@/components/common/select.vue";
	export default {
		components: {
			vSelect
		},
		props: {
			bonus: Object,
			isSelect: Number
		},
		methods: {
			changStatus(e) {
				let val = e.currentTarget.dataset
				this.$emit('changStatus', val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bou-container {
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
	}

	.bou-cont-left {
		background: #d22147;
		color: #fff;
		width: 176rpx;
		height: 120rpx;
		text-align: center;
		display: flex;
		align-content: center;
		justify-content: center;
		flex-wrap: wrap;
	}

	.bou-sawtooth {
		width: 8rpx;
		height: 120rpx;
		background: url(http://m.prizemart.cn/mobile/images/coupon-ic.png) repeat-y;
	}

	.bou-cont-info {
		padding: 12rpx 0;
		margin-left: 12rpx;
		width: 400rpx;
		color: #333;
	}

	.bou-cont-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.bou-cont-time {
		font-size: 24rpx;
		color: #666;
		margin-top: 10rpx;
	}

	.bou-select {
		width: 36rpx;
		height: 36rpx;
		margin-left: 20rpx;
	}

	.bou-money {
		font-size: 32rpx;
	}

	.bou-term {
		font-size: 24rpx;
	}
</style>
