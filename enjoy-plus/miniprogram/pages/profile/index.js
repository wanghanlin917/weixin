// pages/profile/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },
  onLoad(){
    this.getUserInfo()
  },
  getUserInfo(){
    const res = wx.http.get('/userInfo')
    this.setData({
      userInfo:res.data
    })
  },
  async updateNickName(e){
    console.log("修改昵称",e.detail.value);
    await wx.http.put('/userInfo',{
      nickName:e.detail.value,
    })  
  }
})  