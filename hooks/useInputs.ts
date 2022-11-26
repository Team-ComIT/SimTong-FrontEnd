import React, { useState, useCallback } from 'react';

const useInput = <T>(initalValue: T) => {
    // state 정의
    const [data, setData] = useState<T>(initalValue);

    // 함수 정의
    const handler = useCallback(
        (e: any) => {
            const { value, name } = e.target;
            setData({
                ...data,
                [name]: value,
            });
        },
        [data],
    );
    return [data, handler];
};

export default useInput;
