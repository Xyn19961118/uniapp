import { Http } from '../utils/http.js';
class LoginModel extends Http {

  /**
   *  账号登录
   */
  accountLogin(obj, res) {
    this.request({
      url: 'login/login',
      data: obj,
      success: res
    })
  }
}
export { LoginModel } 
