import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const HolidayUndo = ({ func }: { func: (value: string) => void }) => {
  return (
    <MainDiv onClick={() => func('none')}>
      <div />
      뒤로가기
    </MainDiv>
  );
};

export default HolidayUndo;

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

const MainDiv = styled.div`
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
  div {
    margin-right: 13px;
    width: 26px;
    height: 18px;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url("data:image/svg+xml,%3Csvg width='27' height='19' viewBox='0 0 27 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.133657 11.0333C0.212982 10.8287 0.331924 10.6418 0.48366 10.4833L5.48366 5.48333C5.7975 5.16949 6.22316 4.99318 6.66699 4.99318C7.11083 4.99318 7.53648 5.16949 7.85032 5.48333C8.16416 5.79717 8.34048 6.22283 8.34048 6.66667C8.34048 7.1105 8.16416 7.53616 7.85032 7.85L5.68366 10H21.667C22.109 10 22.5329 9.8244 22.8455 9.51184C23.1581 9.19928 23.3337 8.77536 23.3337 8.33333V1.66667C23.3337 1.22464 23.5093 0.800716 23.8218 0.488156C24.1344 0.175595 24.5583 0 25.0003 0C25.4424 0 25.8663 0.175595 26.1788 0.488156C26.4914 0.800716 26.667 1.22464 26.667 1.66667V8.33333C26.667 9.65942 26.1402 10.9312 25.2025 11.8689C24.2648 12.8065 22.9931 13.3333 21.667 13.3333H5.68366L7.85032 15.4833C8.00654 15.6383 8.13053 15.8226 8.21515 16.0257C8.29976 16.2288 8.34332 16.4466 8.34332 16.6667C8.34332 16.8867 8.29976 17.1045 8.21515 17.3076C8.13053 17.5107 8.00654 17.6951 7.85032 17.85C7.69538 18.0062 7.51105 18.1302 7.30795 18.2148C7.10485 18.2994 6.88701 18.343 6.66699 18.343C6.44697 18.343 6.22913 18.2994 6.02603 18.2148C5.82293 18.1302 5.6386 18.0062 5.48366 17.85L0.48366 12.85C0.331924 12.6915 0.212982 12.5046 0.133657 12.3C-0.0330391 11.8942 -0.0330391 11.4391 0.133657 11.0333Z' fill='%23ED666A'/%3E%3C/svg%3E%0A");
  }
  &:hover {
    div {
      animation: ${MoveArrow} 0.5s ease-in infinite;
      animation-direction: alternate;
    }
  }
`;
