import { config } from './config'
class Pay {
  constructor() {
    this.baseUrl = config.baseUrl
  }
  /**
   *
   * @param {int} id 订单ID
   * @param {boolean} status true 订单支付， false 优惠券充值
   */
  orderPay(id, status = true, back = true) {
    var that = this
    var header = {
      'content-type': 'application/json',
      token: uni.getStorageSync('token'),
      'app-key': config.appKey
    }
    uni.login({
      success: res => {
        uni.request({
          url: that.baseUrl + 'pay',
          method: 'POST',
          header: header,
          data: {
            id: id,
            code: res.code,
            status: status
          },
          success: res => {
            if (!res.data.error) {
              var data = res.data
              uni.requestPayment({
                timeStamp: data.timeStamp,
                nonceStr: data.nonceStr,
                package: data.package,
                signType: data.signType,
                paySign: data.paySign,
                success(res) {
                  if (status == true) {
                    uni.navigateTo({
                      url: `/pages/user/orderDetail/orderDetail?id=${id}`
                    })
                  } else {
                    uni.navigateTo({
                      url: '/pages/user/shopBouns/shopBouns'
                    })
                  }
                },
                fail(res) {
                  if (back == true) {
                    uni.navigateBack({
                      delta: 1
                    })
                  }
                }
              })
            } else {
              uni.showToast({
                title: res.data.errmsg,
                icon: 'none',
                duration: 1500,
                mask: false
              })
            }
          }
        })
      }
    })
  }
}
export { Pay }
