<template>
	<!-- 订单详情 -->
	<view class="container">
		<view class="address" v-if="!orderType">
			<vAddress :addressObj="dataObj"></vAddress>
		</view>
		<view class="list">
			<view class="list-top">订单号：{{dataObj.order_sn}}</view>
			<view class="items">
				<view class="item" v-for="(item, index) in dataObj.order_goods" :key="index">
					<vItem :goodsItem="item"></vItem>
				</view>
			</view>
		</view>
		<view class="express-items">
			<view class="express-item">
				<view class="label">支付方式</view>
				<view class="web-type">{{dataObj.pay_name}}</view>
			</view>
			<view class="express-item">
				<view class="label">快递</view>
				<view class="web-type">{{dataObj.shipping_name}}</view>
			</view>
			<view class="express-item express-item01" v-if="orderType">
				<view class="express-top">
					<view class="label">物流信息</view>
					<view class="web-type">{{dataObj.logisticStatus}}</view>
				</view>
				<view class="express-ts">为保护用户隐私，您只能查看简略物流信息</view>
			</view>
			<view class="express-item" v-if="orderType">
				<view class="label">下单的用户</view>
				<view class="web-type">
					用户手机号：{{dataObj.users.mobile_phone}} 用户名：{{dataObj.users.user_name}}
				</view>
			</view>
			<view class="express-item" v-if="orderType">
				<view class="label">订单收货人</view>
				<view class="web-type">{{dataObj.consignee}}</view>
			</view>
			<view class="express-item" v-if="orderType">
				<view class="label">下单时间</view>
				<view class="web-type">{{dataObj.add_time}}</view>
			</view>
		</view>
		<view class="express-items" v-if="orderType">
			<view class="express-item">
				<view class="label">预计佣金</view>
				<view class="moneydetail-price">
					￥
					<view class="moneydetail-pri">{{dataObj.commission}}</view>
				</view>
			</view>
		</view>
		<view class="pay">
			<view class="moneydetail">
				<view class="moneydetail-item">
					<view class="moneydetail-label">商品价格：</view>
					<view class="moneydetail-price">
						￥
						<view class="moneydetail-pri">{{dataObj.goods_amount}}</view>
					</view>
				</view>
				<view class="moneydetail-item">
					<view class="moneydetail-label">优惠额：</view>
					<view class="moneydetail-price">
						-￥
						<view class="moneydetail-pri">{{dataObj.web_bonus_val}}</view>
					</view>
				</view>
				<view class="moneydetail-item">
					<view class="moneydetail-label">优惠劵：</view>
					<view class="moneydetail-price">
						-￥
						<view class="moneydetail-pri">{{dataObj.shop_bonus_val}}</view>
					</view>
				</view>
				<view class="moneydetail-item">
					<view class="moneydetail-label">运费劵：</view>
					<view class="moneydetail-price">
						-￥
						<view class="moneydetail-pri">{{dataObj.shop_shipping_val}}</view>
					</view>
				</view>
				<view class="moneydetail-item">
					<view class="moneydetail-label">运费：</view>
					<view class="moneydetail-price">
						￥
						<view class="moneydetail-pri">{{dataObj.shipping_fee}}</view>
					</view>
				</view>
			</view>
			<view class="money-all">
				<view class="money-count">
					实付款：
					<view class="moneydetail-pri">￥{{dataObj.order_amount}}</view>
				</view>
				<view class="money-count money-time" v-if="orderType">{{dataObj.status.msg}}</view>
				<view class="money-count money-time" v-if="!orderType">下单时间：{{dataObj.add_time}}</view>
			</view>
		</view>
		<view v-if="orderType == false">
			<view class="handle" v-if="dataObj.status.status != 7">
				<view class="order-btn" v-if="dataObj.status.status==2 || dataObj.status.status== 4 " @tap="afterOrder">
					申请退款
				</view>
				<view class="handle-btns">
					<view class="order-btn" v-if="dataObj.status.status==6">订单已取消</view>
					<view class="order-btn order-btn-orange" v-if="dataObj.status.status==2" @tap="remind">
						提现发货
					</view>
					<view class="order-btn" v-if="dataObj.status.status == 1" @tap="cancel">取消订单</view>
					<view class="order-btn order-btn-orange" v-if="dataObj.status.status == 1" @tap="pay">
						付款
					</view>
					<navigator class="order-btn order-btn-orange" :url="'/pages/user/lookLogistics/lookLogistics?id='+dataObj.order_id"
					 hover-class="none" open-type="navigate" v-if="dataObj.status.status == 3">
						查看物流
					</navigator>
					<navigator class="order-btn order-btn-orange" :url="'/pages/user/commentSelect/commentSelect?id='+dataObj.order_id"
					 hover-class="none" open-type="navigate" v-if="dataObj.status.status == 4">
						去评价
					</navigator>
				</view>
			</view>
		</view>
	</view>

