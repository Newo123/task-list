import { Sort, State } from '../types/store.types';

export const sortByCompleted = (sortBy: Sort, todos: State): State => {
	switch (sortBy) {
		case 'completed':
			return todos.filter(state => state.completed === true);
		case 'not-completed':
			return todos.filter(state => state.completed === false);
		default:
			return todos;
	}
};
