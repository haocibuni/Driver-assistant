//app.js
//从本地缓存中获取窗口的高度和宽度
//如果本地缓存中没有则重新获取并把数据分别赋值给本地缓存和globalData
//如果本地缓存中有则直接将本地缓存中的数据赋值给globaldata
App({
  globalData:{
    distinct: "wulei-cource",
    rescue:[],
    success: false
  },
  //小程序初始化
  onLaunch() {
    try {
      const deviceInfo = wx.getStorageSync("deviceInfo")
      const rescue = wx.getStorageSync("rescue")
      if(!deviceInfo){
        const res = wx.getSystemInfoSync()
        this.globalData.windowHeight = res.windowHeight,
        this.globalData.windowWidth = res.windowWidth
        wx.setStorageSync("deviceInfo",{
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }else{
        this.globalData.windowHeight = deviceInfo.windowHeight,
        this.globalData.windowWidth = deviceInfo.windowWidth
      }
      if (rescue) {
        this.globalData.success = true
        this.globalData.rescue = rescue
      }
    } catch (e) {
      // Do something when catch error
    }
  },
})