<!-- 申请开店 -->
<template>
	<view class="container">
		<view class="top">
			<image class="top-image" src="http://image.prizemart.cn/mobile/images/header-logo.png" />
			<view class="top-text">
				无需进货、囤货、发货、售后，自己或者推荐
			</view>
			<view class="top-text">
				他人购物都有收益。
			</view>
		</view>

		<view class="content">
			<view class="item">
				<view class="label">店铺名</view>
				<view class="cont">
					<input type="text" class="cont-input" placeholder="请输入店铺名" focus placeholder-style="color:#999;" @input="setShoppwner"
					 maxlength="6" :value="shopname" />
				</view>
			</view>
			<view class="item">
				<view class="label">手机号</view>
				<view class="cont">
					{{mobile}}
				</view>
			</view>
		</view>

		<view class="oth">
			<view class="select" @tap="setSelect">
				<vSelect :isSelect="isSelect"></vSelect>
			</view>
			<view class="select-txt">同意<view class="select-link" @tap="showProtocol">《价真栈商城以及代理商电子商务服务协议》</view>
			</view>
		</view>

		<view class="submit" :class="isSelect?'':'disable'" @tap="submit">提交</view>

		<view class="protocol" :class="protocolShow?'show':''">
			<view class="protocol-title">价真栈商城一级代理店电子商务服务使用协议</view>
			<scroll-view class="" scroll-y style="height:calc(100vh - 200rpx)">
				<rich-text class="protocol-content" :nodes="content">

				</rich-text>
			</scroll-view>

			<view class="protocol-sub" @tap="subProtocol">确定</view>
		</view>

	</view>

</template>

<script>
	import {
		config
	} from "@/utils/config.js";
	import {
		UserModel
	} from '@/model/userModels';
	const UserModels = new UserModel();
	
	import vSelect from "@/components/common/select.vue";
	export default {
		components:{
			vSelect
		},
		data() {
			return {
				isSelect: 1,
				shopname: '',
				mobile: '',
				protocolShow: false,
				checkName: '',
				content: "<b>重要须知：</b>"
			};
		},
		onLoad(options) {
			console.log(options.m)
			if (!options.m) {
				uni.showModal({
					title: '提示',
					content: '需要绑定手机号',
					success: (res) => {
						if (res.confirm) {
							console.log(res)
						} else {
							uni.navigateBack({
								delta: 1
							});
						}
					}
				});

			}
			this.mobile = options.m;
			this.checkName = config.checkName;
		},
		methods: {
			//店铺名称
			setShoppwner(e) {
				let shopname = e.detail.value;
				let checkName = this.checkName
				let arr = checkName.split(',')
				if (arr.includes(shopname)) {
					uni.showToast({
						title: '名称存在敏感词',
						icon: 'none',
						duration: 1500,
						mask: false,
						success: (res) => {
							this.shopname = ''
						}
					});
				} else {
					this.shopname = shopname
				}

			},
			//显示协议
			showProtocol(e) {
				this.protocolShow = true;
			},

			//确定协议
			subProtocol(e) {
				this.protocolShow = false;
			},
			//是否同意协议
			setSelect(e) {
				let isSelect = this.isSelect;
				if(isSelect == 0){
					this.isSelect = 1
				}else {
					this.isSelect = 0
				}
			},
			//提交
			submit(e) {
				let {
					shopname,
					isSelect
				} = this;
				if (shopname == "") {
					uni.showToast({
						title: "请填写店铺名称",
						icon: "none"
					})
					return false;
				}

				if (isSelect == 0) {
					uni.showToast({
						title: "请先同意协议",
						icon: "none"
					})
					return false;
				}
				UserModels.shopOwner(shopname, (res) => {
					if (!res.error) {
						uni.navigateTo({
							url: `/pages/shop/index?id=${res.id}`,
						});
					} else {
						uni.showToast({
							title: res.errmsg,
							icon: "none"
						})
					}
				})
				console.log("提交")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		padding: 40rpx 0;
		background: #fff;
	}

	.top-image {
		display: block;
		width: 376rpx;
		height: 52rpx;
		margin: 0 auto 20rpx;
	}

	.top-text {
		text-align: center;
		font-size: 24rpx;
		line-height: 36rpx;
	}

	.content {
		padding: 0 40rpx;
		background: #fff;
		margin-top: 30rpx;
	}

	.item {
		display: flex;
		align-items: center;
		border-bottom: #eee 2rpx solid;
		padding: 28rpx 0;
	}

	.cont {
		margin-left: auto;
	}

	.cont-input {
		text-align: right;
	}

	.oth {
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.select {
		width: 30rpx;
		height: 30rpx;
		margin-right: 8rpx;
	}

	.select-txt {
		display: flex;
	}

	.select-link {
		color: #000;
	}

	.submit {
		width: 690rpx;
		height: 80rpx;
		margin: 80rpx auto 0;
		background: #f23;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
		border-radius: 8rpx;
	}

	.disable {
		opacity: .6;
	}

	.protocol {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 4;
		padding: 20rpx 30rpx 140rpx 30rpx;
		display: none;
	}

	.protocol.show {
		display: block;
	}

	.protocol-title {
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 20rpx;
		color: #333;
	}

	.protocol-sub {
		width: 240rpx;
		height: 68rpx;
		border: #ddd 2rpx solid;
		text-align: center;
		line-height: 68rpx;
		border-radius: 8rpx;
		margin: 26rpx auto;
	}
</style>
