<template>
	<scroll-view class="classify-nav" scroll-y style="height: calc(100vh - 90upx);">
		<view v-if="!isChangeGoods" class="list fwbold" @tap="lookAllGoods">查看全部</view>
		<view v-if="!isChangeGoods" class="list fwbold" @tap="lookGoods">活动产品</view>

		<view class="list" hover-class="none" @tap="setCurr" v-for="(item, index) in list" :key="item.id" :class="curr==index?'active':'' "
		 :data-index="index">
			<image class="list-img" :src=" 'http://image.prizemart.cn/static/cat/'+item.id+'.png' " />
			<view class="list-txt">{{item.cat_name}}</view>
		</view>

		<view v-if="isChangeGoods" class="list list-change " :class="curr== (list.length) ? 'active':'' " @tap="setCurr"
		 :data-index=" (list.length) ">
			<text class="list-txt">快捷改价\n全部商品</text>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			list: Array,
			isChangeGoods: Boolean,
			curr: Number

		},
		data() {
			return {

			}
		},
		methods: {
			setCurr(e) {
				let index = parseInt(e.currentTarget.dataset.index);
				this.$emit("setCurr", index)
			},
			//查看全部产品
			lookAllGoods() {
				let shopId = uni.getStorageSync("shopId") || 0;
				uni.navigateTo({
					url: `/pages/goodsList/goodsList?type=5&shopid=${shopId}`,
					animationType: "slide-in-right"
				})
			},

			//查看活动产品
			lookGoods(e) {
				let shopId = uni.getStorageSync("shopId");
				if(!shopId){
					uni.navigateTo({
						url: `/pages/goodsList/goodsList?type=4&shopid=0`,
						animationType: "slide-in-right"
					})
				}else{
					uni.navigateTo({
						url: `/pages/index/activityList?shopid=${shopId}`,
						animationType: "slide-in-right"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.classify-nav {
		height: 100%;
		background: #f3f3f3;

	}

	.list {
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-content: center;
		border-bottom: #e5e5e5 2upx solid;
		border-left: transparent 6upx solid;
		flex-wrap: wrap;
	}

	.list.fwbold {
		color: #f23;
		font-weight: bold;
		align-items: center;
	}

	.list .list-img {
		width: 40upx;
		height: 40upx;
	}

	.list-txt {
		color: #000;
		width: 100%;
		text-align: center;
	}

	.list.active {
		border-left: #f23 6upx solid;
		background: #fafafa;
	}

	.list.active .list-txt {
		color: #f23;
	}

	.list-change {
		align-items: center;
	}
</style>
