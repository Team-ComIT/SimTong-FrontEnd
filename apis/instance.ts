import axios from 'axios';
import { useEffect } from 'react';

export const instance = axios.create({
    baseURL: 'http://3.39.162.197:8888',
    timeout: 10000,
    headers: {
        Authorization: `Bearer ${
            typeof window !== 'undefined' && localStorage.getItem('access_token')
        }`,
    },
});

axios.defaults.baseURL = 'http://3.39.162.197:8888';
