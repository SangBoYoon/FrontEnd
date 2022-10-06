import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type corpType = {
    isModal: boolean;
};
const initialState: corpType = {
    isModal: false,
};

const handleLoginModalSlice = createSlice({
    name: 'handleLoginModal',
    initialState,
    reducers: {
        setLoginModal: (state, action: PayloadAction<boolean>) => {
            const type = state;
            type.isModal = action.payload;
            return state;
        },
    },
});

export const { setLoginModal } = handleLoginModalSlice.actions;

export default handleLoginModalSlice.reducer;
