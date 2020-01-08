<template>
	<!-- 商品管理 -->
	<view class="container">
		<view class="title">
			<view class="tit tit01">产品名</view>
			<view class="tit tit02">官方价</view>
			<view class="tit tit03">供货价</view>
			<view class="tit tit04">售价</view>
			<view class="tit tit05">自定价</view>
		</view>

		<view class="content">
			<view class="item" v-for="(item, index) in list" :key="index">
				<vItem @setShow="handleShow" @setInfo="handelChange" @changeTop="changeTop" @changeHots="changeHots" :index="index"
				 :item="item"></vItem>
			</view>

			<view class="list-no" v-if="list.length == 0">
				该分类暂无产品
			</view>
		</view>

		<view class="bg" v-if="scaleShow"></view>

		<view class="scale" v-if="scaleShow">
			<view class="scale-title">修改价格</view>
			<view class="scale-content">
				<view class="scale-item">
					<view class="scale-label">修改比例：</view>
					<view class="scale-cont">
						<input class="scale-input" type="number" :value="changeScaleVal" @focus="handleScale" @blur="checkRate" />%
					</view>
				</view>
				<view class="scale-h">或</view>
				<view class="scale-item">
					<view class="scale-label">修改价格：</view>
					<view class="scale-cont">
						<input class="scale-input" type="digit" :value="changePriceVal" @focus="handlePrice" @blur="checkVal" />
					</view>
				</view>
			</view>

			<view class="scale-btns">
				<view class="scale-btn red" @tap="submitInfo">确定</view>
				<view class="scale-btn" @tap="hideModel">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		UserModel
	} from "@/model/userModels";
	var UserModels = new UserModel();

	import vItem from "@/components/user/goodsManage/item.vue";
	export default {
		components: {
			vItem
		},
		data() {
			return {
				list: [],
				scaleShow: false, //单个修改比例是否显示
				changeScaleVal: "", //储存修改比例
				changePriceVal: "", //储存修改价格
				page: 2,
				id: 0,
				lastRate: 100,
				currentID: {},
				type: 0
			};
		},
		onLoad: function(e) {
			this.id = e.id;
			this._onload(e.id, 1);
		},
		methods: {
			_onload(id, page) {
				let list = this.list
				uni.showLoading({
					title: "加载中...",
					mask: true
				})
				UserModels.shopGoodsList((res) => {
					uni.hideLoading();
					UserModels.checkArrLength(res)
					list.push(...res)
					// for(let i in list){
					// 	list[i].isShow = false
					// }
					console.log(list)
					this.list = list
				}, id, page);
			},
			changeTop(e) {
				this._changeGoodsStatus(e, 1)
			},
			changeHots(e) {
				this._changeGoodsStatus(e, 0)
			},
			_changeGoodsStatus(id, status) {
				let param = {
					id: id,
					status: status
				}
				let list = this.list
				list.forEach((item) => {
					if (item.goods_id == id) {
						if (status == 1) {
							item.shopGoodsStatus.is_top = !item.shopGoodsStatus.is_top
						} else {
							item.shopGoodsStatus.is_hots = !item.shopGoodsStatus.is_hots
						}
					}
				});
				this.list = list
				UserModels.shopGoodsStatus(param);
			},

			//显示隐藏
			handleShow(e) {
				
				let index = e;
				let list = this.list;
				for (let i in list) {
					list[i].is_show  = false;
					if (i == index) {
						list[index].is_show = !list[index].is_show
						// console.log(list[index].isShow)
					}
				}
				// console.log(this.list)
				this.list = list
			},

			//修改价格显示
			handelChange(e) {
				this.scaleShow = true;
				this.currentID = e;

			},
			hideModel() {
				this.scaleShow = false;
				// this.setData({
				// 	scaleShow: false
				// })
			},
			//修改单个 比例blur
			handleScale(e) {
				this.changePriceVal = ""
			},
			//修改单个 价格blur
			handlePrice(e) {
				this.changeScaleVal = ""
			},
			checkRate(e) {
				let val = e.detail.value

				this.changeScaleVal = val

				if (val) {
					this.pShowToast(val, 0)
					this.lastRate = val;
				}
			},
			checkVal(e) {
				let {
					currentID,
					lastRate
				} = this;
				
				let val = e.detail.value;
				console.log(this.changePriceVal)
				this.changePriceVal = val;
				// console.log(currentID.val)
				// console.log(val)
				
				if (val) {
					lastRate = parseInt(val / currentID.val * 100)
					console.log(lastRate)
					this.pShowToast(lastRate, 1)
					this.lastRate = lastRate
				}
			},
			pShowToast(val, type) {
				if (val < 65 || val > 100) {
					uni.showToast({
						title: '商品比例不能小于65%或大于100%',
						icon: 'none',
						duration: 1500
					})
					if (type == 0) {
						this.changeScaleVal = "";
						console.log("aa")
					} else {
						this.changePriceVal = ""
					}
				}
			},
			submitInfo() {
				
				console.log(this.changePriceVal)
				let {
					currentID,
					lastRate,
					type,
					list
				} = this
				list.forEach(item => {
					if (item.goods_id == currentID.id) {
						item.new_shop_price = (item.shop_price * lastRate / 100).toFixed(1)
					}
				});
				console.log(list)
				// this.setData({
				this.list = list
				// })
				let param = {
					id: currentID.id,
					rate: lastRate,
					type: type
				}
				UserModels.goodsRate(param, (res) => {
					uni.showToast({
						title: res.errmsg,
						icon: 'none',
						duration: 1500,
					});
				})
				// this.setData({
				this.scaleShow = false
				// })
			}
		},
		onReachBottom: function() {
			let {
				page,
				id
			} = this
			this._onload(id, page);
			this.page = page++;
		},
	}
