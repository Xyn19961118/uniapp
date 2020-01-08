<template>
	<!-- 提交订单 -->
	<view class="container">
		<view class="address">
			<view class="has-address" @tap="editAddress">
				<vAddress :addressObj="data.address"></vAddress>
			</view>
		</view>

		<view class="product">
			<view v-for="(item, index) in data.data" :key="index">
				<vContent :shop="item" @changStatus="changStatus" @disabled="disabled"></vContent>
			</view>

		</view>

		<view class="activle-tips">*活动促销的产品不参与优惠券的使用</view>

		<view class="items">
			<view class="item">
				<view class="label">支付方式</view>
				<view class="item-info">
					<view class="item-cont">微信支付</view>
					<!-- <image class="item-point" src="http://m.prizemart.cn/mobile/images/next.png" /> -->
				</view>
			</view>
			<view class="item">
				<view class="label">发票</view>
				<view class="item-info" @tap="showInvoice">
					<view class="item-cont">{{invoiceCurr?invoiceTextYes:invoiceTextNo}}</view>
					<image class="item-point" src="http://m.prizemart.cn/mobile/images/next.png" />
				</view>
			</view>
			<view class="item">
				<view class="label">留言</view>
				<view class="item-info">
					<input type="text" class="item-input" value="" placeholder="请输入您的留言" placeholder-style="color:#ccc" @blur="messageInput" />
				</view>
			</view>
		</view>

		<view class="prices">
			<view class="price-item">
				<view class="price-label">商品价格：</view>
				<view class="price">
					<view class="price-mark">￥</view>{{data.info.goodsPrice}}
				</view>
			</view>
			<view class="price-item">
				<view class="price-label">商品优惠：</view>
				<view class="price">
					<view class="price-mark">-￥</view>0.0
				</view>
			</view>
			<view class="price-item">
				<view class="price-label">优惠券：</view>
				<view class="price">
					<view class="price-mark">-￥</view>{{bonusVal}}
				</view>
			</view>
			<view class="price-item">
				<view class="price-label">运费券：</view>
				<view class="price">
					<view class="price-mark">-￥</view>{{freightVal}}
				</view>
			</view>
			<view class="price-item">
				<view class="price-label">运费：</view>
				<view class="price">
					<view class="price-mark">￥</view>{{data.info.totalFee}}
				</view>
			</view>
		</view>

		<view class="bottom">
			<view class="submit" @tap="submitForm">立即支付</view>
			<view class="order-info">
				总额（含运费）：￥
				<view class="order-price">{{orderPrice}}</view>
			</view>
		</view>

		<view class="bg" :hidden="isShowInvoice"></view>

		<!-- 开发票 -->
		<view class="invoice" :class="!isShowInvoice?'show-invoice':''">
			<view class="invoice-title">
				开发票
				<image class="invoice-close" @tap="closeInvoice" src="http://m.prizemart.cn/mobile/images/close.png" />
			</view>
			<view class="invoice-items">
				<view class="invoice-item" :class="invoiceCurr==0?'curr':''" data-index="0" @tap="getInvoiceIndex">不开发票</view>
				<view class="invoice-item" :class="invoiceCurr==1?'curr':''" data-index="1" @tap="getInvoiceIndex">开发票</view>
			</view>

			<view class="invoice-detail" v-if="invoiceCurr==1">
				<view class="invoice-de">
					<view class="invoice-label">发票抬头</view>
					<view class="invoice-content">
						<view class="invoice-selects" data-index="0" @tap="getInvoiceType">
							<view class="invoice-select">
								<vSelect :isSelect="invoiceType==0"></vSelect>
							</view>
							个人
						</view>
						<view class="invoice-selects" data-index="1" @tap="getInvoiceType">
							<view class="invoice-select">
								<vSelect :isSelect="invoiceType==1" data-index="1"></vSelect>
							</view>
							单位
						</view>
					</view>
				</view>
				<view class="invoice-de">
					<view class="invoice-label">发票抬头</view>
					<view class="invoice-content">
						<input class="invoice-input" type="text" value="" placeholder="请填写发票抬头" placeholder-style="color: #bbb;" @blur="handleInvoiceName" />
					</view>
				</view>
				<view class="invoice-de" v-if="invoiceType==1">
					<view class="invoice-label">纳税人识别号</view>
					<view class="invoice-content">
						<input class="invoice-input" type="text" value="" placeholder="请填写纳税人识别号" placeholder-style="color: #bbb;" @blur="handleInvoiceTax"
						 maxlength="18" />
					</view>
				</view>
				<view class="invoice-de">
					<view class="invoice-label">发票内容</view>
					<view class="invoice-content">
						<view class="invoice-selects">
							<view class="invoice-select">
								<vSelect isSelect="1"></vSelect>
							</view>
							食品明细
						</view>
					</view>
				</view>
			</view>

			<view class="invoice-sub" @tap="submitInvoice">确定</view>
		</view>
		<!-- 开发票 -->

	</view>
