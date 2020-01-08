<template>
	<!-- 产品列表 -->
	<view class="pro-container">
		<view class="pro-select" :class="isChange?'active':'' ">
			<view class="ckeckbox" @tap="selectOne" :data-index="index">
				<vSelect :isSelect="item.isSelect"></vSelect>
			</view>
		</view>

		<view class="product">
			<view class="pic">
				<vPic :img="item.goods.goods_img"></vPic>
			</view>
			<view class="info">
				<view class="name">{{item.goods.goods_name}}</view>
			</view>
			<view class="oth">
				<view class="price">￥{{item.goods.shop_price}}</view>
				<view class="old-price">￥{{item.goods.market_price}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import vSelect from "../../common/select.vue";
	import vPic from "../../common/productPic.vue";
	export default {
		components:{
			vSelect,
			vPic
		},
		props: {
			item: Object,
			isChange: Boolean,
			index: Number
		},
		methods: {
			selectOne(e) {
				// console.log(this.item)
				this.$emit("selectOne", e.currentTarget.dataset.index)
			}
		},
		created() {
			// console.log(this.item)
		}
	}
</script>

<style lang="scss" scoped>
	.pro-container {
		width: 750px;
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	.pro-select {
		width: 0;
		height: 224rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		transition: .3s;
	}

	.active {
		width: 80rpx;
	}

	.ckeckbox {
		width: 36rpx;
		height: 36rpx;
	}

	.product {
		width: 750rpx;
		padding: 20rpx 30rpx;
		height: 224rpx;
		display: flex;
	}

	.pic {
		width: 172rpx;
		height: 172rpx;
		border: #eee 2rpx solid;
	}

	.info {
		width: 354rpx;
		height: 172rpx;
		margin-left: 12rpx;
	}

	.name {
		color: #000;
		display: -webkit-box;
		overflow: hidden;
		white-space: normal !important;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.oth {
		text-align: right;
		margin-left: auto;
	}

	.price {
		color: #f23;
	}

	.old-price {
		font-size: 24rpx;
		color: #999;
		text-decoration: line-through;
		margin-top: 8rpx;
	}
</style>
