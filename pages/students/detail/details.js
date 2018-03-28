// pages/teachers/details.js
import { getStudentDetail, followerUser, userIsRegister, submitApply } from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu_id:'',
    applys: 10,
    reward: 200,
    school: '北京大学',
    score: 588,
    educational_background: '博士',
    profession: '数学',
    infos:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      stu_id: options.id
    })

    this.getStuDetail(this.data.stu_id);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    return { 
      title: '教师信息', 
      desc: '喵喵教育--教师信息', 
      imageUrl: '../../images/wxapp.png',
      path: '/pages/teachers/details/index?id=' + this.data.stu_id,
      data: this.data
    }
  },
  sendSys: function(){
    this.onShareAppMessage
  },
  sendApply: function(){
    wx.showModal({
      title: '您尚未注册',
      content: '请先注册后，才能更快的选择老师哦',
      showCancel: true,
      confirmText:'立即注册',
      confirmColor: '#FF4D61',
      success: function(){
        console.log(888);
        wx.navigateTo({
          url: '../../login/login'//实际路径要写全
        })
      }

    })
  },
  applyComplain(){
    wx.navigateTo({
      url: '../../complain/complain'//实际路径要写全
    })
  },
  getStuDetail: function(id){
    var reqData = {
      id: id
    }
    getStudentDetail(reqData).then((res)=>{
      console.log('学生详情',res);
      this.setData({
        infos: res
      })
    })
  },
  //收藏
  followerUser: function () {
    var reqData = {
      target_id: this.data.stu_id,
      target_type: "student"
    }
    followerUser(reqData).then((res) => {
      if (res.status == 0 || res.status == 1){
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      } 
    })
  },
  //发送申请
  sendApply: function () {
    userIsRegister().then((res) => {
      //console.log(res);
      if (res.user_type == '未注册') {
        wx.showModal({
          title: '尚未注册',
          content: '注册后可更快找到合适的家教',
          confirmText: '立即注册',
          confirmColor: '#FF4D61',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../register/register'//实际路径要写全
              })
            }
          }

        })
      } else {
        var reqData = {
          target_id: this.data.stu_id,
          target_type: 'teacher'
        }
        submitApply(reqData).then((res) => {
          console.log('发送申请', res);
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        })
      }
    })

  }

  
})