Page({
  data: {
    currentDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [],
    houseName:'',
    repairList:[],
    repairName:'',
    // repairItem: [{ name: '水路卫浴' }, { name: '电路灯具' }, { name: '管道疏通' }, { name: '开锁换锁' }],
    id:undefined,
    houseId:'',
    mobile:'',
    appointment:'',
    description:'',
    attachment: [],
  },
  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false,
    })
  },

  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goList() {
    wx.reLaunch({
      url: '/repair_pkg/pages/list/index',
    })
  },
  // 自己写的代码
  selectHouse(ev){
      // console.log(ev.detail);
      this.setData({
        houseName:ev.detail.name
      })
  },
  selectRepair(ev){
    // console.log(ev.detail);
    this.setData({
      repairName: ev.detail.name
    })
  },
  // 页面加载
  onLoad(){
    // 查询审核通过的房屋
    this.getHouseList()
    // 查询维修项目
    this.getRepairList()
  },
  async getHouseList(){
    const res = await wx.http.get('/house')
    this.setData({
      houseList:res.data,
    })
  },
  async getRepairList(){
    const res = await wx.http.get('/repairItem')
    console.log(res.data);
    this.setData({
      repairList:res.data
    })
  },
  // 选择日期
  confirmDate(ev){
    // console.log(ev.detail);
    // const date = new Date(ev.etail)
    // const year = date.getFullYear() 
    // const month = date.getMonth() + 1
    // const day = date.getDate()
    // console.log(wx.utils.formatDate(ev.detail));
    this.setData({
      appointment:wx.utils.formatDate(ev.detail),
      dateLayerVisible:false,
    })
    // this.setData({
    //   appointment:date.toLocaleDateString('zh-CN').replaceAll('/','-'),
    //   dateLayerVisible:false,
    // })

  },
  // 选择文件后自动触发
  async afterRead(ev){
    // console.log("ev",ev.detail.file.tempFilePath);
    const filePath = ev.detail.file.tempFilePath
    const res = await wx.http.upload('/userInfo/upload',{
      name:'file',
      filePath:filePath,
      formData:{
        type:"repairImg"
      }
    })
    // console.log(res.data['url']);
    this.setData({
      attachment:[...this.data.attachment, res.data]
    })
    // const res2 = this.data.attachment.map((val) => ({url:val.localUrl}))
    const attachment = this.data.attachment.map((item) => item.id)
    console.log(attachment);
  },
  //删除图片
  uploaderDelete(ev){
    // console.log(ev);
    this.setData({
      attachment: this.data.attachment.filter((item,index) =>{
        index !== ev.detail.index
      })
    })
  },
  // 文件读取前
  beforeRead(ev){
    // console.log();
    const {file,callback} = ev.detail
    // 文件大小限制
    if(file.size > 1024*1024*1){
      wx.utils.toast('文件大小不能超过1M')
      return callback(false)
    }
    callback(true)
  }
})
