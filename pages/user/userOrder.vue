<template>
	<!-- 客户订单 -->
	<view class="container">
		<view class="nav">
			<vNav :navList="navList" :curr="curr" @setCurr="setCurr"></vNav>
		</view>
		<view class="content">
			<vContent :curr="curr" :dataObj="dataObj" @setCurr="setCurr" @loadOrder="loadOrder"></vContent>
		</view>
		<view class="links">
			<navigator class="link" url="/pages/user/userClient" hover-class="none">
				客户列表
			</navigator>
			<view class="link active">客户订单</view>
		</view>
	</view>

</template>

<script>
	import {
		UserModel
	} from '@/model/userModels';
	const UserModels = new UserModel();

	import vNav from "@/components/user/common/nav.vue";
	import vContent from "@/components/user/userOrder/content.vue";
	export default {
		components: {
			vNav,
			vContent
		},

		data() {
			return {
				navList: ["全部", "待付款", "已发货", "已收货"],
				curr: 0,
				dataObj: {},
				page: 2,
			};
		},
		onLoad: function(options) {
			uni.removeStorageSync('listPages');
			uni.removeStorageSync('none');
			uni.showLoading({
				title:"加载数据中...",
				mask:true
			})
			UserModels.userOrder((res) => {
				// console.log(res)
				this.dataObj = res;
				uni.hideLoading();
			})
		},
		methods: {
			//设置curr
			setCurr(e) {
				this.curr = e
			},
			loadOrder(e) {
				let {
					curr,
					page,
					dataObj
				} = this;
				uni.showLoading({
					title: "加载订单中...",
					mask: true
				})
				let pages = this.getCurrentPage(curr)
				let isNone = this.getIsLoadNone(curr)
				if (isNone == false) {
					UserModels.loadUserOrder(pages, curr, (res) => {
						let status = UserModels.checkArrLength(res)
						switch (curr) {
							case 0:
								dataObj.all.push(...res);
								break;
							case 1:
								dataObj.waitPay.push(...res);
								break;
							case 2:
								dataObj.waitSend.push(...res);
								break;
							case 3:
								dataObj.success.push(...res);
								break;
						}
						uni.hideLoading()
						console.log(curr);
						if (status !== false) {
							this.setCurrentPage(curr, page + 1)
							this.page = page;
							this.dataObj = dataObj;
							// this.setData({
							// 	page,
							// 	dataObj
							// })
						} else {
							let none = []
							none[curr] = true
							uni.setStorageSync('none', none)
						}
					})
				} else {
					UserModels.checkArrLength([])
				}
			},
			setCurrentPage(curr, page) {
				let listPages = uni.getStorageSync('listPages') || [];
				listPages[curr] = page
				uni.setStorageSync('listPages', listPages)
			},

			getCurrentPage(curr) {
				let listPages = uni.getStorageSync('listPages') || [];
				return listPages[curr] || 2
			},
			getIsLoadNone(curr) {
				let listPages = uni.getStorageSync('none') || [];
				return listPages[curr] || false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.links {
		width: 100%;
		height: 80rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2;
		background: #fff;
		display: flex;
		border-top: #ddd 2rpx solid;
	}

	.link {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #f23;
	}

	.active {
		background: #f23;
		color: #fff;
	}
</style>
