"use client";
import { categoryFilters } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const handleFilter = (filter: string) => {
    router.push(`${pathName}?category=${filter}`);
  };
  return (
    <div className="flex justify-between items-center w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto !scrollbar-none border-b border-[#EBEAEA]">
        {categoryFilters.map((filter) => (
          <li
            key={filter}
            onClick={() => handleFilter(filter)}
            className={`${
              category === filter
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            } px-4 py-3 rounded-lg capitalize whitespace-nowrap cursor-pointer`}
          >
            {filter}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
