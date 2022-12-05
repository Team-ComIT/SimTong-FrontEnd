import React, { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';

interface workSpaceType {
    id: string;
    name: string;
    location: string;
}

interface propsType {
    item: workSpaceType;
    setSelect: (select: string) => void;
    setWorkspace: (uuid: string) => void;
}

const Workspace = (props: propsType) => {
    const { item, setSelect, setWorkspace } = props;
    const { name, id } = item;

    const onSetId = () => {
        setSelect(name);
        setWorkspace(id);
    };

    return <_Wrapper onClick={onSetId}>{name}</_Wrapper>;
};

const _Wrapper = styled.div`
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 40px;
    padding-left: 20px;
    font-family: 'NanumSquareF';
    font-weight: 700;
    font-size: 14px;
    color: #242424;

    &:hover {
        background-color: #eaeaea;
    }
`;

export default Workspace;
