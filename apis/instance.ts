import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://3.39.162.197:8888',
    timeout: 10000,
    headers: {
        Authorization: `Bearer eyJKV1QiOiJhY2Nlc3MiLCJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI4OTllYWUzMi0wNTAwLTQ3NjItYjhlZi1hY2NiNTUwY2E0OTMiLCJhdXRob3JpdHkiOiJST0xFX1NVUEVSIiwiaWF0IjoxNjcwMTYzMzc4LCJleHAiOjE2NzAxNjUxNzh9.yNocUXKW1hbMi5ttRbNEYfR0emWU13Oou2NCBYwaGb6dyf3mQ2kx6C3B94wYO05J8E5nnErQ7yNhXfuUMSS7dw`,
    },
});
