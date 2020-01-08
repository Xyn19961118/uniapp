<!-- 分类 -->
<template>
	<view class="classify">

		<view class="classify-title">
			<view class="classify-search">
				<image class="classify-search-icon" src="../../static/search.png" />
				<view class="classify-search-txt" @tap="searchShow">请输入商品名称 货号</view>
			</view>
		</view>

		<view class="classify-content">
			<view class="classify-nav-wrapper">
				<Nav :isChangeGoods="isChangeGoods" :list="dataObj.data" :curr="curr" @setCurr="setCurr"></Nav>
			</view>

			<view class="classify-cont-wrapper">
				<Content :list="dataObj.data" :curr="curr" :isShop="isShop" :isChangeGoods="isChangeGoods"></Content>
			</view>
		</view>

		<!-- 搜索组件 -->
		<view class="search-wrap">
			<Search :isSearchShow="isSearchShow" @searchCancel="searchCancel" @searchSubmit="searchSubmit" :hotSearch="dataObj.hots_word"
			 @searchWord="searchWord"></Search> 
		</view>
		<!-- 搜索组件 -->
	</view>
</template>

<script>
	import {
		IndexModel
	} from "../../model/IndexModels.js";
	const IndexModels = new IndexModel();

	import Nav from "../../components/classify/nav.vue";
	import Content from "../../components/classify/content.vue";
	import Search from "../../components/common/search.vue";
	export default {
		components: {
			Nav,
			Content,
			Search
		},
		data() {
			return {
				dataObj: {},
				isChangeGoods: false, //是否是商品管理页面
				isShop: 1, //是否是店铺分类 0为店铺分类
				curr: 0,
				isSearchShow: false
			}
		}, 
		methods: {
			//搜索点击
			searchShow() {
				this.isSearchShow = true
			},
			//切换
			setCurr(e) {
				this.curr = e
			},
			//搜索提交
			searchSubmit(e) {
				let shopid = uni.getStorageSync("shopId") || 0;
				let word = e;
				console.log(word)
				uni.navigateTo({
					url: `/pages/goodsList/goodsList?type=3&word=${word}&shopid=${shopid}`,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			//搜索取消
			searchCancel(e) {
				this.isSearchShow = false
			},
			//搜索词
			searchWord(e) {
				console.log(e)
			}


		},
		onLoad(e) {
			// console.log(e);
			let shopId = e.shopid || 0;
			let isChangeGoods = e.isGoods || 0;
			console.log(shopId) 
			//判断是否是店铺
			if(shopId) {
				this.isShop = 0;
			}
			//判断是否是修改价格分类
			if(isChangeGoods){
				this.isChangeGoods = true
			}
			
			IndexModels.getCate(1,res => {
				console.log(res)
				this.dataObj = res;
			})
		}
	}
</script>

<style lang="scss" scoped>
	.classify {
		background: #fff;
		.classify-title {
			width: 100%;
			height: 90upx;
			background: #fff;
			border-bottom: #eee 2upx solid;
			overflow: hidden;

			.classify-search {
				width: 690upx;
				height: 64upx;
				border: #ddd 2upx solid;
				background: #fbfbfb;
				margin: 12upx auto 10upx;
				border-radius: 8upx;
				display: flex;

				.classify-search-icon {
					width: 36upx;
					height: 36upx;
					margin: 14upx;
				}

				.classify-search-txt {
					height: 64upx;
					display: flex;
					align-items: center;
					width: 500upx;
				}
			}
		}

		.classify-content {
			display: flex;

			.classify-nav-wrapper {
				width: 184upx;
				background: #f3f3f3;
				height: 100%;
			}

			.classify-cont-wrapper {
				width: calc(100% - 184upx);
			}

		}


	}
</style>
