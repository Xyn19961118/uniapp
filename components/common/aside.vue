<template>
	<!-- 侧边 -->
	<view class="asd-container">
		<!-- <view class="item" wx:if="{{isDetail}}" @tap="shareGoods">分享\n商品</view> -->
		<view class="asd-item" @tap="fastShow" :hidden="fastIsShow">快捷\n导航</view>
		<view class="asd-item asd-scroll-top" @tap="returnTop">
			<image class="asd-pic" src="../../static/return-top.png" lazy-load />
		</view>

		<!-- 快捷导航 -->
		<view class="asd-fast" :class="fastIsShow?'asd-show':''">
			<navigator class="asd-item" :url="'/pages/shop/receiveBouns/receiveBouns?id='+shopId" hover-class="none">
				<image class="asd-pic asd-pic01" src="../../static/suspension-coupon01.png" lazy-load />
			</navigator>
			<view class="asd-item" @tap="followShop">
				<image class="asd-pic asd-pic01" src="../../static/suspension-gz01.png" lazy-load />
			</view>
			<navigator class="asd-item" :url="'/pages/shop/index/index?id='+shopId" open-type="redirect" hover-class="none">
				<image class="asd-pic asd-pic01" src="../../static/suspension-home01.png" lazy-load />
			</navigator>
			<view class="asd-item" @tap="fastHide">
				<image class="asd-pic asd-pic02" src="../../static/suspension-close.png" lazy-load />
			</view>
		</view>
		<!-- 快捷导航 -->


	</view>
</template>

<script>
	import {
		ShopModel
	} from "@/model/ShopModel";
	const ShopModels = new ShopModel();
	export default {
		props: {
			shopId: Number,
		},
		data() {
			return {
				isDetail: false, //是否在详情页
				fastIsShow: false, //快捷方式是否显示
				canvasShow: true,
				isHome: false, //是否在首页
			}
		},
		created() {
			//获取当前的路由
			let pages = getCurrentPages();
			let currentPage = pages[pages.length - 1];
			let thisPage = currentPage.route;
			//如果进入详情页，则分享商品显示
			if (thisPage == "pages/detail/detail") {

				this.isDetail = true

			} else if (thisPage == "pages/shop/index/index") {
				this.isHome = true
			}
		},
		methods: {
			//返回顶部
			returnTop(e) {
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
			//快捷方式显示
			fastShow() {
				// this.setData({
					this.fastIsShow = true
				// })
			},
			//快捷方式隐藏
			fastHide() {
				// this.setData({
					this.fastIsShow = false
				// })
			},
			//关注商城
			followShop(e) {
				let id = this.shopId;
				ShopModels.focusShop(id, res => {
					uni.showToast({
						title: res.errmsg,
						icon: "none"
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* components/public/aside/aside.wxss */
	.asd-container {
		position: fixed;
		z-index: 12;
		bottom: 160rpx;
		right: 30rpx;
		width: 76rpx;
	}

	.asd-item {
		width: 76rpx;
		height: 76rpx;
		background: url(http://m.prizemart.cn/mobile/images/return-bg.png) no-repeat;
		background-size: cover;
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #fff;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.asd-pic {
		width: 40rpx;
		height: 40rpx;
	}

	.pic01 {
		width: 48rpx;
		height: 48rpx;
	}

	.asd-pic02 {
		width: 32rpx;
		height: 32rpx;
	}

	.asd-fast {
		position: absolute;
		bottom: 86rpx;
		right: 0;
		width: 76rpx;
		height: 0;
		overflow: hidden;
		transition: .8s;
		display: flex;
		justify-content: flex-end;
		flex-wrap: wrap;
	}

	.asd-fast.asd-show {
		height: 344rpx;
	}

	.asd-bg {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 11;
		background: rgba(0, 0, 0, .4);
		width: 100%;
		height: 100%;
	}
</style>
