Page({

  /**
   * 页面的初始数据
   */
  data: {
    helps:[
      {
        title:'我是家长，怎样找老师？',
        answer:['先注册，然后登录成功后，选择教师，寻找适合的教师，并向教师发送申请']
      },
      {
        title: '我是老师，怎样找学生？',
        answer:['先注册，然后登录成功后，选择学生，寻找适合的学生，并向他发送申请']
      },
      {
        title: '注册时，我的隐私如何得到保障？',
        answer: ['先注册，然后登录成功后，选择学生，寻找适合的学生，并向他发送申请夏天的冲锋衣控股 v 和理解哦可怕了非常具有广阔 vu 和理解哦剋喜欢听持家有方苦瓜以灵活；就非常具有干枯和 i 了解哦剋吃减肥药过亏货咯健康yfkugyilhuojvu']
      },
      {
        title: '课时费如何发放？',
        answer: ['先注册，然后登录成功后，选择学生，寻找适合的学生，并向他发送申请，让他与 i；不过 vi 不过 v 儿复古又瑞他与 i 落；怕他当然要发图看过压力或机构和 v 比较好']
      },
      {
        title: '如何保障教学质量以及双方的安全',
        answer: ['先注册，然后登录成功后，选择学生，寻找适合的学生，并向他发送申请,户籍和 i 打开 v 均可方便 v 客人口红基本具备疯狂 ii 和 iu 热后放好热 i 和法国 iu 热狗哦好烦 iv 基本法 v']
      }
    ],
    show_index: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
  onShareAppMessage: function () {
    
  },
  showAnswer: function(e){
    var index = e.currentTarget.dataset.index;
    if (this.data.show_index == index){
      this.setData({
        show_index: -1
      })
    }else{
      this.setData({
        show_index: index
      })
    }
    
  },
  problemFeedback: function(){
    wx.navigateTo({
      url: "/pages/problem_feedback/index"
    })
  }
})