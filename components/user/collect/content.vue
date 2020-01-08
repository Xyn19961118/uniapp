<template>
	<!-- 收藏内容 -->
	<view class="coll-container">
		<swiper class="" :current="curr" @change="setCurr" style="height:calc(100vh - 80rpx)">
			<swiper-item>
				<scroll-view class="" scroll-y style="height:calc(100vh - 80rpx)">
					<view class="coll-items">
						<view class="coll-item" v-for="(item, index ) in dataObj.goods" :key="item.id">
							<vProductItem :item="item" :isChange="goodsColl" :index="index" @selectOne="selectOne"></vProductItem>
						</view>
					</view>
					<view class="no-list" v-if="dataObj.goods.length == 0">您没有该类收藏</view>
				</scroll-view>
			</swiper-item>

			<!-- 店铺收藏 -->
			<swiper-item>
				<scroll-view class="" scroll-y style="height:calc(100vh - 80rpx)">
					<view class="coll-items">
						<view class="coll-item" v-for="(item, index) in dataObj.shop" :key="index">
							<vShopItem :item="item" :isChange="shopColl" :index="index" @selectOne="selectOne"></vShopItem>
						</view>
					</view>
					<view class="no-list" v-if="dataObj.shop.length == 0">您没有该类收藏</view>
				</scroll-view>
			</swiper-item>
			<!-- 店铺收藏 -->
		</swiper>

	</view>
</template>

<script>
	import vProductItem from "./productItem.vue";
	import vShopItem from "./shopItem.vue";
	export default {
		components: {
			vProductItem,
			vShopItem
		},
		props: {
			curr: Number, //控制切换
			dataObj: Object,
			goodsColl: Boolean, //控制商品收藏编辑
			shopColl: Boolean, //控制店铺收藏编辑
		},
		methods: {
			setCurr(e) {
				// console.log(e.detail.current)
				this.$emit("setCurr", e.detail.current)
			},

			//获取子组件的点击选择
			selectOne(e) {
				// console.log(e)
				this.$emit("selectOne", e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.coll-items {
		padding-top: 20rpx;
	}

	.coll-item {
		background: #fff;
		width: 750rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
	}

	.no-list {
		text-align: center;
		margin-top: 100rpx;
	}
</style>
