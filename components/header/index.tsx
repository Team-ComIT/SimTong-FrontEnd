import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
// import Profile from '../../assets/svgs/Profile.svg';
// import Logo from '../../assets/svgs/Logo.svg';
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
                <Logo>
                    <LogoImg />
                    <Image src="../../assets/svgs/Logo.svg" />
                </Logo>
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

const LogoImg = styled.div`
    width: 55px;
    height: 44px;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("data:image/svg+xml,%3Csvg width='36' height='28' viewBox='0 0 36 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M26.965 3.25853C24.8445 2.70543 22.3086 3.10118 19.8236 5.07398C17.4391 6.9669 16.0553 9.35098 15.512 12.4548C16.1729 12.3987 16.8469 12.2757 17.4963 12.06C18.0895 11.8631 18.7306 12.1824 18.9283 12.7733C19.126 13.3642 18.8055 14.0029 18.2123 14.1999C17.1853 14.541 16.1432 14.6945 15.1755 14.736C14.7101 17.668 14.71 19.6486 14.71 21.6785C14.71 22.3014 14.2031 22.8063 13.5779 22.8063C12.9526 22.8063 12.4458 22.3014 12.4458 21.6785V21.6766C12.4458 19.6674 12.4458 17.6113 12.8989 14.6421C12.028 14.5346 11.2981 14.3614 10.8117 14.1999C10.2186 14.0029 9.89801 13.3642 10.0957 12.7733C10.2934 12.1824 10.9346 11.8631 11.5277 12.06C11.8735 12.1749 12.4752 12.3199 13.2253 12.4094C13.7932 8.74303 15.5456 5.1579 18.5339 2.78562C21.5309 0.40645 24.7932 -0.195601 27.6599 0.552132C30.5011 1.29322 32.8503 3.33407 34.1023 6.04289C35.3608 8.7657 35.5062 12.1455 33.9975 15.5687C32.4923 18.9839 29.3733 22.379 24.206 25.2627C18.8803 28.2347 11.8385 28.9504 6.68308 25.1428C1.06271 20.9919 0.0417845 14.9583 1.62119 10.5043C2.40507 8.29379 3.85332 6.41237 5.76452 5.39418C7.71744 4.35377 10.0563 4.2722 12.3944 5.52364C12.9452 5.81843 13.1518 6.50221 12.8559 7.05091C12.56 7.5996 11.8736 7.80543 11.3228 7.51064C9.63937 6.60961 8.38493 6.83329 7.1135 7.51064C5.80036 8.21021 4.67442 9.58646 4.03733 11.3831C2.7748 14.9434 3.08093 21.0223 7.86888 24.5584C12.6568 28.0946 18.2395 26.9215 21.8118 25.2627C28.4497 22.1802 30.5434 18.0443 31.8029 15.1863C33.059 12.3363 32.9041 9.63039 31.9243 7.51064C30.9381 5.37689 29.111 3.81828 26.965 3.25853Z' fill='%23E84045'/%3E%3C/svg%3E%0A");
`;

const Logo = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 10px;
`;
