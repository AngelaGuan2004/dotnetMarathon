/* 提供用于发送的axios实例*/
import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 50000, // request timeout
  //withCredentials: true//携带cookie
  async: true,
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json', // 设置内容类型
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 获取 token 的函数，假设它从 localStorage 获取
    const token = localStorage.getItem('token'); // 获取 token

    if (token) {
      // 将 token 添加到请求头
      config.headers['token'] = token;
    }

    return config;
  },
  error => {
    // 处理请求错误
    return Promise.reject(error);
  }
);


// 响应拦截器
service.interceptors.response.use(
  response => {
    // 处理响应数据
    return response.data;
  },
  error => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

//暴露出去
export default service