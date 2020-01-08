<template>
	<!-- 一个产品 -->
	<view class="p-container">
		<view class="p-pic">
			<vPic :img="goodsItem.goods_img || goodsItem.goods.goods_img"></vPic>
		</view>
		<view class="p-content">
			{{goodsItem.goods_name}}
			<view class="p-back-order">{{goodsItem.status}}</view>
		</view>
		<view class="p-right">
			<view class="p-new-price">￥{{goodsItem.goods_price}}</view>
			<view class="p-old-price" v-if="haveMarket">￥{{goodsItem.market_price}}</view>
			<view class="p-number">x{{goodsItem.goods_number}}</view>
			<view class="p-shopname" v-if="goodsItem.shop_id != shopName">{{goodsItem.shop_id}}</view>
		</view>
	</view>

</template>

<script>
	import vPic from "../../common/productPic.vue";
	export default {
		
		props: {
			goodsItem: Object,
			haveMarket: Boolean,
			shopName: String,
		},
		components:{
			vPic
		}
	}
</script>

<style lang="scss" scoped>
	.p-container {
		padding: 12rpx 30rpx;
		display: flex;
	}

	.p-pic {
		width: 128rpx;
		height: 128rpx;
		border: #eee 2rpx solid;

	}

	.p-content {
		width: calc(100% - 160rpx - 128rpx - 20rpx);
		height: 128rpx;
		margin-left: 20rpx;
		display: -webkit-box;
		overflow: hidden;
		white-space: normal !important;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #333;
	}

	.p-right {
		margin-left: auto;
		text-align: right;
	}

	.p-new-price {
		color: #f23;
	}

	.p-old-price {
		font-size: 24rpx;
		color: #999;
		text-decoration: line-through;
	}

	.p-number {
		margin-top: 8rpx;
	}

	.p-shopname {
		color: #2f9bef;
		font-size: 24rpx;
		margin-top: 8rpx;
	}

	.p-back-order {
		margin-top: 46rpx;
		color: #f23;
	}
</style>
