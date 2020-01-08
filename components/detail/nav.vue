<template>
	<view class="container">
		<view class="item " :class="curr==0?'active':''" @tap="setIndex" data-index="0">详情</view>
		<view class="item " :class="curr==1?'active':''" @tap="setIndex" data-index="1">评论</view>
		<view class="item " :class="curr==2?'active':''" @tap="setIndex" data-index="2">参数</view>
		<view class="item " :class="curr==3?'active':''" @tap="setIndex" data-index="3" v-if="isContrast">对比</view>
	</view>
</template>

<script>
	export default {
		props: {
			curr: Number,
			isContrast: Boolean
		},
		methods:{
			setIndex(e){
				let index = e.currentTarget.dataset.index;
				this.$emit("setIndex",index)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		justify-content: center;
	}

	.item {
		height: 60upx;
		align-items: center;
		display: flex;
		justify-content: center;
		padding: 0 16upx;
		font-size: 26upx;
		border-bottom: transparent 4upx solid;
		color: #333;
	}

	.item.active {
		border-bottom: #fb5d5a 4upx solid;
		color: #fb5d5a;
	}
</style>
