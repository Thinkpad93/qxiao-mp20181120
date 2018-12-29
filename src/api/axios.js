import axios from 'axios';



const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  withCredentials: true //允许携带cookie
});


service.interceptors.request.use(config => {
  console.log(config);
  return config;
}, error => {
  return Promise.reject(error);
});


service.interceptors.response.use(config => {
  console.log(config.data);
  if (config.data.errorCode === 0) {} else {}
  return config;
}, error => {
  return Promise.reject(error);
});


export default service;
