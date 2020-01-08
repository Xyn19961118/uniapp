import {
	Http
} from '../utils/http.js';
class UserModel extends Http {
  /**
   *  获取用户信息及销售概况
   */
  getInfo(res) {
    this.request({
      url: 'user/index',
      success: res
    })
  }
  /**
   *  我的收藏
   */
  collect(res, page = 1) {
    this.request({
      url: 'user/collect',
      data: {
        page: page
      },
      success: res
    })
  }
  /**
   * 历史记录
   */
  history(res, page = 1) {
    this.request({
      url: 'user/history',
      data: {
        page: page
      },
      success: res
    })
  }
  /**
   *  删除历史记录
   */
  delHistory(id, res) {
    this.request({
      url: 'user/delHistory',
      data: {
        id: id
      },
      success: res
    })
  }

  /**
   *  获取地址列表
   */
  addressList(res) {
    this.request({
      url: 'user/address',
      success: res
    })
  }
  /**
   *  获取地址地区
   */
  getRegion(res) {
    this.request({
      url: 'index/region',
      success: res
    })
  }
  /**
   * 新增地址
   */
  addAddress(obj, res) {
    this.request({
      url: 'user/addAddr',
      method: 'post',
      data: obj,
      success: res
    })
  }
  /**
   * 默认地址
   */
  defaultAddr(id, res) {
    this.request({
      url: 'user/defaultAddr',
      data: {
        id: id
      },
      success: res
    })
  }
  /**
   *  获取地址
   */
  getAddress(id, res) {
    this.request({
      url: 'user/getAddress',
      data: {
        id: id
      },
      success: res
    })
  }
  /**
   *  删除地址
   */
  delAddr(id) {
    this.request({
      url: 'user/delAddress',
      data: {
        id: id
      }
    })
  }
  /**
   * 订单列表
   */
  orderList(res) {
    this.request({
      url: 'user/orderList',
      success: res
    })
  }
  /**
   * 订单详情
   */
  orderListDetail(id, callback) {
    this.request({
      url: 'user/orderDetail',
      data: {
        id
      },
      success: callback
    })
  }
  /**
   * 订单详情获取物流
   */
  orderLogistics(id, callback) {
    this.request({
      url: 'user/logistics',
      data: {
        id
      },
      success: callback
    })
  }

  /**
   * 店铺优惠券
   */
  shopBonus(callback) {
    this.request({
      url: 'user/shopBonus',
      success: callback
    })
  }

  /**
   * 售后列表
   */
  afterList(page, callback) {
    this.request({
      url: 'after/index',
      data: {
        page
      },
      success: callback
    })
  }
  /**
   * 售后详情
   */
  afterDetail(id, callback) {
    this.request({
      url: 'after/afterDetail',
      data: {
        id
      },
      success: callback
    })
  }

  /**
   *
   * @param {int} page 页码
   * @param {int} status 0 all, 1 waitPay 2 waitSend , 3,waitReceive 4,success
   * @param {callback} res 回调
   */
  loadOrder(page, status, res) {
    this.request({
      url: 'user/loadOrder',
      data: {
        page: page,
        status: status
      },
      success: res
    })
  }

  loadUserOrder(page, status, res) {
    this.request({
      url: 'user/loadUserOrder',
      data: {
        page: page,
        status: status
      },
      success: res
    })
  }

