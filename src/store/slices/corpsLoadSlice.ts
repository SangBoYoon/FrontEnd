import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type corpType = {
    corpCode: string;
    corpName: string;
    corpCategory: string;
    likeCount: number;
};
type arrayType = {
    array: corpType[];
};

const initialState: arrayType = {
    array: [],
};

const corpsLoadSlice = createSlice({
    name: 'corpsLoad',
    initialState,
    reducers: {
        setCorps: (state, action: PayloadAction<corpType[]>) => {
            const type = state;
            type.array = action.payload;
            return state;
        },
    },
});

export const { setCorps } = corpsLoadSlice.actions;

export default corpsLoadSlice.reducer;
