import type { Content, Todo } from "../../utils/types/types";
import React, { useState} from "react";
import { editData, deleteItem } from "../../utils/firebase/firebase-db";
import Input from "../input";
import Select from "../selectTodo";
import Button from "../button";
import Message from "../message";

interface IUpdateTodoProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setToggleUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  todo: Todo;
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const UpdateTodo: React.FC<IUpdateTodoProps> = ({ todo, setToggleUpdate, todos, setTodos }) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [noContent, setNoContent] = useState<boolean>(false)
  const [newContent, setNewContent] = useState<Content>({
    date: new Date().toISOString().substring(0, 10),
    content: ""
  });
  const [state, setState] = useState(todo.state)

  const handleUpdate = () => {
    if (newContent.content !== "" || todo.state !== state ) {
      const newList = todos.filter((item) => item.id !== todo.id)
      setTodos([...newList, {...todo, description: JSON.stringify([...JSON.parse(todo.description), newContent ]), state: state}])
      editData("todo", todo.id, {...todo, description: JSON.stringify([...JSON.parse(todo.description), newContent ]), state: state})
      setNewContent({date: new Date().toISOString().substring(0, 10),
        content: ""})
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } else {
      setNoContent(true)
      setTimeout(() => {
        setNoContent(false);
      }, 3000);
    }
  }

  const handleDelete = () => {
    const newList = todos.filter((item) => item.id !== todo.id)
    setTodos(newList)
    setNewContent({date: new Date().toISOString().substring(0, 10),
      content: ""})
    setTimeout(() => {
      setSuccess(false);
      setToggleUpdate(false);
    }, 1500);
  }

  type StateType = "CREATED" | "ACTIVE" | "DONE";
  interface StateOptionType {
    value: StateType;
  }
  const stateOptions: StateOptionType[] = [
    { value: "CREATED" },
    { value: "ACTIVE" },
    { value: "DONE" }
  ];


  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-gray-500 opacity-50"></div>
      <div className="fixed top-0 inset-x-0 h-full flex justify-center items-center">
        <div className="relative bg-white p-4 rounded-lg flex flex-col w-1/2">
          <div className="flex justify-between items-start rounded-t border-b dark:border-gray-600 mb-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {todo.subject} z {todo.date}
            </h3>
            <button
              type="button"
              onClick={() => setToggleUpdate(false)}
              className="ml-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <h5 className="font-normal text-gray-700 dark:text-gray-400">
            {JSON.parse(todo.description).map((item: Content, idx: string) => (
              <div key={idx} className="flex flex-row gap-2">
                <p className="font-semibold">{`${item.date} -`}</p>
                <p>{item.content}</p>
              </div>
            ))}
          </h5>
          <div className="relative z-0 mt-4 w-full">
            <textarea
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e) => setNewContent({...newContent, content: e.target.value})}
              value={newContent.content}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Přidej koment:
            </label>
          </div>
          <Select
            value={state}
            onChange={setState}
            options={stateOptions}
          />
          <Button name="Upravit úkol" onClick={() => handleUpdate()} />
          <Button name="Smazat úkol" onClick={() => handleDelete()}/>
        </div>
        {success && (
          <Message text="Úkol úspěšně upraven/odstraněn!" success={true} />
        )}
        {failure && <Message text="Úkol nenalezen!" alert={true} />}
        {noContent && <Message text="Pro úpravu zadej obsah!" alert={true} />}
      </div>
    </>
  );
};

export default UpdateTodo;
