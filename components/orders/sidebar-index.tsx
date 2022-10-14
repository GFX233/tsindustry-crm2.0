import type { Order, Customer, Filter } from "../../utils/types/types";
import { useState, useEffect } from "react";
import Dropdown from "../dropdown";
import Input from "../input";
import AddOrder from "./addOrder";
import AddCustomer from "./addCustomer";
import ExportCSVButton from "../../utils/export/excelReportGenerator";

interface ISidebarProps {
  orders: Order[];
  customers: Customer[];
  displayList: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  setDisplayList: React.Dispatch<React.SetStateAction<Order[]>>;
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

const SidebarIndex: React.FC<ISidebarProps> = ({
  orders,
  customers,
  displayList,
  setOrders,
  setDisplayList,
  setCustomers,
}) => {
  const [filter, setFilter] = useState<Filter>({
    partName: "",
    orderNum: "",
    customer: "",
    date: new Date().toISOString().substring(0, 7),
  });

  const handleFilterChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter({ ...filter, [key]: e.target.value });
  };

  useEffect(() => {
    const filteredList = orders.filter(
      (item) =>
        item.orderNum.includes(filter.orderNum.toLowerCase()) &&
        item.customer.toLowerCase().includes(filter.customer.toLowerCase()) &&
        item.partName.toLowerCase().includes(filter.partName.toLowerCase()) &&
        item.date.includes(filter.date)
    );
    setDisplayList(
      filteredList.slice().sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        } else if (a.date > b.date) {
          return -1;
        } else {
          return 0;
        }
      })
    );
  }, [filter.date, filter.partName, filter.orderNum, filter.customer, orders]);

  return (
    <div className="w-64" aria-label="Sidebar">
      <div className="py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full">
        <AddOrder customers={customers} setOrders={setOrders} orders={orders} />
        <AddCustomer customers={customers} setCustomers={setCustomers} />
        <Dropdown name="Filtr zakázek" icon="/search.svg">
          <ul className="flex flex-col mt-2">
            <Input
              name="Číslo zakázky:"
              type="text"
              value={filter.orderNum}
              onChange={(e) => handleFilterChange("orderNum", e)}
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
              <ExportCSVButton data={displayList} />
            </li>
          </ul>
        </Dropdown>
      </div>
    </div>
  );
};

export default SidebarIndex;
