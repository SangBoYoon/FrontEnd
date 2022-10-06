import { UserInfo } from '../store/slices/userSlice';
// User_ID
export const setUserLocalStorage = (info: string): void => {
    localStorage.setItem('user', info);
};

export const getUserLocalStorage = (): UserInfo => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return JSON.parse(localStorage.getItem('user') || '{}');
};

export const deleteUserLocalStorage = (): void => {
    return localStorage.removeItem('user');
};
