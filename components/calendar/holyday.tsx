import React from 'react';
import * as Day from './func';

export const showHolyday = (elm: number, month: number, YEAR: number) => {
    const holidays = [
        {
            date: '2022-11-01',
            title: '오늘은 성심당 공휴일입니다.',
        },
        {
            date: '2022-11-09',
            title: '즐거운 추석되세요!',
        },
        {
            date: '2022-11-10',
            title: '즐거운 추석되세요!',
        },
        {
            date: '2022-11-10',
            title: '즐추 계시나요?',
        },
        {
            date: '2022-11-10',
            title: '즐추 안 계시나 보네요..ㅜ',
        },
        {
            date: '2022-11-14',
            title: '송편 먹고 싶다',
        },
        {
            date: '2022-11-14',
            title: '송편 먹고 싶다',
        },
    ];

    function solution(date: string) {
        let arr2 = [];
        let cnt = 0;

        for (let i = 0; i < holidays.length; i++) {
            if (arr2.indexOf(holidays[i].date) === -1) {
                arr2.push(holidays[i].date);
            }
        }
        for (let i = 0; i < arr2.length; i++) {
            cnt = 0;
            holidays.filter((e: { date: string; title: string }) => {
                if (e.date === date) {
                    cnt++;
                }
            });
        }

        return cnt;
    }

    const eventBlock = (str: string) => {
        return (
            <div
                style={{
                    width: '110px',
                    backgroundColor: `#e84045`,
                    borderRadius: '5px',
                }}>
                {str}
            </div>
        );
    };

    return (
        <>
            {holidays.map((data, i) => (
                <>
                    {Day.nowDate(month, YEAR, elm) == Day.getperiod(data.date) ? (
                        <>
                            {solution(data.date) >= 3 && i >= 1 ? (
                                <>
                                    {data.date !== holidays[i - 1].date ? (
                                        <>
                                            {eventBlock(data.title)}
                                            <span
                                                style={{
                                                    color: '#7c7c7c',
                                                    fontSize: '16px',
                                                    cursor: 'pointer',
                                                }}>
                                                +{solution(data.date) - 1}건
                                            </span>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ) : (
                                <>{eventBlock(data.title)}</>
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                </>
            ))}
        </>
    );
};
