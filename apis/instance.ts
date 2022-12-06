import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://3.39.162.197:8888',
    timeout: 10000,
    headers: { Authorization: `Bearer ` },
});

axios.defaults.baseURL = 'http://3.39.162.197:8888';
