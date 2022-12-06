import axios, { AxiosResponse } from 'axios';
import { findInfoType } from '../types/findNumberType';

export const getEmployeeNumber = (params: findInfoType, then: (res: AxiosResponse) => void) => {
    axios
        .get('http://3.39.162.197:8888/commons/employee-number', {
            params: {
                email: params.email,
                name: params.name,
                spotId: params.workspace,
            },
        })
        .then(then)
        .catch((res) => {
            console.log(res);
        });
};

export const getWorkspace = () => {
    return axios.get('http://3.39.162.197:8888/commons/spot');
};
