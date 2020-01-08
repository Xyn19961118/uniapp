<template>
	<view class="swiper">
		<swiper style="height: calc(100vh - 266upx);" :current="curr" @change="setIndex">
			<swiper-item>
				<scroll-view class="swipe-it" scroll-y style="height: calc(100vh - 266upx);">
					<view class="head">
						<image class="head-bgimg" src="http://m.prizemart.cn/mobile/images/me-bg.png"></image>
						<navigator url="" hover-class="none" class="head-info">
							<image class="head-image" :src="info.headimg"></image>
							<view class="head-name">{{info.user_name}}</view>
						</navigator>
					</view>
					<!-- 我的订单 -->
					<view class="order">
						<view class="order-title">
							<view class="order-tit">我的订单</view>
							<view class="order-more" @tap="goOrderList">查看更多订单 ></view>
						</view>
						<view class="order-items">
							<navigator url="/pages/user/orderList?curr=1" animation-type="slide-in-right" class="order-item" hover-class="navigator-hover">
								<view class="order-pic">
									<image class="order-img" src="http://m.prizemart.cn/mobile/images/order-ic01.png" />
									<!-- v-if="info.orderStatus.waitPay>0" -->
									<view class="order-num">
										{{info.orderStatus.waitPay}}
									</view>
								</view>
								<view class="order-txt">待付款</view>
							</navigator>
							<navigator url="/pages/user/orderList?curr=2" animation-type="slide-in-right" class="order-item" hover-class="navigator-hover">
								<view class="order-pic">
									<image class="order-img" src="http://m.prizemart.cn/mobile/images/order-ic02.png" />
									<view class="order-num" v-if="info.orderStatus.waitSend>0">
										{{info.orderStatus.waitSend}}
									</view>
								</view>
								<view class="order-txt">待发货</view>
							</navigator>
							<navigator url="/pages/user/orderList?curr=3" animation-type="slide-in-right" class="order-item" hover-class="navigator-hover">
								<view class="order-pic">
									<image class="order-img" src="http://m.prizemart.cn/mobile/images/order-ic03.png" />
									<view class="order-num" v-if="info.orderStatus.waitReceive>0">
										{{info.orderStatus.waitReceive}}
									</view>
								</view>
								<view class="order-txt">待收货</view>
							</navigator>
							<navigator url="/pages/user/orderList?curr=4" animation-type="slide-in-right" class="order-item" hover-class="navigator-hover">
								<view class="order-pic">
									<image class="order-img" src="http://m.prizemart.cn/mobile/images/order-ic04.png" />
									<view class="order-num" v-if="info.orderStatus.success>0">
										{{info.orderStatus.success}}
									</view>
								</view>
								<view class="order-txt">待评价</view>
							</navigator>
							<navigator url="/pages/user/afterList/afterList" animation-type="slide-in-right" class="order-item" hover-class="navigator-hover">
								<view class="order-pic">
									<image class="order-img" src="http://m.prizemart.cn/mobile/images/order-ic05.png" />
									<view class="order-num" v-if="info.orderStatus.afterSale>0">
										{{info.orderStatus.afterSale}}
									</view>
								</view>
								<view class="order-txt">售后/退款</view>
							</navigator>
						</view>
					</view>
					<!-- 我的订单 -->
					<!-- 实用工具 -->
					<view class="tool">
						<view class="tool-title">
							<view class="tool-tit">实用工具</view>
						</view>
						<view class="tool-items">
							<navigator class="tool-item" :url="'/pages/user/shopowner?m='+info.mobile" animation-type="slide-in-right" v-if="!info.shopkeeper" hover-class="navigator-hover">
								<image class="tool-img" src="http://m.prizemart.cn/mobile/images/gz.png" />
								<view class="tool-txt">成为店主</view>
							</navigator>
							<navigator url="/pages/user/userInfo" animation-type="slide-in-right" class="tool-item" hover-class="navigator-hover">
								<image class="tool-img" src="http://m.prizemart.cn/mobile/images/myperson.png" />
								<view class="tool-txt">个人信息</view>
							</navigator>
							<navigator class="tool-item" url="/pages/user/commentList" animation-type="slide-in-right" hover-class="navigator-hover">
								<image class="tool-img" src="http://image.prizemart.cn/mobile/images/me-ic10.png" />
								<view class="tool-txt">我的评价</view>
							</navigator>
						</view>
					</view>
					<!-- 实用工具 -->
					<!-- 其他工具 -->
					<view class="tool" style="margin-bottom: 30upx;">
						<view class="tool-title">
							<view class="tool-tit">其他工具</view>
						</view>
						<view class="tool-items">
							<navigator class="tool-item" url="/pages/user/couponList" animation-type="slide-in-right" hover-class="navigator-hover">
								<image class="tool-img" src="http://image.prizemart.cn/mobile/images/me-ic03.png" />
								<view class="tool-txt">店铺优惠券</view>
							</navigator>
							<navigator class="tool-item" url="/pages/user/collection" animation-type="slide-in-right" hover-class="navigator-hover">
								<image class="tool-img" src="http://image.prizemart.cn/mobile/images/me-ic04.png" />
								<view class="tool-txt">我的收藏</view>
							</navigator>
							<navigator class="tool-item" url="/pages/user/footprint" animation-type="slide-in-right" hover-class="navigator-hover">
								<image class="tool-img" src="http://image.prizemart.cn/mobile/images/me-ic08.png" />
								<view class="tool-txt">我的足迹</view>
							</navigator>
							<navigator class="tool-item" url="/pages/user/address" animation-type="slide-in-right" hover-class="navigator-hover">
								<image class="tool-img" src="http://image.prizemart.cn/mobile/images/me-ic06.png" />
								<view class="tool-txt">地址管理</view>
							</navigator>
							<navigator class="tool-item" url="/pages/user/school" animation-type="slide-in-right" hover-class="navigator-hover">
								<image class="tool-img" src="http://m.prizemart.cn/mobile/images/me-ic11.png" />
								<view class="tool-txt">店中店学院</view>
							</navigator>
							<navigator class="tool-item" url="/pages/user/afterservice" animation-type="slide-in-right" hover-class="navigator-hover">
								<image class="tool-img" src="http://m.prizemart.cn/mobile/images/me-ic12.png" />
								<view class="tool-txt">客服中心</view>
							</navigator>
							<navigator class="tool-item" url="/pages/user/setting" animation-type="slide-in-right" hover-class="navigator-hover">
								<image class="tool-img" src="http://image.prizemart.cn/mobile/images/me-ic07.png" />
								<view class="tool-txt">系统设置</view>
							</navigator>
						</view>
					</view>
					<!-- 其他工具 -->
				</scroll-view>
			</swiper-item>
			<swiper-item v-if="isShopkeeper">
				<scroll-view class="swipe-it" scroll-y style="height: calc(100vh - 266upx);">
					<!-- 店铺上部信息 -->
					<view class="shop">
						<view class="shop-top">
							<view class="shop-info">
								<image class="shop-info-pic" :src="info.shopkeeper.shop_img" />
								<view class="shop-info-info">
									<view class="shop-info-name">{{info.shopkeeper.shop_name}}</view>
									<navigator class="shop-info-desc" url="/pages/user/shopinfo"  animation-type="slide-in-right">
										{{info.shopkeeper.shop_desc}}
										<image class="shop-info-edit" src="http://image.prizemart.cn/mobile/images/x-edit.png" />
									</navigator>
									<view class="shop-info-fans">粉丝数：{{info.fans}}</view>
								</view>
							</view>
						</view>
						<image class="shop-buttom" src="http://m.prizemart.cn/mobile/images/user-shop-titpic.png" />
						<!-- 店铺收入信息 -->
						<view class="shop-income">
							<view class="shop-income-top">
								<view class="shop-income-month">
									<view class="shop-income-price">{{info.saleDetail.money_next}}</view>
									<view class="shop-income-name">
										本月预计收入
										<image class="shop-income-name-img" src="http://m.prizemart.cn/mobile/images/user-shop-eye.png" />
									</view>
								</view>
								<navigator class="shop-income-detail" url="/pages/user/incomeDetail"  animation-type="slide-in-right" hover-class="none">
									收入详情
								</navigator>
							</view>
							<view class="shop-items">
								<view class="shop-item">
									<view class="shop-item-price">{{info.saleDetail.all_money}}</view>
									<view class="shop-item-txt">本月销售额</view>
								</view>
								<view class="shop-item" @tap="geDeposit">
									<view class="shop-item-price">{{info.promotion}}</view>
									<view class="shop-item-txt">剩余推广费额</view>
								</view>
							</view>
							<view class="shop-statistical">
								<view class="shop-statistical-item">
									<view class="shop-statistical-num">{{info.goodsSaleDetail.hotGoods}}</view>
									正在热卖
								</view>
								<view class="shop-statistical-item">
									<view class="shop-statistical-num">{{info.goodsSaleDetail.soldGoods}}</view>
									已售罄
								</view>
								<view class="shop-statistical-item">
									<view class="shop-statistical-num">{{info.goodsSaleDetail.soonGoods}}</view>
									即将售卖
								</view>
							</view>
						</view>
						<!-- 店铺收入信息 -->
					</view>
					<!-- 店铺上部信息 -->
					<!-- 店铺导航 -->
					<view class="shop-icons">
						<navigator class="shop-icon" url="/pages/classfiy?isGoods=1" animation-type="slide-in-right">
							<image class="shop-icon-pic" src="http://m.prizemart.cn/mobile/images/user-shopnav-pic02.png" lazy-load />
							<view class="shop-icon-txt">商品管理</view>
						</navigator>
						<navigator class="shop-icon" url="/pages/user/userOrder" animation-type="slide-in-right">
							<image class="shop-icon-pic" src="http://m.prizemart.cn/mobile/images/user-shopnav-pic03.png" lazy-load />
							<view class="shop-icon-txt">客户订单</view>
						</navigator>
						<navigator class="shop-icon" url="/pages/user/shopBouns" animation-type="slide-in-right">
							<image class="shop-icon-pic" src="http://m.prizemart.cn/mobile/images/user-shopnav-pic04.png" lazy-load />
							<view class="shop-icon-txt">优惠券</view>
						</navigator>
						<navigator class="shop-icon" url="/pages/user/shopGoodsTop" animation-type="slide-in-right">
							<image class="shop-icon-pic" src="http://m.prizemart.cn/mobile/images/user-shopnav-pic06.png" lazy-load />
							<view class="shop-icon-txt">首页推荐</view>
						</navigator>
						<navigator class="shop-icon" url="/pages/index/index" animation-type="slide-in-right">
							<image class="shop-icon-pic" src="http://m.prizemart.cn/mobile/images/user-shopnav-pic08.png" lazy-load />
							<view class="shop-icon-txt">官网首页</view>
						</navigator>
					</view>
					<!-- 店铺导航 -->
					<!-- 联系方式 -->
					<view class="contact">
						<image class="contact-img" src="http://m.prizemart.cn/mobile/images/user-server.png" lazy-load />
						<view class="contact-phone" @tap="callPhone" data-phone="18126466380">
							价真栈客服电话：
							<view class="phone">18126466380</view>
						</view>
					</view>
					<!-- 联系方式 -->
					<!-- 购买推广费 -->
					<navigator class="seo" url="/pages/user/couponRecharge" animation-type="slide-in-right" hover-class="none" open-type="navigate">
						<image class="seo-image" src="http://m.prizemart.cn/mobile/images/dzd-index-sale01.jpg" lazy-load />
					</navigator>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			curr: Number,
			info: Object,
			isShopkeeper: Boolean
		},
		methods: {
			//跳转到订单
			goOrderList(){
				uni.navigateTo({
					url:"/pages/user/orderList?curr=0",
					animationType:"slide-in-right"
				})
			},
			
			//设置
			setIndex(e) {
				this.$emit("setIndex", e.detail.current)
			},
			//拨打电话
			callPhone(e){
				let phone = e.currentTarget.dataset.phone;
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			//跳转到推广费
			geDeposit(){
				uni.navigateTo({
					url:"/pages/user/mydeposit",
					animationType:"slide-in-right"
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.head {
		width: 750upx;
		height: 400upx;
		position: relative;
		overflow: hidden;
	}

	.head-bgimg {
		width: 750upx;
		height: 400upx;
	}

	.head-info {
		position: absolute;
		width: 750upx;
		height: 400upx;
		display: flex;
		justify-content: center;
		align-content: center;
		left: 0;
		top: 0;
		flex-wrap: wrap;
		z-index: 2;
	}

	.head-image {
		width: 160upx;
		height: 160upx;
		border: #eee 2upx solid;
		border-radius: 50%;
	}

	.head-name {
		width: 100%;
		text-align: center;
		margin-top: 8upx;
		color: #000;
	}

	.head-integral {
		width: 100%;
		text-align: center;
		font-size: 24upx;
	}

	.order {
		background: #fff;
		box-shadow: 0 10upx 10upx #eee;
	}

	.order-title {
		width: 100%;
		height: 88upx;
		padding: 0 30upx;
		display: flex;
		align-items: center;
		border-bottom: #eee 2upx solid;
	}

	.order-tit {
		color: #000;
		font-size: 30upx;
	}

	.order-more {
		margin-left: auto;
		font-size: 24upx;
		color: #999;
	}

	.order-items {
		display: flex;
	}

	.order-item {
		width: 20%;
		padding: 22upx 0;
	}

	.order-pic {
		position: relative;
		width: 54upx;
		height: 46upx;
		margin: auto;
	}

	.order-img {
		width: 54upx;
		height: 46upx;
	}

	.order-txt {
		width: 100%;
		text-align: center;
		margin-top: 12upx;
		font-size: 24upx;
	}

	.order-num {
		width: 32upx;
		height: 32upx;
		position: absolute;
		right: -16upx;
		top: -8upx;
		background: #f23;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		font-size: 20upx;
	}

	.tool {
		width: 720upx;
		background: #fff;
		margin: 24upx auto 0;
		border-radius: 12upx;
		overflow: hidden;
		box-shadow: 0 4upx 10upx 2upx #ddd;
	}

	.tool-title {
		height: 68upx;
		padding: 0 20upx;
		border-bottom: #eee 2upx solid;
		display: flex;
		align-items: center;
	}

	.tool-tit {
		font-size: 30upx;
		font-weight: bold;
	}

	.tool-items {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}

	.tool-item {
		width: 25%;
		padding: 24upx 20upx;
		display: flex;
		align-content: center;
		justify-content: center;
		flex-wrap: wrap;
		box-sizing: border-box;
	}

	.tool-img {
		width: 48upx;
		height: 48upx;
		margin-top: 6upx;
	}

	.tool-txt {
		width: 100%;
		font-size: 24upx;
		text-align: center;
		margin-top: 12upx;
	}

	.shop {
		width: 750upx;
		height: 532upx;
		border-top: #fff 2upx solid;
		position: relative;
		background: #fff;
	}

	.shop-top {
		width: 750upx;
		height: 260upx;
		background: #f23;
	}

	.shop-buttom {
		width: 750upx;
		height: 106upx;
	}

	.shop-info {
		padding: 20upx 58upx;
		display: flex;
		align-items: center;
	}

	.shop-info-pic {
		width: 144upx;
		height: 144upx;
		border: #fff 2upx solid;
		border-radius: 50%;
		margin-left: 12upx;
	}

	.shop-info-info {
		color: #fff;
		font-size: 24upx;
		margin-left: 24upx;
		line-height: 1.5;
	}

	.shop-info-name {
		font-size: 32upx;
		margin-bottom: 6upx;
	}

	.shop-income {
		width: 630upx;
		height: 320upx;
		margin: auto;
		background: #fff;
		border-radius: 12upx;
		box-shadow: 0 0 20upx rgba(0, 0, 0, .15);
		padding: 32upx 40upx;
		position: absolute;
		left: 60upx;
		top: 180upx;
	}

	.shop-income-top {
		display: flex;
	}

	.shop-income-price {
		font-family: arial;
		font-size: 60upx;
		font-weight: bold;
		color: #f5212f;
	}

	.shop-income-name {
		color: #f5212f;
		margin-top: 8upx;
		font-size: 24upx;
		display: flex;
		align-items: center;
	}

	.shop-income-name-img {
		width: 28upx;
		height: 18upx;
		margin-left: 12upx;
	}

	.shop-income-detail {
		margin-left: auto;
		width: 120upx;
		height: 40upx;
		border: #f5212f 2upx solid;
		border-radius: 4upx;
		font-size: 24upx;
		color: #f5212f;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.shop-items {
		margin-top: 20upx;
		display: flex;
	}

	.shop-item {
		width: 50%;
	}

	.shop-item-price {
		font-size: 32upx;
		color: #000;
	}

	.shop-item-txt {
		font-size: 24upx;
		color: #999;
		margin-top: 4upx;
	}

	.shop-statistical {
		font-size: 24upx;
		margin-top: 28upx;
		display: flex;
	}

	.shop-statistical-item {
		width: 33.33%;
		color: #999;
		display: flex;
	}

	.shop-statistical-num {
		color: #f23;
		padding-right: 8upx;
	}

	.shop-icons {
		padding: 0 30upx;
		background: #fff;
		display: flex;
		flex-wrap: wrap;
	}

	.shop-icon {
		padding: 20upx 0;
		width: 25%;
	}

	.shop-icon-pic {
		width: 120upx;
		height: 120upx;
		margin: auto;
		display: block;
	}

	.shop-icon-txt {
		width: 100%;
		text-align: center;
		color: #000;
		margin-top: 12upx;
	}

	.contact-img {
		width: 750upx;
		height: 180upx;
	}

	.contact-phone {
		height: 56upx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.phone {
		color: #f23;
	}

	.seo-image {
		width: 750upx;
		height: 240upx;
	}

	.shop-info-edit {
		width: 28upx;
		height: 28upx;
		margin-left: 12upx;
	}

	.shop-info-desc {
		display: flex;
		align-items: center;
	}
</style>
