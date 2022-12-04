import React from 'react';
import * as Day from './func';
import { EventType, ModalType } from './type';
import styled from '@emotion/styled';

export const showCalendar = (
  elm: number,
  i: number,
  month: number,
  YEAR: number,
  modal: ModalType[],
  setModal: (value: ModalType[]) => void,
  event: EventType[],
) => {
  let cnt = 0;
  const eventBlock = (
    data: EventType,
    idx: number,
    title: string,
    width: number,
    radius: string,
    margin: number,
  ) => {
    return cross(idx) && cross(idx) !== 'first' ? (
      <EventBlockDiv
        onClick={() => settingModal(data.start_at)}
        width={`${width}px`}
        radius={`${radius}`}
        color={color[idx % 2]}
        margin={`${margin}px`}>
        {title}
      </EventBlockDiv>
    ) : (
      <></>
    );
  };

  const color = ['#E84045', '#505050'];

  const cross = (idx: number): boolean | string => {
    for (let i = 0; i < idx; i++) {
      if (
        Day.getperiod(event[i].start_at) <= Day.getperiod(event[idx].start_at) &&
        Day.getperiod(event[i].end_at) >= Day.getperiod(event[idx].start_at)
      ) {
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
    for (let j = 0; j < event.length; j++) {
      if (event[j].start_at === event[idx].start_at) {
        if (event[j] === event[idx]) {
          return 'first';
        } else {
          return false;
        }
      }
    }
    return true;
  };

  const overlap = (): number => {
    return ++cnt;
  };

  const settingModal = (start?: string, reset?: boolean) => {
    cnt = 0;

    if (!start) {
      setModal(
        modal.map((item: ModalType) =>
          item.id === elm
            ? { ...item, show: !item.show, first: false, start_at: '' }
            : { ...item, show: false, first: false, start_at: '' },
        ),
      );
    } else {
      setModal(
        modal.map((item: ModalType) =>
          item.id === elm
            ? { ...item, first: !item.first, show: false, start_at: start }
            : { ...item, first: false, show: false, start_at: '' },
        ),
      );
    }
  };

  const resetModal = () => {
    setModal(
      modal.map((item: ModalType) =>
        item.id === elm
          ? { ...item, show: false, first: false, start_at: '' }
          : { ...item, show: false, first: false, start_at: '' },
      ),
    );
  };

  return (
    <>
      {event.map((data: EventType, idx: number) =>
        Day.getperiod(data.start_at) <= Day.nowDate(month, YEAR, elm) &&
        Day.nowDate(month, YEAR, elm) <= Day.getperiod(data.end_at) ? (
          Day.getperiod(data.start_at) === Day.getperiod(data.end_at) ||
          (cross(idx) === true &&
            Day.getperiod(data.end_at) === Day.nowDate(month, YEAR, elm) &&
            (elm === 1 || i % 7 === 0)) ||
          (Day.getperiod(data.start_at) === Day.nowDate(month, YEAR, elm) &&
            (elm === Day.getLastDay(month, YEAR) || (i + 1) % 7 === 0)) ? (
            <>
              {cross(idx) && cross(idx) !== 'first' ? (
                <>{eventBlock(data, idx, data.title, 110, '5px', 0)}</>
              ) : (
                <span onClick={() => settingModal()}>+{overlap()}건</span>
              )}
            </>
          ) : Day.getperiod(data.start_at) === Day.nowDate(month, YEAR, elm) ||
            i % 7 === 0 ||
            elm === 1 ? (
            <>
              {Day.getperiod(data.start_at) === Day.nowDate(month, YEAR, elm) || elm === 1 ? (
                <>
                  {cross(idx) && cross(idx) !== 'first' ? (
                    <>{eventBlock(data, idx, data.title, 125, '5px 0 0 5px', 0)}</>
                  ) : (
                    <span onClick={() => settingModal()}>+{overlap()}건</span>
                  )}
                </>
              ) : (
                <>{eventBlock(data, idx, '', 125, '5px 0 0 5px', 0)}</>
              )}
            </>
          ) : (
            <>
              {Day.getperiod(data.end_at) === Day.nowDate(month, YEAR, elm) ||
              (i + 1) % 7 === 0 ||
              elm === Day.getLastDay(month, YEAR) ? (
                <>{eventBlock(data, idx, '', 125, '0 5px 5px 0', -15)}</>
              ) : (
                <>{eventBlock(data, idx, '', 141, '0', -15)}</>
              )}
            </>
          )
        ) : (
          <></>
        ),
      )}
      {modal[elm - 1].show || modal[elm - 1].first ? (
        <Modal>
          {event.map((item, idx) => (
            <>
              {((modal[elm - 1].first && cross(idx) === true) ||
                (modal[elm - 1].show && cross(idx) !== true)) &&
              (item.start_at ===
                (modal[elm - 1].start_at !== ''
                  ? modal[elm - 1].start_at
                  : `${Day.getYear(month, YEAR)}-${Day.getMonth(month)}-${`${elm}`.padStart(
                      2,
                      '0',
                    )}`) ||
                (elm === 1 &&
                  Day.getperiod(item.start_at) <
                    Day.getperiod(
                      `${Day.getYear(month, YEAR)}-${Day.getMonth(month)}-${`${elm}`.padStart(
                        2,
                        '0',
                      )}`,
                    ))) ? (
                <ContentDiv color={color[idx % 2]} onClick={() => resetModal()}>
                  <div>{item.title}</div>
                  <div>
                    {item.start_at} ~ {item.end_at}
                  </div>
                </ContentDiv>
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

const EventBlockDiv = styled.div<{ width: string; color: string; radius: string; margin: string }>`
  width: ${(props) => props.width};
  background-color: ${(props) => props.color};
  border-radius: ${(props) => props.radius};
  margin-left: ${(props) => props.margin};
  cursor: pointer;
`;

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
`;
