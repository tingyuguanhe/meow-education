// pages/teachers/index.js
import { getTeacherList, getCity, getAllCourses, getAllSchools } from '../../api/api.js'
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isHideLoadMore: true,
    hasNext: false,
    page: 1,
    pageSize: 20,
    city:'',
    teacherList:[],
    showModal: false,
    coursesTypes:[],
    courseName: "",
    courseId:0,
    showSchoolModal: false,
    schoolsTypes: [],
    schoolName: "",
    schoolId:0
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getList: function (reqData){
    getTeacherList(reqData)
      .then((res) => {
        //console.log('教师信息',res);
        this.setData({
          teacherList: res.results,
          hasNext: res.has_next,
          page: res.page,
          isHideLoadMore: true
        })
      })
  },
  getCoursesList: function () {
    getAllCourses().then((res) => {
      this.setData({
        coursesTypes: res
      })
      if (this.data.coursesTypes.length > 0){
        this.setData({
          courseName: this.data.coursesTypes[0].name,
          courseId: this.data.coursesTypes[0].id
        })
      }
    })

  },
  //获取城市
  getCityList: function(){
    getCity()
      .then((res) => {
        // console.log('城市', res);
        this.setData({
          city: res.results[0].name
        })

    });
  },
  //获取学校
  getSchoolsList: function(){
    getAllSchools().then(
      (res) =>{
        this.setData({
          schoolsTypes: res
        })
        if (this.data.schoolsTypes.length > 0){
          this.setData({
            schoolName: this.data.schoolsTypes[0].name,
            schoolId: this.data.schoolsTypes[0].id
          })
        }
       
      }
    );
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
    wx.pageScrollTo({
      scrollTop: 0,
    })
    this.getCityList();   //城市
    this.getSchoolsList();  //学校
    this.getCoursesList();   //科目
    this.getTeacherListData();   //教师列表 
   
    app.userInfoReadyCallback = res => {
      
    }
    
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
    },2000)
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // console.log("上拉加载更多....");
    if (this.data.hasNext){
      this.setData({
        isHideLoadMore: false
      });
      this.getTeacherListData();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getTeacherListData: function(){
    //console.log('获取教师接口');
    var req_data = {
      page: this.data.page,
      page_size: this.data.pageSize,
      school: this.data.schoolId,
      subject: this.data.courseId
    }
    this.getList(req_data); 
  },
  // 选择课程
  showCoursesModal: function(){
    this.setData({ 
      showModal: !this.data.showModal,
      showSchoolModal: false
    })
   
  },
  showSchoolsModal: function(){
    this.setData({
      showModal: false,
      showSchoolModal: !this.data.showSchoolModal
    })
  },
  closeModal: function(){
    this.setData({
      showModal: false,
      showSchoolModal: false
    })
  },
  selectCourse: function (event){
    var course = "";
    var arr = this.data.coursesTypes;
    for (var i = 0; i < arr.length; i++){
      if (event.currentTarget.id == arr[i].id){
        course = arr[i].name;
      }
    }
    this.setData({
      courseName: course,
      courseId: event.currentTarget.id,
      showModal: false
    })
   
    this.getTeacherListData();   //教师列表 
  },
  
  selectSchool: function (event){
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

    this.getTeacherListData();   //教师列表 
  },
  
})