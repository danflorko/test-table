import { FC, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './view/components/Product';
import RootLayout from './view/layouts/RootLayout';
import './view/styles/styles.scss';

const ProductsPage = lazy(() => import('./view/pages/ProductsPage'))

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:id' element={<Product />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
