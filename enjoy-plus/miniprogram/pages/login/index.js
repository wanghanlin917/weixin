import validate from 'wechat-validate'

Page({
  behaviors: [validate],
  data: {
    countDownVisible: false,
    mobile: '',
    v_code: ''
  },
  onLoad (query) {
    this.query = query
  },
  // 定义表单数据的验证规则
  rules: {
    mobile: [
      { required: true, message: '请填写手机号码!' },
      { pattern: /^1[3-9]\d{9}$/, message: '请检查手机号码是否正确!' }
    ],
    v_code: [
      { required: true, message: '请填写短信验证码!' },
      { pattern: /^\d{4}$/, message: '请检查短信验证码是否正确!' }
    ]
  },

  countDownChange (ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0
    })
  },
  getSMSCode () {
    // 校验通过后才发送请求
    console.log('校验', this.validate('mobile'))
    const { valid, message } = this.validate('mobile')
    if (valid) {
      this.setData({
        countDownVisible: true
      }),
        wx.http.get('/code', { mobile: this.data.mobile })
    } else {
      wx.utils.toast(message)
    }
  },
  async onSubmit () {
    const isValidate = this.validate()
    if (isValidate) {
      const { mobile, v_code } = this.data
      const res = await wx.http.post('/login', { mobile, v_code })
      console.log('lllllll')
      console.log(res)

      // const firstKey = Object.keys(res)[1]
      // const err = res[firstKey]
      // const errKey = Object.keys(err)[0]
      // const errInfo = err[errKey]
      // if (res.code !== 0) {
      //   return wx.utils.toast(errInfo[0])
      // }
      const app = getApp()
      // app.token = res.data.token
      // wx.setStorageSync('token',res.data.token)
      app.setToken('token', res.data.token)
      // 页面回跳
      wx.redirectTo({
        url: this.query.redirectUrl || '/pages/index/index'
      })
    }
    
  }
})
