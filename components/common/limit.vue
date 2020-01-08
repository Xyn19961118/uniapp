<template>
	<view class="item">
		<navigator animation-type="slide-in-right" hover-class="none" url="" class="pic">
			<Pic :img="item.goods_img" :activityImg="item.activity_img"></Pic>
		</navigator>
		<view class="info">
			<navigator animation-type="slide-in-right" hover-class="none" url="" class="info-title">
				<view class="name">{{item.goods_name}}</view>
			</navigator>
			<view class="info-center">
				<view class="info-price">
					<view class="info-newprice">
						<view class="info-newprice-bz">￥</view>
						{{item.new_shop_price}}
					</view>
					<view class="info-oldprice">￥{{item.market_price}}</view>
				</view>
				<view class="info-right">
					<view class="info-number">已抢1000件</view>
					<view class="info-addcar" :data-goodsId="item.goods_id" :data-shopId="item.shop_id" @click="addShopCar">
						马上抢
					</view>
				</view>
			</view>
			<view class="info-bottom">促清商品，下单请参考食用期限</view>
		</view>
	</view>
</template>

<script>	
	import Pic from "./productPic.vue";
	export default {
		components:{
			Pic
		},
		props: {
			item: Object
		},
		methods: {
			addShopCar(e) {
				// console.log(e)
				let goodsId = e.currentTarget.dataset.goodsid;
				let shopId = e.currentTarget.dataset.shopid;
				this.$emit("addShopCar",{goodsId,shopId})
			}
		},
	}
</script>

<style lang="scss">
	.item {
		padding: 20upx;
		background: #fff;
		display: flex;
	}

	.pic {
		width: 220upx;
		height: 220upx;
	}

	.info {
		width: calc(100% - 240upx);
		margin-left: 20upx;
	}

	.info-title {
		line-height: 40upx;
		height: 80upx;
	}

	.name {
		font-weight: bold;
		color: #333;
		display: -webkit-box;
		overflow: hidden;
		white-space: normal !important;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.ms {
		font-size: 24upx;
		color: #999;
		display: -webkit-box;
		overflow: hidden;
		white-space: normal !important;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.info-center {
		display: flex;
		align-items: center;
	}

	.info-newprice {
		color: #f23;
		font-weight: bold;
		font-size: 40upx;
		display: flex;
		align-items: center;
		margin-right: 4upx;
	}

	.info-newprice .info-newprice-bz {
		font-size: 24upx;
		font-weight: normal;
	}

	.info-oldprice {
		text-decoration: line-through;
		color: #999;
		font-size: 24upx;
	}

	.info-goto {
		width: 140upx;
		height: 56upx;
		background: #e31436;
		color: #fff;
		text-align: center;
		line-height: 56upx;
		border-radius: 8upx;
		margin-left: auto;
	}

	.info-bottom {
		color: #e31436;
		font-size: 24upx;
		margin-top: 8upx;
	}

	.info-right {
		width: 270upx;
		height: 60upx;
		border-radius: 30upx;
		background: #fefbd1;
		border: #fdf8c0 2upx solid;
		margin-left: auto;
		display: flex;
		align-items: center;
		padding-left: 20upx;
	}

	.info-number {
		font-size: 20upx;
		color: #db763c;
	}

	.info-addcar {
		width: 124upx;
		height: 60upx;
		background: #e93340;
		color: #fff;
		margin-left: auto;
		border-radius: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
	}
</style>
