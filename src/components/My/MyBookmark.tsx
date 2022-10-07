import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/config';
import RecommendBlock from '../Main/RecommendBlock';

const BookmarkNullComp: React.FC = () => {
    return (
        <BookmarkNullStyle>
            <div>
                <p>
                    북마크 추가{' '}
                    <svg
                        width="22"
                        height="25"
                        viewBox="0 0 22 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18.639 24.1425C18.1481 24.1425 17.6573 24.0217 17.2328 23.7679L10.7854 19.9858C10.6793 19.9254 10.5333 19.9254 10.4272 19.9858L3.97985 23.7679C3.18388 24.2392 2.17565 24.2754 1.33988 23.8525C0.517381 23.4417 0 22.6562 0 21.7862V2.11458C0 0.9425 1.03476 0 2.32158 0H18.9176C20.1911 0 21.2259 0.9425 21.2259 2.11458V21.7862C21.2259 22.6442 20.7085 23.4417 19.8727 23.8525C19.488 24.0458 19.0635 24.1425 18.639 24.1425ZM18.3206 22.2454C18.5859 22.4025 18.838 22.3058 18.9308 22.2696C19.0237 22.2212 19.236 22.0883 19.236 21.7862V2.11458C19.236 1.94542 19.09 1.8125 18.9043 1.8125H2.32158C2.13585 1.8125 1.98993 1.94542 1.98993 2.11458V21.7862C1.98993 22.0762 2.20218 22.2212 2.29505 22.2696C2.38791 22.3179 2.63997 22.4146 2.90529 22.2454L9.35265 18.4633C10.1221 18.0163 11.1038 18.0163 11.8732 18.4633L18.3206 22.2454Z"
                            fill="white"
                        />
                    </svg>
                </p>
                <p>추가된 북마크가 없습니다.</p>
            </div>
        </BookmarkNullStyle>
    );
};

const BookmarkNullStyle = styled.div`
    width: 100%;
    height: 890px;
    background: rgba(50, 51, 56, 0.2);
    border: 1.5px solid #38383d;
    border-radius: 15px;
    > div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        > p:first-of-type {
            font-family: 'Spoqa Han Sans Neo';
            font-style: normal;
            font-weight: 500;
            font-size: 23px;
            line-height: 29px;
            color: #ececec;
            margin-bottom: 18px;
            display: flex;
            > svg {
                margin-left: 7.83px;
            }
        }
        > p {
            font-family: 'Spoqa Han Sans Neo';
            font-style: normal;
            font-weight: 300;
            font-size: 23px;
            line-height: 29px;
            color: #c1c1c1;
            > span {
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
`;

const MyBookmark: React.FC = () => {
    const BookmarkData = useSelector((state: RootState) => {
        return state.userBookmarkList.array;
    });
    return (
        <MyBookmarkWrap>
            <Head>
                <p>🔖 북마크 모아보기</p>
            </Head>
            <Contents>
                {BookmarkData.length === 0 ? (
                    <BookmarkNullComp />
                ) : (
                    BookmarkData.map((item) => item)
                        .splice(0, 8)
                        .map((item, index) => {
                            return (
                                <RecommendBlock
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={index}
                                    corpCode={item.corpCode.corpCode}
                                    likeCount={item.corpCode.corpLike}
                                    corpName={item.corpCode.corpName}
                                    mypage
                                />
                            );
                        })
                )}
            </Contents>
        </MyBookmarkWrap>
    );
};

export default MyBookmark;

const MyBookmarkWrap = styled.div`
    width: 781px;
`;

const Contents = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
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
    margin-bottom: 25px;
`;
