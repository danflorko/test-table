import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import './styles.scss';

const Header: FC = () => {
	const navigate = useNavigate();

	const handleClick = useCallback(() => navigate('/products'), [navigate]);

	return (
		<header className='header'>
			<div className='header__left-side-container' onClick={handleClick}>
				<img
					src='images/header/logo.png'
					className='header__image'
					title='Top Phones Logo'
					alt='Top Phones Logo'
				/>
				<h1 className='header__title'>Top-Phones</h1>
			</div>
		</header>
	);
};

export default memo(Header);
