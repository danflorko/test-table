import { memo } from 'react';
import type { FC } from 'react';

import './style.scss';

const Spinner: FC = () => {
	return (
		<div className='spinner'>
			<div className='spinner__circle'></div>
		</div>
	);
};

export default memo(Spinner);
