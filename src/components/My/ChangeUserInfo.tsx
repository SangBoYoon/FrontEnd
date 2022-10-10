import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { userAPI } from '../../features/userAPI';
import {
    setRefreshToken,
    setAccessToken,
    getAccessToken,
} from '../../services/tokenControl';
import { RootState } from '../../store/config';
import { onSilentRefresh } from '../../services/reissueToken';

const ChangeUserInfo: React.FC<{ nickname: boolean }> = ({ nickname }) => {
    const dispatch = useDispatch();
    const [inputChangeNickname, setInputChangeNickname] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');

    const [inputChangePassword, setInputChangePassword] = useState<string>('');
    const [checkInputChangePassword, setCheckInputChangePassword] =
        useState<string>('');

    const handleState = (
        e: React.ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<React.SetStateAction<string>>,
    ) => {
        const { value } = e.target;
        setState(value);
    };

    useEffect(() => {
        setInputChangeNickname('');
        setInputPassword('');
        setInputChangePassword('');
        setCheckInputChangePassword('');
    }, []);

    const { user } = useSelector((state: RootState) => ({
        user: state.user,
    }));

    const passwordCheck = () => {
        if (checkInputChangePassword !== inputChangePassword) {
            console.log('not correct');
            return false;
        }
        return true;
    };

    const userCheck = () => {
        const { email } = user;
        const password = nickname ? checkInputChangePassword : inputPassword;
        console.log(email);

        return axios
            .post(`http://54.180.19.84:8080/accounter/login`, {
                email,
                password,
            })
            .then((res) => {
                const { accessToken, refreshToken } = res.data.data;
                axios.defaults.headers.common.Authorization = accessToken
                    ? `Bearer ${accessToken}`
                    : '';
                try {
                    setAccessToken(accessToken);
                    setRefreshToken(refreshToken);
                    setInterval(onSilentRefresh, 1200000);
                } catch {
                    console.log('login err');
                }
            });
    };

    const ChangeNickname = () => {
        try {
            userCheck()
                .then(() => {
                    axios
                        .patch(
                            `http://54.180.19.84:8080/accounter/user`,
                            {
                                nickName: inputChangeNickname,
                                password: checkInputChangePassword,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${getAccessToken()}`,
                                },
                            },
                        )
                        .then(() => {
                            // eslint-disable-next-line no-alert
                            alert('닉네임이 성공적으로 변경되었습니다.');
                            userAPI(dispatch);
                            window.location.replace('/my');
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                })
                .catch(() => {
                    // eslint-disable-next-line no-alert
                    alert('비밀번호를 다시 확인해주세요.');
                });
        } catch (e) {
            console.log(e);
        }
    };

    const ChangePassword = () => {
        if (passwordCheck()) {
            try {
                userCheck()
                    .then(() => {
                        axios
                            .patch(
                                `http://54.180.19.84:8080/accounter/user`,
                                {
                                    nickName: user.nickName,
                                    password: inputChangePassword,
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${getAccessToken()}`,
                                    },
                                },
                            )
                            .then(() => {
                                // eslint-disable-next-line no-alert
                                alert('비밀번호가 성공적으로 변경되었습니다.');
                                window.location.replace('/my');
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    })
                    .catch(() => {
                        // eslint-disable-next-line no-alert
                        alert('비밀번호를 다시 확인해주세요.');
                    });
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <ChangeUserInfoStyle>
            <Head>
                <p>{nickname ? `😀 닉네임 변경` : `🔑 비밀번호 변경`}</p>
            </Head>
            <form>
                <InputFiled>
                    <p>{nickname ? `현재 닉네임` : `기존 비밀번호`}</p>
                    {nickname ? (
                        <CurrentNickname>
                            <p>{user.nickName}</p>
                        </CurrentNickname>
                    ) : (
                        <input
                            type="password"
                            placeholder="기존 비밀번호"
                            value={inputPassword}
                            onChange={(e) => handleState(e, setInputPassword)}
                        />
                    )}
                </InputFiled>
                <InputFiled>
                    <p>{nickname ? `변경할 닉네임` : `새 비밀번호`}</p>
                    <input
                        type={nickname ? 'text' : 'password'}
                        placeholder={nickname ? `변경할 닉네임` : `새 비밀번호`}
                        value={
                            nickname ? inputChangeNickname : inputChangePassword
                        }
                        onChange={(e) =>
                            handleState(
                                e,
                                nickname
                                    ? setInputChangeNickname
                                    : setInputChangePassword,
                            )
                        }
                    />
                </InputFiled>
                <InputFiled>
                    <p>비밀번호 확인</p>
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={checkInputChangePassword}
                        onChange={(e) =>
                            handleState(e, setCheckInputChangePassword)
                        }
                    />
                </InputFiled>
                <SubmitBtn>
                    <button
                        type="button"
                        onClick={nickname ? ChangeNickname : ChangePassword}
                    >
                        {nickname ? '닉네임 변경하기' : '비밀번호 변경하기'}
                    </button>
                </SubmitBtn>
            </form>
        </ChangeUserInfoStyle>
    );
};

export default ChangeUserInfo;

const ChangeUserInfoStyle = styled.div`
    width: 781px;
    display: flex;
    flex-direction: column;
    > div {
        display: flex;
        flex-direction: column;
    }
`;

const SubmitBtn = styled.div`
    > button {
        margin-top: 10px;
        width: 158px;
        height: 55px;
        background: #0064ff;
        box-shadow: 0px 2px 15px rgba(0, 100, 255, 0.35);
        border-radius: 18px;
        margin-left: 174px;
        border: none;
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #ececec;
        cursor: pointer;
    }
`;

const Head = styled.div`
    p {
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 500;
        font-size: 23px;
        line-height: 29px;
        color: #ececec;
    }
    margin-bottom: 44px;
`;

const InputFiled = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;

    > p {
        margin-left: 38px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 109px;
        margin-right: 31px;
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 23px;
        color: #ececec;
        white-space: nowrap;
    }
    > input {
        padding: 0 20px;
        width: calc(100% - 178px);
        height: 73px;
        background: #323338;
        border: 1px solid #38383d;
        border-radius: 15px;
        &:focus {
            outline: none;
        }
        &::placeholder {
            font-family: 'Spoqa Han Sans Neo';
            font-style: normal;
            font-weight: 300;
            font-size: 18px;
            line-height: 23px;
            color: #939393;
        }
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 23px;
        color: #ececec;
    }
`;

const CurrentNickname = styled.div`
    height: 75px;
    display: flex;
    align-items: center;
    p {
        margin-left: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 23px;
        color: #ececec;
    }
`;
