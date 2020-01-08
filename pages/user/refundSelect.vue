<template>
	<!-- 选择退款 -->
	<view class="container">
		<view class="items">
			<view class="item" v-for="(item, index) in dataObj.order_goods" :key="item.rec_id">
				<view class="pic">
					<vPic :img="item.goods_img"></vPic>
				</view>
				<view class="info">
					<view class="name">{{item.goods_name}}</view>
					<view class="oth">
						<view class="price">￥{{item.goods_price}}</view>
						<view class="number"> X {{item.goods_number}} </view>
						<view class="source">{{item.shop_id}}</view>
					</view>
				</view> 

				<view class="select" @tap="changeSelect" :data-index="index" :data-id="item.rec_id">
					<vSelect :isSelect="item.isSelect"></vSelect>
				</view>
			</view>
		</view>

		<view class="submit" @tap="handleSubmit">去退款</view>
	</view>
</template>

<script>
	import {
		AfterModel
	} from "@/model/AfterModel";
	const AfterModels = new AfterModel();
	
	import vPic from "@/components/common/productPic.vue";
	import vSelect from "@/components/common/select.vue";
	export default {
		components:{
			vPic,
			vSelect
		},
		data() {
			return {
				dataObj: {},
				submitId: [], //提交的id
				isShowFee: 1,
				countLen: 0,
				id: 0
			};
		},
		onLoad: function(e) {
			this.id = e.id;
			// this.setData({
			// 	id: e.id
			// })
			AfterModels.refundGoods(e.id, (res) => {
				this.dataObj = res;
				this.countLen = res.order_goods.length;
				console.log(res)
			})
		},

		methods: {
			//点击select
			changeSelect(e) {
				console.log(e)
				let {
					dataObj,
					submitId,
					countLen,
					id
				} = this;
				let index = e.currentTarget.dataset.index;
				let ids = e.currentTarget.dataset.id;
				for (let i in dataObj.order_goods) {
					if (i == index) {
						if (dataObj.order_goods[index].isSelect == 1) {
							dataObj.order_goods[index].isSelect = 0;
							//删除选中的id
							for (let i = 0; i < submitId.length; i++) {
								if (ids == submitId[i]) {
									submitId.splice(i, 1)
								}
							}
						} else {
							dataObj.order_goods[index].isSelect = 1;
							submitId.push(ids)
						}
					}
				}
				if (countLen == submitId.length) {
					uni.showModal({
						title: '点击确认，整单退款',
						content: '已全部选中，请选择整单退款',
						showCancel: true,
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: `/pages/user/refundDetail?s=0&id=${id}`
								});
							}
						}
					});
					return false
				}

				this.dataObj = dataObj;
				this.submitId = submitId;
				// this.setData({
				// 	dataObj,
				// 	submitId
				// })
			},
			//提交
			handleSubmit() {
				let {
					submitId,
					id
				} = this;
				if (submitId.length == 0) {
					uni.showToast({
						title: "请选择您要退款的商品",
						icon: "none"
					})
				} else {
					uni.navigateTo({
						url: `/pages/user/refundDetail?s=1&id=${id}&ids=${submitId.join(',')}`
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	/* pages/user/refundSelect/refundSelect.wxss */
	page {
		padding-bottom: 80rpx;
	}

	.items {
		margin-top: 20rpx;
	}

	.item {
		padding: 20rpx 30rpx;
		margin-bottom: 20rpx;
		background: #fff;
		display: flex;
	}

	.pic {
		width: 132rpx;
		height: 132rpx;
		border: #eee 2rpx solid;
		margin-right: 16rpx;
	}

	.info {
		width: calc(100% - 280rpx);
	}

	.name {
		color: #333;
		display: -webkit-box;
		overflow: hidden;
		white-space: normal !important;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.oth {
		display: flex;
		margin-top: 8rpx;
		align-items: center;
	}

	.price {
		font-size: 32rpx;
		color: #f23;
	}

	.number {
		font-size: 24rpx;
		margin-left: 12rpx;
	}

	.source {
		margin-left: 12rpx;
		font-size: 24rpx;
		color: #2f9bef;
	}

	.select {
		width: 36rpx;
		height: 36rpx;
		margin-left: auto;
	}

	.submit {
		width: 100%;
		height: 80rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2;
		background: #f23;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
	}
</style>
