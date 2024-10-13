import { configureStore } from '@reduxjs/toolkit';

import sortReducer from './slice/sort.slice';
import todosReducer from './slice/todos.slice';

const store = configureStore({
	reducer: {
		todos: todosReducer,
		sort: sortReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
