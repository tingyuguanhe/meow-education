import { userIsRegister } from '../../api/api.js'
const App = getApp()

Page({
	data: {
		userInfo: '',
		items: [
			{
        icon: '../../images/apply.png',
				text: '我的收藏',
				path: '/pages/collect/index',
        name:'collect'
			}, 
			{
        icon: '../../images/apply.png',
				text: '我的发布',
        path: '/pages/tea_publish/details',
        name: 'publish'
			}, 
			{
        icon: '../../images/apply.png',
				text: '我的申请',
        path: '/pages/apply/index',
        name: 'apply'
			}
		
		],
		settings: [
      {
        icon: '../../images/apply.png',
        text: '使用帮助',
        path: '/pages/help/index',
      },
			{
				icon: '../../images/apply.png',
				text: '关于我们',
				path: '/pages/about_us/index'
			}, 
		]
	},
	onLoad() {
		this.getStorageInfo()
	},
  // 点击跳转
	navigateTo(e) {
		const index = e.currentTarget.dataset.index
		const path = e.currentTarget.dataset.path

		switch(index) {
			case 2:
				App.WxService.makePhoneCall({
					phoneNumber: path
				})
				break
			default:
				App.WxService.navigateTo(path)
		}
    },
    getStorageInfo() {
      this.setData({
        userInfo: App.globalData.userInfo
      })
    },
    bindtap(e) {
    	const index = e.currentTarget.dataset.index
		  const path = e.currentTarget.dataset.path
      wx.navigateTo({
        url: path,
      })
    },

    signOut() {
    	App.HttpService.signOut()
    	.then(res => {
    		const data = res.data
    		console.log(data)
    		if (data.meta.code == 0) {
    			App.WxService.removeStorageSync('token')
    			App.WxService.redirectTo('/pages/login/index')
    		}
    	})
    },
    isRegister: function(e){
      userIsRegister().then((res)=>{
        //console.log(res);
        if (res.user_type == '未注册'){
          wx.showModal({
            title: '尚未注册',
            content: '注册后可更快找到合适的家教',
            confirmText: '立即注册',
            confirmColor: '#FF4D61',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../register/register'//实际路径要写全
                })
              } 
            }

          })
        }else{
         
          //console.log('类型', e.currentTarget.dataset.name);
          var url = "";
          var op_type = e.currentTarget.dataset.name;
          //我的发布
          if (op_type == 'publish'){
            if (res.user_type == '教师') {
              url = "/pages/tea_publish/details";
            } else if (res.user_type == '学生') {
              url = "/pages/stu_publish/details";
            }
            wx.navigateTo({
              url: url
            })
          }else{
            console.log(222);
            wx.navigateTo({
              url: e.currentTarget.dataset.path
            })
          }
        }
      })

      
    }
})