import { Outlet } from 'react-router-dom';
import type { FC } from 'react';

import Header from 'src/view/components/Header';
import Message from 'src/view/ui/Message';

import './styles.scss';

const RootLayout: FC = () => {
	return (
		<div className='root-layout'>
			<Header />
			<main className='root-layout__main'>
				<Outlet />
			</main>
			<Message />
		</div>
	);
};

export default RootLayout;
