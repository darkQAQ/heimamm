// axios 全局配置
import Vue from 'vue'
import axios from 'axios'
// 设置基础路径
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
// 允许携带cookie
axios.defaults.withCredentials=true;//让ajax携带cookie

Vue.prototype.$axios = axios;