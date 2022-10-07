import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Lottie from 'lottie-react';
import styled from 'styled-components';
import { onSilentRefresh } from '../../services/reissueToken';
import LoginLottie from './loginlottie.json';
import { setAccessToken, setRefreshToken } from '../../services/tokenControl';
import { userAPI } from '../../features/userAPI';

type modalType = {
    modal: () => void;
};

const LoginModal: React.FC<modalType> = ({ modal }) => {
    const dispatch = useDispatch();

    const [inputEmail, setInputEmail] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');

    const [register, setRegister] = useState<boolean>(false);
    const [modalHeight, setModalHeight] = useState<string>('573');

    const [inputRegisterEmail, setInputRegisterEmail] = useState<string>('');
    const [inputRegisterNickname, setInputRegisterNickname] =
        useState<string>('');
    const [inputRegisterPassword, setInputRegisterPassword] =
        useState<string>('');

    const handleState = (
        e: React.ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<React.SetStateAction<string>>,
    ) => {
        const { value } = e.target;
        setState(value);
    };

    useEffect(() => {
        console.log('ok');
    }, [inputRegisterEmail, inputRegisterNickname, inputRegisterPassword]);

    const onClickRegister = () => {
        try {
            axios
                .post('/accounter/signup', {
                    email: inputRegisterEmail,
                    password: inputRegisterPassword,
                    nickName: inputRegisterNickname,
                    role: 'USER',
                })
                .then(() => {
                    setInputEmail(inputRegisterEmail);
                    console.log(inputRegisterEmail);
                    setInputPassword(inputRegisterPassword);
                    console.log(inputRegisterPassword);
                    // eslint-disable-next-line no-alert
                    alert('회원가입이 완료되었습니다.');
                    onClickLogin();
                });
        } catch (err) {
            console.log(err);
        }
    };

    const onClickLogin = () => {
        axios
            .post('/accounter/login', {
                email: inputEmail,
                password: inputPassword,
            })
            .then((res) => {
                const { accessToken, refreshToken } = res.data.data;
                axios.defaults.headers.common.Authorization = accessToken
                    ? `Bearer ${accessToken}`
                    : '';
                try {
                    setAccessToken(accessToken);
                    setRefreshToken(refreshToken);
                    userAPI(dispatch);
                    setInterval(onSilentRefresh, 1200000);

                    window.location.replace('/');
                } catch {
                    console.log('login err');
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (register) {
            setModalHeight('520');
        } else {
            setModalHeight('573');
        }
    }, [register]);

    useEffect(() => {
        return setRegister(false);
    }, []);

    const changeRegister = () => {
        setRegister(!register);
    };
    return (
        <ModalMain>
            <LoginWrap
                onClick={(e) => e.stopPropagation()}
                aria-hidden
                height={modalHeight}
            >
                <Close>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={modal}
                    >
                        <g clipPath="url(#clip0_336_226)">
                            <path
                                d="M13 1L1 13"
                                stroke="#6B6B6B"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M1 1L13 13"
                                stroke="#6B6B6B"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_336_226">
                                <rect width="14" height="14" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </Close>
                {!register ? (
                    <LoginInner>
                        <LoginHead>
                            <Lottie
                                animationData={LoginLottie}
                                loop
                                span={0.5}
                                width="231px"
                                height="157px"
                                id="loginAnimationStyle"
                            />
                            <p>
                                <span>A</span>CCOUNTER
                            </p>
                        </LoginHead>
                        <Form>
                            <InputStyle
                                value={inputEmail}
                                onChange={(e) => handleState(e, setInputEmail)}
                                type="text"
                                placeholder="이메일"
                            />
                            <InputStyle
                                value={inputPassword}
                                onChange={(e) =>
                                    handleState(e, setInputPassword)
                                }
                                type="password"
                                placeholder="비밀번호"
                            />
                            <button type="button" onClick={onClickLogin}>
                                로그인
                            </button>
                            <p
                                onClick={changeRegister}
                                onKeyDown={changeRegister}
                            >
                                회원가입 하러가기 &nbsp; &gt;
                            </p>
                        </Form>
                        <LoginFoot>
                            <SNSLogin href="http://54.180.19.84:8080/oauth2/authorization/kakao">
                                <svg
                                    width="50"
                                    height="50"
                                    viewBox="0 0 50 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="25.0977"
                                        cy="24.7158"
                                        r="24.7158"
                                        fill="#FAE100"
                                    />
                                    <path
                                        d="M25.7855 14.5156C18.7689 14.5156 13.083 19.0581 13.083 24.6646C13.083 28.3121 15.4922 31.5121 19.1086 33.2994C18.8435 34.301 18.146 36.9313 18.007 37.4932C17.8345 38.1905 18.2592 38.1827 18.5372 37.9954C18.756 37.8471 22.0172 35.6045 23.4252 34.6393C24.1896 34.7537 24.9773 34.8136 25.7829 34.8136C32.7969 34.8136 38.4854 30.2711 38.4854 24.6646C38.4854 19.0581 32.7995 14.5156 25.7855 14.5156Z"
                                        fill="#371D1E"
                                    />
                                </svg>
                                <p>카카오로 시작하기</p>
                            </SNSLogin>
                            <SNSLogin href="http://ec2-54-180-19-84.ap-northeast-2.compute.amazonaws.com:8080//oauth2/authorization/google">
                                <svg
                                    width="51"
                                    height="50"
                                    viewBox="0 0 51 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="25.4531"
                                        cy="25.0022"
                                        r="24.7158"
                                        fill="#F5F5F5"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M38.6344 25.3138C38.6344 24.3398 38.5464 23.4046 38.3847 22.5056H25.4531V27.8169H32.8432C32.525 29.5334 31.5574 30.9874 30.1034 31.9614V35.4061H34.5416C37.1377 33.0156 38.6357 29.4959 38.6357 25.3138H38.6344Z"
                                        fill="#3E82F1"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M25.4532 38.7331C29.1605 38.7331 32.2689 37.503 34.5404 35.4061L30.1022 31.9614C28.8721 32.7854 27.3004 33.2718 25.4519 33.2718C21.8753 33.2718 18.8484 30.8567 17.7682 27.6112H13.1826V31.1685C15.4424 35.6558 20.085 38.7331 25.4532 38.7331Z"
                                        fill="#32A753"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M17.7695 27.6112C17.4953 26.7873 17.3388 25.9076 17.3388 25.0022C17.3388 24.0967 17.4953 23.2171 17.7695 22.3931V18.8358H13.1826C12.2525 20.6895 11.7222 22.7863 11.7222 25.0022C11.7222 27.218 12.2525 29.3149 13.1826 31.1685L17.7695 27.6112Z"
                                        fill="#F9BB00"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M25.4532 16.7325C27.4686 16.7325 29.2795 17.4258 30.7024 18.7853L34.6413 14.8465C32.2625 12.6319 29.1541 11.2711 25.4532 11.2711C20.085 11.2711 15.4424 14.3484 13.1826 18.8358L17.7695 22.393C18.8497 19.1475 21.8766 16.7325 25.4532 16.7325Z"
                                        fill="#E74133"
                                    />
                                </svg>
                                <p>구글로 시작하기</p>
                            </SNSLogin>
                        </LoginFoot>
                    </LoginInner>
                ) : (
                    <RegisterInner>
                        <LoginHead>
                            <p>
                                <span>A</span>CCOUNTER
                            </p>
                        </LoginHead>
                        <Form>
                            <InputStyle
                                value={inputRegisterNickname}
                                onChange={(e) =>
                                    handleState(e, setInputRegisterNickname)
                                }
                                type="text"
                                placeholder="닉네임"
                            />
                            <InputStyle
                                value={inputRegisterEmail}
                                onChange={(e) =>
                                    handleState(e, setInputRegisterEmail)
                                }
                                type="text"
                                placeholder="이메일"
                            />
                            <InputStyle
                                value={inputRegisterPassword}
                                onChange={(e) =>
                                    handleState(e, setInputRegisterPassword)
                                }
                                type="password"
                                placeholder="비밀번호"
                            />
                            <button type="button" onClick={onClickRegister}>
                                회원가입
                            </button>
                            <p
                                onClick={changeRegister}
                                onKeyDown={changeRegister}
                            >
                                &lt; &nbsp; 뒤로가기
                            </p>
                        </Form>
                    </RegisterInner>
                )}
            </LoginWrap>
        </ModalMain>
    );
};

export default LoginModal;

const RegisterInner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Close = styled.div`
    position: absolute;
    top: 21px;
    right: 21px;
    > svg {
        cursor: pointer;
    }
`;

type ModalWrap = {
    height: string;
};

const ModalMain = styled.div`
    #loginAnimationStyle {
        transform: scale(0.5);
    }
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1000;
    backdrop-filter: blur(5px);
`;

const LoginWrap = styled.div<ModalWrap>`
    position: relative;
    z-index: 1001;
    background: #fff;
    width: 620px;
    height: ${(props) => props.height}px;
    border-radius: 18px;
    display: flex;
    flex-direction: column;
`;

const LoginHead = styled.div`
    width: 438px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 22px;
    margin-top: 70px;
    position: relative;
    > div {
        position: absolute;
        top: -105px;
    }
    > p {
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 700;
        font-size: 45px;
        line-height: 56px;
        color: #000000;

        > span {
            color: #0064ff;
        }
    }
`;

const LoginInner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const InputStyle = styled.input`
    width: calc(100% - 50px);
    height: 57px;
    background: #f7f7f7;
    border-radius: 15px;
    margin-bottom: 6px;
    border: none;
    padding: 0 25px;
    &::placeholder {
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 18px;
        color: #939393;
    }
`;

const Form = styled.form`
    width: 438px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28.33px;
    > button {
        width: 438px;
        height: 57.67px;
        background: #0064ff;
        border-radius: 15px;
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #ffffff;
        border: none;
        margin-bottom: 45.67px;
        cursor: pointer;
    }
    > p {
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #6b6b6b;
        cursor: pointer;
    }
`;

const LoginFoot = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SNSLogin = styled.a`
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #6b6b6b;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    > svg {
        margin-bottom: 8.28px;
    }
    &:first-of-type {
        margin-right: 24px;
    }
`;