</template>
 
<script>
	import vAddress from "@/components/common/address.vue";
	import vItem from "@/components/user/common/item.vue";

	import {
		UserModel
	} from "@/model/userModels.js";
	const userModel = new UserModel();
	export default {
		components: {
			vAddress,
			vItem
		},
		data() {
			return {
				dataObj: {},
				orderType: false, // false为普通订单详情，true为用户订单详情
				id: 0
			};
		},
		onLoad: function(e) {
			let id = e.id;
			this.id = id;
			//e.type判断是否是用户订单
			if (e.type) {
				//用户订单详情
				userModel.userOrderDetail(id, res => {
					console.log(res)
					this.dataObj = res;
					this.orderType = true;
				})
			} else {
				//普通订单详情
				this.getDetail(id).then(res => {
					console.log(res)
					this.dataObj = res;
				})
			}

		},

		methods: {
			//申请退款
			afterOrder(e) {
				let id = this.dataObj.order_id;
				uni.showActionSheet({
					itemList: ['单个产品退款', '整个订单退款'],
					success(res) {
						if (res.tapIndex) {
							uni.navigateTo({
								url: `/pages/user/refundDetail?s=0&id=${id}`
							});
						} else {
							//选择产品退款
							uni.navigateTo({
								url: `/pages/user/refundSelect?s=1&id=${id}`
							});
						}
					},
					fail(res) {
						console.log(res.errMsg)
					}
				})
			},
			//提醒发货
			remind(e) {
				uni.showToast({
					title: '已提醒商家发货',
					icon: 'none',
				});
			},
			//去支付
			pay(e) {
				console.log("去支付喽~")
			},
			//取消订单
			cancel(e) {
				uni.showModal({
					content: '确认取消该订单吗？',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							userModel.cancel(this.id)
							let data = this.dataObj
							data.status.status = 6
							data.status.msg = '订单已取消'
							this.dataObj = data;
						}
					}
				});
			},
			//获取用户订单详情
			getDetail(id) {
				return new Promise((resolve, reject) => {
					userModel.orderListDetail(id, (res) => {
						if (res) {
							resolve(res)
						} else {
							reject(err)
						}
					})
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding-bottom: 100rpx;
	}

	.address {
		margin-top: 20rpx;
	}

	.list {
		width: 100%;
		margin-top: 20rpx;
		border-top: #eee 2rpx solid;
		border-bottom: #eee 2rpx solid;
		background: #fff;
	}

	.list-top {
		padding: 16rpx 30rpx;
		border-bottom: #eee 2rpx solid;
		font-size: 26rpx;
	}

	.express-items {
		font-size: 24rpx;
		border-top: #eee 2rpx solid;
		background: #fff;
		margin-top: 20rpx;
		color: #999;
	}

	.express-item {
		width: 100%;
		height: 80rpx;
		border-bottom: #eee 2rpx solid;
		display: flex;
		padding: 0 30rpx;
		align-items: center;
	}

	.web-type {
		margin-left: auto;
	}

	.pay {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		padding: 20rpx 30rpx;
		background: #fff;
	}

	.moneydetail {
		padding-bottom: 16rpx;
	}

	.moneydetail-item {
		height: 64rpx;
		width: 100%;
		display: flex;
		align-items: center;
	}

	.moneydetail-price {
		margin-left: auto;
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.moneydetail-pri {
		color: #f23;
		font-size: 36rpx;
		font-weight: bold;
	}

	.money-all {
		border-top: #eee 2rpx solid;
		padding-top: 20rpx;
	}

	.money-count {
		display: flex;
		justify-content: flex-end;
	}

	.money-time {
		font-size: 24rpx;
		color: #999;
		margin-top: 4rpx;
	}

	.handle {
		width: 100%;
		height: 100rpx;
		background: #fff;
		border-top: #ddd 2rpx solid;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 3;
		display: flex;
		padding: 20rpx 30rpx;
	}

	.order-btn {
		width: 160rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border: #ddd 2rpx solid;
		box-sizing: border-box;
		border-radius: 6rpx;
		margin-left: 20rpx;
	}

	.order-btn-orange {
		background: #eb6b0d;
		border: #eb6b0d 2rpx solid;
		color: #fff;
	}

	.handle-btns {
		margin-left: auto;
		display: flex;
	}

	.express-top {
		display: flex;
		width: 100%;
	}

	.express-item01 {
		flex-wrap: wrap;
		height: 120rpx;
	}

	.express-ts {
		color: #f23;
	}
</style>
