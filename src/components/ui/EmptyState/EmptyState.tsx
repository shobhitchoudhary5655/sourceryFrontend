import { Inbox } from 'lucide-react';

interface Props {
  title?: string;
  description?: string;
}

const EmptyState = ({
  title = 'No Data Found',
  description = 'Nothing to display right now.',
}: Props) => {
  return (
    <div
      className="
      py-16
      flex flex-col
      items-center
      justify-center
    "
    >
      <Inbox
        size={60}
        className="text-gray-300"
      />

      <h3
        className="
        mt-4
        text-xl
        font-semibold
      "
      >
        {title}
      </h3>

      <p className="text-gray-500 mt-2">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;