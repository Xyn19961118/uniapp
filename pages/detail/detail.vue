<template>
	<view class="container detail-container">
		<!-- 头部导航 -->
		<view class="header">
			<image class="deail-logo" src="http://m.prizemart.cn/mobile/images/goods-tips01.png" />
			<view class="nav">
				<Nav :curr="curr" :isContrast="isContrast" @setIndex="setIndex"></Nav>
			</view>
			<navigator class="goto-shopcar" url="/pages/shopcar/shopcar" hover-class="none">
				<image class="shopcar" src="http://m.prizemart.cn/mobile/images/goods-shopcar.png" />
			</navigator>
		</view>
		<!-- 头部导航 -->

		<!-- 内容 -->
		<view class="content">
			<Content :curr="curr" :isContrast="isContrast" :dataObj="dataObj" @setIndex="setIndex" @loadMoreShopList="loadMoreShopList"></Content>
		</view>
		<!-- 内容 -->

		<!-- 底部 -->
		<view class="footer-wrapper" :hidden="hiddenFooter">
			<Footer @goodsCollect="goodsCollect" :isCollect="isCollect" @addCart="addCart" @buyGoods="buyGoods" @gotoIndex="gotoIndex"></Footer>
		</view>
		<!-- 底部 -->
	</view>
</template>

<script>
	import {
		GoodsModel
	} from "../../model/goodsModels.js";
	const GoodsModels = new GoodsModel();
	//引入组件
	import Nav from "../../components/detail/nav.vue";
	import Content from "../../components/detail/content.vue";
	import Footer from "../../components/detail/footer.vue";

	export default {
		components: {
			Nav,
			Content,
			Footer
		},
		data() {
			return {
				curr: 3,
				isContrast: true,
				dataObj: {},
				page: 2,
				goodsId: 0,
				hiddenFooter: false,
				isCollect: false
			}
		},
		onLoad(e) {
			// console.log(e)
			uni.showLoading({
				title: "加载数据中...",
				mask: true
			})
			let id = e.id;
			let shopid = e.shopid;
			this.goodsId = id;
			this.shopId = shopid || 0;
			// console.log(shopid)

			if (shopid) {
				this.curr = 0;
				this.isContrast = false
			} else {
				this.curr = 3;
			}

			GoodsModels.goodsInfo(id, shopid, res => {
				console.log(res)
				if (res) {
					uni.hideLoading();
					this.dataObj = res;
					this.isCollect = res.is_collect;
				}
			})

			//如果是对比，则隐藏footer
			if (this.curr == 3) {
				this.hiddenFooter = true
			}
		},
		methods: {
			//导航切换
			setIndex(e) {
				let curr = parseInt(e);
				//如果是对比，则隐藏footer
				if (curr == 3) {
					this.hiddenFooter = true
				} else {
					this.hiddenFooter = false
				}
				this.curr = curr;

				// console.log(this.curr)
			},
			//加载更多店铺
			loadMoreShopList() {
				uni.showLoading({
					title: "加载数据中...",
					mask: true
				})
				let {
					goodsId,
					page
				} = this;
				GoodsModels.loadMoreShopList(goodsId, page, res => {
					// console.log(res)
					if (res) {
						if (res.length == 0) {
							uni.showToast({
								title: "没有更多了",
								icon: "none"
							})
						} else {
							this.page++;
							this.dataObj.shopCompare.push(...res)
						}
						uni.hideLoading();
					}
				})
			},
			//收藏
			goodsCollect(e) {
				let {
					goodsId,
					shopId
				} = this;
				let _this = this;
				GoodsModels.collect(goodsId, shopId, res => {
					uni.showToast({
						title: res.errmsg,
						icon: "none"
					})
					_this.isCollect = _this.isCollect ? false : true;
				})
			},
			//加入购物车
			addCart(e) {
				let {
					goodsId,
					shopId
				} = this;
				GoodsModels.addCart({
					id: goodsId,
					shopid: shopId
				}, res => {
					uni.showToast({
						title: "加入购物车成功",
						icon: "none"
					})
				})

			},
			//立即购买
			buyGoods() {
				let {
					goodsId,
					shopId
				} = this;
				GoodsModels.addCart({
					id: goodsId,
					shopid: shopId
				}, res => {
					uni.showToast({
						title: "加入购物车成功",
						icon: "none"
					})
				})
			},
			//回到首页
			gotoIndex() {
				let shopId = this.shopId;
				if (shopId !== 0) {
					uni.redirectTo({
						url: `/pages/shop/index?id=${shopId}`
					});
				} else {
					//回到官网首页
					uni.redirectTo({
						url: "/pages/index/index"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-container {
		padding-top: 60upx;
		background: #f8f8f8;
	}

	.header {
		width: 100%;
		height: 60upx;
		z-index: 2;
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		background: #f8f8f8;
		justify-content: space-between;

		.deail-logo {
			width: 86upx;
			height: 42upx;
			margin-left: 72upx;
			margin-top: 10upx;
		}

		.goto-shopcar {
			width: 60upx;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-left: auto;
			margin-right: 20upx;

			.shopcar {
				width: 40upx;
				height: 38upx;
			}
		}

		.nav {
			margin: auto;
		}
	}


	.footer-wrapper {
		position: fixed;
		width: 100%;
		height: 120upx;
		border-top: #ddd 2upx solid;
		background: #fff;
		left: 0;
		bottom: 0;
		z-index: 2;

	}
</style>
