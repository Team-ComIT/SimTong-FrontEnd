import React from 'react';
import Image from 'next/image';
import SimTongApp from '../../assets/imgs/SImTongApp.png';
import MealArrow from '../../assets/svgs/MealArrow';
import styled from '@emotion/styled';

const MainPage = () => {
    return (
        <_PageLayout>
            <_TextLayout>
                <_TextTitle>
                    ME<_TextPoint>A</_TextPoint>L
                </_TextTitle>
                <_TextSubTitle>
                    Sung<_TextPoint>Sim</_TextPoint>Dang
                </_TextSubTitle>
                <_MealLayout>
                    <_MealWeekTitle>이번주 점심 메뉴</_MealWeekTitle>
                    <_MealLine />
                    <_DateBox>
                        <MealArrow direction="left" />
                        <_DateText>2022-03-29</_DateText>
                        <MealArrow direction="right" />
                    </_DateBox>
                    <_MenuText>dㅁㅇㅁㅇ</_MenuText>
                    <_MenuText>dㅁㅇㅁㅇ</_MenuText>
                    <_MenuText>dㅁㅇㅁㅇ</_MenuText>
                    <_MenuText>dㅁㅇㅁㅇ</_MenuText>
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
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

const _TextLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`;

const _ImgBox = styled.div``;

const _TextPoint = styled.span`
    color: #e84045;
`;

const _TextTitle = styled.h1`
    font-family: 'NanumSquare';
    font-weight: 300;
    font-size: 50px;
    color: #242424;
    margin: 0px;
`;

const _TextSubTitle = styled.h2`
    font-family: 'NanumSquare';
    font-weight: 800;
    font-size: 40px;
    color: #242424;
    margin: 0px;
`;

const _MealLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    margin-top: 5px;
`;

const _MealWeekTitle = styled.div`
    font-family: 'NanumSquare';
    font-weight: 800;
    font-size: 24px;
    color: #242424;
`;

const _MealLine = styled.div`
    width: 100px;
    height: 1px;
    background: #242424;
`;

const _DateBox = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const _DateText = styled.p`
    font-family: 'NanumSquare';
    font-weight: 700;
    font-size: 18px;
    color: #242424;
    margin: 0px;
`;

const _MenuText = styled.p`
    font-family: 'NanumSquare';
    font-weight: 700;
    font-size: 18px;
    color: #242424;
    margin: 0px;
`;

export default MainPage;
