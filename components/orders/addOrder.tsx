import { MutableRefObject, useRef, useState } from "react";
import Dropdown from "../dropdown";
import Input from "../input";
import Button from "../button";
import Select from "../select";
import { addData } from "../../utils/firebase/firebase-db";
import { Customer } from "../../utils/types/types";

const AddOrder: React.FC<AddOrderProps> = ({ customers }) => {
  const customersList = customers.map((customer) => {
    return customer.name;
  });
  const customersSelect = useRef() as MutableRefObject<HTMLSelectElement>;
  const setFocus = useRef() as MutableRefObject<HTMLInputElement>

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
  
    return setData({
      ...data,
      orders: [
        ...data.orders,
        {
          ...order,
          price:
            order.price === ""
              ? data.customers[idx].hourRate * order.time
              : order.price,
          id: docData.id,
          partCount: parseInt(order.partCount),
        },
      ],
    });
  };

  return (
    <Dropdown name="Přidat zákázku" icon="/adddoc.svg">
      <ul className="flex flex-col mt-2">
        <Select
          ref={customersSelect}
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
          ref={setFocus}
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
        <Button name="Přidat zakázku" onClick={addDoc} />
      </ul>
    </Dropdown>
  );
};

interface AddOrderProps {
  customers: Customer[];
}

export default AddOrder;
