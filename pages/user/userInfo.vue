<!-- 用户信息 -->
<template>
	<view class="container">
		<view class="blank"></view>
		<view class="item">
			<view class="label">我的头像</view>
			<view class="right">
				<image class="pic" :src="dataObj.headimg || headPic" />
			</view>
		</view>
		<view class="blank"></view>
		<view class="item">
			<view class="label">我的昵称</view>
			<view class="right">
				{{dataObj.user_name}}
			</view>
		</view>
		<view class="item">
			<view class="label">店主注册日期</view>
			<view class="right">
				{{dataObj.shopkeeper.add_time}}
			</view>
		</view>
		<view class="item">
			<view class="label">我的手机号</view>
			<view class="right">
				{{dataObj.mobile_phone}}
			</view>
		</view>

		<!-- <view class="button">保存个人信息</view> -->
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
				headPic: "http://m.prizemart.cn/mobile/images/prizemart.jpg",
				dataObj: {}
			};
		},
		onLoad: function(options) {
			UserModels.userInfo((res) => {
				this.dataObj=res
			})
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background: #fff;
	}

	.blank {
		width: 100%;
		height: 20rpx;
		background: #f8f8f8;
	}

	.item {
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		border-bottom: #eee 2rpx solid;
	}

	.label {
		color: #999;
	}

	.right {
		margin-left: auto;
	}

	.pic {
		width: 80rpx;
		height: 80rpx;
		border: #eee 2rpx solid;
		border-radius: 50%;
	}

	.input {
		text-align: right;
	}

	.button {
		position: fixed;
		left: 0;
		bottom: 0;
		background: #f23;
		color: #fff;
		z-index: 2;
		text-align: center;
		line-height: 80rpx;
		width: 10
		}
</style>
