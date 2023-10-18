import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
	name: 'modal',
	initialState: { open: false },
	reducers: {
		open: (state) => (state.open = true),
		close: (state) => (state.open = false),
	},
});

export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;
