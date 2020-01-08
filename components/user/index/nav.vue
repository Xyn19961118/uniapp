<template>
	<view class="nav-wrap">
		<view class="nav">
			<view class="item" :class="curr==0?'curr':''" data-curr="0" @tap="setIndex">个人中心</view>
			<view class="item" :class="curr==1?'curr':''" data-curr="1" @tap="setIndex">店铺</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			curr: Number
		},
		methods: {
			setIndex(e) {
				let index = e.currentTarget.dataset.curr;
				this.$emit("setIndex",index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-wrap {
		width: 100%;
		height: 104upx;
		background: #f23;
		overflow: hidden;

		.nav {
			width: 284upx;
			height: 60upx;
			margin: 20upx auto;
			border: #fff 2upx solid;
			border-radius: 8upx;
			display: flex;
			color: #fff;
			overflow: hidden;

			.item {
				width: 50%;
				height: 60upx;
				background: #f23;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24upx;

				&.curr {
					background: #fff;
					color: #f23;
				}
			}
		}
	}
</style>
