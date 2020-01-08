<!-- 我的收藏 -->
<template>
	<view class="container">
		<view class="nav">
			<Nav :navList="navList" :curr="curr" @setCurr="setCurr"></Nav>
		</view>
		<view class="content">
			<Content :curr="curr" @setCurr="setCurr" :dataObj="dataObj" :goodsColl="goodsColl" :shopColl="shopColl" :isSelectAll="isSelectAll"
			 @selectOne="selectOne"></Content>
		</view>
		<view class="edit" @tap="handleEdit">{{editType?editTxtOver:editTxt}}</view>
		<view class="handle" :class="editType?'active':''">
			<view class="handle-select">
				<view class="select" @tap="selectAll">
					<Select :isSelect="isSelectAll"></Select>
				</view>
				全选
			</view>
			<view class="select-delete" @tap="handleDelete">删除</view>
		</view>
	</view>
</template>

<script>
	import {
		UserModel
	} from "@/model/userModels.js";
	const UserModels = new UserModel();
	
	import Nav from "@/components/user/common/nav.vue";
	import Select from "@/components/common/select.vue";
	import Content from "@/components/user/collect/content.vue";
	export default {
		components:{
			Nav,
			Select,
			Content
		},
		data() {
			return {
				navList: ["商品收藏", "店铺收藏"],
				curr: 0,
				dataObj: {},
				goodsColl: false, //控制商品收藏编辑
				shopColl: false, //控制店铺收藏编辑
				editType: false,
				editTxt: "编辑",
				editTxtOver: "完成",
				isSelectAll: 0, //是否全选
				shopIds: [], //储存选择的店铺id
				goodsIds: [], //储存选择的商品id
			};
		},
		onLoad: function(options) {
			UserModels.collect((res) => {
				let dataObj = res;
				dataObj.goods.forEach(item=>{
					item.isSelect = 0;
				})
				dataObj.shop.forEach(item=>{
					item.isSelect = 0;
				})
				this.dataObj = dataObj
			})
		},

		methods: {
			//设置curr及切换重置
			setCurr(e) {
				let dataObj = this.dataObj;
				for (let i in dataObj.goods) {
					dataObj.goods[i].isSelect = false;
				}
				for (let j in dataObj.shop) {
					dataObj.shop[j].isSelect = false;
				}
				// console.log(e)
				this.curr = e;
				this.editType = false;
				this.goodsColl = false;
				this.shopColl = false;
				this.isSelectAll = 0;
				this.shopIds = [];
				this.goodsIds = [];
				this.dataObj = dataObj;
			},

			//编辑操作
			handleEdit(e) {
				let {
					curr,
					goodsColl,
					shopColl,
					editType
				} = this;
				if (curr == 0) {
					//编辑商品
					editType = !editType;
					goodsColl = !goodsColl;
					this.editType = editType;
					this.goodsColl = goodsColl;
					
				} else {

					//编辑店铺收藏
					editType = !editType;
					shopColl = !shopColl;
					
					this.editType = editType;
					this.shopColl = shopColl;
					// this.setData({
					// 	editType,
					// 	shopColl
					// })
				}
			},

			//全选操作
			selectAll(e) {
				let {
					isSelectAll,
					dataObj,
					curr,
					shopIds,
					goodsIds
				} = this;
				if(isSelectAll==0){
					isSelectAll=1
				}else {
					isSelectAll=0
				}
				if (curr) {
					for (let i in dataObj.shop) {
						dataObj.shop[i].isSelect = isSelectAll;
						shopIds.push(dataObj.shop[i].rec_id);
					}
					if (!isSelectAll) {
						shopIds.splice(0, shopIds.length)
					}
				} else {
					for (let i in dataObj.goods) {
						dataObj.goods[i].isSelect = isSelectAll;
						goodsIds.push(dataObj.goods[i].rec_id);
					}
					if (!isSelectAll) {
						goodsIds.splice(0, goodsIds.length)
					}
				}
				this.isSelectAll = isSelectAll;
				this.dataObj = dataObj;
				
			},

			//单个选择
			selectOne(e) {
				let index = e; //获取当前点击的index
				let {
					dataObj,
					curr,
					shopIds,
					goodsIds,
					isSelectAll
				} = this;

				if (curr) {
					//当前点击的是店铺收藏
					let isSelectAll2 = this.handelSelectOne(dataObj.shop, shopIds, index, isSelectAll);
					isSelectAll = isSelectAll2
				} else {
					let isSelectAll2 = this.handelSelectOne(dataObj.goods, goodsIds, index, isSelectAll);
					isSelectAll = isSelectAll2
				}
				// console.log(isSelectAll);
				this.dataObj = dataObj;
				this.shopIds = shopIds;
				this.isSelectAll = isSelectAll;
				

			},

			//单个选择共用方法
			handelSelectOne(obj, arr, index, isSelectAll) {
				for (let i in obj) {
					if (i == index) {
						if (obj[index].isSelect == 1) {
							obj[index].isSelect = 0;
							let numIndex = arr.findIndex(x => {
								return x == obj[index].rec_id;
							})
							arr.splice(numIndex, 1);
							isSelectAll = 0
						} else {
							obj[index].isSelect = 1;
							arr.push(obj[index].rec_id);
							if (obj.length == arr.length) {
								isSelectAll = 1
							}
						}
					}
				}
				return isSelectAll;
			},
			//删除操作
			handleDelete() {
				let {
					dataObj,
					curr,
					shopIds,
					goodsIds
				} = this;
				let _this = this;
				if (curr) {
					var data = shopIds;
				} else {
					var data = goodsIds;
				};
				//本地删除商品收藏
				uni.showModal({
					title: '提示',
					content: '确认删除该收藏？',
					success(res) {
						if (res.confirm) {
							for (let j in data) {
								if (curr) {
									for (let i in dataObj.shop) {
										if (data[j] == dataObj.shop[i].rec_id) {
											dataObj.shop.splice(i, 1);
											UserModels.delCollect(data[j])
										}
									}
								} else {
									for (let i in dataObj.goods) {
										if (data[j] == dataObj.goods[i].rec_id) {
											dataObj.goods.splice(i, 1);
											UserModels.delCollect(data[j])
										}
									}
								}
							}
							_this.dataObj = dataObj
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding-bottom: 80rpx;
	}

	.nav {
		width: 100%;
		height: 80rpx;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 2;
	}

	.edit {
		position: fixed;
		width: 80rpx;
		height: 80rpx;
		z-index: 3;
		right: 20rpx;
		bottom: 200rpx;
		background: #f23;
		color: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.handle {
		width: 100%;
		height: 100rpx;
		border-top: #ddd 2rpx solid;
		background: #fff;
		position: fixed;
		display: flex;
		left: 0;
		bottom: -101rpx;
		align-items: center;
		transition: .3s;
	}

	.handle.active {
		bottom: 0;
	}

	.handle-select {
		margin-left: 30rpx;
		display: flex;
		align-items: center;
	}

	.select {
		width: 36rpx;
		height: 36rpx;
		margin-right: 10rpx;
	}

	.select-delete {
		margin-left: auto;
		width: 260rpx;
		height: 100rpx;
		background: rgb(236, 107, 15);
		color: #fff;
		text-align: center;
		line-height: 100rpx;
	}
</style>
