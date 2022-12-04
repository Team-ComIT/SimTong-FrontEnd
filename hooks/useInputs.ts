import React, { useState, useCallback } from 'react';

const useInput = <T>(initalValue: T) => {
    const [data, setData] = useState<any>(initalValue);

    const handler = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value, name } = e.target;
            setData({
                ...data,
                [name]: value,
            });
        },
        [data],
    );

    return [data, setData, handler];
};

export default useInput;
