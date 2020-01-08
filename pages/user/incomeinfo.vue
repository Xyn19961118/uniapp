<template>
	<!-- 收支明细 -->
	<view class="container">
			<view class="items" v-for="(item, index) in list" :key="index">
				<view class="item">
					<view class="label">用户名：</view>
					<view class="content">{{item.users.user_name}}</view>
				</view>
				<view class="item">
					<view class="label">金额：</view>
					<view class="content red">{{item.goods_amount}}</view>
				</view>
				<view class="item">
					<view class="label">佣金：</view>
					<view class="content red">{{item.commission_money}}</view>
				</view>
				<view class="item">
					<view class="label">差价：</view>
					<view class="content red">{{item.markup_money}}</view>
				</view>
				<view class="item">
					<view class="label">返利：</view>
					<view class="content red">{{item.order_amount_rate}}</view>
				</view>
				<view class="item">
					<view class="label">利润：</view>
					<view class="content red">{{item.money}}</view>
				</view>
				<view class="item w100">
					<view class="label">时间：</view>
					<view class="content">{{item.pay_time}}</view>
				</view>
			</view>

		<view v-if="list.length==0" class="none">您暂时未收支明细</view>
	</view>
</template>

<script>
	import {
		UserModel
	} from "@/model/userModels.js";
	const UserModels = new UserModel();
	export default {
		data() {
			return {
				list: [],
				page: 2,
			};
		},
		onLoad: function(options) {
			UserModels.incomeDetail((res) => {
				this.list = res;
				// this.setData({
				// 	list: res
				// })
			})
		},
		onReachBottom: function(e) {
			let {
				page,
				list
			} = this;
			UserModels.incomeDetail((res) => {
				if (res.length > 0) {
					list.push(...res)
					this.list = list;
					this.page = page + 1;
					// this.setData({
					// 	list: list,
					// 	page: page + 1
					// })
				} else {
					uni.showToast({
						title: '没有更多了',
						duration: 1500,
						icon:"none"
					});
				}
			}, page)
		},
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}
	.container {
		margin-top: 20rpx;
	}

	.items {
		width: 660rpx;
		border: #eee 2rpx solid;
		margin: 0 auto 20rpx;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx 30rpx;
	}

	.item {
		width: 50%;
		display: flex;
		line-height: 48rpx;
		font-size: 26rpx;
	}

	.w100 {
		width: 100%;
	}

	.label {
		color: #999;
	}

	.red {
		color: #f23;
	}

	.none {
		text-align: center;
		margin-top: 100rpx;
	}
</style>
