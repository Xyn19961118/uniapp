import {
	Http
} from '../utils/http.js';
class ShopcarModel extends Http {

	/**
	 * 购物车列表
	 */
	shopcarList( res) {
		this.request({
			url: 'cart/index',
			success: res
		})
	}
	






}
export {
	ShopcarModel
}
