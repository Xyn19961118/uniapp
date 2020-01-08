<template>
	<view class="foot-container">
		<view class="item" v-for="(item, index) in list" :key="item.id">
			<view class="item-pic">
				<image class="item-img" :src="item.goods_img" lazy-load />
			</view>
			<view class="item-info">
				<view class="item-name">{{item.goods_name}}</view>
				<view class="item-oth">
					<view class="item-price">￥{{item.new_shop_price}}</view>
					<view class="item-delete" @tap="deleteFoot" :data-id="item.id" :data-index="index">删除</view>
				</view>
			</view>
		</view>

		<view class="no-list" v-if="list.length == 0">您暂未浏览记录</view>
	</view>
</template>

<script>
	import {
		UserModel
	} from "@/model/userModels.js";
	const UserModels = new UserModel()
	export default {
		data() {
			return {
				list: [],
				page: 2
			};
		},
		onLoad() {
			UserModels.history(res => {
				this.list = res
			})
		},
		onReachBottom(e) {
			let {
				page,
				list
			} = this;
			UserModels.history((res) => {
				// UserModels.checkArrLength(res);
				list.push(...res)
				this.list = list;
				this.page = page++;
			}, page)
		},
		methods: {
			deleteFoot(e) {
				// console.log(e)
				let {
					id,
					index
				} = e.currentTarget.dataset;
				let list = this.list;
				uni.showModal({
					content: '确定删除吗？',
					success: (res) => {
						if (res.confirm) {
							UserModels.delHistory(id)
							list.splice(index, 1)
							this.list = list
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		background: #fff;
		padding: 20rpx 30rpx;
		border-bottom: #ddd 2rpx solid;
		display: flex;
	}

	.item-pic {
		width: 128rpx;
		height: 128rpx;
		border: #eee 2rpx solid;
	}

	.item-info {
		width: calc(100% - 132rpx);
		height: 132rpx;
		padding-left: 20rpx;
	}

	.item-name {
		color: #000;
		font-size: 24rpx;
		display: -webkit-box;
		overflow: hidden;
		white-space: normal !important;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		height: 90rpx;
	}

	.item-oth {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.item-price {
		color: #f23;
		font-size: 32rpx;
	}

	.item-delete {
		width: 120rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		border: #ddd 2rpx solid;
		margin-left: auto;
		font-size: 24rpx;
	}

	.item-img {
		width: 128rpx;
		height: 128rpx;
	}

	.no-list {
		text-align: center;
		margin-top: 100rpx;
	}
</style>
