// axios 全局配置
import Vue from 'vue'
import axios from 'axios'
import { getToken,removeToken } from '@/utils/token.js'
import router from '@/router';
// 设置基础路径
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
// 允许携带cookie
axios.defaults.withCredentials = true;//让ajax携带cookie
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.token = getToken();
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response);
  if(response.data.code == 206){
    //206 token 过期或不对  移除token 并跳转到 login
    removeToken();
    router.push('/login');
    return;
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


Vue.prototype.$axios = axios;