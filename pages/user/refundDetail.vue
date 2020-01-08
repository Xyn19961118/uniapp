<template>
	<!-- 退款详情页 -->
	<view class="container">
		<view class="items">
			<view class="item" v-for="(item, index) in dataObj.order_goods" :key="index">
				<vItem :goodsItem="item"></vItem>
			</view>
		</view>

		<view class="content">
			<view class="cont">
				<view class="label">退款原因：</view>
				<view class="picker">
					<picker @change="changePicker" :value="pickerIndex" :range="pickerList">
						<view class="picker-item">
							{{pickerList[pickerIndex]}}
						</view>
					</picker>
					<image class="print" src="http://m.prizemart.cn/mobile/images/next.png" />
				</view>
			</view>
		</view>

		<view class="content">
			<view class="cont">
				<view class="label">退款方式：</view>
				<view class="picker">
					<picker @change="changeType" :value="pickerIndex" :range="pickerType">
						<view class="picker-item">
							{{pickerType[pickerChangeIndex]}}
						</view>
					</picker>
					<image class="print" src="http://m.prizemart.cn/mobile/images/next.png" />
				</view>
			</view>
		</view>

		<view class="content">
			<view class="cont">
				<view class="label">退款金额：</view>
				<view class="cont-content">
					<view class="cont-txt">￥{{refundPrice}}</view>
				</view>
			</view>
			<view class="cont" v-if="isShowFee == 1">
				<view class="label">订单运费：</view>
				<view class="cont-content">
					<input type="digit" value="" placeholder="选填" placeholder-style="color:#999" @input="changeFee" />
				</view>
			</view>
			<view class="cont">
				<view class="label">退款说明：</view>
				<view class="cont-content">
					<input type="text" value="" placeholder="选填" placeholder-style="color:#999" @input="changeVal" />
				</view>
			</view>
		</view>

		<view class="upload">
			<view class="label">上传凭证</view>
			<view class="upload-imgs">
				<view class="image-items">
					<view class="image-item" v-for="(item, index) in imageArrayBd" :key="index">
						<image class="image" :src="item" mode="aspectFill" />
						<image class="image-close" src="../../static/close.png" @tap="deteleImage" :data-index="index" />
					</view>
					<view class="image-add" @tap="getImage" v-if="imageArrayBd.length<3">
						<image class="image-add-i" src="../../static/add-image.png" />
					</view>
				</view>

			</view>
		</view>

		<view class="submit" @tap="submitForm">提交</view>

	</view>
</template>

