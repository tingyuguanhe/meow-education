// pages/teachers/index.js
import { getTeacherList, getCity, getCourses, getSchools } from '../../api/api.js'
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
    searchByType: "",
    showSchoolModal: false,
    schoolsTypes: [],
    schoolName: "",
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCityList();   //城市
    this.getSchoolsList();  //学校
    this.getCoursesList();   //科目
  },
  getList: function (reqData){
    // app.request
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
    getCourses().then((res) => {
      console.log('科目', res.results);
      this.setData({
        coursesTypes: res.results
      })

      if (this.data.coursesTypes.length > 0){
        this.setData({
          searchByType: this.data.coursesTypes[0].name
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
    getSchools().then(
      (res) =>{
        // console.log('学校',res)
        this.setData({
          schoolsTypes: res.results
        })

        if (this.data.schoolsTypes.length > 0){
          this.setData({
            schoolName: this.data.schoolsTypes[0].name
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
    var reqData = {
      page: this.data.page,
      page_size: this.data.pageSize
    }
    
    this.getList(reqData);   //教师列表
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
      this.getCourse();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getCourse: function(){
    var req_data = {
      param: {
        page: this.data.page + 1,
        page_size: this.data.pageSize
      }
    }
    this.getList(req_data);

    
  },
  // 选择课程
  selectCourse: function(){
    this.setData({ 
      showModal: !this.data.showModal,
      showSchoolModal: false
    })
   
  },
  selectSchool: function(){
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
  searchByCourse: function (event){
    var course = "";
    var arr = this.data.coursesTypes;
    for (var i = 0; i < arr.length; i++){
      if (event.currentTarget.id == arr[i].id){
        course = arr[i].name;
      }
    }

    this.setData({
      searchByType: course,
      showModal: false
    })

    var reqData = {
      page: this.data.page,
      page_size: this.data.pageSize
    }

    this.getList(reqData);   //教师列表


    
  },
  
  searchBySchool: function (event){
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

    this.getCourse();
  }
})