// pages/login/login.js
import { getEduBackground, getCourses, getStudentType, getTeacherType, getStuBasis, getBaselevel, registerStudent, getRequire} from '../../api/api.js'
let app = getApp();
// 引用百度地图微信小程序JSAPI模块 
const AREAS = require('../../data/area.js');
var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = []; 
var BMap;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressMenuIsShow: false,
   
    cities: [],
   
    provincePicke: '',
    registerValue:'',
    value:[0,0],
    cities:[],
    animationAddressMenu:'',
    roles:[
      {
        name:'我是老师',
        key:'teacher',
        checked: false
      },
      {
        name:'我是家长',
        key:'student',
        checked: true
      }
    ],
    selectRole: 'student',
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
    courses:[],
    selectCourse:[],
    features: [],
    selectFeature: '',
    requires:[],  //教师资质
    selectRequire:'',
    studentsBasis:[],
    selectBasis:'',
    baseLevels:[],   //二级联动--年级
    baseLevelId:[],   //等级id
    levelId:'',   //年级id
    levels: [],    //二级联动--年级级别
    filePaths: [],
    studentFeatures:[],  //学生问题
    selectStuFeature: [],   //选中的学生问题
    markers: [],
    rgcData: {} ,
    longitude: '',   //经度  
    latitude: '',    //纬度  
    address: '',     //地址  
    cityInfo: {}     //城市信息 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
   
  }, 
  onLoad: function (options) {
    wx.showModal({
      title: '您的电话不会公开显示',
      content: '为保护您的隐私，仅当您主动向教师发送申请时，对方才可看到您的电话',
      confirmText: '我知道了',
      confirmColor:'#FF4D61',
      showCancel: false,
      success: function(){

      }
    
    })

    this.setData({
      selectRole: this.data.roles[1].key
    }) 


    this.getCoursesList();   //科目
    this.getStuBasisList();   //学生基础
    this.getBaselevelList();   //获取年级
    
    
    this.getStudentTypeList();//学生特点
    this.getTeacherTypeList();  //教学特点
    this.getRequireList();//获取教师资质

  },
  getTeacherTypeList: function(){
    getTeacherType().then( 
      (res)=>{
        this.setData({
          features: res.results
        })
        
      }
    )
  },
  getStudentTypeList: function(){
    getStudentType().then((res)=>{
      this.setData({
        studentFeatures: res.results
      })

    })
  },
  getCoursesList: function () {
    getCourses().then((res) => {
      console.log('科目', res.results);
      this.setData({
        courses: res.results
      })

      if (this.data.courses.length > 0){
        this.setData({
          selectCourse: this.data.courses[0].id -1
        })
      }
    })

  },
  getStuBasisList: function(){
    getStuBasis().then((res) =>{
      this.setData({
        studentsBasis: res.results
      })

      if (this.data.studentsBasis.length > 0){
        this.setData({
          selectBasis: this.data.studentsBasis[0].id - 1
        })
      }
    })
  },
  //获取年级
  getBaselevelList: function() {
    getBaselevel().then((res) => {
      this.setData({
        baseLevels: res.results,
       
        cities: res.results[0].level,
      })
      console.log('年级数据', this.data.baseLevels);
    })
  },
  getRequireList: function(){
    getRequire().then((res)=>{
      console.log('教师资质',res);
      this.setData({
        requires: res.results
      })

      if (this.data.requires.length > 0) {
        this.setData({
          selectRequire: this.data.requires[0].id - 1
        })
      }
      
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 地址选择器默认联动显示北京
    // 初始化动画变量
    let that = this;
    let animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    that.animation = animation;
   
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
  /* ******地址选择器start*********** */

  // 点击所在地区弹出选择框

  selectDistrict: function (e) {

    let that = this;
    if (that.data.addressMenuIsShow) {
      return
    }

    that.setData({
      addressMenuIsShow: true
    })
    console.log(e);

  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.setData({
      addressMenuIsShow: false
    })
    this.startAddressAnimation(false)
  },
  // 执行动画

  startAddressAnimation: function (isShow) {
    let that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(100 + 'vh').step()
    }
    console.log(that.animation.export());
    that.setData({
      animationAddressMenu: that.animation.export()
    })

  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    let that = this
    let city = that.data.city
    let value = that.data.value;

    // 将选择的城市信息显示到输入框
    that.setData({
      provincePicke: that.data.baseLevels[value[0]].id
    })

    let areaInfo = that.data.baseLevels[value[0]].name + ',' + that.data.cities[value[1]].name;
    //目标填入value
    that.setData({
      registerValue: areaInfo,
    })
    this.hideCitySelected();
    this.getLevelId(value);
  },
  hideCitySelected: function (e) {
    this.setData({
      addressMenuIsShow: false
    })
  },

  // 处理省市县联动逻辑
  cityChange: function (e) {
    let that = this;
    let value = e.detail.value;
   
    let baseLevels = that.data.baseLevels;

    let cities = that.data.cities;
    let provinceNum = value[0];
    let cityNum = value[1];
    // let countyNum = value[2]
    if (that.data.value[0] != provinceNum) {
      let id = baseLevels[provinceNum].id
      that.setData({
        value: [provinceNum, 0],
        cities: that.data.baseLevels[provinceNum].level
      })
    } else if (that.data.value[1] != cityNum) {
      let id = cities[cityNum].id
      that.setData({
        value: [provinceNum, cityNum]
      })
    }
    //console.log(this.data.value);
   
  },
  getLevelId: function(arr){
    var lev = arr[0];
    var grade = arr[1];
    this.setData({
      baseLevelId: this.data.baseLevels[lev].id,
      levelId: this.data.baseLevels[lev].level[grade].id
    })
    console.log('ID值',this.data.baseLevelId);
  },
  // 地址选择器end*************************** *//
  //切换注册身份
  radioChange: function (e) {
    wx.navigateTo({
      url: '../register/register'//实际路径要写全
    })
  },
  showToast: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var val = e.detail.value;
    if (app.trim(val.name).length == 0) {
      this.showToast('请填写您的称呼');
      return;
    }
    if (app.trim(val.phone).length == 0) {
      this.showToast('请填写您的电话号');
      return;
    } else if (app.trim(val.phone).length > 0 && app.trim(val.phone).length < 11) {
      this.showToast('请正确填写您的电话号');
      return;
    }
    if (val.subjects.length == 0) {
      this.showToast('请选择补习科目');
      return;
    }
    if (!val.level) {
      this.showToast('请选择学生年级');
      return;
    }
    if (!val.basis) {
      this.showToast('请选择学生基础');
      return;
    }
    if (!val.address) {
      this.showToast('请获取您的上课地点');
      return;
    }
    
    if (app.trim(val.times).length == 0) {
      this.showToast('请填写补习次数');
      return;
    }
   
    if (app.trim(val.money).length == 0) {
      this.showToast('请填写课时费用');
      return;
    }
    if (val.student_types.length == 0) {
      this.showToast('请选择存在问题');
      return;
    }
    if (val.teacher_types.length == 0) {
      this.showToast('请选择教学特点');
      return;
    }

    var reqData = e.detail.value;
    registerStudent(reqData).then((res)=>{
      if(res.status == 1){
        wx.showToast({
          title: '恭喜，注册成功',
          icon:'none'
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../students/index',
          })
        }, 2000)

      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  subjectBindPickerChange: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectCourse: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectSex: e.detail.value
    })
  },
  requireBindPickerChange: function(e){
    console.log(e.detail)
    this.setData({
      selectRequire: e.detail.value
    })
  },
  basisBindPickerChange: function(e){
    console.log(e.detail)
    this.setData({
      selectBasis: e.detail.value
    })
  },
  studentFeatureCheckboxChange: function (e) {
    var items = this.data.studentFeatures;
    var checkArr = e.detail.value;
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(items[i].id.toString()) != -1) {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    this.setData({
      studentFeatures: items,
      selectStuFeature: e.detail.value
    })

    console.log('学生特点', this.data.selectStuFeature);
  },
  //补习科目
  courseCheckboxChange: function (e) {
    var items = this.data.courses;
    var checkArr = e.detail.value;
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(items[i].id.toString()) != -1) {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    this.setData({
      courses: items,
      selectCourse: e.detail.value
    })
    console.log('补习科目', this.data.selectCourse);
  },
  //教学特点
  featureCheckboxChange: function(e){
    var items = this.data.features;
    var checkArr = e.detail.value;
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(items[i].id.toString()) != -1) {
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
  get_location: function(){
        var that = this;
        /* 获取定位地理位置 */
        // 新建bmap对象   
        var BMap = new bmap.BMapWX({
          ak: '9HY882UsD1FucEdC4LzpxoN3XVZiAnKS'
        });
        var fail = function (data) {
          console.log(data);
        };
        var success = function (data) {
          //返回数据内，已经包含经纬度  
          console.log(data);
          //使用wxMarkerData获取数据  
          wxMarkerData = data.wxMarkerData;
          //把所有数据放在初始化data内  
          that.setData({
            markers: wxMarkerData,
            latitude: wxMarkerData[0].latitude,
            longitude: wxMarkerData[0].longitude,
            address: wxMarkerData[0].address,
            cityInfo: data.originalData.result.addressComponent
          });
        }
        // 发起regeocoding检索请求   
        BMap.regeocoding({
          fail: fail,
          success: success
        }); 
      
  },
  showSearchInfo: function (data, i) {
    var that = this;
    that.setData({
      rgcData: {
        address: '地址：' + data[i].address + '\n'
      }
    }); 

    console.log(this.data.rgcData);
  }
  
 
})

