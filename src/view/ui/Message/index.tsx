import { memo, useCallback, useEffect } from 'react';
import type { FC } from 'react';

import { useAppDispatch, useAppSelector } from 'src/controller/utils/hooks';
import { setStatus } from 'src/model/reducers/products';

import './styles.scss';

const Message: FC = () => {
	const { message, status } = useAppSelector((s) => s.products);
	const dispatch = useAppDispatch();

	const handleClose = useCallback(() => dispatch(setStatus(false)), [dispatch]);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		if (status) {
			timeoutId = setTimeout(() => {
				dispatch(setStatus(false));
			}, 4000);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [status, dispatch]);

	return (
		<div className={`message ${status ? 'show' : ''}`}>
			<span className='message-content'>{message}</span>
			<button className='message-close' onClick={handleClose}>
				X
			</button>
		</div>
	);
};

export default memo(Message);
