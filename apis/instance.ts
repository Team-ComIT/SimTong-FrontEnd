import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://3.39.162.197:8888',
    timeout: 10000,
    headers: { Authorization: `Bearer eyJKV1QiOiJhY2Nlc3MiLCJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI4OTllYWUzMi0wNTAwLTQ3NjItYjhlZi1hY2NiNTUwY2E0OTMiLCJhdXRob3JpdHkiOiJST0xFX1NVUEVSIiwiaWF0IjoxNjY5NzE3MTcyLCJleHAiOjE2Njk3MTg5NzJ9.C3-jVfiPmAgH7rhPWdU3-SoyvEr7itsnlWRo-Jd59KEBq3zGtLMMR9LWl-8EKH7BUy8ekTGw-cM62d3XpYuPgQ` },
});
