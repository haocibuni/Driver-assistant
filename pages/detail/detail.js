const app = getApp();
Page({
  data:{
    address:"",
    type:"",
    message:"",
    contact:""
  },
  //创建页面函数 将options中的id获取 并调用函数getDetailInfo
  onLoad(options) {
  this.getDetailInfo(options.id);
  },
  //请求服务器 data为distinct和id 请求成功后回调getDetailInfoSucc函数
  getDetailInfo(id) {
    wx.request({
      url: 'https://weixin.haocibuni.cn/index.php',
      data: {
        distinct: app.globalData.distinct,
        id: id
      },
      method :"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: this.getDetailInfoSucc.bind(this)
    })
  },
  //将请求返回的数据赋值到本页面的data
  getDetailInfoSucc(res) {
    const result = res.data.data;
    this.setData({
      address:result.address,
      type:result.type,
      message:result.message,
      contact:result.contact
    })

  }
})