</template>

<script>
	import {
		OrderModel
	} from "@/model/OrderModel";
	const OrderModels = new OrderModel();

	import vSelect from "@/components/common/select.vue";
	import vAddress from "@/components/common/address.vue";
	import vContent from "@/components/submitOrders/content.vue";
	export default {
		components: {
			vSelect,
			vAddress,
			vContent
		},
		data() {
			return {
				isShowInvoice: true, //是否隐藏发票
				invoiceCurr: 0, //开发票与不开发票
				invoiceTextNo: "不开发票", //开发票的text 
				invoiceTextYes: "开发票", //开发票的text 
				invoiceType: 0, //发票类型 0为个人， 1为单位
				invoiceName: '', //储存发票抬头
				invoiceTax: '', //储存纳税人识别号
				data: {}, // 订单数据
				bonusVal: 0, // 优惠价
				freightVal: 0, // 运费价
				orderPrice: 0, // 总价
				bonusList: [], // 优惠券
				addressId: 0, // 地址
				message: '', // 留言
				shopId: 0,

			};
		},
		onLoad: function(e) {
			let id = e.id || '';
			let shopId = e.shopid || 0;
			this.shopId = shopId;
			this.id = id;
			// uni.getProvider({
			// 	service: 'payment',
			// 	success: function(res) {
			// 		console.log(res)
			// 	}
			// });
		},
		onShow: function(e) {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			let {
				id,
				shopId
			} = this;
			OrderModels.checkHasAddr((res) => {
				if (res.error == 1) {
					uni.showModal({
						title: '提示',
						content: res.errmsg,
						showCancel: false,
						success: (result) => {
							if (result.confirm) {
								uni.navigateTo({
									url: `/pages/user/addAddress/addAddress?done=1&orderid=${id}&shopid=${shopId}`
								})
							}
						}
					});
				} else {
					OrderModels.orderWaitPay((res) => {
						// console.log(res)
						uni.hideLoading();
						let addressId = res.address ? res.address.address_id : 0;
						this.data = res;
						this.orderPrice = res.info.totalPrice;
						this.addressId = (id == 0) ? addressId : id;
					}, id, shopId)
				}

			})

		},
		methods: {
			messageInput(e) {
				this.message = e.detail.value;
			},

			changStatus(e) {
				let index = e.currentTarget.dataset.index
				this.checkBonus(e, index);
			},

			disabled(e) {
				let index = e.currentTarget.dataset.index
				this.checkBonus(e, index, true);
			},


			checkBonus(val, index, flag) {
				// console.log("aa")
				let {
					data
				} = this;
				let array = data.data
				let e = array[index].bonusList
				if (val.type == 1) {
					var arr = e.freight
				} else {
					var arr = e.bonus
				}
				arr.forEach((i) => {
					if (flag) {
						i.is_select = false
					} else {
						i.is_select = false
						if (i.user_sel_id == val.id) {
							i.is_select = true
						}
					}
				})
				this.data = data;
				this._recountData()
			},

			/**
			 *  重新计算价格
			 */
			_recountData() {
				let {
					data,
					orderPrice
				} = this;
				let freight = 0
				let bonus = 0
				let arr = []
				data.data.forEach((item) => {
					var freightArr = item.bonusList.freight
					var bonusArr = item.bonusList.bonus
					if (freightArr) {
						freightArr.forEach((i) => {
							if (i.is_select) {
								freight += parseFloat(i.type_money)
								arr.push(i.user_sel_id)
							}
						})
					}
					if (bonusArr) {
						bonusArr.forEach((i) => {
							if (i.is_select) {
								bonus += parseFloat(i.type_money)
								arr.push(i.user_sel_id)
							}
						})
					}
				})
				orderPrice = data.info.totalPrice - (freight + bonus);

				this.orderPrice = orderPrice;
				this.freightVal = freight;
				this.bonusVal = bonus;
				this.bonusList = arr;
			},

			editAddress(e) {
				uni.navigateTo({
					url: '/pages/user/address?param=callback'
				});

			},

			//  生成数据给后台
			createData() {
				let {
					bonusList,
					invoiceType,
					invoiceName,
					invoiceTax,
					message,
					addressId,
					shopId
				} = this;
				let obj = {
					invoice: invoiceType,
					invoice_input: invoiceName,
					postscript: message,
					invoice_ns: invoiceTax,
					shop_bonus: bonusList,
					address_id: addressId,
					shopid: shopId
				}
				return obj
			},
			//提交订单
			submitForm() {
				// console.log(this.createData())
				uni.showLoading({
					title: '提交中',
					mask: true,
					success: (result) => { 
						OrderModels.orderPay(this.createData(), (res) => {
							// Pays.orderPay()
							console.log(res)
							// uni.requestPayment({
							// 	provider: "wxpay",
							// 	orderInfo: res.id,
							// 	success: res => {
							// 		console.log(res);
							// 		console.log("bb");
							// 	},
							// 	fail: function(err) {
							// 		console.log('fail:' + JSON.stringify(err));
							// 	} 
							// })
							wx.hideLoading();
						})
					}
				});

			},

			//点击操作 是否开发票
			getInvoiceIndex(e) {
				let index = e.currentTarget.dataset.index;
				if (index == 0) {
					this.invoiceName = "";
					this.invoiceTax = "";
				}
				this.invoiceCurr = index
			},
			//选择发票类型
			getInvoiceType(e) {
				let index = e.currentTarget.dataset.index;
				this.invoiceType = index;
			},
			// 填写发票抬头
			handleInvoiceName(e) {
				let inputVal = e.detail.value;
				this.invoiceName = inputVal
			},
			// 填写纳税人识别号
			handleInvoiceTax(e) {
				let inputVal = e.detail.value;

				this.invoiceTax = inputVal;
			},
			//显示开发票
			showInvoice(e) {
				this.isShowInvoice = false;
			},
			//关闭开发票
			closeInvoice() {
				this.isShowInvoice = true;
			},
			//发票 确定
			submitInvoice() {
				let {
					invoiceCurr,
					invoiceType,
					invoiceName,
					invoiceTax
				} = this;
				// console.log(invoiceType)
				// console.log(invoiceName)
				// console.log(invoiceTax)
				if (invoiceCurr == 1) {
					//选择开发票
					invoiceType = Number(invoiceType);
					switch (invoiceType) {
						case 0:
							if (invoiceName == "") {
								uni.showToast({
									title: "请填写收票人抬头",
									icon: "none"
								})
								return false
							}
							break;
						case 1:
							if (invoiceName == "") {
								uni.showToast({
									title: "请填写收票人抬头",
									icon: "none"
								})
								return false
							};

							if (invoiceTax == "") {
								uni.showToast({
									title: "请填写纳税人识别号",
									icon: "none"
								})
								return false
							};
							break;
					}
				}

				this.isShowInvoice = true;
			}
		},
	}
