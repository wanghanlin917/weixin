Page({
  data:{
    detail:{}
  },
  // 获取页面参数
  onLoad(query){
    console.log("数据",query);
    this.getDetail(query.id)
    this.id = query.id
  },
  async getDetail(id){
    const res = await wx.http.get(`/room/${id}`)
    console.log(res);
    this.setData({
      detail:res.data 
    })
  },
  editHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/form/index?id='+ this.id,
    })
  },
})
