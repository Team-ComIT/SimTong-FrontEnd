import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://3.39.162.197:8888',
    timeout: 10000,
    headers: {
        Authorization: `Bearer eyJKV1QiOiJhY2Nlc3MiLCJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI4OTllYWUzMi0wNTAwLTQ3NjItYjhlZi1hY2NiNTUwY2E0OTMiLCJhdXRob3JpdHkiOiJST0xFX1NVUEVSIiwiaWF0IjoxNjY5NzczMDQ2LCJleHAiOjE2Njk3NzQ4NDZ9.T7pGHpJc5HeNb36xyoaBwwxeaCKwNWkb6ks8sl6i3EkiRvEyPwIrqh61yCGL6g5_3DVqkhxP9_eHPAlT8_kKzQ`,
    },
});
