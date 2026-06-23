import { X } from 'lucide-react';
import Sidebar from './Sidebar';

interface Props {
  open: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ open, onClose }: Props) => {
  return (
    <>
      {/* Background Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden

          ${
            open
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0'
          }
        `}
      />

      {/* Sliding Sidebar */}
      <div
        className={`
          fixed left-0 top-0 z-50 h-screen
          transition-transform duration-300 lg:hidden

          ${
            open
              ? 'translate-x-0'
              : '-translate-x-full'
          }
        `}
      >
        <div className="relative">
          <Sidebar onClose={onClose} />

          <button
            onClick={onClose}
            className="
              absolute right-3 top-3
              flex h-9 w-9 items-center justify-center
              rounded-lg bg-gray-100
              text-gray-700
              hover:bg-gray-200
            "
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;


// // import Sidebar from './Sidebar';

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// const MobileSidebar = ({
//   open,
//   onClose,
// }: Props) => {
//   return (
//     <>
//       <div
//         onClick={onClose}
//         className={`
//           fixed inset-0
//           bg-black/50
//           z-40

//           ${
//             open
//               ? 'block'
//               : 'hidden'
//           }
//         `}
//       />

//       <div
//         className={`
//           fixed
//           left-0
//           top-0
//           h-screen
//           z-50

//           transition-all

//           ${
//             open
//               ? 'translate-x-0'
//               : '-translate-x-full'
//           }
//         `}
//       >
//         {/* <Sidebar /> */}
//       </div>
//     </>
//   );
// };

// export default MobileSidebar;