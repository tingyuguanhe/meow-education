// pages/complain.js
import { getReason, submitSuggestion } from '../../api/api.js'
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    filePaths:[],
    userType:0,
    complainReasons:[],
    selectReason:[],
    uploadUrl: 'http://114.112.75.135:7000/api/upload/',
    fileImgs: [],
    temImgUrl:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userType: options.type
    })
    this.getReasonList();
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
  
  formSubmit: function (e) {
    var val = e.detail.value;
    val.images = this.data.fileImgs;
    val.suggestion_obj = this.data.userType;
    if (this.data.selectReason.length == 0){
      wx.showToast({
        title: '请选择投诉原因',
        icon: 'none'
      })
      return;
    }

    if (!e.detail.value.detailed){
      wx.showToast({
        title: '请填写投诉详情',
        icon: 'none'
      })
      return;
    } 

    if (this.data.filePaths.length == 0) {
      wx.showToast({
        title: '请上传相关截图，否则无法提交',
        icon: 'none'
      })
      return;
    } 

    submitSuggestion(val).then((res)=>{
      if(res.status == 1){
        wx.showToast({
          title: '投诉成功',
          icon: 'none'
        })

        setTimeout(function () {
          wx.switchTab({
            url: '../user/index',
          })
        }, 2000)
        
      }else{
        wx.showToast({
          title: '投诉失败',
          icon: 'none'
        })
      }

      
      
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  uuid: function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for(var i = 0; i< 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  },
  getImage: function () {
    var _this = this;
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        console.log('图片s:',res.tempFilePaths);
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          //上传到服务器
          _this.uploadimg(res.tempFilePaths[i]);
        }
        
      }
    })
  },
  uploadimg: function (data) {
    var _this = this;
    wx.uploadFile({
      url: _this.data.uploadUrl,
      filePath: data,
      name: 'file',//这里根据自己的实际情况改
      // formData: null,
      success: function (res) {
        if (res.statusCode == 200) {
          var Data = JSON.parse(res.data);
          _this.data.temImgUrl.push({
            id: _this.uuid(),
            img: Data.url
          });
          _this.setData({
            filePaths: _this.data.temImgUrl
          })
          console.log('上传的图片',_this.data.filePaths);
          _this.getImgs(_this.data.filePaths);
          
        }
      },

      fail: function (err) {
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

  deleteImg: function(event){
    var _this = this;
    var id = event.currentTarget.dataset.imgid;
    var arr = _this.data.temImgUrl;
   
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        arr.splice(i, 1);
      }
    }
    _this.setData({
      filePaths: arr
    })
    this.getImgs(this.data.filePaths);
  },
  checkboxChange: function (e) {
    var items = this.data.complainReasons;
    var checkArr = e.detail.value;
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf((items[i].id).toString()) != -1) {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    this.setData({
      complainReasons: items,
      selectReason: e.detail.value
    })

    console.log(this.data.selectReason);
  },
  getReasonList: function(){
    var reqData={
      'type': this.data.userType
    }
    getReason(reqData).then((res)=>{
      console.log('原因',res);
      this.setData({
        complainReasons: res
      })
    })
  }
  
})

