import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Sort } from '../../types/store.types';

const sortSlice = createSlice({
	name: 'sort',
	// initialState: 'all' as Sort,
	initialState: (localStorage.getItem('sort')
		? localStorage.getItem('sort')
		: 'all') as Sort,
	reducers: {
		setSort(state, action: PayloadAction<Sort>) {
			state = action.payload;
			localStorage.setItem('sort', state);

			return state;
		}
	}
});

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;
