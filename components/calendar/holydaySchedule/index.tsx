import { useState } from 'react';
import HolydayChoice from './choice';
import HolyDaySetting from './setting';
import HolyDayShow from './show';

const HolyDaySchedule = ({
  month,
  year,
}: {
  month: {
    state: number;
    setState: (value: number) => void;
  };
  year: number;
}) => {
  const [status, setStatus] = useState<string>('none');

  return (
    <>
      {status === 'none' ? (
        <HolydayChoice setStatus={setStatus} />
      ) : (
        <>
          {status === 'show' ? (
            <HolyDayShow
              setStatus={setStatus}
              month={{ state: month.state, setState: month.setState }}
              year={year}
            />
          ) : (
            <HolyDaySetting setStatus={setStatus} month={month.state} year={year} />
          )}
        </>
      )}
    </>
  );
};

export default HolyDaySchedule;
