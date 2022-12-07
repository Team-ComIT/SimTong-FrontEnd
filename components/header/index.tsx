import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
// import Profile from '../../assets/svgs/Profile.svg';
import { useRouter } from 'next/router';
import { nav } from './constant';
import Logo from '../../assets/svgs/Logo';
import LoginModal from '../LoginModal/LoginModal';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '../../hook/hooks';

interface NavProps {
    current: boolean;
}

const Header = () => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [isModal, setIsModal] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            setIsLogin(true);
        }
    }, []);

    const showModal = () => {
        setIsModal(!isModal);
    };

    // const login = useAppSelector((state) => state.login.loggedIn);

    const onClickLogout = () => {
        setIsLogin(false);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        router.push('/');
        router.reload();
    };

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
                <NavList>
                    {nav.map((item, index: number) => (
                        <Link href={item.link} key={index}>
                            <Nav current={item.link == router.pathname}>{item.name}</Nav>
                        </Link>
                    ))}
                </NavList>
                <Profile>
                    {isLogin ? (
                        <>
                            <ProfileImage>
                                <Image
                                    src={require('../../public/profile.png')}
                                    width="30px"
                                    height="30px"
                                />
                            </ProfileImage>
                            <LogOut onClick={onClickLogout}>로그아웃</LogOut>
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

const NavList = styled.div`
    height: 23px;
    gap: 100px;
    display: inline-flex;
    justify-content: space-between;
`;

const Nav = styled.span<NavProps>`
    transition: all 0.2s;
    cursor: pointer;
    font-family: 'Pretendard';
    font-weight: ${(props) => (props.current ? 600 : 400)};
    font-size: 18px;
    color: ${(props) => (props.current ? '#e84045' : '#242424')};

    &:hover {
        font-weight: 600;
        color: #e84045;
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
    transition: all 0.3s;
    cursor: pointer;
    font-size: 18px;
    color: #e84045;
    margin: 0px;
    font-weight: bold;

    &:hover {
        color: #ef666b;
    }
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
