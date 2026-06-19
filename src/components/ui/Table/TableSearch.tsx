import { Search } from 'lucide-react';

interface Props {
  value: string;
  onChange: (
    value: string
  ) => void;
}

const TableSearch = ({
  value,
  onChange,
}: Props) => {
  return (
    <div className="relative w-80">
      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />

      <input
        type="text"
        value={value}
        placeholder="Search..."
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          w-full
          h-11
          pl-11
          pr-4
          rounded-xl
          border
          border-gray-200
          bg-white
          focus:outline-none
          focus:ring-2
          focus:ring-[#7F26FD]
        "
      />
    </div>
  );
};

export default TableSearch;