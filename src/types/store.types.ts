export type Todo = {
	title: string;
	completed?: boolean;
	id: string;
	createdAt: Date;
};
export type State = Todo[];
export type Action = {
	type: string;
	payload: Todo;
};
export type Sort = 'all' | 'completed' | 'not-completed';
