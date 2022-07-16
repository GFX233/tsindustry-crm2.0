import Link from "next/link"

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div className="flex flex-row">
      <nav className="outline flex flex-col h-screen">
      <Link href="/">
        <a>Orders</a>
      </Link>
      <Link href="/dashboard">
        <a>Dashboard</a>
      </Link>
      <Link href="/planner">
        <a>Planner</a>
      </Link>
    </nav>
    <div>
    {children}
    </div>
    </div>
  )
}

export default Layout