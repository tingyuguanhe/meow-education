import { getStudentList, getCity, getAllCourses, getAllSchools } from '../../api/api.js'
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isHideLoadMore: true,
    city:'',
    page: 1,
    hasNext: false,
    pageSize:20,
    stuList: [],
    showModal: false,
    coursesTypes: [],
    courseId:0,
    courseName: "",
    showSchoolModal: false,
    schoolsTypes: [],
    schoolName: "",
    schoolId:0
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSchoolsList();  //获取学校
    this.getCoursesList();  //获取课程
    this.getCityList();   //城市

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
   

    this.getStudentListData(reqData);   //学生列表
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
    console.log('onUnload');
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  // 选择课程
  showCoursesModal: function () {
    this.setData({
      showModal: !this.data.showModal,
      showSchoolModal: false
    })

  },
  showSchooslModal: function () {
    this.setData({
      showModal: false,
      showSchoolModal: !this.data.showSchoolModal
    })
  },
  //获取城市
  getCityList: function () {
    getCity()
      .then((res) => {
        // console.log('城市', res);
        this.setData({
          city: res.results[0].name
        })

      });
  },
  //获取学校
  getSchoolsList: function () {
    getAllSchools().then(
      (res) => {
        this.setData({
          schoolsTypes: res
        })
        if (this.data.schoolsTypes.length > 0) {
          this.setData({
            schoolName: this.data.schoolsTypes[0].name,
            schoolId: this.data.schoolsTypes[0].id
          })
        }

      }
    );
  },
  getCoursesList: function () {
   
    getAllCourses().then((res) => {
      console.log('课程', res);
      this.setData({
        coursesTypes: res
      })
      if (this.data.coursesTypes.length > 0) {
        this.setData({
          courseName: this.data.coursesTypes[0].name,
          courseId: this.data.coursesTypes[0].id
        })
      }
    })

  },
  selectSchool: function (event) {
    var school = "";
    var arr = this.data.schoolsTypes;
    for (var i = 0; i < arr.length; i++) {
      if (event.currentTarget.id == arr[i].id) {
        school = arr[i].name;
      }
    }
    this.setData({
      schoolName: school,
      schoolId: event.currentTarget.id,
      showSchoolModal: false
    })

    this.getStudentListData();   //学生列表 
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
      
        this.setData({
          stuList: res.results,
          hasNext: res.has_next,
          page: res.page
        })
      })
  },
  getStudentListData: function () {
    //console.log('获取学生列表');
    var req_data = {
      page: this.data.page,
      page_size: this.data.pageSize,
      school: this.data.schoolId,
      subject: this.data.courseId
    }
    this.getList(req_data);
  },
  selectCourse: function (event) {
    var course = "";
    var arr = this.data.coursesTypes;
    for (var i = 0; i < arr.length; i++) {
      if (event.currentTarget.id == arr[i].id) {
        course = arr[i].name;
      }
    }
    this.setData({
      courseName: course,
      courseId: event.currentTarget.id,
      showModal: false
    })

    this.getStudentListData();   //学生列表 
  },
  

})