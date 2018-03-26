// pages/teachers/details.js
import { myPublish, deleteTeacher } from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    infos:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.getTeaDetail();
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
      path: '/pages/teachers/details/index?id=' + this.data.id,
      data: this.data
    }
  },
  sendSys: function(){
    this.onShareAppMessage
  },
  getQueryString: function (id) {  
    var r = window.location;
    console.log(r);
  },
  //我的发布详情
  getTeaDetail: function () {
    myPublish().then((res) => {
     
      this.setData({
        infos: res,
        id: res.id
      })
    })
  },
  delPublic: function(){
    var _this = this;
    wx.showModal({
      title: '确认删除？',
      content: '删除后将不能寻找学生',
      confirmText: '确定',
      confirmColor: '#FF4D61',
      success: function(r){
        if (r.confirm) {
          _this.del();
          
        }
      }
    }) 
  },
  del: function(){
    var reqData = {
      id: this.data.id
    }
    deleteTeacher(reqData).then((res) => {
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
  },
  updatePublic: function(){
    wx.navigateTo({
      url: '../update_teacher/index?id=' + this.data.id,
    })
  }

  
})