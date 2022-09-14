//获取App.js中的数据globaldata
const app = getApp();
Page({
  data: {
    longitude:"",  //经度
    latitude:"",   //纬度
    markers: [],   //客户所在标记点
    //将此点通过屏幕的高度和宽度固定在屏幕中点 在map组件中显示
    controls: [
      { 
      iconPath: '/resources/2.png',
      position: {
        left: (app.globalData.windowWidth/2)-9,
        top: (app.globalData.windowHeight/2)-27,
        width: 16,
        height: 16 
      },
      clickable: true  
     },
           
     ]
  },
  //页面显示时执行，获取用户坐标地址和服务器客户信息
  onShow() {
    this.getLocation();
    this.getMessages();
  },
  //页面初次渲染完成后 执行 通过api获取地图
  onReady() {
    this.mapCtx = wx.createMapContext('mymap');
  },
  //监听用户的下拉动作
  onPullDownRefresh() {
    console.log("下拉刷新");
  },
  //请求服务器 回调getMessageSucc函数
  getMessages() {
    wx.request({
      url: 'https://weixin.haocibuni.cn/index.php', 
      data: {
        distinct: app.globalData.distinct,
      }, 
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: this.getMessagesSucc.bind(this)
    })
  },
  //将从服务器获取的数据传入此函数 将服务器中的客户地址传入markers 然后再map组件中显示
  getMessagesSucc(res) {
    const data = res.data.data;
    const markers=data.map((value,index)=> {
      return {
        iconPath: "/resources/"+value.type+".png",
        id: value.id,
        latitude: value.latitude,
        longitude: value.longitude,
        width: 40,
        height: 40 

      }
    });
    this.setData({
      markers: markers
    })
  },
  //获取用户地址 回调handleGetLocationSucc函数
  getLocation() {
    wx.getLocation({
      type:'gcj02',
      success: this.handleGetLocationSucc.bind(this),
    })
  },
  //将传入的res赋值给data的经度和纬度
  handleGetLocationSucc(res) {
    this.setData({
      longitude:res.longitude,
      latitude:res.latitude
    })
  },
 //点击中心点控件，将地图中心移至当前经度和纬度 当前经度和纬度已经获取
  controltap(e) {
    console.log('a'),
    this.mapCtx.moveToLocation()
  },
  //点击标记点时回调标记点id 保留当前页面，跳转到应用内的marker详细信息页面
  handleMarkerTap(e) {
      wx.navigateTo({
        url: 'pages/detail/detail? id='+e.markerId
      })
  },
  //用户点击右上角转发
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '将小程序分享给好友',
      path: '/page/index/index'
    }
  }






  

})
