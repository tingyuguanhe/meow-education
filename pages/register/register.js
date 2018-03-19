
// index.js
import { getSchools, getEduBackground, getCourses, getTeacherType, registerTeacher } from '../../api/api.js'
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  props: {
    store: app.globalData.store
  },
  data: {
    bg_url: '../../images/bg.png',
    sex: [
      {
        id: 0,
        name: '女'
      },
      {
        id: 1,
        name: '男'
      }
    ],
    selectSex: 0,
    schools: [],
    selectSchool: '',
    educational_bg: [],
    selecteEduBg: '',
    courses:[],  //科目
    selectCourse: [],
    lastName: '',
    features: [],  //教学特点
    selectFeature: [],
    filePaths: [],   //相关证书
    photoUrl:'',   //头像
    uploadUrl: 'http://114.112.75.135:7000/api/upload/',
    fileImgs:[],
    temImgUrl:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showModal({
      title: '您的电话不会公开显示',
      content: '为保护您的隐私，仅当您主动向家长发送申请时，对方才可看到您的电话',
      confirmText: '我知道了',
      confirmColor:'#FF4D61',
      showCancel: false,
      success: function(){

      }
    
    })
   
    this.getSchoolsList();   //学校
   
    this.getEduBackgroundList();  //学历
    this.getCoursesList();   //科目
    this.getTeacherTypeList();//教学特点

  },
  //学历
  getEduBackgroundList: function () {
    getEduBackground().then((res) => {
      this.setData({
        educational_bg: res.results
      });
      if (this.data.educational_bg.length > 0) {
        this.setData({
          selecteEduBg: this.data.educational_bg[0].id - 1
        });
      }
     
    })
  },
//教育经历
  getSchoolsList: function(){
    getSchools().then((res)=>{
      this.setData({
        schools: res.results
      })

      if (this.data.schools.length > 0) {
        this.setData({
          selectSchool: this.data.schools[0].id - 1
        })
      }
    })
  },
  getCoursesList: function(){
    getCourses().then((res) => {
      //console.log('科目', res.results);
      this.setData({
        courses: res.results
      })
    })
    
  },
  getTeacherTypeList: function(){
    getTeacherType().then((res)=>{
      this.setData({
        features: res.results
      })
    })
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
  radioChange: function (e) {
    wx.navigateTo({
      url: '../parents_register/parents_register'//实际路径要写全
    })
  },
 
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var val = e.detail.value;
    if (app.trim(val.last_name).length == 0){
      this.showToast('请填写您的姓氏');
      return;
    }
    if (app.trim(val.phone).length == 0) {
      this.showToast('请填写您的电话号');
      return;
    } else if (app.trim(val.phone).length > 0 && app.trim(val.phone).length <11){
      this.showToast('请正确填写您的电话号');
      return;
    }

    if (!val.sex) {
      this.showToast('请选择您的性别');
      return;
    }
    if (!val.school) {
      this.showToast('请选择您的教育经历');
      return;
    }
    if (!val.learn) {
      this.showToast('请选择您的学历');
      return;
    }
    if (app.trim(val.profession).length == 0) {
      this.showToast('请填写您的专业');
      return;
    }
    if (app.trim(val.high_score).length == 0) {
      this.showToast('请填写您的高考分数');
      return;
    }
    if (app.trim(val.money).length == 0) {
      this.showToast('请填写您的期望薪资');
      return;
    }
    if (val.subjects.length == 0){
      this.showToast('请选择教学科目');
      return;
    }
    if (val.teacher_types.length == 0) {
      this.showToast('请选择教学特点');
      return;
    }

    registerTeacher(val).then((res)=>{
      console.log('注册教师',res);
      if(res.status == 1){
        wx.showToast({
          title: '恭喜，注册成功',
        })
        setTimeout(function(){
          wx.switchTab({
            url: '../teachers/index',
          })
        },2000)
        
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })

  },
  showToast: function(msg){
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  //设置姓氏
  setTeaLastName: function(e){
    var newVal = app.trim(e.detail.value);
    if (!!e.detail.value && newVal.length > 0){
      var input = newVal.substr(0, 1);
      // + '老师'
      this.setData({
        lastName: input
      })
    }
    
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectSex: e.detail.value
    })
  },
  bindPickerSchoolChange: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectSchool: e.detail.value
    })
  },
  bindPickerEduChange: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selecteEduBg: e.detail.value
    })
  },
  checkboxChange: function (e) {
    var items = this.data.courses;
    var checkArr = e.detail.value;
   
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf((items[i].id).toString()) != -1) {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    this.setData({
      courses: items,
      selectCourse: e.detail.value
    })
      
    //console.log(this.data.selectCourse);
  },
  featureCheckboxChange: function(e){
    var items = this.data.features;
    var checkArr = e.detail.value;
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(items[i].id.toString()) != -1)            {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    this.setData({
      features: items,
      selectFeature: e.detail.value
    })

    console.log(e.detail.value);
  },
  //选择教师头像
  choosePhoto: function(e){
    console.log(e);
    var img_type = e.currentTarget.dataset.type;
    var _this = this;
    wx.chooseImage({
      count: 1, // 允许上传的图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        //上传到服务器
        _this.uploadimg(tempFilePaths[0], img_type);
      }
    })
  },
  //上传证书
  getImage: function (e) {
    var _this = this;
    var img_type = e.currentTarget.dataset.type;

    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          //上传到服务器
          _this.uploadimg(res.tempFilePaths[i], img_type);
        }
      }
    })
  },
  uploadimg: function (data,imgType){
    var _this = this;
   
    wx.uploadFile({
      url: _this.data.uploadUrl,
      filePath: data,
      name: 'file',//这里根据自己的实际情况改
      // formData: null,
      success: function(res) {
        if (res.statusCode == 200){
          var Data = JSON.parse(res.data);
          console.log(Data);
          if (imgType == 'photo'){
            _this.setData({
              photoUrl: Data.url
            })
            //console.log('头像', _this.data.photoUrl);
          }else{
            
            _this.data.temImgUrl.push({
              id: _this.uuid(),
              img: Data.url
            });
            _this.setData({
              filePaths: _this.data.temImgUrl
            })
            _this.getImgs(_this.data.filePaths);
            
          }
          
        }
      },
      
      fail: function(err){
        console.log(err);
      }
      
    });
  },
  getImgs: function (data) {
    var imgs = [];
    for (var i = 0; i < data.length; i++) {
      imgs.push(data[i].img);
    }
    this.setData({
      fileImgs: imgs
    })
    console.log('相关证书', this.data.fileImgs);
  },
 
  deleteImg: function (event) {
    var _this = this;
    var id = event.currentTarget.dataset.imgid;
    for (var i = 0; i < _this.data.filePaths.length; i++) {
      if (_this.data.filePaths[i].id == id) {
        _this.data.filePaths.splice(i, 1);
      }
    }
    this.setData({
      filePaths: this.data.filePaths
    })
    this.getImgs(this.data.filePaths);
    
  },
  uuid: function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  },
})


