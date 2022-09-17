
interface TodoProps{
  subject: string;
  description: string;
  state: "created" | "active" | "done"; 
  date: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const TodoCard: React.FC<TodoProps> = ({subject, description, state, date, onClick}) => {
  return (
    <div className="block p-4 w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{subject}</div>
      <h5 className="font-normal text-gray-700 dark:text-gray-400">{description}</h5>
      <div className="flex fex-row gap-4 items-center">
        <p className="font-normal text-sm text-gray-700 dark:text-gray-400">Status: </p>
        {state === "created" && <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Created</span>}
        {state === "active" && <span className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">Active</span>}
        {state === "done" && <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Done</span>}
      </div>
    </div>
  )
}

export default TodoCard