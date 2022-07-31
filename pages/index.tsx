import { useState } from "react";
import SortingButton from "../components/toggleButton";
import { getOrders } from "../utils/firebase/firebase-db";
import { getTotal } from "../utils/helpers/orders";
import type { Order } from "../utils/types/types";

const Orders: React.FC<{ data: Order[] }> = ({ data }) => {
  const [displayList, setDisplayList] = useState<Order[]>(data);

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
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg max-w-5xl mx-auto mt-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            List zakázek
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Zakázky za období: {"01-01-2000 -- 01-02-2022"}. 
              V celkové hodnotě: {getTotal(displayList, "price")}. 
              Počet kusů za období: {getTotal(displayList, "partCount")}
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th></th>
              <th>
                <label className="flex gap-2">
                  Date <SortingButton onClick={handleSort} withWhat="date" />
                </label>
              </th>
              <th>
                <label className="flex gap-2">
                  Customer{" "}
                  <SortingButton onClick={handleSort} withWhat="customer" />
                </label>
              </th>
              <th>
                <label className="flex gap-2">
                  Order{" "}
                  <SortingButton onClick={handleSort} withWhat="orderNum" />
                </label>
              </th>
              <th>
                <label className="flex gap-2">
                  Part name{" "}
                  <SortingButton onClick={handleSort} withWhat="partName" />
                </label>
              </th>
              <th className="text-center">
                <label className="flex gap-2">
                  Count{" "}
                  <SortingButton onClick={handleSort} withWhat="partCount" />
                </label>
              </th>
              <th>
                <label className="flex gap-2">
                  Price <SortingButton onClick={handleSort} withWhat="price" />
                </label>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayList.map((item, idx) => {
              return (
                <tr
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
    </>
  );
  /*      const [displayList, setDisplayList] = useState([...data.orders])
      const [update, setUpdate] = useState(false)
      const [orderData, setOrderData] = useState({})
      const [itemId, setId] = useState("")
    
      const getTotal = (data: object[], item: string) => {
        const totalReduce = data.reduce((total, current: ) => {
          return total += parseInt(current[item])
        }, 0)
        return totalReduce
      }

      const handleDelete = (id) => {
        const newList = data.orders.filter(item => item.id !== id)
        deleteItem(id)
        return setData({ ...data, orders: newList })
      }
    
      const handleUpdate = async (id) => {
        setId(id)
        setOrderData(await getInfo("orders", id))
        setUpdate(true)
      }
    
      return (
        <div className="container flex flex-col p-4 w-full">
          <div className="divider m-0 pb-4">ORDERS LIST</div>
          <div className="flex flex-row justify-between">
            <Filter orderList={ data.orders } setDisplayList={ setDisplayList } />
            <div className="flex flex-row gap-4 pb-4">
              <ExportCSVButton data={displayList} />
              <PrintButton onClick={ () => generatePDF(displayList) } />
              <AddCustomer />
              <AddOrder />
            </div>
          </div>
          { update && <UpdateOrder setUpdate={ setUpdate } orderData={ orderData } id={ itemId } /> }

            <div className="flex flex-row justify-around">
              <p>TOTAL PART COUNT: {getTotal(displayList, "partCount")}</p>
              <p>TOTAL PRICE: {getTotal(displayList, "price")}</p>
            </div>
          </div>
        </div>
      )*/
};

export default Orders;

export async function getServerSideProps() {
  const data = await getOrders();

  return { props: { data } };
}
