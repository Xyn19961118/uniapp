<template>
	<view class="footer">
		<view @tap="gotoIndex" class="item">
			<image class="item-icon" src="http://m.prizemart.cn/mobile/images/goods-footer-pic01.png" />
			<view class="item-txt">首页</view>
		</view>
		<button class="item button-item" hover-class="none">
			<image class="item-icon" src="http://m.prizemart.cn/mobile/images/goods-footer-pic02.png" />
			<view class="item-txt">客服</view>
		</button>
		<view class="item" v-if="isColl" @tap="goodsCollect">
			<image class="item-icon" :src="isCollect?collActive:coll" />
			<view class="item-txt">收藏</view>
		</view>
		<view class="item" v-if="!isColl" @tap="showChangeRate">
			<image class="item-icon" src="http://m.prizemart.cn/mobile/images/goods-footer-pic03.png" />
			<view class="item-txt">修改</view>
		</view>
		<view class="btn add-shopcar" @tap="addCart">加入购物车</view>
		<view class="btn buy" @tap="buyGoods">立即购买</view>
	</view>
</template>

<script>
	export default {
		props:{
			isCollect: Boolean,
		},
		data() {
			return {
				isColl: true,
				coll:"http://m.prizemart.cn/mobile/images/goods-footer-pic03.png",
				collActive:"http://m.prizemart.cn/mobile/images/goods-footer-pic03-active.png",
			}
		},
		methods: {
			//收藏
			goodsCollect() {
				this.$emit("goodsCollect");
			},
			//修改
			showChangeRate() {
				console.log("这是修改")
			},
			//加入购物车
			addCart() {
				this.$emit("addCart");
			},
			//立即购买
			buyGoods() {
				this.$emit("buyGoods");
			},
			gotoIndex(e){
				this.$emit("gotoIndex");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.footer {
		display: flex;
	}

	.item {
		width: 96upx;
		height: 146upx;
		/* display: flex; */
		/* flex-wrap: wrap;
  align-content: center;
  justify-content: center; */
		padding: 20upx 0;
	}

	.item-icon {
		width: 40upx;
		height: 40upx;
		margin: auto;
		display: block;
	}

	.item-txt {
		width: 100%;
		text-align: center;
		font-size: 24upx;
		margin-top: 8upx;
		color: #a4a4a4;
	}

	.btn {
		width: 200upx;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20upx;
		box-sizing: border-box;
		margin-left: 20upx;
		font-weight: bold;
		border-radius: 40upx;
	}

	.add-shopcar {
		border: #252525 2upx solid;
		color: #252525;
	}

	.buy {
		border: #fc5d5a 2upx solid;
		background: #fc5d5a;
		color: #fff;
		box-shadow: 0 6upx 16upx rgba(0, 0, 0, .25);
	}

	.button-item {
		padding: 20upx 0;
		background: none;
	}

	.button-item::after {
		border: none;
	}

	.button-item .item-txt {
		margin-top: -6upx;
	}
</style>
