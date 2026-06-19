import type {InputHTMLAttributes,} from 'react';

interface Props
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({
  label,
  error,
  ...props
}: Props) => {
  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7F26FD]"
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;