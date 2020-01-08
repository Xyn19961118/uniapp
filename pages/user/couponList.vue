//优惠券列表
<template>
	<view>
		<view class="nav-wrapper">
			<Nav :navList="navList" :curr="curr" @setCurr="setCurr"></Nav>
		</view>
		
		<view class="content-wrapper">
			<Content :curr="curr" :dataObj="dataObj" @setCurr="setCurr"></Content>
		</view>
	</view>
</template>

<script>
	import { UserModel } from "@/model/userModels.js";
	const UserModels = new UserModel();
	
	import Nav from "@/components/user/common/nav.vue";
	import Content from "@/components/user/couponList/content.vue";
	export default {
		components:{
			Nav,
			Content
		},
		data() {
			return {
				navList:["未使用","已使用","已过期"],
				curr: 0,
				dataObj:{}
			};
		},
		onLoad() {
			UserModels.shopBonus(res=>{
				console.log(res)
				this.dataObj= res;
			})
		},
		methods:{
			//设置current
			setCurr(e){
				this.curr = e;
			}
		}
	}
</script>

<style lang="scss">
	.nav-wrapper {
		position: fixed;
		width: 100%;
		height: 80rpx;
		left: 0;
		top: 0;
		z-index: 6;
	}
</style>
