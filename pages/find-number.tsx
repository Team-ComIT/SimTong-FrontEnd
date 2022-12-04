import React, { useState } from 'react';
import useInput from '../hooks/useInputs';
import { findInfoType } from '../types/findNumberType';
import { getEmployeeNumber } from '../apis/employeeNumber';
import Image from 'next/image';
import BackGroundImg from '../assets/imgs/BackGroundImg.png';
import styled from '@emotion/styled';
import FindNumber from '../components/FindNumber/FindNumber';
import { AxiosResponse } from 'axios';

const FindEmployeeNumberPage = () => {
    const [isResult, setIsResult] = useState<boolean>(false);
    const [employeeNumber, setEmployeeNumber] = useState<string>('');
    const [findInfo, setFindInfo] = useInput<findInfoType>({
        email: '',
        name: '',
        workSpace: '920567c0-815e-4e3c-9c5e-9eb8149893ef',
    });

    const then = (res: AxiosResponse) => {
        setIsResult(true);
        setEmployeeNumber(res.data.employee_number);
    };

    // const [findInfo, setFindInfo] = useState<findInfoType>({ email: '', name: '', workSpace: '' });

    return (
        <_PageBackGround>
            <_ImgLayout>
                <Image src={BackGroundImg} />
            </_ImgLayout>
            <_MainLayout>
                {isResult ? (
                    <FindNumber employeeNumber={employeeNumber} />
                ) : (
                    <_MainContainer>
                        <h1>사원번호 찾기</h1>
                        <_MainPoint />
                        <_InputLayout>
                            <p>이메일</p>
                            <input value={findInfo.email} onChange={setFindInfo} name="email" />
                        </_InputLayout>
                        <_InputLayout>
                            <p>이름</p>
                            <input value={findInfo.name} onChange={setFindInfo} name="name" />
                        </_InputLayout>
                        <_InputLayout>
                            <p>근무지</p>
                            <input />
                        </_InputLayout>
                        <_MainButton
                            onClick={() => {
                                getEmployeeNumber(findInfo, then);
                            }}>
                            사원 번호찾기 요청
                        </_MainButton>
                    </_MainContainer>
                )}
            </_MainLayout>
        </_PageBackGround>
    );
};

const _PageBackGround = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
`;

const _ImgLayout = styled.div`
    position: absolute;
    display: flex;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    background-repeat: no-repeat;
    background-size: cover;
`;

const _MainLayout = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const _MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 520px;
    height: 580px;
    background: #ffffff;
    box-shadow: 0px 7px 15px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    gap: 20px;

    h1 {
        font-family: 'NanumSquare';
        font-weight: 800;
        font-size: 24px;
        color: #343434;
        margin: 0px;
    }
`;

const _MainPoint = styled.div`
    width: 10px;
    height: 10px;
    background: #343434;
    border-radius: 100px;
`;

const _InputLayout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 5px;

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

const _MainButton = styled.button`
    cursor: pointer;
    padding: 0px 24px 0px 24px;
    height: 42px;
    background: #ed666a;
    border-radius: 5px;
    font-family: 'NanumSquare';
    font-weight: 700;
    font-size: 16px;
    color: #ffffff;
    border: none;
    margin-top: 20px;
`;

export default FindEmployeeNumberPage;
