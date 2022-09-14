
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
    </div>
  )
}

export default TodoCard