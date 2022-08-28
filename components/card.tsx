interface CardProps {
  placeholder: string
  text: string;
}

const Card: React.FC<CardProps> = ({placeholder, text}) => {
  return (
    <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="font-normal text-gray-700 dark:text-gray-400">{placeholder}</h5>
      <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{text}</div>
    </div>
  );
};

export default Card;
