import Image from "next/image";
import Avatar from "./avatar";
import PageLink from "./link"
import { DataContext } from "../context/dataContext";
import { useContext } from "react"

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  const data = useContext(DataContext)

  return (
    <div className="flex flex-col">
      <nav className="flex flex-row w-screen gap-4 items-center justify-between mt-1 px-8 pt-4">
        <div className="flex flex-row gap-4 items-center">
        <Image className="rounded" src="/ts.svg" width={50} height={50}/>
        <p className="font-semibold">TS INDUSTRY SYSTEMS</p>
        </div>
        <div className="flex flex-row gap-4">
          <PageLink link="/" name="Orders" />
          <PageLink link="/dashboard" name="Dashboard" />
          <PageLink link="/planner" name="Planner" />
          <PageLink link="/todo" name="Todo" />
          <PageLink link="/rfq" name="RFQ's" />
        </div>
        <Avatar user={data.user}/>
      </nav>
    <div>
    {children}
    </div>
    </div>
  )
}

export default Layout