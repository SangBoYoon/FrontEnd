import axios from 'axios';

import { corpType } from '../store/slices/userBookmarkListSlice';

export function bookmarkLoad(): corpType[] {
    const accessToken = localStorage.getItem('accessToken') || '';

    let result: corpType[] = [];

    axios
        .create({ headers: { Authorization: `Bearer ${accessToken}` } })
        .get('/accounter/bookmark')
        .then((res) => {
            result = res.data.data;
            return result;
        })
        .catch(() => {
            console.log('bookmark load fail');
        });
    return result;
}
