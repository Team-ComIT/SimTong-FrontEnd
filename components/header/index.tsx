import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
// import Profile from '../../assets/svgs/Profile.svg';
import Logo from '../../assets/svgs/Logo';
import LoginModal from '../LoginModal/LoginModal';
import Image from 'next/image';
import { useAppSelector } from '../../hook/hooks';

const Header = () => {
    const [isModal, setIsModal] = useState<boolean>(false);
    const nav: string[] = ['HOME', '휴무표', '사원 관리', '캘린더'];

    const login = useAppSelector((state) => state.login.loggedIn);

    return (
        <>
            <MainDiv>
                {isModal && <LoginModal setIsModal={setIsModal} />}
                <LogoBox>
                    <Logo />
                </LogoBox>
                <Nav>
                    {nav.map((str: string) => (
                        <span>{str}</span>
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
                            <span>성심당 은행동 본점</span>
                            <LogOut>로그아웃</LogOut>
                        </>
                    ) : (
                        <LoginBtn>로그인</LoginBtn>
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
    width: 92px;
    height: 42px;
    background: none;
    border: 1px solid #e84045;
    color: #e84045;
    font-size: 16px;
    border-radius: 5px;
`;

const LogoBox = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 10px;
`;
