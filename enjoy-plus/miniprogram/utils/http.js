import http from 'wechat-http'

http.baseURL = 'http://127.0.0.1:8000/api'

// 响应拦截器，返回核心数据 data
http.intercept.response = ({ data }) => {
  if (data.code === 0) {
    return data
  } else {
    console.log(data)
    const firstKey = Object.keys(data)[1]
    const err = data[firstKey]
    console.log('拦截器', err)
    const errKey = Object.keys(err)[0]
    const errInfo = err[errKey]
    console.log(errInfo)
    wx.utils.toast(errInfo[0] || '业务出错')
    // return data
    return Promise.reject(data)
  }
}

// 导出模块
export default http
