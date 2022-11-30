const useToDay = (datePlusNumber: number) => {
    var date = new Date();
    date = new Date(date.setDate(date.getDate() + datePlusNumber));
    var year = date.getFullYear();
    var month = ('0' + (1 + date.getMonth())).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    const toDay = year + '-' + month + '-' + day;
    const numberDate = parseInt(day);

    return { toDay, numberDate };
};

export default useToDay;
