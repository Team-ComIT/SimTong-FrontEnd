import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { showCalendar } from '../components/calendar/calendar';
import * as GetDay from '../components/calendar/func';
import { EventType, ModalType } from '../components/calendar/type';
import { showHolyday } from '../components/calendar/holyday';
import { Schedule } from '../components/calendar/calendarSchedule';
import Week from '../components/calendar/week';
import Dates from '../components/calendar/dates';
import { keyframes } from '@emotion/react';
import { TODAY } from '../components/calendar/data';
import HolyDaySchedule from '../components/calendar/holydaySchedule';

const HolyDay = () => {
  let DATE: Date = new Date();
  const YEAR: number = DATE.getFullYear();
  const MONTH: number = DATE.getMonth() + 1;
  const week: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  const [month, setMonth] = useState<number>(MONTH);
  const [date, setDate] = useState<number[]>([]);

  const [modal, setModal] = useState<ModalType[]>(
    Array.from(
      {
        length: GetDay.getLastDay(GetDay.getYear(month, YEAR), parseInt(GetDay.getMonth(month))),
      },
      (t, i) => {
        return {
          start_at: '',
          first: false,
          show: false,
          id: i + 1,
        };
      },
    ),
  );

  useEffect(() => {
    setDate(changeDate(YEAR, month));
    setModal(
      Array.from({ length: GetDay.getLastDay(month, YEAR) }, (t, i) => {
        return {
          start_at: '',
          first: false,
          show: false,
          id: i + 1,
        };
      }),
    );
    getEvent();
  }, [month]);

  const getEvent = () => {
    if (localStorage.getItem('access_token')) {
      axios({
        url: 'http://3.39.162.197:8888/holidays/employee',
        method: 'GET',
        params: {
          year: GetDay.getYear(month, YEAR),
          month: parseInt(GetDay.getMonth(month)),
          type: 'ALL',
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }).then((res) => {
        setEvent(res.data.holidays);
      });
    }
  };

  const changeDate = (YEAR: number, month: number) => {
    let PVLastDate = new Date(YEAR, month - 1, 0).getDate();
    let PVLastDay = new Date(YEAR, month - 1, 0).getDay();

    const ThisLasyDay = new Date(YEAR, month, 0).getDay();
    const ThisLasyDate = new Date(YEAR, month, 0).getDate();

    let PVLD = [];
    if (PVLastDay !== 6) {
      for (let i = 0; i < PVLastDay + 1; i++) {
        PVLD.unshift(PVLastDate - i);
      }
    }

    let TLD = [];
    for (let i = 1; i < 7 - ThisLasyDay; i++) {
      if (i === 0) {
        return TLD;
      }
      TLD.push(i);
    }

    let TD = Array.from(Array(ThisLasyDate + 1).keys()).slice(1);

    return PVLD.concat(TD, TLD);
  };

  const [event, setEvent] = useState<any[]>([
    {
      start_at: '',
      end_at: '',
      title: '',
      id: '',
      spot: {
        id: '',
        name: '',
      },
    },
  ]);

  if (typeof window !== 'undefined' && localStorage.getItem('access_token')) {
    return (
      <>
        <MainDiv>
          <CalendarContainer>
            <Dates
              month={{
                state: month,
                setState: setMonth,
              }}
              year={YEAR}
            />
            <Week week={week} />
            <Days>
              {date.map((elm: number, i: number) => (
                <>
                  {i >= date.indexOf(1) && i <= date.indexOf(GetDay.getLastDay(month, YEAR), 28) ? (
                    <>
                      <Day color={'#505050'}>
                        <hr />
                        <span>{`${elm}`.padStart(2, '0')}</span>
                        {showHolyday(elm, month, YEAR, event)}
                      </Day>
                    </>
                  ) : (
                    <Day color={'#ffc9cb'}>
                      <hr />
                      <span>{`${elm}`.padStart(2, '0')}</span>
                    </Day>
                  )}
                </>
              ))}
            </Days>
          </CalendarContainer>
          <ScheduleContainer>
            <HolyDaySchedule
              month={{ state: month, setState: setMonth }}
              year={GetDay.getYear(month, YEAR)}
            />
          </ScheduleContainer>
        </MainDiv>
      </>
    );
  }
  return <div>로그인후 사용하실 수 있습니다.</div>;
};

export default HolyDay;

const FadeInMainDiv = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const MainDiv = styled.div`
  height: calc(100vh - 60px);
  background-color: #fff;
  padding: 44px 170px;
  display: flex;

  hr {
    margin: 0;
  }
`;

const CalendarContainer = styled.div`
  width: 980px;
  height: 802px;
  hr {
    height: 1px;
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
  }
`;

const Days = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Day = styled.div<{ color?: string }>`
  position: relative;
  width: 140px;
  height: 116px;
  padding: 15px;
  color: ${(props) => props.color || '#505050'};
  font-size: 18px;

  hr {
    height: 2px;
    width: 110px;
    background-color: ${(props) => props.color || '#505050'};
    margin-top: -15px;
    margin-bottom: 10px;
    + span {
      position: static;
      color: ${(props) => props.color || '#505050'};
    }
  }

  > div {
    height: 30px;
    font-size: 15px;
    display: flex;
    align-items: center;
    color: #fff;
    margin-top: 5px;
    margin-bottom: 9px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 21px;
    padding: 6px 15px;
  }

  > span {
    position: absolute;
    background-color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    color: #7c7c7c;
  }
`;

const ScheduleContainer = styled.div`
  animation: ${FadeInMainDiv} 1s ease-in-out;
  width: 520px;
  height: 802px;
  margin-left: 50px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.15);
  position: relative;

  h2 {
    margin: 0;
    font-size: 24px;
  }

  button {
    color: #ed666a;
    background: none;
    cursor: pointer;
    font-size: 16px;
    outline: none;
    transition: 0.2s ease-in-out;
  }
`;
