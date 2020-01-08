<template>
	<view class="shopcar-content">
		<view class="shopcar-title">
			<image class="shopcar-head-logo" :src="item.shop.shop_img" lazy-load />
			<view class="shopcar-head-name">{{item.shop.shop_name}}</view>
			<view class="shopcar-head-right">
				<view class="shopcar-head-receive" :data-id="item.shop_id" :data-name="item.shop.shop_name" @tap="handleReceive"
				 v-if="isHaveBonus">
					领券
				</view>
				<view class="shopcar-head-handle" @tap="handleOver">{{isOver?"完成":"编辑"}}</view>
			</view>
		</view>
		<view class="shopcar-items">
			<view class="shopcar-item" v-for="(goods, index) in item.goodsList" :key="index">
				<Item :goods="goods" :isOver="isOver" @getNumber="getNumber" @changeStatus="changeStatus" @delGoods="delGoods" @getNumberId="getNumberId"></Item>
			</view>
		</view>
	</view>
</template>

<script>
	import Item from "./item.vue";
	export default {
		components: {
			Item
		},
		props: {
			item: Object
		},
		data() {
			return {
				isHaveBonus: false,
				isOver: false
			}
		},
		created() {
			// console.log(this.item)
		},
		methods: {
			changeStatus(e) {
				this.$emit("changeStatus", e)
			},
			delGoods(e) {
				this.$emit('delGoods', e)
			},
			//编辑完成
			handleOver(e) {
				let isOver = this.isOver;
				isOver = !isOver
				this.isOver = isOver;
				if (isOver == false) {
					this.$emit('updateNum')
				}
			},
			getNumber(e) {
				this.$emit('getNumber', e)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.shopcar-content {
		margin-top: 20upx;
	}

	.shopcar-title {
		background: #fff;
		border-bottom: #eee 2rpx solid;
		display: flex;
		padding: 0 26rpx;
		height: 70rpx;
		align-items: center;
	}

	.shopcar-head-logo {
		width: 40rpx;
		height: 40rpx;
		border: #eee 2rpx solid;
		border-radius: 50%;
	}

	.shopcar-head-name {
		color: #333;
		font-size: 24rpx;
		margin-left: 16rpx;
	}

	.shopcar-head-handle {
		margin-left: auto;
		font-size: 24rpx;
	}

	.shopcar-item {
		width: 100%;
		border-bottom: #eee 2rpx solid;
	}

	.shopcar-head-right {
		margin-left: auto;
		display: flex;
		align-items: center;
	}

	.shopcar-head-receive {
		width: 100rpx;
		height: 44rpx;
		text-align: center;
		line-height: 44rpx;
		border-radius: 22rpx;
		background: #f23;
		color: #fff;
		font-size: 24rpx;
		margin-right: 20rpx;
	}
</style>
