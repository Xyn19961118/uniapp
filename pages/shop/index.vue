<template>
	<!-- 店铺首页 -->
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="header">
			<view class="head">
				<image class="head-img" :src="dataObj.shopInfo.shop_img" lazy-load mode="aspectFill" />
				<view class="head-info">
					<view class="head-name">{{dataObj.shopInfo.shop_name}}</view>
					<view class="head-desc">{{dataObj.shopInfo.shop_desc}}</view>
				</view>
				<view class="head-focus" @tap="onFocus" :data-id="dataObj.shopInfo.shop_id">
					{{isFocus==0?'已关注':'+ 关注'}}
				</view>
			</view>
		</view>
		<!-- banner -->
		<view class="banner">
			<vBanner :bannerData="dataObj.swiper"></vBanner>
		</view>
		<!-- banner -->

		<!-- 内容 -->
		<view class="content">
			<view v-if="dataObj.isHaveTop">
				<vContent :dataObj="dataObj.shopTop" :isShopTop="dataObj.isHaveTop" :shopId="dataObj.shopInfo.shop_id"></vContent>
			</view>
			
			<view v-for="(item, index) in dataObj.shopCategory" :key="index">
					<vContent :dataObj="item" :shopId="dataObj.shopInfo.shop_id"></vContent>
			</view>
		</view>
		<!-- 内容 -->

		<!-- 侧边框 -->
		<view class="aside">
			<vAside :shopId="dataObj.shopInfo.shop_id"></vAside>
		</view>
		<!-- 侧边框 -->

		<view class="footer">
			<vFooter :isLogin="isLogin" :isShopkeeper="isShopkeeper" :shopId="shopId" :selfShopId="selfShopId" :isCart="true" :dataCurr="7"></vFooter>
		</view>
	</view>

</template>

<script>
	import {
		ShopModel
	} from '@/model/ShopModel';
	const ShopModels = new ShopModel();
	
	import vBanner from "@/components/common/banner.vue";
	import vContent from "@/components/shop/content.vue";
	import vAside from "@/components/common/aside.vue";
	import vFooter from "@/components/common/footer.vue";
	export default {
		components:{
			vBanner,
			vContent,
			vAside,
			vFooter
		},
		data() {
			return {
				dataObj: {},
				isFocus: 0
			};
		},
		onLoad: function(e) {
			ShopModels.setShopID(e.id)
			this.getStatus()
			ShopModels.shopHome(e.id, (res) => {
				console.log(res)
				this.shopId = parseInt(e.id);
				this.dataObj = res;
				this.isFocus = res.shopInfo.is_focus;
			
				// this.setData({
				// 	shopId: e.id,
				// 	dataObj: res,
				// 	isFocus: res.shopInfo.is_focus
				// })
			})
		},

		
		methods: {
			getStatus() {
				// 是否登录 
				let isLogin = uni.getStorageSync('token') ? true : false;
				// 是否为店主
				let shopId = uni.getStorageSync('shopId') || 0;
				let isShopkeeper = shopId ? true : false;
				this.isLogin = isLogin;
				this.isShopkeeper = isShopkeeper;
				this.selfShopId = shopId;
			},
			onFocus(e) {
				let shopId = e.target.dataset.id;
				ShopModels.focusShop(shopId, (res) => {
					// console.log(res)
					this.isFocus = true;
					uni.showToast({
						title: res.errmsg,
						icon: 'none',
						duration: 1500,
					});
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	/* pages/shop/index/index.wxss */
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	page {
		padding-top: 110rpx;
		padding-bottom: 100rpx;
	}
	

	.header {
		height: 110rpx;
		width: 100%;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 4;
		border-bottom: #eee 2rpx solid;
		box-sizing: border-box;
		padding: 16rpx 12rpx;

	}

	.head {
		width: 100%;
		display: flex;
		height: 80rpx;
	}

	.head-img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 8rpx;
		border: #eee 2rpx solid;
		box-sizing: border-box;
		margin-right: 20rpx;
	}

	.head-name {
		font-size: 30rpx;
		color: #f23;
		font-weight: bold;
	}

	.head-desc {
		font-size: 26rpx;
	}

	.head-info {
		width: 450rpx;
		overflow: hidden;
	}

	.head-focus {
		margin-left: auto;
		width: 120rpx;
		height: 40rpx;
		border: #f23 2rpx solid;
		color: #f23;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 8rpx;
		margin-top: 20rpx;
	}

	.content {
		margin-top: 20rpx;
	}
</style>
