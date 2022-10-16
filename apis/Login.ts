import axios from 'axios';

interface loginInfoType {
    employee_number: string;
    password: string;
}

export const postLoginInfo = (loginInfo: loginInfoType) => {
    axios.post('https://{BASE_URL}/users/tokens', loginInfo).then((res) => {});
};
