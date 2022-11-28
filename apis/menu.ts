import axios from 'axios';
import { menuType } from '../types/menuType';

let now = new Date();

const getMenuList = () => {
    return axios.get('http://3.39.162.197:8888/menu', {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        params: { date: '' },
    });
};
