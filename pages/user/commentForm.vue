<!-- 评价表单 -->
<template>
	<view class="container">
		<view class="top">
			<Item :goodsItem="dataObj"></Item>
		</view>

		<view class="content">
			<view class="content-top">
				<view class="content-title">商品评价</view>
				<view class="stars">
					<image v-for="(item, index) in starList" class="star" :key="index" :src="item.status?img02:img01" :data-index="index"
					 @tap="getStar" />
				</view>
			</view>
			<textarea class="content-textarea" placeholder="写下购买体会或使用过程中带来的帮助等，可以为其他小伙伴提供参考~,长度在10-500字之间。" placeholder-style="color:#ddd"
			 bindinput="changeTextarea" :value="textareaVal" maxlength="500" />

			<view class="upload">
	      <view class="upload-imgs">
	        <view class="image-items">
	            <view v-for="(item, index) in imageArrayBd" :key="index" class="image-item">
	              <image class="image" :src="item" mode="aspectFill" />
	              <image class="image-close" src="../../static/close.png" @tap="deteleImage" :data-index="index" />
	            </view>
	          <view class="image-add" @tap="getImage" v-if="imageArrayBd.length<3">
	            <image class="image-add-i" src="../../static/add-image.png" />
	          </view>
	        </view>
	  
	      </view>
	    </view>
	    </view>
	
	    <view class="bottom">
	      <view class="submit" @tap="submitComment">发表评价</view>
	    </view>
	</view>
</template>

<script>
	import Item from "@/components/user/common/item.vue";
	import { config } from "../../utils/config.js";
	import { AfterModel } from "@/model/AfterModel.js";
	const AfterModels = new AfterModel();
	export default {
		components:{
			Item
		},
		data() {
			return {
				dataObj: {},
				starList: [{
				      status: false
				    }, {
				      status: false
				    }, {
				      status: false
				    }, {
				      status: false
				    }, {
				      status: false
				    }, ],
				    img01: "http://image.prizemart.cn/mobile/images/star.png",
				    img02: "http://image.prizemart.cn/mobile/images/star-active.png",
				    starNumber: 0, //储存星数
				    imgArray: [], //储存图片地址
				    imageArrayBd: [], //本地图片显示
				    textareaVal: '', //储存textarea值
			};
		},
		onLoad: function (e) {
		    let id = e.id;
		    AfterModels.commentForm(id, res => {
		      console.log(res)
		      this.dataObj = res
		    })
		  },
		methods:{
			//点赞
			  getStar(e) {
			    let index = parseInt(e.currentTarget.dataset.index) + 1;
					console.log(index)
			    let starList = this.starList;
			    starList.map(item => {
			      item.status = false;
			    })
			    for (let i = 0; i < index; i++) {
			      starList[i].status = true;
			    }
					
					this.starList = starList;
					this.starNumber = index;
			  },
			  //textarea 
			  changeTextarea(e) {
			    let value = e.detail.value;
					this.textareaVal = value;
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
				        imageArrayBd.push(imgArr[0])
				        this.imageArrayBd = imageArrayBd;
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
				              this.imgArray=imgArray
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
				    // console.log(imgArray)
				  },
				
				  //发表评价
				  submitComment(e) {
				    let {
				      imgArray,
				      textareaVal,
				      starNumber,
				      dataObj
				    } = this;
				    if (starNumber == 0) {
				      uni.showToast({
				        title: "请选择对本商品的满意度",
				        icon: "none"
				      })
				
				      return false;
				    }
				
				    if (textareaVal == "") {
				      uni.showToast({
				        title: "请填写商品评价",
				        icon: "none"
				      })
				      return false;
				    }
				
				    AfterModels.commentSubmit({
				      id: dataObj.rec_id,
				      content: textareaVal,
				      grade: starNumber,
				      imgs: imgArray
				    },res=>{
				      uni.navigateTo({
				        url:`/pages/user/commentDetail/commentDetail?id=${res.id}`
				      })
				      // console.log(res)
				    })
				  }
		}
	}
</script>

<style lang="scss">
	.container {
		padding-bottom: 100rpx;
	}
.top {
  background: #fff;
}

.content {
  padding: 20rpx 30rpx;
  background: #fff;
  margin-top: 20rpx;
}

.content-top {
  display: flex;
}

.content-title {
  color: #000;
}

.stars {
  display: flex;
  margin-left: auto;
}

.star {
  width: 34rpx;
  height: 32rpx;
  margin: 0 4rpx;
}

.content-textarea {
  width: 100%;
  height: 280rpx;
  margin-top: 16rpx;
  line-height: 40rpx;
	font-size: 28rpx;
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
.bottom {
  position: fixed;
  width: 100%;
  height: 100rpx;
  background: #fff;
  left: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 18rpx 30rpx;
}
.submit {
  margin-left: auto;
  width: 240rpx;
  height: 68rpx;
  background: #f23;
  color: #fff;
  text-align: center;
  line-height: 68rpx;
}
</style>
