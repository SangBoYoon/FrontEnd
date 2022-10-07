import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { combineReducers } from 'redux';
import corpsLoadSlice from './slices/corpsLoadSlice';
import handleLoginModalSlice from './slices/handleLoginModalSlice';
import listCategorySlice from './slices/listCategorySlice';
import loginDistributeSlice from './slices/loginDistributeSlice';
import myPageCategorySlice from './slices/myPageCategorySlice';
import userBookmarkListSlice from './slices/userBookmarkListSlice';
import userLikeListSlice from './slices/userLikeListSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
    userBookmarkList: userBookmarkListSlice,
    handleLoginModal: handleLoginModalSlice,
    user: userSlice,
    listCategory: listCategorySlice,
    corpsLoad: corpsLoadSlice,
    myPageCategory: myPageCategorySlice,
    userLike: userLikeListSlice,
    loginDistribute: loginDistributeSlice,
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
