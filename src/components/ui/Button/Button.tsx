import type { ButtonHTMLAttributes } from 'react';

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = ({
  children,
  loading,
  className,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      disabled={loading}
      className={`
        px-5
        py-3
        rounded-xl
        bg-[#7F26FD]
        text-white
        font-semibold
        hover:bg-[#6C22F5]
        transition-all
        disabled:opacity-70
        ${className}
      `}
    >
      {loading
        ? 'Loading...'
        : children}
    </button>
  );
};

export default Button;