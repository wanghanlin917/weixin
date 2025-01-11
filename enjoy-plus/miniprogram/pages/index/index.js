// 使用npm包前需要先构建

Page({
  data: {
    list: []
  },
  onLoad () {
    this.getData()
  },
  async getData () {
    // wx.request
    const res = await wx.http.get('/news')
    // console.log(res)
    this.setData({
      list: res.data
    })
  }
})
