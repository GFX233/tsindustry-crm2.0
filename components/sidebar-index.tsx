import Dropdown from "./dropdown";
import Input from "./input";
import SidebarButton from "./sidebarButton";
import { useState, useEffect } from "react";
import type { Order } from "../utils/types/types";


interface SidebarProps {
  data: Order[]
  setDisplayList: React.Dispatch<React.SetStateAction<Order[]>>
}


const SidebarIndex: React.FC<SidebarProps> = ({data, setDisplayList}) => {
  const [partName, setPartName] = useState("")
  const [orderNum, setOrderNum] = useState("")
  const [customer, setCustomer] = useState("")
  const [date, setDate] = useState(new Date().toISOString().substring(0,7))

  useEffect(() => {
    const filterOrderList = () => {
        const filteredList = data.filter(item => 
            item.orderNum.includes(orderNum.toLowerCase()) &&
            item.customer.toLowerCase().includes(customer.toLowerCase()) &&
            item.partName.toLowerCase().includes(partName.toLowerCase()) &&
            item.date.includes(date)
        )
        return setDisplayList(filteredList)
    }
    filterOrderList()
}, [orderNum, customer, data, setDisplayList, date, partName])

  return (
    <div className="w-64" aria-label="Sidebar">
      <div className="py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full">
        <SidebarButton name="Add Document" icon="/adddoc.svg" />
        <SidebarButton name="Add Customer" icon="/addcustomer.svg" />
        <Dropdown name="Filter orders" icon="/search.svg">
          <ul className="flex flex-col mt-2">
            <Input name="Order number" type="text" value={orderNum} onChange={(e) => setOrderNum(e.target.value)}/>
            <Input name="Part name" type="text" value={partName} onChange={(e) => setPartName(e.target.value)}/>
            <Input name="Customer" type="text" value={customer} onChange={(e) => setCustomer(e.target.value)}/>
            <Input name="Date" type="month" value={date} onChange={(e) => setDate(e.target.value)}/>
          </ul>
        </Dropdown>
        <Dropdown name="Export file" icon="/download.svg">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3">Export to PDF</span>
              </a>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3">Export to Excel </span>
              </a>
            </li>
          </ul>
        </Dropdown>
      </div>
    </div>
  );
};

export default SidebarIndex;
