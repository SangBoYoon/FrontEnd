import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { getAccessToken } from '../../services/tokenControl';
import { corpLikeType } from '../../store/slices/userLikeListSlice';
import { setLoginModal } from '../../store/slices/handleLoginModalSlice';
import { RootState } from '../../store/config';
import { setCorps } from '../../store/slices/corpsLoadSlice';
import { bookmarkLoad } from '../../features/bookmark';

type likeComponenetType = {
    corpCode: string;
};

const Like: React.FC<likeComponenetType> = ({ corpCode }) => {
    const [isLike, setIsLike] = useState<boolean>(false);
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
    const onLike = () => {
        axios
            .create({
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                    Credential: 'include',
                    'Content-type': 'application/json',
                },
            })
            .post(`http://54.180.19.84:8080/accounter/corp/like/${corpCode}`)
            .then(() => {
                bookmarkLoad(dispatch);
                axios
                    .get(`http://54.180.19.84:8080/accounter/corps`)
                    .then((res) => {
                        dispatch(setCorps(res.data.data));
                    })
                    .catch(() => {
                        console.log('corporations load err');
                    });
            })
            .catch(() => {
                console.log('like fail');
            });
    };

    const LikeData = useSelector((state: RootState): corpLikeType[] => {
        return state.userLike.array;
    });

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        LikeData.filter((i: corpLikeType) => i.corpCode === corpCode).length > 0
            ? setIsLike(true)
            : setIsLike(false);
        console.log(corpCode, ':', isLike);
    }, [LikeData]);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {isLike ? (
                <LikeBtn onClick={onLike}>
                    <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.3462 0H15.2957C13.2916 0 11.5197 1.05 10.5 2.6C9.48029 1.05 7.70841 0 5.70433 0H5.65385C2.52909 0.03 0 2.545 0 5.65C0 7.5 0.817788 10.125 2.41298 12.285C5.45192 16.4 10.5 20 10.5 20C10.5 20 15.5481 16.4 18.587 12.285C20.1822 10.125 21 7.5 21 5.65C21 2.545 18.4709 0.03 15.3462 0Z"
                            fill="#848587"
                        />
                    </svg>
                </LikeBtn>
            ) : (
                <LikeBtn onClick={onLike}>
                    <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16.2827 0H16.2322C14.2281 0 12.4562 1.05 11.4365 2.6C10.4168 1.05 8.64494 0 6.64085 0H6.59037C3.46561 0.03 0.936523 2.545 0.936523 5.65C0.936523 7.5 1.75431 10.125 3.3495 12.285C6.38845 16.4 11.4365 20 11.4365 20C11.4365 20 16.4846 16.4 19.5235 12.285C21.1187 10.125 21.9365 7.5 21.9365 5.65C21.9365 2.545 19.4074 0.03 16.2827 0ZM18.3827 11.46C16.2322 14.375 12.956 17.065 11.4365 18.24C9.91705 17.065 6.64085 14.37 4.49037 11.455C3.01128 9.455 2.34998 7.1 2.34998 5.65C2.34998 4.52 2.79422 3.46 3.59181 2.66C4.39446 1.86 5.4596 1.415 6.60047 1.405H6.6459C7.36777 1.405 8.0846 1.59 8.72066 1.945C9.33652 2.29 9.87162 2.78 10.2553 3.37C10.5178 3.765 10.962 4.005 11.4416 4.005C11.9211 4.005 12.3654 3.765 12.6279 3.37C13.0166 2.78 13.5466 2.29 14.1625 1.945C14.7985 1.59 15.5154 1.405 16.2372 1.405H16.2827C17.4185 1.415 18.4887 1.86 19.2913 2.66C20.094 3.46 20.5332 4.525 20.5332 5.65C20.5231 7.1 19.8618 9.455 18.3827 11.46Z"
                            fill="#848587"
                        />
                    </svg>
                </LikeBtn>
            )}
            {!user && (
                <LikeBtn onClick={handleModal}>
                    <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16.2827 0H16.2322C14.2281 0 12.4562 1.05 11.4365 2.6C10.4168 1.05 8.64494 0 6.64085 0H6.59037C3.46561 0.03 0.936523 2.545 0.936523 5.65C0.936523 7.5 1.75431 10.125 3.3495 12.285C6.38845 16.4 11.4365 20 11.4365 20C11.4365 20 16.4846 16.4 19.5235 12.285C21.1187 10.125 21.9365 7.5 21.9365 5.65C21.9365 2.545 19.4074 0.03 16.2827 0ZM18.3827 11.46C16.2322 14.375 12.956 17.065 11.4365 18.24C9.91705 17.065 6.64085 14.37 4.49037 11.455C3.01128 9.455 2.34998 7.1 2.34998 5.65C2.34998 4.52 2.79422 3.46 3.59181 2.66C4.39446 1.86 5.4596 1.415 6.60047 1.405H6.6459C7.36777 1.405 8.0846 1.59 8.72066 1.945C9.33652 2.29 9.87162 2.78 10.2553 3.37C10.5178 3.765 10.962 4.005 11.4416 4.005C11.9211 4.005 12.3654 3.765 12.6279 3.37C13.0166 2.78 13.5466 2.29 14.1625 1.945C14.7985 1.59 15.5154 1.405 16.2372 1.405H16.2827C17.4185 1.415 18.4887 1.86 19.2913 2.66C20.094 3.46 20.5332 4.525 20.5332 5.65C20.5231 7.1 19.8618 9.455 18.3827 11.46Z"
                            fill="#848587"
                        />
                    </svg>
                </LikeBtn>
            )}
        </>
    );
};

export default Like;

const LikeBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 998;
    position: absolute;
    bottom: 21px;
    left: 21px;
    cursor: pointer;
`;
