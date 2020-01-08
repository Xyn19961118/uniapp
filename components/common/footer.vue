<template>
	<view class="footer">
		<!-- 未登录或者未开店 -->
		<navigator v-if="!isLogin" class="footer-item" :class="dataCurr==0?'active':''" url="/pages/index" hover-class="none"
		 open-type="redirect">
			<image class="footer-img" :src="dataCurr==0?homeActive:home" />
			<view class="footer-text">首页</view>
		</navigator>
		<!-- 未登录或者未开店 -->
		<!-- 如果登录并且开店 -->
		<navigator v-if="isLogin && shopId" class="footer-item" :class="dataCurr==7?'active':''" :url="'/pages/shop/index?id='+shopId"
		 hover-class="none" open-type="redirect">
			<image class="footer-img" :src="dataCurr==7?mallActive:mall" />
			<view class="footer-text">我的商城</view>
		</navigator>
		<!-- 如果登录并且开店 -->
		<navigator v-if="!isLogin || !isShopkeeper" class="footer-item" :class="dataCurr==1?'active':''" url="/pages/classify/classify"
		 hover-class="none">
			<image class="footer-img" :src="dataCurr==1?classfiyActive:classfiy" />
			<view class="footer-text">分类</view>
		</navigator>
		<!-- 店铺分类 -->
		<navigator v-if="isShopkeeper" class="footer-item" :class="dataCurr==1?'active':''" :url="'/pages/classify/classify?shopid='+shopId"
		 hover-class="none">
			<image class="footer-img" :src="dataCurr==1?classfiyActive:classfiy" />
			<view class="footer-text">分类</view>
		</navigator>
		<!-- 店铺分类 -->
		<button v-if="!isInMall" class="footer-item button-item" hover-class="none" open-type="contact">
			<image class="footer-img" src="../../static/server.png" />
			<view class="footer-text">客服</view>
		</button>
		<!-- 非店铺的购物车 -->
		<navigator v-if="!isLogin || !isShopkeeper || !isInMall" class="footer-item" url="/pages/shopcar/shopcar" hover-class="none">
			<image class="footer-img" src="../../static/shopcar.png" />
			<view class="footer-text">购物车</view>
		</navigator>
		<!-- 非店铺的购物车 -->
		<!-- 店铺购物车 -->
		<navigator v-if="isInMall" class="footer-item" :url="'/pages/shopcar/shopcar?id='+shopId" hover-class="none">
			<image class="footer-img" src="../../static/shopcar.png" />
			<view class="footer-text">购物车</view>
		</navigator>
		<!-- 店铺购物车 -->
		<!-- 管理商城 -->
		<navigator v-if="isInMall" class="footer-item" url="/pages/user/index" hover-class="none" open-type="redirect">
			<image class="footer-img" src="../../static/shopcar.png" />
			<view class="footer-text">管理商城</view>
		</navigator>
		<!-- 管理商城 -->
		<navigator v-if="!isInMall" class="footer-item" :class="dataCurr==6?'active':''" url="/pages/user/index"
		 hover-class="none" open-type="redirect">
			<image class="footer-img" :src="dataCurr==6?meActive:me" />
			<view class="footer-text">我的</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		props: {
			dataCurr: {
				type: Number,
				default: 0
			}, //控制当前的active,
			isLogin: Boolean, //是否登录
			isShopkeeper: Boolean, // 是否为店主
			shopId: Number, //当前店铺ID
			selfShopId: Number, // 自己店铺ID
			isCenter: Boolean, // 是否为个人中心
			isCart: Boolean // 是否显示购物车
		},
		data() {
			return {
				home: "../../static/home.png",
				homeActive: "../../static/home@active.png",
				classfiy: "../../static/classify.png",
				classfiyActive: "../../static/classify@active.png",
				me: "../../static/me.png",
				meActive: "../../static/me@active.png",
				mall: "../../static/mall.png",
				mallActive: "../../static/mall@active.png",
				// isLogin:true, //是否在登录状态
				// isShopkeeper: false, //是否是店主
				isInMall: false //是否在我的店铺
			}
		},
		methods: {
			handleContact(e) {
				console.log(e)
			}
		},
		created() {
			if(this.selfShopId == this.shopId){
				this.isInMall = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.footer {
		position: fixed;
		width: 100%;
		height: 100rpx;
		background: #fff;
		border-top: #eee 2rpx solid;
		z-index: 10;
		left: 0;
		bottom: 0;
		display: flex;
	}

	.footer-item {
		flex: 1;
	}

	.footer-img {
		width: 44rpx;
		height: 44rpx;
		margin: 10rpx auto 4rpx;
		display: block;
	}

	.footer-text {
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		color: #999;
	}

	.footer-item.active .footer-text {
		color: #d71317;
	}

	.button-item {
		border: none;
		background: none;
		padding: 0;

	}

	.button-item::after {
		border: none;
	}

	.button-item .footer-text {
		margin-top: -12rpx;
	}
</style>
