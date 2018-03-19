import { getStudentList, getCity, getCourses, getSchools } from '../../api/api.js'
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isHideLoadMore: true,
    page: 1,
    hasNext: false,
    page_size:20,
    stuList: [],
    showModal: false,
    coursesTypes: [
      {
        name: '全部课程',
        id: "total"
      },
      {
        name: '数学',
        id: "math"
      },
      {
        name: '英语',
        id: "english"
      },
      {
        name: '物理',
        id: "wuli"
      },
      {
        name: '化学',
        id: "huaxue"
      },
      {
        name: '韩语',
        id: "hanyu"
      }
    ],
    searchByType: "全部课程",
    showSchoolModal: false,
    schoolsTypes: [
      {
        name: '北京大学',
        id: "beida"
      },
      {
        name: '清华大学',
        id: "qinghua"
      },
      {
        name: '华科大',
        id: "huakeda"
      },
      {
        name: '武汉大学',
        id: "wuda"
      }
    ],
    searchBySchool: "北京大学",
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
  onShow: function (e) {
    wx.pageScrollTo({
      scrollTop: 0,
    })
    var reqData = {
      page: this.data.page,
      page_size: this.data.pageSize
    }

    this.getList(reqData);   //学生列表
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
    // console.log('下拉刷新...');
    wx.showNavigationBarLoading();
    setTimeout(() => {
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh(); //停止下拉刷新
    }, 2000)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉加载更多....");
    this.setData({
      isHideLoadMore: false
    });
    this.getCourse();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 选择课程
  selectCourse: function () {
    this.setData({
      showModal: !this.data.showModal,
      showSchoolModal: false
    })

  },

  selectSchool: function () {
    this.setData({
      showModal: false,
      showSchoolModal: !this.data.showSchoolModal
    })
  },
  closeModal: function () {
    this.setData({
      showModal: false,
      showSchoolModal: false
    })
  },
  //获取学生列表
  getList: function (reqData) {
    // app.request
    getStudentList(reqData)
      .then((res) => {
        console.log('学生信息', res);
        this.setData({
          stuList: res.results,
          hasNext: res.has_next,
          page: res.page
        })
      })
  },
  getCourse: function () {
    var req_data = {
      param: {
        page: this.data.page + 1,
        page_size: this.data.pageSize
      }
    }
    this.getList(req_data);

    this.setData({
      isHideLoadMore: true
    });
  },
  searchByCourse: function (event) {
    var course = "";
    switch (event.currentTarget.id) {
      case "total":
        course = "全部课程";
        break;
      case "math":
        course = "数学";
        break;
      case "english":
        course = "英语";
        break;
      case "wuli":
        course = "物理";
        break;
      case "huaxue":
        course = "化学";
        break;
      case "hanyu":
        course = "韩语";
        break;
    }

    this.setData({
      searchByType: course,
      showModal: false
    })

    //this.getCourse();



  },

  searchBySchool: function (event) {
    var school = "";
    switch (event.currentTarget.id) {
      case "beida":
        school = "北京大学";
        break;
      case "qinghua":
        school = "清华大学";
        break;
      case "huakeda":
        school = "华科大";
        break;
      case "wuda":
        school = "武汉大学";
        break;
    }

    this.setData({
      searchBySchool: school,
      showSchoolModal: false
    })

    //this.getCourse();
  }
})