  /**
   *  获取置顶/分类推荐商品
   */
  shopRecommend(res) {
    this.request({
      url: 'user/shopRecommend',
      success: res
    })
  }
  /**
   * 修改推荐商品的商品
   */
  shopGoodsStatus(id, status, res) {
    this.request({
      url: 'user/shopGoodsStatus',
      data: {
        id: id,
        status: status
      },
      success: res
    })
  }
  /**
   *  用户订单
   */
  userOrder(res) {
    this.request({
      url: 'user/userOrder',
      success: res
    })
  }
  /**
   * 用户订单详情
   */
  userOrderDetail(id, res) {
    this.request({
      url: 'user/userOrderDetail',
      data: {
        id: id
      },
      success: res
    })
  }
  /**
   * 店主的用户
   */
  myUser(res) {
    this.request({
      url: 'user/myUser',
      success: res
    })
  }
  /**
   * 收益详情
   */
  incomeDetail(res, page = 1) {
    this.request({
      url: 'user/incomeDetail',
      data: {
        page: page
      },
      success: res
    })
  }
  /**
   *  月收益
   */
  monthIncomeDetail(res, page = 1) {
    this.request({
      url: 'user/monthIncomeDetail',
      data: {
        page: page
      },
      success: res
    })
  }
  /**
   *  提现验证
   */
  userExtract(res) {
    this.request({
      url: 'user/userExtract',
      success: res
    })
  }

  /**
   * 提现记录
   */
  applyIncome(res, page, limit) {
    this.request({
      url: 'user/applyIncome',
      data: {
        page: page,
        pagesize: limit
      },
      success: res
    })
  }

  /**
   *  删除收藏
   */
  delCollect(id, res) {
    this.request({
      url: 'user/delCollect',
      data: {
        id: id
      },
      success: res
    })
  }

  /**
   *  用户优惠券
   */
  getUserBouns(res) {
    this.request({
      url: 'shopbonus/shopBonusList',
      success: res
    })
  }

  /**
   * 一键回收优惠券
   */
  retrieveShopBonus(res) {
    this.request({
      url: 'shopbonus/oneShopBonus',
      success: res
    })
  }

  /**
   *  确认收货
   */
  receipt(id, res) {
    this.request({
      url: 'user/receiptOrder',
      data: { id: id },
      success: res
    })
  }
  /**
   *  取消订单
   */
  cancel(id, res) {
    this.request({
      url: 'user/cancelOrder',
      data: { id: id },
      success: res
    })
  }

  /**
   * 分类下的商品管理列表
   */
  shopGoodsList(res, id, page = 1) {
    this.request({
      url: 'user/shopGoodsList',
      data: { id: id, page: page },
      success: res
    })
  }

  /**
   * 分类商品推荐/置顶
   */
  shopGoodsStatus(param, res) {
    this.request({
      url: 'user/shopGoodsStatus',
      data: param,
      success: res
    })
  }

  /**
   *  修改商品比例
   */
  goodsRate(param, res) {
    this.request({
      url: 'user/goodsRate',
      data: param,
      success: res
    })
  }

  /**
   *  我的推广费
   */
  myDeposit(res) {
    this.request({
      url: 'user/myDeposit',
      success: res
    })
  }

  /**
   *  注册店主
   */
  shopOwner(name, res) {
    this.request({
      url: 'user/shopOwner',
      data: { name: name },
      success: res
    })
  }

  // 店主信息
  shopInfo(res) {
    this.request({
      url: 'user/shopInfo',
      success: res
    })
  }

  // 申请提现
  doUserExtract(param, res) {
    this.request({
      url: 'user/doUserExtract',
      data: param,
      method: 'POST',
      success: res
    })
  }

  // 修改店铺信息
  updateShopInfo(param, res) {
    this.request({
      url: 'user/updateShopInfo',
      data: param,
      method: 'POST',
      success: res
    })
  }

  // 取消退款
  cancelAfter(id, res) {
    this.request({
      url: 'after/cancelAfter',
      data: { id: id },
      success: res
    })
  }
  //  个人信息
  userInfo(res) {
    this.request({
      url: 'user/userInfo',
      success: res
    })
  }
	
	 /**
	   *  验证数组长度是否大于0
	   */
	  checkArrLength(arr) {
	    if (arr.length < 1) {
	      wx.showToast({
	        title: '没有更多了',
	        icon: 'none',
	        duration: 1500
	      })
	      return false
	    }
	  }
}

export { UserModel }