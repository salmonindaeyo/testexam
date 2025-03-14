import React from "react";
import { FoodItem } from "@/data/domain/fruits.domain";
import { ItemButton } from "./ItemButton";

interface ColumnProps {
  title: string;
  items: FoodItem[];
  onItemClick: (item: FoodItem) => void;
  bgColor: string;
  buttonColor: string;
  showItemType?: boolean;
}

export const Column: React.FC<ColumnProps> = ({
  title,
  items,
  onItemClick,
  bgColor,
  buttonColor,
  showItemType = false,
}) => (
  <div className={`border p-4 rounded-lg ${bgColor}`}>
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <ItemButton
          key={item.name}
          item={item}
          onClick={onItemClick}
          className={`${buttonColor} text-white`}
          showType={showItemType}
        />
      ))}
    </div>
  </div>
);
