import {
	SortableContext,
	verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { sortByCompleted } from '../../utils/sortByCompleted';

import styles from './List.module.scss';
import { ListItem } from './ListItem';

export const List = () => {
	const todos = useSelector((state: RootState) => state.todos);
	const sortBy = useSelector((state: RootState) => state.sort);

	useEffect(() => {
		window.localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	return (
		<div className={styles.list}>
			<SortableContext
				items={sortByCompleted(sortBy, todos)}
				strategy={verticalListSortingStrategy}
			>
				{sortByCompleted(sortBy, todos).map((item, index) => (
					<ListItem
						{...item}
						key={index}
					/>
				))}
			</SortableContext>
		</div>
	);
};
