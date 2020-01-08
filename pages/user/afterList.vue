<template>
	<!-- 售后列表 -->
	<view class="container">
		<view class="lists">
			<view class="list" v-for="item in list" :key="item.back_id">
				<view class="top">
					<view class="top-info">
						<view class="top-order">订单号：{{item.order_sn}}</view>
						<view class="top-order">下单时间：{{item.add_time}}</view>
					</view>
					<view class="top-order-status">{{item.status_back}}</view>
				</view>
				<view class="content">
					<view class="item" v-for="goods in item.back_goods" :key="goods.goods_id">
						<vItem :goodsItem="goods"></vItem>
					</view>
				</view>
				<view class="bottom">
					<view class="cancel-after look" :data-id="item.back_id" @tap="cancel">取消</view>
					<navigator class="look" :url="'/pages/user/afterDetail/afterDetail?id='+item.back_id" hover-class="none">
						查询进度
					</navigator>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		UserModel
	} from "@/model/userModels";
	const userModel = new UserModel();

	import vItem from "@/components/user/common/item.vue";
	export default {
		components: {
			vItem
		},
		data() {
			return {
				list: [],
				page: 1,
			};
		},
		onLoad: function(options) {
			uni.showLoading({
				title: "数据加载中...",
				mask: true
			})
			let {
				page
			} = this;
			userModel.afterList(page, res => {
				if (res) {
					console.log(res)
					this.list = res;
					// this.setData({
					// 	list: res
					// })
					page++;
					uni.hideLoading();
				}

			})

		},

		methods: {
			cancel(e) {
				let id = e.currentTarget.dataset.id
				let list = this.list
				uni.showModal({
					title: '提示',
					content: '确认取消退款吗？',
					showCancel: true,
					success: (result) => {
						if (result.confirm) {
							list.forEach((item, index) => {
								if (item.back_id == id) {
									list.splice(index, 1)
								}
								userModel.cancelAfter(id)
								this.list = list
								if (list.length == 0) {
									uni.redirectTo({
										url: '/pages/user/index/index'
									});
								}
							});
						}
					}
				});

			},
		},

		onReachBottom: function() {
			uni.showLoading({
				title: "数据加载中...",
				mask: true
			})
			let {
				page
			} = this;
			userModel.afterList(page, res => {
				if (res) {
					this.list = res
					page++
					uni.hideLoading();
				}

			})
		},

	}
</script>

<style lang="scss">
	/* pages/user/afterList/afterList.wxss */
	.lists {
		margin-top: 20rpx;
	}

	.list {
		margin-bottom: 20rpx;
		background: #fff;
		border-bottom: #eee 2rpx solid;
	}

	.top {
		display: flex;
		padding: 20rpx 30rpx;
		font-size: 24rpx;
		border-bottom: #eee 2rpx solid;
	}

	.top-order-status {
		margin-left: auto;
		color: #f90;
	}

	.item {
		border-bottom: #eee 2rpx solid;
	}

	.bottom {
		padding: 20rpx 30rpx;
		display: flex;
	}

	.look {
		width: 160rpx;
		height: 60rpx;
		border: #ddd 2rpx solid;
		text-align: center;
		line-height: 64rpx;
		border-radius: 8rpx;
		margin-left: auto;
	}

	.cancel-after {
		margin-left: 0;
	}
</style>
