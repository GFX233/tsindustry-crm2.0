import { useState, useEffect } from "react";
import Dropdown from "../dropdown";
import Input from "../input";

interface SidebarProps {

}


const SidebarTodo: React.FC<SidebarProps> = ({
}) => {


  return (
    <div className="w-64" aria-label="Sidebar">
      <div className="py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full">
        <Dropdown name="Filtr zakázek" icon="/search.svg">
          <ul className="flex flex-col mt-2">
            <Input
              name="Číslo zakázky:"
              type="text"
            />
            <Input
              name="Název dílu:"
              type="text"
              value={filter.partName}
              onChange={(e) => handleFilterChange("partName", e)}
            />
            <Input
              name="Zákazník:"
              type="text"
              value={filter.customer}
              onChange={(e) => handleFilterChange("customer", e)}
            />
            <Input
              name="Datum:"
              type="month"
              value={filter.date}
              onChange={(e) => handleFilterChange("date", e)}
            />
          </ul>
        </Dropdown>
      </div>
    </div>
  );
};

export default SidebarTodo;
