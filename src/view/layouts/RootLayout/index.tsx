import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/controller/utils/hooks';
import Header from 'src/view/components/Header';
import Message from 'src/view/ui/Message';
import './styles.scss';

const RootLayout: FC = () => {
  const { status } = useAppSelector(s => s.products);
  return (
    <div className='root-layout'>
      <Header />
      <main className='root-layout__main'>
        <Outlet />
      </main>
      <Message />
    </div>
  );
}

export default RootLayout;