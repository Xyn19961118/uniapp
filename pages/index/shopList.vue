<template>
	<view class="container">
		<view class="item" v-for="item in list" :key="item.id">
			<view class="top">
				<image class="head-pic" :src="item.shop_img" mode="aspectFill" lazy-load />
				<view class="head-name">{{item.shop_name}}</view>
				<view class="head-grade">
					<image class="head-grade-i" src="http://m.prizemart.cn/mobile/images/crown.png" mode="aspectFill" lazy-load />
					<image class="head-grade-i" src="http://m.prizemart.cn/mobile/images/crown.png" mode="aspectFill" lazy-load />
					<image class="head-grade-i" src="http://m.prizemart.cn/mobile/images/crown.png" mode="aspectFill" lazy-load />
				</view>
				<navigator animation-type="slide-in-right" animation-duration="300" class="head-link" url="" hover-class="none" open-type="redirect">
					进店
				</navigator>
			</view>
			<view class="pics">
				<navigator animation-type="slide-in-right" animation-duration="300" class="pic" :url="'/pages/detail/detail?id='+goodsItem.goods_id+'&shopid='+item.shop_id" hover-class="none" v-for="goodsItem in item.goodsList" :key="goodsItem.goods_id">
					<Pic :img="goodsItem.goods_img" />
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		IndexModel
	} from '../../model/IndexModels.js';
	const IndexModels = new IndexModel();

	import Pic from "../../components/common/productPic.vue";
	export default {
		components: {
			Pic
		},
		data() {
			return {
				list: []
			}
		},
		created() {
			uni.showLoading({
				title: "加载中..."
			})
			IndexModels.goodShop(res => {
				console.log(res)
				if (res) {
					uni.hideLoading();
					this.list = res;
				}
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.container {
		margin-top: 20upx;
		padding: 0 20upx;
	}

	.item {
		width: 710upx;
		height: 316upx;
		background: #fff;
		border-radius: 12upx;
		overflow: hidden;
		margin-bottom: 20upx;
		box-shadow: 0 0 16upx 8upx #eee;
	}

	.top {
		padding: 20upx;
		display: flex;
		align-items: center;
	}

	.head-pic {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		border: #eee 2upx solid;
	}

	.head-name {
		margin-left: 20upx;
		color: #000;
		font-size: 30upx;
	}

	.head-grade {
		display: flex;
		margin-left: 20upx;
		align-items: center;
	}

	.head-grade-i {
		width: 32upx;
		height: 32upx;
		margin-right: 8upx;
	}

	.head-link {
		margin-left: auto;
		width: 120upx;
		height: 40upx;
		border: #f23 2upx solid;
		border-radius: 8upx;
		text-align: center;
		line-height: 40upx;
		color: #f23;
	}

	.pics {
		padding: 20upx;
		display: flex;
	}

	.pic {
		width: 160upx;
		height: 160upx;
		justify-content: space-between;
		margin-right: 10upx;
		border: #eee 2upx solid;
	}

	.pic:last-child {
		margin-right: 0;
	}
</style>
