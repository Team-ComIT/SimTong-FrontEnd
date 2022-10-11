import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://',
    timeout: 10000,
    headers: {
        // Authorization: `Bearer ${cookie.get('access_token')}`,
    },
});
