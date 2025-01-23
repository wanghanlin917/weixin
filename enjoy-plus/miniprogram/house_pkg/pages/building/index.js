// house_pkg/pages/building/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size:0,
    point:'',   
    type:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(query) {
    this.fake(query.point)
  },
  fake(point){
    // 生成楼栋数
    const size = Math.floor(Math.random() * 4)+3
    // 漏洞名称
    const type = size > 4 ? '号楼':'栋'
    // 数据渲染
    this.setData({size,type,point})
  }
})