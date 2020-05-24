import axios from 'axios'
// import qs from 'querystring'

// 创建实例时设置配置的默认值
var instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  timeout: 60000 // 设置超时时间为1分钟
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  const headers = config.headers = config.headers || {}
  // 在发送请求之前做些什么
  let token = localStorage.getItem('x-token')
  headers['x-token'] = token
  if (config.json) {
    headers['Content-Type'] = 'application/json; charset=UTF-8'
    delete config.json
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token'])
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  let code = error.response.data.code
  switch (code) {
    case 1000:
      location.href = '/user/login?type=1'
      break
  }
  return Promise.reject(error)
})

export default instance
