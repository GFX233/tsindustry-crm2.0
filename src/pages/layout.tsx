import Sidebar from "../components/Sidebar"
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div>
      <Link href="/orders">ORDERS<button>asdasdasd</button></Link>
      <Link href="/dashboard">DASHBOARD</Link>
      <Link href="/planner">PLANNER</Link>
      <Link href="/todo" />
      {children}
    </div>
  )
}

export default Layout