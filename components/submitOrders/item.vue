<template>
	<!-- 产品列表 -->
	<view class="prod-container">
	  <view class="prod-pic">
	    <vPic :img="goods.goods_img"></vPic>
	  </view>
	  <view class="prod-info">
	    <view class="prod-name">{{goods.goods_name}}</view>
	    <view class="prod-number"> x {{goods.goods_number}} </view>
	    <view class="prod-price">￥{{goods.goods_price}}</view>
	  </view>
	</view>
</template>

<script>
	import vPic from "@/components/common/productPic.vue";
	export default {
		components:{
			vPic
		},
		props:{
			goods:Object
		}
	}
</script>

<style lang="scss" scoped>
	.prod-container {
	  padding: 20rpx 30rpx;
	  display: flex;
	}
	
	.prod-pic {
	  width: 160rpx;
	  height: 160rpx;
	  border: #ddd 2rpx solid;
	  border-radius: 8rpx;
	  overflow: hidden;
	  margin-right: 20rpx;
	}
	
	.prod-info {
	  width: calc(100% - 180rpx);
	  font-size: 26rpx;
	}
	
	.prod-name {
	  overflow: hidden;
	  white-space: nowrap;
	  text-overflow: ellipsis;
	}
	.prod-number {
	  margin-top: 10rpx;
	  font-size: 28rpx;
	}
	.prod-price {
	  color: #f23;
	  font-size: 32rpx;
	  margin-top: 12rpx;
	}
</style>
