import React, { useRef, useState, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { postLogin } from '../../apis/auth';
import { loginInfoType, responseType } from '../../types/authType';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';
import OutSideClickHandler from 'react-outside-click-handler';
import { AxiosError } from 'axios';

interface propsType {
    setIsModal: Dispatch<SetStateAction<boolean>>;
}

const LoginModal = ({ setIsModal }: propsType) => {
    const router = useRouter();
    const [loginInfo, setLoginInfo] = useState<loginInfoType>({
        employee_number: '',
        password: '',
    });
    const { mutate } = useMutation(postLogin, {
        onSuccess: (data: responseType) => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
        },
        onError: () => {
            alert('로그인에 실패했습니다');
        },
    });

    const onLogin = () => {
        const { employee_number, password } = loginInfo;
        if (employee_number && password) {
            let copyInfo = { ...loginInfo };
            copyInfo.employee_number = parseInt(copyInfo.employee_number as string);
            mutate(copyInfo);
        } else if (employee_number == '' && password) {
            alert('사원번호를 입력해주세요');
        } else if (employee_number && password == '') {
            alert('비밀번호를 입력해주세요');
        } else {
            alert('정보를 입력해주세요');
        }
    };

    const changeLoginState = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        const insertValue =
            name == 'employee_number' ? value.replace(/[^0-9]/g, '') : value.replace(/\s| /gi, '');
        setLoginInfo({
            ...loginInfo,
            [name]: insertValue,
        });
    };

    return (
        <_ModalBackground>
            <OutSideClickHandler onOutsideClick={() => setIsModal(false)}>
                <_LoginLayout>
                    <h1>LOGIN</h1>
                    <_LoginLine />
                    <_InputLayout>
                        <p>사원번호</p>
                        <input
                            name="employee_number"
                            onChange={changeLoginState}
                            value={loginInfo?.employee_number}
                        />
                    </_InputLayout>
                    <_InputLayout>
                        <p>비밀 번호</p>
                        <input
                            name="password"
                            type="password"
                            onChange={changeLoginState}
                            value={loginInfo.password}
                        />
                    </_InputLayout>
                    <button onClick={onLogin}>로그인</button>
                    <_SearhEmployeeNumberText>
                        사원번호를 잊으셨다면?{' '}
                        <span onClick={() => router.push('/find-number')}>사원번호 찾기</span>
                    </_SearhEmployeeNumberText>
                </_LoginLayout>
            </OutSideClickHandler>
        </_ModalBackground>
    );
};

const _ModalBackground = styled.div`
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
`;

const _LoginLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #ffffff;
    width: 540px;
    height: 600px;
    gap: 25px;

    h1 {
        font-family: 'NanumSquare';
        font-weight: 800;
        font-size: 32px;
        color: #e84045;
        margin: 0px;
    }

    button {
        cursor: pointer;
        transition: all 0.3s;
        width: 400px;
        height: 42px;
        background: #242424;
        border: none;
        border-radius: 5px;
        margin-top: 10px;
        font-family: 'NanumSquare';
        font-weight: 700;
        font-size: 16px;
        color: #ffffff;

        &:hover {
            background: #111111;
        }
    }
`;

const _LoginLine = styled.div`
    width: 50px;
    height: 2px;
    background: #e84045;
    border-radius: 100px;
`;

const _InputLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;

    p {
        font-family: 'NanumSquare';
        font-weight: 700;
        font-size: 18px;
        color: #343434;
        margin: 0px;
    }
    input {
        width: 400px;
        height: 42px;
        border: 1px solid #d3d3d3;
        border-radius: 5px;
    }
`;

const _SearhEmployeeNumberText = styled.p`
    font-family: 'NanumSquare';
    font-weight: 400;
    font-size: 18px;
    color: #5a5a5a;
    span {
        cursor: pointer;
        font-family: 'NanumSquare';
        font-weight: 400;
        font-size: 18px;
        text-decoration-line: underline;
        color: #e84045;
    }
`;

export default LoginModal;
