Page({

  // 页面显示，获取房屋列表
  onShow(){
    this.getList()
  },

  async getList(){
    const res = await wx.http.get('/room')
    console.log("fang",res.data);
    this.setData({
      list:res.data,
      isFristLoad:false
    })
  },
  data: {
    dialogVisible: false,
    list:[],
    isFristLoad:true
  },

  async swipeClose(ev) {

    console.log("id",ev.mark.id);
    // instance 滑动单元格的实例
    const { position, instance } = ev.detail

    if (position === 'right') {
      // 显示 Dialog 对话框
      // this.setData({
      //   dialogVisible: true,
      // })
      const res = await wx.showModal({
        title:"是否删除房屋？",
        content:"内容",

      })

      // swiper-cell 滑块关闭
      instance.close()
      if(res.confirm){
        await wx.http.delete(`/room/${ev.mark.id}`)
        //  前端乐观UI更新
        this.setData({
          list: this.data.list.filter(v => v.id !== ev.mark.id)

        })

      }
    }
  },

  goDetail(ev) {
    wx.navigateTo({
      url: '/house_pkg/pages/detail/index?id=' + ev.mark.id,
    })

  },

  addHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index',
    })
  },
})
