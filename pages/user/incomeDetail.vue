<template>
	<!-- 收入详情 -->
	<view class="container">
		<view class="items">
			<view class="item">
				<view class="label">本月预期收入：</view>
				<view class="price">
					￥{{dataObj.money_next}}
				</view>
				<navigator class="income-fee" url="/pages/user/incomeinfo"  animation-type="slide-in-right" hover-class="none">
					收支明细
				</navigator>
			</view>
			<view class="item">
				<view class="label">本月销售额：</view>
				<view class="price price-right">
					￥{{dataObj.sell_all_money}}
				</view>
			</view>
			<view class="item">
				<view class="label">已结算未提现：</view>
				<view class="price price-right">
					￥{{dataObj.all_left}}
				</view>
			</view>
			<view class="item">
				<view class="label">已提现总额：</view>
				<view class="price price-right">
					￥{{dataObj.have_income}}
				</view>
			</view>
			<view class="item">
				<view class="label">销售总额：</view>
				<view class="price price-right">
					￥{{dataObj.sell_all}}
				</view>
			</view>
		</view>

		<view class="cont">
			<view class="cont-top">
				<image class="cont-icon" src="http://image.prizemart.cn/mobile/images/detail-ic02.png" />
				<view class="cont-top-label">本月收入详情：</view>
				<view class="cont-top-price">￥{{dataObj.money_next}}</view>
				<view class="income-fee" @tap="checkMoney">
					申请提现
				</view>
			</view>

			<view class="cont-items">
				<view class="cont-item">
					<view class="cont-label">佣金
						<image class="cont-tips" src="http://m.prizemart.cn/mobile/images/wenred02.png" />
					</view>
					<view class="cont-price">￥{{dataObj.commission_money}}</view>
				</view>
				<view class="cont-item">
					<view class="cont-label">差价
						<image class="cont-tips" src="http://m.prizemart.cn/mobile/images/wenred02.png" />
					</view>
					<view class="cont-price">￥{{dataObj.markup_money}}</view>
				</view>
			</view>

			<view class="cont-items">
				<view class="cont-item">
					<view class="cont-label">返利
						<image class="cont-tips" src="http://m.prizemart.cn/mobile/images/wenred02.png" />
					</view>
					<view class="cont-price">￥{{dataObj.order_amount_rate}}</view>
					<view class="cont-bl">(返利比{{dataObj.order_amount_rate2}}%)</view>
				</view>
				<view class="cont-item">
					<view class="cont-label">本月预期收入</view>
					<view class="cont-price">￥{{dataObj.money_next}}</view>
				</view>
			</view>

		</view>

		<view class="point">
			<view>温馨提示:系统于10号前核对店主上月收益，店主您在15日前提交的申请，将于22日将收益转入您的收款账户，请注意查收(节假日顺延)</view>
			<view>如4月10号核算3月份收益，请店主在4月15日前提交申请</view>
		</view>

		<view class="withdraw">
			<view class="withdraw-title">
				<view class="withdraw-tit">提现记录</view>
				<navigator class="withdraw-more" url="/pages/user/cashList"  animation-type="slide-in-right" hover-class="none">
					查看更多提现记录 >
				</navigator>
			</view>
			<view class="withdraw-content" v-if="apply.length > 0">
				<view class="withdraw-item">
					<view class="withdraw-it">
						<view class="withdarw-it-label">申请状态：</view>
						<view class="withdarw-it-content">{{apply[0].status}}</view>
						<view class="withdarw-it-label">提现金额：</view>
						<view class="withdarw-it-content">{{apply[0].money}}元</view>
					</view>
					<view class="withdraw-it">
						<view class="withdarw-it-label">发卡行/类型：</view>
						<view class="withdarw-it-content">{{apply[0].bank_name}}</view>
					</view>
					<view class="withdraw-it">
						<view class="withdarw-it-label">提现卡号：</view>
						<view class="withdarw-it-content">{{apply[0].bank_num}}</view>
					</view>
					<view class="withdraw-it">
						<view class="withdarw-it-label">提现时间：</view>
						<view class="withdarw-it-content">{{apply[0].add_time}}</view>
					</view>
					<view class="withdraw-it">
						<view class="withdarw-it-label">打款凭证：</view>
						<view class="withdarw-it-content">
							<image class="withdarw-it-pic" :src="apply[0].remit_info.is_upload" lazy-load @tap="lookBig" :data-src="apply[0].remit_info.is_upload" />
						</view>
					</view>
				</view>
			</view>
			<view class="withdraw-no" v-if="apply.length == 0">暂无提现记录</view>
		</view>
	</view>
