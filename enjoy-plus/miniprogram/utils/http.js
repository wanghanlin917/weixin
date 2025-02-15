import http from 'wechat-http'

http.baseURL = 'http://127.0.0.1:8000/api'

// 请求拦截器
http.intercept.request = (config)=>{
  // config.header.Authorization = wx.getStorageSync('token')
  config.header = {
    // 携带token信息
    Authorization:wx.getStorageSync('token'),
    // 如果有传递header信息，可覆盖默认的header信息
    ...config.header
  }
  return config
}
// 响应拦截器，返回核心数据 data
http.intercept.response = async ({ data,config}) => {
  if (data.code === 0) {
    return data
  } else {
    console.log(data)
    if (data === ''){
      return 
    }
    else if(data.code === 401){
      const app = getApp()
      // 如果当前请求的路径是refreshToken，就不需要刷新，否则回死循环
      if(config.url.includes('refreshToken')){
        
        app.setToken('token','')
        app.setToken('refreshToken','')
        const pages = getCurrentPages() //返回的是数组
        // 获取当前页面的示例
        const page = pages[pages.length - 1] 
        wx.redirectTo({
          url: '/pages/login/index?redirectUrl=/' + page.route
        })
        return
      }
      //通过refreshToken刷新token
     await  http.post('/refreshToken',{},{
        header:{
          Authorization:wx.getStorageSync('refreshToken')
        }
      })
      
      app.setToken('token',data.token)
      app.setToken('refreshToken',data.refreshToken)
      // 打印外层的config,获取到原请求的配置
      console.log(config);
      config.header={
        Authorization:wx.getStorageSync('refreshToken')
      }
      return http(config)
    }
    else{
      const firstKey = Object.keys(data)[1]
      const err = data[firstKey]
      console.log('拦截器', err)
      const errKey = Object.keys(err)[0]
      const errInfo = err[errKey] 
      console.log("xxxx",errInfo)
      wx.utils.toast(errInfo[0] || '业务出错')
      // return data
      return Promise.reject(data)

    }

  }
}

// 导出模块
export default http
