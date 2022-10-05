import { NextPage } from "next"
import { useContext, useEffect, useState } from "react"
import Head from 'next/head'
import SidebarTodo from "../components/todo/sidebar-todo"
import type { Todo } from "../utils/types/types"
import TodoCard from "../components/todo/todoCard"
import { DataContext } from "../context/dataContext";
import UpdateTodo from "../components/todo/updateTodo"

const Todo: NextPage = () => {
  const data = useContext(DataContext)
  const [todos, setTodos] = useState<Todo[]>([])
  const [toggleUpdate, setToggleUpdate] = useState<boolean>(false)
  const [todoInfo, setTodoInfo] = useState<Todo>({
    subject: "",
    description: "",
    state: "CREATED",
    date: "",
    id: ""
  })

  useEffect(() => {
    setTodos(data?.todos)
  },[])

  const handleClick = (todo: Todo) => {
    setTodoInfo(todo)
    setToggleUpdate(true)
  }

  return (
    <>
      <Head>
        <title>TODO: TS INDUSTRY SYSTEMS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-row mt-4 justify-center max-w-5xl mx-auto">
        <SidebarTodo todos={todos} setTodos={setTodos}/>
        <div className="shadow-xl sm:rounded-lg overflow-x-auto relative w-full">
          {todos.length > 0 && todos.map(todo => <TodoCard key={todo.id} todo={todo} handleClick={handleClick} />)}
        </div>
        {toggleUpdate && <UpdateTodo todo={todoInfo} setToggleUpdate={setToggleUpdate} todos={todos} setTodos={setTodos} />}
      </div>
    </>
  )
}

export default Todo