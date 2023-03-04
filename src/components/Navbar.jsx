import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">
        Note App
      </Link>
      <Link href="/new" className="navbar-create">
        Create Note
      </Link>
    </nav>
  );
};

export default Navbar;
