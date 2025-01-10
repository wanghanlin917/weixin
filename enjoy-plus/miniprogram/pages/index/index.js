// 使用npm包前需要先构建


Page({
  data:{
    list:[]
  },
  onLoad () {
    // wx.utils.toast('你好贱')
    this.getDate()
  },
  async getDate () {
    // wx.request
    const res = await wx.http(
      {
        method:'GET',
        url:'/news'
      }
    )
    console.log(res);
    this.setData({
      list:res.news_info
    })
  }
})
