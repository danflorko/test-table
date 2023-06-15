import { FC, Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import RootLayout from './view/layouts/RootLayout';
import Spinner from './view/ui/Spinner';

import './view/styles/styles.scss';

const ProductsPage = lazy(() => import('./view/pages/ProductsPage'));
const Product = lazy(() => import('./view/components/Product'));

const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RootLayout />}>
					<Route
						path="/products"
						element={
							<Suspense fallback={<Spinner />}>
								<ProductsPage />
							</Suspense>
						}
					/>
					<Route
						path="/products/:id"
						element={
							<Suspense fallback={<Spinner />}>
								<Product />
							</Suspense>
						}
					/>
					<Route path="/" element={<Navigate to="/products" replace />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
