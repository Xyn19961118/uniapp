<template>
	<view class="container">
		<view class="pic">
			<Pic :img="item.goods_img" :activityImg="item.activity_img" :cityImg="item.country.country_logo?item.country.country_logo:'null'" />
		</view>
		<view class="wrapper">
			<view class="text">{{item.goods_name}}</view>
			<view class="price">
				<view class="price-wrap">
					<view class="price-item">原价</view>
					<view class="price-item">￥{{item.shop_price}}/件</view>
				</view>
				<view class="price-wrap">
					<view class="price-item">店中店低至</view>
					<view class="price-item unique">￥<view class="price-unique">{{item.new_shop_price}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Pic from "./productPic.vue";
	export default {
		components: {
			Pic,
		},
		props: {
			item: Object
		},
		// created	() {
		// 	console.log(this.item)
		// }
	}
</script>

<style lang="scss">
	.wrapper{
	  padding: 24upx 16upx 16upx 16upx;
		background: #fff;
	}
	.text{
	  height: 80upx;
	  line-height: 40upx;
	  display: -webkit-box;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  word-wrap: break-word;
	  white-space: normal !important;
	  -webkit-line-clamp: 2;
	  -webkit-box-orient: vertical;
	  font-size: 24upx;
	  color: #000;
	}
	.price{
	  width: 100%;
	  border: #d71317 2upx solid;
	}
	.price-wrap{
	  display: flex;
	}
	.price-wrap:first-child{
	  border-bottom: #d71317 2upx solid;
	}
	.price-item{
	  width: 50%;
	  height: 36upx;
	  line-height: 36upx;
	  font-size: 22upx;
	  display: flex;
	  overflow: hidden;
	  color: #d71317;
	  justify-content: center;
	  box-sizing: border-box;
	}
	.price-item:first-child{
	  border-right: #d71317 2upx solid;
	}
	.unique{
	  background: #d71317;
	  color: #fff;
	}
	.price-unique{
	  font-size: 28upx;
	}
	.vlc{
	  display: flex;
	  align-items: center;
	}
	.vlc-item{
	  display: flex;
	  font-size: 24upx;
	  color: #999;
	  align-items: center;
	  margin-right: 20upx;
	}
	.decoration{
	  text-decoration: line-through;
	}
	.vlc-price{
	  color: #f23;
	  font-size: 40upx;
	  font-weight: bold;
	}
</style>
