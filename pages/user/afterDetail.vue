<template>
	<!-- 售后详情 -->
	<view class="container">
		<view class="top">
			<view class="top-title">问题描述</view>
			<view class="top-content">{{dataObj.refund_desc}}</view>
			<view class="imgs">
				<image class="img" v-for="(item, index) in imgsUrl" :key="index" :src="item" />
			</view>
		</view>
		<view class="content">
			<view class="top-title">审核进度</view>
			<view class="content-content">
				<view class="logistics" v-if="dataObj.reply.length > 0">
					<view class="logistics-content">
						<view class="item" v-for="(item, index) in dataObj.reply" :key="index">
							<view class="icon"></view>
							<view class="item-content">{{item.message}}</view>
							<view class="time">{{item.add_time}}</view>
						</view>
					</view>
				</view>
				<view class="is-empty" wx:else>等待商家审核</view>
			</view>
		</view>
		<view class="bottom">
			<view class="top-title">审核留言</view>
			<view class="top-content">
				尊敬的用户，您好！感谢您对价真栈商城的支持！根据您的情况，我们会查看您的商品详细情况。您也可以拨打0755-2290 1037查询详情。
			</view>
		</view>
		<view class="replay-btn">
			<view class="replat-bt" @tap="showReplayHandle">回复价真栈商城留言~</view>
		</view>
		<view class="bg" v-if="showReplay" @tap="hideReplay"></view>
		<view class="replay" :class="showReplay?'show':''" v-if="showReplay">
			<view class="replay-title">
				<view class="replay-cancel" @tap="hideReplay">取消</view>
				<view class="replay-submit" @tap="replaySubmit">确定</view>
			</view>
			<view class="replay-content">
				<textarea class="replay-textarea" placeholder="回复价真栈商城留言~" placeholder-style="color:#999" @input="isReplay"></textarea>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		UserModel
	} from "@/model/userModels";
	import {
		AfterModel
	} from "@/model/AfterModel";
	const userModel = new UserModel();
	const AfterModels = new AfterModel();

	export default {
		data() {
			return {
				dataObj: {},
				showReplay: false, //控制留言框显示
				replayVal: "", //留言框value
				imgsUrl: []
			};
		},
		onLoad: function(e) {
			let id = e.id;
			uni.showLoading({
				title: "数据加载中..."
			})
			userModel.afterDetail(id, (res) => {
				let imgsUrl = this.imgsUrl;
				let imgs = res.imgs;
				if (imgs instanceof Array) {
					imgs.forEach(item => {
						item = item.replace('"', '').replace(/[\\]/g, '');
						imgsUrl.push(item)
					})
				}
				this.dataObj = res;
				this.imgsUrl = imgsUrl
				uni.hideLoading()
			})

		},

		methods: {
			//留言显示
			showReplayHandle(e) {
				this.showReplay = true

			},
			//留言隐藏
			hideReplay() {
				this.showReplay = false
			},

			//设置留言框textarea的value
			isReplay(e) {
				let replayVal = e.detail.value;
				this.replayVal = replayVal;

			},
			//留言确定
			replaySubmit(e) {
				let {
					dataObj,
					replayVal
				} = this;
				let obj = {};
				if (replayVal == "") {
					uni.showToast({
						title: "请输入您的留言内容",
						icon: "none"
					})
				} else {
					let add_time = this.setTime(new Date().getTime());
					obj.add_time = add_time;
					obj.message = replayVal;
					dataObj.reply.unshift(obj);

					this.dataObj = dataObj;
					this.showReplay = false;
					let param = {
						id: this.dataObj.back_id,
						content: replayVal
					}
					AfterModels.replyInfo(param, (res) => {
						console.log(res)
					})
				}

			},
			setTime(time) {
				console.log(time)
			},

		}
	}
</script>

<style lang="scss">
	/* pages/user/afterDetail/afterDetail.wxss */
	.top {
		padding: 20rpx 30rpx;
		background: #fff;
		margin-top: 20rpx;
	}

	.top-title {
		border-bottom: #eee 2rpx solid;
		padding: 12rpx 0;
		color: #000;
	}

	.top-content {
		margin-top: 12rpx;
	}

	.content {
		padding: 20rpx 30rpx;
		background: #fff;
		margin-top: 20rpx;
	}

	.logistics {
		padding: 26rpx 30rpx;
		background: #fff;
		margin-top: 20rpx;
	}

	.logistics-content {
		padding-left: 40rpx;
		border-left: #eee 2rpx solid;
	}

	.item {
		padding: 22rpx 0;
		border-bottom: #eee 2rpx solid;
		position: relative;
	}

	.icon {
		display: block;
		width: 16rpx;
		height: 16rpx;
		background: #ddd;
		border-radius: 50%;
		position: absolute;
		left: -50rpx;
		top: 36rpx;
	}

	.item-content {
		margin-bottom: 8rpx;
	}

	.time {
		font-size: 24rpx;
		color: #999;
	}

	.item:first-child {
		padding-top: 0;
		color: #094;
	}

	.item:first-child .icon {
		top: 4rpx;
		left: -56rpx;
		background: #094;
		width: 30rpx;
		height: 30rpx;
		box-shadow: 0 0 10rpx #094;
	}

	.item:first-child .time {
		color: #094;
	}

	.bottom {
		padding: 20rpx 30rpx;
		background: #fff;
		margin-top: 20rpx;
	}

	.replay-btn {
		width: 100%;
		height: 120rpx;
		background: #fff;
		border-top: #ddd 2rpx solid;
		position: fixed;
		left: 0;
		bottom: 0;
	}

	.replat-bt {
		width: 710rpx;
		height: 80rpx;
		border: #eee 2rpx solid;
		margin: 22rpx auto;
		padding: 20rpx;
		color: #999;
		border-radius: 8rpx;
	}

	.bg {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .4);
		left: 0;
		top: 0;
		z-index: 9;
	}

	.replay {
		width: 100%;
		height: 400rpx;
		position: fixed;
		left: 0;
		bottom: 0rpx;
		z-index: 10;
		background: #fff;
		padding: 20rpx 30rpx;
		transition: .3s;
		animation: all .3s;
	}

	.replay.show {
		bottom: 0;
	}

	.replay-title {
		margin-bottom: 16rpx;
		display: flex;
		align-items: center;
	}

	.replay-submit {
		margin-left: auto;
		color: #f23;
	}

	.replay-content {
		margin-top: 30rpx;
	}

	.replay-textarea {
		border: #eee 2rpx solid;
		width: 100%;
		height: 280rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.is-empty {
		margin-top: 10px;
		color: green;
	}

	.img {
		width: 160rpx;
		height: 160rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		border: #eee 2rpx solid;
		margin-top: 20rpx;
	}
</style>
