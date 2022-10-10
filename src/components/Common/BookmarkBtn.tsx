import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/config';
import { setLoginModal } from '../../store/slices/handleLoginModalSlice';
import { setUserBookmarkList } from '../../store/slices/userBookmarkListSlice';
import { corpDataTypeBookmark } from '../Main/RecommendBlocks';
import { getAccessToken } from '../../services/tokenControl';

type bookmarkIconType = {
    corpCode: string;
};

const BookmarkBtn: React.FC<bookmarkIconType> = ({ corpCode }) => {
    const [isBookmark, setIsBookmark] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => ({
        user: state.user.email,
    }));

    const isModal = useSelector((state: RootState) => {
        return state.handleLoginModal.isModal;
    });
    const handleModal = () => {
        dispatch(setLoginModal(!isModal));
    };
    const onBookmark = () => {
        axios
            .create({
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                    credentials: 'include',
                    'Content-type': 'application/json',
                },
            })
            .post(`http://54.180.19.84:8080/accounter/bookmark`, {
                corpCode,
            })
            .then(() => {
                axios
                    .create({
                        headers: {
                            Authorization: `Bearer ${getAccessToken()}`,
                        },
                    })
                    .get(`http://54.180.19.84:8080/accounter/bookmark`)
                    .then((res) => {
                        dispatch(setUserBookmarkList(res.data.data));
                    })
                    .catch(() => {
                        console.log('bookmark load fail');
                    });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        setIsBookmark(false);
    }, []);

    const BookmarkData = useSelector(
        (state: RootState): corpDataTypeBookmark[] => {
            return state.userBookmarkList.array;
        },
    );

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        BookmarkData.filter(
            (i: corpDataTypeBookmark) => i.corpCode.corpCode === corpCode,
        ).length > 0
            ? setIsBookmark(true)
            : setIsBookmark(false);
    }, [BookmarkData]);

    return (
        <>
            {isBookmark ? (
                <Bookmark onClick={onBookmark}>
                    <svg
                        width="20"
                        height="25"
                        viewBox="0 0 20 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.8804 0.583252C17.6033 0.583252 19 1.73454 19 3.15476V22.001C19 23.3962 16.9654 24.1061 15.7504 23.1342L10 18.5351L4.24956 23.1342C3.03456 24.1056 1 23.3962 1 22.0006V3.15476C1 1.73454 2.39669 0.583252 4.11962 0.583252H15.8804Z"
                            fill="#848587"
                        />
                        <path
                            d="M16.9771 24.1425C16.53 24.1425 16.0829 24.0217 15.6962 23.7679L9.82375 19.9858C9.72708 19.9254 9.59417 19.9254 9.4975 19.9858L3.625 23.7679C2.9 24.2392 1.98167 24.2754 1.22042 23.8525C0.47125 23.4417 0 22.6562 0 21.7862V2.11458C0 0.9425 0.9425 0 2.11458 0H17.2308C18.3908 0 19.3333 0.9425 19.3333 2.11458V21.7862C19.3333 22.6442 18.8621 23.4417 18.1008 23.8525C17.7504 24.0458 17.3638 24.1425 16.9771 24.1425ZM16.6871 22.2454C16.9287 22.4025 17.1583 22.3058 17.2429 22.2696C17.3275 22.2212 17.5208 22.0883 17.5208 21.7862V2.11458C17.5208 1.94542 17.3879 1.8125 17.2188 1.8125H2.11458C1.94542 1.8125 1.8125 1.94542 1.8125 2.11458V21.7862C1.8125 22.0762 2.00583 22.2212 2.09042 22.2696C2.175 22.3179 2.40458 22.4146 2.64625 22.2454L8.51875 18.4633C9.21958 18.0163 10.1138 18.0163 10.8146 18.4633L16.6871 22.2454Z"
                            fill="#848587"
                        />
                    </svg>
                </Bookmark>
            ) : (
                <Bookmark onClick={onBookmark}>
                    <svg
                        width="21"
                        height="25"
                        viewBox="0 0 21 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.8103 24.5592C17.3633 24.5592 16.9162 24.4384 16.5295 24.1846L10.657 20.4025C10.5603 20.3421 10.4274 20.3421 10.3308 20.4025L4.45825 24.1846C3.73325 24.6559 2.81492 24.6921 2.05367 24.2692C1.3045 23.8584 0.833252 23.0729 0.833252 22.2029V2.53127C0.833252 1.35919 1.77575 0.416687 2.94784 0.416687H18.0641C19.2241 0.416687 20.1666 1.35919 20.1666 2.53127V22.2029C20.1666 23.0609 19.6953 23.8584 18.9341 24.2692C18.5837 24.4625 18.197 24.5592 17.8103 24.5592ZM17.5203 22.6621C17.762 22.8192 17.9916 22.7225 18.0762 22.6863C18.1608 22.6379 18.3541 22.505 18.3541 22.2029V2.53127C18.3541 2.3621 18.2212 2.22919 18.052 2.22919H2.94784C2.77867 2.22919 2.64575 2.3621 2.64575 2.53127V22.2029C2.64575 22.4929 2.83909 22.6379 2.92367 22.6863C3.00825 22.7346 3.23784 22.8313 3.4795 22.6621L9.352 18.88C10.0528 18.4329 10.947 18.4329 11.6478 18.88L17.5203 22.6621Z"
                            fill="#848587"
                        />
                    </svg>
                </Bookmark>
            )}
            {!user && (
                <Bookmark onClick={handleModal}>
                    <svg
                        width="21"
                        height="25"
                        viewBox="0 0 21 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.8103 24.5592C17.3633 24.5592 16.9162 24.4384 16.5295 24.1846L10.657 20.4025C10.5603 20.3421 10.4274 20.3421 10.3308 20.4025L4.45825 24.1846C3.73325 24.6559 2.81492 24.6921 2.05367 24.2692C1.3045 23.8584 0.833252 23.0729 0.833252 22.2029V2.53127C0.833252 1.35919 1.77575 0.416687 2.94784 0.416687H18.0641C19.2241 0.416687 20.1666 1.35919 20.1666 2.53127V22.2029C20.1666 23.0609 19.6953 23.8584 18.9341 24.2692C18.5837 24.4625 18.197 24.5592 17.8103 24.5592ZM17.5203 22.6621C17.762 22.8192 17.9916 22.7225 18.0762 22.6863C18.1608 22.6379 18.3541 22.505 18.3541 22.2029V2.53127C18.3541 2.3621 18.2212 2.22919 18.052 2.22919H2.94784C2.77867 2.22919 2.64575 2.3621 2.64575 2.53127V22.2029C2.64575 22.4929 2.83909 22.6379 2.92367 22.6863C3.00825 22.7346 3.23784 22.8313 3.4795 22.6621L9.352 18.88C10.0528 18.4329 10.947 18.4329 11.6478 18.88L17.5203 22.6621Z"
                            fill="#848587"
                        />
                    </svg>
                </Bookmark>
            )}
        </>
    );
};

export default BookmarkBtn;

const Bookmark = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 998;
    position: absolute;
    top: 21px;
    right: 21px;
    cursor: pointer;
`;
