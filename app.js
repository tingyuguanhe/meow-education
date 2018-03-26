//app.js  管理整个程序的生命周期
//app.js做为小程序的入口，里面有个App实例，每个小程序只会有一个App实例，小程序启动以后触发onLaunch函数执行，获取用户信息
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var _this = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.register();//到后台换取 openId, sessionKey, unionId
    //获取用户信息
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          //已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              _this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (_this.userInfoReadyCallback) {
                _this.userInfoReadyCallback(res)
              }
            },
            fail: function (err) {
              console.log('失败', err);
            }
          })
        }
      }
    })
      
  },
  globalData: {
    userInfo: null
  },
  onShareAppMessage: function (options) {
    return {
      title: '教师信息',
      desc: '喵喵教育--教师信息',
      imageUrl: '../../images/wxapp.png'
    }
  },
  trim: function(s){
    return s.replace(/^\s + |\s + $/g, "");
  },
  register:function () {
    // 登录
    wx.login({
      success: function (res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {

          //发起网络请求 ?code=021NBHXd0NqsLA1AbAVd08QZXd0NBHXF
          wx.request({
            url: 'http://114.112.75.135:7000/api/login/',
            data: {
              code: res.code
            },
            success: function (res) {
              wx.setStorageSync('Token', res.data.token)
              // console.log('Token', res.data.token);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }

    })
  }
  
})