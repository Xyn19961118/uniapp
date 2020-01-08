import {
	Http
} from '../utils/http.js';
class GoodsModel extends Http {

	/**
	 * 商品详情
	 */
	goodsInfo(id, shopId, res) {
		this.request({
			url: 'goods/goodsinfo',
			data: {
				id,
				shopid: shopId
			},
			success: res
		})
	}

	/**
	 *  加入购物车/立即购买
	 */
	addCart(param, res) {
		this.request({
			url: 'goods/addCart',
			method: 'POST',
			data: param,
			success: res
		})
	}

	/**
	 * 修改比例
	 */
	changeRate(id, rate, res) {
		this.request({
			url: 'user/goodsRate',
			data: {
				id,
				rate,
				type: 0
			},
			success: res
		})
	}

	/**
	 * 对比加载更多店铺
	 */
	loadMoreShopList(id, page, res) {
		this.request({
			url: 'Goods/loadShopList',
			data: {
				id,
				page
			},
			success: res
		})
	}

	/**
	 * 店铺商品收藏
	 */
	collect(id, shopId, res) {
		this.request({
			url: 'goods/goodsCollect',
			data: {
				id: id,
				shopid: shopId
			},
			success: res
		})
	}






}
export {
	GoodsModel
}
