import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-black">
      <Link href="/orders">ORDERS<button>asdasdasd</button></Link>
      <Link href="/dashboard">DASHBOARD</Link>
      <Link href="/planner">PLANNER</Link>
      <Link href="/todo" />
    </div>
  );
};

export default Sidebar;
