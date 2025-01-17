Page({
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  data:{
    userInfo:{},
  },
  onShow(){ // 每次显示页面都会触发
    const token = wx.getStorageSync('token')
    if(token){
      this.getUserInfo()
    }

  },
  // 获取用户信息
  getUserInfo(){
    const res = wx.http.get('/userInfo')
    console.log("ssss",res.data);
    this.setData({
      userInfo:res.data
    })
  }
})
