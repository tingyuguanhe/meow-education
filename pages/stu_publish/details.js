// pages/teachers/details.js
import { myPublish, deleteStudent } from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
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
   
    this.getStuDetail();

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
  getStuDetail: function(){
    myPublish().then((res) => {
      console.log(res);
      this.setData({
        infos: res,
        id: res.id
      })
    })
  },
  delPublic: function () {
    var _this = this;
    wx.showModal({
      title: '确认删除？',
      content: '删除后将不能寻找教师',
      confirmText: '确定',
      confirmColor: '#FF4D61',
      success: function (r) {
        if (r.confirm) {
          _this.del();

        }
      }
    })
  },
  del: function () {
    var reqData = {
      id: this.data.id
    }

    deleteStudent(reqData).then((res) => {
      if (res.status == 1) {
        wx.showToast({
          title: '删除成功',
          icon: 'none'
        })
        setTimeout(function(){
          wx.switchTab({
            url: '../user/index'//实际路径要写全
          })
        },2000)
      }
    })
  }

  
})