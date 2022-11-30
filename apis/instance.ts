import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://3.39.162.197:8888',
    timeout: 10000,
    headers: {
        Authorization: `Bearer eyJKV1QiOiJhY2Nlc3MiLCJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI4OTllYWUzMi0wNTAwLTQ3NjItYjhlZi1hY2NiNTUwY2E0OTMiLCJhdXRob3JpdHkiOiJST0xFX1NVUEVSIiwiaWF0IjoxNjY5NzcwNTU3LCJleHAiOjE2Njk3NzIzNTd9.IueJVN1Du-so-PSnsC0H8uFGkalcjrRpPr3EGvItqEsaMCsLSRe-c_YBMv-CLf9jfi6BfHY7VI2kC51UqzxEpg`,
    },
});
