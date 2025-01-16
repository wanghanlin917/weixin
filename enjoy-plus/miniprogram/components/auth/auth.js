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
        // }) == vue中的 this.$router.push()

        // wx.redirectTo关闭当前页面，跳转到应用中某个页面 == this.$router.replace()
        // 获取页面栈

        const pages = getCurrentPages() //返回的是数组
        // 获取当前页面的示例
        const page = pages[pages.length - 1]

        wx.redirectTo({
          url: '/pages/login/index?redirectUrl=/' + page.route
        })
      }
    }
  }
})
