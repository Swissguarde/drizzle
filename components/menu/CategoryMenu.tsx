import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineDown } from "react-icons/ai";

type CategoryMenuProps = {
  title: string;
  state: string;
  filters: Array<string>;
  setState: (value: string) => void;
};

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  title,
  state,
  filters,
  setState,
}) => {
  return (
    <div className="flex items-center justify-start flex-col w-full gap-7 relative">
      <label htmlFor={title} className="w-full">
        {title}
      </label>
      <Menu as="div" className="self-start relative">
        <div>
          <Menu.Button className="flex justify-center items-center gap-4 w-full rounded-md bg-[#F1F4F5] p-4 text-base outline-none capitalize">
            {state || "Category"}
            <AiOutlineDown />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="flex items-center justify-start flex-col absolute left-0 mt-2 xs:min-w-[300px] w-fit max-h-64 origin-top-right rounded-xl bg-white border border-[#EBEAEA] shadow-sm !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-gray-300 overflow-y-auto pr-10">
            {filters.map((tag) => (
              <Menu.Item key={tag}>
                <button
                  type="button"
                  value={tag}
                  className="text-left w-full px-5 py-2 text-sm hover:bg-light-white-100 self-start whitespace-nowrap capitalize"
                  onClick={(e) => setState(e.currentTarget.value)}
                >
                  {tag}
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default CategoryMenu;
