<template>
	<!-- 商品管理每一项 -->
	<view class="goo-container"  :class="item.isShow?'aa':'bb'">
		<view class="goo-top" @tap.stop="handleShow" :data-index="index">
			<view class="goo-item goo-item01">{{item.goods_name}}</view>
			<view class="goo-item goo-item02">￥{{item.shop_price}}</view>
			<view class="goo-item goo-item03">￥{{item.supply_price}}</view>
			<view class="goo-item goo-item04">￥<view class="goo-item-price">{{item.new_shop_price}}</view>
			</view>
			<view class="goo-item goo-item05">
				<view class="goo-handle-change" @tap.stop="handelChange" :data-id="item.goods_id" :data-val="item.shop_price">修改</view>
			</view>
		</view>
		 <!-- :class="item.isShow?'goo-show':''" -->
		<view class="goo-content-wrap" :class="item.is_show ? 'goo-show' : '' ">
			<view class="goo-content">
				<view class="goo-info">
					<view class="goo-pic">
						<vPic :img="item.goods_img"></vPic>
					</view>
					<view class="goo-cont">
						<view class="goo-cont-name">{{item.goods_name}}</view>
						<view class="goo-cont-items">
							<view class="goo-cont-item">品牌：{{item.brand_name}}</view>
							<view class="goo-cont-item">货号：{{item.goods_sn}}</view>
							<view class="goo-cont-item">规格：{{item.goods_rate}}</view>
							<view class="goo-cont-item">原产地：{{item.country_name}}</view>
							<view class="goo-cont-item">保质期：{{item.life_time}}</view>
						</view>
						<view class="goo-cont-oth">本产品折扣为：<view class="goo-red">{{item.goods_rate}}%</view>,盈利：<view class="goo-red">¥{{item.profit_price}}</view>
						</view>
					</view>
				</view>
				<view class="goo-btns">
					<view class="goo-btn" @tap="changeTop" :data-id="item.goods_id">{{item.shopGoodsStatus.is_top ? '已置顶' : '置顶'}}</view>
					<view class="goo-btn" @tap="changeHots" :data-id="item.goods_id">{{item.shopGoodsStatus.is_hots ? '已推荐' : '推荐'}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import vPic from "@/components/common/productPic.vue";
	export default {
		components: {
			vPic
		},
		props: {
			item: Object,
			index: Number //用来储存点击的index
		},
		
		data(){
			return{
				// isShow: false
			}
		},
		
		methods: {
			//点击展开
			handleShow(e) {
				// console.log()
				// this.isShow = !this.isShow
				this.$emit("setShow", e.currentTarget.dataset.index);
			},
			handelChange(e) {
				this.$emit("setInfo", e.currentTarget.dataset)
			},
			changeTop(e) {
				//  console.log(e.currentTarget.dataset.id)
				this.$emit("changeTop", e.currentTarget.dataset.id)
			},
			changeHots(e) {
				// console.log(e.currentTarget.dataset.id)
				this.$emit("changeHots", e.currentTarget.dataset.id)
			},
		},
		created() {
			this.isShow = this.item.isShow;
		}
	}
</script>

<style lang="scss" scoped>
	/* components/user/goodsManage/item/item.wxss */
	.goo-top {
		display: flex;
		width: 100%;
		height: 88rpx;
		border-bottom: #eee 2rpx solid;
		align-items: center;
	}

	.goo-item {
		border-right: #eee 2rpx solid;
		font-size: 24rpx;
		height: 88rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.goo-item01 {
		width: 254rpx;
		padding: 0 12rpx;
	}

	.goo-item02 {
		width: 120rpx;
		color: #f23;
		font-weight: bold;
	}

	.goo-item03 {
		width: 120rpx;
	}

	.goo-item04 {
		width: 150rpx;
		display: flex;
	}

	.goo-item05 {
		width: 106rpx;
	}

	.goo-item-price {
		width: 96rpx;
		height: 48rpx;
		line-height: 48rpx;
		color: #f23;
		background: #ededed;
		padding: 0 10rpx;
	}

	.goo-handle-change {
		width: 80rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		background: #f23;
		color: #fff;
		border-radius: 4rpx;
	}

	.goo-goo-content {
		padding: 20rpx;
		border-bottom: #eee 2rpx solid;
	}

	.goo-info {
		display: flex;
	}

	.goo-pic {
		width: 160rpx;
		height: 160rpx;
		border: #eee 2rpx solid;
		margin-right: 20rpx;
	}

	.goo-cont {
		width: calc(100% - 180rpx);
	}

	.goo-cont-items {
		font-size: 24rpx;
		color: #999;
		display: flex;
		flex-wrap: wrap;
	}

	.goo-cont-items {
		margin-top: 8rpx;
	}

	.goo-cont-item {
		margin-right: 60rpx;
		line-height: 1.5;
	}

	.goo-cont-oth {
		display: flex;
		margin-top: 8rpx;
	}

	.goo-red {
		color: #f23;
		font-weight: bold;
	}

	.goo-btns {
		margin-top: 8rpx;
		display: flex;
	}

	.goo-btn {
		width: 160rpx;
		height: 64rpx;
		background: #f23;
		color: #fff;
		text-align: center;
		line-height: 64rpx;
		border-radius: 8rpx;
		margin-right: 12rpx;
	}

	.goo-content-wrap {
		height: 0;
		transition: .4s;
		overflow: hidden;

	}

	.goo-show {
		height: auto;
	}
</style>
