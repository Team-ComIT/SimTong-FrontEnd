import styled from '@emotion/styled';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getMonth } from '../func';
import HolidayUndo from './back';
import HolyDaySelect from '../select';
import { BASE_URL } from '../../../data';

const HolyDayShow = ({
  setStatus,
  month,
  year,
}: {
  setStatus: (value: string) => void;
  month: {
    state: number;
    setState: (value: number) => void;
  };
  year: number;
}) => {
  const [data, setData] = useState<{
    type: string;
    teamID: string;
  }>({
    type: 'ALL',
    teamID: '',
  });
  const [event, setEvent] = useState([]);

  useEffect(() => {
    axios({
      url: BASE_URL + '/holidays/employee',
      method: 'GET',
      params: {
        year: year,
        month: month.state,
        type: data.type,
        team_id: data.teamID,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    }).then((res) => {
      setEvent(res.data.holidays);
    });
  }, [data, month]);

  return (
    <MainDiv>
      <HolidayUndo func={setStatus} />
      <PrevNext>
        <Arrow scale={1} onClick={() => month.setState(month.state - 1)} />
        {year}.{getMonth(month.state)}
        <Arrow scale={-1} onClick={() => month.setState(month.state + 1)} />
      </PrevNext>
      <InputContainer>
        <HolyDaySelect kind={'teamID'} showData={{ state: data, setState: setData }} />
        <HolyDaySelect kind={'type'} showData={{ state: data, setState: setData }} />
      </InputContainer>
      <HolidayHead>
        <span>근무지</span>
        <span>팀</span>
        <span>이름</span>
      </HolidayHead>
      <hr />
      <HolidayContainer>
        {event.length > 0 ? (
          <>
            {event.map(
              (
                item: {
                  user: {
                    spot: string;
                    team: string;
                    name: string;
                  };
                  type: string;
                },
                i,
              ) => (
                <>
                  <HolidayEvent color={item.type === 'HOLIDAY' ? '#e84045' : '#505050'} key={i}>
                    <div>{item.user.spot}</div>
                    <div>{item.user.team}</div>
                    <div>{item.user.name}</div>
                    <button>{item.type === 'HOLIDAY' ? <>휴가</> : <>연차</>}</button>
                  </HolidayEvent>
                </>
              ),
            )}
          </>
        ) : (
          <NonePerson>쉬는 사람이 없습니다...</NonePerson>
        )}
      </HolidayContainer>
    </MainDiv>
  );
};

export default HolyDayShow;

const NonePerson = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
`;

const Arrow = styled.div<{ scale: number }>`
  cursor: pointer;
  width: 12px;
  height: 21px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg width='14' height='22' viewBox='0 0 14 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.8799 18.6126L5.86488 10.5801L13.8799 2.54758L11.4124 0.0800781L0.912383 10.5801L11.4124 21.0801L13.8799 18.6126Z' fill='%23242424'/%3E%3C/svg%3E%0A");
  transition: all 0.2s ease;
  &:active {
    transform: translateY(20%) scale(${(props) => props.scale}, 1);
  }
  + div {
    transform: scale(-1, 1);
  }
`;

const HolidayEvent = styled.div`
  padding: 0 15px;
  height: 50px;
  width: 98%;
  margin-top: 10px;
  font-weight: 700;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  border: 2px solid #d3d3d3;
  border-radius: 5px;
  cursor: default;
  div:nth-child(1) {
    width: 195px;
  }
  div:nth-child(2) {
    width: 95px;
  }
  div:nth-child(3) {
    width: 75px;
  }
  button {
    cursor: default;
    font-weight: 700;
    font-size: 14px;
    border: none;
    border-radius: 100px;
    width: 50px;
    height: 26px;
    background-color: ${(props) => props.color};
    color: #fff;
  }
`;

const HolidayContainer = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 530px;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 10px;

    /* display: none; */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #505050;
    border-radius: 5px;
    width: 10px;
  }
`;

const HolidayHead = styled.div`
  margin-top: 19px;
  margin-left: 15px;
  font-size: 18px;
  font-weight: 100;
  span:nth-child(1) {
    margin-right: 140px;
  }
  span:nth-child(2) {
    margin-right: 78px;
  }
`;

const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 35px 26px;
  hr {
    margin-top: 8px;
    border: none;
    height: 2px;
    background-color: #505050;
  }
`;

const InputContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: inline-flex;
  justify-content: flex-end;
  gap: 10px;

  input {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
      Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    outline: none;
    padding: 15px;
    height: 42px;
    width: 150px;
    border: 2px solid #d3d3d3;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    &::placeholder {
      color: #000;
    }
  }
`;

const PrevNext = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 34px;
  font-size: 24px;
  font-weight: 500;
`;
