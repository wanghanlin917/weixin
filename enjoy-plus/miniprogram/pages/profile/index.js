// pages/profile/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
    }
  },
  onLoad(){
    this.getUserInfo()
  },
  async getUserInfo(){
    const res = await wx.http.get('/userInfo')
    this.setData({
      userInfo:res.data
    })
  },
  async updateNickName(e){
    // console.log("修改昵称",e.detail.value);
    await wx.http.put(`/userInfo/${this.data.userInfo[0].id}`,{
      nickName:e.detail.value,
    })  
  },
  // 更新头像
  async updateAvatar(e){
    console.log("cfff",e.detail.avatarUrl)

    // 上传头像
    // wx.uploadFile({
    //   url: wx.http.baseURL + '/upload',
    //   header:{
    //     Authorization:wx.getStorageSync('token'),
    //   },
    //   name:'file',
    //   filePath:e.detail.avatarUrl,
    //   formData:{
    //     type:'avatar'
    //   },
    //   success:(res) =>{
    //     console.log(res);
    //     res.data = JSON.parse(res.data)
    //     this.setData({
    //       'userInfo.avatar':res.data.url
    //     }
    //     )
    //   }  
    // })
    const res = await wx.http.upload('/upload',{
      name:"file",
      filePath:e.detail.avatarUrl,
      formData:{
        type:'avatar'
      }
    })
    this.setData({
      'userInfo.avatar':res.data.url
    })
    console.log(res);

  }
})  