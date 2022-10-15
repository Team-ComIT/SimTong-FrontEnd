import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import Header from '../header';

const Calendar = () => {
    let DATE: Date = new Date();
    const YEAR: number = DATE.getFullYear();
    const MONTH: number = DATE.getMonth() + 1;
    const DAY: string[] = ['일', '월', '화', '수', '목', '금', '토'];

    const [month, setMonth] = useState<number>(MONTH);
    // const [year, setYear] = useState<number>(YEAR);
    const [date, setDate] = useState<any>([]);
    const [showSetting, setShowSetting] = useState<boolean>(false);
    const [showCreate, setShowCreate] = useState<boolean>(false);

    const event = [
        {
            start_at: '2022-10-08',
            end_at: '2022-10-10',
            color: '3698FE',
            title: '성심당 본점 회의',
            content: '오늘은 새로 나온 아이디어로 빵을 뽑겠습니다.',
            spot: {
                id: '8f886d50-70ff-11ea-b498-02dd0a2dce82',
                name: '성심당 은행점',
            },
        },
        {
            start_at: '2022-09-30',
            end_at: '2022-10-01',
            color: '8BE92E',
            title: '성심당 DCC점 회의',
            content: '성심당 DCC점 회의가 있습니다.',
            spot: {
                id: '8f886d50-70ff-12ea-b498-02dd0a2dce82',
                name: '성심당 DCC점',
            },
        },
        {
            start_at: '2022-10-19',
            end_at: '2022-10-28',
            color: 'FF5391',
            title: '성심당 케익부띠끄점 회의',
            content: '민트초코케익 찬반회의가 있습니다.',
            spot: {
                id: '8f886d50-70ff-11ea-b498-02dd0a2dce83',
                name: '성심당 케익부띠끄점',
            },
        },
    ];

    useEffect(() => {
        setDate(changeDate(YEAR, month));
        // getEvent();
    }, [month]);

    // const getEvent = () => {
    //   axios({
    //     url: "https://server.mo1za.com/schedule",
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json;charset=UTF-8",
    //       Authorization: `Bearer ${"b2iidkkdiskejfjv.dsjseilsjdlfe.tokaaweolfskeioswldkeosl"}`,
    //     },
    //   }).then((res) => {
    //     console.log(res);
    //   });
    // };

    const changeDate = (YEAR: number, month: number) => {
        //이전 날짜
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

    const getperiod = (period: string) => {
        return new Date(period).getTime();
    };

    const nowDate = (M: number, Y: number, elm: number) => {
        return getperiod(`${getYear(M, Y)}-${getMonth(M)}-${`${elm}`.padStart(2, '0')}`);
    };

    const getMonth = (M: number) => {
        return `${M > 0 ? (M % 12 !== 0 ? M % 12 : 12) : 12 + (M % 12)}`.padStart(2, '0');
    };

    const getYear = (M: number, Y: number) => {
        return M > 0 ? Y + parseInt(`${(M - 1) / 12}`) : Y + parseInt(`${M / 12}`) - 1;
    };

    const getLastDay = (M: number, Y: number) => {
        const last = new Date(Y, M, 0);
        return last.getDate();
    };

    return (
        <>
            <MainDiv>
                <CalendarContainer>
                    <hr />
                    <Dates>
                        <Slide onClick={() => setMonth(month - 1)} />
                        <span>
                            {getYear(month, YEAR)}년 {getMonth(month)}월
                        </span>
                        <Slide
                            onClick={() => setMonth(month + 1)}
                            style={{ transform: 'scale(-1, 1)' }}
                        />
                    </Dates>
                    <hr />
                    <Week>
                        {DAY.map((elm: string, i: number) =>
                            i === 0 || i === 6 ? (
                                <div style={{ color: '#e84045' }}>{elm}</div>
                            ) : (
                                <div>{elm}</div>
                            ),
                        )}
                    </Week>
                    <Days>
                        {date.map((elm: number, i: number) => (
                            <>
                                {i >= date.indexOf(1) &&
                                i <= date.indexOf(getLastDay(month, YEAR), 28) ? (
                                    <Day color={'#505050'}>
                                        <hr />
                                        <span>{`${elm}`.padStart(2, '0')}</span>
                                        {event.map((data) =>
                                            getperiod(data.start_at) <= nowDate(month, YEAR, elm) &&
                                            nowDate(month, YEAR, elm) <= getperiod(data.end_at) ? (
                                                getperiod(data.start_at) ===
                                                    getperiod(data.end_at) ||
                                                (getperiod(data.start_at) ===
                                                    nowDate(month, YEAR, elm) &&
                                                    (elm === getLastDay(month, YEAR) ||
                                                        (i + 1) % 7 === 0)) ||
                                                (getperiod(data.end_at) ===
                                                    nowDate(month, YEAR, elm) &&
                                                    (elm === 1 || i % 7 === 0)) ? (
                                                    <div
                                                        style={{
                                                            width: '110px',
                                                            backgroundColor: `#${data.color}`,
                                                            borderRadius: '5px',
                                                        }}>
                                                        {data.title}
                                                    </div>
                                                ) : getperiod(data.start_at) ===
                                                      nowDate(month, YEAR, elm) ||
                                                  i % 7 === 0 ||
                                                  elm === 1 ? (
                                                    <div
                                                        style={{
                                                            width: '125px',
                                                            backgroundColor: `#${data.color}`,
                                                            borderRadius: '5px 0 0 5px',
                                                        }}>
                                                        {getperiod(data.start_at) ===
                                                            nowDate(month, YEAR, elm) ||
                                                        elm === 1 ? (
                                                            <>{data.title}</>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <>
                                                        {getperiod(data.end_at) ===
                                                            nowDate(month, YEAR, elm) ||
                                                        (i + 1) % 7 === 0 ||
                                                        elm === 30 ? (
                                                            <div
                                                                style={{
                                                                    width: '125px',
                                                                    marginLeft: '-15px',
                                                                    backgroundColor: `#${data.color}`,
                                                                    borderRadius: '0 5px 5px 0',
                                                                }}
                                                            />
                                                        ) : (
                                                            <div
                                                                style={{
                                                                    backgroundColor: `#${data.color}`,
                                                                    marginLeft: '-15px',
                                                                }}></div>
                                                        )}
                                                    </>
                                                )
                                            ) : (
                                                <></>
                                            ),
                                        )}
                                    </Day>
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
                <Schedule>
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
                </Schedule>
            </MainDiv>
        </>
    );
};

export default Calendar;

const MainDiv = styled.div`
    height: calc(100vh - 60px);
    background-color: #fff;
    padding: 44px 170px;
    display: flex;

    hr {
        margin: 0;
    }
`;

const Dates = styled.div`
    width: 100%;
    height: 60px;
    display: inline-flex;
    justify-content: space-between;
    padding: 0px 14px;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
`;

const CalendarContainer = styled.div`
    width: 980px;
    height: 852px;
    hr {
        height: 1px;
        background-color: rgba(0, 0, 0, 0.3);
        border: none;
    }
`;

const Slide = styled.div`
    cursor: pointer;
    width: 12.35px;
    height: 20px;
    background-image: url("data:image/svg+xml,%3Csvg width='13' height='21' viewBox='0 0 13 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.3997 18.25L4.76632 10.6L12.3997 2.94998L10.0497 0.599976L0.0496578 10.6L10.0497 20.6L12.3997 18.25Z' fill='%237C7C7C'/%3E%3C/svg%3E%0A");
`;

const Week = styled.div`
    width: 100%;
    display: inline-flex;
    font-size: 18px;
    div {
        width: 140px;
        height: 70px;
        padding: 10px 15px;
    }
`;

const Days = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;

const Day = styled.div<{ color?: string }>`
    width: 140px;
    height: 120px;
    padding: 15px;
    color: ${(props) => props.color || '#505050'};
    font-size: 18px;

    hr {
        height: 2px;
        width: 110px;
        background-color: ${(props) => props.color || '#505050'};
        margin-top: -15px;
        margin-bottom: 10px;
    }

    div {
        width: 140px;
        height: 30px;
        font-size: 15px;
        display: flex;
        align-items: center;
        padding-left: 15px;
        white-space: nowrap;
        color: #fff;
        margin-top: 5px;
        margin-bottom: 10px;
    }
`;

const Schedule = styled.div`
    width: 550px;
    height: 852px;
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

        &:hover {
            transform: translateY(10%);
        }
        &:active {
            transform: translateY(20%);
        }
    }
`;

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
    height: 743px;
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
