import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/common/Sidebar/Sidebar';
import Header from '@/components/common/Header/Header';

const MainLayout = () => {
  return (
    <div className="bg-[#F3F6FD] min-h-screen">
      <Sidebar />

      <div className="ml-72">
        <Header />

        <main className="p-8 overflow-y-auto h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;