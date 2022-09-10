import { NextPage } from "next"
import { useState } from "react"
import Head from 'next/head'
import SidebarTodo from "../components/todo/sidebar-todo"
import type { Todo } from "../utils/types/types"
import TodoCard from "../components/todo/todoCard"

const Todo: NextPage = () => {
    const [todos, setTodos] = useState<Todo[]>([])
  return (
    <>
      <Head>
        <title>TODO: TS INDUSTRY SYSTEMS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-row mt-4 justify-center max-w-5xl mx-auto">
        <SidebarTodo todos={todos} setTodos={setTodos}/>
        <div className="shadow-xl sm:rounded-lg overflow-x-auto relative w-full">
          {todos.map(todo => <TodoCard subject={todo.subject} description={todo.description} state={todo.state} date={todo.date} />)}
        </div>
      </div>
    </>
  )
}

export default Todo