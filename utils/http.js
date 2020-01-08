import { config } from './config';
class Http {
  constructor() {
    this.baseUrl = config.baseUrl
  }
  request(params) {
    var that = this;
    var url = this.baseUrl + params.url;

    if (!params.method) {
      params.method = 'GET';
    }
		let token = uni.getStorageSync("token") || "";
		// console.log(token);
    var header = {
      'content-type': 'application/json',
			token,
      'app-key': config.appKey,
    };
    uni.request({
      url: url,
      data: params.data,
      method: params.method,
      header: header,
      success: function (res) {
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          params.success && params.success(res.data);
        } else {
          params.error && params.error(res);
        }
      },
      fail: function (err) {
        params.fail && params.fail(err)
      }
    });
  }
}
export { Http };
