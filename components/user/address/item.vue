<template>
	<!-- 地址列表 -->
	<view class="ad-container" @tap="selectId">
		<view class="ad-address-top">
			<view class="ad-address-item">姓名：{{item.consignee}}</view>
			<view class="ad-address-item">电话：{{item.mobile}}</view>
		</view>
		<view class="ad-address-content">地址：{{item.address}}</view>
		<view class="ad-handle">
			<view class="ad-handle-setting">
				<view class="ad-select" @tap.stop="changAddr" :data-id="item.address_id">
					<vSelect :isSelect="item.defaultAddr"></vSelect>
				</view>
				设为默认地址
			</view>
			<view class="ad-handle-btns">
				<view class="ad-handle-change" :data-id="item.address_id" @tap.stop="updateAddr">
					编辑
				</view>
				<view class="ad-handle-delete" :data-id="item.address_id" @tap.stop="delAddr">
					删除
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import vSelect from "@/components/common/select.vue";
	export default {
		components: {
			vSelect
		},
		props: {
			item: Object
		},
		methods: {
			changAddr: function(e) {
				this.$emit('changAddr', e.currentTarget.dataset);
			},
			updateAddr: function(e) {
				let id = e.currentTarget.dataset.id
				uni.navigateTo({
					url: `/pages/user/addAddress?id=${id}`,
				});
			},
			delAddr: function(e) {
				this.$emit('delAddr', e.currentTarget.dataset.id);
			},
			selectId() {
				this.$emit('selectId', this.item.address_id);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ad-container {
		padding: 20rpx 30rpx;
		background: #fff;
		border-top: #ddd 2rpx solid;
		border-bottom: #ddd 2rpx solid;
	}

	.ad-container {
		font-size: 24rpx;
		line-height: 1.6;
	}

	.ad-address-top {
		display: flex;
	}

	.ad-address-item {
		margin-right: 50rpx;
	}

	.ad-address-content {
		margin-top: 8rpx;
		color: #999;
	}

	.ad-handle {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
		font-size: 24rpx;
	}

	.ad-handle-setting {
		display: flex;
		align-items: center;
	}

	.ad-select {
		width: 32rpx;
		height: 32rpx;
		margin-right: 12rpx;
	}

	.ad-handle-btns {
		margin-left: auto;
		display: flex;
	}

	.ad-handle-change {
		border: #f23 2rpx solid;
		width: 110rpx;
		height: 44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #f23;
		border-radius: 4rpx;
	}

	.ad-handle-delete {
		border: #ddd 2rpx solid;
		width: 110rpx;
		height: 44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #666;
		border-radius: 4rpx;
		margin-left: 20rpx;
	}
</style>
