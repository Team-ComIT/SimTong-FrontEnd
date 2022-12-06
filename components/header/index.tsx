import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
// import Profile from '../../assets/svgs/Profile.svg';
import { useRouter } from 'next/router';
import Logo from '../../assets/svgs/Logo';
import LoginModal from '../LoginModal/LoginModal';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '../../hook/hooks';

interface navType {
    name: string;
    link: string;
}

const Header = () => {
    const router = useRouter();
    const [isModal, setIsModal] = useState<boolean>(false);
    const nav: navType[] = [
        { name: '휴무표', link: '/' },
        { name: '사원관리', link: '/' },
        { name: '캘린더', link: '/calender' },
    ];

    const showModal = () => {
        setIsModal(!isModal);
    };

    const login = useAppSelector((state) => state.login.loggedIn);

    if (router.pathname == '/find-number') {
        return <div></div>;
    }

    return (
        <>
            <MainDiv>
                {isModal && <LoginModal showModal={showModal} />}{' '}
                <Link href="/">
                    <LogoBox>
                        <Logo />
                    </LogoBox>
                </Link>
                <Nav>
                    {nav.map((item: navType, index: number) => (
                        <Link href={item.link} key={index}>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </Nav>
                <Profile>
                    {login ? (
                        <>
                            <ProfileImage>
                                <Image
                                    src={require('../../public/profile.png')}
                                    width="30px"
                                    height="30px"
                                />
                            </ProfileImage>

                            <LogOut>로그아웃</LogOut>
                        </>
                    ) : (
                        <LoginBtn onClick={showModal}>로그인</LoginBtn>
                    )}
                </Profile>
            </MainDiv>
        </>
    );
};

export default Header;

const MainDiv = styled.div`
    width: 100vw;
    overflow: hidden;
    height: 60px;
    display: inline-flex;
    align-items: center;
    justify-content: space-evenly;
    border-bottom: 1px solid #ededed;
`;

const Nav = styled.div`
    height: 23px;
    gap: 100px;
    display: inline-flex;
    justify-content: space-between;

    span {
        transition: all 0.2s;
        cursor: pointer;
        font-family: 'Pretendard';
        font-weight: 400;
        font-size: 18px;
        color: #242424;

        &:hover {
            font-weight: 600;
            color: #e84045;
        }
    }
`;

const Profile = styled.div`
    display: inline-flex;
    align-items: center;
`;

const ProfileImage = styled.div`
    margin-right: 15px;
`;

const LogOut = styled.span`
    font-size: 20px;
    color: #e84045;
    margin-left: 15px;
    font-weight: bold;
`;

const LoginBtn = styled.button`
    cursor: pointer;
    width: 92px;
    height: 42px;
    background: none;
    border: 1px solid #e84045;
    color: #e84045;
    font-size: 16px;
    border-radius: 5px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #e84045;
`;

const LogoBox = styled.div`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
`;
