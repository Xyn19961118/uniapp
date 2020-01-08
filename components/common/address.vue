<template>
	<!-- 订单详情/提交订单地址 -->
	<view class="address-container">
		<view class="address-border"></view>
		<view class="address-content" v-if="addressObj">
			<view class="address-content-top">
				<view class="address-content-item">收货人：{{addressObj.consignee}}</view>
				<view class="address-content-item">联系电话：{{addressObj.mobile}}</view>
			</view>
			<view class="address-content-botttom">
				<image class="address-content-icon" src="http://m.prizemart.cn/mobile/images/address-icon.png" />
				<view class="address-content-txt">{{addressObj.address}}</view>
			</view>
		</view>

		<view class="address-content address-content-no" v-if="!addressObj">
			您还没有收货地址，请添加<navigator class="address-add-address" url="/pages/user/addAddress" animation-type="slide-in-right" hover-class="none">收货地址</navigator>
		</view>
		<view class="address-border"></view>
	</view>

</template>

<script>
	export default {
		props:{
			addressObj:Object
		},
		data() {
			return {
				
			}
		},

	}
</script>

<style lang="scss" scoped>
	.address-container {
		width: 100%;
	}

	.address-border {
		width: 100%;
		height: 8rpx;
		background: url(http://m.prizemart.cn/mobile/images/address-bor.jpg) repeat-x;
	}

	.address-content {
		padding: 20rpx 30rpx;
		background: #fff;
		font-size: 24rpx;
	}

	.address-content-top {
		display: flex;

	}

	.address-content-item {
		margin-right: 40rpx;
	}

	.address-content-botttom {
		display: flex;
		margin-top: 20rpx;
		color: #999;
		align-items: center;
	}

	.address-content-icon {
		width: 28rpx;
		height: 34rpx;
	}

	.address-content-txt {
		width: calc(100% - 40rpx);
		margin-left: 12rpx;
	}

	.address-content-no {
		display: flex;
	}

	.address-add-address {
		color: #3083FF;
		margin-left: 4rpx;
	}
</style>
