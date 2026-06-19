import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({
  open,
  title,
  children,
  onClose,
}: Props) => {
  if (!open) return null;

  return (
    <div
      className="
      fixed inset-0
      bg-black/50
      flex items-center
      justify-center
      z-50
    "
    >
      <div
        className="
        bg-white
        rounded-3xl
        w-full
        max-w-xl
        shadow-xl
      "
      >
        <div
          className="
          flex justify-between
          items-center
          p-6
          border-b
        "
        >
          <h2
            className="
            text-xl
            font-semibold
          "
          >
            {title}
          </h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;