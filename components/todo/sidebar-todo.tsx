import React, { useState, useRef, MutableRefObject } from "react";
import Dropdown from "../dropdown";
import Input from "../input";
import Select from "../select";
import type { CreateTodo, Todo } from "../../utils/types/types";
import Button from "../button";
import { addData } from "../../utils/firebase/firebase-db";

interface SidebarProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SidebarTodo: React.FC<SidebarProps> = ({ todos, setTodos }) => {
  const [todo, setTodo] = useState<Todo>({
    subject: "",
    description: "",
    state: "CREATED",
    date: new Date().toISOString().substring(0, 10),
  });
  const stateSelect = useRef() as MutableRefObject<HTMLSelectElement>;

  const handleTodoChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTodo({ ...todo, [key]: e.target.value });
  };
  
  const addTodo = () => {
    setTodos([...todos, {...todo, description: JSON.stringify([{date: todo.date, content: todo.description}])}]);
    setTodo({
      subject: "",
      description: "",
      state: "CREATED",
      date: new Date().toISOString().substring(0, 10),
    });
    addData("todo", {...todos.at(-1)})
  };

  return (
    <div className="w-64" aria-label="Sidebar">
      <div className="py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full shadow-xl">
        <Dropdown name="Vytvoř úkol" icon="/search.svg">
          <ul className="flex flex-col mt-2">
            <Input
              name="Předmět:"
              type="text"
              value={todo.subject}
              onChange={(e) => handleTodoChange("subject", e)}
            />
            <Input
              name="Obsah:"
              type="text"
              value={todo.description}
              onChange={(e) => handleTodoChange("description", e)}
            />
            <Select
              referer={stateSelect}
              name="Stav"
              value={todo.state}
              onChange={(e) => handleTodoChange("state", e)}
              options={["Created", "Active", "Done"]}
            />
            <Button name="Přidej úkol" onClick={addTodo} />
          </ul>
        </Dropdown>
      </div>
    </div>
  );
};

export default SidebarTodo;
