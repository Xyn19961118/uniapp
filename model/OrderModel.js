import { BaseModel } from './BaseModel.js'
class OrderModel extends BaseModel {
  /**
   *  购物车列表
   */
  list(id, res) {
    this.request({
      url: 'cart',
      data: {
        id: id
      },
      success: res
    })
  }
  /**
   * 修改购物车的数量
   * @param {string} id
   * @param {string} num
   * @param {callback} res
   */
  cartUpdateNum(id, num, res) {
    this.request({
      url: 'cart/cartUpdateNum',
      data: {
        id: id,
        num: num
      },
      success: res
    })
  }
  /**
   * 是否选中
   * @param {string} id
   * @param {callback} res
   */
  isSelect(id, res) {
    this.request({
      url: 'cart/isSelect',
      data: {
        id: id
      },
      success: res
    })
  }
  // 是否全选中
  selectedIsAll(status, res) {
    this.request({
      url: 'cart/selectedIsAll',
      data: {
        status: status
      },
      success: res
    })
  }
  // 删除商品
  delGoods(id, res) {
    this.request({
      url: 'cart/delGoods',
      data: {
        id: id
      },
      success: res
    })
  }

  orderWaitPay(res, id, shopid) {
    this.request({
      url: 'cart/orderWaitPay',
      data: {
        id: id,
        shopid: shopid
      },
      success: res
    })
  }
  orderPay(param, res) {
    this.request({
      url: 'cart/orderPay',
      method: 'POST',
      data: param,
      success: res
    })
  }
  /**
   * 验证是否有地址
   */
  checkHasAddr(res) {
    this.request({
      url: 'goods/checkHasAddr',
      success: res
    })
  }
}
export { OrderModel }
