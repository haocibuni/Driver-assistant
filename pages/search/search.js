const app = getApp();
Page({
  data: {
    list: []
  },
  staticData: {
    inputValue: ""
  },
  //页面创建时执行 调用getSearchResult函数
  onLoad() {
    this.getSearchResult();
  },
  //向服务器发送请求 数据包括distinc和keyword 请求成功后回调getSearchResultSucc函数
  getSearchResult() {
    wx.request({
      url: 'https://weixin.haocibuni.cn/index.php',
      data: {
        distinct: app.globalData.distinct,
        keyword: this.staticData.inputValue
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: this.getSearchResultSucc.bind(this)
    })
  },
  //将得到的数据赋值给list
  getSearchResultSucc(res) {
    if (res.data.ret) {
      const result = res.data.data;
      this.setData({
        list: result
      })
    } else {
      this.setData({
        list: []
      })
    }
  },
  //调用getSearchResult()函数
  handleSearch() {
    this.getSearchResult()
  },
  //将staticdata中的inputvalue字符串进行赋值
  handleInputChange(e) {
    this.staticData.inputValue = e.detail.value;
  },
  //通过标签的currentTarge将id传入 链接到详情页
  handleItemTap(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.id,
    })
  }

})