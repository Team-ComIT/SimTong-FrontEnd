import styled from '@emotion/styled';
import React from 'react';
import * as Day from './func';

export const showHolyday = (
    elm: number,
    month: number,
    YEAR: number,
    holidays: any[],
    modal: any[],
    setModal: (value: any[]) => void,
) => {
    let cnt = 0;
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

    const eventBlock = (data: any) => {
        return (
            <div
                style={{
                    width: '110px',
                    backgroundColor: data.type === 'HOLIDAY' ? '#e84045' : '#505050',
                    borderRadius: '5px',
                }}>
                {data.user.name}
            </div>
        );
    };

    const cross = (idx: number): boolean | string => {
        for (let i = 0; i < idx; i++) {
            if (Day.getperiod(holidays[i].date) === Day.getperiod(holidays[idx].date)) {
                if (cross(i) === true) {
                    if (getFirst(idx) === 'first') {
                    }
                    return getFirst(idx);
                }
            }
        }
        return true;
    };

    const getFirst = (idx: number): boolean | string => {
        for (let j = 0; j < holidays.length; j++) {
            if (holidays[j].date === holidays[idx].date) {
                if (holidays[j] === holidays[idx]) {
                    return 'first';
                } else {
                    return false;
                }
            }
        }
        return true;
    };

    const settingModal = (start?: string) => {
        cnt = 0;

        if (!start) {
            setModal(
                modal.map((item: any) =>
                    item.id === elm
                        ? { ...item, show: !item.show, first: false, start_at: '' }
                        : { ...item, show: false, first: false, start_at: '' },
                ),
            );
        } else {
            setModal(
                modal.map((item: any) =>
                    item.id === elm
                        ? { ...item, first: !item.first, show: false, start_at: start }
                        : { ...item, first: false, show: false, start_at: '' },
                ),
            );
        }
    };

    const resetModal = () => {
        setModal(
            modal.map((item: any) =>
                item.id === elm
                    ? { ...item, show: false, first: false, start_at: '' }
                    : { ...item, show: false, first: false, start_at: '' },
            ),
        );
    };

    return (
        <>
            {holidays.map((data, i) => (
                <>
                    {Day.nowDate(month, YEAR, elm) == Day.getperiod(data.date) ? (
                        <>
                            {solution(data.date) >= 2 ? (
                                <>
                                    {cross(i) && cross(i) !== 'first' ? (
                                        <>{eventBlock(data)}</>
                                    ) : (
                                        <span
                                            onClick={() => settingModal()}
                                            style={{
                                                color: '#7c7c7c',
                                                fontSize: '16px',
                                                cursor: 'pointer',
                                            }}>
                                            +{solution(data.date) - 1}건
                                        </span>
                                    )}
                                </>
                            ) : (
                                <>{eventBlock(data)}</>
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                </>
            ))}
            {modal[elm - 1].show || modal[elm - 1].first ? (
                <Modal>
                    {holidays.map((item, idx) => (
                        <>
                            {((modal[elm - 1].first && cross(idx) === true) ||
                                (modal[elm - 1].show && cross(idx) !== true)) &&
                            item.date ===
                                (modal[elm - 1].start_at !== ''
                                    ? modal[elm - 1].start_at
                                    : `${Day.getYear(month, YEAR)}-${Day.getMonth(
                                          month,
                                      )}-${`${elm}`.padStart(2, '0')}`) ? (
                                <>
                                    <ContentDiv
                                        color={item.type === 'HOLIDAY' ? '#e84045' : '#505050'}
                                        onClick={() => resetModal()}>
                                        <div>{item.user.name}</div>
                                        <div>{item.date}</div>
                                    </ContentDiv>
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    ))}
                </Modal>
            ) : (
                <></>
            )}
        </>
    );
};

const ContentDiv = styled.div`
    height: 34px;
    width: 100%;
    border-radius: 6px;
    background-color: ${(props) => props.color};
    margin: 5px 0;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
    padding: 0 15px;
    gap: 30px;
    div ~ div {
        color: #fff;
        font-size: 10px;
    }
    div {
        color: #fff;
        font-size: 16px;
        font-weight: 500;
    }
`;

const Modal = styled.span`
    z-index: 99;
    width: min-content;
    padding: 10px 15px;
    box-sizing: border-box;
    margin-top: 40px;
    left: 15px;
    position: absolute;
    border-radius: 6px;
    border: none;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
    background-color: #fff;
    max-height: 120px;
    overflow: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        background-color: transparent;
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #505050;
        border: 2px solid #fff;
        border-radius: 5px;
        width: 10px;
    }
`;
