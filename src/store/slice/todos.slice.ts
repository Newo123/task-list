import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { State, Todo } from '../../types/store.types';

const todosSlice = createSlice({
	name: 'todos',
	initialState: localStorage.getItem('todos')
		? [...JSON.parse(localStorage.getItem('todos')!!)]
		: ([] as State),
	reducers: {
		setTodos(state, action: PayloadAction<State>) {
			state = action.payload;

			return state;
		},
		addTodo(state, action: PayloadAction<Pick<Todo, 'title' | 'id'>>) {
			state.push({
				...action.payload,
				createdAt: new Date(),
				completed: false
			});
			return state;
		},
		updateTodo(state, action: PayloadAction<Pick<Todo, 'title' | 'id'>>) {
			const todo = state.find(todo => todo.id === action.payload.id);

			if (!todo) return;
			todo.title = action.payload.title;
			return state;
		},
		toggleTodo(state, action: PayloadAction<string>) {
			const todo = state.find(todo => todo.id === action.payload);

			if (!todo) return;
			todo.completed = !todo.completed;

			return state;
		},
		deleteTodo(state, action: PayloadAction<string>) {
			return state.filter(todo => todo.id !== action.payload);
		}
	}
});

export const { addTodo, updateTodo, deleteTodo, toggleTodo, setTodos } =
	todosSlice.actions;
export default todosSlice.reducer;
