// house_pkg/pages/locate/index.ts
import QQMapWX from "../../../libs/qqmap-wx-jssdk"
// 创建qqMap 实例
const qqMap = new QQMapWX({
  key:'O52BZ-BXLLL-4OWPY-MF3HY-OJ4T6-GRB3W'
})

Page({
  data:{
    list:[],
    address:'',

  },
  async onLoad(){
    // 获取当前地理位置
    const {latitude,longitude} = await wx.getLocation({type:'gcj02'})
    this.search({latitude,longitude})
    this.getPoint({latitude,longitude})
  },
  // 打开地图选择位置
  async chooseLocation(){
    const {name,latitude,longitude} = await wx.chooseLocation()
    this.setData({
      address:name,
    })
    this.search({latitude,longitude})
  },
  // 获取当前位置文本
  getPoint({latitude,longitude}){
    qqMap.reverseGeocoder({
      location:{latitude,longitude},
      success:(res)=>{
        console.log("逆地址解析",res);
        this.setData({
          address: res.result.address
        })
      }
    })

  },
  //搜索
  search({latitude,longitude}){     
    qqMap.search({ 
      location:{latitude,longitude},    
      keyword:'住宅小区',
      page_size:5,
      success:(res) =>{
        this.setData({
          list:res.data
        })
        console.log(res);
      }
    })
  }
})