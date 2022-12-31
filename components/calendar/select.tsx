import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getMonth, getYear } from './func';
import { SpotType } from './type';

const ArrowRotateReverse = keyframes`
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(180deg);
  }
`;

const ArrowRotate = keyframes`
  0% {
    transform: rotateZ(180deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
`;

const HolyDaySelect = ({
  kind,
  showData,
  dateData,
  month,
  year,
}: {
  kind?: string;
  showData?: {
    state: { type: string; teamID: string };
    setState: (value: { type: string; teamID: string }) => void;
  };
  dateData?: {
    state: { month: number; year: number };
    setState: (value: { month: number; year: number }) => void;
  };
  scheduleData?: {
    state: { start_at: string; end_at: string; title: string; id: string };
    setState: (value: { start_at: string; end_at: string; title: string; id: string }) => void;
  };
  month?: number;
  year?: number;
}) => {
  const [show, setShow] = useState<boolean | string>('');
  const [name, setName] = useState<string>(
    kind === 'teamID' ? '모든 지점' : kind === 'type' ? '모든 파트' : '휴무표 적용 월 설정',
  );
  const [arr, setArr] = useState<SpotType[]>([]);

  document.addEventListener('click', () => (show === true ? setShow(false) : setShow('')));

  useEffect(() => {
    if (kind === 'holidayDate') {
      if (month && year) {
        const nowMonth: number = parseInt(getMonth(month));
        const today: string = `${getYear(nowMonth, year)}/${getMonth(nowMonth)}`;
        const tomorrow: string = `${getYear(nowMonth + 1, year)}/${getMonth(nowMonth + 1)}`;
        setArr([
          { name: `${today.split('/')[0]}년 ${today.split('/')[1]}월 휴무표`, id: today },
          { name: `${tomorrow.split('/')[0]}년 ${tomorrow.split('/')[1]}월 휴무표`, id: tomorrow },
        ]);
      }
    } else if (kind === 'type')
      setArr([
        { name: '모든 파트', id: 'ALL' },
        { name: '휴무일', id: 'HOLIDAY' },
        { name: '연차', id: 'ANNUAL' },
      ]);
    else {
      axios({
        method: 'GET',
        url: 'http://3.39.162.197:8888/commons/spot',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }).then((res) => {
        setArr([{ name: '모든 지점', id: '', location: '' }].concat(res.data.spot_list));
      });
    }
  }, [show]);

  return (
    <MainDiv>
      <DownArrow
        animation={show === false ? ArrowRotate : show === true ? ArrowRotateReverse : ''}
      />
      <input
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}
        value={name}
      />
      <DataList state={show}>
        {arr.map((spot: SpotType, i) => (
          <div
            key={i}
            onClick={(e) => {
              if (showData && kind)
                showData.setState({
                  ...showData.state,
                  [kind]: spot.id,
                });
              if (dateData) {
                dateData.setState({
                  month: parseInt(spot.id.split('/')[1]),
                  year: parseInt(spot.id.split('/')[0]),
                });
              }
              setName(spot.name);
              setShow(false);
              e.stopPropagation();
            }}>
            {spot.name}
          </div>
        ))}
      </DataList>
    </MainDiv>
  );
};
export default HolyDaySelect;

const DownArrow = styled.div<{ animation: string }>`
  animation: ${(props) => props.animation} 0.5s ease-in-out;
  animation-fill-mode: forwards;
  position: absolute;
  right: 16px;
  top: 16px;
  width: 16px;
  height: 10px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='10' viewBox='0 0 16 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.88 0L8 6.18084L14.12 0L16 1.90283L8 10L0 1.90283L1.88 0Z' fill='%23D3D3D3'/%3E%3C/svg%3E%0A");
`;

const MainDiv = styled.div`
  display: inline-flex;
  position: relative;
`;

const fadeInDataList = keyframes`
    0% {
        transform: translateY(-50px);
        opacity: 0;
    }100% {
        transform: translateY(0);
        opacity: 1;
    }
`;

const DataList = styled.div<{ state: boolean | string }>`
  position: absolute;
  animation: ${fadeInDataList} 0.5s;
  width: 100%;
  z-index: 2;
  margin-top: 42px;
  transition: 1s;
  display: ${(props) => (props.state ? 'block' : 'none')};
  background-color: #fff;
  border: 2px solid #d3d3d3;
  border-radius: 4px;
  max-height: 300px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  div {
    height: 42px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    font-size: 14px;
  }

  div:hover {
    background-color: #ededed;
  }
`;
