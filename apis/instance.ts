import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://3.39.162.197:8888',
    timeout: 10000,
    headers: {
        Authorization: `Bearer eyJKV1QiOiJhY2Nlc3MiLCJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI4OTllYWUzMi0wNTAwLTQ3NjItYjhlZi1hY2NiNTUwY2E0OTMiLCJhdXRob3JpdHkiOiJST0xFX1NVUEVSIiwiaWF0IjoxNjY5NzY3MjI2LCJleHAiOjE2Njk3NjkwMjZ9.qT-vHPCXTrBu8YEbMthkS8FhPVOHirA7ETxDJoVmLA7MLva_PfqaELc0tyEBBmSGKEGXOf7JZs3j7XKYo4tyew`,
    },
});
