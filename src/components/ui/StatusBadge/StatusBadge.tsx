interface Props {
  status: string;
}

const StatusBadge = ({
  status,
}: Props) => {
  const styles = {
    Active:
      'bg-green-100 text-green-700',

    Inactive:
      'bg-red-100 text-red-700',

    Present:
      'bg-green-100 text-green-700',

    Absent:
      'bg-red-100 text-red-700',

    Pending:
      'bg-yellow-100 text-yellow-700',

    Approved:
      'bg-blue-100 text-blue-700',

    Rejected:
      'bg-red-100 text-red-700',
  };

  return (
    <span
      className={`
      px-3 py-1
      rounded-full
      text-xs
      font-semibold

      ${
        styles[
          status as keyof typeof styles
        ] ||
        'bg-gray-100 text-gray-700'
      }
    `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;