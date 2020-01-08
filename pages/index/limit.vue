<template>
	<view class="contaiber">

		<view class="top">
			<view class="top-o">
				<view class="top-title">今日限时购</view>
				<view class="top-time">仅剩 {{lastTime}}</view>
			</view>

			<div class="top-radius"></div>
		</view>

		<list class="list">
			<cell v-for="item in list" :key="item.goods_id">
				<LimitItem :item="item" @addShopCar="addShopCar" />
			</cell>
		</list>
		
	</view>
</template>

<script>
	import {
		IndexModel
	} from "../../model/IndexModels.js";
	const IndexModels = new IndexModel();

	import LimitItem from '../../components/common/limit.vue';
	export default {
		components: {
			LimitItem
		},
		data() {
			return {
				list: [],
				lastTime: ""
			};
		},
		created() {
			uni.showLoading({
				title:"加载数据中...",
				mask:true
			})
			IndexModels.getLimit(res => {
				// console.log(res.data)
				if(res){
					uni.hideLoading();
					let times = this.setTime(res.end_time);
					this.lastTime = times;
					this.list = res.data;
				}
				
			})
		},
		methods: {
			//加入购物车操作
			addShopCar(e){
				let { goodsId, shopId } = e;
				IndexModels.addShopCar({
					id: goodsId,
					shopid: shopId
				},res=>{
					uni.showToast({
						icon:"none",
						title:"加入购物车成功"
					})
				})
				
			},
			
			//倒计时
			setTime(endTime) {
				setInterval(() => {
					let thisTime = new Date().getTime() / 1000;
					let overTime = endTime - thisTime;
					let day = Math.floor(overTime / (60 * 60 * 24));
					let hour = Math.floor((overTime - day * 24 * 60 * 60) / 3600);
					let minute = Math.floor((overTime - day * 24 * 60 * 60 - hour * 3600) / 60);
					let second = Math.floor(overTime - day * 24 * 60 * 60 - hour * 3600 - minute * 60);
					// console.log(day1,hour,minute,second)
					hour = this.iTwo(hour);
					minute = this.iTwo(minute);
					second = this.iTwo(second);
					let lastTime = `${day}天${hour}:${minute}:${second}`;
					this.lastTime = lastTime;
					// return lastTime;
				}, 1000)
			},
			//iTwo
			iTwo(num) {
				return num < 10 ? "0" + num : num
			},
		}
	}
</script>

<style lang="scss">
	.top {
		width: 750upx;
		height: 140upx;
		color: #fff;
		background: #e93340;
		position: relative;
		padding: 20upx 30upx;
		display: block;

		.top-o {
			display: flex;
			align-items: center;

			.top-title {
				text-align: center;
				font-size: 48upx;
				color: #fae54d;
			}

			.top-time {
				text-align: center;
				padding: 4upx 16upx;
				border-radius: 8upx;
				border: #fff 2upx solid;
				margin-left: auto;
			}
		}

		.top-radius {
			width: 750upx;
			height: 40upx;
			background: #fff;
			position: absolute;
			left: 0;
			bottom: -2rpx;
			border-top-left-radius: 24upx;
			border-top-right-radius: 24upx;
		}
	}
	.list {
		display: block;
		margin-top: -2upx;
	}
</style>
