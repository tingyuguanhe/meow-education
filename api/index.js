function register() {
  // 登录
  wx.login({
    success: function (res) {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if (res.code) {
        console.log('登录接口', res.code);
        //发起网络请求 ?code=021NBHXd0NqsLA1AbAVd08QZXd0NBHXF
        wx.request({
          url: 'http://114.112.75.135:7000/api/login/',
          data: {
            code: res.code
          },
          success: function (res) {
            localStorage.setItem("Token", res.data.token);
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }

  })
}

function request(method, url, data = {}) {
  //注意：可以对params加密等处理
  wx.showNavigationBarLoading();
  // register();
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE
      header: {// 设置请求的 header
        token: wx.getStorageSync('Token')
      }, 
      data: data,
      success: function (res) {
        // console.log(res);
        wx.hideNavigationBarLoading();
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {//返回错误提示信息
          wx.hideNavigationBarLoading();
          reject(res.data);
        }
      },
      fail: function (e) {
        reject('网络出错');
      },
      complete: function () {
        // complete
      }
    })
  })
}

module.exports = {
  request
};