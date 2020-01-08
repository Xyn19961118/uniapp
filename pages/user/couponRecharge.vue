<template>
	<!-- 充值优惠券 -->
	<view class="container">
		<view class="content">
			<view class="item">
				<view class="label">充值金额：</view>
				<view class="item-content">
					<view class="item-it" :class="item.isSelect?'active':''" :data-number="item.text" @tap="selectNumber" :data-index="index"
					 v-for="(item, index) in list" :key="index">{{item.text}}</view>
				</view>
			</view>

			<view class="item">
				<view class="label01">自定义金额：</view>
				<input type="text" class="item-input" :value="inputVal" @blur="getValue" placeholder="必须是100的倍数" placeholder-style="color:#999" />
			</view>
			<view class="item">
				<view class="select" @tap="handleSelect">
					<vSelect :isSelect="isSelect"></vSelect>
				</view>
				<view class="select-tips">充值的优惠券暂不支持提现及退款，敬请谅解</view>
			</view>
		</view>
		<view class="center">
			<view class="center-top">5折推广费活动期间</view>
			<view class="center-bottom">充值<view class="bold">{{rechargeNumber}}</view>元 您将到账<view class="bold">{{rechargeNumber==0.01?2000:rechargeNumber*2}}</view>元</view>
		</view>
		<view class="submit" :class="isSelect?'active':''" @tap="handleSubmit">确定充值</view>
	</view>
</template>

<script>
	import vSelect from "@/components/common/select.vue";
	import {
		ShopBonusModel
	} from "@/model/ShopBonusModel";
	// import {
	// 	Pay
	// } from "@/utils/pay";
	const shopBonus = new ShopBonusModel();
	// const Pays = new Pay();
	export default {
		components: {
			vSelect
		},
		data() {
			return {
				isFirst: true, //是否是第一次充值
				list: [{
					text: 0.01,
					isSelect: false
				}, {
					text: 100,
					isSelect: false
				}, {
					text: 200,
					isSelect: false
				}, {
					text: 500,
					isSelect: false
				}, {
					text: 1000,
					isSelect: false
				}],
				rechargeNumber: 0.01, //储存充值的金额
				inputVal: "",
				isSelect: 0
			};
		},
		onShow: function() {
			shopBonus.checkRecharge((res) => {
				this.isFirst = res.isFirst;
				// this.setData({
				// 	isFirst: res.isFirst
				// })
				//页面读取处理充值金额
				let {
					isFirst,
					list,
					rechargeNumber
				} = this;
				if (isFirst == true) {
					list.shift();
				}
				console.log(isFirst)
				list[0].isSelect = 1;
				rechargeNumber = list[0].text;
				this.list = list;
				this.rechargeNumber = rechargeNumber;
				// this.setData({
				// 	list,
				// 	rechargeNumber
				// })
			})
		},

		methods: {
			//获取填写的金额
			getValue(e) {
				let {
					list
				} = this;
				let inputValue = e.detail.value;
				if (inputValue / 100 < 1) {
					//如果小于100
					uni.showToast({
						title: "请填写100的整数",
						icon: "none"
					})
				} else {
					//大于100取整
					Math.ceil(inputValue / 100);
					let inputVal = inputValue / 100
					Math.ceil(inputVal);
					inputVal = Math.ceil(inputVal) * 100;
					list.forEach(item => {
						item.isSelect = false
					})
					this.inputVal = inputVal;
					this.rechargeNumber = inputVal;
					this.list = list;
					// this.setData({
					// 	inputVal,
					// 	rechargeNumber: inputVal,
					// 	list
					// })

				}
			},

			//选择充值金额
			selectNumber(e) {
				let selectNumber = e.currentTarget.dataset.number;
				let index = e.currentTarget.dataset.index;
				let {
					list
				} = this;
				for (let i in list) {
					if (i == index) {
						list[i].isSelect = true
					} else {
						list[i].isSelect = false
					}
				}
				this.list = list;
				this.rechargeNumber = selectNumber;
				this.inputVal = "";
			},
			//选择框
			handleSelect(e) {
				let {
					isSelect
				} = this;
				if (isSelect == 1) {
					isSelect = 0
				} else {
					isSelect = 1
				}
				this.isSelect = isSelect
			},
			//提交
			handleSubmit(e) {
				let {
					isSelect,
					rechargeNumber
				} = this;

				if (isSelect) {
					shopBonus.submitRecharge(rechargeNumber, (res) => {
						Pays.orderPay(res.id, false, true);
					})
				} else {
					uni.showToast({
						title: "请先勾选协议",
						icon: "none"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding-bottom: 90rpx;
	}

	.content {
		margin-top: 20rpx;
		background: #fff;
	}

	.item {
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		border-bottom: #eee 2rpx solid;
	}

	.item .label {
		width: 140rpx;
	}

	.item-content {
		width: calc(100% - 140rpx);
		display: flex;
		flex-wrap: wrap;
	}

	.item-it {
		width: 90rpx;
		height: 56rpx;
		border: #ddd 2rpx solid;
		line-height: 56rpx;
		text-align: center;
		margin-right: 20rpx;
		border-radius: 8rpx;
		color: #333;
	}

	.item-it.active {
		border: #f23 2rpx solid;
		color: #f23;
	}

	.select {
		width: 36rpx;
		height: 36rpx;
		margin-right: 20rpx;
	}

	.select-tips {
		color: #f23;
		font-size: 24rpx;
	}

	.center {
		margin-top: 100rpx;
		text-align: center;
		color: #f23;
		font-size: 32rpx;
	}

	.center-bottom {
		display: flex;
		justify-content: center;
	}

	.bold {
		font-weight: bold;
	}

	.submit {
		width: 100%;
		height: 90rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #bbb;
		color: #fff;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
	}

	.submit.active {
		background: #f23;
	}
</style>
