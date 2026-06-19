import Modal from '@/components/ui/Modal/Modal';

interface Props {
  open: boolean;
  title: string;
  message: string;
  loading?: boolean;

  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  message,
  loading,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
    >
      <p className="text-gray-600">
        {message}
      </p>

      <div
        className="
        flex justify-end
        gap-3
        mt-6
      "
      >
        <button
          onClick={onClose}
          className="
            px-4 py-2
            border rounded-xl
          "
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          disabled={loading}
          className="
            px-4 py-2
            rounded-xl
            bg-red-500
            text-white
          "
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;