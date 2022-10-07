import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deleteUser } from '../../store/slices/userSlice';

const DeleteUser: React.FC = () => {
    const [isModal, setIsModal] = useState<boolean>(false);
    const dispatch = useDispatch();

    const removeUser = () => {
        dispatch(deleteUser());
    };

    const handleRemoveModal = () => {
        setIsModal(!isModal);
    };
    return (
        <DeleteUserWrap>
            <div>
                <Head>
                    <p>😥 계정 탈퇴하기</p>
                </Head>
                <MainTxt>
                    <p>정말로 탈퇴하시겠습니까?</p>
                </MainTxt>
                <div>
                    <FootBtn onClick={handleRemoveModal} type="button">
                        탈퇴하기
                    </FootBtn>
                    <FootBtn
                        onClick={() => {
                            window.location.replace('/');
                        }}
                        type="button"
                    >
                        다시 생각해보기
                    </FootBtn>
                </div>
            </div>

            {isModal && (
                <ModalMain id="background">
                    <LoginWrap onClick={(e) => e.stopPropagation()} aria-hidden>
                        <Close>
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={handleRemoveModal}
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
                                        <rect
                                            width="14"
                                            height="14"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Close>
                        <DeleteLoginModal>
                            <div>
                                <h1>정말로 탈퇴하시겠어요?</h1>
                                <p>
                                    탈퇴하시면 회원님의 모든 정보와 활동 기록이
                                    삭제됩니다. <br />
                                    삭제된 정보는 복구할 수 없으니 신중하게
                                    결정해주세요.
                                </p>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={handleRemoveModal}
                                >
                                    취소
                                </button>
                                <button type="button" onClick={removeUser}>
                                    탈퇴하기
                                </button>
                            </div>
                        </DeleteLoginModal>
                    </LoginWrap>
                </ModalMain>
            )}
        </DeleteUserWrap>
    );
};

export default DeleteUser;

const Close = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    > svg {
        cursor: pointer;
    }
`;

const ModalMain = styled.div`
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
const LoginWrap = styled.div`
    position: relative;
    z-index: 1001;
    background: #3c3d44;
    width: 621px;
    height: 271px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const DeleteLoginModal = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    > div:first-of-type {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        > h1 {
            font-family: 'Spoqa Han Sans Neo';
            font-style: normal;
            font-weight: 700;
            font-size: 32px;
            line-height: 40px;
            color: #ececec;
            margin-bottom: 9px;
        }
        > p {
            font-family: 'Spoqa Han Sans Neo';
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 19px;
            color: #ececec;
        }
        margin-bottom: 34px;
    }
    > div:nth-of-type(2) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        > button {
            font-family: 'Spoqa Han Sans Neo';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            color: #ececec;
            width: 187px;
            height: 55px;
            background: #323338;
            border: 1px solid #6b6b6b;
            border-radius: 38px;
            cursor: pointer;
            &:nth-of-type(2) {
                background: #e35131;
                border: 1px solid #f85633;
            }
        }
    }
`;

const DeleteUserWrap = styled.div`
    width: 781px;
    display: flex;
    flex-direction: column;
    > div > div {
        display: flex;
        flex-direction: row;
    }
`;

const MainTxt = styled.div`
    > p {
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #ececec;
    }
    margin-left: 38px;
    margin-bottom: 24px;
    margin-top: 27px;
`;

const FootBtn = styled.button`
    width: 187px;
    height: 55px;
    background: #323338;
    border-radius: 38px;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #ececec;
    border: none;
    cursor: pointer;
    &:first-of-type {
        margin-left: 38px;
        margin-right: 25px;
        background: #e35131;
        border: 1px solid #f85633;
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
`;
