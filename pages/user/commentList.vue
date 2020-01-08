<!-- 评价列表 -->
<template>
	<view>
		<view class="comment">
			<view class="comment-item" v-for="item in list" :key="item.id">
				<view class="comment-item-pic">
					<Pic :img="item.goods.goods_img"></Pic>
				</view>
				<view class="comment-item-info">
					<view class="comment-item-name">{{item.goods.goods_name}}</view>
					<!-- <view class="integral">已获得20积分</view> -->
					<view class="comment-item-comment">
						<navigator class="look-comment" :url='"/pages/user/commentDetail/commentDetail?id="+item.id'>查看评价</navigator>
					</view>
				</view>
			</view>
			
		</view>
		<view class="no-list" v-if="list.length == 0">
			您未评价过任何商品
		</view>
	</view>
	
</template>

<script>
	import {
		AfterModel
	} from "@/model/AfterModel.js";
	const AfterModels = new AfterModel();

	import Pic from "@/components/common/productPic.vue";
	export default {
		data() {
			return {
				list: [],
				page: 1
			};
		},
		components: {
			Pic
		},
		onLoad() {
			let page = this.page;
			AfterModels.commentList(page, res => {
				this.list = res;
				this.page = page++
			})
		},
	}
</script>

<style lang="scss">
	.comment {
		background: #fff;
	}

	.comment-item {
		display: flex;
		padding: 20rpx 30rpx;
		border-bottom: #ddd 2rpx solid;
	}

	.comment-item-pic {
		width: 132rpx;
		height: 132rpx;
		border: #eee 2rpx solid;
	}

	.comment-item-info {
		margin-left: 20rpx;
		font-size: 26rpx;
		width: 524rpx;
	}

	.comment-item-name {
		overflow: hidden;
		text-overflow: ellipsis;
		color: #000;
		width: 524rpx;
		height: 40rpx;
	}

	.integral {
		color: #f23;
		margin-top: 8rpx;
	}

	.comment-item-comment {
		display: flex;
	}

	.look-comment {
		width: 120rpx;
		height: 40rpx;
		border: #ddd 2rpx solid;
		line-height: 40rpx;
		text-align: center;
		font-size: 24rpx;
		margin-top: 8rpx;
		margin-left: auto;
	}

	.no-list {
		text-align: center;
		margin-top: 100rpx;
	}
</style>
