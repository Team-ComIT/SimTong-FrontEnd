import axios, { AxiosResponse } from 'axios';
import { findInfoType } from '../types/findNumberType';

export const getEmployeeNumber = (params: findInfoType, then: (res: AxiosResponse) => void) => {
    axios
        .get('https://simtong-server.comit.or.kr/commons/employee-number', {
            params: {
                email: params.email,
                name: params.name,
                spotId: params.workspace,
            },
        })
        .then(then)
        .catch((res) => {
            alert('정보가 잘못되었습니다');
        });
};

export const getWorkspace = () => {
    return axios.get('https://simtong-server.comit.or.kr/commons/spot');
};
