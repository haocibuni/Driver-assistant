const app = getApp()
var QQMapWX = require('../libs/qqmap-wx-jssdk.js')
var qqmapsdk = new QQMapWX({
    key: 'VM6BZ-HN5CW-7UPRG-OJSZP-VOCKZ-LGBW2'
  })
var detail = []
var longitude
var latitude
var address
Page({
  data:{
    longitude:"",
    latitude:"",
    detailId:{},
    success:false,
    modelHidden:true
  },
  //获取纬度和经度赋值到data关系到地图组件定位 将全局变量中的success赋值到data关系到救援按钮的显示方式
  onShow() {
    this.getLocation()
    this.getdata()
    this.setData({
      success: app.globalData.success,
    })
  },
  getdata() {
    wx.request({
      url: 'https://weixin.haocibuni.cn/getdata.php',
      data:1,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: this.handleSubmitSucc.bind(this)
    })
  },
  handleSubmitSucc(res) {
  },
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: this.handleGetLocationSucc.bind(this),
    })
  },
  handleGetLocationSucc(res) {
    this.setData({
      longitude: res.longitude,
      latitude: res.latitude
    })
  },
  // 维修点搜索函数 调用接口将周围修车点赋值到data中makers显示 详细信息赋值到detail
  nearby_search() {
       var _this = this;
       // 调用接口
       qqmapsdk.search({
            keyword: '汽车维修',  //搜索关键词
            page_size: 10,
            success: function (res) { //搜索成功后的回调
               var mks = []
               for (var i = 0; i < res.data.length; i++) {
                    mks.push({ // 获取返回结果，放到mks数组中
                        title: res.data[i].title,
                        id: res.data[i].id,
                        latitude: res.data[i].location.lat,
                        longitude: res.data[i].location.lng,
                        iconPath: "/resources/location.png", //图标路径
                        callout:{
                          content: "点击查看详细信息",
                          borderRadius: 5,
                          display: "ALWAYS",
                          borderWidth: "1rpx",
                          borderColor: "#48C23D"
                        },
                        width: 50,
                        height: 50
                    })
                }
                detail = res.data, 
                _this.setData({ //设置markers属性，将搜索结果显示在地图中
                    markers: mks,
                })
            }  
      });
  },
  //点击停车点详细信息函数 将详细信息组件显示 点击按钮可以拨打电话
  handleMarkerTap(e) {
    for(let i=0;i<detail.length;i++)
    {
      if(e.markerId==detail[i].id){
        this.setData({
          modelHidden: false,
          detailId: detail[i]
        })
      }
    }
  },
  callGetPhone(e) {
         // 号码
    let telPhone = e.currentTarget.dataset.getphone;
    this.callPhone(telPhone)
  },
  callPhone(phoneNumber) {
    wx.makePhoneCall({
      phoneNumber: phoneNumber+"",
      success: function() {
              console.log("拨打电话成功！")
      },
      fail: function() {
               console.log("拨打电话失败！")
      }
    })
  },
  closePopUp() {
    this.setData({
      modelHidden: true
    })
  },
  //求救按钮 将本本地缓存中的个人信息加当前位置 发送到紧急联系人手机
  rescue()  {
    var _this=this
    longitude = this.data.longitude
    latitude = this.data.latitude
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) { 
      address = res.result.address 
      _this.handleRescueSucc()
      }
    })
  },
  handleRescueSucc() {
    for (var i = 0; i < app.globalData.rescue.people.length; i++) {
      var content
      content = "您好，我是" + app.globalData.rescue.name + ",现在在" + address + " 经度为：" + longitude + " 纬度为：" + latitude + " 遭遇险情," + "我的病史如下：" + app.globalData.rescue.message + ",血型为" + app.globalData.rescue.type + " 请及时为我请求急救，感激不尽！"
    }
    console.log(content)
    var plugin = requirePlugin("qcloudsms")
    plugin.sendSMS(
      {
        secretid: '你的secretid',
        secretkey: '你的secretkey',
        mobile: "13406845773",
        content: ""
      },
      function success(res) {
        if (res.data.message) {
          console.log(res.data.message)
        } else if (res.data.result >= 0) {
          console.log(res.data.errmsg)
        } else {
          console.log(res.data.errmsg)
        }
      },
      function fail(err) {
        console.log(err.errMsg)
      }
    )
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