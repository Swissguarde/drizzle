const Skeleton = () => {
  const data = new Array(20).fill(null);

  return (
    <div className="lg:px-20 py-6 px-5 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-32 w-full">
      {data.map((index) => (
        <div key={Math.random()} className="p-4 bg-white shadow rounded">
          <div className="animate-pulse h-40 bg-gray-300 rounded mb-4"></div>
          <div className="animate-pulse h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="animate-pulse h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};
export default Skeleton;
