import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../store/config';
import { corpLikeType } from '../../store/slices/userLikeListSlice';
import BookmarkBtn from '../Common/BookmarkBtn';
import Like from '../Common/Like';

type recommendBlockType = {
    corpName: string;
    corpCode: string;
    likeCount: number;
    mypage: boolean;
};

const RecommendBlock: React.FC<recommendBlockType> = ({
    corpName,
    corpCode,
    likeCount,
    mypage,
}) => {
    const [, setData] = useState({});
    const LikeData = useSelector((state: RootState): corpLikeType[] => {
        return state.userLike.array;
    });

    useEffect(() => {
        setData({});
        console.log(corpName);
    }, [LikeData]);
    return (
        <RecommendBlockStyle mypage={mypage}>
            <Link to={`/corporations/${corpCode}`}>
                <div>
                    <Head>
                        <p>{corpName}</p>
                    </Head>
                    <LikeWrap>
                        <p>{likeCount}</p>
                    </LikeWrap>
                </div>
            </Link>
            <BookmarkBtn corpCode={corpCode} />
            <Like corpCode={corpCode} />
        </RecommendBlockStyle>
    );
};

export default RecommendBlock;

type RecommendBlockStyleType = {
    mypage: boolean;
};

const RecommendBlockStyle = styled.div<RecommendBlockStyleType>`
    position: relative;
    &:hover {
        background: #e2e2e2;
        > a > div > div > p {
            color: #262626;
        }
        > a > div > div {
            color: #262626;
        }
    }
    width: ${(props) => (props.mypage ? '249px' : '280.94px')};
    height: 133px;
    background: #2b2c31;
    border-radius: 15px;

    &:nth-of-type(${(props) => (props.mypage ? 'n' : '-n + 4')}) {
        ${(props) =>
            props.mypage ? 'margin-bottom: 17px' : 'margin-bottom: 26px;'}
    }

    &:not(:nth-of-type(${(props) => (props.mypage ? '3n' : '4n')})) {
        margin-right: ${(props) => (props.mypage ? '17px' : '25.4px')};
    }

    > a {
        text-decoration: none;
    }

    > a > div {
        height: calc(100% - 38px);
        padding: 19px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: auto;
    }
`;

const Head = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    > p {
        width: 180px;
        white-space: normal;
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 400;
        font-size: 23px;
        line-height: 29px;
        color: #e2e2e2;
    }
`;

const LikeWrap = styled.div`
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 18px;
    color: #848587;
    > p {
        height: 22px;
        margin-left: 30px;
    }
`;
