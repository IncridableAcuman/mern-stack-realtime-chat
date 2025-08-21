import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance=axios.create({
    withCredentials:true,
    baseURL:"http://localhost:8080/api"
});

axiosInstance.interceptors.request.use(
config=>{
    const token=localStorage.getItem("accessToken");
    if(token){
        config.headers['Authorization']=`Bearer ${token}`;
    }
    return config;
},
(error)=>Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    config=>config,
    async error=>{
        const originalRequest=error.config;
        if(error.response.status==401 && !originalRequest._retry){
            originalRequest._retry=true;
            try {
                const {data}=await axiosInstance.get("/auth/refresh");
                localStorage.setItem("accessToken",data.accessToken);
                error.headers['Authorization']=`Bearer ${data.accessToken}`;
                return axiosInstance.request(originalRequest);
            } catch (error) {
                console.log(error);
                localStorage.clear();
                toast.error(error.message || "Error with network")
                window.location.href="/login";
            }
        }
    },
    (error)=>Promise.reject(error)
);

export default axiosInstance;