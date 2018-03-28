
// index.js
import { getTeacherDetail, getSchools, getEduBackground, getCourses, getTeacherType, updateTeacher } from '../../api/api.js'
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
    temImgUrl:[],
    infos:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getSchoolsList();   //学校
    this.getEduBackgroundList();  //学历
    this.getCoursesList();   //科目
    this.getTeacherTypeList();//教学特点
    this.getTeaDetail(this.data.id);   //获取教师信息

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
  getTeaDetail: function (id) {
    var reqData = {
      id: id
    }
    getTeacherDetail(reqData).then((res) => {
      // console.log('教师详情', res);
      for (var i = 0; i < res.confirms.length;i++){
        this.resetImgs(res.confirms[i]);
      }
      var select_subject = [];
      var select_feature = [];
      for (var i = 0; i < res.subjects.length;i++){
        select_subject.push((res.subjects[i].id).toString());
      }
      for (var i = 0; i < res.teacher_types.length; i++) {
        select_feature.push((res.teacher_types[i].id).toString());
      }

      this.check_subject(select_subject, this.data.courses);   //课程
      this.check_tea_feature(select_feature, this.data.features);//教学特点

      this.setData({
        infos: res,
        photoUrl: res.head_image,
        selectSex: res.sex,
        selectSchool: res.school.id - 1,
        selecteEduBg: res.learn - 1,
        
      })
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    
    var val = e.detail.value;
    val.confirms = this.data.fileImgs;
    val.head_image = this.data.photoUrl;
    
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
    var reqData = {
      id: this.data.id
    }

    updateTeacher(reqData,val).then((res)=>{
      //console.log('修改教师',res);
      if(res.status == 1){
        wx.showToast({
          title: '恭喜，修改成功',
        })
        setTimeout(function(){
          wx.switchTab({
            url: '../user/index',
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
    //console.log('form发生了reset事件')
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
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectSex: e.detail.value
    })
  },
  bindPickerSchoolChange: function(e){
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectSchool: e.detail.value
    })
  },
  bindPickerEduChange: function(e){
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selecteEduBg: e.detail.value
    })
  },
  checkboxChange: function (e) {
    this.check_subject(e.detail.value,this.data.courses);
    this.setData({
      selectCourse: e.detail.value
    })
  },
  //勾选科目
  check_subject: function (checkArr,items){
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf((items[i].id).toString()) != -1) {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    this.setData({
      courses: items
    })
  },
  featureCheckboxChange: function(e){
    this.check_tea_feature(e.detail.value,this.data.features);
    this.setData({
      selectFeature: e.detail.value
    })
  },
  //勾选教学特点
  check_tea_feature: function (checkArr, items) {
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf((items[i].id).toString()) != -1) {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    this.setData({
      features: items
    })
  },
  //选择教师头像
  choosePhoto: function(e){
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
          
          if (imgType == 'photo'){
            _this.setData({
              photoUrl: Data.url
            })
            //console.log('头像', _this.data.photoUrl);
          }else{ 
            _this.resetImgs(Data.url);
            //处理相关证书格式，方便提交给后台
            _this.getImgs(_this.data.filePaths);
            
          }
          
        }
      },
      
      fail: function(err){
        console.log(err);
      }
      
    });
  },
  resetImgs: function(url){
    this.data.temImgUrl.push({
      id: this.uuid(),
      img: url
    });
   
    this.setData({
      filePaths: this.data.temImgUrl
    })

  },
  //提交前转化相关证书格式
  getImgs: function (data) {
    var imgs = [];
    for (var i = 0; i < data.length; i++) {
      imgs.push(data[i].img);
    }
    this.setData({
      fileImgs: imgs
    })
   // console.log('相关证书', this.data.fileImgs);
  },
 
  deleteImg: function (event) {
    var _this = this;
    var id = event.currentTarget.dataset.imgid;
    var arr = _this.data.temImgUrl;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        arr.splice(i, 1);
      }
    }

    this.setData({
      filePaths: arr
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


