// import Sidebar from './Sidebar';

interface Props {
  open: boolean;
  onClose: () => void;
}

const MobileSidebar = ({
  open,
  onClose,
}: Props) => {
  return (
    <>
      <div
        onClick={onClose}
        className={`
          fixed inset-0
          bg-black/50
          z-40

          ${
            open
              ? 'block'
              : 'hidden'
          }
        `}
      />

      <div
        className={`
          fixed
          left-0
          top-0
          h-screen
          z-50

          transition-all

          ${
            open
              ? 'translate-x-0'
              : '-translate-x-full'
          }
        `}
      >
        {/* <Sidebar /> */}
      </div>
    </>
  );
};

export default MobileSidebar;