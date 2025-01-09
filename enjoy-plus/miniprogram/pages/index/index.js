// 使用npm包前需要先构建
import http from 'wechat-http'
http.baseURL = 'http://127.0.0.1:8000/api'

Page({
  onLoad () {
    wx.utils.toast('你好贱')
    this.getDate()
  },
  async getDate () {
    // wx.request
    const res = await http({
      method: 'GET',
      url: 'https://live-api.itheima.net/announcement'
    })
    console.log('ddd', res)
  }
})
