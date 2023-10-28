const Skeletoncard = () => {
  return (
    <div className="bg-white p-2 rounded-2xl shadow-lg flex flex-col   gap-5 select-none ">
      <div className="h-40  rounded-xl bg-gray-200 animate-pulse"></div>
      <div className="flex flex-col flex-1 gap-5 sm:p-2">
        <div className="flex flex-1 flex-col gap-3">
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
        </div>
        <div className="mt-auto flex justify-between items-center gap-3">
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full"></div>
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeletoncard;
