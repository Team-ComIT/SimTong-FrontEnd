import { useState } from 'react';

const useToDay = (datePlusNumber: number) => {
    var date = new Date();
    date = new Date(date.setDate(date.getDate() + datePlusNumber));
    var year = date.getFullYear();
    var month = ('0' + (1 + date.getMonth())).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);

    return year + '-' + month + '-' + day;
};

export default useToDay;
