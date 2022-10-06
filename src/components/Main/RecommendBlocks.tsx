import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/config';
import { setLoginModal } from '../../store/slices/handleLoginModalSlice';
import RecommendBlock from './RecommendBlock';

type corpDataType = {
    corpName: string;
    corpCode: string;
    corpCategory: string;
    likeCount: number;
};

type corpDataTypeBookmarkEl = {
    corpName: string;
    corpCode: string;
    corpCategory: string;
    corpLike: number;
};

export type corpDataTypeBookmark = {
    corpCode: corpDataTypeBookmarkEl;
};

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
                <p>종목을 확인해보시고 마음에 드는 종목을 추가해보세요.</p>
            </div>
        </BookmarkNullStyle>
    );
};

const BookmarkNotLoginComp: React.FC = () => {
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
    return (
        <BookmarkNullStyle>
            <div>
                <p>
                    북마크 추가{' '}
                    <svg
                        width="21"
                        height="25"
                        viewBox="0 0 21 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.8103 24.5592C17.3633 24.5592 16.9162 24.4384 16.5295 24.1846L10.657 20.4025C10.5603 20.3421 10.4274 20.3421 10.3308 20.4025L4.45825 24.1846C3.73325 24.6559 2.81492 24.6921 2.05367 24.2692C1.3045 23.8584 0.833252 23.0729 0.833252 22.2029V2.53127C0.833252 1.35919 1.77575 0.416687 2.94784 0.416687H18.0641C19.2241 0.416687 20.1666 1.35919 20.1666 2.53127V22.2029C20.1666 23.0609 19.6953 23.8584 18.9341 24.2692C18.5837 24.4625 18.197 24.5592 17.8103 24.5592ZM17.5203 22.6621C17.762 22.8192 17.9916 22.7225 18.0762 22.6863C18.1608 22.6379 18.3541 22.505 18.3541 22.2029V2.53127C18.3541 2.3621 18.2212 2.22919 18.052 2.22919H2.94784C2.77867 2.22919 2.64575 2.3621 2.64575 2.53127V22.2029C2.64575 22.4929 2.83909 22.6379 2.92367 22.6863C3.00825 22.7346 3.23784 22.8313 3.4795 22.6621L9.352 18.88C10.0528 18.4329 10.947 18.4329 11.6478 18.88L17.5203 22.6621Z"
                            fill="#ECECEC"
                        />
                    </svg>
                </p>
                <p>
                    <span onClick={handleModal} role="button" aria-hidden>
                        로그인
                    </span>{' '}
                    후 북마크를 추가해보세요.
                </p>
            </div>
        </BookmarkNullStyle>
    );
};

const BookmarkNullStyle = styled.div`
    width: 100%;
    height: 287px;

    background: rgba(236, 236, 236, 0.21);
    border: 1.5px solid rgba(236, 236, 236, 0.66);
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

const RecommendBlocks: React.FC<{ type: string }> = ({ type }) => {
    const [data, setData] = useState<corpDataType[]>([]);
    const [bookmark, setBookmark] = useState<corpDataTypeBookmark[]>([]);

    const BookmarkData = useSelector(
        (state: RootState): corpDataTypeBookmark[] => {
            return state.userBookmarkList.array;
        },
    );

    useEffect(() => {
        if (type === 'recommend') {
            axios.get('/accounter/corps').then((res) => {
                setData(
                    res.data.data
                        .sort(
                            (b: corpDataType, a: corpDataType) =>
                                a.likeCount - b.likeCount,
                        )
                        .splice(0, 8),
                );
            });
        } else if (type === 'bookmark') {
            setBookmark(BookmarkData);
        }
    }, []);

    useEffect(() => {
        setBookmark(BookmarkData);
    }, [BookmarkData]);

    const { user } = useSelector((state: RootState) => ({
        user: state.user.email,
    }));

    return (
        <RecommendBlocksStyle>
            {type === 'recommend' &&
                data.map((item, index) => {
                    return (
                        <RecommendBlock
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            corpCode={item.corpCode}
                            likeCount={item.likeCount}
                            corpName={item.corpName}
                        />
                    );
                })}
            {type === 'bookmark' &&
                bookmark.length > 0 &&
                user &&
                bookmark
                    .map((item) => item)
                    .sort((b, a) => a.corpCode.corpLike - b.corpCode.corpLike)
                    .splice(0, 8)
                    .map((item, index) => {
                        return (
                            <RecommendBlock
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                                corpCode={item.corpCode.corpCode}
                                likeCount={item.corpCode.corpLike}
                                corpName={item.corpCode.corpName}
                            />
                        );
                    })}
            {type === 'bookmark' && bookmark.length === 0 && user && (
                <BookmarkNullComp />
            )}
            {type === 'bookmark' && !user && <BookmarkNotLoginComp />}
        </RecommendBlocksStyle>
    );
};

export default RecommendBlocks;

const RecommendBlocksStyle = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;
