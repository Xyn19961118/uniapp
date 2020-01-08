<template>
	<view class="present">
		 <view class="present-item" v-if="country !== ''">
		    <view class="present-label">原产地：</view>
		    <view class="present-cont">{{country}}</view>
		  </view>
		  <view class="present-item" v-if="component !== ''">
		    <view class="present-label">原料与配料：</view>
		    <view class="present-cont">{{component}}</view>
		  </view>
		  <view class="present-item" v-if="food_life_time !== ''">
		    <view class="present-label">食用期限至:</view>
		    <view class="present-cont">{{food_life_time}}</view>
		  </view>
		  <view class="present-item" v-if="life_time !== ''">
		    <view class="present-label">保质期：</view>
		    <view class="present-cont">{{life_time}}</view>
		  </view>
		  <view class="present-item" v-if="product_type !== ''">
		    <view class="present-label">产品类型：</view>
		    <view class="present-cont">{{product_type}}</view>
		  </view>
		  <view class="present-item" v-if="specifications !== ''">
		    <view class="present-label">规格：</view>
		    <view class="present-cont">{{specifications}}</view>
		  </view>
		  <view class="present-item" v-if="box_number !== ''">
		    <view class="present-label">包装种类：</view>
		    <view class="present-cont">{{box_number}}</view>
		  </view>
		  <view class="present-item" v-if="type_number !== ''">
		    <view class="present-label">进口货号：</view>
		    <view class="present-cont">{{type_number}}</view>
		  </view>
	</view>
</template>

<script>
	export default {
		props: {
			component: String, //原料及配料
			life_time: String, //保质期
			type_number: String, //进口货号
			product_type: String, //产品类型
			specifications: String, //规格
			box_number: String, //包装种类
			food_life_time: String, //食用期限至
			country: String //原产地
		}
	}
</script>

<style lang="scss" scoped>
	.present {
		padding: 0 30upx;

		.present-item {
			padding: 20upx 0;
			border-bottom: #dcdcdc 2upx solid;
			line-height: 44upx;
			font-size: 26upx;
			display: flex;
			align-items: top;

			&:last-child {
				border-bottom: none;
			}

			.present-label {
				width: 220upx;
				font-size: 24upx;
				color: #5d5d5d;
			}

			.present-cont {
				width: 440upx;
				font-size: 24upx;
				color: #000;
			}
		}
	}
</style>
