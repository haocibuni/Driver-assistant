const app = getApp();
Page({
  data: {
    address:"点击选择，要勾选哦~",
    success:false
  },
 staticdata:{
   type:"buy"
 },
  //调用api打开地图选择位置 回调handleChooseLocationSucc函数
  handleAddressClick() {
    wx.chooseLocation({
     success:this.handleChooseLocationSucc.bind(this)
    })
  },
  //将获得的位置信息赋值到data的address
  handleChooseLocationSucc(res) {
    this.setData({
      address: res.address
    });
    //对象的赋值 将经度和纬度以如下格式复制到staticdata
    Object.assign(this.staticdata,{
      latitude:res.latitude,
      longitude:res.longitude
    })
  },
  //将选择框中的信息赋值到静态数据
  handleTypeChange(res) {
    this.staticdata.type = res.detail.value
  },
  //将文本框中的信息赋值到静态数据
  handleMessageChange(res) {
    this.staticdata.message = res.detail.value
  },
  //将文本框中的信息赋值到静态数据
  handleContactChange(res) {
    this.staticdata.contact = res.detail.value
  },
  //提交按钮 先将表单数据进行判断如果不符合规则，则调用apishowtost并且返回当前
  handleSubmit() {
    if (this.data.address ==="点击选择，要勾选哦~" || !this.data.address){
      wx.showToast({
        title: '请填写地址信息',
        icon: 'loading',
        duration: 2000
      })
      return;
    }

    if (!this.staticdata.message) {
      wx.showToast({
        title: '请填写说明信息',
        icon: 'loading',
        duration: 2000
      })
      return;
    }

    if (!this.staticdata.contact) {
      wx.showToast({
        title: '请填写联系人信息',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    //将staticdata和data中的address以及app.globaldata中的distinct赋值到data
    const data = Object.assign({}, this.staticdata, {
      address: this.data.address,
      distinct:  app.globalData.distinct,
    })
    //发送请求并将表单数据放入data中 回调handleSubmitSucc函数
    wx.request({
      url: 'https://weixin.haocibuni.cn/getdata.php',
      data: data,
      method:  "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: this.handleSubmitSucc.bind(this)

    })
  },
  //表单上传成功后将data中的success赋值未true
  handleSubmitSucc(res) {
    if(res.data && res.data.ret){
      this.setData({
        success: true
      })
    }
    console.log(res.data)
  },
  //返回上一层函数
  handleBackTap() {
    wx.navigateBack({
    })

  },
  //分享函数
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '将小程序分享给好友',
      path: '/page/index/index'
    }
  }
})