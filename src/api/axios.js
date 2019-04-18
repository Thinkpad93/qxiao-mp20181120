import axios from 'axios';


const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  withCredentials: true //允许携带cookie
});


//request
service.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

//response
service.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});



export default service;
