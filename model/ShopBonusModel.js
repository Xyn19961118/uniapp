import { BaseModel } from './BaseModel'
class ShopBonusModel extends BaseModel {
  /**
   * 设置优惠券
   */
  setBonus(res) {
    this.request({
      url: 'shopbonus/setBonus',
      success: res
    })
  }

  //指定用户搜索
  searchPeople(word, res) {
    this.request({
      url: 'shopbonus/getUsers',
      data: {
        word
      },
      success: res
    })
  }

  //指定产品搜索
  searchProduct(word, res) {
    this.request({
      url: 'shopbonus/getGoodsList',
      data: {
        word
      },
      success: res
    })
  }

  //设置优惠券提交
  setBounsSubmit(param, res) {
    this.request({
      url: 'shopbonus/doSetBonus',
      method: 'POST',
      data: param,
      success: res
    })
  }

  // 充值验证
  checkRecharge(res) {
    this.request({
      url: 'shopbonus/recharge',
      success: res
    })
  }

  // 提交充值
  submitRecharge(money, res) {
    this.request({
      url: 'shopbonus/doRecharge',
      data: {
        money: money
      },
      success: res
    })
  }

  //店铺优惠券详情
  bonusDetail(id, res) {
    this.request({
      url: 'shopbonus/bonusDetail',
      data: {
        id
      },
      success: res
    })
  }

  //回收优惠券
  bonusRecycle(id, res) {
    this.request({
      url: 'shopbonus/recycle',
      data: {
        id
      },
      success: res
    })
  }
}
export { ShopBonusModel }
