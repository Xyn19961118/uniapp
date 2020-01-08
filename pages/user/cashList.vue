<template>
	<!-- 提取现金列表 -->
	<view>
		<view class="container">
			<view class="withdraw-item" v-for="(item, index) in list" :key="index">
				<view class="withdraw-it">
					<view class="withdarw-it-label">申请状态：</view>
					<view class="withdarw-it-content">{{item.status}}</view>
					<view class="withdarw-it-label">提现金额：</view>
					<view class="withdarw-it-content">{{item.money}}元</view>
				</view>
				<view class="withdraw-it">
					<view class="withdarw-it-label">发卡行/类型：</view>
					<view class="withdarw-it-content">{{item.bank_name}}</view>
				</view>
				<view class="withdraw-it">
					<view class="withdarw-it-label">提现卡号：</view>
					<view class="withdarw-it-content">{{item.bank_num}}</view>
				</view>
				<view class="withdraw-it">
					<view class="withdarw-it-label">提现时间：</view>
					<view class="withdarw-it-content">{{item.add_time }}</view>
				</view>
				<view class="withdraw-it">
					<view class="withdarw-it-label">打款凭证：</view>
					<view class="withdarw-it-content">
						<image class="withdarw-it-pic" :src="item.remit_info.is_upload" lazy-load bind:tap="lookBig" :data-src="item.remit_info.is_upload" />
					</view>
				</view>
			</view>
		</view>
		<view v-if="list.length == 0" class="list-none">暂未任何提现记录</view>
	</view>
</template>

<script>
	import {
		UserModel
	} from "@/model/userModels";
	const UserModels = new UserModel();
	export default {
		data() {
			return {
				list: [],
				page: 1
			};
		},
		onLoad: function(options) {
			let page = this.page;
			UserModels.applyIncome(res => {
				page++;
				this.list = res;
				this.page = page;
			}, 1, 20)
		},
		onReachBottom: function() {
			uni.showLoading({
				title: "正在加载中",
				mask: true,
				success: (result) => {
					let {
						page,
						list
					} = this;
					let _this = this;
					UserModels.applyIncome(res => {
						page++;
						list.push(res);
						_this.list = list;
						_this.page = page;
						uni.hideLoading();
					}, page, 20)
				}
			});

		},
		methods: {
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
	page {
		background: #fff;
	}

	.container {
		padding: 20rpx 30rpx;
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

	.list-none {
		text-align: center;
		margin-top: 80rpx;
	}
</style>
