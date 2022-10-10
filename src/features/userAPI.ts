import axios from 'axios';
import { Dispatch } from 'redux';
import { getAccessToken } from '../services/tokenControl';
import { setUserLocalStorage } from '../services/userControl';
import { saveUser } from '../store/slices/userSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userAPI = (dispatch: Dispatch<any>) => {
    const token = getAccessToken();

    if (token) {
        axios
            .get(`http://54.180.19.84:8080/accounter/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const stringifyUserInfo = JSON.stringify(res.data.data);
                const { email, nickName } = res.data.data;

                setUserLocalStorage(stringifyUserInfo);

                dispatch(saveUser({ email, nickName }));
            })
            .catch((e) => {
                console.log(e);
            });
    }
};
