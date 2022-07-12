import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <nav className="bg-black">
      <p>HELLLLOOOOOOOO</p>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
    </nav>
  );
};

export default Sidebar;
