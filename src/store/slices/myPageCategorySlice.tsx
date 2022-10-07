import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    category: string;
};

const initialState: InitialState = {
    category: '닉네임 변경',
};

const myPageCategorySlice = createSlice({
    name: 'myPageCategory',
    initialState,
    reducers: {
        setMypageCategory: (state, action: PayloadAction<string>) => {
            const type = state;
            type.category = action.payload;
            return state;
        },
    },
});

export const { setMypageCategory } = myPageCategorySlice.actions;

export default myPageCategorySlice.reducer;
