// import axios from "axios";

// const http = axios.create({
//   baseURL: "https://service.olimjanov.uz/v1",
// });

// http.interceptors.request.use((config) => {
//   const access_token = localStorage.getItem("access_token");
//   if (access_token) {
//     config.headers["Authorization"] = access_token;
//   }
//   return config;
// });
// export default http;
import axios  from 'axios';
import type { AxiosInstance } from 'axios';
import { getDataFromCookie } from '@data-service';

const http : AxiosInstance = axios.create({
    baseURL:"https://service.olimjanov.uz/v1",
})

http.interceptors.request.use((config)=>{
    const token = getDataFromCookie("token")
    if(token){
        config.headers["Authorization"] = `${token}`
    }
    return config
})
export default http
