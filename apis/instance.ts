import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://3.39.162.197:8888',
    timeout: 10000,
    headers: {
        Authorization: `Bearer eyJKV1QiOiJhY2Nlc3MiLCJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI4OTllYWUzMi0wNTAwLTQ3NjItYjhlZi1hY2NiNTUwY2E0OTMiLCJhdXRob3JpdHkiOiJST0xFX1NVUEVSIiwiaWF0IjoxNjY5NzIwMDA1LCJleHAiOjE2Njk3MjE4MDV9.lE2t2F8-UEIrrsEp5Bljmi3ICzU9gGo7kSNxt13o1kvptHkIQvTi4NQTt-139UUfA5uD26ZO2c3vbpEYNZqvew`,
    },
});