</script>

<style lang="scss">
	/* pages/user/goodsManage/goodsManage.wxss */
	page {
		background: #f8f8f8;
	}

	.title {
		width: 100%;
		display: flex;
		height: 56rpx;
		background: #eee;
		align-items: center;
		text-align: center;
		font-size: 24rpx;
	}

	.tit01 {
		width: 254rpx;
	}

	.tit02 {
		width: 120rpx;
	}

	.tit03 {
		width: 120rpx;
	}

	.tit04 {
		width: 150rpx;
	}

	.tit05 {
		width: 106rpx;
	}

	.content {
		background: #fff;
	}

	.bg {
		background: rgba(0, 0, 0, .4);
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 8;
	}

	.scale {
		width: 600rpx;
		height: 520rpx;
		background: #fff;
		position: fixed;
		left: 75rpx;
		top: 50%;
		margin-top: -260rpx;
		z-index: 9;
		border-radius: 8rpx;
	}

	.scale-title {
		height: 80rpx;
		border-bottom: #ddd 2rpx solid;
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #333;
	}

	.scale-item {
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.scale-cont {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 228rpx;
	}

	.scale-input {
		width: 150rpx;
		height: 80rpx;
		border: #ddd 2rpx solid;
		border-radius: 8rpx;
		padding: 0 20rpx;
		margin-right: 8rpx;
		box-sizing: border-box;
	}

	.scale-h {
		text-align: center;
		margin-top: 20rpx;
		color: #f23;
	}

	.scale-btns {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
	}

	.scale-btn {
		width: 132rpx;
		height: 66rpx;
		border: #ddd 2rpx solid;
		margin: 0 16rpx;
		text-align: center;
		line-height: 66rpx;
		border-radius: 8rpx;
		color: #333;
	}

	.scale-btn.red {
		background: #f23;
		color: #fff;
		border: #f23 2rpx solid;
	}

	.list-no {
		text-align: center;
		padding: 100rpx 0;
	}
</style>
