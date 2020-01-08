<template>
	<!-- 店铺收藏 -->
	<view class="shop-container">
		<view class="shop-select" :class="isChange?'active':''">
			<view class="shop-ckeckbox" @tap="selectOne" :data-index="index">
				<vSelect :isSelect="item.isSelect"></vSelect>
			</view>
		</view>
		<view class="shop-content">
			<image class="shop-pic" :src="item.shop.shop_img" lazy-load />
			<view class="shop-name">{{item.shop.shop_name}}</view>
			<navigator class="shop-goto" url="" hover-class="none">
				进店
			</navigator>
		</view>
	</view>
</template>

<script>
	import vSelect from "../../common/select.vue";
	export default {
		components: {
			vSelect
		},
		props: {
			item: Object,
			isChange: Boolean,
			index: Number
		},
		methods: {
			selectOne(e) {
				// console.log(e)
				// let index= parseInt()
				this.$emit("selectOne", e.currentTarget.dataset.index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop-container {
		width: 750rpx;
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	.shop-select {
		width: 0;
		height: 104rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		transition: .3s;
	}

	.active {
		width: 80rpx;
	}

	.shop-ckeckbox {
		width: 36rpx;
		height: 36rpx;
	}

	.shop-content {
		display: flex;
		padding: 20rpx 30rpx;
		align-items: center;
		width: 750rpx;
	}

	.shop-pic {
		width: 60rpx;
		height: 60rpx;
		border: #eee 2rpx solid;
	}

	.shop-name {
		color: #000;
		margin-left: 20rpx;
	}

	.shop-goto {
		margin-left: auto;
		width: 112rpx;
		height: 50rpx;
		border: #f23 2rpx solid;
		color: #f23;
		text-align: center;
		line-height: 50rpx;
		border-radius: 25rpx;
	}
</style>
