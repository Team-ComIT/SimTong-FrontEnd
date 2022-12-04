import React, { useState } from 'react';
import Check from '../../assets/svgs/Check.svg';
import Image from 'next/image';
import styled from '@emotion/styled';

interface propsType {
    employeeNumber: string;
}

const FindNumber = ({ employeeNumber }: propsType) => {
    return (
        <_Wrapper>
            <Image src={Check} />
            <div />
            <p>
                사원 번호는 <span>{employeeNumber}</span>입니다
            </p>
        </_Wrapper>
    );
};

const _Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 25px;
    width: 500px;
    height: 400px;
    background: #ffffff;
    box-shadow: 0px 7px 15px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    div {
        width: 90px;
        height: 2px;
        background: #f0f0f0;
        border-radius: 1000px;
    }

    p {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        font-size: 25px;
        color: #343434;
        margin: 0px;

        span {
            font-weight: 500;
        }
    }
`;

export default FindNumber;
