interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  value: string;

  options: Option[];

  onChange: (
    value: string
  ) => void;
}

const Select = ({
  label,
  value,
  options,
  onChange,
}: Props) => {
  return (
    <div>
      {label && (
        <label
          className="
          block mb-2
          font-medium
        "
        >
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          w-full
          h-12
          border
          rounded-xl
          px-4
          focus:outline-none
          focus:ring-2
          focus:ring-[#7F26FD]
        "
      >
        {options.map(
          (option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default Select;