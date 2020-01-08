<template>
	<!-- 店主优惠券每一个 -->
	<view class="c-container">
		<view class="c-title" @tap="handleShow" :data-index="index">
			<view class="c-title-item c-title-item01">
				<image v-if="item.is_recovery == 1" class="c-image " :src="item.is_recovery ?imgH:''"></image>
				<view v-else>
					<image class="c-image " :src="item.is_out?imgG:''" v-if="item.is_out == 1"></image>
				</view>

				{{item.type_name}}
			</view>
			<view class="c-title-item c-title-item02">￥{{item.type_money}}</view>
			<view class="c-title-item c-title-item03">￥{{item.sent_money}}</view>
			<view class="c-title-item c-title-item04">
				<navigator class="c-recover" :url="'/pages/user/bonusRecovery/bonusRecovery?id='+item.bonus_sel_id" hover-class="none">回收</navigator>
				<image class="c-icon" src="http://m.prizemart.cn/mobile/images/lookmore.png" lazy-load />
			</view>
		</view>
		<view class="c-content-wrap" :class="item.isShow?'show':''">
			<view class="c-content">
				<view class="c-content-top">
					<view class="c-item">发放数量：{{item.is_out}}张</view>
					<view class="c-item">已领取：{{item.get}}张</view>
					<view class="c-item">已使用：{{item.used}}张</view>
				</view>
				<view class="c-content-bottom">有效期截止：{{date}}</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		data() {
			return {
				date: "",
				imgG: 'http://m.prizemart.cn/mobile/images/yh-gq.png',
				imgH: 'http://m.prizemart.cn/mobile/images/hs.png'
			}
		},
		created() {
			console.log(this.item)
			let thisDate = this.item.send_end_date;
			let dateS = this.format(thisDate);
			// console.log(dateS)
			this.date = dateS
		},
		methods: {
			//时间戳转时间
			format(data) {
				var time = new Date(data * 1000);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
			},
			//小10加0
			add0(m) {
				return m < 10 ? '0' + m : m
			},

			//点击显示
			handleShow(e) {
				console.log(this.item)
				this.$emit("setShow", e.currentTarget.dataset.index)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.c-container {
		background: #fff;
	}

	.c-title {
		border-bottom: #eee 2rpx solid;
		height: 88rpx;
		display: flex;
	}

	.c-title-item {
		border-right: #eee 2rpx solid;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.c-title-item01 {
		width: 260rpx;
	}

	.c-title-item02 {
		width: 120rpx;
		font-weight: bold;
	}

	.c-title-item03 {
		width: 150rpx;
	}

	.c-title-item04 {
		width: 220rpx;
		font-size: 24rpx;
		position: relative;
	}

	.c-recover {
		color: #007aff;
	}

	.c-content-wrap {
		height: 0;
		overflow: hidden;
		transition: .4s;
	}

	.c-content-wrap.show {
		height: auto;
	}

	.c-content {
		padding: 20rpx 30rpx;
		font-size: 26rpx;
		border-bottom: #eee 2rpx solid;
	}

	.c-content-top {
		display: flex;
		color: #333;
	}

	.c-item {
		margin-right: 30rpx;
	}

	.c-content-bottom {
		margin-top: 8rpx;
		color: #999;
	}

	.c-icon {
		width: 24rpx;
		height: 24rpx;
		position: absolute;
		right: 20rpx;
	}

	.c-image {
		position: absolute;
		width: 80rpx;
		height: 80rpx;
		left: 20rpx;
		z-index: 10;
	}

	.c-title-item01 {
		position: relative;
	}
</style>
