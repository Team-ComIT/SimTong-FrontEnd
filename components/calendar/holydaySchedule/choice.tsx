import styled from '@emotion/styled';
import HolyDayShow from '../../../assets/imgs/HolydayShow.png';
import HolyDaySetting from '../../../assets/imgs/HolydaySetting.png';
import Image from 'next/image';
import { useState } from 'react';

const HolydayChoice = ({ setStatus }: { setStatus: (value: string) => void }) => {
  const imageArr = [
    {
      src: HolyDayShow,
      status: 'show',
      msg: '휴무표 작성 알림 전송 및 설정',
    },
    {
      src: HolyDaySetting,
      status: 'setting',
      msg: '휴무표 작성 확인 및 공유',
    },
  ];
  return (
    <>
      <MainDiv>
        {imageArr.map((item, i) => (
          <>
            <SelectContainer onClick={() => setStatus(item.status)}>
              <div>
                <Image src={item.src} alt="" />
                <h1>{item.msg}</h1>
              </div>
            </SelectContainer>
          </>
        ))}
      </MainDiv>
    </>
  );
};

export default HolydayChoice;

const SelectContainer = styled.div`
  width: 90%;
  border-radius: 5px;
  div {
    width: 468px;
    height: 264px;
    position: relative;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      img {
        transform: scale(1.15);
      }
    }
    h1 {
      margin: 0;
      font-size: 25px;
      font-weight: 600;
      white-space: nowrap;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    img {
      transition: 0.7s;
      transition-timing-function: ease-in-out;
      width: 100%;
      border-radius: 10px;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 30px;
`;
