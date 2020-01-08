<template>
	<view class="content">
		<swiper :current="curr" style="height: calc(100vh - 80upx);" @change="setCurr">
			<swiper-item>
				<scroll-view scroll-y @scrolltolower="loadMoreOreder" style="height: calc(100vh - 80upx);">
					<view class="list-no" v-if="dataObj.all== ''">您还没有该类订单</view>
					<view class="content-item" v-for="item in dataObj.all" :key="item.order_id">
						<vItem :parentOrder="item" :childOrder="item.child"></vItem>
					</view>
					
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y @scrolltolower="loadMoreOreder" style="height: calc(100vh - 80upx);">
					<view class="list-no" v-if="dataObj.waitPay== ''">您还没有该类订单</view>
					<view class="content-item" v-for="item in dataObj.waitPay" :key="item.order_id">
						<vItem :parentOrder="item" :childOrder="item.child"></vItem>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y @scrolltolower="loadMoreOreder" style="height: calc(100vh - 80upx);">
					<view class="list-no" v-if="dataObj.waitSend== ''">您还没有该类订单</view>
					<view class="content-item" v-for="item in dataObj.waitSend" :key="item.order_id">
						<vItem :parentOrder="item" :childOrder="item.child"></vItem>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y @scrolltolower="loadMoreOreder" style="height: calc(100vh - 80upx);">
					<view class="list-no" v-if="dataObj.waitReceive== ''">您还没有该类订单</view>
					<view class="content-item" v-for="item in dataObj.waitReceive" :key="item.order_id">
						<vItem :parentOrder="item" :childOrder="item.child"></vItem>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y @scrolltolower="loadMoreOreder" style="height: calc(100vh - 80upx);">
					<view class="list-no" v-if="dataObj.success== ''">您还没有该类订单</view>
					<view class="content-item" v-for="item in dataObj.success" :key="item.order_id">
						<vItem :parentOrder="item" :childOrder="item.child"></vItem>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import vItem from "./item.vue";
	export default {
		components: {
			vItem
		},
		props: {
			curr: Number,
			dataObj: Object
		},
		created() {
			// console.log(this.dataObj)
		},
		methods: {
			//设置current
			setCurr(e) {
				let index = e.detail.current;
				this.$emit("setCurr", index)
			},
			//加载数据
			loadMoreOreder(){
				this.$emit("loadMoreOreder")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-item {
		margin-top: 20rpx;
	}
	.list-no{
		text-align: center;
		margin-top: 60rpx;
	}
</style>
