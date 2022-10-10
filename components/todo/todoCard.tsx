import { Todo, Content } from "../../utils/types/types";

interface ITodoProps {
  todo: Todo;
  handleClick: (todo: Todo) => void;
}

const TodoCard: React.FC<ITodoProps> = ({ todo, handleClick }) => {
  console.log(todo.description);
  return (
    <>
      <button
        key={todo.id}
        onClick={() => handleClick(todo)}
        className="block p-4 w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div className="text-xl mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
          {todo.subject}
        </div>
        <h5 className="font-normal text-gray-700 dark:text-gray-400">
          {JSON.parse(todo.description).map((item: Content, index: string) => (
            <div
              key={index}
              className="flex flex-row gap-2"
            >
              <p className="font-semibold">{`${item.date} -`}</p>
              <p>{item.content}</p>
            </div>
          ))}
        </h5>
        <div className="flex fex-row justify-between mt-4 items-center">
          <div className="flex flex-row gap-4 items-center">
            <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
              Status:{" "}
            </p>
            {todo.state === "CREATED" && (
              <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                Created
              </span>
            )}
            {todo.state === "ACTIVE" && (
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
                Active
              </span>
            )}
            {todo.state === "DONE" && (
              <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                Done
              </span>
            )}
          </div>
          <p className="font-normal text-sm text-gray-700">
            Created at: {todo.date}
          </p>
        </div>
      </button>
    </>
  );
};

export default TodoCard;
