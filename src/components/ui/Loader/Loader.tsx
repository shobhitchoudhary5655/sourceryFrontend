const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#F3F6FD]">
      <div className="flex flex-col items-center gap-4">
        <div
          className="
            h-14
            w-14
            rounded-full
            border-4
            border-[#E9D8FD]
            border-t-[#7F26FD]
            animate-spin
          "
        />

        <p className="text-sm font-medium text-gray-500">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;