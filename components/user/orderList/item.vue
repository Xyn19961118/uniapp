<template>
	<!-- 订单列表每一项 -->
	<view class="o-container">
		<view class="o-order-top">
			<view class="o-order-number">订单号：{{parentOrder.order_sn}}</view>
			<view class="o-order-status">
				{{(parentOrder.is_back == 0) ? parentOrder.status.msg : parentOrder.is_back}}
			</view>
		</view>
		<view class="o-order-content">
			<!-- 每个子订单 -->
			
				<view class="o-order-item" v-for="(child, index) in childOrder" :key="child.order_id">
					<view class="o-order-item-top" v-if="child.length>1 || parentOrder.order_id != child.order_id">
						<view class="o-order-item-number">订单号：{{child.order_sn}}</view>
						<view class="o-order-item-shopname">{{child.referer}}</view>
					</view>
					<!-- :style="child.status?styles:style" -->
					<view class="o-order-item-content"  v-if="child.order_goods.length > 0">
						<!-- 每一项商品 -->
							<view class="o-order-li" v-for="goodsItem in child.order_goods" :key="goodsItem.order_sn" @tap="lookDetail" :data-id="parentOrder.order_id" >
								<orderItem :goodsItem="goodsItem" :data-id="parentOrder.order_id"  :shopName="parentOrder.referer"></orderItem>
							</view>
						<!-- 每一项商品 -->
					</view>
					<!-- <view class="o-order-item-look" v-if="child.order_goods.length>1" :data-index="index" :data-status="child.status"
					 :data-id="child.order_id" @tap="isShow">
						{{child.status?'收起更多':'查看更多'}}
						<image class="o-order-look-icon" :src="child.status?up:down" lazy-load :data-index="index" :data-status="child.status"
						 :data-id="child.order_id" @tap="isShow" />
					</view> -->
					<view class="o-order-item-bottom" v-if="parentOrder.order_id != child.order_id">
						运费：
						<view class="o-fare">￥{{child.shipping_fee}}</view>
					</view>
				</view>

			<!-- 每个子订单 -->
		</view>
		<view class="o-order-bottom">
			<view class="o-order-summary">
				<view class="o-order-summary-shopname" v-if="childOrder.length == 1">
					{{parentOrder.referer}}
				</view>
				<view class="o-order-summary-all">
					共
					<view class="o-order-summary-color">{{parentOrder.total}}</view>
					件,应付金额：
					<view class="o-order-summary-color">￥{{parentOrder.order_amount}}</view>
				</view>
			</view>
			
			<view class="o-order-btns">
				<view class="o-order-btn" v-if="parentOrder.status.status==1" :data-id="parentOrder.order_id" data-status="6" @tap="cancel">
					取消订单
				</view>
				<view class="o-order-btn o-order-btn-orange" v-if="parentOrder.status.status==1" :data-id="parentOrder.order_id"
				 @tap="orderPay">
					付款
				</view>
				<view class="o-order-btn" v-if="parentOrder.status.status==2" :data-id="parentOrder.order_id" @tap="remind">
					提醒发货
				</view>
				<view class="o-order-btn" v-if="parentOrder.status.status==3" :data-id="parentOrder.order_id" @tap="lookLogis">
					查看物流
				</view>
				<view class="o-order-btn o-order-btn-orange" v-if="parentOrder.status.status==3" :data-id="parentOrder.order_id"
				 data-status="4" @tap="receipt">
					确认收货
				</view>
				<view class="o-order-btn o-order-btn-orange" v-if="parentOrder.status.status==4" :data-id="parentOrder.order_id"
				 @tap="goEval">
					去评价
				</view>
				<view class="o-order-btn o-order-btn-red" v-if="parentOrder.status.status==6" :data-id="parentOrder.order_id">
					订单已取消
				</view>
			</view>
			
			
		</view>
	</view>

</template>

<script>
	import orderItem from "../common/item.vue"
	export default {
		// created() {
		// 	console.log(typeof this.childOrder)
		// },
		props: {
			parentOrder: Object,
			childOrder: Array
		},
		data() {
			return {
				style: 'height:152rpx;overflow:hidden',
				styles: '',
				down: "http://m.prizemart.cn/mobile/images/lookmore.png",
				up: "http://m.prizemart.cn/mobile/images/lookmore-up.png",
			}
		},
		components:{
			orderItem
		},
		methods:{
			//进入订单详情
			lookDetail(e){
				let id = e.currentTarget.dataset.id;
				uni.navigateTo({
					url:`/pages/user/orderDetail?id=${id}`,
					animationType:"slide-in-right"
				})
			},
			isShow(e){
				// this
				console.log(e)
			},
		}


	}
</script>

<style lang="scss" scoped>
	.o-order-top {
		width: 100%;
		height: 76rpx;
		padding: 16rpx 30rpx;
		background: #efefef;
		border-top: #ddd 2rpx solid;
		border-bottom: #ddd 2rpx solid;
		display: flex;
		align-items: center;
		font-size: 28rpx;
	}

	.o-order-number {
		color: #333;
	}

	.o-order-status {
		color: #eb6b0d;
		margin-left: auto;
	}

	.o-order-item {
		background: #fff;
		margin-bottom: 8rpx;
		width: 100%;
	}

	.o-order-item-top {
		height: 60rpx;
		border-bottom: #eee 2rpx solid;
		padding: 8rpx 30rpx;
		align-items: center;
		font-size: 26rpx;
		display: flex;
	}

	.o-order-item-shopname {
		margin-left: auto;
		color: #5485ab;
	}

	.o-order-item-look {
		width: 100%;
		height: 50rpx;
		background: #f7eada;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #000;
	}

	.o-order-look-icon {
		width: 24rpx;
		height: 24rpx;
		margin-left: 10rpx;
	}

	.o-order-item-bottom {
		padding: 0 30rpx;
		background: #fff;
		display: flex;
		height: 60rpx;
		align-items: center;
		justify-content: flex-end;
		border-top: #eee 2rpx solid;
	}

	.o-fare {
		color: #ff8d00;
		margin-left: 4rpx;
	}

	.o-order-bottom {
		padding: 16rpx 30rpx;
		background: #fff;
	}

	.o-order-summary {
		display: flex;
		align-items: center;
	}

	.o-order-summary-all {
		display: flex;
		margin-left: auto;
	}

	.o-order-summary-color {
		color: #f23;
	}

	.o-order-summary-shopname {
		color: #5485ab;
	}

	.o-order-btns {
		height: 60rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-top: 16rpx;
	}

	.o-order-btn {
		width: 160rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border: #ddd 2rpx solid;
		box-sizing: border-box;
		border-radius: 6rpx;
		margin-left: 20rpx;
	}

	.o-order-btn-orange {
		background: #eb6b0d;
		border: #eb6b0d 2rpx solid;
		color: #fff;
	}

	.o-order-btn-red {
		background: #dfdfdf;
		border: #dfdfdf 2rpx solid;
		color: #fff;
	}
</style>
