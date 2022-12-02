import axios from 'axios';
import { loginInfoType, responseType } from '../types/authType';

export const postLogin = async (loginInfo: loginInfoType): Promise<responseType> => {
    const { data } = await axios.post('http://3.39.162.197:8888/admins/tokens', loginInfo);
    return data;
};
