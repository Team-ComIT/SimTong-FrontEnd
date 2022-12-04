import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL, Test_TOKEN } from '../../../data';
import { TODAY } from '../data';
import { AllScheduleType } from '../type';

const FadeInStart = keyframes`
  0% {
    transform: translateX(30%);
  }
  100% {
    transform: translateX(-5%);
  }
`;

const FadeOutStart = keyframes`
  0% {
    transform: translateX(-5%);
  }
  100% {
    transform: translateX(30%);
  }
`;

export const AllSchedule = ({ setting, create, initial, getEvent, event }: AllScheduleType) => {
    const [hover, setHover] = useState<string>('');

    const deleteSchedule = () => {
        axios({
            method: 'DELETE',
            url: BASE_URL + `/schedules/spots/${hover}`,
            headers: {
                Authorization: `Bearer ${Test_TOKEN}`,
            },
        }).then(() => {
            getEvent();
            create.setState(false);
            setting.setState(false);
        });
    };

    const settingInitial = (elm: any) => {
        initial.setState({
            title: elm.title,
            start_at: elm.start_at,
            end_at: elm.end_at,
            id: elm.id,
        });
    };

    return (
        <>
            <MainDiv>
                <h2>전체 일정</h2>
                <hr />
                <div>
                    <button
                        onClick={() => {
                            create.setState(!create.state);
                            initial.setState({
                                title: '',
                                start_at: TODAY,
                                end_at: '',
                                id: '',
                            });
                        }}>
                        일정생성
                    </button>
                </div>
                <span>
                    <ScheduleList>
                        {event.map((elm: any, i: number) => (
                            <div
                                onClick={() => {
                                    setting.setState(!setting.state);
                                    settingInitial(elm);
                                }}
                                onMouseEnter={() => setHover(elm.id)}
                                onMouseLeave={() => setHover('')}>
                                <p>
                                    <span>{elm.title}</span>
                                    <br />
                                    <span style={{ fontSize: '16px' }}>{elm.content}</span>
                                </p>
                                <Start animation={hover === elm.id ? FadeInStart : FadeOutStart}>
                                    <span>{elm.start_at}</span>
                                    <div onClick={() => deleteSchedule()} />
                                </Start>
                            </div>
                        ))}
                    </ScheduleList>
                </span>
            </MainDiv>
        </>
    );
};

const FadeInBtn = keyframes`
  0%, 99% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Start = styled.div<{ animation: any }>`
    width: 120px;
    display: inline-flex;
    align-items: center;
    animation: ${(props) => props.animation} 0.4s ease-in-out;
    animation-fill-mode: forwards;
    div {
        width: 34px;
        height: 26px;
        margin-bottom: 20px;
        background-repeat: no-repeat;
        background-image: url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.5' width='25' height='25' rx='12.5' fill='%23E84045'/%3E%3Cpath d='M13.9398 12.9999L18.1398 8.80655C18.2653 8.68101 18.3359 8.51075 18.3359 8.33321C18.3359 8.15568 18.2653 7.98542 18.1398 7.85988C18.0143 7.73434 17.844 7.66382 17.6665 7.66382C17.4889 7.66382 17.3187 7.73434 17.1931 7.85988L12.9998 12.0599L8.80646 7.85988C8.68093 7.73434 8.51066 7.66382 8.33313 7.66382C8.1556 7.66382 7.98533 7.73434 7.8598 7.85988C7.73426 7.98542 7.66374 8.15568 7.66374 8.33321C7.66374 8.51075 7.73426 8.68101 7.8598 8.80655L12.0598 12.9999L7.8598 17.1932C7.79731 17.2552 7.74771 17.3289 7.71387 17.4102C7.68002 17.4914 7.6626 17.5785 7.6626 17.6665C7.6626 17.7546 7.68002 17.8417 7.71387 17.9229C7.74771 18.0042 7.79731 18.0779 7.8598 18.1399C7.92177 18.2024 7.99551 18.252 8.07675 18.2858C8.15798 18.3197 8.24512 18.3371 8.33313 18.3371C8.42114 18.3371 8.50827 18.3197 8.58951 18.2858C8.67075 18.252 8.74449 18.2024 8.80646 18.1399L12.9998 13.9399L17.1931 18.1399C17.2551 18.2024 17.3288 18.252 17.4101 18.2858C17.4913 18.3197 17.5785 18.3371 17.6665 18.3371C17.7545 18.3371 17.8416 18.3197 17.9228 18.2858C18.0041 18.252 18.0778 18.2024 18.1398 18.1399C18.2023 18.0779 18.2519 18.0042 18.2857 17.9229C18.3196 17.8417 18.337 17.7546 18.337 17.6665C18.337 17.5785 18.3196 17.4914 18.2857 17.4102C18.2519 17.3289 18.2023 17.2552 18.1398 17.1932L13.9398 12.9999Z' fill='white'/%3E%3Crect x='0.5' y='0.5' width='25' height='25' rx='12.5' stroke='%23DC3035'/%3E%3C/svg%3E%0A");
        animation: ${FadeInBtn} 0.4s linear;
        animation-fill-mode: forwards;
    }
`;

const MainDiv = styled.span`
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
    > div {
        position: absolute;
        top: 32px;
        right: 15px;
    }
    > div > button {
        width: 126px;
        height: 42px;
        border-radius: 6px;
        border: 1px solid #ed666a;
        font-weight: 700;
        position: relative;
        z-index: 1;
        transition: all 0.4s ease-in-out;

        &::after {
            position: absolute;
            content: '';
            width: 0;
            height: 100%;
            margin-right: -1px;
            top: 0;
            right: 0;
            z-index: -1;
            background: #ed666a;
            transition: all 0.4s ease-in-out;
        }

        &:hover::after {
            left: 0;
            width: 101%;
            border-radius: 6px;
        }
        &:hover {
            color: #fff;
        }
    }
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
        margin-top: 20px;
        cursor: pointer;
        width: 100%;
        height: 50px;
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
        padding-left: 10px;
        span {
            font-size: 18px;
            font-weight: Bold;
            color: #000;
            animation-fill-mode: forwards;
            animation: ${FadeOutStart} 0.4s ease-in-out;
        }
    }
    span {
        margin-bottom: 20px;
        width: 110px;
        margin-right: 10px;
        color: #7c7c7c;
    }
`;
