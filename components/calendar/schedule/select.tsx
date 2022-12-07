import styled from '@emotion/styled';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { SpotType } from '../type';
const SelectComplete = ({ func }: { func: (value: string, props: string) => void }) => {
    const [show, setShow] = useState<boolean>(false);
    const [name, setName] = useState<string>('지점 선택');
    const [arr, setArr] = useState<SpotType[]>([]);

    document.addEventListener('click', () => {
        setShow(false);
    });

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://3.39.162.197:8888/commons/spot',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        }).then((res) => {
            setArr(res.data.spot_list);
        });
    }, []);

    return (
        <>
            <input
                onClick={(e) => {
                    e.stopPropagation();
                    setShow(!show);
                }}
                value={name}
            />
            <DataList state={show}>
                {arr.map((spot: SpotType, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            func(spot.id, 'id');
                            setName(spot.name);
                        }}>
                        {spot.name}
                    </div>
                ))}
            </DataList>
        </>
    );
};
export default SelectComplete;

const DataList = styled.div<{ state: boolean }>`
    position: absolute;
    width: 150px;
    z-index: 2;
    visibility: ${(props) => (props.state ? 'visible' : 'hidden')};
    margin-top: 76px;
    background-color: #fff;
    border: 2px solid #d3d3d3;
    border-radius: 4px;
    div {
        height: 42px;
        display: flex;
        align-items: center;
        padding-left: 15px;
        font-size: 14px;
    }

    div:hover {
        background-color: #ededed;
    }
`;
