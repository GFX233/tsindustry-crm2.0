import { useState, useEffect } from "react";
import Dropdown from "../dropdown";
import Input from "../input";

interface SidebarProps {

}

interface Filter {
  partName: string;
  orderNum: string;
  customer: string;
  date: string;
}

const SidebarIndex: React.FC<SidebarProps> = ({
}) => {


  return (
    <div className="w-64" aria-label="Sidebar">
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
        <Dropdown name="Export sestav" icon="/download.svg">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3">Export do PDF</span>
              </a>
              <ExportCSVButton data={displayList}/>
            </li>
          </ul>
        </Dropdown>
      </div>
    </div>
  );
};

export default SidebarIndex;
