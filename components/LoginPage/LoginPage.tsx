import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

interface loginInfoType {
    employee_number: string;
    password: string;
}

const LoginPage = () => {
    const [loginInfo, setLoginInfo] = useState<loginInfoType>({
        employee_number: '',
        password: '',
    });

    const postLoginInfo = () => {
        axios.post('https://{BASE_URL}/users/tokens', loginInfo).then((res) => {});
    };

    const onChangeLoginInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    return (
        <_ModalBackground>
            <_LoginLayout>
                <_LoginTitle>LOGIN</_LoginTitle>
                <_LoginLine />
                <_InputLayout>
                    <_InputName>사원번호</_InputName>
                    <_TestInput name="employeeNumber" onChange={onChangeLoginInfo} />
                </_InputLayout>
                <_InputLayout>
                    <_InputName>어드민 번호</_InputName>
                    <_TestInput name="adminCode" onChange={onChangeLoginInfo} />
                </_InputLayout>
                <_LoginButton onClick={postLoginInfo}>로그인</_LoginButton>
                <_SearhEmployeeNumberText>
                    사원번호를 잊으셨다면?
                    <_SearhEmployeeNumber>사원번호 찾기</_SearhEmployeeNumber>
                </_SearhEmployeeNumberText>
            </_LoginLayout>
        </_ModalBackground>
    );
};

const _ModalBackground = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100vw;
    height: 100vh;
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
`;

const _LoginTitle = styled.h1`
    font-family: 'NanumSquare';
    font-weight: 800;
    font-size: 32px;
    color: #e84045;
    margin: 0px;
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
`;

const _InputName = styled.p`
    font-family: 'NanumSquare';
    font-weight: 700;
    font-size: 18px;
    color: #343434;
    margin: 0px;
`;

const _TestInput = styled.input`
    width: 400px;
    height: 42px;
    border: 1px solid #d3d3d3;
    border-radius: 5px;
`;

const _LoginButton = styled.button`
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
`;

const _SearhEmployeeNumberText = styled.p`
    font-family: 'NanumSquare';
    font-weight: 400;
    font-size: 18px;
    color: #5a5a5a;
`;

const _SearhEmployeeNumber = styled.p`
    font-family: 'NanumSquare';
    font-weight: 400;
    font-size: 18px;
    text-decoration-line: underline;
    color: #e84045;
`;

export default LoginPage;
