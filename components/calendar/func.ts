export const getperiod = (period?: string | null) => {
  return period ? new Date(period).getTime() : new Date().getTime();
};

export const nowDate = (M: number, Y: number, elm: number) => {
  return getperiod(`${getYear(M, Y)}-${getMonth(M)}-${`${elm}`.padStart(2, '0')}`);
};

export const getMonth = (M: number) => {
  return `${M > 0 ? (M % 12 !== 0 ? M % 12 : 12) : 12 + (M % 12)}`.padStart(2, '0');
};

export const getYear = (M: number, Y: number) => {
  return M > 0 ? Y + parseInt(`${(M - 1) / 12}`) : Y + parseInt(`${M / 12}`) - 1;
};

export const getLastDay = (M: number, Y: number) => {
  const last = new Date(Y, M, 0);
  return last.getDate();
};
