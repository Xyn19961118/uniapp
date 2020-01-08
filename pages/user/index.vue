<template>
	<view class="user">
		<!-- 这里是状态栏 -->
		<view class="status_bar"></view>
		<!-- 这里是状态栏 --> 
		<view class="nav-wrapper">
			<Nav :curr="curr" @setIndex="setIndex"></Nav>
		</view>

		<view class="content-wrapper">
			<Content :curr="curr" :isShopkeeper="isShopkeeper" :info="userInfo" @setIndex="setIndex"></Content>
		</view>
		
		<!-- 底部 -->
		<Footer :dataCurr="dataCurr" :shopId="shopId" :isShopkeeper="isShopkeeper" :isLogin="isLogin"></Footer>
		<!-- 底部 -->
	</view>
</template>

<script>
	import {
		UserModel
	} from "@/model/userModels.js";
	const UserModels = new UserModel();

	import Nav from "@/components/user/index/nav.vue";
	import Content from "@/components/user/index/content.vue";
	import Footer from "@/components/common/footer.vue";
	export default {
		onShow() {
			uni.showLoading({
				title:"加载数据中...",
				mask:true
			})
			UserModels.getInfo(res => {				
				uni.hideLoading(); 
				console.log(res)
				if(res){
					if(res.error == 10001){
						//去登陆
						uni.navigateTo({
							url:"/pages/user/login",
							animationType:"slide-in-right"
						})
					}else{
						this.userInfo = res;
						uni.setStorageSync("shopId",res.shop_id); //存入店铺id
						this.shopId = res.shop_id;
						this.isLogin = true
						if(res.shop_id !== 0){
							this.isShopkeeper = true;
						}
						this.curr = 1;
					}
					
					// console.log(this.userInfo)
				}
			})
			
			
		},
		components: {
			Nav,
			Content,
			Footer
		},
		data() {
			return {
				curr: 0,
				userInfo: {},
				dataCurr: 6,
				isShopkeeper: false,
				shopId: 0,
				isLogin: false
			}
		},

		methods: {
			//设置导航curr
			setIndex(e) {
				this.curr = parseInt(e)
			},

		}
	}
</script>

<style lang="scss" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background: #FF2233;
		position: fixed;
		left: 0;
		top: 0;
	}
	
	page {
		padding-bottom: 100rpx;
	} 


	.nav-wrapper {
		position: fixed;
		left: 0;
		top: 60upx;
		z-index: 2;
		width: 100%;
	}
	.content-wrapper {
		padding-top: 164upx;
	}
</style>
