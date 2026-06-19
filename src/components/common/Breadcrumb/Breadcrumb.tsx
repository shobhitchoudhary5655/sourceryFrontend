import {
  ChevronRight,
} from 'lucide-react';

interface Props {
  items: string[];
}

const Breadcrumb = ({
  items,
}: Props) => {
  return (
    <div
      className="
      flex
      items-center
      gap-2
      text-sm
      text-gray-500
    "
    >
      {items.map(
        (item, index) => (
          <div
            key={index}
            className="
            flex
            items-center
            gap-2
          "
          >
            <span>{item}</span>

            {index !==
              items.length -
                1 && (
              <ChevronRight
                size={14}
              />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Breadcrumb;