</script>

<style lang="scss" scoped>
	/* pages/submitOrders/submitOrders.wxss */
	page {
		padding-bottom: 100rpx;
	}

	.address {
		margin-top: 20rpx;
	}

	.no-address {
		width: 100%;
		height: 200rpx;
		background: #fff;
	}

	.product {
		margin-top: 20rpx;
	}

	.activle-tips {
		padding: 12rpx 30rpx;
	}

	.activle-tips {
		font-size: 24rpx;
		color: #f23;
	}

	.items {
		margin-top: 8rpx;
		background: #fff;
	}

	.item {
		border-bottom: #eee 2rpx solid;
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		font-size: 24rpx;
		line-height: 40rpx;
	}

	.item-info {
		display: flex;
		margin-left: auto;
		align-items: center;

	}

	.item-point {
		width: 12rpx;
		height: 24rpx;
		margin-left: 8rpx;
	}

	.item-input {
		width: 500rpx;
		text-align: right;
	}

	.item-cont {
		color: #999;
	}

	.prices {
		padding: 20rpx 30rpx;
		background: #fff;
		margin: 20rpx 0 40rpx;
	}

	.price-item {
		display: flex;
		align-items: center;
		height: 64rpx;
	}

	.price {
		margin-left: auto;
		display: flex;
		align-items: center;
		font-size: 36rpx;
		color: #f23;
		font-weight: bold;
	}

	.price-mark {
		font-size: 24rpx;
		font-weight: normal;
		color: #666;
	}

	.bottom {
		position: fixed;
		width: 100%;
		height: 100rpx;
		background: #fff;
		z-index: 2;
		left: 0;
		bottom: 0;
		border-top: #ddd 2rpx solid;
		display: flex;
		justify-content: flex-start;
		flex-direction: row-reverse;
	}

	.submit {
		width: 220rpx;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		color: #fff;
		background: #f23;
	}

	.order-info {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #999;
		margin-right: 16rpx;
	}

	.order-price {
		color: #f23;
		font-size: 36rpx;
		font-weight: bold;
	}

	.bg {
		position: fixed;
		z-index: 2;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .6);
		left: 0;
		top: 0;
	}

	.invoice {
		position: fixed;
		width: 100%;
		height: 0;
		background: #efeff4;
		left: 0;
		bottom: 0;
		z-index: 3;
		border-top-left-radius: 8rpx;
		border-top-right-radius: 8rpx;
		transition: .3s;
		-webkit-transition: .3s;
		overflow: hidden;
	}

	.show-invoice {
		height: calc(100vh - 160rpx);
	}

	.invoice-items {
		display: flex;
		align-items: center;
		background: #fff;
		padding: 30rpx;
	}

	.invoice-item {
		width: 310rpx;
		height: 80rpx;
		border: #eee 2rpx solid;
		border-radius: 8rpx;
		text-align: center;
		line-height: 80rpx;
		margin: 0 20rpx;
	}

	.invoice-item.curr {
		border: #f23 2rpx solid;
		color: #f23;
		background: url(http://m.prizemart.cn/mobile/images/r.png) 30rpx no-repeat;
		background-size: 26rpx 18rpx;
	}

	.invoice-title {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		font-size: 32rpx;
		color: #000;
		position: relative;
		background: #fff;
		border-bottom: #eee 2rpx solid;
	}

	.invoice-close {
		width: 44rpx;
		height: 44rpx;
		position: absolute;
		right: 40rpx;
		top: 22rpx;
	}

	.invoice-de {
		margin-top: 20rpx;
		background: #fff;
		padding: 30rpx;
	}

	.invoice-label {
		padding: 8rpx 0;
		color: #000;
		font-size: 24rpx;
		border-bottom: #ddd 2rpx solid;
		line-height: 40rpx;
	}

	.invoice-input {
		margin-top: 12rpx;
		font-size: 24rpx;
		width: 600rpx;
	}

	.invoice-content {
		display: flex;
		align-items: center;
	}

	.invoice-selects {
		margin-top: 16rpx;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		margin-right: 20rpx;
	}

	.invoice-select {
		width: 36rpx;
		height: 36rpx;
		margin-right: 12rpx;
	}

	.invoice-sub {
		width: 100%;
		height: 80rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 2;
		background: #f23;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
	}
</style>
