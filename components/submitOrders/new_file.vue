<template>
	<view>
		
		<view class="al-container-title">{{shop.shop.shop_name}}</view>
		<view class="al-product-content">
			<view class="al-item" v-for="(item,goodsIndex) in shop.goodsList" :key="goodsIndex">
				<vItem :goods="item"></vItem>
			</view>
		</view>
		<view class="al-bouns-btn" v-if="shop.bonusList.bonus.length > 0" @tap="showCouponList">
			<view class="al-label">优惠券</view>
			<view class="al-bouns-info">
				<view class="al-cont">{{bonusName}}</view>
				<image class="al-point" src="http://m.prizemart.cn/mobile/images/next.png" />
			</view>
		</view>
		<view class="al-bouns-btn" v-if="shop.bonusList.freight.length > 0" @tap="showFreightList">
			<view class="al-label">运费券</view>
			<view class="al-bouns-info">
				<view class="al-cont">{{freightName}}</view>
				<image class="al-point" src="http://m.prizemart.cn/mobile/images/next.png" />
			</view>
		</view>
		<!-- 背景 -->
		<view class="al-bg" :class="couponListShow||freightListShow?'al-show':''" @tap="hideList"></view>
		<!-- 背景 -->
		<!-- 优惠券列表 -->
		<view class="al-list" :class="couponListShow?'al-show':''">
			<view class="al-title">
				选择优惠券
				<image class="al-close" @tap="hideList" src="http://m.prizemart.cn/mobile/images/close.png" />
			</view>
			<view class="al-content">
				<view class="al-tit">
					<view class="al-tit-label">不使用优惠券</view>
					<view class="al-select" @tap="disabled" data-type="0">
						<vSelect :isSelect="bonusIsSelect"></vSelect>
					</view>
				</view>
				<view class="al-cont">
					<scroll-view class="" scroll-y style="height: 600rpx">
						<view class="al-cont-item" v-for="(item, couponIndex) in shop.bonusList.bonus" :key="couponIndex">
							<vBouns :bonus="item" @changStatus="changStatus"></vBouns>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 优惠券列表 -->
		<!-- 运费券列表 -->
		<view class="al-list" :class="freightListShow?'al-show':''">
			<view class="al-title">
				选择运费券
				<image class="al-close" @tap="hideList" src="http://m.prizemart.cn/mobile/images/close.png" />
			</view>
			<view class="al-content">
				<view class="al-tit">
					<view class="al-tit-label">不使用运费券</view>
					<view class="al-select" @tap="disabled" data-type="1">
						<vSelect :isSelect="freightIsSelect"></vSelect>
					</view>
				</view>
				<view class="al-cont">
					<scroll-view class="" scroll-y style="height: 600rpx">
						<view class="al-cont-item" v-for="(item, frigtIndex) in shop.bonusList.freight" :key="frigtIndex">
							<vBouns :bonus="item" @changStatus="changStatus"></vBouns>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 运费券列表 -->
		
		
		
		
	</view>
</template>

<script>
</script>

<style>
</style>
