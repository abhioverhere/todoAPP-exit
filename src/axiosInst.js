import axios from 'axios';
const axiosInst=axios.create({
    // baseURL:''
    baseURL:'http://localhost:4000'
})
axiosInst.interceptors.request.use((config)=>{
    const accessToken=sessionStorage.getItem("userToken");
    if(accessToken){
        if(config) config.headers.token=accessToken;}    
    return config;
},
    (error)=>{
        return Promise.reject(error);        
    }
)
export default axiosInst