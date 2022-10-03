import React from 'react';
import styled from 'styled-components';

const Header: React.FC = () => {
    return (
        <HeaderWrapper>
            <LogoWrap>로고</LogoWrap>
            <MenuWrap>
                <ul>
                    <li>서비스소개</li>
                    <li>주식찾기</li>
                    <li>주요종목</li>
                </ul>
            </MenuWrap>
            <UserWrap>
                <ul>
                    <li>로그인</li>
                    <li>회원가입</li>
                </ul>
            </UserWrap>
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
`;

const MenuWrap = styled.div`
    position: absolute;
    right: 345px;
    > ul {
        > li {
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
            width: 84px;
            height: 17px;
            box-sizing: border-box;
            &:nth-of-type(1) {
                border-right: 2px solid #fff;
            }
        }
    }
`;
