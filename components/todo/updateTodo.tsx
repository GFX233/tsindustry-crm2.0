import type { Todo } from "../../utils/types/types";
import { useState, useRef, MutableRefObject } from "react";
import { editData, deleteItem } from "../../utils/firebase/firebase-db";
import Input from "../input";
import Select from "../select"
import Button from "../button"
import Message from "../message"

interface UpdateTodoProps{
  subject: string;
  description: string;
  state: "created" | "active" | "done"; 
  date: string;
  text: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  setToggleUpdate: React.Dispatch<React.SetStateAction<boolean>>
  todo: Todo
}


const UpdateOrder: React.FC<UpdateTodoProps> = ({subject, description, state, todo, date, text, setToggleUpdate}) => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false)
  const [todoData, setTodoData] = useState<Todo>(todo)

  return (
    <>
      <div className="fixed top-0 opacity-50 w-screen h-screen bg-gray-500">    
      </div>
      <div className="fixed top-0 inset-x-0 h-full flex justify-center items-center">
        <div className="relative bg-white p-4 rounded-lg flex flex-col w-96">
          <div className="flex justify-between items-start rounded-t border-b dark:border-gray-600 mb-2"> 
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Údaje k zakázce: 
            </h3>
            <button type="button" className="ml-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>

        <Input
          name="Datum:"
          type="date"
          value="{order.date}"

        />
        <Input
          name="Číslo zakázky:"
          type="text"
          value="{order.date}"

        />
        <Input
          name="Název dílu:"
          type="text"
          value="{order.date}"

        />
        <Input
          name="Počet dílů:"
          type="text"
          value="{order.date}"

        />


        <Button name="Upravit zakázku" />
        <Button name="Smazat zakázku" />

        </div>
        {success && <Message text="Zakázka úspěšně upravena/odstraněna!" success={true} />}
        {failure && <Message text="Zakázka nenalezena!" alert={true} />}
      </div> 
    </>
  )
}

export default UpdateOrder