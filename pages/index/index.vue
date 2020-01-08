<template>
	<view class="container index-bg">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<!-- 头部 start -->
		<view class="header">
			<image class="logo" src="http://m.prizemart.cn/mobile/images/header-logo3.png" mode="aspectFill"></image>
			<view class="classify">
				<image class="classify-img" src="http://m.prizemart.cn/mobile/images/index-classify.png"></image>
				<view class="classify-text">分类</view>
			</view>
		</view> 
		<!-- 头部 end -->
 
		<!-- Banner start -->
		<view class="banner">
			<Banner :bannerData="indexData.swiper"></Banner>
		</view>
		<!-- Banner end -->

		<!-- 导航 start -->
		<view class="nav">
			<view class="nav-items">
				<navigator animation-type="slide-in-right" animation-duration="300" class="nav-item" url="/pages/index/limit"
				 hover-class="none">
					<image class="nav-pic" src="../../static/icon01.png" />
					<text class="nav-txt">自营特卖</text>
				</navigator>
				<navigator animation-type="slide-in-right" animation-duration="300" class="nav-item" url="/pages/index/shopRule"
				 hover-class="none">
					<image class="nav-pic" src="../../static/icon02.png" />
					<text class="nav-txt">开店服务</text>
				</navigator>
				<navigator animation-type="slide-in-right" animation-duration="300" class="nav-item" url="/pages/index/shopList"
				 hover-class="none">
					<image class="nav-pic" src="../../static/icon03.png" />
					<text class="nav-txt">优选店铺</text>
				</navigator>
				<navigator animation-type="slide-in-right" animation-duration="300" class="nav-item" url="" hover-class="none">
					<image class="nav-pic" src="../../static/icon04.png" />
					<text class="nav-txt">店中店学院</text>
				</navigator>
			</view>
		</view>
		<!-- 导航 end -->

		<!-- 爆款推荐 start -->
		<view class="hot">
			<view class="hot-title">
				<view class="hot-txt">爆款推荐</view>
			</view>
			<view class="hot-content">
				<swiper class="" display-multiple-items="3" style="height:450upx">
					<swiper-item class="" v-for="item in indexData.home" :key="item.goods_id">
						<navigator animation-type="slide-in-right" animation-duration="300" :url="'/pages/detail/detail?id='+item.goods_id+'&shopid='+0"
						 hover-class="none">
							<productItem :item="item" />
						</navigator>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 爆款推荐 end -->

		<!-- 产品推荐 start -->
		<view class="recommend">
			<view class="recommend-nav">
				<view class="recommend-item" :class="navCurr==0?'active':''" data-index="0" @click="handleNavClick">
					<view class="recommend-title">推荐</view>
					<view class="recommend-ms">猜你喜欢</view>
				</view>
				<view class="recommend-item" :class="navCurr==1?'active':''" data-index="1" @click="handleNavClick">
					<view class="recommend-title">销量</view>
					<view class="recommend-ms">热销好货</view>
				</view>
				<view class="recommend-item" :class="navCurr==2?'active':''" data-index="2" @click="handleNavClick">
					<view class="recommend-title">热门</view>
					<view class="recommend-ms">热门好货</view>
				</view>
				<view class="recommend-item" :class="navCurr==3?'active':''" data-index="3" @click="handleNavClick">
					<view class="recommend-title">新品</view>
					<view class="recommend-ms">时时上新</view>
				</view>
			</view>
 
			<view class="recommend-content">
				<view class="recom-item" v-for="item in recommendList" :key="item.goods_id">
					<navigator animation-type="slide-in-right" animation-duration="300" :url="'/pages/detail/detail?id='+item.goods_id+'&shopid='+0" hover-class="none">
						<productItem :item="item"></productItem>
					</navigator>
				</view>
			</view>
		</view>
		<!-- 产品推荐 end -->
		
		<!-- 底部 -->
		<vFooter :dataCurr="dataCurr" :shopId="shopId" :isShopkeeper="isShopkeeper" :isLogin="isLogin"></vFooter>
		<!-- 底部 -->
		
	</view>
	
</template>

