import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@iconify/react/dist/iconify.js';
import cn from 'clsx';
import { format, isToday, isYesterday } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
	deleteTodo,
	toggleTodo,
	updateTodo
} from '../../store/slice/todos.slice';
import { Todo } from '../../types/store.types';

import styles from './List.module.scss';

export const ListItem = ({ createdAt, completed, title, id }: Todo) => {
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const dispatch = useDispatch();
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
		touchAction: 'none'
	};

	const formatCreationDate = (date: Date) => {
		if (isToday(date)) {
			return 'Сегодня';
		} else if (isYesterday(date)) {
			return 'Вчера';
		} else {
			return format(date, 'dd.MM.yyyy');
		}
	};

	useEffect(() => {
		if (!isEdit && titleRef.current) {
			dispatch(updateTodo({ title: titleRef.current.innerHTML, id: id }));
		}
	}, [isEdit]);

	return (
		<div
			className={styles.list__item}
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
		>
			<div className={styles.list__itemCreated}>
				{formatCreationDate(createdAt)}
			</div>
			<div className={styles.list__itemContent}>
				<label
					htmlFor={id}
					className={styles.list__itemLabel}
					style={{
						touchAction: 'none'
					}}
				>
					<span></span>
					<input
						type='checkbox'
						id={id}
						checked={completed}
						className={styles.list__itemInput}
						onChange={() => dispatch(toggleTodo(id))}
					/>
				</label>
				<h6
					contentEditable={isEdit}
					ref={titleRef}
					className={styles.list__itemTitle}
					dangerouslySetInnerHTML={{ __html: title ?? '' }}
					style={
						isEdit
							? {
									textDecoration: 'none',

									borderColor: '#878787'
								}
							: {}
					}
				/>
			</div>
			<div className={styles.list__itemActions}>
				<button
					className={cn(
						styles.list__itemButton,
						styles.list__itemButton_edit,
						isEdit && styles.list__itemButton_active
					)}
					onClick={() => setIsEdit(!isEdit)}
				>
					{isEdit && 'Сохранить'}
					<Icon icon='lucide:edit' />
				</button>
				<button
					className={cn(
						styles.list__itemButton,
						styles.list__itemButton_remove
					)}
					onClick={() => dispatch(deleteTodo(id))}
				>
					<Icon icon='lucide:trash-2' />
				</button>
			</div>
		</div>
	);
};
