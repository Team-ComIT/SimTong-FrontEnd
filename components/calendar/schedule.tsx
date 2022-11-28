import styled from '@emotion/styled';
import React, { useState } from 'react';
import { EventType } from './type';

export const Schedule = (event: EventType[]) => {
  const [showSetting, setShowSetting] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  return (
    <>
      {showSetting || showCreate ? (
        <ScheduleSetting>
          <div>
            <Bracket
              onClick={() => {
                setShowSetting(false);
                setShowCreate(false);
              }}
            />
            <h2>{showSetting ? '일정 변경' : '일정 추가'}</h2>
            <button>완료</button>
          </div>
        </ScheduleSetting>
      ) : (
        <AllSchedule>
          <h2>전체 일정</h2>
          <hr />
          <button onClick={() => setShowCreate(!showCreate)}>일정생성</button>
          <ScheduleList>
            {event.map((elm) => (
              <div onClick={() => setShowSetting(!showSetting)}>
                <p>
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 'Bold',
                      color: '#000',
                    }}>
                    {elm.title}
                  </span>
                  <br />
                  <span style={{ fontSize: '16px' }}>{elm.content}</span>
                </p>
                <span>{elm.start_at}</span>
              </div>
            ))}
          </ScheduleList>
        </AllSchedule>
      )}
    </>
  );
};

const ScheduleSetting = styled.span`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 40px 30px;

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  button {
    width: 78px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
  }
`;

const AllSchedule = styled.span`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 40px 15px;

  > hr {
    width: 50px;
    height: 2px;
    border: none;
    background-color: #e84045;
    margin-top: 20px;
  }
  button {
    position: absolute;
    top: 32px;
    right: 15px;
    width: 126px;
    height: 42px;
    border-radius: 5px;
    border: 1px solid #ed666a;
  }
`;

const Bracket = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url("data:image/svg+xml,%3Csvg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_8250_41961)'%3E%3Cpath d='M26.8804 28.6125L18.8654 20.58L26.8804 12.5475L24.4129 10.08L13.9129 20.58L24.4129 31.08L26.8804 28.6125Z' fill='%23242424'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_8250_41961'%3E%3Crect width='42' height='42' fill='white' transform='matrix(-1 0 0 1 42 0)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
`;

const ScheduleList = styled.div`
  width: 520px;
  height: 693px;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  > div {
    width: 100%;
    height: 70px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #d3d3d3;
    padding: 13px 10px;
  }
  p {
    width: 100%;
    margin: 0;
    display: table-cell;
    vertical-align: middle;
  }
  span {
    width: 98px;
    color: #7c7c7c;
  }
`;
