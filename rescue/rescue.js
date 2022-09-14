const app = getApp();
Page({
  data: {
    lists: [{}, {}],
    date: '1990-09-01',
    success: false
  },
  staticdata: {
    people:[]
  },
  // 表单收集函数
  handleNameChange(res) {
    this.staticdata.name = res.detail.value
  },
  handleMessageChange(res) {
    this.staticdata.message = res.detail.value
  },
  handleTypeChange(res) {
    this.staticdata.type = res.detail.value
  },
  handleDateChange(res) {
    if(res.detail.value){
      this.staticdata.date = res.detail.value
    }
    else{
      this.staticdata.date = ""
    }
    this.setData({
      date: res.detail.value
    })
  },
  handlePeopleChange(res) {
    this.staticdata.people[res.target.dataset.id] = res.detail.value
  },
  addList() {
    var lists = this.data.lists;
    var newData = {};
    lists.push(newData);//实质是添加lists数组内容，使for循环多一次
    this.setData({
      lists: lists,
    })
  },
  //提交按钮 先将表单数据进行判断如果不符合规则，则调用apishowtost并且返回当前
  handleSubmit() {
    if (!this.staticdata.name) {
      wx.showToast({
        title: '请填写姓名',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    if (!this.staticdata.message) {
      wx.showToast({
        title: '请填写病史',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    if (!this.staticdata.type) {
      wx.showToast({
        title: '请选择血型',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    if (this.staticdata.people.length==0) {
      wx.showToast({
        title: '请填写至少一位紧急联系人',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    wx.request({
      url: 'https://weixin.haocibuni.cn/setdata.php',
      data: this.staticdata,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: this.handleSubmitSucc.bind(this)
    })
    wx.setStorageSync("rescue",this.staticdata)
    app.globalData.rescue = this.staticdata
  },
  handleSubmitSucc(res) {
    this.setData({
        success: true
      })
    app.globalData.success = true
    console.log(res.data)
  },
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