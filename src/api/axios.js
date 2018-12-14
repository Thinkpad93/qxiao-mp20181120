import axios from 'axios';

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 20000,
  withCredentials: true //允许携带cookie
});
