import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type corpLikeType = {
    corpCode: string;
    userId: number;
};
type arrayType = {
    array: corpLikeType[];
};

const initialState: arrayType = {
    array: [],
};

const userLikeListSlice = createSlice({
    name: 'userLikeList',
    initialState,
    reducers: {
        setUserLikeList: (state, action: PayloadAction<corpLikeType[]>) => {
            const type = state;
            type.array = action.payload;
            return state;
        },
    },
});

export const { setUserLikeList } = userLikeListSlice.actions;

export default userLikeListSlice.reducer;
