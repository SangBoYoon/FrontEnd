import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type corpType = {
    corpCode: {
        corpCode: string;
        corpName: string;
        corpCategory: string;
        corpLike: number;
    };
};
type arrayType = {
    array: corpType[];
};

const initialState: arrayType = {
    array: [],
};

const userBookmarkListSlice = createSlice({
    name: 'userBookmarkList',
    initialState,
    reducers: {
        setUserBookmarkList: (state, action: PayloadAction<corpType[]>) => {
            const type = state;
            type.array = action.payload;
            return state;
        },
    },
});

export const { setUserBookmarkList } = userBookmarkListSlice.actions;

export default userBookmarkListSlice.reducer;
