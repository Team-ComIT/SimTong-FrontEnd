import axios from 'axios';
import { loginInfoType, responseType } from '../types/authType';

export const postLogin = async (loginInfo: loginInfoType): Promise<responseType> => {
    const { data } = await axios.post('https://simtong-server.comit.or.kr/admins/tokens', loginInfo);
    return data;
};
