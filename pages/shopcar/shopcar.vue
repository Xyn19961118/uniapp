<template>
	<!-- 购物车 -->
	<view class="container">
		<view v-for="(item, index) in list" :key="index">
			<vContent :item="item" @getNumber="getNumber" @updateNum="updateNum" @changeStatus="changeStatus" @delGoods="delGoods"
			 @showReceiveHandle="showReceive" :isHaveBonus="(item.bonusList.length > 0)?true:false" @getNumberId="getNumberId"></vContent>
		</view>

		<view class="count" v-if="list.length!==0">
			<view class="select-wrap">
				<view class="select" @tap="selectAll" :data-status="isAll">
					<vSelect :isSelect="isAll"></vSelect>
				</view>
				全选
			</view>
			<view class="count-info">
				<view class="count-price">
					总计：
					<view class="count-all-price">
						<view class="count-span">￥</view>
						{{price}}
					</view>
				</view>
				<view class="count-sub" @tap="checkHaveAddr">去结算</view>
			</view>
		</view>
		<!-- 购物车为空时 -->
		<view class="shopcar-none" v-if="list.length==0">
			<view class="shopcar-none-icon">
				<image class="shopcar-none-img" src="http://m.prizemart.cn/mobile/images/shopcar-w.png" />
			</view>
			<view class="shopcar-none-txt">您的购物车空空如也</view>
			<navigator class="shopcar-none-link" url="/pages/index/index" hover-class="none">去逛逛</navigator>
		</view>
		<!-- 购物车为空时 -->
		<view class="bg" :hidden="showReceive" @tap="hideReceive"></view>

		<!-- 领券 -->
		<view class="receive" :class="showReceive?'':'show'">
			<view class="receive-title">{{thisShopName}}_领券</view>
			<scroll-view class="receive-content" scroll-y>
				<view class="receive-item" v-for="(item, index) in shopBounsList" :key="index">
					<view class="receive-left">
						<view class="receive-prices">
							<view class="receive-price">
								￥
								<view class="receive-pri">{{item.type_money}}</view>
							</view>
							<view class="receive-type">店铺_{{item.bonus_type}}</view>
						</view>
						<view class="receive-oth">满{{item.min_goods_amount}}元使用</view>
						<view class="receive-oth">截止时间：{{item.add_time}}</view>
					</view>
					<view class="receive-right">
						<button class="receive-btn" type="button" :data-id="item.bonus_sel_id" :data-index="index" :disabled="!item.have"
						 v-if="!item.have">
							已领完
						</button>
						<button class="receive-btn" type="button" :data-id="item.bonus_sel_id" :data-index="index" :disabled="item.ours"
						 @tap="receiveBouns" v-else>
							{{item.ours?'已领取':'立即领取'}}
						</button>
					</view>
				</view>
			</scroll-view>
			<view class="receive-hide">
				<view class="receive-hide-btn" @tap="hideReceive">完成</view>
			</view>
		</view>
		<!-- 领券 -->
	</view>

</template>

