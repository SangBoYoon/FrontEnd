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
            .post(
                '/accounter/logout',
                {
                    accessToken: getAccessToken(),
                    refreshToken: getRefreshToken(),
                },
                {
                    headers: { Authorization: `Bearer ${getAccessToken()}` },
                },
            )
            .catch((e) => console.log(e));

        deleteAccessToken();
        deleteRefreshToken();
        deleteUserLocalStorage();
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
    },
});

export const { saveUser, logOut } = userSlice.actions;

export default userSlice.reducer;
