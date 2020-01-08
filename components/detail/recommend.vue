<template>
	<view class="similar">
		<navigator class=""  animation-type="slide-in-right" animation-duration="300" :url="'/pages/detail/detail?id='+item.goods_id+'&&shopid='+shopId" hover-class="none">
			<Pic :img="item.goods_img" />
			<view class="content">
				<view class="name">{{item.goods_name}}</view>
				<view class="price">
					<view class="new-price">￥{{item.new_shop_price}}</view>
					<view class="old-price">￥{{item.shop_price}}</view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	import Pic from "../common/productPic.vue"
	export default {
		components:{
			Pic
		},
		props:{
			item: Object,
			shopId: Number
		},
		created() {
			// console.log(this.item)
		}
	}
</script>

<style lang="scss" scoped>
	.similar {
		padding: 0 20upx;
		box-sizing: border-box;

		.name {
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			color: #767676;
			font-size: 26upx;
			margin-top: 8upx;
		}

		.price {
			display: flex;
			align-items: center;

			.new-price {
				font-size: 24upx;
				color: #282828;
				font-weight: bold;
			}

			.old-price {
				margin-left: auto;
				color: #999;
				font-size: 24upx;
				text-decoration: line-through;
			}
		}
	}
</style>
