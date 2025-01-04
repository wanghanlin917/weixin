Page({
  data: {
    // 高亮下标默认值 0
    activeIndex: 0,
    triggered: false
  },
  // 点击修改高亮下标
  changeIndex(ev) {
    // 推荐通过 mark: 传参
    // 早期写法通过 data- 传参
    // console.log(ev.mark.index);
    this.setData({
      activeIndex: ev.mark.index
    })
  },
  // 滚动触底
  onScrolltolower(){
    wx.showToast({title:'滚动触底'})
  },
  // 下拉时触发
  onRefresherrefresh(){
    
    wx.showToast({title:'下拉时触发'})

    setTimeout(()=>{
      this.setData({
        triggered: false
      })
    },1500)
  }
})