<script>
	//引入请求
	import {
		IndexModel
	} from "../../model/IndexModels.js";
	const IndexModels = new IndexModel();

	//引入组件
	import Banner from "../../components/common/banner.vue"; //banner组件
	import productItem from "../../components/common/productItem.vue"; //banner组件
	import vFooter from "../../components/common/footer.vue"; //banner组件
	export default {
		components: {
			Banner,
			productItem,
			vFooter
		},
		data() {
			return {
				indexData: {},
				navCurr: 0, //控制推荐商品
				recommendList: [],
				dataCurr: 0, //传给菜单栏
				isShopkeeper: false, //是否是店铺
				token:"",
				shopId:0,
				isLogin: false
			}
		},
		onLoad() {
			uni.showLoading({
				title: "加载数据中...",
				mask: true
			})
			IndexModels.getHome(res => {
				// console.log(res)
				if (res) {
					uni.hideLoading();
					this.indexData = res;
					this.recommendList = res.list.hot;
				}

			})
			// console.log(uni.getStorageSync("token"))
			let token = uni.getStorageSync("token"); //获取token
			let shopId = parseInt(uni.getStorageSync("shopId")); //获取店铺id
			let isLogin = token ? true : false; //是否登录
			let isShopkeeper = shopId ? true : false; //是否为店主
			this.token = token;
			this.shopId = shopId;
			this.isLogin = isLogin;
			this.isShopkeeper = isShopkeeper;
			
		},
		methods: {
			//推荐商品点击事件
			handleNavClick(e) {
				let index = e.currentTarget.dataset.index;
				this.navCurr = index;
				// console.log(typeof index)
				switch (index) {
					case "0":
						this.recommendList = this.indexData.list.hot;
						break;
					case "1":
						this.recommendList = this.indexData.list.new;
						break;
					case "2":
						this.recommendList = this.indexData.list.recommend;
						break;
					case "3":
						this.recommendList = this.indexData.list.sale;
						break;
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding-bottom: 100rpx;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background: #fff;
	}
	
	.index-bg {
		background: #efeff4;
	}

	.header {
		display: flex;
		width: 100%;
		height: 90upx;
		background: #fff;
		display: flex;
		position: relative;

		.logo {
			width: 330upx;
			height: 48upx;
			margin: auto;
		}

		.classify {
			width: 90upx;
			height: 90upx;
			position: absolute;
			right: 0;
			top: 0;
			text-align: center;

			.classify-img {
				width: 40upx;
				height: 28upx;
				margin: 12upx auto 0;
			}

			.classify-text {
				font-size: 24upx;
				display: block;
				line-height: 24upx;
				color: #000;
			}
		}
	}

	.nav {
		padding: 20upx 0;
		background: #fff;
		box-shadow: 0 6upx 6upx #ddd;

		.nav-items {
			padding: 0 20upx;
			display: flex;
			width: 100%;
			box-sizing: border-box;

			.nav-item {
				width: 25%;
				flex: 1;
				display: flex;
				flex-wrap: wrap;

				.nav-pic {
					width: 96upx;
					margin: auto;
					height: 96upx;

				}

				.nav-txt {
					width: 100%;
					text-align: center;
					font-size: 24upx;
					color: #000;
				}
			}
		}
	}

	.hot {
		width: 720upx;
		margin: 20upx auto 0;
		background: #fff;
		border-radius: 16upx;
		box-shadow: 0 0 16upx #ddd;

		.hot-title {
			padding: 20upx;

			.hot-txt {
				color: #000;
			}
		}
	}

	.recommend-nav {
		padding: 30upx 0;
		display: flex;

		.recommend-item {
			width: 25%;
			border-right: #d0d0d0 2upx solid;
			text-align: center;

			.recommend-title {
				font-size: 30upx;
				color: #010101;
			}

			.recommend-ms {
				color: #9d9c9c;
				font-size: 24upx;
				padding: 4upx 12upx;
				display: inline-block;
				border-radius: 20upx;
			}

			&.active .recommend-title {
				background: linear-gradient(to right, #ff4545, #d70018);
				-webkit-background-clip: text;
				color: transparent;
			}

			&.active .recommend-ms {
				background: linear-gradient(to right, #ff9494, #ff0b26);
				color: #fff;
			}
		}
	}

	.recommend-content {
		width: 100%;
		display: flex;
		flex-wrap: wrap;

		.recom-item {
			width: 50%;
			padding: 0 8upx;
			margin-bottom: 12upx;
			box-sizing: border-box;
		}
	}
</style>
