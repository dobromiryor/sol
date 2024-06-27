import { Dispatch, SetStateAction } from "react";
import { tabArr } from "../../consts/tabsArr";
import { Tab } from "../atoms/Tab";

interface TabsProps {
  selectedId: number;
  setSelectedId: Dispatch<SetStateAction<number>>;
}

export const Tabs = ({ selectedId, setSelectedId }: TabsProps) => {
  return (
    <div role="tablist" className="flex gap-2 px-4">
      {tabArr.map((item) => (
        <Tab
          key={`Tab__${item.id}__${item.title}`}
          tab={{ selectedId, ...item }}
          onClick={() => setSelectedId(item.id)}
        />
      ))}
    </div>
  );
};
