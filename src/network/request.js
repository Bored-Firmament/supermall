import axios from "axios";

export function request(config) {
  // 1.创建 axios 实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000,
  })

  // 2.拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    return config;
  }, err => {
    console.log('请求发送失败,失败原因:', err);
  });
  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data;
  }, err => {
    console.log('请求响应失败,失败原因:', err);
  });

  // 3.发送真正的网络请求
  return instance(config);
}
