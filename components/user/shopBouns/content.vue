<template>
	<!-- 店铺优惠券列表 -->
	<view class="cou-container">
		<view class="cou-nav">
			<view class="cou-nav-item cou-nav-item01">{{curr==0?"优惠券名称":"运费券名称"}}</view>
			<view class="cou-nav-item cou-nav-item02">金额</view>
			<view class="cou-nav-item cou-nav-item03">使用条件</view>
			<view class="cou-nav-item cou-nav-item04">操作</view>
		</view>
		<swiper class="" :current="curr" style="height:calc(100vh - 226rpx)" @change="setCurr">
			<swiper-item class="">
				<scroll-view class="" scroll-y style="height:calc(100vh - 226rpx)">
					<view class="cou-items">
						<view class="cou-item" v-for="(discounts, index) in dataObj.discounts" :key="discounts.bonus_sel_id">
							<vItem :item="discounts" :index="index" @setShow="setShow"></vItem>
						</view>
					</view>

					<view class="cou-list-no" v-if="dataObj.discounts.length == 0">
						您还没有该类优惠券
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="">
				<scroll-view class="" scroll-y style="height:calc(100vh - 226rpx)">
					<view class="cou-items">
						<view class="cou-item" v-for="(freight, index) in dataObj.freight" :key="freight.bonus_sel_id">
							<vItem :item="freight" :index="index" @setShow="setShow"></vItem>
						</view>
					</view>
					<view class="cou-list-no" v-if="dataObj.freight.length == 0">
						您还没有该类优惠券
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
		data() {
			return {

			}
		},
		methods: {
			//显示隐藏
			setShow(e) {
				let {
					curr,
					dataObj
				} = this;

				let index = e;
				if (curr == 0) {
					//当前的是优惠券
					for (let i = 0; i < dataObj.discounts.length; i++) {
						dataObj.discounts[i].isShow = false
						if (i == index) {
							// console.log(dataObj.discounts[index].isShow)
							dataObj.discounts[index].isShow = !dataObj.discounts[index].isShow;
						}
					}
				} else {
					for (let i = 0; i < dataObj.freight.length; i++) {
						dataObj.freight[i].isShow = false
						if (i == index) {
							dataObj.freight[index].isShow = true
						}
					}
				}
				// console.log(dataObj)
				this.dataObj = dataObj
				// this.setData({
				// 	dataObj
				// })

			},
			//设置current
			setCurr(e) {
				// console.log(e.detail.current)
				this.$emit("setCurr", e.detail.current)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cou-container {
		padding-top: 56rpx;
	}

	.cou-nav {
		width: 100%;
		height: 56rpx;
		position: fixed;
		left: 0;
		top: 80rpx;
		z-index: 2;
		background: #dedede;
		display: flex;
		align-items: center;
		text-align: center;
		font-size: 24rpx;
	}

	.cou-nav-item01 {
		width: 260rpx;
	}

	.cou-nav-item02 {
		width: 120rpx;
	}

	.cou-nav-item03 {
		width: 150rpx;
	}

	.cou-nav-item04 {
		width: 220rpx;
		font-size: 24rpx;
	}

	.cou-list-no {
		text-align: center;
		padding-top: 100rpx;
	}
</style>
