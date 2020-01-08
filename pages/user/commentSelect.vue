<!-- 去评价 -->
<template>
	<view class="container">
		<view class="item" v-for="(item, index) in list" :key="index">
			<view class="pic">
				<Pic :img="item.goods_img"></Pic>
			</view>
			<view class="info">
				<view class="name">{{item.goods_name}}</view>
				<view class="oth">
					<view class="price">￥{{item.goods_price}}</view>
					<view class="num">x {{item.goods_number}}</view>
				</view>
			</view>
			<navigator class="btn" :url='"/pages/user/commentForm/commentForm?id="+item.rec_id' hover-class="none">
				去评价
			</navigator>
		</view>
	</view>
</template>

<script>
	import Pic from "@/components/common/productPic.vue";
	import {
		AfterModel
	} from "@/model/AfterModel";
	const AfterModels = new AfterModel();
	export default {
		data() {
			return {
				list: [],
			};
		},
		components: {
			Pic
		},
		onLoad(e) {
			let id = e.id;
			AfterModels.commentSelect(id, res => {
				console.log(res)
				this.list = res;
			})
		}
	}
</script>

<style lang="scss">
	.item {
		padding: 20rpx 30rpx;
		background: #fff;
		margin-top: 20rpx;
		display: flex;
	}

	.pic {
		width: 128rpx;
		height: 128rpx;
		border: #eee 2rpx solid;
	}

	.info {
		width: 380rpx;
		margin-left: 20rpx;
	}

	.name {
		color: #000;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.oth {
		display: flex;
		align-items: center;
		margin-top: 8rpx;
	}

	.price {
		font-size: 32rpx;
		color: #f23;
	}

	.num {
		margin-left: 20rpx;
	}

	.btn {
		margin-left: auto;
		width: 120rpx;
		height: 56rpx;
		background: #f23;
		color: #fff;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
