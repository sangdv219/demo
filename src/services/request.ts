import { config } from "@/constant/config";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
//   baseURL: `http://localhost:3000/${process.env.VERSION}`,
  baseURL: `http://apiqlsxthuoc.blueskytech.vn`,
  timeout: 1000,
});

api.interceptors.request.use(async (config:InternalAxiosRequestConfig<any>) => {
    console.info('endpoint', `${config?.endpoint}/${process.env.VERSION}`)
//   const token = localStorage.getItem('keyToken');
//   config.headers.Authorization = `Bearer ${token}`;
  return config;
}),((error:Error)=>{
    return Promise.reject(error)
})

api.interceptors.response.use((response:AxiosResponse<any, any>) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}),((error:Error)=>{
    return Promise.reject(error)
})

export default api;
