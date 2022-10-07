import axios from 'axios';
import { Dispatch } from 'react';
import { setUserLikeList } from '../store/slices/userLikeListSlice';
import { setUserBookmarkList } from '../store/slices/userBookmarkListSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bookmarkLoad = (dispatch: Dispatch<any>) => {
    const accessToken = localStorage.getItem('accessToken') || '';

    axios
        .create({ headers: { Authorization: `Bearer ${accessToken}` } })
        .get('/accounter/bookmark')
        .then((res) => {
            dispatch(setUserBookmarkList(res.data.data));
        })
        .catch(() => {
            console.log('bookmark load fail');
        });

    axios
        .create({ headers: { Authorization: `Bearer ${accessToken}` } })
        .get('/accounter/corp/like')
        .then((res) => {
            dispatch(setUserLikeList(res.data.data));
        })
        .catch(() => {
            console.log('bookmark load fail');
        });
};
