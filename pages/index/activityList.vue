<template>
	<view class="activity">
		<view class="item" v-for="item in list" :key="item.goods_id">
			<vItem :item="item" @addShopCar="addShopCar"></vItem>
		</view>
	</view>
</template>

<script>
	import vItem from "@/components/common/limit.vue";
	import {
		IndexModel
	} from "@/model/IndexModels";
	const indexModels = new IndexModel();
	export default {
		components: {
			vItem
		},
		data() {
			return {
				list: [],
				page: 2,
				shopId: 0
			};
		},
		onLoad(e) {
			uni.showLoading({
				title: "数据加载中...",
				mark: true
			})
			let shopId = e.shopid;
			// indexModels.setShopID(shopId)
			indexModels.activityGoods(res => {
				console.log(res)
				uni.hideLoading();
				this.list = res;
				this.shopId = shopId;
				// this.setData({
				// 	list: res,
				// 	shopId
				// })
			}, 1, 0, shopId)
		},
		methods: {
			//加入购物车
			addShopCar(e) {
				// console.log(e)
				let goodsId = e.goodsId;
				let shopId = this.shopId;
				indexModels.addShopCar(goodsId, shopId, res => {
					// indexModels.checkError(res)
					uni.showToast({
						title: res.errmsg,
						icon: "none"
					})
				})
			},
		},
		onReachBottom() {
			uni.showLoading({
				title: "数据加载中...",
				mark: true
			})
			let {
				shopId,
				page
			} = this;
			indexModels.activityGoods(res => {
				uni.hideLoading();
				if (res.length == 0) {
					uni.showToast({
						title: "没有更多数据了",
						icon: "none"
					})
				} else {
					this.list.push(...res)
					this.page++;
				}

			}, page, 0, shopId)
		}
	}
</script>

<style lang="scss">

</style>
