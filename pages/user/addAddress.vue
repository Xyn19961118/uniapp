<template>
	<!--添加地址-->
	<view class="container">
		<view class="address-top">
			<view class="add-item">
				<view class="label">姓名：</view>
				<view class="add-item-content">
					<input class="add-item-name" type="text" :value="nameValue" placeholder="请输入您的姓名" placeholder-style="color:#999"
					 maxlength="8" @input="changeName" />
				</view>
			</view>
			<view class="add-item">
				<view class="label">联系电话：</view>
				<view class="add-item-content">
					<input class="add-item-name" type="number" :value="phoneValue" placeholder="请输入您的手机号码" placeholder-style="color:#999"
					 maxlength="11" @input="checkPhoneNum" />
				</view>
			</view>
		</view>

		<view class="address-top">
			<view class="add-item">
				<view class="label">归属地区：</view>
				<view class="add-item-content">
					<!-- <picker class="add-item-content" mode="multiSelector" value="{{multiIndex}}"  @change="setRegion" range="{{multiArray}}">
	          
	        </picker> -->
					<!-- {{cityArray}} -->
					<picker mode="multiSelector" :value="citysIndex" :range="cityArray" @change="citysChange" @columnchange="cityColumnChange">
						<view class="picker">
							{{cityArray[0][citysIndex[0]]}},{{cityArray[1][citysIndex[1]]}},{{cityArray[2][citysIndex[2]]}}
						</view>
					</picker>
				</view>
			</view>
			<view class="add-item add-item-just">
				<view class="label">详细地址：</view>
				<view class="add-item-content">
					<textarea placeholder="请输入您的详细地址" class="textarea" placeholder-style="color:#999" @input="changeTextarea" :value="textareaValue"></textarea>
				</view>
			</view>
		</view>

		<view class="address-top">
			<view class="add-item">
				<view class="label">设为默认地址</view>
				<view class="add-item-content">
					<switch :checked="switchValue ? true : false" @change="switch1Change" />
				</view>
			</view>
		</view>
		<button class="submit" @tap="submitForm">保存地址</button>
	</view>
</template>

