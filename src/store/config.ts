import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { combineReducers } from 'redux';
import handleLoginModalSlice from './slices/handleLoginModalSlice';
import userBookmarkListSlice from './slices/userBookmarkListSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
    userBookmarkList: userBookmarkListSlice,
    handleLoginModal: handleLoginModalSlice,
    user: userSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