</template>

<script>
	import {
		UserModel
	} from '@/model/userModels';
	const UserModels = new UserModel();
	export default {
		data() {
			return {
				dataObj: {},
				apply: []
			};
		},
		onLoad() {
			UserModels.getInfo((res) => {
				this.dataObj = res.saleDetail;
				console.log(res)
				// this.setData({
				// 	...res.saleDetail
				// })
			})
			UserModels.applyIncome((res) => {
				this.apply = res
			}, 1, 1)
		},
		methods: {
			checkMoney() {
				UserModels.userExtract((res) => {
					if (res.error != 0) {
						uni.showToast({
							title: res.errmsg,
							icon: 'none',
							duration: 1500,
						});
					} else {
						uni.setStorageSync('userExtract', res.info);
						uni.navigateTo({
							url: `/pages/user/userExtract?money=${res.money}`,
							animationType:"slide-in-right"
						});
					}
				})
			},
			//查看打款大图
			lookBig(e) {
				uni.previewImage({
					urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		background: #fff;
		padding: 20rpx 30rpx;
		display: flex;
		border-bottom: #ededed 2rpx solid;
	}

	.price {
		color: #f23;
	}

	.price-right {
		margin-left: auto;
	}

	.income-fee {
		width: 140rpx;
		height: 40rpx;
		border: #f23 2rpx solid;
		border-radius: 8rpx;
		text-align: center;
		line-height: 40rpx;
		color: #f23;
		margin-left: auto;
		font-size: 24rpx;
	}

	.cont {
		background: #fff;
		margin-top: 20rpx;
	}

	.cont-top {
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		border-bottom: #ededed 2rpx solid;
	}

	.cont-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.cont-top-label {
		color: #000;
		margin-left: 8rpx;
	}

	.cont-top-price {
		color: #f23;
		font-weight: bold;
		font-size: 32rpx;
	}

	.cont-items {
		border-bottom: #ededed 2rpx solid;
		padding: 30rpx 0;
		display: flex;
	}

	.cont-item {
		width: 50%;
		text-align: center;
		position: relative;
		border-right: #ddd 2rpx solid;
	}

	.cont-label {
		color: #999;
		position: relative;
	}

	.cont-price {
		margin-top: 8rpx;
		color: #f23;
		font-size: 32rpx;
		font-weight: bold;
	}

	.cont-tips {
		width: 32rpx;
		height: 32rpx;
		margin-left: 12rpx;
		position: absolute;
		right: 100rpx;
		top: 4rpx;
	}

	.cont-bl {
		font-size: 24rpx;
		font-weight: bold;
		margin-top: 4rpx;
	}

	.point {
		margin-top: 20rpx;
		padding: 20rpx 30rpx;
		background: #fff;
		font-size: 24rpx;
		line-height: 40rpx;
	}

	.withdraw {
		background: #fff;
		margin-top: 20rpx;
	}

	.withdraw-title {
		display: flex;
		padding: 20rpx 30rpx;
		border-bottom: #ededed 2rpx solid;
	}

	.withdraw-tit {
		color: #000;
	}

	.withdraw-more {
		margin-left: auto;
		font-size: 24rpx;
		color: #f23;
	}

	.withdraw-content {
		padding: 20rpx;
	}

	.withdraw-no {
		display: flex;
		justify-content: center;
		padding: 80rpx 0;
	}

	.withdraw-item {
		padding: 20rpx;
		border: #ededed 2rpx solid;
		margin-bottom: 20rpx;
	}

	.withdraw-it {
		display: flex;
		align-items: center;
		line-height: 44rpx;
		font-size: 24rpx;
	}

	.withdarw-it-label {
		color: #999;
	}

	.withdarw-it-content {
		margin-right: 40rpx;
	}

	.withdarw-it-pic {
		width: 240rpx;
		height: 100rpx;
	}
</style>
