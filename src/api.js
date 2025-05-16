import axios from 'axios';

const API = axios.create({
    baseURL: 'https://job-tracker-z2wu.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
}); 

export default API;