import axios from 'axios';
import {
  Toast
} from 'vant';

let toast = null;
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  withCredentials: true //允许携带cookie
});


service.interceptors.request.use(config => {
  toast = Toast.loading();
  console.log(config);
  return config;
}, error => {
  return Promise.reject(error);
});


service.interceptors.response.use(config => {
  console.log(config.data);
  if (config.data.errorCode === 0) {
    toast.clear();
  } else {
    toast.clear();
  }
  return config;
}, error => {
  toast.clear();
  return Promise.reject(error);
});


export default service;
