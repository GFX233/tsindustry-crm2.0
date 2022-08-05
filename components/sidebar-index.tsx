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

// Create order useState

  const [order, setOrder] = useState({
    date: new Date().toISOString().substring(0,10),
    customer: "",
    orderNum: "",
    partName: "",
    partCount: "",
    op1: "",
    op2: "",
    time: "",
    price: ""
})

const handleOrderChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
  setOrder({...order, [key]: e.target.value})
}

  // Create customer useState`s

  const [customer, setCustomer] = useState({
    name: "",
    hourRate: ""
  })

  const handleCustomerChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({...customer, [key]: e.target.value})
  }

  // Filter useState's

  const [filter, setFilter] = useState({
    partName: "",
    orderNum: "",
    customer: "",
    date: ""
  })

  const handleFilterChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({...filter, [key]: e.target.value})
  }

  useEffect(() => {
    const filterOrderList = () => {
        const filteredList = data.filter(item => 
            item.orderNum.includes(filter.orderNum.toLowerCase()) &&
            item.customer.toLowerCase().includes(filter.customer.toLowerCase()) &&
            item.partName.toLowerCase().includes(filter.partName.toLowerCase()) &&
            item.date.includes(filter.date)
        )
        return setDisplayList(filteredList)
    }
    filterOrderList()
}, [filter.date, filter.partName, filter.orderNum, filter.customer, data, setDisplayList])

  return (
    <div className="w-64" aria-label="Sidebar">
      <div className="py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full">
        <Dropdown name="Přidat zákázku" icon="/adddoc.svg">
          <ul className="flex flex-col mt-2">
            <Input name="Datum:" type="date" value={order.date} onChange={(e) => handleOrderChange("date", e)}/>
            <Input name="Zákazník:" type="text" value={order.customer} onChange={(e) => handleOrderChange("customer", e)}/>
            <Input name="Číslo zakázky:" type="text" value={order.orderNum} onChange={(e) => handleOrderChange("orderNum", e)}/>
            <Input name="Název dílu:" type="text" value={order.partName} onChange={(e) => handleOrderChange("partName", e)}/>
            <Input name="Počet dílů:" type="text" value={order.partCount} onChange={(e) => handleOrderChange("partCount", e)}/>
            <Input name="Čas OP1:" type="text" value={order.op1} onChange={(e) => handleOrderChange("op1", e)}/>
            <Input name="Čas OP2:" type="text" value={order.op2} onChange={(e) => handleOrderChange("op2", e)}/>
            <Input name="Čas strojní celkem:" type="text" value={order.time} onChange={(e) => handleOrderChange("time", e)}/>
            <Input name="Cena za celek:" type="text" value={order.price} onChange={(e) => handleOrderChange("price", e)}/>
          </ul>
        </Dropdown>
        <Dropdown name="Přidat zákazníka" icon="/addcustomer.svg">
          <ul className="flex flex-col mt-2">
            <Input name="Jméno zákazníka:" type="text" value={customer.name} onChange={(e) => handleCustomerChange("name", e)}/>
            <Input name="Hodinová sazba:" type="text" value={customer.hourRate} onChange={(e) => handleCustomerChange("hourRate", e)}/>
          </ul>
        </Dropdown>
        <Dropdown name="Filter orders" icon="/search.svg">
          <ul className="flex flex-col mt-2">
            <Input name="Číslo zakázky:" type="text" value={filter.orderNum} onChange={(e) => handleFilterChange("orderNum", e)}/>
            <Input name="Název dílu:" type="text" value={filter.partName} onChange={(e) => handleFilterChange("partName", e)}/>
            <Input name="Zákazník:" type="text" value={filter.customer} onChange={(e) => handleFilterChange("customer", e)}/>
            <Input name="Datum:" type="month" value={filter.date} onChange={(e) => handleFilterChange("date", e)}/>
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
