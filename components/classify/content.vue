<template>
	<view class="classfiy-cont">
		<scroll-view :class=" isChangeGoods?'hei01':'hei02' " scroll-y>
			<view class="item" v-for="(item, index) in list" :key="index" v-if="curr == index">
				<view class="item-title">{{item.cat_name}}</view>
				<view class=" content">
					<view class="list">
						<view class="list-item" v-for="(product, index) in item.son" :key="index">
							<view class="list-link" @tap="lookGoods" :data-id="product.id" data-status="1">
								<view class="list-pic-wrap">
									<image class="list-pic" :src="product.cat_nameimg" mode="widthFix" lazy-load />
								</view>
								<view class="list-txt">{{product.cat_name}}</view>
							</view>
						</view>
					</view>
				</view>

				<view class="item-title" v-if="!isChangeGoods">热门品牌</view>
				<view class="content" v-if="!isChangeGoods">
					<view class="list">
						<view class="list-item" v-for="(brandList, index) in item.brandList" :key="index">
							<view class="list-link" @tap="lookGoods" :data-id="brandList.brand_id"  data-status="0">
								<view class="list-pic-wrap">
									<image class="list-pic" :src="brandList.brand_img" mode="widthFix" lazy-load />
								</view>
								<view class="list-txt">{{brandList.brand_name}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 一键改价 -->
			<view class="changePrice" v-if="isChangeGoods && curr == list.length">
				<view class="change">
					<view class="change-txt1">将所有商品价格，全部改为</view>
					<view class="change-txt1">官方价的：<input type="number" :value="inputVal" @blur="changeInput" placeholder="输入百分比" />%</view>
				</view>
				<view class="change-sub" @tap="sunChange">
					确定
				</view>
			</view>
			<!-- 一键改价 -->
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			curr: Number,
			list: Array,
			isShop: Number, //是否是店铺 0为店铺
			isChangeGoods: Boolean //是否个人中心商品分类
		},
		data() {
			return {
				inputVal: '' //储存百分比的value
			}
		},
		methods: {

			lookGoods(e) {
				// console.log(e)
				let id = e.currentTarget.dataset.id;
				console.log(id)
				// console.log(this.isShop);
				let isShop = this.isShop;
				let isChangeGoods = this.isChangeGoods;
				let shopid = uni.getStorageSync("shopId") || 0;
				console.log(shopid)
				console.log(shopid)
				if (isChangeGoods) {
					//走的是商品管理页面
					console.log("走的是商品管理页面");
				} else if (isShop == 0) {
					//走的是店铺分类
					let status = e.currentTarget.dataset.status;
					// console.log(status);
					uni.navigateTo({
						url: `/pages/goodsList/goodsList?type=2&id=${id}&shopid=${shopid}&status=${status}`,
						animationType: 'slide-in-right',
						animationDuration: 200
					});
				} else if (isShop == 1) {
					let status = e.currentTarget.dataset.status;
					// console.log(status);
					uni.navigateTo({
						url: `/pages/goodsList/goodsList?type=1&id=${id}&shopid=0&status=${status}`,
						animationType: 'slide-in-right',
						animationDuration: 200
					});
				}
				// console.log("lookGoods")
			},
			//输入百分比
			changeInput() {
				console.log("输入百分比")
			},
			//一键改价
			sunChange() {
				console.log("一键改价")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item-title {
		margin: 20upx;
		color: #333;
		font-weight: bold;
		font-size: 24upx;
	}

	.list {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}

	.list-item {
		width: 33.33%;
	}

	.list-link {
		margin: 0 0 20upx 20upx;
		background-color: #fff;
		padding: 16upx;
	}

	.list-pic {
		width: 100%;
	}

	.list-txt {
		font-size: 24upx;
		text-align: center;
		width: 100%;
		height: 32upx;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.list-pic-wrap {
		width: 136upx;
		height: 136upx;
		overflow: hidden;
	}

	.change {
		padding: 60upx 40upx 24upx;
	}

	.change-txt1 {
		padding-left: 60upx;
		display: flex;
		align-items: center;
		margin-bottom: 20upx;
		font-size: 24upx;
	}

	.change-txt1 input {
		width: 140upx;
		border: #ddd 2upx solid;
		padding: 0 20upx;
		margin-right: 8upx;
	}

	.change-sub {
		height: 60upx;
		background: #f23;
		border-radius: 8upx;
		color: #fff;
		line-height: 60upx;
		text-align: center;
		margin: 0 20upx;
	}

	.hei01 {
		height: 100vh;
	}

	.hei02 {
		height: calc(100vh - 92upx);
	}
</style>
