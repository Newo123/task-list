import cn from 'clsx';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { setSort } from '../../store/slice/sort.slice';

import styles from './Rubricator.module.scss';
import { IRubricatorItem } from './rubricator.types';

const data: IRubricatorItem[] = [
	{
		title: 'Все',
		id: 'all'
	},
	{
		title: 'Выполнено',
		theme: 'green',
		id: 'completed'
	},
	{
		title: 'Не выполнено',
		theme: 'red',
		id: 'not-completed'
	}
];

const RubricatorItem: FC<IRubricatorItem> = ({ title, theme, id }) => {
	const sortId = useSelector((state: RootState) => state.sort);
	const dispatch = useDispatch();

	return (
		<label
			className={cn(
				styles.rubricator__item,
				theme && styles[`rubricator__item_${theme}`],
				sortId === id && styles.rubricator__item_active
			)}
		>
			<input
				type='radio'
				id='rubricator'
				name='rubricator'
				value={title}
				onChange={() => dispatch(setSort(id))}
				checked={sortId === id}
				tabIndex={1}
			/>
			{title}
		</label>
	);
};

export const Rubricator = () => {
	return (
		<div className={styles.rubricator}>
			{data.map((item, index) => (
				<RubricatorItem
					{...item}
					key={index}
				/>
			))}
		</div>
	);
};
