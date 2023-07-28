import React from "react";
import { TabItemProp } from "../ProfilePage";

type TabItemProps = {
  item: TabItemProp;
  selected: boolean;
  setSelectedTab: (value: string) => void;
};

const TabItem: React.FC<TabItemProps> = ({
  item,
  selected,
  setSelectedTab,
}) => {
  const { icon, title } = item;

  return (
    <div
      className={`flex items-center justify-center cursor-pointer font-bold p-2 rounded-lg duration-200 ease-linear ${
        selected ? "text-white bg-gray-600 uppercase" : "text-gray-500"
      } `}
      onClick={() => setSelectedTab(title)}
    >
      <div className="flex items-center gap-1 justify-between h-5">
        {React.createElement(icon)}
        {title}
      </div>
    </div>
  );
};
export default TabItem;
