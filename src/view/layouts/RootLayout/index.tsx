import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'src/view/components/Header';
import './styles.scss';

const RootLayout: FC = () => {
  return (
    <div className='root-layout'>
      <Header />
      <main className='root-layout__main'>
        <Outlet />
      </main>
    </div>
  );
}
 
export default RootLayout;