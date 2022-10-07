import axios from 'axios';
import {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
} from './tokenControl';

export const onSilentRefresh = () => {
    axios
        .post('/accounter/reuissue', {
            accessToken: getAccessToken(),
            refreshToken: getRefreshToken(),
        })
        .then((res) => {
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);

            // 로그인 연장 후 20분 뒤
            setInterval(onSilentRefresh, 1200000);
        })
        .catch((error) => {
            console.log(error);
        });
};
