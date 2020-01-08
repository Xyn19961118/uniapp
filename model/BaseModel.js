import { Http } from '../utils/http'
import { Pay } from '../utils/pay'
import { config } from '../utils/config'
class BaseModel extends Http {
  shopId = uni.getStorageSync('shopId')
  /**
   *  用户登录
   * @param {objcet} info 用户信息
   * @param {callback} success 回调函数
   */
  login(info, success) {
    let that = this
    uni.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          that.request({
            url: 'login/wxlogin',
            data: {
              code: res.code,
              name: info.name,
              img: info.img
            },
            success: success
          })
        }
      }
    })
  }
  /**
   *  验证用户是否已经登录
   */
  checkLogin() {
    uni.checkSession({
      success: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      },
      complete: res => {
        console.log(res)
      }
    })
  }

  /**
   *  验证数组长度是否大于0
   */
  checkArrLength(arr) {
    if (arr.length < 1) {
      uni.showToast({
        title: '没有更多了',
        icon: 'none',
        duration: 1500
      })
      return false
    }
  }

  /**
   * 支付订单/优惠券支付
   */
  orderPay(id, status = true) {
    var pay = new Pay()
    pay.orderPay(id, status)
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

  getData(e, all = true, val) {
    if (all) {
      return e.currentTarget.dataset
    } else {
      return e.currentTarget.dataset.val
    }
  }

  /**
   *
   * @param {string} url 请求地址
   * @param {mixture} path 图片地址
   * @param {int} type 1店铺 2身份证 0用户
   * @param {callback} callback 回调
   */
  uploadFile(url, path, type, callback) {
    var that = this
    uni.uploadFile({
      url: that.baseUrl + url,
      filePath: path,
      name: 'image',
      header: { 'app-key': config.appKey, token: uni.getStorageSync('token') },
      formData: { type: type },
      success(res) {
        const data = res.data
        callback && callback(JSON.parse(data))
      }
    })
  }

  showToast(msg) {
    uni.showToast({
      title: msg,
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false
    })
  }

  setShopID(id) {
    let selfShopID = uni.getStorageSync('shopId')
    if (selfShopID) {
      uni.setStorageSync('shareID', selfShopID)
    } else {
      uni.setStorageSync('shareID', parseInt(id))
    }
  }

  checkError(res) {
    if (res.error && res.error == 10001) {
      uni.navigateTo({
        url: '/pages/user/login/login'
      })
      return false
    }
  }
}

export { BaseModel }
