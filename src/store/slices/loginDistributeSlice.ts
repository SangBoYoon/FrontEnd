import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type corpType = {
    register: boolean;
};
const initialState: corpType = {
    register: false,
};

const loginDistributeSlice = createSlice({
    name: 'loginDistribute',
    initialState,
    reducers: {
        setLoginDistribute: (state, action: PayloadAction<boolean>) => {
            const type = state;
            type.register = action.payload;
            return state;
        },
    },
});

export const { setLoginDistribute } = loginDistributeSlice.actions;

export default loginDistributeSlice.reducer;
