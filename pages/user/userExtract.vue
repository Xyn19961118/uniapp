<template>
	<!-- 申请提现 -->
	<view class="container">
		<view class="items">
			<view class="item">
				<view class="label">申请金额：</view>
				<view class="content withdraw-number">
					<input type="digit" class="withdraw-num" :value="moneys" focus placeholder="最多提现元" placeholder-style="color:#999"
					 @blur="checkMoney" />
				</view>
			</view>
		</view>

		<view class="tips">本次代缴个人所得税约为：<view class="red">0.00</view> 元</view>

		<view class="items">
			<view class="item">
				<view class="label">扣税方式：</view>
				<view class="content ">
					<view class="select">
						<view class="select-icon">
							<vRadio :isSelect="radioSelect"></vRadio>
						</view>
						<view class="select-txt">商城代扣</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tax-tips">价真栈商城帮您代缴个人所得税</view>

		<view class="items">
			<view class="item">
				<view class="label">银行卡号：</view>
				<view class="content withdraw-number">
					<input type="text" class="withdraw-card" :value="cardNumber" placeholder="请输入提现的银行卡号" @input="testCard"
					 @blur="blurCard" placeholder-style="color:#999" maxlength="23" />
				</view>
			</view>

			<view class="item" v-if="cardShow">
				<view class="label">发行卡：</view>
				<view class="content withdraw-number card-type">
					{{cardType}}
				</view>
			</view>

			<view class="item">
				<view class="label">开户支行：</view>
				<view class="content withdraw-number">
					<input type="text" class="withdraw-card" :value="subName" placeholder="请填写银行卡开户支行" placeholder-style="color:#999"
					 @input="changeSubName" />
				</view>
			</view>
		</view>

		<view class="items">
			<view class="item">
				<view class="label">姓名：</view>
				<view class="content withdraw-number">
					<input type="text" class="withdraw-card" :value="idCardName" placeholder="请填写您的真实姓名" placeholder-style="color:#999"
					 maxlength="5" @input="changeIdCardName" />
				</view>
				<!-- 如果身份证已经上传 -->
				<!-- <view class="content withdraw-number card-type">
	        真厉害
	      </view> -->
				<!-- 如果身份证已经上传 -->
			</view>

			<view class="item">
				<view class="label">身份证号：</view>
				<view class="content withdraw-number">
					<input type="text" class="withdraw-card" :value="idCardVal" placeholder="请填写您的身份证号" placeholder-style="color:#999"
					 maxlength="18" @input="changeIdCard" />
				</view>
				<!-- 如果身份证已经上传 -->
				<!-- <view class="content withdraw-number card-type">
	        真厉害
	      </view> -->
				<!-- 如果身份证已经上传 -->
			</view>
		</view>

		<view class="upload" v-if="info.id_card == false">
			<view class="upload-title">拍摄以下类型照片用于认证</view>
			<view class="upload-imgs">
				<view class="upload-pic">
					<image class="upload-img" src="sfzImg01==''?'./images/sfz01.png':sfzImg01" @tap="uploadPic01" />
				</view>
				<view class="upload-pic">
					<image class="upload-img" src="sfzImg02==''?'./images/sfz02.png':sfzImg02" @tap="uploadPic02" />
				</view>
			</view>
		</view>

		<view class="submit" @tap="submitInfo">提交</view>


	</view>

</template>

