<template>
	<view class="order">
		<view class="nav-wrapper">
			<Nav :navList="navList" :curr="curr" @setCurr="setCurr"></Nav>
		</view>

		<view class="content-wrapper">
			<Content :curr="curr" :dataObj="dataObj" @setCurr="setCurr" @loadMoreOreder="loadMoreOreder"></Content>
		</view>
	</view>
</template>

<script>
	import {
		UserModel
	} from "@/model/userModels.js";
	const UserModels = new UserModel();

	import Nav from "@/components/user/common/nav.vue";
	import Content from "@/components/user/orderList/content.vue";

	export default {
		onLoad(e) {
			uni.showLoading({
				title:"加载数据中..."
			})
			let curr = parseInt(e.curr);
			this.curr = curr;
			UserModels.orderList(res => {
				uni.hideLoading();
				this.dataObj = res;
			})
		},
		components: {
			Nav,
			Content
		},
		data() {
			return {
				dataObj: {},
				navList: ["全部", "待付款", "待发货", "待收货", "待评价"],
				curr: 0,
				pages: [{
					page: 2
				}, {
					page: 2
				}, {
					page: 2
				}, {
					page: 2
				}, {
					page: 2
				}]
			}
		},
		methods: {
			//设置curr
			setCurr(e) {
				this.curr = e;
			},
			//加载更多
			loadMoreOreder(e) {
				uni.showLoading({
					title: "加载数据中..."
				})
				let {
					curr,
					dataObj,
					pages
				} = this;
				let page = pages[curr].page;
				// console.log(typeof curr)
				switch (curr) {
					case 0:
						UserModels.loadOrder(page, curr, res => {
							uni.hideLoading();
							if(res.length == 0){
								uni.showToast({
									title:"没有更多数据了",
									icon:"none"
								})
							}else{
								dataObj.all.push(...res);
								pages[curr].page++
							}
						})
						break;
					case 1:
						UserModels.loadOrder(page, curr, res => {
							UserModels.loadOrder(page, curr, res => {
								uni.hideLoading();
								if(res.length == 0){
									uni.showToast({
										title:"没有更多数据了",
										icon:"none"
									})
								}else{
									dataObj.waitPay.push(...res);
									pages[curr].page++
								}
							})
						})
						break;
					case 2:
						UserModels.loadOrder(page, curr, res => {
							UserModels.loadOrder(page, curr, res => {
								uni.hideLoading();
								if(res.length == 0){
									uni.showToast({
										title:"没有更多数据了",
										icon:"none"
									})
								}else{
									dataObj.waitSend.push(...res);
									pages[curr].page++
								}
							})
						})
						break;
					case 3:
						UserModels.loadOrder(page, curr, res => {
							UserModels.loadOrder(page, curr, res => {
								uni.hideLoading();
								if(res.length == 0){
									uni.showToast({
										title:"没有更多数据了",
										icon:"none"
									})
								}else{
									dataObj.waitReceive.push(...res);
									pages[curr].page++
								}
							})
						})
						break;
					case 4:
						UserModels.loadOrder(page, curr, res => {
							UserModels.loadOrder(page, curr, res => {
								uni.hideLoading();
								if(res.length == 0){
									uni.showToast({
										title:"没有更多数据了",
										icon:"none"
									})
								}else{
									dataObj.success.push(...res);
									pages[curr].page++
								}
							})
						})
						break;
					default:
						uni.hideLoading();
						uni.showToast({
							title:"加载出错,请稍后再试",
							icon:"none"
						})

				}

			},


		}
	}
</script>

<style lang="scss" scoped>
	.order {
		background: #EFEFF4;
	}

	.nav-wrapper {
		position: fixed;
		width: 100%;
		height: 80rpx;
		left: 0;
		top: 0;
		z-index: 6;

	}

	.content-wrapper {
		padding-top: 80rpx;
	}
</style>
