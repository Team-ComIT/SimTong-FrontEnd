import React, { useState } from 'react';
import useInput from '../hooks/useInputs';
import { findInfoType } from '../types/findNumberType';
import { getEmployeeNumber, getWorkspace } from '../apis/employeeNumber';
import { useQuery } from 'react-query';
import Workspace from '../components/FindNumber/Workspace';
import Image from 'next/image';
import BackGroundImg from '../assets/imgs/BackGroundImg.png';
import styled from '@emotion/styled';
import FindNumber from '../components/FindNumber/FindNumber';
import { AxiosResponse } from 'axios';

interface selectStateType {
    isShow: boolean;
    select: string;
}

const FindEmployeeNumberPage = () => {
    const { data } = useQuery('spot_list', getWorkspace);
    const [isResult, setIsResult] = useState<boolean>(false);
    const [employeeNumber, setEmployeeNumber] = useState<string>('');
    const [selectState, setSelectState] = useState<selectStateType>({
        isShow: false,
        select: '근무지를 선택해주세요',
    });
    const [findInfo, setFindInfo, changeFindInfo] = useInput<findInfoType>({
        email: '',
        name: '',
        workspace: '',
    });

    const setSelect = (select: string) => {
        setSelectState({ isShow: false, select: select });
    };

    const setWorkspace = (uuid: string) => {
        setFindInfo({ ...findInfo, workspace: uuid });
    };

    const then = (res: AxiosResponse) => {
        setIsResult(true);
        setEmployeeNumber(res.data.employee_number);
    };

    const showWorkspace = () => {
        setSelectState({ ...selectState, isShow: !selectState.isShow });
    };

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
                            <input value={findInfo.email} onChange={changeFindInfo} name="email" />
                        </_InputLayout>
                        <_InputLayout>
                            <p>이름</p>
                            <input value={findInfo.name} onChange={changeFindInfo} name="name" />
                        </_InputLayout>
                        <_InputLayout>
                            <p>근무지</p>
                            <_SelectBox>
                                <input value={selectState.select} onClick={showWorkspace} />
                                {selectState.isShow && (
                                    <_WorkspaceLayout>
                                        {data?.data.spot_list.map((item: any, index: number) => {
                                            return (
                                                <Workspace
                                                    key={index}
                                                    item={item}
                                                    setWorkspace={setWorkspace}
                                                    setSelect={setSelect}
                                                />
                                            );
                                        })}
                                    </_WorkspaceLayout>
                                )}
                            </_SelectBox>
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
        cursor: pointer;
        width: 400px;
        height: 42px;
        border: 1px solid #d3d3d3;
        border-radius: 5px;
    }
`;

const _SelectBox = styled.div`
    position: relative;
    overflow: visible;
    width: 400px;
    height: 42px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const _WorkspaceLayout = styled.div`
    -ms-overflow-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    z-index: 1;
    position: absolute;
    top: 50px;
    width: 400px;
    height: 100px;
    background-color: #ffffff;
    border: 1px solid #d3d3d3;
    border-radius: 5px;

    &::-webkit-scrollbar {
        display: none;
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
