<template>
	<view class="wrapper">
		<view class="nav">
			<view class="nav-item" @tap="changeStatus">
				价格
				<image class="icon" :src=" iconType?icon02:icon01 " />
			</view>
			<view class="nav-item" :class=" ajaxType==2?'curr':'' " @tap="changeNew">
				新品
			</view>
		</view>

		<view class="items">
			<view class="item" v-for="item in list" :key="item.goods_id">
				<navigator :url="'/pages/detail/detail?id='+item.goods_id+'&shopid='+shopid">
					<vItem :item="item" :shopId="param.shopid"></vItem>
				</navigator>
			</view>
			<view class="list-no" v-if=" list.length == 0 ">
				该分类暂无产品
			</view>
		</view>
	</view>
</template>

<script>
	import {
		IndexModel
	} from "@/model/IndexModels.js";
	const IndexModels = new IndexModel();
	import {
		ShopModel
	} from "@/model/ShopModel.js";
	const ShopModels = new ShopModel();

	import vItem from "@/components/common/productItem.vue";

	export default {
		components: {
			vItem
		},
		data() {
			return {
				list: [],
				ajaxType: 0,
				iconType: 0,
				icon01: "http://m.prizemart.cn/mobile/images/prize02.png",
				icon02: "http://m.prizemart.cn/mobile/images/prize03.png",
				param: [],
				page: 1,
				order: 3
			}
		},
		onLoad(e) {
			console.log(e);
			let {
				id,
				shopid,
				type,
				status,
				word
			} = e;
			/*
			 *e.type说明
			 * 1 为未登录分类产品列表
			 * 2 为登录分类产品列表
			 * 3 为搜索列表
			 * 4 为未登录状态活动产品
			 * 5 为所有产品
			 * 6 为店铺首页产品分类查看更多
			 * 7 为店铺首页推荐查看更多
			 */
			this.shopid = e.shopid;
			this.type = e.type;
			this.status = e.status;
			this.id = e.id;
			this.word = e.word;
			let page = this.page;
			let order = this.ajaxType;
			this.getGoodsList(type, id, status, page, order);
		},

		methods: {
			//点击价格
			changeStatus() {
				this.iconType = !this.iconType;
				console.log(this.iconType)
			},
			//点击新品
			changeNew() {
				this.ajaxType = 2;
			},

			//共用加载数据
			getGoodsList(type, id, status, page = 1, order = 3) {
				uni.showLoading({
					title: "加载数据中..."
				})
				let shopId = this.shopid;
				switch (type) {
					case "1":
						IndexModels.whereGoods(res => {
							console.log(res)
							uni.hideLoading();
							if (res.length == 0) {
								uni.showToast({
									title: "沒有更多数据了~",
									icon: "none"
								})
							} else {
								let pList = this.list;
								pList.push(...res);
								this.page++;
							}
						}, id, status, page, order);
						break;
					case "2":
						let {
							status
						} = this;
						IndexModels.whereGoods(res => {
							uni.hideLoading();
							if (res.length == 0) {
								uni.showToast({
									title: "沒有更多数据了~",
									icon: "none"
								})
							} else {
								let pList = this.list;
								pList.push(...res);
								this.page++;
							}
						}, id, status, page, order);
						break;
					case "3":
						let {
							word,
							page
						} = this;
						IndexModels.searchGoods(res => {
							uni.hideLoading();
							console.log(res)
							if (res.length == 0) {
								uni.showToast({
									title: "沒有更多数据了~",
									icon: "none"
								})
							} else {
								// console.log(page)
								let pList = this.list;
								pList.push(...res);
								this.page++;
							}
						}, word, page, 0);
						break;
					case "4":
						let activePage = this.page;
						let shopid = this.shopid;
						IndexModels.activityGoods(res => {
							uni.hideLoading();
							console.log(res)
							if (res.length == 0) {
								uni.showToast({
									title: "沒有更多数据了~",
									icon: "none"
								})
							} else {
								// console.log(page)
								let pList = this.list;
								pList.push(...res);
								this.page++;
							}
						}, activePage, 0, shopid);
						break;
					case "5":
						let allPage = this.page;
						let allShopid = this.shopid;
						IndexModels.allGoods(res => {
							uni.hideLoading();
							console.log(res)
							if (res.length == 0) {
								uni.showToast({
									title: "沒有更多数据了~",
									icon: "none"
								})
							} else {
								// console.log(page)
								let pList = this.list;
								pList.push(...res);
								this.page++;
							}
						}, allPage, 0, allShopid);
						break;
					case "6":
						let classifyId = this.id;
						let shopId = this.shopid;
						ShopModels.lookMore(classifyId, shopId, 0, res => {
							this.list = res;
							uni.hideLoading();
						})
						break;

					case "7":
						let topShopId = this.shopid;
						ShopModels.hotsGoods(topShopId,0,0,res=>{
							this.list = res;
							uni.hideLoading();
						})
						break;
						//如果type不存在
					default:
						setTimeout(() => {
							uni.hideLoading();
							uni.showToast({
								title: "加载出错，请稍后再试",
								icon: "none"
							})
						}, 3000)
				}
			},
		},
		onReachBottom(e) {
			let {
				type,
				id,
				status,
				page
			} = this;
			this.getGoodsList(type, id, status, page);
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		width: 100%;
		height: 80upx;
		border-bottom: #ddd 2upx solid;
		background: #fff;
		display: flex;
	}

	.nav-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon {
		width: 12upx;
		height: 16upx;
		margin-left: 8upx;
	}

	.nav-item.curr {
		color: #f23;
	}

	.items {
		margin-top: 20upx;
		display: flex;
		flex-wrap: wrap;
	}

	.item {
		width: 50%;
		padding: 0 8upx;
		margin-bottom: 20upx;
	}

	.list-no {
		text-align: center;
		padding: 100upx 0;
		width: 100%;
	}
</style>
