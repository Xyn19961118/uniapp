import {
	Http
} from '../utils/http.js';
class AfterModel extends Http {
  /**
   *  客户整单退款
   */
  refundGoods(id, res) {
    this.request({
      url: 'after/refundGoods',
      data: {
        id: id
      },
      success: res
    })
  }

  /**
   *  整单退款提交
   */
  refundAll(param, res) {
    this.request({
      url: 'after/refundAll',
      method: 'POST',
      data: param,
      success: res
    })
  }

  /**
   *  部分商品选择
   */
  selectGoods(id, rec_ids, res) {
    this.request({
      url: 'after/selectGoods',
      method: 'POST',
      data: {
        id: id,
        rec_ids: rec_ids
      },
      success: res
    })
  }

  /**
   * 部分退款提交
   */
  refundPart(param, res) {
    this.request({
      url: 'after/refundPart',
      method: 'POST',
      data: param,
      success: res
    })
  }

  /**
   *  用户留言给商家
   */
  replyInfo(param, res) {
    this.request({
      url: 'after/replyInfo',
      data: param,
      success: res
    })
  }

  /**
   *  评价列表
   */
  commentList(page, res) {
    this.request({
      url: 'after/evalList',
      data: {
        page
      },
      success: res
    })
  }

  /**
   *  评价详情
   */
  commentDetail(id, res) {
    this.request({
      url: 'after/evalDetail',
      data: {
        id
      },
      success: res
    })
  }

  /**
   *  选择商品评价
   */
  commentSelect(id, res) {
    this.request({
      url: 'after/selectEval',
      data: {
        id
      },
      success: res
    })
  }

  /**
   *  评价表单获取
   */
  commentForm(id, res) {
    this.request({
      url: 'after/goodsEval',
      data: {
        id
      },
      success: res
    })
  }

  /**
   * 评价表单提交
   */
  commentSubmit(data, res) {
    this.request({
      url: 'after/doEval',
      method: 'POST',
      data,
      success: res
    })
  }
	
	 /**
	   *  过滤路由地址
	   */
	  safe_replace(url) {
	    var str = url.replace('%20', '', str)
	    str = str.replace('%27', '', str)
	    str = str.replace('%2527', '', str)
	    str = str.replace('*', '', str)
	    str = str.replace('"', '&quot;', str)
	    str = str.replace("'", '', str)
	    str = str.replace('"', '', str)
	    str = str.replace(';', '', str)
	    str = str.replace('<', '&lt;', str)
	    str = str.replace('>', '&gt;', str)
	    str = str.replace('{', '', str)
	    str = str.replace('}', '', str)
	    str = str.replace('\\', '', str) //&quot
	    str = str.replace('&quot', '', str) //
	    return str
	  }
}
export { AfterModel }
