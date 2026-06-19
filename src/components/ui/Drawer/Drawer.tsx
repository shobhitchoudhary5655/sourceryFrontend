import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Drawer = ({
  open,
  title,
  children,
  onClose,
}: Props) => {
  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black/40
          transition-all z-40

          ${
            open
              ? 'visible opacity-100'
              : 'invisible opacity-0'
          }
        `}
        onClick={onClose}
      />

      <div
        className={`
          fixed right-0 top-0
          h-screen
          w-[500px]
          bg-white
          shadow-xl
          z-50
          transition-all

          ${
            open
              ? 'translate-x-0'
              : 'translate-x-full'
          }
        `}
      >
        <div
          className="
          flex justify-between
          items-center
          p-6 border-b
        "
        >
          <h2 className="font-semibold text-xl">
            {title}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;