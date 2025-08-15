import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://nostratix-be-production.up.railway.app/'
})