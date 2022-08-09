import { useState } from "react";
import { addData } from "../../utils/firebase/firebase-db";
import { Customer } from "../../utils/types/types";
import Button from "../button"
import Dropdown from "../dropdown";
import Input from "../input";
import Message from "../message";

interface AddCustomerProps {
  customers: Customer[]
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>
}

const AddCustomer: React.FC<AddCustomerProps> = ({customers, setCustomers}) => {
  const [failure, setFailure] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    hourRate: ""
  })

  const handleCustomerChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({...customer, [key]: e.target.value})
  }

  const addCustomer = async () => {
      const customersData = await addData("customers", customer)
      if (customersData) {
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 3000)
        setCustomer({name: "", hourRate: ""})
        setCustomers([...customers, {...customer}])
      } else {
        setFailure(true)
        setTimeout(() => {
            setFailure(false)
        }, 3000)
      }

}

  return (
    <Dropdown name="Přidat zákazníka" icon="/addcustomer.svg">  
      <div className="mt-4">
        <Input name="Zadej jméno zákazníka:" type="text" value={customer.name} onChange={(e) => handleCustomerChange("name", e)}/>
        <Input name="Zadej hodinovou sazbu:" type="text" value={customer.hourRate} onChange={(e) => handleCustomerChange("hourRate", e)} />
      </div>
      <div className="flex justify-center">
        <Button name="Přidat zákazníka" onClick={addCustomer}/>
      </div>
      {failure ?? <Message text="Zákazník nebyl přidán" alert={true} />}
      {success ?? <Message text="Zákazník úspěšně přidán!" success={true} />}
    </Dropdown>
  )
}

export default AddCustomer