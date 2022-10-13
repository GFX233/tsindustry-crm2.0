import { useState } from "react";
import Image from "next/image";

interface DropdownProps {
  children: React.ReactNode;
  name: string;
  icon?: string
  dropped?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({ children, name, icon, dropped = false }) => {
  const [active, setActive] = useState<boolean>(dropped);
  return (
    <>
      <button
        className="flex items-center w-full p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => setActive(!active)}
      >
        <div className="flex flex-row justify-between w-full">
        {icon && <Image src={icon} width={24} height={24} />}
        {name}
        {active ? (
          <Image src="/arrowup.svg" width={24} height={24} />
        ) : (
          <Image src="/arrowdown.svg" width={24} height={24} />
        )}
        </div>
      </button>
      {active && children}
    </>
  );
};

export default Dropdown;
