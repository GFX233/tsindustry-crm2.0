import type { Order, Customer } from "../../utils/types/types";
import { useState, useRef, MutableRefObject } from "react";
import { editData, deleteItem } from "../../utils/firebase/firebase-db";
import Input from "../input";
import Select from "../select"
import Button from "../button"
import Message from "../message"

interface UpdateOrderProps {
  orderInfo: Order
  customers: Customer[]
  orders: Order[]
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
  setToggleUpdate: React.Dispatch<React.SetStateAction<boolean>>
}


const UpdateOrder: React.FC<UpdateOrderProps> = ({orderInfo, customers, setToggleUpdate, setOrders, orders}) => {
  const emptyOrder: Order = {
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
  }
  const [order, setOrder] = useState<Order>(orderInfo);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const handleOrderChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setOrder({ ...order, [key]: e.target.value });
  };
  const customersSelect = useRef() as MutableRefObject<HTMLSelectElement>;
  const customersList = customers.map((customer) => {
    return customer.name;
  });

  const handleEdit = (id: string) => {
    if (id) {
      const idx = customersSelect.current.options.selectedIndex-1
      const recalc = {
          price: orderInfo.time === order.time ?
          order.price : 
          String(parseInt(customers[idx].hourRate) * parseInt(order.time)),
      }
      const newList = orders.filter(item => item.id !== orderInfo.id)
      editData("orders", orderInfo.id, {...order, ...recalc})
      setSuccess(true)
      setTimeout(() => {
          setSuccess(false)
      },3000)
      setOrders([...newList, {
          ...order, ...recalc}])
    } else {
      setFailure(true)
      setTimeout(() => {
        setFailure(false)
    },3000)
    }

}

const handleDelete = (id: string) => {
  if (id) {
    const newList = orders.filter(item => item.id !== id)
    deleteItem(id)
    setSuccess(true)
    setTimeout(() => {
        setSuccess(false)
    },3000)
    setOrders(newList)
    setOrder(emptyOrder)
  } else {
    setFailure(true)
    setTimeout(() => {
      setFailure(false)
  },3000)
  }

}

  return (
    <>
      <div className="fixed top-0 opacity-50 w-screen h-screen bg-gray-500">    
      </div>
      <div className="fixed top-0 inset-x-0 h-full flex justify-center items-center">
        <div className="relative bg-white p-4 rounded-lg flex flex-col w-96">
          <div className="flex justify-between items-start rounded-t border-b dark:border-gray-600 mb-2"> 
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Údaje k zakázce: {orderInfo.orderNum}
            </h3>
            <button type="button" onClick={() => setToggleUpdate(false)} className="ml-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <Select
          referer={customersSelect}
          name="Zákazník"
          value={order.customer}
          onChange={(e) => handleOrderChange("customer", e)}
          options={customersList}
        />
        <Input
          name="Datum:"
          type="date"
          value={order.date}
          onChange={(e) => handleOrderChange("date", e)}
        />
        <Input
          name="Číslo zakázky:"
          type="text"
          value={order.orderNum}
          onChange={(e) => handleOrderChange("orderNum", e)}
        />
        <Input
          name="Název dílu:"
          type="text"
          value={order.partName}
          onChange={(e) => handleOrderChange("partName", e)}
        />
        <Input
          name="Počet dílů:"
          type="text"
          value={order.partCount}
          onChange={(e) => handleOrderChange("partCount", e)}
        />
        <Input
          name="Čas OP1:"
          type="text"
          value={order.op1}
          onChange={(e) => handleOrderChange("op1", e)}
        />
        <Input
          name="Čas OP2:"
          type="text"
          value={order.op2}
          onChange={(e) => handleOrderChange("op2", e)}
        />
        <Input
          name="Čas strojní celkem:"
          type="text"
          value={order.time}
          onChange={(e) => handleOrderChange("time", e)}
        />
        <Input
          name="Cena za celek:"
          type="text"
          value={order.price}
          onChange={(e) => handleOrderChange("price", e)}
        />
        <h4 className="mb-4">Průvodkový čas celkem: {(parseInt(order.partCount)*parseInt(order.op1)*parseInt(order.op2)) > 0 ? `${(((parseInt(order.op1) + parseInt(order.op2)) * parseInt(order.partCount))/60).toFixed(2)} H` : 0}</h4>
        <Button name="Upravit zakázku" onClick={() => handleEdit(order.id)} />
        <Button name="Smazat zakázku" onClick={() => handleDelete(order.id)} />

        </div>
      </div> 
      {success && <Message text="Zakázka úspěšně upravena/odstraněna!" success={true} />}
      {failure && <Message text="Zakázka nenalezena!" alert={true} />}
    </>
  )
}

export default UpdateOrder