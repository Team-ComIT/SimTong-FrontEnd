import axios from 'axios';
import { useEffect } from 'react';

export const instance = axios.create({
  baseURL: 'https://simtong-server.comit.or.kr',
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${
      typeof window !== 'undefined' && localStorage.getItem('access_token')
    }`,
  },
});

axios.defaults.baseURL = 'https://simtong-server.comit.or.kr';
