<template>
	<view class="select">
		<image class="select-img" :src="isSelect?selectedImg:selectImg" mode="widthFix" @tap="changeSelect"></image>
	</view>
</template>

<script>
	export default {
		props: {
			isSelect: Number
		},
		data() {
			return {
				selectImg: "../../static/select.png", //未选中图片
				selectedImg: "../../static/selected.png", //选中图片
			}
		},
		methods: {
			changeSelect(){
				this.$emit("changeStatus",this.isSelect)
			}
		},
		created() {
			// console.log(this.isSelect)
		}
	}
</script>

<style lang="scss" scoped>
	.select-img {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
