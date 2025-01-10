import http from 'wechat-http'

http.baseURL = "http://127.0.0.1:8000/api"

// 响应拦截器，返回核心数据 data
http.intercept.response = ({data}) =>{
  return data
}

// 导出模块
export default http