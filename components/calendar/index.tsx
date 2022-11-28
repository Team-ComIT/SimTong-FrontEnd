import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { showCalendar } from './calendar';
import * as GetDay from './func';
import { EventType, ModalType } from './type';
import { showHolyday } from './holyday';
import { Schedule } from './schedule';

const Calendar = () => {
    let DATE: Date = new Date();
    const YEAR: number = DATE.getFullYear();
    const MONTH: number = DATE.getMonth() + 1;
    const week: string[] = ['일', '월', '화', '수', '목', '금', '토'];

    const [month, setMonth] = useState<number>(MONTH);
    const [date, setDate] = useState<number[]>([]);

    const [modal, setModal] = useState<ModalType[]>(
        Array.from(
            {
                length: GetDay.getLastDay(
                    GetDay.getYear(month, YEAR),
                    parseInt(GetDay.getMonth(month)),
                ),
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
    }, [month]);

    useEffect(() => {
        getEvent();
        setEvent(
            event.sort(function (a: EventType, b: EventType) {
                return GetDay.getperiod(a.start_at) - GetDay.getperiod(b.start_at);
            }),
        );
    });

    const getEvent = () => {
        axios({
            url: 'http://3.39.162.197:8888/schedule/spots',
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${'b2iidkkdiskejfjv.dsjseilsjdlfe.tokaaweolfskeioswldkeosl'}`,
            },
        }).then((res) => {
            console.log(res);
        });
    };

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

    const [event, setEvent] = useState<EventType[]>([
        {
            start_at: '2022-11-01',
            end_at: '2022-11-04',
            color: '3698FE',
            title: '성심당 본점 asdasd',
            content: '오늘은 새로 나온 아이디어로 빵을 뽑겠습니다.',
            spot: {
                id: '8f886d50-70ff-11ea-b498-02dd0a2dce82',
                name: '성심당 은행점',
            },
        },
    ]);

    return (
        <>
            <MainDiv>
                <CalendarContainer>
                    <hr />
                    <Dates>
                        <Slide onClick={() => setMonth(month - 1)} />
                        <span>
                            {GetDay.getYear(month, YEAR)}년 {GetDay.getMonth(month)}월
                        </span>
                        <Slide
                            onClick={() => setMonth(month + 1)}
                            style={{ transform: 'scale(-1, 1)' }}
                        />
                    </Dates>
                    <hr />
                    <Week>
                        {week.map((elm: string, i: number) =>
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
                                i <= date.indexOf(GetDay.getLastDay(month, YEAR), 28) ? (
                                    <>
                                        <Day color={'#505050'}>
                                            <hr />
                                            <>{`${elm}`.padStart(2, '0')}</>
                                            {showCalendar(
                                                elm,
                                                i,
                                                month,
                                                YEAR,
                                                modal,
                                                setModal,
                                                event,
                                            )}
                                            {/* {showHolyday(elm, month, YEAR)} */}
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
                <ScheduleContainer>{Schedule(event)}</ScheduleContainer>
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
    height: 802px;
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
        /* z-index: 2; */
        /* white-space: nowrap; */
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
    width: 550px;
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

        &:hover {
            transform: translateY(10%);
        }
        &:active {
            transform: translateY(20%);
        }
    }
`;
