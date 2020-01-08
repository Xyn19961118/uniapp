<template>
	<!-- 通用数量加减 -->
	<view class="num-container">
		<view class="num-item num-item-desc" :class="isDesc?'disable':''" @tap="handleDesc">-</view>
		<input class="num-item" type="number" :value="inputValue" @blur="handleInput" />
		<view class="num-item num-item-plus" :class="isPlus?'disable':''" @tap="handlePlus">+</view>
	</view>

</template>

<script>
	export default {
		props: {
			maxNumber: Number,
			inputNumber: {
				type: Number,
				value: 1
			}
		},
		data() {
			return {
				isDesc: true,
				isPlus: false,
				inputValue: 1
			}
		},
		created() {
			let {
				inputValue,
				maxNumber
			} = this;
			this.inputValue = this.inputNumber;
			if (inputValue > 1) {
				this.isDesc = false
			}
		},

		methods: {
			//减少操作
			handleDesc(e) {
				let {
					isDesc,
					isPlus,
					inputValue,
					maxNumber
				} = this;
				if (inputValue < 2) {
					this.isDesc = true;
					this.inputValue = 1;
					// this.setData({
					// 	isDesc: true,
					// 	inputValue: 1
					// })
				} else {
					inputValue--;
					this.inputValue = inputValue;
					this.isPlus = false;
					// this.setData({
					// 	inputValue,
					// 	isPlus: false
					// })

				}
				//发送数量给父组件
				this.$emit("sendNumber", inputValue);

			},
			//增加操作
			handlePlus(e) {
				let {
					isDesc,
					isPlus,
					inputValue,
					maxNumber
				} = this;
				if (inputValue == maxNumber) {
					uni.showToast({
						title: '已到达最大库存',
						icon: 'none',
						duration: 2000
					});
					this.inputValue = maxNumber;
					this.isPlus = true
					// this.setData({
					// 	inputValue: maxNumber,
					// 	isPlus: true
					// })

				} else {
					inputValue++;
					this.inputValue = inputValue
					this.isDesc = false
					
					// this.setData({
					// 	inputValue,
					// 	isDesc: false
					// })

				}
				//发送数量给父组件
				this.$emit("sendNumber", inputValue);

			},
			//输入框输入操作
			handleInput(e) {
				let thisVal = e.detail.value;
				let {
					isDesc,
					isPlus,
					inputValue,
					maxNumber
				} = this;
				thisVal = Math.ceil(thisVal);
				if (thisVal < 2) {
					uni.showToast({
						title: '最少数值为1',
						icon: 'none',
						duration: 2000
					});
					this.inputValue = 1;
					this.isDesc = true;
					this.isPlus = false;
					// this.setData({
					// 	inputValue: 1,
					// 	isDesc: true,
					// 	isPlus: false
					// })

				} else if (thisVal > maxNumber) {
					uni.showToast({
						title: '已超出最大库存',
						icon: 'none',
						duration: 2000
					});
					this.inputValue = maxNumber;
					this.isDesc = false;
					this.isPlus = true;
				} else {
					//执行正常操作
					this.inputValue = thisVal;
					this.isDesc = false;
					this.isPlus = false;

				}
				//发送数量给父组件
				this.$emit("sendNumber", this.data.inputValue);
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* components/public/number/number.wxss */
	.num-container {
		width: 100%;
		height: 100%;
		display: flex;
	}

	.num-item {
		width: 33.33%;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #000;
		text-align: center;
	}

	.num-item-desc {
		border-right: #ddd 2rpx solid;
		font-size: 40rpx;
	}

	.num-item-plus {
		border-left: #ddd 2rpx solid;
		font-size: 40rpx;
	}

	.num-item.disable {
		background: #eee;
	}
</style>
