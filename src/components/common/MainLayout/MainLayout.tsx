import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '@/components/common/Sidebar/Sidebar';
import MobileSidebar from '@/components/common/Sidebar/MobileSidebar';
import Header from '@/components/common/Header/Header';

const MainLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F3F6FD] lg:flex">
      {/* Desktop Sidebar */}
      <aside className="hidden h-screen w-72 shrink-0 lg:sticky lg:top-0 lg:block">
        <Sidebar />
      </aside>

      {/* Mobile / Tablet Sidebar */}
      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Right Side */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onMenuClick={() => setMobileSidebarOpen(true)}
        />

        <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

// import { useState } from 'react';
// import { Outlet } from 'react-router-dom';

// import Sidebar from '@/components/common/Sidebar/Sidebar';
// import MobileSidebar from '@/components/common/Sidebar/MobileSidebar';
// import Header from '@/components/common/Header/Header';

// const MainLayout = () => {
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-[#F3F6FD]">
//       {/* Desktop Sidebar */}
//       <div className="hidden lg:block">
//         <Sidebar />
//       </div>

//       {/* Mobile Sidebar */}
//       <MobileSidebar
//         open={mobileSidebarOpen}
//         onClose={() => setMobileSidebarOpen(false)}
//       />

//       {/* Main Content */}
//       <div className="ml-0 min-w-0 lg:ml-72">
//         <Header
//           onMenuClick={() => setMobileSidebarOpen(true)}
//         />

//         <main className="min-h-[calc(100vh-80px)] overflow-x-hidden p-4 sm:p-6 lg:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;

// // import { Outlet } from 'react-router-dom';
// // import Sidebar from '@/components/common/Sidebar/Sidebar';
// // import Header from '@/components/common/Header/Header';

// // const MainLayout = () => {
// //   return (
// //     <div className="bg-[#F3F6FD] min-h-screen">
// //       <Sidebar />

// //       <div className="ml-72">
// //         <Header />

// //         <main className="p-8 overflow-y-auto h-[calc(100vh-80px)]">
// //           <Outlet />
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MainLayout;