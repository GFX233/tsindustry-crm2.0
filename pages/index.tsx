import { useEffect, useState, useContext } from "react";
import SortingButton from "../components/toggleButton";
import { getTotal } from "../utils/helpers/orders";
import type { Order, Customer } from "../utils/types/types";
import SidebarIndex from "../components/orders/sidebar-index";
import UpdateOrder from "../components/orders/updateOrder";
import { DataContext } from "../context/dataContext";
import Head from 'next/head'

const Orders: React.FC = () => {
  const data = useContext(DataContext)
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [displayList, setDisplayList] = useState<Order[]>([]);
  const [toggleUpdate, setToggleUpdate] = useState<boolean>(false);
  const [orderInfo, setOrderInfo] = useState<Order>({
    date: "",
    customer: "",
    id: "",
    orderNum: "",
    partName: "",
    partCount: "",
    op1: "",
    op2: "",
    time: "",
    price: "",
  });

  useEffect(() => {
    setOrders(data?.orders);
    setCustomers(data?.customers)
    setDisplayList(data?.orders)
  }, [data]);

  const handleOrderUpdate = (item: Order) => {
    setOrderInfo(item);
    setToggleUpdate(true);
  };



  const handleSort = (
    withWhat: keyof Order,
    ascending: boolean | undefined
  ): void => {
    const sorted = displayList.slice().sort((a, b) => {
      if (ascending) {
        if (a[withWhat] < b[withWhat]) {
          return -1;
        } else if (a[withWhat] > b[withWhat]) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (a[withWhat] < b[withWhat]) {
          return 1;
        } else if (a[withWhat] > b[withWhat]) {
          return -1;
        } else {
          return 0;
        }
      }
    });
    setDisplayList(sorted);
  };

  return (
    <>
      <Head>
        <title>ORDERS: TS INDUSTRY SYSTEMS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-row mt-4 justify-center max-w-5xl mx-auto">
        <SidebarIndex
          orders={orders}
          customers={customers}
          displayList={displayList}
          setOrders={setOrders}
          setDisplayList={setDisplayList}
          setCustomers={setCustomers}
        />
        <div className="shadow-md sm:rounded-lg w-full overflow-x-auto relative">
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              List zakázek
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Zakázky za období: {"01-01-2000 -- 01-02-2022"}. V celkové
                hodnotě: {getTotal(displayList, "price")}. Počet kusů za období:{" "}
                {getTotal(displayList, "partCount")}
              </p>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="w-8">#</th>
                <th className="w-24">
                  <label className="flex gap-2 items-center justify-center">
                    Date <SortingButton onClick={handleSort} withWhat="date" />
                  </label>
                </th>
                <th className="w-36">
                  <label className="flex gap-2 items-center justify-center">
                    Customer{" "}
                    <SortingButton onClick={handleSort} withWhat="customer" />
                  </label>
                </th>
                <th className="w-24">
                  <label className="flex gap-2 items-center justify-center">
                    Order{" "}
                    <SortingButton onClick={handleSort} withWhat="orderNum" />
                  </label>
                </th>
                <th className="w-72">
                  <label className="flex gap-2 items-center justify-center">
                    Part name{" "}
                    <SortingButton onClick={handleSort} withWhat="partName" />
                  </label>
                </th>
                <th className="text-center w-20">
                  <label className="flex gap-2 items-center justify-center">
                    Count{" "}
                    <SortingButton onClick={handleSort} withWhat="partCount" />
                  </label>
                </th>
                <th className="w-24">
                  <label className="flex gap-2 items-center justify-center">
                    Price{" "}
                    <SortingButton onClick={handleSort} withWhat="price" />
                  </label>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayList.map((item, idx) => {
                return (
                  <tr
                    onClick={() => handleOrderUpdate(item)}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={idx}
                  >
                    <th>{idx}</th>
                    <td>{item.date}</td>
                    <td>{item.customer}</td>
                    <td>{item.orderNum}</td>
                    <td>{item.partName}</td>
                    <td>{item.partCount}</td>
                    <td>{item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {toggleUpdate && (
        <UpdateOrder
          orderInfo={orderInfo}
          setToggleUpdate={setToggleUpdate}
          customers={customers}
          setOrders={setOrders}
          orders={orders}
        />
      )}
    </>
  );
};

export default Orders;