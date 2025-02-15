Page({
  onShareAppMessage() {
    return {
      title: '查看通行证',
      path: '/visitor_pkg/pages/passport/index',
      imageUrl: 'https://enjoy-plus.oss-cn-beijing.aliyuncs.com/images/share_poster.png',
    }
  },
  // 小程序的授权检测
  authSetting(){
    wx.getSetting(
      // authSetting用户授权结果
      {success:({authSetting})=>{
        console.log(authSetting);
        if(authSetting["scope.writePhotosAlbum"] === false){
          // 拒绝了授权
          wx.showMoal({
            content:"请允许添加到相册",
            showCancel:false,
            success:()=>{
              // 打开设置
              wx.openSetting({
                success:({authSetting}) =>{
                  // console.log(authSetting);
                  if(authSetting["scope.writePhotosAlbum"]){
                    this.saveImg()
                  }
                }
              })
            }
          })
        }else{
          this.saveImg()
        }

      }}
    )
  },
  // 保存图片
  async saveImg (){
    try{
          // 1.获取图片信息(下载图片到本地)
    const {path} = await wx.getImageInfo({
      src: 'https://enjoy-plus.oss-cn-beijing.aliyuncs.com/uploads/qrcode.png',
    })
    // console.log(res);
    // 2.调用API保存图片
    await wx.saveImageToPhotosAlbum({
      filePath: path,
    })
    wx.utils.toast("下载成功")
    } catch(err){
// 
}
  },
})
