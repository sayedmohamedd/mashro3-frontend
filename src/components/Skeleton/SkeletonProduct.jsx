const SkeletonProduct = () => {
  return (
    <div className="md:w-1/5 flex flex-col p-3 shadow-xl space-y-1 rounded-2xl relative">
      <div className="aspect-square bg-gray-300 animate-pulse rounded-lg mb-2"></div>
      <div className="flex justify-between">
        <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded"></div>
        <div className="h-6 w-1/4 bg-gray-300 animate-pulse rounded"></div>
      </div>
      <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
      <div className="flex text-yellow-500">
        <div className="h-5 w-5 bg-gray-300 animate-pulse rounded mr-1"></div>
        <div className="h-5 w-5 bg-gray-300 animate-pulse rounded mr-1"></div>
        <div className="h-5 w-5 bg-gray-300 animate-pulse rounded mr-1"></div>
        <div className="h-5 w-5 bg-gray-300 animate-pulse rounded mr-1"></div>
        <div className="h-5 w-5 bg-gray-300 animate-pulse rounded"></div>
      </div>
      <div className="flex justify-between px-2 py-3">
        <div className="h-8 w-8 bg-gray-300 animate-pulse rounded"></div>
        <div className="h-8 w-8 bg-gray-300 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonProduct;
