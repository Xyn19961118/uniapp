<template>
	<!-- 客户列表 -->
	<view class="container">
		<view class="client">
			<view class="label">客户数</view>
			<view class="client-number">{{dataObj.userTotal}}</view>
		</view>
		<view class="list">
			<view class="item" v-for="item in dataObj.data" :key="item.user_id">
				<view class="pic">
					<image class="pic-img" :src="item.headimg" lazy-load />
				</view>
				<view class="info">
					<view class="info-name">{{item.user_name}}</view>
					<view class="info-mobile">({{item.mobile_phone}})</view>
					<view class="info-time">{{item.reg_time}}</view>
				</view>
				<view class="oth">
					<view class="price">￥{{item.commission}}</view>
					<view class="price-label">贡献收益</view>
				</view>
			</view>
		</view>
		<view class="links">
			<view class="link active">客户列表</view>
			<navigator class="link" url="/pages/user/userOrder" hover-class="none">客户订单</navigator>
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
				dataObj: {}
			};
		},
		onLoad() {
			uni.showLoading({
				title: "加载数据中...",
				mask: true
			})
			UserModels.myUser((res) => {
				if (res) {
					res.data.forEach(item => {
						if (item.mobile_phone !== "未绑定") {
							item.mobile_phone = item.mobile_phone.substr(0, 3) + "****" + item.mobile_phone.substr(7);
						}
					})
					this.dataObj = res;
					uni.hideLoading();
				}
			})
		},
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 80rpx;
		padding-top: 80rpx;
	}

	.links {
		width: 100%;
		height: 80rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2;
		background: #fff;
		display: flex;
		border-top: #ddd 2rpx solid;
	}

	.link {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #f23;
	}

	.active {
		background: #f23;
		color: #fff;
	}

	.client {
		display: flex;
		height: 80rpx;
		border-bottom: #ddd 2rpx solid;
		background: #fff;
		padding: 20rpx 30px;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 2;
		width: 100%;
		color: #000;
	}

	.client-number {
		margin-left: auto;
	}

	.list {
		margin-top: 20rpx;
	}

	.item {
		margin-bottom: 20rpx;
		background: #fff;
		padding: 20rpx 30rpx;
		display: flex;
	}

	.pic {
		width: 132rpx;
		height: 132rpx;
		border: #eee 2rpx solid;
		margin-right: 20rpx;
	}

	.pic-img {
		width: 132rpx;
		height: 132rpx;
	}

	.info-name {
		color: #000;
	}

	.info-mobile {
		font-size: 24rpx;
		color: #999;
		margin-top: 8rpx;
	}

	.info-time {
		font-size: 24rpx;
		color: #999;
		margin-top: 8rpx;
	}

	.oth {
		margin-left: auto;
		text-align: center;
	}

	.price {
		color: #f23;
	}

	.price-label {
		font-size: 24rpx;
		margin-top: 8rpx;
	}
</style>
