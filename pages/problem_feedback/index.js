
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filePaths: [],
    complainReasons: [
      {
        name: '有虚假信息',
        id: 'xujiaxinxi',
        checked: false
      },
      {
        name: '界面不好看',
        id: 'nenglidi',
        checked: false
      },
      {
        name: '收到骚扰',
        id: 'zhongjie',
        checked: false
      },
      {
        name: '功能不够',
        id: 'gongnengbugou',
        checked: false
      },
      {
        name: '出现错误',
        id: 'kuangke',
        checked: false
      },
      {
        name: '填写信息不完善',
        id: 'keshifei',
        checked: false
      },
      {
        name: '其它问题',
        id: 'pinxinwenti',
        checked: false
      }
    ],
    selectReason: []
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

  formSubmit: function (e) {
    if (this.data.selectReason.length == 0) {
      wx.showToast({
        title: '请选择投诉原因',
        icon: 'none'
      })
      return;
    }

    if (!e.detail.value.textarea) {
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

    // console.log(this.data.filePaths);
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
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
  chooseImage: function () {
    var _this = this;
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var imgs = [];
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          imgs.push({
            id: _this.uuid(),
            img: res.tempFilePaths[i]
          })
        }

        _this.setData({
          filePaths: imgs
        })
        console.log(_this.data.filePaths);
      }
    })
  },
  uploadimg: function () {//这里触发图片上传的方法
    var pics = this.data.pics;
    app.uploadimg({
      url: 'https://........',//这里是你图片上传的接口
      path: pics//这里是选取的图片的地址数组
    });
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
  },
  checkboxChange: function (e) {
    var items = this.data.complainReasons;
    var checkArr = e.detail.value;
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(items[i].id) != -1) {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    this.setData({
      complainReasons: items,
      selectReason: e.detail.value
    })
  }

})

//多张图片上传
function uploadimg(data) {
  var that = this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
  wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'fileData',
    formData: null,
    success: (resp) => {
      success++;
      console.log(resp)
      console.log(i);
      //这里可能有BUG，失败也会执行这里
    },
    fail: (res) => {
      fail++;
      console.log('fail:' + i + "fail:" + fail);
    },
    complete: () => {
      console.log(i);
      i++;
      if (i == data.path.length) {  //当图片传完时，停止调用     
        console.log('执行完毕');
        console.log('成功：' + success + " 失败：" + fail);
      } else {//若图片还没有传完，则继续调用函数
        console.log(i);
        data.i = i;
        data.success = success;
        data.fail = fail;
        that.uploadimg(data);
      }
    }
  });
}

