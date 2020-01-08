<template>
	<!-- 客服中心 -->
	<view class="container">
		<view class="content">
			<view class="top">
				<image class="top-pic" src="http://m.prizemart.cn/mobile/images/prizemart.jpg" />
				<view class="top-info">
					<view class="top-txt">价真栈官方联系方式</view>
					<view class="top-ts">如您有任何问题，可联系价真栈客服</view>
				</view>
			</view>
			<view class="items">
				<view class="item">
					<image class="pic" src="http://m.prizemart.cn/mobile/images/custom-icon01.png" />
					<view class="txt">价真栈客服电话</view>
					<view class="right red" data-phone="0755-25857223" @tap="callPhone">0755-25857223</view>
				</view>

				<view class="item">
					<image class="pic" src="http://m.prizemart.cn/mobile/images/custom-icon01.png" />
					<view class="txt">价真栈业务咨询</view>
					<view class="right red" data-phone="18126466381" @tap="callPhone">18126466381</view>
				</view>

				<view class="item">
					<image class="pic" src="http://m.prizemart.cn/mobile/images/custom-icon02.png" />
					<view class="txt">价真栈微信客服</view>
					<view class="right" @tap="setClipboardData">hk-PMS</view>
				</view>

				<view class="item">
					<image class="pic" src="http://m.prizemart.cn/mobile/images/custom-icon03.png" />
					<view class="txt">价真栈微信客服</view>
					<view class="right">
						<image class="wechat-code" src="http://m.prizemart.cn/mobile/images/dzwx.png" data-src="http://m.prizemart.cn/mobile/images/dzwx.png"
						 @tap="previewImage" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			//拨打电话
			callPhone(e) {
				let phone = e.currentTarget.dataset.phone;
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},

			//放大图片
			previewImage(e) {
				let src = e.currentTarget.dataset.src;
				let urls = [];
				urls.push(src);
				uni.previewImage({
					current: src, // 当前显示图片的http链接
					urls
				})
			},
			//设置到剪切板
			setClipboardData(e) {
				uni.setClipboardData({
					data: 'hk-PMS',
					success: function() {
						uni.showToast({
							title:"已复制到剪切板"
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 700rpx;
		height: auto;
		background: #f7f7f7;
		border-radius: 16rpx;
		overflow: hidden;
		margin: 30rpx auto 0;
	}

	.top {
		padding: 30rpx;
		background: #ebebeb;
		display: flex;
		align-items: center;
	}

	.top-pic {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.top-txt {
		color: #000;
	}

	.top-ts {
		font-size: 24rpx;
		color: #999;
		margin-top: 4rpx;
	}

	.items {
		padding: 0 30rpx;
	}

	.item {
		padding: 20rpx 0;
		line-height: 48rpx;
		border-bottom: #eee 2rpx solid;
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.pic {
		width: 48rpx;
		height: 48rpx;
		margin-right: 12rpx;
	}

	.right {
		margin-left: auto;
	}

	.red {
		color: #f23;
	}

	.wechat-code {
		width: 160rpx;
		height: 160rpx;
	}
</style>
