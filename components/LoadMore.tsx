import React from "react";

type LoadMoreProps = {
  index: number;
};

const LoadMore: React.FC<LoadMoreProps> = () => {
  return (
    <button className="bg-blue-700 rounded-md py-2 px-4 text-white font-semibold hover:scale-110 duration-300 hover:bg-blue-500">
      Load More
    </button>
  );
};
export default LoadMore;
