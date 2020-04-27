import axios from "axios";

const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

api.interceptors.request.use(config => {
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
})

export default api;