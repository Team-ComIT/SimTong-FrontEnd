import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { menuType } from '../../types/menuType';
import useToDay from '../../hooks/useToDay';
import { instance } from '../../apis/instance';
import SimTongApp from '../../assets/imgs/SImTongApp.png';
import MealArrow from '../../assets/svgs/MealArrow';
import styled from '@emotion/styled';

const MainPage = () => {
    const [menuList, setMenuList] = useState<menuType[]>([]);
    const [datePlusNumber, setDatePlusNumber] = useState<number>(0);
    const toDay = useToDay(datePlusNumber);

    const getMenu = () => {
        instance
            .get('/menu', {
                params: {
                    date: toDay,
                },
            })
            .then((res) => {
                setMenuList(res.data.menu);
            })
            .catch((res) => {});
    };

    useEffect(() => {
        getMenu();
    }, []);

    const menuMap = menuList.map((item, index) => {
        if (item.date == toDay) {
            const menuArray = item.meal.split(',');
            return menuArray.map((item, index) => {
                return <_MenuText key={index}>{item}</_MenuText>;
            });
        }
    });

    return (
        <_PageLayout>
            <_TextLayout>
                <h1>
                    ME<span>A</span>L
                </h1>
                <h2>
                    Sung<span>Sim</span>Dang
                </h2>
                <_MealLayout>
                    <h3>이번주 점심 메뉴</h3>
                    <_MealLine />
                    <_DateBox>
                        <MealArrow
                            datePlusNumber={datePlusNumber}
                            setDatePlusNumber={setDatePlusNumber}
                            direction="left"
                        />
                        <p>{toDay}</p>
                        <MealArrow
                            datePlusNumber={datePlusNumber}
                            setDatePlusNumber={setDatePlusNumber}
                            direction="right"
                        />
                    </_DateBox>
                    {menuMap || <_MenuText>메뉴가 없습니다</_MenuText>}
                </_MealLayout>
            </_TextLayout>
            <_ImgBox>
                <Image src={SimTongApp} />
            </_ImgBox>
        </_PageLayout>
    );
};

const _PageLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

const _TextLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-left: 15vw;

    span {
        color: #e84045;
    }

    h1 {
        font-family: 'NanumSquare';
        font-weight: 300;
        font-size: 50px;
        color: #242424;
        margin: 0px;
        line-height: 40px;
    }

    h2 {
        font-family: 'NanumSquare';
        font-weight: 800;
        font-size: 40px;
        color: #242424;
        margin: 0px;
    }
`;

const _ImgBox = styled.div`
    width: 800px;
    margin-right: 5vw;
`;

const _MealLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    margin-top: 5px;

    h3 {
        font-family: 'NanumSquare';
        font-weight: 800;
        font-size: 24px;
        color: #242424;
        margin: 0px;
    }
`;

const _MealLine = styled.div`
    width: 100px;
    height: 2px;
    border-radius: 10px;
    background: #dfdfdf;
`;

const _DateBox = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    p {
        font-family: 'NanumSquare';
        font-weight: 700;
        font-size: 18px;
        color: #242424;
        margin: 0px;
    }
`;

const _MenuText = styled.p`
    font-family: 'NanumSquare';
    font-weight: 700;
    font-size: 18px;
    color: #242424;
    margin: 0px;
`;

export default MainPage;
