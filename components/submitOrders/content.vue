<template>
	<!-- 提交订单产品列表 -->
	<view class="al-container">
		<view class="al-container-title">{{shop.shop.shop_name}}</view>
		<view class="al-product-content">
			<view class="al-item" v-for="(item,goodsIndex) in shop.goodsList" :key="goodsIndex">
				<vItem :goods="item"></vItem>
			</view>
		</view>
		<view class="al-bouns-btn" v-if="shop.bonusList.length > 0" @tap="showCouponList">
			<view class="al-label">优惠券</view>
			<view class="al-bouns-info">
				<view class="al-cont">{{bonusName}}</view>
				<image class="al-point" src="http://m.prizemart.cn/mobile/images/next.png" />
			</view>
		</view>
		<view class="al-bouns-btn" v-if="shop.bonusList.length > 0" @tap="showFreightList">
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
	import vSelect from "@/components/common/select.vue";
	import vBouns from "./bouns.vue";
	import vItem from "./item.vue";
	export default {
		props: {
			shop: Object
		},
		components: {
			vSelect,
			vBouns,
			vItem
		},
		created() {
			// console.log(this.shop)
		},
		data() {
			return {
				couponListShow: false, //选择优惠券是否显示
				freightListShow: false, //选择运费券是否显示
				bonusIsSelect: 1,
				freightIsSelect: 1,
				bonusName: '有可用优惠券',
				freightName: '有可用运费券'
			}
		},
		methods: {
			//显示优惠券
			showCouponList() {
				this.couponListShow = true;
			},
			//显示运费券
			showFreightList() {
				this.freightListShow = true;
			},
			//隐藏运费券和优惠券列表
			hideList() {
				this.freightListShow = false;
				this.couponListShow = false;
			},
			changStatus(e) {
				if (e.detail.type == 1) {
					this.freightName = e.detail.name;
					this.freightIsSelect = 0;
				} else {
					this.bonusName = e.detail.name;
					this.bonusIsSelect = 0;
				}
				this.$emit('changStatus', e.detail)
			},


			disabled(e) {
				let val = e.currentTarget.dataset
				if (val.type == 1) {
					this.freightName = '有可用运费券';
					this.freightIsSelect = 1;
				} else {
					this.bonusName = "有可用优惠券";
					this.bonusIsSelect = true;
				}
				this.$emit('disabled', val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.al-container {
		background: #fff;
	}

	.al-container-title {
		line-height: 68rpx;
		border-bottom: #eee 2rpx solid;
		padding: 0 30rpx;
		color: #333;
		font-size: 26rpx;
	}

	.al-item {
		border-bottom: #eee 2rpx solid;
	}

	.al-bouns-btn {
		padding: 0 30rpx;
		line-height: 80rpx;
		display: flex;
		font-size: 24rpx;
		border-bottom: #eee 2rpx solid;
	}

	.al-bouns-info {
		margin-left: auto;
		display: flex;
		align-items: center;
	}

	.al-cont {
		margin-right: 18rpx;
		color: #f23;
	}

	.al-point {
		width: 12rpx;
		height: 24rpx;
	}

	.al-bg {
		background: rgba(0, 0, 0, .4);
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		display: none
	}

	.al-bg.al-show {
		display: block;
	}

	.al-list {
		position: fixed;
		width: 100%;
		background: #fff;
		bottom: 0;
		left: 0;
		z-index: 3;
		border-top-left-radius: 8rpx;
		border-top-right-radius: 8rpx;
		height: 0;
		transition: .3s;
		-webkit-transition: .3s;
	}

	.al-list.al-show {
		height: 800rpx;
	}

	.al-title {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		position: relative;
		border-bottom: #eee 2rpx solid;
	}

	.al-close {
		width: 44rpx;
		height: 44rpx;
		position: absolute;
		right: 30rpx;
		top: 16rpx;
	}

	.al-content {
		padding: 20rpx 30rpx;
	}

	.al-tit {
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
	}

	.al-select {
		width: 36rpx;
		height: 36rpx;
		margin-left: auto;
	}

	.al-cont-item {
		border: #eee 2rpx solid;
		width: 100%;
		height: 120rpx;
		margin-top: 20rpx;
		display: flex;
	}
</style>
