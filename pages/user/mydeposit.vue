<template>
	<!-- 我的推广费 -->
	<view class="container">
		<view class="top">
			<view class="top-content">
				<view class="top-txt">总计</view>
				<view class="top-price">￥{{data.res}}</view>
			</view>
		</view>
		<view class="prices">
			<view class="price">
				<view class="price-txt">0.01元推广费</view>
				<view class="price-money">￥{{data.web_bonus_val}}</view>
			</view>
			<view class="price">
				<view class="price-txt">自定义充值金额</view>
				<view class="price-money">￥{{data.shop_bonus_val}}</view>
			</view>
		</view>
		<view class="oths">
			<view class="nav">
				<vNav :curr="curr" :navList="navList" @setCurr="navSetCurr"></vNav>
			</view>
			<view class="content">
				<swiper class="" :current="curr" @change="setCurr" style="height: calc(100vh - 526rpx)">
					<swiper-item>
						<scroll-view class="" scroll-y style="height: calc(100vh - 526rpx)">
							<view class="item" v-for="(item, index) in data.info" :key="index">
								<vItem :items="item" :curr="1"></vItem>
							</view>
							<view class="list-no" v-if="data.info.length == 0">
								您暂未该类明细
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view class="" scroll-y style="height: calc(100vh - 526rpx)">
							<view class="item" v-for="(item, index) in data.shop_money" :key="index">
								<vItem :isLess="true" :items="item" :curr="2"></vItem>
							</view>
							<view class="list-no" v-if="data.shop_money.length == 0">
								您暂未该类明细
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view class="" scroll-y style="height: calc(100vh - 526rpx)">
							<view class="item" v-for="(item, index) in data.recovery_bonus" :key="index">
								<vItem :items="item" :curr="3"></vItem>
							</view>
							<view class="list-no" v-if="data.recovery_bonus.length == 0">
								您暂未该类明细
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		UserModel
	} from "@/model/userModels";
	const UserModels = new UserModel();

	import vNav from "@/components/user/common/nav.vue";
	import vItem from "@/components/user/myDeposit/item.vue";
	export default {
		components: {
			vNav,
			vItem
		},
		data() {
			return {
				navList: ["充值明细", "消费明细", "回收明细"],
				curr: 0,
				data: {}
			};
		},
		onLoad: function(options) {
			UserModels.myDeposit((res) => {
				console.log(res)
				this.data = res
			})
		},
		methods: {
			setCurr(e) {
				let curr = e.detail.current;
				this.curr = curr
			},
			navSetCurr(e) {
				let curr = e;
				this.curr = curr
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* pages/user/mydeposit/mydeposit.wxss */
	.top {
		width: 100%;
		height: 280rpx;
		background: #4e4e4e;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-content {
		width: 320rpx;
		height: 160rpx;
		border-radius: 320rpx 320rpx 0 0;
		border-top: rgb(9, 186, 7) 8rpx solid;
		border-left: rgb(9, 186, 7) 8rpx solid;
		border-right: rgb(9, 186, 7) 8rpx solid;
		display: flex;
		align-content: center;
		justify-content: center;
		flex-wrap: wrap;
	}

	.top-txt {
		margin-top: 36rpx;
		color: #999;
	}

	.top-price {
		width: 100%;
		text-align: center;
		color: #fff;
		font-size: 36rpx;
		margin-top: 8rpx;
	}

	.prices {
		padding: 20rpx 0;
		background: #fff;
		display: flex;
		align-items: center;
	}

	.price {
		width: 50%;
		text-align: center;
		border-right: #eee 2rpx solid;
		padding: 12rpx 0;
	}

	.price-txt {
		font-size: 24rpx;
		margin-bottom: 8rpx;
	}

	.price-money {
		font-size: 32rpx;
		color: #f23;
	}

	.oths {
		margin-top: 20rpx;
	}

	.content {
		background: #fff;
		width: 100%;
	}

	.item {
		border-bottom: #ddd 2rpx solid;
	}

	.list-no {
		text-align: center;
		padding: 100rpx 0;
	}
</style>
