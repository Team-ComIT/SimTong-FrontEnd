import axios from 'axios';
import { loginInfoType } from '../types/authType';

export const postLoginInfo = (info: loginInfoType) => {
    return axios.post('https://{BASE_URL}/users/tokens', info);
};
