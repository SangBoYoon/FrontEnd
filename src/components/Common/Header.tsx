import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../store/config';
import { setLoginModal } from '../../store/slices/handleLoginModalSlice';
import { logOut } from '../../store/slices/userSlice';
import LoginModal from '../Login/LoginModal';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const isModal = useSelector((state: RootState) => {
        return state.handleLoginModal.isModal;
    });
    const handleModal = () => {
        const main = document.getElementsByClassName('main')[0];
        dispatch(setLoginModal(!isModal));
        if (isModal) {
            if (main) {
                main.className = 'main';
            }
        } else if (main) {
            main.className = 'main is-blurred';
        }
    };

    const { user } = useSelector((state: RootState) => ({
        user: state.user.email,
    }));

    const logout = () => {
        dispatch(logOut());
    };

    return (
        <HeaderWrapper>
            <LogoWrap>
                <Link to="/">
                    <svg
                        width="252"
                        height="266"
                        viewBox="0 0 252 266"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M192.646 221.835L186.464 226.568L162.875 244.643L154.959 223.916L126.365 148.939C126.365 148.939 113.555 182.327 98.2305 222.318C93.882 233.666 89.3229 245.56 84.801 257.354C75.5218 253.91 66.7381 249.413 58.6235 243.974C56.4926 242.537 54.3865 241.038 52.3547 239.489L66.8992 202.781L112.131 88.6555H139.857L186.786 207.055L192.633 221.835H192.646Z"
                            fill="url(#paint0_linear_350_420)"
                        />
                        <path
                            d="M214.933 165.118C201.442 204.799 167.744 227.644 128.063 227.644C102.976 227.644 80.1308 216.779 63.6537 199.559C47.1766 182.326 36.6956 159.122 36.6956 132.919C36.6956 106.717 47.1766 82.7324 63.6537 65.5244C80.1308 48.2916 102.976 37.439 128.063 37.439C166.617 37.439 198.828 57.2858 212.679 96.6079H250.118C247.665 86.9818 244.382 77.9132 240.318 69.5012C227.421 42.7785 206.744 22.5476 181 11.0013C165.093 3.84053 147.229 0 128.051 0C93.2505 0 61.6591 14.6931 38.9132 37.439C38.4177 37.9345 37.9097 38.4425 37.4266 38.938C14.9904 62.8856 0 95.8398 0 132.907C0 169.974 14.9781 202.185 37.439 226.145C60.2839 250.105 92.4824 265.083 128.063 265.083C189.09 265.083 237.023 224.646 251.988 165.118H214.933Z"
                            fill="url(#paint1_linear_350_420)"
                        />
                        <path
                            d="M214.933 165.118C201.441 204.8 167.744 227.645 128.063 227.645C112.155 227.645 97.1773 223.259 84.1319 215.677C80.3285 227.843 76.6366 240.033 72.9819 252.249C89.6201 260.463 108.327 265.096 128.075 265.096C189.102 265.096 237.034 224.659 252 165.131H214.945L214.933 165.118Z"
                            fill="url(#paint2_linear_350_420)"
                        />
                        <path
                            d="M110.632 189.982C106.865 199.782 102.653 210.771 98.2181 222.317C93.8696 233.665 89.3229 245.546 84.7886 257.352C73.0564 253.004 62.1419 246.958 52.3547 239.488L66.8992 202.78L71.9786 189.97H110.632V189.982Z"
                            fill="url(#paint3_linear_350_420)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_350_420"
                                x1="124.049"
                                y1="264.341"
                                x2="116.182"
                                y2="93.1403"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="white" />
                            </linearGradient>
                            <linearGradient
                                id="paint1_linear_350_420"
                                x1="62.4396"
                                y1="246.5"
                                x2="194.368"
                                y2="17.9885"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0.99" stopColor="white" />
                            </linearGradient>
                            <linearGradient
                                id="paint2_linear_350_420"
                                x1="95.3189"
                                y1="192.027"
                                x2="159.84"
                                y2="209.235"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#2B2C31" />
                                <stop
                                    offset="1"
                                    stopColor="white"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                            <linearGradient
                                id="paint3_linear_350_420"
                                x1="83.8595"
                                y1="266.186"
                                x2="75.9926"
                                y2="94.9848"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="white" />
                            </linearGradient>
                        </defs>
                    </svg>
                </Link>
            </LogoWrap>
            <MenuWrap>
                <ul>
                    <li>
                        <Link to="/service">서비스 소개</Link>
                    </li>
                    <li>
                        <Link to="/corporations">주식찾기</Link>
                    </li>
                    <li>주요종목</li>
                </ul>
            </MenuWrap>
            <UserWrap>
                {!user ? (
                    <ul>
                        <li onClick={handleModal} onKeyDown={handleModal}>
                            로그인
                        </li>
                        <li>회원가입</li>
                    </ul>
                ) : (
                    <ul>
                        <li onClick={logout} onKeyDown={logout}>
                            로그아웃
                        </li>
                        <li>마이페이지</li>
                    </ul>
                )}
            </UserWrap>
            {isModal && <LoginModal modal={handleModal} />}
        </HeaderWrapper>
    );
};

export default Header;

const HeaderWrapper = styled.div`
    width: 100%;
    height: 60px;
    z-index: 999;
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #2b2c31;
    > div {
        display: flex;
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 23px;
        color: #ececec;
        > ul {
            display: flex;
            list-style: none;
            > li {
                cursor: pointer;
            }
        }
    }
`;

const LogoWrap = styled.div`
    position: absolute;
    left: 31px;
    > a {
        transform: scale(0.14);
        > svg {
        }
    }
`;

const MenuWrap = styled.div`
    position: absolute;
    right: 345px;
    > ul {
        > li {
            > a {
                text-decoration: none;
                color: #ececec;
            }
            margin-left: 95px;
        }
    }
`;

const UserWrap = styled.div`
    position: absolute;
    right: 31px;
    > ul {
        > li {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 94px;
            height: 17px;
            box-sizing: border-box;
            &:nth-of-type(1) {
                border-right: 2px solid #fff;
            }
        }
    }
`;
