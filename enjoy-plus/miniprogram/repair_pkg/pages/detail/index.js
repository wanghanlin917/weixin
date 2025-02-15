// map.js
import qqMap from "../../../utils/qqmapsdk"
Page({
  data: {
    latitude: 40.060539,
    longitude: 116.343847,
    scale:16,
    markers:[
      {
      id:1,
      latitude: 40.060539,
      longitude: 116.343847,
      width:23, 
      height:23
    },
    {
      id:2,
      latitude: 40.061539,
      longitude: 116.343847,
      iconPath:'../../../static/images/marker.png',
      width:40,
      height:40
    },
  ],
  // 路径规划
  polyline:[]
  },
  onLoad(){
    this.getPoliyLine()
  },
  // 获取路径
  getPoliyLine(){
    console.log("hahah");
    qqMap.direction({
      mode:'bicycling', // 骑行路线
      from:{
        latitude: 40.060539,
        longitude: 116.343847,
      },
      to:{
        latitude: 40.061539,
        longitude: 116.343847,
      },
      success:(res)=>{
          console.log(res);
          // 提取压缩路径的坐标
          const coors = res.result.routes[0].polyline
          // console.log(coors);
          for (let i = 2; i < coors.length ; i++){
            coors[i] = coors[i-2] + coors[i]/1000000
          }
          // console.log("coors",coors);
         //将解压后的坐标放入点串数组points中
         const points = []
        for (var i = 0; i < coors.length; i += 2) {
          points.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        this.setData({
          polyline:[{
            points,
            color:'#00d26a',
            width:4,
          }]
        })
      }
    })
  }
})
