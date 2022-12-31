import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import axios from 'axios';
import React, { useState } from 'react';
import { TODAY } from '../data';
import { getperiod } from '../func';
import HolyDaySelect from '../select';
import { ScheduleSettingType, ScheduleType } from '../type';

export const ScheduleSetting = ({ setting, create, initial, getEvent }: ScheduleSettingType) => {
  const [schedule, setSchedule] = useState<ScheduleType>({
    title: initial.state.title,
    start_at: initial.state.start_at,
    end_at: initial.state.end_at,
    id: initial.state.id,
  });

  const changeState = (value: string, props: string): void => {
    if (props === 'start_at' && getperiod(value) > getperiod(schedule.end_at))
      setSchedule({
        ...schedule,
        start_at: value,
        end_at: value,
      });
    else
      setSchedule({
        ...schedule,
        [props]: value,
      });
  };

  const showSchedule = [
    {
      title: '제목',
      width: '490px',
      input: (
        <input
          value={schedule.title}
          placeholder="제목을 입력해주세요."
          maxLength={20}
          onChange={(e) => changeState(e.target.value, 'title')}
        />
      ),
    },
    {
      title: setting.state ? '' : '근무지',
      width: setting.state ? '' : '150px',
      input: setting.state ? (
        <></>
      ) : (
        <HolyDaySelect kind="teamID" scheduleData={{ state: schedule, setState: setSchedule }} />
      ),
    },
    {
      title: '일정',
      width: setting.state ? '225px' : '150px',
      input: (
        <input
          value={schedule.start_at}
          type={'date'}
          min={TODAY}
          onChange={(e) => changeState(e.target.value, 'start_at')}
        />
      ),
    },
    {
      title: 'ㅤ',
      width: setting.state ? '225px' : '150px',
      input: (
        <input
          value={schedule.end_at}
          type={'date'}
          min={schedule.start_at}
          onChange={(e) => {
            if (schedule.start_at !== '') changeState(e.target.value, 'end_at');
          }}
        />
      ),
    },
    {
      title: '내용',
      width: '490px',
      input: <textarea placeholder="일정 내용을 입력해주세요." />,
    },
  ];

  const settingSchedule = () => {
    if (setting.state) {
      axios({
        method: 'PUT',
        url: `http://3.39.162.197:8888/schedules/spots/${initial.state.id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {
          title: schedule.title,
          start_at: schedule.start_at,
          end_at: schedule.end_at,
        },
      }).then(() => {
        getEvent();
        setting.setState(false);
      });
    } else {
      axios({
        method: 'POST',
        url: `http://3.39.162.197:8888/schedules/spots/${schedule.id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {
          title: schedule.title,
          start_at: schedule.start_at,
          end_at: schedule.end_at,
        },
      }).then(() => {
        getEvent();
        create(false);
      });
    }
  };

  return (
    <>
      <MainDiv>
        <div>
          <Bracket
            onClick={() => {
              setting.setState(false);
              create(false);
            }}
          />
          <h2>{setting.state ? '일정 변경' : '일정 추가'}</h2>
          {Object.values(schedule).includes('') ? (
            <Fail>
              <span>완료</span>
            </Fail>
          ) : (
            <button onClick={() => settingSchedule()}>완료</button>
          )}
        </div>
        <ScheduleContainer>
          {showSchedule.map((item, i) => (
            <ScheduleInput key={i} width={item.width}>
              <span>{item.title}</span>
              {item.input}
            </ScheduleInput>
          ))}
        </ScheduleContainer>
      </MainDiv>
    </>
  );
};

const MoveArrow = keyframes`
  0%{
    transform: translateX(0);
  } 
  80% {
    transform: translateX(-.35rem); 
  }
  100% {
    transform: translateX(-.4rem); 
  }
`;

const ScheduleInput = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  display: flex;
  flex-wrap: wrap;
  margin-top: 13px;
  span {
    margin-bottom: 10px;
    font-size: 18px;
  }
  input {
    height: 42px;
  }
  textarea {
    height: 450px;
    border: none;
    resize: none;
  }
  input,
  textarea {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
      Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    outline: none;
    padding: 15px;
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

const ScheduleContainer = styled.div`
  margin-top: 12px;
  gap: 5px;
  display: flex;
  flex-wrap: wrap;
`;

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

const MainDiv = styled.span`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 35px 30px;

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    width: 78px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    font-weight: 700;
  }
  h2 {
    margin: 0;
    margin-left: 35px;
  }
`;

const Fail = styled.button`
  cursor: not-allowed;
  span {
    color: #505050;
  }
  &:hover {
    animation: ${Shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
`;

const Bracket = styled.div`
  cursor: pointer;
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url("data:image/svg+xml,%3Csvg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_8250_41961)'%3E%3Cpath d='M26.8804 28.6125L18.8654 20.58L26.8804 12.5475L24.4129 10.08L13.9129 20.58L24.4129 31.08L26.8804 28.6125Z' fill='%23242424'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_8250_41961'%3E%3Crect width='42' height='42' fill='white' transform='matrix(-1 0 0 1 42 0)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");

  &:hover {
    animation: ${MoveArrow} 0.5s ease-in infinite;
    animation-direction: alternate;
  }
`;
