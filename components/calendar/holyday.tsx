import React from 'react';
import * as Day from './func';

export const showHolyday = (elm: number, month: number, YEAR: number, holidays: any[]) => {
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
              {solution(data.date) >= 2 && i >= 1 ? (
                <>
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
                <>{eventBlock(data.user.name)}</>
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
