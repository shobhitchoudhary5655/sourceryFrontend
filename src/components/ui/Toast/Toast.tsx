import { useEffect } from 'react';

type Props = {
  message: string;
  type?: 'success' | 'error';
  open: boolean;
  onClose: () => void;
};

const Toast = ({ message, type = 'success', open, onClose }: Props) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={`
        fixed top-5 right-5 px-4 py-3 rounded-lg text-white shadow-lg z-50
        ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}
      `}
    >
      {message}
    </div>
  );
};

export default Toast;