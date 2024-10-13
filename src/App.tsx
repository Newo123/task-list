import {
	DndContext,
	DragEndEvent,
	PointerSensor,
	closestCorners,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from './components/Form';
import { List } from './components/List';
import { Rubricator } from './components/Rubricator';
import { RootState } from './store';
import { setTodos } from './store/slice/todos.slice';

function App() {
	const todos = useSelector((state: RootState) => state.todos);
	const dispatch = useDispatch();

	const getPosition = (id: any) => todos.findIndex(task => task.id === id);
	const handleDragEnd = (e: DragEndEvent) => {
		const { active, over } = e;

		if (active.id === over?.id) return;

		const originPosition = getPosition(active.id);
		const newPosition = getPosition(over?.id);
		dispatch(setTodos(arrayMove(todos, originPosition, newPosition)));
	};
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 5 }
		})
	);
	return (
		<section className='todo'>
			<div className='container'>
				<h1 className='todo__title'>Список дел</h1>
				<Form />
				<Rubricator />
				<DndContext
					sensors={sensors}
					collisionDetection={closestCorners}
					onDragEnd={handleDragEnd}
				>
					<List />
				</DndContext>
			</div>
		</section>
	);
}

export default App;
