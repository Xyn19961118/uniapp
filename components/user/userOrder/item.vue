<template>
	<!-- 客户订单每一项 -->
	<view class="or-container">
		<view class="or-status" :class="item.status.status==2?'green':''">{{item.status.msg}}</view>
		<view class="or-content">
			<view class="or-order-top">
				<view class="or-order-num">订单号：{{item.order_sn}}</view>
				<navigator class="or-order-detail-link" :url="'/pages/user/orderDetail/orderDetail?id='+item.order_id+'&type=1'"
				 hover-class="none">
					物流/收益详情
				</navigator>
			</view>
			<view class="or-order-username">用户名：{{item.users.user_name}} （{{item.users.mobile_phone}}）</view>
			<view class="or-order-prices">
				<view class="or-order-price">
					订单金额：
					<view class="or-bold">{{item.goods_amount}}</view>
					元
				</view>
				<view class="or-order-price or-order-price-r">
					可收佣金：
					<view class="or-bold">{{item.commission}}</view>
					元
				</view>
			</view>
			<view class="or-list" v-if="showOrder">
				<view class="or-li" v-for="(product, index) in item.order_goods" :key="index">
					<vProduct :goodsItem="product"></vProduct>
				</view>
			</view>
			<view class="or-order-more" @tap="lookProduct">
				查看订单商品
				<image class="or-lookmore-icon" :src="showOrder?lookmoreUp:lookmoreDown" />
			</view>
		</view>
	</view>

</template>

<script>
	import vProduct from "@/components/user/common/item.vue";
	export default {
		components: {
			vProduct
		},
		data() {
			return {
				lookmoreUp: "http://m.prizemart.cn/mobile/images/lookmore-up.png",
				lookmoreDown: "http://m.prizemart.cn/mobile/images/lookmore.png",
				showOrder: false
			}
		},
		props: {
			item: Object
		},
		methods: {
			//查看订单产品
			lookProduct(e) {
				let {
					showOrder
				} = this;
				this.showOrder = !showOrder;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.or-container {
		display: flex;
	}

	.or-status {
		width: 92rpx;
		height: 200rpx;
		background: #f88783;
		color: #fff;
		display: flex;
		justify-items: center;
		align-items: center;
		padding: 0 30rpx;
	}

	.or-status.green {
		background: #60bd9e;
	}

	.or-content {
		width: calc(100% - 92rpx);
		padding: 12rpx 20rpx 12rpx 12rpx;
		font-size: 24rpx;
	}

	.or-order-top {
		display: flex;
		align-items: center;
	}

	.or-order-detail-link {
		margin-left: auto;
		width: 174rpx;
		height: 44rpx;
		color: #f23;
		border: #f23 2rpx solid;
		text-align: center;
		line-height: 44rpx;
		border-radius: 8rpx;
	}

	.or-order-prices {
		display: flex;
		line-height: 44rpx;
	}

	.or-order-price {
		display: flex;
		align-items: center;
	}

	.or-bold {
		font-weight: bold;
		color: #f23;
	}

	.or-order-username {
		line-height: 44rpx;
	}

	.or-order-price-r {
		margin-left: auto;
	}

	.or-order-more {
		width: 100%;
		height: 48rpx;
		background: #ededed;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.or-lookmore-icon {
		width: 24rpx;
		height: 24rpx;
		margin-left: 4rpx;
	}

	.or-list {
		margin-top: 20rpx;
	}
</style>
