import axios from 'axios'
import qs from 'qs'
import {Toast} from 'vant';
// let baseURL='/api'
let baseURL='https://icv1m969gqpx.jccdex.cn'
const service = axios.create({
  baseURL: baseURL,
  timeout: 10000            // 请求超时时间
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
    Toast.loading({
      mask: true,
      message: '加载中...'
    });
  console.log('请求：',config)
  if(config.method=='post'){
    config.data=qs.stringify(config.data)
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
      setTimeout(() => {
        Toast.clear();
      }, 2000)
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log('响应：',response)
  Toast.clear();
  return response;
}, function (error) {
  // 对响应错误做点什么
  setTimeout(() => {
    Toast.clear();
  }, 2000)
  return Promise.reject(error);
});
export default service
