<template>
	<view>
		<!-- 推广费明细 -->
		<view class="it-container" v-if="curr == 1">
			<view class="it-info">
				<view class="it-name">充值{{items.user_money}}元,到账{{items.account_money}}元的推广费</view>
				<view class="it-time">{{items.add_time}}</view>
			</view>
			<view class="it-price" :class="isLess?'less':''">{{isLess?'-':'+'}}￥{{items.account_money}}</view>
		</view>

		<view class="it-container" v-if="curr == 2">
			<view class="it-info">
				<view class="it-name">发放“{{items.type_name}}”{{items.sent_all}}张</view>
				<view class="it-time">{{items.add_time}}</view>
			</view>
			<view class="it-price" :class="isLess?'less':''">
				{{isLess?'-':'+'}}￥{{(items.sent_all * items.type_money)}}
			</view>
		</view>

		<view class="it-container" v-if="curr == 3">
			<view class="it-info">
				<view class="it-name">回收{{items.type_name}}元,到账{{items.recovery_all}}元的推广费</view>
				<view class="it-time">{{items.add_time}}</view>
			</view>
			<view class="it-price" :class="isLess?'less':''">{{isLess?'-':'+'}}￥{{items.recovery_all}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isLess: Boolean,
			items: Object,
			curr: {
				type: Number,
				value: 1
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.it-container {
	  display: flex;
	  align-items: center;
	  padding: 20rpx 30rpx;
	}
	.it-price {
	  margin-left: auto;
	  color: #00CC33;
	}
	.less {
	  color: #f23;
	}
	.it-name {
	  color: #000;
	}
	.it-time {
	  font-size: 24rpx;
	  color: #999;
	  margin-top: 8rpx;
	}
</style>
