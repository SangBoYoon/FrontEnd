import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    deleteAccessToken,
    deleteRefreshToken,
    getAccessToken,
    getRefreshToken,
} from '../../services/tokenControl';
import { deleteUserLocalStorage } from '../../services/userControl';

const logout = () => {
    try {
        axios
            .post('/accounter/logout', {
                accessToken: getAccessToken(),
                refreshToken: getRefreshToken(),
            })
            .catch((e) => console.log(e));

        deleteAccessToken();
        deleteRefreshToken();
        deleteUserLocalStorage();
        window.location.replace('/');
    } catch (e) {
        console.log('localstorage err');
    }
};

const deleteUserMethod = () => {
    try {
        axios
            .post('/accounter/user/delete', {
                accessToken: getAccessToken(),
                refreshToken: getRefreshToken(),
            })
            .catch((e) => console.log(e));

        deleteAccessToken();
        deleteRefreshToken();
        deleteUserLocalStorage();
        // eslint-disable-next-line no-alert
        alert(
            '성공적으로 탈퇴처리 되었습니다. 그동안 저희 서비스를 이용해주셔서 감사합니다.',
        );
        window.location.replace('/');
    } catch (e) {
        console.log('localstorage err');
    }
};

export type UserInfo = {
    email: string;
    nickName: string;
};
const initialState: UserInfo = {
    email: '',
    nickName: '',
};

const userSlice = createSlice({
    name: 'userAction',
    initialState,
    reducers: {
        saveUser: (state, action: PayloadAction<UserInfo>) => {
            return action.payload;
        },
        logOut: (state) => {
            const type = state;
            type.email = '';
            type.nickName = '';
            logout();
        },
        deleteUser: (state) => {
            const type = state;
            type.email = '';
            type.nickName = '';
            deleteUserMethod();
        },
    },
});

export const { saveUser, logOut, deleteUser } = userSlice.actions;

export default userSlice.reducer;
