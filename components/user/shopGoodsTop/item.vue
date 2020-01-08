<template>
	<!--首页推荐每一项-->
	<view class="vi-container">
		<view class="vi-pic">
			<vPic :img="goods.goods.goods_img"></vPic>
		</view>
		<view class="vi-info">
			<view class="vi-name">{{goods.goods.goods_name}}</view>
			<view class="vi-price">
				<view class="vi-price-item">
					供货价:<view class="vi-price-pri">￥{{goods.goods.shop_price}}</view>
				</view>
				<view class="vi-price-item">
					售价:<view class="vi-price-pri">￥{{goods.goods.new_shop_price}}</view>
				</view>
			</view>
			<view class="vi-source">来源分类：{{goods.goods.category.cat_name}}</view>
		</view>

		<view class="vi-btn" :data-id="goods.goods_id" :data-index="index" :data-status="status" @tap="changeGoodsStatus">{{ (status ? goods.is_top : goods.is_hots) ? '取消' : '推荐'}}</view>
	</view>
</template>

<script>
	import vPic from "../../common/productPic.vue";
	export default {
		components: {
			vPic
		},
		props: {
			goods: Object,
			status: Number,
			name: Number,
			index: Number
		},
		methods: {
			changeGoodsStatus(e) {
				// let status = e.currentTarget.dataset.status
				// let goods = this.goods
				// if (status == 1) {
				// 	goods.is_top = !goods.is_top
				// } else {
				// 	goods.is_hots = !goods.is_hots
				// }
				// this.goods = goods;
				this.$emit('change', e.currentTarget.dataset)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vi-container {
		padding: 20rpx 30rpx;
		border-bottom: #ddd 2rpx solid;
		display: flex;
		background: #fff;
	}

	.vi-pic {
		width: 120rpx;
		height: 120rpx;
		border: #eee 2rpx solid;
	}

	.vi-info {
		width: calc(100% - 280rpx);
		margin-left: 20rpx;
	}

	.vi-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #333;
	}

	.vi-price {
		font-size: 24rpx;
		display: flex;
		margin-top: 4rpx;
	}

	.vi-price-item {
		display: flex;
		margin-right: 12rpx;
	}

	.vi-price-pri {
		color: #f23;
	}

	.vi-source {
		color: #999;
		font-size: 24rpx;
		margin-top: 4rpx;
	}

	.vi-btn {
		width: 120rpx;
		height: 48rpx;
		background: #f23;
		color: #fff;
		text-align: center;
		line-height: 48rpx;
		margin-left: auto;
		border-radius: 8rpx;
		font-size: 24rpx;
	}
</style>
