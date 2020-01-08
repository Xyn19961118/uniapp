<template>
	<view class="contrast-item">
		<image class="contrast-item-pic" :src="conrastObj.img_show" lazy-load />
		<view class="contrast-item-info">
			<view class="contrast-item-name">{{conrastObj.shop_name}}</view>
			<view class="contrast-item-tags">
				<block v-for="(item, index) in conrastObj.discount " :key="index">
					<view class="contrast-item-tag" :class="item=='运费券'?'item-tag-bc':''">{{item}}</view>
				</block>
			</view>
		</view>
		<view class="contrast-item-price">
			<view class="price-number">￥{{conrastObj.new_shop_price}}</view>
			<view class="price-buy" v-if="thisIndex == 0" @click="selectGoods">立即购买</view>
		</view>

		<navigator class="price-gotobuy" url=""
		 hover-class="navigator-hover">
			进店购买
		</navigator>
	</view>

</template>

<script>
	export default {
		props:{
			conrastObj: Object,
			thisIndex: Number
		},
		methods:{
			//升起规格
			selectGoods(){
				this.$emit("selectGoods");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contrast-item{
	  margin-bottom: 20upx;
	  background: #fff;
	  padding: 20upx 30upx;
	  box-shadow: 0 0 10upx #eee;
	  display: flex;
	  align-items: center;
	}
	.contrast-item-pic{
	  width: 96upx;
	  height: 96upx;
	  border: #eee 2upx solid;
	  border-radius: 8upx;
	  margin-right: 16upx;
	}
	.contrast-item-info{
	  width: 240upx;
	  display: flex;
	  align-items: top;
	  height: 96upx;
	  flex-wrap: wrap;
	}
	.contrast-item-name{
	  width: 240upx;
	  height: 42upx;
	  line-height: 42upx;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  color: #000;
	}
	.contrast-item-tags{
	  margin-top: 8upx;
	  width: 100%;
	  display: flex;
	}
	.contrast-item-tag{
	  width: 88upx;
	  height: 40upx;
	  background: #f14754;
	  color: #fff;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  border-radius: 4upx;
	  margin-right: 10upx;
	  font-size: 24upx;
	}
	.contrast-item-tag-bc{
	  background: #e28d22;
	}
	.contrast-item-price{
	  margin-left: auto;
	}
	.price-number{
	  font-size: 32upx;
	  color: #f23;
	  font-weight: bold;
	}
	.price-buy{
	  width: 140upx;
	  height: 40upx;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  background: #fb5f6b;
	  color: #fff;
	  font-size: 24upx;
	  font-weight: bold;
	  margin-top: 4upx;
	}
	.price-gotobuy{
	  width: 120upx;
	  height: 44upx;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  margin-left: auto;
	  font-size: 24upx;
	  border: #f23 2upx solid;
	  color: #f23;
	  border-radius: 4upx;
	}
</style>