<script>
	import {
		OrderModel
	} from "@/model/OrderModel";
	import {
		UserModel
	} from "@/model/userModels";
	import {
		ShopModel
	} from "@/model/ShopModel";

	const OrderModels = new OrderModel;
	const UserModels = new UserModel;
	const ShopModels = new ShopModel();

	//使用vuex
	// import {
	// 	mapState,
	// 	mapMutations
	// } from 'vuex';
	//引入组件
	import vContent from "../../components/shopcar/content.vue";
	import vSelect from "../../components/common/select.vue";
	export default {
		components: {
			vContent,
			vSelect
		},
		data() {
			return {
				list: [],
				price: 0,
				isAll: 0,
				shopId: 0,
				showReceive: true, //领取优惠券是否显示
				shopBounsList: null, //店铺优惠券列表
				thisShopName: "",
				bounsShopId: 0
			}
		},
		// computed: {
		// 	// ...mapState(['shopcar','money'])
		// },
		onLoad(e) {
			// console.log(this.$Store.state.shopcar.money)
			let id = e.id || 0;
			this.shopId = id;
			OrderModels.list(id, (res) => {
				console.log(res.error)
				if (res.error == 10001) {
					uni.navigateTo({
						url:"/pages/user/login",
						animationType:"slide-in-right"
					})
				} else {
					this.list = res
					this._resSetCart();
				}

			})
		},
		onShow: function(e) {
			OrderModels.list(e.id, (res) => {
				this.list = res
				this._resSetCart();
			})
		},
		methods: {
			// 修改数量
			getNumber(e) {
				// console.log(e)
				let {
					num
				} = e;

				this.saveNum(id, num);
				this._saveArr(id, e)
			},
			// 点击完成更新数据更新
			updateNum(e) {
				var info = uni.getStorageSync('cart');
				if (info instanceof Array) {
					info.forEach(item => {
						this.saveNum(item.id, item.num);
						OrderModels.cartUpdateNum(item.id, item.num)
					})
					uni.removeStorageSync('cart');
				}
			},
			// 存入缓存
			_saveArr(id, val) {
				var info = uni.getStorageSync('cart');
				var index = -1;
				if (info) {
					for (let i = 0; i < info.length; i++) {
						var e = info[i];
						if (e.id == id) {
							e.num = val.num
							index = i
						}
					}
					if (index == -1) {
						info.push(val)
					}
					uni.setStorageSync('cart', info);
				} else {
					uni.setStorageSync('cart', [val]);
				}
			},

			// 保存修改的数量
			saveNum(id, num) {
				var data = this.list
				var price = 0
				data.forEach(obj => {
					obj.goodsList.forEach(item => {
						if (item.rec_id == id) {
							item.goods_number = num
							item.total_price = item.goods_number * item.goods_price
						}
						if (item.is_select) {
							price += item.total_price
						}
					})
				});
				this.list = data;
				this.price = price.toFixed(2);
				// this.setData({
				// 	list: data,
				// 	price: price.toFixed(2),
				// })
			},
			//是否全选择
			selectAll(e) {
				let status = e.currentTarget.dataset.status
				let param = (status) ? 0 : 1
				OrderModels.selectedIsAll(param)
				this.list.forEach(obj => {
					obj.goodsList.forEach(item => {
						if (status == true) {
							item.is_select = 0
						} else {
							item.is_select = 1
						}
					})
				})
				this._resSetCart();
			},

			// 是否选中
			changeStatus(e) {
				console.log(e)
				let id = e
				OrderModels.isSelect(id)
				this.list.forEach(obj => {
					obj.goodsList.forEach(item => {
						if (item.rec_id == id) {
							if (item.is_select == 1) {
								item.is_select = 0
							} else {
								item.is_select = 1
							}
							// item.is_select = !item.is_select
						}
					})
				})
				this._resSetCart()
			},

			// 删除
			delGoods(e) {
				let id = e
				OrderModels.isSelect(id)
				this.list.forEach((obj, index) => {
					if (obj.goodsList.length == 1) {
						this.list.splice(index, 1);
					}
					obj.goodsList.forEach((item, index) => {
						if (item.rec_id == id) {
							obj.goodsList.splice(index, 1)
							OrderModels.delGoods(id)
						}
					})
				})
				if (this.list.length == 0) {
					this.total = false
				}
				this._resSetCart()
			},

			_checkAll(data) {
				var typeNum = 0
				var selectNum = 0
				var price = 0
				var index = -1
				data.forEach(obj => {
					obj.goodsList.forEach((item, i) => {
						if (item.is_select) {
							price += item.goods_number * item.goods_price
							selectNum++
							index = i
						}
						typeNum++
					})
				})
				var isAll = (typeNum == selectNum) ? 1 : 0
				return {
					isAll: isAll,
					price: price.toFixed(2),
					index: index
				}
			},


			_resSetCart() {
				var newData = this._checkAll(this.list);
				this.isAll = newData.isAll;
				this.price = newData.price;
				this.list = this.list;
				// this.setData({
				// 	isAll: newData.isAll;,
				// 	price: newData.price,
				// 	list: this.data.list
				// })
			},

			checkHaveAddr() {
				var newData = this._checkAll(this.list)
				if (newData.index == -1) {
					uni.showToast({
						title: '没有选中商品，不能结算',
						icon: 'none',
						duration: 1500,
						mask: false
					});
					return false
				}
				UserModels.addressList((res) => {
					if (res.length == 0) {
						uni.showModal({
							content: '你还没有地址，请添加地址',
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/user/addAddress',
									});
								}
							}
						})
					} else {
						var id = 0
						res.forEach(item => {
							if (item.defaultAddr) {
								id = item.address_id
							}
						})
						uni.navigateTo({
							url: '/pages/submitOrders/submitOrders?id=' + id + '&shopid=' + this.shopId,
						});
					}
				})
			},

			//领取优惠券显示操作
			showReceiveHandle(e) {
				// console.log(e.detail)
				let shopBounsList = this.shopBounsList;
				let bounsShopId = this.bounsShopId;
				let id = e.detail.id;
				let thisShopName = e.detail.name;
				if (bounsShopId !== id) {
					uni.showLoading({
						title: "加载数据中...",
						mask: true
					})
					ShopModels.getShopBonus(id, res => {
						console.log(res)
						this.shopBounsList = res;
						this.bounsShopId = id;
						// this.setData({
						// 	shopBounsList: res,
						// 	bounsShopId: id
						// })
						uni.hideLoading();
					})
				}
				this.showReceive = false;
				this.thisShopName = thisShopName;
				// this.setData({
				// 	showReceive : false,
				// 	thisShopName
				// })
			},
			//领取优惠券
			receiveBouns(e) {
				let id = e.currentTarget.dataset.id;
				let index = e.currentTarget.dataset.index;
				let shopBounsList = this.shopBounsList;
				let _this = this;
				uni.showLoading({
					title: "领取中...",
					mask: true
				})
				ShopModels.receiveShopBouns(id, res => {

					for (let i in shopBounsList) {
						if (index == i) {
							shopBounsList[i].ours = 1;
						}
					}
					_this.shopBounsList = shopBounsList;
					// _this.setData({
					// 	shopBounsList
					// })

					uni.hideLoading();
					uni.showToast({
						title: res.errmsg,
						icon: "none"
					})
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	page {
		padding-bottom: 100rpx;
	}

	.count {
		position: fixed;
		width: 100%;
		box-sizing: border-box;
		height: 100rpx;
		display: flex;
		align-items: center;
		background: #fff;
		border-top: #ddd 2rpx solid;
		left: 0;
		bottom: 0;
		z-index: 9;
	}

	.select-wrap {
		display: flex;
		margin-left: 26rpx;
		align-items: center;
	}

	.select {
		width: 36rpx;
		height: 36rpx;
		margin-right: 12rpx;
	}

	.count-info {
		margin-left: auto;
		display: flex;
		align-content: center;
	}

	.count-sub {
		width: 240rpx;
		height: 100rpx;
		color: #fff;
		background: #f23;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		margin-left: 24rpx;
	}

	.count-price {
		display: flex;
		align-items: center;
	}

	.count-all-price {
		display: flex;
		align-items: center;
		color: #f23;
	}

	.count-span {
		font-size: 24rpx;
	}

	.shopcar-none {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 120rpx;
	}

	.shopcar-none-img {
		width: 120rpx;
		height: 120rpx;
	}

	.shopcar-none-txt {
		width: 100%;
		text-align: center;
	}

	.shopcar-none-icon {
		width: 240rpx;
		height: 240rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #ccc;
	}

	.shopcar-none-txt {
		margin-top: 20rpx;
	}

	.shopcar-none-link {
		width: 240rpx;
		height: 80rpx;
		border-radius: 8rpx;
		border: #f23 2rpx solid;
		text-align: center;
		line-height: 80rpx;
		background: #f23;
		margin: 24rpx auto;
		color: #fff;
	}

	.bg {
		background: rgba(0, 0, 0, .5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
		width: 100%;
		height: 100%;
	}

	.receive {
		width: 100%;
		height: 840rpx;
		position: fixed;
		z-index: 11;
		left: 0;
		bottom: -840rpx;
		background: #fff;
		transition: .3s;
	}

	.receive.show {
		bottom: 0;
	}

	.receive-title {
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 32rpx;
		font-weight: bold;
	}

	.receive-content {
		height: 600rpx;
		margin-top: 20rpx;
		padding: 0 40rpx;
		box-sizing: border-box;
	}

	.receive-item {
		width: 670rpx;
		height: 160rpx;
		background: #fcede7;
		overflow: hidden;
		border-radius: 8rpx;
		display: flex;
		margin-bottom: 20rpx;
		box-sizing: border-box;
	}

	.receive-left {
		margin-left: 20rpx;
		margin-top: 20rpx;
		color: #eb5d2a;
	}

	.receive-prices {
		display: flex;
		align-items: center;
		margin-right: 12rpx;
	}

	.receive-price {
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.receive-pri {
		font-weight: bold;
		font-size: 40rpx;
	}

	.receive-type {
		font-size: 24rpx;
		margin-left: 16rpx;
		font-weight: bold;
	}

	.receive-oth {
		font-size: 24rpx;
		margin-top: 4rpx;
	}

	.receive-right {
		margin-left: auto;
		width: 200rpx;
		height: 160rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-left: #f4bc9e 2rpx dashed;
	}

	.receive-btn {
		border: none;
		width: 160rpx;
		height: 60rpx;
		background: #eb5d2a;
		color: #fff;
		font-size: 24rpx;
		border-radius: 30rpx;
	}

	.receive-btn[disabled] {
		opacity: .6;
	}

	.receive-hide {
		position: absolute;
		width: 100%;
		height: 100rpx;
		background: #fff;
		left: 0;
		bottom: 0;
	}

	.receive-hide-btn {
		width: 670rpx;
		height: 80rpx;
		background: #eb5d2a;
		margin: auto;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
		border-radius: 40rpx;
	}
</style>
