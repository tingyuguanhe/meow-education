
function request(method, url, data = {}) {
  //注意：可以对params加密等处理
  wx.showNavigationBarLoading();
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE
      // header: {}, // 设置请求的 header
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

module.exports = request;