import Image from "next/image";

interface SidebarButtonProps {
  name: string;
  icon?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({name, icon, onClick}) => {
  return (
    <button
      className="flex items-center w-full p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={onClick}
    >
      <div className="flex flex-row justify-between w-full">
        {icon && <Image src={icon} width={24} height={24} />}
        {name}
      </div>
    </button>
  );
};

export default SidebarButton;
