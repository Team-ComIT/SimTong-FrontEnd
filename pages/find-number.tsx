import React, { useState } from 'react';
import Image from 'next/image';
import BackGroundImg from '../assets/imgs/BackGroundImg.png';
import styled from '@emotion/styled';

interface findInfoType {
    email: string;
    name: string;
    workSpace: string;
}

const FindEmployeeNumberPage = () => {
    const [findInfo, setFindInfo] = useState<findInfoType>({
        email: '',
        name: '',
        workSpace: '',
    });

    return (
        <_PageBackGround>
            <_ImgLayout>
                <Image src={BackGroundImg} />
            </_ImgLayout>
            <_MainLayout>
                <_MainContainer>
                    <_MainTitle>사원번호 찾기</_MainTitle>
                    <_MainPoint />
                    <_InputLayout>
                        <_InputName>이메일</_InputName>
                        <_MainInput />
                    </_InputLayout>
                    <_InputLayout>
                        <_InputName>이름</_InputName>
                        <_MainInput />
                    </_InputLayout>
                    <_InputLayout>
                        <_InputName>이메일</_InputName>
                        <_MainInput />
                    </_InputLayout>
                    <_MainButton>사원 번호찾기 요청</_MainButton>
                </_MainContainer>
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
`;

const _MainTitle = styled.h1`
    font-family: 'NanumSquare';
    font-weight: 800;
    font-size: 24px;
    color: #343434;
    margin: 0px;
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
`;

const _InputName = styled.p`
    font-family: 'NanumSquare';
    font-weight: 700;
    font-size: 18px;
    color: #343434;
    margin: 0px;
`;

const _MainInput = styled.input`
    width: 400px;
    height: 42px;
    border: 1px solid #d3d3d3;
    border-radius: 5px;
`;

const _MainButton = styled.button`
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
