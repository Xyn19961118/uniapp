<template>
	<!-- 店铺首页内容 -->
	<view class="sho-container">
		<view class="sho-head">
			<view class="sho-title">{{dataObj.cat_name}}</view>
			<navigator class="sho-more" :url="'/pages/goodsList/goodsList?id='+dataObj.id+'&shopid='+shopId+'&type='+type"
			 hover-class="navigator-hover">
				查看更多
			</navigator>
		</view>
		<view class="sho-content">
			<view class="sho-items">
				<view class="sho-item" v-for="(item, index) in dataObj.hotGoods" :key="index">
					<navigator :url="'/pages/detail/detail?id='+item.goods_id+'&shopid='+shopId" hover-class="none" animation-type="slide-in-right">
						<vItem :item="item" :shopId="shopId"></vItem>
					</navigator>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import vItem from "@/components/common/productItem.vue";
	export default {
		components: {
			vItem
		},
		props: {
			dataObj: Object,
			isShopTop: Boolean,
			shopId: Number
		},
		data() {
			return {
				type: 0
			}
		},
		created() {
			if (this.dataObj.id == 0) {
				this.type = "7"
			} else {
				this.type = "6"
			}
		}

	}
</script>

<style lang="scss" scoped>
	.sho-head {
		width: 100%;
		height: 80rpx;
		background: #fff;
		margin-bottom: 12rpx;
		display: flex;
		align-items: center;
		position: relative;
	}

	.sho-title {
		font-size: 30rpx;
		color: #f23;
		font-weight: bold;
		margin: auto;
	}

	.sho-more {
		position: absolute;
		right: 30rpx;
		top: 0;
		height: 80rpx;
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #000;
	}

	.sho-items {
		display: flex;
		flex-wrap: wrap;
	}

	.sho-item {
		width: 50%;
		padding: 0 8rpx;
		box-sizing: border-box;
		margin-bottom: 12rpx;
	}
</style>
