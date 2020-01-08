<template>
	<!-- 店铺优惠券列表 -->
	<view class="container">
		<view class="nav">
			<vNav :navList="navList" :curr="curr" @setCurr="setCurr"></vNav>
		</view>
		<view class="content">
			<vContent :curr="curr" :dataObj="dataObj" @setCurr="setCurr"></vContent>
		</view>
		<navigator class="make-bouns" url="/pages/user/setBouns/setBouns" hover-class="hover">
			制作运费券
		</navigator>

		<text class="btn" @tap="oneShopBonus">一键\n回收</text>
	</view>
</template>

<script>
	import {
		UserModel
	} from "@/model/userModels";
	const UserModels = new UserModel();

	import vNav from "@/components/user/common/nav.vue";
	import vContent from "@/components/user/shopBouns/content.vue";
	export default {
		components: {
			vNav,
			vContent
		},
		data() {
			return {
				navList: ["优惠券", "运费券"],
				curr: 0,
				dataObj: {}
			};
		},
		onLoad() {
			UserModels.getUserBouns(res => {
				this.dataObj = res
			})
		},
		methods: {
			setCurr(e) {
				this.curr = e;
			},
			//一键处理过期优惠券
			oneShopBonus(e) {
				uni.showModal({
					title: "提示",
					content: "确认一键回收过期优惠券？",
					success(res) {
						if (res.confirm) {
							UserModels.retrieveShopBonus(res => {
								uni.showToast({
									title: "回收成功",
									icon: "none"
								})
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-top: 80rpx;
		padding-bottom: 90rpx;
	}

	.nav {
		position: fixed;
		width: 100%;
		height: 80rpx;
		left: 0;
		top: 0;
		z-index: 2;
	}

	.make-bouns {
		position: fixed;
		z-index: 2;
		width: 100%;
		height: 90rpx;
		background: #f23;
		color: #fff;
		left: 0;
		bottom: 0;
		text-align: center;
		line-height: 90rpx;
		font-size: 32rpx;

	}

	.make-bouns.hover {
		background: #e11827;
		transition: .3s;
	}

	.btn {
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		display: flex;
		flex-wrap: wrap;
		border-radius: 50%;
		background: #f23;
		right: 20rpx;
		bottom: 160rpx;
		font-size: 24rpx;
		position: fixed;
		z-index: 10;
		color: #fff;
		align-items: center;
		justify-content: center;
	}
</style>