<script>
	import {
		AfterModel
	} from "@/model/AfterModel";
	import {
		config
	} from "@/utils/config";
	const AfterModels = new AfterModel();

	import vItem from "@/components/user/common/item.vue";
	export default {
		components: {
			vItem
		},
		data() {
			return {
				dataObj: {},
				pickerList: ["拍错/多拍/不喜欢", "包装破损", "商品成分描述不对", "口感不好", "收到商品少件/破损等", "三无产品", "商品腐烂/变质/有异味", "卖家发错货", "其他"],
				pickerType: ["退货/退款", "换货", "退款(无需退货)"],
				pickerIndex: 0,
				pickerChangeIndex: 0,
				cause: "拍错/多拍/不喜欢",
				type: 1,
				imgArray: [], //储存图片地址
				imageArrayBd: [], //本地图片显示
				refundPrice: 0, // 退款价格
				isShowFee: 0, // 是否显示邮费
				refundFee: 0, // 退款邮费
				desc: '', // 退款说明
				id: 0,
				rec_ids: [],
			};
		},
		onLoad: function(e) {
			this.isShowFee = e.s;
			this.id = e.id;
			// this.setData({
			// 	isShowFee: e.s,
			// 	id: e.id,
			// })
			console.log(e)
			if (e.s == 1) {
				this.rec_ids = e.ids.split(',');
				// this.setData({
				// 	rec_ids: e.ids.split(',')
				// })
				AfterModels.selectGoods(e.id, e.ids.split(','), (res) => {
					this.dataObj = res;
					this.refundPrice = res.refund_price;
				})
			} else {
				AfterModels.refundGoods(e.id, (res) => {
					
					this.dataObj = res;
					
					console.log(this.dataObj)
					this.refundPrice = res.refund_price;
					// this.setData({
					// 	dataObj: res,
					// 	refundPrice: res.refund_price
					// })
				})
			}
		},

		methods: {
			changeVal(e) {
				this.desc = e.detail.value;
				// this.setData({
				// 	desc: e.detail.value
				// })
			},
			changeFee(e) {
				this.refundFee = e.detail.value;
				// this.setData({
				// 	refundFee: e.detail.value
				// })
			},

			makeParam(flag) {
				// ['id', 'cause', 'desc', 'type', 'money', 'imgs']
				let {
					cause,
					type,
					imgArray,
					refundPrice,
					refundFee,
					desc,
					id,
					rec_ids
				} = this
				if (flag == true) {
					return {
						id: id,
						cause: cause,
						desc: desc,
						type: type,
						imgs: imgArray,
						money: refundPrice,
						fee: refundFee,
						rec_ids: rec_ids
					}
				} else {
					return {
						id: id,
						cause: cause,
						desc: desc,
						type: type,
						imgs: imgArray,
						money: refundPrice
					}
				}

			},

			submitForm() {
				let flag = this.isShowFee
				let param = this.makeParam(flag)
				if (flag == true) {
					AfterModels.refundPart(param, (res) => {
						if (res.error != 0) {
							uni.showToast({
								title: res.errmsg,
								icon: 'none',
							})
						} else {
							//pages/user/afterDetail/afterDetail
							uni.redirectTo({
								url: `/pages/user/afterDetail?id=${res.id}`
							});
						}
					})
				} else {
					AfterModels.refundAll(param, (res) => {
						if (res.error != 0) {
							uni.showToast({
								title: res.errmsg,
								icon: 'none',
							})
						} else {
							uni.redirectTo({
								url: `/pages/user/afterDetail?id=${res.id}`
							});
						}
					})
				}
			},

			//选择退款原因
			changePicker(e) {
				// console.log()
				let pickerIndex = e.detail.value;
				let cause = this.pickerList
				this.pickerIndex = pickerIndex;
				this.cause = cause[pickerIndex]
				// this.setData({
				// 	pickerIndex,
				// 	cause: cause[pickerIndex]
				// })
			},
			//选择退款方式
			changeType(e) {
				// console.log()
				let pickerChangeIndex = e.detail.value;
				switch (pickerChangeIndex) {
					case '0':
						var type = 1
						break;
					case '1':
						var type = 2
						break;
					case '2':
						var type = 4
						break;
				}
				
				this.pickerChangeIndex = pickerChangeIndex;
				this.type = type;
				// this.setData({
				// 	pickerChangeIndex,
				// 	type: type
				// })
			},
			//添加图片
			getImage(e) {
				let {
					imgArray
				} = this;
				uni.chooseImage({
					count: 1,
					success: res => {
						// console.log()
						uni.showLoading({
							title: "上传图片中...",
							mask: true
						});
						let imgArr = res.tempFilePaths;
						//本地图片显示
						let imageArrayBd = this.imageArrayBd;
						imageArrayBd.push(imgArr[0]);
						this.imageArrayBd = imageArrayBd
						// this.setData({
						// 	imageArrayBd
						// })
						uni.hideLoading();
						uni.uploadFile({
							url: config.baseUrl + 'after/uploadImg',
							filePath: imgArr[0],
							name: 'image',
							formData: {
								type: 1
							},
							header: {
								'content-type': 'application/json',
								'app-key': config.appKey,
							},
							success: (res) => {
								if (res) {
									uni.hideLoading();
									imgArray.push(AfterModels.safe_replace(res.data));
									// this.setData({
									// 	imgArray
									// })
									this.imgArray =imgArray;
									console.log(imgArray)
								}
							}
						})
					}
				})
			},
			//删除图片
			deteleImage(e) {
				let index = e.currentTarget.dataset.index;
				let {
					imgArray,
					imageArrayBd
				} = this;
				imgArray.splice(index, 1);
				imageArrayBd.splice(index, 1);
				this.imgArray = imgArray;
				this.imageArrayBd = imageArrayBd;
				// this.setData({
				// 	imgArray,
				// 	imageArrayBd
				// })
				// console.log(imgArray)
			},

		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding-bottom: 80rpx;
	}

	.items {
		margin-top: 20rpx;
		background: #fff;
	}

	.item {
		border-bottom: #eee 2rpx solid;
	}

	.content {
		margin-top: 20rpx;
		background: #fff;
	}

	.cont {
		padding: 20rpx 30rpx;
		border-bottom: #eee 2rpx solid;
		display: flex;
		line-height: 40rpx;
		align-items: center;
	}

	.label {
		color: #333;
	}

	.picker {
		margin-left: auto;
		display: flex;
		align-items: center;

	}

	.print {
		width: 12rpx;
		height: 24rpx;
		margin-left: 10rpx;
	}

	.cont-content {
		width: calc(100% - 140rpx);
	}

	.cont-txt {
		color: #f23;
	}

	.upload {
		background: #fff;
		padding: 20rpx 30rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.image-items {
		display: flex;
	}

	.image-item {
		width: 144rpx;
		height: 144rpx;
		border: #eee 2rpx solid;
		position: relative;
		margin-right: 20rpx;
	}

	.image {
		width: 140rpx;
		height: 140rpx;
	}

	.image-close {
		position: absolute;
		width: 32rpx;
		height: 32rpx;
		right: -10rpx;
		top: -10rpx;
	}

	.image-add {
		width: 144rpx;
		height: 144rpx;
	}

	.image-add-i {
		width: 144rpx;
		height: 144rpx;
	}

	.upload-imgs {
		margin-top: 20rpx;
	}

	.submit {
		width: 100%;
		height: 80rpx;
		background: #f23;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 2;
	}
</style>
