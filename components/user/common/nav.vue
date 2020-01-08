<template>
	<view class="nav">
		<view class="nav-item" v-for="(item, index) in navList" :class=" curr==index?'curr':'' " @tap="setCurr" :data-index="index" :key="index">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			navList: Array,
			curr: Number
		},
		methods: {
			setCurr(e) {
				let index = parseInt(e.currentTarget.dataset.index);
				console.log(index)
				this.$emit("setCurr", index)
			}
		},
		created() {
			// console.log(this.navList)
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		width: 100%;
		height: 80upx;
		background: #fff;
		display: flex;

		.nav-item {
			flex: 1;
			border-bottom: #ddd 4upx solid;
			text-align: center;
			line-height: 80upx;

			&.curr {
				color: #f23;
				border-bottom: #f23 4upx solid;
			}
		}

	}
</style>