<script>
	import {
		bankCardAttribution
	} from '@/utils/card';
	import {
		UserModel
	} from '@/model/userModels';
	const UserModels = new UserModel();
	
	import vRadio from "@/components/common/radio.vue";
	export default {
		components:{
			vRadio
		},
		data() {
			return {
				cardNumber: '', //银行卡号
				cardType: '', //银行卡类型
				cardShow: false, //是否显示发行卡
				sfzImg01: "", //身份证正面
				sfzImg02: "", //身份证反面
				money: 0,
				idCard: 0,
				idCardName: '',
				subName: '',
				moneys: '',
				idCardVal: "",
				radioSelect: 1
			};
		},
		onLoad(e) {
			let info = uni.getStorageSync('userExtract');
			// this.setData({
			this.money = e.money,
				this.info = info,
				this.cardNumber = info.bank_num,
				this.cardType = info.bank_name,
				this.sfzImg01 = info.face_card,
				this.sfzImg02 = info.back_card,
				this.idCard = info.id_card,
				this.idCardVal = info.id_card,
				this.idCardName = info.real_name,
				this.subName = info.sub_name,
				this.cardShow = info.bank_num ? true : false
			// })
		},

		methods: {
			// 验证金额
			checkMoney(e) {
				let money = this.money
				if (e.detail.value > money) {
					uni.showToast({
						title: `提现不能大于${money}`,
						icon: 'none',
						duration: 1500,
						mask: false,
						success: (res) => {

							// this.setData({
							this.moneys = money
							// })
							return false
						}
					});
				} else {

					// this.setData({
					this.moneys = e.detail.value
					// })
				}
			},
			//验证银行卡号
			testCard(e) {
				let cardVal = e.detail.value;
				let cardNumber = cardVal.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ")
				if (cardVal == false) {
					// this.setData({
					this.subName = '',
						this.cardType = ''
					// })
				}

				// this.setData({
				this.cardNumber = cardNumber
				// })
			},
			blurCard(e) {
				//判断发行卡
				let cardVal = e.detail.value;
				cardVal = cardVal.replace(/\s*/g, "");
				if (cardVal.length > 14) {
					let cards = bankCardAttribution(cardVal);
					let cardType = `${cards.bankName}/${cards.cardTypeName}`;
					// this.setData({
					this.cardType = cardType,
						this.cardShow = true
					// })
				}
			},
			//上传身份证正面
			uploadPic01(e) {
				let _this = this;
				// console.log(e)
				wx.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// tempFilePath可以作为img标签的src属性显示图片
						const tempFilePaths = res.tempFilePaths;
						UserModels.uploadFile('user/updateHeadImg', tempFilePaths[0], 2, (res) => {
							// _this.setData({
							_this.sfzImg01 = res.imgUrl
							// })
						});

					}
				})
			},
			//上传身份证反面
			uploadPic02(e) {
				let _this = this;
				wx.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// tempFilePath可以作为img标签的src属性显示图片
						const tempFilePaths = res.tempFilePaths;
						UserModels.uploadFile('user/updateHeadImg', tempFilePaths[0], 2, (res) => {
							// _this.setData({
							_this.sfzImg02 = res.imgUrl
							// })
						});
					}
				})
			},

			changeIdCard(e) {
				// this.setData({
				this.idCardVal = e.detail.value
				// })
			},
			changeIdCardName(e) {
				// this.setData({
				this.idCardName=e.detail.value
				// })
			},
			changeSubName(e) {
				// this.setData({
				this.subName = e.detail.value
				// })
			},

			submitInfo() {
				let {
					idCardVal,
					idCardName,
					sfzImg01,
					sfzImg02,
					cardType,
					moneys,
					subName,
					cardNumber
				} = this;
				let param = {
					cardNumber: cardNumber,
					bankName: cardType,
					money: moneys,
					subName: subName,
					faceCard: sfzImg01,
					backCard: sfzImg02,
					idCard: idCardVal,
					idName: idCardName,
				}
				console.log(param)
				UserModels.doUserExtract(param, (res) => {
					if (res.error != 0) {
						uni.showToast(res.errmsg)
					} else {
						uni.navigateBack({
							delta: 1
						});
					}
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.items {
		margin-top: 20rpx;
		background: #fff;
	}

	.item {
		padding: 16rpx 30rpx;
		border-bottom: #eee 2rpx solid;
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.label {
		color: #999;
		width: 140rpx;
		line-height: 40rpx;
	}

	.content {
		width: calc(100% - 140rpx);
	}

	.withdraw-number {
		display: flex;
		justify-content: flex-end;
	}

	.withdraw-num {
		text-align: right;
	}

	.tips {
		display: flex;
		font-size: 24rpx;
		margin: 10rpx 30rpx 0 30rpx;
	}

	.red {
		color: #f23;
	}

	.select-icon {
		width: 32rpx;
		height: 32rpx;
	}

	.select {
		display: flex;
		align-items: center;
		height: 40rpx;
	}

	.select-txt {
		margin-left: 8rpx;
	}

	.tax-tips {
		padding: 8rpx 30rpx 0 30rpx;
		font-size: 24rpx;
		color: #f23;
	}

	.withdraw-card {
		width: 100%;
		text-align: left;
	}

	.card-type {
		justify-content: flex-start;
	}

	.upload {
		padding: 20rpx 30rpx;
		background: #fff;
		margin-top: 20rpx;
	}

	.upload-imgs {
		margin-top: 20rpx;
		display: flex;
	}

	.upload-pic {
		width: 200rpx;
		height: 200rpx;
		margin-right: 20rpx;
		border: #ddd 2rpx solid;
	}

	.upload-img {
		width: 196rpx;
		height: 196rpx;
	}

	.submit {
		width: 660rpx;
		height: 80rpx;
		background: #f23;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		margin: 60rpx auto 0;
	}
</style>
