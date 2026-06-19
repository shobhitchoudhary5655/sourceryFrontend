const TableLoader = () => {
  return (
    <div className="p-6 space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="
            h-14
            rounded-xl
            bg-gradient-to-r
            from-gray-100
            via-gray-200
            to-gray-100
            animate-pulse
          "
        />
      ))}
    </div>
  );
};

export default TableLoader;