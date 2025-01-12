import validate from 'wechat-validate'

Page({
  behaviors: [validate],
  data: {
    countDownVisible: false,
    mobile:'',
    code:'',
  },
    // 定义表单数据的验证规则
    rules: {
      mobile: [
        { required: true, message: '请填写手机号码!' },
        { pattern: /^1[3-9]\d{9}$/, message: '请检查手机号码是否正确!' },
      ],
      code: [
        { required: true, message: '请填写短信验证码!' },
        { pattern: /^\d{6}$/, message: '请检查短信验证码是否正确!' }
      ]
    },

  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
  getSMSCode(){
    // 校验通过后才发送请求
    const {valid,message} = this.validate('mobile')
    if(valid){
      this.setData({
        countDownVisible:true
      }),
      wx.http.get('/code',{mobile:this.data.mobile})
    }else{
      wx.utils.toast(message)
    }

  },
  async onSubmit(){
    const isValidate = this.validate()
    if(isValidate){
      const {mobile,code} = this.data
      const res =await wx.http.post('/login',{mobile,code})
      const app = getApp()
      app.token = res.data.token
      wx.setStorageSync('token',res.data.token)
    }

  }
})
