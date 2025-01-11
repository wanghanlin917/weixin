// components/auth/auth.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLogin: false
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {},

  // 生命周期
  lifetimes: {
    created () {},
    // attached相当于vue的mounted
    attached () {
      const app = getApp()
      const isLogin = Boolean(app.token)
      this.setData({
        isLogin
      })
      if (isLogin === false) {
        // wx.navigateTo({
        //   url: '/pages/login/index'
        // })
        // 关闭当前页面，跳转到应用中某个页面
        wx.redirectTo({
          url: '/pages/login/index'
        })
      }
    }
  }
})
