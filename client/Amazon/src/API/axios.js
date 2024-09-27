import axios from 'axios';

export const axiosInstance = axios.create({
  //   baseURL: 'http://127.0.0.1:5001/amazzon-imran/us-central1/api',
  baseURL: 'https://amazon-api-deploy-51kg.onrender.com',
});
