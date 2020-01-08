<template>
	<view class="shopcar-cont">
		<view class="shopcar-cont-select-wrap">
			<view class="shopcar-cont-select" @tap="changeStatus" :data-id="goods.rec_id">
				<vSelect :isSelect="goods.is_select"></vSelect>
			</view>
		</view>
		<view class="shopcar-cont-pic">
			<vPic :img="goods.goods_img"></vPic>
		</view>
		<view class="shopcar-cont-content">
			<view class="shopcar-cont-name">{{goods.goods_name}}</view>
			<view class="shopcar-cont-oth">
				<view class="shopcar-cont-price">￥{{goods.goods_price}}</view>
				<view class="shopcar-cont-number">x {{goods.goods_number}}</view>
			</view>
			<!-- 数量加减 -->
			<view class="shopcar-cont-handle" v-if="isOver">
				<view class="shopcar-cont-handele-number" @tap="getNumberId" :data-id="goods.rec_id">
					<vNumber @sendNumber="getNumber" :maxNumber="goods.goods.stock" :inputNumber="goods.goods_number"></vNumber>
				</view>
			</view>
		</view>
		<view class="shopcar-cont-handle-detele" v-if="isOver" :data-id="goods.rec_id" @tap="delGoods">
			删除
		</view>
	</view>
</template>

<script>
	import vPic from "../common/productPic.vue";
	import vNumber from "../common/number.vue";
	import vSelect from "../common/select.vue";

	export default {
		components: {
			vNumber,
			vPic,
			vSelect
		},
		props: {
			isOver: Boolean,
			goods: Object
		},
		methods: {
			getNumber(e) {
				// console.log(e)
				// let id = e.currentTarget.dataset.id;
				// console.log(id)
				let number = e;
				this.$emit('getNumber', {
					id: id
				})
			},
			//点击select框
			changeStatus(e) {
				// console.log(e)
				this.$emit("changeStatus", e.currentTarget.dataset.id)
			},
			delGoods(e) {
				let id = e.currentTarget.dataset.id
				uni.showModal({
					content: '是否删除？',
					success: (result) => {
						if (result.confirm) {
							this.$emit('delGoods', id);
						}
					}
				});
			}
		},
		created() {
			console.log(this.goods)
		}
	}
</script>

<style lang="scss" scoped>
	.shopcar-cont {
		background: #fff;
		width: 100%;
		padding: 20rpx 26rpx;
		display: flex;
		box-sizing: border-box;
		position: relative;
	}

	.shopcar-cont-select-wrap {
		width: 60upx;
		height: 172upx;
		display: flex;
		align-items: center;
	}

	.shopcar-cont-select {
		width: 36upx;
		height: 36upx;

		.select-img {
			width: 36upx;
			height: 36upx;
		}
	}

	.shopcar-cont-pic {
		width: 172upx;
		height: 172upx;
		border: #eee 2upx solid;
	}

	.shopcar-cont-content {
		width: 440upx;
		height: 172upx;
		margin-left: 20upx;
		position: relative;
	}

	.shopcar-cont-name {
		color: #333;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.shopcar-cont-oth {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
	}

	.shopcar-cont-price {
		font-size: 32upx;
		color: #f23;
	}

	.shopcar-cont-number {
		margin-left: auto;
		font-size: 32upx;
	}

	.shopcar-cont-handle {
		position: absolute;
		left: 0;
		top: 0;
		background: #fff;
		z-index: 2;
		width: 100%;
		height: 100%;
	}

	.shopcar-cont-handele-number {
		width: 200upx;
		height: 48upx;
		border: #eee 2upx solid;
		border-radius: 8upx;
		overflow: hidden;
		margin-top: 8upx;
	}

	.shopcar-cont-handle-detele {
		position: absolute;
		height: 100%;
		width: 100upx;
		right: 0;
		top: 0;
		background: #f23;
		color: #fff;
		z-index: 3;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24upx;
	}
</style>
