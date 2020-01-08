<template>
	<!-- 优惠券回收 -->
	<view class="cintainer">
		<view class="items">
			<view class="item">
				<view class="label">优惠券名称：</view>
				<view class="content">{{dataObj.bonus_info.type_name}}</view>
			</view>

			<view class="item">
				<view class="label">金额：</view>
				<view class="content red">￥{{dataObj.bonus_info.type_money}}</view>
			</view>

			<view class="item">
				<view class="label">使用条件：</view>
				<view class="content">满{{dataObj.bonus_info.sent_money}}元使用</view>
			</view>

			<view class="item">
				<view class="label">发送数量：</view>
				<view class="content">{{dataObj.bonus_info.sent_all}}张</view>
			</view>

			<view class="item">
				<view class="label">已领取：</view>
				<view class="content">{{dataObj.use_info.get}}张</view>
			</view>

			<view class="item">
				<view class="label">已使用：</view>
				<view class="content">{{dataObj.use_info.used}}张</view>
			</view>

			<view class="item">
				<view class="label">未使用,未领取：</view>
				<view class="content">{{dataObj.use_info.no_use}}张</view>
			</view>

			<view class="item"> 
				<view class="label">已经回收：</view>
				<view class="content">{{dataObj.is_recovery?dataObj.bonus_info.sent_all:'0'}}张</view>
			</view>

			<view class="item">
				<view class="label">有效期截止：</view>
				<view class="content">{{dataObj.bonus_info.use_end_date}}</view>
			</view>
		</view>
		<view class="tips red">温馨提示：优惠券回收后无法修改、恢复。</view>
		<button class="button" :disabled="dataObj.is_recovery" @tap="recovery">
			{{dataObj.is_recovery?'此优惠卷已经过期，请在列表中选择一件回收':'回收优惠券'}}
		</button>
	</view>
</template>

<script>
	import {
		ShopBonusModel
	} from "@/model/ShopBonusModel";
	const shopBonusModel = new ShopBonusModel();
	export default {
		data() {
			return {
				dataObj: {},
			};
		},
		onLoad: function(e) {
			let id = e.id;
			shopBonusModel.bonusDetail(id, res => {
				this.dataObj = res
			})
		},

		methods: {
			recovery(e) {
				let dataObj = this.dataObj;
				let id = dataObj.bonus_info.bonus_sel_id;
				// console.log(id)
				shopBonusModel.bonusRecycle(id, res => {
					uni.showToast({
						title: res.errmsg,
						icon: "none"
					})

					uni.navigateTo({
						url: "/pages/user/shopBouns/shopBouns"
					})
				})
			}
		}

	}
</script>

<style lang="scss">
	.items {
		background: #fff;
		
	}

	.item {
		display: flex;
		padding: 20rpx 30rpx;
		border-bottom: #eee 2rpx solid;
	}

	.label {
		font-size: 24rpx;
	}

	.content {
		margin-left: auto;
		color: #333;
	}

	.red {
		color: #f23;
	}

	.tips {
		font-size: 24rpx;
		padding: 0 30rpx;
		margin-top: 20rpx;
	}

	.button {
		position: fixed;
		z-index: 2;
		left: 0;
		bottom: 0;
		background: #f23;
		color: #fff;
		width: 100%;
		border-radius: 0;
		font-size: 32rpx;
		height: 100rpx;
		line-height: 100rpx
	}

	button.button[disabled] {
		background: #f23;
		color: #fff;
		opacity: .6;
	}
</style>
