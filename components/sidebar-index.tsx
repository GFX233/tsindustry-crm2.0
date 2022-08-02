import Dropdown from "./dropdown"

const SidebarIndex = () => {
  return (
    <div className="w-48" aria-label="Sidebar">
   <div className="py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full">
   <Dropdown name="Export file" icon="/download.svg">
      <ul className="space-y-2">
         <li>
            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <span className="ml-3">Add</span>
            </a>
            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <span className="ml-3">Export</span>
            </a>
            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <span className="ml-3">Filter</span>
            </a>
            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <span className="ml-3">Dashboard</span>
            </a>            
         </li>
      </ul>
      </Dropdown>
      <Dropdown name="dropdown">
      <ul className="space-y-2">
         <li>
            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <span className="ml-3">Add</span>
            </a>
            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <span className="ml-3">Export</span>
            </a>
            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <span className="ml-3">Filter</span>
            </a>
            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <span className="ml-3">Dashboard</span>
            </a>            
         </li>
      </ul>
      </Dropdown> 
   </div>
</div>
  )
}

export default SidebarIndex