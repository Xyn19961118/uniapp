<template>
	<!-- 地址列表 -->
	<view class="container">
		<view class="items">
			<view class="item" v-for="item in list" :key="item.address_id">
				<vItem :item="item" @changAddr="changAddr" @delAddr="delAddr" @selectId="selectId"></vItem>
			</view>
		</view>
		<navigator class="address-add" url="/pages/user/addAddress?id=0" hover-class="navigator-hover">
			新建地址
		</navigator>
	</view>
</template>

<script>
	import {
		UserModel
	} from '@/model/userModels';
	const UserModels = new UserModel();
	
	import vItem from "@/components/user/address/item.vue";
	export default {
		components:{
			vItem
		},
		data() {
			return {
				list: [],
				callback: null
			};
		},
		onLoad: function(e) {
			let callback = e.param || null;
			this.callback = callback;
			console.log(this.callback)
			//pages/submitOrders/submitOrders
			UserModels.addressList((res) => {
				this.list = res
			})
		},
		methods: {
			//如果从订单过来
			selectId(e) {
				let id = e;
				if (this.callback !== null) {
					uni.navigateTo({
						url: '/pages/submitOrders/submitOrders?id=' + id
					});

				}
			},
 
			changAddr: function(e) {
				let id = e.id
				// 修改默认
				UserModels.defaultAddr(id);

				let list = this.list
				for (let index = 0; index < list.length; index++) {
					const element = list[index];
					element.defaultAddr = false
					if (element.address_id == id) {
						element.defaultAddr = true
					}
				}
				this.list = list
			},

			delAddr: function(e) {
				let id = e
				let that = this
				let list = that.list
				uni.showModal({
					title: '提示',
					content: '确定删除这个地址吗？',
					success(res) {
						if (res.confirm) {
							for (let index = 0; index < list.length; index++) {
								const element = list[index];
								element.defaultAddr = false
								if (element.address_id == id) {
									list.splice(index, 1);
								}
							}
							this.list = list;
							UserModels.delAddr(id)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding-bottom: 100rpx;
	}

	.items {
		margin-top: 20rpx;
	}

	.item {
		margin-bottom: 20rpx;
	}

	.address-add {
		background: #f23;
		color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
	}
</style>
