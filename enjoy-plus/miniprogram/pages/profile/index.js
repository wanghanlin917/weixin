// pages/profile/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  onLoad () {
    this.getUserInfo()
  },
  async getUserInfo () {
    const res = await wx.http.get('/userInfo')
    this.setData({
      userInfo: res.data[0]
    })
  },
  async updateNickName (e) {
    // console.log("修改昵称",e.detail.value);
    await wx.http.put(`/userInfo/${this.data.userInfo.id}`, {
      nickName: e.detail.value
    })
  },
  // 更新头像
  async updateAvatar (e) {
    console.log('cfff', e.detail.avatarUrl)

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
    const res = await wx.http.upload('/userInfo/upload', {
      name: 'file',
      filePath: e.detail.avatarUrl,
      formData: {
        type: 'avatar'
      }
    })
    this.setData({
      'userInfo.avatar_url': res.data.avatar_url
      // 'userInfo.avatar':'http://127.0.0.1:8000/media/upload/avatar/HdqQErHzQIjWe2f8971fb5092f4afdd101d1304deca6.jpg'
    })
    console.log(res)
  }
})
