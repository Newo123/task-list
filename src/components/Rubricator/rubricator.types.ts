import { Sort } from '../../types/store.types';

type TypeTheme = 'default' | 'green' | 'red';

export interface IRubricatorItem {
	title: string;
	theme?: TypeTheme;
	id: Sort;
}
