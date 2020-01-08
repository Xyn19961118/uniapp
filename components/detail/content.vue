<template>
	<view class="swiper-wrapper">
		<swiper :current="curr" @change="changeSwiper" style="height: calc(100vh - 180upx);">
			<!-- 详情 start -->
			<swiper-item style="height: calc(100vh - 180upx);">
				<scroll-view scroll-y style="height: calc(100vh - 180upx);">
					<!-- 产品轮播图 start -->
					<view class="banner">
						<Banner v-if="dataObj" :bannerList="dataObj.GoodsGallery" :bannerActivity="dataObj.activity_img"></Banner>
					</view>
					<!-- 产品轮播图 end -->

					<!-- 价格 start -->
					<view class="price-wrapper">
						<view class="new-price">
							<view class="span">￥</view>
							{{dataObj.new_shop_price}}
						</view>
						<view class="old-price">￥{{dataObj.nav_price}}</view>
					</view>
					<!-- 价格 end -->

					<!-- 产品信息 -->
					<view class="info">
						<view class="info-top">
							<view class="info-name">
								<image class="info-icon" src="http://m.prizemart.cn/mobile/images/goods-tag.png" />
								{{dataObj.goods_name}}
							</view>
						</view>
						<view class="info-bottom">
							<view class="info-item">
								<image class="info-city" :src="dataObj.country.country_logo" mode="widthFix" />
								{{dataObj.country.country_name}}
							</view>
							<view class="info-item">销量：{{dataObj.sale_total}}</view>
						</view>
					</view>
					<!-- 产品信息 -->

					<!-- 选择规格 -->
					<view class="select-goods" @click="selectGoods">
						<view class="select-goods-label">已选择：</view>
						<view class="select-goods-info">
							<view class="select-goods-name">{{dataObj.goods_name}}</view>
							<view class="select-goods-num">x1</view>
						</view>
						<image class="point" src="../../static/next.png" />
					</view>
					<!-- 选择规格 -->

					<!-- 店铺信息 -->
					<view class="shop">
						<navigator class="shop-info" url="" hover-class="none">
							<image class="shop-head" :src="dataObj.shopInfo.shop_img" mode="aspectFill" lazy-load />
							<view class="shop-name">{{dataObj.shopInfo.shop_name}}</view>
							<image class="shop-tip" src="http://m.prizemart.cn/mobile/images/goods-yy.png" mode="widthFix" lazy-load />
							<view class="shop-enter">进入店铺</view>
						</navigator>
						<view class="shop-welcome">{{dataObj.shopInfo.shop_desc}}</view>
					</view>
					<!-- 店铺信息 -->

					<!-- 相似推荐 -->
					<view class="detail-recommend">
						<view class="detail-recommend-title">
							<view class="detail-recommend-tit">相关推荐</view>
							<navigator class="detail-recommend-link" url="" hover-class="none">
								<view class="detail-recommend-link-name">{{dataObj.categoryName}}</view>
								<image class="point" src="../../static/next.png" />
							</navigator>
						</view>
						<view class="detail-recommend-content">
							<view class="detail-recommend-item" v-for="item in dataObj.randomSame" :key="item.goods_id">
								<Recommend :item="item" :shopId="dataObj.shopInfo.shop_id" />
							</view>
						</view>
					</view>
					<!-- 相似推荐 -->

					<!-- 商品介绍 -->
					<view class="introduce">
						<view class="detail-recommend-title">
							<view class="detail-recommend-tit">商品介绍</view>
						</view>
						<view class="introduce-container">
							<Introduce :component="dataObj.component" :life_time="dataObj.life_time" :type_number="dataObj.type_number"
							 :product_type="dataObj.product_type" :specifications="dataObj.specifications" :box_number="dataObj.box_number"
							 :food_life_time="dataObj.food_life_time" :country="dataObj.country.country_name" />
						</view>
					</view>
					<!-- 商品介绍 -->

					<!-- 商品详情 -->
					<view class="introduce details">
						<view class="detail-recommend-title">
							<view class="detail-recommend-tit">商品介绍</view>
						</view>
						<rich-text class="" :nodes="dataObj.goods_desc2"></rich-text>
						<view class="details-end">
							<image class="details-end-img" src="http://m.prizemart.cn/mobile/images/goods-photo-tips.png" mode="widthFix"
							 lazy-load />
						</view>
					</view>
					<!-- 商品详情 -->

				</scroll-view>
			</swiper-item>
			<!-- 详情 end -->

			<swiper-item style="height: calc(100vh - 180upx); ">
				暂无评论
			</swiper-item>
			<swiper-item style="height: calc(100vh - 180upx);">
				<view class="introduce-container">
					<Introduce :component="dataObj.component" :life_time="dataObj.life_time" :type_number="dataObj.type_number"
					 :product_type="dataObj.product_type" :specifications="dataObj.specifications" :box_number="dataObj.box_number"
					 :food_life_time="dataObj.food_life_time" :country="dataObj.country.country_name" />
				</view>
			</swiper-item>
			<swiper-item v-if="isContrast" style="height: calc(100vh - 60upx);">
				<scroll-view scroll-y style="height: calc(100vh - 60upx);" @scrolltolower="loadMoreShopList" lower-threshold="100"	>
					<view class="contrast">
						<view class="contrast-item-wrapper" v-for="(item, index) in dataObj.shopCompare" :key="item.shop_id">
							<Contrast :conrastObj="item" :thisIndex="index" @selectGoods="selectGoods"/>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import Banner from "./banner.vue";
	import Recommend from './recommend.vue';
	import Introduce from "./Introduce.vue";
	import Contrast from "./contrast.vue";
	export default {
		components: {
			Banner,
			Recommend,
			Introduce,
			Contrast
		},
		props: {
			curr: Number, //当前滑块的current
			isContrast: Boolean, //是否有对比选项
			dataObj: Object, //数据
		},
		methods: {
			//swiper滑动事件
			changeSwiper(e) {
				// console.log(e)
				let index = e.detail.current;
				this.$emit("setIndex", index)
			},
			//升起规格
			selectGoods() {
				console.log("点击升起规格")
			},
			//加载更多店铺
			loadMoreShopList(){
				this.$emit("loadMoreShopList");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.price-wrapper {
		width: 100%;
		height: 80upx;
		background: linear-gradient(to bottom, #ff9494, #ff0b26);
		overflow: hidden;
		display: flex;
		align-items: center;
		color: #fff;

		.new-price {
			display: flex;
			margin-left: 30upx;
			font-size: 40upx;
			align-items: center;

			.span {
				font-size: 20upx;
			}
		}

		.old-price {
			margin-left: 20upx;
			font-size: 24upx;
			text-decoration: line-through;
		}
	}

	.info {
		padding: 20upx 30upx;
		background: #fff;
		box-shadow: 0 6upx 6upx #eee;

		.info-top {
			display: flex;

			.info-name {
				line-height: 42upx;
				color: #000;
			}

			.info-icon {
				width: 84upx;
				height: 28upx;
				display: inline-block;
				vertical-align: middle;
				margin-right: 10upx;
			}
		}

		.info-bottom {
			display: flex;
			align-items: center;
			margin-top: 16upx;

			.info-item {
				display: flex;
				align-items: center;
				margin-right: 60upx;
				color: #999;
				font-size: 24upx;

				.info-city {
					width: 40upx;
					display: inline-block;
					vertical-align: middle;
					margin-right: 10upx;
				}
			}
		}
	}

	.point {
		width: 12upx;
		height: 24upx;
		margin-left: auto;
	}

	.select-goods {
		margin-top: 20upx;
		background: #fff;
		display: flex;
		padding: 30upx;
		box-shadow: 0 0 10upx #ddd;
		align-items: center;



		.select-goods-info {
			display: flex;
			font-size: 30upx;
			font-weight: bold;
			color: #000;

			.select-goods-name {
				max-width: 440upx;
				height: 40upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-right: 12upx;
			}
		}
	}

	.shop {
		margin-top: 20upx;
		background: #fff;
		padding: 30upx;
		box-shadow: 0 0 10upx #ddd;

		.shop-info {
			display: flex;
			align-items: center;

			.shop-head {
				width: 84upx;
				height: 84upx;
				border: #eee 2upx solid;
				margin-right: 16upx;
				border-radius: 50%;
			}

			.shop-name {
				font-size: 26upx;
				color: #000;
			}

			.shop-tip {
				width: 80upx;
				margin-left: 8upx;
			}

			.shop-enter {
				margin-left: auto;
				width: 160upx;
				height: 60upx;
				border-radius: 30upx;
				border: #000 2upx solid;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #000;
				font-size: 24upx;
			}
		}

		.shop-welcome {
			background: #f6f6f6;
			padding: 24upx 52upx;
			margin-top: 20upx;
			border-radius: 8upx;
		}
	}

	.detail-recommend {
		background: #fff;
		box-shadow: 0 0 12upx #ddd;
		margin-top: 20upx;

		.detail-recommend-content {
			padding: 12upx 0;
			color: #000;
			display: flex;

			.detail-recommend-item {
				width: 33.33%;
			}
		}
	}

	.detail-recommend-title {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;

		.detail-recommend-tit {
			color: #000;
		}

		.detail-recommend-link {
			display: flex;
			margin-left: auto;
			align-items: center;

			.detail-recommend-link-name {
				color: #333;
				font-size: 26upx;
				margin-right: 8upx;
			}
		}
	}

	.introduce {
		background: #fff;
		margin-top: 20upx;
		box-shadow: 0 0 12upx #ddd;


	}

	.introduce-container {
		background: #fff;
	}

	.details-end {
		padding: 30upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.details-end-img {
		width: 134upx;
		height: 28upx;
		margin: auto;
	}

	.contrast {
		margin-top: 20upx;
	}
</style>
