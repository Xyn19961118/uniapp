<template>
	<view class="search" v-if="isSearchShow">
		<view class="head">
			<view class="head-wrap">
				<input class="head-input" confirm-type="search" :value="inputVal" type="text" placeholder="请输入要搜索的产品"
				 placeholder-style="color: #bbb;" maxlength="20" focus @input="changeInput" @confirm="searchSubmit" />
				<image class="search-btn" @tap="searchSubmit" src="http://m.prizemart.cn/mobile/images/search.png" lazy-load />
			</view>
			<view class="head-cancel" @tap="searchCancel">取消</view>
		</view>

		<view class="content">
			<view class="title">
				<image class="title-pic" src="http://m.prizemart.cn/mobile/images/classify-search02.png" />
				<text class="title-text">热门搜索</text>
			</view>

			<view class="items"> 
				<view class="item" v-for="(item, index) in hotSearch" :key="item.id">
					<view class="item-label">{{index+1}}</view>
					<view class="item-text" @tap="searchWord" :data-val="item">{{item}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isSearchShow: Boolean,
			hotSearch: Array
		},
		data() {
			return {
				inputVal: ""
			}
		},
		methods: {
			//搜索框的值
			changeInput(e) {
				let inputVal = e.detail.value;
				this.inputVal = inputVal;
				// console.log(inputVal)
			},
			//搜索提交
			searchSubmit(e) {
				this.$emit("searchSubmit", this.inputVal)
			},
			//搜索取消
			searchCancel(e) {
				this.$emit("searchCancel")
			},

			searchWord(e) {
				this.$emit("searchWord", e.currentTarget.dataset)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 101;
		background: #fff;

		.head {
			padding: 16upx 30upx;
			display: flex;
			background: #f23;
			align-items: center;
			height: 90upx;
		}

		.head-input {
			width: 540upx;
			height: 58upx;
			border: #a40000 2upx solid;
			background: #fff;
			padding: 0 20upx;
			border-radius: 8upx;
		}

		.head-cancel {
			color: #fff;
			width: 120upx;
			text-align: center;
			height: 58upx;
			line-height: 58upx;
		}

		.head-wrap {
			position: relative;
		}

		.search-btn {
			position: absolute;
			width: 36upx;
			height: 36upx;
			right: 10upx;
			top: 0;
			padding: 12upx;
			z-index: 2;
		}

		.content {
			width: 690upx;
			margin: 32upx auto 0;
			border: #b5b5b5 2upx solid;
			padding: 0 16upx;
			box-shadow: 0 0 10upx rgba(0, 0, 0, .25);
		}

		.title {
			padding: 20upx 12upx;
			border-bottom: #dcdadb 2upx solid;
			display: flex;
			align-items: center;
		}

		.title-pic {
			width: 26upx;
			height: 32upx;
		}

		.title-text {
			color: #000;
			margin-left: 8upx;
		}

		.items {
			padding: 12upx 20upx;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
		}

		.item {
			padding: 14upx 0;
			width: 50%;
			display: flex;
			align-items: center;
		}

		.item-label {
			width: 32upx;
			height: 32upx;
			background: #cdcdcd;
			color: #fff;
			border-radius: 4upx;
			text-align: center;
			line-height: 32upx;
			margin-right: 10upx;
			font-size: 24upx;
		}

		.item-text {
			font-size: 24upx;
			color: #000;
			width: 240upx;
			overflow: hidden;
			text-overflow: ellipsis;
			height: 32upx;
		}

		.item:nth-child(1) .item-label {
			background: #f23;
		}

		.item:nth-child(2) .item-label {
			background: #ff5704;
		}

		.item:nth-child(3) .item-label {
			background: #ffb600;
		}
	}
</style>
