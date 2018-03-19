//app.js  管理整个程序的生命周期
//app.js做为小程序的入口，里面有个App实例，每个小程序只会有一个App实例，小程序启动以后触发onLaunch函数执行，获取用户信息
//app.js
import { isRegister } from './api/api.js'

App({

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // isRegister().then((res) => {
    //   // console.log('是否注册',res);
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              //console.log('用户信息',res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    register: false
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
  }
  
})