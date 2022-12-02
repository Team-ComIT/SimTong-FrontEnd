import axios from 'axios';

export const getEmployeeNumber = () => {
    return axios.get('http://3.39.162.197:8888/commons/employee-number');
};
