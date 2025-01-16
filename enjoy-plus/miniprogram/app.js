// app.js
import utils from './utils/utils'
import http from './utils/http.js'

// 挂载全局对象
wx.http = http

// 注册到全局
wx.utils = utils
App({
  token: wx.getStorageSync('token'),
  globalData: {},
  setToken (key, token) {
    // 保存token到全局App
    this[key] = token
    // 保存token到本地缓存
    wx.setStorageSync(key, token)
  }
  // onLaunch () {
  //   // 获取 tokeen
  //   wx.getStorageSync()
  // }
})
