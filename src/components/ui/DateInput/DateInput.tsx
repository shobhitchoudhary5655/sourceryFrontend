interface Props {
  label?: string;
  value: string;

  onChange: (
    value: string
  ) => void;
}

const DateInput = ({
  label,
  value,
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

      <input
        type="date"
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
      />
    </div>
  );
};

export default DateInput;