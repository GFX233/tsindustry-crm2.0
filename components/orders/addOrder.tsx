import { MutableRefObject, useRef, useState } from "react";
import type { Order } from "../../utils/types/types";
import { addData } from "../../utils/firebase/firebase-db";
import { Customer } from "../../utils/types/types";
import Dropdown from "../dropdown";
import Input from "../input";
import Button from "../button";
import Select from "../select";
import Message from "../message";

interface AddOrderProps {
  customers: Customer[];
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const AddOrder: React.FC<AddOrderProps> = ({
  customers,
  orders,
  setOrders,
}) => {
  const customersList = customers.map((customer) => {
    return customer.name;
  });
  const customersSelect = useRef() as MutableRefObject<HTMLSelectElement>;
  const setFocus = useRef() as MutableRefObject<HTMLInputElement>;

  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [order, setOrder] = useState({
    date: new Date().toISOString().substring(0, 10),
    customer: "",
    orderNum: "",
    partName: "",
    partCount: "",
    op1: "",
    op2: "",
    time: "",
    price: "",
  });

  const handleOrderChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setOrder({ ...order, [key]: e.target.value });
  };

  const addDoc = async () => {
    if (order.customer === "") {
      setTimeout(() => {
        setFailure(false);
      }, 3000);
      return setFailure(true);
    }
    const idx = customersSelect.current.options.selectedIndex - 1;
    const docData = await addData("orders", {
      ...order,
      price:
        order.price === ""
          ? String(parseInt(customers[idx].hourRate) * parseInt(order.time))
          : order.price,
    });

    if (docData) {
      setOrder({
        ...order,
        orderNum: "",
        partName: "",
        partCount: "0",
        op1: "0",
        op2: "0",
        time: "",
        price: "",
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      setFocus.current.focus();
      setOrders([
        ...orders,
        {
          ...order,
          price:
            order.price === ""
              ? String(parseInt(customers[idx].hourRate) * parseInt(order.time))
              : order.price,
          id: docData.id,
          partCount: order.partCount,
        },
      ]);
    }
  };

  return (
    <>
      <Dropdown name="Přidat zákázku" icon="/adddoc.svg">
        <ul className="flex flex-col mt-2">
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
            referer={setFocus}
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
          <input
            type="text"
            readOnly
            value={
              parseInt(order.partCount) * parseInt(order.op1) * parseInt(order.op2) > 0
                ? `${(
                    ((parseInt(order.op1) + parseInt(order.op2)) *
                      parseInt(order.partCount)) /
                    60
                  ).toFixed(2)} H`
                : 0
            }
            className="mb-4 block px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
          <Button name="Přidat zakázku" onClick={addDoc} />
        </ul>
      </Dropdown>
      {failure && (
        <Message
          text="Zakázka nebyla přidána. Vyplňte zákazníka!"
          alert={true}
        />
      )}
      {success && <Message text="Zakázka úspěšně přidána!" success={true} />}
    </>
  );
};

export default AddOrder;
