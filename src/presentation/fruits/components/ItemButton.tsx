import React from "react";
import { FoodItem } from "@/data/domain/fruits.domain";

interface ItemButtonProps {
  item: FoodItem;
  onClick: (item: FoodItem) => void;
  className: string;
  showType?: boolean;
}

export const ItemButton: React.FC<ItemButtonProps> = ({
  item,
  onClick,
  className,
  showType = false,
}) => (
  <button
    key={item.name}
    onClick={() => onClick(item)}
    className={`${className} py-2 px-4 rounded`}
  >
    {item.name} {showType && `(${item.type})`}
  </button>
);
