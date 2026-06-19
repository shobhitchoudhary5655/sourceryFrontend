import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Card = ({
  children,
  className = '',
}: Props) => {
  return (
    <div
      className={`
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-gray-100
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;