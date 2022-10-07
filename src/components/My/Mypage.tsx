/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/config';
import ChangeUserInfo from './ChangeUserInfo';
import DeleteUser from './DeleteUser';
import MyBookmark from './MyBookmark';
import MyPageCategoryBtn from './MyPageCategoryBtn';

const Mypage: React.FC = () => {
    const categoryRedux = useSelector((state: RootState) => {
        return state.myPageCategory.category;
    });

    return (
        <MyPageWrap>
            <MyPageInner>
                <MyPageCategory>
                    <ul>
                        <MyPageCategoryBtn category="닉네임 변경" />
                        <MyPageCategoryBtn category="비밀번호 변경" />
                        <MyPageCategoryBtn category="북마크 모아보기" />
                        <MyPageCategoryBtn category="계정 관리" />
                    </ul>
                </MyPageCategory>
                <div>
                    <MyPageContent>
                        {categoryRedux === '닉네임 변경' ? (
                            <ChangeUserInfo nickname />
                        ) : categoryRedux === '비밀번호 변경' ? (
                            <ChangeUserInfo nickname={false} />
                        ) : categoryRedux === '북마크 모아보기' ? (
                            <MyBookmark />
                        ) : categoryRedux === '계정 관리' ? (
                            <DeleteUser />
                        ) : null}
                    </MyPageContent>
                </div>
            </MyPageInner>
        </MyPageWrap>
    );
};

export default Mypage;

const MyPageWrap = styled.div`
    padding-top: 60px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const MyPageInner = styled.div`
    margin-top: 250px;
    display: flex;
    flex-direction: row;
    margin-bottom: 250px;
`;

const MyPageCategory = styled.div`
    width: 278px;
    margin-right: 51px;
    ul {
        list-style: none;
        width: 100%;
    }
    #select {
        background: #323338;
        border-radius: 10px;
    }
`;

const MyPageContent = styled.div`
    display: flex;
`;
