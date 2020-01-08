import {
	Http
} from '../utils/http.js';
class IndexModel extends Http {
  /**
   *  获取平台首页的内容
   * @param {callBack} res 回调函数
   */
  getHome(res) {
    this.request({
      url: 'index',
      success: res
    })
  }
  /**
   *  获取分类
   */
  getCate(status = 1, res) {
    this.request({
      url: 'index/category',
      data: {
        status
      },
      success: res
    })
  }
  /**
   *  店中店学院
   */
  school(res) {
    this.request({
      url: 'index/school',
      success: res
    })
  }
  /**
   *  文章详情
   */
  artDetail(id, res) {
    this.request({
      url: 'index/artdetail',
      data: {
        id: id
      },
      success: res
    })
  }

  /**
   * 全部商品
   */
  allGoods(res, page, order = 0, shopid) {
    this.request({
      url: 'index/allGoods',
      data: {
        page: page,
        order: order,
        shopid: shopid
      },
      success: res
    })
  }
  /**
   *活动商品
   */
  activityGoods(res, page, order = 0, shopid) {
    this.request({
      url: 'index/activityGoods',
      data: {
        page: page,
        order: order,
        shopid: shopid
      },
      success: res
    })
  }
  /**
   *  分类商品
   */
  whereGoods(res, id, status, page, order = 0, shopid = 0) {
    this.request({
      url: 'index/whereGoods',
      data: {
        id: id,
        page: page,
        status: status,
        order: order,
        shopid: shopid
      },
      success: res
    })
  }

  /**
   *  一键改价
   */
  changeAllGoods(val, status, res) {
    this.request({
      url: 'user/updateRate',
      data: {
        val,
        status
      },
      success: res
    })
  }

  /**
   *  自营特卖
   */
  selfLimit(res) {
    this.request({
      url: 'index/selfLimit',
      success: res
    })
  }

  /**
   * 优选店铺
   */
  goodShop(res) {
    this.request({
      url: 'index/goodShop',
      success: res
    })
  }

  /**
   * 搜索提交
   */
  searchGoods(res, word, page = 1, order) {
    this.request({
      url: 'index/searchGoods',
      method: 'POST',
      data: {
        word: word,
        page: page,
        order: order
      },
      success: res
    })
  }

  /**
   * 加入购物车
   */
  addShopCar(id, shopid, res) {
    this.request({
      url: 'goods/addCart',
      data: {
        id,
        shopid
      },
      success: res
    })
  }
}


export {
	IndexModel
}