<script>
	import {
		UserModel
	} from '@/model/userModels';
	const UserModels = new UserModel();
	export default {
		data() {
			return {
				allCityList: [],
				cityArray: [], //储存地址
				citysIndex: [0, 0, 0],
				cityId: [], //储存id
				selectCityId: [2, 52, 500], //储存选择的ID
				nameValue: '', //储存姓名
				phoneValue: "", //储存手机号
				textareaValue: "", //储存详细地址
				switchValue: true, //储存是否为默认地址 
				province: 2,
				city: 52,
				district: 500,
				id: 0,
				done: 0
			};
		},
		onLoad: function(e) {
			if (e.done) {
				this.orderId = e.orderid;
				this.shopId = e.shopid;
				this.done = 1;
				this.id = 0;

				// this.setData({
				// 	orderId: e.orderid,
				// 	shopId: e.shopid,
				// 	done: 1,
				// 	id: 0
				// })
				let id = 0;
			} else {
				let id = e.id;

				this.id = id;
				// this.setData({
				// 	id
				// });
			}
			let that = this;
			UserModels.getRegion((res) => {
				let allCityList = this.allCityList;
				allCityList = res;
				that.allCityList = allCityList
				that.cityArray = allCityList
				// that.setData({
				// 	allCityList ,
				// 	cityArray: allCityList
				// });
				//获取索引
				let id = this.id;
				if (id != false) {
					UserModels.getAddress(id, (res) => {
						console.log(res)
						let arr = [
							res.province, res.city, res.district
						];
						let citysIndex = that.getIndex(arr);
						that.nameValue = res.consignee;
						that.phoneValue = res.mobile;
						that.textareaValue = res.init_address;
						that.switchValue = res.defaultAddr;
						that.citysIndex = citysIndex;
						// that.setData({
						// 	nameValue: res.consignee,
						// 	phoneValue: res.mobile,
						// 	textareaValue: res.init_address,
						// 	switchValue: res.defaultAddr,
						// 	citysIndex
						// });
						UserModels.getRegion((res) => {

							let cityArray = [
								[],
								[],
								[],
							];
							let cityId = [
								[],
								[],
								[]
							];
							let {
								citysIndex,
								province,
								city,
								district
							} = this;
							// console.log(citysIndex)
							// let cityId = this.data.cityId;
							// console.log(this.data.citysIndex)
							res.forEach(item => {
								cityArray[0].push(item.name);
								cityId[0].push(item.id);

								province = cityId[0][citysIndex[0]];

							});
							res[citysIndex[0]]["son"].forEach(item => {
								cityArray[1].push(item.name);
								cityId[1].push(item.id);
								city = cityId[1][citysIndex[1]]

							});
							res[citysIndex[0]]["son"][citysIndex[1]]["son"].forEach(item => {
								cityArray[2].push(item.name);
								cityId[2].push(item.id);
								district = cityId[2][citysIndex[2]]

							});
							that.cityArray = cityArray;
							that.cityId = cityId;
							that.allCityList = res;
							that.province = province;
							that.city = city;
							that.district = district;
							// that.setData({
							// 	cityArray,
							// 	cityId,
							// 	allCityList: res,
							// 	province,
							// 	city,
							// 	district
							// });
						});

					});
				} else {
					let citysIndex = this.citysIndex;
					UserModels.getRegion((res) => {
						let cityArray = [
							[],
							[],
							[],
						];
						let cityId = [
							[],
							[],
							[]
						];
						res.forEach(item => {
							cityArray[0].push(item.name);
							cityId[0].push(item.id);
						});
						res[citysIndex[0]]["son"].forEach(item => {
							cityArray[1].push(item.name);
							cityId[1].push(item.id);
						});
						res[citysIndex[0]]["son"][citysIndex[1]]["son"].forEach(item => {
							cityArray[2].push(item.name);
							cityId[2].push(item.id);
						});
						that.cityArray = cityArray;
						that.cityId = cityId;
						that.allCityList = res;
						// that.setData({
						// 	cityArray,
						// 	cityId,
						// 	allCityList: res
						// });
					})
				};

			});
		},

		methods: {
			//验证姓名
			changeName(e) {
				this.nameValue = e.detail.value;
				// this.setData({
				// 	nameValue: e.detail.value
				// })
			},
			//验证手机号
			checkPhoneNum(e) {
				// console.log(e)
				let phoneNumber = e.detail.value;
				if (phoneNumber.length == 11) {
					let str = /^1\d{10}$/;

					if (str.test(phoneNumber)) {
						this.phoneValue = phoneNumber
						// this.setData({
						// 	phoneValue = : phoneNumber
						// })
					} else {
						uni.showToast({
							title: '手机号不正确',
							icon: "none"
						})
						phoneNumber = "";
						this.phoneValue = phoneNumber;
						// this.setData({
						// 	phoneValue = : phoneNumber
						// })
					}
				}

			},
			//省市区数据改变
			citysChange(e) {
				console.log(e)
				this.citysIndex = e.detail.value
				// this.setData({
				// 	citysIndex = : e.detail.value
				// })
			},


			//省市区数据选择滑动
			cityColumnChange(e) {
				let column = e.detail.column; //当前滑动的列数
				// console.log(e)
				let index = e.detail.value; //滑动的index
				let {
					allCityList,
					cityId,
					cityArray,
					citysIndex,
					province,
					city,
					district
				} = this;
				let arrlist01 = []; //储存选择的市
				let arrlist02 = []; //储存选择的区
				switch (column) {
					case 0:
						// console.log(allCityList[index].son);
						// console.log(citysIndex)
						allCityList[index].son.forEach(item => {
							arrlist01.push(item.name);
						})
						allCityList[index].son[0].son.forEach(item => {
							arrlist02.push(item.name);
						})
						citysIndex[0] = index;
						citysIndex[1] = 0;
						citysIndex[2] = 0;
						cityArray[1] = arrlist01;
						cityArray[2] = arrlist02;
						this.cityArray = cityArray;
						this.citysIndex = citysIndex;
						// this.setData({
						// 	cityArray ,
						// 	citysIndex
						// })
						break;
					case 1:
						allCityList[citysIndex[0]].son[index].son.forEach(item => {
							if (item) {
								arrlist02.push(item.name)
							}
						})
						cityArray[2] = arrlist02;
						citysIndex[1] = index;
						citysIndex[2] = 0;

						this.cityArray = cityArray;
						this.citysIndex = citysIndex;
						// this.setData({
						// 	cityArray,
						// 	citysIndex
						// })

						break;
					case 2:
						citysIndex[2] = index;
						this.citysIndex = citysIndex;
						// this.setData({
						// 	citysIndex
						// })
						break;
				}
				// console.log(allCityList[citysIndex[0]])
				//
				province = allCityList[citysIndex[0]].id;
				city = allCityList[citysIndex[0]].son[citysIndex[1]].id;
				if (allCityList[citysIndex[0]].son[citysIndex[1]].son[citysIndex[2]]) {
					district = allCityList[citysIndex[0]].son[citysIndex[1]].son[citysIndex[2]].id;
				} else {
					district = 0
				}

				this.province = province;
				this.city = city;
				this.district = district;
				// this.setData({
				// 	province,
				// 	city,
				// 	district
				// })
			},
			//填写详细信息
			changeTextarea(e) {

				this.textareaValue = e.detail.value

			},
			//是否设为默认地址
			switch1Change(e) {
				// console.log(e)
				this.switchValue = e.detail.value
				// this.setData({
				// 	switchValue: e.detail.value
				// })
			},
			//提交
			submitForm(e) {
				let {
					nameValue,
					phoneValue,
					textareaValue,
					switchValue,
					selectCityId
				} = this;
				if (nameValue == "") {
					uni.showToast({
						title: "请填写您的姓名",
						icon: "none",
						duration: 2000
					})
				} else if (phoneValue == "") {
					uni.showToast({
						title: "请填写正确的手机号码",
						icon: "none",
						duration: 2000
					})
				} else if (textareaValue == "") {
					uni.showToast({
						title: "请填写您的详细地址",
						icon: "none",
						duration: 2000
					})
				} else {
					//执行提交操作
					let {
						province,
						city,
						district,
						id
					} = this
					let obj = {
						address_id: id,
						mobile: phoneValue,
						consignee: nameValue,
						province: province,
						city: city,
						district: district,
						address: textareaValue,
						anniu: switchValue
					}
					UserModels.addAddress(obj, (res) => {
						console.log(res)
						if (res.error != 0) {
							uni.showToast({
								title: res.errmsg
							})
						} else {
							if (this.done == 1) {
								uni.redirectTo({
									url: `/pages/submitOrders?id=${this.orderId}&shopid=${this.shopId}`
								});
							} else {
								uni.navigateTo({
									url: '/pages/user/address'
								});
							}

						}
					})
				}
			},
			getIndex(match) {
				let res = [];
				let allCityList = this.allCityList;
				for (let index = 0; index < allCityList.length; index++) {
					if (allCityList[index].id == match[0]) {
						res[0] = index;
						for (let j = 0; j < allCityList[index].son.length; j++) {
							if (allCityList[index].son[j].id == match[1]) {
								res[1] = j;
								for (let k = 0; k < allCityList[index].son[j].son.length; k++) {
									if (allCityList[index].son[j].son[k].id == match[2]) {
										res[2] = k;
									}
								}
							}
						}
					}
				}
				return res
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* pages/user/addAddress/addAddress.wxss */
	page {
		padding-bottom: 100rpx;
	}

	.address-top {
		margin-top: 20rpx;
		background: #fff;
		border-top: #ddd 2rpx solid;
	}

	.add-item {
		border-bottom: #ddd 2rpx solid;
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
	}

	.label {
		font-size: 26rpx;
		width: 160rpx;
	}

	.add-item-content {
		margin-left: auto;
		text-align: right;
		width: calc(100% - 160rpx);
		font-size: 26rpx;
	}

	.textarea {
		width: 100%;
		text-align: left;
		height: 150rpx;
		padding: 4rpx 0;
	}

	.add-item-just {
		align-items: flex-start;
	}

	.submit {
		width: 100%;
		height: 100rpx;
		background: #f23;
		color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2;
		text-align: center;
		line-height: 100rpx;
		border-radius: 0;
	}
</style>
