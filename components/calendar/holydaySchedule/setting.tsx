import styled from '@emotion/styled';
import HolidayUndo from './back';
import HolyDaySelect from '../select';
import React, { useState, useEffect } from 'react';
import { TODAY } from '../data';
import { DateType } from '../type';
import { getMonth, getperiod, getYear } from '../func';
import { keyframes } from '@emotion/react';
import axios from 'axios';
import { BASE_URL } from '../../../data';

const HolyDaySetting = ({
  setStatus,
  month,
  year,
}: {
  setStatus: (value: string) => void;
  month: number;
  year: number;
}) => {
  const [date, setDate] = useState<DateType>({
    month: 0,
    year: 0,
  });
  const [period, setPeriod] = useState({
    start_at: TODAY,
    end_at: TODAY,
  });

  const dateChange = (e: any, props: string) => {
    if (props === 'start_at' && getperiod(e.target.value) > getperiod(period.end_at))
      setPeriod({
        start_at: e.target.value,
        end_at: e.target.value,
      });
    else
      setPeriod({
        ...period,
        [props]: e.target.value,
      });
  };

  const periodSetting = () => {
    axios({
      url: BASE_URL + '/holidays/period',
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      data: {
        start_at: period.start_at,
        end_at: period.end_at,
        month: date.month,
        year: date.year,
      },
    }).then((res) => {
      setStatus('none');
    });
  };

  return (
    <MainDiv>
      <HolidayUndo func={setStatus} />
      <Title>
        <h1>휴무표 작성 알림 및 설정</h1>
        <hr />
      </Title>
      <MonthSetting>
        <span>휴무표 적용 월 설정</span>
        <HolyDaySelect
          kind="holidayDate"
          dateData={{ state: date, setState: setDate }}
          month={month}
          year={year}
        />
      </MonthSetting>
      <PeriodSetting>
        <div>휴무표 작성 기간 설정</div>
        <span>
          <input
            type={'date'}
            min={TODAY}
            value={period.start_at}
            onChange={(e) => dateChange(e, 'start_at')}
          />
          <span>
            <hr />
          </span>
          <input
            type={'date'}
            min={period.start_at}
            value={period.end_at}
            onChange={(e) => dateChange(e, 'end_at')}
          />
        </span>
      </PeriodSetting>

      <CheckBtn>
        {Object.values(period).includes('') || Object.values(date).includes(0) ? (
          <div>확인</div>
        ) : (
          <span onClick={() => periodSetting()}>확인</span>
        )}
      </CheckBtn>
    </MainDiv>
  );
};

export default HolyDaySetting;

const Shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const CheckBtn = styled.div`
  position: absolute;
  bottom: 41px;
  right: 64px;
  border: none;
  font-size: 16px;
  font-weight: 600;

  div:hover {
    cursor: not-allowed;
    animation: ${Shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
  span {
    cursor: pointer;
    color: #e84045;
  }
`;

const MainDiv = styled.div`
  padding: 35px 30px;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 600;
  position: relative;

  input {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
      Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    outline: none;
    padding: 15px;
    height: 42px;
    width: 100%;
    border: 2px solid #d3d3d3;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    &::placeholder {
      color: #000;
    }
  }
`;

const Title = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  row-gap: 20px;
  flex-direction: column;
  h1 {
    margin: 0;
    margin-top: 34px;
    font-size: 25px;
    font-weight: 700;
  }
  hr {
    width: 120px;
    height: 3px;
    border-radius: 5px;
    border: none;
    background-color: #e84045;
  }
`;

const PeriodSetting = styled.div`
  margin-top: 50px;
  div {
    margin-bottom: 15px;
  }
  span {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 30px;
  }
  hr {
    width: 50px;
    height: 2px;
    border: none;
    background-color: #d3d3d3;
  }
`;

const MonthSetting = styled.div`
  width: 100%;
  margin-top: 25px;
  text-align: start;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;
