import { BaseModel } from './BaseModel'
class ShopModel extends BaseModel {
  /**
   * 店铺首页
   */
  shopHome(id, success) {
    this.request({
      url: 'shop/index',
      data: {
        shopid: id
      },
      success: success
    })
  }

  /**
   *  查看更多
   */
  lookMore(id, shopId, order, res) {
    this.request({
      url: 'shop/lookmore',
      data: {
        id: id,
        shopid: shopId,
        order: order
      },
      success: res
    })
  }

  /**
   *  查看推荐商品
   */
  hotsGoods(shopId, status, order, res) {
    this.request({
      url: 'shop/hotsgoods',
      data: {
        shopid: shopId,
        order: order,
        status: status
      },
      success: res
    })
  }

  /**
   *  关注店铺
   */
  focusShop(id, res) {
    this.request({
      url: 'shop/focusshop',
      data: {
        id: id
      },
      success: res
    })
  }

  /**
   * 领取优惠券列表
   */
  getShopBonus(id, res) {
    this.request({
      url: 'shop/getshopbonus',
      data: {
        id
      },
      success: res
    })
  }

  /**
   * 领取优惠券
   */

  receiveShopBouns(id, res) {
    this.request({
      url: 'shop/getBonus',
      data: {
        id
      },
      success: res
    })
  }
}
export { ShopModel }
