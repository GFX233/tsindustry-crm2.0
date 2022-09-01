import { useEffect, useState } from "react";
import { OrderNoId } from "../../utils/types/types";

interface ICounterProps {
  order: OrderNoId
}

const Counter: React.JSXElementConstructor<ICounterProps> = ({order}) => {
  const [multi, setMulti] = useState("2")
  const timeValue: string = parseInt(order.partCount) * parseInt(order.op1) * parseInt(order.op2) > 0
  ? (
      ((parseInt(order.op1) + parseInt(order.op2)) *
        parseInt(order.partCount)) /
      60
    ).toFixed(1)
  : "0"
  const multipliedValue: string = (parseFloat(timeValue) * parseFloat(multi)).toFixed(1)

  return (
    <div className="flex flex-row">
      <input
        type="text"
        readOnly
        value={`${timeValue} H`}
        className="mb-4 block px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
      <select
        value={multi}
        onChange={(e) => setMulti(e.target.value)}
        className="block mb-4 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
      >
        <option value="1.35" className="text-gray-900">
          1.35
        </option>
        <option value="1.5" className="text-gray-900">
          1.5
        </option>
        <option value="1.65" className="text-gray-900">
          1.65
        </option>
        <option value="1.85" className="text-gray-900">
          1.85
        </option>
        <option value="2" className="text-gray-900">
          2
        </option>
      </select>
      <input
        type="text"
        readOnly
        value={`${multipliedValue} H`}
        className="mb-4 block px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
    </div>
  );
};

export default Counter;
