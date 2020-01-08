<!-- 查看评价 -->
<template>
	<view class="container">
		<view class="top">
			<image class="pic" :src="dataObj.users.headimg" mode="aspectFill" lazy-load />
			<view class="info">
				<view class="name">{{dataObj.users.user_name}}</view>
				<view class="stars">
					<image v-for="(item, index) in dataObj.grade" :key="index" class="star" src="http://m.prizemart.cn/mobile/images/star-active.png" />
				</view>
			</view>
			<view class="time">{{dataObj.create_time}}</view>
		</view>

		<view class="content">
			{{dataObj.content}}
		</view>
		<view class="imgs">
			<image v-for="(item, index) in urls" :key="index" class="img" :src="item" :data-src="item" @tap="previewImage" />
		</view>
	</view>
</template>

<script>
	import {
		AfterModel
	} from "@/model/AfterModel.js";
	const AfterModels = new AfterModel();
	export default {
		data() {
			return {
				urls: [],
				dataObj: null
			};
		},
		onLoad(e) {
			let id = e.id;
			AfterModels.commentDetail(id, res => {
				console.log(res)
				this.dataObj = res;
				this.urls = res.imgs
			})
		},
		methods: {
			//预览图片
			previewImage(e) {
				// console.log()
				let current = e.currentTarget.dataset.src;
				let urls = this.urls;
				uni.previewImage({
					current, // 当前显示图片的http链接
					urls, // 需要预览的图片http链接列表
					indicator: "number",
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background: #fff;
		padding: 20rpx 30rpx;
	}

	.top {
		display: flex;

	}

	.pic {
		width: 96rpx;
		height: 96rpx;
		border: #eee 2rpx solid;
		border-radius: 50%;
	}

	.info {
		margin-left: 20rpx;
	}

	.name {
		color: #000;
	}

	.stars {
		display: flex;
		margin-top: 10rpx;
	}

	.star {
		width: 28rpx;
		height: 28rpx;
	}

	.time {
		margin-left: auto;
		color: #999;
		font-size: 24rpx;
	}

	.content {
		margin-top: 12rpx;
	}

	.imgs {
		display: flex;
		flex-wrap: wrap;
		margin-top: 16rpx;
	}

	.img {
		width: 200rpx;
		height: 200rpx;
		margin: 0 8rpx 8rpx 0;
	}
</style>
