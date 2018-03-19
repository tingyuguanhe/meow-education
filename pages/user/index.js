const App = getApp()

Page({
	data: {
		userInfo: {},
		items: [
			{
        icon: '../../images/apply.png',
				text: '我的收藏',
				path: '/pages/order/list/index'
			}, 
			{
        icon: '../../images/apply.png',
				text: '我的发布',
				path: '/pages/address/list/index'
			}, 
			{
        icon: '../../images/apply.png',
				text: '我的申请',
				path: '',
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
		this.getUserInfo()
		// this.getStorageInfo()
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
    getUserInfo() {
    	const userInfo = App.globalData.userInfo

		if (userInfo) {
			this.setData({
				userInfo: userInfo
			})
			return
		}

		App.getUserInfo()
		.then(data => {
            console.log(data)
			this.setData({
				userInfo: data
			})
		})
    },
    // getStorageInfo() {
    // 	App.WxService.getStorageInfo()
    // 	.then(data => {
    // 		console.log(data)
    // 		this.setData({
    // 			'settings[0].path': `${data.currentSize}KB`
    // 		})
    // 	})
    // },
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
    isRegister: function(){
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
          } else if (res.cancel) {
            
          }
        }



      })
    }
})