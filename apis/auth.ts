import axios from 'axios';
import { loginInfoType } from '../types/authType';

export const postLogin = (info: loginInfoType) => {
    const copyInfo = { ...info };
    copyInfo.employee_number as number;
    return axios.post('https://{BASE_URL}/users/tokens', copyInfo);
};
