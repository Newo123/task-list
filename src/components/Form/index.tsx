import { FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { addTodo } from '../../store/slice/todos.slice';

import styles from './Form.module.scss';

export const Form = () => {
	const dispatch = useDispatch();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputRef.current) {
			dispatch(addTodo({ title: inputRef.current.value, id: uuid() }));
			inputRef.current.value = '';
		}
	};
	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit}
		>
			<label
				htmlFor='todo'
				className={styles.form__label}
			>
				<input
					className={styles.form__input}
					ref={inputRef}
					type='text'
					name='todo'
					id='todo'
					required
					placeholder='Создать задачу'
				/>
				<button className={styles.form__submit}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 30 30'
					>
						<path d='M14 0H16V30H14z'></path>
						<path
							d='M30 14H32V44H30z'
							transform='rotate(90 30 14)'
						></path>
					</svg>
				</button>
			</label>
		</form>
	);
};
