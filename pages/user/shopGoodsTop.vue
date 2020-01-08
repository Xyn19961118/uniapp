<template>
	<!-- 首页置顶 -->
	<view class="cintainer">
		<view class="nav">
			<view class="nav-item" :class="curr==0?'curr':''" data-curr="0" @tap="setCurr">首页推荐</view>
			<view class="nav-item" :class="curr==1?'curr':''" data-curr="1" @tap="setCurr">分类推荐</view>
		</view>

		<view class="content">
			<vContent :dataObj="dataObj" :curr="curr" @setCurr="setCurrC" @change="change"></vContent>
		</view>
	</view>

</template>

<script>
	import {
		UserModel
	} from '@/model/userModels';
	const UserModels = new UserModel();
	
	import vContent from "@/components/user/shopGoodsTop/content.vue";
	export default {
		components:{
			vContent
		},
		data() {
			return {
				dataObj: {},
				curr: 0,
			};
		},
		onLoad: function(options) {
			UserModels.shopRecommend((res) => {
				console.log(res)
				uni.showLoading({
					title:"加载数据中...",
					mask: true
				})
				if(res){
					this.dataObj = res;
					uni.hideLoading();
				}
				
			})
		},
		methods: {
			//设置current
			setCurr(e) {
				let index = parseInt(e.currentTarget.dataset.curr);
				this.curr = index
			},
			//设置current
			setCurrC(e) {
				let index = parseInt(e);
				this.curr = index
			},
			change(e) {
				let {
					id,
					status,
					index
				} = e; 
				let curr = this.curr;
				let dataObj = this.dataObj
				if(curr==0){
					for(let i in dataObj.topGoods){
						if(i == index){
							dataObj.topGoods[i].is_top = !dataObj.topGoods[i].is_top;
						}
					}
				}else{
					for(let i in dataObj.hotsGoods){
						if(i == index){
							dataObj.hotsGoods[i].is_top = !dataObj.hotsGoods[i].is_top;
						}
					}
				}
				this.dataObj = dataObj
				// console.log(pare)
				
				
				let param = { 
					id: id,
					status: status
				}
				UserModels.shopGoodsStatus(param, (res) => {
					console.log(res)
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 80rpx;
	}

	.nav {
		width: 100%;
		height: 80rpx;
		background: #f2f2f2;
		border-top: #ddd 2rpx solid;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2;
		display: flex;
		text-align: center;
		line-height: 80rpx;
	}

	.nav-item {
		width: 50%;
		color: #f23;
	}

	.nav-item.curr {
		background: #f23;
		color: #fff;
	}
</style>
